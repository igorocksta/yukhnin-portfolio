import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const BOOKING_ROUTES = ['/book', '/schedule', '/call', '/book-call', '/intro-call'];
export const BOOKING_HASHES = ['#book', '#schedule', '#call', '#book-call', '#intro-call'];

interface ScheduleModalContextType {
  isScheduleModalOpen: boolean;
  openScheduleModal: () => void;
  closeScheduleModal: () => void;
  bookingUrl: string;
  copyBookingLink: () => Promise<boolean>;
  linkCopied: boolean;
}

const ScheduleModalContext = createContext<ScheduleModalContextType | undefined>(undefined);

function isBookingUrl(location: { pathname: string; search: string; hash: string }): boolean {
  const path = location.pathname.toLowerCase();
  if (BOOKING_ROUTES.includes(path)) return true;
  if (BOOKING_HASHES.includes(location.hash.toLowerCase())) return true;
  const searchParams = new URLSearchParams(location.search);
  if (searchParams.has('book') || searchParams.has('schedule') || searchParams.has('call')) return true;
  return false;
}

export function ScheduleModalProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(() => isBookingUrl(location));
  const [linkCopied, setLinkCopied] = useState(false);

  // Automatically open modal when navigating to /book, #book, etc.
  useEffect(() => {
    if (isBookingUrl(location)) {
      setIsScheduleModalOpen(true);
    }
  }, [location.pathname, location.search, location.hash]);

  const openScheduleModal = useCallback(() => {
    setIsScheduleModalOpen(true);
  }, []);

  const closeScheduleModal = useCallback(() => {
    setIsScheduleModalOpen(false);

    // Clean up URL if opened via direct booking link
    const path = location.pathname.toLowerCase();
    if (BOOKING_ROUTES.includes(path)) {
      navigate('/', { replace: true });
    } else if (BOOKING_HASHES.includes(location.hash.toLowerCase())) {
      navigate(location.pathname + location.search, { replace: true });
    } else {
      const searchParams = new URLSearchParams(location.search);
      if (searchParams.has('book') || searchParams.has('schedule') || searchParams.has('call')) {
        searchParams.delete('book');
        searchParams.delete('schedule');
        searchParams.delete('call');
        const qs = searchParams.toString();
        navigate(location.pathname + (qs ? `?${qs}` : ''), { replace: true });
      }
    }
  }, [location, navigate]);

  const bookingUrl = useMemo(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      return `${window.location.origin}/book`;
    }
    return 'https://yukhnindesign.work/book';
  }, []);

  const copyBookingLink = useCallback(async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(bookingUrl);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2500);
        return true;
      }
    } catch (err) {
      console.error('Failed to copy booking link:', err);
    }
    return false;
  }, [bookingUrl]);

  return (
    <ScheduleModalContext.Provider 
      value={{ 
        isScheduleModalOpen, 
        openScheduleModal, 
        closeScheduleModal,
        bookingUrl,
        copyBookingLink,
        linkCopied
      }}
    >
      {children}
    </ScheduleModalContext.Provider>
  );
}

export function useScheduleModal() {
  const context = useContext(ScheduleModalContext);
  if (!context) {
    throw new Error('useScheduleModal must be used within a ScheduleModalProvider');
  }
  return context;
}


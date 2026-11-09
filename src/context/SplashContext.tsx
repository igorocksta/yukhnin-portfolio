import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const SPLASH_KEY = 'rocksta_splash_seen_v2';

export function checkShouldShowSplash(): boolean {
  if (typeof window === 'undefined') return false;

  // 1. Force show via ?splash query parameter
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('splash')) {
    return true;
  }

  // 2. Only show on the very first entry of the session — never re-trigger on reload or back navigation
  try {
    if (sessionStorage.getItem(SPLASH_KEY) === 'true') {
      return false;
    }
  } catch {
    // Ignore storage issues
  }

  return true;
}

interface SplashContextType {
  isSplashActive: boolean;
  isSiteRevealed: boolean;
  notifySiteRevealed: () => void;
  notifySplashDismissed: () => void;
}

const SplashContext = createContext<SplashContextType>({
  isSplashActive: true,
  isSiteRevealed: false,
  notifySiteRevealed: () => {},
  notifySplashDismissed: () => {},
});

export const useSplash = () => useContext(SplashContext);

export const SplashProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shouldShow] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/splash') {
      return false;
    }
    return checkShouldShowSplash();
  });

  const [isSplashActive, setIsSplashActive] = useState<boolean>(shouldShow);
  const [isSiteRevealed, setIsSiteRevealed] = useState<boolean>(!shouldShow);

  const notifySiteRevealed = useCallback(() => {
    setIsSiteRevealed(true);
  }, []);

  const notifySplashDismissed = useCallback(() => {
    setIsSplashActive(false);
    setIsSiteRevealed(true);
    try {
      sessionStorage.setItem(SPLASH_KEY, 'true');
    } catch {
      // Ignore
    }
  }, []);

  return (
    <SplashContext.Provider
      value={{
        isSplashActive,
        isSiteRevealed,
        notifySiteRevealed,
        notifySplashDismissed,
      }}
    >
      {children}
    </SplashContext.Provider>
  );
};

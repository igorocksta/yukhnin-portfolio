import React, { createContext, useContext, useState } from 'react';

interface PrivacyModalContextType {
  isPrivacyOpen: boolean;
  openPrivacyModal: () => void;
  closePrivacyModal: () => void;
}

const PrivacyModalContext = createContext<PrivacyModalContextType | undefined>(undefined);

export function PrivacyModalProvider({ children }: { children: React.ReactNode }) {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const openPrivacyModal = () => setIsPrivacyOpen(true);
  const closePrivacyModal = () => setIsPrivacyOpen(false);

  return (
    <PrivacyModalContext.Provider value={{ isPrivacyOpen, openPrivacyModal, closePrivacyModal }}>
      {children}
    </PrivacyModalContext.Provider>
  );
}

export function usePrivacyModal() {
  const context = useContext(PrivacyModalContext);
  if (!context) {
    throw new Error('usePrivacyModal must be used within a PrivacyModalProvider');
  }
  return context;
}

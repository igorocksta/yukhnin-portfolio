import React, { createContext, useContext, useState } from 'react';

interface CvModalContextType {
  isCvModalOpen: boolean;
  openCvModal: () => void;
  closeCvModal: () => void;
}

const CvModalContext = createContext<CvModalContextType | undefined>(undefined);

export function CvModalProvider({ children }: { children: React.ReactNode }) {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  const openCvModal = () => setIsCvModalOpen(true);
  const closeCvModal = () => setIsCvModalOpen(false);

  return (
    <CvModalContext.Provider value={{ isCvModalOpen, openCvModal, closeCvModal }}>
      {children}
    </CvModalContext.Provider>
  );
}

export function useCvModal() {
  const context = useContext(CvModalContext);
  if (!context) {
    throw new Error('useCvModal must be used within a CvModalProvider');
  }
  return context;
}

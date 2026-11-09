import React, { createContext, useContext, useState } from 'react';

interface ScheduleModalContextType {
  isScheduleModalOpen: boolean;
  openScheduleModal: () => void;
  closeScheduleModal: () => void;
}

const ScheduleModalContext = createContext<ScheduleModalContextType | undefined>(undefined);

export function ScheduleModalProvider({ children }: { children: React.ReactNode }) {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const openScheduleModal = () => setIsScheduleModalOpen(true);
  const closeScheduleModal = () => setIsScheduleModalOpen(false);

  return (
    <ScheduleModalContext.Provider value={{ isScheduleModalOpen, openScheduleModal, closeScheduleModal }}>
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

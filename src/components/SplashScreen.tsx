import React, { useState, useEffect, useCallback } from 'react';
import SplashLogo from './SplashLogo';
import { useSplash } from '../context/SplashContext';

export default function SplashScreen() {
  const { isSplashActive, notifySiteRevealed, notifySplashDismissed } = useSplash();
  const [isVisible, setIsVisible] = useState<boolean>(() => isSplashActive);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    notifySiteRevealed();
    notifySplashDismissed();
    document.body.style.overflow = '';
  }, [notifySiteRevealed, notifySplashDismissed]);

  const handleRevealSite = useCallback(() => {
    notifySiteRevealed();
  }, [notifySiteRevealed]);

  useEffect(() => {
    if (!isVisible) return;

    // Lock scroll during splash screen
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Allow user to manually dismiss with Escape if needed
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isVisible, handleDismiss]);

  if (!isVisible) {
    return null;
  }

  return (
    <SplashLogo
      isAnimated={true}
      onRevealSite={handleRevealSite}
      onComplete={handleDismiss}
    />
  );
}

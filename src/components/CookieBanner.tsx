import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing the banner slightly so it doesn't interrupt initial page load animations
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-[999] pointer-events-none w-max max-w-[calc(100vw-32px)]"
        >
          <div className="pointer-events-auto bg-[#080808]/90 backdrop-blur-xl border border-white/[0.12] rounded-2xl sm:rounded-full p-4 sm:py-2 sm:px-2 sm:pl-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            
            <p className="text-[10px] tracking-[0.08em] text-white/60 font-light font-sans text-center uppercase whitespace-nowrap">
              We use cookies to enhance your experience.
            </p>
            
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                id="cookie-decline-btn"
                onClick={handleDecline}
                className="h-8 px-4 rounded-full bg-white/[0.04] text-[10px] uppercase tracking-[0.1em] text-white/60 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer flex items-center justify-center whitespace-nowrap"
              >
                Decline
              </button>
              <button
                type="button"
                id="cookie-accept-btn"
                onClick={handleAccept}
                className="h-8 px-4 rounded-full bg-white/[0.08] text-[10px] uppercase tracking-[0.1em] text-white hover:text-[#ff6900] hover:bg-white/[0.14] transition-all cursor-pointer flex items-center justify-center whitespace-nowrap"
              >
                Accept
              </button>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

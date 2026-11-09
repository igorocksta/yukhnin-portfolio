import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Check, Copy } from 'lucide-react';
import { useCvModal } from '../context/CvModalContext';
import { CONTACT_INFO } from '../data';

export default function CvPasswordModal() {
  const { isCvModalOpen, closeCvModal } = useCvModal();
  const [isEmailPopoverOpen, setIsEmailPopoverOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const emailTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = () => {
    setIsEmailPopoverOpen(false);
    setCopied(false);
    closeCvModal();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    if (isCvModalOpen) {
      const originalBodyStyle = document.body.style.overflow;
      const originalHtmlStyle = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalBodyStyle;
        document.documentElement.style.overflow = originalHtmlStyle;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isCvModalOpen]);

  const handleMouseEnter = () => {
    if (emailTimeoutRef.current) clearTimeout(emailTimeoutRef.current);
    setIsEmailPopoverOpen(true);
  };

  const handleMouseLeave = () => {
    emailTimeoutRef.current = setTimeout(() => {
      setIsEmailPopoverOpen(false);
    }, 250);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('igorocksta@gmail.com');
    setCopied(true);
    if (emailTimeoutRef.current) clearTimeout(emailTimeoutRef.current);
    emailTimeoutRef.current = setTimeout(() => {
      setCopied(false);
      setIsEmailPopoverOpen(false);
    }, 2000);
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isCvModalOpen && (
        <div 
          id="cv-password-modal"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-hidden sm:overflow-y-auto overscroll-contain"
          style={{ height: '100dvh' }}
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/90 cursor-pointer"
          />

          {/* Modal Content Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl my-auto -translate-y-6 sm:translate-y-0 bg-[#0e0e11] border border-white/[0.14] rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.95)] z-10 flex flex-col overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={handleClose}
              type="button"
              id="cv-modal-close-btn"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#18181b] border border-white/[0.16] shadow-[0_4px_16px_rgba(0,0,0,0.6)] flex items-center justify-center text-white hover:text-white hover:bg-white/20 transition-all cursor-pointer z-30"
              aria-label="Close modal"
            >
              <X size={16} strokeWidth={1.8} className="md:w-[18px] md:h-[18px]" />
            </button>

            {/* Faded Document Preview Underlay (A4 Paper look) */}
            <div 
              className="absolute top-[66px] sm:top-[84px] left-4 right-4 sm:left-8 sm:right-8 h-[404px] sm:h-[480px] pointer-events-none select-none flex justify-center"
              style={{ 
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 42%, rgba(0,0,0,0.75) 58%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0) 80%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 42%, rgba(0,0,0,0.75) 58%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0) 80%)'
              }}
            >
              <div className="w-full h-full bg-[#fdfdfd] rounded-none shadow-[0_4px_24px_rgba(0,0,0,0.4)] opacity-[0.95]">
                <div className="pt-6 sm:pt-14 px-6 sm:px-12 text-left font-sans">
                  <h2 className="text-[26px] sm:text-[32px] font-bold text-[#111] tracking-tight mb-2 sm:mb-4">Igor Yukhnin</h2>
                  
                  <h3 className="text-[15px] sm:text-[16px] text-[#222] font-semibold tracking-wide mb-2 sm:mb-3">Senior / Lead Product Designer (Web & Mobile)</h3>
                  
                  <div className="text-[12px] text-[#333] leading-[18px] mb-4 sm:mb-6 font-medium">
                    12+ years · B2B / B2C · SaaS · Enterprise · Fintech · Healthcare<br />
                    Based in Europe · CET/CEST · Remote-first · Open to relocation
                  </div>

                  <div className="h-[1px] w-full bg-black/15 mb-4 sm:mb-6" />
                  
                  <h4 className="text-[12px] sm:text-[13px] font-normal text-[#666] mb-2 sm:mb-3">Summary</h4>
                  
                  <p className="text-[12px] sm:text-[13px] text-[#222] leading-[18px] sm:leading-[20px] font-normal mb-4 sm:mb-6 text-justify">
                    <strong>Senior Product Designer with 12+ years of experience</strong> across web and mobile products across <strong>B2B SaaS, B2C, fintech, healthcare</strong>, and enterprise environments. I specialize in complex workflows, data-heavy products, dashboards, and scalable design systems. I work across product strategy, UX research, interaction design, prototyping, and delivery, helping teams turn complex requirements into clear, high-performing experiences. I'm comfortable leading design workstreams, mentoring designers, and aligning UX priorities with product strategy and business goals.
                  </p>
                  
                  <h4 className="text-[12px] sm:text-[13px] font-semibold text-[#222] mb-2 sm:mb-3">Selected impact:</h4>
                  <ul className="list-disc pl-4 text-[12px] sm:text-[13px] text-[#222] space-y-2 marker:text-[#666]">
                    <li>Reduced design iteration time by ~30% and task completion time by ~25% in an enterprise data intelligence platform (Quest Software).</li>
                    <li>Reduced booking time from 5.5 to 3 minutes in a flight booking web & mobile app (Sun Express).</li>
                    <li>Reduced front-end implementation time by 35–40% through a cross-platform design system (Syntellis).</li>
                    <li>Improved user activation by streamlining onboarding and enabling real-time performance tracking (TAG mobile app).</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Deep shadow gradient overlay to submerge the bottom of the paper into background darkness */}
            <div 
              className="absolute inset-x-0 bottom-0 top-[176px] sm:top-[296px] bg-gradient-to-b from-transparent via-[#0e0e11]/90 to-[#0e0e11] pointer-events-none z-[5]" 
            />

            {/* Actual Interactive Content Layer */}
            <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-8 pb-6 sm:pb-8 mt-[246px] sm:mt-[384px]">

              {/* Lock, Headline & Context Group (raised by 8px) */}
              <div className="-translate-y-2 flex flex-col items-center w-full">
                {/* Lock Badge */}
                <div className="flex justify-center mb-[22px] sm:mb-6 sm:-translate-y-[6px]">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:py-1 rounded-full bg-white border border-white/20 text-[11px] sm:text-[10px] font-semibold tracking-[0.14em] uppercase text-black font-sans shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                    <Lock size={12} className="text-[#ff6900]" />
                    <span>Protected Document</span>
                  </div>
                </div>

                {/* Main Headline */}
                <h3 className="text-2xl sm:text-[28px] md:text-[32px] font-dm-sans font-bold tracking-tight text-white leading-tight mb-2.5 sm:mb-4 sm:whitespace-nowrap">
                  Contact me for access.
                </h3>

                {/* Confidentiality Context */}
                <p className="text-[16px] leading-[24px] text-white/80 font-light max-w-[325px] sm:max-w-md mx-auto mb-5 sm:mb-8">
                  This folder contains confidential enterprise project records, NDA projects, client metrics, and full work experience.
                </p>
              </div>

              {/* Action Buttons: Email (with popover agent/copy) and LinkedIn */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full pt-6 sm:pt-8 border-t border-white/[0.08]">
              {/* Email Button with Popover */}
              <div 
                className="relative w-full sm:w-auto"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Popover Options Panel */}
                <AnimatePresence>
                  {isEmailPopoverOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#131317] border border-white/20 rounded-2xl p-2 shadow-[0_16px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl z-50 w-max flex flex-col gap-1"
                    >
                      {/* Copy email option */}
                      <button
                        onClick={handleCopy}
                        type="button"
                        className="flex items-center gap-2 text-[13px] font-light text-white/85 hover:text-white transition-colors group text-left py-2 px-3 rounded-xl hover:bg-white/10 cursor-pointer whitespace-nowrap"
                      >
                        {copied ? (
                          <Check size={14} strokeWidth={1.8} className="text-emerald-400 shrink-0" />
                        ) : (
                          <Copy size={14} strokeWidth={1.8} className="text-[#9F9F9F] group-hover:text-white transition-colors shrink-0" />
                        )}
                        <span className="transition-all">
                          {copied ? 'Copied to clipboard!' : "Copy email address"}
                        </span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Main Email Button */}
                <button
                  type="button"
                  id="cv-modal-email-btn"
                  onClick={handleCopy}
                  className="w-full sm:w-auto min-w-[140px] h-12 px-6 rounded-full bg-white text-black text-[14px] font-medium hover:bg-[#ff6900] hover:text-white transition-all cursor-pointer select-none flex items-center justify-center shadow-md gap-2"
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-emerald-600 shrink-0" />
                      <span>Copied to clipboard!</span>
                    </>
                  ) : (
                    <span>Email</span>
                  )}
                </button>
              </div>

              {/* LinkedIn Button */}
              <a
                href={`https://${CONTACT_INFO.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                id="cv-modal-linkedin-btn"
                className="w-full sm:w-auto min-w-[140px] h-12 px-6 rounded-full bg-white/[0.06] border border-white/[0.14] text-white text-[14px] font-normal hover:bg-white/12 hover:border-white/30 transition-all flex items-center justify-center select-none"
              >
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

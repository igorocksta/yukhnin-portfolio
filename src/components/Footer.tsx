
import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONTACT_INFO } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ArrowUpRight, Copy, Check, Mail, CalendarPlus, User, Linkedin, BookOpen } from 'lucide-react';
import { useCvModal } from '../context/CvModalContext';
import { useScheduleModal } from '../context/ScheduleModalContext';
import { usePrivacyModal } from '../context/PrivacyModalContext';
import { smoothScrollTo } from '../utils/scroll';
import { usePageTransition } from '../context/PageTransitionContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { openCvModal } = useCvModal();
  const { openScheduleModal } = useScheduleModal();
  const { openPrivacyModal } = usePrivacyModal();
  const { navigateToAbout, navigateToJournal } = usePageTransition();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToAbout();
  };

  const handleJournalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToJournal();
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('igorocksta@gmail.com');
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <footer className="pt-6 md:pt-0 pb-6 md:pb-10 xl:pb-[56px] relative z-10">
      <div className="container-custom relative">
        {/* Full-width container with the 5 action buttons */}
        <div className="w-full relative z-10">
          
          {/* DESKTOP & TABLET: 6 equal columns spanning 100% of container width */}
          <div className="hidden md:grid grid-cols-6 gap-2 w-full">
            {/* 1. About Me button */}
            <motion.div whileTap={{ scale: 0.96 }} className="w-full">
              <Link 
                to="/about" 
                onClick={handleAboutClick}
                className="w-full h-11 group flex items-center justify-center gap-0 lg:gap-1.5 xl:gap-2 bg-white/[0.03] border border-white/[0.08] px-2 md:px-2.5 lg:px-3.5 xl:px-4 rounded-full text-[12.5px] lg:text-[13.5px] xl:text-[14px] font-light text-white/60 hover:text-white hover:bg-[#ff6900] hover:border-[#ff6900] transition-all duration-300 cursor-pointer select-none backdrop-blur-lg"
              >
                <div className="hidden lg:flex w-3.5 h-3.5 items-center justify-center shrink-0">
                  <User size={14} strokeWidth={1.8} className="text-[#9F9F9F] group-hover:text-white transition-colors" />
                </div>
                <span className="whitespace-nowrap font-light text-white/60 group-hover:text-white transition-colors">About Me</span>
              </Link>
            </motion.div>

            {/* 2. Email Me button with Popover */}
            <div 
              className="relative flex items-center justify-center w-full"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Popover Panel */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#0d0d0f] border border-white/20 rounded-2xl p-2 shadow-[0_12px_32px_rgba(0,0,0,0.8)] backdrop-blur-xl z-50 w-max flex flex-col gap-1"
                  >
                    {/* Copy email option */}
                    <button
                      onClick={handleCopy}
                      type="button"
                      className="flex items-center gap-2 text-[13px] font-light text-white/80 hover:text-white transition-colors group text-left py-1.5 px-2.5 rounded-xl hover:bg-white/10 cursor-pointer whitespace-nowrap"
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

              <motion.button 
                type="button"
                onClick={handleCopy}
                whileTap={{ scale: 0.96 }}
                className="w-full h-11 group flex items-center justify-center gap-0 lg:gap-1.5 xl:gap-2 bg-white/[0.03] border border-white/[0.08] px-2 md:px-2.5 lg:px-3.5 xl:px-4 rounded-full text-[12.5px] lg:text-[13.5px] xl:text-[14px] font-light text-white/60 hover:text-white hover:bg-[#ff6900] hover:border-[#ff6900] transition-all duration-300 cursor-pointer select-none backdrop-blur-lg"
              >
                <div className="hidden lg:flex w-3.5 h-3.5 items-center justify-center shrink-0">
                  {copied ? (
                    <Check size={14} strokeWidth={1.8} className="text-emerald-400 transition-colors" />
                  ) : (
                    <Mail size={14} strokeWidth={1.8} className="text-[#9F9F9F] group-hover:text-white transition-colors" />
                  )}
                </div>
                <span className="whitespace-nowrap font-light text-white/60 group-hover:text-white transition-colors">
                  {copied ? 'Copied!' : 'Email Me'}
                </span>
              </motion.button>
            </div>

            {/* 3. LinkedIn button */}
            <motion.a 
              href={`https://${CONTACT_INFO.linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              whileTap={{ scale: 0.96 }}
              className="w-full h-11 group flex items-center justify-center gap-0 lg:gap-1.5 xl:gap-2 bg-white/[0.03] border border-white/[0.08] px-2 md:px-2.5 lg:px-3.5 xl:px-4 rounded-full text-[12.5px] lg:text-[13.5px] xl:text-[14px] font-light text-white/60 hover:text-white hover:bg-[#ff6900] hover:border-[#ff6900] transition-all duration-300 cursor-pointer select-none backdrop-blur-lg"
            >
              <div className="hidden lg:flex w-3.5 h-3.5 items-center justify-center shrink-0">
                <Linkedin size={14} strokeWidth={1.8} className="text-[#9F9F9F] group-hover:text-white transition-colors" />
              </div>
              <span className="whitespace-nowrap font-light text-white/60 group-hover:text-white transition-colors">Linkedin</span>
            </motion.a>

            {/* 4. Journal button (placed right next to Book a Call, no active highlight) */}
            <motion.div whileTap={{ scale: 0.96 }} className="w-full">
              <Link 
                to="/journal" 
                onClick={handleJournalClick}
                className="w-full h-11 group flex items-center justify-center gap-0 lg:gap-1.5 xl:gap-2 bg-white/[0.03] border border-white/[0.08] px-2 md:px-2.5 lg:px-3.5 xl:px-4 rounded-full text-[12.5px] lg:text-[13.5px] xl:text-[14px] font-light text-white/60 hover:text-white hover:bg-[#ff6900] hover:border-[#ff6900] transition-all duration-300 cursor-pointer select-none backdrop-blur-lg"
              >
                <div className="hidden lg:flex w-3.5 h-3.5 items-center justify-center shrink-0">
                  <BookOpen size={14} strokeWidth={1.8} className="text-[#9F9F9F] group-hover:text-white transition-colors" />
                </div>
                <span className="whitespace-nowrap font-light text-white/60 group-hover:text-white transition-colors">Journal</span>
              </Link>
            </motion.div>

            {/* 5. Book a Call button */}
            <motion.button 
              type="button"
              id="footer-schedule-btn"
              onClick={openScheduleModal}
              whileTap={{ scale: 0.96 }}
              className="w-full h-11 group flex items-center justify-center gap-0 lg:gap-1.5 xl:gap-2 bg-white/[0.03] border border-white/[0.08] px-2 md:px-2.5 lg:px-3.5 xl:px-4 rounded-full text-[12.5px] lg:text-[13.5px] xl:text-[14px] font-light text-white/60 hover:text-white hover:bg-[#ff6900] hover:border-[#ff6900] active:bg-[#e05d00] active:border-[#e05d00] transition-all duration-300 cursor-pointer select-none backdrop-blur-lg"
            >
              <div className="hidden lg:flex w-3.5 h-3.5 items-center justify-center shrink-0">
                <CalendarPlus size={14} strokeWidth={1.8} className="text-[#9F9F9F] group-hover:text-white transition-colors" />
              </div>
              <span className="whitespace-nowrap font-light text-white/60 group-hover:text-white transition-colors">Book a Call</span>
            </motion.button>

            {/* 6. Download CV button */}
            <motion.button 
              type="button"
              id="footer-cv-btn"
              onClick={openCvModal}
              whileTap={{ scale: 0.96 }}
              className="w-full h-11 group flex items-center justify-center gap-0 lg:gap-1.5 xl:gap-2 bg-white/[0.03] border border-white/[0.08] px-2 md:px-2.5 lg:px-3.5 xl:px-4 rounded-full text-[12.5px] lg:text-[13.5px] xl:text-[14px] font-light text-white/60 hover:text-white hover:bg-[#ff6900] hover:border-[#ff6900] transition-all duration-300 cursor-pointer select-none backdrop-blur-lg"
            >
              <div className="hidden lg:flex w-3.5 h-3.5 items-center justify-center shrink-0">
                <Download size={14} strokeWidth={1.8} className="text-[#9F9F9F] group-hover:text-white transition-colors" />
              </div>
              <span className="whitespace-nowrap font-light text-white/60 group-hover:text-white transition-colors">Download CV</span>
            </motion.button>
          </div>

          {/* MOBILE Buttons Stack (on screens smaller than md) */}
          <div className="flex md:hidden flex-col gap-2 w-full">
            {/* 1. Mobile About button */}
            <Link 
              to="/about" 
              onClick={handleAboutClick}
              className="w-full h-11 px-5 rounded-full bg-[#0d0d0d] text-white border border-white/[0.18] text-[14px] font-normal hover:bg-[#ff6900] hover:text-white hover:border-[#ff6900] transition-all flex items-center justify-center cursor-pointer select-none group"
            >
              <span>About</span>
            </Link>

            {/* 2. Mobile Journal button (placed directly under About, no icon, white text) */}
            <Link 
              to="/journal" 
              onClick={handleJournalClick}
              className="w-full h-11 px-5 rounded-full bg-[#0d0d0d] text-white border border-white/[0.18] text-[14px] font-normal hover:bg-[#ff6900] hover:text-white hover:border-[#ff6900] transition-all flex items-center justify-center cursor-pointer select-none group"
            >
              <span>Journal</span>
            </Link>

            {/* 3. Mobile Email button */}
            <button
              type="button"
              onClick={handleCopy}
              className="w-full h-11 px-5 rounded-full bg-[#0d0d0d] text-white border border-white/[0.18] text-[14px] font-normal hover:bg-[#ff6900] hover:text-white hover:border-[#ff6900] transition-all flex items-center justify-center cursor-pointer select-none group"
            >
              {copied ? (
                <span className="text-emerald-400">Copied to clipboard!</span>
              ) : (
                <span>Email</span>
              )}
            </button>

            {/* 4. Mobile LinkedIn button */}
            <a 
              href={`https://${CONTACT_INFO.linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full h-11 px-5 rounded-full bg-[#0d0d0d] text-white border border-white/[0.18] text-[14px] font-normal hover:bg-[#ff6900] hover:text-white hover:border-[#ff6900] transition-all flex items-center justify-center cursor-pointer select-none group"
            >
              <span>Linkedin</span>
            </a>

            {/* 5 & 6. Mobile Book a Call + Download CV buttons placed side-by-side in one row */}
            <div className="grid grid-cols-2 gap-2 w-full">
              <motion.button 
                type="button"
                id="footer-schedule-btn-mobile"
                onClick={openScheduleModal}
                whileTap={{ scale: 0.98 }}
                className="group w-full h-11 px-2 sm:px-4 rounded-full bg-white/[0.03] border border-white/[0.08] text-[13px] sm:text-[14px] font-light text-white/60 hover:text-white hover:bg-[#ff6900] hover:border-[#ff6900] transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer select-none backdrop-blur-lg"
              >
                <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                  <CalendarPlus size={14} strokeWidth={1.8} className="text-[#9F9F9F] group-hover:text-white transition-colors" />
                </div>
                <span className="whitespace-nowrap font-light text-white/60 group-hover:text-white transition-colors">Book a Call</span>
              </motion.button>

              <motion.button 
                type="button"
                id="footer-cv-btn-mobile"
                onClick={openCvModal}
                whileTap={{ scale: 0.98 }}
                className="group w-full h-11 px-2 sm:px-4 rounded-full bg-white/[0.03] border border-white/[0.08] text-[13px] sm:text-[14px] font-light text-white/60 hover:text-white hover:bg-[#ff6900] hover:border-[#ff6900] transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer select-none backdrop-blur-lg"
              >
                <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                  <Download size={14} strokeWidth={1.8} className="text-[#9F9F9F] group-hover:text-white transition-colors" />
                </div>
                <span className="whitespace-nowrap font-light text-white/60 group-hover:text-white transition-colors">Download CV</span>
              </motion.button>
            </div>
          </div>

        </div>

        {/* Unified single inscription: Copyright, Legal & Credit */}
        <div className="mt-6 md:mt-8 text-[12px] sm:text-[13px] xl:text-[14px] leading-[20px] text-white/25 font-light flex flex-wrap lg:flex-nowrap items-center justify-center gap-x-1.5 gap-y-1 text-center w-full mx-auto whitespace-normal lg:whitespace-nowrap">
          <span>© {currentYear} Yukhnin Design. All rights reserved.</span>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              openPrivacyModal();
            }}
            className="underline underline-offset-2 hover:text-white/60 transition-colors cursor-pointer inline"
          >
            Privacy policy.
          </button>
          <span className="text-white/15">·</span>
          <span>Crafted at the intersection of AI technology and design thinking by Igor Yukhnin</span>
        </div>
      </div>
    </footer>
  );
}





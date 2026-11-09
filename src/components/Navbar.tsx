
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  MessageCircle, 
  LayoutGrid, 
  Workflow, 
  Star, 
  MonitorSmartphone, 
  CalendarPlus,
  Phone,
  ChevronRight,
  ArrowRight,
  Check,
  BookOpen
} from 'lucide-react';
import { CONTACT_INFO, PROJECTS } from '../data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../utils/scroll';
import { useCvModal } from '../context/CvModalContext';
import { useScheduleModal } from '../context/ScheduleModalContext';
import { usePageTransition } from '../context/PageTransitionContext';
import { usePrivacyModal } from '../context/PrivacyModalContext';
import { useSplash } from '../context/SplashContext';

export default function Navbar() {
  const { isSiteRevealed } = useSplash();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWorksExpanded, setIsWorksExpanded] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') return window.innerWidth >= 1280;
    return false;
  });

  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { openCvModal } = useCvModal();
  const { openScheduleModal } = useScheduleModal();
  const { openPrivacyModal } = usePrivacyModal();
  const { navigateToHomeSection, navigateToHomeTop, navigateToJournal } = usePageTransition();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);

      // Top of page check
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY <= 20) {
        setIsCollapsed(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Delta detection for seamless collapse on scroll down and immediate expand on scroll up
      const delta = currentScrollY - lastScrollY.current;
      if (Math.abs(delta) >= 3) {
        if (delta > 0) {
          // Scrolling down -> smoothly collapse into circles
          setIsCollapsed(true);
        } else {
          // Scrolling up -> immediately expand back out smoothly from anywhere on the page
          setIsCollapsed(false);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsWorksExpanded(false);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(CONTACT_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      window.location.href = `mailto:${CONTACT_INFO.email}`;
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMobileMenu();
    navigateToHomeTop();
  };

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    closeMobileMenu();
    const sectionId = path.replace('/#', '');
    if (location.pathname === '/' || location.pathname === '') {
      scrollToSection(sectionId);
      window.history.pushState(null, '', path);
    } else {
      navigateToHomeSection(sectionId);
    }
  };

  return (
    <>
      <nav className="fixed top-6 left-0 w-full z-50 bg-transparent border-none pointer-events-none">
        <div className="container-custom w-full relative flex items-center justify-between">
          <Link to="/" onClick={handleLogoClick} className="pointer-events-auto">
            <div className={`px-5 h-12 flex items-center rounded-full border backdrop-blur-lg transition-all duration-500 ${
              isScrolled 
                ? 'bg-[#0a0a0c]/45 border-white/[0.12] hover:bg-[#0a0a0c]/65 hover:border-white/[0.17]' 
                : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.07] hover:border-white/[0.12]'
            }`}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={isSiteRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center"
              >
                <img 
                  src="/rocksta_logo_3.svg" 
                  alt="YUKHNIN DSGN" 
                  className="h-[14px] md:h-[15px] w-auto block" 
                />
              </motion.div>
            </div>
          </Link>
          
          {/* Centered navigation capsule + Journal strictly aligned together on the page central axis */}
          <div className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-2 pointer-events-auto z-20">
            {/* Main navigation capsule */}
            <div 
              onMouseLeave={() => setHoveredIdx(null)}
              className={`flex items-stretch gap-[4px] p-[5px] h-12 rounded-full border backdrop-blur-lg transition-all duration-500 ${
                isScrolled 
                  ? 'bg-[#0a0a0c]/45 border-white/[0.12] hover:bg-[#0a0a0c]/65 hover:border-white/[0.17]' 
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.07] hover:border-white/[0.12]'
              }`}
            >
              {[
                { label: 'Works', path: '/#work', icon: LayoutGrid },
                { label: 'Services', path: '/#services', icon: MonitorSmartphone },
                { label: 'How I Work', path: '/#skills', icon: Workflow },
                { label: 'Client Reviews', path: '/#testimonials', icon: Star },
                { label: 'Contact', path: '/#contact', icon: MessageCircle }
              ].map((item, index) => {
                const isHovered = hoveredIdx === index;
                const Icon = item.icon;
                return (
                  <Link 
                    key={index}
                    to={item.path} 
                    onClick={(e) => handleNavClick(e, item.path)}
                    onMouseEnter={() => setHoveredIdx(index)}
                    className="group relative px-3.5 rounded-full transition-colors text-[14px] font-light text-white/60 hover:text-white z-10 flex items-center gap-[7px] justify-center cursor-pointer select-none whitespace-nowrap"
                  >
                    {isHovered && (
                      <motion.span
                        layoutId="hover-nav-pill"
                        className="absolute inset-0 bg-white/[0.08] border border-white/[0.12] rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                    <div className="hidden lg:flex w-3.5 h-3.5 items-center justify-center shrink-0">
                      <Icon size={14} strokeWidth={1.8} className="text-[#9F9F9F] group-hover:text-white transition-colors" />
                    </div>
                    <span className="whitespace-nowrap">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Journal Button (matching main navigation menu styling) */}
            <Link
              to="/journal"
              onClick={(e) => {
                e.preventDefault();
                navigateToJournal();
              }}
              id="navbar-journal-btn"
              aria-label="Journal"
              title="Journal"
              className={`group flex items-center justify-center w-12 h-12 xl:w-auto xl:h-12 xl:px-4 xl:gap-[7px] rounded-full border backdrop-blur-lg text-[14px] font-light transition-all duration-300 cursor-pointer select-none active:scale-95 ${
                isScrolled
                  ? 'bg-[#0a0a0c]/45 border-white/[0.12] hover:bg-[#0a0a0c]/65 hover:border-white/[0.17]'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.07] hover:border-white/[0.12]'
              }`}
            >
              <BookOpen size={18} strokeWidth={1.4} className="xl:hidden text-[#9F9F9F] group-hover:text-white transition-colors shrink-0" />
              <div className="hidden xl:flex w-3.5 h-3.5 items-center justify-center shrink-0">
                <BookOpen size={14} strokeWidth={1.8} className="text-[#9F9F9F] group-hover:text-white transition-colors" />
              </div>
              <span className="hidden xl:inline whitespace-nowrap font-light text-white/60 group-hover:text-white transition-colors">Journal</span>
            </Link>
          </div>

          {/* Action buttons on the right */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Journal Button for small screens and tablets when central bar is hidden */}
            <Link
              to="/journal"
              onClick={(e) => {
                e.preventDefault();
                navigateToJournal();
              }}
              aria-label="Journal"
              title="Journal"
              className={`group hidden sm:flex xl:hidden items-center justify-center w-12 h-12 rounded-full border backdrop-blur-lg text-[14px] font-light transition-all duration-300 cursor-pointer select-none active:scale-95 ${
                isScrolled
                  ? 'bg-[#0a0a0c]/45 border-white/[0.12] hover:bg-[#0a0a0c]/65 hover:border-white/[0.17]'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.07] hover:border-white/[0.12]'
              }`}
            >
              <BookOpen size={18} strokeWidth={1.4} className="text-[#9F9F9F] group-hover:text-white transition-colors shrink-0" />
            </Link>

            {/* Book a Call button - on mobile: round icon button with white phone; on sm+: full pill with text */}
            <motion.button 
              type="button"
              id="navbar-schedule-btn"
              onClick={openScheduleModal}
              aria-label="Book a Call"
              title="Book a Call"
              whileTap={{ scale: 0.94 }}
              className={`group flex items-center justify-center w-12 h-12 sm:w-auto sm:h-12 p-0 sm:px-4 sm:gap-[7px] rounded-full border backdrop-blur-lg text-[14px] font-light transition-all duration-300 cursor-pointer select-none shrink-0 active:scale-95 ${
                isScrolled
                  ? 'bg-[#0a0a0c]/45 border-white/[0.12] hover:bg-[#ff6900] hover:border-[#ff6900]'
                  : 'bg-white/[0.03] border-white/[0.07] hover:bg-[#ff6900] hover:border-[#ff6900]'
              }`}
            >
              <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                <Phone size={14} strokeWidth={1.8} className="text-white sm:text-[#9F9F9F] sm:group-hover:text-white transition-colors" />
              </div>
              <span className="hidden sm:inline whitespace-nowrap font-light text-[14px] text-white/60 group-hover:text-white transition-colors">
                Book a Call
              </span>
            </motion.button>

            {/* Desktop CV button - styled in menu style, turns orange on hover */}
            <motion.button 
              type="button"
              id="navbar-cv-btn"
              onClick={openCvModal}
              aria-label="CV"
              title="CV"
              whileTap={{ scale: 0.94 }}
              className={`group hidden xl:flex items-center justify-center h-12 px-4 gap-[7px] rounded-full border backdrop-blur-lg text-[14px] font-light transition-all duration-300 cursor-pointer select-none shrink-0 active:scale-95 ${
                isScrolled
                  ? 'bg-[#0a0a0c]/45 border-white/[0.12] hover:bg-[#ff6900] hover:border-[#ff6900]'
                  : 'bg-white/[0.03] border-white/[0.07] hover:bg-[#ff6900] hover:border-[#ff6900]'
              }`}
            >
              <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                <Download size={14} strokeWidth={1.8} className="text-[#9F9F9F] group-hover:text-white transition-colors" />
              </div>
              <span className="whitespace-nowrap font-light text-[14px] text-white/60 group-hover:text-white transition-colors">
                CV
              </span>
            </motion.button>

              {/* Mobile / Tablet Round White Burger Menu Button */}
              <motion.button
                type="button"
                id="navbar-burger-btn"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.92 }}
                className="flex xl:hidden items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:bg-[#ff6900] hover:text-white transition-colors cursor-pointer select-none shrink-0 z-50 shadow-md"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 pointer-events-none"
                >
                  <motion.path
                    animate={
                      isMobileMenuOpen
                        ? { d: "M 5 5 L 19 19" }
                        : { d: "M 4 6 L 20 6" }
                    }
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M 4 12 L 20 12"
                    animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                  />
                  <motion.path
                    animate={
                      isMobileMenuOpen
                        ? { d: "M 5 19 L 19 5" }
                        : { d: "M 4 18 L 20 18" }
                    }
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  />
                </svg>
              </motion.button>
            </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#080808]/96 backdrop-blur-2xl pointer-events-auto flex flex-col justify-between pt-24 pb-8 overflow-y-auto xl:hidden"
          >
            <div className="container-custom w-full flex-1 flex flex-col justify-between">
              {/* Top Navigation Stack */}
              <div className="flex flex-col w-full max-w-md md:max-w-none mx-auto mt-2">
                {/* 1. About Me */}
                <Link
                  to="/about"
                  onClick={closeMobileMenu}
                  className="text-2xl font-light text-white hover:text-[#ff6900] transition-colors py-4 flex items-center justify-between group"
                >
                  <span>About Me</span>
                  <ArrowRight size={20} strokeWidth={1.8} className="text-white group-hover:text-[#ff6900] transition-colors" />
                </Link>

                <div className="w-full h-px bg-white/[0.08] my-2" />

                {/* Journal */}
                <Link
                  to="/journal"
                  onClick={() => {
                    closeMobileMenu();
                    navigateToJournal();
                  }}
                  className="text-2xl font-light text-white hover:text-[#ff6900] transition-colors py-4 flex items-center justify-between group"
                >
                  <span>Journal</span>
                  <ArrowRight size={20} strokeWidth={1.8} className="text-white group-hover:text-[#ff6900] transition-colors" />
                </Link>

                <div className="w-full h-px bg-white/[0.08] my-2" />

                {/* 2. My Works (Expandable list with projects) */}
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setIsWorksExpanded(!isWorksExpanded)}
                    className="text-2xl font-light text-white hover:text-[#ff6900] transition-colors py-4 flex items-center justify-between group cursor-pointer text-left w-full select-none"
                  >
                    <span>My Works</span>
                    <motion.div
                      animate={{ rotate: isWorksExpanded ? 90 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronRight size={18} strokeWidth={2} className="text-white" />
                    </motion.div>
                  </button>

                  {/* Divider under My Works (hidden when expanded) */}
                  {!isWorksExpanded && (
                    <div className="w-full h-px bg-white/[0.08] my-2" />
                  )}

                  <AnimatePresence>
                    {isWorksExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden flex flex-col gap-2 pb-2"
                      >
                        {PROJECTS.slice(0, 3).map((project, idx) => (
                          <Link
                            key={project.id}
                            to={`/case-study/${project.id}`}
                            onClick={closeMobileMenu}
                            className="group py-2 flex items-center justify-between text-white/80 hover:text-white transition-colors"
                          >
                            <div className="flex flex-col">
                              <span className="text-base font-light group-hover:text-[#ff6900] transition-colors">
                                {project.title}
                              </span>
                              <span className="text-xs text-white/40">
                                {project.tags?.[0] || 'Case Study'}
                              </span>
                            </div>
                            <span className="text-[11px] leading-[16px] font-light tracking-[0.14em] uppercase text-white/40 font-sans group-hover:text-white transition-colors">
                              0{idx + 1}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom Action Buttons: Stick to bottom (mt-auto), Download CV on top, Email & Linkedin on 1 row, 10px gaps */}
              <div className="w-full max-w-md md:max-w-xl mx-auto flex flex-col gap-2.5 mt-auto pt-6">
                {/* White Download CV button */}
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    openCvModal();
                  }}
                  className="relative -top-[2px] w-full h-12 px-5 rounded-full bg-white text-black text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-[#ff6900] hover:text-white transition-all duration-200 cursor-pointer shadow-md select-none active:scale-98 group"
                >
                  <Download size={16} strokeWidth={2} className="text-black group-hover:text-white transition-colors" />
                  <span>Download CV</span>
                </button>

                {/* Email and Linkedin on the same line with 10px gap */}
                <div className="grid grid-cols-2 gap-2.5 w-full">
                  {/* Mobile Email button */}
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="w-full h-12 px-4 rounded-full bg-[#0d0d0d] text-white border border-white/[0.18] text-[14px] font-normal hover:bg-[#ff6900] hover:text-white hover:border-[#ff6900] transition-all flex items-center justify-center cursor-pointer select-none"
                  >
                    <span className="flex items-center gap-2">
                      {copiedEmail ? (
                        <>
                          <Check size={16} className="text-emerald-400 shrink-0" />
                          <span className="text-[13px]">Copied!</span>
                        </>
                      ) : (
                        <span>Email Me</span>
                      )}
                    </span>
                  </button>

                  {/* Mobile LinkedIn button */}
                  <a
                    href={`https://${CONTACT_INFO.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 px-4 rounded-full bg-[#0d0d0d] text-white border border-white/[0.18] text-[14px] font-normal hover:bg-[#ff6900] hover:text-white hover:border-[#ff6900] transition-all flex items-center justify-center cursor-pointer select-none"
                  >
                    <span>Linkedin</span>
                  </a>
                </div>

                {/* Copyright & Privacy Policy (exact match with footer) */}
                <div className="text-[13px] leading-[18px] text-white/40 font-light text-center pt-2 select-none">
                  <span>© 2026 Yukhnin Design. All rights reserved.{' '}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      closeMobileMenu();
                      openPrivacyModal();
                    }}
                    className="underline underline-offset-2 hover:text-white transition-colors cursor-pointer inline"
                  >
                    Privacy policy.
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

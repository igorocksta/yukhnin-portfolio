import React, { useState, useEffect, useCallback, useRef } from 'react';

export interface NavSection {
  id: string;
  label: string;
  shortLabel?: string;
}

interface CaseStudyNavRailProps {
  sections?: NavSection[];
}

const DEFAULT_SECTIONS: NavSection[] = [
  { id: 'case-hero', label: 'Overview', shortLabel: 'Overview' },
  { id: 'case-about', label: 'About the Project', shortLabel: 'Context' },
  { id: 'case-outcomes', label: 'Key Outcomes', shortLabel: 'Outcomes' },
  { id: 'case-problem', label: 'Problem Statement', shortLabel: 'Problem' },
  { id: 'case-approach', label: 'Design Approach', shortLabel: 'Approach' },
  { id: 'case-contribution', label: 'My Contribution', shortLabel: 'Contribution' },
  { id: 'case-results', label: 'Results & Impact', shortLabel: 'Results' },
  { id: 'case-reflection', label: 'What I Learned', shortLabel: 'Reflection' },
  { id: 'case-study-testimonial', label: 'Project Feedback', shortLabel: 'Feedback' },
  { id: 'case-next-project', label: 'Next Case Study', shortLabel: 'Next Case' },
];

export const CaseStudyNavRail: React.FC<CaseStudyNavRailProps> = ({ sections = DEFAULT_SECTIONS }) => {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || 'case-hero');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [showActiveLabel, setShowActiveLabel] = useState<boolean>(true);
  const isClickingRef = useRef<boolean>(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const prevActiveIdRef = useRef<string>(activeId);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Filter sections that actually exist on the current page
  const [availableSections, setAvailableSections] = useState<NavSection[]>(sections);

  const resetHideTimer = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    setShowActiveLabel(true);
    hideTimerRef.current = setTimeout(() => {
      setShowActiveLabel(false);
    }, 3000);
  }, []);

  const cleanupScroll = useCallback(() => {
    document.documentElement.classList.remove('is-smooth-scrolling');
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
    isClickingRef.current = false;
  }, []);

  // Initial 3s display on load, then auto-hide
  useEffect(() => {
    resetHideTimer();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      cleanupScroll();
    };
  }, [resetHideTimer, cleanupScroll]);

  // Show active label for 3s when active section changes upon scrolling
  useEffect(() => {
    if (prevActiveIdRef.current !== activeId) {
      prevActiveIdRef.current = activeId;
      if (!isHovered) {
        resetHideTimer();
      }
    }
  }, [activeId, isHovered, resetHideTimer]);

  useEffect(() => {
    const checkExisting = () => {
      const existing = sections.filter((s) => !!document.getElementById(s.id));
      if (existing.length > 0) {
        setAvailableSections(existing);
      } else {
        setAvailableSections(sections);
      }
    };

    checkExisting();
    const timer = setTimeout(checkExisting, 500);
    return () => clearTimeout(timer);
  }, [sections]);

  // Scroll spy to detect active section with 100% accurate document offset calculation
  const updateActiveSection = useCallback(() => {
    if (isClickingRef.current) return;

    const scrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const triggerY = scrollY + viewportHeight * 0.35;

    // Check if scrolled near bottom of page
    if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80) {
      if (availableSections.length > 0) {
        setActiveId(availableSections[availableSections.length - 1].id);
        return;
      }
    }

    let current = availableSections[0]?.id || '';

    for (let i = 0; i < availableSections.length; i++) {
      const el = document.getElementById(availableSections[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        if (top <= triggerY) {
          current = availableSections[i].id;
        }
      }
    }

    if (current) {
      setActiveId(current);
    }
  }, [availableSections]);

  useEffect(() => {
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [updateActiveSection]);

  // Allow user to break out of programmatic smooth scroll via strong manual wheel roll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isClickingRef.current && Math.abs(e.deltaY) > 40) {
        cleanupScroll();
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [cleanupScroll]);

  // Seamless, zero-stutter hardware-accelerated scroll to target section
  const scrollToSection = (id: string) => {
    // 1. Instant UI response: set active state immediately without lag
    setActiveId(id);
    resetHideTimer();
    isClickingRef.current = true;

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);

    const element = document.getElementById(id);
    if (!element && id !== 'case-hero') {
      isClickingRef.current = false;
      return;
    }

    const currentScrollY = window.scrollY || window.pageYOffset;
    let targetY = 0;

    if (id === 'case-hero') {
      targetY = 0;
    } else if (id === 'case-next-project') {
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      if (element) {
        const elTop = element.getBoundingClientRect().top + currentScrollY - 60;
        targetY = Math.min(maxScroll, Math.max(0, elTop));
      } else {
        targetY = maxScroll;
      }
    } else if (element) {
      const elTop = element.getBoundingClientRect().top + currentScrollY;
      const offset = 80; // Clear the fixed top header comfortably
      targetY = Math.max(0, elTop - offset);
    }

    const distance = Math.abs(targetY - currentScrollY);
    if (distance < 3) {
      isClickingRef.current = false;
      return;
    }

    // 2. Suppress heavy backdrop-blurs, hover triggers, and SVG filter thrashing across passing elements
    document.documentElement.classList.add('is-smooth-scrolling');

    // 3. Native hardware-accelerated compositor smooth scroll (runs on GPU thread at 60/120 FPS)
    try {
      window.scrollTo({
        top: Math.round(targetY),
        behavior: 'smooth'
      });
    } catch {
      window.scrollTo(0, Math.round(targetY));
    }

    // 4. Detect when the smooth scroll has finished landing
    const onScrollCheck = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        window.removeEventListener('scroll', onScrollCheck);
        cleanupScroll();
      }, 100);
    };

    window.addEventListener('scroll', onScrollCheck, { passive: true });

    // Safety fallback: guaranteed cleanup after maximum scroll duration
    safetyTimeoutRef.current = setTimeout(() => {
      window.removeEventListener('scroll', onScrollCheck);
      cleanupScroll();
    }, 1100);
  };

  const handleMouseEnter = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    setIsHovered(true);
    setShowActiveLabel(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredIdx(null);
    resetHideTimer();
  };

  return (
    <nav 
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-1.5 select-none pointer-events-none"
      onMouseLeave={handleMouseLeave}
      aria-label="Case Study Section Navigation"
    >
      {/* Hit area strictly restricted to the dashes rail + 8px padding */}
      <div 
        className="absolute -top-2 -bottom-2 -right-4 md:-right-6 w-[52px] md:w-[60px] pointer-events-auto -z-10"
        onMouseEnter={handleMouseEnter}
      />

      {availableSections.map((sec, idx) => {
        const isActive = sec.id === activeId;
        const isItemHovered = hoveredIdx === idx;

        let labelClasses = 'opacity-0 translate-x-2';
        
        if (isHovered) {
          if (isActive) {
            labelClasses = 'text-white font-medium opacity-100 translate-x-0';
          } else if (isItemHovered) {
            labelClasses = 'text-white font-normal opacity-100 translate-x-0';
          } else {
            labelClasses = 'text-white/40 font-light opacity-80 translate-x-0';
          }
        } else if (isActive && showActiveLabel) {
          labelClasses = 'text-white/40 font-normal opacity-100 translate-x-0';
        }

        return (
          <button
            key={sec.id}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              scrollToSection(sec.id);
            }}
            onMouseEnter={() => {
              if (isHovered) setHoveredIdx(idx);
            }}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`group flex items-center justify-end gap-3.5 focus:outline-none cursor-pointer py-1.5 ${
              isHovered ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            aria-label={`Scroll to ${sec.label}`}
          >
            {/* Title text directly over screen with clean readability */}
            <span
              className={`text-[10px] font-sans tracking-[0.14em] uppercase whitespace-nowrap transition-all duration-300 pointer-events-none ${labelClasses}`}
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.60)' }}
            >
              {sec.label}
            </span>

            {/* Minimalist Sharp-Cornered Tick Bar */}
            <span
              className={`block rounded-none transition-all duration-300 ease-out flex-shrink-0 pointer-events-auto ${
                isActive
                  ? 'w-7 h-[2px] bg-[#ff6900] shadow-[0_0_8px_rgba(255,105,0,0.6)]'
                  : isItemHovered
                  ? 'w-5 h-[1.5px] bg-white/90'
                  : isHovered
                  ? 'w-3.5 h-[1.5px] bg-white/40'
                  : 'w-3.5 h-[1.5px] bg-white/25'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
};

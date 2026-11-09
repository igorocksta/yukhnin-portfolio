import React, { createContext, useContext, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { flushSync } from 'react-dom';
import { scrollToSection, scrollToTop, getSectionElement, calculateSectionScrollY } from '../utils/scroll';

interface PageTransitionContextType {
  navigateToHomeTop: () => void;
  navigateToHomeSection: (sectionId: string) => void;
  navigateToCaseStudy: (projectIdOrPath: string) => void;
  navigateToAbout: () => void;
  navigateToJournal: () => void;
  navigateToPath: (path: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  navigateToHomeTop: () => {},
  navigateToHomeSection: () => {},
  navigateToCaseStudy: () => {},
  navigateToAbout: () => {},
  navigateToJournal: () => {},
  navigateToPath: () => {},
});

export const usePageTransition = () => useContext(PageTransitionContext);

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const alignIntervalRef = useRef<NodeJS.Timeout[]>([]);

  const clearAlignIntervals = () => {
    alignIntervalRef.current.forEach(timer => clearTimeout(timer));
    alignIntervalRef.current = [];
  };

  const navigateToHomeTop = useCallback(() => {
    clearAlignIntervals();
    
    sessionStorage.removeItem('pending_instant_scroll_section');
    sessionStorage.setItem('pending_scroll_to_top', 'true');
    sessionStorage.setItem('portfolio_last_active_path', '/');
    sessionStorage.removeItem('is_page_transitioning');

    const isHome = location.pathname === '/' || location.pathname === '';

    if (isHome) {
      if (window.location.hash) {
        window.history.pushState(null, '', '/');
      }
      if (window.scrollY > 20) {
        scrollToTop();
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      }
      return;
    }

    // Immediately navigate with flushSync for instant zero-latency transition
    navigate('/', { flushSync: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;

    const tCleanup = setTimeout(() => {
      sessionStorage.removeItem('pending_scroll_to_top');
    }, 100);
    alignIntervalRef.current.push(tCleanup);
  }, [location.pathname, navigate]);

  const navigateToHomeSection = useCallback((sectionId: string) => {
    const cleanId = sectionId.replace('#', '').replace('/', '');
    const isHome = location.pathname === '/' || location.pathname === '';

    if (isHome) {
      // If already on the home page, smoothly scroll directly to the section
      window.history.pushState(null, '', `/#${cleanId}`);
      scrollToSection(cleanId);
      return;
    }

    clearAlignIntervals();
    sessionStorage.setItem('pending_instant_scroll_section', cleanId);
    sessionStorage.setItem('portfolio_last_active_path', '/');

    // Immediately navigate with flushSync to guarantee instant DOM swap
    navigate(`/#${cleanId}`, { flushSync: true });

    const performAlign = () => {
      const el = getSectionElement(cleanId);
      if (el) {
        const targetY = calculateSectionScrollY(el);
        window.scrollTo({ top: targetY, left: 0, behavior: 'instant' as ScrollBehavior });
        if (document.documentElement) document.documentElement.scrollTop = targetY;
        if (document.body) document.body.scrollTop = targetY;
        return true;
      }
      return false;
    };

    performAlign();
    requestAnimationFrame(performAlign);

    // Staggered retries to absorb dynamic hero 3D / fonts / layout changes
    const t1 = setTimeout(performAlign, 40);
    const t2 = setTimeout(performAlign, 120);
    const t3 = setTimeout(performAlign, 250);
    const t4 = setTimeout(performAlign, 450);

    const tCleanup = setTimeout(() => {
      sessionStorage.removeItem('pending_instant_scroll_section');
    }, 600);

    alignIntervalRef.current.push(t1, t2, t3, t4, tCleanup);
  }, [location.pathname, navigate]);

  const lastNavTimeRef = useRef<number>(0);

  const navigateToCaseStudy = useCallback((projectIdOrPath: string) => {
    const now = Date.now();
    if (now - lastNavTimeRef.current < 250) {
      return;
    }
    lastNavTimeRef.current = now;

    const targetPath = projectIdOrPath.startsWith('/')
      ? projectIdOrPath
      : `/case-study/${projectIdOrPath}`;

    if (location.pathname === targetPath) {
      scrollToTop();
      return;
    }

    clearAlignIntervals();
    sessionStorage.removeItem('pending_instant_scroll_section');
    sessionStorage.setItem('pending_scroll_to_top', 'true');
    sessionStorage.setItem('portfolio_last_active_path', targetPath);

    // Instant synchronous route transition without React 19 transition delay
    try {
      flushSync(() => {
        navigate(targetPath);
      });
    } catch {
      navigate(targetPath);
    }

    // Reset scroll on the newly mounted page
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;

    const tCleanup = setTimeout(() => {
      sessionStorage.removeItem('pending_scroll_to_top');
    }, 150);

    alignIntervalRef.current.push(tCleanup);
  }, [location.pathname, navigate]);

  const navigateToAbout = useCallback(() => {
    if (location.pathname === '/about') {
      scrollToTop();
      return;
    }

    clearAlignIntervals();
    sessionStorage.removeItem('pending_instant_scroll_section');
    sessionStorage.setItem('pending_scroll_to_top', 'true');
    sessionStorage.setItem('portfolio_last_active_path', '/about');

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    resetScroll();
    navigate('/about');
    requestAnimationFrame(resetScroll);

    const t1 = setTimeout(resetScroll, 20);
    const t2 = setTimeout(resetScroll, 60);
    const tCleanup = setTimeout(() => {
      sessionStorage.removeItem('pending_scroll_to_top');
    }, 200);

    alignIntervalRef.current.push(t1, t2, tCleanup);
  }, [location.pathname, navigate]);

  const navigateToJournal = useCallback(() => {
    if (location.pathname === '/journal') {
      scrollToTop();
      return;
    }

    clearAlignIntervals();
    sessionStorage.removeItem('pending_instant_scroll_section');
    sessionStorage.setItem('pending_scroll_to_top', 'true');
    sessionStorage.setItem('portfolio_last_active_path', '/journal');

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    resetScroll();
    navigate('/journal');
    requestAnimationFrame(resetScroll);

    const t1 = setTimeout(resetScroll, 20);
    const t2 = setTimeout(resetScroll, 60);
    const tCleanup = setTimeout(() => {
      sessionStorage.removeItem('pending_scroll_to_top');
    }, 200);

    alignIntervalRef.current.push(t1, t2, tCleanup);
  }, [location.pathname, navigate]);

  const navigateToPath = useCallback((path: string) => {
    if (path.startsWith('/case-study/')) {
      navigateToCaseStudy(path);
    } else if (path === '/about') {
      navigateToAbout();
    } else if (path === '/journal' || path.startsWith('/journal/')) {
      navigateToJournal();
    } else if (path === '/' || path === '') {
      navigateToHomeTop();
    } else if (path.startsWith('/#')) {
      navigateToHomeSection(path.replace('/#', ''));
    } else {
      navigate(path);
    }
  }, [navigateToCaseStudy, navigateToAbout, navigateToJournal, navigateToHomeTop, navigateToHomeSection, navigate]);

  return (
    <PageTransitionContext.Provider value={{ 
      navigateToHomeTop, 
      navigateToHomeSection, 
      navigateToCaseStudy, 
      navigateToAbout, 
      navigateToJournal,
      navigateToPath 
    }}>
      {children}
    </PageTransitionContext.Provider>
  );
};

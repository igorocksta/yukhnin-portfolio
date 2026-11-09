import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSectionElement, calculateSectionScrollY } from '../utils/scroll';

/**
 * Ensures the website always opens at the very top of the page on fresh visits,
 * page reloads, and route transitions (unless an explicit #hash target is specified).
 * Prevents unwanted restoration of bottom scroll positions.
 */
export default function ScrollPersistence() {
  const location = useLocation();
  const { pathname, hash } = location;

  // 1. Disable browser automatic scroll restoration and purge any legacy cached scroll positions
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    try {
      // Clear any legacy saved scroll positions from sessionStorage
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith('portfolio_scroll_') || key.startsWith('pending_scroll')) {
          sessionStorage.removeItem(key);
        }
      });
    } catch {
      // Ignore storage access errors in restricted contexts
    }
  }, []);

  // 2. Guarantee scroll position is at the very top on mount and on route changes without hash
  useLayoutEffect(() => {
    // If the home page was reloaded, always prioritize starting strictly at the very top
    const isReload =
      typeof window !== 'undefined' &&
      ((window.performance?.getEntriesByType?.('navigation')?.[0] as PerformanceNavigationTiming)?.type === 'reload' ||
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       (window.performance as any)?.navigation?.type === 1);

    if (isReload && (pathname === '/' || pathname === '')) {
      if (hash) {
        window.history.replaceState(null, '', '/');
      }
      const resetToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      };
      resetToTop();
      const rafId = requestAnimationFrame(resetToTop);
      const timeoutId = setTimeout(resetToTop, 60);
      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(timeoutId);
      };
    }

    // If an explicit section hash exists (e.g., /#work, /#works, /#contact)
    if (hash) {
      const cleanId = hash.replace('#', '');
      const alignToHash = () => {
        const el = getSectionElement(cleanId);
        if (el) {
          const targetY = calculateSectionScrollY(el);
          window.scrollTo({ top: targetY, left: 0, behavior: 'instant' as ScrollBehavior });
          if (document.documentElement) document.documentElement.scrollTop = targetY;
          if (document.body) document.body.scrollTop = targetY;
        }
      };

      // Attempt alignment immediately and across staggered ticks for async hero 3D and fonts
      alignToHash();
      const rafId = requestAnimationFrame(alignToHash);
      const t1 = setTimeout(alignToHash, 40);
      const t2 = setTimeout(alignToHash, 120);
      const t3 = setTimeout(alignToHash, 250);
      const t4 = setTimeout(alignToHash, 450);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }

    // Otherwise, ALWAYS start strictly at the top of the page (0, 0)
    const resetToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    resetToTop();
    const rafId = requestAnimationFrame(resetToTop);
    const timeoutId = setTimeout(resetToTop, 60);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [pathname, hash]);

  return null;
}

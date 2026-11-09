// Global tracker for smooth scroll animation and active cleanup
let currentAnimationFrameId: number | null = null;
let activeCleanup: (() => void) | null = null;

// Frictionless, continuous easeInOutCubic easing curve:
// Starts smoothly from rest, cruises effortlessly, and lands naturally into the target
// with ZERO artificial friction, braking hesitation, or crawl at the end.
function smoothEase(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Resolves any section reference flexibly (works, work, selected-works, testimonials, contact, etc.)
 */
export function getSectionElement(sectionId: string): HTMLElement | null {
  if (!sectionId) return null;
  const cleanId = sectionId.replace('#', '').replace('/', '').trim().toLowerCase();

  // If targeting works / work / selected-works:
  if (
    cleanId === 'work' ||
    cleanId === 'works' ||
    cleanId === 'selected-works' ||
    cleanId === 'selected_works' ||
    cleanId === 'selectedworks'
  ) {
    const candidate = 
      document.getElementById('work') ||
      document.getElementById('works') ||
      (document.querySelector('[data-section="works"]') as HTMLElement | null) ||
      (document.querySelector('[data-section="work"]') as HTMLElement | null) ||
      (document.querySelector('section#work') as HTMLElement | null) ||
      (document.querySelector('section#works') as HTMLElement | null);
    if (candidate) return candidate;
  }

  // Generic lookup: by exact ID or data-section or name
  return (
    document.getElementById(cleanId) ||
    document.getElementById(sectionId) ||
    (document.querySelector(`[data-section="${cleanId}"]`) as HTMLElement | null) ||
    (document.querySelector(`[name="${cleanId}"]`) as HTMLElement | null)
  );
}

/**
 * Calculates accurate scroll target position with floating navbar compensation
 */
export function calculateSectionScrollY(element: HTMLElement): number {
  const heading = element.querySelector('h2, h1, .container-custom');
  const targetElement = (heading as HTMLElement) || element;
  // Floating navbar: 48px height at top-6 (24px) = 72px total bottom.
  // 92px offset leaves an elegant 20px breathing space below the floating navbar.
  const navbarOffset = 92;
  const elementTop = targetElement.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || document.documentElement.scrollTop);
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return Math.min(maxScroll, Math.max(0, Math.round(elementTop - navbarOffset)));
}

export function smoothScrollTo(targetY: number, customDuration?: number, onComplete?: () => void) {
  // Cancel previous animation and cleanup previous state
  if (currentAnimationFrameId !== null) {
    cancelAnimationFrame(currentAnimationFrameId);
    currentAnimationFrameId = null;
  }
  if (activeCleanup) {
    activeCleanup();
    activeCleanup = null;
  }

  const startY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  const distance = targetY - startY;

  if (Math.abs(distance) < 2) {
    window.scrollTo(0, Math.round(targetY));
    onComplete?.();
    return;
  }

  // Responsive, fluid duration (480ms - 620ms) - swift glide, zero friction or dragging
  const minDuration = 480;
  const maxDuration = 620;
  const duration = customDuration ?? Math.min(maxDuration, Math.max(minDuration, Math.round(360 + Math.sqrt(Math.abs(distance)) * 6.0)));

  document.documentElement.classList.add('is-smooth-scrolling');
  document.body.classList.add('is-smooth-scrolling');

  const startTimestamp = performance.now();

  const onInterrupt = () => {
    cleanup();
    activeCleanup = null;
  };

  const cleanup = () => {
    document.documentElement.classList.remove('is-smooth-scrolling');
    document.body.classList.remove('is-smooth-scrolling');
    if (currentAnimationFrameId !== null) {
      cancelAnimationFrame(currentAnimationFrameId);
      currentAnimationFrameId = null;
    }
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('wheel', onInterrupt);
    window.removeEventListener('touchmove', onInterrupt);
  };

  activeCleanup = cleanup;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      cleanup();
      activeCleanup = null;
    }
  };
  window.addEventListener('keydown', onKeyDown, { passive: true });
  window.addEventListener('wheel', onInterrupt, { passive: true, once: true });
  window.addEventListener('touchmove', onInterrupt, { passive: true, once: true });

  const tick = (now: number) => {
    const elapsed = now - startTimestamp;
    const progress = Math.min(1, elapsed / duration);

    // Completely continuous, frictionless cubic ease-in-out
    const easedProgress = smoothEase(progress);
    const nextY = startY + distance * easedProgress;

    window.scrollTo(0, nextY);

    if (progress < 1) {
      currentAnimationFrameId = requestAnimationFrame(tick);
    } else {
      // Land cleanly on exact targetY coordinate
      window.scrollTo(0, targetY);
      cleanup();
      activeCleanup = null;
      onComplete?.();
    }
  };

  currentAnimationFrameId = requestAnimationFrame(tick);
}

export function scrollToSection(sectionId: string, customDuration?: number): boolean {
  const targetElement = getSectionElement(sectionId);
  if (targetElement) {
    const targetY = calculateSectionScrollY(targetElement);
    smoothScrollTo(targetY, customDuration);
    return true;
  }

  // If the target element isn't in the DOM yet (e.g. fast navigation), retry with intervals
  let attempts = 0;
  const retryInterval = setInterval(() => {
    attempts++;
    const el = getSectionElement(sectionId);
    if (el) {
      clearInterval(retryInterval);
      const targetY = calculateSectionScrollY(el);
      smoothScrollTo(targetY, customDuration);
    } else if (attempts > 12) {
      clearInterval(retryInterval);
    }
  }, 40);

  return false;
}

export function scrollToTop(customDuration?: number) {
  smoothScrollTo(0, customDuration);
}

import { useParams, Link } from 'react-router-dom';
import { ALL_PROJECTS, PROJECTS, TESTIMONIALS, Project } from '../data';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkle, Plus, Palette, Layers, LayoutTemplate, ShieldCheck, Quote, Maximize2, Minimize2, X, Sparkles, Workflow, Gauge, Zap, Share2, Check, Play, Pause } from 'lucide-react';
import React, { useEffect, useLayoutEffect, useState, useRef, Fragment } from 'react';
import AnimatedCounter from '../components/AnimatedCounter';
import { TextReveal, BlockReveal, EyebrowReveal } from '../components/TextReveal';
import { HoverBadgeCard } from '../components/HoverBadgeCard';
import CaseStudyCta from '../components/CaseStudyCta';
import { CaseStudyNavRail } from '../components/CaseStudyNavRail';
import { usePageTransition } from '../context/PageTransitionContext';
import CaseStudySEO from '../components/CaseStudySEO';

const LESSONS_DATA = [
  { 
    num: "01", 
    tag: "HIERARCHY", 
    text: "Complexity doesn't disappear. It needs to be managed through hierarchy and progressive disclosure, not hidden or simplified away." 
  },
  { 
    num: "02", 
    tag: "SEQUENCE", 
    text: "Brand and product can't run in parallel. Brand needs to come first, or the UI loses its character." 
  },
  { 
    num: "03", 
    tag: "ALIGNMENT", 
    text: "Leading collaboration with developers and stakeholders helped align design decisions with both technical constraints and business goals." 
  },
  { 
    num: "04", 
    tag: "FLEXIBILITY", 
    text: "Designing software against a hardware target that's still evolving means building for change, not for a fixed spec." 
  }
];

const EXTENDED_LESSONS = [
  ...LESSONS_DATA,
  ...LESSONS_DATA,
  ...LESSONS_DATA,
  ...LESSONS_DATA
];

function ScrollPlayVideo({ src, className, loop = false }: { src: string; className?: string; loop?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inViewRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!inViewRef.current) {
              inViewRef.current = true;
              video.currentTime = 0;
              const promise = video.play();
              if (promise !== undefined) {
                promise.catch(() => {});
              }
            }
          } else {
            inViewRef.current = false;
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop={loop}
      playsInline
      preload="auto"
      className={className}
    />
  );
}

const ONBOARDING_SLIDES = [
  '/TAG/GIF/1.png',
  '/TAG/GIF/2.png',
  '/TAG/GIF/3.png',
  '/TAG/GIF/4.png',
  '/TAG/GIF/5.png',
  '/TAG/GIF/6.png',
];

function TagOnboardingSlider({ onImageClick }: { onImageClick?: (src: string) => void }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [prevSlideIdx, setPrevSlideIdx] = useState(0);
  const [activeBtn, setActiveBtn] = useState<'prev' | 'next' | null>(null);

  const paginate = (newDirection: number) => {
    setPrevSlideIdx(slideIdx);
    setSlideIdx((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = ONBOARDING_SLIDES.length - 1;
      if (next >= ONBOARDING_SLIDES.length) next = 0;
      return next;
    });
  };

  return (
    <div
      id="solution-square-2-ph"
      className="relative w-full aspect-square bg-[#D2D6DB] rounded-2xl border border-white/[0.12] overflow-hidden select-none group"
    >
      {/* Slide Image Area */}
      <div 
        className="relative w-full h-full overflow-hidden cursor-pointer bg-[#D2D6DB]"
        onClick={() => onImageClick?.(ONBOARDING_SLIDES[slideIdx])}
      >
        {/* Persistent previous slide underneath so background, frame, and shadow never flash */}
        <img
          src={ONBOARDING_SLIDES[prevSlideIdx]}
          alt="Current screen backdrop"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />

        {/* Incoming slide fading in on top */}
        <AnimatePresence>
          <motion.img
            key={slideIdx}
            src={ONBOARDING_SLIDES[slideIdx]}
            alt={`TAG Onboarding screen ${slideIdx + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
              setPrevSlideIdx(slideIdx);
            }}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
      </div>

      {/* Navigation Arrows inside frame on Left & Right */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          paginate(-1);
          setActiveBtn('prev');
          setTimeout(() => setActiveBtn(null), 150);
        }}
        className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer focus:outline-none backdrop-blur-md ${
          activeBtn === 'prev'
            ? 'bg-white text-[#ff6900] scale-95'
            : 'bg-white/85 text-black hover:bg-white hover:text-[#ff6900] active:scale-95'
        }`}
        aria-label="Previous onboarding screen"
      >
        <ArrowLeft size={16} strokeWidth={2} />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          paginate(1);
          setActiveBtn('next');
          setTimeout(() => setActiveBtn(null), 150);
        }}
        className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer focus:outline-none backdrop-blur-md ${
          activeBtn === 'next'
            ? 'bg-white text-[#ff6900] scale-95'
            : 'bg-white/85 text-black hover:bg-white hover:text-[#ff6900] active:scale-95'
        }`}
        aria-label="Next onboarding screen"
      >
        <ArrowRight size={16} strokeWidth={2} />
      </button>

      {/* Top Slide Counter */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-sans font-light text-white/80 tracking-[0.14em] uppercase pointer-events-none">
        {`0${slideIdx + 1} / 0${ONBOARDING_SLIDES.length}`}
      </div>

      {/* Bottom Dots Indicator */}
      <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
        {ONBOARDING_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPrevSlideIdx(slideIdx);
              setSlideIdx(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === slideIdx ? 'w-5 bg-[#ff6900]' : 'w-1.5 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

interface SolutionAccordionProps {
  key?: string;
  cards: NonNullable<Project['solutionCards']>;
}

function SolutionAccordion({ cards }: SolutionAccordionProps) {
  const [activeCardIdx, setActiveCardIdx] = useState<number | null>(0);

  return (
    <div className="relative pt-[1px]">
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-10% 0px" }}
        style={{ transformOrigin: "left" }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-white/[0.12]"
      />
      {cards.map((card, index) => {
        const isOpen = activeCardIdx === index;
        const isAnyActive = activeCardIdx !== null;

        return (
          <div
            key={index}
            className="relative transition-colors duration-300 pb-[1px] group"
          >
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.6, delay: 0.1 * (index + 1), ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-10% 0px" }}
              style={{ transformOrigin: "left" }}
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.12]"
            />
            <button
              onClick={() => setActiveCardIdx(isOpen ? null : index)}
              className="w-full text-left py-6 sm:py-6 md:py-8 flex items-center justify-between gap-4 group focus:outline-none pointer-events-auto cursor-pointer select-none"
              aria-expanded={isOpen}
            >
              <div className="flex flex-col gap-2 text-left">
                <h4 className={`text-[20px] md:text-[24px] font-bold tracking-normal leading-[26px] md:leading-[30px] transition-colors duration-300 ${
                  isOpen
                    ? 'text-[#f5f5f5]' 
                    : isAnyActive 
                      ? 'text-white/30 group-hover:text-white/80' 
                      : 'text-[#f9f9f9] group-hover:text-white'
                }`}>
                  {card.title}
                </h4>
              </div>

              {/* Expand/Collapse Button */}
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isOpen 
                    ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]' 
                    : isAnyActive
                      ? 'border-white/[0.08] bg-transparent text-white/20 group-hover:border-white/30 group-hover:bg-white/5 group-hover:text-[#f9f9f9]'
                      : 'border-white/[0.12] bg-transparent text-[#737373] group-hover:border-white/30 group-hover:bg-white/5 group-hover:text-[#f9f9f9]'
                }`}>
                  <Plus 
                    size={16} 
                    className={`transform transition-transform duration-300 ${isOpen ? 'rotate-[135deg]' : ''}`} 
                  />
                </div>
              </div>
            </button>

            <div className={`accordion-grid ${isOpen ? 'is-open' : ''}`}>
              <div className="accordion-inner">
                <div className={`pb-7 sm:pb-8 pr-4 md:pr-12 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  {card.subtitle && (
                    <span className="block text-[10px] leading-[15px] font-medium tracking-[0.14em] uppercase text-[#ff6900] mb-3 font-sans">
                      {card.subtitle}
                    </span>
                  )}
                  <p className="text-[15px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-white/60 font-light">
                    {card.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TagVideoPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Playback failed:", err);
      });
    }
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const elem = containerRef.current;
    if (!elem) return;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        (elem as any).webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      onClick={togglePlay}
      className={`relative w-full ${
        isFullscreen 
          ? 'h-full flex items-center justify-center bg-black' 
          : 'aspect-video rounded-2xl border border-white/[0.12] bg-[#0c0c0e]'
      } flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none group shadow-2xl`}
    >
      <video
        ref={videoRef}
        src="/TAG/videoplayback.mp4"
        poster="/TAG/videoplayback_poster.jpg"
        playsInline
        preload="metadata"
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        className={`absolute inset-0 w-full h-full ${
          isFullscreen ? 'object-contain' : 'object-cover'
        } z-10 brightness-[1.20] contrast-[1.02] cursor-pointer`}
      />

      {/* Static Dark Film Grain Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.22] z-15 select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='darkFilmNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23darkFilmNoise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px',
        }}
      />

      {/* Center Play Button Overlay with Stylized Video Cover */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          >
            {/* Lighter tint reduced by 15% - transparent and bright */}
            <div className="absolute inset-0 bg-black/[0.08] pointer-events-none" />
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, transparent 65%, rgba(0,0,0,0.12) 100%)'
              }}
            />

            {/* Blueprint Crosshairs Texture Overlay (Only pure pluses, radial fade from center to edges) */}
            <div 
              className="absolute inset-0 pointer-events-none z-12 select-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='124' height='124' viewBox='0 0 124 124' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M62 56v12 M56 62h12' stroke='%23ffffff' stroke-width='1.2' stroke-opacity='0.60' stroke-linecap='round' fill='none'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center center',
                backgroundSize: '124px 124px',
                maskImage: 'radial-gradient(ellipse 70% 65% at center, rgba(0,0,0,1) 12%, rgba(0,0,0,0.70) 35%, rgba(0,0,0,0.22) 52%, rgba(0,0,0,0) 68%)',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at center, rgba(0,0,0,1) 12%, rgba(0,0,0,0.70) 35%, rgba(0,0,0,0.22) 52%, rgba(0,0,0,0) 68%)',
              }}
            />

            {/* Technical Blueprint Corner Brackets (Exact 40px distance from placeholder edges) */}
            <div className="absolute inset-[40px] pointer-events-none z-15 select-none">
              {/* Top-Left Corner */}
              <svg className="absolute top-0 left-0 w-3.5 h-3.5 overflow-visible" viewBox="0 0 14 14" fill="none">
                <path d="M0 14V0H14" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.60" strokeLinecap="round" />
              </svg>
              {/* Top-Right Corner */}
              <svg className="absolute top-0 right-0 w-3.5 h-3.5 overflow-visible" viewBox="0 0 14 14" fill="none">
                <path d="M14 14V0H0" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.60" strokeLinecap="round" />
              </svg>
              {/* Bottom-Left Corner */}
              <svg className="absolute bottom-0 left-0 w-3.5 h-3.5 overflow-visible" viewBox="0 0 14 14" fill="none">
                <path d="M0 0V14H14" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.60" strokeLinecap="round" />
              </svg>
              {/* Bottom-Right Corner */}
              <svg className="absolute bottom-0 right-0 w-3.5 h-3.5 overflow-visible" viewBox="0 0 14 14" fill="none">
                <path d="M14 0V14H0" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.60" strokeLinecap="round" />
              </svg>
            </div>

            {/* Static Dark Film Grain Layer for the Cover (Reduced by another 25%) */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.32] z-10 select-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='darkCoverGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23darkCoverGrain)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '110px 110px',
              }}
            />

            {/* Center Play Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="pointer-events-auto group/btn relative z-20 flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-black/40 backdrop-blur-md border border-white/25 hover:border-[#ff6900] hover:bg-black/60 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none shadow-2xl"
              aria-label="Play video"
            >
              {/* Glowing orange ripple aura on hover */}
              <div className="absolute inset-0 rounded-full bg-[#ff6900]/30 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              
              {/* Outer decorative thin ring */}
              <div className="absolute -inset-1.5 rounded-full border border-white/20 group-hover/btn:border-[#ff6900]/50 transition-colors duration-300" />

              {/* Play trigger - brand plus / cross icon */}
              <Plus 
                size={28} 
                strokeWidth={1.7}
                className="text-white group-hover/btn:text-[#ff6900] transition-colors duration-300 relative z-10" 
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top-Right Fullscreen / Maximize Button (Only shown when video is running) */}
      <AnimatePresence>
        {isPlaying && (
          <motion.button
            key="fullscreen-btn"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            type="button"
            onClick={handleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen video"}
            className="absolute top-4 right-4 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/70 hover:text-white hover:border-white/40 hover:bg-black/70 transition-all duration-300 cursor-pointer shadow-lg"
          >
            {isFullscreen ? (
              <Minimize2 size={15} strokeWidth={1.6} />
            ) : (
              <Maximize2 size={15} strokeWidth={1.6} />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom Subtle Pause Indicator on Hover when Playing */}
      {isPlaying && (
        <div className="absolute bottom-4 left-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 text-[12px] font-sans font-light pointer-events-none">
          <Pause size={12} className="fill-white text-white" />
          <span>Click to pause</span>
        </div>
      )}
    </div>
  );
}

function SlideCardImage({ src, alt, fallback }: { src: string; alt: string; fallback: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  if (hasError) {
    return <>{fallback}</>;
  }

  return (
    <>
      <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      </div>
      {!isLoaded && fallback}
    </>
  );
}

export default function CaseStudy() {
  const { id } = useParams();
  const { navigateToHomeTop, navigateToHomeSection, navigateToCaseStudy } = usePageTransition();
  const project = ALL_PROJECTS.find((p) => p.id === id);
  const projectIndex = PROJECTS.findIndex((p) => p.id === id);
  const totalProjects = PROJECTS.length;
  const projectNumber = (projectIndex + 1).toString().padStart(2, '0');
  const totalCount = totalProjects.toString().padStart(2, '0');
  const nextProjectIndex = (projectIndex + 1) % totalProjects;
  const nextProject = PROJECTS[nextProjectIndex];

  const currentLessons = project?.learnings || LESSONS_DATA;
  const extendedLessons = [
    ...currentLessons,
    ...currentLessons,
    ...currentLessons,
    ...currentLessons
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState<boolean>(true);
  const [activeArrow, setActiveArrow] = useState<'prev' | 'next' | null>(null);
  const [activeTestimonialArrow, setActiveTestimonialArrow] = useState<'prev' | 'next' | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fallbackCopy = (text: string) => {
    try {
      const dummy = document.createElement('textarea');
      dummy.value = text;
      dummy.setAttribute('readonly', '');
      dummy.style.position = 'absolute';
      dummy.style.left = '-9999px';
      document.body.appendChild(dummy);
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
    } catch {
      // Ignore clipboard fallback error
    }
  };

  const handleCopyProjectLink = () => {
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).catch(() => {
        fallbackCopy(url);
      });
    } else {
      fallbackCopy(url);
    }
    setIsLinkCopied(true);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => {
      setIsLinkCopied(false);
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  // Smooth scroll fade for "Back to works" link
  const { scrollY } = useScroll();
  const backLinkOpacity = useTransform(scrollY, [0, 70], [1, 0]);
  const backLinkY = useTransform(scrollY, [0, 70], [0, -6]);
  const backLinkPointerEvents = useTransform(scrollY, (y) => (y > 50 ? ('none' as const) : ('auto' as const)));

  // Drag states for System Metrics slider
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const vaniTestimonial = TESTIMONIALS.find((t) => t.id === '9' || t.name.includes('Vani'));
  const margaritaTestimonial = TESTIMONIALS.find((t) => t.id === '1' || t.name.includes('Margarita'));

  const isErwinCase = id === 'erwin' || project?.title.toLowerCase().includes('erwin');

  const activeTestimonials = project?.testimonialIds && project.testimonialIds.length > 0
    ? (project.testimonialIds.map((tId) => TESTIMONIALS.find((t) => t.id === tId)).filter(Boolean) as typeof TESTIMONIALS)
    : (isErwinCase && vaniTestimonial && margaritaTestimonial
      ? [vaniTestimonial, margaritaTestimonial]
      : TESTIMONIALS);

  const currentTestimonial = activeTestimonials[testimonialIdx] || activeTestimonials[0];
  const counterText = `${String(testimonialIdx + 1).padStart(2, '0')}/${String(activeTestimonials.length).padStart(2, '0')}`;

  useEffect(() => {
    setTestimonialIdx(0);
    setIsResultCalloutOpen(true);
    setIsResultCallout2Open(false);
    setIsResultCallout3Open(false);
    setIsResultCallout4Open(false);
    setIsResultCallout5Open(false);
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % activeTestimonials.length);
    }, 20000);
    return () => clearInterval(timer);
  }, [activeTestimonials.length, testimonialIdx]);

  const [mobileLessonIndex, setMobileLessonIndex] = useState<number>(4);
  const [lessonProgress, setLessonProgress] = useState<number>(0);
  const [isLessonTransitionEnabled, setIsLessonTransitionEnabled] = useState<boolean>(true);
  const [isLessonDragging, setIsLessonDragging] = useState<boolean>(false);
  const [lessonStartX, setLessonStartX] = useState<number>(0);
  const [lessonDragOffset, setLessonDragOffset] = useState<number>(0);
  const [hasLessonDragged, setHasLessonDragged] = useState<boolean>(false);

  const activeLessonIdx = ((mobileLessonIndex % 4) + 4) % 4;

  const handleLessonDragStart = (clientX: number) => {
    setIsLessonDragging(true);
    setLessonStartX(clientX);
    setLessonDragOffset(0);
    setHasLessonDragged(false);
  };

  const handleLessonDragMove = (clientX: number) => {
    if (!isLessonDragging) return;
    const deltaX = clientX - lessonStartX;
    setLessonDragOffset(deltaX);
    if (Math.abs(deltaX) > 10) {
      setHasLessonDragged(true);
      setIsLessonTransitionEnabled(false);
    }
  };

  const handleLessonDragEnd = () => {
    if (!isLessonDragging) return;
    setIsLessonDragging(false);

    const threshold = 40;
    if (hasLessonDragged) {
      if (lessonDragOffset < -threshold) {
        setMobileLessonIndex((prev) => prev + 1);
        setLessonProgress(0);
      } else if (lessonDragOffset > threshold) {
        setMobileLessonIndex((prev) => prev - 1);
        setLessonProgress(0);
      }
    }

    setIsLessonTransitionEnabled(true);
    setLessonDragOffset(0);
    setTimeout(() => {
      setHasLessonDragged(false);
    }, 50);
  };

  const [isNextProjectHovered, setIsNextProjectHovered] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isTabletLandscape, setIsTabletLandscape] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isLightboxZoomed, setIsLightboxZoomed] = useState<boolean>(false);
  const [isResultCalloutOpen, setIsResultCalloutOpen] = useState<boolean>(true);
  const [isResultCallout2Open, setIsResultCallout2Open] = useState<boolean>(false);
  const [isResultCallout3Open, setIsResultCallout3Open] = useState<boolean>(false);
  const [isResultCallout4Open, setIsResultCallout4Open] = useState<boolean>(false);
  const [isResultCallout5Open, setIsResultCallout5Open] = useState<boolean>(false);

  const toggleCallout = (id: 1 | 2 | 3 | 4 | 5) => {
    setIsResultCalloutOpen(prev => id === 1 ? !prev : false);
    setIsResultCallout2Open(prev => id === 2 ? !prev : false);
    setIsResultCallout3Open(prev => id === 3 ? !prev : false);
    setIsResultCallout4Open(prev => id === 4 ? !prev : false);
    setIsResultCallout5Open(prev => id === 5 ? !prev : false);
  };

  // Ensure scroll is immediately reset to the top when opening or switching case studies
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [id]);

  useEffect(() => {
    const checkScreen = () => {
      const w = window.innerWidth;
      setIsLargeScreen(w >= 1280);
      setIsTabletLandscape(w >= 1024 && w < 1280);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => {
      window.removeEventListener('resize', checkScreen);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxImage(null);
      }
    };
    if (lightboxImage) {
      setIsLightboxZoomed(false);
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [lightboxImage]);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setVideoError(false);
  }, [id]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.muted = true;
    videoElement.defaultMuted = true;
    videoElement.loop = false;

    let hasEnded = false;

    const handleEnded = () => {
      hasEnded = true;
    };

    videoElement.addEventListener('ended', handleEnded);

    const playVideo = () => {
      if (!hasEnded && videoElement.paused) {
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay handled
          });
        }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playVideo();
        } else {
          if (!hasEnded) {
            videoElement.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(videoElement);

    return () => {
      videoElement.removeEventListener('ended', handleEnded);
      observer.unobserve(videoElement);
    };
  }, [id, videoError]);

  useEffect(() => {
    let startTime = Date.now();
    let animationFrameId: number;
    const duration = 13000;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);

      if (elapsed >= duration) {
        setIsLessonTransitionEnabled(true);
        setMobileLessonIndex((prev) => prev + 1);
        setLessonProgress(0);
      } else {
        setLessonProgress(progress);
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mobileLessonIndex]);

  useEffect(() => {
    if (mobileLessonIndex >= 12) {
      const timer = setTimeout(() => {
        setIsLessonTransitionEnabled(false);
        setMobileLessonIndex((prev) => prev - 4);
      }, 500);
      return () => clearTimeout(timer);
    }
    if (mobileLessonIndex <= 3) {
      const timer = setTimeout(() => {
        setIsLessonTransitionEnabled(false);
        setMobileLessonIndex((prev) => prev + 4);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [mobileLessonIndex]);

  useEffect(() => {
    if (!isLessonTransitionEnabled && !isLessonDragging) {
      const timer = setTimeout(() => {
        setIsLessonTransitionEnabled(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isLessonTransitionEnabled, isLessonDragging]);



  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#f9f9f9]">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link 
            to="/" 
            onClick={(e) => {
              e.preventDefault();
              navigateToHomeTop();
            }} 
            className="text-orange-500 hover:underline"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const rawResults = project.resultsItems || [
    {
      num: "One",
      badge: "30 — 40%",
      tag: "Velocity",
      text: "Faster design-to-development time — modular component library reduced implementation time for new features across teams.",
      mobileText: "Faster design-to-dev time — modular components cut implementation time for new features across teams."
    },
    {
      num: "Two",
      badge: "220+",
      tag: "Registry Scale",
      text: "Components across 6 surface types — canvases, dialogs, property panels, tables, toolbars, and admin screens.",
      mobileText: "Components across 6 surface types — canvases, dialogs, property panels, tables, toolbars, and admin screens."
    },
    {
      num: "Three",
      badge: "Reduce Cognitive Load",
      tag: "Compliance",
      text: "Accessibility baselines covering contrast, keyboard navigation, and focus states are built into every component to meet enterprise compliance out of the box.",
      mobileText: "Accessibility baselines for contrast, keyboard navigation, and focus states are built into every component for enterprise compliance."
    },
    {
      num: "Four",
      badge: "Less Time Lost to UI",
      tag: "Hierarchy",
      text: "Information hierarchy improvements made complex canvas views with 500+ entities faster to navigate — reducing daily friction for expert users.",
      mobileText: "Improved hierarchy made complex canvas views with 500+ entities faster to navigate — reducing friction for expert users."
    },
    {
      num: "Five",
      badge: "Built to Scale",
      tag: "Templates",
      text: "The construction kit model let engineering ship new screens independently — no design handoff required for every sprint cycle.",
      mobileText: "Construction kits let engineering ship new screens independently — no design handoff needed for every sprint."
    }
  ];

  const getResultIcon = (badge: string, tag?: string, idx: number = 0) => {
    const str = `${badge} ${tag || ''}`.toLowerCase();
    if (str.includes('launch') || str.includes('0 → 1') || str.includes('velocity') || str.includes('speed') || str.includes('fast') || str.includes('min')) return Zap;
    if (str.includes('platform') || str.includes('registry') || str.includes('component') || str.includes('3')) return Layers;
    if (str.includes('radar') || str.includes('gauge') || str.includes('time')) return Gauge;
    if (str.includes('brand') || str.includes('identity') || str.includes('palette') || str.includes('visual')) return Palette;
    if (str.includes('modular') || str.includes('scale') || str.includes('template') || str.includes('architect')) return LayoutTemplate;
    if (str.includes('compliance') || str.includes('access') || str.includes('shield')) return ShieldCheck;
    const icons = [Palette, Layers, ShieldCheck, Sparkle, LayoutTemplate];
    return icons[idx % icons.length];
  };

  const resultsItems = rawResults.map((item, idx) => ({
    ...item,
    icon: getResultIcon(item.badge, item.tag, idx)
  }));

  let activeResultIdx = currentIndex - 1;
  if (currentIndex === 0) {
    activeResultIdx = resultsItems.length - 1;
  } else if (currentIndex === resultsItems.length + 1) {
    activeResultIdx = 0;
  }

  const handlePrev = () => {
    if (!isTransitionEnabled) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!isTransitionEnabled) return;
    setCurrentIndex((prev) => prev + 1);
  };

  // Drag handlers for System Metrics slider
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
    setHasDragged(false);
    window.dispatchEvent(new CustomEvent('app-drag-start'));
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    setDragOffset(deltaX);
    if (Math.abs(deltaX) > 10) {
      setHasDragged(true);
      setIsTransitionEnabled(false);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    window.dispatchEvent(new CustomEvent('app-drag-end'));
    
    const threshold = 80;
    
    if (hasDragged) {
      if (dragOffset < -threshold) {
        // Swiped left -> next
        setCurrentIndex((prev) => prev + 1);
      } else if (dragOffset > threshold) {
        // Swiped right -> prev
        setCurrentIndex((prev) => prev - 1);
      }
    }
    
    setIsTransitionEnabled(true);
    setDragOffset(0);
    setTimeout(() => {
      setHasDragged(false);
    }, 50);
  };

  useEffect(() => {
    if (currentIndex === 0) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex(resultsItems.length);
      }, 500);
      return () => clearTimeout(timer);
    }
    if (currentIndex === resultsItems.length + 1) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex(1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, resultsItems.length]);

  useEffect(() => {
    if (!isTransitionEnabled) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitionEnabled]);

  return (
    <motion.div 
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative"
    >
      {/* Dynamic Open Graph & Schema.org Structured Data */}
      <CaseStudySEO project={project} />

      {/* Interactive Floating Section Indicator Rail */}
      <CaseStudyNavRail />

      {/* Hero Section with Background Image */}
      <section id="case-hero" className="min-h-[100svh] relative flex flex-col pb-0 pt-24 sm:pt-24 md:pt-[128px] px-0">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img 
            src={project.image} 
            alt="" 
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 20%' }}
            referrerPolicy="no-referrer"
          />
          {/* Overlay Gradient (Darkening at bottom and overall dimming for readability) */}
          <div className="absolute inset-0 bg-black/[0.39]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/27 to-transparent opacity-100" />
        </div>

        <div className="container-custom w-full flex-grow flex flex-col relative z-10">
          {/* Back Link */}
          <motion.div 
            style={{ 
              opacity: backLinkOpacity,
              y: backLinkY,
              pointerEvents: backLinkPointerEvents,
            }}
            className="mb-auto"
          >
            <Link 
              to="/#work" 
              onClick={(e) => {
                e.preventDefault();
                navigateToHomeSection('work');
              }}
              className="inline-flex items-center gap-2 text-[#9F9F9F] hover:text-white transition-colors group py-3 sm:py-0 pr-4 sm:pr-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 md:w-[14px] md:h-[14px] text-[#9F9F9F] group-hover:text-white transition-colors shrink-0 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[12px] leading-[16px] uppercase tracking-widest font-light font-sans">Back to works</span>
            </Link>
          </motion.div>

          {/* Header Section */}
          <div className="w-full mt-auto pt-12 md:pt-20 -translate-y-2 md:translate-y-0">
            <motion.div 
              key={`header-eyebrow-${id}`}
              initial={{ clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
              transition={{ 
                clipPath: { duration: 1.25, ease: [0.25, 0.1, 0.25, 1], delay: 0.12 },
                opacity: { duration: 0.15, delay: 0.12 }
              }}
              className="inline-flex items-center flex-wrap gap-4 mb-4 sm:mb-6 md:mb-8 transform translate-y-[-2px] w-fit"
            >
              <div className="flex items-center gap-3">
                <motion.span 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: 0.12 }}
                  style={{ transformOrigin: "left" }}
                  className="w-12 h-[1px] bg-[#ff6900] shrink-0 inline-block" 
                />
                <span className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/50 inline-flex flex-wrap items-baseline">
                  {projectNumber} / {totalCount}
                </span>
              </div>
              <span className="w-[3px] h-[3px] rounded-full bg-white/20 shrink-0 hidden sm:inline-block -mx-[2px]" aria-hidden="true" />
              <div
                className="inline-flex items-center gap-2 text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/50 font-sans"
                id="case-study-reading-time"
              >
                <span>
                  Estimated Reading Time: <span className="text-white/80 font-normal">{(project.readingTime || '5 min').replace(/\s*read$/i, '')}</span>
                </span>
              </div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[44px] sm:text-[56px] md:text-[64px] lg:text-[64px] xl:text-[102px] font-dm-sans font-extrabold tracking-[-1px] md:tracking-[-2px] mb-4 md:mb-6 leading-[44px] sm:leading-[58px] md:leading-[68px] lg:leading-[68px] xl:leading-[96px] text-white max-w-6xl"
            >
              <TextReveal text={project.title} delay={0.2} wrapperClassName="flex-wrap" />
            </motion.h1>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="text-[20px] leading-[28px] text-white/60 font-light max-w-2xl">
                <TextReveal text={(project.subtitle || project.description).replace(/\.+$/, '') + '.'} delay={0.4} wrapperClassName="inline-flex w-full" />
              </div>

              {/* Share button on the right edge of content in this area */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0 self-start sm:self-end pb-1 relative"
              >
                {/* Floating Tooltip */}
                <AnimatePresence>
                  {isLinkCopied && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.92 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full bg-[#141416]/95 border border-white/15 text-[11px] font-sans font-medium text-white shadow-2xl backdrop-blur-md pointer-events-none z-30 flex items-center gap-1.5 select-none"
                    >
                      <Check size={12} strokeWidth={2.5} className="text-[#ff6900]" />
                      <span>Copied to clipboard</span>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#141416] border-r border-b border-white/15" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  id="case-study-share-btn"
                  onClick={handleCopyProjectLink}
                  className={`w-12 h-12 rounded-full border transition-all duration-300 flex items-center justify-center select-none focus:outline-none cursor-pointer backdrop-blur-sm group shrink-0 relative ${
                    isLinkCopied
                      ? 'border-[#ff6900]/40 bg-[#ff6900]/10 text-[#ff6900]'
                      : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20'
                  }`}
                  aria-label="Copy project link to clipboard"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isLinkCopied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center justify-center"
                      >
                        <Check size={18} strokeWidth={2.2} className="text-[#ff6900] shrink-0" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="share"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center justify-center"
                      >
                        <Share2 
                          size={18} 
                          strokeWidth={1.8} 
                          className="-translate-x-[1px] text-[#9F9F9F] opacity-100 group-hover:text-white transition-all duration-300 group-hover:scale-105 shrink-0" 
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </div>
          </div>

        </div>
        {/* Divider running across the full screen width, exactly 24px (mt-6) on mobile and 57px on desktop */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ transformOrigin: "left" }}
          className="w-full h-[1px] bg-white/[0.12] mt-6 md:mt-[57px] relative z-10" 
        />
      </section>

      {/* Spacing from divider to tags is exactly 32px */}
      <div className="container-custom pt-8 pb-0">
        {/* Info Grid / Horizontal Slider of pills (full-bleed edge-to-edge slider on mobile and tablets) */}
        <div className="flex flex-row overflow-x-auto scrollbar-none gap-2 sm:gap-2.5 mt-0 pb-2 xl:pb-0 flex-nowrap items-center -mx-4 md:-mx-8 xl:mx-0 px-4 md:px-8 xl:px-0 w-[calc(100%+2rem)] md:w-[calc(100%+4rem)] xl:w-full touch-pan-x">
          {[
            {
              label: 'Client',
              value: project.client || '—',
              delay: 0.1
            },
            {
              label: 'Designer',
              value: project.designer || '—',
              delay: 0.13
            },
            {
              label: 'Year',
              value: project.year,
              delay: 0.16
            },
            {
              label: 'Duration',
              value: project.duration || '—',
              delay: 0.19
            },
            {
              label: 'Scope',
              value: project.scope || '—',
              delay: 0.22
            },
            {
              label: project.engagement ? 'Engagement' : 'Development',
              value: project.engagement || project.developer || '—',
              delay: 0.25
            },
            ...(project.website ? [
              {
                label: 'Links',
                value: project.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
                href: project.website,
                delay: 0.28
              }
            ] : [])
          ].map((item, index) => {
            const isLink = Boolean(item.href);
            const Wrapper = isLink ? motion.a : motion.div;
            const interactiveProps = isLink ? {
              href: item.href,
              target: '_blank',
              rel: 'noopener noreferrer',
              className: "h-[68px] sm:h-[76px] px-6 sm:px-8 rounded-[100px] inline-flex flex-col justify-center items-start bg-transparent border border-white/[0.12] hover:border-[#ff6900]/40 hover:bg-white/[0.04] active:scale-[0.98] transition-all duration-300 cursor-pointer flex-shrink-0 group"
            } : {
              className: "h-[68px] sm:h-[76px] px-6 sm:px-8 rounded-[100px] inline-flex flex-col justify-center items-start bg-transparent border border-white/[0.12] cursor-default flex-shrink-0"
            };

            return (
              <Wrapper
                key={index}
                {...interactiveProps}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Vertical Text wrapper */}
                <div className="flex flex-col text-left gap-1 pt-0 mt-[2px]">
                  {/* Label on top */}
                  <span className={`text-[10px] uppercase tracking-[0.09em] font-light leading-none select-none transition-colors ${
                    isLink ? 'text-white/40 group-hover:text-white/60' : 'text-white/40'
                  }`}>
                    {item.label}
                  </span>
                  {/* Value underneath */}
                  <span className={`text-[14px] sm:text-[15px] font-sans font-normal leading-[20px] sm:leading-[22px] select-none whitespace-nowrap inline-flex items-center gap-1.5 transition-colors ${
                    isLink ? 'text-white/80 group-hover:text-white' : 'text-white/80'
                  }`}>
                    <span>{item.value}</span>
                    {isLink && (
                      <ArrowUpRight size={13} className="text-white/40 group-hover:text-[#ff6900] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    )}
                  </span>
                </div>
              </Wrapper>
            );
          })}
          {/* Right edge spacer on mobile and tablet to prevent clipping of the last card */}
          <div className="w-2 md:w-4 xl:hidden flex-shrink-0" aria-hidden="true" />
        </div>

        {/* Content Section: About the Project */}
        <motion.section 
          id="case-about"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-[120px] lg:mt-[152px] mb-0"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Column: Heading (Sticky on Desktop) */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit lg:pt-[4px]">
              <EyebrowReveal text="case study overview" delay={0.05} />
              <h2 className="text-[36px] md:text-4xl font-dm-sans font-extrabold tracking-[-1px] md:tracking-[-1px] text-white leading-[40px] md:leading-tight flex flex-wrap">
                <TextReveal text="About the Project" delay={0.2} wrapperClassName="inline-flex w-full" />
              </h2>
            </div>
            
            {/* Right Column: Dynamic Project Paragraphs (Aligned Right with comfortable reading width) */}
            <div className="lg:col-span-8 lg:col-start-5 lg:max-w-[896px] w-full">
              <div className="space-y-8">
                {project.aboutParagraphs?.length ? (
                  project.aboutParagraphs.map((paragraph, index) => {
                    const goalPrefix = "The goal: ";
                    const goalPrefixAlt = "The goal:";
                    const usersPrefix = "Users: ";
                    const usersPrefixAlt = "Users:";

                    let caption = "";
                    let cleanText = paragraph;

                    if (paragraph.toLowerCase().startsWith("the goal:")) {
                      caption = "THE GOAL";
                      if (paragraph.toLowerCase().startsWith(goalPrefix.toLowerCase())) {
                        cleanText = paragraph.substring(goalPrefix.length);
                      } else {
                        cleanText = paragraph.substring(goalPrefixAlt.length);
                      }
                    } else if (paragraph.toLowerCase().startsWith("users:")) {
                      caption = "USERS";
                      if (paragraph.toLowerCase().startsWith(usersPrefix.toLowerCase())) {
                        cleanText = paragraph.substring(usersPrefix.length);
                      } else {
                        cleanText = paragraph.substring(usersPrefixAlt.length);
                      }
                    }

                    if (cleanText) {
                      cleanText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
                    }

                    return (
                      <div key={index} className="space-y-2">
                        {caption && (
                          <EyebrowReveal 
                            text={caption} 
                            delay={0.05} 
                            wrapperClassName="block text-[10px] uppercase tracking-[0.14em] text-white/40 font-light mt-6 font-sans" 
                          />
                        )}
                        <motion.p 
                          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.85, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                          className="text-[20px] leading-[28px] text-white/60 font-light"
                        >
                          {cleanText}
                        </motion.p>
                      </div>
                    );
                  })
                ) : (
                  <motion.p 
                    initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[20px] leading-[28px] text-white/60 font-light"
                  >
                    {project.description}
                  </motion.p>
                )}

                {/* Statistics / Performance Indicators */}
                {project.stats && project.stats.length > 0 && (
                  <div className="pt-12 sm:pt-16 mt-12 sm:mt-16 relative">
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true }}
                      style={{ transformOrigin: "left" }}
                      className="absolute top-0 left-0 right-0 h-[1px] bg-white/[0.12]"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 sm:gap-8 md:gap-10">
                      {project.stats.map((stat, statIndex) => (
                        <motion.div
                          key={statIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: statIndex * 0.1 }}
                          className="space-y-1 -mt-2"
                        >
                          <div className="text-[40px] sm:text-[56px] font-normal leading-[42px] sm:leading-[56px] tracking-tight text-[#f9f9f9] font-sans">
                            <AnimatedCounter value={stat.value} />
                          </div>
                          <div className="text-[15px] md:text-[15px] leading-[22px] md:leading-[22px] text-white/30 font-light md:max-w-[240px] mt-2 sm:mt-3">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Key Outcomes with Interactive Plus Points */}
        <motion.div 
          id="case-outcomes"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full mt-[120px] md:mt-[176px]"
        >
          <div className="flex items-center gap-6 mb-6">
            <EyebrowReveal 
              text="KEY OUTCOMES" 
              delay={0.05} 
              wrapperClassName="text-[10px] uppercase tracking-[0.14em] text-white/30 font-light whitespace-nowrap" 
            />
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
              className="h-[1px] bg-white/[0.12] flex-grow" 
            />
          </div>

          <div 
            id="key-outcomes-preview"
            onClick={() => {
              if (typeof window !== 'undefined' && window.innerWidth < 768) {
                setLightboxImage(project.id === 'nexus' ? "/TAG/scene-with-iphone-16-pro-mockups-v1-front-vew.png" : "/Free_M_Mockups_iMac_24_Inch.png");
              }
            }}
            className={`relative w-full ${
              project.id === 'nexus'
                ? 'aspect-[2500/1583] sm:aspect-[2500/1583] md:aspect-[2500/1583] lg:aspect-[2500/1583] xl:aspect-[2500/1583] sm:h-auto md:h-auto lg:h-auto xl:h-auto'
                : 'aspect-[16/10] sm:aspect-none sm:h-[540px] md:h-[640px] lg:h-[760px] xl:h-[850px]'
            } rounded-2xl border border-white/[0.12] bg-[#0c0c0e] flex flex-col items-center justify-center overflow-hidden cursor-pointer md:cursor-default active:scale-[0.985] active:brightness-95 md:active:scale-100 md:active:brightness-100 transition-all duration-300 ease-out`}
          >
            {/* Subtle Mobile Expand Indicator (Non-intrusive & Soft) */}
            <div className="md:hidden absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/70 pointer-events-none transition-opacity duration-300">
              <Maximize2 size={14} strokeWidth={1.5} className="text-white/80" />
            </div>

            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <img 
                src={project.id === 'nexus' ? "/TAG/scene-with-iphone-16-pro-mockups-v1-front-vew.png" : "/Free_M_Mockups_iMac_24_Inch.png"} 
                alt={project.id === 'nexus' ? "TAG Radar Mobile App Mockups" : "iMac 24 Inch Mockup"} 
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 w-full h-full ${project.id === 'nexus' ? 'object-contain' : 'object-cover object-center sm:object-top sm:scale-[1.15] sm:translate-y-[35px]'} z-10`}
                referrerPolicy="no-referrer"
              />
            </div>

            {project.id === 'nexus' ? (
              <>
                {/* TAG Radar Nexus: 5 Interactive Callout Points positioned directly on the iPhone devices */}
                
                {/* 1. Left Phone - Lower Radar Epicenter */}
                <div 
                  className="hidden md:flex absolute z-20 items-center justify-center w-10 h-10"
                  style={{ left: '32%', top: '66%', transform: 'translate(-50%, -50%)' }}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCallout(1); }}
                    className={`w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 flex-shrink-0 focus:outline-none cursor-pointer group z-10 ${
                      isResultCalloutOpen
                        ? 'bg-[#ff6900] border border-transparent text-white shadow-[0_0_20px_rgba(255,105,0,0.6)]'
                        : 'bg-white/90 border border-white/60 hover:bg-[#ff6900] hover:border-transparent text-black hover:text-white'
                    }`}
                    aria-label="Toggle product launch insight"
                  >
                    <motion.div
                      animate={{ rotate: isResultCalloutOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <Plus size={20} strokeWidth={1.75} className={isResultCalloutOpen ? 'text-white' : 'text-black group-hover:text-white transition-colors duration-300'} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isResultCalloutOpen && (
                      <motion.div
                        initial={{ opacity: 0, x: 12, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 12, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="absolute right-full mr-3 sm:mr-4 top-1/2 -translate-y-1/2 w-[240px] sm:w-[280px] md:w-[320px] max-w-[calc(31vw)] bg-black/85 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 text-white shadow-xl pointer-events-auto"
                      >
                        <p className="text-[13px] md:text-[14px] lg:text-[15px] leading-[19px] md:leading-[21px] lg:leading-[22px] text-white/90 font-light text-left text-pretty">
                          <strong className="font-medium text-white">Product launched from zero</strong> — The hardware existed, but the product didn’t. I designed the full app solo, and it went live on the App Store and Google Play across iOS, Android and Apple Watch.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Right Phone - Middle App Experience */}
                <div 
                  className="hidden md:flex absolute z-20 items-center justify-center w-10 h-10"
                  style={{ left: 'calc(65% + 140px)', top: '48%', transform: 'translate(-50%, -50%)' }}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCallout(2); }}
                    className={`w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 flex-shrink-0 focus:outline-none cursor-pointer group z-10 ${
                      isResultCallout2Open
                        ? 'bg-[#ff6900] border border-transparent text-white shadow-[0_0_20px_rgba(255,105,0,0.6)]'
                        : 'bg-white/90 border border-white/60 hover:bg-[#ff6900] hover:border-transparent text-black hover:text-white'
                    }`}
                    aria-label="Toggle time to value insight"
                  >
                    <motion.div
                      animate={{ rotate: isResultCallout2Open ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <Plus size={20} strokeWidth={1.75} className={isResultCallout2Open ? 'text-white' : 'text-black group-hover:text-white transition-colors duration-300'} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isResultCallout2Open && (
                      <motion.div
                        initial={{ opacity: 0, x: 12, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 12, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="absolute right-full mr-3 sm:mr-4 top-1/2 -translate-y-1/2 w-[240px] sm:w-[280px] md:w-[320px] max-w-[calc(100vw-140px)] bg-black/85 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 text-white shadow-xl pointer-events-auto"
                      >
                        <p className="text-[13px] md:text-[14px] lg:text-[15px] leading-[19px] md:leading-[21px] lg:leading-[22px] text-white/90 font-light text-left text-pretty">
                          <strong className="font-medium text-white">Faster time-to-value</strong> — Simplified onboarding and a step-by-step pairing flow with clear status feedback cut device pairing from ~2 minutes to under 40 seconds.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Right Phone - Lower Device Pairing & Action Buttons */}
                <div 
                  className="hidden md:flex absolute z-20 items-center justify-center w-10 h-10"
                  style={{ left: '61%', top: 'calc(72% + 120px)', transform: 'translate(-50%, -50%)' }}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCallout(3); }}
                    className={`w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 flex-shrink-0 focus:outline-none cursor-pointer group z-10 ${
                      isResultCallout3Open
                        ? 'bg-[#ff6900] border border-transparent text-white shadow-[0_0_20px_rgba(255,105,0,0.6)]'
                        : 'bg-white/90 border border-white/60 hover:bg-[#ff6900] hover:border-transparent text-black hover:text-white'
                    }`}
                    aria-label="Toggle user accessibility insight"
                  >
                    <motion.div
                      animate={{ rotate: isResultCallout3Open ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <Plus size={20} strokeWidth={1.75} className={isResultCallout3Open ? 'text-white' : 'text-black group-hover:text-white transition-colors duration-300'} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isResultCallout3Open && (
                      <motion.div
                        initial={{ opacity: 0, x: -12, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -12, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="absolute left-full ml-3 sm:ml-4 bottom-0 w-[240px] sm:w-[280px] md:w-[320px] max-w-[calc(35vw)] bg-black/85 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 text-white shadow-xl pointer-events-auto"
                      >
                        <p className="text-[13px] md:text-[14px] lg:text-[15px] leading-[19px] md:leading-[21px] lg:leading-[22px] text-white/90 font-light text-left text-pretty">
                          <strong className="font-medium text-white">Simple for every user, at any age</strong> — A hierarchy-first dashboard and a session flow built for setup in under a minute make a complex radar product easy to configure for athletes and coaches of all ages.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 4. Left Phone - Upper Velocity & Session Telemetry */}
                <div 
                  className="hidden md:flex absolute z-20 items-center justify-center w-10 h-10"
                  style={{ left: 'calc(36% - 100px)', top: '36%', transform: 'translate(-50%, -50%)' }}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCallout(4); }}
                    className={`w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 flex-shrink-0 focus:outline-none cursor-pointer group z-10 ${
                      isResultCallout4Open
                        ? 'bg-[#ff6900] border border-transparent text-white shadow-[0_0_20px_rgba(255,105,0,0.6)]'
                        : 'bg-white/90 border border-white/60 hover:bg-[#ff6900] hover:border-transparent text-black hover:text-white'
                    }`}
                    aria-label="Toggle complexity management insight"
                  >
                    <motion.div
                      animate={{ rotate: isResultCallout4Open ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <Plus size={20} strokeWidth={1.75} className={isResultCallout4Open ? 'text-white' : 'text-black group-hover:text-white transition-colors duration-300'} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isResultCallout4Open && (
                      <motion.div
                        initial={{ opacity: 0, x: 12, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 12, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="absolute right-full mr-3 sm:mr-4 top-1/2 -translate-y-1/2 w-[240px] sm:w-[260px] md:w-[280px] max-w-[calc(100vw-140px)] bg-black/85 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 text-white shadow-xl pointer-events-auto"
                      >
                        <p className="text-[13px] md:text-[14px] lg:text-[15px] leading-[19px] md:leading-[21px] lg:leading-[22px] text-white/90 font-light text-left text-pretty">
                          <strong className="font-medium text-white">Complexity managed, not hidden</strong> — Hierarchy and progressive disclosure on the radar dashboard make real-time speed data readable at a glance, even outdoors and between reps.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 5. Right Phone - Upper Hardware Radar Sensor Waves */}
                <div 
                  className="hidden md:flex absolute z-20 items-center justify-center w-10 h-10"
                  style={{ left: '66%', top: 'calc(22% - 40px)', transform: 'translate(-50%, -50%)' }}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCallout(5); }}
                    className={`w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 flex-shrink-0 focus:outline-none cursor-pointer group z-10 ${
                      isResultCallout5Open
                        ? 'bg-[#ff6900] border border-transparent text-white shadow-[0_0_20px_rgba(255,105,0,0.6)]'
                        : 'bg-white/90 border border-white/60 hover:bg-[#ff6900] hover:border-transparent text-black hover:text-white'
                    }`}
                    aria-label="Toggle training experience insight"
                  >
                    <motion.div
                      animate={{ rotate: isResultCallout5Open ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <Plus size={20} strokeWidth={1.75} className={isResultCallout5Open ? 'text-white' : 'text-black group-hover:text-white transition-colors duration-300'} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isResultCallout5Open && (
                      <motion.div
                        initial={{ opacity: 0, x: -12, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 12, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="absolute left-full ml-3 sm:ml-4 top-0 w-[240px] sm:w-[280px] md:w-[320px] max-w-[calc(32vw)] bg-black/85 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 text-white shadow-xl pointer-events-auto"
                      >
                        <p className="text-[13px] md:text-[14px] lg:text-[15px] leading-[19px] md:leading-[21px] lg:leading-[22px] text-white/90 font-light text-left text-pretty">
                          <strong className="font-medium text-white">Complete training experience</strong> — The app turned a standalone radar sensor into a complete training experience, with a free app, AI coaching and sharing.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                {/* Existing iMac Callouts for Erwin project */}
                {/* Interactive Callout Button & Badge (Bottom Left) */}
                <div className="hidden md:flex absolute bottom-8 md:bottom-12 lg:bottom-16 left-6 md:left-8 lg:left-12 z-20 items-center h-[40px]">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCallout(1); }}
                    className={`w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 flex-shrink-0 focus:outline-none cursor-pointer group z-10 ${
                      isResultCalloutOpen
                        ? 'bg-[#ff6900] border border-transparent text-white shadow-[0_0_20px_rgba(255,105,0,0.6)]'
                        : 'bg-white/90 border border-white/60 hover:bg-[#ff6900] hover:border-transparent text-black hover:text-white'
                    }`}
                    aria-label="Toggle insight details"
                  >
                    <motion.div
                      animate={{ rotate: isResultCalloutOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <Plus size={20} strokeWidth={1.75} className={isResultCalloutOpen ? 'text-white' : 'text-black group-hover:text-white transition-colors duration-300'} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isResultCalloutOpen && (
                      <motion.div
                        initial={{ opacity: 0, x: -12, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -12, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="ml-3 sm:ml-4 w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] max-w-[calc(100vw-140px)] bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 text-white shadow-xl"
                      >
                        <p className="text-[13px] md:text-[14px] lg:text-[15px] leading-[19px] md:leading-[21px] lg:leading-[22px] text-white/90 font-light text-left text-pretty">
                          <strong className="font-medium text-white">Growth in new B2B clients</strong> — A major redesign of the legacy system made the product intuitive and attractive to the modern business market.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Interactive Callout Button 2 & Badge (Right Side) */}
                <div className="hidden md:flex absolute top-[52%] md:top-[54%] lg:top-[56%] right-6 md:right-8 lg:right-12 xl:right-16 -translate-y-1/2 z-20 flex-row-reverse items-center h-[40px]">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCallout(2); }}
                    className={`w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 flex-shrink-0 focus:outline-none cursor-pointer group z-10 ${
                      isResultCallout2Open
                        ? 'bg-[#ff6900] border border-transparent text-white shadow-[0_0_20px_rgba(255,105,0,0.6)]'
                        : 'bg-white/90 border border-white/60 hover:bg-[#ff6900] hover:border-transparent text-black hover:text-white'
                    }`}
                    aria-label="Toggle UI efficiency insight"
                  >
                    <motion.div
                      animate={{ rotate: isResultCallout2Open ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <Plus size={20} strokeWidth={1.75} className={isResultCallout2Open ? 'text-white' : 'text-black group-hover:text-white transition-colors duration-300'} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isResultCallout2Open && (
                      <motion.div
                        initial={{ opacity: 0, x: 12, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 12, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="mr-3 sm:mr-4 w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] max-w-[calc(100vw-140px)] bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 text-white shadow-xl"
                      >
                        <p className="text-[13px] md:text-[14px] lg:text-[15px] leading-[19px] md:leading-[21px] lg:leading-[22px] text-white/90 font-light text-left text-pretty">
                          <strong className="font-medium text-white">Less Time Lost to UI</strong> — Information hierarchy improvements made complex canvas views with 500+ entities faster to navigate — reducing daily friction for expert users.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Interactive Callout Button 3 & Badge (Bottom Screen Area / Stand) - Shifted left so badge fits screen */}
                <div className="hidden md:flex absolute bottom-[16%] md:bottom-[18%] lg:bottom-[20%] left-[8%] sm:left-[10%] md:left-[12%] lg:left-[16%] z-20 items-center h-[40px]">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCallout(3); }}
                    className={`w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 flex-shrink-0 focus:outline-none cursor-pointer group z-10 ${
                      isResultCallout3Open
                        ? 'bg-[#ff6900] border border-transparent text-white shadow-[0_0_20px_rgba(255,105,0,0.6)]'
                        : 'bg-white/90 border border-white/60 hover:bg-[#ff6900] hover:border-transparent text-black hover:text-white'
                    }`}
                    aria-label="Toggle user adoption insight"
                  >
                    <motion.div
                      animate={{ rotate: isResultCallout3Open ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <Plus size={20} strokeWidth={1.75} className={isResultCallout3Open ? 'text-white' : 'text-black group-hover:text-white transition-colors duration-300'} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isResultCallout3Open && (
                      <motion.div
                        initial={{ opacity: 0, x: -12, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -12, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="ml-3 sm:ml-4 w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] max-w-[calc(100vw-140px)] bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 text-white shadow-xl"
                      >
                        <p className="text-[13px] md:text-[14px] lg:text-[15px] leading-[19px] md:leading-[21px] lg:leading-[22px] text-white/90 font-light text-left text-pretty">
                          <strong className="font-medium text-white">Improved adoption</strong> — Created a more intuitive and modern experience that increased user engagement with the platform.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Interactive Callout Button 4 & Badge (Left Edge / Navigation Canvas) */}
                <div className="hidden md:flex absolute top-[50%] md:top-[52%] lg:top-[54%] left-6 md:left-8 lg:left-12 xl:left-16 -translate-y-1/2 z-20 items-center h-[40px]">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCallout(4); }}
                    className={`w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 flex-shrink-0 focus:outline-none cursor-pointer group z-10 ${
                      isResultCallout4Open
                        ? 'bg-[#ff6900] border border-transparent text-white shadow-[0_0_20px_rgba(255,105,0,0.6)]'
                        : 'bg-white/90 border border-white/60 hover:bg-[#ff6900] hover:border-transparent text-black hover:text-white'
                    }`}
                    aria-label="Toggle user journey insight"
                  >
                    <motion.div
                      animate={{ rotate: isResultCallout4Open ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <Plus size={20} strokeWidth={1.75} className={isResultCallout4Open ? 'text-white' : 'text-black group-hover:text-white transition-colors duration-300'} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isResultCallout4Open && (
                      <motion.div
                        initial={{ opacity: 0, x: -12, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -12, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="ml-3 sm:ml-4 w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] max-w-[calc(100vw-140px)] bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 text-white shadow-xl"
                      >
                        <p className="text-[13px] md:text-[14px] lg:text-[15px] leading-[19px] md:leading-[21px] lg:leading-[22px] text-white/90 font-light text-left text-pretty">
                          <strong className="font-medium text-white">Reduced friction</strong> — Improved user journeys, navigation, and interaction patterns across key scenarios.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Interactive Callout Button 5 & Badge (Top Right Monitor Screen) */}
                <div className="hidden md:flex absolute top-[12%] md:top-[14%] lg:top-[15%] right-[10%] md:right-[14%] lg:right-[18%] xl:right-[22%] z-20 items-center h-[40px]">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCallout(5); }}
                    className={`w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 flex-shrink-0 focus:outline-none cursor-pointer group z-10 ${
                      isResultCallout5Open
                        ? 'bg-[#ff6900] border border-transparent text-white shadow-[0_0_20px_rgba(255,105,0,0.6)]'
                        : 'bg-white/90 border border-white/60 hover:bg-[#ff6900] hover:border-transparent text-black hover:text-white'
                    }`}
                    aria-label="Toggle component library insight"
                  >
                    <motion.div
                      animate={{ rotate: isResultCallout5Open ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <Plus size={20} strokeWidth={1.75} className={isResultCallout5Open ? 'text-white' : 'text-black group-hover:text-white transition-colors duration-300'} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isResultCallout5Open && (
                      <motion.div
                        initial={{ opacity: 0, x: 12, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 12, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="absolute right-full mr-3 sm:mr-4 top-0 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 text-white shadow-xl w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] max-w-[calc(100vw-140px)]"
                      >
                        <p className="text-[13px] md:text-[14px] lg:text-[15px] leading-[19px] md:leading-[21px] lg:leading-[22px] text-white/90 font-light text-left text-pretty">
                          <strong className="font-medium text-white">Scalable foundations</strong> — Created reusable, customizable components so teams could scale product improvements more efficiently.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>

          {/* Mobile / Tablet Outcomes List (Clean text with icon, no card background) */}
          <div className="flex flex-col gap-9 mt-10 md:hidden">
            {(project.id === 'nexus' ? [
              {
                title: "Product Launched from Zero",
                desc: "The hardware existed, but the product didn’t. I designed the full app solo, and it went live on the App Store and Google Play across iOS, Android and Apple Watch."
              },
              {
                title: "Faster Time-to-Value",
                desc: "Simplified onboarding and a step-by-step pairing flow with clear status feedback cut device pairing from ~2 minutes to under 40 seconds."
              },
              {
                title: "Simple for Every User, at Any Age",
                desc: "A hierarchy-first dashboard and a session flow built for setup in under a minute make a complex radar product easy to configure for athletes and coaches of all ages."
              },
              {
                title: "Complexity Managed, Not Hidden",
                desc: "Hierarchy and progressive disclosure on the radar dashboard make real-time speed data readable at a glance, even outdoors and between reps."
              },
              {
                title: "Complete Training Experience",
                desc: "The app turned a standalone radar sensor into a complete training experience, with a free app, AI coaching and sharing."
              }
            ] : [
              {
                title: "Growth in new B2B clients",
                desc: "A major redesign of the legacy system made the product intuitive and attractive to the modern business market."
              },
              {
                title: "Less Time Lost to UI",
                desc: "Information hierarchy improvements made complex canvas views with 500+ entities faster to navigate — reducing daily friction for expert users."
              },
              {
                title: "Improved Adoption",
                desc: "Created a more intuitive and modern experience that increased user engagement with the platform."
              },
              {
                title: "Reduced Friction",
                desc: "Improved user journeys, navigation, and interaction patterns across key scenarios."
              },
              {
                title: "Scalable Foundations",
                desc: "Created reusable, customizable components so teams could scale product improvements more efficiently."
              }
            ]).map((outcome, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-[8px] bg-[#ff6900]/15 flex items-center justify-center text-[#ff6900] flex-shrink-0">
                    <Plus size={15} strokeWidth={2.2} className="text-[#ff6900]" />
                  </div>
                  <h4 className="text-[18px] leading-[24px] font-bold text-white tracking-normal">
                    {outcome.title}
                  </h4>
                </div>
                <p className="text-[15px] leading-[22px] font-light text-white/50">
                  {outcome.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>



          {/* The Challenge Section */}
          {project.challengeText && (
            <motion.div 
              id="case-problem"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-[120px] md:mt-[176px] w-full"
            >
              {/* Left Column: Heading (Sticky on Desktop) */}
              <div className="lg:col-span-4 xl:col-span-4 xl:row-span-2 xl:sticky xl:top-32 h-fit lg:pt-[4px]">
                <EyebrowReveal text="Problem Statement" delay={0.05} />
                <h2 className="text-[36px] md:text-4xl font-dm-sans font-extrabold tracking-[-1px] md:tracking-[-1px] text-white leading-[40px] md:leading-tight flex flex-wrap">
                  <TextReveal text="The Challenge" delay={0.2} wrapperClassName="inline-flex w-full" />
                </h2>
              </div>
              
              {/* Right Column: Described details */}
              <div className="lg:col-span-8 lg:col-start-5 xl:col-span-8 xl:col-start-5 xl:max-w-[896px] w-full">
                <p className="text-[18px] sm:text-[20px] leading-[26px] sm:leading-[28px] text-white/60 font-light">
                  {project.challengeText}
                </p>
                
                <div className="my-8 pl-5 border-l-2 border-[#ff6900] py-0.5 md:py-1">
                  <p className="font-serif italic text-xl md:text-2xl text-[#ff6900] leading-relaxed tracking-normal">
                    {project.challengeQuote || "The product worked. But the interface hadn't evolved."}
                  </p>
                </div>

                <p className="text-[18px] sm:text-[20px] leading-[26px] sm:leading-[28px] text-white/60 font-light">
                  {project.challengeFollowup || "The challenge wasn't to redesign — it was to rebuild the system layer by layer, without breaking a single workflow."}
                </p>
              </div>

              {/* 4 Gray Semi-transparent Cards: Full width on horizontal tablet (lg:col-span-12), right column on desktop (xl:col-span-8) */}
              <div className="col-span-1 lg:col-span-12 xl:col-span-8 xl:col-start-5 xl:max-w-[896px] w-full mt-6 md:mt-8 xl:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-3 lg:gap-3 xl:gap-6">
                {(project.challengeCards || [
                  {
                    title: "Modernize",
                    desc: "Upgrade the visual language and interaction patterns to meet modern enterprise standards."
                  },
                  {
                    title: "Preserve",
                    desc: "Keep the deep, precise workflows that power users had built muscle memory around for years."
                  },
                  {
                    title: "Scale",
                    desc: "Build a system flexible enough to support both current desktop and future cloud surfaces."
                  },
                  {
                    title: "Reduce Debt",
                    desc: "Eliminate UI fragmentation across canvases, dialogs, and admin screens — without disruption."
                  }
                ]).map((item, index) => (
                  <div 
                    key={index} 
                    className="p-5 md:p-6 lg:p-6 xl:p-8 rounded-2xl border border-white/[0.12] bg-white/[0.03] backdrop-blur-[2px] hover:border-white/[0.17] hover:bg-white/[0.05] transition-all duration-500 flex flex-col gap-3 md:gap-4 text-left"
                  >
                    <div className="flex items-center gap-[14px]">
                      <div className="w-8 h-8 rounded-lg bg-[#0082ff]/10 flex items-center justify-center text-[#0082ff] flex-shrink-0">
                        <svg 
                          className="w-[17px] h-[17px] animate-pulse-slow fill-current" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 4c0 4.5 3.5 8 8 8-4.5 0-8 3.5-8 8 0-4.5-3.5-8-8-8 4.5 0 8-3.5 8-8z" />
                        </svg>
                      </div>
                      <h4 className="text-[20px] leading-[28px] font-bold text-white tracking-normal capitalize">{item.title}</h4>
                    </div>
                    <p className="text-[15px] text-white/50 leading-[22px] font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Duplicated Before / After Section under the 4 cards (Only for Erwin) */}
          {project.id === 'erwin' && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full mt-[120px] md:mt-24 lg:mt-[176px]"
            >
              <div className="flex items-center gap-6 mb-6">
                <EyebrowReveal 
                  text="before / after" 
                  delay={0.05} 
                  wrapperClassName="text-[10px] uppercase tracking-[0.14em] text-white/30 font-light whitespace-nowrap" 
                />
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  style={{ transformOrigin: "left" }}
                  className="h-[1px] bg-white/[0.12] flex-grow" 
                />
              </div>
              
              {/* Before / After Preview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-3 lg:gap-3 xl:gap-6">
                <HoverBadgeCard
                  id="before-preview"
                  onClick={() => setLightboxImage("/before.png")}
                  className="relative w-full aspect-[5000/3932] lg:aspect-[10/7] xl:aspect-none xl:h-[432px] rounded-2xl border border-white/[0.12] bg-transparent flex flex-col items-center justify-center overflow-hidden"
                >
                  <img 
                    src="/before.png" 
                    alt="Before preview" 
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-center z-10"
                    referrerPolicy="no-referrer"
                  />
                </HoverBadgeCard>
                <HoverBadgeCard
                  id="after-preview"
                  onClick={() => setLightboxImage("/after.png")}
                  className="relative w-full aspect-[5000/3932] lg:aspect-[10/7] xl:aspect-none xl:h-[432px] rounded-2xl border border-white/[0.12] bg-transparent flex flex-col items-center justify-center overflow-hidden"
                >
                  <img 
                    src="/after.png" 
                    alt="After preview" 
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-center z-10"
                    referrerPolicy="no-referrer"
                  />
                </HoverBadgeCard>
              </div>
            </motion.div>
          )}

          {/* Dark / Light Theme Section (Under The Challenge for TAG) */}
          {project.id === 'nexus' && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full mt-[120px] md:mt-24 lg:mt-[176px]"
            >
              {/* Dark / Light Theme Preview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-3 lg:gap-3 xl:gap-6">
                {project.id !== 'nexus' ? (
                  <HoverBadgeCard
                    id="dark-theme-preview"
                    onClick={() => {
                      setLightboxImage("/dark teme.png");
                    }}
                    className="relative w-full aspect-[4/3] lg:aspect-[3/2] xl:aspect-none xl:h-[432px] bg-transparent rounded-2xl border border-white/[0.12] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 text-white/20 group-hover/card:text-white/40 transition-all duration-500 mb-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span className="text-xs text-white/30 group-hover/card:text-white/50 transition-colors duration-500 font-mono tracking-wider uppercase">placeholder: dark theme</span>
                  </HoverBadgeCard>
                ) : (
                  <div
                    id="dark-theme-preview"
                    className="relative w-full aspect-square bg-[#0c0c0e] rounded-2xl border border-white/[0.12] flex flex-col items-center justify-center overflow-hidden select-none cursor-default"
                  >
                    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0c0c0e]">
                      <ScrollPlayVideo
                        src="/TAG/iPhone - Air - Scene - 01 - packshot .mp4"
                        className="w-full h-full object-cover z-10"
                        loop={false}
                      />
                    </div>
                  </div>
                )}
                <HoverBadgeCard
                  id="light-theme-preview"
                  onClick={() => {
                    if (project.id !== 'nexus') {
                      setLightboxImage("/white teme.png");
                    } else {
                      setLightboxImage("/TAG/002.jpg");
                    }
                  }}
                  className={`relative w-full ${
                    project.id === 'nexus' 
                      ? 'aspect-square bg-[#0c0c0e]' 
                      : 'aspect-[4/3] lg:aspect-[3/2] xl:aspect-none xl:h-[432px] bg-transparent'
                  } rounded-2xl border border-white/[0.12] flex flex-col items-center justify-center overflow-hidden cursor-pointer`}
                >
                  {project.id === 'nexus' ? (
                    <img
                      src="/TAG/002.jpg"
                      alt="TAG iPhone Mockup"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover z-10 contrast-[0.90] saturate-[0.96] brightness-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 text-white/20 group-hover/card:text-white/40 transition-all duration-500 mb-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      <span className="text-xs text-white/30 group-hover/card:text-white/50 transition-colors duration-500 font-mono tracking-wider uppercase">placeholder: light theme</span>
                    </>
                  )}
                </HoverBadgeCard>
              </div>
            </motion.div>
          )}

          {/* Design Approach & Solution Section */}
          {project.solutionText && (
            <motion.div 
              id="case-approach"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-[120px] md:mt-[176px]"
            >
              {/* Left Column: Heading (Sticky on Desktop) */}
              <div className="lg:col-span-4 xl:col-span-4 xl:row-span-2 xl:sticky xl:top-32 h-fit lg:pt-[4px]">
                <EyebrowReveal text="DESIGN APPROACH" delay={0.05} />
                <h2 className="text-[36px] md:text-4xl font-dm-sans font-extrabold tracking-[-1px] md:tracking-[-1px] text-white leading-[40px] md:leading-tight flex flex-wrap">
                  <TextReveal text="Solution" delay={0.2} wrapperClassName="inline-flex w-full" />
                </h2>
              </div>
              
              {/* Right Column: Key Details */}
              <div className="lg:col-span-8 lg:col-start-5 xl:col-span-8 xl:col-start-5 xl:max-w-[896px] w-full">
                <div>
                  <p className="text-[20px] leading-[28px] text-white/60 font-light">
                    {project.solutionText}
                  </p>
                </div>
              </div>

              {/* Accordions: Full width on tablet landscape (lg:col-span-12), right column on desktop (xl:col-span-8) */}
              {project.solutionCards && project.solutionCards.length > 0 && (
                <div className="col-span-1 lg:col-span-12 xl:col-span-8 xl:col-start-5 xl:max-w-[896px] w-full mt-6 md:mt-10 xl:mt-8">
                  <SolutionAccordion key={project.id} cards={project.solutionCards} />
                </div>
              )}
            </motion.div>
          )}

          {/* Big Overview Placeholder under Solution (for TAG) */}
          {project.id === 'nexus' && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full mt-[120px] md:mt-24 lg:mt-[176px]"
            >
              {/* Registration Flow Header */}
              <div className="flex items-center gap-6 mb-6 w-full">
                <EyebrowReveal 
                  text="Registration Flow" 
                  delay={0.05} 
                  wrapperClassName="text-[10px] uppercase tracking-[0.14em] text-white/30 font-light whitespace-nowrap"
                />
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  style={{ transformOrigin: "left" }}
                  className="h-[1px] bg-white/[0.12] flex-grow" 
                />
              </div>

              {/* Registration Flow Card */}
              <HoverBadgeCard
                id="solution-overview-ph"
                onClick={() => setLightboxImage("/TAG/registration flow.png")}
                className="relative w-full aspect-[2736/1344] md:aspect-auto md:h-[672px] bg-[#0c0c0e] rounded-2xl border border-white/[0.12] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
              >
                <img
                  src="/TAG/registration flow.png"
                  alt="TAG Registration Flow"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-contain md:object-cover z-10"
                  referrerPolicy="no-referrer"
                />
              </HoverBadgeCard>

              {/* Two square placeholders below */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-y-8 gap-x-6 lg:gap-x-8 items-start w-full mt-12 md:mt-16 lg:mt-20">
                {/* Square 1 */}
                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-6 mb-6 w-full">
                    <EyebrowReveal 
                      text="practical use of the device" 
                      delay={0.05} 
                      wrapperClassName="text-[10px] uppercase tracking-[0.14em] text-white/30 font-light whitespace-nowrap"
                    />
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true }}
                      style={{ transformOrigin: "left" }}
                      className="h-[1px] bg-white/[0.12] flex-grow" 
                    />
                  </div>
                  <div
                    id="solution-square-1-ph"
                    className="relative w-full aspect-square bg-[#0c0c0e] rounded-2xl border border-white/[0.12] flex flex-col items-center justify-center overflow-hidden select-none cursor-default"
                  >
                    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0c0c0e]">
                      <ScrollPlayVideo
                        src="/TAG/SaveClip.App_AQOQU5_69XDnocgFVevK7p6Mtbwlom_7cvJu5Elzqlm2PMqika3U-4466YwJZDxDX98RGse13QJWjq3bjUvhBcjdVIrIijyBEtJ0itM.mp4"
                        className="w-full h-full object-cover z-10"
                        loop={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Square 2 */}
                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-6 mb-6 w-full">
                    <EyebrowReveal 
                      text="Onboarding Flow" 
                      delay={0.05} 
                      wrapperClassName="text-[10px] uppercase tracking-[0.14em] text-white/30 font-light whitespace-nowrap"
                    />
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true }}
                      style={{ transformOrigin: "left" }}
                      className="h-[1px] bg-white/[0.12] flex-grow" 
                    />
                  </div>
                  <TagOnboardingSlider onImageClick={(src) => setLightboxImage(src)} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Dark / Light Theme Section (For Erwin) */}
          {project.id !== 'nexus' && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full mt-[120px] md:mt-24 lg:mt-[176px]"
            >
              <div className="flex items-center gap-6 mb-6">
                <EyebrowReveal 
                  text="Dark / Light themes" 
                  delay={0.05} 
                  wrapperClassName="text-[10px] uppercase tracking-[0.14em] text-white/30 font-light whitespace-nowrap" 
                />
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  style={{ transformOrigin: "left" }}
                  className="h-[1px] bg-white/[0.12] flex-grow" 
                />
              </div>
              
              {/* Dark / Light Theme Preview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-3 lg:gap-3 xl:gap-6">
                <HoverBadgeCard
                  id="dark-theme-preview"
                  onClick={() => {
                    setLightboxImage("/dark teme.png");
                  }}
                  className="relative w-full aspect-[4/3] lg:aspect-[3/2] xl:aspect-none xl:h-[432px] rounded-2xl border border-white/[0.12] bg-transparent flex flex-col items-center justify-center overflow-hidden"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 text-white/20 group-hover/card:text-white/40 transition-all duration-500 mb-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span className="text-xs text-white/30 group-hover/card:text-white/50 transition-colors duration-500 font-mono tracking-wider uppercase">placeholder: dark theme</span>
                  <img 
                    src="/dark teme.png" 
                    alt="Dark theme preview" 
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-center z-10 opacity-0 transition-opacity duration-500"
                    referrerPolicy="no-referrer"
                    onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                  />
                </HoverBadgeCard>
                <HoverBadgeCard
                  id="light-theme-preview"
                  onClick={() => {
                    setLightboxImage("/white teme.png");
                  }}
                  className="relative w-full aspect-[4/3] lg:aspect-[3/2] xl:aspect-none xl:h-[432px] rounded-2xl border border-white/[0.12] bg-transparent flex flex-col items-center justify-center overflow-hidden"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 text-white/20 group-hover/card:text-white/40 transition-all duration-500 mb-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span className="text-xs text-white/30 group-hover/card:text-white/50 transition-colors duration-500 font-mono tracking-wider uppercase">placeholder: light theme</span>
                  <img 
                    src="/white teme.png" 
                    alt="Light theme preview" 
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-center z-10 opacity-0 transition-opacity duration-500"
                    referrerPolicy="no-referrer"
                    onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                  />
                </HoverBadgeCard>
              </div>
            </motion.div>
          )}

          {/* My Contribution Section */}
          <motion.div 
            id="case-contribution"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full mt-[120px] md:mt-[176px]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 w-full">
              {/* Left Column: Heading (Sticky on Desktop) */}
              <div className="lg:col-span-4 xl:col-span-4 xl:row-span-2 xl:sticky xl:top-32 h-fit lg:pt-[4px]">
                <EyebrowReveal text={project.contributionLabel || "MY CONTRIBUTION"} delay={0.05} />
                <h2 className="text-[36px] md:text-4xl font-dm-sans font-extrabold tracking-[-1px] md:tracking-[-1px] text-white leading-[40px] md:leading-tight flex flex-wrap">
                  <TextReveal text={project.contributionTitle || "What I Actually Did"} delay={0.2} wrapperClassName="inline-flex w-full" />
                </h2>
              </div>
              
              {/* Right Column: Key Details */}
              <div className="lg:col-span-8 lg:col-start-5 xl:col-span-8 xl:col-start-5 xl:max-w-[896px] w-full">
                <p className="text-[18px] sm:text-[20px] leading-[26px] sm:leading-[28px] text-white/60 font-light">
                  {project.contributionIntro || "I owned the design end-to-end — from system architecture to component delivery. No existing design system, no established patterns, no handoff process. I built the foundation from scratch while shipping features in parallel with engineering."}
                </p>
              </div>

              {/* Cards stacked one under another: Full width on horizontal tablet (lg:col-span-12), right column on desktop (xl:col-span-8) */}
              <div className="col-span-1 lg:col-span-12 xl:col-span-8 xl:col-start-5 xl:max-w-[896px] w-full mt-6 md:mt-8 xl:mt-8 grid grid-cols-1 gap-3 md:gap-4 xl:gap-4">
                {(project.contributionCards || [
                  {
                    title: "Design Tokens",
                    desc: "Color, spacing, and typography — the single source of truth for the entire visual system across desktop and future cloud surfaces."
                  },
                  {
                    title: "Component Library",
                    desc: "220+ reusable components across 6 surface types: canvases, dialogs, property panels, tables, toolbars, and admin screens."
                  },
                  {
                    title: "Layout Templates",
                    desc: "A “construction kit” I designed for engineering — preassembled screen templates developers could use directly, without waiting on design."
                  },
                  {
                    title: "Accessibility Baselines",
                    desc: "Contrast ratios, keyboard navigation, and focus states built into every component by default — not added after the fact."
                  }
                ]).map((item, index) => {
                  const getIcon = (title: string, idx: number) => {
                    const t = title.toLowerCase();
                    if (t.includes('brand') || t.includes('token') || t.includes('identity')) return Sparkles;
                    if (t.includes('flow') || t.includes('ux') || t.includes('logic')) return Workflow;
                    if (t.includes('dashboard') || t.includes('data') || t.includes('radar') || t.includes('template')) return Gauge;
                    if (t.includes('onboard') || t.includes('access') || t.includes('simplif') || t.includes('speed')) return Zap;
                    if (t.includes('component') || t.includes('library')) return Layers;
                    const icons = [Palette, Layers, LayoutTemplate, ShieldCheck];
                    return icons[idx % icons.length];
                  };
                  const Icon = getIcon(item.title, index);
                  return (
                    <div 
                      key={index} 
                      className="p-5 md:p-6 lg:p-6 xl:p-8 rounded-2xl border border-white/[0.12] bg-white/[0.03] backdrop-blur-[2px] hover:border-[#ff6900]/30 hover:bg-white/[0.05] transition-all duration-500 flex flex-col gap-3 md:gap-4 text-left group"
                    >
                      <div className="flex items-center gap-[14px]">
                        <div className="w-8 h-8 rounded-lg bg-[#ff6900]/10 flex items-center justify-center text-[#ff6900] flex-shrink-0">
                          <Icon size={16} className="text-[#ff6900]" />
                        </div>
                        <h4 className="text-[20px] leading-[28px] font-bold text-white tracking-normal group-hover:text-white transition-colors duration-300">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-[15px] text-white/50 leading-[22px] font-light group-hover:text-white/70 transition-colors duration-300">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Duplicated Placeholders with custom layout: 1 big + 2 below */}
            <div className="w-full mt-[120px] md:mt-24 lg:mt-[176px]">
              {/* One big placeholder (for Erwin) */}
              {project.id !== 'nexus' && (
                <HoverBadgeCard
                  id="contribution-overview-ph"
                  onClick={() => {
                    setLightboxImage("/Erwin/Pics/laptop static -3.png");
                  }}
                  style={{
                    paddingBottom: 'calc((2413 / 4000) * 100% - 8px)'
                  }}
                  className="relative w-full bg-[#0c0c0e] rounded-2xl border border-white/[0.12] overflow-hidden mb-4 md:mb-16"
                >
                  <img
                    src="/Erwin/Pics/laptop%20static%20-3.png"
                    alt="Erwin Contribution Overview Mockup"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-top z-10"
                    referrerPolicy="no-referrer"
                  />
                </HoverBadgeCard>
              )}

              {/* Two placeholders below: stacked on tablet, 2 cols on desktop */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-4 lg:gap-4 xl:gap-6 items-start">
                {project.id !== 'nexus' ? (
                  <div
                    id="component-library-ph"
                    style={{
                      aspectRatio: '3333 / 2500'
                    }}
                    className="relative w-full rounded-2xl border border-white/[0.12] bg-[#0c0c0e] flex flex-col items-center justify-center overflow-hidden select-none"
                  >
                    <ScrollPlayVideo
                      src="/Erwin/Pics/MacBook%20video.mp4"
                      className="absolute inset-0 w-full h-full object-cover z-10"
                    />
                  </div>
                ) : (
                  <HoverBadgeCard
                    id="component-library-ph"
                    onClick={() => {
                      setLightboxImage("/TAG/Frame 28124083.png");
                    }}
                    style={{
                      aspectRatio: '1 / 1'
                    }}
                    className="relative w-full aspect-square rounded-2xl border border-white/[0.12] bg-[#0c0c0e] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
                  >
                    <img
                      src="/TAG/Frame 28124083.png"
                      alt="TAG Component Library"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover z-10"
                      referrerPolicy="no-referrer"
                    />
                  </HoverBadgeCard>
                )}
                {project.id !== 'nexus' ? (
                  <HoverBadgeCard
                    id="construction-kit-ph"
                    onClick={() => {
                      setLightboxImage("/Erwin/Pics/laptop static.png");
                    }}
                    style={{
                      aspectRatio: '3333 / 2500'
                    }}
                    className="relative w-full bg-[#0c0c0e] rounded-2xl border border-white/[0.12] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
                  >
                    <img
                      src="/Erwin/Pics/laptop%20static.png"
                      alt="Erwin Construction Kit Mockup"
                      className="absolute inset-0 w-full h-full object-cover z-10"
                      referrerPolicy="no-referrer"
                    />
                  </HoverBadgeCard>
                ) : (
                  <div
                    id="construction-kit-ph"
                    style={{
                      aspectRatio: '1 / 1'
                    }}
                    className="relative w-full aspect-square bg-[#0c0c0e] rounded-2xl border border-white/[0.12] flex flex-col items-center justify-center overflow-hidden select-none cursor-default"
                  >
                    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0c0c0e]">
                      <ScrollPlayVideo
                        src="/TAG/ssstwitter.com_1791282335915 (online-video-cutter.com).mp4"
                        className="w-full h-full object-cover z-10 brightness-[1.18] contrast-[1.02]"
                        loop={true}
                      />
                      {/* Film Grain Overlay */}
                      <div 
                        className="absolute inset-0 pointer-events-none opacity-[0.28] z-20 select-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='tagLoopVideoGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23tagLoopVideoGrain)'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'repeat',
                          backgroundSize: '120px 120px',
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Impact Section */}
          <motion.div 
            id="case-results"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full mt-[120px] md:mt-[176px]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-0 lg:mb-16">
              {/* Left Column: Heading (Sticky on Desktop) */}
              <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit lg:pt-[4px]">
                <EyebrowReveal text={project.resultsLabel || "IMPACT"} delay={0.05} />
                <h2 className="text-[36px] md:text-4xl font-dm-sans font-extrabold tracking-[-1px] md:tracking-[-1px] text-white leading-[40px] md:leading-tight flex flex-wrap">
                  <TextReveal text={project.resultsHeading || "Results"} delay={0.2} wrapperClassName="inline-flex w-full" />
                </h2>
              </div>
              
              {/* Right Column: Key Details */}
              <div className="lg:col-span-8 lg:col-start-5 lg:max-w-[896px] w-full lg:mt-[8px]">
                <p className="text-[18px] sm:text-[20px] leading-[26px] sm:leading-[28px] text-white/60 font-light">
                  {project.resultsIntro || "The UI/UX modernization delivered measurable improvements across design, engineering, and daily workflows of Fortune 500 data architects. Every metric below reflects a decision made at the system level, not the screen level."}
                </p>
              </div>
            </div>

            {/* Full Width Header for System Metrics */}
            <div className="flex items-center gap-6 mb-6 mt-12 sm:mt-16 md:mt-20 w-full">
              <EyebrowReveal 
                text="system metrics" 
                delay={0.05} 
                wrapperClassName="text-[10px] uppercase tracking-[0.14em] text-white/30 font-light whitespace-nowrap"
              />
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                style={{ transformOrigin: "left" }}
                className="h-[1px] bg-white/[0.12] flex-grow" 
              />
            </div>

            {/* Interactive Side-by-Side Results Layout */}
            <div className="flex flex-col xl:grid xl:grid-cols-12 gap-8 xl:gap-12 items-end w-full text-left">
              
              {/* Left Column: Result description with Solution block style (order-2 on mobile/tablet, order-1 on desktop) */}
              <div className="order-2 xl:order-1 xl:col-span-4 h-fit xl:mb-[80px] w-full md:mt-2 xl:mt-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeResultIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-col text-left"
                  >
                    {/* Large display metric */}
                    {(() => {
                      const badgeText = resultsItems[activeResultIdx]?.badge || '';
                      const isNumeric = /^[0-9+\-.,—–\s%xX→]+$/.test(badgeText);
                      
                      return (
                        <div className={`font-normal font-sans tracking-tight text-white mb-4 flex items-center ${
                          isNumeric 
                            ? 'text-[26px] leading-[32px] md:text-[48px] md:leading-[48px]' 
                            : 'text-[26px] leading-[32px] md:text-[36px] md:leading-[44px]'
                        }`}>
                          {badgeText.includes('→') ? (
                            <span className="inline-flex items-center gap-2 md:gap-3">
                              <span>{badgeText.split('→')[0].trim()}</span>
                              <svg
                                className="w-[30px] h-[18px] md:w-[50px] md:h-[28px] text-white flex-shrink-0"
                                viewBox="0 0 50 28"
                                fill="none"
                              >
                                <line
                                  x1="2"
                                  y1="14"
                                  x2="40"
                                  y2="14"
                                  stroke="currentColor"
                                  strokeWidth="4.5"
                                  strokeLinecap="square"
                                />
                                <polyline
                                  points="34,4 44,14 34,24"
                                  stroke="currentColor"
                                  strokeWidth="4.5"
                                  strokeLinecap="square"
                                  strokeLinejoin="miter"
                                  strokeMiterlimit="10"
                                  fill="none"
                                />
                              </svg>
                              <span>{badgeText.split('→')[1].trim()}</span>
                            </span>
                          ) : (
                            badgeText
                          )}
                        </div>
                      );
                    })()}
                    {/* Description text */}
                    <div className="text-left w-full xl:w-[380px] max-w-full">
                      <p className="text-[16px] text-white/55 leading-[24px] font-light">
                        {isLargeScreen
                          ? resultsItems[activeResultIdx]?.text
                          : (resultsItems[activeResultIdx]?.mobileText || resultsItems[activeResultIdx]?.text)}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Controls on mobile and tablet (under text, outside AnimatePresence so they remain stable like home sliders) */}
                <div className="flex xl:hidden items-center mt-6 w-full pl-0">
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => {
                        handlePrev();
                        setActiveArrow('prev');
                        setTimeout(() => setActiveArrow(null), 150);
                      }}
                      className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer focus:outline-none ${
                        activeArrow === 'prev'
                          ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]'
                          : 'border-white/[0.12] bg-transparent text-white hover:border-white/30 hover:bg-white/5 active:border-[#ff6900] active:bg-[#ff6900]/10 active:text-[#ff6900]'
                      }`}
                      aria-label="Previous slide"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      onClick={() => {
                        handleNext();
                        setActiveArrow('next');
                        setTimeout(() => setActiveArrow(null), 150);
                      }}
                      className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer focus:outline-none ${
                        activeArrow === 'next'
                          ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]'
                          : 'border-white/[0.12] bg-transparent text-white hover:border-white/30 hover:bg-white/5 active:border-[#ff6900] active:bg-[#ff6900]/10 active:text-[#ff6900]'
                      }`}
                      aria-label="Next slide"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  {/* Divider Line to the right of controls */}
                  <div className="block flex-1 h-[1px] bg-white/[0.12] ml-3 sm:ml-4" />
                </div>
              </div>

              {/* Right Column: Visual placeholder & slide navigation controls (order-1 on mobile/tablet, order-2 on desktop) */}
              <div className="order-1 xl:order-2 xl:col-span-8 xl:col-start-5 xl:max-w-[896px] w-full flex flex-col">
                {/* Viewport container with overflow-hidden and fade mask */}
                <div 
                  data-draggable="true"
                  className="w-full lg:w-[calc(100%+2rem)] xl:w-full lg:-mr-8 xl:mr-0 overflow-hidden rounded-2xl lg:rounded-r-none xl:rounded-r-2xl lg:slider-fade-mask cursor-grab active:cursor-grabbing select-none"
                  onMouseDown={(e) => handleDragStart(e.clientX)}
                  onMouseMove={(e) => handleDragMove(e.clientX)}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                  onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                  onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                  onTouchEnd={handleDragEnd}
                >
                  {/* Slider track */}
                  <div 
                    className={`flex gap-4 xl:gap-6 ${isTransitionEnabled ? 'transition-transform duration-500 ease-out' : ''}`}
                    style={{ 
                      transform: isLargeScreen 
                        ? `translateX(calc(-${currentIndex * 816}px - ${currentIndex * 24}px + ${dragOffset}px))` 
                        : isTabletLandscape
                        ? `translateX(calc(-${currentIndex * 100}% + ${currentIndex * 72}px + ${dragOffset}px))`
                        : `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 16}px + ${dragOffset}px))` 
                    }}
                  >
                    {[resultsItems[resultsItems.length - 1], ...resultsItems, resultsItems[0]].map((item, idx) => {
                      const Icon = item.icon;
                      let realIdx = idx - 1;
                      if (idx === 0) realIdx = resultsItems.length - 1;
                      if (idx === resultsItems.length + 1) realIdx = 0;
                      
                      const isActive = realIdx === activeResultIdx;
                      return (
                        <div 
                          key={idx}
                          data-draggable="true"
                          onClick={() => {
                            if (hasDragged) return;
                            if (!isTransitionEnabled) return;
                            if (typeof window !== 'undefined' && window.innerWidth < 1280) {
                              if (item.image) {
                                setLightboxImage(item.image);
                                return;
                              }
                            }
                            setCurrentIndex(idx);
                          }}
                          className={`flex-[0_0_100%] w-full lg:flex-[0_0_calc(100%-88px)] lg:w-[calc(100%-88px)] xl:flex-[0_0_816px] xl:w-[816px] xl:h-[568px] relative aspect-[816/568] xl:aspect-auto rounded-2xl border transition-all duration-500 overflow-hidden select-none cursor-grab active:cursor-grabbing ${
                            item.image ? 'cursor-pointer active:scale-[0.985] active:brightness-95 md:active:scale-100 md:active:brightness-100' : ''
                          } ${
                            isActive 
                              ? 'border-white/[0.16] bg-white/[0.04] opacity-100' 
                              : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14] opacity-[0.42] hover:opacity-[0.6]'
                          }`}
                        >
                          {/* Subtle Mobile Expand Indicator (matching other cards in case study) */}
                          {item.image && (
                            <div className="md:hidden absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/70 pointer-events-none transition-opacity duration-300">
                              <Maximize2 size={14} strokeWidth={1.5} className="text-white/80" />
                            </div>
                          )}

                          {/* Central content: pure image (without any zoom on hover) or placeholder */}
                          {(() => {
                            const placeholderMarkup = (
                              <>
                                {/* Blueprint grid background */}
                                <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
                                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                      <pattern id={`dotGridPh-${idx}`} width="16" height="16" patternUnits="userSpaceOnUse">
                                        <circle cx="2" cy="2" r="1" fill="currentColor" className="text-white" />
                                      </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill={`url(#dotGridPh-${idx})`} />
                                  </svg>
                                </div>

                                {/* Outer frame coordinates/markings */}
                                <div className="absolute top-3 left-3 text-[9px] font-mono text-white/30 tracking-wider z-10 pointer-events-none">
                                  {`SYS_REF: 0${realIdx + 1}`}
                                </div>
                                <div className="absolute bottom-3 right-3 text-[9px] font-mono text-white/30 z-10 pointer-events-none">
                                  {isLargeScreen ? 'W_816PX // H_568PX' : 'W_92% // H_GOLDEN'}
                                </div>

                                {/* Corner crosshairs */}
                                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/[0.12] z-10 pointer-events-none" />
                                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/[0.12] z-10 pointer-events-none" />

                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                  <div className={`p-4 rounded-full border mb-3 transition-colors duration-500 ${
                                    isActive 
                                      ? 'border-white/20 bg-white/5 text-white/80' 
                                      : 'border-white/[0.12] bg-transparent text-white/35'
                                  }`}>
                                    <Icon size={24} strokeWidth={1.5} />
                                  </div>
                                  <span className={`text-[11px] font-mono tracking-widest uppercase transition-colors duration-500 ${
                                    isActive ? 'text-white/70' : 'text-white/40'
                                  }`}>
                                    {item.tag} Visual Placeholder
                                  </span>
                                </div>
                              </>
                            );

                            return item.image ? (
                              <SlideCardImage
                                src={item.image}
                                alt={item.tag || item.badge || 'Slide visual'}
                                fallback={placeholderMarkup}
                              />
                            ) : (
                              placeholderMarkup
                            );
                          })()}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Controls matching the exact alignment on desktop */}
                <div className="hidden xl:flex items-center mt-[40px] w-full pl-0">
                  {/* Left-to-middle: Arrow buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        handlePrev();
                        setActiveArrow('prev');
                        setTimeout(() => setActiveArrow(null), 150);
                      }}
                      className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer focus:outline-none ${
                        activeArrow === 'prev'
                          ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]'
                          : 'border-white/[0.12] bg-transparent text-white hover:border-white/30 hover:bg-white/5 active:border-[#ff6900] active:bg-[#ff6900]/10 active:text-[#ff6900]'
                      }`}
                      aria-label="Previous slide"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      onClick={() => {
                        handleNext();
                        setActiveArrow('next');
                        setTimeout(() => setActiveArrow(null), 150);
                      }}
                      className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer focus:outline-none ${
                        activeArrow === 'next'
                          ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]'
                          : 'border-white/[0.12] bg-transparent text-white hover:border-white/30 hover:bg-white/5 active:border-[#ff6900] active:bg-[#ff6900]/10 active:text-[#ff6900]'
                      }`}
                      aria-label="Next slide"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Full Design Preview Placeholder */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full mt-[120px] md:mt-[160px]"
          >
            {project.id === 'nexus' ? (
              <>
                <div className="flex items-center gap-6 mb-6 w-full">
                  <EyebrowReveal 
                    text="App-Based Device Controls" 
                    delay={0.05} 
                    wrapperClassName="text-[10px] uppercase tracking-[0.14em] text-white/30 font-light whitespace-nowrap"
                  />
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "left" }}
                    className="h-[1px] bg-white/[0.12] flex-grow" 
                  />
                </div>
                <TagVideoPlayer />
              </>
            ) : (
              <div 
                onClick={() => {
                  setLightboxImage("/Erwin/Pics/iMac-Showcase-Screen-Scene-Free-psd-Mockup.png");
                }}
                className="relative w-full rounded-2xl border border-white/[0.12] bg-[#0c0c0e] flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none transition-all duration-300 aspect-square md:aspect-[4490/2600]"
              >
                {/* Subtle Mobile Expand Indicator */}
                <div className="md:hidden absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/70 pointer-events-none transition-opacity duration-300">
                  <Maximize2 size={14} strokeWidth={1.5} className="text-white/80" />
                </div>

                <img
                  src="/Erwin/Pics/iMac-Showcase-Screen-Scene-Free-psd-Mockup.png"
                  alt="Erwin Data Modeler Showcase Mockup"
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </motion.div>

          {/* Reflection Section */}
          <motion.div 
            id="case-reflection"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full mt-[120px] md:mt-[176px]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
              {/* Left Column: Heading (Sticky on Desktop) */}
              <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit lg:pt-[4px]">
                <EyebrowReveal text="REFLECTION" delay={0.05} />
                <h2 className="text-[36px] md:text-4xl font-dm-sans font-extrabold tracking-[-1px] md:tracking-[-1px] text-white leading-[40px] md:leading-tight flex flex-wrap">
                  <TextReveal text="What I Learned" delay={0.2} wrapperClassName="inline-flex w-full" />
                </h2>
              </div>
              
              {/* Right Column: Key Details */}
              <div className="lg:col-span-8 lg:col-start-5 lg:max-w-[896px] w-full flex flex-col lg:pt-[4px]">
                {/* Interactive Slider of learnings */}
                <div>
                  {/* Desktop Horizontal Tabs with Progress Bars */}
                  <div className="hidden sm:grid sm:grid-cols-4 sm:gap-6 mb-0">
                    {currentLessons.map((lesson, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setMobileLessonIndex(4 + idx);
                          setLessonProgress(0);
                          setIsLessonTransitionEnabled(true);
                        }}
                        className="flex flex-col text-left group focus:outline-none select-none cursor-pointer"
                      >
                        <span className={`text-[10px] leading-[15px] uppercase tracking-[0.14em] font-sans transition-colors duration-300 font-medium whitespace-nowrap ${
                          idx === activeLessonIdx ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                        }`}>
                          <span className="mr-2 opacity-60">{lesson.num}</span>
                          <span>{lesson.tag}</span>
                        </span>
                        
                        <div className="h-[2px] w-full bg-white/[0.12] mt-5 relative overflow-hidden rounded-full">
                          <div 
                            className="absolute top-0 left-0 h-full bg-[#ff6900] rounded-full"
                            style={{ 
                              width: idx === activeLessonIdx ? `${lessonProgress}%` : '0%',
                              transition: idx === activeLessonIdx ? 'none' : 'width 0.3s ease-out'
                            }}
                          />
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Mobile Continuous Infinite Carousel Track */}
                  <div 
                    className="block sm:hidden w-full overflow-hidden select-none cursor-grab active:cursor-grabbing mt-[8px]"
                    onTouchStart={(e) => handleLessonDragStart(e.touches[0].clientX)}
                    onTouchMove={(e) => handleLessonDragMove(e.touches[0].clientX)}
                    onTouchEnd={handleLessonDragEnd}
                    onMouseDown={(e) => handleLessonDragStart(e.clientX)}
                    onMouseMove={(e) => handleLessonDragMove(e.clientX)}
                    onMouseUp={handleLessonDragEnd}
                    onMouseLeave={handleLessonDragEnd}
                  >
                    <div 
                      className={`flex gap-4 ${isLessonTransitionEnabled ? 'transition-transform duration-500 ease-out' : ''}`}
                      style={{ 
                        transform: `translateX(calc(-${mobileLessonIndex} * (78% + 8px) - ${mobileLessonIndex * 16}px + ${lessonDragOffset}px))` 
                      }}
                    >
                      {extendedLessons.map((lesson, idx) => {
                        const isCurrent = idx === mobileLessonIndex;
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              if (hasLessonDragged) return;
                              setMobileLessonIndex(idx);
                              setLessonProgress(0);
                              setIsLessonTransitionEnabled(true);
                            }}
                            className="flex flex-col text-left group focus:outline-none flex-[0_0_calc(78%+8px)] min-w-[calc(78%+8px)] select-none cursor-pointer"
                          >
                            <span className={`text-[10px] leading-[15px] uppercase tracking-[0.14em] font-sans transition-colors duration-300 font-medium whitespace-nowrap ${
                              isCurrent ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                            }`}>
                              <span className="mr-2 opacity-60">{lesson.num}</span>
                              <span>{lesson.tag}</span>
                            </span>
                            
                            <div className="h-[2px] w-full bg-white/[0.12] mt-5 relative overflow-hidden rounded-full">
                              <div 
                                className="absolute top-0 left-0 h-full bg-[#ff6900] rounded-full"
                                style={{ 
                                  width: isCurrent ? `${lessonProgress}%` : '0%',
                                  transition: isCurrent ? 'none' : 'width 0.3s ease-out'
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Lesson Description with animation */}
                  <div className="min-h-0 sm:min-h-[140px] flex items-start mt-6 sm:mt-11 pr-4 md:pr-12">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={activeLessonIdx}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-[26px] md:text-[36px] font-sans font-normal text-white leading-[32px] sm:leading-[44px] tracking-tight max-w-[728px]"
                      >
                        {currentLessons[activeLessonIdx]?.text}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonials Section */}
          <section className="mt-[120px] md:mt-[176px] mb-8 md:mb-12 relative" id="case-study-testimonial">
            {/* Ambient blue gradient spot on background */}
            <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/15 blur-[140px] rounded-full z-0 pointer-events-none" />

            <div className="w-full rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.12] p-6 sm:px-10 md:px-12 lg:px-14 sm:py-8 md:py-12 relative overflow-hidden z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-0 items-stretch">
                
                {/* Left Column: Testimonial Header, Name, Avatar, Role & Navigation Controls */}
                <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4 lg:space-y-6 lg:pr-8 xl:pr-10">
                  <div>
                    <div className="flex items-center justify-between mb-3 lg:mb-4">
                      <EyebrowReveal 
                        text="Project Feedback" 
                        delay={0.05} 
                        wrapperClassName="text-[10px] leading-[10px] font-normal tracking-[0.14em] uppercase text-[#ff6900] font-sans"
                      />
                      <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-[10px] leading-[10px] font-light tracking-[0.14em] uppercase text-white/50 font-sans select-none"
                      >
                        {counterText}
                      </motion.span>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentTestimonial.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col space-y-3 sm:space-y-5"
                      >
                        <h2 className="mt-1 sm:mt-2 text-[24px] sm:text-[32px] leading-[32px] sm:leading-[40px] font-dm-sans font-extrabold tracking-[-0.3px] sm:tracking-[-0.5px] text-white">
                          {currentTestimonial.name}
                        </h2>

                        <div className="flex items-center gap-4 mt-1 sm:mt-2">
                          <img 
                            src={currentTestimonial.avatar} 
                            alt={currentTestimonial.name}
                            className="w-[56px] h-[56px] sm:w-[72px] sm:h-[72px] rounded-full object-cover flex-shrink-0 bg-white/10"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentTestimonial.name)}&background=ffffff&color=ea580c`;
                            }}
                          />
                          <p className="text-[14px] sm:text-[15px] text-white/60 leading-[19px] sm:leading-[22px] font-light max-w-[280px] sm:max-w-[320px] line-clamp-3">
                            {currentTestimonial.position}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Slider Navigation Controls (Desktop) */}
                  {activeTestimonials.length > 1 && (
                    <div className="hidden lg:flex items-center gap-3 pt-6 lg:pt-0 -translate-y-2">
                      <button 
                        onClick={() => {
                          setTestimonialIdx((prev) => (prev === 0 ? activeTestimonials.length - 1 : prev - 1));
                          setActiveTestimonialArrow('prev');
                          setTimeout(() => setActiveTestimonialArrow(null), 150);
                        }}
                        className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer focus:outline-none ${
                          activeTestimonialArrow === 'prev'
                            ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]'
                            : 'border-white/[0.12] bg-transparent text-white hover:border-white/30 hover:bg-white/5 active:border-[#ff6900] active:bg-[#ff6900]/10 active:text-[#ff6900]'
                        }`}
                        aria-label="Previous testimonial"
                      >
                        <ArrowLeft size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          setTestimonialIdx((prev) => (prev === activeTestimonials.length - 1 ? 0 : prev + 1));
                          setActiveTestimonialArrow('next');
                          setTimeout(() => setActiveTestimonialArrow(null), 150);
                        }}
                        className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer focus:outline-none ${
                          activeTestimonialArrow === 'next'
                            ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]'
                            : 'border-white/[0.12] bg-transparent text-white hover:border-white/30 hover:bg-white/5 active:border-[#ff6900] active:bg-[#ff6900]/10 active:text-[#ff6900]'
                        }`}
                        aria-label="Next testimonial"
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Right Column: Key Details */}
                <div className="lg:col-span-8 flex flex-col justify-between lg:justify-center h-full min-h-[232px] sm:min-h-[257px] lg:min-h-[272px] lg:border-l border-white/10 lg:pl-8 xl:pl-10 pt-4 sm:pt-6 lg:pt-0">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentTestimonial.id + '-content'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7 }}
                      className={`space-y-4 text-white/60 hover:text-white transition-colors duration-300 ${currentTestimonial.fontSizeStyle || 'text-[20px] leading-[28px] italic font-light'}`}
                      style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                    >
                      {(() => {
                        const paragraphs = Array.isArray(currentTestimonial.content)
                          ? [...currentTestimonial.content]
                          : [currentTestimonial.content];

                        return paragraphs.map((paragraph, i) => {
                          const isFirst = i === 0;
                          const isLast = i === paragraphs.length - 1;
                          let text = paragraph;

                          if (isFirst) {
                            text = text.replace(/^[“"']/g, '');
                          }
                          if (isLast) {
                            text = text.replace(/[”"']$/g, '');
                          }

                          return (
                            <p key={i}>
                              {isFirst && (
                                <span 
                                  className="text-[#ff6900] font-medium text-[24px] sm:text-[26px] leading-none mr-1 sm:mr-1.5 select-none align-baseline not-italic font-['Hanken_Grotesk']"
                                >
                                  ‘‘
                                </span>
                              )}
                              {text}
                            </p>
                          );
                        });
                      })()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Slider Navigation Controls (Mobile - placed after testimonial text) */}
                  {activeTestimonials.length > 1 && (
                    <div className="flex lg:hidden items-center gap-3 mt-8 -translate-y-2">
                      <button 
                        onClick={() => {
                          setTestimonialIdx((prev) => (prev === 0 ? activeTestimonials.length - 1 : prev - 1));
                          setActiveTestimonialArrow('prev');
                          setTimeout(() => setActiveTestimonialArrow(null), 150);
                        }}
                        className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer focus:outline-none ${
                          activeTestimonialArrow === 'prev'
                            ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]'
                            : 'border-white/[0.12] bg-transparent text-white hover:border-white/30 hover:bg-white/5 active:border-[#ff6900] active:bg-[#ff6900]/10 active:text-[#ff6900]'
                        }`}
                        aria-label="Previous testimonial"
                      >
                        <ArrowLeft size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          setTestimonialIdx((prev) => (prev === activeTestimonials.length - 1 ? 0 : prev + 1));
                          setActiveTestimonialArrow('next');
                          setTimeout(() => setActiveTestimonialArrow(null), 150);
                        }}
                        className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer focus:outline-none ${
                          activeTestimonialArrow === 'next'
                            ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]'
                            : 'border-white/[0.12] bg-transparent text-white hover:border-white/30 hover:bg-white/5 active:border-[#ff6900] active:bg-[#ff6900]/10 active:text-[#ff6900]'
                        }`}
                        aria-label="Next testimonial"
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </section>

          {/* Recruiter-Oriented CTA & 3D Interactive Token (Pixeldarts Style) */}
          <CaseStudyCta />
      </div>

      {/* Next Project Section - Full width edge-to-edge */}
      {nextProject && (
        <section id="case-next-project" className="pb-[56px] pt-0 relative z-10 w-full">
          <Link 
            to={`/case-study/${nextProject.id}`}
            onClick={(e) => {
              e.preventDefault();
              navigateToCaseStudy(nextProject.id);
            }}
            className="group relative flex flex-col justify-end w-full sm:min-h-[376px] sm:h-[376px] overflow-hidden bg-[#080808]/95 border-y border-white/[0.12] transition-all duration-700 block cursor-pointer"
            id="next-project-banner"
            onMouseEnter={() => setIsNextProjectHovered(true)}
            onMouseLeave={() => setIsNextProjectHovered(false)}
          >
            {/* Background Image with Hover Zoom spanning full width */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src={nextProject.bannerImage || nextProject.image} 
                alt={nextProject.title}
                className="w-full h-full object-cover object-center opacity-[0.88] group-hover:opacity-100 brightness-100 group-hover:brightness-110 transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              {/* Sleek Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/75 to-[#080808]/20 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-[#080808]/40 z-10" />
            </div>

            {/* Content Container aligned with site grid */}
            <div className="container-custom w-full h-full sm:min-h-[376px] sm:h-[376px] flex flex-col justify-end py-[72px] sm:py-0 sm:pt-12 sm:pb-16 relative z-20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="flex flex-col items-start text-left">
                  <EyebrowReveal 
                    text="Next Project" 
                    delay={0.05} 
                    wrapperClassName="inline-block relative sm:-top-4 text-[10px] sm:text-[11px] leading-[10px] sm:leading-[15px] font-sans font-normal sm:font-light tracking-[0.14em] uppercase text-[#ff6900]/85 group-hover:text-[#ff6900] transition-colors duration-300 mb-4 sm:mb-1"
                  />
                  <h2 className="text-[36px] leading-[40px] md:text-[48px] md:leading-[48px] font-dm-sans font-extrabold text-white tracking-[-1px] md:tracking-[-1px] mb-4 md:mb-6 group-hover:text-[#ff6900] transition-colors duration-300">
                    {nextProject.title}
                  </h2>
                  <p className="text-[15px] leading-[22px] font-light text-white/50 max-w-[420px] group-hover:text-white/75 transition-colors duration-300">
                    {nextProject.description}
                  </p>
                </div>
              </div>

              {/* Right: Circle with subtle border & plus/arrow centered on both axes (vertical midpoint of banner + vertical center axis of Download CV button) */}
              <div className="hidden sm:flex items-center justify-end absolute inset-y-0 right-4 md:right-8 pr-0 md:pr-3 pointer-events-none z-30">
                <div className="w-[151px] flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/[0.05] border border-white/10 group-hover:border-[#ff6900] group-hover:bg-[#ff6900] backdrop-blur-[4px] flex items-center justify-center text-white shadow-2xl group-hover:scale-105 transition-all duration-300 ease-out relative">
                    <Plus 
                      size={32} 
                      strokeWidth={1.4} 
                      className="block group-hover:hidden absolute" 
                    />
                    <ArrowUpRight 
                      size={32} 
                      strokeWidth={1.4} 
                      className="hidden group-hover:block absolute" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md overscroll-contain"
          >
            {/* Fixed Top Toolbar Controls */}
            <div className="fixed top-4 right-4 z-[70] flex items-center gap-2">
              {!lightboxImage.endsWith('.mp4') && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLightboxZoomed(prev => !prev);
                  }}
                  className="h-[42px] px-4 flex items-center gap-2 bg-black/80 hover:bg-black text-white/90 hover:text-white rounded-full backdrop-blur-md border border-white/20 text-xs font-medium transition-all shadow-2xl cursor-pointer"
                  title={isLightboxZoomed ? "Fit to Screen" : "Expand Full Width"}
                >
                  {isLightboxZoomed ? (
                    <>
                      <Minimize2 className="w-4 h-4" />
                      <span>Fit Screen</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-4 h-4" />
                      <span>Full Width</span>
                    </>
                  )}
                </button>
              )}
              <button
                className="w-[42px] h-[42px] flex items-center justify-center bg-black/80 hover:bg-black text-white/90 hover:text-white rounded-full backdrop-blur-md transition-colors border border-white/20 cursor-pointer shadow-2xl"
                onClick={() => setLightboxImage(null)}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Area */}
            <div 
              className="w-full h-full overflow-y-auto overscroll-contain p-2 sm:p-4 flex items-start justify-center cursor-zoom-out"
              onClick={() => setLightboxImage(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={`relative my-auto cursor-default flex items-center justify-center transition-all duration-300 ${
                  isLightboxZoomed 
                    ? "w-full max-w-[99vw] sm:max-w-[98vw] pt-14 pb-6" 
                    : "max-w-[96vw] max-h-[92vh]"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {lightboxImage.endsWith('.mp4') ? (
                  <video 
                    src={lightboxImage}
                    autoPlay
                    loop
                    muted
                    controls
                    playsInline
                    className="w-full h-auto max-h-[96vh] block rounded-lg md:rounded-2xl object-contain mx-auto shadow-2xl border border-white/10"
                  />
                ) : (
                  <img 
                    src={lightboxImage} 
                    alt="Enlarged preview" 
                    className={`block rounded-lg md:rounded-2xl object-contain mx-auto shadow-2xl border border-white/10 transition-all duration-300 ${
                      lightboxImage.includes('002.jpg') ? 'contrast-[0.90] saturate-[0.96] brightness-[1.02]' : ''
                    } ${
                      isLightboxZoomed 
                        ? "w-full h-auto cursor-zoom-out" 
                        : "max-w-full max-h-[90vh] w-auto h-auto cursor-zoom-in"
                    }`}
                    onClick={() => setIsLightboxZoomed(prev => !prev)}
                    referrerPolicy="no-referrer"
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

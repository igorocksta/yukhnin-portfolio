
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Plus, Github, Linkedin, Twitter, ArrowUpRight, ArrowRight, Star, CalendarPlus } from 'lucide-react';
import { useScheduleModal } from '../context/ScheduleModalContext';
import { CONTACT_INFO } from '../data';
import CardStack from './CardStack';
import { TextReveal, BlockReveal, EyebrowReveal, wordReveal } from './TextReveal';
import { scrollToSection } from '../utils/scroll';
import { useSplash } from '../context/SplashContext';

const LOGOS = [
  {
    name: 'RCBS',
    icon: (
      <img 
        src="/rcbs-logo-vector-2022 1.svg?v=2" 
        className="h-[13px] w-auto opacity-65" 
        alt="RCBS" 
        referrerPolicy="no-referrer" 
      />
    )
  },
  {
    name: 'Sber',
    icon: (
      <img 
        src="/g11859.svg?v=2" 
        className="h-[18px] w-auto opacity-65" 
        alt="Sber" 
        referrerPolicy="no-referrer" 
      />
    )
  },
  {
    name: 'Aktana',
    icon: (
      <img 
        src="/aktana logo.svg?v=2" 
        className="h-[11px] w-auto opacity-65" 
        alt="Aktana" 
        referrerPolicy="no-referrer" 
      />
    )
  },
  {
    name: 'Mercer',
    icon: (
      <img 
        src="/Mercer.svg?v=2" 
        className="h-[11px] w-auto opacity-65" 
        alt="Mercer" 
        referrerPolicy="no-referrer" 
      />
    )
  },
  {
    name: 'Tag',
    icon: (
      <img 
        src="/Tag_Logo.svg?v=2" 
        className="h-[14px] w-auto opacity-65" 
        alt="Tag" 
        referrerPolicy="no-referrer" 
      />
    )
  },
  {
    name: 'Quest',
    icon: (
      <img 
        src="/quest logo 1.svg?v=2" 
        className="h-[14px] w-auto opacity-65" 
        alt="Quest" 
        referrerPolicy="no-referrer" 
      />
    )
  },
  {
    name: 'VTB',
    icon: (
      <img 
        src="/Frame.svg?v=2" 
        className="h-[13px] w-auto opacity-65" 
        alt="VTB" 
        referrerPolicy="no-referrer" 
      />
    )
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // Custom premium easeOutExpo curve
    },
  },
};

const eyebrowContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.02,
    },
  },
};

const cardStackVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero() {
  const { isSiteRevealed } = useSplash();
  const { openScheduleModal } = useScheduleModal();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isStrokeComplete, setIsStrokeComplete] = useState(false);
  const [btnDims, setBtnDims] = useState<{ width: number; height: number }>(() => {
    if (typeof window === 'undefined') return { width: 280, height: 80 };
    const isMobile = window.innerWidth < 768;
    return {
      width: isMobile ? Math.max(260, Math.min(window.innerWidth - 32, 420)) : 280,
      height: isMobile ? 64 : 80,
    };
  });

  useLayoutEffect(() => {
    if (!btnRef.current) return;
    const measure = () => {
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setBtnDims((prev) => (prev.width === rect.width && prev.height === rect.height ? prev : { width: rect.width, height: rect.height }));
        }
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(btnRef.current);
    return () => ro.disconnect();
  }, []);

  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('work');
    window.history.pushState(null, '', '/#work');
  };

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-end pt-28 sm:pt-28 md:pt-32 pb-8 md:pb-12 lg:pb-16 mb-0">
      {/* Background glow */}
      <div className="absolute top-1/2 -right-24 w-64 h-64 bg-blue-600/25 blur-[100px] rounded-full pointer-events-none lg:hidden transform-gpu will-change-transform" />

      <div className="container-custom relative w-full">
        <div className="flex flex-col relative z-10 w-full">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end w-full">
            <motion.div
              variants={containerVariants}
              initial={isSiteRevealed ? false : "hidden"}
              animate={isSiteRevealed ? "visible" : "hidden"}
              className="relative w-full max-w-[840px] md:max-w-[928px] lg:max-w-[928px] xl:max-w-[928px] min-w-0 translate-y-0 md:translate-y-[32px] lg:translate-y-[12px] xl:-translate-y-2"
            >
              <div className="flex items-center gap-3 mt-2 md:mt-0 lg:mt-0 xl:-mt-2 mb-6 md:mb-8 transform translate-y-[-8px] md:-translate-y-1 lg:-translate-y-1 xl:-translate-y-[12px]">
                <motion.span 
                  initial={isSiteRevealed ? false : { scaleX: 0 }}
                  animate={isSiteRevealed ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  style={{ transformOrigin: "left" }}
                  className="w-12 h-[1px] bg-white/60 shrink-0 inline-block" 
                />
                <EyebrowReveal 
                  text="Senior Product Designer | 12 yrs" 
                  delay={0.15} 
                  isReady={isSiteRevealed}
                  wrapperClassName="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/60 inline-flex flex-wrap items-baseline" 
                />
              </div>
 
              <motion.h1
                variants={itemVariants}
                className="text-[36px] leading-[40px] font-dm-sans font-extrabold tracking-[-1px] md:tracking-[-2px] xl:tracking-[-3.5px] mb-8 text-white tablet-hero-title md:text-[48px] md:leading-[48px] lg:text-[48px] lg:leading-[48px] xl:text-[72px] xl:leading-[72px] relative isolate"
              >
                {/* Mobile: Fluid natural wrap occupying full available width */}
                <div className="flex md:hidden flex-wrap items-baseline w-full relative">
                  <TextReveal text="Designing product" delay={0.15} isReady={isSiteRevealed} wrapperClassName="inline-flex items-baseline mr-[0.22em] relative z-20 text-white" className="tracking-[-1px] text-white" />
                  
                  {/* 'experiences' with self-glowing text (background glow stacked behind) */}
                  <span className="relative inline-flex items-baseline mr-[0.22em] z-[1]">
                    <TextReveal text="experiences" delay={0.25} isReady={isSiteRevealed} wrapperClassName="text-[#ff6900] font-serif italic font-light tracking-[-1px] glow-orange-italic" className="tracking-[-1px]" />
                  </span>

                  <TextReveal text="that" delay={0.32} isReady={isSiteRevealed} wrapperClassName="inline-flex items-baseline mr-[0.22em] relative z-20 text-white" className="tracking-[-1px] text-white" />
                  <TextReveal text="matter" delay={0.36} isReady={isSiteRevealed} wrapperClassName="inline-flex items-baseline relative z-20 text-white" className="tracking-[-1px] text-white" />
                </div>

                {/* Tablet & Desktop (md+): 2-line structured layout */}
                <div className="hidden md:flex flex-col items-start relative">
                  {/* Line 1 */}
                  <div className="flex flex-wrap items-baseline relative z-20 text-white">
                    <TextReveal text="Designing product" delay={0.15} isReady={isSiteRevealed} wrapperClassName="inline-flex items-baseline relative z-20 text-white" className="text-white" />
                  </div>

                  {/* Line 2: experiences that matter */}
                  <div className="flex flex-wrap items-baseline relative z-[1]">
                    {/* 'experiences' with single unified soft glow */}
                    <span className="relative inline-flex items-baseline mr-[0.25em] z-[1]">
                      <TextReveal text="experiences" delay={0.25} isReady={isSiteRevealed} wrapperClassName="text-[#ff6900] font-serif italic font-light tracking-[-1px] xl:tracking-[-2px] glow-orange-italic" className="tracking-[-1px] xl:tracking-[-2px]" />
                    </span>

                    <span className="inline-flex items-baseline relative z-20 text-white">
                      <TextReveal text="that" delay={0.32} isReady={isSiteRevealed} wrapperClassName="mr-[0.25em] relative z-20 text-white" className="text-white" />
                      <TextReveal text="matter" delay={0.36} isReady={isSiteRevealed} wrapperClassName="relative z-20 text-white" className="text-white" />
                    </span>
                  </div>
                </div>
              </motion.h1>

              <div
                className="text-[20px] leading-[28px] text-white/60 mb-8 md:mb-12 lg:mb-12 xl:mb-[56px] max-w-[520px] landscape:max-w-full md:max-w-[640px] lg:max-w-[580px] xl:max-w-[856px] tablet-hero-desc font-light"
              >
                <div className="block md:hidden">
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          staggerChildren: 0.015,
                          delayChildren: 0.35,
                        }
                      }
                    }}
                    initial={isSiteRevealed ? false : "hidden"}
                    animate={isSiteRevealed ? "visible" : "hidden"}
                    className="inline-flex flex-wrap items-baseline w-full"
                  >
                    {"I turn data-heavy SaaS, fintech and enterprise workflows into clear, scalable experiences that improve adoption, reduce friction and help teams ship with confidence.".split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        variants={wordReveal}
                        className="mr-[0.25em] inline-block"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.span>
                </div>
                {/* Vertical Tablet (md to lg) */}
                <div className="hidden md:block lg:hidden">
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          staggerChildren: 0.015,
                          delayChildren: 0.35,
                        }
                      }
                    }}
                    initial={isSiteRevealed ? false : "hidden"}
                    animate={isSiteRevealed ? "visible" : "hidden"}
                    className="inline-flex flex-wrap items-baseline w-full tablet-hero-desc"
                  >
                    {"I turn data-heavy SaaS, fintech and enterprise workflows into clear, scalable experiences that improve adoption, reduce friction and help teams ship with confidence. Based in Berlin. Open to remote and hybrid roles worldwide.".split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        variants={wordReveal}
                        className="mr-[0.25em] inline-block"
                      >
                        {word}
                      </motion.span>
                    ))}
                    <motion.span
                      variants={wordReveal}
                      className="inline-block"
                    >
                      <Link
                        to="/about"
                        className="text-[#f5f5f5] underline decoration-1 underline-offset-[5px] decoration-white/40 hover:decoration-white transition-colors"
                      >
                        Read more.
                      </Link>
                    </motion.span>
                  </motion.span>
                </div>
                {/* Desktop (lg+) */}
                <div className="hidden lg:block">
                  <TextReveal text="I turn data-heavy SaaS, fintech and enterprise workflows into clear, scalable experiences that improve adoption, reduce friction and help teams ship with confidence. Based in Berlin. Open to remote and hybrid roles worldwide." delay={0.35} isReady={isSiteRevealed} wrapperClassName="inline-flex w-full lg:w-[580px] lg:max-w-[580px] xl:w-[856px] xl:max-w-[856px] tablet-hero-desc" />
                </div>
              </div>

              {/* Infinite Logo Marquee (Hidden for now, set false to true to restore) */}
              {false && (
                <motion.div
                  variants={itemVariants}
                  className="relative overflow-hidden w-full max-w-[480px] landscape:max-w-full md:max-w-[896px] lg:max-w-[896px] xl:max-w-[896px] mb-4 md:mb-[40px] lg:mb-[40px] xl:max-w-[896px] py-1 pointer-events-none isolate"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)',
                    maskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)'
                  }}
                >
                  <motion.div
                    className="flex items-center gap-[62px] w-fit whitespace-nowrap"
                    animate={{ x: "-50%" }}
                    transition={{
                      duration: 56,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {/* Duplicated set for seamless loop animation */}
                    {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-center shrink-0"
                      >
                        {logo.icon}
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: isSiteRevealed ? 0 : 0.2,
                    },
                  },
                }}
                initial={isSiteRevealed ? false : "hidden"}
                animate={isSiteRevealed ? "visible" : "hidden"}
                className="flex flex-row items-center gap-1 sm:gap-2 md:gap-3 w-full sm:w-auto relative"
              >
                <motion.button 
                  ref={btnRef}
                  type="button"
                  onClick={handleScrollToWork}
                  aria-label="View Selected Works"
                  whileTap={{ scale: 0.99 }}
                  className="inline-flex w-full sm:w-auto h-16 md:h-[80px] relative rounded-full bg-[#080808]/35 hover:bg-[#ff6900] hover:shadow-[0_0_32px_0_rgba(255,105,0,0.35)] items-center justify-center px-6 md:px-[40px] cursor-pointer group select-none transition-all duration-300 text-white"
                >
                  {/* Pixel-perfect single SVG Pill Outline */}
                  <svg 
                    className="absolute inset-0 w-full h-full pointer-events-none rounded-full overflow-visible"
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.rect
                      x="0.75"
                      y="0.75"
                      width={Math.max(0, btnDims.width - 1.5)}
                      height={Math.max(0, btnDims.height - 1.5)}
                      rx={Math.max(0, (btnDims.height - 1.5) / 2)}
                      ry={Math.max(0, (btnDims.height - 1.5) / 2)}
                      fill="none"
                      stroke="#ff6900"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0, pathOffset: 0, pathSpacing: 1 }}
                      animate={{ pathLength: 1, pathOffset: 0.18, pathSpacing: 0 }}
                      onAnimationComplete={() => {
                        setIsStrokeComplete(true);
                      }}
                      style={isStrokeComplete ? { strokeDasharray: 'none', strokeDashoffset: 0 } : undefined}
                      transition={{
                        pathLength: {
                          duration: 1.5,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.2,
                        },
                        pathOffset: {
                          duration: 1.5,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.2,
                        },
                        pathSpacing: {
                          duration: 1.5,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.2,
                        },
                      }}
                    />
                  </svg>

                  <span className="text-[17px] md:text-[18px] leading-[28px] font-normal sm:font-light whitespace-nowrap flex items-center justify-center gap-2 relative z-10">
                    <span className="tracking-[0.5px]">View Selected Works</span>
                    <ArrowRight size={18} strokeWidth={1.8} className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </motion.button>

                {/* Booking Call circular button next to View Selected Works (hidden on mobile, visible on sm+) */}
                <motion.button
                  type="button"
                  onClick={openScheduleModal}
                  aria-label="Book a Call"
                  title="Book a Call"
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:inline-flex w-16 h-16 md:w-[80px] md:h-[80px] -translate-x-[2px] relative rounded-full bg-[#080808]/35 hover:bg-[#ff6900] hover:shadow-[0_0_32px_0_rgba(255,105,0,0.35)] items-center justify-center shrink-0 cursor-pointer group select-none transition-all duration-300 text-white active:scale-95"
                >
                  {/* Pixel-perfect single SVG Circle Outline */}
                  <svg 
                    viewBox="0 0 80 80"
                    className="absolute inset-0 w-full h-full pointer-events-none rounded-full overflow-visible"
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.circle
                      cx="40"
                      cy="40"
                      r="39.25"
                      fill="none"
                      stroke="#ff6900"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0, pathOffset: 0, pathSpacing: 1 }}
                      animate={{ pathLength: 1, pathOffset: 0.18, pathSpacing: 0 }}
                      style={isStrokeComplete ? { strokeDasharray: 'none', strokeDashoffset: 0 } : undefined}
                      transition={{
                        pathLength: {
                          duration: 1.5,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.2,
                        },
                        pathOffset: {
                          duration: 1.5,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.2,
                        },
                        pathSpacing: {
                          duration: 1.5,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.2,
                        },
                      }}
                    />
                  </svg>

                  <CalendarPlus 
                    size={22}
                    strokeWidth={1.5}
                    className="w-[22px] h-[22px] text-white relative z-10 shrink-0" 
                  />
                </motion.button>

                {/* Social Proof Client Rating Widget (Hidden for now) */}
                {false && (
                <div className="flex items-center gap-4 py-2 select-none shrink-0">
                  {/* Avatar Stack */}
                  <div className="flex items-center -space-x-3.5">
                    <img 
                      src="/turina.jpeg" 
                      alt="Margarita Tiurina" 
                      className="w-11 h-11 rounded-full object-cover border-[3px] border-[#080808] relative z-10 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <img 
                      src="/demidenko.png" 
                      alt="Denis Demidenko" 
                      className="w-11 h-11 rounded-full object-cover border-[3px] border-[#080808] relative z-20 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <img 
                      src="/caitlin.jpeg" 
                      alt="Caitlin Steel" 
                      className="w-11 h-11 rounded-full object-cover border-[3px] border-[#080808] relative z-30 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <img 
                      src="/josh.png" 
                      alt="Joshua Berkheimer" 
                      className="w-11 h-11 rounded-full object-cover border-[3px] border-[#080808] relative z-40 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="w-11 h-11 rounded-full bg-[#1a1a1a] border-[3px] border-[#080808] flex items-center justify-center relative z-50 shrink-0">
                      <span className="text-white text-[12px] font-medium font-sans">You?</span>
                    </div>
                  </div>

                  {/* Rating & Label Details */}
                  <div className="flex flex-col justify-center gap-1 text-left">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-[3px]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className="fill-white text-white shrink-0" />
                        ))}
                      </div>
                      <span className="text-[13px] font-light text-white/50 leading-none font-sans ml-1">
                        4.9 / 5
                      </span>
                    </div>
                    <span className="text-[15px] font-normal text-white tracking-tight leading-snug font-sans">
                      70+ Happy Clients
                    </span>
                  </div>
                </div>
                )}
              </motion.div>
            </motion.div>

            <div className="hidden lg:flex justify-end pr-6 xl:pr-18 lg:-translate-x-10 xl:translate-x-0 relative lg:translate-y-[12px] xl:-translate-y-2">
              <motion.div 
                variants={cardStackVariants}
                initial="hidden"
                animate={isSiteRevealed ? "visible" : "hidden"}
                className="relative"
              >
                {/* Blue background glow positioned directly behind the card stack (+15% larger, +7% brighter) */}
                <div className="absolute top-[calc(50%-90px)] left-[calc(50%+50px)] -translate-x-1/2 -translate-y-1/2 w-[414px] h-[414px] bg-blue-600/[0.27] blur-[110px] rounded-full pointer-events-none -z-10" />
                <CardStack />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

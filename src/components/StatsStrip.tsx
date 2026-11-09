import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionTemplate } from 'motion/react';
import AnimatedCounter from './AnimatedCounter';
import { TextReveal } from './TextReveal';

const STATS = [
  { 
    value: '12+', 
    label: 'Years in Product Design',
    desc: 'Designing mobile apps, SaaS platforms, and usable digital experiences.' 
  },
  { 
    value: '8', 
    label: 'Mobile Apps Launched',
    desc: 'Crafting mobile experiences focused on clarity, speed, and task completion.' 
  },
  { 
    value: '6', 
    label: 'SaaS Products Built',
    desc: 'Simplifying complex product flows for usability, scale, and smoother onboarding.' 
  },
  { 
    value: '2', 
    label: 'Design Teams Led',
    desc: 'Leading teams through product decisions, UX improvements, and cross-functional delivery.' 
  },
];

const SLIDES = [
  {
    title: 'Capabilities',
    desc: 'Bridging engineering and user experience to build digital products that are fast, intuitive, and conversion-focused.',
    columns: [
      {
        title: 'Engineering',
        number: '01',
        items: ['HTML', 'CSS', 'Tailwind', 'React', 'Next.js', 'UI Architecture'],
      },
      {
        title: 'Product & UX',
        number: '02',
        items: ['UX Research', 'Interaction Design', 'Design Systems', 'Prototyping', 'Product Strategy', 'Usability Testing'],
      }
    ]
  },
  {
    title: 'WORKFLOW + AUTOMATION',
    desc: 'Leveraging AI as a design co-pilot to accelerate research, automate workflows, and build resilient systems.',
    columns: [
      {
        title: 'Performance',
        number: '03',
        items: [
          'UI/UX Architecture',
          'Performance Optimization',
          'Scalable Interfaces',
          'Design Tokens',
          'Component Auditing',
          'Production-Ready Design'
        ],
      },
      {
        title: 'AI-Driven Workflow',
        number: '04',
        items: [
          'Generative UI Exploration',
          'Workflow Automation',
          'AI Integration',
          'Prompt Engineering',
          'AI-Assisted Research',
          'Rapid Prototyping'
        ],
      }
    ]
  }
];

function StatCard({ stat }: { stat: typeof STATS[number]; key?: React.Key }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useSpring(0, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="rounded-2xl p-[1px] relative overflow-hidden transition-shadow duration-500 cursor-default select-none flex flex-col group bg-white/[0.12]"
    >
      {/* Hover border effect layer */}
      <motion.div 
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useMotionTemplate`radial-gradient(140px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.4), transparent)`
        }}
      />
      <div className="w-full h-full bg-[#0c0c0c] group-hover:bg-[#0e0e0e] rounded-[15px] p-5 md:p-6 lg:p-6 xl:p-8 flex flex-col gap-3 md:gap-3.5 lg:gap-3.5 xl:gap-5 text-left relative overflow-hidden transition-colors duration-500 z-10 flex-1">
        {/* Hover inner glow following mouse */}
        <motion.div 
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{
            opacity: isHovered ? 1 : 0,
            backgroundImage: useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.05), transparent 80%)`,
            contentVisibility: 'auto'
          } as any}
        />
        <div className="relative z-10 text-[#ff6900] font-space-mono font-medium text-[44px] tracking-[-1px] leading-none mb-1 md:mb-0 relative top-[2px]">
          <AnimatedCounter value={stat.value} />
        </div>
        
        <div className="relative z-10 flex flex-col gap-1.5 md:gap-2">
          <h4 className="text-[20px] leading-[28px] font-semibold text-[#f9f9f9] group-hover:text-white transition-colors duration-300 tracking-normal capitalize">
            {stat.label}
          </h4>
          <p className="text-[15px] leading-[22px] text-white/50 group-hover:text-white/90 transition-colors duration-300 font-light">
            {stat.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function StatsStrip() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  return (
    <div className="container-custom mt-28 sm:mt-16 md:mt-[128px] mb-[120px] md:mb-0">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 md:mb-[56px] max-w-5xl lg:max-w-none"
      >
        <h2 className="text-[26px] sm:text-[36px] font-normal leading-[32px] sm:leading-[44px] tracking-[-1px] sm:tracking-tight text-white">
          <div className="hidden sm:block">
            <span className="block">
              <TextReveal 
                text="Designing digital products" 
                delay={0.2} 
                wrapperClassName="inline-flex flex-wrap items-baseline" 
              />
            </span>
            <span className="block">
              <TextReveal 
                text="that convert, scale, and feel effortless" 
                delay={0.35} 
                wrapperClassName="inline-flex flex-wrap items-baseline" 
              />
            </span>
          </div>
          <div className="block sm:hidden">
            <span className="block">
              <TextReveal 
                text="Designing digital products" 
                delay={0.2} 
                wrapperClassName="inline-flex flex-wrap items-baseline" 
                className="tracking-[-1px]"
              />
            </span>
            <span className="block">
              <TextReveal 
                text="that convert, scale, and" 
                delay={0.3} 
                wrapperClassName="inline-flex flex-wrap items-baseline" 
                className="tracking-[-1px]"
              />
            </span>
            <span className="block">
              <TextReveal 
                text="feel effortless" 
                delay={0.4} 
                wrapperClassName="inline-flex flex-wrap items-baseline" 
                className="tracking-[-1px]"
              />
            </span>
          </div>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-3 lg:gap-3 xl:gap-6"
      >
        {STATS.map((stat, idx) => (
          <StatCard key={idx} stat={stat} />
        ))}
      </motion.div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-12 sm:mt-8 md:mt-12 -translate-y-2"
      >
        {/* Full-width continuous divider line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-white/[0.12] origin-left w-full mb-6 sm:mb-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-6 gap-y-6 sm:gap-y-8 items-start">
          {/* Left Side: Summary statement with dynamic animated transition */}
          <div className="col-span-1 sm:col-span-2 flex flex-col justify-between h-full min-h-0 sm:min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="space-y-3 sm:space-y-4"
              >
                <h4 className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/40 whitespace-nowrap">
                  {SLIDES[activeSlide].title}
                </h4>
                <p className="text-[20px] leading-[28px] text-[#f9f9f9]/60 font-light max-w-xl">
                  {SLIDES[activeSlide].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Slider Switcher Element */}
            <div className="hidden sm:flex items-center gap-3 mt-6 lg:mt-8">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-sans text-xs font-medium border transition-all duration-300 ${
                    activeSlide === idx
                      ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]'
                      : 'border-white/[0.12] bg-transparent text-white/40 hover:border-white/30 hover:bg-white/5 hover:text-[#f9f9f9]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Columns dynamically shifting depending on the active slide */}
          <div className="col-span-1 sm:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-8"
              >
                {SLIDES[activeSlide].columns.map((col, colIdx) => (
                  <div key={colIdx} className="space-y-3 md:space-y-4">
                    <div className="flex justify-between items-center w-full">
                      <h4 className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/40 whitespace-nowrap font-sans">
                        {col.title}
                      </h4>
                      <span className="text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-white/40 font-sans">
                        {col.number}
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-[15px] font-light text-[#f9f9f9]/60 tracking-wide">
                      {col.items.map((item, itemIdx) => {
                        const mobileMapping: Record<string, string> = {
                          'UI/UX Architecture': 'UI Architecture',
                          'Performance Optimization': 'Performance',
                          'Scalable Interfaces': 'Scalability',
                          'Design Tokens': 'Design Systems',
                          'Component Auditing': 'UI Audits',
                          'Production-Ready Design': 'Production UI',
                          'Generative UI Exploration': 'GenUI',
                          'Workflow Automation': 'Automation',
                          'Prompt Engineering': 'Prompting',
                          'AI-Assisted Research': 'AI Research',
                          'Rapid Prototyping': 'Prototyping'
                        };

                        const content = mobileMapping[item] ? (
                          <>
                            <span className="md:hidden">{mobileMapping[item]}</span>
                            <span className="hidden md:inline">{item}</span>
                          </>
                        ) : (
                          item
                        );

                        return (
                          <li key={itemIdx} className="flex items-center gap-2">
                            <span className="text-[#ff6900] font-sans font-medium text-[14px] flex-shrink-0 select-none -translate-y-[1px]">+</span>
                            <span>{content}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Slider Switcher Element - Only visible on mobile, under columns */}
            <div className="flex sm:hidden items-center w-full gap-4 mt-8">
              <div className="flex items-center gap-3 shrink-0">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`w-[36px] h-[36px] rounded-full flex items-center justify-center font-sans text-xs font-medium border transition-all duration-300 ${
                      activeSlide === idx
                        ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]'
                        : 'border-white/[0.12] bg-transparent text-white/40 hover:border-white/30 hover:bg-white/5 hover:text-[#f9f9f9]'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <motion.div 
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 h-[1px] bg-white/[0.12] origin-left"
              />
            </div>
          </div>
        </div>

        {/* Bottom divider separator (Desktop only) */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden sm:block border-t border-white/[0.12] origin-left w-full mt-8 sm:mt-10" 
        />
      </motion.div>
    </div>
  );
}


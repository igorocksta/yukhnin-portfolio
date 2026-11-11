import { useState, useEffect } from 'react';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import StatsStrip from '../components/StatsStrip';
import ProjectGrid from '../components/ProjectGrid';
import Services from '../components/Services';
import PartnerLogos from '../components/PartnerLogos';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import ProjectShowcase from '../components/ProjectShowcase';
import { TESTIMONIALS } from '../data';

export default function Home() {
  const [activeTestimonialArrow, setActiveTestimonialArrow] = useState<'prev' | 'next' | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const currentTestimonial = TESTIMONIALS[testimonialIdx];
  const counterText = `${String(testimonialIdx + 1).padStart(2, '0')}/${String(TESTIMONIALS.length).padStart(2, '0')}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 20000);
    return () => clearInterval(timer);
  }, [testimonialIdx]);

  return (
    <>
      <Hero />
      <StatsStrip />
      <ProjectGrid />
      <PartnerLogos />

      {/* All Projects Testimonials Section (placed directly under Selected Partners) */}
      <section className="pt-[120px] md:pt-[128px] lg:pt-[128px] xl:pt-[176px] pb-0 relative overflow-x-clip" id="testimonials">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col xl:flex-row gap-8 xl:gap-[92px] w-full items-start justify-start">
              {/* Left Column: Container for Card and Controls */}
              <div className="flex flex-col w-full xl:w-auto relative">
                {/* Left Column: Heading Card */}
                <div className="flex-shrink-0 flex flex-col justify-between text-left bg-[#f96701] rounded-2xl p-4 sm:p-6 md:p-8 w-full md:w-full lg:w-full xl:w-[465px] min-h-[196px] sm:min-h-[204px] md:min-h-[216px] xl:h-[248px] relative overflow-hidden">
                  {/* Top Row: TESTIMONIALS & Counter */}
                  <div className="w-full flex items-center justify-between mb-4 relative z-10">
                    <span className="text-[10px] leading-none font-medium tracking-[0.14em] uppercase text-white/90 font-sans">
                      TESTIMONIALS
                    </span>
                    <span className="text-[10px] leading-[10px] font-normal tracking-[0.12em] text-white/80 font-sans select-none">
                      {counterText}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentTestimonial.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7 }}
                      className="flex flex-col w-full relative z-10"
                    >
                      <h2 className="text-[24px] sm:text-[32px] font-dm-sans font-extrabold tracking-[-0.3px] sm:tracking-[-0.5px] text-white leading-[32px] sm:leading-[38px] truncate mb-4">
                        {currentTestimonial.name}
                      </h2>
                      <div className="flex flex-row items-center gap-4">
                        <div className="relative rounded-full p-[2.5px] overflow-hidden flex-shrink-0 flex items-center justify-center bg-white/20 shadow-[0_0_12px_rgba(255,255,255,0.18)]">
                          {/* Rotating Clockwise White Progress Ring (0-12 o'clock light beam) */}
                          <motion.div 
                            key={currentTestimonial.id}
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ 
                              duration: 20, 
                              ease: "linear",
                              repeat: Infinity
                            }}
                            className="absolute left-1/2 top-1/2 w-[220%] aspect-square pointer-events-none"
                            style={{
                              x: "-50%",
                              y: "-50%",
                              background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 180deg, rgba(255, 255, 255, 0.05) 240deg, rgba(255, 255, 255, 0.4) 300deg, rgba(255, 255, 255, 0.8) 345deg, #ffffff 358deg, transparent 360deg)'
                            }}
                          />
                          <img 
                            src={currentTestimonial.avatar} 
                            alt={currentTestimonial.name}
                            loading="lazy"
                            decoding="async"
                            className="w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] rounded-full object-cover relative z-10 bg-white/10"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              // Fallback if image fails to load
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentTestimonial.name)}&background=ffffff&color=ea580c`;
                            }}
                          />
                        </div>
                        <p className="text-[15px] text-white/90 leading-[20px] sm:leading-[22px] font-light max-w-[280px] sm:max-w-[420px] line-clamp-3">
                          {currentTestimonial.position}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Custom Quote Icon */}
                  <Quote 
                    strokeWidth={1.5}
                    className="absolute bottom-[26px] right-[26px] w-[64px] h-[64px] md:w-[84px] md:h-[84px] text-white/[0.18] pointer-events-none" 
                    style={{ transform: 'rotateX(180deg) rotateY(180deg)' }}
                  />
                </div>
              </div>
              
              {/* Right Column / Below on Tablets: Key Details */}
              <div className="flex-1 w-full text-left relative xl:min-h-[248px] xl:flex xl:flex-col xl:justify-center">
                <div className="w-full">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentTestimonial.id}
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
                </div>
              </div>
            </div>

            {/* Slider Controls with Divider spanning to the right */}
            <div className="flex flex-row items-center gap-3 mt-10 w-full">
              <button 
                onClick={() => {
                  setTestimonialIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
                  setActiveTestimonialArrow('prev');
                  setTimeout(() => setActiveTestimonialArrow(null), 150);
                }}
                className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer focus:outline-none shrink-0 ${
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
                  setTestimonialIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
                  setActiveTestimonialArrow('next');
                  setTimeout(() => setActiveTestimonialArrow(null), 150);
                }}
                className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer focus:outline-none shrink-0 ${
                  activeTestimonialArrow === 'next'
                    ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]'
                    : 'border-white/[0.12] bg-transparent text-white hover:border-white/30 hover:bg-white/5 active:border-[#ff6900] active:bg-[#ff6900]/10 active:text-[#ff6900]'
                }`}
                aria-label="Next testimonial"
              >
                <ArrowRight size={16} />
              </button>

              {/* Divider Line to the right of controls */}
              <div className="block flex-1 h-[1px] bg-white/[0.12] ml-2 sm:ml-3 md:ml-4" />
            </div>
          </motion.div>
        </div>
      </section>

      <Services />
      <Marquee />
      <Skills />

      {/* Selected Work Showcase (2 Rows) */}
      <ProjectShowcase />

      <Contact />
    </>
  );
}

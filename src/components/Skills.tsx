import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { TextReveal, BlockReveal, EyebrowReveal } from './TextReveal';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  extendedDetails: string;
  objectives: string[];
  label?: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Diving deep into the product landscape and business context. No bloated discovery. Targeted alignment on scope, goals, and success metrics to extract what matters and execute immediately.',
    deliverables: ['business & product goals', 'product vision'],
    extendedDetails: 'We begin by gathering raw qualitative insights directly from representative target audiences. By analyzing competitive features and user friction points, we turn ambiguous briefs into defined strategic guideposts.',
    label: 'Core Toolkit',
    objectives: [
      'Business & Product Goals',
      'Product Vision',
      'Qualitative Research Design',
      'Quantitative Data Analysis',
      'Competitive Benchmarking',
      'Target Product Landscaping'
    ]
  },
  {
    number: '02',
    title: 'Define',
    description: 'Cutting discovery noise to align product vision with key strategic goals. Mapping precise user flows for a bulletproof, ready-to-execute roadmap.',
    deliverables: ['Scope & Goals Alignment', 'Project Roadmapping', 'User Journey Flows', 'Concept Generation'],
    extendedDetails: 'Research is empty without focus. We translate raw interview sheets into structured user personae and empathy matrices to establish collective empathy across the entire development team.',
    label: 'Key Steps',
    objectives: [
      'Scope & Goals Alignment',
      'Project Roadmapping',
      'User Journey Flows',
      'Concept Generation',
      'Information Architecture'
    ]
  },
  {
    number: '03',
    title: 'Design',
    description: 'Turning ideas into proven interfaces. I build scalable design systems based on your brand identity, make fast prototypes, and test them to find truly essential solutions before development.',
    deliverables: ['Ideate', 'Wireframing', 'Prototyping', 'Style Guide', 'Visual Design'],
    extendedDetails: 'We define grid hierarchies, typographic scales, interactive component variants, and fluid responsive styling rules. This guarantees a single source of visual truth across iOS, Android, and Web platforms.',
    label: 'Focus Areas',
    objectives: [
      'Ideation',
      'Wireframing',
      'Prototyping',
      'A-B Tests',
      'Production-Ready Assets',
      'Style Guide',
      'Visual Design',
      'Atomic Design Systems',
      'Usability Testing & Refinement'
    ]
  },
  {
    number: '04',
    title: 'Deliver & Validate',
    description: 'Preparing interfaces for production through seamless developer handoff. I validate every interface choice against real user data to deliver clean, documented, and production-ready layouts.',
    deliverables: ['Usability Testing', 'Developer Handoff', 'Quality Assurance', 'Production-Ready UI'],
    extendedDetails: 'Testing validates designs before development begins. We record user interactions with realistic interactive prototypes to verify if our design layout successfully resolves the user objective efficiently.',
    label: 'Expertise',
    objectives: [
      'Usability Testing',
      'Developer Handoff',
      'Quality Assurance',
      'Production-Ready UI',
      'User Feedback Analysis',
      'Design Specs & Documentation'
    ]
  }
];

export default function Skills() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null); // Default closed all nodes

  const toggleStep = (idx: number) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  return (
    <section id="skills" className="pt-[120px] md:pt-[128px] lg:pt-[128px] xl:pt-[176px] pb-0 bg-transparent text-white relative z-10">
        <div className="container-custom relative">
        
        {/* Intro Grid following CaseStudy styling constraints */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 md:gap-6 xl:gap-12 mb-12 md:mb-16 lg:mb-16 xl:mb-[80px] mt-0">
          {/* Left Column: Heading in 2 rows */}
          <div className="shrink-0 h-fit">
            <h2 className="text-[36px] md:text-[44px] lg:text-5xl font-dm-sans font-extrabold tracking-[-1px] md:tracking-[-2.5px] text-white leading-[40px] md:leading-[48px] lg:leading-[52px] relative isolate flex flex-col">
              <span className="inline-flex w-full relative z-20 text-white">
                <TextReveal text="Built With Focus." delay={0.2} wrapperClassName="inline-flex whitespace-nowrap relative z-20 text-white" className="tracking-[-1px] md:tracking-[-2.5px] text-white" />
              </span>
              <span className="flex flex-wrap mt-[-2px] md:mt-0 relative z-[1]">
                <TextReveal text="Shipped with speed." delay={0.4} wrapperClassName="text-[#ff6900] font-serif italic font-light whitespace-nowrap tracking-[-1px] md:tracking-[-1.5px] glow-orange-italic" className="tracking-[-1px] md:tracking-[-1.5px]" />
              </span>
            </h2>
          </div>
          
          {/* Right Column / Subtitle */}
          <div className="text-left xl:text-right w-full xl:w-auto">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-[16px] leading-[24px] font-light text-white/40 w-full max-w-full xl:max-w-[448px] xl:w-auto text-left xl:text-right"
            >
              A streamlined, AI-powered workflow focused on rapid execution, clear communication, and measurable results.
            </motion.p>
          </div>
        </div>

        {/* Process Steps List Section */}
        <div className="relative pt-[1px]">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-10% 0px" }}
            style={{ transformOrigin: "left" }}
            className="absolute top-0 left-0 right-0 h-[1px] bg-white/[0.12]"
          />
          {PROCESS_STEPS.map((step, idx) => {
            const isOpen = activeIdx === idx;
            
            return (
              <div
                key={step.number}
                className="relative transition-colors duration-300 pb-[1px]"
              >
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.6, delay: 0.15 * (idx + 1), ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  style={{ transformOrigin: "left" }}
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.12]"
                />
                <button
                  onClick={() => toggleStep(idx)}
                  className="w-full text-left py-8 lg:py-0 lg:h-[180px] grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center group relative focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-500/50 rounded-lg"
                  aria-expanded={isOpen}
                >
                  {/* Combined Left Column matching Case Study layout */}
                  <div className="lg:col-span-4 flex flex-col items-start w-full">
                    <div className="flex items-center justify-between w-full lg:block">
                      <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
                        className={`text-[26px] sm:text-[32px] font-dm-sans font-normal tracking-[-0.3px] sm:tracking-[-0.5px] leading-[26px] sm:leading-[32px] transition-colors duration-300 ${
                          isOpen 
                            ? 'text-[#ff6900]' 
                            : activeIdx !== null 
                              ? 'text-white/30 group-hover:text-white/80' 
                              : 'text-[#f9f9f9] group-hover:text-[#ff6900]/90'
                        } inline-flex items-start`}
                      >
                        {step.title}
                        <span className={`text-[10px] leading-[15px] uppercase tracking-[0.08em] font-sans font-light select-none transition-colors duration-300 ml-1.5 translate-y-[-6px] ${
                          isOpen 
                            ? 'text-[#ff6900]/50' 
                            : activeIdx !== null 
                              ? 'text-white/20' 
                              : 'text-white/30 group-hover:text-[#ff6900]/50'
                        }`}>
                          {step.number}
                        </span>
                      </motion.h3>
                      
                      {/* Plus button on mobile next to Discover title */}
                      <div className="flex-shrink-0 lg:hidden ml-4">
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isOpen 
                            ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]' 
                            : activeIdx !== null
                              ? 'border-white/[0.08] bg-transparent text-white/20 group-hover:border-white/30 group-hover:bg-white/5 group-hover:text-[#f9f9f9]'
                              : 'border-white/[0.12] bg-transparent text-[#737373] group-hover:border-white/30 group-hover:bg-white/5 group-hover:text-[#f9f9f9]'
                        }`}>
                          <Plus 
                            size={16} 
                            className={`transform transition-transform duration-300 ${isOpen ? 'rotate-[135deg]' : ''}`} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Description + Controls */}
                  <div className="lg:col-span-8 lg:col-start-5 flex items-center justify-between gap-6 w-full">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{ duration: 0.6, delay: 0.1 * (idx + 2) }}
                      className="flex-grow flex-1"
                    >
                      <p className={`text-[20px] leading-[28px] font-light transition-colors duration-300 lg:max-w-[672px] ${
                        isOpen 
                          ? 'text-[#f5f5f5]' 
                          : activeIdx !== null 
                            ? 'text-white/30 group-hover:text-white/80' 
                            : 'text-white/60 group-hover:text-white'
                      }`}>
                        {step.description}
                      </p>
                    </motion.div>

                    {/* Plus button on desktop */}
                    <div className="hidden lg:block flex-shrink-0 pt-1">
                      <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen 
                          ? 'border-[#ff6900] bg-[#ff6900]/10 text-[#ff6900]' 
                          : activeIdx !== null
                            ? 'border-white/[0.08] bg-transparent text-white/20 group-hover:border-white/30 group-hover:bg-white/5 group-hover:text-[#f9f9f9]'
                            : 'border-white/[0.12] bg-transparent text-[#737373] group-hover:border-white/30 group-hover:bg-white/5 group-hover:text-[#f9f9f9]'
                      }`}>
                        <Plus 
                          size={16} 
                          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-[135deg]' : ''}`} 
                        />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Animated Slide-out panel matching challenge list styling */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: 'auto', opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                       className="overflow-hidden"
                    >
                      <div className="pb-8 lg:pb-12 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 w-full">
                        {/* Spans the first 4 columns to match the Step Number/Title column layout and ensure pixel-perfect track alignment */}
                        <div className="hidden lg:block lg:col-span-4" />
                        <div className="lg:col-span-8 lg:col-start-5 pl-0 lg:pl-0">
                          {/* Extra granular metrics or list values resembling CaseStudy layout */}
                          <div>
                            <EyebrowReveal 
                              text={step.label || 'KEY METHODS'} 
                              delay={0.05} 
                              wrapperClassName="block text-[10px] leading-[15px] font-light tracking-[0.14em] uppercase text-[#ff6900] mb-[16px] font-sans" 
                            />
                            <div className="text-[15px] leading-[22px] font-extralight text-white/60 max-w-[520px] landscape:max-w-none md:max-w-none transition-colors duration-300">
                              {/* Mobile View: Single Column list in portrait, Two Columns in landscape */}
                              <div className="grid grid-cols-1 landscape:grid-cols-2 sm:grid-cols-2 md:hidden gap-y-2 gap-x-6">
                                {step.objectives.map((obj, oIdx) => (
                                  <div key={oIdx} className="flex items-center gap-2 text-[15px] leading-[22px] tracking-wide text-white/65 whitespace-nowrap">
                                    <span className="text-[#ff6900] font-sans font-medium text-[14px] flex-shrink-0 select-none -translate-y-[1px]" aria-hidden="true">+</span>
                                    <span className="whitespace-nowrap">{obj}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Desktop View: Exactly 2 rows */}
                              {(() => {
                                const splitIndex = Math.ceil(step.objectives.length / 2);
                                const row1 = step.objectives.slice(0, splitIndex);
                                const row2 = step.objectives.slice(splitIndex);
                                
                                return (
                                  <div className="hidden md:flex flex-col gap-[2px]">
                                    <div className="flex flex-nowrap items-center whitespace-nowrap gap-x-3">
                                      {row1.map((obj, oIdx) => (
                                        <div key={oIdx} className="flex items-center gap-3 text-[15px] leading-[22px] tracking-wide" style={step.number === '04' && oIdx === 1 ? { fontSize: '15px' } : undefined}>
                                          <span>{obj}</span>
                                          {oIdx < row1.length - 1 && (
                                            <span className="text-[#ff6900] font-sans font-medium text-[14px] flex-shrink-0 select-none -translate-y-[1px]" aria-hidden="true">+</span>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                    <div className="flex flex-nowrap items-center whitespace-nowrap gap-x-3">
                                      {row2.map((obj, oIdx) => (
                                        <div key={oIdx} className="flex items-center gap-3 text-[15px] leading-[22px] tracking-wide" style={step.number === '04' && oIdx === 1 ? { fontSize: '15px' } : undefined}>
                                          <span>{obj}</span>
                                          {oIdx < row2.length - 1 && (
                                            <span className="text-[#ff6900] font-sans font-medium text-[14px] flex-shrink-0 select-none -translate-y-[1px]" aria-hidden="true">+</span>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import Logo3DScene from './Logo3DScene';
import { CONTACT_INFO } from '../data';
import { TextReveal, BlockReveal } from './TextReveal';
import { useScheduleModal } from '../context/ScheduleModalContext';

export default function CaseStudyCta() {
  const { openScheduleModal } = useScheduleModal();

  return (
    <div className="my-[27px] sm:my-[96px] lg:my-[160px] relative z-10 w-full overflow-visible flex flex-col items-center justify-center">
      {/* 3D Scene Wrapper with Centered Foreground Overlay (Pixeldarts Style) */}
      <div className="relative w-full h-[580px] sm:h-[660px] md:h-[720px] flex items-center justify-center overflow-visible">
        
        {/* 3D Model Scene positioned behind and filling the container with original native glow */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0 overflow-visible">
          <Logo3DScene height="100%" className="w-full h-full" />
        </div>

        {/* Foreground Centered Content Overlay (Directly on top of 3D object) */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pointer-events-none">
          
          {/* Subtle Availability Status Badge with Pulsing Orange Dot */}
          <BlockReveal delay={0.1} className="flex items-center justify-center mb-8 sm:mb-8 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6900] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6900]" />
              </span>
              <span className="text-[11px] sm:text-[12px] font-normal tracking-[0.14em] uppercase text-white/70 font-dm-sans">
                Available for new projects
              </span>
            </div>
          </BlockReveal>

          {/* Main Headline: 64px / 64px on desktop */}
          <h2 className="text-[36px] sm:text-[52px] md:text-[64px] lg:text-[64px] xl:text-[64px] font-dm-sans font-extrabold tracking-[-1px] md:tracking-[-2px] leading-[40px] sm:leading-[56px] md:leading-[64px] lg:leading-[64px] xl:leading-[64px] text-white mb-10 sm:mb-12 md:mb-14 flex flex-col items-center relative isolate">
            <span className="block relative z-20 text-white">
              <TextReveal text="Stop searching." delay={0.2} wrapperClassName="inline-flex justify-center relative z-20 text-white" className="tracking-[-1px] md:tracking-[-2px] text-white" />
            </span>
            <span className="flex flex-wrap items-baseline justify-center mt-1 sm:mt-2 relative z-[1]">
              <TextReveal text="Let's start" delay={0.4} wrapperClassName="inline-flex justify-center mr-[0.25em] relative z-20 text-white" className="tracking-[-1px] md:tracking-[-2px] text-white" />
              <TextReveal text="building." delay={0.55} wrapperClassName="text-[#ff6900] font-serif italic font-light tracking-[-1px] md:tracking-[-1px] glow-orange-italic" className="tracking-[-1px] md:tracking-[-1px]" />
            </span>
          </h2>

          {/* Call To Action Buttons (White Oval Pill with exact 1-to-1 Hero typography and plus icon) */}
          <BlockReveal delay={0.7} className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 pointer-events-auto">
            <motion.button 
              type="button"
              onClick={openScheduleModal}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-[232px] h-[76px] sm:h-[80px] rounded-full bg-white hover:bg-[#ff6900] text-black hover:text-white transition-all duration-300 shadow-2xl cursor-pointer select-none items-center justify-center px-4 group shrink-0"
            >
              <span className="text-[20px] md:text-[18px] font-normal whitespace-nowrap flex items-center gap-[5px] md:gap-[7px] relative z-10 -translate-x-[3px] text-black group-hover:text-white transition-colors duration-300">
                <Plus size={24} strokeWidth={1.85} className="text-black group-hover:text-white transition-colors duration-300 shrink-0" />
                <span>Schedule Call</span>
              </span>
            </motion.button>

            <motion.a
              href={`https://${CONTACT_INFO.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-white hover:text-[#ff6900] transition-colors underline underline-offset-8 decoration-white/40 hover:decoration-[#ff6900] text-[18px] sm:text-[19px] md:text-[18px] font-light font-dm-sans tracking-wide shrink-0"
            >
              Linkedin
            </motion.a>
          </BlockReveal>

        </div>

      </div>
    </div>
  );
}

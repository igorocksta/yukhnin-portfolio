import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

const PHRASES = [
  'Outcome‑driven Design',
  'Product Discovery',
  'Proof of Value',
  'Risk Reduction',
  'Impact by Design',
  'Strategic Design Partner',
];

export default function Marquee() {
  const displayPhrases = [...PHRASES, ...PHRASES]; // Duplicating for seamless loop

  return (
    <div className="mt-24 md:mt-[128px] lg:mt-[128px] xl:mt-[176px] mb-2 h-[96px] items-center border-y border-white/[0.12] bg-[#080808]/50 overflow-hidden flex whitespace-nowrap">
      <motion.div 
        className="flex items-center"
        animate={{ x: "-50%" }}
        transition={{ 
          duration: 72, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {displayPhrases.map((phrase, idx) => (
          <div key={idx} className="flex gap-16 items-center pr-16 group cursor-default">
            <span className="text-[15px] leading-[22px] font-light uppercase tracking-[0.15em] text-white/30 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
              {phrase}
            </span>
            <Plus className="w-5 h-5 text-[#ff6900] shrink-0" strokeWidth={1.25} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ImageIcon } from 'lucide-react';
import { TextReveal } from './TextReveal';

export interface ShowcaseItem {
  id: string;
  title: string;
  image?: string;
}

// 2 Rows of Showcase Items
const ROW_1_ITEMS: ShowcaseItem[] = [
  {
    id: 'cat-1',
    title: 'Work 1',
    image: '/Cat 1.png',
  },
  {
    id: 'cat-2',
    title: 'Work 2',
    image: '/Cat 7.png',
  },
  {
    id: 'cat-3',
    title: 'Work 3',
    image: '/Cat 3.png',
  },
  {
    id: 'cat-4',
    title: 'Work 4',
    image: '/Cat 4.png',
  },
  {
    id: 'cat-5',
    title: 'Work 5',
    image: '/Cat 5.png',
  },
  {
    id: 'cat-6',
    title: 'Work 6',
    image: '/Cat 6.png',
  },
  {
    id: 'cat-7',
    title: 'Work 7',
    image: '/Cat 2.png',
  },
  {
    id: 'cat-8',
    title: 'Work 8',
    image: '/Cat 8.png',
  },
];

const ROW_2_ITEMS: ShowcaseItem[] = [
  {
    id: 'p6',
    title: 'Work 9',
    image: '/Cat 9.png',
  },
  {
    id: 'p9',
    title: 'Work 11',
    image: '/Cat 11.png',
  },
  {
    id: 'cat-12',
    title: 'Work 12',
    image: '/Cat 12.png',
  },
  {
    id: 'cat-13',
    title: 'Work 13',
    image: '/Cat 13.png',
  },
  {
    id: 'cat-14',
    title: 'Work 14',
    image: '/Cat 14.png',
  },
];

export default function ProjectShowcase() {
  // Duplicating items for seamless infinite marquee loop (4 sets for 50% shift)
  const row1Duplicated = [...ROW_1_ITEMS, ...ROW_1_ITEMS, ...ROW_1_ITEMS, ...ROW_1_ITEMS];
  const row2Duplicated = [...ROW_2_ITEMS, ...ROW_2_ITEMS, ...ROW_2_ITEMS, ...ROW_2_ITEMS];

  return (
    <section className="pt-[120px] md:pt-[128px] lg:pt-[128px] xl:pt-[176px] pb-0 relative overflow-x-clip" id="selected-work">
      {/* Header section above marquee block */}
      <div className="container-custom relative z-10 mb-12 md:mb-[72px] lg:mb-[96px]">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 md:gap-6 xl:gap-12">
          {/* Left Column: Title */}
          <div className="shrink-0">
            <h2 className="text-[36px] md:text-[44px] lg:text-5xl font-dm-sans font-extrabold tracking-[-1px] md:tracking-[-2px] text-white leading-[40px] md:leading-[48px] lg:leading-[52px] flex flex-wrap relative isolate">
              <span className="flex flex-wrap w-full relative z-20 text-white">
                <TextReveal text="Crafted For Impact." delay={0.2} wrapperClassName="inline-flex w-full whitespace-nowrap relative z-20 text-white" className="tracking-[-1px] md:tracking-[-2px] text-white" />
              </span>
              <span className="flex flex-wrap w-full mt-[-2px] md:mt-0 relative z-[1]">
                <TextReveal text="Built with precision." delay={0.4} wrapperClassName="text-[#ff6900] font-serif italic font-light whitespace-nowrap tracking-[-1px] md:tracking-[-1px] glow-orange-italic" className="tracking-[-1px] md:tracking-[-1px]" />
              </span>
            </h2>
          </div>

          {/* Right Column: Text Phrase */}
          <div className="text-left xl:text-right w-full xl:w-auto">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-[15px] leading-[22px] font-light text-white/40 max-w-full xl:max-w-[560px] w-full xl:w-auto text-left xl:text-right"
            >
              Selected digital products, complex SaaS platforms, and mobile apps crafted with strategic UX, clear structure, and pixel-perfect execution.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Marquee Rows Container */}
      <div className="w-full relative z-10 space-y-3 sm:space-y-4">
        {/* Background glow centered directly in the moving works block */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[650px] md:w-[750px] h-[550px] sm:h-[650px] md:h-[750px] bg-gradient-to-br from-blue-600/25 via-blue-500/20 to-indigo-600/15 blur-[150px] rounded-full pointer-events-none transform-gpu will-change-transform z-0" />
        
        {/* ROW 1: Scrolling Left slowly */}
        <div className="relative z-10 w-full overflow-hidden select-none">
          <motion.div
            className="flex gap-3 sm:gap-4 items-center w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 200,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ willChange: 'transform' }}
          >
            {row1Duplicated.map((item, index) => (
              <ShowcaseCard key={`r1-${item.id}-${index}`} item={item} />
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Scrolling Right slowly (Duration scaled to match exact pixel speed of Row 1) */}
        <div className="relative z-10 w-full overflow-hidden select-none">
          <motion.div
            className="flex gap-3 sm:gap-4 items-center w-max"
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              duration: 125,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ willChange: 'transform' }}
          >
            {row2Duplicated.map((item, index) => (
              <ShowcaseCard key={`r2-${item.id}-${index}`} item={item} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

interface ShowcaseCardProps {
  item: ShowcaseItem;
  key?: string | number;
}

// Non-clickable clean project screenshot card
function ShowcaseCard({ item }: ShowcaseCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-[304px] sm:w-[420px] lg:w-[480px] h-[204px] sm:h-[280px] lg:h-[320px] bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden shrink-0 relative shadow-xl text-left pointer-events-none group">
      {item.image && !imageError ? (
        <>
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover rounded-2xl"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
          {/* Film Grain / Noise Overlay */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.42] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '128px 128px',
            }}
          />
        </>
      ) : (
        /* Clean graphic placeholder if image is missing */
        <div className="w-full h-full rounded-2xl border border-dashed border-white/15 bg-gradient-to-br from-[#141414] to-[#080808] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/40 flex items-center justify-center mb-3">
            <ImageIcon size={22} />
          </div>
          <span className="text-xs font-dm-sans font-medium text-white/70">
            {item.title}
          </span>
          <span className="text-[10px] text-white/30 font-light mt-1">
            Project Screenshot Placeholder
          </span>
        </div>
      )}
    </div>
  );
}

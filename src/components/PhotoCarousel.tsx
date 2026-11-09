import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';

export interface PhotoCardItem {
  id: string;
  image: string;
  title?: string;
  location?: string;
  alt?: string;
}

// User uploaded personal photos in exact specified order
export const DEFAULT_PHOTOS: PhotoCardItem[] = [
  {
    id: 'photo-1',
    image: '/Me-1.png',
    title: 'Lake Louise',
    location: 'Banff, Alberta. 2025',
    alt: 'Lake Louise, Banff, Alberta. 2025',
  },
  {
    id: 'photo-2',
    image: '/Me-2.png',
    title: 'Moraine Lake',
    location: 'British Columbia. 2025',
    alt: 'Moraine Lake, British Columbia. 2025',
  },
  {
    id: 'photo-3',
    image: '/Me-3.png',
    title: 'Iceland',
    location: '2018',
    alt: 'Iceland. 2018',
  },
  {
    id: 'photo-4',
    image: '/Me-4.png',
    title: 'Paris',
    location: 'France. 2024',
    alt: 'Paris, France. 2024',
  },
  {
    id: 'photo-5',
    image: '/Me-5.png',
    title: 'Athabasca Glacier',
    location: 'Canada. 2025',
    alt: 'Athabasca Glacier, Canada. 2025',
  },
  {
    id: 'photo-6',
    image: '/Me-6.png',
    title: 'Kharkiv',
    location: 'Ukraine. 2021',
    alt: 'Kharkiv, Ukraine. 2021',
  },
];

interface PhotoCarouselProps {
  photos?: PhotoCardItem[];
}

export default function PhotoCarousel({ photos = DEFAULT_PHOTOS }: PhotoCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragConstraint, setDragConstraint] = useState<number>(0);

  // Calculate constraints dynamically based on content width vs container viewport
  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        const maxScroll = Math.min(0, containerWidth - trackWidth - 32);
        setDragConstraint(maxScroll);
      }
    };

    updateConstraints();
    const timer = setTimeout(updateConstraints, 100);
    window.addEventListener('resize', updateConstraints);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateConstraints);
    };
  }, [photos]);

  return (
    <div 
      ref={containerRef} 
      className="w-full overflow-hidden select-none cursor-grab active:cursor-grabbing pt-0 pb-0"
      data-draggable="true"
    >
      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={{ right: 0, left: dragConstraint }}
        dragElastic={0.15}
        dragTransition={{ bounceStiffness: 350, bounceDamping: 28, power: 0.25 }}
        whileTap={{ cursor: 'grabbing' }}
        className="flex gap-4 items-start w-max px-0.5"
      >
        {photos.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.7, 
              delay: Math.min(index * 0.06, 0.4), 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="w-[260px] sm:w-[290px] md:w-[320px] shrink-0 group"
          >
            {/* Card Image Box */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[18px] bg-[#141414] border border-white/[0.08] group-hover:border-white/[0.18] transition-colors duration-300">
              <img
                src={item.image}
                alt={item.alt || item.title}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              {/* Subtle bottom vignette gradient (halved intensity on hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Title & Location details if provided */}
            {(item.title || item.location) && (
              <div className="mt-4 px-1">
                {item.title && (
                  <h4 className="text-[14px] sm:text-[15px] leading-[20px] font-dm-sans font-medium text-[#f5f5f5] tracking-tight truncate">
                    {item.title}
                  </h4>
                )}
                {item.location && (
                  <p className="text-[12px] sm:text-[13px] leading-[16px] font-light text-white/40 mt-1 truncate">
                    {item.location}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Plus, Maximize2 } from 'lucide-react';

interface HoverBadgeCardProps {
  id: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  text?: string;
  icon?: React.ReactNode;
}

export function HoverBadgeCard({
  id,
  onClick,
  className = '',
  style,
  children,
  text = 'CLICK TO VIEW • CLICK TO VIEW •',
  icon = <Plus size={18} strokeWidth={1.2} />
}: HoverBadgeCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Elastic spring configurations for custom cursor behavior
  const springConfig = { stiffness: 150, damping: 22, mass: 0.15 };
  const sX = useSpring(mouseX, springConfig);
  const sY = useSpring(mouseY, springConfig);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
    sX.set(x);
    sY.set(y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const cleanPhrase = text
    .replace(/•/g, '')
    .trim();
  // Extract a single phrase (e.g. "CLICK TO VIEW")
  const displayPhrase = cleanPhrase.includes('  ') 
    ? cleanPhrase.split(/\s{2,}/)[0] 
    : cleanPhrase.split(' ')[0] && cleanPhrase.split(' ').length > 2 
      ? cleanPhrase.slice(0, Math.ceil(cleanPhrase.length / 2)).trim()
      : cleanPhrase || 'CLICK TO VIEW';
  // If cleanPhrase is e.g. "CLICK TO VIEW CLICK TO VIEW", take "CLICK TO VIEW"
  const phraseToUse = cleanPhrase.length > 20 && cleanPhrase.slice(0, Math.floor(cleanPhrase.length / 2)).trim() === cleanPhrase.slice(Math.ceil(cleanPhrase.length / 2)).trim()
    ? cleanPhrase.slice(0, Math.floor(cleanPhrase.length / 2)).trim()
    : 'CLICK TO VIEW';

  const sanitizeId = id.replace(/[^a-zA-Z0-9_-]/g, '-');
  const pathId = `circlePath-${sanitizeId}`;

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={style}
      className={`group/card relative overflow-hidden cursor-pointer select-none ${className}`}
    >
      {children}

      {/* Subtle Mobile Expand Indicator (Non-intrusive & Soft) */}
      <div className="sm:hidden absolute top-3 right-3 z-15 flex items-center justify-center w-7 h-7 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/70 pointer-events-none transition-opacity duration-300">
        <Maximize2 size={13} strokeWidth={1.5} className="text-white/80" />
      </div>

      {/* Dark background overlay on hover without blur */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-15" />

      {/* Tracking hover circle badge */}
      <motion.div
        style={{
          x: sX,
          y: sY,
          translateX: '-50%',
          translateY: '-50%',
          left: 0,
          top: 0
        }}
        className="absolute pointer-events-none w-[112px] h-[112px] flex items-center justify-center transform scale-75 opacity-0 group-hover/card:opacity-100 group-hover/card:scale-100 transition-all duration-500 ease-out z-20"
      >
        {/* Background Circle */}
        <div className="absolute inset-0 bg-black/70 rounded-full shadow-2xl backdrop-blur-[2px]" />

        {/* Rotating Text Circle */}
        <motion.div
          className="absolute inset-0.5"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-white/80">
            <path
              id={pathId}
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              fill="none"
            />
            <text className="text-[8.5px] uppercase tracking-[0.18em] font-medium">
              <textPath xlinkHref={`#${pathId}`} startOffset="25%" textAnchor="middle">
                CLICK TO VIEW
              </textPath>
              <textPath xlinkHref={`#${pathId}`} startOffset="75%" textAnchor="middle">
                CLICK TO VIEW
              </textPath>
              <textPath xlinkHref={`#${pathId}`} startOffset="50%" textAnchor="middle">
                •
              </textPath>
              <textPath xlinkHref={`#${pathId}`} startOffset="0.8%" textAnchor="middle">
                •
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Central Icon */}
        <div className="relative z-10 text-white">
          {icon}
        </div>
      </motion.div>
    </div>
  );
}

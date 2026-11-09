
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { PROJECTS } from '../data';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePageTransition } from '../context/PageTransitionContext';

// Wrap projects and add an "info" card
const INITIAL_CARDS = [
  {
    id: 'photo',
    type: 'photo',
    image: '/ya chat 3.jpg',
    color: 'bg-zinc-800'
  },
  ...PROJECTS.slice(0, 1).map(p => ({
    id: p.id,
    type: 'project',
    title: p.title,
    subtitle: p.company,
    year: p.year,
    image: p.image,
    color: 'bg-gradient-to-br from-zinc-500 to-zinc-600'
  })),
  {
    id: 'phil',
    type: 'philosophy',
    title: 'Design Philosophy',
    subtitle: '',
    year: 'CREDO',
    content: "Create\nwhat you\ntruly believe\nin.\nBelieve in\nwhat you\ncreate.",
    color: 'bg-[#f96701]'
  }
].reverse(); // Reverse for stacking order

export default function CardStack() {
  const [cards, setCards] = useState(INITIAL_CARDS);

  const moveToEnd = useCallback((id: string) => {
    setCards((prev) => {
      const card = prev.find(c => c.id === id);
      if (!card) return prev;
      const others = prev.filter(c => c.id !== id);
      return [card, ...others];
    });
  }, []);

  return (
    <div 
      className="relative w-[196px] h-[316px] md:w-[200px] md:h-[320px] xl:w-[216px] xl:h-[336px]"
      style={{ perspective: '1000px' }}
    >
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => (
          <DraggableCard 
            key={card.id} 
            card={card} 
            index={index} 
            total={cards.length}
            onDismiss={() => moveToEnd(card.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface DraggableCardProps {
  card: any;
  index: number;
  total: number;
  onDismiss: () => void;
  key?: string | number;
}

function DraggableCard({ 
  card, 
  index, 
  total,
  onDismiss 
}: DraggableCardProps) {
  const { navigateToCaseStudy, navigateToAbout } = usePageTransition();
  const x = useMotionValue(0);
  const dragRotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  // index 0 is bottom, index total-1 is top
  const isTop = index === total - 1;
  const isFirstCard = card.id === 'photo';
  const depth = total - 1 - index;

  // Hover tilt target: tilts slightly to the right (+3.5 deg) on hover ONLY for the first card
  const hoverRotateTarget = useMotionValue(0);
  const hoverRotate = useSpring(hoverRotateTarget, { stiffness: 350, damping: 25 });
  const rotate = useTransform([dragRotate, hoverRotate], ([d, h]: [number, number]) => d + h);

  useEffect(() => {
    if (!isTop) {
      hoverRotateTarget.set(0);
    }
  }, [isTop, hoverRotateTarget]);

  // Calculate the fanned out rotation and x offset
  // We only want this for the top few cards to keep it clean
  const fanRotation = depth === 0 ? 0 : depth % 2 === 0 ? depth * 4 : depth * -4;
  const fanX = depth === 0 ? 0 : depth % 2 === 0 ? depth * 20 : depth * -20;
  const fanY = depth * -10;

  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 500) {
      hoverRotateTarget.set(0);
      onDismiss();
    }
  };

  const handleTap = () => {
    if (card.type === 'project') {
      navigateToCaseStudy(card.id);
    } else if (card.type === 'photo') {
      navigateToAbout();
    }
  };

  return (
    <motion.div
      style={{ 
        x: isTop ? x : 0, 
        rotate: isTop ? rotate : 0,
        zIndex: index,
        opacity: isTop ? opacity : 1 - depth * 0.15,
      }}
      data-draggable="true"
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onMouseEnter={() => {
        if (isTop && isFirstCard) {
          hoverRotateTarget.set(3.5);
        }
      }}
      onMouseLeave={() => {
        hoverRotateTarget.set(0);
      }}
      onDragStart={() => {
        hoverRotateTarget.set(0);
        window.dispatchEvent(new CustomEvent('app-drag-start'));
      }}
      onDragEnd={(e, info) => {
        hoverRotateTarget.set(0);
        window.dispatchEvent(new CustomEvent('app-drag-end'));
        handleDragEnd(e, info);
      }}
      onTap={handleTap}
      animate={{
        scale: 1 - depth * 0.02,
        y: isTop ? 0 : fanY,
        x: isTop ? 0 : fanX,
        rotate: isTop ? undefined : fanRotation,
      }}
      whileTap={isTop ? { scale: 1.02 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      role={card.type === 'project' || card.type === 'photo' ? 'button' : undefined}
      className={`absolute inset-0 rounded-[32px] md:rounded-[40px] p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden group select-none ${card.color} ${card.type === 'project' || card.type === 'photo' ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'}`}
    >
      {/* Dynamic top card border overlay */}
      <div className={`absolute inset-0 rounded-[32px] md:rounded-[40px] pointer-events-none transition-colors duration-300 z-20 ${isTop ? 'border border-white/[0.08]' : 'border border-transparent'}`} />

      {/* Visual background details */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {card.type === 'photo' && (
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src={card.image} 
            alt="Portrait" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
      )}






      {card.type === 'philosophy' && card.image && (
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src={card.image} 
            alt="Philosophy Background" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-all duration-700" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/[0.37] bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
      )}



      {card.type !== 'photo' ? (
        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex justify-between items-start">
            {card.type === 'project' ? (
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/90 group-hover:text-white transition-colors group-hover:bg-white/20">
                <ArrowUpRight size={16} />
              </div>
            ) : card.type === 'philosophy' ? (
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white flex-shrink-0 group-hover:bg-white/20 transition-colors">
                <svg 
                  className="w-[16px] h-[16px] fill-current text-white" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4c0 4.5 3.5 8 8 8-4.5 0-8 3.5-8 8 0-4.5-3.5-8-8-8 4.5 0 8-3.5 8-8z" />
                </svg>
              </div>
            ) : (
              <div className="px-2 py-1 bg-white/10 border border-white/20 rounded backdrop-blur-md">
                <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-white/90 block text-center">{card.year}</span>
              </div>
            )}
          </div>
          {card.type !== 'philosophy' && (
            <h3 className={`text-[26px] leading-[31px] font-dm-sans font-bold tracking-[-1px] ${card.type === 'project' ? 'mt-4' : 'mt-2'}`}>{card.title}</h3>
          )}
          {card.subtitle && <p className="text-[14px] leading-[18px] font-light text-white/40 mt-2 tracking-[0.02em]">{card.subtitle}</p>}
        </div>
      ) : (
        <div className="relative z-10" />
      )}
      
      <div className="relative z-10 flex flex-col gap-4">
        {card.type !== 'photo' && card.content && (
          <p className={card.type === 'philosophy' ? 'text-[24px] font-normal italic font-serif text-white leading-[31px] tracking-normal whitespace-pre-wrap mb-2 translate-y-[8px]' : 'text-xs text-white/60 leading-relaxed font-light'}>
            {card.type === 'philosophy' ? card.content : `"${card.content}"`}
          </p>
        )}
        {card.type === 'photo' && (
          <div className="w-full translate-y-4 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
            <div className="flex items-center justify-center bg-black/60 group-hover:bg-black/80 backdrop-blur-md px-5 py-[12px] rounded-full border border-white/[0.12] group-hover:border-white/[0.20] transition-all duration-300 text-sm font-normal text-white shadow-lg whitespace-nowrap">
              <span>Read About Me</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="hidden xl:block ml-[5px] flex-shrink-0"
              >
                <path d="M6.3 17.7L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </div>
          </div>
        )}
        {card.type === 'project' && (
          <div className="w-full translate-y-4 mt-2">
            <div className="flex items-center justify-center bg-white/5 group-hover:bg-white/10 px-5 py-[12px] rounded-full border border-white/[0.12] group-hover:border-white/[0.17] transition-all duration-300 text-sm font-normal text-white whitespace-nowrap">
              <span>See Case Study</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="hidden xl:block ml-[5px] flex-shrink-0"
              >
                <path d="M6.3 17.7L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between" />
      </div>
    </motion.div>
  );
}

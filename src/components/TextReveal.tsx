import React from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export const textRevealContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    }
  }
};

export const wordReveal = {
  hidden: { opacity: 0, filter: "blur(4px)", y: 14 },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } 
  }
};

interface TextRevealProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  wrapperClassName?: string;
  delay?: number;
  staggerDuration?: number;
  isReady?: boolean;
}

export function TextReveal({ 
  text, 
  className = "", 
  as: Component = "span", 
  wrapperClassName = "", 
  delay = 0, 
  staggerDuration = 0.015,
  isReady = true,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  
  const words = text.split(" ");
  
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration,
        delayChildren: delay,
      }
    }
  };

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView && isReady ? "visible" : "hidden"}
      className={`inline-flex flex-wrap items-baseline will-change-transform ${wrapperClassName}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordReveal}
          className={`mr-[0.25em] last:mr-0 inline-block will-change-transform ${className}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface BlockRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  isReady?: boolean;
}

export function BlockReveal({ children, className = "", delay = 0, isReady = true }: BlockRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(4px)", y: 16 }}
      animate={isInView && isReady ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(4px)", y: 16 }}
      transition={{ duration: 0.85, delay: delay, ease: [0.16, 1, 0.3, 1] }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface EyebrowRevealProps {
  text: string;
  className?: string;
  wrapperClassName?: string;
  delay?: number;
  as?: React.ElementType;
  isReady?: boolean;
}

export function EyebrowReveal({ 
  text, 
  className = "", 
  wrapperClassName = "block text-[10px] leading-[10px] sm:leading-[15px] font-normal sm:font-light tracking-[0.14em] uppercase text-[#ff6900] mb-4 font-sans", 
  delay = 0, 
  as: Component = "span",
  isReady = true,
}: EyebrowRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });
  
  const words = text.split(" ");
  
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: delay,
      }
    }
  };

  const eyebrowCharReveal = {
    hidden: { opacity: 0, filter: "blur(3px)", y: 10 },
    visible: { 
      opacity: 1, 
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <Component
      ref={ref}
      className={wrapperClassName}
    >
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView && isReady ? "visible" : "hidden"}
        className="inline-flex flex-wrap items-baseline will-change-transform"
      >
        {words.map((word, wIdx) => (
          <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0">
            {word.split("").map((char, cIdx) => (
              <motion.span
                key={cIdx}
                variants={eyebrowCharReveal}
                className={`inline-block will-change-transform ${className}`}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Component>
  );
}

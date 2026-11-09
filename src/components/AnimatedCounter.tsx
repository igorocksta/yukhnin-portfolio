import { useEffect, useMemo, useRef } from 'react';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

export default function AnimatedCounter({ value, duration = 1000 }: AnimatedCounterProps) {
  // Tokenize the string into numbers and non-numbers
  const tokens = useMemo(() => {
    const regex = /(\d+)/g;
    const parts = value.split(regex);
    return parts.map((part) => {
      const isNum = /^\d+$/.test(part);
      return {
        type: isNum ? ('number' as const) : ('text' as const),
        value: part,
        target: isNum ? parseInt(part, 10) : 0,
        length: part.length,
      };
    });
  }, [value]);

  const containerRef = useRef<HTMLSpanElement>(null);
  const numSpanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const startAnimation = () => {
      let startTimestamp: number | null = null;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const currentProgress = Math.min(elapsed / duration, 1);
        
        // Easing function: easeOutQuad for smooth numbers glide
        const easedProgress = currentProgress * (2 - currentProgress);

        tokens.forEach((token, idx) => {
          if (token.type === 'number') {
            const span = numSpanRefs.current[idx];
            if (span) {
              const currentValue = Math.round(token.target * easedProgress);
              span.textContent = String(currentValue).padStart(token.length, '0');
            }
          }
        });

        if (currentProgress < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (document.documentElement.classList.contains('is-smooth-scrolling')) {
            // Fast-path when flying past in smooth scroll: immediately set target values with zero CPU loop overhead
            tokens.forEach((token, idx) => {
              if (token.type === 'number') {
                const span = numSpanRefs.current[idx];
                if (span) span.textContent = String(token.target).padStart(token.length, '0');
              }
            });
            observer.disconnect();
            return;
          }
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [tokens, duration]);

  return (
    <span ref={containerRef}>
      {tokens.map((token, i) => {
        if (token.type === 'number') {
          return (
            <span
              key={i}
              ref={(el) => {
                numSpanRefs.current[i] = el;
              }}
            >
              0
            </span>
          );
        }
        
        if (token.value.includes('→') || token.value.includes('->')) {
          const parts = token.value.split(/(→|->)/g);
          return (
            <span key={i}>
              {parts.map((part, pIdx) => {
                if (part === '→' || part === '->') {
                  return (
                    <svg
                      key={pIdx}
                      className="inline-block flex-shrink-0 w-[0.88em] h-[0.5em] mx-[0.16em] relative -top-[0.04em] text-current align-middle"
                      viewBox="0 0 50 28"
                      fill="none"
                    >
                      <line
                        x1="2"
                        y1="14"
                        x2="40"
                        y2="14"
                        stroke="currentColor"
                        strokeWidth="4.5"
                        strokeLinecap="square"
                      />
                      <polyline
                        points="34,4 44,14 34,24"
                        stroke="currentColor"
                        strokeWidth="4.5"
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        strokeMiterlimit="10"
                        fill="none"
                      />
                    </svg>
                  );
                }
                return <span key={pIdx}>{part}</span>;
              })}
            </span>
          );
        }

        return <span key={i}>{token.value}</span>;
      })}
    </span>
  );
}

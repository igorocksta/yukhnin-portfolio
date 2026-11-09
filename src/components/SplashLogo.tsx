import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface SplashLogoProps {
  key?: React.Key;
  isAnimated?: boolean;
  loop?: boolean;
  onRevealSite?: () => void;
  onComplete?: () => void;
}

export default function SplashLogo({
  isAnimated = true,
  loop = false,
  onRevealSite,
  onComplete,
}: SplashLogoProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Counter-scale to prevent center badge from stretching on large monitors
  const [badgeScale, setBadgeScale] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const svgScale = Math.max(w / 1828, h / 1063);
      const targetLaptopScale = 0.88;
      return svgScale > targetLaptopScale ? targetLaptopScale / svgScale : 1;
    }
    return 1;
  });

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const svgScale = Math.max(w / 1828, h / 1063);
      const targetLaptopScale = 0.88;
      setBadgeScale(svgScale > targetLaptopScale ? targetLaptopScale / svgScale : 1);
    };

    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const onRevealSiteRef = useRef(onRevealSite);
  onRevealSiteRef.current = onRevealSite;

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!isAnimated || loop) return;

    // Balanced 3.0s timeline: identical timing for rise and drop!
    // 0.0s - 0.38s: ENTRANCE - Shutter lifts (0px -> -40px), cross expands (scale 0 -> 1.22 -> 1.0)
    // 0.0s - 0.60s: Rectangle_2 (orange panel) slides up into view (0% to 20.00%, 1065px, cubic-bezier(1, 0, 0.251, 1))
    // 0.38s - 1.19s: Vector_2 (cross) first rotation (12.57% to 39.77%)
    // 1.19s - 1.79s: Rectangle_3 (orange curtain) drops down (39.77% to 59.77%, 1065px, cubic-bezier(1, 0, 0.251, 1) — IDENTICAL to rise!)
    // 1.55s (51.60% to 51.70%): Curtain edge sweeps through circle:
    //                 Circle wipes ORANGE (#FF6900), cross inverts to DARK (#080808)
    // 1.56s - 2.31s: Vector_2 second rotation as dark cross inside orange circle (52.00% to 77.07%)
    // 2.46s - 2.93s: EXIT - Badge (cross with circle) clean exit: minimal increase (scale 1.0 -> 1.10) and smooth scaling down into zero (scale 0)
    //
    // 2.80s: Prepare site content
    const revealTimer = setTimeout(() => {
      onRevealSiteRef.current?.();
    }, 2800);

    // 3.00s: Exact shutter seal and cross collapse completion -> trigger smooth crossfade to site
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3000);

    // 3.35s: Complete handover, unmount splash overlay
    const completeTimer = setTimeout(() => {
      onCompleteRef.current?.();
    }, 3350);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [isAnimated, loop]);

  const animIteration = loop ? 'infinite' : 'forwards';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{
        duration: 0.35,
        ease: 'easeOut',
      }}
      className="fixed inset-0 z-[100] w-full h-full overflow-hidden bg-[#080808] flex items-center justify-center select-none pointer-events-none"
    >
      <svg
        viewBox="0 0 1828 1063"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
      >
        <style>{`
          /* ========================================================
             1. ENTRANCE: Shutter lifts (-40px) & Cross bouncy spring emergence
             ======================================================== */
          @keyframes kf_Rectangle_0_transform {
            0% {
              transform: translateY(0px);
              opacity: 1;
            }
            1.65% {
              animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
              transform: translateY(0px);
              opacity: 1;
            }
            7.7% {
              transform: translateY(-40px);
              opacity: 1;
            }
            9.3% {
              transform: translateY(-40px);
              opacity: 0;
            }
            100% {
              transform: translateY(-40px);
              opacity: 0;
            }
          }
          #svg_Rectangle_0 {
            transform-origin: 0 0;
            animation: kf_Rectangle_0_transform 3.0s linear ${animIteration};
          }

          @keyframes kf_cross_entrance_scale {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            1.65% {
              animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
              transform: scale(0);
              opacity: 1;
            }
            3.85% {
              transform: scale(0.65);
              opacity: 1;
            }
            6.82% {
              /* Primary bouncy overshoot */
              transform: scale(1.22);
              opacity: 1;
            }
            9.02% {
              /* Elastic recoil / undershoot */
              transform: scale(0.92);
              opacity: 1;
            }
            10.78% {
              /* Secondary gentle bounce */
              transform: scale(1.05);
              opacity: 1;
            }
            11.88% {
              /* Micro-settle */
              transform: scale(0.99);
              opacity: 1;
            }
            12.57% {
              /* Crisp lock right as rotation begins */
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          #svg_Vector_2_entrance {
            transform-origin: 914px 531.5px;
            animation: kf_cross_entrance_scale 3.0s linear ${animIteration};
          }

          /* ========================================================
             2. BACKGROUND PANELS (Rectangle_2 & Rectangle_3)
             ======================================================== */
          @keyframes kf_Rectangle_2_transform_0 {
            0% {
              animation-timing-function: cubic-bezier(1, 0, 0.251, 1);
              transform: translateX(0.395px) translateY(1065px) translateX(0px) translateY(1065px) scaleY(-1);
            }
            20.00% {
              transform: translateX(0.395px) translateY(1065px) translateX(0px) translateY(0px) scaleY(-1);
            }
            100% {
              transform: translateX(0.395px) translateY(1065px) translateX(0px) translateY(0px) scaleY(-1);
            }
          }
          @keyframes kf_Rectangle_2_opacity_0 {
            0% {
              animation-timing-function: linear;
              opacity: 1;
            }
            43.0% {
              animation-timing-function: ease-out;
              opacity: 1;
            }
            44.0% {
              animation-timing-function: linear;
              opacity: 0;
            }
            100% {
              opacity: 0;
            }
          }
          #svg_Rectangle_2 {
            transform-origin: 0 0;
            animation:
              kf_Rectangle_2_transform_0 3.0s linear ${animIteration},
              kf_Rectangle_2_opacity_0 3.0s linear ${animIteration};
          }
          @keyframes kf_Rectangle_3_transform_0 {
            0% {
              transform: translateX(0.395px) translateY(1065px) translateX(0px) translateY(0px) scaleY(-1);
            }
            39.77% {
              animation-timing-function: cubic-bezier(1, 0, 0.251, 1);
              transform: translateX(0.395px) translateY(1065px) translateX(0px) translateY(0px) scaleY(-1);
            }
            59.77% {
              transform: translateX(0.395px) translateY(1065px) translateX(0px) translateY(1065px) scaleY(-1);
            }
            100% {
              transform: translateX(0.395px) translateY(1065px) translateX(0px) translateY(1065px) scaleY(-1);
            }
          }
          @keyframes kf_Rectangle_3_opacity_0 {
            0% {
              animation-timing-function: linear;
              opacity: 0;
            }
            39.77% {
              animation-timing-function: ease-out;
              opacity: 0;
            }
            40.8% {
              animation-timing-function: linear;
              opacity: 1;
            }
            100% {
              opacity: 1;
            }
          }
          #svg_Rectangle_3 {
            transform-origin: 0 0;
            animation:
              kf_Rectangle_3_transform_0 3.0s linear ${animIteration},
              kf_Rectangle_3_opacity_0 3.0s linear ${animIteration};
          }

          /* ========================================================
             3. CIRCLE GRADUAL ORANGE WIPE & COLOR INVERSION:
             As orange curtain (Rectangle_3) sweeps down and passes through
             the circle (top contact at 51.60% to exit at 51.70%),
             an orange wipe slides down into the circle synchronously
             with the curtain's moving border line.
             ======================================================== */
          @keyframes kf_circle_orange_wipe {
            0% {
              transform: translateY(-40px);
              opacity: 1;
            }
            51.60% {
              transform: translateY(-40px);
              opacity: 1;
            }
            51.70% {
              transform: translateY(0px);
              opacity: 1;
            }
            100% {
              transform: translateY(0px);
              opacity: 1;
            }
          }
          #svg_circle_orange_wipe {
            transform-origin: 0 0;
            animation: kf_circle_orange_wipe 3.0s linear ${animIteration};
          }

          @keyframes kf_circle_fill {
            0% {
              fill: #080808;
            }
            51.60% {
              fill: #080808;
            }
            51.70% {
              fill: #FF6900;
            }
            100% {
              fill: #FF6900;
            }
          }
          #svg_Vector {
            animation: kf_circle_fill 3.0s linear ${animIteration};
          }

          /* ========================================================
             4. CROSS COLOR INVERSION:
             As orange curtain passes through the circle at 51.60%-51.70%,
             Cross inverts: Orange (#FF6900) -> Dark (#080808)
             ======================================================== */
          @keyframes kf_cross_fill {
            0% {
              fill: #FF6900;
            }
            51.60% {
              fill: #FF6900;
            }
            51.70% {
              fill: #080808;
            }
            100% {
              fill: #080808;
            }
          }

          /* ========================================================
             5. CROSS ROTATION & MECHANICAL SCALE-DOWN (Vector_2)
             ======================================================== */
          @keyframes kf_Vector_2_transform_0 {
            0% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-12.566rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            1.8% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-12.566rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            12.57% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-12.566rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            12.84% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-12.463rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            14.66% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-11.782rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            16.50% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-11.136rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            18.34% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-10.522rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            20.16% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-9.943rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            22.00% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-9.391rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            23.84% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-8.873rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            25.66% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-8.391rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            27.50% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-7.944rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            29.34% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-7.538rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            31.16% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-7.178rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            33.00% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-6.865rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            34.84% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-6.609rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            36.66% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-6.42rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            38.50% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-6.307rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            39.77% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-6.283rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            51.70% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-6.283rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            52.00% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-6.005rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            53.83% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-5.299rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            55.66% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-4.628rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            57.50% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-3.992rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            59.33% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-3.395rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            61.17% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-2.829rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            63.00% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-2.302rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            64.83% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-1.817rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            66.67% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-1.373rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            68.51% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-0.977rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            70.33% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-0.637rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            72.17% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-0.357rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            74.01% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-0.148rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            75.83% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(-0.026rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            77.07% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(0rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
            100% {
              transform: translateX(902.188px) translateY(519.688px) translate(11.813px, 11.812px) rotate(0rad) scaleX(1) scaleY(1) translate(-11.812px, -11.812px);
            }
          }

          @keyframes kf_Vector_2_opacity_0 {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 1;
            }
          }
          #svg_Vector_2 {
            transform-origin: 0 0;
            animation:
              kf_Vector_2_transform_0 3.0s linear ${animIteration},
              kf_Vector_2_opacity_0 3.0s linear ${animIteration},
              kf_cross_fill 3.0s linear ${animIteration};
          }

          /* ========================================================
             6. FINAL STEP EXIT: Minimal increase & scaling down to 0
                (No pulsating/wobble — smooth minimal expansion then clean collapse to 0)
             ======================================================== */
          @keyframes kf_badge_exit_bounce {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            82.00% {
              animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
              transform: scale(1);
              opacity: 1;
            }
            86.00% {
              /* Minimal increase (slight spring pop) */
              animation-timing-function: cubic-bezier(0.4, 0, 0.7, 0.2);
              transform: scale(1.10);
              opacity: 1;
            }
            92.50% {
              transform: scale(0.60);
              opacity: 1;
            }
            96.00% {
              transform: scale(0.18);
              opacity: 1;
            }
            97.50% {
              transform: scale(0);
              opacity: 0;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          #svg_badge_exit {
            transform-origin: 914px 531.5px;
            animation: kf_badge_exit_bounce 3.0s linear ${animIteration};
          }
        `}</style>

        <g id="Frame_3" clipPath="url(#clip0_696_4623)">
          {/* Base black background */}
          <rect id="svg_Rectangle_1" width="1828" height="1063" fill="#080808" />

          {/* Panel 2 (Orange + Blueprint Grid centered 1:1 on the circle) */}
          <g
            id="svg_Rectangle_2"
            transform="matrix(1 0 0 -1 0.394531 1065)"
          >
            <rect width="1828" height="1065" fill="#FF6900" />
            <rect width="1828" height="1065" fill="url(#blueprint_grid_orange)" />
          </g>

          {/* Panel 3 (Orange + Blueprint Grid centered 1:1 Curtain) */}
          <g
            id="svg_Rectangle_3"
            opacity="0"
            transform="matrix(1 0 0 -1 0.394531 1065)"
          >
            <rect width="1828" height="1065" fill="#FF6900" />
            <rect width="1828" height="1065" fill="url(#blueprint_grid_orange)" />
          </g>

          {/* Center Badge Group: Black circle (40px) + Cross (-2px) */}
          <g
            id="svg_center_badge"
            style={{
              transform: `scale(${badgeScale})`,
              transformOrigin: '914px 531.5px',
            }}
          >
            {/* Badge Exit Group: Circle + Cross scaling down together with bounce (No shutter) */}
            <g id="svg_badge_exit">
              {/* Circle base: 40px diameter (inverts from #080808 to #FF6900 as curtain passes) */}
              <path
                id="svg_Vector"
                transform="translate(894 511.5)"
                d="M40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40C31.0457 40 40 31.0457 40 20Z"
                fill="#080808"
              />

              {/* Gradual orange wipe: slides down into circle synchronously with curtain edge */}
              <g transform="translate(894 511.5)" clipPath="url(#circle_clip)">
                <rect
                  id="svg_circle_orange_wipe"
                  width="40"
                  height="40"
                  fill="#FF6900"
                />
              </g>

              {/* Cross reduced by 2px (23.625px * 0.915344 = 21.625px, inverts from #FF6900 to #080808) */}
              <g id="svg_cross_scaled" transform="translate(914 531.5) scale(0.915344) translate(-914 -531.5)">
                <g id="svg_Vector_2_entrance">
                  <path
                    id="svg_Vector_2"
                    transform="translate(902.188 519.688)"
                    d="M10.8948 0C10.3149 0 9.84401 0.468638 9.84375 1.04839V9.84313H1.05105C0.471183 9.84313 0.0002625 10.3118 0 10.8915V12.7294C0.0002625 13.3092 0.471183 13.7804 1.05105 13.7804H9.84375V22.5726C9.84401 23.1524 10.3149 23.6236 10.8948 23.6236H12.7302C13.31 23.6236 13.7812 23.1524 13.7812 22.5726V13.7804H22.5739C23.1538 13.7804 23.625 13.3092 23.625 12.7294V10.8915C23.625 10.3118 23.1538 9.84313 22.5739 9.84313H13.7812V1.04839C13.7812 0.468638 13.31 0 12.7302 0H10.8948Z"
                    fill="#FF6900"
                  />
                </g>
              </g>

              {/* Entrance shutter clipped cleanly to 40px circle circumference */}
              <g transform="translate(894 511.5)" clipPath="url(#circle_clip)">
                {/* ENTRANCE SHUTTER: Starts closed at 0px and lifts up to -40px */}
                <rect
                  id="svg_Rectangle_0"
                  width="40"
                  height="40"
                  fill="#080808"
                />
              </g>
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_696_4623">
            <rect width="1828" height="1063" fill="white" />
          </clipPath>
          <clipPath id="circle_clip">
            <path d="M40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40C31.0457 40 40 31.0457 40 20Z" />
          </clipPath>

          {/* Blueprint Grid strictly centered on circle center (914, 531.5) */}
          <pattern
            id="blueprint_grid_orange"
            width="124"
            height="124"
            x="45.605"
            y="37.5"
            patternUnits="userSpaceOnUse"
          >
            {/* Architectural grid cell guide */}
            <path
              d="M0 0h124v124H0z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.75"
              strokeOpacity="0.08"
            />
            {/* Primary crosshair aligned to center circle axes */}
            <path
              d="M0 -5v10 M-5 0h10"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeOpacity="0.32"
              strokeLinecap="round"
              fill="none"
            />
            {/* Equidistant secondary crosshairs centered in cell */}
            <path
              d="M62 58v8 M58 62h8"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeOpacity="0.32"
              strokeLinecap="round"
              fill="none"
            />
          </pattern>
        </defs>
      </svg>
    </motion.div>
  );
}

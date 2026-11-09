import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue } from 'motion/react';
import { Hand, ArrowUpRight } from 'lucide-react';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [isGrab, setIsGrab] = useState(false);
  const [isClickable, setIsClickable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);
  const [fullscreenTarget, setFullscreenTarget] = useState<Element | null>(null);

  useEffect(() => {
    const handleFs = () => {
      setFullscreenTarget(document.fullscreenElement || (document as any).webkitFullscreenElement || null);
    };
    document.addEventListener('fullscreenchange', handleFs);
    document.addEventListener('webkitfullscreenchange', handleFs);
    return () => {
      document.removeEventListener('fullscreenchange', handleFs);
      document.removeEventListener('webkitfullscreenchange', handleFs);
    };
  }, []);

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // 1. Feature detection: only activate for mouse-capable pointer devices that are NOT touch-primary
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const supportsMouse = mediaQuery.matches && !isTouchDevice;
    setHasMouse(supportsMouse);

    if (!supportsMouse) {
      document.documentElement.classList.remove('custom-cursor-active');
      return;
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      const isTouchNow = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setHasMouse(e.matches && !isTouchNow);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    // Add active class to body to hide the standard cursor on the site
    document.documentElement.classList.add('custom-cursor-active');

    let startX = 0;
    let startY = 0;
    let isMouseDown = false;
    let dragTarget: HTMLElement | null = null;

    // 2. Mouse location tracking & Drag move detection
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      if (isMouseDown && dragTarget) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.hypot(dx, dy) > 4) {
          const isDraggableContext = !!dragTarget.closest(
            '[data-draggable="true"], .cursor-grab, [draggable="true"], .relative.w-\\[200px\\]'
          );
          if (isDraggableContext) {
            setIsDragging(true);
          }
        }
      }
    };

    // 3. Detect hover on clickable/interactive items
    const handleMouseOver = (e: MouseEvent) => {
      if (document.documentElement.classList.contains('is-smooth-scrolling')) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find nearest clickable element or grab item
      const isClickableElement = target.closest(
        'a, button, input, select, textarea, [role="button"], .cursor-pointer, [data-cursor="pointer"], [onclick]'
      );
      const isGrabItem = target.closest('.cursor-grab, [data-draggable="true"]');

      if (isClickableElement) {
        setIsClickable(true);
        setIsGrab(false);
        setHovered(true);
      } else if (isGrabItem) {
        setIsClickable(false);
        setIsGrab(true);
        setHovered(true);
      } else {
        setIsClickable(false);
        setIsGrab(false);
        setHovered(false);
      }
    };

    // 4. Shrink cursor down on mousedown (press) and back up on mouseup
    const handleMouseDown = (e: MouseEvent) => {
      setPressed(true);
      isMouseDown = true;
      startX = e.clientX;
      startY = e.clientY;
      dragTarget = e.target as HTMLElement | null;
    };

    const handleMouseUp = () => {
      setPressed(false);
      isMouseDown = false;
      dragTarget = null;
      setIsDragging(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsDragging(false);
      isMouseDown = false;
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleCustomDragStart = () => {
      setIsDragging(true);
    };

    const handleCustomDragEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('app-drag-start', handleCustomDragStart);
    window.addEventListener('app-drag-end', handleCustomDragEnd);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('app-drag-start', handleCustomDragStart);
      window.removeEventListener('app-drag-end', handleCustomDragEnd);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!hasMouse) return null;

  // Sizes based on the requested specification:
  // Default sizes: Circle size 28px (reduced by 2px), Cross size 16px
  // Hover sizes: Both become 2px larger (+2px): Circle 30px, Cross 18px
  // Press/Click/Hold down: Shrink back to default sizes (Circle 28px, Cross 16px)
  const isExpanded = hovered && !pressed;
  const circleSize = isExpanded ? 30 : 28;
  const crossSize = isExpanded ? 18 : 16;

  const cursorMarkup = (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[999999] flex items-center justify-center transition-opacity duration-300 will-change-transform"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
        width: hovered ? 38 : 34, // container wrapping size tuned down to match
        height: hovered ? 38 : 34,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Soft outline layer behind the blur/invert circle (WITHOUT mix-blend-difference so it remains perfectly visible on white background) */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        animate={{
          width: circleSize,
          height: circleSize,
          boxShadow: "none",
          border: hovered ? "1px solid rgba(0, 0, 0, 0.28)" : "1px solid rgba(0, 0, 0, 0.14)",
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 25,
        }}
      />

      {/* Semi-transparent negative-inverting background circle */}
      <motion.div
        className="absolute rounded-full mix-blend-difference"
        animate={{
          width: circleSize,
          height: circleSize,
          backgroundColor: hovered ? "rgba(255, 255, 255, 0.93)" : "rgba(255, 255, 255, 0.17)",
          boxShadow: "none",
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 25,
        }}
      />

      {/* Render hand icon if dragging, arrow icon if over clickable/interactive element, or hand icon if over a draggable item; otherwise render blueprint-style crosshair */}
      {isDragging ? (
        <motion.div
          className="absolute flex items-center justify-center"
          animate={{
            scale: pressed ? 0.85 : 1,
          }}
          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
        >
          <Hand
            size={crossSize}
            className={`transition-colors duration-200 ${pressed ? 'text-[#ff6900]' : 'text-[#121212]'}`}
            strokeWidth={1.5}
          />
        </motion.div>
      ) : isClickable ? (
        <motion.div
          className="absolute flex items-center justify-center animate-duration-200"
          animate={{
            scale: pressed ? 0.85 : 1,
          }}
          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
        >
          <ArrowUpRight
            size={crossSize}
            className={`transition-colors duration-200 ${pressed ? 'text-[#ff6900]' : 'text-[#121212]'}`}
            strokeWidth={1.5}
          />
        </motion.div>
      ) : isGrab ? (
        <motion.div
          className="absolute flex items-center justify-center"
          animate={{
            scale: pressed ? 0.85 : 1,
          }}
          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
        >
          <Hand
            size={crossSize}
            className={`transition-colors duration-200 ${pressed ? 'text-[#ff6900]' : 'text-[#121212]'}`}
            strokeWidth={1.5}
          />
        </motion.div>
      ) : (
        /* Blueprint-style crosshair in the center */
        <motion.svg
          className={`absolute transition-colors duration-200 ${hovered ? 'text-[#ff6900]' : 'text-white'}`}
          animate={{
            width: crossSize,
            height: crossSize,
          }}
          transition={{
            type: 'spring',
            stiffness: 450,
            damping: 25,
          }}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4v16M4 12h16"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </motion.svg>
      )}
    </motion.div>
  );

  const mountNode = fullscreenTarget || (typeof document !== 'undefined' ? document.body : null);
  return mountNode ? createPortal(cursorMarkup, mountNode) : cursorMarkup;
}

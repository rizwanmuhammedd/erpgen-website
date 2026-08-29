import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../lib/gsap';

export const DesktopCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);

  useEffect(() => {
    // 1. Only run on desktop devices with a fine pointer and hover capability
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer || prefersReducedMotion()) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        ringX = mouseX;
        ringY = mouseY;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if target is interactive or text input
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInput = target.matches('input, textarea, select, [contenteditable="true"]');
        setIsTextInput(isInput);

        const isInteractive = target.closest('a, button, [role="button"], [role="tab"], input[type="submit"], input[type="button"], .cursor-pointer, [tabindex="0"]');
        setIsHoveringInteractive(Boolean(isInteractive) && !isInput);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth lerp loop for outer ring
    const render = () => {
      // Linear interpolation for smooth trailing
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animFrameId);
    };
  }, [isVisible]);

  // Don't render on server or if not visible
  if (typeof window !== 'undefined' && (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || prefersReducedMotion())) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 hidden md:block ${
        isVisible && !isTextInput ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-[3px] -mt-[3px] w-1.5 h-1.5 rounded-full pointer-events-none transition-transform duration-75 ${
          isHoveringInteractive ? 'bg-[#17B681] scale-125' : 'bg-[#6D57A5]'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Smooth Trailing Interaction Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none rounded-full transition-all duration-300 ease-out border ${
          isHoveringInteractive
            ? '-ml-5 -mt-5 w-10 h-10 border-[#17B681]/40 bg-[#17B681]/5 scale-100'
            : '-ml-3.5 -mt-3.5 w-7 h-7 border-[#6D57A5]/25 bg-[#6D57A5]/[0.02] scale-100'
        }`}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

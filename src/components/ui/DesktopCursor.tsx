import React, { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const DesktopCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const checkEligibility = () => {
      if (
        typeof window === 'undefined' ||
        prefersReducedMotion() ||
        window.matchMedia('(pointer: coarse)').matches ||
        window.innerWidth < 1024
      ) {
        setIsEnabled(false);
        return false;
      }
      setIsEnabled(true);
      return true;
    };

    if (!checkEligibility()) return;

    const handleResize = () => {
      checkEligibility();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Use GSAP quickTo for 60fps hardware-accelerated motion with zero layout recalculation
    const xToCursor = gsap.quickTo(cursor, 'x', { duration: 0.28, ease: 'power3.out' });
    const yToCursor = gsap.quickTo(cursor, 'y', { duration: 0.28, ease: 'power3.out' });
    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });

    let currentMode: 'default' | 'interactive' | 'text' = 'default';

    const onMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // When hovering text inputs/textareas, hide custom cursor completely so native text cursor (I-beam) is unobstructed
      const isTextInput = target.closest('input[type="text"], input[type="email"], input[type="tel"], input[type="password"], textarea, [contenteditable="true"]');
      if (isTextInput) {
        if (currentMode !== 'text') {
          currentMode = 'text';
          gsap.to([cursor, dot], { opacity: 0, scale: 0.5, duration: 0.2, overwrite: 'auto' });
        }
        return;
      }

      // Check if target is a clickable interactive element
      const interactiveEl = target.closest('a, button, select, [role="button"], [data-magnetic="true"], [data-cursor-interactive="true"]');

      if (interactiveEl) {
        if (currentMode !== 'interactive') {
          currentMode = 'interactive';
          gsap.to(cursor, {
            opacity: 1,
            scale: 1.5,
            backgroundColor: 'rgba(109, 87, 165, 0.08)',
            borderColor: '#17B681',
            duration: 0.22,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          gsap.to(dot, {
            opacity: 1,
            scale: 0.5,
            backgroundColor: '#17B681',
            duration: 0.18,
            overwrite: 'auto',
          });
        }
      } else {
        if (currentMode !== 'default') {
          currentMode = 'default';
          gsap.to(cursor, {
            opacity: 1,
            scale: 1,
            backgroundColor: 'transparent',
            borderColor: 'rgba(109, 87, 165, 0.65)',
            duration: 0.22,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          gsap.to(dot, {
            opacity: 1,
            scale: 1,
            backgroundColor: '#6D57A5',
            duration: 0.18,
            overwrite: 'auto',
          });
        } else {
          // Ensure visible if entering from outside
          if (cursor.style.opacity !== '1') {
            cursor.style.opacity = '1';
            dot.style.opacity = '1';
          }
        }
      }
    };

    const onMouseDown = () => {
      if (currentMode !== 'text') {
        gsap.to(cursor, { scale: 0.85, duration: 0.12, ease: 'power2.out' });
      }
    };

    const onMouseUp = () => {
      if (currentMode === 'interactive') {
        gsap.to(cursor, { scale: 1.5, duration: 0.18, ease: 'back.out(1.5)' });
      } else if (currentMode === 'default') {
        gsap.to(cursor, { scale: 1, duration: 0.18, ease: 'power2.out' });
      }
    };

    const onMouseLeave = () => {
      gsap.to([cursor, dot], { opacity: 0, duration: 0.25 });
      currentMode = 'default';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <>
      {/* Outer Follower Ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#6D57A5]/70 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 will-change-transform"
        style={{ transformOrigin: 'center center' }}
        aria-hidden="true"
      />
      {/* Inner Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#6D57A5] pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 will-change-transform"
        style={{ transformOrigin: 'center center' }}
        aria-hidden="true"
      />
    </>
  );
};

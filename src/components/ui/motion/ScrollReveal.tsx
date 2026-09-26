import React, { useEffect, useRef } from 'react';
import { scrollReveal, prefersReducedMotion } from '../../../lib/gsap';

export interface ScrollRevealProps {
  children: React.ReactNode;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
  triggerOnScroll?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  y = 28,
  x = 0,
  scale = 1,
  duration = 0.8,
  delay = 0,
  ease = 'power3.out',
  className = '',
  triggerOnScroll = true,
}) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el || typeof window === 'undefined' || prefersReducedMotion()) return;

    const tween = scrollReveal(el, {
      y,
      x,
      scale,
      duration,
      delay,
      ease,
      trigger: triggerOnScroll ? el : undefined,
    });

    return () => {
      tween?.kill();
    };
  }, [y, x, scale, duration, delay, ease, triggerOnScroll]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  className?: string;
  triggerOnScroll?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  y = 30,
  className = '',
  triggerOnScroll = true,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || prefersReducedMotion()) return;

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: triggerOnScroll
          ? {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            }
          : undefined,
      }
    );

    return () => {
      tween.kill();
    };
  }, [delay, duration, y, triggerOnScroll]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

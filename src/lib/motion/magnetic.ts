import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from './reducedMotion';
import { isTouchDevice } from './responsive';

export interface MagneticOptions {
  pullFactor?: number; // default 0.14
  maxDistancePx?: number; // default 6
  duration?: number; // default 0.3
  releaseDuration?: number; // default 0.4
  disabled?: boolean;
}

/**
 * Hook providing magnetic pull interaction using hardware-accelerated GSAP quickTo.
 * Strictly inactive on touch devices, small screens (<1024px), or under reduced motion.
 */
export const useMagnetic = <T extends HTMLElement = HTMLElement>(
  options?: MagneticOptions
): React.RefObject<T | null> => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      options?.disabled ||
      typeof window === 'undefined' ||
      prefersReducedMotion() ||
      isTouchDevice() ||
      window.innerWidth < 1024
    ) {
      return;
    }

    const pull = options?.pullFactor ?? 0.14;
    const maxDist = options?.maxDistancePx ?? 6;
    const duration = options?.duration ?? 0.3;
    const releaseDuration = options?.releaseDuration ?? 0.4;

    const xTo = gsap.quickTo(el, 'x', { duration, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let dx = (e.clientX - centerX) * pull;
      let dy = (e.clientY - centerY) * pull;

      // Clamp to max distance
      dx = Math.max(-maxDist, Math.min(maxDist, dx));
      dy = Math.max(-maxDist, Math.min(maxDist, dy));

      xTo(dx);
      yTo(dy);
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: releaseDuration,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [options?.disabled, options?.pullFactor, options?.maxDistancePx, options?.duration, options?.releaseDuration]);

  return ref;
};

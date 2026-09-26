import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './reducedMotion';
import { isTouchDevice } from './responsive';

export interface PointerSpotlightOptions {
  disabled?: boolean;
}

/**
 * Reusable hook for pointer spotlight illumination.
 * Updates --mouse-x and --mouse-y directly on the DOM element without triggering React re-renders.
 * Automatically inactive on touch devices or under reduced motion.
 */
export const usePointerSpotlight = <T extends HTMLElement = HTMLElement>(
  options?: PointerSpotlightOptions
): React.RefObject<T | null> => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      options?.disabled ||
      typeof window === 'undefined' ||
      prefersReducedMotion() ||
      isTouchDevice()
    ) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    };

    el.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, [options?.disabled]);

  return ref;
};

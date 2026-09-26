import { useState, useEffect } from 'react';

export interface CancellableAnimation {
  progress: (value: number) => void;
  kill: () => void;
}

/**
 * Checks if the user has requested reduced motion at the OS/browser level.
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Reactive React hook that listens to live changes in the user's reduced-motion preference.
 */
export const useReducedMotion = (): boolean => {
  const [reduced, setReduced] = useState<boolean>(() => prefersReducedMotion());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => {
      setReduced(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', onChange);
    } else {
      // Legacy Safari support
      mediaQuery.addListener(onChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', onChange);
      } else {
        mediaQuery.removeListener(onChange);
      }
    };
  }, []);

  return reduced;
};

/**
 * Ensures an animation or timeline immediately snaps to its completion state if reduced motion is requested.
 */
export const enforceReducedMotionState = (
  animation?: CancellableAnimation | null,
  element?: HTMLElement | null,
  fallbackStyles?: Partial<CSSStyleDeclaration>
): void => {
  if (!prefersReducedMotion()) return;

  if (animation) {
    animation.progress(1);
    animation.kill();
  }

  if (element && fallbackStyles) {
    Object.assign(element.style, fallbackStyles);
  }
};

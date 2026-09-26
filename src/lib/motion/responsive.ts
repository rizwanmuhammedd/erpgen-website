import { useState, useEffect } from 'react';

export type MotionTier = 'desktop' | 'tablet' | 'mobile';

/**
 * Determines whether the current device is a touch/coarse pointer device.
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  );
};

/**
 * Computes the motion tier based on viewport width and input precision:
 * - 'desktop': >= 1024px with fine pointer (full 3D, magnetic buttons, cursor follower, rich parallax)
 * - 'tablet': 768px-1023px (moderate 3D, touch-safe, no custom cursor)
 * - 'mobile': < 768px (clean, touch-safe, un-hijacked scroll, reduced 3D)
 */
export const getMotionTier = (): MotionTier => {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  const isTouch = isTouchDevice();

  if (width >= 1024 && !isTouch) {
    return 'desktop';
  }
  if (width >= 768) {
    return 'tablet';
  }
  return 'mobile';
};

/**
 * Hook to reactively track motion tier across window resizes and orientation changes.
 */
export const useMotionTier = (): MotionTier => {
  const [tier, setTier] = useState<MotionTier>(() => getMotionTier());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setTier(getMotionTier());
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return tier;
};

/**
 * Hook to reactively track if device has coarse/touch pointer.
 */
export const useIsTouchDevice = (): boolean => {
  const [isTouch, setIsTouch] = useState<boolean>(() => isTouchDevice());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(pointer: coarse)');
    const onChange = () => {
      setIsTouch(isTouchDevice());
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', onChange);
    } else {
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

  return isTouch;
};

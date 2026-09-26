import { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Dynamically measures the actual rendered fixed header height,
 * accounting for the header's scroll delta (padding transition on scroll).
 */
export const getHeaderHeight = (fallbackDesktop = 95, fallbackMobile = 61): number => {
  if (typeof window === 'undefined') return 80;

  const header = document.querySelector('header');
  if (header) {
    const rect = header.getBoundingClientRect();
    if (rect.height > 0) {
      // If measuring while unscrolled (scrollY <= 20), subtract the 8px header height delta (py-3.5 vs py-2.5)
      const isScrolled = window.scrollY > 20;
      const currentHeight = Math.round(rect.height);
      return isScrolled ? currentHeight : Math.max(currentHeight - 8, 56);
    }
  }

  return window.innerWidth >= 1024 ? fallbackDesktop : fallbackMobile;
};

/**
 * React hook tracking the active header offset across scroll events and window resizes.
 */
export const useHeaderOffset = (fallbackDesktop = 95, fallbackMobile = 61): number => {
  const [headerOffset, setHeaderOffset] = useState<number>(() =>
    getHeaderHeight(fallbackDesktop, fallbackMobile)
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateHeight = () => {
      const h = getHeaderHeight(fallbackDesktop, fallbackMobile);
      setHeaderOffset((prev) => (Math.abs(prev - h) > 1 ? h : prev));
    };

    updateHeight();
    window.addEventListener('resize', updateHeight, { passive: true });
    window.addEventListener('scroll', updateHeight, { passive: true });
    window.addEventListener('orientationchange', updateHeight, { passive: true });

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('scroll', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, [fallbackDesktop, fallbackMobile]);

  return headerOffset;
};

/**
 * Returns viewport-safe container styles for pinned sections,
 * guaranteeing content never overflows or clips behind browser UI or fixed headers.
 */
export const getPinnedStageStyle = (headerOffset: number, extraOffsetPx = 2): React.CSSProperties => {
  return {
    height: `calc(100svh - ${headerOffset + extraOffsetPx}px)`,
    maxHeight: `calc(100svh - ${headerOffset + extraOffsetPx}px)`,
    boxSizing: 'border-box',
    overflow: 'hidden',
  };
};

/**
 * Safely triggers ScrollTrigger.refresh() with debounce and font-load awareness.
 */
export const safeScrollTriggerRefresh = (delay = 200): (() => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  const trigger = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (typeof window !== 'undefined' && ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }, delay);
  };

  // If document.fonts is supported, also refresh when web fonts are ready
  if (typeof document !== 'undefined' && 'fonts' in document) {
    document.fonts.ready.then(() => {
      trigger();
    });
  }

  return trigger;
};

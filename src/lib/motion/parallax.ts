import gsap from 'gsap';
import { prefersReducedMotion } from './reducedMotion';
import { isTouchDevice } from './responsive';

export interface ParallaxOptions {
  trigger?: HTMLElement | string;
  speed?: number; // e.g. -0.2 (gentle drift), -0.5 (medium), -0.8 (fast)
  start?: string;
  end?: string;
  disableOnTouch?: boolean;
}

/**
 * Creates a GPU-accelerated multi-speed parallax depth layer using yPercent.
 * Strictly avoids mutating top/margin to eliminate layout reflows.
 */
export const setupParallax = (
  target: HTMLElement | string,
  options?: ParallaxOptions
): gsap.core.Tween | null => {
  if (typeof window === 'undefined') return null;

  if (prefersReducedMotion() || (options?.disableOnTouch && isTouchDevice())) {
    gsap.set(target as gsap.DOMTarget, { yPercent: 0 });
    return null;
  }

  const speed = options?.speed ?? -0.3;
  const trigger = options?.trigger ?? (target as gsap.DOMTarget);
  const start = options?.start ?? 'top bottom';
  const end = options?.end ?? 'bottom top';

  // speed = -0.3 means moving -30% over the full viewport pass
  const travelPercent = speed * 100;

  return gsap.to(target as gsap.DOMTarget, {
    yPercent: travelPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger as gsap.DOMTarget,
      start,
      end,
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
};

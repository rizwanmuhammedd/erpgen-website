import gsap from 'gsap';
import { prefersReducedMotion } from './reducedMotion';

export interface ScrollScrubOptions {
  trigger: HTMLElement | string;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  pin?: boolean | HTMLElement | string;
  pinSpacing?: boolean;
  invalidateOnRefresh?: boolean;
  onUpdate?: (self: ScrollTrigger) => void;
}

/**
 * Creates a continuous, bi-directionally reversible scrub timeline.
 * Attaches will-change during the scroll active zone and removes it on exit to preserve VRAM.
 */
export const createScrollScrubTimeline = (
  options: ScrollScrubOptions,
  willChangeElements?: (HTMLElement | null)[]
): gsap.core.Timeline | null => {
  if (typeof window === 'undefined') return null;

  if (prefersReducedMotion()) {
    return null;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: options.trigger as gsap.DOMTarget,
      start: options.start ?? 'top bottom',
      end: options.end ?? 'bottom top',
      scrub: options.scrub ?? 0.8,
      pin: options.pin as gsap.DOMTarget,
      pinSpacing: options.pinSpacing ?? true,
      invalidateOnRefresh: options.invalidateOnRefresh ?? true,
      onEnter: () => {
        willChangeElements?.forEach((el) => {
          if (el) el.style.willChange = 'transform, opacity';
        });
      },
      onLeave: () => {
        willChangeElements?.forEach((el) => {
          if (el) el.style.willChange = 'auto';
        });
      },
      onEnterBack: () => {
        willChangeElements?.forEach((el) => {
          if (el) el.style.willChange = 'transform, opacity';
        });
      },
      onLeaveBack: () => {
        willChangeElements?.forEach((el) => {
          if (el) el.style.willChange = 'auto';
        });
      },
      onUpdate: options.onUpdate,
    },
  });

  return tl;
};

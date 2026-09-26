import gsap from 'gsap';
import { prefersReducedMotion } from './reducedMotion';

export interface MaskedTextOptions {
  triggerElement?: HTMLElement | string;
  start?: string;
  y?: string | number;
  duration?: number;
  stagger?: number;
  ease?: string;
  delay?: number;
  toggleActions?: string;
}

/**
 * Executes a high-precision masked line reveal where text lines slide upward
 * from an overflow: hidden container.
 * Supports both:
 * - revealMaskedLines(lines, triggerElement, options)
 * - revealMaskedLines(lines, options)
 */
export function revealMaskedLines(
  linesSelector: string | HTMLElement[] | (HTMLElement | null)[],
  triggerOrOptions?: HTMLElement | string | MaskedTextOptions,
  legacyOptions?: MaskedTextOptions
): gsap.core.Tween | null {
  if (typeof window === 'undefined') return null;

  if (prefersReducedMotion()) {
    // Under reduced motion, immediately show text with no translation
    gsap.set(linesSelector as gsap.DOMTarget, { opacity: 1, y: 0 });
    return null;
  }

  let options: MaskedTextOptions = {};

  if (typeof triggerOrOptions === 'string' || (typeof triggerOrOptions === 'object' && triggerOrOptions !== null && 'nodeType' in triggerOrOptions)) {
    options = {
      triggerElement: triggerOrOptions as HTMLElement | string,
      ...legacyOptions,
    };
  } else if (typeof triggerOrOptions === 'object' && triggerOrOptions !== null) {
    options = triggerOrOptions;
  }

  const trigger = options.triggerElement ?? (linesSelector as gsap.DOMTarget);
  const duration = options.duration ?? 0.85;
  const stagger = options.stagger ?? 0.1;
  const ease = options.ease ?? 'power4.out';
  const start = options.start ?? 'top 85%';
  const y = options.y ?? '105%';
  const delay = options.delay ?? 0;
  const toggleActions = options.toggleActions ?? 'play none none none';

  return gsap.fromTo(
    linesSelector as gsap.DOMTarget,
    { y, opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration,
      stagger,
      delay,
      ease,
      scrollTrigger: trigger
        ? {
            trigger: trigger as gsap.DOMTarget,
            start,
            toggleActions,
          }
        : undefined,
    }
  );
}

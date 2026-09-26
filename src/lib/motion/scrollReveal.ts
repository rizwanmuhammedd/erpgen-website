import gsap from 'gsap';
import { prefersReducedMotion } from './reducedMotion';

export interface ScrollRevealOptions {
  trigger?: HTMLElement | string;
  start?: string;
  end?: string;
  y?: number;
  x?: number;
  scale?: number;
  rotation?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
  toggleActions?: string;
  scrub?: boolean | number;
  onComplete?: () => void;
}

/**
 * Standard hardware-accelerated Scroll Reveal helper.
 * Animates composite-only properties (transform, opacity) with GSAP ScrollTrigger.
 */
export const scrollReveal = (
  target: HTMLElement | string | (HTMLElement | null)[],
  options?: ScrollRevealOptions
): gsap.core.Tween | null => {
  if (typeof window === 'undefined') return null;

  if (prefersReducedMotion()) {
    gsap.set(target as gsap.DOMTarget, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
    });
    return null;
  }

  const trigger = options?.trigger ?? (target as gsap.DOMTarget);
  const start = options?.start ?? 'top 85%';
  const duration = options?.duration ?? 0.8;
  const delay = options?.delay ?? 0;
  const ease = options?.ease ?? 'power3.out';
  const toggleActions = options?.toggleActions ?? 'play none none none';

  const fromVars: gsap.TweenVars = {
    opacity: options?.opacity ?? 0,
    y: options?.y ?? 28,
    x: options?.x ?? 0,
    scale: options?.scale ?? 1,
    rotation: options?.rotation ?? 0,
  };

  const toVars: gsap.TweenVars = {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotation: 0,
    duration,
    delay,
    ease,
    stagger: options?.stagger,
    onComplete: options?.onComplete,
    scrollTrigger: {
      trigger: trigger as gsap.DOMTarget,
      start,
      end: options?.end,
      toggleActions: options?.scrub ? undefined : toggleActions,
      scrub: options?.scrub,
    },
  };

  return gsap.fromTo(target as gsap.DOMTarget, fromVars, toVars);
};

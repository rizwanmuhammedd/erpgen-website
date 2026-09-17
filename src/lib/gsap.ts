import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Utility to check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};


/**
 * Standard GSAP Fade Up reveal for elements triggered on scroll
 */
export const fadeUpVariant = (element: HTMLElement | string, options?: gsap.TweenVars) => {
  if (prefersReducedMotion()) return;

  return gsap.fromTo(
    element,
    { opacity: 0, y: 28 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element as gsap.DOMTarget,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      ...options,
    }
  );
};

/**
 * Masked line reveal for headings: inner lines slide up smoothly
 */
export const revealMaskedLines = (linesSelector: string | HTMLElement[], triggerElement: HTMLElement | string) => {
  if (prefersReducedMotion()) return;

  return gsap.fromTo(
    linesSelector,
    { y: '105%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration: 0.85,
      stagger: 0.12,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: triggerElement as gsap.DOMTarget,
        start: 'top 84%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * 3D Unfold animation helper: progressively unfolds a panel into view
 */
export const unfoldFromPerspective = (
  element: HTMLElement | string,
  triggerElement: HTMLElement | string,
  options?: gsap.TweenVars
) => {
  if (prefersReducedMotion()) return;

  return gsap.fromTo(
    element,
    {
      transformPerspective: 1200,
      rotateX: 14,
      scale: 0.94,
      y: 45,
      opacity: 0.7,
    },
    {
      rotateX: 0,
      scale: 1,
      y: 0,
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: triggerElement as gsap.DOMTarget,
        start: 'top 85%',
        end: 'top 35%',
        scrub: 0.6,
      },
      ...options,
    }
  );
};



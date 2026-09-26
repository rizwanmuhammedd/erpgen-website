import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initMotionDebug } from './motion/debug';
import { prefersReducedMotion } from './motion/reducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  initMotionDebug();
}

export { gsap, ScrollTrigger };

// Re-export all unified motion foundation primitives and helpers
export * from './motion';

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

/**
 * Creates continuous cross-section depth bridge:
 * as user leaves current section, it gently scales and dims while next section rises
 */
export const setupCrossSectionBridge = (
  outgoingElement: HTMLElement | string,
  incomingElement: HTMLElement | string,
  triggerElement: HTMLElement | string
) => {
  if (prefersReducedMotion() || typeof window === 'undefined') return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement as gsap.DOMTarget,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 0.8,
    },
  });

  tl.to(outgoingElement, {
    scale: 0.96,
    opacity: 0.85,
    y: -30,
    ease: 'power1.out',
  }, 0);

  tl.fromTo(
    incomingElement,
    { scale: 0.95, opacity: 0.7, y: 50 },
    { scale: 1, opacity: 1, y: 0, ease: 'power1.out' },
    0
  );

  return tl;
};

/**
 * Multi-speed depth parallax helper
 */
export const setupParallaxDepth = (
  target: HTMLElement | string,
  trigger: HTMLElement | string,
  speed: number = 0.5,
  options?: gsap.TweenVars
) => {
  if (prefersReducedMotion() || typeof window === 'undefined') return;

  return gsap.to(target, {
    y: -1 * (speed * 100),
    ease: 'none',
    scrollTrigger: {
      trigger: trigger as gsap.DOMTarget,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
    ...options,
  });
};

/**
 * Animates numerical values with smooth scrub or trigger
 */
export const animateNumberCounter = (
  target: HTMLElement,
  endVal: number,
  duration: number = 1.4,
  prefix: string = '',
  suffix: string = ''
) => {
  if (prefersReducedMotion()) {
    target.innerText = `${prefix}${endVal}${suffix}`;
    return;
  }

  const obj = { val: 0 };
  return gsap.to(obj, {
    val: endVal,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      target.innerText = `${prefix}${Math.round(obj.val)}${suffix}`;
    },
  });
};

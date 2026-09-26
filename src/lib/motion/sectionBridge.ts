import gsap from 'gsap';
import { prefersReducedMotion } from './reducedMotion';

export interface SectionBridgeOptions {
  triggerElement: HTMLElement | string;
  outgoingElement: HTMLElement | string;
  incomingElement: HTMLElement | string;
  outgoingScale?: number; // default 0.96
  outgoingOpacity?: number; // default 0.85
  outgoingY?: number; // default -30
  incomingScale?: number; // default 0.95
  incomingOpacity?: number; // default 0.7
  incomingY?: number; // default 50
  start?: string; // default "top 80%"
  end?: string; // default "top 20%"
  scrub?: number | boolean; // default 0.8
}

/**
 * Opt-in section-to-section spatial depth bridge.
 * Seamlessly scales down outgoing content along Z-space while elevating incoming content.
 */
export const setupSectionBridge = (
  options: SectionBridgeOptions
): gsap.core.Timeline | null => {
  if (typeof window === 'undefined' || prefersReducedMotion()) return null;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: options.triggerElement as gsap.DOMTarget,
      start: options.start ?? 'top 80%',
      end: options.end ?? 'top 20%',
      scrub: options.scrub ?? 0.8,
    },
  });

  tl.to(
    options.outgoingElement as gsap.DOMTarget,
    {
      scale: options.outgoingScale ?? 0.96,
      opacity: options.outgoingOpacity ?? 0.85,
      y: options.outgoingY ?? -30,
      ease: 'power1.out',
    },
    0
  );

  tl.fromTo(
    options.incomingElement as gsap.DOMTarget,
    {
      scale: options.incomingScale ?? 0.95,
      opacity: options.incomingOpacity ?? 0.7,
      y: options.incomingY ?? 50,
    },
    {
      scale: 1,
      opacity: 1,
      y: 0,
      ease: 'power1.out',
    },
    0
  );

  return tl;
};

import gsap from 'gsap';
import { prefersReducedMotion } from './reducedMotion';
import { isTouchDevice } from './responsive';

export interface Stage3DOptions {
  perspective?: number; // default 1200px
  startRotateX?: number; // initial tilt e.g. 14 deg
  endRotateX?: number; // target tilt on scroll e.g. 0 deg
  startScale?: number; // initial scale e.g. 0.94
  endScale?: number; // target scale e.g. 1.0
  startTranslateZ?: number;
  endTranslateZ?: number;
  trigger?: HTMLElement | string;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  enableMouseTilt?: boolean;
  mouseTiltMaxDeg?: number; // default +/- 4 deg
}

export interface Stage3DInstance {
  scrollTween: gsap.core.Tween | null;
  cleanup: () => void;
}

/**
 * Sets up a hardware-accelerated 3D perspective stage with scroll scrub and optional mouse tilt.
 */
export const setup3DStage = (
  stageElement: HTMLElement,
  options?: Stage3DOptions
): Stage3DInstance => {
  if (typeof window === 'undefined' || prefersReducedMotion()) {
    return {
      scrollTween: null,
      cleanup: () => {},
    };
  }

  const perspective = options?.perspective ?? 1200;
  const startRotateX = options?.startRotateX ?? 14;
  const endRotateX = options?.endRotateX ?? 0;
  const startScale = options?.startScale ?? 0.94;
  const endScale = options?.endScale ?? 1.0;
  const trigger = options?.trigger ?? stageElement;

  // Set parent perspective styling
  gsap.set(stageElement, {
    transformPerspective: perspective,
    transformStyle: 'preserve-3d',
  });

  const scrollTween = gsap.fromTo(
    stageElement,
    {
      rotateX: startRotateX,
      scale: startScale,
      opacity: 0.85,
    },
    {
      rotateX: endRotateX,
      scale: endScale,
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: trigger as gsap.DOMTarget,
        start: options?.start ?? 'top 85%',
        end: options?.end ?? 'top 35%',
        scrub: options?.scrub ?? 0.6,
        invalidateOnRefresh: true,
      },
    }
  );

  let mouseCleanup = () => {};

  if (options?.enableMouseTilt && !isTouchDevice() && window.innerWidth >= 1024) {
    const maxDeg = options?.mouseTiltMaxDeg ?? 4;
    const rotateXTo = gsap.quickTo(stageElement, 'rotateX', { duration: 0.5, ease: 'power2.out' });
    const rotateYTo = gsap.quickTo(stageElement, 'rotateY', { duration: 0.5, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = stageElement.getBoundingClientRect();
      const xRel = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const yRel = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      rotateYTo(xRel * maxDeg * 2);
      rotateXTo(-yRel * maxDeg * 2 + endRotateX);
    };

    const handleMouseLeave = () => {
      rotateXTo(endRotateX);
      rotateYTo(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    stageElement.addEventListener('mouseleave', handleMouseLeave);

    mouseCleanup = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      stageElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }

  return {
    scrollTween,
    cleanup: () => {
      mouseCleanup();
      scrollTween?.kill();
    },
  };
};

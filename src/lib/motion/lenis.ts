import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './reducedMotion';

let globalLenisInstance: Lenis | null = null;
let globalTickerCallback: ((time: number) => void) | null = null;
let isInitialized = false;

export interface LenisConfig {
  duration?: number;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  smoothWheel?: boolean;
}

/**
 * Returns the current active global Lenis instance, if initialized.
 */
export const getLenis = (): Lenis | null => globalLenisInstance;

/**
 * Initializes the unified global Lenis smooth-scroller and synchronizes it with GSAP's ticker.
 * If reduced motion is preferred or running in SSR, returns null.
 */
export const initGlobalLenis = (config?: LenisConfig): Lenis | null => {
  if (typeof window === 'undefined' || prefersReducedMotion()) {
    return null;
  }

  // If already initialized, return the existing singleton to prevent duplicate RAF loops
  if (globalLenisInstance && isInitialized) {
    return globalLenisInstance;
  }

  const lenis = new Lenis({
    duration: config?.duration ?? 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: config?.smoothWheel ?? true,
    wheelMultiplier: config?.wheelMultiplier ?? 0.9,
    touchMultiplier: config?.touchMultiplier ?? 1.5,
    infinite: false,
  });

  globalLenisInstance = lenis;
  isInitialized = true;
  if (typeof window !== 'undefined') {
    (window as any).__lenis = lenis;
  }

  // Synchronize Lenis scroll events with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // Use GSAP's central ticker to drive Lenis RAF to eliminate dual-ticker racing
  globalTickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(globalTickerCallback);
  gsap.ticker.lagSmoothing(500, 33);

  return lenis;
};

/**
 * Destroys the global Lenis instance and detaches ticker bindings.
 */
export const destroyGlobalLenis = (): void => {
  if (globalTickerCallback) {
    gsap.ticker.remove(globalTickerCallback);
    globalTickerCallback = null;
  }

  if (globalLenisInstance) {
    globalLenisInstance.destroy();
    globalLenisInstance = null;
  }

  isInitialized = false;
};

/**
 * Smoothly scrolls to a given DOM element or numeric offset using Lenis.
 */
export const lenisScrollTo = (
  target: string | HTMLElement | number,
  options?: { offset?: number; duration?: number; immediate?: boolean }
): void => {
  if (typeof window === 'undefined') return;

  if (prefersReducedMotion() || !globalLenisInstance) {
    // Native fallback if Lenis is disabled
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'auto' });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        const offset = options?.offset ?? 0;
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: 'auto' });
      }
    }
    return;
  }

  globalLenisInstance.scrollTo(target as HTMLElement, {
    offset: options?.offset ?? 0,
    duration: options?.duration ?? 1.2,
    immediate: options?.immediate ?? false,
  });
};

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './reducedMotion';
import { getHeaderHeight, safeScrollTriggerRefresh } from './viewport';

export interface PinnedStoryConfig {
  stepCount: number;
  scrollDistanceMultiplier?: number; // e.g. 2.0 to 2.5 * innerHeight
  onStepChange?: (stepIndex: number, progress: number) => void;
  pinSpacing?: boolean;
  anticipatePin?: number;
  scrub?: number | boolean;
  mobilePin?: boolean; // defaults to true
}

export interface PinnedStoryReturn {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  pinContainerRef: React.RefObject<HTMLDivElement | null>;
  activeStep: number;
  progress: number;
  headerOffset: number;
  containerStyle: React.CSSProperties;
  scrollToStep: (stepIndex: number) => void;
  scrollTriggerInstance: ScrollTrigger | null;
}

/**
 * Reusable hook for pinned multi-stage storytelling sections.
 * Guarantees zero clipping across 16:9, 16:10, tablet, and mobile viewports.
 */
export const usePinnedStory = (config: PinnedStoryConfig): PinnedStoryReturn => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [headerOffset, setHeaderOffset] = useState<number>(() => getHeaderHeight());

  // Track dynamic header height
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateHeight = () => {
      const h = getHeaderHeight();
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
  }, []);

  // Main GSAP ScrollTrigger Pin Setup
  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion()) return;

    const sectionEl = sectionRef.current;
    const pinContainerEl = pinContainerRef.current;
    if (!sectionEl || !pinContainerEl) return;

    const refreshFn = safeScrollTriggerRefresh(250);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const minWidthQuery = config.mobilePin === false ? '(min-width: 768px)' : '(min-width: 0px)';

      mm.add(minWidthQuery, () => {
        const distanceMultiplier = config.scrollDistanceMultiplier ?? 2.2;

        const st = ScrollTrigger.create({
          trigger: sectionEl,
          pin: pinContainerEl,
          pinSpacing: config.pinSpacing ?? true,
          anticipatePin: config.anticipatePin ?? 1,
          start: () => `top top+=${getHeaderHeight()}`,
          end: () => `+=${Math.round(window.innerHeight * distanceMultiplier)}`,
          scrub: config.scrub ?? 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const currentProgress = self.progress;
            setProgress(currentProgress);

            const step = Math.min(
              config.stepCount - 1,
              Math.max(0, Math.floor(currentProgress * config.stepCount))
            );
            setActiveStep(step);
            config.onStepChange?.(step, currentProgress);
          },
        });

        scrollTriggerRef.current = st;
      });

      return () => mm.revert();
    }, sectionEl);

    refreshFn();

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
      scrollTriggerRef.current = null;
    };
  }, [config.stepCount, config.scrollDistanceMultiplier, config.mobilePin, config.pinSpacing, config.anticipatePin, config.scrub]);

  // Programmatic scroll-to-step helper
  const scrollToStep = useCallback(
    (stepIndex: number) => {
      setActiveStep(stepIndex);
      const st = scrollTriggerRef.current;
      if (st && st.start != null && st.end != null) {
        const targetProgress = (stepIndex + 0.5) / config.stepCount;
        const targetScroll = st.start + targetProgress * (st.end - st.start);
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    },
    [config.stepCount]
  );

  const containerStyle: React.CSSProperties = {
    height: `calc(100svh - ${headerOffset + 2}px)`,
    maxHeight: `calc(100svh - ${headerOffset + 2}px)`,
    boxSizing: 'border-box',
    overflow: 'hidden',
  };

  return {
    sectionRef,
    pinContainerRef,
    activeStep,
    progress,
    headerOffset,
    containerStyle,
    scrollToStep,
    scrollTriggerInstance: scrollTriggerRef.current,
  };
};

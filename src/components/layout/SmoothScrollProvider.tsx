import React, { useEffect } from 'react';
import { initGlobalLenis, destroyGlobalLenis, lenisScrollTo, prefersReducedMotion } from '../../lib/gsap';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion()) return;

    // Initialize unified global Lenis instance
    initGlobalLenis();

    // Support smooth anchor navigation (e.g. href="#modules")
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          lenisScrollTo(element as HTMLElement, { offset: -80, duration: 1.2 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      destroyGlobalLenis();
    };
  }, []);

  return <>{children}</>;
};

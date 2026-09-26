import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Checks whether motion debug mode is enabled.
 * Strictly returns false in production environments to eliminate overhead and prevent UI leaks.
 */
export const isMotionDebugEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Dead-code elimination in production
  if (!import.meta.env.DEV) return false;

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('motionDebug') === '1' || urlParams.get('motionDebug') === 'true') {
    return true;
  }

  return window.localStorage.getItem('erpgen_motion_debug') === 'true';
};

/**
 * Initializes development-only motion debug tooling if enabled.
 */
export const initMotionDebug = (): void => {
  if (!isMotionDebugEnabled()) return;

  if (typeof window !== 'undefined' && ScrollTrigger) {
    ScrollTrigger.defaults({ markers: true });
    // eslint-disable-next-line no-console
    console.info(
      '%c[ERPGen Motion Debug Active]%c ScrollTrigger markers enabled. Append ?motionDebug=0 to disable.',
      'background: #6D57A5; color: #ffffff; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
      'color: #6D57A5;'
    );
  }
};

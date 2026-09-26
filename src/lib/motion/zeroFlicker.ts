import { useEffect, useState } from 'react';

/**
 * Hook to coordinate zero-flicker progressive enhancement.
 * Guarantees content is fully visible by default if JS/animations fail,
 * and sets isReady=true only after client hydration.
 */
export const useZeroFlickerMount = (): boolean => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Flag client ready state on the document element for CSS progressive enhancement
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.motionReady = 'true';
    }
    setIsReady(true);
  }, []);

  return isReady;
};

/**
 * Utility class names for progressive enhancement:
 * Elements remain fully visible unless data-motion-ready is present on html/root.
 */
export const MOTION_READY_ATTR = 'data-motion-ready';

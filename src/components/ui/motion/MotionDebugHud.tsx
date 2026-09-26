import React, { useEffect, useState } from 'react';
import {
  isMotionDebugEnabled,
  useMotionTier,
  useHeaderOffset,
  useReducedMotion,
  getLenis,
} from '../../../lib/gsap';

export const MotionDebugHud: React.FC = () => {
  const isDebug = import.meta.env.DEV && isMotionDebugEnabled();
  const [scrollY, setScrollY] = useState(0);
  const motionTier = useMotionTier();
  const headerOffset = useHeaderOffset();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isDebug) return;

    const handleScroll = () => {
      const lenis = getLenis();
      setScrollY(Math.round(lenis?.scroll ?? window.scrollY));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDebug]);

  // Dead-code eliminated in production or hidden when debug is inactive
  if (!isDebug) {
    return null;
  }

  return (
    <aside
      aria-label="Motion Debug HUD"
      className="fixed bottom-4 left-4 z-[99999] bg-[#1F1B2D]/90 backdrop-blur-md border border-[#E9E4F1]/30 text-white text-[11px] font-mono px-3 py-2 rounded-xl shadow-2xl flex items-center gap-3 select-none pointer-events-none"
    >
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#17B681] animate-pulse" />
        <span className="font-bold text-[#A594F9]">ERPGen Motion</span>
      </div>
      <div className="h-3 w-px bg-white/20" />
      <div>
        Tier: <span className="text-[#17B681]">{motionTier}</span>
      </div>
      <div className="h-3 w-px bg-white/20" />
      <div>
        Header: <span className="text-[#38BDF8]">{headerOffset}px</span>
      </div>
      <div className="h-3 w-px bg-white/20" />
      <div>
        Scroll: <span className="text-amber-300">{scrollY}px</span>
      </div>
      <div className="h-3 w-px bg-white/20" />
      <div>
        Reduced: <span className={reducedMotion ? 'text-red-400' : 'text-emerald-400'}>{reducedMotion ? 'YES' : 'NO'}</span>
      </div>
    </aside>
  );
};

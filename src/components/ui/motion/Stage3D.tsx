import React, { useEffect, useRef } from 'react';
import { setup3DStage, prefersReducedMotion } from '../../../lib/gsap';

export interface Stage3DProps {
  children: React.ReactNode;
  perspective?: number;
  startRotateX?: number;
  endRotateX?: number;
  startScale?: number;
  endScale?: number;
  enableMouseTilt?: boolean;
  mouseTiltMaxDeg?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Stage3D: React.FC<Stage3DProps> = ({
  children,
  perspective = 1200,
  startRotateX = 14,
  endRotateX = 0,
  startScale = 0.94,
  endScale = 1.0,
  enableMouseTilt = true,
  mouseTiltMaxDeg = 4,
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === 'undefined' || prefersReducedMotion()) return;

    const instance = setup3DStage(el, {
      perspective,
      startRotateX,
      endRotateX,
      startScale,
      endScale,
      enableMouseTilt,
      mouseTiltMaxDeg,
    });

    return () => {
      instance.cleanup();
    };
  }, [perspective, startRotateX, endRotateX, startScale, endScale, enableMouseTilt, mouseTiltMaxDeg]);

  return (
    <div
      ref={containerRef}
      className={`relative will-change-transform ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

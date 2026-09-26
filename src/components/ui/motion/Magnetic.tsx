import React from 'react';
import { useMagnetic, type MagneticOptions } from '../../../lib/gsap';

export interface MagneticProps extends MagneticOptions {
  children: React.ReactElement;
  className?: string;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  pullFactor = 0.14,
  maxDistancePx = 6,
  duration = 0.3,
  releaseDuration = 0.4,
  disabled = false,
  className = '',
}) => {
  const ref = useMagnetic<HTMLDivElement>({
    pullFactor,
    maxDistancePx,
    duration,
    releaseDuration,
    disabled,
  });

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
};

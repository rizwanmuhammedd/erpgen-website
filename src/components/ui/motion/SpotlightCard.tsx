import React from 'react';
import { usePointerSpotlight } from '../../../lib/gsap';

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  spotlightRadiusPx?: number;
  className?: string;
  disabled?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  spotlightColor = 'rgba(109, 87, 165, 0.08)',
  spotlightRadiusPx = 450,
  className = '',
  disabled = false,
  ...props
}) => {
  const ref = usePointerSpotlight<HTMLDivElement>({ disabled });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden group ${className}`}
      {...props}
    >
      {!disabled && (
        <div
          className="pointer-events-none absolute -inset-px rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(${spotlightRadiusPx}px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${spotlightColor}, transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

import React, { useRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { CardProps } from '../../types';
import { prefersReducedMotion } from '../../lib/gsap';

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  className,
  onClick,
  spotlight = false,
  onMouseMove,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onMouseMove) onMouseMove(e);
    if (!spotlight || !cardRef.current || prefersReducedMotion()) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const baseStyles = 'rounded-2xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden group';

  const variantStyles = {
    default: 'bg-white border border-[#E9E4F1] shadow-[0_1px_3px_rgba(31,27,45,0.04),0_6px_18px_rgba(109,87,165,0.03)] text-[#1F1B2D]',
    glass: 'bg-white/95 backdrop-blur-md border border-[#E9E4F1] shadow-[0_1px_3px_rgba(31,27,45,0.04),0_6px_18px_rgba(109,87,165,0.03)] text-[#1F1B2D]',
    'brand-border': 'bg-white border border-[#E9E4F1] hover:border-[#6D57A5]/30 shadow-[0_1px_3px_rgba(31,27,45,0.04),0_6px_18px_rgba(109,87,165,0.03)] hover:shadow-[0_4px_12px_rgba(31,27,45,0.06),0_14px_28px_rgba(109,87,165,0.06)] hover:-translate-y-0.5 text-[#1F1B2D]',
    'hover-glow': 'bg-white border border-[#E9E4F1] hover:border-[#6D57A5]/35 shadow-[0_1px_3px_rgba(31,27,45,0.04),0_6px_18px_rgba(109,87,165,0.03)] hover:shadow-[0_4px_14px_rgba(31,27,45,0.06),0_18px_32px_rgba(109,87,165,0.07)] hover:-translate-y-0.5 text-[#1F1B2D]',
  };

  return (
    <div
      ref={cardRef}
      className={twMerge(
        clsx(
          baseStyles,
          variantStyles[variant as keyof typeof variantStyles] || variantStyles.glass,
          onClick && 'cursor-pointer',
          className
        )
      )}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background:
              'radial-gradient(450px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(109, 87, 165, 0.06), transparent 80%)',
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

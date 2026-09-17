import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { CardProps } from '../../types';

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  className,
  onClick,
  ...props
}) => {
  const baseStyles = 'rounded-2xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden';

  const variantStyles = {
    default: 'bg-white border border-[#E9E4F1] shadow-[0_1px_3px_rgba(31,27,45,0.04),0_6px_18px_rgba(109,87,165,0.03)] text-[#1F1B2D]',
    glass: 'bg-white/95 backdrop-blur-md border border-[#E9E4F1] shadow-[0_1px_3px_rgba(31,27,45,0.04),0_6px_18px_rgba(109,87,165,0.03)] text-[#1F1B2D]',
    'brand-border': 'bg-white border border-[#E9E4F1] hover:border-[#6D57A5]/30 shadow-[0_1px_3px_rgba(31,27,45,0.04),0_6px_18px_rgba(109,87,165,0.03)] hover:shadow-[0_4px_12px_rgba(31,27,45,0.06),0_14px_28px_rgba(109,87,165,0.06)] hover:-translate-y-0.5 text-[#1F1B2D]',
    'hover-glow': 'bg-white border border-[#E9E4F1] hover:border-[#6D57A5]/35 shadow-[0_1px_3px_rgba(31,27,45,0.04),0_6px_18px_rgba(109,87,165,0.03)] hover:shadow-[0_4px_14px_rgba(31,27,45,0.06),0_18px_32px_rgba(109,87,165,0.07)] hover:-translate-y-0.5 text-[#1F1B2D]',
  };

  return (
    <div
      className={twMerge(
        clsx(
          baseStyles,
          variantStyles[variant as keyof typeof variantStyles] || variantStyles.glass,
          onClick && 'cursor-pointer',
          className
        )
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

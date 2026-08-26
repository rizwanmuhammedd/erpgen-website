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
    default: 'bg-white border border-[#E9E4F1] shadow-sm text-[#1F1B2D]',
    glass: 'bg-white/95 backdrop-blur-md border border-[#E9E4F1] shadow-sm text-[#1F1B2D]',
    'brand-border': 'bg-white border border-[#E9E4F1] hover:border-[#6D57A5]/40 shadow-sm hover:shadow-md text-[#1F1B2D]',
    'hover-glow': 'bg-white border border-[#E9E4F1] hover:border-[#6D57A5]/40 hover:shadow-md hover:shadow-[#6D57A5]/5 hover:-translate-y-0.5 transition-all text-[#1F1B2D]',
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

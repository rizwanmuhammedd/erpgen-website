import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { BadgeProps } from '../../types';

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'brand',
  size = 'md',
  icon,
  className,
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full tracking-wide uppercase transition-colors';

  const sizeStyles = {
    sm: 'text-[10px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
  };

  const variantStyles = {
    brand: 'bg-[#FAF8FC] text-[#6D57A5] border border-[#E9E4F1] font-semibold',
    purple: 'bg-[#FAF8FC] text-[#6D57A5] border border-[#E9E4F1] font-semibold',
    neutral: 'bg-[#FAF8FC] text-[#625D6B] border border-[#E9E4F1] font-medium',
    outline: 'bg-transparent text-[#17B681] border border-[#17B681]/40 font-semibold',
    success: 'bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30 font-semibold',
  };

  return (
    <span
      className={twMerge(
        clsx(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant as keyof typeof variantStyles] || variantStyles.brand,
          className
        )
      )}
    >
      {icon && <span className="shrink-0 text-current">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

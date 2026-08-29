import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ButtonProps } from '../../types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-ring-purple cursor-pointer select-none group disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-[#6D57A5] hover:bg-[#584488] text-white shadow-md shadow-[#6D57A5]/20 hover:shadow-lg hover:shadow-[#6D57A5]/25 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0',
    secondary: 'bg-white hover:bg-[#FAF8FC] text-[#6D57A5] border border-[#E9E4F1] hover:border-[#6D57A5]/40 shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0',
    ghost: 'text-[#625D6B] hover:text-[#6D57A5] hover:bg-[#FAF8FC] active:scale-[0.98]',
    outline: 'border border-[#17B681] hover:border-[#129267] text-[#129267] hover:bg-[#E4F8F0] hover:-translate-y-0.5 active:scale-[0.98]',
  };

  return (
    <button
      className={twMerge(
        clsx(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          fullWidth && 'w-full',
          className
        )
      )}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </button>
  );
};

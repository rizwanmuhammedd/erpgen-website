import React, { useRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ButtonProps } from '../../types';
import { prefersReducedMotion } from '../../lib/gsap';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  magnetic,
  className,
  disabled,
  onMouseMove,
  onMouseLeave,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Apply subtle magnetic attraction only on desktop pointer devices for primary buttons (or when explicitly requested)
  const isMagneticEligible =
    magnetic !== undefined
      ? magnetic
      : variant === 'primary' && !fullWidth && !disabled;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onMouseMove) onMouseMove(e);

    if (
      !isMagneticEligible ||
      !buttonRef.current ||
      prefersReducedMotion() ||
      (typeof window !== 'undefined' && (window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches))
    ) {
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Controlled subtle pull factor: maximum displacement approx 4px
    const pullFactor = 0.12;
    buttonRef.current.style.transform = `translate3d(${x * pullFactor}px, ${y * pullFactor}px, 0)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onMouseLeave) onMouseLeave(e);

    if (buttonRef.current) {
      buttonRef.current.style.transform = '';
    }
  };

  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-ring-purple cursor-pointer select-none group disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none relative overflow-hidden will-change-transform';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-[#6D57A5] hover:bg-[#584488] text-white shadow-md shadow-[#6D57A5]/20 hover:shadow-lg hover:shadow-[#6D57A5]/30 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0',
    secondary:
      'bg-white hover:bg-[#FAF8FC] text-[#6D57A5] border border-[#E9E4F1] hover:border-[#6D57A5]/40 shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0',
    ghost:
      'text-[#625D6B] hover:text-[#6D57A5] hover:bg-[#FAF8FC] active:scale-[0.98]',
    outline:
      'border border-[#17B681] hover:border-[#129267] text-[#129267] hover:bg-[#E4F8F0] hover:-translate-y-0.5 active:scale-[0.98]',
  };

  return (
    <button
      ref={buttonRef}
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
      data-magnetic={isMagneticEligible ? 'true' : undefined}
      data-cursor-interactive="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-1 rtl:group-hover:translate-x-1">
          {icon}
        </span>
      )}
      <span className="transition-transform duration-150">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
          {icon}
        </span>
      )}
    </button>
  );
};

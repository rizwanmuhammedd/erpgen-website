import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  titleGradient?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  titleGradient,
  description,
  align = 'center',
  className,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'max-w-3xl flex flex-col space-y-4 mb-12 sm:mb-16',
          align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start',
          className
        )
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#6D57A5] bg-[#FAF8FC] px-3.5 py-1.5 rounded-full border border-[#E9E4F1] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
          {eyebrow}
        </span>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1F1B2D] leading-tight font-heading">
        {title}{' '}
        {titleGradient && (
          <span className="text-gradient-brand block sm:inline">{titleGradient}</span>
        )}
      </h2>

      {description && (
        <p className="text-base sm:text-lg text-[#625D6B] leading-relaxed font-normal max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};

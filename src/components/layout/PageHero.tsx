import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

import { useLanguage } from '../../context/LanguageContext';

interface Breadcrumb {
  label: string;
  path: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  titleGradient?: string;
  description: string;
  breadcrumbs?: Breadcrumb[];
  badgeText?: string;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  titleGradient,
  description,
  breadcrumbs,
  badgeText,
  children,
}) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const effectiveBreadcrumbs = breadcrumbs ?? [{ label: t('nav.home'), path: '/' }];

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.page-hero-eyebrow',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          '.page-hero-title',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power4.out' },
          '-=0.3'
        )
        .fromTo(
          '.page-hero-desc',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.4'
        )
        .fromTo(
          '.page-hero-actions',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [title]);

  return (
    <div ref={containerRef} className="relative py-16 sm:py-20 lg:py-24 border-b border-[#E9E4F1] bg-radial-brand-hero overflow-hidden">
      <Container size="xl" className="space-y-6 relative z-10">
        {/* Breadcrumb Trail */}
        {effectiveBreadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#625D6B]">
            {effectiveBreadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.path}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#625D6B]/50 rtl:rotate-180" />}
                <Link to={crumb.path} className="hover:text-[#6D57A5] transition-colors font-medium">
                  {crumb.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Eyebrow & Badges */}
        <div className="page-hero-eyebrow flex flex-wrap items-center gap-3">
          {eyebrow && (
            <span className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold bg-[#FAF8FC] px-3 py-1 rounded-full border border-[#E9E4F1]">
              {eyebrow}
            </span>
          )}
          {badgeText && (
            <Badge variant="brand" size="sm">
              {badgeText}
            </Badge>
          )}
        </div>

        {/* Page Main Headline */}
        <h1 className="page-hero-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F1B2D] tracking-tight leading-[1.12] font-heading max-w-4xl">
          {title}{' '}
          {titleGradient && (
            <span className="text-gradient-brand block sm:inline">{titleGradient}</span>
          )}
        </h1>

        {/* Supporting Description */}
        <p className="page-hero-desc text-base sm:text-lg lg:text-xl text-[#625D6B] font-normal leading-relaxed max-w-3xl">
          {description}
        </p>

        {children && <div className="page-hero-actions">{children}</div>}
      </Container>
    </div>
  );
};

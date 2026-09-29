import React, { useState, useEffect, useRef } from 'react';
import type { PosBusinessType } from '../../types';
import { Container } from '../ui/Container';
import { BusinessTypeShowcase } from './BusinessTypeShowcase';
import { Utensils, Scissors, ShoppingCart, Shirt, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

const BUSINESSES: {
  id: PosBusinessType;
  icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  subKey: string;
}[] = [
  {
    id: 'restaurant',
    icon: Utensils,
    titleKey: 'posIndustries.restaurant',
    subKey: 'posIndustries.restaurantDesc',
  },
  {
    id: 'barbershop',
    icon: Scissors,
    titleKey: 'posIndustries.barbershop',
    subKey: 'posIndustries.barbershopDesc',
  },
  {
    id: 'supermarket',
    icon: ShoppingCart,
    titleKey: 'posIndustries.supermarket',
    subKey: 'posIndustries.supermarketDesc',
  },
  {
    id: 'laundry',
    icon: Shirt,
    titleKey: 'posIndustries.laundry',
    subKey: 'posIndustries.laundryDesc',
  },
];

export const BusinessTypesSection: React.FC = () => {
  const [activeBusiness, setActiveBusiness] = useState<PosBusinessType>('restaurant');
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleLineRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      // 1. Masked title reveal
      if (titleLineRef.current) {
        tl.fromTo(
          titleLineRef.current,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }
        );
      }

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.45'
        );
      }

      // 2. Tabs entrance
      if (tabsRef.current) {
        tl.fromTo(
          tabsRef.current.children,
          { opacity: 0, y: 16, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
          },
          '-=0.2'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  // Smooth crossfade + directional movement when active industry changes
  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined' || !showcaseRef.current) return;

    const dirX = isRtl ? -14 : 14;

    gsap.fromTo(
      showcaseRef.current,
      { opacity: 0.3, x: dirX, scale: 0.98 },
      { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
    );
  }, [activeBusiness, isRtl]);

  return (
    <section
      ref={sectionRef}
      id="business-types"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-white border-b border-[#E9E4F1]"
      aria-label="Supported Business Workflows"
    >
      <Container size="xl" className="space-y-10 sm:space-y-14">
        {/* Section Heading with Masked Title Reveal */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8FC] border border-[#E9E4F1] text-[11px] font-mono text-[#6D57A5] font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#17B681]" />
            <span>{t('businessShowcase.eyebrow')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F1B2D] font-heading leading-tight">
            <span className="block overflow-hidden py-0.5">
              <span ref={titleLineRef} className="inline-block will-change-transform">
                {t('businessShowcase.title')}{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6D57A5] to-[#17B681]">
                  {t('businessShowcase.titleGradient')}
                </span>
              </span>
            </span>
          </h2>

          <p ref={descRef} className="text-xs sm:text-sm lg:text-base text-[#625D6B] max-w-2xl mx-auto leading-relaxed">
            {t('businessShowcase.description')}
          </p>

          <div className="w-0.5 h-6 bg-linear-to-b from-[#6D57A5] to-[#17B681] rounded-full mx-auto my-1" />
        </div>

        {/* 4 Clean Tabs Switcher */}
        <div
          ref={tabsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto"
          role="tablist"
          aria-label="Business types selection"
        >
          {BUSINESSES.map((b) => {
            const Icon = b.icon;
            const isActive = activeBusiness === b.id;

            return (
              <button
                type="button"
                key={b.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveBusiness(b.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border text-start transition-all cursor-pointer flex items-center gap-3 ${
                  isActive
                    ? 'bg-[#FAF8FC] border-[#6D57A5] shadow-sm'
                    : 'bg-white border-[#E9E4F1] hover:border-[#6D57A5]/40 hover:bg-[#FAF8FC]/50'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-[#6D57A5] text-white shadow-2xs'
                      : 'bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span
                    className={`text-xs sm:text-sm font-bold block truncate font-heading ${
                      isActive ? 'text-[#6D57A5]' : 'text-[#1F1B2D]'
                    }`}
                  >
                    {t(b.titleKey as any)}
                  </span>
                  <span className="text-[10px] text-[#625D6B] block truncate">
                    {t(b.subKey as any)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Business Showcase Display with One Central Product Visual */}
        <div ref={showcaseRef} className="max-w-5xl mx-auto will-change-[transform,opacity]">
          <BusinessTypeShowcase businessId={activeBusiness} />
        </div>
      </Container>
    </section>
  );
};

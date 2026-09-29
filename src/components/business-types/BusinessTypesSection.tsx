import React, { useState, useEffect, useRef } from 'react';
import type { PosBusinessType } from '../../types';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { BusinessTypeShowcase } from './BusinessTypeShowcase';
import { Utensils, Scissors, ShoppingCart, Shirt } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

const BUSINESSES: { id: PosBusinessType; icon: React.ComponentType<{ className?: string }>; titleKey: string; subKey: string }[] = [
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
  const tabsRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (tabsRef.current) {
        gsap.fromTo(
          tabsRef.current.children,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tabsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  // Smooth crossfade when active business changes
  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined' || !showcaseRef.current) return;
    gsap.fromTo(
      showcaseRef.current,
      { opacity: 0.35, y: 8, scale: 0.99 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
    );
  }, [activeBusiness]);

  return (
    <section
      ref={sectionRef}
      id="business-types"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-white border-b border-[#E9E4F1]"
      aria-label="Supported Business Workflows"
    >
      <Container size="xl" className="space-y-10 sm:space-y-14">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={t('businessShowcase.eyebrow')}
          title={t('businessShowcase.title')}
          titleGradient={t('businessShowcase.titleGradient')}
          description={t('businessShowcase.description')}
        />

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

        {/* Active Business Showcase Display */}
        <div ref={showcaseRef} className="max-w-5xl mx-auto">
          <BusinessTypeShowcase businessId={activeBusiness} />
        </div>
      </Container>
    </section>
  );
};

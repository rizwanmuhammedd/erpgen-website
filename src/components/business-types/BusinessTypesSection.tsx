import React, { useState, useEffect, useRef } from 'react';
import type { PosBusinessType } from '../../types';
import { POS_BUSINESS_TYPES } from '../../data/productData';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { BusinessTypeShowcase } from './BusinessTypeShowcase';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';
import { useLanguage } from '../../context/LanguageContext';

const BUSINESS_IDS: PosBusinessType[] = ['restaurant', 'barbershop', 'supermarket', 'laundry'];

export const BusinessTypesSection: React.FC = () => {
  const [activeBusiness, setActiveBusiness] = useState<PosBusinessType>('restaurant');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const { t, isRtl } = useLanguage();

  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  // Helper to dynamically measure the real fixed header height accurately
  const getHeaderHeight = (): number => {
    if (typeof window === 'undefined') return 80;
    const header = document.querySelector('header');
    if (header) {
      const rect = header.getBoundingClientRect();
      if (rect.height > 0) {
        // If measuring while un-scrolled (scrollY <= 20), subtract the 8px header height delta (py-3.5 vs py-2.5)
        const isScrolled = window.scrollY > 20;
        const currentHeight = Math.round(rect.height);
        return isScrolled ? currentHeight : Math.max(currentHeight - 8, 56);
      }
    }
    return window.innerWidth >= 1024 ? 95 : 61;
  };

  const [headerOffset, setHeaderOffset] = useState<number>(getHeaderHeight);

  // Keep header offset synchronized dynamically across scrolls and resizes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateHeight = () => {
      const h = getHeaderHeight();
      setHeaderOffset((prev) => (Math.abs(prev - h) > 1 ? h : prev));
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('scroll', updateHeight, { passive: true });

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('scroll', updateHeight);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    let refreshTimeout: ReturnType<typeof setTimeout>;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Pinned horizontal scroll sequence across the 4 business showcases on all viewports
      mm.add('(min-width: 0px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: pinContainerRef.current,
            pinSpacing: true,
            anticipatePin: 1,
            start: () => `top top+=${getHeaderHeight()}`,
            end: '+=2000',
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
              const idx = Math.min(3, Math.floor(self.progress * 4));
              setActiveBusiness(BUSINESS_IDS[idx]);
            },
          },
        });

        // Horizontal movement: 4 slides shift horizontally by -75% (exactly preserved)
        tl.to(horizontalTrackRef.current, {
          xPercent: -75,
          ease: 'none',
        });
      });

      return () => mm.revert();
    }, sectionRef);

    // Refresh ScrollTrigger once fonts and DOM layouts settle
    refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="business-types"
      className="relative overflow-hidden bg-white border-b border-[#E9E4F1]"
      aria-label="POS Business Types Section"
    >
      <div
        ref={pinContainerRef}
        className="w-full flex flex-col justify-between py-1.5 sm:py-2 lg:py-3 px-3 sm:px-6 lg:px-8 box-border overflow-hidden"
        style={{
          height: `calc(100svh - ${headerOffset + 2}px)`,
          maxHeight: `calc(100svh - ${headerOffset + 2}px)`,
        }}
      >
        <Container size="xl" className="h-full flex flex-col justify-between max-w-7xl mx-auto w-full">
          {/* Section Header with Desktop Progress Indicator */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2.5 sm:gap-4 shrink-0">
            <SectionHeading
              eyebrow={t('posIndustries.eyebrow')}
              title={t('posIndustries.title')}
              titleGradient={t('posIndustries.titleGradient')}
              description={t('posIndustries.description')}
              className="max-w-2xl text-start mb-0 space-y-1 sm:space-y-1.5 [&>p]:hidden sm:[&>p]:block [&>h2]:text-base sm:[&>h2]:text-2xl lg:[&>h2]:text-3xl"
            />

            {/* Desktop Scrub Progress Tracker & Tabs */}
            <div className="hidden lg:flex flex-col items-end space-y-2 shrink-0">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1]">
                {POS_BUSINESS_TYPES.map((b, idx) => {
                  const isActive = activeBusiness === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setActiveBusiness(b.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                        isActive
                          ? 'bg-[#6D57A5] text-white shadow-xs'
                          : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-white'
                      }`}
                    >
                      <span className="font-mono text-[10px]">0{idx + 1}</span>
                      <span>{t(`posIndustries.${b.id}`, b.title)}</span>
                    </button>
                  );
                })}
              </div>

              {/* Progress track bar */}
              <div className="w-56 h-1.5 rounded-full bg-[#E9E4F1] overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-[#6D57A5] to-[#17B681] rounded-full transition-all duration-150"
                  style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Horizontal Track (Pinned on all devices) */}
          <div dir="ltr" className="overflow-hidden w-full relative flex-1 min-h-0 my-1 sm:my-1.5 flex flex-col justify-center">
            <div
              ref={horizontalTrackRef}
              className="flex w-[400%] transition-transform ease-out overflow-visible scrollbar-none items-center"
            >
              {BUSINESS_IDS.map((id) => (
                <div
                  key={id}
                  dir={isRtl ? 'rtl' : 'ltr'}
                  className="w-1/4 shrink-0 px-2 sm:px-3 lg:px-4 transition-all duration-500"
                  style={{
                    opacity: activeBusiness === id ? 1 : 0.6,
                    transform: activeBusiness === id ? 'scale(1)' : 'scale(0.97)',
                  }}
                >
                  <BusinessTypeShowcase businessId={id} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

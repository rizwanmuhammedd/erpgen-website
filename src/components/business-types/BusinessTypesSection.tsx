import React, { useState, useEffect, useRef } from 'react';
import type { PosBusinessType } from '../../types';
import { POS_BUSINESS_TYPES } from '../../data/productData';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { BusinessTypeShowcase } from './BusinessTypeShowcase';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

const BUSINESS_IDS: PosBusinessType[] = ['restaurant', 'barbershop', 'supermarket', 'laundry'];

export const BusinessTypesSection: React.FC = () => {
  const [activeBusiness, setActiveBusiness] = useState<PosBusinessType>('restaurant');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Pinned horizontal scroll sequence across the 4 business showcases
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: pinContainerRef.current,
            start: 'top top+=80',
            end: '+=2000',
            scrub: 0.5,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
              const idx = Math.min(3, Math.floor(self.progress * 4));
              setActiveBusiness(BUSINESS_IDS[idx]);
            },
          },
        });

        // Horizontal movement: 4 slides shift horizontally by -75%
        tl.to(horizontalTrackRef.current, {
          xPercent: -75,
          ease: 'none',
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="business-types"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-white border-b border-[#E9E4F1]"
      aria-label="POS Business Types Section"
    >
      <div ref={pinContainerRef} className="w-full">
        <Container size="xl" className="space-y-8 lg:space-y-10">
          {/* Section Header with Desktop Progress Indicator */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <SectionHeading
              eyebrow="ADAPTABLE BY INDUSTRY"
              title="One connected engine."
              titleGradient="Tailored business workflows."
              description="ERPGen POS adapts to the exact operational needs of different business models with specialized counter workflows."
              className="max-w-2xl text-left"
            />

            {/* Desktop Scrub Progress Tracker & Tabs */}
            <div className="hidden lg:flex flex-col items-end space-y-3">
              <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1]">
                {POS_BUSINESS_TYPES.map((b, idx) => {
                  const isActive = activeBusiness === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setActiveBusiness(b.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#6D57A5] text-white shadow-xs'
                          : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-white'
                      }`}
                    >
                      <span className="font-mono text-[10px]">0{idx + 1}</span>
                      <span>{b.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Progress track bar */}
              <div className="w-64 h-1.5 rounded-full bg-[#E9E4F1] overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-[#6D57A5] to-[#17B681] rounded-full transition-all duration-150"
                  style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Desktop Horizontal Track (Pinned) & Mobile Snap Strip */}
          <div className="overflow-hidden w-full relative">
            <div
              ref={horizontalTrackRef}
              className="flex w-full lg:w-[400%] transition-transform ease-out lg:transition-none overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-none gap-6 lg:gap-0"
            >
              {BUSINESS_IDS.map((id) => (
                <div
                  key={id}
                  className="w-full min-w-[88vw] sm:min-w-[550px] lg:min-w-0 lg:w-1/4 snap-center shrink-0 lg:px-4 transition-all duration-500"
                  style={{
                    opacity: typeof window !== 'undefined' && window.innerWidth >= 1024
                      ? activeBusiness === id ? 1 : 0.55
                      : 1,
                    transform: typeof window !== 'undefined' && window.innerWidth >= 1024
                      ? activeBusiness === id ? 'scale(1)' : 'scale(0.96)'
                      : 'none',
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

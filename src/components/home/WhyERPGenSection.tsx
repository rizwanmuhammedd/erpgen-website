import React, { useEffect, useRef } from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { SectionHeading } from '../ui/SectionHeading';
import { WHY_ERPGEN_ITEMS, type WhyErpGenItem } from '../../data/productData';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const WhyERPGenSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Editorial typography stagger reveal
      if (itemsContainerRef.current) {
        gsap.fromTo(
          itemsContainerRef.current.children,
          {
            transformPerspective: 1200,
            rotateX: 12,
            y: 35,
            opacity: 0.1,
          },
          {
            rotateX: 0,
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: itemsContainerRef.current,
              start: 'top 85%',
              end: 'top 35%',
              scrub: 0.6,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-erpgen"
      className="py-20 lg:py-28 relative overflow-hidden bg-white border-b border-[#E9E4F1]"
      aria-label="Why ERPGen Product Focus"
    >
      <Container size="xl" className="space-y-16">
        {/* Section Intro */}
        <SectionHeading
          eyebrow="WHY CHOOSE ERPGEN"
          title="Built for actual operations."
          titleGradient="Engineered to eliminate friction."
          description="ERPGen brings frontline checkouts, procurement, inventory, and back-office accounts together so your business runs on a single dependable data core."
        />

        {/* Editorial 5-Item Stack */}
        <div
          ref={itemsContainerRef}
          className="space-y-4 max-w-4xl mx-auto"
          role="region"
          aria-label="Why ERPGen Key Product Benefits"
        >
          {WHY_ERPGEN_ITEMS.map((item: WhyErpGenItem) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] hover:border-[#6D57A5]/40 hover:bg-white hover:shadow-md transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Number & Subtitle */}
                <div className="md:col-span-4 flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-mono font-extrabold text-[#6D57A5] group-hover:scale-105 transition-transform">
                    {item.number}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono text-[#17B681] font-semibold uppercase tracking-wider block">
                      {item.subtitle}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#1F1B2D] font-heading mt-0.5 group-hover:text-[#6D57A5] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Narrative Description */}
                <div className="md:col-span-7">
                  <p className="text-xs sm:text-sm text-[#625D6B] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Verified Cue */}
                <div className="md:col-span-1 flex justify-start md:justify-end">
                  <div className="w-8 h-8 rounded-xl bg-white border border-[#E9E4F1] text-[#17B681] flex items-center justify-center shadow-2xs group-hover:border-[#17B681] transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Sub-CTA Banner */}
        <div className="p-8 rounded-3xl bg-[#FAF8FC] border border-[#E9E4F1] text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center">
            <Badge variant="brand" icon={<Sparkles className="w-3.5 h-3.5 text-[#17B681]" />}>
              ENTERPRISE SIMPLICITY
            </Badge>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1F1B2D] font-heading">
            Smarter Business. Simpler ERP.
          </h3>
          <p className="text-xs sm:text-sm text-[#625D6B] max-w-xl mx-auto leading-relaxed">
            Experience an ERP solution designed to support your day-to-day operations without software bloat or unnecessary overhead.
          </p>
          <div className="pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6D57A5] text-white text-xs font-semibold hover:bg-[#5a468c] shadow-md shadow-[#6D57A5]/20 hover:shadow-lg transition-all"
            >
              <span>See How ERPGen Fits Your Business</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

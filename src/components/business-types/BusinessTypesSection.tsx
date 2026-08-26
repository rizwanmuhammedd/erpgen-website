import React, { useState, useEffect, useRef } from 'react';
import type { PosBusinessType } from '../../types';
import { POS_BUSINESS_TYPES } from '../../data/productData';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { BusinessTypeCard } from './BusinessTypeCard';
import { BusinessTypeShowcase } from './BusinessTypeShowcase';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const BusinessTypesSection: React.FC = () => {
  // Default selected business context: Restaurant
  const [selectedBusiness, setSelectedBusiness] = useState<PosBusinessType>('restaurant');
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        showcaseRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="business-types"
      className="py-20 lg:py-28 relative overflow-hidden scroll-mt-20 bg-white border-b border-[#E9E4F1]"
      aria-label="POS Business Types Section"
    >
      <Container size="xl" className="space-y-12">
        {/* Section Intro */}
        <SectionHeading
          eyebrow="BUILT AROUND YOUR BUSINESS"
          title="One POS. Different ways to"
          titleGradient="do business."
          description="ERPGen POS adapts to the needs of different business types, giving each business a workflow that fits the way it operates."
        />

        {/* 4 Interactive Business Selector Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          role="tablist"
          aria-label="Business types selection tabs"
        >
          {POS_BUSINESS_TYPES.map((b) => (
            <BusinessTypeCard
              key={b.id}
              id={b.id}
              title={b.title}
              subtitle={b.subtitle}
              isSelected={selectedBusiness === b.id}
              onSelect={() => setSelectedBusiness(b.id)}
            />
          ))}
        </div>

        {/* Dynamic Contextual POS Visual Showcase */}
        <div ref={showcaseRef} className="pt-2">
          <BusinessTypeShowcase businessId={selectedBusiness} />
        </div>
      </Container>
    </section>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { PosFeatureCard } from './PosFeatureCard';
import { PosDashboardPreview } from './PosDashboardPreview';
import { POS_REAL_FEATURES } from '../../data/productData';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const PosFeaturesSection: React.FC = () => {
  // Default selected feature: pos-billing
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('pos-billing');
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Filter 7 primary POS features
  const primaryFeatures = POS_REAL_FEATURES.filter((f) =>
    ['pos-billing', 'returns', 'inventory', 'damaged-products', 'customers', 'sales-history', 'reports'].includes(f.id)
  );

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
        previewRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: previewRef.current,
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
      id="pos-features"
      className="py-20 lg:py-28 relative overflow-hidden scroll-mt-20 bg-[#FAF8FC] border-y border-[#E9E4F1]"
      aria-label="POS Features Section"
    >
      <Container size="xl" className="space-y-16">
        {/* Section Intro */}
        <SectionHeading
          eyebrow="POS BUILT FOR DAILY OPERATIONS"
          title="Everything your POS needs,"
          titleGradient="in one workflow."
          description="From billing and returns to inventory, customers and reporting, ERPGen POS brings the essential tools for running your counter into one connected workspace."
        />

        {/* 7 Primary Feature Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          role="region"
          aria-label="POS Primary Features Grid"
        >
          {primaryFeatures.map((feature) => (
            <PosFeatureCard
              key={feature.id}
              id={feature.id}
              name={feature.name}
              description={feature.description}
              isSelected={selectedFeatureId === feature.id}
              onSelect={() => setSelectedFeatureId(feature.id)}
            />
          ))}
        </div>

        {/* Interactive POS Application & Sidebar Preview */}
        <div ref={previewRef} className="pt-4">
          <PosDashboardPreview
            selectedFeatureId={selectedFeatureId}
            onSelectFeature={(id) => setSelectedFeatureId(id)}
          />
        </div>
      </Container>
    </section>
  );
};

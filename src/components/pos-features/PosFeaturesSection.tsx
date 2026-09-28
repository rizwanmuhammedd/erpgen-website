import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { PosFeatureCard } from './PosFeatureCard';
import { PosDashboardPreview } from './PosDashboardPreview';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const PosFeaturesSection: React.FC = () => {
  // Default selected feature: pos-billing
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('pos-billing');
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // 4 High-Level Enterprise Capability Groups
  const capabilities = [
    {
      id: 'sales-billing',
      previewId: 'pos-billing',
      name: t('posFeatures.cap1Title'),
      subtitle: t('posFeatures.cap1Subtitle'),
      description: t('posFeatures.cap1Desc'),
    },
    {
      id: 'inventory-ops',
      previewId: 'inventory',
      name: t('posFeatures.cap2Title'),
      subtitle: t('posFeatures.cap2Subtitle'),
      description: t('posFeatures.cap2Desc'),
    },
    {
      id: 'customers-management',
      previewId: 'customers',
      name: t('posFeatures.cap3Title'),
      subtitle: t('posFeatures.cap3Subtitle'),
      description: t('posFeatures.cap3Desc'),
    },
    {
      id: 'reports-insights',
      previewId: 'reports',
      name: t('posFeatures.cap4Title'),
      subtitle: t('posFeatures.cap4Subtitle'),
      description: t('posFeatures.cap4Desc'),
    },
  ];

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Clean workspace panel stagger elevation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          {
            scale: 0.98,
            y: 20,
            opacity: 0.3,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            stagger: 0.07,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 0.5,
            },
          }
        );
      }

      // Settle preview dashboard workspace
      if (previewRef.current) {
        gsap.fromTo(
          previewRef.current,
          {
            scale: 0.98,
            y: 22,
            opacity: 0.4,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: previewRef.current,
              start: 'top 85%',
              end: 'top 48%',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Perspective settle when selected feature changes
  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined' || !previewRef.current) return;
    gsap.fromTo(
      previewRef.current,
      { opacity: 0.75, y: 6, scale: 0.99, rotateX: 2, transformPerspective: 1000 },
      { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.3, ease: 'power2.out' }
    );
  }, [selectedFeatureId]);

  // Determine if a capability group is currently active based on preview feature ID
  const isCapabilityActive = (cap: typeof capabilities[0]) => {
    if (cap.previewId === selectedFeatureId) return true;
    if (cap.id === 'sales-billing' && ['pos-billing', 'returns', 'sales-history'].includes(selectedFeatureId)) return true;
    if (cap.id === 'inventory-ops' && ['inventory', 'damaged-products'].includes(selectedFeatureId)) return true;
    if (cap.id === 'customers-management' && selectedFeatureId === 'customers') return true;
    if (cap.id === 'reports-insights' && selectedFeatureId === 'reports') return true;
    return false;
  };

  return (
    <section
      ref={sectionRef}
      id="pos-features"
      className="py-20 lg:py-28 relative overflow-hidden scroll-mt-20 bg-[#FAF8FC] border-b border-[#E9E4F1]"
      aria-label="POS Capabilities Section"
    >
      <Container size="xl" className="space-y-12 lg:space-y-16">
        {/* Section Intro */}
        <SectionHeading
          eyebrow={t('posFeatures.eyebrow')}
          title={t('posFeatures.title')}
          titleGradient={t('posFeatures.titleGradient')}
          description={t('posFeatures.description')}
        />

        {/* 4 Premium Capability Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          role="region"
          aria-label="POS Capabilities Overview"
        >
          {capabilities.map((cap) => (
            <PosFeatureCard
              key={cap.id}
              id={cap.id}
              name={cap.name}
              subtitle={cap.subtitle}
              description={cap.description}
              isSelected={isCapabilityActive(cap)}
              onSelect={() => setSelectedFeatureId(cap.previewId)}
            />
          ))}
        </div>

        {/* Interactive POS Application Workspace Visual (High Priority Showcase) */}
        <div ref={previewRef} className="pt-2 will-change-[transform,opacity]">
          <PosDashboardPreview
            selectedFeatureId={selectedFeatureId}
            onSelectFeature={(id) => setSelectedFeatureId(id)}
          />
        </div>
      </Container>
    </section>
  );
};

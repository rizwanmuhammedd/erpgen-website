import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Sparkles, Utensils, Scissors, ShoppingCart, Shirt } from 'lucide-react';
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
  const streamBadgeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const handoffRef = useRef<HTMLDivElement>(null);
  const { t, isRtl } = useLanguage();

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
      // 1. Data stream arrival badge
      if (streamBadgeRef.current) {
        gsap.fromTo(
          streamBadgeRef.current,
          { opacity: 0.2, y: -15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: streamBadgeRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Capability cards stagger elevation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { scale: 0.98, y: 20, opacity: 0.3 },
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

      // 3. Settle preview dashboard workspace
      if (previewRef.current) {
        gsap.fromTo(
          previewRef.current,
          { scale: 0.98, y: 22, opacity: 0.4 },
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

      // 4. POS -> Business Types Handoff bridge elevation
      if (handoffRef.current) {
        gsap.fromTo(
          handoffRef.current,
          { y: 24, opacity: 0.3 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: handoffRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  // Subtle settle when selected feature changes
  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined' || !previewRef.current) return;
    gsap.fromTo(
      previewRef.current,
      { opacity: 0.85, y: 4 },
      { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
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
        {/* 1. ERP Core Data Stream Indicator */}
        <div ref={streamBadgeRef} className="flex flex-col items-center text-center space-y-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E9E4F1] text-[11px] font-mono text-[#17B681] font-bold shadow-2xs">
            <ShoppingBag className="w-3.5 h-3.5 text-[#17B681]" />
            <span>{t('posStory.badge')}</span>
          </div>
          <p className="text-[11px] text-[#625D6B] font-mono">
            {t('posStory.terminalOnline')}
          </p>
          <div className="w-0.5 h-8 bg-linear-to-b from-[#17B681] to-[#6D57A5] rounded-full my-1" />
        </div>

        {/* 2. Section Intro */}
        <SectionHeading
          eyebrow={t('posFeatures.eyebrow')}
          title={t('posFeatures.title')}
          titleGradient={t('posFeatures.titleGradient')}
          description={t('posFeatures.description')}
        />

        {/* 3. 4 Premium Capability Cards Grid */}
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

        {/* 4. Interactive POS Application Workspace Visual (5-Layer Spatial Stack) */}
        <div ref={previewRef} className="pt-2 will-change-[transform,opacity]">
          <PosDashboardPreview
            selectedFeatureId={selectedFeatureId}
            onSelectFeature={(id) => setSelectedFeatureId(id)}
          />
        </div>

        {/* 5. POS → Business Types Handoff Bridge */}
        <div
          ref={handoffRef}
          className="pt-8 sm:pt-12 text-center max-w-3xl mx-auto space-y-4 border-t border-[#E9E4F1]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E9E4F1] text-[11px] font-mono text-[#6D57A5] font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#17B681]" />
            <span>{t('posHandoff.eyebrow')}</span>
          </div>

          <h4 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1F1B2D] font-heading">
            {t('posHandoff.title')}{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6D57A5] to-[#17B681]">
              {t('posHandoff.titleGradient')}
            </span>
          </h4>

          <p className="text-xs sm:text-sm text-[#625D6B] max-w-2xl mx-auto leading-relaxed">
            {t('posHandoff.description')}
          </p>

          {/* 4 Industry Quick Icons */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1F1B2D] bg-white px-3 py-1.5 rounded-xl border border-[#E9E4F1] shadow-2xs">
              <Utensils className="w-3.5 h-3.5 text-[#6D57A5]" />
              <span>{t('posIndustries.restaurant')}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1F1B2D] bg-white px-3 py-1.5 rounded-xl border border-[#E9E4F1] shadow-2xs">
              <Scissors className="w-3.5 h-3.5 text-[#17B681]" />
              <span>{t('posIndustries.barbershop')}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1F1B2D] bg-white px-3 py-1.5 rounded-xl border border-[#E9E4F1] shadow-2xs">
              <ShoppingCart className="w-3.5 h-3.5 text-[#6D57A5]" />
              <span>{t('posIndustries.supermarket')}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1F1B2D] bg-white px-3 py-1.5 rounded-xl border border-[#E9E4F1] shadow-2xs">
              <Shirt className="w-3.5 h-3.5 text-[#17B681]" />
              <span>{t('posIndustries.laundry')}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

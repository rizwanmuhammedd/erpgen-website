import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag,
  Sparkles,
  Utensils,
  Scissors,
  ShoppingCart,
  Shirt,
  Layers,
  Coins,
  Package,
  Receipt,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { PosDashboardPreview } from './PosDashboardPreview';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const PosFeaturesSection: React.FC = () => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('pos-billing');
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleLineRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const streamBadgeRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const capsGridRef = useRef<HTMLDivElement>(null);
  const handoffRef = useRef<HTMLDivElement>(null);
  const { t, isRtl } = useLanguage();

  // 5 Clean Key Capabilities based on prompt requirements: Billing, Products, Orders, Payments, Inventory
  const fiveCapabilities = [
    {
      id: 'billing',
      previewId: 'pos-billing',
      icon: Receipt,
      title: t('posFeatures.capBilling'),
      desc: t('posFeatures.capBillingDesc'),
    },
    {
      id: 'products',
      previewId: 'inventory',
      icon: ShoppingBag,
      title: t('posFeatures.capProducts'),
      desc: t('posFeatures.capProductsDesc'),
    },
    {
      id: 'orders',
      previewId: 'pos-billing',
      icon: Layers,
      title: t('posFeatures.capOrders'),
      desc: t('posFeatures.capOrdersDesc'),
    },
    {
      id: 'payments',
      previewId: 'pos-billing',
      icon: Coins,
      title: t('posFeatures.capPayments'),
      desc: t('posFeatures.capPaymentsDesc'),
    },
    {
      id: 'inventory',
      previewId: 'inventory',
      icon: Package,
      title: t('posFeatures.capInventory'),
      desc: t('posFeatures.capInventoryDesc'),
    },
  ];

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

      // 1. Badge & masked title reveal
      if (streamBadgeRef.current) {
        tl.fromTo(
          streamBadgeRef.current,
          { opacity: 0, y: -14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
      }

      if (titleLineRef.current) {
        tl.fromTo(
          titleLineRef.current,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power4.out' },
          '-=0.3'
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

      // 2. 5 capabilities staggered reveal
      if (capsGridRef.current) {
        tl.fromTo(
          capsGridRef.current.children,
          { opacity: 0, y: 18, scale: 0.98 },
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

      // 3. Handoff bridge to Business Types
      if (handoffRef.current) {
        tl.fromTo(
          handoffRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.1'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <section
      ref={sectionRef}
      id="pos-features"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden scroll-mt-20 bg-[#FAF8FC] border-b border-[#E9E4F1]"
      aria-label="POS Capabilities Section"
    >
      <Container size="xl" className="space-y-12 lg:space-y-16">
        {/* 1. Header: ERPGEN POS with Masked Title Reveal */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div
            ref={streamBadgeRef}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E9E4F1] text-[11px] font-mono text-[#17B681] font-bold shadow-2xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#17B681]" />
            <span>{t('posFeatures.productEyebrow')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F1B2D] font-heading leading-tight">
            <span className="block overflow-hidden py-0.5">
              <span ref={titleLineRef} className="inline-block will-change-transform">
                {t('posFeatures.title')}{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#17B681] to-[#6D57A5]">
                  {t('posFeatures.titleGradient')}
                </span>
              </span>
            </span>
          </h2>

          <p ref={descRef} className="text-xs sm:text-sm lg:text-base text-[#625D6B] max-w-2xl mx-auto leading-relaxed">
            {t('posFeatures.description')}
          </p>

          <div className="w-0.5 h-6 bg-linear-to-b from-[#17B681] to-[#6D57A5] rounded-full mx-auto my-1" />
        </div>

        {/* 2. Large Clean POS Product Visual (Enters from depth with sequential panels) */}
        <div ref={previewRef}>
          <PosDashboardPreview
            selectedFeatureId={selectedFeatureId}
            onSelectFeature={(id) => setSelectedFeatureId(id)}
          />
        </div>

        {/* 3. 5 Key Capabilities: Billing, Products, Orders, Payments, Inventory */}
        <div
          ref={capsGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 max-w-6xl mx-auto"
          role="region"
          aria-label="POS Key Capabilities"
        >
          {fiveCapabilities.map((cap) => {
            const Icon = cap.icon;
            const isSelected = selectedFeatureId === cap.previewId;

            return (
              <button
                type="button"
                key={cap.id}
                onClick={() => setSelectedFeatureId(cap.previewId)}
                className={`p-4 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#17B681] shadow-sm'
                    : 'bg-white/80 border-[#E9E4F1] hover:border-[#17B681]/40 hover:bg-white'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#17B681] flex items-center justify-center font-bold">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1F1B2D] font-heading">
                      {cap.title}
                    </h4>
                    <p className="text-xs text-[#625D6B] mt-1 leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-[#E9E4F1] flex items-center justify-between text-[10px] font-mono text-[#17B681] font-semibold">
                  <span>ERPGen POS</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17B681]" />
                </div>
              </button>
            );
          })}
        </div>

        {/* 4. POS → Business Types Handoff Bridge */}
        <div
          ref={handoffRef}
          className="pt-6 sm:pt-10 text-center max-w-3xl mx-auto space-y-4 border-t border-[#E9E4F1]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E9E4F1] text-[11px] font-mono text-[#6D57A5] font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#17B681]" />
            <span>{t('posHandoff.eyebrow')}</span>
          </div>

          <h4 className="text-xl sm:text-2xl font-extrabold text-[#1F1B2D] font-heading">
            {t('posHandoff.title')}{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6D57A5] to-[#17B681]">
              {t('posHandoff.titleGradient')}
            </span>
          </h4>

          <p className="text-xs sm:text-sm text-[#625D6B] max-w-2xl mx-auto leading-relaxed">
            {t('posHandoff.description')}
          </p>

          {/* 4 Industry Quick Icons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#business-types"
              className="flex items-center gap-1.5 text-xs font-semibold text-[#1F1B2D] bg-white px-3.5 py-1.5 rounded-xl border border-[#E9E4F1] shadow-2xs hover:border-[#6D57A5]/40 transition-colors"
            >
              <Utensils className="w-3.5 h-3.5 text-[#6D57A5]" />
              <span>{t('posIndustries.restaurant')}</span>
            </a>
            <a
              href="#business-types"
              className="flex items-center gap-1.5 text-xs font-semibold text-[#1F1B2D] bg-white px-3.5 py-1.5 rounded-xl border border-[#E9E4F1] shadow-2xs hover:border-[#17B681]/40 transition-colors"
            >
              <Scissors className="w-3.5 h-3.5 text-[#17B681]" />
              <span>{t('posIndustries.barbershop')}</span>
            </a>
            <a
              href="#business-types"
              className="flex items-center gap-1.5 text-xs font-semibold text-[#1F1B2D] bg-white px-3.5 py-1.5 rounded-xl border border-[#E9E4F1] shadow-2xs hover:border-[#6D57A5]/40 transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-[#6D57A5]" />
              <span>{t('posIndustries.supermarket')}</span>
            </a>
            <a
              href="#business-types"
              className="flex items-center gap-1.5 text-xs font-semibold text-[#1F1B2D] bg-white px-3.5 py-1.5 rounded-xl border border-[#E9E4F1] shadow-2xs hover:border-[#17B681]/40 transition-colors"
            >
              <Shirt className="w-3.5 h-3.5 text-[#17B681]" />
              <span>{t('posIndustries.laundry')}</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

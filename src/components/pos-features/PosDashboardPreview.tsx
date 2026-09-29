import React, { useEffect, useRef } from 'react';
import {
  ShoppingBag,
  CreditCard,
  Printer,
  CheckCircle2,
  Sparkles,
  Layers,
  Coins,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

interface PosDashboardPreviewProps {
  selectedFeatureId?: string;
  onSelectFeature?: (id: string) => void;
}

export const PosDashboardPreview: React.FC<PosDashboardPreviewProps> = ({
  selectedFeatureId = 'pos-billing',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const catalogPanelRef = useRef<HTMLDivElement>(null);
  const orderPanelRef = useRef<HTMLDivElement>(null);
  const settlementRowRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 1. Terminal enters from depth: scale: 0.94 -> 1, y: 32 -> 0, opacity: 0 -> 1
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 32, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        }
      )
        // 2. Left Catalog panel reveals
        .fromTo(
          catalogPanelRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.4'
        )
        // 3. Right Order panel reveals
        .fromTo(
          orderPanelRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.35'
        )
        // 4. Payment settlement methods reveal
        .fromTo(
          settlementRowRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.2)' },
          '-=0.2'
        );

      // Subtle parallax on scroll
      gsap.to(containerRef.current, {
        y: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full relative py-2 sm:py-4 select-none will-change-[transform,opacity]"
      aria-label="ERPGen POS Terminal Interface"
    >
      <div className="w-full max-w-4xl mx-auto rounded-3xl border border-[#E9E4F1] shadow-xl shadow-[#17B681]/5 overflow-hidden bg-white">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#FAF8FC] border-b border-[#E9E4F1] text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/40 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#17B681]/40 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/20 inline-block" />
            </div>
            <span className="text-[#625D6B] font-mono text-[11px] ms-2">
              erpgen.pos / counter-terminal / {selectedFeatureId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#17B681] animate-pulse" />
            <Badge
              variant="brand"
              size="sm"
              className="text-[10px] font-mono font-bold bg-[#E4F8F0] text-[#129267] border-[#17B681]/30"
            >
              {t('posFeatures.registerOnline')}
            </Badge>
          </div>
        </div>

        {/* 2-Column Clean POS Workspace */}
        <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Product Catalog & Touch Items (7 Cols) */}
          <div ref={catalogPanelRef} className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E4F1]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#17B681] font-bold block">
                  {t('posFeatures.touchCatalog')}
                </span>
                <h4 className="text-base sm:text-lg font-extrabold text-[#1F1B2D] font-heading">
                  {t('posFeatures.counterSpeed')}
                </h4>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
                {t('posFeatures.instantAdd')}
              </span>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#FAF8FC] border-2 border-[#17B681] shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E9E4F1] text-[#17B681] flex items-center justify-center font-bold">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#17B681]" />
                </div>
                <span className="text-xs font-bold text-[#1F1B2D] block">
                  {t('posFeatures.bevSelect')}
                </span>
                <span className="text-[10px] text-[#625D6B] block mt-0.5">
                  {t('posFeatures.customMod')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E9E4F1] hover:border-[#6D57A5]/40 transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold mb-2">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#1F1B2D] block">
                  {t('posFeatures.bakeryDining')}
                </span>
                <span className="text-[10px] text-[#625D6B] block mt-0.5">
                  {t('posFeatures.kitchenRouting')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E9E4F1] hover:border-[#6D57A5]/40 transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold mb-2">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#1F1B2D] block">
                  {t('posFeatures.packagedRetail')}
                </span>
                <span className="text-[10px] text-[#625D6B] block mt-0.5">
                  {t('posFeatures.barcodeScanned')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E9E4F1] hover:border-[#17B681]/40 transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#17B681] flex items-center justify-center font-bold mb-2">
                  <CreditCard className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#1F1B2D] block">
                  {t('posFeatures.expressService')}
                </span>
                <span className="text-[10px] text-[#625D6B] block mt-0.5">
                  {t('posFeatures.directCheckout')}
                </span>
              </div>
            </div>

            {/* Catalog Footer Strip */}
            <div className="flex items-center justify-between text-xs text-[#625D6B] pt-2 border-t border-[#E9E4F1]">
              <span className="flex items-center gap-1.5 text-[#129267] font-semibold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681]" />
                <span>{t('posFeatures.syncLedger')}</span>
              </span>
              <span className="font-mono text-[10px] text-[#6D57A5] font-semibold">ERPGen POS</span>
            </div>
          </div>

          {/* Right: Active Order Ticket & Settlement (5 Cols) */}
          <div
            ref={orderPanelRef}
            className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Order Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-[#E9E4F1]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#17B681] animate-pulse" />
                  <span className="text-xs font-bold text-[#1F1B2D] font-heading">
                    {t('posFeatures.activeSession')}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#6D57A5] font-semibold">
                  {t('posFeatures.orderReady')}
                </span>
              </div>

              {/* Order Summary */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#1F1B2D]">
                  <span className="font-medium">{t('posFeatures.selectedItems')}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white border border-[#E9E4F1] text-[#6D57A5]">
                    {t('posFeatures.itemsCount')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#625D6B] text-[11px]">
                  <span>{t('simulator.taxVat')}</span>
                  <span className="text-[#17B681] font-semibold">{t('posFeatures.autoReconciled')}</span>
                </div>
              </div>
            </div>

            {/* Payment Settlement Methods */}
            <div ref={settlementRowRef} className="space-y-2.5 pt-2 border-t border-[#E9E4F1]">
              <div className="flex justify-between items-baseline text-xs">
                <span className="font-bold text-[#1F1B2D]">{t('posFeatures.settlement')}</span>
                <span className="font-mono font-bold text-[#17B681]">{t('posFeatures.instantClearing')}</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                <div className="p-2 rounded-lg bg-white border-2 border-[#17B681] text-[#129267] font-semibold text-center flex items-center justify-center gap-1 shadow-2xs">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>{t('simulator.card')}</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-[#E9E4F1] text-[#625D6B] font-semibold text-center flex items-center justify-center gap-1">
                  <Coins className="w-3.5 h-3.5" />
                  <span>{t('simulator.cash')}</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-[#E9E4F1] text-[#625D6B] font-semibold text-center flex items-center justify-center gap-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{t('simulator.split')}</span>
                </div>
              </div>
            </div>

            {/* Hardware Status Strip */}
            <div className="p-2.5 rounded-xl bg-white border border-[#17B681]/30 flex items-center gap-2.5 text-xs">
              <Printer className="w-4 h-4 text-[#17B681] shrink-0" />
              <div className="text-[11px]">
                <span className="font-bold text-[#1F1B2D] block leading-tight">
                  {t('posFeatures.thermalPrintReady')}
                </span>
                <span className="text-[#129267] font-medium block">
                  {t('posFeatures.liveStockUpdated')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

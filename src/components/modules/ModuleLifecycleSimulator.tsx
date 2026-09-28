import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  Printer,
  CreditCard,
  Coins,
  ShieldCheck,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export type ProductShowcaseTab = 'invoice' | 'pos';

export const ModuleLifecycleSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProductShowcaseTab>('invoice');
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 3D signature folding / unfolding animation scrubbed with scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'top 25%',
          scrub: 0.6,
        },
      });

      // 1. Stage lifts and rotates from perspective fold
      tl.fromTo(
        stageRef.current,
        {
          transformPerspective: 1400,
          rotateX: 18,
          scale: 0.92,
          y: 45,
          opacity: 0.5,
        },
        {
          rotateX: 0,
          scale: 1,
          y: 0,
          opacity: 1,
          ease: 'power2.out',
        }
      );

      // 2. Document side verification tab unfolds
      tl.fromTo(
        '.document-fold-panel',
        {
          rotateY: -25,
          opacity: 0.4,
          transformOrigin: 'left center',
        },
        {
          rotateY: 0,
          opacity: 1,
          ease: 'power2.out',
        },
        '-=0.3'
      );

      // 3. Progressive reveal of the abstract structural rows
      tl.fromTo(
        '.product-showcase-unfold-row',
        {
          y: 16,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          ease: 'power2.out',
        },
        '-=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#FAF8FC] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E9E4F1] shadow-xs relative overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#6D57A5]/5 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#17B681]/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="relative z-10 space-y-8">
        {/* Header: Title & Interactive Tab Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E4F1]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                {t('simulator.eyebrow')}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
              <span className="text-[11px] text-[#625D6B] font-medium">{t('simulator.interactiveDemo')}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F1B2D] font-heading mt-1">
              {t('simulator.title')}
            </h3>
          </div>

          {/* Module Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#E9E4F1] shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab('invoice')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'invoice'
                  ? 'bg-[#6D57A5] text-white shadow-xs'
                  : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC]'
              }`}
              aria-pressed={activeTab === 'invoice'}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t('simulator.invoiceTab')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pos')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'pos'
                  ? 'bg-[#17B681] text-white shadow-xs'
                  : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC]'
              }`}
              aria-pressed={activeTab === 'pos'}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t('simulator.posTab')}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Product Showcase: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Narrative Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {activeTab === 'invoice' ? (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-white border border-[#E9E4F1] text-[#6D57A5]">
                  <Sparkles className="w-3 h-3 text-[#17B681]" />
                  <span>{t('simulator.invoiceTag')}</span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading leading-tight">
                  {t('simulator.invoiceHeadline')}
                </h4>

                <p className="text-sm text-[#625D6B] leading-relaxed">
                  {t('simulator.invoiceDesc')}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-[#E9E4F1]">
                  <div className="flex items-center gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                    <span>{t('simulator.invFeat1')}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                    <span>{t('simulator.invFeat2')}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                    <span>{t('simulator.invFeat3')}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                    <span>{t('simulator.invFeat4')}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link to="/products/invoice">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
                      className="shadow-xs"
                    >
                      {t('simulator.exploreInvoice')}
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-white border border-[#E9E4F1] text-[#17B681]">
                  <Sparkles className="w-3 h-3 text-[#6D57A5]" />
                  <span>{t('simulator.posTag')}</span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading leading-tight">
                  {t('simulator.posHeadline')}
                </h4>

                <p className="text-sm text-[#625D6B] leading-relaxed">
                  {t('simulator.posDesc')}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-[#E9E4F1]">
                  <div className="flex items-center gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                    <span>{t('simulator.posFeat1')}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                    <span>{t('simulator.posFeat2')}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                    <span>{t('simulator.posFeat3')}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                    <span>{t('simulator.posFeat4')}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link to="/products/pos">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
                      className="shadow-xs bg-[#17B681] hover:bg-[#149d6f]"
                    >
                      {t('simulator.explorePos')}
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Visual Stage (7 cols) */}
          <div className="lg:col-span-7">
            <div
              ref={stageRef}
              className="bg-white rounded-2xl border border-[#E9E4F1] shadow-md overflow-hidden will-change-transform"
            >
              {/* Window Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#FAF8FC] border-b border-[#E9E4F1] text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/30 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#17B681]/40 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/20 inline-block" />
                  </div>
                  <span className="font-mono text-[11px] text-[#625D6B] ms-1">
                    {activeTab === 'invoice'
                      ? 'erpgen.invoice / document-workspace'
                      : 'erpgen.pos / register-terminal-01'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#17B681] animate-pulse" />
                  <span className="text-[10px] font-mono font-semibold text-[#129267]">
                    {t('simulator.workspacePreview')}
                  </span>
                </div>
              </div>

              {/* Representative Product Mockup Screen */}
              <div className="p-5 sm:p-6">
                {activeTab === 'invoice' ? (
                  /* ABSTRACT INVOICE PRODUCT DOCUMENT */
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {/* Top Brand Accent */}
                    <div className="h-1.5 w-full bg-linear-to-r from-[#6D57A5] to-[#17B681] rounded-full" />

                    {/* Invoice Header */}
                    <div className="product-showcase-unfold-row p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold block">
                          {t('modulesPillars.invoiceTitle')}
                        </span>
                        <h5 className="text-base font-extrabold text-[#1F1B2D] font-heading mt-0.5">
                          {t('modulesPillars.commercialBilling')}
                        </h5>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
                        {t('simulator.docVerified')}
                      </span>
                    </div>

                    {/* Abstract Document Structure Blocks (Zero fake customer names / fake IDs) */}
                    <div className="product-showcase-unfold-row grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-white border border-[#E9E4F1]">
                        <span className="text-[10px] font-mono text-[#625D6B] block uppercase">{t('simulator.billingEntity')}</span>
                        <span className="font-bold text-[#1F1B2D] block mt-1">{t('simulator.enterpriseAccount')}</span>
                        <span className="text-[11px] text-[#17B681] font-medium">{t('simulator.autoLedger')}</span>
                      </div>
                      <div className="document-fold-panel p-3.5 rounded-xl bg-white border border-[#E9E4F1]">
                        <span className="text-[10px] font-mono text-[#625D6B] block uppercase">{t('simulator.calculationEngine')}</span>
                        <span className="font-bold text-[#1F1B2D] block mt-1">{t('simulator.taxVat')}</span>
                        <span className="text-[11px] text-[#6D57A5] font-medium">{t('simulator.automatedRounding')}</span>
                      </div>
                    </div>

                    {/* Abstract Itemized Delivery Blocks */}
                    <div className="product-showcase-unfold-row p-3.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-2">
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E9E4F1]">
                        <span className="font-bold text-[#1F1B2D]">{t('simulator.configuredDeliverables')}</span>
                        <span className="text-[10px] font-mono text-[#625D6B]">{t('simulator.summaryReady')}</span>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E9E4F1]">
                          <span className="font-semibold text-[#1F1B2D]">{t('simulator.platformPlan')}</span>
                          <span className="text-[10px] font-mono font-bold text-[#17B681] bg-[#E4F8F0] px-2 py-0.5 rounded">{t('simulator.activePlan')}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E9E4F1]">
                          <span className="font-semibold text-[#1F1B2D]">{t('simulator.posStation')}</span>
                          <span className="text-[10px] font-mono font-bold text-[#6D57A5] bg-[#FAF8FC] px-2 py-0.5 rounded">{t('simulator.linkedRegister')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Clean Summary Area (Zero fake dollar calculations) */}
                    <div className="product-showcase-unfold-row p-3.5 rounded-xl bg-white border border-[#6D57A5]/30 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] font-mono text-[#625D6B] block uppercase">{t('simulator.financialStatus')}</span>
                        <span className="font-bold text-[#1F1B2D] text-sm mt-0.5 block">{t('simulator.balanceReconciled')}</span>
                      </div>
                      <span className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#6D57A5] shadow-xs">
                        {t('simulator.instantPdf')}
                      </span>
                    </div>

                    {/* Status Note */}
                    <div className="product-showcase-unfold-row flex items-center justify-between text-xs text-[#625D6B] pt-1">
                      <span className="flex items-center gap-1.5 text-[#129267] font-medium">
                        <ShieldCheck className="w-4 h-4 text-[#17B681]" />
                        <span>{t('simulator.exportReady')}</span>
                      </span>
                      <span className="font-mono text-[10px] text-[#6D57A5] font-semibold">ERPGen Invoice</span>
                    </div>
                  </div>
                ) : (
                  /* ABSTRACT POS INTERFACE */
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {/* Top Brand Accent */}
                    <div className="h-1.5 w-full bg-linear-to-r from-[#17B681] to-[#6D57A5] rounded-full" />

                    {/* Register Header */}
                    <div className="product-showcase-unfold-row p-3.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#17B681] font-bold block">
                          {t('simulator.counterRegister')}
                        </span>
                        <h5 className="text-sm font-bold text-[#1F1B2D] mt-0.5">
                          {t('simulator.activeCheckoutLane')}
                        </h5>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
                        {t('simulator.counterReady')}
                      </span>
                    </div>

                    {/* Touch Item Grid */}
                    <div className="product-showcase-unfold-row grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                      <div className="p-3 rounded-xl bg-[#FAF8FC] border border-[#6D57A5] text-[#1F1B2D] font-bold text-center">
                        {t('simulator.beverages')}
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-[#E9E4F1] text-[#625D6B] text-center">
                        {t('simulator.foodDining')}
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-[#E9E4F1] text-[#625D6B] text-center">
                        {t('simulator.retailPack')}
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-[#E9E4F1] text-[#625D6B] text-center">
                        {t('simulator.services')}
                      </div>
                    </div>

                    {/* Active Order Card & Settlement */}
                    <div className="product-showcase-unfold-row p-3.5 rounded-xl bg-white border border-[#E9E4F1] shadow-2xs space-y-2.5 text-xs">
                      <div className="flex justify-between items-center pb-2 border-b border-[#E9E4F1]">
                        <span className="font-bold text-[#1F1B2D]">{t('simulator.activeTicket')}</span>
                        <span className="text-[10px] font-mono text-[#17B681] font-semibold">{t('simulator.readySettlement')}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                        <div className="p-2 rounded-lg bg-[#FAF8FC] border border-[#6D57A5]/40 text-[#6D57A5] font-semibold text-center flex items-center justify-center gap-1">
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

                    {/* POS Status Strip */}
                    <div className="product-showcase-unfold-row p-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-between text-xs text-[#625D6B]">
                      <div className="flex items-center gap-1.5 text-[#129267] font-semibold">
                        <Printer className="w-3.5 h-3.5 text-[#17B681]" />
                        <span>{t('simulator.thermalReceiptIssued')}</span>
                      </div>
                      <span className="font-mono text-[10px] text-[#6D57A5] font-semibold">ERPGen POS</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

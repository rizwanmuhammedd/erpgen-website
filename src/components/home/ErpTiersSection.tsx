import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Sliders,
  Package,
  Layers,
  FileText,
  ShoppingBag,
  Boxes,
  ShieldCheck,
  Scale,
  GitBranch,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

type ActiveTab = 'lite' | 'pro' | 'compare';

interface DimensionItem {
  id: string;
  titleKey: string;
  liteKey: string;
  proKey: string;
}

const COMPARISON_DIMENSIONS: DimensionItem[] = [
  {
    id: 'deployment',
    titleKey: 'tiers.dimDeployment',
    liteKey: 'tiers.liteDeployment',
    proKey: 'tiers.proDeployment',
  },
  {
    id: 'workflows',
    titleKey: 'tiers.dimWorkflows',
    liteKey: 'tiers.liteWorkflows',
    proKey: 'tiers.proWorkflows',
  },
  {
    id: 'customization',
    titleKey: 'tiers.dimCustomization',
    liteKey: 'tiers.liteCustomization',
    proKey: 'tiers.proCustomization',
  },
  {
    id: 'inventory',
    titleKey: 'tiers.dimInventory',
    liteKey: 'tiers.liteInventory',
    proKey: 'tiers.proInventory',
  },
  {
    id: 'support',
    titleKey: 'tiers.dimSupport',
    liteKey: 'tiers.liteSupport',
    proKey: 'tiers.proSupport',
  },
];

export const ErpTiersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('lite');
  const sectionRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t, isRtl } = useLanguage();

  const handleSelectTier = (tier: 'lite' | 'pro') => {
    navigate(`/contact?tier=${tier}`);
  };

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Natural, non-scrubbed entrance handoff from Hero
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0.9, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (diagramRef.current) {
        gsap.fromTo(
          diagramRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: diagramRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  // Smooth, lightweight crossfade when switching tabs
  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0.4,
          y: 8,
          scale: 0.99,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        }
      );
    }
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="erp-tiers"
      className="py-14 sm:py-20 lg:py-28 relative bg-[#FAF8FC]/50 border-b border-[#E9E4F1] overflow-hidden"
      aria-label="ERP Lite and ERP Pro Product Offerings"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[#6D57A5]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-[#17B681]/5 blur-[120px] rounded-full pointer-events-none" />

      <Container size="xl" className="space-y-8 sm:space-y-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E9E4F1] text-[11px] font-mono font-semibold text-[#6D57A5] shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#17B681]" />
            <span>{t('tiers.eyebrow')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F1B2D] tracking-tight font-heading leading-tight">
            {t('tiers.title')}{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6D57A5] to-[#17B681]">
              {t('tiers.titleGradient')}
            </span>
          </h2>

          <p className="text-xs sm:text-sm lg:text-base text-[#625D6B] leading-relaxed max-w-2xl mx-auto">
            {t('tiers.description')}
          </p>
        </div>

        {/* Purposeful Architectural Split Diagram */}
        <div
          ref={diagramRef}
          className="max-w-2xl mx-auto p-3 sm:p-4 rounded-2xl bg-white border border-[#E9E4F1] shadow-2xs"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center shrink-0">
                <GitBranch className="w-4 h-4 text-[#6D57A5]" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-[#1F1B2D] block">ERPGen Core Architecture</span>
                <span className="text-[10px] text-[#625D6B] font-mono">Two deployment models, one unified data core</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono font-bold">
              <span className="px-2.5 py-1 rounded-lg bg-[#FAF8FC] border border-[#6D57A5]/30 text-[#6D57A5]">
                Standard → ERP Lite
              </span>
              <span className="text-[#625D6B]">•</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#E4F8F0] border border-[#17B681]/30 text-[#129267]">
                Custom → ERP Pro
              </span>
            </div>
          </div>
        </div>

        {/* Mobile-Optimized Segmented Selector */}
        <div className="flex justify-center">
          <div className="w-full sm:w-auto max-w-md grid grid-cols-3 p-1 rounded-xl sm:rounded-2xl bg-white border border-[#E9E4F1] shadow-xs gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('lite')}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'lite'
                  ? 'bg-[#6D57A5] text-white shadow-xs'
                  : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC]'
              }`}
              aria-pressed={activeTab === 'lite'}
            >
              <Package className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{t('tiers.tabLite')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pro')}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'pro'
                  ? 'bg-[#17B681] text-white shadow-xs'
                  : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC]'
              }`}
              aria-pressed={activeTab === 'pro'}
            >
              <Sliders className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{t('tiers.tabPro')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('compare')}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'compare'
                  ? 'bg-[#1F1B2D] text-white shadow-xs'
                  : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC]'
              }`}
              aria-pressed={activeTab === 'compare'}
            >
              <Scale className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{t('tiers.tabCompare')}</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div ref={contentRef} className="max-w-5xl mx-auto">
          {/* LITE TIER */}
          {activeTab === 'lite' && (
            <Card
              variant="default"
              className="bg-white border-2 border-[#6D57A5]/30 shadow-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 transition-all hover:border-[#6D57A5]/50"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
                {/* Left Description Column */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="brand" size="md">
                      {t('tiers.liteTag')}
                    </Badge>
                    <span className="text-[11px] sm:text-xs font-mono text-[#625D6B]">{t('tiers.standardVersion')}</span>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1F1B2D] font-heading">
                      {t('tiers.liteTitle')}{' '}
                      <span className="text-[#6D57A5] font-normal block sm:inline text-base sm:text-xl lg:text-2xl mt-0.5 sm:mt-0">
                        — {t('tiers.liteSubtitle')}
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#625D6B] leading-relaxed">
                      {t('tiers.liteDesc')}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2 pt-1">
                    {[
                      t('tiers.liteFeat1'),
                      t('tiers.liteFeat2'),
                      t('tiers.liteFeat3'),
                      t('tiers.liteFeat4'),
                      t('tiers.liteFeat5'),
                    ].map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1F1B2D]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#6D57A5] shrink-0 mt-0.5" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => handleSelectTier('lite')}
                      icon={<ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}
                    >
                      {t('tiers.liteCta')}
                    </Button>
                    <span className="text-[11px] sm:text-xs text-[#625D6B] font-mono text-center sm:text-start">
                      {t('tiers.liteOnboarding')}
                    </span>
                  </div>
                </div>

                {/* Right Architecture Block (Compact & Purposeful) */}
                <div className="lg:col-span-5 bg-[#FAF8FC] border border-[#E9E4F1] rounded-2xl p-4 sm:p-6 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#E9E4F1]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                      {t('tiers.standardPkgArch')}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#17B681]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
                      {t('tiers.readyToRun')}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 bg-white rounded-xl border border-[#E9E4F1] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF8FC] text-[#6D57A5] flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-[#1F1B2D] truncate">{t('tiers.invoiceStd')}</h5>
                        <p className="text-[11px] text-[#625D6B] truncate">{t('tiers.invoiceStdDesc')}</p>
                      </div>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-[#E9E4F1] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#E4F8F0] text-[#17B681] flex items-center justify-center shrink-0">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-[#1F1B2D] truncate">{t('tiers.posStd')}</h5>
                        <p className="text-[11px] text-[#625D6B] truncate">{t('tiers.posStdDesc')}</p>
                      </div>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-[#E9E4F1] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF8FC] text-[#6D57A5] flex items-center justify-center shrink-0">
                        <Boxes className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-[#1F1B2D] truncate">{t('tiers.inventoryStd')}</h5>
                        <p className="text-[11px] text-[#625D6B] truncate">{t('tiers.inventoryStdDesc')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100 text-[11px] text-[#6D57A5] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{t('tiers.securityNote')}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* PRO TIER */}
          {activeTab === 'pro' && (
            <Card
              variant="default"
              className="bg-white border-2 border-[#17B681]/30 shadow-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 transition-all hover:border-[#17B681]/50"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
                {/* Left Description Column */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="success" size="md">
                      {t('tiers.proTag')}
                    </Badge>
                    <span className="text-[11px] sm:text-xs font-mono text-[#17B681]">{t('tiers.configuredSolution')}</span>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1F1B2D] font-heading">
                      {t('tiers.proTitle')}{' '}
                      <span className="text-[#17B681] font-normal block sm:inline text-base sm:text-xl lg:text-2xl mt-0.5 sm:mt-0">
                        — {t('tiers.proSubtitle')}
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#625D6B] leading-relaxed">
                      {t('tiers.proDesc')}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2 pt-1">
                    {[
                      t('tiers.proFeat1'),
                      t('tiers.proFeat2'),
                      t('tiers.proFeat3'),
                      t('tiers.proFeat4'),
                      t('tiers.proFeat5'),
                    ].map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1F1B2D]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0 mt-0.5" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => handleSelectTier('pro')}
                      icon={<ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}
                    >
                      {t('tiers.proCta')}
                    </Button>
                    <span className="text-[11px] sm:text-xs text-[#625D6B] font-mono text-center sm:text-start">
                      {t('tiers.proOnboarding')}
                    </span>
                  </div>
                </div>

                {/* Right Architecture Block (Compact & Purposeful) */}
                <div className="lg:col-span-5 bg-[#FAF8FC] border border-[#E9E4F1] rounded-2xl p-4 sm:p-6 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#E9E4F1]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#17B681] font-bold">
                      {t('tiers.customAdaptWorkflow')}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#6D57A5]">
                      <Sparkles className="w-3 h-3 text-[#17B681]" />
                      {t('tiers.bespokeStaging')}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 bg-white rounded-xl border border-[#E9E4F1] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#17B681] flex items-center justify-center shrink-0">
                        <Sliders className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-[#1F1B2D] truncate">{t('tiers.customOps')}</h5>
                        <p className="text-[11px] text-[#625D6B] truncate">{t('tiers.customOpsDesc')}</p>
                      </div>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-[#E9E4F1] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF8FC] text-[#6D57A5] flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-[#1F1B2D] truncate">{t('tiers.brandedDocs')}</h5>
                        <p className="text-[11px] text-[#625D6B] truncate">{t('tiers.brandedDocsDesc')}</p>
                      </div>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-[#E9E4F1] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#17B681] flex items-center justify-center shrink-0">
                        <Boxes className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-[#1F1B2D] truncate">{t('tiers.multiBranchStock')}</h5>
                        <p className="text-[11px] text-[#625D6B] truncate">{t('tiers.multiBranchStockDesc')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-[11px] text-[#129267] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{t('tiers.proSecurityNote')}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* COMPARE TIERS (Mobile-Native Stacked Cards + Desktop Table) */}
          {activeTab === 'compare' && (
            <Card
              variant="default"
              className="bg-white border border-[#E9E4F1] shadow-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 overflow-hidden"
            >
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1F1B2D] font-heading">
                    {t('tiers.compareTitle')}
                  </h3>
                  <p className="text-xs text-[#625D6B]">
                    {t('tiers.compareDesc')}
                  </p>
                </div>

                {/* MOBILE VIEW (< 768px): Native Stacked Dimension Cards */}
                <div className="block md:hidden space-y-3">
                  {COMPARISON_DIMENSIONS.map((dim) => (
                    <div
                      key={dim.id}
                      className="p-3.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-2.5"
                    >
                      <span className="text-xs font-bold text-[#1F1B2D] block font-heading">
                        {t(dim.titleKey as any)}
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 rounded-lg bg-white border border-[#6D57A5]/20 space-y-0.5">
                          <span className="text-[10px] font-mono font-bold text-[#6D57A5] block">
                            ERP Lite
                          </span>
                          <span className="text-[#625D6B] block leading-tight">
                            {t(dim.liteKey as any)}
                          </span>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-[#17B681]/30 space-y-0.5">
                          <span className="text-[10px] font-mono font-bold text-[#129267] block">
                            ERP Pro
                          </span>
                          <span className="text-[#1F1B2D] font-medium block leading-tight">
                            {t(dim.proKey as any)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* DESKTOP / TABLET VIEW (>= 768px): Clean Table */}
                <div className="hidden md:block overflow-x-auto pb-1">
                  <table className="w-full text-xs text-start">
                    <thead className="bg-[#FAF8FC] text-[#625D6B] font-mono uppercase tracking-wider text-[11px] border-b border-[#E9E4F1]">
                      <tr>
                        <th className="py-3 px-4 font-bold w-1/4">{t('tiers.dimension')}</th>
                        <th className="py-3 px-4 font-bold text-[#6D57A5] w-3/8">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#6D57A5]" />
                            {t('tiers.liteTitle')}
                          </span>
                        </th>
                        <th className="py-3 px-4 font-bold text-[#17B681] w-3/8">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#17B681]" />
                            {t('tiers.proTitle')}
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9E4F1]">
                      {COMPARISON_DIMENSIONS.map((dim, idx) => (
                        <tr
                          key={dim.id}
                          className={idx % 2 === 1 ? 'bg-[#FAF8FC]/50 hover:bg-[#FAF8FC]' : 'hover:bg-[#FAF8FC]/80'}
                        >
                          <td className="py-3.5 px-4 font-bold text-[#1F1B2D]">{t(dim.titleKey as any)}</td>
                          <td className="py-3.5 px-4 text-[#625D6B]">{t(dim.liteKey as any)}</td>
                          <td className="py-3.5 px-4 text-[#1F1B2D] font-medium">{t(dim.proKey as any)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Compare CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 text-center items-stretch sm:items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSelectTier('lite')}
                  >
                    {t('tiers.liteCta')}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSelectTier('pro')}
                  >
                    {t('tiers.proCta')}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Narrative Continuity Handoff: From Scale Choice to the Six Operational Pillars */}
        <div className="max-w-5xl mx-auto p-4 rounded-2xl bg-white border border-[#E9E4F1] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-[#6D57A5] uppercase tracking-wider font-bold block">
              {t('tiers.scaleChosen')}
            </span>
            <p className="text-xs text-[#625D6B]">
              {t('tiers.exploreSixAreas')}
            </p>
          </div>

          <a
            href="#six-areas"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-xs font-semibold text-[#1F1B2D] hover:text-[#6D57A5] hover:border-[#6D57A5]/40 hover:bg-white shadow-2xs transition-all shrink-0"
          >
            <span>{t('whatIs.coreModules')}</span>
            <ArrowRight className={`w-3.5 h-3.5 text-[#17B681] ${isRtl ? 'rotate-180' : ''}`} />
          </a>
        </div>
      </Container>
    </section>
  );
};

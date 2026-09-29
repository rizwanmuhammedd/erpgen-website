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
  Scale,
  GitBranch,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

type MobileActiveTab = 'lite' | 'pro' | 'compare';

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
  const [mobileTab, setMobileTab] = useState<MobileActiveTab>('lite');
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleLineRef = useRef<HTMLSpanElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);
  const desktopCardsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t, isRtl } = useLanguage();

  const handleSelectTier = (tier: 'lite' | 'pro') => {
    navigate(`/contact?tier=${tier}`);
  };

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

      // 1. Masked title reveal
      if (titleLineRef.current) {
        tl.fromTo(
          titleLineRef.current,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }
        );
      }

      // 2. Architecture split diagram
      if (diagramRef.current) {
        tl.fromTo(
          diagramRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.4'
        );
      }

      // 3. Desktop cards spatial reveal
      if (desktopCardsRef.current) {
        tl.fromTo(
          desktopCardsRef.current.children,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  // Animated active state for mobile selector
  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    if (mobileContentRef.current) {
      gsap.fromTo(
        mobileContentRef.current,
        {
          opacity: 0,
          y: 12,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          ease: 'power2.out',
        }
      );
    }
  }, [mobileTab]);

  return (
    <section
      ref={sectionRef}
      id="erp-tiers"
      className="py-14 sm:py-20 lg:py-24 relative bg-[#FAF8FC]/50 border-b border-[#E9E4F1] overflow-hidden"
      aria-label="ERP Lite and ERP Pro Product Offerings"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[#6D57A5]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-[#17B681]/5 blur-[120px] rounded-full pointer-events-none" />

      <Container size="xl" className="space-y-8 sm:space-y-12 relative z-10">
        {/* Section Header with Masked Title Reveal */}
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E9E4F1] text-[11px] font-mono font-semibold text-[#6D57A5] shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#17B681]" />
            <span>{t('tiers.eyebrow')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F1B2D] tracking-tight font-heading leading-tight">
            <span className="block overflow-hidden py-0.5">
              <span ref={titleLineRef} className="inline-block will-change-transform">
                {t('tiers.title')}{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6D57A5] to-[#17B681]">
                  {t('tiers.titleGradient')}
                </span>
              </span>
            </span>
          </h2>

          <p className="text-xs sm:text-sm lg:text-base text-[#625D6B] leading-relaxed max-w-2xl mx-auto">
            {t('tiers.description')}
          </p>
        </div>

        {/* Architecture Split Diagram */}
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

        {/* ========================================================================= */}
        {/* DESKTOP VIEW (>= 1024px): Strong Visual Comparison with Spatial Separation */}
        {/* ========================================================================= */}
        <div
          ref={desktopCardsRef}
          className="hidden lg:grid grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch"
        >
          {/* Card 1: ERP LITE (Standard) */}
          <Card
            variant="default"
            className="bg-white border-2 border-[#6D57A5]/30 hover:border-[#6D57A5]/60 shadow-md rounded-3xl p-8 flex flex-col justify-between transition-all"
          >
            <div className="space-y-6">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E9E4F1]">
                <div className="flex items-center gap-2">
                  <Badge variant="brand" size="md">
                    {t('tiers.liteTag')}
                  </Badge>
                  <span className="text-xs font-mono text-[#625D6B]">{t('tiers.standardVersion')}</span>
                </div>
                <span className="text-[10px] font-mono text-[#17B681] font-bold bg-[#E4F8F0] px-2.5 py-1 rounded-full">
                  {t('tiers.readyToRun')}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-2xl font-bold text-[#1F1B2D] font-heading">
                  {t('tiers.liteTitle')}
                </h3>
                <p className="text-sm font-semibold text-[#6D57A5] mt-1">
                  {t('tiers.liteSubtitle')}
                </p>
                <p className="text-xs text-[#625D6B] mt-2 leading-relaxed">
                  {t('tiers.liteDesc')}
                </p>
              </div>

              {/* 5 Feature Checklist */}
              <div className="space-y-2.5 pt-1">
                {[
                  t('tiers.liteFeat1'),
                  t('tiers.liteFeat2'),
                  t('tiers.liteFeat3'),
                  t('tiers.liteFeat4'),
                  t('tiers.liteFeat5'),
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#6D57A5] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Architecture Included Modules Mini-Cards */}
              <div className="p-3.5 bg-[#FAF8FC] border border-[#E9E4F1] rounded-2xl space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold block">
                  {t('tiers.standardPkgArch')}
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-white rounded-xl border border-[#E9E4F1] text-[11px]">
                    <FileText className="w-3.5 h-3.5 text-[#6D57A5] mx-auto mb-1" />
                    <span className="font-bold text-[#1F1B2D] block truncate">{t('tiers.invoiceStd')}</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-[#E9E4F1] text-[11px]">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#17B681] mx-auto mb-1" />
                    <span className="font-bold text-[#1F1B2D] block truncate">{t('tiers.posStd')}</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-[#E9E4F1] text-[11px]">
                    <Boxes className="w-3.5 h-3.5 text-[#6D57A5] mx-auto mb-1" />
                    <span className="font-bold text-[#1F1B2D] block truncate">{t('tiers.inventoryStd')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6 mt-6 border-t border-[#E9E4F1] flex flex-col gap-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => handleSelectTier('lite')}
                fullWidth
                icon={<ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}
              >
                {t('tiers.liteCta')}
              </Button>
              <span className="text-[11px] text-[#625D6B] font-mono text-center">
                {t('tiers.liteOnboarding')}
              </span>
            </div>
          </Card>

          {/* Card 2: ERP PRO (Custom Tailored) */}
          <Card
            variant="default"
            className="bg-white border-2 border-[#17B681]/40 hover:border-[#17B681] shadow-md rounded-3xl p-8 flex flex-col justify-between transition-all"
          >
            <div className="space-y-6">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E9E4F1]">
                <div className="flex items-center gap-2">
                  <Badge variant="success" size="md">
                    {t('tiers.proTag')}
                  </Badge>
                  <span className="text-xs font-mono text-[#17B681]">{t('tiers.configuredSolution')}</span>
                </div>
                <span className="text-[10px] font-mono text-[#6D57A5] font-bold bg-[#FAF8FC] px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#17B681]" />
                  <span>{t('tiers.bespokeStaging')}</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-2xl font-bold text-[#1F1B2D] font-heading">
                  {t('tiers.proTitle')}
                </h3>
                <p className="text-sm font-semibold text-[#17B681] mt-1">
                  {t('tiers.proSubtitle')}
                </p>
                <p className="text-xs text-[#625D6B] mt-2 leading-relaxed">
                  {t('tiers.proDesc')}
                </p>
              </div>

              {/* 5 Feature Checklist */}
              <div className="space-y-2.5 pt-1">
                {[
                  t('tiers.proFeat1'),
                  t('tiers.proFeat2'),
                  t('tiers.proFeat3'),
                  t('tiers.proFeat4'),
                  t('tiers.proFeat5'),
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Custom Architecture Modules Mini-Cards */}
              <div className="p-3.5 bg-[#FAF8FC] border border-[#E9E4F1] rounded-2xl space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#17B681] font-bold block">
                  {t('tiers.customAdaptWorkflow')}
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-white rounded-xl border border-[#E9E4F1] text-[11px]">
                    <Sliders className="w-3.5 h-3.5 text-[#17B681] mx-auto mb-1" />
                    <span className="font-bold text-[#1F1B2D] block truncate">{t('tiers.customOps')}</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-[#E9E4F1] text-[11px]">
                    <FileText className="w-3.5 h-3.5 text-[#6D57A5] mx-auto mb-1" />
                    <span className="font-bold text-[#1F1B2D] block truncate">{t('tiers.brandedDocs')}</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-[#E9E4F1] text-[11px]">
                    <Boxes className="w-3.5 h-3.5 text-[#17B681] mx-auto mb-1" />
                    <span className="font-bold text-[#1F1B2D] block truncate">{t('tiers.multiBranchStock')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6 mt-6 border-t border-[#E9E4F1] flex flex-col gap-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => handleSelectTier('pro')}
                fullWidth
                icon={<ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}
              >
                {t('tiers.proCta')}
              </Button>
              <span className="text-[11px] text-[#625D6B] font-mono text-center">
                {t('tiers.proOnboarding')}
              </span>
            </div>
          </Card>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET VIEW (< 1024px): Compact Animated Responsive Presentation */}
        {/* ========================================================================= */}
        <div className="block lg:hidden max-w-lg mx-auto space-y-5">
          {/* Mobile Eyebrow Breadcrumb: ERPGen -> STANDARD / CUSTOM */}
          <div className="text-center space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold block">
              ERPGen Deployment Models
            </span>
            <span className="text-xs text-[#625D6B] block">
              Select standard package or configure custom modules
            </span>
          </div>

          {/* Compact 2-Button Animated Segmented Switcher */}
          <div className="flex justify-center">
            <div className="w-full grid grid-cols-2 p-1 rounded-xl bg-white border border-[#E9E4F1] shadow-xs gap-1">
              <button
                type="button"
                onClick={() => setMobileTab('lite')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mobileTab === 'lite'
                    ? 'bg-[#6D57A5] text-white shadow-xs'
                    : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC]'
                }`}
                aria-pressed={mobileTab === 'lite'}
              >
                <Package className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">STANDARD: ERP LITE</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileTab('pro')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mobileTab === 'pro'
                    ? 'bg-[#17B681] text-white shadow-xs'
                    : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC]'
                }`}
                aria-pressed={mobileTab === 'pro'}
              >
                <Sliders className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">CUSTOM: ERP PRO</span>
              </button>
            </div>
          </div>

          {/* Compact Mobile Card Content */}
          <div ref={mobileContentRef} className="will-change-[transform,opacity]">
            {mobileTab === 'lite' ? (
              <Card
                variant="default"
                className="bg-white border-2 border-[#6D57A5]/40 shadow-sm rounded-2xl p-4 sm:p-6 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#E9E4F1]">
                  <div className="flex items-center gap-1.5">
                    <Badge variant="brand" size="sm">
                      {t('tiers.liteTag')}
                    </Badge>
                    <span className="text-[11px] font-mono text-[#625D6B]">{t('tiers.standardVersion')}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#17B681] font-bold bg-[#E4F8F0] px-2 py-0.5 rounded">
                    {t('tiers.readyToRun')}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#1F1B2D] font-heading">
                    {t('tiers.liteTitle')}
                  </h3>
                  <p className="text-xs font-semibold text-[#6D57A5] mt-0.5">
                    {t('tiers.liteSubtitle')}
                  </p>
                  <p className="text-xs text-[#625D6B] mt-1 leading-relaxed">
                    {t('tiers.liteDesc')}
                  </p>
                </div>

                {/* 4 Concise Features */}
                <div className="space-y-2 pt-1">
                  {[
                    t('tiers.liteFeat1'),
                    t('tiers.liteFeat2'),
                    t('tiers.liteFeat3'),
                    t('tiers.liteFeat4'),
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#1F1B2D]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#6D57A5] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Mini Included Pill Strip */}
                <div className="grid grid-cols-3 gap-1.5 p-2 bg-[#FAF8FC] rounded-xl border border-[#E9E4F1] text-[10px] text-center font-mono">
                  <div className="py-1 px-1.5 bg-white rounded border border-[#E9E4F1] truncate">
                    {t('tiers.invoiceStd')}
                  </div>
                  <div className="py-1 px-1.5 bg-white rounded border border-[#E9E4F1] truncate">
                    {t('tiers.posStd')}
                  </div>
                  <div className="py-1 px-1.5 bg-white rounded border border-[#E9E4F1] truncate">
                    {t('tiers.inventoryStd')}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleSelectTier('lite')}
                    fullWidth
                    icon={<ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}
                  >
                    {t('tiers.liteCta')}
                  </Button>
                </div>
              </Card>
            ) : (
              <Card
                variant="default"
                className="bg-white border-2 border-[#17B681]/40 shadow-sm rounded-2xl p-4 sm:p-6 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#E9E4F1]">
                  <div className="flex items-center gap-1.5">
                    <Badge variant="success" size="sm">
                      {t('tiers.proTag')}
                    </Badge>
                    <span className="text-[11px] font-mono text-[#17B681]">{t('tiers.configuredSolution')}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#6D57A5] font-bold bg-[#FAF8FC] px-2 py-0.5 rounded">
                    {t('tiers.bespokeStaging')}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#1F1B2D] font-heading">
                    {t('tiers.proTitle')}
                  </h3>
                  <p className="text-xs font-semibold text-[#17B681] mt-0.5">
                    {t('tiers.proSubtitle')}
                  </p>
                  <p className="text-xs text-[#625D6B] mt-1 leading-relaxed">
                    {t('tiers.proDesc')}
                  </p>
                </div>

                {/* 4 Concise Features */}
                <div className="space-y-2 pt-1">
                  {[
                    t('tiers.proFeat1'),
                    t('tiers.proFeat2'),
                    t('tiers.proFeat3'),
                    t('tiers.proFeat4'),
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#1F1B2D]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Mini Included Pill Strip */}
                <div className="grid grid-cols-3 gap-1.5 p-2 bg-[#FAF8FC] rounded-xl border border-[#E9E4F1] text-[10px] text-center font-mono">
                  <div className="py-1 px-1.5 bg-white rounded border border-[#E9E4F1] truncate">
                    {t('tiers.customOps')}
                  </div>
                  <div className="py-1 px-1.5 bg-white rounded border border-[#E9E4F1] truncate">
                    {t('tiers.brandedDocs')}
                  </div>
                  <div className="py-1 px-1.5 bg-white rounded border border-[#E9E4F1] truncate">
                    {t('tiers.multiBranchStock')}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleSelectTier('pro')}
                    fullWidth
                    icon={<ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}
                  >
                    {t('tiers.proCta')}
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Optional Comparison Drawer Link on Mobile */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setMobileTab(mobileTab === 'compare' ? 'lite' : 'compare')}
              className="text-xs font-mono text-[#6D57A5] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{mobileTab === 'compare' ? 'Close Comparison' : 'Compare Detailed Specifications'}</span>
            </button>
          </div>

          {/* Mobile Comparison Table when toggled */}
          {mobileTab === 'compare' && (
            <div className="p-3.5 rounded-2xl bg-white border border-[#E9E4F1] space-y-2.5 shadow-xs">
              <span className="text-xs font-bold text-[#1F1B2D] block font-heading text-center">
                {t('tiers.compareTitle')}
              </span>
              <div className="space-y-2">
                {COMPARISON_DIMENSIONS.map((dim) => (
                  <div key={dim.id} className="p-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-1 text-xs">
                    <span className="font-bold text-[#1F1B2D] block text-[11px]">{t(dim.titleKey as any)}</span>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <span className="text-[#6D57A5] font-bold block">Lite:</span>
                        <span className="text-[#625D6B]">{t(dim.liteKey as any)}</span>
                      </div>
                      <div>
                        <span className="text-[#17B681] font-bold block">Pro:</span>
                        <span className="text-[#1F1B2D]">{t(dim.proKey as any)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

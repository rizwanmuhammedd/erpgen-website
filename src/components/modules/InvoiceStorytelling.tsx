import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Users,
  FileCode,
  Coins,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const InvoiceStorytelling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const titleLineRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const capsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      // 1. Heading masked reveal
      if (titleLineRef.current) {
        tl.fromTo(
          titleLineRef.current,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }
        );
      }

      // 2. Description fades upward
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          '-=0.45'
        );
      }

      // 3. Product visual slides and scales in
      if (visualRef.current) {
        tl.fromTo(
          visualRef.current,
          { opacity: 0, y: 24, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out' },
          '-=0.4'
        );
      }

      // 4. Capability items stagger in
      if (capsRef.current) {
        tl.fromTo(
          capsRef.current.children,
          { opacity: 0, x: isRtl ? 14 : -14 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: 'power2.out',
          },
          '-=0.5'
        );
      }

      // 5. CTA settles
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 12, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.2)' },
          '-=0.3'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isRtl]);

  const capabilities = [
    { title: t('invoiceStory.cap1'), icon: FileText },
    { title: t('invoiceStory.cap2'), icon: Users },
    { title: t('invoiceStory.cap3'), icon: FileCode },
    { title: t('invoiceStory.cap4'), icon: Coins },
  ];

  return (
    <div
      ref={containerRef}
      className="w-full py-8 lg:py-14 select-none relative"
      aria-label="ERPGen Invoice Product Experience"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Product Narrative & 4 Clean Capabilities */}
        <div ref={narrativeRef} className="lg:col-span-5 space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8FC] border border-[#E9E4F1] text-xs font-mono text-[#6D57A5] font-bold">
            <FileText className="w-3.5 h-3.5 text-[#17B681]" />
            <span>{t('invoiceStory.badge')}</span>
          </div>

          {/* Heading with Masked Reveal */}
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F1B2D] font-heading leading-tight">
              <span className="block overflow-hidden py-0.5">
                <span ref={titleLineRef} className="inline-block will-change-transform">
                  {t('invoiceStory.headline')}
                </span>
              </span>
            </h3>

            {/* Short Description */}
            <p ref={descRef} className="text-sm sm:text-base text-[#625D6B] leading-relaxed">
              {t('invoiceStory.desc')}
            </p>
          </div>

          {/* 4 Clean High-Level Capabilities */}
          <div ref={capsRef} className="space-y-3 pt-2">
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-xs sm:text-sm text-[#1F1B2D]"
              >
                <div className="w-7 h-7 rounded-lg bg-white border border-[#E9E4F1] text-[#17B681] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#17B681]" />
                </div>
                <span className="font-semibold">{cap.title}</span>
              </div>
            ))}
          </div>

          {/* Action CTA */}
          <div ref={ctaRef} className="pt-2 flex flex-wrap items-center gap-3">
            <Link to="/products/invoice">
              <Button
                variant="primary"
                size="md"
                icon={<ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}
              >
                {t('invoiceStory.exploreCta')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Clean, Elegant ERPGen Invoice Product Visual */}
        <div ref={visualRef} className="lg:col-span-7">
          <div className="rounded-3xl bg-white border border-[#E9E4F1] shadow-xl shadow-[#6D57A5]/5 overflow-hidden">
            {/* Window Titlebar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#FAF8FC] border-b border-[#E9E4F1] text-xs">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/40 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#17B681]/40 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/20 inline-block" />
                </div>
                <span className="font-mono text-[11px] text-[#625D6B] ms-2">
                  erpgen.invoice / workspace / billing-core
                </span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
                <span>{t('invoiceStory.workspaceReady')}</span>
              </span>
            </div>

            {/* Product Workspace Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Product Header Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E9E4F1] gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold">
                    <FileText className="w-6 h-6 text-[#6D57A5]" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-extrabold text-[#1F1B2D] font-heading">
                      ERPGen Invoice
                    </h4>
                    <p className="text-xs text-[#625D6B]">
                      {t('invoiceStory.workspaceTag')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-[#6D57A5] bg-[#FAF8FC] px-3 py-1 rounded-lg border border-[#E9E4F1]">
                    {t('invoiceStory.standardReadyPill')}
                  </span>
                </div>
              </div>

              {/* 4 Core Functional Capability Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1. Invoice & Billing */}
                <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-1.5 hover:border-[#6D57A5]/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[#6D57A5]" />
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#17B681]" />
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-[#1F1B2D]">
                    {t('invoiceStory.cap1')}
                  </h5>
                  <p className="text-xs text-[#625D6B] leading-relaxed">
                    {t('invoiceStory.cap1Desc')}
                  </p>
                </div>

                {/* 2. Customer Management */}
                <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-1.5 hover:border-[#6D57A5]/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#6D57A5]" />
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#17B681]" />
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-[#1F1B2D]">
                    {t('invoiceStory.cap2')}
                  </h5>
                  <p className="text-xs text-[#625D6B] leading-relaxed">
                    {t('invoiceStory.cap2Desc')}
                  </p>
                </div>

                {/* 3. PDF / Document Templates */}
                <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-1.5 hover:border-[#6D57A5]/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center">
                      <FileCode className="w-4 h-4 text-[#6D57A5]" />
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#17B681]" />
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-[#1F1B2D]">
                    {t('invoiceStory.cap3')}
                  </h5>
                  <p className="text-xs text-[#625D6B] leading-relaxed">
                    {t('invoiceStory.cap3Desc')}
                  </p>
                </div>

                {/* 4. Payment / Sales Records */}
                <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-1.5 hover:border-[#17B681]/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#E9E4F1] text-[#17B681] flex items-center justify-center">
                      <Coins className="w-4 h-4 text-[#17B681]" />
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#17B681]" />
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-[#1F1B2D]">
                    {t('invoiceStory.cap4')}
                  </h5>
                  <p className="text-xs text-[#625D6B] leading-relaxed">
                    {t('invoiceStory.cap4Desc')}
                  </p>
                </div>
              </div>

              {/* Status and Ledger Continuity Strip */}
              <div className="pt-4 border-t border-[#E9E4F1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#129267] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#17B681]" />
                  <span>{t('invoiceStory.ledgerPill')}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono text-[#625D6B]">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#6D57A5]" />
                    <span>{t('invoiceStory.auditPill')}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#6D57A5]">
                    <Sparkles className="w-3.5 h-3.5 text-[#17B681]" />
                    <span>ERPGen Platform</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

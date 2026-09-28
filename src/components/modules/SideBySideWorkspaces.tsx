import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShoppingBag, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const SideBySideWorkspaces: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreNodeRef = useRef<HTMLDivElement>(null);
  const branchSvgRef = useRef<SVGSVGElement>(null);
  const invoiceCardRef = useRef<HTMLDivElement>(null);
  const posCardRef = useRef<HTMLDivElement>(null);
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: 0.5,
        },
      });

      // 1. Core ERP node settles down
      tl.fromTo(
        coreNodeRef.current,
        { y: -20, opacity: 0.4, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      );

      // 2. Branch SVG paths expand downward
      if (branchSvgRef.current) {
        tl.fromTo(
          branchSvgRef.current,
          { opacity: 0.2, scaleY: 0.8 },
          { opacity: 1, scaleY: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        );
      }

      // 3. Invoice & POS cards expand outward with spatial depth
      const lateralShift = isRtl ? -25 : 25;

      tl.fromTo(
        invoiceCardRef.current,
        { x: -lateralShift, y: 15, opacity: 0.4, scale: 0.97 },
        { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.3'
      );

      tl.fromTo(
        posCardRef.current,
        { x: lateralShift, y: 15, opacity: 0.4, scale: 0.97 },
        { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.7'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <div
      ref={containerRef}
      className="w-full py-12 lg:py-16 select-none relative"
      aria-label="ERPGen Architecture Tree: Invoice and POS Workspaces"
    >
      <div className="space-y-10">
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold block">
            {t('sideBySide.eyebrow')}
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F1B2D] font-heading">
            {t('sideBySide.title')}{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6D57A5] to-[#17B681]">
              {t('sideBySide.titleGradient')}
            </span>
          </h3>
          <p className="text-sm text-[#625D6B] max-w-2xl mx-auto leading-relaxed">
            {t('sideBySide.description')}
          </p>
        </div>

        {/* Tree Root: Core ERP Engine */}
        <div className="flex flex-col items-center">
          <div
            ref={coreNodeRef}
            className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#6D57A5]/40 shadow-md text-center max-w-md w-full relative z-10"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] mx-auto flex items-center justify-center font-bold mb-2 shadow-2xs">
              <Layers className="w-5 h-5 text-[#6D57A5]" />
            </div>
            <span className="text-[10px] font-mono text-[#6D57A5] font-bold uppercase tracking-wider block">
              {t('sideBySide.sharedEngine')}
            </span>
            <h4 className="text-base font-extrabold text-[#1F1B2D] font-heading mt-0.5">
              ERPGen Foundation Architecture
            </h4>
            <p className="text-[11px] text-[#625D6B] mt-1">
              {t('sideBySide.sharedEngineDesc')}
            </p>
          </div>

          {/* SVG Branching Lines (Desktop & Tablet) */}
          <div className="w-full max-w-2xl h-12 relative -my-1 pointer-events-none hidden sm:block">
            <svg
              ref={branchSvgRef}
              viewBox="0 0 600 60"
              className="w-full h-full overflow-visible"
              fill="none"
            >
              {/* Stem down from center */}
              <line x1="300" y1="0" x2="300" y2="30" stroke="#6D57A5" strokeWidth="2" />
              {/* Split left to Invoice */}
              <path
                d="M 300 30 Q 300 50 150 50 L 150 60"
                stroke="#6D57A5"
                strokeWidth="2"
                fill="none"
              />
              {/* Split right to POS */}
              <path
                d="M 300 30 Q 300 50 450 50 L 450 60"
                stroke="#17B681"
                strokeWidth="2"
                fill="none"
              />
              {/* Central connection dot */}
              <circle cx="300" cy="30" r="3.5" fill="#6D57A5" />
            </svg>
          </div>

          {/* Mobile Vertical Branch Connector Line */}
          <div className="sm:hidden flex flex-col items-center py-2">
            <div className="w-0.5 h-8 bg-gradient-to-b from-[#6D57A5] to-[#17B681] rounded-full animate-pulse" />
          </div>
        </div>

        {/* 2 Branches: Invoice Workspace & POS Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Branch 1: ERPGen Invoice Card */}
          <div
            ref={invoiceCardRef}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#6D57A5]/30 shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-[#6D57A5] transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold shadow-2xs group-hover:scale-105 transition-transform">
                  <FileText className="w-6 h-6 text-[#6D57A5]" />
                </div>
                <Badge variant="brand" size="sm" className="text-[10px] font-mono font-bold">
                  {t('sideBySide.invoiceCardBadge')}
                </Badge>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#6D57A5] font-bold uppercase tracking-wider block">
                  {t('sideBySide.invoiceCardSubtitle')}
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold text-[#1F1B2D] font-heading mt-1">
                  {t('sideBySide.invoiceCardTitle')}
                </h4>
                <p className="text-xs sm:text-sm text-[#625D6B] leading-relaxed mt-2">
                  {t('sideBySide.invoiceCardDesc')}
                </p>
              </div>

              {/* Concrete Capabilities */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#1F1B2D]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                  <span>{t('sideBySide.invCap1')}</span>
                </div>
                <div className="flex items-center gap-2 text-[#1F1B2D]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                  <span>{t('sideBySide.invCap2')}</span>
                </div>
                <div className="flex items-center gap-2 text-[#1F1B2D]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                  <span>{t('sideBySide.invCap3')}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E9E4F1]">
              <Link to="/products/invoice">
                <Button
                  variant="primary"
                  size="sm"
                  icon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
                  className="w-full sm:w-auto shadow-xs"
                >
                  {t('invoiceStory.exploreCta')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Branch 2: ERPGen POS Card */}
          <div
            ref={posCardRef}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#17B681]/40 shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-[#17B681] transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#17B681] flex items-center justify-center font-bold shadow-2xs group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-6 h-6 text-[#17B681]" />
                </div>
                <Badge variant="brand" size="sm" className="text-[10px] font-mono font-bold bg-[#E4F8F0] text-[#129267] border-[#17B681]/30">
                  {t('sideBySide.posCardBadge')}
                </Badge>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#17B681] font-bold uppercase tracking-wider block">
                  {t('sideBySide.posCardSubtitle')}
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold text-[#1F1B2D] font-heading mt-1">
                  {t('sideBySide.posCardTitle')}
                </h4>
                <p className="text-xs sm:text-sm text-[#625D6B] leading-relaxed mt-2">
                  {t('sideBySide.posCardDesc')}
                </p>
              </div>

              {/* Concrete Capabilities */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#1F1B2D]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                  <span>{t('sideBySide.posCap1')}</span>
                </div>
                <div className="flex items-center gap-2 text-[#1F1B2D]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                  <span>{t('sideBySide.posCap2')}</span>
                </div>
                <div className="flex items-center gap-2 text-[#1F1B2D]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                  <span>{t('sideBySide.posCap3')}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E9E4F1]">
              <Link to="/products/pos">
                <Button
                  variant="primary"
                  size="sm"
                  icon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
                  className="w-full sm:w-auto shadow-xs bg-[#17B681] hover:bg-[#149d6f]"
                >
                  {t('posStory.exploreCta')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

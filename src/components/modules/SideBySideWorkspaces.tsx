import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const SideBySideWorkspaces: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isRtl]);

  const invoiceCaps = [
    t('sideBySide.invCap1'),
    t('sideBySide.invCap2'),
    t('sideBySide.invCap3'),
  ];

  const posCaps = [
    t('sideBySide.posCap1'),
    t('sideBySide.posCap2'),
    t('sideBySide.posCap3'),
  ];

  return (
    <div
      ref={containerRef}
      className="w-full py-8 lg:py-12 select-none relative"
      aria-label="ERPGen Invoice and POS Workspaces Comparison"
    >
      <div className="space-y-8">
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
          <p className="text-xs sm:text-sm text-[#625D6B] max-w-2xl mx-auto leading-relaxed">
            {t('sideBySide.description')}
          </p>
        </div>

        {/* Side-by-Side Cards (Invoice vs POS) */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {/* Card 1: ERPGen Invoice */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E9E4F1] hover:border-[#6D57A5]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#6D57A5] bg-[#FAF8FC] px-2.5 py-1 rounded-full border border-[#E9E4F1] uppercase">
                  {t('sideBySide.invoiceCardBadge')}
                </span>
              </div>

              <div>
                <h4 className="text-xl font-bold text-[#1F1B2D] font-heading">
                  {t('sideBySide.invoiceCardTitle')}
                </h4>
                <p className="text-xs font-mono text-[#6D57A5] mt-0.5">
                  {t('sideBySide.invoiceCardSubtitle')}
                </p>
                <p className="text-xs sm:text-sm text-[#625D6B] mt-2 leading-relaxed">
                  {t('sideBySide.invoiceCardDesc')}
                </p>
              </div>

              {/* Capabilities */}
              <div className="space-y-2 pt-2 border-t border-[#E9E4F1]">
                {invoiceCaps.map((cap, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Link to="/products/invoice">
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  icon={<ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}
                >
                  {t('invoiceStory.exploreCta')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 2: ERPGen POS */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E9E4F1] hover:border-[#17B681]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#E4F8F0] border border-[#17B681]/30 text-[#129267] flex items-center justify-center font-bold">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#129267] bg-[#E4F8F0] px-2.5 py-1 rounded-full border border-[#17B681]/30 uppercase">
                  {t('sideBySide.posCardBadge')}
                </span>
              </div>

              <div>
                <h4 className="text-xl font-bold text-[#1F1B2D] font-heading">
                  {t('sideBySide.posCardTitle')}
                </h4>
                <p className="text-xs font-mono text-[#17B681] mt-0.5">
                  {t('sideBySide.posCardSubtitle')}
                </p>
                <p className="text-xs sm:text-sm text-[#625D6B] mt-2 leading-relaxed">
                  {t('sideBySide.posCardDesc')}
                </p>
              </div>

              {/* Capabilities */}
              <div className="space-y-2 pt-2 border-t border-[#E9E4F1]">
                {posCaps.map((cap, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Link to="/products/pos">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={<ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}
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

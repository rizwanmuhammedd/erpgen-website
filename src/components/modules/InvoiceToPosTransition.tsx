import React, { useEffect, useRef } from 'react';
import { FileText, ShoppingBag, Layers } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const InvoiceToPosTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pulseDotRef = useRef<SVGCircleElement>(null);
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Single smooth visual signal: Invoice -> ERP Core -> POS
      if (pulseDotRef.current) {
        gsap.fromTo(
          pulseDotRef.current,
          { attr: { cx: isRtl ? 540 : 60 }, opacity: 0.4 },
          {
            attr: { cx: isRtl ? 60 : 540 },
            opacity: 1,
            repeat: -1,
            duration: 2.8,
            ease: 'power1.inOut',
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 select-none relative"
      aria-label="Invoice to POS Operational Transition"
    >
      {/* Heading & Short Copy */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5]">
          <Layers className="w-3.5 h-3.5 text-[#17B681]" />
          <span>{t('invoiceToPos.badge')}</span>
        </div>
        <h4 className="text-xl sm:text-2xl font-extrabold text-[#1F1B2D] font-heading">
          One ERP foundation for billing and operations.
        </h4>
        <p className="text-xs sm:text-sm text-[#625D6B] max-w-xl mx-auto">
          {t('invoiceToPos.desc')}
        </p>
      </div>

      {/* Clean 3-Stage Relationship: INVOICE -> ERP CORE -> POS */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 items-center z-10">
        {/* Stage 1: INVOICE */}
        <div className="p-5 rounded-2xl bg-white border border-[#E9E4F1] shadow-2xs space-y-2.5 text-center sm:text-start">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-[#6D57A5] font-bold bg-[#FAF8FC] px-2 py-0.5 rounded border border-[#E9E4F1]">
              INVOICE
            </span>
          </div>
          <div>
            <h5 className="text-sm font-bold text-[#1F1B2D]">
              {t('invoiceToPos.stepInvoice')}
            </h5>
            <p className="text-xs text-[#625D6B] mt-0.5">
              {t('invoiceToPos.descInvoice')}
            </p>
          </div>
        </div>

        {/* Mobile Vertical Connector Line 1 -> 2 */}
        <div className="md:hidden flex justify-center -my-1">
          <div className="w-0.5 h-5 bg-linear-to-b from-[#6D57A5] to-[#17B681] rounded-full animate-pulse" />
        </div>

        {/* Stage 2: ERP CORE */}
        <div className="p-5 rounded-2xl bg-[#FAF8FC] border-2 border-[#17B681] shadow-sm space-y-2.5 text-center sm:text-start relative">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#E9E4F1] text-[#17B681] flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-white bg-[#17B681] font-bold px-2 py-0.5 rounded">
              ERP CORE
            </span>
          </div>
          <div>
            <h5 className="text-sm font-bold text-[#1F1B2D]">
              {t('invoiceToPos.stepLedger')}
            </h5>
            <p className="text-xs text-[#625D6B] mt-0.5">
              {t('invoiceToPos.descEngine')}
            </p>
          </div>
        </div>

        {/* Mobile Vertical Connector Line 2 -> 3 */}
        <div className="md:hidden flex justify-center -my-1">
          <div className="w-0.5 h-5 bg-linear-to-b from-[#17B681] to-[#6D57A5] rounded-full animate-pulse" />
        </div>

        {/* Stage 3: POS */}
        <div className="p-5 rounded-2xl bg-white border border-[#E9E4F1] shadow-2xs space-y-2.5 text-center sm:text-start">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#17B681] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-[#129267] font-bold bg-[#E4F8F0] px-2 py-0.5 rounded border border-[#17B681]/30">
              POS
            </span>
          </div>
          <div>
            <h5 className="text-sm font-bold text-[#1F1B2D]">
              {t('invoiceToPos.stepPos')}
            </h5>
            <p className="text-xs text-[#625D6B] mt-0.5">
              {t('invoiceToPos.descPos')}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Single Connecting Line with Traveling Signal */}
      <div className="hidden md:block absolute top-[64%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl pointer-events-none z-0">
        <svg viewBox="0 0 600 30" className="w-full h-8 overflow-visible" fill="none">
          <line
            x1="50"
            y1="15"
            x2="550"
            y2="15"
            stroke="#6D57A5"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="opacity-30"
          />
          <circle ref={pulseDotRef} cx="300" cy="15" r="3.5" fill="#17B681" />
        </svg>
      </div>
    </div>
  );
};

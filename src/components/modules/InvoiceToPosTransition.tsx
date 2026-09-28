import React, { useEffect, useRef } from 'react';
import { FileText, ShoppingBag, Layers, CheckCircle2, ArrowRightLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const InvoiceToPosTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pulseNodeRef = useRef<SVGCircleElement>(null);
  const cardInvoiceRef = useRef<HTMLDivElement>(null);
  const cardHubRef = useRef<HTMLDivElement>(null);
  const cardPosRef = useRef<HTMLDivElement>(null);
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 0.5,
        },
      });

      // 1. Invoice transaction node activates
      tl.fromTo(
        cardInvoiceRef.current,
        { scale: 0.95, opacity: 0.5, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      // 2. Data signal pulse travels down the conduit into central hub
      if (pulseNodeRef.current) {
        tl.fromTo(
          pulseNodeRef.current,
          { attr: { cy: 15 }, opacity: 0.3 },
          { attr: { cy: 90 }, opacity: 1, duration: 0.8, ease: 'none' },
          '-=0.3'
        );
      }

      // 3. Central ERP hub synchronizes
      tl.fromTo(
        cardHubRef.current,
        { scale: 0.95, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

      // 4. Signal continues down into POS counter terminal
      if (pulseNodeRef.current) {
        tl.to(
          pulseNodeRef.current,
          { attr: { cy: 165 }, opacity: 1, duration: 0.8, ease: 'none' },
          '-=0.2'
        );
      }

      // 5. POS counter workspace activates
      tl.fromTo(
        cardPosRef.current,
        { scale: 0.95, opacity: 0.5, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-4xl mx-auto py-12 px-4 select-none relative"
      aria-label="Invoice to POS Operational Transition Conduit"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#6D57A5]/5 blur-[90px] rounded-full pointer-events-none" />

      {/* Heading / Transition Intent */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5]">
          <ArrowRightLeft className="w-3.5 h-3.5 text-[#17B681]" />
          <span>{t('invoiceToPos.badge')}</span>
        </div>
        <h4 className="text-xl sm:text-2xl font-extrabold text-[#1F1B2D] font-heading">
          {t('invoiceToPos.title')}
        </h4>
        <p className="text-xs sm:text-sm text-[#625D6B] max-w-xl mx-auto">
          {t('invoiceToPos.desc')}
        </p>
      </div>

      {/* 3-Stage Visual Pipeline */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Stage 1: Invoice Issued */}
        <div
          ref={cardInvoiceRef}
          className="p-4 rounded-2xl bg-white border border-[#6D57A5]/30 shadow-xs space-y-2 transition-all hover:border-[#6D57A5]"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-[#6D57A5] font-semibold bg-[#FAF8FC] px-2 py-0.5 rounded border border-[#E9E4F1]">
              #INV-2026-104
            </span>
          </div>
          <div>
            <h5 className="text-xs font-bold text-[#1F1B2D]">
              {t('invoiceToPos.stepInvoice')}
            </h5>
            <p className="text-[10px] text-[#625D6B] mt-0.5">
              Commercial deliverable billed & client balance booked.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#129267] font-semibold pt-1 border-t border-[#E9E4F1]">
            <CheckCircle2 className="w-3 h-3 text-[#17B681]" />
            <span>Amount: $2,100.00 Reconciled</span>
          </div>
        </div>

        {/* Mobile Vertical Connector Line 1 -> 2 */}
        <div className="md:hidden flex justify-center -my-1">
          <div className="w-0.5 h-5 bg-gradient-to-b from-[#6D57A5] to-[#17B681] rounded-full animate-pulse" />
        </div>

        {/* Stage 2: Central ERP Sync Hub (The common trunk) */}
        <div
          ref={cardHubRef}
          className="p-4 rounded-2xl bg-[#FAF8FC] border-2 border-[#17B681] shadow-sm space-y-2 relative"
        >
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#17B681] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Live ERP Bus
          </span>
          <div className="flex items-center justify-between pt-1">
            <div className="w-8 h-8 rounded-lg bg-white border border-[#E9E4F1] text-[#17B681] flex items-center justify-center font-bold">
              <Layers className="w-4 h-4 text-[#17B681]" />
            </div>
            <span className="w-2 h-2 rounded-full bg-[#17B681] animate-ping" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-[#1F1B2D]">
              {t('invoiceToPos.stepLedger')}
            </h5>
            <p className="text-[10px] text-[#625D6B] mt-0.5">
              Unified ledger and stock deductions propagate instantly.
            </p>
          </div>
          <div className="text-[10px] font-mono text-[#6D57A5] font-semibold pt-1 border-t border-[#E9E4F1]">
            0 Redundant Entry · 1 Truth
          </div>
        </div>

        {/* Mobile Vertical Connector Line 2 -> 3 */}
        <div className="md:hidden flex justify-center -my-1">
          <div className="w-0.5 h-5 bg-gradient-to-b from-[#17B681] to-[#6D57A5] rounded-full animate-pulse" />
        </div>

        {/* Stage 3: POS Counter Ready */}
        <div
          ref={cardPosRef}
          className="p-4 rounded-2xl bg-white border border-[#17B681]/40 shadow-xs space-y-2 transition-all hover:border-[#17B681]"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#17B681] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-[#129267] font-semibold bg-[#E4F8F0] px-2 py-0.5 rounded border border-[#17B681]/30">
              Terminal 01
            </span>
          </div>
          <div>
            <h5 className="text-xs font-bold text-[#1F1B2D]">
              {t('invoiceToPos.stepPos')}
            </h5>
            <p className="text-[10px] text-[#625D6B] mt-0.5">
              Counter cashier operates with synchronized catalog and inventory.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#17B681] font-semibold pt-1 border-t border-[#E9E4F1]">
            <CheckCircle2 className="w-3 h-3 text-[#17B681]" />
            <span>Multi-Register Synchronized</span>
          </div>
        </div>
      </div>

      {/* SVG Connecting Flow Lines across Desktop */}
      <div className="hidden md:block absolute top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl pointer-events-none -z-10">
        <svg viewBox="0 0 600 40" className="w-full h-8 overflow-visible" fill="none">
          <path
            d="M 50 20 L 550 20"
            stroke="#6D57A5"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="opacity-25"
          />
          <circle cx="300" cy="20" r="3" fill="#17B681" />
        </svg>
      </div>

      {/* Bottom Pulse Banner */}
      <div className="mt-6 p-2 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-center">
        <span className="text-[11px] font-mono text-[#625D6B] flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] inline-block animate-pulse" />
          <span>{t('invoiceToPos.signalText')}</span>
        </span>
      </div>
    </div>
  );
};

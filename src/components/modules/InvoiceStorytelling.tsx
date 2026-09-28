import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Download,
  Check,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { getWhatsAppUrl } from '../../data/siteData';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const InvoiceStorytelling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const narrativeColRef = useRef<HTMLDivElement>(null);
  const documentCardRef = useRef<HTMLDivElement>(null);
  const headerRowRef = useRef<HTMLDivElement>(null);
  const entityRowRef = useRef<HTMLDivElement>(null);
  const lineItem1Ref = useRef<HTMLDivElement>(null);
  const lineItem2Ref = useRef<HTMLDivElement>(null);
  const lineItem3Ref = useRef<HTMLDivElement>(null);
  const totalsBlockRef = useRef<HTMLDivElement>(null);
  const sealStampRef = useRef<HTMLDivElement>(null);

  const [activePhase, setActivePhase] = useState<number>(0);
  const { t, isRtl } = useLanguage();

  const phases = [
    { id: 1, label: t('invoiceStory.phase1') },
    { id: 2, label: t('invoiceStory.phase2') },
    { id: 3, label: t('invoiceStory.phase3') },
    { id: 4, label: t('invoiceStory.phase4') },
  ];

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') {
      // In reduced motion or server context, show complete document
      setActivePhase(3);
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop and tablet scrubbed progressive build
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 0.6,
            onUpdate: (self) => {
              const p = self.progress;
              if (p < 0.25) setActivePhase(0);
              else if (p < 0.5) setActivePhase(1);
              else if (p < 0.75) setActivePhase(2);
              else setActivePhase(3);
            },
          },
        });

        // 1. Document Chassis & Paper Frame enters
        tl.fromTo(
          documentCardRef.current,
          {
            y: 40,
            scale: 0.94,
            opacity: 0.25,
            boxShadow: '0 4px 6px -1px rgba(109, 87, 165, 0.05)',
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            boxShadow: '0 25px 50px -12px rgba(109, 87, 165, 0.15)',
            ease: 'power2.out',
            duration: 1,
          }
        );

        // 2. Invoice Identity & Header establish
        tl.fromTo(
          headerRowRef.current,
          {
            y: 18,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 0.8,
          },
          '-=0.4'
        );

        // 3. Customer & Billing Entity information appears
        tl.fromTo(
          entityRowRef.current,
          {
            y: 16,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 0.8,
          },
          '-=0.3'
        );

        // 4. Line items populate progressively
        const xOffset = isRtl ? -20 : 20;

        tl.fromTo(
          lineItem1Ref.current,
          { x: xOffset, opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out', duration: 0.6 },
          '-=0.2'
        );

        tl.fromTo(
          lineItem2Ref.current,
          { x: xOffset, opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out', duration: 0.6 },
          '-=0.1'
        );

        tl.fromTo(
          lineItem3Ref.current,
          { x: xOffset, opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out', duration: 0.6 },
          '+=0.05'
        );

        // 5. Totals / Reconciliation area resolves
        tl.fromTo(
          totalsBlockRef.current,
          {
            y: 18,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 0.8,
          },
          '-=0.1'
        );

        // 6. Seal stamp & export confirmation complete
        tl.fromTo(
          sealStampRef.current,
          {
            scale: 0.85,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            ease: 'back.out(1.5)',
            duration: 0.8,
          },
          '-=0.2'
        );
      });

      // Mobile simplified scroll animation (avoids complex pinning, ensures no overflow)
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(
          documentCardRef.current,
          { y: 24, opacity: 0.3 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
        setActivePhase(3);
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <div
      ref={containerRef}
      className="w-full relative py-6 select-none"
      aria-label="ERPGen Invoice Controlled Document Story"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Narrative Column (5 cols) */}
        <div ref={narrativeColRef} className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] shadow-xs">
            <FileText className="w-3.5 h-3.5 text-[#6D57A5]" />
            <span>{t('invoiceStory.badge')}</span>
          </div>

          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#17B681] font-bold block">
              {t('invoiceStory.eyebrow')}
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F1B2D] font-heading leading-tight">
              {t('invoiceStory.headline')}
            </h3>
            <p className="text-sm text-[#625D6B] leading-relaxed">
              {t('invoiceStory.desc')}
            </p>
          </div>

          {/* Progressive Phase Tracker */}
          <div className="space-y-2.5 pt-3 border-t border-[#E9E4F1]">
            {phases.map((p, idx) => {
              const isPast = activePhase > idx;
              const isCurrent = activePhase === idx;
              return (
                <div
                  key={p.id}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs transition-all duration-300 ${
                    isCurrent
                      ? 'bg-white border-[#6D57A5] shadow-xs text-[#1F1B2D] font-bold translate-x-1 rtl:-translate-x-1'
                      : isPast
                      ? 'bg-[#FAF8FC] border-[#E9E4F1] text-[#129267]'
                      : 'bg-transparent border-transparent text-[#625D6B]/70'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-mono transition-all ${
                      isPast
                        ? 'bg-[#E4F8F0] text-[#129267] font-bold'
                        : isCurrent
                        ? 'bg-[#6D57A5] text-white font-bold'
                        : 'bg-[#FAF8FC] border border-[#E9E4F1] text-[#625D6B]'
                    }`}
                  >
                    {isPast ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                  </div>
                  <span className="truncate">{p.label}</span>
                </div>
              );
            })}
          </div>

          {/* Exploration Call to Action */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link to="/products/invoice">
              <Button
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
                className="shadow-xs"
              >
                {t('invoiceStory.exploreCta')}
              </Button>
            </Link>
            <a
              href={getWhatsAppUrl("Hello ERPGen team, I would like to explore ERPGen Invoice.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#625D6B] hover:text-[#6D57A5] font-semibold underline underline-offset-4 transition-colors"
            >
              WhatsApp Consultation
            </a>
          </div>
        </div>

        {/* Right Progressive Document Assembly Stage (7 cols) */}
        <div className="lg:col-span-7">
          <div
            ref={documentCardRef}
            className="w-full bg-white rounded-2xl sm:rounded-3xl border border-[#E9E4F1] p-3.5 sm:p-7 lg:p-8 space-y-4 sm:space-y-5 relative overflow-hidden transition-all"
          >
            {/* Top Brand Accent Ribbon */}
            <div className="h-1.5 w-full bg-linear-to-r from-[#6D57A5] via-[#9079C7] to-[#17B681] rounded-full" />

            {/* Document Header & Identity (Step 2) */}
            <div
              ref={headerRowRef}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#E9E4F1] gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6D57A5]/10 text-[#6D57A5] flex items-center justify-center font-bold shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-extrabold text-[#1F1B2D] font-heading">
                      Tax Invoice
                    </h4>
                    <span className="font-mono text-xs text-[#6D57A5] font-semibold bg-[#FAF8FC] px-2 py-0.5 rounded border border-[#E9E4F1]">
                      #INV-2026-104
                    </span>
                  </div>
                  <span className="text-[11px] text-[#625D6B] block">
                    {t('invoiceStory.issuedBy')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#17B681] animate-pulse" />
                <Badge variant="brand" size="sm" className="text-[10px] font-mono font-bold">
                  {t('simulator.docVerified')}
                </Badge>
              </div>
            </div>

            {/* Customer & Billing Entity Info (Step 3) */}
            <div
              ref={entityRowRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs"
            >
              <div className="p-3.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-1">
                <span className="text-[10px] font-mono text-[#6D57A5] uppercase font-bold block">
                  Billed To
                </span>
                <p className="font-bold text-[#1F1B2D]">Enterprise Client Account</p>
                <p className="text-[11px] text-[#625D6B]">Payment Terms: Net 30 Days</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-1">
                <span className="text-[10px] font-mono text-[#17B681] uppercase font-bold block">
                  Tax Compliance
                </span>
                <p className="font-bold text-[#1F1B2D]">TRN: 100482910400003</p>
                <p className="text-[11px] text-[#129267] font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Standard VAT 5% Schedule</span>
                </p>
              </div>
            </div>

            {/* Progressive Line Items (Step 4) */}
            <div className="space-y-2">
              <div className="grid grid-cols-12 text-[10px] font-mono font-bold text-[#625D6B] uppercase pb-1.5 border-b border-[#E9E4F1] px-2">
                <span className="col-span-6 sm:col-span-8">Configured Deliverable</span>
                <span className="col-span-2 text-center">Qty</span>
                <span className="col-span-4 sm:col-span-2 text-end">Amount</span>
              </div>

              {/* Row 1 */}
              <div
                ref={lineItem1Ref}
                className="grid grid-cols-12 items-center py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-xs transition-all hover:border-[#6D57A5]/40"
              >
                <div className="col-span-6 sm:col-span-8">
                  <p className="font-bold text-[#1F1B2D] text-[11px] sm:text-xs">{t('invoiceStory.item1')}</p>
                  <p className="text-[9px] sm:text-[10px] text-[#625D6B]">Central ledger & operational schema</p>
                </div>
                <span className="col-span-2 text-center font-mono text-[#625D6B]">1</span>
                <span className="col-span-4 sm:col-span-2 text-end font-mono font-bold text-[#1F1B2D] text-xs">
                  $1,200.00
                </span>
              </div>

              {/* Row 2 */}
              <div
                ref={lineItem2Ref}
                className="grid grid-cols-12 items-center py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-xs transition-all hover:border-[#6D57A5]/40"
              >
                <div className="col-span-6 sm:col-span-8">
                  <p className="font-bold text-[#1F1B2D] text-[11px] sm:text-xs">{t('invoiceStory.item2')}</p>
                  <p className="text-[9px] sm:text-[10px] text-[#625D6B]">Counter terminals connected to core</p>
                </div>
                <span className="col-span-2 text-center font-mono text-[#625D6B]">3</span>
                <span className="col-span-4 sm:col-span-2 text-end font-mono font-bold text-[#1F1B2D] text-xs">
                  $450.00
                </span>
              </div>

              {/* Row 3 */}
              <div
                ref={lineItem3Ref}
                className="grid grid-cols-12 items-center py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-xs transition-all hover:border-[#6D57A5]/40"
              >
                <div className="col-span-6 sm:col-span-8">
                  <p className="font-bold text-[#1F1B2D] text-[11px] sm:text-xs">{t('invoiceStory.item3')}</p>
                  <p className="text-[9px] sm:text-[10px] text-[#625D6B]">Continuous replication & automated snapshots</p>
                </div>
                <span className="col-span-2 text-center font-mono text-[#625D6B]">1</span>
                <span className="col-span-4 sm:col-span-2 text-end font-mono font-bold text-[#1F1B2D] text-xs">
                  $350.00
                </span>
              </div>
            </div>

            {/* Totals & Financial Reconciliation (Step 5) */}
            <div
              ref={totalsBlockRef}
              className="pt-3 border-t border-[#E9E4F1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#E4F8F0] border border-[#17B681]/30 text-[#129267]">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#17B681]" />
                <span className="font-semibold text-[11px]">{t('invoiceStory.ledgerSync')}</span>
              </div>

              <div className="w-full sm:w-56 space-y-1.5 text-xs text-[#625D6B]">
                <div className="flex justify-between">
                  <span>{t('invoiceStory.subtotalLabel')}</span>
                  <span className="font-mono font-semibold text-[#1F1B2D]">
                    {t('invoiceStory.subtotalVal')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t('invoiceStory.vatLabel')}</span>
                  <span className="font-mono font-semibold text-[#1F1B2D]">
                    {t('invoiceStory.vatVal')}
                  </span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-[#E9E4F1] text-sm font-bold text-[#1F1B2D]">
                  <span className="text-[#6D57A5]">{t('invoiceStory.grandTotalLabel')}</span>
                  <span className="font-mono text-[#17B681] text-base">
                    {t('invoiceStory.grandTotalVal')}
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Seal & Status Footer (Step 6) */}
            <div
              ref={sealStampRef}
              className="pt-2 border-t border-[#E9E4F1] flex items-center justify-between text-xs text-[#625D6B]"
            >
              <span className="flex items-center gap-1.5 text-[#129267] font-semibold text-[11px]">
                <ShieldCheck className="w-4 h-4 text-[#17B681]" />
                <span>{t('invoiceStory.docVerified')}</span>
              </span>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[10px] font-mono font-bold text-[#6D57A5] flex items-center gap-1">
                  <Download className="w-3 h-3 text-[#6D57A5]" />
                  <span>{t('invoiceStory.instantPdf')}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

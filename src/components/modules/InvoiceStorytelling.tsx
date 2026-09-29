import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Download,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const InvoiceStorytelling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (narrativeRef.current) {
        gsap.fromTo(
          narrativeRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: narrativeRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (mockupRef.current) {
        gsap.fromTo(
          mockupRef.current,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: mockupRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isRtl]);

  const capabilities = [
    t('sideBySide.invCap1'),
    t('invoiceStory.taxCalculation'),
    t('sideBySide.invCap3'),
    t('invoiceStory.ledgerSync'),
  ];

  return (
    <div
      ref={containerRef}
      className="w-full py-8 lg:py-12 select-none relative"
      aria-label="ERPGen Invoice Product Experience"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Product Narrative & Capabilities */}
        <div ref={narrativeRef} className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8FC] border border-[#E9E4F1] text-xs font-mono text-[#6D57A5] font-bold">
            <FileText className="w-3.5 h-3.5 text-[#17B681]" />
            <span>ERPGen Invoice</span>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading leading-tight">
              {t('invoiceStory.headline')}
            </h3>
            <p className="text-sm text-[#625D6B] leading-relaxed">
              {t('invoiceStory.desc')}
            </p>
          </div>

          {/* 4 Clean Capabilities */}
          <div className="space-y-2.5 pt-2">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-[#1F1B2D]">
                <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                <span className="font-medium">{cap}</span>
              </div>
            ))}
          </div>

          {/* Action Links */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
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

        {/* Right Column: Clean Premium Invoice UI Mockup */}
        <div ref={mockupRef} className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E9E4F1] shadow-lg shadow-[#6D57A5]/5 space-y-5">
            {/* Header: Document Type, Preview Badge & Issued By */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E9E4F1] gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-extrabold text-[#1F1B2D] font-heading">
                    {t('invoiceStory.taxInvoice')}
                  </h4>
                  <span className="font-mono text-xs text-[#6D57A5] font-semibold bg-[#FAF8FC] px-2 py-0.5 rounded border border-[#E9E4F1]">
                    {t('invoiceStory.invoicePreview')}
                  </span>
                </div>
                <p className="text-xs text-[#625D6B]">
                  {t('invoiceStory.issuedBy')}
                </p>
              </div>
              <Badge variant="brand" size="sm" className="self-start sm:self-center font-mono text-[10px]">
                {t('simulator.docVerified')}
              </Badge>
            </div>

            {/* Customer & Tax Configuration Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-1">
                <span className="text-[10px] font-mono text-[#6D57A5] uppercase font-bold block">
                  {t('invoiceStory.customerLabel')}
                </span>
                <p className="font-bold text-[#1F1B2D]">{t('invoiceStory.customerDetails')}</p>
                <p className="text-[11px] text-[#625D6B]">{t('invoiceStory.customerTerms')}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-1">
                <span className="text-[10px] font-mono text-[#17B681] uppercase font-bold block">
                  {t('invoiceStory.taxDetailsLabel')}
                </span>
                <p className="font-bold text-[#1F1B2D]">{t('invoiceStory.taxSchedule')}</p>
                <p className="text-[11px] text-[#129267] font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t('invoiceStory.taxCalculation')}</span>
                </p>
              </div>
            </div>

            {/* Clean Line Items Table */}
            <div className="space-y-2">
              <div className="grid grid-cols-12 text-[10px] font-mono font-bold text-[#625D6B] uppercase pb-1.5 border-b border-[#E9E4F1] px-2">
                <span className="col-span-7 sm:col-span-8">{t('invoiceStory.colItem')}</span>
                <span className="col-span-2 text-center">{t('invoiceStory.colUnit')}</span>
                <span className="col-span-3 sm:col-span-2 text-end">{t('invoiceStory.colRate')}</span>
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-12 items-center py-2 px-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-xs">
                <div className="col-span-7 sm:col-span-8">
                  <p className="font-bold text-[#1F1B2D] text-xs">{t('invoiceStory.item1')}</p>
                  <p className="text-[10px] text-[#625D6B]">{t('invoiceStory.item1Desc')}</p>
                </div>
                <span className="col-span-2 text-center font-mono text-[#625D6B] text-[11px]">{t('invoiceStory.unitItem')}</span>
                <span className="col-span-3 sm:col-span-2 text-end font-mono font-semibold text-[#1F1B2D] text-xs">
                  {t('invoiceStory.calculated')}
                </span>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-12 items-center py-2 px-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-xs">
                <div className="col-span-7 sm:col-span-8">
                  <p className="font-bold text-[#1F1B2D] text-xs">{t('invoiceStory.item2')}</p>
                  <p className="text-[10px] text-[#625D6B]">{t('invoiceStory.item2Desc')}</p>
                </div>
                <span className="col-span-2 text-center font-mono text-[#625D6B] text-[11px]">{t('invoiceStory.unitItem')}</span>
                <span className="col-span-3 sm:col-span-2 text-end font-mono font-semibold text-[#1F1B2D] text-xs">
                  {t('invoiceStory.calculated')}
                </span>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-12 items-center py-2 px-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-xs">
                <div className="col-span-7 sm:col-span-8">
                  <p className="font-bold text-[#1F1B2D] text-xs">{t('invoiceStory.item3')}</p>
                  <p className="text-[10px] text-[#625D6B]">{t('invoiceStory.item3Desc')}</p>
                </div>
                <span className="col-span-2 text-center font-mono text-[#625D6B] text-[11px]">{t('invoiceStory.unitItem')}</span>
                <span className="col-span-3 sm:col-span-2 text-end font-mono font-semibold text-[#1F1B2D] text-xs">
                  {t('invoiceStory.calculated')}
                </span>
              </div>
            </div>

            {/* Calculations & Summary */}
            <div className="pt-3 border-t border-[#E9E4F1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#E4F8F0] border border-[#17B681]/30 text-[#129267]">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#17B681]" />
                <span className="font-semibold text-xs">{t('invoiceStory.ledgerSync')}</span>
              </div>

              <div className="w-full sm:w-60 space-y-1.5 text-xs text-[#625D6B]">
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
                  <span className="font-mono text-[#17B681] text-sm font-bold">
                    {t('invoiceStory.grandTotalVal')}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Status & Export */}
            <div className="pt-3 border-t border-[#E9E4F1] flex items-center justify-between text-xs text-[#625D6B]">
              <span className="flex items-center gap-1.5 text-[#129267] font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 text-[#17B681]" />
                <span>{t('invoiceStory.docVerified')}</span>
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[11px] font-mono font-bold text-[#6D57A5] flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-[#6D57A5]" />
                <span>{t('invoiceStory.instantPdf')}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

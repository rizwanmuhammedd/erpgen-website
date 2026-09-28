import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  ArrowRight,
  Printer,
  CheckCircle2,
  Download,
  Share2,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { getWhatsAppUrl } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../lib/gsap';

export const InvoiceProductPage: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const documentRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 3D perspective assemble for the invoice document
      if (documentRef.current) {
        gsap.fromTo(
          documentRef.current,
          {
            transformPerspective: 1400,
            rotateX: 14,
            scale: 0.94,
            y: 40,
            opacity: 0.6,
          },
          {
            rotateX: 0,
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: documentRef.current,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 0.6,
            },
          }
        );
      }

      // Staggered reveal of line items
      if (rowsRef.current) {
        gsap.fromTo(
          rowsRef.current.children,
          { opacity: 0, x: isRtl ? 16 : -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rowsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Staggered cards grid
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [isRtl]);

  const handleSimulateDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 1200);
  };

  const capabilities = [
    { name: t('invoicePage.cap1Title'), desc: t('invoicePage.cap1Desc') },
    { name: t('invoicePage.cap2Title'), desc: t('invoicePage.cap2Desc') },
    { name: t('invoicePage.cap3Title'), desc: t('invoicePage.cap3Desc') },
    { name: t('invoicePage.cap4Title'), desc: t('invoicePage.cap4Desc') },
    { name: t('invoicePage.cap5Title'), desc: t('invoicePage.cap5Desc') },
    { name: t('invoicePage.cap6Title'), desc: t('invoicePage.cap6Desc') },
  ];

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow={t('invoicePage.eyebrow')}
        title={t('invoicePage.title')}
        titleGradient={t('invoicePage.titleGradient')}
        description={t('invoicePage.description')}
        breadcrumbs={[
          { label: t('nav.home'), path: '/' },
          { label: t('nav.products'), path: '/products' },
          { label: 'ERPGen Invoice', path: '/products/invoice' },
        ]}
        badgeText={t('invoicePage.badge')}
      >
        <div className="pt-4 flex flex-wrap gap-4">
          <a href={getWhatsAppUrl("Hello ERPGen team, I would like to get started with the Invoice module.")} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg" icon={<ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}>
              {t('invoicePage.configureWhatsApp')}
            </Button>
          </a>
          <Link to="/contact">
            <Button variant="secondary" size="lg">
              {t('invoicePage.contactSales')}
            </Button>
          </Link>
        </div>
      </PageHero>

      {/* Interactive Live Invoice Product Experience Showcase */}
      <section className="py-16 sm:py-24 bg-[#FAF8FC] border-b border-[#E9E4F1] overflow-hidden">
        <Container size="xl" className="space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E9E4F1] text-[11px] font-mono font-semibold text-[#6D57A5] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#17B681]" />
              <span>{t('invoicePage.liveSimulator')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1F1B2D] font-heading tracking-tight">
              {t('invoicePage.anatomyTitle')}
            </h2>
            <p className="text-sm text-[#625D6B] max-w-xl mx-auto">
              {t('invoicePage.anatomyDesc')}
            </p>
          </div>

          {/* Interactive Document Sheet */}
          <div
            ref={documentRef}
            className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-[#E9E4F1] shadow-xl shadow-[#6D57A5]/5 p-6 sm:p-10 space-y-8 relative overflow-hidden"
          >
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#E9E4F1] gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6D57A5]/10 text-[#6D57A5] flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#1F1B2D] font-heading">
                      {t('invoicePage.taxInvoice')}
                    </h3>
                    <span className="font-mono text-xs text-[#6D57A5] font-semibold bg-[#FAF8FC] px-2 py-0.5 rounded border border-[#E9E4F1]">
                      #INV-2026-104
                    </span>
                  </div>
                  <span className="text-[11px] text-[#625D6B]">{t('invoicePage.engineNote')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSimulateDownload}
                  disabled={downloading}
                  className="px-3 py-1.5 rounded-lg border border-[#E9E4F1] text-xs font-semibold text-[#1F1B2D] hover:bg-[#FAF8FC] hover:border-[#6D57A5]/40 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  {downloading ? (
                    <RefreshCw className="w-3.5 h-3.5 text-[#6D57A5] animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5 text-[#6D57A5]" />
                  )}
                  <span>{downloading ? t('invoicePage.exportingPdf') : t('invoicePage.downloadPdf')}</span>
                </button>
                <a
                  href={getWhatsAppUrl("Hello ERPGen, I am interested in testing Invoice #INV-2026-104.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#17B681] text-white text-xs font-semibold hover:bg-[#129267] transition-all flex items-center gap-1.5 shadow-2xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{t('invoicePage.share')}</span>
                </a>
              </div>
            </div>

            {/* Billed From & Billed To */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#625D6B]">
              <div className="space-y-1 p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1]">
                <span className="font-mono text-[10px] text-[#6D57A5] uppercase font-bold block">
                  {t('invoicePage.issuedBy')}
                </span>
                <p className="font-bold text-[#1F1B2D] text-sm">{t('invoicePage.issuedByName')}</p>
                <p>{t('invoicePage.issuedByDiv')}</p>
                <p className="font-mono text-[11px]">TRN: 100482910400003</p>
              </div>

              <div className="space-y-1 p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1]">
                <span className="font-mono text-[10px] text-[#17B681] uppercase font-bold block">
                  {t('invoicePage.billedTo')}
                </span>
                <p className="font-bold text-[#1F1B2D] text-sm">{t('invoicePage.billedToName')}</p>
                <p>{t('invoicePage.billedToAddress')}</p>
                <p className="font-mono text-[11px]">{t('invoicePage.paymentTermsNet30')}</p>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="space-y-2">
              <div className="grid grid-cols-12 text-[11px] font-mono font-bold text-[#625D6B] uppercase pb-2 border-b border-[#E9E4F1] px-2">
                <span className="col-span-6 sm:col-span-7">{t('invoicePage.itemDesc')}</span>
                <span className="col-span-2 text-center">{t('invoicePage.qty')}</span>
                <span className="col-span-2 text-end">{t('invoicePage.rate')}</span>
                <span className="col-span-2 sm:col-span-1 text-end">{t('invoicePage.total')}</span>
              </div>

              <div ref={rowsRef} className="space-y-1.5 text-xs">
                <div className="grid grid-cols-12 items-center py-2.5 px-2 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1]/60">
                  <div className="col-span-6 sm:col-span-7">
                    <p className="font-bold text-[#1F1B2D]">{t('invoicePage.sampleItem1Title')}</p>
                    <p className="text-[11px] text-[#625D6B]">{t('invoicePage.sampleItem1Desc')}</p>
                  </div>
                  <span className="col-span-2 text-center font-mono">1</span>
                  <span className="col-span-2 text-end font-mono">$1,200.00</span>
                  <span className="col-span-2 sm:col-span-1 text-end font-mono font-bold text-[#1F1B2D]">$1,200.00</span>
                </div>

                <div className="grid grid-cols-12 items-center py-2.5 px-2 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1]/60">
                  <div className="col-span-6 sm:col-span-7">
                    <p className="font-bold text-[#1F1B2D]">{t('invoicePage.sampleItem2Title')}</p>
                    <p className="text-[11px] text-[#625D6B]">{t('invoicePage.sampleItem2Desc')}</p>
                  </div>
                  <span className="col-span-2 text-center font-mono">3</span>
                  <span className="col-span-2 text-end font-mono">$150.00</span>
                  <span className="col-span-2 sm:col-span-1 text-end font-mono font-bold text-[#1F1B2D]">$450.00</span>
                </div>

                <div className="grid grid-cols-12 items-center py-2.5 px-2 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1]/60">
                  <div className="col-span-6 sm:col-span-7">
                    <p className="font-bold text-[#1F1B2D]">{t('invoicePage.sampleItem3Title')}</p>
                    <p className="text-[11px] text-[#625D6B]">{t('invoicePage.sampleItem3Desc')}</p>
                  </div>
                  <span className="col-span-2 text-center font-mono">1</span>
                  <span className="col-span-2 text-end font-mono">$350.00</span>
                  <span className="col-span-2 sm:col-span-1 text-end font-mono font-bold text-[#1F1B2D]">$350.00</span>
                </div>
              </div>
            </div>

            {/* Calculations & Total */}
            <div className="pt-4 border-t border-[#E9E4F1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#17B681] bg-[#E4F8F0] px-3 py-1.5 rounded-xl border border-[#17B681]/30">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="font-semibold">{t('invoicePage.ledgerZeroDisc')}</span>
              </div>

              <div className="w-full sm:w-64 space-y-1.5 text-xs text-[#625D6B]">
                <div className="flex justify-between">
                  <span>{t('invoicePage.subtotal')}</span>
                  <span className="font-mono font-bold text-[#1F1B2D]">$2,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('invoicePage.vat')}</span>
                  <span className="font-mono font-bold text-[#1F1B2D]">$100.00</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E9E4F1] text-sm font-bold text-[#1F1B2D]">
                  <span className="text-[#6D57A5]">{t('invoicePage.grandTotal')}</span>
                  <span className="font-mono text-base text-[#17B681]">$2,100.00</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Confirmed Capabilities Grid */}
      <section className="py-16 sm:py-20 border-b border-[#E9E4F1]">
        <Container size="xl" className="space-y-16">
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                {t('invoicePage.confirmedFeatures')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading mt-1">
                {t('invoicePage.featuresHeadline')}
              </h2>
            </div>

            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((cap) => (
                <Card key={cap.name} variant="brand-border" className="p-6 space-y-3 bg-white border border-[#E9E4F1] shadow-sm hover:border-[#6D57A5]/40 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-[#1F1B2D] font-heading">{cap.name}</h3>
                  </div>
                  <p className="text-xs text-[#625D6B] leading-relaxed font-normal">
                    {cap.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <Card variant="default" className="p-8 border border-[#E9E4F1] bg-gradient-to-r from-[#FAF8FC] to-[#F5F1FA]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Badge variant="brand" size="sm">{t('invoicePage.flexibleSetup')}</Badge>
                  <Printer className="w-4 h-4 text-[#17B681]" />
                </div>
                <h3 className="text-xl font-bold text-[#1F1B2D] font-heading">
                  {t('invoicePage.combineTitle')}
                </h3>
                <p className="text-xs text-[#625D6B] leading-relaxed">
                  {t('invoicePage.combineDesc')}
                </p>
              </div>

              <Link to="/products/pos" className="shrink-0 w-full md:w-auto">
                <Button variant="secondary" size="md" icon={<ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}>
                  {t('invoicePage.explorePosModule')}
                </Button>
              </Link>
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
};


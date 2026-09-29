import React, { useEffect, useRef } from 'react';
import {
  ShoppingBag,
  Truck,
  Package,
  Coins,
  Layers,
  CheckCircle2,
  Database,
  ArrowRightLeft,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const ConnectedSystemSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const pulseDotRef = useRef<SVGCircleElement>(null);
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (coreRef.current) {
        gsap.fromTo(
          coreRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: coreRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (pulseDotRef.current) {
        gsap.to(pulseDotRef.current, {
          y: 10,
          scale: 1.25,
          repeat: -1,
          yoyo: true,
          duration: 1.6,
          ease: 'power1.inOut',
        });
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
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
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  const streams = [
    {
      id: 'sales',
      title: t('modules.sales'),
      category: t('modules.salesCat'),
      desc: t('connected.step1Desc'),
      icon: ShoppingBag,
      tag: 'Commerce & Orders',
      color: '#6D57A5',
    },
    {
      id: 'purchase',
      title: t('modules.purchase'),
      category: t('modules.purchaseCat'),
      desc: t('connected.step1Payload'),
      icon: Truck,
      tag: 'Supplier Inflow',
      color: '#6D57A5',
    },
    {
      id: 'inventory',
      title: t('modules.inventory'),
      category: t('modules.inventoryCat'),
      desc: t('connected.step2Desc'),
      icon: Package,
      tag: 'Stock & Warehouses',
      color: '#17B681',
    },
    {
      id: 'finance',
      title: t('modules.finance'),
      category: t('modules.financeCat'),
      desc: t('connected.step3Desc'),
      icon: Coins,
      tag: 'Ledgers & Taxes',
      color: '#17B681',
    },
  ];

  const highlights = [
    {
      title: 'Single Source of Truth',
      desc: 'One shared database powers checkout, billing, purchasing, and reporting.',
      icon: Database,
    },
    {
      title: 'Instant Cross-Department Sync',
      desc: 'Front-counter sales immediately deduct warehouse inventory and update client ledgers.',
      icon: RefreshCw,
    },
    {
      title: 'Automated Reconciliation',
      desc: 'Tax calculation, invoices, and payment receipts post directly to the unified ledger.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="connected-system"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-[#FAF8FC] border-b border-[#E9E4F1]"
      aria-label="Connected ERP Platform Architecture"
    >
      <Container size="xl" className="space-y-12 sm:space-y-16">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={t('connected.eyebrow')}
          title={t('connected.title')}
          titleGradient={t('connected.titleGradient')}
          description={t('connected.description')}
        />

        {/* Central Core & Connected Streams Layout */}
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Central ERP Core Banner */}
          <div
            ref={coreRef}
            className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#6D57A5]/30 shadow-md relative overflow-hidden text-center z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8FC] border border-[#E9E4F1] text-xs font-mono text-[#6D57A5] font-bold mb-3">
              <Layers className="w-4 h-4 text-[#17B681]" />
              <span>{t('connected.step4Node')}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F1B2D] font-heading">
              {t('connected.step4Title')}
            </h3>
            <p className="text-xs sm:text-sm text-[#625D6B] max-w-xl mx-auto mt-2 leading-relaxed">
              {t('connected.step4Desc')}
            </p>

            {/* Subtle Pill Strip */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6 pt-6 border-t border-[#E9E4F1]">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#1F1B2D] bg-[#FAF8FC] px-3 py-1 rounded-lg border border-[#E9E4F1]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681]" />
                <span>Single Central Database</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#1F1B2D] bg-[#FAF8FC] px-3 py-1 rounded-lg border border-[#E9E4F1]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681]" />
                <span>Zero Duplicate Entries</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#1F1B2D] bg-[#FAF8FC] px-3 py-1 rounded-lg border border-[#E9E4F1]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681]" />
                <span>Unified General Ledger</span>
              </span>
            </div>
          </div>

          {/* Purposeful Connection Drawing: Core to Streams with Single Pulse */}
          <div className="hidden lg:flex justify-center -my-2 relative z-0 pointer-events-none">
            <svg viewBox="0 0 800 36" className="w-full max-w-4xl h-9 overflow-visible" fill="none">
              {/* Trunk line down from Core */}
              <line x1="400" y1="0" x2="400" y2="16" stroke="#6D57A5" strokeWidth="2" strokeDasharray="3 3" className="opacity-40" />
              {/* Distribution bar across streams */}
              <path d="M 100 16 L 700 16" stroke="#E9E4F1" strokeWidth="2" />
              {/* Downward connector drops */}
              <line x1="100" y1="16" x2="100" y2="36" stroke="#6D57A5" strokeWidth="2" />
              <line x1="300" y1="16" x2="300" y2="36" stroke="#6D57A5" strokeWidth="2" />
              <line x1="500" y1="16" x2="500" y2="36" stroke="#17B681" strokeWidth="2" />
              <line x1="700" y1="16" x2="700" y2="36" stroke="#17B681" strokeWidth="2" />
              {/* Single light pulse traveling along trunk */}
              <circle ref={pulseDotRef} cx="400" cy="10" r="3.5" fill="#17B681" />
            </svg>
          </div>

          {/* Mobile Vertical Indicator */}
          <div className="lg:hidden flex justify-center -my-1">
            <div className="w-0.5 h-6 bg-gradient-to-b from-[#6D57A5] to-[#17B681] rounded-full animate-pulse" />
          </div>

          {/* Connected Streams Grid: Sales, Purchase, Inventory, Finance */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative z-10"
          >
            {streams.map((stream) => {
              const Icon = stream.icon;
              return (
                <div
                  key={stream.id}
                  className="p-5 rounded-2xl bg-white border border-[#E9E4F1] hover:border-[#6D57A5]/40 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-center text-[#6D57A5]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#17B681] bg-[#E4F8F0] px-2 py-0.5 rounded">
                        {stream.tag}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#1F1B2D] font-heading">
                        {stream.title}
                      </h4>
                      <p className="text-xs text-[#625D6B] mt-1 line-clamp-3 leading-relaxed">
                        {stream.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#E9E4F1] flex items-center gap-1 text-[11px] font-mono text-[#6D57A5] font-semibold">
                    <ArrowRightLeft className="w-3 h-3 text-[#17B681]" />
                    <span>Synchronized with Core</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3 Core Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div
                  key={i}
                  className="p-4 sm:p-5 rounded-xl bg-white/70 border border-[#E9E4F1] flex items-start gap-3.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-center shrink-0 text-[#6D57A5] mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#1F1B2D]">
                      {h.title}
                    </h5>
                    <p className="text-xs text-[#625D6B] mt-0.5 leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

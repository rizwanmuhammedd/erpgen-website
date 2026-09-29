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
  const trunkLineRef = useRef<SVGLineElement>(null);
  const lineSalesRef = useRef<SVGPathElement>(null);
  const linePurchaseRef = useRef<SVGPathElement>(null);
  const lineInventoryRef = useRef<SVGPathElement>(null);
  const lineFinanceRef = useRef<SVGPathElement>(null);
  const salesCardRef = useRef<HTMLDivElement>(null);
  const purchaseCardRef = useRef<HTMLDivElement>(null);
  const inventoryCardRef = useRef<HTMLDivElement>(null);
  const financeCardRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const pulseDotRef = useRef<SVGCircleElement>(null);
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Sequential meaningful animation:
      // 1. Core appears
      // 2. Trunk & connection 1 draws -> Sales node activates
      // 3. Connection 2 draws -> Purchase activates
      // 4. Connection 3 draws -> Inventory activates
      // 5. Connection 4 draws -> Finance activates
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // 1. Core appears
      if (coreRef.current) {
        tl.fromTo(
          coreRef.current,
          { opacity: 0, y: 20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power2.out' }
        );
      }

      // Trunk line drops down
      if (trunkLineRef.current) {
        tl.fromTo(
          trunkLineRef.current,
          { strokeDashoffset: 30 },
          { strokeDashoffset: 0, duration: 0.25, ease: 'power1.inOut' }
        );
      }

      // 2. Sales connection draws -> Sales activates
      if (lineSalesRef.current && salesCardRef.current) {
        tl.fromTo(
          lineSalesRef.current,
          { strokeDashoffset: 400 },
          { strokeDashoffset: 0, duration: 0.35, ease: 'power1.inOut' }
        ).fromTo(
          salesCardRef.current,
          { opacity: 0, y: 16, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.2)' },
          '-=0.15'
        );
      }

      // 3. Purchase connection draws -> Purchase activates
      if (linePurchaseRef.current && purchaseCardRef.current) {
        tl.fromTo(
          linePurchaseRef.current,
          { strokeDashoffset: 200 },
          { strokeDashoffset: 0, duration: 0.3, ease: 'power1.inOut' }
        ).fromTo(
          purchaseCardRef.current,
          { opacity: 0, y: 16, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.2)' },
          '-=0.15'
        );
      }

      // 4. Inventory connection draws -> Inventory activates
      if (lineInventoryRef.current && inventoryCardRef.current) {
        tl.fromTo(
          lineInventoryRef.current,
          { strokeDashoffset: 200 },
          { strokeDashoffset: 0, duration: 0.3, ease: 'power1.inOut' }
        ).fromTo(
          inventoryCardRef.current,
          { opacity: 0, y: 16, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.2)' },
          '-=0.15'
        );
      }

      // 5. Finance connection draws -> Finance activates
      if (lineFinanceRef.current && financeCardRef.current) {
        tl.fromTo(
          lineFinanceRef.current,
          { strokeDashoffset: 400 },
          { strokeDashoffset: 0, duration: 0.35, ease: 'power1.inOut' }
        ).fromTo(
          financeCardRef.current,
          { opacity: 0, y: 16, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.2)' },
          '-=0.15'
        );
      }

      // 6. Highlights strip fades in
      if (highlightsRef.current) {
        tl.fromTo(
          highlightsRef.current.children,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
          '-=0.1'
        );
      }

      // Subtle traveling pulse indicator looping
      if (pulseDotRef.current) {
        gsap.to(pulseDotRef.current, {
          y: 20,
          scale: 1.25,
          repeat: -1,
          yoyo: true,
          duration: 1.8,
          ease: 'power1.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  const streams = [
    {
      id: 'sales',
      title: t('modules.sales'),
      desc: t('connected.step1Desc'),
      icon: ShoppingBag,
      tag: 'Commerce & Orders',
      color: '#6D57A5',
      pathD: isRtl ? 'M 400 24 L 700 24 L 700 52' : 'M 400 24 L 100 24 L 100 52',
      dashLength: 400,
    },
    {
      id: 'purchase',
      title: t('modules.purchase'),
      desc: t('connected.step1Payload'),
      icon: Truck,
      tag: 'Supplier Inflow',
      color: '#6D57A5',
      pathD: isRtl ? 'M 400 24 L 500 24 L 500 52' : 'M 400 24 L 300 24 L 300 52',
      dashLength: 200,
    },
    {
      id: 'inventory',
      title: t('modules.inventory'),
      desc: t('connected.step2Desc'),
      icon: Package,
      tag: 'Stock & Warehouses',
      color: '#17B681',
      pathD: isRtl ? 'M 400 24 L 300 24 L 300 52' : 'M 400 24 L 500 24 L 500 52',
      dashLength: 200,
    },
    {
      id: 'finance',
      title: t('modules.finance'),
      desc: t('connected.step3Desc'),
      icon: Coins,
      tag: 'Ledgers & Taxes',
      color: '#17B681',
      pathD: isRtl ? 'M 400 24 L 100 24 L 100 52' : 'M 400 24 L 700 24 L 700 52',
      dashLength: 400,
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
      <Container size="xl" className="space-y-10 sm:space-y-14">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={t('connected.eyebrow')}
          title={t('connected.title')}
          titleGradient={t('connected.titleGradient')}
          description={t('connected.description')}
        />

        {/* Central Core & Connected Streams Layout */}
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
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

          {/* Simple Visual Drawing: Core sequentially connects to the 4 operational streams */}
          <div className="hidden lg:flex justify-center -my-3 relative z-0 pointer-events-none">
            <svg viewBox="0 0 800 52" className="w-full max-w-4xl h-13 overflow-visible" fill="none">
              {/* Trunk line down from Core */}
              <line
                ref={trunkLineRef}
                x1="400"
                y1="0"
                x2="400"
                y2="24"
                stroke="#6D57A5"
                strokeWidth="2"
                strokeDasharray="30"
                strokeDashoffset="30"
              />

              {/* Branch 1: Core -> Sales */}
              <path
                ref={lineSalesRef}
                d={streams[0].pathD}
                stroke="#6D57A5"
                strokeWidth="2"
                strokeDasharray="400"
                strokeDashoffset="400"
              />

              {/* Branch 2: Core -> Purchase */}
              <path
                ref={linePurchaseRef}
                d={streams[1].pathD}
                stroke="#6D57A5"
                strokeWidth="2"
                strokeDasharray="200"
                strokeDashoffset="200"
              />

              {/* Branch 3: Core -> Inventory */}
              <path
                ref={lineInventoryRef}
                d={streams[2].pathD}
                stroke="#17B681"
                strokeWidth="2"
                strokeDasharray="200"
                strokeDashoffset="200"
              />

              {/* Branch 4: Core -> Finance */}
              <path
                ref={lineFinanceRef}
                d={streams[3].pathD}
                stroke="#17B681"
                strokeWidth="2"
                strokeDasharray="400"
                strokeDashoffset="400"
              />

              {/* Subtle light pulse traveling along trunk */}
              <circle ref={pulseDotRef} cx="400" cy="12" r="3.5" fill="#17B681" />
            </svg>
          </div>

          {/* Mobile Vertical Indicator */}
          <div className="lg:hidden flex justify-center -my-1">
            <div className="w-0.5 h-6 bg-linear-to-b from-[#6D57A5] to-[#17B681] rounded-full animate-pulse" />
          </div>

          {/* Connected Streams Grid: Sales, Purchase, Inventory, Finance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative z-10">
            {streams.map((stream) => {
              const Icon = stream.icon;
              return (
                <div
                  key={stream.id}
                  ref={(el) => {
                    if (stream.id === 'sales') salesCardRef.current = el;
                    else if (stream.id === 'purchase') purchaseCardRef.current = el;
                    else if (stream.id === 'inventory') inventoryCardRef.current = el;
                    else if (stream.id === 'finance') financeCardRef.current = el;
                  }}
                  className="p-5 rounded-2xl bg-white border border-[#E9E4F1] hover:border-[#6D57A5]/40 hover:shadow-md transition-all flex flex-col justify-between will-change-transform"
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
          <div ref={highlightsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
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

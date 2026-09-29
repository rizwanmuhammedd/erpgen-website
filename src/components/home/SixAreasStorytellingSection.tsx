import React, { useEffect, useRef } from 'react';
import {
  ShoppingBag,
  Truck,
  Package,
  Users,
  FolderKanban,
  Coins,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

interface OperationalArea {
  id: string;
  number: string;
  nameKey: string;
  catKey: string;
  descKey: string;
  flowKey: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
  isClosingPillar?: boolean;
}

const AREAS: OperationalArea[] = [
  {
    id: 'sales',
    number: '01',
    nameKey: 'modules.sales',
    catKey: 'modules.salesCat',
    descKey: 'modules.salesDesc',
    flowKey: 'sixAreas.flowSales',
    icon: ShoppingBag,
    accentColor: '#6D57A5',
    badgeBg: 'bg-[#FAF8FC]',
    badgeBorder: 'border-[#E9E4F1]',
  },
  {
    id: 'purchase',
    number: '02',
    nameKey: 'modules.purchase',
    catKey: 'modules.purchaseCat',
    descKey: 'modules.purchaseDesc',
    flowKey: 'sixAreas.flowPurchase',
    icon: Truck,
    accentColor: '#6D57A5',
    badgeBg: 'bg-[#FAF8FC]',
    badgeBorder: 'border-[#E9E4F1]',
  },
  {
    id: 'inventory',
    number: '03',
    nameKey: 'modules.inventory',
    catKey: 'modules.inventoryCat',
    descKey: 'modules.inventoryDesc',
    flowKey: 'sixAreas.flowInventory',
    icon: Package,
    accentColor: '#17B681',
    badgeBg: 'bg-[#E4F8F0]',
    badgeBorder: 'border-[#17B681]/30',
  },
  {
    id: 'hr',
    number: '04',
    nameKey: 'modules.hr',
    catKey: 'modules.hrCat',
    descKey: 'modules.hrDesc',
    flowKey: 'sixAreas.flowHr',
    icon: Users,
    accentColor: '#6D57A5',
    badgeBg: 'bg-[#FAF8FC]',
    badgeBorder: 'border-[#E9E4F1]',
  },
  {
    id: 'projects',
    number: '05',
    nameKey: 'modules.projects',
    catKey: 'modules.projectsCat',
    descKey: 'modules.projectsDesc',
    flowKey: 'sixAreas.flowProjects',
    icon: FolderKanban,
    accentColor: '#6D57A5',
    badgeBg: 'bg-[#FAF8FC]',
    badgeBorder: 'border-[#E9E4F1]',
  },
  {
    id: 'finance',
    number: '06',
    nameKey: 'modules.finance',
    catKey: 'modules.financeCat',
    descKey: 'modules.financeDesc',
    flowKey: 'sixAreas.flowFinance',
    icon: Coins,
    accentColor: '#17B681',
    badgeBg: 'bg-[#E4F8F0]',
    badgeBorder: 'border-[#17B681]/30',
    isClosingPillar: true,
  },
];

export const SixAreasStorytellingSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleLineRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      // 1. Masked title reveal
      if (titleLineRef.current) {
        tl.fromTo(
          titleLineRef.current,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }
        );
      }

      // 2. Description fade upward
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.45'
        );
      }

      // 3. Sequential cards entrance: Card 1 -> Card 2 -> Card 3 -> Card 4 -> Card 5 -> Card 6
      if (gridRef.current) {
        const cards = Array.from(gridRef.current.children);
        tl.fromTo(
          cards,
          { opacity: 0, y: 24, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.3'
        );

        // Icon indicator micro-animation inside cards
        cards.forEach((card) => {
          const icon = card.querySelector('.area-icon-box');
          if (icon) {
            tl.fromTo(
              icon,
              { scale: 0.8, rotate: -6 },
              { scale: 1, rotate: 0, duration: 0.4, ease: 'back.out(1.5)' },
              '-=0.45'
            );
          }
        });
      }

      // 4. Footer callout settles
      if (footerRef.current) {
        tl.fromTo(
          footerRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <section
      ref={sectionRef}
      id="six-areas"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-white border-b border-[#E9E4F1]"
      aria-label="Six Core ERP Operational Areas"
    >
      <Container size="xl" className="space-y-12 sm:space-y-16">
        {/* Section Heading with Masked Title Reveal */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8FC] border border-[#E9E4F1] text-[11px] font-mono text-[#6D57A5] font-bold shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-[#17B681]" />
            <span>{t('sixAreas.eyebrow')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F1B2D] font-heading leading-tight">
            <span className="block overflow-hidden py-0.5">
              <span ref={titleLineRef} className="inline-block will-change-transform">
                {t('sixAreas.title')}{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6D57A5] to-[#17B681]">
                  {t('sixAreas.titleGradient')}
                </span>
              </span>
            </span>
          </h2>

          <p ref={descRef} className="text-sm sm:text-base text-[#625D6B] max-w-2xl mx-auto leading-relaxed">
            {t('sixAreas.description')}
          </p>

          <div className="w-0.5 h-6 bg-linear-to-b from-[#6D57A5] to-[#17B681] rounded-full mx-auto my-1" />
        </div>

        {/* Clean 6-Area Grid: Sales -> Purchase -> Inventory -> HR -> Projects -> Finance */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          role="region"
          aria-label="ERPGen Six Core Pillars"
        >
          {AREAS.map((area) => {
            const Icon = area.icon;

            return (
              <div
                key={area.id}
                className={`group relative p-6 sm:p-7 rounded-2xl bg-[#FAF8FC] border transition-all duration-300 flex flex-col justify-between ${
                  area.isClosingPillar
                    ? 'border-[#17B681]/40 shadow-xs hover:border-[#17B681] hover:bg-white hover:shadow-md'
                    : 'border-[#E9E4F1] hover:border-[#6D57A5]/40 hover:bg-white hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Bar: Icon, Category & Number */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div
                      className={`area-icon-box w-11 h-11 rounded-xl ${area.badgeBg} border ${area.badgeBorder} flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-2xs`}
                    >
                      <Icon className="w-5 h-5 text-[#6D57A5]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#625D6B] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white border border-[#E9E4F1]">
                        {t(area.catKey as any)}
                      </span>
                      <span className="text-xs font-mono font-extrabold text-[#6D57A5]/60 group-hover:text-[#6D57A5] transition-colors">
                        {area.number}
                      </span>
                    </div>
                  </div>

                  {/* Title & One-Line Description */}
                  <h3 className="text-lg font-bold text-[#1F1B2D] font-heading group-hover:text-[#6D57A5] transition-colors mb-2">
                    {t(area.nameKey as any)}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#625D6B] leading-relaxed">
                    {t(area.descKey as any)}
                  </p>
                </div>

                {/* Footer Pill: Operational Stream */}
                <div className="pt-4 mt-4 border-t border-[#E9E4F1]/60 flex items-center justify-between text-[11px] font-mono text-[#625D6B]">
                  <span className="text-[#129267] font-semibold flex items-center gap-1.5">
                    {area.isClosingPillar ? (
                      <ShieldCheck className="w-3.5 h-3.5 text-[#17B681]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#17B681]" />
                    )}
                    <span>{t(area.flowKey as any)}</span>
                  </span>
                  <span className="text-[#6D57A5] opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 flex items-center gap-0.5">
                    <ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continuity Handoff: Active Finance card connects directly into Connected ERP System */}
        <div
          ref={footerRef}
          className="p-4 sm:p-5 rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#E9E4F1] flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 text-[#17B681]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1F1B2D]">
                {t('sixAreas.allActive')}
              </p>
              <p className="text-[11px] text-[#625D6B]">
                Finance & operations converge into the central engine.
              </p>
            </div>
          </div>
          <a
            href="#connected-system"
            className="text-xs font-mono font-bold text-[#6D57A5] hover:text-[#554385] inline-flex items-center gap-1 transition-colors shrink-0"
          >
            <span>{t('sixAreas.nextConnected')}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
          </a>
        </div>
      </Container>
    </section>
  );
};

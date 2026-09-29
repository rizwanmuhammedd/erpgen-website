import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Receipt,
  ShoppingBag,
  Layers,
  Coins,
  Package,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Utensils,
  Scissors,
  ShoppingCart,
  Shirt,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';
import { tactileAudio } from '../../lib/tactileAudio';

interface PosFeatureConfig {
  id: string;
  number: string;
  titleKey: string;
  descKey: string;
  shortName: string;
  icon: React.ComponentType<{ className?: string }>;
  modeHeading: string;
  modeSubheading: string;
  tagText: string;
  flowSteps: string[];
  capabilities: {
    title: string;
    desc: string;
  }[];
}

export const PosFeaturesSection: React.FC = () => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndexRef = useRef<number>(0);
  const hasUserScrolledRef = useRef<boolean>(false);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  const { t, isRtl } = useLanguage();

  const FEATURES: PosFeatureConfig[] = useMemo(
    () => [
      {
        id: 'billing',
        number: '01',
        titleKey: 'posFeatures.capBilling',
        descKey: 'posFeatures.capBillingDesc',
        shortName: 'Billing',
        icon: Receipt,
        modeHeading: 'COUNTER BILLING & FAST CHECKOUT',
        modeSubheading: 'High-speed barcode scanning, line items, and instant thermal receipt printing',
        tagText: 'Rapid Checkout',
        flowSteps: [
          'Barcode Quick Scan',
          'Price Rule Check',
          'Line Item Staging',
          'Subtotal Compute',
        ],
        capabilities: [
          {
            title: 'Quick-Touch Keypad',
            desc: 'Instant counter lookup and pre-configured quick buttons for high-frequency items.',
          },
          {
            title: 'Real-Time Cart Calculation',
            desc: 'Automated line item totals with customer-specific pricing and discount rules.',
          },
          {
            title: 'Thermal Receipt Printing',
            desc: 'Immediate print dispatch to counter printers with full compliance layout.',
          },
        ],
      },
      {
        id: 'products',
        number: '02',
        titleKey: 'posFeatures.capProducts',
        descKey: 'posFeatures.capProductsDesc',
        shortName: 'Products',
        icon: ShoppingBag,
        modeHeading: 'PRODUCT CATALOG & MODIFIERS',
        modeSubheading: 'Visual touch catalog with category filters, variant matrices, and SKU lookup',
        tagText: 'Catalog Matrix',
        flowSteps: [
          'Category Filter',
          'Variant Matrix',
          'Modifiers Applied',
          'Unit Price Sync',
        ],
        capabilities: [
          {
            title: 'Visual SKU Grid',
            desc: 'Intuitive touch grid categorized by food, retail, or service departments.',
          },
          {
            title: 'Multi-Level Modifiers',
            desc: 'Size options, custom toppings, preparation notes, and variant price differentials.',
          },
          {
            title: 'Live Price Synchronization',
            desc: 'Automatic time-based happy hour, seasonal rates, or bulk customer discounts.',
          },
        ],
      },
      {
        id: 'orders',
        number: '03',
        titleKey: 'posFeatures.capOrders',
        descKey: 'posFeatures.capOrdersDesc',
        shortName: 'Orders',
        icon: Layers,
        modeHeading: 'ORDER TICKETS & TABLE QUEUES',
        modeSubheading: 'Active order tickets, kitchen preparation routing, split bills, and guest tabs',
        tagText: 'Order Routing',
        flowSteps: [
          'Ticket Open',
          'Preparation Stage',
          'Hold & Recall Tab',
          'Bill Split',
        ],
        capabilities: [
          {
            title: 'Preparation Ticket Route',
            desc: 'Automatic routing of order tickets to barista, kitchen, or counter fulfillment.',
          },
          {
            title: 'Hold & Recall Tabs',
            desc: 'Save open table tabs or customer queues and recall instantly across any register.',
          },
          {
            title: 'Bill Split Engine',
            desc: 'Divide guest checks equally or by specific items across multiple diners.',
          },
        ],
      },
      {
        id: 'payments',
        number: '04',
        titleKey: 'posFeatures.capPayments',
        descKey: 'posFeatures.capPaymentsDesc',
        shortName: 'Payments',
        icon: Coins,
        modeHeading: 'MULTI-TENDER SETTLEMENT',
        modeSubheading: 'Card terminal, cash drawer, and digital wallet with automated reconciliation',
        tagText: 'Tender Split',
        flowSteps: [
          'Tender Selection',
          'Multi-Method Split',
          'Receipt Print',
          'Drawer Trigger',
        ],
        capabilities: [
          {
            title: 'Multi-Tender Settlement',
            desc: 'Split guest balances between cash, card terminal, and electronic wallet seamlessly.',
          },
          {
            title: 'Automated Cash Drawer',
            desc: 'Secure electronic drawer trigger only upon verified transaction confirmation.',
          },
          {
            title: 'Daily Shift Balancing',
            desc: 'Instant end-of-day register balancing without tedious manual recount errors.',
          },
        ],
      },
      {
        id: 'inventory',
        number: '05',
        titleKey: 'posFeatures.capInventory',
        descKey: 'posFeatures.capInventoryDesc',
        shortName: 'Inventory',
        icon: Package,
        modeHeading: 'REAL-TIME STOCK DEDUCTION',
        modeSubheading: 'Direct deduction from active store shelves and central depot with zero delay',
        tagText: 'Live Stock Sync',
        flowSteps: [
          'Sale Confirmed',
          'Shelf Stock Deduct',
          'Central Depot Sync',
          'Reorder Alert',
        ],
        capabilities: [
          {
            title: 'Zero-Delay Stock Deduction',
            desc: 'Deduct ingredients and retail SKUs immediately upon transaction settlement.',
          },
          {
            title: 'Multi-Register Stock Sync',
            desc: 'Unified inventory count across all store registers and connected back-office shelves.',
          },
          {
            title: 'Threshold Alerts',
            desc: 'Instant alerts when stock balances hit minimum levels, preventing sold-out outages.',
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      hasUserScrolledRef.current = true;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    if (prefersReducedMotion()) {
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }

    const sectionEl = sectionRef.current;
    const pinContainerEl = stickyContainerRef.current;
    if (!sectionEl || !pinContainerEl) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Unified Reference-Level Layered POS Storytelling (Desktop & Mobile)
      const setupPosAnimation = (isMobile: boolean) => {
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length < 5) return;

        // Base Initial States
        cards.forEach((card, i) => {
          gsap.set(card, {
            zIndex: (i + 1) * 10,
            opacity: i === 0 ? 1 : 0,
            scale: i === 0 ? 1 : 0.98,
            y: i === 0 ? 0 : isMobile ? 36 : 52,
            pointerEvents: i === 0 ? 'auto' : 'none',
          });
        });

        // Compact storytelling track distance:
        // Desktop: ~2.1x innerHeight
        // Mobile: ~1.8x innerHeight
        const scrollMultiplier = isMobile ? 1.8 : 2.1;

        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            pin: pinContainerEl,
            pinSpacing: true,
            start: isMobile ? 'top 64px' : 'top 76px',
            end: () => `+=${Math.round(window.innerHeight * scrollMultiplier)}`,
            scrub: 0.45,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const newIndex = Math.min(4, Math.floor(p * 4.999));

              if (newIndex !== prevIndexRef.current) {
                if (window.innerWidth >= 1024 && !prefersReducedMotion() && hasUserScrolledRef.current) {
                  tactileAudio.playTick();
                }
                prevIndexRef.current = newIndex;
                setActiveFeatureIndex(newIndex);
              }
            },
          },
        });

        scrollTriggerInstanceRef.current = scrubTl.scrollTrigger || null;

        // 4 Sequential Transitions:
        // 01 Billing -> 02 Products covers 01
        // 02 Products -> 03 Orders covers 02
        // 03 Orders -> 04 Payments covers 03
        // 04 Payments -> 05 Inventory covers 04
        for (let i = 0; i < 4; i++) {
          const startTime = i * 1.0;
          const curCard = cards[i];
          const nextCard = cards[i + 1];

          // 1. Current card recedes slightly backward and upward
          scrubTl.to(
            curCard,
            {
              y: isMobile ? -8 : -14,
              scale: 0.97,
              opacity: 0.45,
              duration: 0.75,
              ease: 'power2.inOut',
              onComplete: () => {
                gsap.set(curCard, { pointerEvents: 'none' });
              },
              onReverseComplete: () => {
                gsap.set(curCard, { pointerEvents: 'auto' });
              },
            },
            startTime
          );

          // 2. Next card moves up over previous card (higher z-index covers it)
          scrubTl.fromTo(
            nextCard,
            {
              y: isMobile ? 36 : 52,
              scale: 0.98,
              opacity: 0,
            },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.75,
              ease: 'power2.out',
              pointerEvents: 'auto',
            },
            startTime + 0.04
          );

          // 3. Coordinated internal elements stagger
          const nextTitle = nextCard.querySelector('.pos-title-block');
          if (nextTitle) {
            scrubTl.fromTo(
              nextTitle,
              { y: 10, opacity: 0.3 },
              { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
              startTime + 0.12
            );
          }

          const nextFlow = nextCard.querySelector('.pos-flow-block');
          if (nextFlow) {
            scrubTl.fromTo(
              nextFlow,
              { scale: 0.985, opacity: 0.4 },
              { scale: 1, opacity: 1, duration: 0.45, ease: 'power2.out' },
              startTime + 0.18
            );
          }

          const nextCaps = nextCard.querySelectorAll('.pos-cap-item');
          if (nextCaps.length > 0) {
            scrubTl.fromTo(
              nextCaps,
              { y: 8, opacity: 0.3 },
              { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power2.out' },
              startTime + 0.22
            );
          }

          // Small quiet plateau between transitions
          scrubTl.to({}, { duration: 0.25 }, startTime + 0.75);
        }
      };

      mm.add('(min-width: 1024px)', () => {
        setupPosAnimation(false);
      });

      mm.add('(max-width: 1023px)', () => {
        setupPosAnimation(true);
      });
    }, sectionRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  const handleIndexClick = (idx: number) => {
    hasUserScrolledRef.current = true;
    setActiveFeatureIndex(idx);
    prevIndexRef.current = idx;

    if (window.innerWidth >= 1024 && !prefersReducedMotion()) {
      tactileAudio.playTick();
    }

    const st = scrollTriggerInstanceRef.current;
    if (st) {
      const targetProgress = (idx + 0.15) / 5;
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(targetScroll, { duration: 1.0 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  const isReduced = typeof window !== 'undefined' && prefersReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="pos-features"
      className="relative bg-[#FAF8FC] border-b border-[#E9E4F1]"
      aria-label="POS Capabilities Storytelling"
    >
      {!isReduced ? (
        <div
          ref={stickyContainerRef}
          className="w-full flex flex-col justify-between py-6 sm:py-8 lg:py-10 min-h-[100svh] lg:min-h-[calc(100vh-4.5rem)]"
        >
          <Container size="xl" className="h-full flex flex-col justify-between space-y-4 sm:space-y-6">
            {/* ----------------------------------------------------------------- */}
            {/* SECTION HEADING & SECONDARY MINIMAL INDEX                        */}
            {/* ----------------------------------------------------------------- */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#E9E4F1] pb-3 sm:pb-4 gap-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white border border-[#E9E4F1] text-[11px] font-mono text-[#17B681] font-bold shadow-2xs">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#17B681]" />
                  <span>{t('posFeatures.productEyebrow')}</span>
                </div>
                <h2 className="text-lg sm:text-2xl xl:text-3xl font-extrabold text-[#1F1B2D] font-heading tracking-tight">
                  {t('posFeatures.title')}{' '}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#17B681] to-[#6D57A5]">
                    {t('posFeatures.titleGradient')}
                  </span>
                </h2>
              </div>

              {/* Minimal 5-Item Secondary Index */}
              <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-white border border-[#E9E4F1] rounded-2xl w-fit self-start sm:self-auto shadow-2xs">
                {FEATURES.map((feat, idx) => {
                  const isActive = idx === activeFeatureIndex;
                  return (
                    <button
                      type="button"
                      key={feat.id}
                      onClick={() => handleIndexClick(idx)}
                      className={`px-2 sm:px-2.5 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#FAF8FC] text-[#1F1B2D] font-bold shadow-2xs border border-[#17B681]/40'
                          : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-white/50'
                      }`}
                      aria-label={`Jump to ${feat.shortName}`}
                    >
                      <span className={isActive ? 'text-[#17B681] font-extrabold' : 'opacity-60'}>
                        {feat.number}
                      </span>
                      <span className="hidden md:inline text-[11px] truncate max-w-[70px]">
                        {feat.shortName}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* STACKED POS WORKSPACE STAGE (ONE STICKY VIEWPORT)                */}
            {/* ----------------------------------------------------------------- */}
            <div className="relative w-full h-[470px] sm:h-[490px] lg:h-[480px] xl:h-[500px]">
              {FEATURES.map((feat, idx) => {
                const Icon = feat.icon;
                const isInitial = idx === 0;

                return (
                  <div
                    key={feat.id}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    style={{
                      zIndex: (idx + 1) * 10,
                      opacity: isInitial ? 1 : 0,
                      transform: isInitial ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 52px, 0) scale(0.98)',
                    }}
                    className="absolute inset-0 rounded-3xl bg-white border-2 border-[#E9E4F1] shadow-xl shadow-[#17B681]/8 flex flex-col justify-between overflow-hidden p-5 sm:p-7 xl:p-8 transition-shadow will-change-[transform,opacity]"
                  >
                    {/* Top Window Bar */}
                    <div className="pos-title-block flex items-center justify-between pb-3 sm:pb-4 border-b border-[#E9E4F1]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#17B681] flex items-center justify-center font-bold shrink-0">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#17B681]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-mono font-bold text-[#17B681]">
                              {feat.number}
                            </span>
                            <span className="text-xs text-[#625D6B] hidden sm:inline">·</span>
                            <span className="text-[10px] sm:text-xs font-mono font-bold text-[#6D57A5] uppercase tracking-wider hidden sm:inline">
                              POS Operational Mode
                            </span>
                          </div>
                          <h3 className="text-base sm:text-xl xl:text-2xl font-extrabold text-[#1F1B2D] font-heading leading-tight">
                            {feat.modeHeading}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
                          <span>{feat.tagText}</span>
                        </span>
                      </div>
                    </div>

                    {/* Operational Mode Description */}
                    <p className="text-xs sm:text-sm text-[#625D6B] leading-relaxed my-2 sm:my-3">
                      {feat.modeSubheading}
                    </p>

                    {/* POS Operational Transformation Flow */}
                    <div className="pos-flow-block p-3 sm:p-3.5 bg-[#FAF8FC] border border-[#E9E4F1] rounded-2xl space-y-1.5 my-1 sm:my-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#17B681] font-bold">
                          Register Execution Flow
                        </span>
                        <span className="text-[10px] font-mono text-[#625D6B] hidden sm:inline">
                          Continuous Cashier Loop
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono font-semibold text-[#1F1B2D]">
                        {feat.flowSteps.map((step, sIdx) => (
                          <React.Fragment key={sIdx}>
                            <span className="truncate max-w-[70px] sm:max-w-none">{step}</span>
                            {sIdx < feat.flowSteps.length - 1 && (
                              <ArrowRight
                                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#17B681] shrink-0 ${
                                  isRtl ? 'rotate-180' : ''
                                }`}
                              />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* 3 Structural Conceptual Capability Cards (Zero Fake Data) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 my-1 sm:my-2">
                      {feat.capabilities.map((cap, cIdx) => (
                        <div
                          key={cIdx}
                          className="pos-cap-item p-2.5 sm:p-3 rounded-xl bg-white border border-[#E9E4F1] space-y-0.5 sm:space-y-1 shadow-2xs hover:border-[#17B681]/40 transition-colors"
                        >
                          <span className="text-xs font-bold text-[#1F1B2D] block truncate">
                            {cap.title}
                          </span>
                          <p className="text-[11px] text-[#625D6B] line-clamp-2 leading-relaxed">
                            {cap.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Footer Continuity Strip */}
                    <div className="pt-2.5 sm:pt-3 border-t border-[#E9E4F1] flex items-center justify-between text-xs text-[#625D6B]">
                      <div className="flex items-center gap-2 text-[#129267] font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681]" />
                        <span>Synchronized with Central Core · Cash Register Active</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#6D57A5] hidden sm:flex">
                        <Sparkles className="w-3 h-3 text-[#17B681]" />
                        <span>Zero Discrepancy Reconciliation</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Continuity Handoff into Business Types */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 sm:pt-3 border-t border-[#E9E4F1] text-xs text-[#625D6B] gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#17B681]" />
                <span className="font-semibold text-[#1F1B2D]">
                  5 POS Workflows Synchronized
                </span>
                <span className="hidden sm:inline">— Direct integration with retail and service operations</span>
              </div>

              {/* 4 Industry Quick Icons */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[#625D6B] hidden xl:inline">
                  Adaptable Across:
                </span>
                <a
                  href="#business-types"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E9E4F1] text-[11px] font-mono font-medium text-[#1F1B2D] hover:border-[#6D57A5]/40 transition-colors shadow-2xs"
                >
                  <Utensils className="w-3 h-3 text-[#6D57A5]" />
                  <span>Restaurant</span>
                </a>
                <a
                  href="#business-types"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E9E4F1] text-[11px] font-mono font-medium text-[#1F1B2D] hover:border-[#17B681]/40 transition-colors shadow-2xs"
                >
                  <Scissors className="w-3 h-3 text-[#17B681]" />
                  <span>Barbershop</span>
                </a>
                <a
                  href="#business-types"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E9E4F1] text-[11px] font-mono font-medium text-[#1F1B2D] hover:border-[#6D57A5]/40 transition-colors shadow-2xs"
                >
                  <ShoppingCart className="w-3 h-3 text-[#6D57A5]" />
                  <span>Supermarket</span>
                </a>
                <a
                  href="#business-types"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E9E4F1] text-[11px] font-mono font-medium text-[#1F1B2D] hover:border-[#17B681]/40 transition-colors shadow-2xs"
                >
                  <Shirt className="w-3 h-3 text-[#17B681]" />
                  <span>Laundry</span>
                </a>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        /* Reduced Motion Fallback */
        <div className="py-14 sm:py-20">
          <Container size="xl" className="space-y-8">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E9E4F1] text-[11px] font-mono text-[#17B681] font-bold shadow-2xs">
                <ShoppingBag className="w-3.5 h-3.5 text-[#17B681]" />
                <span>{t('posFeatures.productEyebrow')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading leading-tight">
                {t('posFeatures.title')}{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#17B681] to-[#6D57A5]">
                  {t('posFeatures.titleGradient')}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#625D6B]">
                {t('posFeatures.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.id}
                    className="p-6 rounded-2xl bg-white border border-[#E9E4F1] shadow-xs space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#17B681] flex items-center justify-center font-bold">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-bold text-[#17B681]">
                          {feat.number}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E4F8F0] text-[#129267]">
                        {feat.tagText}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#1F1B2D] font-heading">
                      {feat.modeHeading}
                    </h3>

                    <p className="text-xs text-[#625D6B] leading-relaxed">
                      {feat.modeSubheading}
                    </p>

                    <div className="pt-2 border-t border-[#E9E4F1] flex items-center justify-between text-xs text-[#129267]">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681]" />
                        <span>Active in Register</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </div>
      )}
    </section>
  );
};

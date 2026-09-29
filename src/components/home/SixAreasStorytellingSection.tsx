import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';
import { tactileAudio } from '../../lib/tactileAudio';

interface PillarConfig {
  id: string;
  number: string;
  shortName: string;
  titleKey: string;
  subtitleKey: string;
  descKey: string;
  tagKey: string;
  flowKey: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  isClosingPillar?: boolean;
  workspaceHeading: string;
  workspaceSubheading: string;
  flowSteps: string[];
  capabilityLabels: string[];
  capabilities: {
    title: string;
    desc: string;
  }[];
}

export const SixAreasStorytellingSection: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndexRef = useRef<number>(0);
  const hasUserScrolledRef = useRef<boolean>(false);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  const { t, isRtl } = useLanguage();

  const PILLARS: PillarConfig[] = useMemo(
    () => [
      {
        id: 'sales',
        number: '01',
        shortName: 'Sales',
        titleKey: 'sixAreas.p1Title',
        subtitleKey: 'sixAreas.p1Subtitle',
        descKey: 'sixAreas.p1Desc',
        tagKey: 'sixAreas.p1Tag',
        flowKey: 'sixAreas.flowSales',
        icon: ShoppingBag,
        accentColor: '#6D57A5',
        workspaceHeading: 'SALES MANAGEMENT',
        workspaceSubheading: 'Commercial Operations & Customer Billing',
        flowSteps: [
          'Quote Generation',
          'Order Booking',
          'Invoice Dispatch',
          'Ledger Sync',
        ],
        capabilityLabels: [
          'Commercial Operations',
          'Customer Management',
          'POS Connection',
        ],
        capabilities: [
          {
            title: 'Commercial Velocity',
            desc: 'Instant quote-to-order transformation with live customer pricing rules.',
          },
          {
            title: 'Customer Ledger Balance',
            desc: 'Continuous tracking of credit terms, deposits, and accounts receivable.',
          },
          {
            title: 'Counter POS Link',
            desc: 'Direct synchronization between commercial back-office and retail registers.',
          },
        ],
      },
      {
        id: 'purchase',
        number: '02',
        shortName: 'Purchase',
        titleKey: 'sixAreas.p2Title',
        subtitleKey: 'sixAreas.p2Subtitle',
        descKey: 'sixAreas.p2Desc',
        tagKey: 'sixAreas.p2Tag',
        flowKey: 'sixAreas.flowPurchase',
        icon: Truck,
        accentColor: '#6D57A5',
        workspaceHeading: 'PURCHASE & PROCUREMENT',
        workspaceSubheading: 'Supplier Inflow & Vendor Payables',
        flowSteps: [
          'Requisition Request',
          'Vendor PO Issued',
          'Delivery Intake',
          'Payable Verified',
        ],
        capabilityLabels: [
          'Vendor Directory',
          'Goods Verification',
          'Cost Allocation',
        ],
        capabilities: [
          {
            title: 'Vendor Master Directory',
            desc: 'Centralized supplier terms, procurement catalogues, and lead-time metrics.',
          },
          {
            title: 'Automated Goods Intake',
            desc: 'Strict 3-way matching between PO, delivery receipt, and vendor invoice.',
          },
          {
            title: 'Cost Allocation',
            desc: 'Direct allocation of landed costs to inventory valuation and balance sheets.',
          },
        ],
      },
      {
        id: 'inventory',
        number: '03',
        shortName: 'Inventory',
        titleKey: 'sixAreas.p3Title',
        subtitleKey: 'sixAreas.p3Subtitle',
        descKey: 'sixAreas.p3Desc',
        tagKey: 'sixAreas.p3Tag',
        flowKey: 'sixAreas.flowInventory',
        icon: Package,
        accentColor: '#17B681',
        workspaceHeading: 'MULTI-WAREHOUSE INVENTORY',
        workspaceSubheading: 'Live Stock Control & Branch Routing',
        flowSteps: [
          'Central Depot',
          'Transfer Order',
          'Branch Stocking',
          'Live Deduction',
        ],
        capabilityLabels: [
          'Multi-Location Ledger',
          'Movement Tracking',
          'Reorder Alerts',
        ],
        capabilities: [
          {
            title: 'Multi-Location Ledger',
            desc: 'Unified stock tracking across central warehouses, store branches, and transit.',
          },
          {
            title: 'Movement Traceability',
            desc: 'Real-time stock transfers with barcode verification and serial tracking.',
          },
          {
            title: 'Automated Reorder Alerts',
            desc: 'Safety stock thresholds trigger instant purchase notifications to prevent outages.',
          },
        ],
      },
      {
        id: 'hr',
        number: '04',
        shortName: 'HR',
        titleKey: 'sixAreas.p4Title',
        subtitleKey: 'sixAreas.p4Subtitle',
        descKey: 'sixAreas.p4Desc',
        tagKey: 'sixAreas.p4Tag',
        flowKey: 'sixAreas.flowHr',
        icon: Users,
        accentColor: '#6D57A5',
        workspaceHeading: 'HR WORKSPACE',
        workspaceSubheading: 'Workforce Governance & Shift Logistics',
        flowSteps: [
          'Staff Profile',
          'Department Hierarchy',
          'Roster & Shifts',
          'Attendance Log',
        ],
        capabilityLabels: [
          'Staff Governance',
          'Shift Rostering',
          'Role Permissions',
        ],
        capabilities: [
          {
            title: 'Employee Governance',
            desc: 'Digital staff profiles, employment contracts, and compliance document filing.',
          },
          {
            title: 'Operational Rostering',
            desc: 'Shift scheduling aligned directly with projected store and warehouse volume.',
          },
          {
            title: 'Role-Based Access',
            desc: 'Strict module permission controls mapped to operational duties across the system.',
          },
        ],
      },
      {
        id: 'projects',
        number: '05',
        shortName: 'Project',
        titleKey: 'sixAreas.p5Title',
        subtitleKey: 'sixAreas.p5Subtitle',
        descKey: 'sixAreas.p5Desc',
        tagKey: 'sixAreas.p5Tag',
        flowKey: 'sixAreas.flowProjects',
        icon: FolderKanban,
        accentColor: '#6D57A5',
        workspaceHeading: 'PROJECT MANAGEMENT',
        workspaceSubheading: 'Milestones & Execution Pipelines',
        flowSteps: [
          'Scope & Milestones',
          'Resource Allocation',
          'Task Execution',
          'Milestone Review',
        ],
        capabilityLabels: [
          'Delivery Pipelines',
          'Resource Staging',
          'Task Tracking',
        ],
        capabilities: [
          {
            title: 'Milestone Delivery Pipelines',
            desc: 'Phase-by-phase project coordination with clear criteria and deliverable gates.',
          },
          {
            title: 'Resource Allocation',
            desc: 'Assign staff, equipment, and materials to client projects without duplication.',
          },
          {
            title: 'Task Accountability',
            desc: 'Live activity audit trails and deadline monitoring linked to corporate goals.',
          },
        ],
      },
      {
        id: 'finance',
        number: '06',
        shortName: 'Finance',
        titleKey: 'sixAreas.p6Title',
        subtitleKey: 'sixAreas.p6Subtitle',
        descKey: 'sixAreas.p6Desc',
        tagKey: 'sixAreas.p6Tag',
        flowKey: 'sixAreas.flowFinance',
        icon: Coins,
        accentColor: '#17B681',
        isClosingPillar: true,
        workspaceHeading: 'FINANCE & LEDGERS',
        workspaceSubheading: 'General Ledger, Tax & Central Reconciliation',
        flowSteps: [
          'Operational Events',
          'Automated Journal',
          'Tax & VAT Audit',
          'General Ledger',
        ],
        capabilityLabels: [
          'General Ledger',
          'Tax Schedules',
          'Reconciliation',
        ],
        capabilities: [
          {
            title: 'Unified General Ledger',
            desc: 'Double-entry bookkeeping automatically posted from sales, purchases, and payroll.',
          },
          {
            title: 'Standard Tax Schedules',
            desc: 'Built-in tax calculations and reporting schedules ready for financial review.',
          },
          {
            title: 'Reconciliation Engine',
            desc: 'Cash flow transparency and real-time trial balance across all enterprise channels.',
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track user scroll so tick sound does not play on page load
    const handleScroll = () => {
      hasUserScrolledRef.current = true;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Under prefers-reduced-motion, show natural static cards without pinning
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

      // Setup Card Cover / Stack Storytelling on both Desktop & Mobile
      // Next card covers the current card as user scrolls, with current card receding behind
      const setupCoverAnimation = (isMobile: boolean) => {
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length < 6) return;

        // Base Initial States:
        // Card 0 is 100% visible at scale 1, y: 0
        // Cards 1-5 begin positioned slightly lower with scale 0.98, ready to cover
        cards.forEach((card, i) => {
          gsap.set(card, {
            zIndex: (i + 1) * 10,
            opacity: i === 0 ? 1 : 0,
            scale: i === 0 ? 1 : 0.98,
            y: i === 0 ? 0 : isMobile ? 32 : 48,
            pointerEvents: i === 0 ? 'auto' : 'none',
          });
        });

        // Compact storytelling track distance:
        // Desktop: ~2.3x innerHeight (approx 230vh)
        // Mobile: ~1.9x innerHeight (approx 190vh)
        const scrollMultiplier = isMobile ? 1.9 : 2.3;

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
              // Map progress across 6 discrete operational states (0 through 5)
              const newIndex = Math.min(5, Math.floor(p * 5.999));

              if (newIndex !== prevIndexRef.current) {
                if (window.innerWidth >= 1024 && !prefersReducedMotion() && hasUserScrolledRef.current) {
                  tactileAudio.playTick();
                }
                prevIndexRef.current = newIndex;
                setActivePillarIndex(newIndex);
              }
            },
          },
        });

        scrollTriggerInstanceRef.current = scrubTl.scrollTrigger || null;

        // Build 5 Sequential Cover Transitions:
        // Card 01 -> Card 02 covers Card 01
        // Card 02 -> Card 03 covers Card 02
        // Card 03 -> Card 04 covers Card 03
        // Card 04 -> Card 05 covers Card 04
        // Card 05 -> Card 06 covers Card 05
        for (let i = 0; i < 5; i++) {
          const startTime = i * 1.0;
          const curCard = cards[i];
          const nextCard = cards[i + 1];

          // 1. Current card recedes slightly backward and upward
          scrubTl.to(
            curCard,
            {
              y: isMobile ? -10 : -14,
              scale: 0.965,
              opacity: 0.35,
              duration: 0.75,
              ease: 'power1.inOut',
              onComplete: () => {
                gsap.set(curCard, { pointerEvents: 'none' });
              },
              onReverseComplete: () => {
                gsap.set(curCard, { pointerEvents: 'auto' });
              },
            },
            startTime
          );

          // 2. Next card moves up over the previous card (higher z-index covers it)
          scrubTl.fromTo(
            nextCard,
            {
              y: isMobile ? 32 : 48,
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
            startTime + 0.05
          );

          // Small quiet plateau between transitions so the active card breathes
          scrubTl.to({}, { duration: 0.25 }, startTime + 0.75);
        }
      };

      // Desktop Configuration (>= 1024px)
      mm.add('(min-width: 1024px)', () => {
        setupCoverAnimation(false);
      });

      // Mobile & Tablet Configuration (< 1024px)
      mm.add('(max-width: 1023px)', () => {
        setupCoverAnimation(true);
      });
    }, sectionRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  // Jump smoothly to a specific operational pillar when clicked
  const handleIndexClick = (idx: number) => {
    hasUserScrolledRef.current = true;
    setActivePillarIndex(idx);
    prevIndexRef.current = idx;

    if (window.innerWidth >= 1024 && !prefersReducedMotion()) {
      tactileAudio.playTick();
    }

    const st = scrollTriggerInstanceRef.current;
    if (st) {
      const targetProgress = (idx + 0.15) / 6;
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
      id="six-areas"
      className="relative bg-white border-b border-[#E9E4F1]"
      aria-label="Six Essential Business Operations Storytelling"
    >
      {/* ========================================================================= */}
      {/* 1. INTERACTION STORYTELLING VIEWPORT (Desktop + Mobile Unified Architecture) */}
      {/* ========================================================================= */}
      {!isReduced ? (
        <div
          ref={stickyContainerRef}
          className="w-full flex flex-col justify-between py-6 sm:py-8 lg:py-10 min-h-[100svh] lg:min-h-[calc(100vh-4.5rem)]"
        >
          <Container size="xl" className="h-full flex flex-col justify-between space-y-4 sm:space-y-6">
            {/* ----------------------------------------------------------------- */}
            {/* SECTION HEADING & MINIMAL ACTIVE INDEX                           */}
            {/* ----------------------------------------------------------------- */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#E9E4F1] pb-3 sm:pb-4 gap-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#FAF8FC] border border-[#E9E4F1] text-[11px] font-mono text-[#6D57A5] font-bold shadow-2xs">
                  <Layers className="w-3.5 h-3.5 text-[#17B681]" />
                  <span>{t('sixAreas.eyebrow')}</span>
                </div>
                <h2 className="text-lg sm:text-2xl xl:text-3xl font-extrabold text-[#1F1B2D] font-heading tracking-tight">
                  {t('sixAreas.title')}{' '}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6D57A5] to-[#17B681]">
                    {t('sixAreas.titleGradient')}
                  </span>
                </h2>
              </div>

              {/* Minimal 6-Item Secondary Index (01 ●, 02, 03, 04, 05, 06) */}
              <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-[#FAF8FC] border border-[#E9E4F1] rounded-2xl w-fit self-start sm:self-auto">
                {PILLARS.map((p, idx) => {
                  const isActive = idx === activePillarIndex;
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => handleIndexClick(idx)}
                      className={`px-2 sm:px-2.5 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-white text-[#1F1B2D] font-bold shadow-2xs border border-[#6D57A5]/30'
                          : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-white/50'
                      }`}
                      aria-label={`Jump to pillar ${p.number}`}
                    >
                      <span className={isActive ? 'text-[#6D57A5] font-extrabold' : 'opacity-60'}>
                        {p.number}
                      </span>
                      <span className="hidden md:inline text-[11px] truncate max-w-[70px]">
                        {p.shortName}
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
            {/* STACKED CARD COVER STAGE (ONE STICKY VIEWPORT)                   */}
            {/* Each card has zIndex (i+1)*10. Next card covers previous card.   */}
            {/* ----------------------------------------------------------------- */}
            <div className="relative w-full h-[470px] sm:h-[490px] lg:h-[480px] xl:h-[500px]">
              {PILLARS.map((p, idx) => {
                const Icon = p.icon;
                const isInitial = idx === 0;

                return (
                  <div
                    key={p.id}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    style={{
                      zIndex: (idx + 1) * 10,
                      opacity: isInitial ? 1 : 0,
                      transform: isInitial ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 48px, 0) scale(0.98)',
                    }}
                    className={`absolute inset-0 rounded-3xl bg-white border-2 transition-shadow will-change-[transform,opacity] ${
                      p.isClosingPillar
                        ? 'border-[#17B681]/40 shadow-2xl shadow-[#17B681]/10'
                        : 'border-[#E9E4F1] shadow-xl shadow-[#6D57A5]/8'
                    } flex flex-col justify-between overflow-hidden p-5 sm:p-7 xl:p-8`}
                  >
                    {/* Top Window Bar: Number, Chrome, Title, Live Status */}
                    <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#E9E4F1]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold shrink-0">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#6D57A5]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-mono font-bold text-[#6D57A5]">
                              {p.number}
                            </span>
                            <span className="text-xs text-[#625D6B] hidden sm:inline">·</span>
                            <span className="text-[10px] sm:text-xs font-mono font-bold text-[#6D57A5] uppercase tracking-wider hidden sm:inline">
                              {t(p.subtitleKey as any)}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-xl xl:text-2xl font-extrabold text-[#1F1B2D] font-heading leading-tight">
                            {t(p.titleKey as any)}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
                          <span>{t(p.tagKey as any)}</span>
                        </span>
                      </div>
                    </div>

                    {/* Operational Summary Description */}
                    <p className="text-xs sm:text-sm text-[#625D6B] leading-relaxed my-2 sm:my-3">
                      {t(p.descKey as any)}
                    </p>

                    {/* Operational Transformation Pipeline Flow */}
                    <div className="p-3 sm:p-3.5 bg-[#FAF8FC] border border-[#E9E4F1] rounded-2xl space-y-1.5 my-1 sm:my-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                          Operational Transformation Flow
                        </span>
                        <span className="text-[10px] font-mono text-[#625D6B] hidden sm:inline">
                          {t(p.flowKey as any)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono font-semibold text-[#1F1B2D]">
                        {p.flowSteps.map((step, sIdx) => (
                          <React.Fragment key={sIdx}>
                            <span className="truncate max-w-[70px] sm:max-w-none">{step}</span>
                            {sIdx < p.flowSteps.length - 1 && (
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
                      {p.capabilities.map((cap, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#E9E4F1] space-y-0.5 sm:space-y-1 shadow-2xs hover:border-[#6D57A5]/30 transition-colors"
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

                    {/* Footer Data Continuity Strip */}
                    <div className="pt-2.5 sm:pt-3 border-t border-[#E9E4F1] flex items-center justify-between text-xs text-[#625D6B]">
                      <div className="flex items-center gap-2 text-[#129267] font-semibold text-[11px]">
                        {p.isClosingPillar ? (
                          <ShieldCheck className="w-3.5 h-3.5 text-[#17B681]" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681]" />
                        )}
                        <span>Synchronized with Central Core</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#6D57A5] hidden sm:flex">
                        <Sparkles className="w-3 h-3 text-[#17B681]" />
                        <span>Zero Redundant Entries · Unified Ledger Post</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Continuity Handoff: Smooth scroll guide leading into Connected ERP */}
            <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-[#E9E4F1] text-xs text-[#625D6B]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#17B681]" />
                <span className="font-semibold text-[#1F1B2D]">
                  {t('sixAreas.allActive')}
                </span>
                <span className="hidden sm:inline">— Finance converges directly into the central engine</span>
              </div>
              <a
                href="#connected-system"
                className="inline-flex items-center gap-1 font-mono font-bold text-[#6D57A5] hover:text-[#554385] transition-colors"
              >
                <span>{t('sixAreas.nextConnected')}</span>
                <ArrowUpRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              </a>
            </div>
          </Container>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. ACCESSIBLE REDUCED MOTION FLOW (When reduced-motion is requested)      */
        /* ========================================================================= */
        <div className="py-14 sm:py-20">
          <Container size="xl" className="space-y-8">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8FC] border border-[#E9E4F1] text-[11px] font-mono text-[#6D57A5] font-bold shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-[#17B681]" />
                <span>{t('sixAreas.eyebrow')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading leading-tight">
                {t('sixAreas.title')}{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6D57A5] to-[#17B681]">
                  {t('sixAreas.titleGradient')}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#625D6B]">
                {t('sixAreas.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.id}
                    className="p-6 rounded-2xl bg-white border border-[#E9E4F1] shadow-xs space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-bold text-[#6D57A5]">
                          {p.number}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E4F8F0] text-[#129267]">
                        {t(p.tagKey as any)}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#1F1B2D] font-heading">
                      {t(p.titleKey as any)}
                    </h3>

                    <p className="text-xs text-[#625D6B] leading-relaxed">
                      {t(p.descKey as any)}
                    </p>

                    <div className="pt-2 border-t border-[#E9E4F1] flex items-center justify-between text-xs text-[#129267]">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681]" />
                        <span>Active in Core</span>
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

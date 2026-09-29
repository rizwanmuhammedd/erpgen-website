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
  const desktopPinContainerRef = useRef<HTMLDivElement>(null);
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

    // Track user scroll so tactile sound does not play on page load or initial render
    const handleScroll = () => {
      hasUserScrolledRef.current = true;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Under prefers-reduced-motion or mobile, skip pinning animation
    if (prefersReducedMotion() || window.innerWidth < 1024) {
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }

    const sectionEl = sectionRef.current;
    const pinContainerEl = desktopPinContainerRef.current;
    if (!sectionEl || !pinContainerEl) return;

    const ctx = gsap.context(() => {
      // Robust GSAP ScrollTrigger Pinning:
      // Uses a compact, natural scroll distance (~1.5x innerHeight)
      // Eliminates broken CSS sticky, eliminates 300vh empty tracks, prevents blank viewports
      const st = ScrollTrigger.create({
        trigger: sectionEl,
        pin: pinContainerEl,
        pinSpacing: true,
        start: 'top 80px',
        end: () => `+=${Math.round(window.innerHeight * 1.5)}`,
        scrub: 0.4,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // Map progress across 6 discrete operational states (0 through 5)
          const newIndex = Math.min(5, Math.floor(progress * 5.999));

          if (newIndex !== prevIndexRef.current) {
            if (hasUserScrolledRef.current && window.innerWidth >= 1024 && !prefersReducedMotion()) {
              tactileAudio.playTick();
            }
            prevIndexRef.current = newIndex;
            setActivePillarIndex(newIndex);
          }
        },
      });

      scrollTriggerInstanceRef.current = st;
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
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const activePillar = PILLARS[activePillarIndex];

  return (
    <section
      ref={sectionRef}
      id="six-areas"
      className="relative bg-white border-b border-[#E9E4F1]"
      aria-label="The Six Operational Pillars Storytelling"
    >
      {/* ========================================================================= */}
      {/* DESKTOP VIEW (>= 1024px): Pinned Operational Workspace Storytelling       */}
      {/* ========================================================================= */}
      <div
        ref={desktopPinContainerRef}
        className="hidden lg:flex flex-col justify-between w-full min-h-[calc(100vh-5rem)] py-8 xl:py-10"
      >
        <Container size="xl" className="h-full flex flex-col justify-between space-y-6">
          {/* Section Header: Eyebrow, Title & Active State Status */}
          <div className="flex items-center justify-between border-b border-[#E9E4F1] pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8FC] border border-[#E9E4F1] text-[11px] font-mono text-[#6D57A5] font-bold shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-[#17B681]" />
                <span>{t('sixAreas.eyebrow')}</span>
              </div>
              <h2 className="text-xl xl:text-2xl font-extrabold text-[#1F1B2D] font-heading tracking-tight">
                {t('sixAreas.title')}{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6D57A5] to-[#17B681]">
                  {t('sixAreas.titleGradient')}
                </span>
              </h2>
            </div>

            {/* Active Pillar Pill & Progress */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-[#FAF8FC] border border-[#E9E4F1] text-[#625D6B] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#17B681] animate-pulse" />
                <span className="text-[#1F1B2D] font-bold">
                  0{activePillarIndex + 1} / 06
                </span>
                <span className="text-[#6D57A5]">· {activePillar.shortName}</span>
              </span>
              <span className="text-[#6D57A5] text-[11px] font-semibold hidden xl:inline">
                {t('sixAreas.activePillarPrompt')} ↓
              </span>
            </div>
          </div>

          {/* Two-Column Storytelling Composition: Left Narrative + Right Operational Workspace */}
          <div className="grid grid-cols-12 gap-8 xl:gap-12 items-center flex-1 my-auto">
            {/* ----------------------------------------------------------------- */}
            {/* LEFT COLUMN: Secondary Active Index + Pillar Details + Tags       */}
            {/* ----------------------------------------------------------------- */}
            <div className="col-span-5 space-y-6">
              {/* Secondary 6-Item Active Index (01 ●, 02, 03, 04, 05, 06) */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#625D6B] font-bold block ms-1">
                  Operational Architecture Index
                </span>
                <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-[#FAF8FC] border border-[#E9E4F1] rounded-2xl">
                  {PILLARS.map((p, idx) => {
                    const isActive = idx === activePillarIndex;
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => handleIndexClick(idx)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-mono transition-all text-start cursor-pointer flex items-center justify-between ${
                          isActive
                            ? 'bg-white text-[#1F1B2D] font-bold shadow-2xs border border-[#6D57A5]/30'
                            : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-white/50'
                        }`}
                        aria-label={`Jump to pillar ${p.number} ${p.shortName}`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span className={isActive ? 'text-[#6D57A5] font-extrabold' : 'opacity-60'}>
                            {p.number}
                          </span>
                          <span className="truncate">{p.shortName}</span>
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Pillar Narrative: Immediately visible on initial load */}
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl xl:text-4xl font-black font-mono text-[#6D57A5]">
                    {activePillar.number}
                  </span>
                  <div className="h-6 w-px bg-[#E9E4F1]" />
                  <span className="text-xs font-mono font-bold text-[#6D57A5] uppercase tracking-wider">
                    {t(activePillar.subtitleKey as any)}
                  </span>
                </div>

                <h3 className="text-2xl xl:text-3xl font-extrabold text-[#1F1B2D] font-heading leading-tight tracking-tight">
                  {t(activePillar.titleKey as any)}
                </h3>

                <p className="text-xs xl:text-sm text-[#625D6B] leading-relaxed max-w-md">
                  {t(activePillar.descKey as any)}
                </p>
              </div>

              {/* Small Capability Labels */}
              <div className="space-y-2 pt-1">
                <div className="flex flex-wrap gap-2">
                  {activePillar.capabilityLabels.map((label, lIdx) => (
                    <span
                      key={lIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-xs font-mono font-medium text-[#1F1B2D]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#17B681]" />
                      <span>{label}</span>
                    </span>
                  ))}
                </div>

                {/* Core Stream Tag */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#E4F8F0] border border-[#17B681]/30 text-[11px] font-mono font-bold text-[#129267]">
                    <CheckCircle2 className="w-3 h-3 text-[#17B681]" />
                    <span>{t(activePillar.tagKey as any)}</span>
                  </span>
                  <span className="text-xs font-mono text-[#625D6B]">
                    {t(activePillar.flowKey as any)}
                  </span>
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* RIGHT COLUMN: The Large Clean ERPGen Operational Workspace        */}
            {/* (The main visual focus, morphing seamlessly across modes)        */}
            {/* ----------------------------------------------------------------- */}
            <div className="col-span-7">
              <div className="rounded-3xl bg-white border-2 border-[#E9E4F1] shadow-xl shadow-[#6D57A5]/5 overflow-hidden transition-all duration-300">
                {/* Window Chrome Titlebar */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-[#FAF8FC] border-b border-[#E9E4F1] text-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/40 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#17B681]/40 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/20 inline-block" />
                    </div>
                    <span className="font-mono text-[11px] text-[#625D6B] ms-2">
                      ERPGen Operational Workspace
                    </span>
                    <span className="font-mono text-[10px] text-[#6D57A5] font-bold">
                      · 0{activePillarIndex + 1} — {activePillar.id.toUpperCase()}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
                    <span>Live Core Sync</span>
                  </span>
                </div>

                {/* Transforming Operational Stage: 6 Seamless Operational Modes */}
                <div className="relative min-h-[390px] xl:min-h-[410px] p-6 xl:p-8">
                  {PILLARS.map((p, idx) => {
                    const Icon = p.icon;
                    const isActive = idx === activePillarIndex;
                    const isPast = idx < activePillarIndex;

                    return (
                      <div
                        key={p.id}
                        className={`absolute inset-x-6 xl:inset-x-8 top-6 xl:top-8 bottom-6 xl:bottom-8 flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive
                            ? 'opacity-100 scale-100 translate-y-0 z-10 pointer-events-auto'
                            : isPast
                            ? 'opacity-0 scale-[0.97] -translate-y-3 z-0 pointer-events-none'
                            : 'opacity-0 scale-[1.02] translate-y-4 z-0 pointer-events-none'
                        }`}
                      >
                        <div className="space-y-4">
                          {/* Workspace Operational Header */}
                          <div className="flex items-center justify-between pb-3 border-b border-[#E9E4F1]">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold">
                                <Icon className="w-5 h-5 text-[#6D57A5]" />
                              </div>
                              <div>
                                <h4 className="text-base xl:text-lg font-extrabold text-[#1F1B2D] font-heading">
                                  {p.workspaceHeading}
                                </h4>
                                <p className="text-xs text-[#625D6B]">
                                  {p.workspaceSubheading}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-mono font-extrabold text-[#6D57A5] bg-[#FAF8FC] px-2.5 py-1 rounded-lg border border-[#E9E4F1]">
                              0{idx + 1}
                            </span>
                          </div>

                          {/* Structural Operational Pipeline Flow */}
                          <div className="p-3 bg-[#FAF8FC] border border-[#E9E4F1] rounded-xl space-y-1.5">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold block">
                              Operational Transformation Pipeline
                            </span>
                            <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-[#1F1B2D]">
                              {p.flowSteps.map((step, sIdx) => (
                                <React.Fragment key={sIdx}>
                                  <span className="truncate">{step}</span>
                                  {sIdx < p.flowSteps.length - 1 && (
                                    <ArrowRight
                                      className={`w-3.5 h-3.5 text-[#17B681] shrink-0 ${
                                        isRtl ? 'rotate-180' : ''
                                      }`}
                                    />
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>

                          {/* 3 Structural Conceptual Capability Cards (Zero Fake Data) */}
                          <div className="grid grid-cols-3 gap-3 pt-1">
                            {p.capabilities.map((cap, cIdx) => (
                              <div
                                key={cIdx}
                                className="p-3 rounded-xl bg-white border border-[#E9E4F1] space-y-1 shadow-2xs hover:border-[#6D57A5]/30 transition-colors"
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
                        </div>

                        {/* Footer Data Continuity Strip */}
                        <div className="pt-3 border-t border-[#E9E4F1] flex items-center justify-between text-xs text-[#625D6B]">
                          <div className="flex items-center gap-2 text-[#129267] font-semibold text-[11px]">
                            {p.isClosingPillar ? (
                              <ShieldCheck className="w-3.5 h-3.5 text-[#17B681]" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681]" />
                            )}
                            <span>Synchronized with Central Core</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#6D57A5]">
                            <Sparkles className="w-3 h-3 text-[#17B681]" />
                            <span>Zero Redundant Entries · Single Ledger Post</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Continuity Handoff: Smooth scroll guide leading into Connected ERP */}
          <div className="flex items-center justify-between pt-3 border-t border-[#E9E4F1] text-xs text-[#625D6B]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#17B681]" />
              <span className="font-semibold text-[#1F1B2D]">
                {t('sixAreas.allActive')}
              </span>
              <span>— Finance converges directly into the central engine</span>
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

      {/* ========================================================================= */}
      {/* MOBILE & TABLET VIEW (< 1024px): Natural Stacked Cards (Zero Scroll-Jack)  */}
      {/* ========================================================================= */}
      <div className="block lg:hidden py-14 sm:py-20">
        <Container size="xl" className="space-y-8 sm:space-y-12">
          {/* Header */}
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
            <p className="text-xs sm:text-sm text-[#625D6B] leading-relaxed">
              {t('sixAreas.description')}
            </p>
          </div>

          {/* 6 Clean Stacked Cards with Immediate Readability */}
          <div className="space-y-4">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  className={`p-5 rounded-2xl bg-[#FAF8FC] border transition-all ${
                    p.isClosingPillar
                      ? 'border-[#17B681]/40 shadow-xs'
                      : 'border-[#E9E4F1]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-white border border-[#E9E4F1] flex items-center justify-center text-[#6D57A5]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#6D57A5] uppercase block">
                          Pillar {p.number}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-[#1F1B2D] font-heading">
                          {t(p.titleKey as any)}
                        </h4>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white border border-[#E9E4F1] text-[#17B681]">
                      {t(p.tagKey as any)}
                    </span>
                  </div>

                  <p className="text-xs text-[#625D6B] leading-relaxed mb-3">
                    {t(p.descKey as any)}
                  </p>

                  {/* Mobile Flow Steps */}
                  <div className="p-2.5 bg-white rounded-xl border border-[#E9E4F1] mb-3">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold block mb-1">
                      Transformation Pipeline
                    </span>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#1F1B2D]">
                      {p.flowSteps.map((step, sIdx) => (
                        <React.Fragment key={sIdx}>
                          <span className="truncate max-w-[65px]">{step}</span>
                          {sIdx < p.flowSteps.length - 1 && (
                            <ArrowRight
                              className={`w-2.5 h-2.5 text-[#17B681] shrink-0 ${
                                isRtl ? 'rotate-180' : ''
                              }`}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Capability Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.capabilityLabels.map((label, lIdx) => (
                      <span
                        key={lIdx}
                        className="px-2 py-0.5 rounded-md bg-white border border-[#E9E4F1] text-[10px] font-mono text-[#1F1B2D]"
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  {/* Footer Continuity */}
                  <div className="pt-2 border-t border-[#E9E4F1]/60 flex items-center justify-between text-[11px] font-mono text-[#129267]">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681]" />
                      <span>{t(p.flowKey as any)}</span>
                    </span>
                    <span className="text-[#6D57A5] text-[10px]">
                      Active in Core
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Footer Callout */}
          <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start">
            <div>
              <p className="text-xs font-bold text-[#1F1B2D]">
                {t('sixAreas.allActive')}
              </p>
              <p className="text-[11px] text-[#625D6B]">
                Finance converges directly into the connected core.
              </p>
            </div>
            <a
              href="#connected-system"
              className="text-xs font-mono font-bold text-[#6D57A5] inline-flex items-center gap-1 shrink-0"
            >
              <span>{t('sixAreas.nextConnected')}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </a>
          </div>
        </Container>
      </div>
    </section>
  );
};

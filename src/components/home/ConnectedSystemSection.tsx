import React, { useEffect, useRef, useState } from 'react';
import {
  ShoppingBag,
  FileText,
  Package,
  BarChart3,
  ArrowRightLeft,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Layers,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

interface OperationalStep {
  step: number;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  activeNode: 'pos' | 'core' | 'inventory' | 'invoice' | 'reports';
  telemetry: {
    node: string;
    status: string;
    payload: string;
    badge: string;
  };
}

export const ConnectedSystemSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const steps: OperationalStep[] = [
    {
      step: 1,
      id: 'pos',
      title: 'Point-of-Sale Register',
      subtitle: 'Step 01 · Front Counter Checkout',
      description:
        'Transactions are recorded directly at checkout registers. Sales are captured accurately across all your active customer counters.',
      activeNode: 'pos',
      telemetry: {
        node: 'Front Counter POS',
        status: 'Transaction Recorded',
        payload: 'Active Register · Payment Settled',
        badge: 'Counter Active',
      },
    },
    {
      step: 2,
      id: 'core',
      title: 'ERPGen Connected Platform',
      subtitle: 'Step 02 · Shared Operational Core',
      description:
        'Every sale automatically connects with the central platform, eliminating siloed information and manual reconciliations between store and office.',
      activeNode: 'core',
      telemetry: {
        node: 'Central Platform Hub',
        status: 'Data Layer Connected',
        payload: 'Operational continuity across all modules',
        badge: 'Core Connected',
      },
    },
    {
      step: 3,
      id: 'inventory',
      title: 'Real-Time Inventory Adjustment',
      subtitle: 'Step 03 · Stock Continuity',
      description:
        'Stock levels update immediately across all sales channels. Deductions happen in real time to prevent overselling and track replenishment needs.',
      activeNode: 'inventory',
      telemetry: {
        node: 'Inventory Registry',
        status: 'Stock Balances Updated',
        payload: 'Quantities reconciled automatically across locations',
        badge: 'Stock Updated',
      },
    },
    {
      step: 4,
      id: 'invoice',
      title: 'Automated Invoicing & Ledgers',
      subtitle: 'Step 04 · Back-Office Accounting',
      description:
        'Invoices, tax calculations, and sales histories are logged without redundant data entry, providing complete financial transparency for your business.',
      activeNode: 'invoice',
      telemetry: {
        node: 'Invoicing & Accounting',
        status: 'Financial Ledger Posted',
        payload: 'Tax calculations and sales reports ready for export',
        badge: 'Finances Synced',
      },
    },
  ];

  const currentStep = steps[activeStepIndex];

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Desktop: Pinned Scroll Storytelling via ScrollTrigger matchMedia
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: pinContainerRef.current,
            start: 'top top+=80',
            end: '+=1300',
            scrub: 0.4,
            onUpdate: (self) => {
              const stepIndex = Math.min(3, Math.floor(self.progress * 4));
              setActiveStepIndex(stepIndex);
            },
          },
        });

        // Stage 1: POS node emerges into position
        tl.fromTo(
          '.node-pos',
          { y: 25, opacity: 0.4, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, ease: 'power2.out' },
          0
        );

        // Stage 2: Central core expands with radial sync
        tl.fromTo(
          '.node-core',
          { scale: 0.96 },
          { scale: 1.04, ease: 'power2.out' },
          0.25
        );

        // Stage 3: Live stock node moves into place
        tl.fromTo(
          '.node-inventory',
          { y: 25, opacity: 0.4, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, ease: 'power2.out' },
          0.5
        );

        // Stage 4: Invoicing and reports lock together
        tl.fromTo(
          ['.node-invoice', '.node-reports'],
          { y: 25, opacity: 0.4, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.1, ease: 'power2.out' },
          0.75
        );
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined' || !narrativeRef.current) return;
    gsap.fromTo(
      narrativeRef.current,
      { opacity: 0.65, y: 6 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
  }, [activeStepIndex]);

  return (
    <section
      ref={sectionRef}
      id="connected-system"
      className="py-16 sm:py-24 relative overflow-hidden bg-[#FAF8FC] border-b border-[#E9E4F1]"
      aria-label="Connected ERP Architecture Storytelling"
    >
      <div ref={pinContainerRef} className="w-full">
        <Container size="xl" className="space-y-10 lg:space-y-12">
          {/* Section Header */}
          <SectionHeading
            eyebrow="THE CONNECTED ADVANTAGE"
            title="Every operation."
            titleGradient="One connected system."
            description="ERPGen connects the critical engines your business depends on, so every counter checkout, invoice, and stock change instantly reflects in one synchronized operational picture."
          />

          {/* Desktop & Mobile Step Tabs Bar */}
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
            {steps.map((st, idx) => {
              const isActive = activeStepIndex === idx;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer focus-ring-purple border ${
                    isActive
                      ? 'bg-[#6D57A5] text-white border-[#6D57A5] shadow-md shadow-[#6D57A5]/20 -translate-y-0.5'
                      : 'bg-white text-[#625D6B] border-[#E9E4F1] hover:border-[#6D57A5]/40 hover:text-[#1F1B2D]'
                  }`}
                  aria-pressed={isActive}
                >
                  <span
                    className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-white text-[#6D57A5]' : 'bg-[#FAF8FC] text-[#625D6B]'
                    }`}
                  >
                    0{st.step}
                  </span>
                  <span>{st.title}</span>
                </button>
              );
            })}
          </div>

          {/* Main Storytelling Visual Stage: Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Narrative Column (approx 5 cols) */}
            <div
              ref={narrativeRef}
              className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-[#E9E4F1] shadow-xs space-y-6 will-change-[transform,opacity]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#17B681] font-bold uppercase tracking-wider">
                    {currentStep.subtitle}
                  </span>
                  <Badge variant="brand" size="sm">
                    {currentStep.telemetry.badge}
                  </Badge>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#1F1B2D] font-heading leading-tight">
                  {currentStep.title}
                </h3>

                <p className="text-sm text-[#625D6B] leading-relaxed">
                  {currentStep.description}
                </p>
              </div>

              {/* Operational Status HUD */}
              <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1F1B2D] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#17B681] animate-pulse" />
                    {currentStep.telemetry.node}
                  </span>
                  <span className="text-[11px] text-[#6D57A5] font-semibold">
                    {currentStep.telemetry.status}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E9E4F1] text-xs text-[#1F1B2D] flex items-center justify-between">
                  <span className="truncate">{currentStep.telemetry.payload}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0 ml-2" />
                </div>
              </div>

              {/* Progress Tracker Footer */}
              <div className="pt-4 border-t border-[#E9E4F1] flex items-center justify-between text-xs text-[#625D6B]">
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-[#17B681] animate-spin" style={{ animationDuration: '8s' }} />
                  <span>Scroll or click tabs to explore continuity</span>
                </div>
                <span className="font-mono text-[11px] font-bold text-[#6D57A5]">
                  Stage {currentStep.step} of 4
                </span>
              </div>
            </div>

            {/* Right Visual Architecture Canvas (approx 7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-[#E9E4F1] shadow-[0_4px_20px_rgba(109,87,165,0.04),0_1px_3px_rgba(31,27,45,0.04)] flex flex-col justify-between space-y-6 relative overflow-hidden">
              {/* Canvas Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E9E4F1]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold">
                    <ArrowRightLeft className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1F1B2D] font-heading">
                      ERPGen Connected Platform
                    </h4>
                    <p className="text-[10px] text-[#625D6B]">Shared Operational Data Layer</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
                  Live Sync
                </span>
              </div>

              {/* Central Synchronized Architecture Diagram */}
              <div className="relative py-4 sm:py-6">
                {/* SVG Animated Connector Beams (Desktop & Tablet) */}
                <svg
                  className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
                  viewBox="0 0 800 240"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="beamPurpleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6D57A5" />
                      <stop offset="100%" stopColor="#6D57A5" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="beamEmeraldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#17B681" />
                      <stop offset="100%" stopColor="#17B681" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  {/* Base Inactive Guides */}
                  <path d="M 400 88 C 400 135, 100 130, 100 178" stroke="#E9E4F1" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M 400 88 C 400 135, 300 130, 300 178" stroke="#E9E4F1" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M 400 88 C 400 135, 500 130, 500 178" stroke="#E9E4F1" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M 400 88 C 400 135, 700 130, 700 178" stroke="#E9E4F1" strokeWidth="1.5" strokeDasharray="4 4" />

                  {/* Active Dynamic Beams */}
                  {/* Beam 0: To POS */}
                  <path
                    d="M 400 88 C 400 135, 100 130, 100 178"
                    stroke="#6D57A5"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                    style={{
                      strokeDasharray: 220,
                      strokeDashoffset: activeStepIndex >= 0 ? 0 : 220,
                      opacity: activeStepIndex >= 0 ? 1 : 0.1,
                    }}
                  />

                  {/* Beam 1: To Inventory */}
                  <path
                    d="M 400 88 C 400 135, 300 130, 300 178"
                    stroke="#17B681"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                    style={{
                      strokeDasharray: 180,
                      strokeDashoffset: activeStepIndex >= 2 ? 0 : 180,
                      opacity: activeStepIndex >= 2 ? 1 : 0.1,
                    }}
                  />

                  {/* Beam 2: To Invoice */}
                  <path
                    d="M 400 88 C 400 135, 500 130, 500 178"
                    stroke="#6D57A5"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                    style={{
                      strokeDasharray: 180,
                      strokeDashoffset: activeStepIndex >= 3 ? 0 : 180,
                      opacity: activeStepIndex >= 3 ? 1 : 0.1,
                    }}
                  />

                  {/* Beam 3: To Reports */}
                  <path
                    d="M 400 88 C 400 135, 700 130, 700 178"
                    stroke="#17B681"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                    style={{
                      strokeDasharray: 220,
                      strokeDashoffset: activeStepIndex >= 3 ? 0 : 220,
                      opacity: activeStepIndex >= 3 ? 1 : 0.1,
                    }}
                  />

                  {/* Central Node Output Hub Indicator */}
                  <circle cx="400" cy="88" r="4" fill="#6D57A5" className="animate-ping opacity-40" />
                  <circle cx="400" cy="88" r="3" fill="#6D57A5" />

                  {/* Receiving Node Endpoints */}
                  <circle
                    cx="100"
                    cy="178"
                    r="3"
                    fill={activeStepIndex >= 0 ? '#6D57A5' : '#E9E4F1'}
                    className="transition-colors duration-300"
                  />
                  <circle
                    cx="300"
                    cy="178"
                    r="3"
                    fill={activeStepIndex >= 2 ? '#17B681' : '#E9E4F1'}
                    className="transition-colors duration-300"
                  />
                  <circle
                    cx="500"
                    cy="178"
                    r="3"
                    fill={activeStepIndex >= 3 ? '#6D57A5' : '#E9E4F1'}
                    className="transition-colors duration-300"
                  />
                  <circle
                    cx="700"
                    cy="178"
                    r="3"
                    fill={activeStepIndex >= 3 ? '#17B681' : '#E9E4F1'}
                    className="transition-colors duration-300"
                  />
                </svg>

                {/* Central Data Layer Node */}
                <div
                  className={`node-core mx-auto max-w-sm p-4 rounded-2xl border transition-all duration-500 text-center relative z-20 will-change-transform ${
                    currentStep.activeNode === 'core' || currentStep.step === 4
                      ? 'bg-white border-[#17B681] shadow-lg shadow-[#17B681]/15 ring-2 ring-[#17B681] scale-105'
                      : 'bg-[#FAF8FC] border-[#E9E4F1]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E9E4F1] text-[#6D57A5] mx-auto flex items-center justify-center font-bold shadow-xs">
                    <Layers className="w-5 h-5 text-[#6D57A5]" />
                  </div>
                  <h5 className="text-sm font-bold text-[#1F1B2D] font-heading mt-2">
                    ERPGen Connected Core
                  </h5>
                  <p className="text-[11px] text-[#625D6B] mt-0.5">
                    Central Operational Data Layer
                  </p>
                </div>

                {/* Surrounding Connected Engine Nodes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 sm:mt-14 relative z-10">
                  {/* 1. POS Terminal */}
                  <div
                    className={`node-pos p-3 rounded-xl border transition-all duration-300 will-change-transform ${
                      currentStep.activeNode === 'pos' || currentStep.step >= 1
                        ? 'bg-white border-[#6D57A5]/40 shadow-sm ring-1 ring-[#6D57A5] translate-y-[-2px]'
                        : 'bg-[#FAF8FC] border-[#E9E4F1] opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-[#6D57A5]" />
                      <span className="text-xs font-bold text-[#1F1B2D]">POS Register</span>
                    </div>
                    <span className="text-[10px] text-[#17B681] font-semibold mt-1 block">
                      {currentStep.step >= 1 ? 'Sale Recorded' : 'Ready'}
                    </span>
                  </div>

                  {/* 2. Live Inventory */}
                  <div
                    className={`node-inventory p-3 rounded-xl border transition-all duration-300 will-change-transform ${
                      currentStep.activeNode === 'inventory' || currentStep.step >= 3
                        ? 'bg-white border-[#17B681]/40 shadow-sm ring-1 ring-[#17B681] translate-y-[-2px]'
                        : 'bg-[#FAF8FC] border-[#E9E4F1] opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#17B681]" />
                      <span className="text-xs font-bold text-[#1F1B2D]">Live Stock</span>
                    </div>
                    <span className="text-[10px] text-[#129267] font-semibold mt-1 block">
                      {currentStep.step >= 3 ? 'Stock Adjusted' : 'Ready'}
                    </span>
                  </div>

                  {/* 3. Invoicing */}
                  <div
                    className={`node-invoice p-3 rounded-xl border transition-all duration-300 will-change-transform ${
                      currentStep.activeNode === 'invoice' || currentStep.step >= 4
                        ? 'bg-white border-[#6D57A5]/40 shadow-sm ring-1 ring-[#6D57A5] translate-y-[-2px]'
                        : 'bg-[#FAF8FC] border-[#E9E4F1] opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#6D57A5]" />
                      <span className="text-xs font-bold text-[#1F1B2D]">Invoicing</span>
                    </div>
                    <span className="text-[10px] text-[#6D57A5] font-semibold mt-1 block">
                      {currentStep.step >= 4 ? 'Invoice Logged' : 'Ready'}
                    </span>
                  </div>

                  {/* 4. Reports */}
                  <div
                    className={`node-reports p-3 rounded-xl border transition-all duration-300 will-change-transform ${
                      currentStep.step === 4
                        ? 'bg-white border-[#17B681]/40 shadow-sm ring-1 ring-[#17B681] translate-y-[-2px]'
                        : 'bg-[#FAF8FC] border-[#E9E4F1] opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[#17B681]" />
                      <span className="text-xs font-bold text-[#1F1B2D]">Reports</span>
                    </div>
                    <span className="text-[10px] text-[#129267] font-semibold mt-1 block">
                      {currentStep.step === 4 ? 'Synchronized' : 'Ready'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Canvas Footer Status */}
              <div className="pt-4 border-t border-[#E9E4F1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#625D6B]">
                <div className="flex items-center gap-2 text-[#129267] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#17B681] shrink-0" />
                  <span>Real-time operational continuity between registers and back-office billing</span>
                </div>
                <span className="font-mono text-[10px] text-[#6D57A5] font-semibold">
                  ERPGen Platform
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};


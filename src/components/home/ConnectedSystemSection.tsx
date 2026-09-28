import React, { useEffect, useRef, useState } from 'react';
import {
  ShoppingBag,
  Truck,
  Package,
  Users,
  FolderKanban,
  Coins,
  ArrowRightLeft,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';

interface OperationalStep {
  step: number;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  activeNodes: string[];
  statusNode: string;
  statusLabel: string;
  payload: string;
  badge: string;
}

export const ConnectedSystemSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const { t } = useLanguage();

  // Helper to dynamically measure the real fixed header height accurately
  const getHeaderHeight = (): number => {
    if (typeof window === 'undefined') return 80;
    const header = document.querySelector('header');
    if (header) {
      const rect = header.getBoundingClientRect();
      if (rect.height > 0) {
        // If measuring while un-scrolled (scrollY <= 20), subtract the 8px header height delta (py-3.5 vs py-2.5)
        const isScrolled = window.scrollY > 20;
        const currentHeight = Math.round(rect.height);
        return isScrolled ? currentHeight : Math.max(currentHeight - 8, 56);
      }
    }
    return window.innerWidth >= 1024 ? 95 : 61;
  };

  const [headerOffset, setHeaderOffset] = useState<number>(getHeaderHeight);

  const steps: OperationalStep[] = [
    {
      step: 1,
      id: 'commerce',
      title: t('connected.step1Title'),
      subtitle: t('connected.step1Subtitle'),
      description: t('connected.step1Desc'),
      activeNodes: ['sales', 'purchase'],
      statusNode: t('connected.step1Node'),
      statusLabel: t('connected.step1Label'),
      payload: t('connected.step1Payload'),
      badge: t('connected.step1Badge'),
    },
    {
      step: 2,
      id: 'operations',
      title: t('connected.step2Title'),
      subtitle: t('connected.step2Subtitle'),
      description: t('connected.step2Desc'),
      activeNodes: ['sales', 'purchase', 'inventory', 'projects'],
      statusNode: t('connected.step2Node'),
      statusLabel: t('connected.step2Label'),
      payload: t('connected.step2Payload'),
      badge: t('connected.step2Badge'),
    },
    {
      step: 3,
      id: 'admin',
      title: t('connected.step3Title'),
      subtitle: t('connected.step3Subtitle'),
      description: t('connected.step3Desc'),
      activeNodes: ['sales', 'purchase', 'inventory', 'projects', 'hr', 'finance'],
      statusNode: t('connected.step3Node'),
      statusLabel: t('connected.step3Label'),
      payload: t('connected.step3Payload'),
      badge: t('connected.step3Badge'),
    },
    {
      step: 4,
      id: 'connected',
      title: t('connected.step4Title'),
      subtitle: t('connected.step4Subtitle'),
      description: t('connected.step4Desc'),
      activeNodes: ['sales', 'purchase', 'inventory', 'projects', 'hr', 'finance', 'core'],
      statusNode: t('connected.step4Node'),
      statusLabel: t('connected.step4Label'),
      payload: t('connected.step4Payload'),
      badge: t('connected.step4Badge'),
    },
  ];

  const currentStep = steps[activeStepIndex];

  // Keep header offset synchronized dynamically across scrolls and resizes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateHeight = () => {
      const h = getHeaderHeight();
      setHeaderOffset((prev) => (Math.abs(prev - h) > 1 ? h : prev));
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('scroll', updateHeight, { passive: true });

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('scroll', updateHeight);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    let refreshTimeout: ReturnType<typeof setTimeout>;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Pin across all viewports (desktop, tablet, and mobile) with dynamic header offset
      mm.add('(min-width: 0px)', () => {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          pin: pinContainerRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          start: () => `top top+=${getHeaderHeight()}`,
          end: () => `+=${Math.round(window.innerHeight * 2.2)}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Map progress across 4 equal, generous dwell zones (0.00-0.25, 0.25-0.50, 0.50-0.75, 0.75-1.00)
            const stepIndex = Math.min(3, Math.max(0, Math.floor(self.progress * 4)));
            setActiveStepIndex(stepIndex);
          },
        });
        scrollTriggerRef.current = st;
      });

      return () => mm.revert();
    }, sectionRef);

    // Refresh ScrollTrigger once fonts and DOM layouts settle
    refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  // Smooth narrative content transition between states
  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined' || !narrativeRef.current) return;
    gsap.fromTo(
      narrativeRef.current,
      { opacity: 0.65, y: 5 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
  }, [activeStepIndex]);

  // Tab click handler that updates step and synchronizes scroll position if pinned
  const handleTabClick = (idx: number) => {
    setActiveStepIndex(idx);
    if (scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      if (st.start != null && st.end != null) {
        // Target midpoint of the selected step zone (0.125, 0.375, 0.625, 0.875)
        const targetProgress = (idx + 0.5) / 4;
        const targetScroll = st.start + targetProgress * (st.end - st.start);
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  const streamNodes = [
    { id: 'sales', name: t('modules.sales'), icon: ShoppingBag, color: '#6D57A5' },
    { id: 'purchase', name: t('modules.purchase'), icon: Truck, color: '#6D57A5' },
    { id: 'inventory', name: t('modules.inventory'), icon: Package, color: '#17B681' },
    { id: 'projects', name: t('modules.projects'), icon: FolderKanban, color: '#17B681' },
    { id: 'hr', name: t('modules.hr'), icon: Users, color: '#6D57A5' },
    { id: 'finance', name: t('modules.finance'), icon: Coins, color: '#17B681' },
  ];

  return (
    <section
      ref={sectionRef}
      id="connected-system"
      className="relative overflow-hidden bg-[#FAF8FC] border-b border-[#E9E4F1]"
      aria-label="Connected ERP Storytelling"
    >
      <div
        ref={pinContainerRef}
        className="w-full flex flex-col justify-between py-1.5 sm:py-2 lg:py-2.5 px-3 sm:px-6 lg:px-8 box-border overflow-hidden"
        style={{
          height: `calc(100svh - ${headerOffset + 2}px)`,
          maxHeight: `calc(100svh - ${headerOffset + 2}px)`,
        }}
      >
        <Container size="xl" className="h-full flex flex-col justify-between max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <SectionHeading
            eyebrow={t('connected.eyebrow')}
            title={t('connected.title')}
            titleGradient={t('connected.titleGradient')}
            description={t('connected.description')}
            className="mb-0 space-y-1 sm:space-y-1.5 max-w-3xl shrink-0 [&>p]:hidden sm:[&>p]:block [&>h2]:text-base sm:[&>h2]:text-2xl lg:[&>h2]:text-3xl"
          />

          {/* Step Tabs Bar */}
          <div className="flex items-center justify-start lg:justify-center gap-1.5 sm:gap-2 overflow-x-auto py-0.5 sm:py-1 shrink-0 scrollbar-none select-none">
            {steps.map((st, idx) => {
              const isActive = activeStepIndex === idx;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => handleTabClick(idx)}
                  className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer focus-ring-purple border ${
                    isActive
                      ? 'bg-[#6D57A5] text-white border-[#6D57A5] shadow-xs -translate-y-0.5'
                      : 'bg-white text-[#625D6B] border-[#E9E4F1] hover:border-[#6D57A5]/40 hover:text-[#1F1B2D]'
                  }`}
                  aria-pressed={isActive}
                >
                  <span
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[9px] sm:text-[10px] font-bold flex items-center justify-center shrink-0 ${
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

          {/* Main Storytelling Visual Stage: Split View on Desktop, Compact Stack on Mobile */}
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3 lg:gap-6 items-stretch my-1 sm:my-1.5 overflow-y-auto lg:overflow-visible scrollbar-none">
            {/* Left Narrative Column (approx 5 cols) */}
            <div
              ref={narrativeRef}
              className="lg:col-span-5 flex flex-col justify-between p-3 sm:p-4 lg:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E9E4F1] shadow-xs space-y-2 sm:space-y-3.5 will-change-[transform,opacity] h-full"
            >
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-mono text-[#17B681] font-bold uppercase tracking-wider">
                    {currentStep.subtitle}
                  </span>
                  <Badge variant="brand" size="sm">
                    {currentStep.badge}
                  </Badge>
                </div>

                <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-[#1F1B2D] font-heading leading-tight">
                  {currentStep.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#625D6B] leading-relaxed line-clamp-2 sm:line-clamp-3 lg:line-clamp-none">
                  {currentStep.description}
                </p>
              </div>

              {/* Operational Status HUD */}
              <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-1 sm:space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1F1B2D] flex items-center gap-1.5 text-[10px] sm:text-xs">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#17B681] animate-pulse" />
                    {currentStep.statusNode}
                  </span>
                  <span className="text-[9px] sm:text-[11px] text-[#6D57A5] font-semibold">
                    {currentStep.statusLabel}
                  </span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-xl bg-white border border-[#E9E4F1] text-[10px] sm:text-xs text-[#1F1B2D] flex items-center justify-between">
                  <span className="truncate">{currentStep.payload}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0 ms-1.5" />
                </div>
              </div>

              {/* Progress Tracker Footer */}
              <div className="pt-1.5 sm:pt-2 border-t border-[#E9E4F1] flex items-center justify-between text-[10px] sm:text-xs text-[#625D6B]">
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#17B681] animate-spin" style={{ animationDuration: '8s' }} />
                  <span className="hidden sm:inline">{t('connected.scrollExplore')}</span>
                  <span className="sm:hidden">{t('connected.scrollProgress')}</span>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#6D57A5]">
                  {t('connected.stageOf').replace('{step}', String(currentStep.step))}
                </span>
              </div>
            </div>

            {/* Right Visual Architecture Canvas (approx 7 cols) */}
            <div className="lg:col-span-7 p-3 sm:p-4 lg:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E9E4F1] shadow-[0_4px_20px_rgba(109,87,165,0.04),0_1px_3px_rgba(31,27,45,0.04)] flex flex-col justify-between space-y-1.5 sm:space-y-2.5 relative overflow-hidden h-full">
              {/* Canvas Header */}
              <div className="hidden lg:flex items-center justify-between pb-1.5 border-b border-[#E9E4F1]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold">
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1F1B2D] font-heading leading-tight">
                      {t('connected.engineTitle')}
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-[#625D6B]">{t('connected.engineSubtitle')}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
                  {t('connected.liveSync')}
                </span>
              </div>

              {/* 1. TOP: The 6 Operational Streams Grid */}
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-[#625D6B] font-bold block text-center">
                  {t('connected.sixStreams')}
                </span>
                <div className="grid grid-cols-6 gap-1 sm:gap-1.5">
                  {streamNodes.map((node) => {
                    const Icon = node.icon;
                    const isNodeActive = currentStep.activeNodes.includes(node.id);
                    return (
                      <div
                        key={node.id}
                        className={`p-1 sm:p-1.5 rounded-xl border text-center transition-all duration-300 ${
                          isNodeActive
                            ? 'bg-white border-[#6D57A5] shadow-xs scale-102 ring-1 ring-[#6D57A5]/30'
                            : 'bg-[#FAF8FC] border-[#E9E4F1] opacity-50'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg mx-auto flex items-center justify-center mb-0.5 transition-colors ${
                            isNodeActive
                              ? 'bg-[#FAF8FC] text-[#6D57A5]'
                              : 'bg-white text-[#625D6B]'
                          }`}
                        >
                          <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </div>
                        <span className="text-[8px] sm:text-[10px] font-bold text-[#1F1B2D] block leading-tight truncate">
                          {node.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. MIDDLE: SVG Animated Beams Converging into Central ERPGen Hub */}
              <div className="relative py-0.5 sm:py-1">
                <svg
                  className="w-full h-6 sm:h-8 lg:h-12 pointer-events-none overflow-visible"
                  viewBox="0 0 600 60"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="connBeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6D57A5" />
                      <stop offset="100%" stopColor="#17B681" />
                    </linearGradient>
                  </defs>

                  {/* 6 Inactive Guideline Beams */}
                  <path d="M 50 0 C 50 30, 300 20, 300 60" stroke="#E9E4F1" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 150 0 C 150 30, 300 20, 300 60" stroke="#E9E4F1" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 250 0 C 250 30, 300 20, 300 60" stroke="#E9E4F1" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 350 0 C 350 30, 300 20, 300 60" stroke="#E9E4F1" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 450 0 C 450 30, 300 20, 300 60" stroke="#E9E4F1" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 550 0 C 550 30, 300 20, 300 60" stroke="#E9E4F1" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Active Dynamic Converging Beams */}
                  <path
                    d="M 50 0 C 50 30, 300 20, 300 60"
                    stroke="#6D57A5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                    style={{ opacity: currentStep.activeNodes.includes('sales') ? 1 : 0.1 }}
                  />
                  <path
                    d="M 150 0 C 150 30, 300 20, 300 60"
                    stroke="#6D57A5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                    style={{ opacity: currentStep.activeNodes.includes('purchase') ? 1 : 0.1 }}
                  />
                  <path
                    d="M 250 0 C 250 30, 300 20, 300 60"
                    stroke="#17B681"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                    style={{ opacity: currentStep.activeNodes.includes('inventory') ? 1 : 0.1 }}
                  />
                  <path
                    d="M 350 0 C 350 30, 300 20, 300 60"
                    stroke="#17B681"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                    style={{ opacity: currentStep.activeNodes.includes('projects') ? 1 : 0.1 }}
                  />
                  <path
                    d="M 450 0 C 450 30, 300 20, 300 60"
                    stroke="#6D57A5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                    style={{ opacity: currentStep.activeNodes.includes('hr') ? 1 : 0.1 }}
                  />
                  <path
                    d="M 550 0 C 550 30, 300 20, 300 60"
                    stroke="#17B681"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                    style={{ opacity: currentStep.activeNodes.includes('finance') ? 1 : 0.1 }}
                  />

                  {/* Central Hub Receiver Indicator */}
                  <circle cx="300" cy="60" r="4" fill="#6D57A5" className="animate-ping opacity-35" />
                  <circle cx="300" cy="60" r="3" fill="#6D57A5" />
                </svg>

                {/* Central ERPGen Hub Node */}
                <div
                  className={`mx-auto max-w-xs p-1.5 sm:p-2 lg:p-2.5 rounded-xl border transition-all duration-500 text-center relative z-20 ${
                    activeStepIndex === 3
                      ? 'bg-white border-[#17B681] shadow-md shadow-[#17B681]/15 ring-2 ring-[#17B681] scale-102'
                      : 'bg-white border-[#6D57A5]/40 shadow-xs'
                  }`}
                >
                  {activeStepIndex === 3 && (
                    <span className="absolute -inset-1 rounded-xl bg-[#17B681]/20 animate-pulse pointer-events-none" />
                  )}
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] mx-auto flex items-center justify-center font-bold shadow-2xs">
                    <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#6D57A5]" />
                  </div>
                  <h5 className="text-[11px] sm:text-xs font-bold text-[#1F1B2D] font-heading mt-0.5">
                    {t('connected.platform')}
                  </h5>
                  <p className="text-[8px] sm:text-[9px] text-[#625D6B]">
                    {t('connected.centralHub')}
                  </p>
                </div>
              </div>

              {/* 3. BOTTOM: Connected Business Operations Outcome Banner */}
              <div className="pt-0.5 sm:pt-1 hidden sm:block">
                <div
                  className={`p-1.5 sm:p-2 rounded-xl border transition-all duration-500 flex items-center justify-between gap-2 ${
                    activeStepIndex === 3
                      ? 'bg-[#E4F8F0] border-[#17B681] shadow-xs'
                      : 'bg-[#FAF8FC] border-[#E9E4F1]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-white border border-[#E9E4F1] text-[#17B681] flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-[#17B681]" />
                    </div>
                    <div>
                      <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-[#129267] font-bold block">
                        {t('connected.outcome')}
                      </span>
                      <h5 className="text-[11px] sm:text-xs font-bold text-[#1F1B2D]">
                        {t('connected.outcomeTitle')}
                      </h5>
                    </div>
                  </div>

                  <span className="text-[9px] sm:text-[10px] font-mono text-[#6D57A5] font-semibold shrink-0 hidden sm:inline">
                    {t('connected.zeroRedundant')}
                  </span>
                </div>
              </div>

              {/* Canvas Footer Status */}
              <div className="pt-1 sm:pt-1.5 border-t border-[#E9E4F1] hidden lg:flex items-center justify-between text-[10px] text-[#625D6B]">
                <div className="flex items-center gap-1.5 text-[#129267] font-semibold truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                  <span className="truncate">{t('connected.canvasFooter')}</span>
                </div>
                <span className="font-mono text-[9px] sm:text-[10px] text-[#6D57A5] font-semibold shrink-0 ms-2">
                  ERPGen
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

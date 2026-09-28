import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  ShoppingBag,
  Truck,
  Package,
  Users,
  FolderKanban,
  Coins,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Activity,
  Layers,
  Zap,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';

interface AreaConfig {
  id: string;
  number: string;
  nameKey: string;
  catKey: string;
  descKey: string;
  flowKey: string;
  metricLabelKey: string;
  metricValueKey: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  gradientStop: string;
  // Polar coordinate on stage: angle in degrees
  angleDeg: number;
}

const AREAS: AreaConfig[] = [
  {
    id: 'sales',
    number: '01',
    nameKey: 'modules.sales',
    catKey: 'modules.salesCat',
    descKey: 'modules.salesDesc',
    flowKey: 'sixAreas.flowSales',
    metricLabelKey: 'sixAreas.metricSalesLabel',
    metricValueKey: 'sixAreas.metricSalesValue',
    icon: ShoppingBag,
    accentColor: '#6D57A5',
    gradientStop: '#8C74CC',
    angleDeg: 300, // Top-left
  },
  {
    id: 'purchase',
    number: '02',
    nameKey: 'modules.purchase',
    catKey: 'modules.purchaseCat',
    descKey: 'modules.purchaseDesc',
    flowKey: 'sixAreas.flowPurchase',
    metricLabelKey: 'sixAreas.metricPurchaseLabel',
    metricValueKey: 'sixAreas.metricPurchaseValue',
    icon: Truck,
    accentColor: '#6D57A5',
    gradientStop: '#8C74CC',
    angleDeg: 60, // Top-right
  },
  {
    id: 'inventory',
    number: '03',
    nameKey: 'modules.inventory',
    catKey: 'modules.inventoryCat',
    descKey: 'modules.inventoryDesc',
    flowKey: 'sixAreas.flowInventory',
    metricLabelKey: 'sixAreas.metricInventoryLabel',
    metricValueKey: 'sixAreas.metricInventoryValue',
    icon: Package,
    accentColor: '#17B681',
    gradientStop: '#34D399',
    angleDeg: 0, // East / Right
  },
  {
    id: 'hr',
    number: '04',
    nameKey: 'modules.hr',
    catKey: 'modules.hrCat',
    descKey: 'modules.hrDesc',
    flowKey: 'sixAreas.flowHr',
    metricLabelKey: 'sixAreas.metricHrLabel',
    metricValueKey: 'sixAreas.metricHrValue',
    icon: Users,
    accentColor: '#6D57A5',
    gradientStop: '#8C74CC',
    angleDeg: 120, // Southeast / Bottom-right
  },
  {
    id: 'projects',
    number: '05',
    nameKey: 'modules.projects',
    catKey: 'modules.projectsCat',
    descKey: 'modules.projectsDesc',
    flowKey: 'sixAreas.flowProjects',
    metricLabelKey: 'sixAreas.metricProjectsLabel',
    metricValueKey: 'sixAreas.metricProjectsValue',
    icon: FolderKanban,
    accentColor: '#17B681',
    gradientStop: '#34D399',
    angleDeg: 240, // Southwest / Bottom-left
  },
  {
    id: 'finance',
    number: '06',
    nameKey: 'modules.finance',
    catKey: 'modules.financeCat',
    descKey: 'modules.financeDesc',
    flowKey: 'sixAreas.flowFinance',
    metricLabelKey: 'sixAreas.metricFinanceLabel',
    metricValueKey: 'sixAreas.metricFinanceValue',
    icon: Coins,
    accentColor: '#17B681',
    gradientStop: '#34D399',
    angleDeg: 180, // West / Left
  },
];

export const SixAreasStorytellingSection: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const narrativeCardRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Measure dynamic header height accurately
  const getHeaderHeight = (): number => {
    if (typeof window === 'undefined') return 80;
    const header = document.querySelector('header');
    if (header) {
      const rect = header.getBoundingClientRect();
      if (rect.height > 0) {
        const isScrolled = window.scrollY > 20;
        const currentHeight = Math.round(rect.height);
        return isScrolled ? currentHeight : Math.max(currentHeight - 8, 56);
      }
    }
    return window.innerWidth >= 1024 ? 95 : 61;
  };

  const [headerOffset, setHeaderOffset] = useState<number>(getHeaderHeight);

  // Keep header offset synchronized
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateHeight = () => {
      const h = getHeaderHeight();
      setHeaderOffset((prev) => (Math.abs(prev - h) > 1 ? h : prev));
    };

    updateHeight();
    window.addEventListener('resize', updateHeight, { passive: true });
    window.addEventListener('scroll', updateHeight, { passive: true });

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('scroll', updateHeight);
    };
  }, []);

  // Pinned ScrollTrigger choreography
  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion()) return;

    let refreshTimeout: ReturnType<typeof setTimeout>;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Pin across all screen sizes with adaptive distance
      mm.add('(min-width: 0px)', () => {
        const distanceMultiplier = 2.6;

        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          pin: pinContainerRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          start: () => `top top+=${getHeaderHeight()}`,
          end: () => `+=${Math.round(window.innerHeight * distanceMultiplier)}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            // 6 equal dwell zones: 0.00-0.166, 0.166-0.333, etc.
            const step = Math.min(5, Math.max(0, Math.floor(self.progress * 6)));
            setActiveStep(step);
          },
        });

        scrollTriggerRef.current = st;
      });

      return () => mm.revert();
    }, sectionRef);

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

  // Smooth narrative card transition on step change
  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined' || !narrativeCardRef.current) return;

    const lateralOffset = isRtl ? -16 : 16;
    gsap.fromTo(
      narrativeCardRef.current,
      {
        opacity: 0.4,
        x: lateralOffset,
        scale: 0.98,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power3.out',
      }
    );
  }, [activeStep, isRtl]);

  // Click handler to programmatically jump to step
  const handleStepClick = useCallback((stepIdx: number) => {
    setActiveStep(stepIdx);
    const st = scrollTriggerRef.current;
    if (st && st.start != null && st.end != null) {
      const targetProgress = (stepIdx + 0.5) / 6;
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, []);

  const currentArea = AREAS[activeStep];
  const ActiveIcon = currentArea.icon;

  // Center coordinate of SVG stage
  const svgCenter = { x: 300, y: 220 };
  const orbitalRadius = 150;

  // Node position helper
  const getNodePos = (angleDeg: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: svgCenter.x + orbitalRadius * Math.cos(rad),
      y: svgCenter.y + orbitalRadius * Math.sin(rad),
    };
  };

  const nodePositions = AREAS.map((a) => getNodePos(a.angleDeg));

  return (
    <section
      ref={sectionRef}
      id="core-modules"
      className="relative overflow-hidden bg-[#FAF8FC] border-b border-[#E9E4F1]"
      aria-label="Six ERP Operational Areas Storytelling"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#6D57A5]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#17B681]/5 blur-[120px] rounded-full pointer-events-none" />

      <div
        ref={pinContainerRef}
        className="w-full flex flex-col justify-between py-2 sm:py-3 lg:py-4 px-3 sm:px-6 lg:px-8 box-border overflow-hidden"
        style={{
          height: `calc(100svh - ${headerOffset + 2}px)`,
          maxHeight: `calc(100svh - ${headerOffset + 2}px)`,
        }}
      >
        <Container size="xl" className="h-full flex flex-col justify-between max-w-7xl mx-auto w-full">
          {/* Header Bar: Eyebrow + Title + Segment Navigation */}
          <div className="space-y-2 sm:space-y-3 shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E9E4F1] pb-2 sm:pb-3">
              <div className="text-start space-y-0.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#E9E4F1] text-[10px] sm:text-[11px] font-mono font-semibold text-[#6D57A5] shadow-2xs">
                  <Sparkles className="w-3 h-3 text-[#17B681]" />
                  <span>{t('sixAreas.eyebrow')}</span>
                </div>
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#1F1B2D] font-heading tracking-tight leading-tight">
                  {t('sixAreas.title')}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D57A5] to-[#17B681]">
                    {t('sixAreas.titleGradient')}
                  </span>
                </h2>
              </div>

              {/* System Activation Progress Meter */}
              <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-2xl border border-[#E9E4F1] shadow-2xs self-start sm:self-auto">
                <div className="text-start">
                  <span className="text-[9px] font-mono text-[#625D6B] uppercase tracking-wider block">
                    {t('sixAreas.systemGrowth')}
                  </span>
                  <span className="text-xs font-bold text-[#1F1B2D]">
                    {Math.round(((activeStep + 1) / 6) * 100)}% Synchronized
                  </span>
                </div>
                <div className="w-16 h-2 rounded-full bg-[#FAF8FC] border border-[#E9E4F1] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#6D57A5] to-[#17B681] transition-all duration-150 rounded-full"
                    style={{ width: `${Math.max(16, scrollProgress * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 6-Step Pill Selectors Bar */}
            <div className="flex items-center justify-start lg:justify-center gap-1.5 overflow-x-auto py-0.5 shrink-0 scrollbar-none select-none">
              {AREAS.map((area, idx) => {
                const Icon = area.icon;
                const isSelected = activeStep === idx;
                const isActivated = idx <= activeStep;

                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => handleStepClick(idx)}
                    className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#6D57A5] text-white border-[#6D57A5] shadow-xs -translate-y-0.5'
                        : isActivated
                        ? 'bg-white text-[#1F1B2D] border-[#17B681]/40 hover:border-[#6D57A5]/40'
                        : 'bg-white/60 text-[#625D6B] border-[#E9E4F1] opacity-70 hover:opacity-100 hover:bg-white'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span
                      className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-white text-[#6D57A5]'
                          : isActivated
                          ? 'bg-[#E4F8F0] text-[#129267]'
                          : 'bg-[#FAF8FC] text-[#625D6B]'
                      }`}
                    >
                      {area.number}
                    </span>
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t(area.nameKey)}</span>
                    {isActivated && !isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#17B681]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Central Interactive Composition: Split Stage */}
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-stretch my-1.5 sm:my-2 overflow-y-auto lg:overflow-visible scrollbar-none">
            {/* Left Column: Active Operational Area Hologram / Card */}
            <div
              ref={narrativeCardRef}
              className="lg:col-span-5 flex flex-col justify-between p-3.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E9E4F1] shadow-xs space-y-3 will-change-[transform,opacity] h-full"
            >
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#6D57A5] bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-100">
                      {currentArea.number} / 06
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono text-[#17B681] font-bold uppercase tracking-wider">
                      {t(currentArea.catKey)}
                    </span>
                  </div>

                  <Badge variant="brand" size="sm">
                    {t('sixAreas.activePillar')}
                  </Badge>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 text-white shadow-sm transition-transform duration-300"
                    style={{ backgroundColor: currentArea.accentColor }}
                  >
                    <ActiveIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-[#1F1B2D] font-heading leading-tight">
                      {t(currentArea.nameKey)}
                    </h3>
                    <span className="text-[11px] sm:text-xs text-[#6D57A5] font-semibold flex items-center gap-1 mt-0.5">
                      <Activity className="w-3.5 h-3.5 text-[#17B681]" />
                      {t(currentArea.flowKey)}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#625D6B] leading-relaxed line-clamp-3 sm:line-clamp-4 lg:line-clamp-none">
                  {t(currentArea.descKey)}
                </p>
              </div>

              {/* Operational Stream HUD Box */}
              <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1F1B2D] flex items-center gap-1.5 text-[10px] sm:text-xs">
                    <span className="w-2 h-2 rounded-full bg-[#17B681] animate-pulse" />
                    {t(currentArea.metricLabelKey)}
                  </span>
                  <span className="text-[10px] font-mono text-[#129267] font-bold uppercase bg-[#E4F8F0] px-2 py-0.5 rounded-md border border-[#17B681]/30">
                    {t('sixAreas.activeInCore')}
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-white border border-[#E9E4F1] text-[11px] sm:text-xs text-[#1F1B2D] flex items-center justify-between shadow-2xs">
                  <span className="truncate font-medium">{t(currentArea.metricValueKey)}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0 ms-2" />
                </div>
              </div>

              {/* Progress Footer */}
              <div className="pt-2 border-t border-[#E9E4F1] flex items-center justify-between text-[10px] sm:text-xs text-[#625D6B]">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#17B681]" />
                  <span className="hidden sm:inline">{t('sixAreas.scrollPrompt')}</span>
                  <span className="sm:hidden">{t('connected.scrollProgress')}</span>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#6D57A5]">
                  {t('sixAreas.stageOf').replace('{current}', String(activeStep + 1))}
                </span>
              </div>
            </div>

            {/* Right Column: The Living ERP Architecture Visualizer */}
            <div className="lg:col-span-7 p-3 sm:p-4 lg:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E9E4F1] shadow-[0_4px_25px_rgba(109,87,165,0.04),0_1px_3px_rgba(31,27,45,0.03)] flex flex-col justify-between relative overflow-hidden h-full">
              {/* Stage Top Status */}
              <div className="flex items-center justify-between pb-2 border-b border-[#E9E4F1]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1F1B2D] font-heading leading-tight">
                      ERPGen Operational Core
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-[#625D6B]">
                      Dynamic Multi-Node Synchronized Architecture
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-semibold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
                  {activeStep === 5 ? t('sixAreas.allActive') : `${activeStep + 1} / 06 Active`}
                </span>
              </div>

              {/* Dynamic Living SVG System Map */}
              <div className="flex-1 relative flex items-center justify-center min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]">
                <svg
                  className="w-full h-full max-h-[320px] overflow-visible select-none"
                  viewBox="0 0 600 440"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="activeCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6D57A5" />
                      <stop offset="100%" stopColor="#17B681" />
                    </linearGradient>

                    <radialGradient id="hubHalo" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#6D57A5" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#6D57A5" stopOpacity="0" />
                    </radialGradient>

                    <radialGradient id="nodeActiveGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#17B681" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#17B681" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Concentric Ambient Radar Rings */}
                  <circle cx={svgCenter.x} cy={svgCenter.y} r={orbitalRadius} stroke="#E9E4F1" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx={svgCenter.x} cy={svgCenter.y} r={orbitalRadius * 0.55} stroke="#E9E4F1" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx={svgCenter.x} cy={svgCenter.y} r={orbitalRadius + 28} fill="url(#hubHalo)" />

                  {/* Outer Perimeter Connections between Adjacent Nodes */}
                  {AREAS.map((_, i) => {
                    const nextI = (i + 1) % 6;
                    const p1 = nodePositions[i];
                    const p2 = nodePositions[nextI];
                    const isLineActive = i <= activeStep && nextI <= activeStep;

                    return (
                      <line
                        key={`ring-line-${i}`}
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke={isLineActive ? '#17B681' : '#E9E4F1'}
                        strokeWidth={isLineActive ? 2 : 1}
                        strokeDasharray={isLineActive ? undefined : '3 3'}
                        strokeOpacity={isLineActive ? 0.7 : 0.4}
                        className="transition-all duration-500"
                      />
                    );
                  })}

                  {/* Spokes: Connecting Nodes to Central Hub */}
                  {AREAS.map((area, i) => {
                    const pos = nodePositions[i];
                    const isSpokeActive = i <= activeStep;
                    const isSpokeDominant = i === activeStep;

                    return (
                      <g key={`spoke-${area.id}`}>
                        <line
                          x1={svgCenter.x}
                          y1={svgCenter.y}
                          x2={pos.x}
                          y2={pos.y}
                          stroke={isSpokeDominant ? area.accentColor : isSpokeActive ? '#17B681' : '#E9E4F1'}
                          strokeWidth={isSpokeDominant ? 2.5 : isSpokeActive ? 2 : 1}
                          strokeDasharray={isSpokeActive ? undefined : '4 4'}
                          strokeOpacity={isSpokeActive ? 0.85 : 0.3}
                          className="transition-all duration-500"
                        />

                        {/* Animated Signal Particle along active spoke */}
                        {isSpokeDominant && (
                          <circle
                            cx={(svgCenter.x + pos.x) / 2}
                            cy={(svgCenter.y + pos.y) / 2}
                            r="3"
                            fill={area.accentColor}
                            className="animate-ping opacity-60"
                          />
                        )}
                      </g>
                    );
                  })}

                  {/* Central ERPGen Hub Node */}
                  <g className="cursor-pointer">
                    <circle cx={svgCenter.x} cy={svgCenter.y} r="34" fill="#FFFFFF" stroke="#6D57A5" strokeWidth="2.5" className="shadow-lg" />
                    <circle cx={svgCenter.x} cy={svgCenter.y} r="28" fill="#FAF8FC" />
                    <circle cx={svgCenter.x} cy={svgCenter.y} r="8" fill="url(#activeCoreGrad)" className="animate-pulse" />
                    <text
                      x={svgCenter.x}
                      y={svgCenter.y + 44}
                      textAnchor="middle"
                      className="fill-[#1F1B2D] text-[10px] font-bold font-mono tracking-wider"
                    >
                      ERPGen Core
                    </text>
                  </g>

                  {/* 6 Peripheral Operational Nodes */}
                  {AREAS.map((area, i) => {
                    const pos = nodePositions[i];
                    const isNodeActive = i <= activeStep;
                    const isNodeDominant = i === activeStep;

                    return (
                      <g
                        key={`svg-node-${area.id}`}
                        onClick={() => handleStepClick(i)}
                        className="cursor-pointer transition-all duration-300"
                        style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                      >
                        {/* Glow halo when dominant */}
                        {isNodeDominant && (
                          <circle cx={pos.x} cy={pos.y} r="30" fill="url(#nodeActiveGlow)" />
                        )}

                        {/* Outer boundary circle */}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={isNodeDominant ? 22 : 18}
                          fill={isNodeDominant ? '#FFFFFF' : isNodeActive ? '#FFFFFF' : '#FAF8FC'}
                          stroke={isNodeDominant ? area.accentColor : isNodeActive ? '#17B681' : '#E9E4F1'}
                          strokeWidth={isNodeDominant ? 3 : isNodeActive ? 2 : 1.5}
                          className="transition-all duration-300"
                        />

                        {/* Center dot / indicator */}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={isNodeDominant ? 7 : isNodeActive ? 5 : 3.5}
                          fill={isNodeDominant ? area.accentColor : isNodeActive ? '#17B681' : '#625D6B'}
                          className="transition-all duration-300"
                        />

                        {/* Text Label */}
                        <text
                          x={pos.x}
                          y={pos.y > svgCenter.y ? pos.y + 24 : pos.y - 18}
                          textAnchor="middle"
                          className={`text-[10px] font-mono tracking-tight transition-all duration-200 ${
                            isNodeDominant
                              ? 'fill-[#6D57A5] font-bold'
                              : isNodeActive
                              ? 'fill-[#1F1B2D] font-medium'
                              : 'fill-[#625D6B] opacity-60'
                          }`}
                        >
                          {t(area.nameKey).split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Bottom Stage Banner / Handoff Conduit */}
              <div className="pt-2 border-t border-[#E9E4F1]">
                {activeStep === 5 ? (
                  /* Step 6 Complete: Handoff into Connected System */
                  <a
                    href="#connected-system"
                    className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-[#E4F8F0] via-white to-[#FAF8FC] border border-[#17B681] shadow-xs flex items-center justify-between gap-3 text-start hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#17B681] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#129267] font-bold block">
                          {t('sixAreas.allActive')}
                        </span>
                        <h5 className="text-xs sm:text-sm font-bold text-[#1F1B2D] group-hover:text-[#6D57A5] transition-colors">
                          {t('sixAreas.nextConnected')}
                        </h5>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-[#17B681] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
                  </a>
                ) : (
                  /* Progressive System Building Cue */
                  <div className="p-2 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-between text-xs text-[#625D6B]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#6D57A5] animate-ping" />
                      <span className="text-[10px] sm:text-xs font-medium">
                        {t('sixAreas.progressActive').replace('{current}', String(activeStep + 1))}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#6D57A5] font-semibold">
                      Scroll to continue →
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

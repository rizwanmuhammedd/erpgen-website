import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Boxes,
  Workflow,
  Database,
  Cpu,
  ShieldCheck,
  Zap,
  Layers,
  Terminal,
  Server,
  Building2,
  Utensils,
  Scissors,
  ShoppingCart,
  Shirt,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';
import { tactileAudio } from '../../lib/tactileAudio';

interface PrincipleConfig {
  id: string;
  number: string;
  titleKey: string;
  subtitleKey: string;
  descKey: string;
  indexKey: string;
  visualTagKey: string;
  highlights: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export const WhyERPGenSection: React.FC = () => {
  const [activePrincipleIndex, setActivePrincipleIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndexRef = useRef<number>(0);
  const hasUserScrolledRef = useRef<boolean>(false);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  const { t, isRtl } = useLanguage();

  const PRINCIPLES: PrincipleConfig[] = useMemo(
    () => [
      {
        id: 'modular',
        number: '01',
        titleKey: 'whyUs.reason1Title',
        subtitleKey: 'whyUs.reason1Subtitle',
        descKey: 'whyUs.reason1Desc',
        indexKey: 'whyUs.indexModular',
        visualTagKey: 'whyUs.visualModularTag',
        highlights: [
          'whyUs.reason1Highlight1',
          'whyUs.reason1Highlight2',
          'whyUs.reason1Highlight3',
        ],
        icon: Boxes,
      },
      {
        id: 'focused',
        number: '02',
        titleKey: 'whyUs.reason2Title',
        subtitleKey: 'whyUs.reason2Subtitle',
        descKey: 'whyUs.reason2Desc',
        indexKey: 'whyUs.indexFocused',
        visualTagKey: 'whyUs.visualFocusedTag',
        highlights: [
          'whyUs.reason2Highlight1',
          'whyUs.reason2Highlight2',
          'whyUs.reason2Highlight3',
        ],
        icon: Workflow,
      },
      {
        id: 'synchronized',
        number: '03',
        titleKey: 'whyUs.reason3Title',
        subtitleKey: 'whyUs.reason3Subtitle',
        descKey: 'whyUs.reason3Desc',
        indexKey: 'whyUs.indexSync',
        visualTagKey: 'whyUs.visualSyncTag',
        highlights: [
          'whyUs.reason3Highlight1',
          'whyUs.reason3Highlight2',
          'whyUs.reason3Highlight3',
        ],
        icon: Database,
      },
      {
        id: 'tailored',
        number: '04',
        titleKey: 'whyUs.reason4Title',
        subtitleKey: 'whyUs.reason4Subtitle',
        descKey: 'whyUs.reason4Desc',
        indexKey: 'whyUs.indexTailored',
        visualTagKey: 'whyUs.visualTailoredTag',
        highlights: [
          'whyUs.reason4Highlight1',
          'whyUs.reason4Highlight2',
          'whyUs.reason4Highlight3',
        ],
        icon: Cpu,
      },
      {
        id: 'guidance',
        number: '05',
        titleKey: 'whyUs.reason5Title',
        subtitleKey: 'whyUs.reason5Subtitle',
        descKey: 'whyUs.reason5Desc',
        indexKey: 'whyUs.indexGuidance',
        visualTagKey: 'whyUs.visualGuidanceTag',
        highlights: [
          'whyUs.reason5Highlight1',
          'whyUs.reason5Highlight2',
          'whyUs.reason5Highlight3',
        ],
        icon: Terminal,
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

      // Unified Reference-Level Layered Storytelling (Desktop & Mobile)
      const setupPrincipleAnimation = (isMobile: boolean) => {
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length < 5) return;

        // Base Initial States: Card 01 settled, others waiting below
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
        // Desktop: ~2.1x innerHeight
        // Mobile: ~1.7x innerHeight
        const scrollMultiplier = isMobile ? 1.7 : 2.1;

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
                setActivePrincipleIndex(newIndex);
              }
            },
          },
        });

        scrollTriggerInstanceRef.current = scrubTl.scrollTrigger || null;

        // 4 Sequential Transitions:
        // 01 Modular -> 02 Focused covers 01
        // 02 Focused -> 03 Sync Core covers 02
        // 03 Sync Core -> 04 Tailored covers 03
        // 04 Tailored -> 05 Guidance covers 04
        for (let i = 0; i < 4; i++) {
          const startTime = i * 1.0;
          const curCard = cards[i];
          const nextCard = cards[i + 1];

          // 1. Current card recedes slightly backward and upward
          scrubTl.to(
            curCard,
            {
              y: isMobile ? -8 : -12,
              scale: 0.965,
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
            startTime + 0.04
          );

          // 3. Coordinated internal elements stagger
          const nextTitle = nextCard.querySelector('.why-title-block');
          if (nextTitle) {
            scrubTl.fromTo(
              nextTitle,
              { y: 10, opacity: 0.3 },
              { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
              startTime + 0.12
            );
          }

          const nextVisual = nextCard.querySelector('.why-visual-block');
          if (nextVisual) {
            scrubTl.fromTo(
              nextVisual,
              { scale: 0.98, opacity: 0.3 },
              { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
              startTime + 0.14
            );
          }

          const highlightItems = nextCard.querySelectorAll('.why-highlight-item');
          if (highlightItems.length > 0) {
            scrubTl.fromTo(
              highlightItems,
              { y: 8, opacity: 0.2 },
              { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
              startTime + 0.18
            );
          }
        }
      };

      mm.add('(min-width: 1024px)', () => {
        setupPrincipleAnimation(false);
      });

      mm.add('(max-width: 1023px)', () => {
        setupPrincipleAnimation(true);
      });
    }, sectionRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  const handleIndexClick = (targetIndex: number) => {
    if (!scrollTriggerInstanceRef.current) return;
    const st = scrollTriggerInstanceRef.current;
    const totalDist = st.end - st.start;
    const targetScroll = st.start + (targetIndex / 4) * totalDist + 5;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  // Helper render for conceptual visuals
  const renderConceptualVisual = (principleId: string) => {
    switch (principleId) {
      case 'modular':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E9E4F1] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#17B681] animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-[#1F1B2D] uppercase tracking-wider">
                  MODULAR BUS ARCHITECTURE
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#6D57A5] font-semibold bg-[#6D57A5]/8 px-2 py-0.5 rounded">
                PLUG & EXPAND
              </span>
            </div>

            {/* Modular Blocks Connection */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-white border border-[#6D57A5]/30 shadow-2xs">
                <div className="flex items-center gap-2 text-[#6D57A5] mb-1">
                  <Boxes className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold font-mono">Invoice Core</span>
                </div>
                <span className="text-[10px] text-[#625D6B] block">Standalone Ready</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#17B681]/30 shadow-2xs">
                <div className="flex items-center gap-2 text-[#17B681] mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold font-mono">POS Counter</span>
                </div>
                <span className="text-[10px] text-[#625D6B] block">Direct Checkout</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E9E4F1] shadow-2xs">
                <div className="flex items-center gap-2 text-[#1F1B2D] mb-1">
                  <Database className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold font-mono">Inventory Hub</span>
                </div>
                <span className="text-[10px] text-[#625D6B] block">Multi-Location</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E9E4F1] shadow-2xs">
                <div className="flex items-center gap-2 text-[#1F1B2D] mb-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold font-mono">Ledger Books</span>
                </div>
                <span className="text-[10px] text-[#625D6B] block">General Ledger</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-between text-[11px] font-mono text-[#625D6B]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#17B681]" />
                Zero Data Migration Friction
              </span>
              <span className="text-[#17B681] font-bold">100% Continuity</span>
            </div>
          </div>
        );

      case 'focused':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E9E4F1] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#17B681]" />
                <span className="text-[10px] font-mono font-bold text-[#1F1B2D] uppercase tracking-wider">
                  DIRECT ACTION PIPELINE
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#17B681] font-semibold bg-[#17B681]/8 px-2 py-0.5 rounded">
                ZERO MENU BLOAT
              </span>
            </div>

            {/* Direct Workflow Stages */}
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-white border border-[#E9E4F1] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[10px] font-mono font-bold text-[#6D57A5] flex items-center justify-center">
                    01
                  </span>
                  <span className="text-xs font-bold text-[#1F1B2D]">Intake / Action Trigger</span>
                </div>
                <span className="text-[10px] font-mono text-[#17B681] font-semibold">Immediate</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#6D57A5]/30 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-[#6D57A5]/10 text-[10px] font-mono font-bold text-[#6D57A5] flex items-center justify-center">
                    02
                  </span>
                  <span className="text-xs font-bold text-[#1F1B2D]">Automated Validation</span>
                </div>
                <span className="text-[10px] font-mono text-[#6D57A5] font-semibold">1-Step Check</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#E9E4F1] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[10px] font-mono font-bold text-[#17B681] flex items-center justify-center">
                    03
                  </span>
                  <span className="text-xs font-bold text-[#1F1B2D]">Final Settlement & Post</span>
                </div>
                <span className="text-[10px] font-mono text-[#17B681] font-semibold">Instant Commit</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-between text-[11px] font-mono text-[#625D6B]">
              <span>Unused Complex Menus</span>
              <span className="text-rose-500 font-bold">Removed (0 Bloat)</span>
            </div>
          </div>
        );

      case 'synchronized':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E9E4F1] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#17B681] animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-[#1F1B2D] uppercase tracking-wider">
                  CENTRAL SYNCHRONIZATION HUB
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#17B681] font-semibold bg-[#17B681]/8 px-2 py-0.5 rounded">
                LIVE POSTING
              </span>
            </div>

            {/* Central Core & Peripherals */}
            <div className="p-4 rounded-xl bg-white border border-[#6D57A5]/30 text-center relative overflow-hidden shadow-2xs">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#6D57A5]/10 border border-[#6D57A5]/20 text-xs font-mono font-bold text-[#6D57A5] mb-3">
                <Database className="w-3.5 h-3.5" />
                <span>ERPGen Unified Data Core</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-2 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1]">
                  <span className="text-[9px] font-mono text-[#625D6B] block">FRONT REGISTERS</span>
                  <span className="text-[11px] font-bold text-[#1F1B2D]">POS Sales</span>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1]">
                  <span className="text-[9px] font-mono text-[#625D6B] block">WAREHOUSE</span>
                  <span className="text-[11px] font-bold text-[#1F1B2D]">Stock Depots</span>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1]">
                  <span className="text-[9px] font-mono text-[#625D6B] block">BACK-OFFICE</span>
                  <span className="text-[11px] font-bold text-[#1F1B2D]">General Ledger</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-between text-[11px] font-mono text-[#625D6B]">
              <span>Cross-Department Latency</span>
              <span className="text-[#17B681] font-bold">0.00ms (Live Sync)</span>
            </div>
          </div>
        );

      case 'tailored':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E9E4F1] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#17B681]" />
                <span className="text-[10px] font-mono font-bold text-[#1F1B2D] uppercase tracking-wider">
                  SECTOR WORKFLOW ENGINE
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#6D57A5] font-semibold bg-[#6D57A5]/8 px-2 py-0.5 rounded">
                4 PRE-CONFIGURED
              </span>
            </div>

            {/* 4 Industry Cards */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-white border border-[#E9E4F1] flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <Utensils className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1F1B2D] block">Restaurant</span>
                  <span className="text-[9px] text-[#625D6B]">Table & Kitchen</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#E9E4F1] flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Scissors className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1F1B2D] block">Barbershop</span>
                  <span className="text-[9px] text-[#625D6B]">Chairs & Stylists</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#E9E4F1] flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShoppingCart className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1F1B2D] block">Supermarket</span>
                  <span className="text-[9px] text-[#625D6B]">Fast Barcode Scan</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#E9E4F1] flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Shirt className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1F1B2D] block">Laundry</span>
                  <span className="text-[9px] text-[#625D6B]">Garment Intake</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-between text-[11px] font-mono text-[#625D6B]">
              <span>Shared Underlying Engine</span>
              <span className="text-[#17B681] font-bold">Zero Custom Forking</span>
            </div>
          </div>
        );

      case 'guidance':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E9E4F1] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#17B681] animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-[#1F1B2D] uppercase tracking-wider">
                  DIRECT TECHNICAL ENGAGEMENT
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#17B681] font-semibold bg-[#17B681]/8 px-2 py-0.5 rounded">
                NO MIDDLEMEN
              </span>
            </div>

            {/* Direct Channel Connection */}
            <div className="p-3.5 rounded-xl bg-white border border-[#6D57A5]/30 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Server className="w-3.5 h-3.5 text-[#6D57A5]" />
                  <span className="font-bold text-[#1F1B2D]">Solutions Architect</span>
                </div>
                <span className="text-[10px] font-mono text-[#17B681] font-semibold">Direct Access</span>
              </div>

              <div className="w-full bg-[#FAF8FC] rounded-lg p-2 border border-[#E9E4F1] text-[11px] font-mono text-[#625D6B] flex items-center justify-between">
                <span>Architecture Review</span>
                <span className="text-[#6D57A5] font-bold">Standard or Pro</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-[#17B681]" />
                  <span className="font-bold text-[#1F1B2D]">Your Business Operations</span>
                </div>
                <span className="text-[10px] font-mono text-[#625D6B]">Zero Sales Pressure</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-between text-[11px] font-mono text-[#625D6B]">
              <span>Technical Clarity From Day One</span>
              <span className="text-[#17B681] font-bold">100% Engineering</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="why-erpgen"
      className="relative overflow-hidden bg-white border-b border-[#E9E4F1]"
      aria-label="Why ERPGen Product Focus"
    >
      {/* Sticky Cinematic Storytelling Stage */}
      <div
        ref={stickyContainerRef}
        className="w-full min-h-screen py-10 sm:py-14 flex flex-col justify-start lg:justify-center relative"
      >
        <Container size="xl" className="space-y-6 sm:space-y-8">
          {/* Section Heading with Masked Title */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8FC] border border-[#E9E4F1] text-[11px] font-mono text-[#6D57A5] font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#17B681]" />
              <span>{t('whyUs.eyebrow')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F1B2D] font-heading leading-tight">
              {t('whyUs.title')}{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6D57A5] to-[#17B681]">
                {t('whyUs.titleGradient')}
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#625D6B] max-w-2xl mx-auto leading-relaxed">
              {t('whyUs.description')}
            </p>
          </div>

          {/* Minimal 5-Item Secondary Index */}
          <div
            className="flex items-center justify-center gap-1 sm:gap-2 max-w-2xl mx-auto flex-wrap px-2"
            role="tablist"
            aria-label="Operational principles index"
          >
            {PRINCIPLES.map((item, idx) => {
              const isActive = activePrincipleIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleIndexClick(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#6D57A5] text-white shadow-xs font-bold scale-105'
                      : 'bg-[#FAF8FC] text-[#625D6B] hover:text-[#1F1B2D] border border-[#E9E4F1]'
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  <span className={isActive ? 'text-[#17B681]' : 'opacity-60'}>
                    {item.number}
                  </span>
                  <span>{t(item.indexKey as any)}</span>
                </button>
              );
            })}
          </div>

          {/* Layered Card Storytelling Arena */}
          <div className="relative max-w-5xl mx-auto min-h-[460px] sm:min-h-[420px] lg:min-h-[400px]">
            {PRINCIPLES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardsRef.current[idx] = el;
                  }}
                  className="absolute inset-0 w-full rounded-2xl sm:rounded-3xl bg-[#FAF8FC] border border-[#E9E4F1] shadow-lg shadow-[#1F1B2D]/5 p-5 sm:p-7 lg:p-8 flex flex-col justify-between overflow-hidden"
                  style={{
                    zIndex: (idx + 1) * 10,
                  }}
                >
                  {/* Subtle top indicator bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#6D57A5] via-[#17B681] to-[#6D57A5]" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Left: Content Block */}
                    <div className="lg:col-span-6 space-y-4 text-start">
                      <div className="why-title-block space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl sm:text-3xl font-mono font-extrabold text-[#6D57A5]">
                            {item.number}
                          </span>
                          <span className="text-[10px] sm:text-xs font-mono text-[#17B681] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#17B681]/10 border border-[#17B681]/20">
                            {t(item.subtitleKey as any)}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-[#1F1B2D] font-heading flex items-center gap-2">
                          <Icon className="w-5 h-5 text-[#6D57A5] shrink-0" />
                          <span>{t(item.titleKey as any)}</span>
                        </h3>

                        <p className="text-xs sm:text-sm text-[#625D6B] leading-relaxed">
                          {t(item.descKey as any)}
                        </p>
                      </div>

                      {/* 3 Verified Capability Points */}
                      <div className="space-y-2 pt-1">
                        {item.highlights.map((hKey, hIdx) => (
                          <div
                            key={hIdx}
                            className="why-highlight-item flex items-center gap-2 text-xs sm:text-sm text-[#1F1B2D]"
                          >
                            <div className="w-4 h-4 rounded-full bg-[#17B681]/15 text-[#17B681] flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-3 h-3" />
                            </div>
                            <span className="font-medium">{t(hKey as any)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Simple Conceptual Visual */}
                    <div className="lg:col-span-6">
                      <div className="why-visual-block p-4 sm:p-5 rounded-2xl bg-white border border-[#E9E4F1] shadow-xs">
                        {renderConceptualVisual(item.id)}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Status */}
                  <div className="pt-3 border-t border-[#E9E4F1]/60 flex items-center justify-between text-[11px] font-mono text-[#625D6B]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#17B681]" />
                      ERPGen Operational Standard
                    </span>
                    <span className="font-bold text-[#6D57A5]">
                      {t(item.visualTagKey as any)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Closing Sub-CTA Banner */}
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FAF8FC] border border-[#E9E4F1] text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center">
              <Badge variant="brand" icon={<Sparkles className="w-3.5 h-3.5 text-[#17B681]" />}>
                {t('whyUs.enterpriseSimplicity')}
              </Badge>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1F1B2D] font-heading">
              {t('whyUs.closingTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-[#625D6B] max-w-xl mx-auto leading-relaxed">
              {t('whyUs.closingDesc')}
            </p>
            <div className="pt-1">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6D57A5] text-white text-xs font-semibold hover:bg-[#5a468c] shadow-md shadow-[#6D57A5]/20 hover:shadow-lg transition-all"
              >
                <span>{t('whyUs.closingCta')}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              </a>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

import React, { useEffect, useRef } from 'react';
import {
  ShoppingBag,
  CreditCard,
  Printer,
  CheckCircle2,
  Sparkles,
  Layers,
  Coins,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

interface PosDashboardPreviewProps {
  selectedFeatureId?: string;
  onSelectFeature?: (id: string) => void;
}

export const PosDashboardPreview: React.FC<PosDashboardPreviewProps> = ({
  selectedFeatureId = 'pos-billing',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerBaseRef = useRef<HTMLDivElement>(null);
  const layerMidRef = useRef<HTMLDivElement>(null);
  const layerTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Signature "STACK → UNSTACK" animation scrubbed with scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'top 25%',
          scrub: 0.6,
        },
      });

      // Initially layers are stacked tightly together
      tl.fromTo(
        layerBaseRef.current,
        {
          y: 25,
          scale: 0.96,
          transformPerspective: 1200,
          rotateX: 6,
        },
        {
          y: 0,
          scale: 1,
          rotateX: 0,
          ease: 'power2.out',
        }
      );

      // Middle layer separates and floats into position
      tl.fromTo(
        layerMidRef.current,
        {
          y: 50,
          x: 25,
          scale: 0.92,
          opacity: 0.6,
          transformPerspective: 1200,
          rotateZ: 2,
        },
        {
          y: 0,
          x: 0,
          scale: 1,
          opacity: 1,
          rotateZ: 0,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // Top layer separates and floats to its corner anchor
      tl.fromTo(
        layerTopRef.current,
        {
          y: 65,
          x: -25,
          scale: 0.88,
          opacity: 0.5,
          transformPerspective: 1200,
          rotateZ: -2,
        },
        {
          y: 0,
          x: 0,
          scale: 1,
          opacity: 1,
          rotateZ: 0,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full relative py-6 px-2 sm:px-4 select-none"
      aria-label="ERPGen POS Layered Composition"
    >
      {/* Background Spatial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6D57A5]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Layer Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* LAYER 1 (BASE): Clean Terminal Register Canvas */}
        <div
          ref={layerBaseRef}
          className="w-full rounded-2xl sm:rounded-3xl border border-[#E9E4F1] shadow-md overflow-hidden bg-white will-change-transform"
        >
          {/* Window Header */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#FAF8FC] border-b border-[#E9E4F1] text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/40 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#17B681]/40 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/20 inline-block" />
              </div>
              <span className="text-[#625D6B] font-mono text-[11px] ml-2">
                erpgen.pos / {selectedFeatureId}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#17B681] animate-pulse" />
              <Badge variant="brand" size="sm" className="text-[10px] font-mono font-bold">
                REGISTER ONLINE
              </Badge>
            </div>
          </div>

          {/* Clean Abstract Product Surface */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E9E4F1]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold block">
                  Touch Catalog
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-[#1F1B2D] font-heading mt-0.5">
                  Counter Speed & Item Modifiers
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#FAF8FC] border border-[#E9E4F1] text-[#625D6B]">
                  Catalog Ready
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#E4F8F0] border border-[#17B681]/30 text-[#129267]">
                  Instant Add
                </span>
              </div>
            </div>

            {/* Abstract Touch Grid (Clean marketing cards, zero fake transaction tables) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-xl bg-[#FAF8FC] border border-[#6D57A5]/30 hover:border-[#6D57A5] transition-all duration-200 group cursor-pointer shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold mb-3 shadow-2xs group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#1F1B2D] block group-hover:text-[#6D57A5] transition-colors">
                  Beverage Selection
                </span>
                <span className="text-[10px] text-[#625D6B] block mt-0.5">Custom Modifiers</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E9E4F1] hover:border-[#6D57A5]/40 transition-all duration-200 group cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#17B681] flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#1F1B2D] block group-hover:text-[#6D57A5] transition-colors">
                  Bakery & Dining
                </span>
                <span className="text-[10px] text-[#625D6B] block mt-0.5">Kitchen Routing</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E9E4F1] hover:border-[#6D57A5]/40 transition-all duration-200 group cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#1F1B2D] block group-hover:text-[#6D57A5] transition-colors">
                  Packaged Retail
                </span>
                <span className="text-[10px] text-[#625D6B] block mt-0.5">Barcode Scanned</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E9E4F1] hover:border-[#6D57A5]/40 transition-all duration-200 group cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#17B681] flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
                  <CreditCard className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#1F1B2D] block group-hover:text-[#6D57A5] transition-colors">
                  Express Service
                </span>
                <span className="text-[10px] text-[#625D6B] block mt-0.5">Direct Checkout</span>
              </div>
            </div>

            {/* Subtle base footer indicator */}
            <div className="flex items-center justify-between text-xs text-[#625D6B] pt-2">
              <span className="flex items-center gap-1.5 text-[#129267] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#17B681]" />
                <span>Synchronized with Central Operational Ledger</span>
              </span>
              <span className="font-mono text-[10px] text-[#6D57A5] font-semibold">ERPGen POS</span>
            </div>
          </div>
        </div>

        {/* LAYER 2 (MIDDLE): Floating Active Order & Settlement Card (Unstacks to bottom-right) */}
        <div
          ref={layerMidRef}
          className="mt-4 sm:mt-0 sm:absolute sm:-bottom-8 sm:-right-4 w-full sm:w-80 rounded-2xl bg-white border border-[#6D57A5]/30 shadow-xl p-5 space-y-3.5 will-change-transform z-20"
        >
          <div className="flex items-center justify-between pb-2.5 border-b border-[#E9E4F1]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#17B681] animate-pulse" />
              <span className="text-xs font-bold text-[#1F1B2D] font-heading">
                Active Order Session
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#6D57A5] font-semibold">#ORDER-READY</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#1F1B2D]">
              <span className="font-medium">Selected Items</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5]">
                3 Items
              </span>
            </div>
            <div className="flex items-center justify-between text-[#625D6B] text-[11px]">
              <span>Tax & VAT</span>
              <span className="text-[#17B681] font-semibold">Auto-Reconciled</span>
            </div>
          </div>

          {/* Quick settlement action buttons */}
          <div className="pt-2 border-t border-[#E9E4F1] space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-[#1F1B2D]">Settlement:</span>
              <span className="text-xs font-mono font-bold text-[#17B681]">Instant Clearing</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-[11px]">
              <div className="p-1.5 rounded-lg bg-[#FAF8FC] border border-[#6D57A5]/30 text-[#6D57A5] font-semibold text-center flex items-center justify-center gap-1">
                <CreditCard className="w-3 h-3" />
                <span>Card</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-[#E9E4F1] text-[#625D6B] font-semibold text-center flex items-center justify-center gap-1">
                <Coins className="w-3 h-3" />
                <span>Cash</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-[#E9E4F1] text-[#625D6B] font-semibold text-center flex items-center justify-center gap-1">
                <Layers className="w-3 h-3" />
                <span>Split</span>
              </div>
            </div>
          </div>
        </div>

        {/* LAYER 3 (TOP): Floating Hardware & Sync Assurance (Unstacks to top-left) */}
        <div
          ref={layerTopRef}
          className="mt-4 sm:mt-0 sm:absolute sm:-top-5 sm:-left-4 rounded-xl bg-white border border-[#17B681]/40 shadow-lg px-4 py-2.5 flex items-center gap-3 will-change-transform z-30"
        >
          <div className="w-8 h-8 rounded-lg bg-[#E4F8F0] text-[#129267] flex items-center justify-center shrink-0">
            <Printer className="w-4 h-4 text-[#17B681]" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#1F1B2D] block leading-tight">
              Thermal Print Ready
            </span>
            <span className="text-[10px] text-[#129267] font-mono font-medium block">
              Live Stock Updated
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

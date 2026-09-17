import React, { useRef } from 'react';
import {
  FileText,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Printer,
  CreditCard,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { prefersReducedMotion } from '../../lib/gsap';

interface HeroProductVisualProps {
  className?: string;
}

export const HeroProductVisual: React.FC<HeroProductVisualProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion() || !containerRef.current || !frameRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -2; // max 2 deg tilt
    const rotateY = ((x - centerX) / centerX) * 2;

    frameRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  };

  const handleMouseLeave = () => {
    if (!frameRef.current) return;
    frameRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-2xl mx-auto lg:max-w-none group ${className}`}
    >
      {/* Background Ambient Glow Behind Frame */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#6D57A5]/15 via-[#6D57A5]/5 to-[#17B681]/15 rounded-[32px] blur-2xl opacity-60 group-hover:opacity-85 transition-opacity duration-700 pointer-events-none" />

      {/* Main Application Window Frame */}
      <div
        ref={frameRef}
        className="relative rounded-2xl sm:rounded-3xl bg-white border border-[#E9E4F1] shadow-2xl shadow-[#6D57A5]/10 overflow-hidden transition-transform duration-500 ease-out"
        style={{ willChange: 'transform' }}
      >
        {/* macOS Style Window Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#FAF8FC] border-b border-[#E9E4F1] text-xs select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/30 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#17B681]/40 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/20 inline-block" />
            </div>
            <div className="h-3.5 w-px bg-[#E9E4F1] mx-1 hidden sm:block" />
            <span className="text-[#625D6B] font-mono text-[11px] hidden sm:inline-block">
              erpgen.cloud / operations-hub
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
              Sync Active
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#6D57A5]" />
          </div>
        </div>

        {/* Enterprise SaaS Workspace Content Viewport */}
        <div className="p-4 sm:p-5 bg-white space-y-4">
          {/* Top Application Bar with Status KPIs */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            <div className="p-2.5 sm:p-3 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#625D6B] block">
                Point of Sale
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-xs sm:text-sm font-bold text-[#1F1B2D] font-heading">
                  Active Registers
                </span>
                <span className="text-[10px] font-semibold text-[#17B681] hidden sm:inline">
                  Fast Lane
                </span>
              </div>
            </div>

            <div className="p-2.5 sm:p-3 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] block">
                Invoicing
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-xs sm:text-sm font-bold text-[#6D57A5] font-heading">
                  PDF & Tax
                </span>
                <span className="text-[10px] font-semibold text-[#6D57A5] hidden sm:inline">
                  VAT Ready
                </span>
              </div>
            </div>

            <div className="p-2.5 sm:p-3 rounded-xl bg-[#E4F8F0] border border-[#17B681]/30">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#129267] block">
                Connected Core
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-xs sm:text-sm font-bold text-[#17B681] font-heading">
                  Synchronized
                </span>
                <span className="text-[10px] text-[#129267] font-semibold hidden sm:inline">
                  Shared Data
                </span>
              </div>
            </div>
          </div>

          {/* Core Modules Unified Grid: Left POS / Right Invoice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Left Module Panel: POS Register Stream */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#E9E4F1]">
                <div className="flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#17B681]" />
                  <span className="text-xs font-bold text-[#1F1B2D]">POS Counter Terminal</span>
                </div>
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#E4F8F0] text-[#129267] font-semibold">
                  Live Register
                </span>
              </div>

              {/* POS Live Ticket Feed */}
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between py-1 px-1.5 rounded bg-white border border-[#E9E4F1]">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] shrink-0" />
                    <span className="text-[#1F1B2D] truncate">Counter Item Checkout</span>
                  </div>
                  <span className="font-mono font-bold text-[#17B681] shrink-0">$42.50</span>
                </div>

                <div className="flex items-center justify-between py-1 px-1.5 rounded bg-white border border-[#E9E4F1]">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] shrink-0" />
                    <span className="text-[#1F1B2D] truncate">Barcode Quick Scan</span>
                  </div>
                  <span className="font-mono font-bold text-[#17B681] shrink-0">$118.00</span>
                </div>
              </div>

              {/* POS Controls Footer */}
              <div className="pt-2 flex items-center justify-between text-[10px] text-[#625D6B] border-t border-[#E9E4F1]">
                <span className="flex items-center gap-1">
                  <CreditCard className="w-3 h-3 text-[#17B681]" />
                  <span>Split Payment Ready</span>
                </span>
                <span className="flex items-center gap-1 font-semibold text-[#6D57A5]">
                  <Printer className="w-3 h-3" />
                  <span>Thermal Print</span>
                </span>
              </div>
            </div>

            {/* Right Module Panel: Invoicing & Accounts */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#E9E4F1]">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#6D57A5]" />
                  <span className="text-xs font-bold text-[#1F1B2D]">Invoice & Billing Core</span>
                </div>
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#FAF8FC] text-[#6D57A5] border border-[#E9E4F1] font-semibold">
                  PDF & Tax
                </span>
              </div>

              {/* Invoicing Table Feed */}
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between py-1 px-1.5 rounded bg-white border border-[#E9E4F1]">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6D57A5] shrink-0" />
                    <span className="text-[#1F1B2D] truncate">Commercial Client Billing</span>
                  </div>
                  <span className="font-mono font-bold text-[#17B681] shrink-0">$1,420.00</span>
                </div>

                <div className="flex items-center justify-between py-1 px-1.5 rounded bg-white border border-[#E9E4F1]">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6D57A5] shrink-0" />
                    <span className="text-[#1F1B2D] truncate">Corporate Services</span>
                  </div>
                  <span className="font-mono font-bold text-[#6D57A5] shrink-0">$850.00</span>
                </div>
              </div>

              {/* Invoicing Controls Footer */}
              <div className="pt-2 flex items-center justify-between text-[10px] text-[#625D6B] border-t border-[#E9E4F1]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#17B681]" />
                  <span>Tax & VAT Verified</span>
                </span>
                <span className="text-[10px] font-mono text-[#17B681] font-semibold">
                  Auto-Ledger Sync
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Live Data Synchronization Strip */}
          <div className="p-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-[#625D6B]">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-[#17B681] animate-spin" style={{ animationDuration: '6s' }} />
              <span>
                <strong className="text-[#1F1B2D]">Real-Time Data Layer:</strong> Counter POS sales instantly update Invoicing & Inventory stock.
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#6D57A5] font-semibold shrink-0">
              ERPGen Single Core
            </span>
          </div>
        </div>
      </div>

      {/* Floating Status Badges (Clean, Minimal Enterprise Cues) */}
      
      {/* Top Left: Invoice Module Chip */}
      <div className="hero-floating-card hero-floating-card-left absolute -top-3 -left-2 sm:-top-4 sm:-left-4 bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3 shadow-lg border border-[#E9E4F1] flex items-center gap-2.5 z-20 hidden xs:flex">
        <div className="w-7 h-7 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-center text-[#6D57A5] shrink-0">
          <FileText className="w-3.5 h-3.5" />
        </div>
        <div>
          <p className="text-xs font-bold text-[#1F1B2D] leading-none">ERPGen Invoice</p>
          <p className="text-[10px] text-[#17B681] font-semibold mt-0.5">Automated Tax & PDF</p>
        </div>
      </div>

      {/* Bottom Right: POS Module Chip */}
      <div className="hero-floating-card hero-floating-card-right absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-4 bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3 shadow-lg border border-[#E9E4F1] flex items-center gap-2.5 z-20">
        <div className="w-7 h-7 rounded-lg bg-[#E4F8F0] border border-[#17B681]/30 flex items-center justify-center text-[#17B681] shrink-0">
          <Zap className="w-3.5 h-3.5" />
        </div>
        <div>
          <p className="text-xs font-bold text-[#1F1B2D] leading-none">ERPGen POS</p>
          <p className="text-[10px] text-[#6D57A5] font-semibold mt-0.5">High-Speed Checkout</p>
        </div>
      </div>
    </div>
  );
};


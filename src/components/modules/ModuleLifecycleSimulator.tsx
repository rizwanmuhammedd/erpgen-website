import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  Printer,
  CreditCard,
  Coins,
  ShieldCheck,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export type ProductShowcaseTab = 'invoice' | 'pos';

export const ModuleLifecycleSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProductShowcaseTab>('invoice');
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 3D signature folding / unfolding animation scrubbed with scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'top 25%',
          scrub: 0.6,
        },
      });

      // 1. Stage lifts and rotates from perspective fold
      tl.fromTo(
        stageRef.current,
        {
          transformPerspective: 1400,
          rotateX: 18,
          scale: 0.92,
          y: 45,
          opacity: 0.5,
        },
        {
          rotateX: 0,
          scale: 1,
          y: 0,
          opacity: 1,
          ease: 'power2.out',
        }
      );

      // 2. Document side verification tab unfolds
      tl.fromTo(
        '.document-fold-panel',
        {
          rotateY: -25,
          opacity: 0.4,
          transformOrigin: 'left center',
        },
        {
          rotateY: 0,
          opacity: 1,
          ease: 'power2.out',
        },
        '-=0.3'
      );

      // 3. Progressive reveal of the abstract structural rows
      tl.fromTo(
        '.product-showcase-unfold-row',
        {
          y: 16,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          ease: 'power2.out',
        },
        '-=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#FAF8FC] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E9E4F1] shadow-xs relative overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#6D57A5]/5 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#17B681]/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="relative z-10 space-y-8">
        {/* Header: Title & Interactive Tab Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E4F1]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                Representative Product Previews
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
              <span className="text-[11px] text-[#625D6B] font-medium">Interactive Demo</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F1B2D] font-heading mt-1">
              Explore the Core Modules in Action
            </h3>
          </div>

          {/* Module Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#E9E4F1] shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab('invoice')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'invoice'
                  ? 'bg-[#6D57A5] text-white shadow-xs'
                  : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC]'
              }`}
              aria-pressed={activeTab === 'invoice'}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>ERPGen Invoice</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pos')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'pos'
                  ? 'bg-[#17B681] text-white shadow-xs'
                  : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-[#FAF8FC]'
              }`}
              aria-pressed={activeTab === 'pos'}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>ERPGen POS</span>
            </button>
          </div>
        </div>

        {/* Dynamic Product Showcase: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Narrative Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {activeTab === 'invoice' ? (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-white border border-[#E9E4F1] text-[#6D57A5]">
                  <Sparkles className="w-3 h-3 text-[#17B681]" />
                  <span>Billing & Document Core</span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading leading-tight">
                  Structured Invoicing with Automated Calculations
                </h4>

                <p className="text-sm text-[#625D6B] leading-relaxed">
                  ERPGen Invoice provides an uncluttered, professional billing workflow. Create branded PDF invoices, automate tax and VAT calculations, configure customer payment terms, and maintain an accurate ledger of issued bills.
                </p>

                <div className="space-y-2.5 pt-2 border-t border-[#E9E4F1]">
                  <div className="flex items-center gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                    <span>Clean document structure & brand customization</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                    <span>Automated tax/VAT schedules & exact rounding</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                    <span>Customer billing profiles & payment terms tracking</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                    <span>Instant digital PDF export & ledger continuity</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link to="/products/invoice">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<ArrowRight className="w-4 h-4" />}
                      className="shadow-xs"
                    >
                      Explore ERPGen Invoice
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-white border border-[#E9E4F1] text-[#17B681]">
                  <Sparkles className="w-3 h-3 text-[#6D57A5]" />
                  <span>High-Speed Counter Engine</span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading leading-tight">
                  Touch-Optimized Counter Checkout Operations
                </h4>

                <p className="text-sm text-[#625D6B] leading-relaxed">
                  Engineered for fast-paced retail and service environments. Cashiers select items quickly via touch tiles or barcode scanning, customize item variations, and settle bills across multiple payment methods with zero checkout delay.
                </p>

                <div className="space-y-2.5 pt-2 border-t border-[#E9E4F1]">
                  <div className="flex items-center gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                    <span>Fast touch-based product tiles & barcode scan support</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                    <span>Flexible modifiers & custom item variations</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                    <span>Split payment settlement (Card, Cash, Voucher)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#1F1B2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                    <span>Direct thermal receipt output & live inventory balance</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link to="/products/pos">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<ArrowRight className="w-4 h-4" />}
                      className="shadow-xs bg-[#17B681] hover:bg-[#149d6f]"
                    >
                      Explore ERPGen POS
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Visual Stage (7 cols) */}
          <div className="lg:col-span-7">
            <div
              ref={stageRef}
              className="bg-white rounded-2xl border border-[#E9E4F1] shadow-md overflow-hidden will-change-transform"
            >
              {/* Window Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#FAF8FC] border-b border-[#E9E4F1] text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/30 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#17B681]/40 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/20 inline-block" />
                  </div>
                  <span className="font-mono text-[11px] text-[#625D6B] ml-1">
                    {activeTab === 'invoice'
                      ? 'erpgen.invoice / document-workspace'
                      : 'erpgen.pos / register-terminal-01'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#17B681] animate-pulse" />
                  <span className="text-[10px] font-mono font-semibold text-[#129267]">
                    WORKSPACE PREVIEW
                  </span>
                </div>
              </div>

              {/* Representative Product Mockup Screen */}
              <div className="p-5 sm:p-6">
                {activeTab === 'invoice' ? (
                  /* ABSTRACT INVOICE PRODUCT DOCUMENT */
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {/* Top Brand Accent */}
                    <div className="h-1.5 w-full bg-linear-to-r from-[#6D57A5] to-[#17B681] rounded-full" />

                    {/* Invoice Header */}
                    <div className="product-showcase-unfold-row p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold block">
                          ERPGen Invoicing
                        </span>
                        <h5 className="text-base font-extrabold text-[#1F1B2D] font-heading mt-0.5">
                          Commercial Billing Core
                        </h5>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
                        Document Verified
                      </span>
                    </div>

                    {/* Abstract Document Structure Blocks (Zero fake customer names / fake IDs) */}
                    <div className="product-showcase-unfold-row grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-white border border-[#E9E4F1]">
                        <span className="text-[10px] font-mono text-[#625D6B] block uppercase">Billing Entity</span>
                        <span className="font-bold text-[#1F1B2D] block mt-1">Enterprise Client Account</span>
                        <span className="text-[11px] text-[#17B681] font-medium">Auto-Ledger Synchronized</span>
                      </div>
                      <div className="document-fold-panel p-3.5 rounded-xl bg-white border border-[#E9E4F1]">
                        <span className="text-[10px] font-mono text-[#625D6B] block uppercase">Calculation Engine</span>
                        <span className="font-bold text-[#1F1B2D] block mt-1">Tax & VAT Schedules</span>
                        <span className="text-[11px] text-[#6D57A5] font-medium">Automated Rounding</span>
                      </div>
                    </div>

                    {/* Abstract Itemized Delivery Blocks */}
                    <div className="product-showcase-unfold-row p-3.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-2">
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E9E4F1]">
                        <span className="font-bold text-[#1F1B2D]">Configured Deliverables</span>
                        <span className="text-[10px] font-mono text-[#625D6B]">Summary Ready</span>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E9E4F1]">
                          <span className="font-semibold text-[#1F1B2D]">Enterprise Platform Subscription</span>
                          <span className="text-[10px] font-mono font-bold text-[#17B681] bg-[#E4F8F0] px-2 py-0.5 rounded">Active Plan</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E9E4F1]">
                          <span className="font-semibold text-[#1F1B2D]">Synchronized POS Hardware Station</span>
                          <span className="text-[10px] font-mono font-bold text-[#6D57A5] bg-[#FAF8FC] px-2 py-0.5 rounded">Linked Register</span>
                        </div>
                      </div>
                    </div>

                    {/* Clean Summary Area (Zero fake dollar calculations) */}
                    <div className="product-showcase-unfold-row p-3.5 rounded-xl bg-white border border-[#6D57A5]/30 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] font-mono text-[#625D6B] block uppercase">Financial Status</span>
                        <span className="font-bold text-[#1F1B2D] text-sm mt-0.5 block">Automated Balance Reconciled</span>
                      </div>
                      <span className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#6D57A5] shadow-xs">
                        Instant PDF Export
                      </span>
                    </div>

                    {/* Status Note */}
                    <div className="product-showcase-unfold-row flex items-center justify-between text-xs text-[#625D6B] pt-1">
                      <span className="flex items-center gap-1.5 text-[#129267] font-medium">
                        <ShieldCheck className="w-4 h-4 text-[#17B681]" />
                        <span>Ready for one-click branded export or ledger post</span>
                      </span>
                      <span className="font-mono text-[10px] text-[#6D57A5] font-semibold">ERPGen Invoice</span>
                    </div>
                  </div>
                ) : (
                  /* ABSTRACT POS INTERFACE */
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {/* Top Brand Accent */}
                    <div className="h-1.5 w-full bg-linear-to-r from-[#17B681] to-[#6D57A5] rounded-full" />

                    {/* Register Header */}
                    <div className="product-showcase-unfold-row p-3.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#17B681] font-bold block">
                          Counter Register
                        </span>
                        <h5 className="text-sm font-bold text-[#1F1B2D] mt-0.5">
                          Active Checkout Lane
                        </h5>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
                        Counter Ready
                      </span>
                    </div>

                    {/* Touch Item Grid */}
                    <div className="product-showcase-unfold-row grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                      <div className="p-3 rounded-xl bg-[#FAF8FC] border border-[#6D57A5] text-[#1F1B2D] font-bold text-center">
                        Beverages
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-[#E9E4F1] text-[#625D6B] text-center">
                        Food & Dining
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-[#E9E4F1] text-[#625D6B] text-center">
                        Retail Pack
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-[#E9E4F1] text-[#625D6B] text-center">
                        Services
                      </div>
                    </div>

                    {/* Active Order Card & Settlement */}
                    <div className="product-showcase-unfold-row p-3.5 rounded-xl bg-white border border-[#E9E4F1] shadow-2xs space-y-2.5 text-xs">
                      <div className="flex justify-between items-center pb-2 border-b border-[#E9E4F1]">
                        <span className="font-bold text-[#1F1B2D]">Active Ticket</span>
                        <span className="text-[10px] font-mono text-[#17B681] font-semibold">Ready for Settlement</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                        <div className="p-2 rounded-lg bg-[#FAF8FC] border border-[#6D57A5]/40 text-[#6D57A5] font-semibold text-center flex items-center justify-center gap-1">
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Card</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-[#E9E4F1] text-[#625D6B] font-semibold text-center flex items-center justify-center gap-1">
                          <Coins className="w-3.5 h-3.5" />
                          <span>Cash</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-[#E9E4F1] text-[#625D6B] font-semibold text-center flex items-center justify-center gap-1">
                          <Layers className="w-3.5 h-3.5" />
                          <span>Split</span>
                        </div>
                      </div>
                    </div>

                    {/* POS Status Strip */}
                    <div className="product-showcase-unfold-row p-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-between text-xs text-[#625D6B]">
                      <div className="flex items-center gap-1.5 text-[#129267] font-semibold">
                        <Printer className="w-3.5 h-3.5 text-[#17B681]" />
                        <span>Thermal receipt issued · Live stock synchronized</span>
                      </div>
                      <span className="font-mono text-[10px] text-[#6D57A5] font-semibold">ERPGen POS</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

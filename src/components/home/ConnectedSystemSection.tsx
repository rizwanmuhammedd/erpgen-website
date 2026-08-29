import React, { useEffect, useRef, useState } from 'react';
import {
  ShoppingBag,
  FileText,
  Package,
  Users,
  BarChart3,
  ArrowRightLeft,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const ConnectedSystemSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<number>(0);

  const nodes = [
    {
      id: 'pos',
      title: 'POS Terminals',
      category: 'Counter Execution',
      desc: 'Instant barcode scan, touch tickets, split tenders',
      icon: ShoppingBag,
      impact: 'Triggers instant stock deduction & sales logging',
    },
    {
      id: 'invoice',
      title: 'Invoicing Engine',
      category: 'Financial Core',
      desc: 'Automatic PDF generation, tax compliance, receipts',
      icon: FileText,
      impact: 'Creates verifiable records & accounts receivable',
    },
    {
      id: 'inventory',
      title: 'Live Inventory',
      category: 'Stock Operations',
      desc: 'Synchronized stock counts across all counter registers',
      icon: Package,
      impact: 'Prevents stockouts and updates reorder thresholds',
    },
    {
      id: 'customers',
      title: 'Customer Accounts',
      category: 'Client History',
      desc: 'Centralized purchase histories, points, and balances',
      icon: Users,
      impact: 'Builds lifetime relationship records per buyer',
    },
    {
      id: 'reports',
      title: 'Real-Time Insights',
      category: 'Executive Overview',
      desc: 'Continuous register balances, margins, and revenue',
      icon: BarChart3,
      impact: 'Aggregates end-of-day reconciliation automatically',
    },
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        diagramRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: diagramRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 relative overflow-hidden bg-[#FAF8FC] border-b border-[#E9E4F1]"
      aria-label="Connected ERP Architecture"
    >
      <Container size="xl" className="space-y-12 lg:space-y-16">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="THE CONNECTED ADVANTAGE"
          title="Every operation."
          titleGradient="One connected system."
          description="ERPGen connects the critical engines your business depends on, so every counter checkout, invoice, and stock change instantly reflects in one synchronized operational picture."
        />

        {/* Signature Architecture Visualization */}
        <div
          ref={diagramRef}
          className="rounded-2xl sm:rounded-3xl bg-white border border-[#E9E4F1] p-6 sm:p-8 lg:p-12 shadow-sm relative overflow-hidden"
        >
          {/* Top Synchronization Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-[#E9E4F1]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold shadow-xs">
                <ArrowRightLeft className="w-5 h-5 text-[#6D57A5]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold block">
                  Synchronized Data Layer
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-[#1F1B2D] font-heading">
                  Single Source of Truth Architecture
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
                Zero Data Fragmentation
              </span>
            </div>
          </div>

          {/* 5-Node Interactive Continuity Track */}
          <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {nodes.map((node, index) => {
              const Icon = node.icon;
              const isSelected = activeNode === index;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(index)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-white border-[#6D57A5]/40 shadow-md ring-2 ring-[#6D57A5] -translate-y-1'
                      : 'bg-[#FAF8FC] border-[#E9E4F1] hover:bg-white hover:border-[#6D57A5]/30 hover:shadow-xs hover:-translate-y-0.5'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveNode(index);
                    }
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#6D57A5] text-white shadow-xs'
                            : 'bg-white border border-[#E9E4F1] text-[#6D57A5] group-hover:border-[#6D57A5]/30'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#625D6B]/40 group-hover:text-[#6D57A5]">
                        0{index + 1}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#17B681] font-semibold uppercase tracking-wider block">
                        {node.category}
                      </span>
                      <h5 className="text-sm font-bold text-[#1F1B2D] font-heading mt-0.5 group-hover:text-[#6D57A5] transition-colors">
                        {node.title}
                      </h5>
                    </div>

                    <p className="text-xs text-[#625D6B] leading-relaxed">
                      {node.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E9E4F1] text-[11px] text-[#625D6B]">
                    <span className={isSelected ? 'text-[#6D57A5] font-semibold' : ''}>
                      {node.impact}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Data Continuity Ribbon */}
          <div className="pt-6 border-t border-[#E9E4F1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#625D6B]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#17B681] shrink-0" />
              <span>
                Seamless synchronization between <strong className="text-[#1F1B2D]">ERPGen POS</strong> and <strong className="text-[#1F1B2D]">ERPGen Invoice</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#6D57A5] font-mono font-medium">
              <Zap className="w-3.5 h-3.5 text-[#17B681]" />
              <span>ERPGen Event Continuity Engine</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

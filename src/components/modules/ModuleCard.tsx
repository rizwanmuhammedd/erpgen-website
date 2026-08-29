import React from 'react';
import { FileText, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';

interface ModuleCardProps {
  id: 'invoice' | 'pos';
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onToggle: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  id,
  title,
  subtitle,
  description,
  icon,
  isSelected,
  onToggle,
}) => {
  return (
    <Card
      variant={isSelected ? 'brand-border' : 'default'}
      onClick={onToggle}
      className={`cursor-pointer transition-all duration-300 relative group flex flex-col justify-between select-none p-6 sm:p-8 ${
        isSelected
          ? 'bg-white ring-2 ring-[#6D57A5] shadow-lg border-[#6D57A5]/30 -translate-y-1'
          : 'bg-[#FAF8FC] hover:bg-white hover:border-[#6D57A5]/40 hover:shadow-md hover:-translate-y-0.5 border-[#E9E4F1]'
      }`}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Select ${title} module`}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <div className="space-y-5">
        {/* Header: Icon & Selection Indicator */}
        <div className="flex items-center justify-between">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isSelected
                ? 'bg-[#6D57A5] text-white shadow-md shadow-[#6D57A5]/20'
                : 'bg-white text-[#6D57A5] border border-[#E9E4F1] group-hover:border-[#6D57A5]/30 shadow-xs'
            }`}
          >
            {icon}
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${
                isSelected
                  ? 'bg-[#E4F8F0] text-[#129267] border-[#17B681]/30 font-bold'
                  : 'bg-white text-[#625D6B] border-[#E9E4F1] group-hover:border-[#6D57A5]/40'
              }`}
            >
              {isSelected ? '? Active in Suite' : '+ Select Module'}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <span className="text-[10px] font-mono text-[#17B681] font-semibold uppercase tracking-wider block">
            {subtitle}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1F1B2D] font-heading tracking-tight mt-1 group-hover:text-[#6D57A5] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-[#625D6B] leading-relaxed mt-2 font-normal">
            {description}
          </p>
        </div>

        {/* Tangible Mini Product Interface Preview */}
        <div className="p-4 rounded-xl bg-white border border-[#E9E4F1] shadow-2xs space-y-2.5 text-xs">
          {id === 'invoice' ? (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-[#E9E4F1]">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#1F1B2D] font-bold">
                  <FileText className="w-3.5 h-3.5 text-[#6D57A5]" />
                  <span>Invoice #INV-2026-88</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#E4F8F0] text-[#129267] text-[10px] font-semibold">
                  Paid & Confirmed
                </span>
              </div>
              <div className="flex items-center justify-between text-[#625D6B] text-[11px]">
                <span>Commercial Client Billing</span>
                <span className="font-mono text-[#17B681] font-bold text-xs">$1,480.00</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-[#E9E4F1]">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#1F1B2D] font-bold">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#17B681]" />
                  <span>POS Terminal 01</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#E4F8F0] text-[#129267] text-[10px] font-semibold">
                  Live Register
                </span>
              </div>
              <div className="flex items-center justify-between text-[#625D6B] text-[11px]">
                <span>Fast Touch Checkout</span>
                <span className="font-mono text-[#17B681] font-bold text-xs">$84.50</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer Visual Status */}
      <div className="mt-6 pt-4 border-t border-[#E9E4F1] flex items-center justify-between text-xs font-medium">
        <span className={isSelected ? 'text-[#6D57A5] font-semibold' : 'text-[#625D6B]'}>
          {isSelected ? 'Configured in synchronized core' : 'Standalone deployment ready'}
        </span>
        <span className="text-[11px] font-mono tracking-wider uppercase text-[#17B681] font-bold flex items-center gap-1">
          <span>Enterprise Ready</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681]" />
        </span>
      </div>
    </Card>
  );
};

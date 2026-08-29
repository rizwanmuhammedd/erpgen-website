import React from 'react';
import { FileText, ShoppingBag, ShieldCheck } from 'lucide-react';

interface HeroProductVisualProps {
  imageSrc?: string;
  className?: string;
}

export const HeroProductVisual: React.FC<HeroProductVisualProps> = ({
  imageSrc = '/images/erpgen-app-preview.jpg',
  className = '',
}) => {
  return (
    <div className={`relative w-full max-w-2xl mx-auto lg:max-w-none group ${className}`}>
      {/* Background Ambient Glow Behind Frame */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-[#6D57A5]/15 via-[#6D57A5]/5 to-[#17B681]/15 rounded-[28px] blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

      {/* Main Application Window Frame */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-[#E9E4F1] shadow-2xl shadow-[#6D57A5]/10 overflow-hidden backdrop-blur-xl">
        {/* macOS Style Window Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#FAF8FC] border-b border-[#E9E4F1] text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#6D57A5]/40 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#17B681]/40 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#6D57A5]/20 inline-block" />
            </div>
            <div className="h-3.5 w-px bg-[#E9E4F1] mx-1 hidden sm:block" />
            <span className="text-[#625D6B] font-mono text-[11px] hidden sm:inline-block">
              erpgen.app / workspace
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
              Connected
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#6D57A5]" />
          </div>
        </div>

        {/* Screenshot / Application Preview Viewport */}
        <div className="relative aspect-[16/10] bg-[#FAF8FC] overflow-hidden flex items-center justify-center border-b border-[#E9E4F1]">
          <img
            src={imageSrc}
            alt="ERPGen Application Interface Preview"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                parent.classList.add('p-8');
              }
            }}
          />

          {/* Subtle Viewport Inner Gradient Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#6D57A5]/5 via-transparent to-transparent" />
        </div>
      </div>

      {/* Floating Status Badges (Clean, Minimal Enterprise Cues) */}
      
      {/* Top Left: Invoice Module Badge */}
      <div className="hero-floating-card absolute -top-3 -left-3 sm:-top-5 sm:-left-5 bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3 shadow-lg border border-[#E9E4F1] flex items-center gap-2.5 z-20 hidden xs:flex">
        <div className="w-7 h-7 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-center text-[#6D57A5] shrink-0">
          <FileText className="w-3.5 h-3.5" />
        </div>
        <div>
          <p className="text-xs font-bold text-[#1F1B2D] leading-none">ERPGen Invoice</p>
          <p className="text-[10px] text-[#17B681] font-semibold mt-0.5">Billing & Accounts</p>
        </div>
      </div>

      {/* Bottom Right: POS Module Badge */}
      <div className="hero-floating-card absolute -bottom-4 -right-3 sm:-bottom-5 sm:-right-5 bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3 shadow-lg border border-[#E9E4F1] flex items-center gap-2.5 z-20">
        <div className="w-7 h-7 rounded-lg bg-[#E4F8F0] border border-[#17B681]/30 flex items-center justify-center text-[#17B681] shrink-0">
          <ShoppingBag className="w-3.5 h-3.5" />
        </div>
        <div>
          <p className="text-xs font-bold text-[#1F1B2D] leading-none">ERPGen POS</p>
          <p className="text-[10px] text-[#6D57A5] font-semibold mt-0.5">High-Speed Register</p>
        </div>
      </div>
    </div>
  );
};

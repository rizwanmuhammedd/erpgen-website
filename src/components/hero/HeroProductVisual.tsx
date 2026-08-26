import React from 'react';
import { FileText, ShoppingBag, Sliders, ShieldCheck } from 'lucide-react';

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

      {/* Floating Module Badges (Subtle Visual Cues) */}
      
      {/* Top Left: Invoice Module Badge */}
      <div className="hero-floating-card absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-white rounded-xl p-3 shadow-xl border border-[#E9E4F1] flex items-center gap-2.5 z-20 hidden xs:flex">
        <div className="w-8 h-8 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-center text-[#6D57A5]">
          <FileText className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-[#1F1B2D] leading-none">Invoice Module</p>
          <p className="text-[10px] text-[#17B681] font-semibold mt-0.5">Standalone or Combined</p>
        </div>
      </div>

      {/* Bottom Right: POS Module Badge */}
      <div className="hero-floating-card absolute -bottom-5 -right-4 sm:-bottom-6 sm:-right-6 bg-white rounded-xl p-3 shadow-xl border border-[#E9E4F1] flex items-center gap-2.5 z-20">
        <div className="w-8 h-8 rounded-lg bg-[#E4F8F0] border border-[#17B681]/30 flex items-center justify-center text-[#17B681]">
          <ShoppingBag className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-[#1F1B2D] leading-none">POS Counter</p>
          <p className="text-[10px] text-[#6D57A5] font-semibold mt-0.5">High-Speed Checkout</p>
        </div>
      </div>

      {/* Top Right: Custom Configuration Badge */}
      <div className="hero-floating-card absolute top-1/2 -right-6 -translate-y-1/2 bg-white rounded-xl py-2 px-3 shadow-xl border border-[#E9E4F1] items-center gap-2 z-20 hidden lg:flex">
        <div className="w-6 h-6 rounded-md bg-[#FAF8FC] flex items-center justify-center text-[#17B681]">
          <Sliders className="w-3.5 h-3.5" />
        </div>
        <span className="text-[11px] font-bold text-[#1F1B2D]">Flexible Module Selection</span>
      </div>
    </div>
  );
};

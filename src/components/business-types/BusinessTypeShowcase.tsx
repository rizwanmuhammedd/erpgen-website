import React from 'react';
import { Link } from 'react-router-dom';
import {
  Utensils,
  Scissors,
  ShoppingCart,
  Shirt,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import type { PosBusinessType } from '../../types';
import { Button } from '../ui/Button';

interface BusinessTypeShowcaseProps {
  businessId: PosBusinessType;
}

export const BusinessTypeShowcase: React.FC<BusinessTypeShowcaseProps> = ({
  businessId,
}) => {
  const businessData = {
    restaurant: {
      icon: Utensils,
      title: 'Restaurant & Food Service',
      tagline: 'Connected operations for modern restaurants.',
      description:
        'Fast counter ordering, table-side coordination, and instant thermal receipt printing designed for high-turnover dining.',
      path: '/products/pos/restaurant',
      badge: 'Restaurant Mode',
    },
    barbershop: {
      icon: Scissors,
      title: 'Barbershop & Grooming',
      tagline: 'Simple business management for service teams.',
      description:
        'Effortless client checkout, combined service and retail product billing, and staff tracking tailored for grooming teams.',
      path: '/products/pos/barbershop',
      badge: 'Salon Mode',
    },
    supermarket: {
      icon: ShoppingCart,
      title: 'Supermarket & Retail',
      tagline: 'Fast, connected retail operations.',
      description:
        'Rapid barcode checkout, multi-lane register synchronization, and live inventory adjustments built for high-volume stores.',
      path: '/products/pos/supermarket',
      badge: 'Retail Mode',
    },
    laundry: {
      icon: Shirt,
      title: 'Laundry & Dry Cleaning',
      tagline: 'Organized workflows for modern laundry businesses.',
      description:
        'Clear garment intake, drop-off ticket generation, and scheduled customer pickup management unified in one register.',
      path: '/products/pos/laundry',
      badge: 'Laundry Mode',
    },
  };

  const data = businessData[businessId];
  const IconComponent = data.icon;

  return (
    <div
      key={businessId}
      className="w-full bg-[#FAF8FC] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E9E4F1] shadow-xs relative overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Focused Narrative (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold shadow-2xs shrink-0">
                <IconComponent className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                {data.title}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading tracking-tight leading-snug">
              {data.tagline}
            </h3>

            <p className="text-sm text-[#625D6B] font-normal leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Simple CTA */}
          <div className="pt-2">
            <Link to={data.path}>
              <Button
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                className="shadow-md shadow-[#6D57A5]/20"
              >
                Explore {data.title}
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Clean Representative Product Visual Card (6 cols) */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl bg-white border border-[#E9E4F1] shadow-sm overflow-hidden">
            {/* Window Titlebar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#FAF8FC] border-b border-[#E9E4F1] text-xs">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/40 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#17B681]/40 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6D57A5]/20 inline-block" />
                </div>
                <span className="font-mono text-[11px] text-[#625D6B] ml-1">
                  erpgen.pos / {businessId}
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
                {data.badge} Active
              </span>
            </div>

            {/* Visual Workspace Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#625D6B] block">
                    Connected Architecture
                  </span>
                  <span className="text-base font-bold text-[#1F1B2D] font-heading mt-0.5 block">
                    {data.title} Register
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold">
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#17B681] animate-pulse" />
                  <span className="font-semibold text-[#1F1B2D]">Live Data Continuity</span>
                </div>
                <span className="text-[#6D57A5] font-mono text-[11px] font-medium">
                  Front Counter ↔ Invoicing ↔ Inventory
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs text-[#625D6B]">
                <span className="flex items-center gap-1.5 text-[#17B681]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pre-configured out of the box</span>
                </span>
                <span className="font-mono text-[11px] text-[#6D57A5]">ERPGen Platform</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

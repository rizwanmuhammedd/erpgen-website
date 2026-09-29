import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Utensils,
  Scissors,
  ShoppingCart,
  Shirt,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import type { PosBusinessType } from '../../types';
import { BUSINESS_TYPE_SPECS } from '../../data/businessTypeData';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

interface BusinessTypeShowcaseProps {
  businessId: PosBusinessType;
}

export const BusinessTypeShowcase: React.FC<BusinessTypeShowcaseProps> = ({
  businessId,
}) => {
  const { isRtl, t } = useLanguage();
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    if (leftColRef.current && rightColRef.current) {
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0.65, x: isRtl ? 10 : -10 },
        { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
      );

      gsap.fromTo(
        rightColRef.current,
        { opacity: 0.75, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.showcase-cap-item',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [businessId, isRtl]);
  const businessData = {
    restaurant: {
      icon: Utensils,
      title: t('businessShowcase.restTitle'),
      tagline: t('businessShowcase.restTagline'),
      description: t('businessShowcase.restDesc'),
      path: '/products/pos/restaurant',
      badge: t('businessShowcase.restBadge'),
    },
    barbershop: {
      icon: Scissors,
      title: t('businessShowcase.barberTitle'),
      tagline: t('businessShowcase.barberTagline'),
      description: t('businessShowcase.barberDesc'),
      path: '/products/pos/barbershop',
      badge: t('businessShowcase.barberBadge'),
    },
    supermarket: {
      icon: ShoppingCart,
      title: t('businessShowcase.superTitle'),
      tagline: t('businessShowcase.superTagline'),
      description: t('businessShowcase.superDesc'),
      path: '/products/pos/supermarket',
      badge: t('businessShowcase.superBadge'),
    },
    laundry: {
      icon: Shirt,
      title: t('businessShowcase.laundryTitle'),
      tagline: t('businessShowcase.laundryTagline'),
      description: t('businessShowcase.laundryDesc'),
      path: '/products/pos/laundry',
      badge: t('businessShowcase.laundryBadge'),
    },
  };

  const data = businessData[businessId];
  const spec = BUSINESS_TYPE_SPECS.find((s) => s.id === businessId);
  const IconComponent = data.icon;

  return (
    <div
      key={businessId}
      className="w-full bg-[#FAF8FC] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 lg:p-6 border border-[#E9E4F1] shadow-xs relative overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center relative z-10">
        {/* Left Column: Focused Narrative (6 cols) */}
        <div ref={leftColRef} className="lg:col-span-6 space-y-2.5 sm:space-y-4 text-start">
          <div className="space-y-1.5 sm:space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold shadow-2xs shrink-0">
                <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                {data.title}
              </span>
            </div>

            <h3 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#1F1B2D] font-heading tracking-tight leading-snug">
              {data.tagline}
            </h3>

            <p className="text-xs sm:text-sm text-[#625D6B] font-normal leading-relaxed line-clamp-2 sm:line-clamp-3 lg:line-clamp-none">
              {data.description}
            </p>
          </div>

          {/* Simple CTA */}
          <div className="pt-1">
            <Link to={data.path}>
              <Button
                variant="primary"
                size="sm"
                icon={<ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isRtl ? 'rotate-180' : ''}`} />}
                className="shadow-md shadow-[#6D57A5]/20"
              >
                {t('businessShowcase.explore').replace('{title}', data.title)}
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Clean Representative Product Visual Card (6 cols) */}
        <div ref={rightColRef} className="lg:col-span-6">
          <div className="rounded-xl sm:rounded-2xl bg-white border border-[#E9E4F1] shadow-sm hover:shadow-md hover:border-[#6D57A5]/30 transition-all duration-300 overflow-hidden group">
            {/* Window Titlebar */}
            <div className="flex items-center justify-between px-3.5 py-2 sm:px-4 sm:py-2.5 bg-[#FAF8FC] border-b border-[#E9E4F1] text-xs">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#6D57A5]/40 inline-block" />
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#17B681]/40 inline-block" />
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#6D57A5]/20 inline-block" />
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] text-[#625D6B] ml-1">
                  erpgen.pos / {businessId}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30">
                {data.badge} {isRtl ? 'نشط' : 'Active'}
              </span>
            </div>

            {/* Visual Workspace Content */}
            <div className="p-3.5 sm:p-4 lg:p-5 space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#625D6B] block">
                    {t('businessShowcase.tailoredMode')}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#1F1B2D] font-heading mt-0.5 block">
                    {t('businessShowcase.register').replace('{title}', data.title)}
                  </span>
                </div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold">
                  <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
              </div>

              {/* Verified High-Level Capabilities Grid */}
              <div className="space-y-1.5 pt-0.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  {spec?.keyCapabilities.map((cap, idx) => {
                    const capKey = 'posPages.' + (businessId === 'restaurant' ? 'restCap' : businessId === 'barbershop' ? 'barberCap' : businessId === 'supermarket' ? 'superCap' : 'laundryCap') + (idx + 1);
                    const translatedCap = t(capKey as any);
                    return (
                      <div
                        key={cap}
                        className="showcase-cap-item flex items-center gap-1.5 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-xs text-[#1F1B2D]"
                      >
                        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#17B681] shrink-0" />
                        <span className="font-medium text-[10px] sm:text-[11px] leading-snug line-clamp-1">{translatedCap || cap}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#17B681] animate-pulse" />
                  <span className="font-semibold text-[#1F1B2D] text-[10px] sm:text-xs">{t('businessShowcase.liveContinuity')}</span>
                </div>
                <span className="text-[#6D57A5] font-mono text-[9px] sm:text-[10px] font-medium hidden sm:inline">
                  {t('businessShowcase.syncPath')}
                </span>
              </div>

              <div className="flex items-center justify-between pt-0.5 text-[10px] sm:text-xs text-[#625D6B]">
                <span className="flex items-center gap-1.5 text-[#17B681]">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{t('businessShowcase.outOfBox')}</span>
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-[#6D57A5] shrink-0 ml-1">ERPGen Platform</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

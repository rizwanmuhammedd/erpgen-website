import React, { useEffect, useRef } from 'react';
import {
  ShoppingBag,
  Truck,
  Package,
  Users,
  FolderKanban,
  Coins,
  Sparkles,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { CORE_ERP_MODULES, type CoreErpModule } from '../../data/productData';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

const ICON_MAP = {
  ShoppingBag,
  Truck,
  Package,
  Users,
  FolderKanban,
  Coins,
};

export const WhatIsERPGenSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const visualBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Masked headline and eyebrow reveal
      if (eyebrowRef.current && headingRef.current) {
        gsap.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: -12, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: eyebrowRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Signature "Module Assembly / Fan" animation
      // Cards start slightly fanned and rotated, then assemble into an aligned grid
      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          {
            transformPerspective: 1200,
            rotateX: 16,
            y: 45,
            opacity: 0.15,
            scale: 0.94,
          },
          {
            rotateX: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 0.6,
            },
          }
        );
      }

      // Visual banner subtle lift and depth
      if (visualBannerRef.current) {
        gsap.fromTo(
          visualBannerRef.current,
          {
            y: 35,
            opacity: 0.6,
            scale: 0.97,
            transformPerspective: 1200,
            rotateX: 6,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: visualBannerRef.current,
              start: 'top 88%',
              end: 'top 55%',
              scrub: 0.6,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="core-modules"
      className="py-20 lg:py-28 relative overflow-hidden bg-[#FAF8FC] border-y border-[#E9E4F1]"
      aria-label="What is ERPGen and Core ERP Modules"
    >
      {/* Background Spatial Radiance */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6D57A5]/5 blur-[120px] rounded-full pointer-events-none" />

      <Container size="xl" className="space-y-16 relative z-10">
        {/* WHAT IS ERPGEN: High-Level Product Definition */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div ref={eyebrowRef} className="inline-flex items-center">
            <Badge variant="brand" icon={<Sparkles className="w-3.5 h-3.5 text-[#17B681]" />}>
              WHAT IS ERPGEN?
            </Badge>
          </div>

          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F1B2D] tracking-tight font-heading leading-[1.15]"
          >
            A configurable ERP platform that brings{' '}
            <span className="text-gradient-brand">core business operations</span> into one system.
          </h2>

          <p className="text-base sm:text-lg text-[#625D6B] font-normal leading-relaxed max-w-2xl mx-auto">
            ERPGen replaces isolated software tools with a single, synchronized platform. Connect your counter checkouts, customer billing, live inventory, and operational records into one continuous workflow.
          </p>
        </div>

        {/* CORE ERP MODULES: Concise 6-Module Grid */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E9E4F1]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold block">
                CORE ERP MODULES
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1F1B2D] font-heading mt-0.5">
                The Essential Operations of Modern Business
              </h3>
            </div>
            <span className="text-xs text-[#625D6B] font-medium flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#17B681]" />
              <span>Deploy individually or as a combined suite</span>
            </span>
          </div>

          <div
            ref={cardsGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            role="region"
            aria-label="ERPGen Core Modules"
          >
            {CORE_ERP_MODULES.map((mod: CoreErpModule, idx: number) => {
              const IconComponent = ICON_MAP[mod.iconName] || ShoppingBag;
              return (
                <div
                  key={mod.id}
                  className="p-6 rounded-2xl bg-white border border-[#E9E4F1] shadow-2xs hover:border-[#6D57A5]/40 hover:shadow-md transition-all duration-300 group flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center group-hover:bg-[#6D57A5] group-hover:text-white transition-all shadow-2xs">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-[#625D6B]/50 group-hover:text-[#6D57A5] transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#17B681] font-semibold uppercase tracking-wider block">
                        {mod.category}
                      </span>
                      <h4 className="text-lg font-bold text-[#1F1B2D] font-heading mt-0.5 group-hover:text-[#6D57A5] transition-colors">
                        {mod.name}
                      </h4>
                    </div>

                    <p className="text-xs text-[#625D6B] leading-relaxed">
                      {mod.valueStatement}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E9E4F1] flex items-center justify-between text-[11px] text-[#625D6B]">
                    <span className="font-medium text-[#17B681]">Synchronized Core</span>
                    <span className="font-mono text-[10px] text-[#625D6B]/60">ERPGen</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conceptual Visual Anchor: From Modules into One Hub */}
        <div
          ref={visualBannerRef}
          className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-white via-[#FAF8FC] to-white border border-[#E9E4F1] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="space-y-1.5 max-w-xl">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold block">
              FLEXIBLE ADOPTION
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-[#1F1B2D] font-heading">
              Start with the module you need most today.
            </h4>
            <p className="text-xs text-[#625D6B] leading-relaxed">
              Whether your priority is rapid counter POS checkout or structured invoicing, ERPGen lets you adopt individual modules and connect them as your operations expand.
            </p>
          </div>

          <a
            href="#connected-system"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E9E4F1] text-xs font-semibold text-[#1F1B2D] hover:text-[#6D57A5] hover:border-[#6D57A5]/40 shadow-2xs hover:shadow-xs transition-all shrink-0"
          >
            <span>See the Connected System</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#17B681]" />
          </a>
        </div>
      </Container>
    </section>
  );
};

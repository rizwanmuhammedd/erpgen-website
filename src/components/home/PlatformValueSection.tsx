import React, { useEffect, useRef } from 'react';
import { Layers, RefreshCw, Briefcase, Zap } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const PlatformValueSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const pillars = [
    {
      icon: Layers,
      title: 'Modular Architecture',
      subtitle: 'Start with what you need',
      description: 'Deploy standalone Invoicing or POS counter operations, then seamlessly expand into a combined ERP suite without data migration.',
    },
    {
      icon: RefreshCw,
      title: 'Real-Time Continuity',
      subtitle: 'One synchronized data core',
      description: 'Every checkout, return, and invoice instantly reflects across your stock levels, customer balances, and operational reports.',
    },
    {
      icon: Briefcase,
      title: 'Tailored Workflows',
      subtitle: 'Built for actual business models',
      description: 'Configured workflows for restaurants, retail supermarkets, barbershops, and laundry services without generic software compromises.',
    },
    {
      icon: Zap,
      title: 'Enterprise Velocity',
      subtitle: 'Engineered for high volume',
      description: 'Lightning-fast counter checkout, instant receipt printing, and high-uptime infrastructure designed to keep operations moving.',
    },
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
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
      className="py-20 lg:py-28 relative overflow-hidden bg-[#FAF8FC] border-y border-[#E9E4F1]"
      aria-label="Platform Architecture Overview"
    >
      <Container size="xl" className="space-y-12 lg:space-y-16">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="ONE CONNECTED PLATFORM"
          title="Designed for simplicity."
          titleGradient="Engineered for scale."
          description="ERPGen replaces fragmented software tools with a single, synchronized business engine. Connect your front-counter sales directly to back-office billing, stock records, and performance insights."
        />

        {/* 4 Architectural Value Columns (Clean, Lightweight Enterprise Layout) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="pt-6 border-t border-[#E9E4F1] hover:border-[#6D57A5] transition-colors duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center group-hover:bg-[#6D57A5] group-hover:text-white transition-all duration-300 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#625D6B]/40 group-hover:text-[#6D57A5] transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#17B681] font-semibold uppercase tracking-wider block">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-lg font-bold text-[#1F1B2D] font-heading mt-1 group-hover:text-[#6D57A5] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#625D6B] leading-relaxed mt-2.5">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

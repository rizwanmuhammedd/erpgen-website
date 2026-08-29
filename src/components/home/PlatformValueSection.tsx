import React, { useEffect, useRef } from 'react';
import { Layers, RefreshCw, Briefcase, Zap, ArrowRight } from 'lucide-react';
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
      className="py-16 lg:py-24 relative overflow-hidden bg-white border-b border-[#E9E4F1]"
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

        {/* 4 Value Pillars Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] hover:border-[#6D57A5]/40 hover:bg-white transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center group-hover:bg-[#6D57A5] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#17B681] font-semibold uppercase tracking-wider block">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-lg font-bold text-[#1F1B2D] font-heading mt-1 group-hover:text-[#6D57A5] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#625D6B] leading-relaxed mt-2">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E9E4F1] flex items-center text-[11px] font-semibold text-[#6D57A5] group-hover:text-[#584488] transition-colors">
                  <span>Explore capability</span>
                  <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

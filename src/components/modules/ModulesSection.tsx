import React, { useState, useEffect, useRef } from 'react';
import { FileText, ShoppingBag } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { ModuleCard } from './ModuleCard';
import { ModuleLifecycleSimulator } from './ModuleLifecycleSimulator';
import { ModuleConfigurator } from './ModuleConfigurator';
import { CustomConfiguration } from './CustomConfiguration';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const ModulesSection: React.FC = () => {
  // Selection state: defaults to both Invoice & POS active to showcase full capability
  const [selectedModules, setSelectedModules] = useState<string[]>(['invoice', 'pos']);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const simulatorRef = useRef<HTMLDivElement>(null);
  const configuratorRef = useRef<HTMLDivElement>(null);
  const customRef = useRef<HTMLDivElement>(null);
  const { t, isRtl } = useLanguage();

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const invoiceSelected = selectedModules.includes('invoice');
  const posSelected = selectedModules.includes('pos');

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Spatial inward convergence: from ERP platform engine into concrete applications
      if (cardsRef.current && cardsRef.current.children.length >= 2) {
        const [cardInvoice, cardPos] = Array.from(cardsRef.current.children) as HTMLElement[];
        const lateralShift = isRtl ? -36 : 36;

        gsap.fromTo(
          cardInvoice,
          {
            x: -lateralShift,
            y: 18,
            scale: 0.97,
            opacity: 0.3,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              end: 'top 48%',
              scrub: 0.5,
            },
          }
        );

        gsap.fromTo(
          cardPos,
          {
            x: lateralShift,
            y: 18,
            scale: 0.97,
            opacity: 0.3,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              end: 'top 48%',
              scrub: 0.5,
            },
          }
        );
      }

      // Configurator and custom panels smooth elevation
      if (configuratorRef.current) {
        gsap.fromTo(
          configuratorRef.current,
          {
            scale: 0.98,
            y: 24,
            opacity: 0.4,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: configuratorRef.current,
              start: 'top 85%',
              end: 'top 52%',
              scrub: 0.5,
            },
          }
        );
      }

      if (customRef.current) {
        gsap.fromTo(
          customRef.current,
          {
            y: 20,
            opacity: 0.2,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: customRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <section
      ref={sectionRef}
      id="modules"
      className="py-20 lg:py-28 relative overflow-hidden scroll-mt-20 border-b border-[#E9E4F1] bg-white"
      aria-label="Module Selection Section"
    >
      <Container size="xl" className="space-y-16">
        {/* Section Intro */}
        <SectionHeading
          eyebrow={t('modulesPillars.eyebrow')}
          title={t('modulesPillars.title')}
          titleGradient={t('modulesPillars.titleGradient')}
          description={t('modulesPillars.description')}
        />

        {/* 2 Core Module Selection Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div id="invoice" className="scroll-mt-28">
            <ModuleCard
              id="invoice"
              title={t('modulesPillars.invoiceTitle')}
              subtitle={t('modulesPillars.invoiceSubtitle')}
              description={t('modulesPillars.invoiceDesc')}
              icon={<FileText className="w-6 h-6" />}
              isSelected={invoiceSelected}
              onToggle={() => toggleModule('invoice')}
            />
          </div>

          <div id="pos" className="scroll-mt-28">
            <ModuleCard
              id="pos"
              title={t('modulesPillars.posTitle')}
              subtitle={t('modulesPillars.posSubtitle')}
              description={t('modulesPillars.posDesc')}
              icon={<ShoppingBag className="w-6 h-6" />}
              isSelected={posSelected}
              onToggle={() => toggleModule('pos')}
            />
          </div>
        </div>

        {/* Interactive Simulated Lifecycle Walkthrough */}
        <div ref={simulatorRef}>
          <ModuleLifecycleSimulator />
        </div>

        {/* Interactive System Configurator Preview */}
        <div ref={configuratorRef}>
          <ModuleConfigurator
            invoiceSelected={invoiceSelected}
            posSelected={posSelected}
            onToggleInvoice={() => toggleModule('invoice')}
            onTogglePos={() => toggleModule('pos')}
          />
        </div>

        {/* Custom Configuration Section */}
        <div ref={customRef}>
          <CustomConfiguration />
        </div>
      </Container>
    </section>
  );
};

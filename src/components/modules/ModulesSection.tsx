import React, { useState, useEffect, useRef } from 'react';
import { Layers } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { InvoiceStorytelling } from './InvoiceStorytelling';
import { InvoiceToPosTransition } from './InvoiceToPosTransition';
import { SideBySideWorkspaces } from './SideBySideWorkspaces';
import { ModuleConfigurator } from './ModuleConfigurator';
import { CustomConfiguration } from './CustomConfiguration';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const ModulesSection: React.FC = () => {
  const [selectedModules, setSelectedModules] = useState<string[]>(['invoice', 'pos']);
  const sectionRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
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
      // 1. Foundation thread pulse down from Connected System
      if (threadRef.current) {
        gsap.fromTo(
          threadRef.current,
          { opacity: 0.2, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: threadRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Configurator and custom panels smooth elevation
      if (configuratorRef.current) {
        gsap.fromTo(
          configuratorRef.current,
          { scale: 0.98, y: 24, opacity: 0.4 },
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
          { y: 20, opacity: 0.2 },
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
      aria-label="ERPGen Product Storytelling: Invoice & POS"
    >
      <Container size="xl" className="space-y-16 lg:space-y-20">
        {/* 1. ERP Foundation Thread: Connection from Connected System */}
        <div ref={threadRef} className="flex flex-col items-center text-center space-y-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8FC] border border-[#E9E4F1] text-[11px] font-mono text-[#6D57A5] font-bold shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-[#17B681]" />
            <span>{t('productStory.foundationThread')}</span>
          </div>
          <p className="text-[11px] text-[#625D6B] font-mono">
            {t('productStory.foundationSubtitle')}
          </p>
          <div className="w-0.5 h-8 bg-linear-to-b from-[#6D57A5] to-[#17B681] rounded-full my-1" />
        </div>

        {/* 2. Section Intro: The System Powers Business Operations */}
        <SectionHeading
          eyebrow={t('productStory.eyebrow')}
          title={t('productStory.title')}
          titleGradient={t('productStory.titleGradient')}
          description={t('productStory.description')}
        />

        {/* 3. ERPGen Invoice Product Moment: Controlled Progressive Document Assembly */}
        <div id="invoice" className="scroll-mt-28">
          <InvoiceStorytelling />
        </div>

        {/* 4. Invoice → POS Visual Transformation Conduit */}
        <InvoiceToPosTransition />

        {/* 5. One ERP Foundation, Two Workspaces: Side-by-Side Moment */}
        <SideBySideWorkspaces />

        {/* 6. Interactive System Configurator Preview */}
        <div ref={configuratorRef} className="pt-4">
          <ModuleConfigurator
            invoiceSelected={invoiceSelected}
            posSelected={posSelected}
            onToggleInvoice={() => toggleModule('invoice')}
            onTogglePos={() => toggleModule('pos')}
          />
        </div>

        {/* 7. Custom Configuration Inquiry Card */}
        <div ref={customRef}>
          <CustomConfiguration />
        </div>
      </Container>
    </section>
  );
};

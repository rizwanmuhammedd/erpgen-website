import React, { useState, useEffect, useRef } from 'react';
import { FileText, ShoppingBag } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { ModuleCard } from './ModuleCard';
import { ModuleConfigurator } from './ModuleConfigurator';
import { CustomConfiguration } from './CustomConfiguration';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const ModulesSection: React.FC = () => {
  // Selection state: defaults to both Invoice & POS active to showcase full capability
  const [selectedModules, setSelectedModules] = useState<string[]>(['invoice', 'pos']);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const configuratorRef = useRef<HTMLDivElement>(null);
  const customRef = useRef<HTMLDivElement>(null);

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const invoiceSelected = selectedModules.includes('invoice');
  const posSelected = selectedModules.includes('pos');

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        configuratorRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: configuratorRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        customRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: customRef.current,
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
      id="modules"
      className="py-20 lg:py-28 relative overflow-hidden scroll-mt-20 border-b border-[#E9E4F1] bg-white"
      aria-label="Module Selection Section"
    >
      <Container size="xl" className="space-y-16">
        {/* Section Intro */}
        <SectionHeading
          eyebrow="CORE PRODUCT PILLARS"
          title="Deploy standalone modules, or"
          titleGradient="connect them all."
          description="Start with standalone Invoicing for billing, standalone POS for your counter registers, or unify them into a single connected platform as your business operations grow."
        />

        {/* 2 Core Module Selection Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div id="invoice" className="scroll-mt-28">
            <ModuleCard
              id="invoice"
              title="ERPGen Invoice"
              subtitle="Standalone Billing & Invoicing"
              description="Create, manage and track invoices with a focused invoicing solution. Built for instant customer billing, receipt printing, and sales tracking."
              icon={<FileText className="w-6 h-6" />}
              isSelected={invoiceSelected}
              onToggle={() => toggleModule('invoice')}
            />
          </div>

          <div id="pos" className="scroll-mt-28">
            <ModuleCard
              id="pos"
              title="ERPGen POS"
              subtitle="Standalone Point-of-Sale"
              description="Run point-of-sale operations for your business with a dedicated POS solution. Optimized for fast checkout, counter billing, and item variants."
              icon={<ShoppingBag className="w-6 h-6" />}
              isSelected={posSelected}
              onToggle={() => toggleModule('pos')}
            />
          </div>
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

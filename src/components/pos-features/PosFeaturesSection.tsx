import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { PosFeatureCard } from './PosFeatureCard';
import { PosDashboardPreview } from './PosDashboardPreview';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const PosFeaturesSection: React.FC = () => {
  // Default selected feature: pos-billing
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('pos-billing');
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // 4 High-Level Enterprise Capability Groups
  const capabilities = [
    {
      id: 'sales-billing',
      previewId: 'pos-billing',
      name: 'Sales & Fast Checkout',
      subtitle: 'Counter Velocity',
      description: 'Rapid barcode scanning, dine-in/takeaway tickets, split billing, and instant thermal receipt printing.',
    },
    {
      id: 'inventory-ops',
      previewId: 'inventory',
      name: 'Inventory & Operations',
      subtitle: 'Real-Time Sync',
      description: 'Live stock tracking across registers, variant management, returns, and damaged product controls.',
    },
    {
      id: 'customers-management',
      previewId: 'customers',
      name: 'Customers & Accounts',
      subtitle: 'Client Profiles',
      description: 'Centralized customer profiles, complete purchase histories, and credit account tracking.',
    },
    {
      id: 'reports-insights',
      previewId: 'reports',
      name: 'Reports & Insights',
      subtitle: 'Live Visibility',
      description: 'Real-time sales summaries, cashier register balancing, and daily business performance analytics.',
    },
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 35 },
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
        previewRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: previewRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Determine if a capability group is currently active based on preview feature ID
  const isCapabilityActive = (cap: typeof capabilities[0]) => {
    if (cap.previewId === selectedFeatureId) return true;
    if (cap.id === 'sales-billing' && ['pos-billing', 'returns', 'sales-history'].includes(selectedFeatureId)) return true;
    if (cap.id === 'inventory-ops' && ['inventory', 'damaged-products'].includes(selectedFeatureId)) return true;
    if (cap.id === 'customers-management' && selectedFeatureId === 'customers') return true;
    if (cap.id === 'reports-insights' && selectedFeatureId === 'reports') return true;
    return false;
  };

  return (
    <section
      ref={sectionRef}
      id="pos-features"
      className="py-20 lg:py-28 relative overflow-hidden scroll-mt-20 bg-[#FAF8FC] border-b border-[#E9E4F1]"
      aria-label="POS Capabilities Section"
    >
      <Container size="xl" className="space-y-12 lg:space-y-16">
        {/* Section Intro */}
        <SectionHeading
          eyebrow="ENGINEERED FOR DAILY COMMERCE"
          title="Point-of-sale capabilities built for"
          titleGradient="high-velocity operations."
          description="ERPGen POS unifies counter billing, real-time inventory synchronization, customer records, and daily financial reporting into one intuitive workspace."
        />

        {/* 4 Premium Capability Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          role="region"
          aria-label="POS Capabilities Overview"
        >
          {capabilities.map((cap) => (
            <PosFeatureCard
              key={cap.id}
              id={cap.id}
              name={cap.name}
              subtitle={cap.subtitle}
              description={cap.description}
              isSelected={isCapabilityActive(cap)}
              onSelect={() => setSelectedFeatureId(cap.previewId)}
            />
          ))}
        </div>

        {/* Interactive POS Application Workspace Visual (High Priority Showcase) */}
        <div ref={previewRef} className="pt-2">
          <PosDashboardPreview
            selectedFeatureId={selectedFeatureId}
            onSelectFeature={(id) => setSelectedFeatureId(id)}
          />
        </div>
      </Container>
    </section>
  );
};

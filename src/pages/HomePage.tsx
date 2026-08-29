import React from 'react';
import { Hero } from '../components/hero/Hero';
import { PlatformValueSection } from '../components/home/PlatformValueSection';
import { ModulesSection } from '../components/modules/ModulesSection';
import { PosFeaturesSection } from '../components/pos-features/PosFeaturesSection';
import { BusinessTypesSection } from '../components/business-types/BusinessTypesSection';
import { ERPGenServicesSection } from '../components/company/ERPGenServicesSection';
import { ContactSection } from '../components/company/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* 1. Hero with ERP Value Prop & Product Visual Focus */}
      <Hero />

      {/* 2. Platform Value: One Connected Business Platform (Modular, Connected, Adaptable, Scalable) */}
      <PlatformValueSection />

      {/* 3. Core Product Pillars: ERPGen Invoice & ERPGen POS */}
      <ModulesSection />

      {/* 4. POS / ERP Capability Showcase: 4 High-Level Capabilities + Live UI Preview */}
      <PosFeaturesSection />

      {/* 5. Business Types: Restaurant, Barbershop, Supermarket & Laundry Workflows */}
      <BusinessTypesSection />

      {/* 6. ERPGen Technology & Infrastructure Services */}
      <ERPGenServicesSection />

      {/* 7. Final WhatsApp Consultation & Contact */}
      <ContactSection />
    </div>
  );
};

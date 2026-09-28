import React from 'react';
import { Hero } from '../components/hero/Hero';
import { ErpTiersSection } from '../components/home/ErpTiersSection';
import { SixAreasStorytellingSection } from '../components/home/SixAreasStorytellingSection';
import { ConnectedSystemSection } from '../components/home/ConnectedSystemSection';
import { ModulesSection } from '../components/modules/ModulesSection';
import { PosFeaturesSection } from '../components/pos-features/PosFeaturesSection';
import { BusinessTypesSection } from '../components/business-types/BusinessTypesSection';
import { WhyERPGenSection } from '../components/home/WhyERPGenSection';
import { ContactSection } from '../components/company/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* 01. Hero: ERPGen — The Modular ERP Platform */}
      <Hero />

      {/* 02. ERP Lite / ERP Pro: Scale & Choice (Standard Ready vs Tailored Pro) */}
      <ErpTiersSection />

      {/* 03. Six ERP Operational Areas: Cinematic Pinned Storytelling (Sales, Purchase, Inventory, HR, Projects, Finance) */}
      <SixAreasStorytellingSection />

      {/* 04. Connected Business: Six Core Operations Converging into ERPGen */}
      <ConnectedSystemSection />

      {/* 05. Product Experience: Invoice & POS with Signature Document Folding */}
      <ModulesSection />

      {/* 06. POS Capabilities: 3-Layer Spatial Stack → Unstack Assembly */}
      <PosFeaturesSection />

      {/* 07. Business Types: Pinned Horizontal Storytelling (Restaurant, Barbershop, Supermarket, Laundry) */}
      <BusinessTypesSection />

      {/* 08. Why ERPGen: Concise Product-Focused Benefits with Editorial Typography Reveal */}
      <WhyERPGenSection />

      {/* 09. Contact / CTA: Direct Technical Consultation */}
      <ContactSection />
    </div>
  );
};

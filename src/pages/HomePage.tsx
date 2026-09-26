import React from 'react';
import { Hero } from '../components/hero/Hero';
import { WhatIsERPGenSection } from '../components/home/WhatIsERPGenSection';
import { ErpTiersSection } from '../components/home/ErpTiersSection';
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

      {/* 02. What is ERPGen? & 03. Core ERP Modules (Sales, Purchase, Inventory, HR, Projects, Finance) */}
      <WhatIsERPGenSection />

      {/* 03. ERP Lite & ERP Pro: Connected Platform Tiers */}
      <ErpTiersSection />

      {/* 04. Connected Business: Six Core Operations Converging into ERPGen */}
      <ConnectedSystemSection />

      {/* 05. Product Experience: Invoice & POS with Signature Document Folding */}
      <ModulesSection />

      {/* 05b. POS Capabilities: 3-Layer Spatial Stack → Unstack Assembly */}
      <PosFeaturesSection />

      {/* 06. Business Types: Pinned Horizontal Storytelling (Restaurant, Barbershop, Supermarket, Laundry) */}
      <BusinessTypesSection />

      {/* 07. Why ERPGen: Concise Product-Focused Benefits with Editorial Typography Reveal */}
      <WhyERPGenSection />

      {/* 08. Contact / CTA: See How ERPGen Fits Your Business */}
      <ContactSection />
    </div>
  );
};

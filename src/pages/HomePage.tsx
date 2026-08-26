import React from 'react';
import { Hero } from '../components/hero/Hero';
import { ModulesSection } from '../components/modules/ModulesSection';
import { BusinessTypesSection } from '../components/business-types/BusinessTypesSection';
import { PosFeaturesSection } from '../components/pos-features/PosFeaturesSection';
import { ERPGenServicesSection } from '../components/company/ERPGenServicesSection';
import { ContactSection } from '../components/company/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <ModulesSection />
      <BusinessTypesSection />
      <PosFeaturesSection />
      <ERPGenServicesSection />
      <ContactSection />
    </div>
  );
};

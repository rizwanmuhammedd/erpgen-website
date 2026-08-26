import React, { useEffect } from 'react';
import { PageHero } from '../components/layout/PageHero';
import { ContactSection } from '../components/company/ContactSection';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact & Direct Consultation | ERPGen';
  }, []);

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="DIRECT CONSULTATION"
        title="Contact & Consultation —"
        titleGradient="Let's Build Your Solution"
        description="Discuss your Invoice, POS, or custom ERPGen requirements directly with our engineering team, or connect on WhatsApp for immediate technical assistance."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Contact', path: '/contact' },
        ]}
        badgeText="ERPGen Engineering Support"
      />

      <ContactSection />
    </div>
  );
};

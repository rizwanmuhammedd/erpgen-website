import React, { useEffect } from 'react';
import { PageHero } from '../components/layout/PageHero';
import { ContactSection } from '../components/company/ContactSection';
import { useLanguage } from '../context/LanguageContext';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow={t('contactPage.eyebrow')}
        title={t('contactPage.title')}
        titleGradient={t('contactPage.titleGradient')}
        description={t('contactPage.description')}
        breadcrumbs={[
          { label: t('nav.home'), path: '/' },
          { label: t('contactPage.breadcrumb'), path: '/contact' },
        ]}
        badgeText={t('contactPage.badge')}
      />

      <ContactSection />
    </div>
  );
};

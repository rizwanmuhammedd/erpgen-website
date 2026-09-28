import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { PageHero } from '../../components/layout/PageHero';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { BusinessTypeShowcase } from '../../components/business-types/BusinessTypeShowcase';
import { getWhatsAppUrl } from '../../data/siteData';
import { useLanguage } from '../../context/LanguageContext';

export const LaundryPosPage: React.FC = () => {
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const capabilities = [
    t('posPages.laundryCap1'),
    t('posPages.laundryCap2'),
    t('posPages.laundryCap3'),
    t('posPages.laundryCap4'),
  ];

  const industryName = t('posIndustries.laundry');

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow={t('posPages.industryWorkflow')}
        title={`${industryName} POS —`}
        titleGradient={t('businessShowcase.laundryTagline')}
        description={t('businessShowcase.laundryDesc')}
        breadcrumbs={[
          { label: t('nav.home'), path: '/' },
          { label: 'POS', path: '/products/pos' },
          { label: `${industryName} POS`, path: '/products/pos/laundry' },
        ]}
        badgeText={t('posPages.laundryReady')}
      >
        <div className="pt-4 flex flex-wrap gap-4">
          <a href={getWhatsAppUrl("Hello ERPGen team, I am interested in the Laundry POS workflow.")} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg" icon={<ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}>
              {t('posPages.configureOnWhatsApp').replace('{title}', industryName)}
            </Button>
          </a>
          <Link to="/contact">
            <Button variant="secondary" size="lg">
              {t('posPage.contactSales')}
            </Button>
          </Link>
        </div>
      </PageHero>

      <section className="py-16 sm:py-20 border-b border-[#E9E4F1] bg-white">
        <Container size="xl" className="space-y-12">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                {t('posPages.laundryCaps')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading mt-1">
                {t('posPages.laundryCapsTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {capabilities.map((cap) => (
                <Card key={cap} variant="brand-border" className="p-5 space-y-2 bg-white border border-[#E9E4F1] shadow-sm hover:border-[#6D57A5]/40 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-2.5 text-[#17B681]">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#17B681]" />
                    <h3 className="text-sm font-bold text-[#1F1B2D] font-heading">{cap}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                {t('posPages.previewTitle').replace('{title}', industryName)}
              </span>
              <Badge variant="brand" size="sm">{t('posPages.liveWorkflow')}</Badge>
            </div>
            <BusinessTypeShowcase businessId="laundry" />
          </div>
        </Container>
      </section>
    </div>
  );
};

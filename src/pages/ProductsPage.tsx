import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShoppingBag, ArrowRight, Layers, Sliders, CheckCircle2 } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { getWhatsAppUrl } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../lib/gsap';

export const ProductsPage: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          {
            transformPerspective: 1200,
            rotateX: 14,
            y: 40,
            opacity: 0.2,
            scale: 0.95,
          },
          {
            rotateX: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow={t('productsPage.eyebrow')}
        title={t('productsPage.title')}
        titleGradient={t('productsPage.titleGradient')}
        description={t('productsPage.description')}
        breadcrumbs={[
          { label: t('nav.home'), path: '/' },
          { label: t('nav.products'), path: '/products' },
        ]}
        badgeText={t('productsPage.badge')}
      />

      <section className="py-16 sm:py-20 border-b border-[#E9E4F1]">
        <Container size="xl" className="space-y-16">
          <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="brand-border" className="p-8 space-y-6 flex flex-col justify-between group bg-white border border-[#E9E4F1] shadow-sm hover:border-[#6D57A5]/40 hover:shadow-md transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold group-hover:bg-[#6D57A5] group-hover:text-white transition-all">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="brand" size="sm">{t('productsPage.module1Tag')}</Badge>
                    <span className="text-xs text-[#17B681] font-semibold">{t('productsPage.module1Subtitle')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1F1B2D] font-heading mt-1 group-hover:text-[#6D57A5] transition-colors">
                    ERPGen Invoice
                  </h2>
                  <p className="text-xs text-[#625D6B] leading-relaxed mt-2">
                    Streamlined invoicing, customer billing profiles, custom PDF templates, and sales tracking.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E9E4F1] text-xs text-[#625D6B]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                    <span>{t('productsPage.module1Feat1')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                    <span>{t('productsPage.module1Feat2')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                    <span>{t('productsPage.module1Feat3')}</span>
                  </div>
                </div>
              </div>

              <Link to="/products/invoice">
                <Button variant="primary" fullWidth icon={<ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}>
                  {t('productsPage.module1Cta')}
                </Button>
              </Link>
            </Card>

            <Card variant="brand-border" className="p-8 space-y-6 flex flex-col justify-between group bg-white border border-[#E9E4F1] shadow-sm hover:border-[#17B681]/40 hover:shadow-md transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#E4F8F0] border border-[#17B681]/30 text-[#17B681] flex items-center justify-center font-bold group-hover:bg-[#17B681] group-hover:text-white transition-all">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success" size="sm">{t('productsPage.module2Tag')}</Badge>
                    <span className="text-xs text-[#6D57A5] font-semibold">{t('productsPage.module2Subtitle')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1F1B2D] font-heading mt-1 group-hover:text-[#17B681] transition-colors">
                    ERPGen POS
                  </h2>
                  <p className="text-xs text-[#625D6B] leading-relaxed mt-2">
                    High-speed checkout, live inventory sync, item variants, and specialized business context workflows.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E9E4F1] text-xs text-[#625D6B]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                    <span>{t('productsPage.module2Feat1')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                    <span>{t('productsPage.module2Feat2')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                    <span>{t('productsPage.module2Feat3')}</span>
                  </div>
                </div>
              </div>

              <Link to="/products/pos">
                <Button variant="primary" fullWidth icon={<ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}>
                  {t('productsPage.module2Cta')}
                </Button>
              </Link>
            </Card>
          </div>

          <Card variant="default" className="p-8 border border-[#E9E4F1] bg-gradient-to-r from-[#FAF8FC] to-[#F5F1FA]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Badge variant="brand" size="sm">{t('productsPage.tailoredTag')}</Badge>
                  <Sliders className="w-4 h-4 text-[#17B681]" />
                </div>
                <h3 className="text-xl font-bold text-[#1F1B2D] font-heading">
                  {t('productsPage.customTitle')}
                </h3>
                <p className="text-xs text-[#625D6B] leading-relaxed">
                  {t('productsPage.customDesc')}
                </p>
              </div>

              <div className="shrink-0 flex flex-wrap gap-3 w-full md:w-auto">
                <a href={getWhatsAppUrl("Hello ERPGen team, I am looking for a custom ERP configuration.")} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="md" icon={<ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}>
                    {t('productsPage.discussWhatsApp')}
                  </Button>
                </a>
                <Link to="/contact">
                  <Button variant="secondary" size="md" icon={<Layers className="w-4 h-4" />}>
                    {t('productsPage.customRequest')}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
};

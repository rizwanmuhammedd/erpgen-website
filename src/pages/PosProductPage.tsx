import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Scissors, ShoppingCart, Shirt, ArrowRight } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PosFeaturesSection } from '../components/pos-features/PosFeaturesSection';
import { getWhatsAppUrl } from '../data/siteData';

export const PosProductPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const businessTypes = [
    { id: 'restaurant', title: 'Restaurant POS', path: '/products/pos/restaurant', icon: Utensils, desc: 'Table layout, dine-in, takeaway & kitchen dispatch' },
    { id: 'barbershop', title: 'Barbershop POS', path: '/products/pos/barbershop', icon: Scissors, desc: 'Appointment queue, walk-ins, styling & product sales' },
    { id: 'supermarket', title: 'Supermarket POS', path: '/products/pos/supermarket', icon: ShoppingCart, desc: 'Rapid barcode scanning, batch expiry & multi-lane cashier' },
    { id: 'laundry', title: 'Laundry POS', path: '/products/pos/laundry', icon: Shirt, desc: 'Garment item tagging, drop-off & pickup order tracking' },
  ];

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="CORE ERP MODULE"
        title="ERPGen POS —"
        titleGradient="Next-Gen Counter & Store Checkout"
        description="High-speed, touch-optimized point-of-sale engine built for modern counter operations. Features real-time stock sync, industry-tailored workflows, and centralized sales intelligence."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Products', path: '/products' },
          { label: 'ERPGen POS', path: '/products/pos' },
        ]}
        badgeText="Multi-Industry Counter Engine"
      >
        <div className="pt-4 flex flex-wrap gap-4">
          <a href={getWhatsAppUrl("Hello ERPGen team, I would like to get started with the POS system.")} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Configure POS Engine on WhatsApp
            </Button>
          </a>
          <Link to="/contact">
            <Button variant="secondary" size="lg">
              Contact Sales
            </Button>
          </Link>
        </div>
      </PageHero>

      <section className="py-16 border-b border-[#E9E4F1] bg-white">
        <Container size="xl" className="space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
              Targeted Business Workflows
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading mt-1">
              Select Your Industry POS Context
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessTypes.map((b) => {
              const IconComp = b.icon;
              return (
                <Card key={b.id} variant="brand-border" className="p-6 space-y-4 flex flex-col justify-between group bg-white border border-[#E9E4F1] shadow-sm hover:border-[#6D57A5]/40 hover:shadow-md transition-all duration-300">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold group-hover:bg-[#6D57A5] group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1F1B2D] font-heading group-hover:text-[#6D57A5] transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-xs text-[#625D6B] leading-relaxed font-normal">
                      {b.desc}
                    </p>
                  </div>

                  <Link to={b.path} className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#17B681] hover:text-[#129267] transition-colors">
                    <span>Explore Workflow</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <PosFeaturesSection />
    </div>
  );
};

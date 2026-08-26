import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShoppingBag, ArrowRight, Layers, Sliders, CheckCircle2 } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { getWhatsAppUrl } from '../data/siteData';

export const ProductsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="MODULAR ERP ARCHITECTURE"
        title="ERPGen Product Suite —"
        titleGradient="Choose what you actually need."
        description="ERPGen brings essential business tools into one flexible platform. Adopt standalone Invoice, high-speed POS, or configure a combined solution around your exact business requirements."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Products Overview', path: '/products' },
        ]}
        badgeText="Invoice & POS Core Modules"
      />

      <section className="py-16 sm:py-20 border-b border-[#E9E4F1]">
        <Container size="xl" className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="brand-border" className="p-8 space-y-6 flex flex-col justify-between group bg-white border border-[#E9E4F1] shadow-sm hover:border-[#6D57A5]/40 hover:shadow-md transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold group-hover:bg-[#6D57A5] group-hover:text-white transition-all">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="brand" size="sm">Module 01</Badge>
                    <span className="text-xs text-[#17B681] font-semibold">Standalone or Combined</span>
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
                    <span>PDF Customization & Company Branding</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                    <span>One-click Instant Billing & Receipts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                    <span>Sales History & Payment Tracking</span>
                  </div>
                </div>
              </div>

              <Link to="/products/invoice">
                <Button variant="primary" fullWidth icon={<ArrowRight className="w-4 h-4" />}>
                  Explore ERPGen Invoice Page
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
                    <Badge variant="success" size="sm">Module 02</Badge>
                    <span className="text-xs text-[#6D57A5] font-semibold">Multi-Industry Workflows</span>
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
                    <span>Restaurant, Barbershop, Supermarket & Laundry Workflows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                    <span>7 Operational Features (Returns, Stock, Damaged, Reports)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                    <span>Thermal Printer & Scanner Integration</span>
                  </div>
                </div>
              </div>

              <Link to="/products/pos">
                <Button variant="primary" fullWidth icon={<ArrowRight className="w-4 h-4" />}>
                  Explore ERPGen POS Page
                </Button>
              </Link>
            </Card>
          </div>

          <Card variant="default" className="p-8 border border-[#E9E4F1] bg-gradient-to-r from-[#FAF8FC] to-[#F5F1FA]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Badge variant="brand" size="sm">Tailored Subscriptions</Badge>
                  <Sliders className="w-4 h-4 text-[#17B681]" />
                </div>
                <h3 className="text-xl font-bold text-[#1F1B2D] font-heading">
                  Need a Customized ERP Combination?
                </h3>
                <p className="text-xs text-[#625D6B] leading-relaxed">
                  ERPGen can be configured around your specific operational requirements. Combine Invoice + POS or request a custom setup.
                </p>
              </div>

              <div className="shrink-0 flex flex-wrap gap-3 w-full md:w-auto">
                <a href={getWhatsAppUrl("Hello ERPGen team, I am looking for a custom ERP configuration.")} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                    Discuss on WhatsApp
                  </Button>
                </a>
                <Link to="/contact">
                  <Button variant="secondary" size="md" icon={<Layers className="w-4 h-4" />}>
                    Custom Request
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

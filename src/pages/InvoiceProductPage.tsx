import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Printer } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { getWhatsAppUrl } from '../data/siteData';

export const InvoiceProductPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const capabilities = [
    { name: 'PDF Customization & Branding', desc: 'Customize invoice PDF templates, headers, logos, and print layouts to match your brand.' },
    { name: 'Instant Billing & Invoicing', desc: 'Create and issue professional invoices with automated line items and tax calculations.' },
    { name: 'Customer Billing Profiles', desc: 'Maintain billing profiles, contact details, payment terms, and account balances.' },
    { name: 'Automated Sales History', desc: 'Full audit log of issued invoices, paid status, pending balances, and receipt history.' },
    { name: 'Warranties & Receipt Generator', desc: 'Issue custom warranty certificates and print transaction receipts instantly.' },
    { name: 'Flexible Payment Terms', desc: 'Configure custom payment terms, due date reminders, and billing categories.' },
  ];

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="CORE ERP MODULE"
        title="ERPGen Invoice —"
        titleGradient="Streamlined Billing & Cash Flow"
        description="A dedicated invoicing and billing module built for precision. Create professional invoices, customize PDF templates, track customer payments, and manage cash flow with automated simplicity."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Products', path: '/products' },
          { label: 'ERPGen Invoice', path: '/products/invoice' },
        ]}
        badgeText="Standalone or Combined Module"
      >
        <div className="pt-4 flex flex-wrap gap-4">
          <a href={getWhatsAppUrl("Hello ERPGen team, I would like to get started with the Invoice module.")} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Configure Invoice Module on WhatsApp
            </Button>
          </a>
          <Link to="/contact">
            <Button variant="secondary" size="lg">
              Contact Sales
            </Button>
          </Link>
        </div>
      </PageHero>

      <section className="py-16 sm:py-20 border-b border-[#E9E4F1]">
        <Container size="xl" className="space-y-16">
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                Confirmed Invoicing Features
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading mt-1">
                Everything You Need for Business Invoicing
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((cap) => (
                <Card key={cap.name} variant="brand-border" className="p-6 space-y-3 bg-white border border-[#E9E4F1] shadow-sm hover:border-[#6D57A5]/40 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-[#1F1B2D] font-heading">{cap.name}</h3>
                  </div>
                  <p className="text-xs text-[#625D6B] leading-relaxed font-normal">
                    {cap.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <Card variant="default" className="p-8 border border-[#E9E4F1] bg-gradient-to-r from-[#FAF8FC] to-[#F5F1FA]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Badge variant="brand" size="sm">Flexible Setup</Badge>
                  <Printer className="w-4 h-4 text-[#17B681]" />
                </div>
                <h3 className="text-xl font-bold text-[#1F1B2D] font-heading">
                  Combine Invoice with ERPGen POS Counter
                </h3>
                <p className="text-xs text-[#625D6B] leading-relaxed">
                  Deploy Invoice as a standalone billing module today, or seamlessly connect it with ERPGen POS for high-speed store checkout.
                </p>
              </div>

              <Link to="/products/pos" className="shrink-0 w-full md:w-auto">
                <Button variant="secondary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  Explore ERPGen POS Module
                </Button>
              </Link>
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
};

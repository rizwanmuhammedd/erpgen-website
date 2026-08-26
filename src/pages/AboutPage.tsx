import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Headphones, Layers, Cpu, ArrowRight, MessageSquare, CheckCircle2, FileText, ShoppingBag } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { getWhatsAppUrl } from '../data/siteData';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Why Us & Company Philosophy | ERPGen';
  }, []);

  const pillars = [
    { title: '24/7 Priority Support & Monitoring', icon: Headphones, desc: 'Dedicated technical response team and continuous infrastructure oversight ensuring zero business disruption.' },
    { title: 'Scalable Architecture & Design', icon: Layers, desc: 'Enterprise software and cloud architectures built to scale smoothly alongside growing operational volume.' },
    { title: 'Industry-Grade Network Security', icon: ShieldCheck, desc: 'Encrypted communications, proactive threat mitigation, and strict data privacy protection.' },
    { title: 'Agile Software Methodologies', icon: Cpu, desc: 'Rapid iterative engineering, continuous integration, and transparent development cycles.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        eyebrow="COMPANY POSITIONING"
        title="Why Us — Technology as a"
        titleGradient="Strategic Business Asset"
        description="ERPGen empowers forward-thinking businesses by delivering modern, modular ERP software alongside enterprise cloud infrastructure, application engineering, cybersecurity, and managed IT services."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Why Us / About', path: '/about' },
        ]}
        badgeText="ERPGen Engineering Standards"
      >
        <div className="pt-4 flex flex-wrap gap-4">
          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg" icon={<MessageSquare className="w-4 h-4" />}>
              Consult an Expert on WhatsApp
            </Button>
          </a>
          <Link to="/services">
            <Button variant="secondary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Explore All Services
            </Button>
          </Link>
        </div>
      </PageHero>

      <section className="py-16 sm:py-20 border-b border-[#E9E4F1] bg-white">
        <Container size="xl" className="space-y-16">
          {/* Engineering Approach */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <Badge variant="brand" size="sm">Our Mission</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading">
                Purpose-Built Software Designed Around Actual Business Workflows
              </h2>
              <p className="text-xs sm:text-sm text-[#625D6B] leading-relaxed">
                Traditional ERP systems force businesses to adopt expensive monolithic software suites with features they never touch. ERPGen flips this paradigm by offering modular flexibility: choose standalone Invoice, high-speed POS, or a tailored combined suite.
              </p>
              <div className="space-y-2 text-xs text-[#625D6B] pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                  <span>Choose standalone Invoice or standalone POS counters</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                  <span>Combine modules or request customer-specific configurations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#17B681] shrink-0" />
                  <span>Backed by enterprise cloud infrastructure and cybersecurity</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card variant="brand-border" className="p-6 space-y-3 bg-white border border-[#E9E4F1] shadow-sm">
                <FileText className="w-8 h-8 text-[#6D57A5]" />
                <h3 className="text-base font-bold text-[#1F1B2D] font-heading">ERPGen Invoice</h3>
                <p className="text-xs text-[#625D6B] leading-relaxed">
                  Dedicated invoicing, PDF customization, customer profiles, and automated sales audit logs.
                </p>
              </Card>

              <Card variant="brand-border" className="p-6 space-y-3 bg-white border border-[#E9E4F1] shadow-sm">
                <ShoppingBag className="w-8 h-8 text-[#17B681]" />
                <h3 className="text-base font-bold text-[#1F1B2D] font-heading">ERPGen POS</h3>
                <p className="text-xs text-[#625D6B] leading-relaxed">
                  High-speed counter billing for Restaurant, Barbershop, Supermarket, and Laundry workflows.
                </p>
              </Card>
            </div>
          </div>

          {/* Technology Pillars Grid */}
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                Our Core Engineering Pillars
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading mt-1">
                ERPGen Infrastructure & Performance Commitments
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((p) => {
                const IconComponent = p.icon;
                return (
                  <Card key={p.title} variant="brand-border" className="p-6 space-y-3 bg-white border border-[#E9E4F1] shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF8FC] text-[#6D57A5] border border-[#E9E4F1] flex items-center justify-center font-bold">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-[#1F1B2D] font-heading">{p.title}</h3>
                    </div>
                    <p className="text-xs text-[#625D6B] leading-relaxed">
                      {p.desc}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Callout Card */}
          <Card variant="default" className="p-8 border border-[#E9E4F1] bg-gradient-to-r from-[#FAF8FC] to-[#F5F1FA]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Badge variant="brand" size="sm">Technology Ecosystem</Badge>
                </div>
                <h3 className="text-xl font-bold text-[#1F1B2D] font-heading">
                  Comprehensive Enterprise Technology Services
                </h3>
                <p className="text-xs text-[#625D6B]">
                  Explore our complete portfolio of AI software development, cloud infrastructure, telecommunications, and managed IT services designed to support your enterprise growth.
                </p>
              </div>

              <div className="shrink-0 flex flex-wrap gap-3 w-full md:w-auto">
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="md" icon={<MessageSquare className="w-4 h-4" />}>
                    Chat on WhatsApp
                  </Button>
                </a>
                <Link to="/services">
                  <Button variant="secondary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                    View Services
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

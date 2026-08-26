import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BrainCircuit,
  Globe,
  PhoneCall,
  ShieldCheck,
  Mail,
  Server,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Headphones,
  Layers,
  Lock,
  Cpu,
} from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ERPGEN_SERVICES } from '../data/serviceData';
import { getWhatsAppUrl } from '../data/siteData';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'BrainCircuit': return BrainCircuit;
    case 'Globe': return Globe;
    case 'PhoneCall': return PhoneCall;
    case 'ShieldCheck': return ShieldCheck;
    case 'Mail': return Mail;
    case 'Server': return Server;
    default: return Server;
  }
};

export const ServicesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Services Ecosystem | ERPGen Technology Solutions';
  }, []);

  const pillars = [
    { title: '24/7 Priority Support & Monitoring', icon: Headphones, desc: 'Dedicated technical response and continuous infrastructure oversight.' },
    { title: 'Scalable Architecture & Design', icon: Layers, desc: 'Enterprise architectures built to scale smoothly with growing business volume.' },
    { title: 'Industry-Grade Network Security', icon: Lock, desc: 'Encrypted communication, threat mitigation, and data protection.' },
    { title: 'Agile Software Methodologies', icon: Cpu, desc: 'Rapid iterative engineering and continuous deployment cycles.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <PageHero
        eyebrow="ENTERPRISE IT ECOSYSTEM"
        title="Technology Services &"
        titleGradient="Enterprise IT Ecosystem"
        description="Explore ERPGen's integrated technology services including custom software engineering, cloud infrastructure, corporate telecommunications, cybersecurity, email hosting, and managed IT services."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Services Overview', path: '/services' },
        ]}
        badgeText="6 Verified IT Service Areas"
      >
        <div className="pt-4 flex flex-wrap gap-4">
          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg" icon={<MessageSquare className="w-4 h-4" />}>
              Talk to an Expert on WhatsApp
            </Button>
          </a>
          <Link to="/contact">
            <Button variant="secondary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Request Consultation
            </Button>
          </Link>
        </div>
      </PageHero>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 border-b border-[#E9E4F1] bg-white">
        <Container size="xl" className="space-y-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
              Complete Service Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading mt-1">
              Explore ERPGen Technology Offerings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ERPGEN_SERVICES.map((s) => {
              const ServiceIcon = getIcon(s.iconName);
              return (
                <Card key={s.id} variant="brand-border" className="p-6 space-y-5 flex flex-col justify-between group bg-white border border-[#E9E4F1] shadow-sm hover:border-[#6D57A5]/40 hover:shadow-md transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF8FC] text-[#6D57A5] border border-[#E9E4F1] flex items-center justify-center group-hover:bg-[#6D57A5] group-hover:text-white transition-colors">
                        <ServiceIcon className="w-5 h-5" />
                      </div>
                      <Badge variant="neutral" size="sm" className="text-[9px]">
                        {s.category}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#1F1B2D] font-heading group-hover:text-[#6D57A5] transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-xs text-[#625D6B] leading-relaxed mt-1.5">
                        {s.shortDescription}
                      </p>
                    </div>

                    <div className="pt-2 space-y-1.5 border-t border-[#E9E4F1]">
                      {s.capabilities.map((cap) => (
                        <div key={cap.name} className="flex items-center gap-2 text-[11px] text-[#625D6B]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                          <span>{cap.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/services/${s.slug}`}
                    className="pt-4 border-t border-[#E9E4F1] flex items-center justify-between text-xs font-bold text-[#17B681] hover:text-[#129267] transition-colors"
                  >
                    <span>Explore Dedicated Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>
              );
            })}
          </div>

          {/* Infrastructure Standards Pillars Bar */}
          <div className="p-8 rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#E9E4F1]">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold block">
                  ERPGen Engineering Commitments
                </span>
                <h3 className="text-xl font-bold text-[#1F1B2D] font-heading mt-0.5">
                  Built on Enterprise Technology Pillars
                </h3>
              </div>
              <Badge variant="brand" size="sm">Technical Standards</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pillars.map((pillar) => {
                const PillarIcon = pillar.icon;
                return (
                  <div key={pillar.title} className="p-4 rounded-xl bg-white border border-[#E9E4F1] shadow-sm space-y-2">
                    <div className="flex items-center gap-2 text-[#6D57A5]">
                      <PillarIcon className="w-4 h-4 shrink-0" />
                      <h4 className="text-xs font-bold text-[#1F1B2D] font-heading leading-tight">{pillar.title}</h4>
                    </div>
                    <p className="text-[11px] text-[#625D6B] leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Consultation CTA Panel */}
          <Card variant="default" className="p-8 border border-[#E9E4F1] bg-gradient-to-r from-[#FAF8FC] to-[#F5F1FA]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <Badge variant="brand" size="sm">Direct Consultation</Badge>
                <h3 className="text-xl font-bold text-[#1F1B2D] font-heading">
                  Need a Custom IT Infrastructure & Software Solution?
                </h3>
                <p className="text-xs text-[#625D6B] leading-relaxed">
                  Discuss your business technology requirements with our engineering team or explore custom ERPGen configuration options.
                </p>
              </div>

              <div className="shrink-0 flex flex-wrap gap-3 w-full md:w-auto">
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="md" icon={<MessageSquare className="w-4 h-4" />}>
                    Talk to an Expert
                  </Button>
                </a>
                <Link to="/contact">
                  <Button variant="secondary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                    Send Request
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

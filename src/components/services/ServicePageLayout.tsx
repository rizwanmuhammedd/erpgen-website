import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Headphones,
  MessageSquare,
  Layers,
  Cpu,
  BrainCircuit,
  Globe,
  PhoneCall,
  Mail,
  Server,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { PageHero } from '../layout/PageHero';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ERPGEN_SERVICES, type ServiceSpec } from '../../data/serviceData';
import { getWhatsAppUrl } from '../../data/siteData';

interface ServicePageLayoutProps {
  service: ServiceSpec;
}

const getServiceIcon = (iconName: string) => {
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

export const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({ service }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = service.seoTitle;
  }, [service]);

  const ServiceIcon = getServiceIcon(service.iconName);

  // Find related services models
  const relatedServiceSpecs = ERPGEN_SERVICES.filter((s) =>
    service.relatedServices.includes(s.slug)
  );

  return (
    <div className="min-h-screen">
      {/* 1. Page Hero Banner */}
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        titleGradient={`— ${service.subtitle}`}
        description={service.fullDescription}
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Services', path: '/services' },
          { label: service.title, path: `/services/${service.slug}` },
        ]}
        badgeText={service.category}
      >
        <div className="pt-4 flex flex-wrap gap-4">
          <a href={getWhatsAppUrl(`Hello ERPGen team, I am interested in ${service.title}.`)} target="_blank" rel="noopener noreferrer">
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

      {/* 2. Core Capabilities Section */}
      <section className="py-16 sm:py-20 border-b border-[#E9E4F1]">
        <Container size="xl" className="space-y-16">
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                Verified Technical Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading mt-1">
                Core {service.title} Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.capabilities.map((cap) => (
                <Card key={cap.name} variant="brand-border" className="p-6 space-y-3 flex flex-col justify-between bg-white border border-[#E9E4F1] shadow-sm">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8FC] text-[#6D57A5] border border-[#E9E4F1] flex items-center justify-center font-bold">
                      <ServiceIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1F1B2D] font-heading">{cap.name}</h3>
                    <p className="text-xs text-[#625D6B] leading-relaxed font-normal">
                      {cap.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 3. Operational Benefits Grid */}
          <div className="p-8 rounded-2xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#129267] font-bold">
                Business Impact
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1F1B2D] font-heading mt-1">
                Key Operational Advantages
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.benefits.map((b) => (
                <div key={b.title} className="p-5 rounded-xl bg-white border border-[#E9E4F1] shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-[#129267] font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#17B681]" />
                    <span>{b.title}</span>
                  </div>
                  <p className="text-xs text-[#625D6B] leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Service Delivery Process Workflow */}
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                Execution Framework
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading mt-1">
                How ERPGen Delivers {service.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step) => (
                <Card key={step.step} variant="default" className="p-6 space-y-3 border border-[#E9E4F1] bg-white shadow-sm">
                  <span className="text-xs font-mono text-[#129267] font-extrabold px-2.5 py-1 rounded-md bg-[#E4F8F0] border border-[#17B681]/30 inline-block">
                    Step {step.step}
                  </span>
                  <h4 className="text-base font-bold text-[#1F1B2D] font-heading">{step.title}</h4>
                  <p className="text-xs text-[#625D6B] leading-relaxed">{step.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* 5. Verified Technologies & Practical Use Cases */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Tech Badges */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#6D57A5]" />
                <h4 className="text-base font-bold text-[#1F1B2D] font-heading">Technology Standards</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <Badge key={tech} variant="brand" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Practical Use Cases */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#17B681]" />
                <h4 className="text-base font-bold text-[#1F1B2D] font-heading">Target Enterprise Use Cases</h4>
              </div>
              <ul className="space-y-2 text-xs text-[#625D6B]">
                {service.useCases.map((uc) => (
                  <li key={uc} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] shrink-0" />
                    <span>{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 6. Related Services */}
          {relatedServiceSpecs.length > 0 && (
            <div className="pt-8 border-t border-[#E9E4F1] space-y-6">
              <h4 className="text-base font-bold text-[#1F1B2D] font-heading">
                Explore Related Technology Services
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedServiceSpecs.map((rel) => {
                  const RelIcon = getServiceIcon(rel.iconName);
                  return (
                    <Link
                      key={rel.slug}
                      to={`/services/${rel.slug}`}
                      className="p-4 rounded-xl bg-white border border-[#E9E4F1] hover:border-[#6D57A5]/40 shadow-sm flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FAF8FC] text-[#6D57A5] border border-[#E9E4F1] flex items-center justify-center">
                          <RelIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#6D57A5] transition-colors">
                            {rel.title}
                          </h5>
                          <p className="text-[10px] text-[#625D6B]">{rel.subtitle}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#625D6B] group-hover:text-[#6D57A5] transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* 7. Consultation Callout Card */}
          <Card variant="default" className="p-8 border border-[#E9E4F1] bg-gradient-to-r from-[#FAF8FC] to-[#F5F1FA]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Badge variant="brand" size="sm">ERPGen Commitment</Badge>
                  <ShieldCheck className="w-4 h-4 text-[#17B681]" />
                </div>
                <h3 className="text-xl font-bold text-[#1F1B2D] font-heading">
                  Discuss Your {service.title} Requirement
                </h3>
                <p className="text-xs text-[#625D6B] leading-relaxed">
                  Connect directly with ERPGen technical leads to plan your custom implementation, integration, or infrastructure deployment.
                </p>
              </div>

              <div className="shrink-0 flex flex-wrap gap-3 w-full md:w-auto">
                <a href={getWhatsAppUrl(`Hello ERPGen team, I would like to consult with an expert regarding ${service.title}.`)} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="md" icon={<MessageSquare className="w-4 h-4" />}>
                    Chat on WhatsApp
                  </Button>
                </a>
                <Link to="/contact">
                  <Button variant="secondary" size="md" icon={<Headphones className="w-4 h-4" />}>
                    Send Inquiry
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

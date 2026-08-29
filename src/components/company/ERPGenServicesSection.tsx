import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BrainCircuit,
  Globe,
  PhoneCall,
  ShieldCheck,
  Mail,
  Server,
  ArrowRight,
  CheckCircle2,
  Lock,
  Headphones,
  Cpu,
  Layers,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export const ERPGenServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      id: 'ai-development',
      slug: 'ai-software-development',
      title: 'AI Software Development',
      description: 'Next-generation artificial intelligence applications designed to automate operations and drive enterprise growth.',
      icon: BrainCircuit,
      capabilities: ['Machine Learning Models', 'Predictive Analytics', 'Intelligent Automation'],
    },
    {
      id: 'web-app-dev',
      slug: 'web-app-development',
      title: 'Web & App Development',
      description: 'High-performance, responsive websites and scalable applications built with modern architectures.',
      icon: Globe,
      capabilities: ['Progressive Web Apps', 'High-Performance SPAs', 'Secure Backend Systems'],
    },
    {
      id: 'voip-telephony',
      slug: 'ip-telephony-voip',
      title: 'IP Telephony & VoIP',
      description: 'Crystal clear, reliable, and corporate-level VoIP and IP telephony infrastructure deployment.',
      icon: PhoneCall,
      capabilities: ['Global Branch Integration', 'Encrypted Voice Traffic', 'PBX System Upgrades'],
    },
    {
      id: 'cybersecurity',
      slug: 'cybersecurity',
      title: 'Cybersecurity Services',
      description: 'Industry-best security practices protecting networks from digital threats and vulnerabilities.',
      icon: ShieldCheck,
      capabilities: ['Threat Assessment & Mitigation', 'Network Perimeter Security', '24/7 Security Operations'],
    },
    {
      id: 'email-hosting',
      slug: 'enterprise-email',
      title: 'Enterprise Email Hosting',
      description: 'Secure, branded corporate email hosting and active management for seamless communication.',
      icon: Mail,
      capabilities: ['Advanced Threat Protection', 'Secure File Attachments', 'High Uptime Guarantee'],
    },
    {
      id: 'managed-it',
      slug: 'managed-it-support',
      title: 'Managed IT Support',
      description: 'Comprehensive managed IT support, cloud computing, and strategic consulting services.',
      icon: Server,
      capabilities: ['24/7 Dedicated Helpdesk', 'Remote Monitoring & Management', 'Cloud Migration Services'],
    },
  ];

  const technologyPillars = [
    { title: '24/7 Priority Support & Monitoring', icon: Headphones, desc: 'Dedicated technical response and continuous infrastructure oversight.' },
    { title: 'Scalable Architecture & Design', icon: Layers, desc: 'Enterprise architectures built to scale with growing business volume.' },
    { title: 'Industry-Grade Network Security', icon: Lock, desc: 'Encrypted communication, threat mitigation, and data protection.' },
    { title: 'Agile Software Methodologies', icon: Cpu, desc: 'Rapid iterative engineering and continuous deployment cycles.' },
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        pillarsRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-20 lg:py-28 relative overflow-hidden scroll-mt-20 border-b border-[#E9E4F1] bg-[#FAF8FC]"
      aria-label="ERPGen Technology Services Section"
    >
      <Container size="xl" className="space-y-16">
        {/* Section Intro */}
        <SectionHeading
          eyebrow="ERPGEN TECHNOLOGY SERVICES"
          title="Technology expertise"
          titleGradient="beyond ERP."
          description="ERPGen provides comprehensive technology capabilities, combining purpose-built ERP software with software development, infrastructure, security and business IT expertise."
        />

        {/* 6 Services Cards Grid with Verified Sub-capabilities */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="region"
          aria-label="ERPGen Services Grid"
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={service.id}
                variant="brand-border"
                className="p-6 flex flex-col justify-between bg-white border border-[#E9E4F1] shadow-sm hover:border-[#6D57A5]/40 hover:shadow-md transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center group-hover:bg-[#6D57A5] group-hover:text-white transition-all shadow-xs">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-[#625D6B]/60 uppercase tracking-wider font-semibold">
                      Support Ecosystem
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#1F1B2D] font-heading group-hover:text-[#6D57A5] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#625D6B] leading-relaxed mt-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Verified Capabilities Bullet List */}
                  <div className="pt-2 space-y-1.5 border-t border-[#E9E4F1] text-xs">
                    {service.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-2 text-[#625D6B] text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E9E4F1] flex items-center justify-between text-xs text-[#625D6B]">
                  <span className="text-[11px] font-mono text-[#6D57A5] font-semibold">ERPGen Infrastructure</span>
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-[#17B681] hover:text-[#129267] font-semibold transition-colors focus-ring-purple rounded"
                    aria-label={`Explore ${service.title} service`}
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Technology Pillars Bar */}
        <div ref={pillarsRef} className="pt-4">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E9E4F1] shadow-xs">
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#E9E4F1]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold block">
                  Infrastructure Standards
                </span>
                <h4 className="text-xl font-bold text-[#1F1B2D] font-heading mt-0.5">
                  Built on Enterprise Technology Pillars
                </h4>
              </div>
              <span className="text-xs text-[#625D6B] font-medium">
                High-Availability Foundation
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {technologyPillars.map((pillar) => {
                const PillarIcon = pillar.icon;
                return (
                  <div key={pillar.title} className="p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-2">
                    <div className="flex items-center gap-2 text-[#6D57A5]">
                      <PillarIcon className="w-4 h-4 shrink-0" />
                      <h5 className="text-xs font-bold text-[#1F1B2D] font-heading leading-tight">{pillar.title}</h5>
                    </div>
                    <p className="text-[11px] text-[#625D6B] leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

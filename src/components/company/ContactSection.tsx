import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MessageSquare, Send } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import { SITE_DATA, getWhatsAppUrl } from '../../data/siteData';

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: 'Restaurant',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`ERPGen Inquiry from ${formData.name || 'Customer'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nBusiness Context: ${formData.businessType}\n\nRequirements:\n${formData.message}`
    );
    window.location.href = `mailto:${SITE_DATA.contact.email}?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
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
      id="contact"
      className="py-20 lg:py-28 relative overflow-hidden scroll-mt-20 border-b border-[#E9E4F1] bg-white"
      aria-label="Contact & Consultation Section"
    >
      <Container size="xl" className="space-y-16">
        {/* Section Intro */}
        <SectionHeading
          eyebrow="LET'S TALK"
          title="Let's build the right solution"
          titleGradient="for your business."
          description="Discuss your Invoice, POS, or custom ERPGen requirements directly with our engineering team, or chat with us on WhatsApp for rapid consultation."
        />

        {/* Main Consultation & Contact Grid */}
        <div ref={cardRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info & WhatsApp CTA */}
          <div className="lg:col-span-5 space-y-6">
            <Card variant="brand-border" className="p-6 sm:p-8 space-y-6 bg-white border border-[#E9E4F1] shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold block">
                  Direct Channels
                </span>
                <h3 className="text-2xl font-bold text-[#1F1B2D] font-heading">
                  Get in Touch with ERPGen
                </h3>
                <p className="text-xs text-[#625D6B] leading-relaxed">
                  Our team provides direct support for ERPGen module configuration and enterprise deployment.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {/* WhatsApp Action CTA */}
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#E4F8F0] border border-[#17B681]/30 hover:border-[#17B681] hover:bg-[#E4F8F0]/80 transition-all group focus-ring-purple shadow-xs"
                  aria-label="Chat with ERPGen on WhatsApp"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#17B681] text-white flex items-center justify-center transition-all shrink-0 shadow-sm">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-[#129267] uppercase tracking-wider block font-bold">Instant Consultation</span>
                    <span className="text-sm font-bold text-[#129267] block">
                      Chat on WhatsApp
                    </span>
                  </div>
                </a>

                {/* Email Action CTA */}
                <a
                  href={`mailto:${SITE_DATA.contact.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] hover:border-[#6D57A5]/40 hover:bg-white transition-all group focus-ring-purple"
                  aria-label={`Email ERPGen at ${SITE_DATA.contact.email}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center group-hover:bg-[#6D57A5] group-hover:text-white transition-all shrink-0 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-[#625D6B] uppercase tracking-wider block">Official Email</span>
                    <span className="text-sm font-bold text-[#1F1B2D] group-hover:text-[#6D57A5] transition-colors truncate block">
                      {SITE_DATA.contact.email}
                    </span>
                  </div>
                </a>

                {/* Phone Action CTA */}
                <a
                  href={SITE_DATA.contact.phoneTel}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] hover:border-[#17B681]/40 hover:bg-white transition-all group focus-ring-purple"
                  aria-label={`Call ERPGen at ${SITE_DATA.contact.phone}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E9E4F1] text-[#17B681] flex items-center justify-center group-hover:bg-[#17B681] group-hover:text-white transition-all shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#625D6B] uppercase tracking-wider block">Direct Phone</span>
                    <span className="text-sm font-bold text-[#1F1B2D] group-hover:text-[#17B681] transition-colors block">
                      {SITE_DATA.contact.phone}
                    </span>
                  </div>
                </a>
              </div>

              <div className="pt-4 border-t border-[#E9E4F1] text-xs text-[#625D6B] flex items-center justify-between">
                <span>Direct Support: Available Mon – Sat</span>
                <span className="text-[#6D57A5] font-semibold">Smarter Business. Simpler ERP.</span>
              </div>
            </Card>
          </div>

          {/* Right Column: Frontend Consultation Request Form Panel */}
          <div className="lg:col-span-7">
            <Card variant="default" className="p-6 sm:p-8 space-y-6 border border-[#E9E4F1] bg-white shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#E9E4F1]">
                <div>
                  <h3 className="text-xl font-bold text-[#1F1B2D] font-heading">
                    Send a Direct Consultation Request
                  </h3>
                  <p className="text-xs text-[#625D6B] mt-1">
                    Select your operational requirements to prepare a direct inquiry.
                  </p>
                </div>
                <MessageSquare className="w-5 h-5 text-[#6D57A5] hidden xs:block" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-[#1F1B2D] block">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#1F1B2D] text-xs placeholder:text-[#625D6B]/60 focus:bg-white focus-ring-purple"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold text-[#1F1B2D] block">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#1F1B2D] text-xs placeholder:text-[#625D6B]/60 focus:bg-white focus-ring-purple"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-business" className="text-xs font-semibold text-[#1F1B2D] block">
                    Business Context / Module Requirement
                  </label>
                  <select
                    id="contact-business"
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#1F1B2D] text-xs focus:bg-white focus-ring-purple cursor-pointer"
                  >
                    <option value="Standalone Invoice Module">Standalone Invoice Module</option>
                    <option value="Standalone POS Counter">Standalone POS Counter</option>
                    <option value="Invoice + POS Combined Suite">Invoice + POS Combined Suite</option>
                    <option value="Restaurant POS Workflow">Restaurant POS Workflow</option>
                    <option value="Barbershop POS Workflow">Barbershop POS Workflow</option>
                    <option value="Supermarket POS Workflow">Supermarket POS Workflow</option>
                    <option value="Laundry POS Workflow">Laundry POS Workflow</option>
                    <option value="Custom Enterprise Solution">Custom Enterprise Solution</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-[#1F1B2D] block">
                    Requirements & Operational Notes
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="Describe your current counter or billing workflow..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#1F1B2D] text-xs placeholder:text-[#625D6B]/60 focus:bg-white focus-ring-purple resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={<Send className="w-4 h-4" />}
                    className="w-full sm:w-auto shadow-md shadow-[#6D57A5]/20"
                  >
                    Prepare Email Inquiry
                  </Button>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#129267] hover:text-[#17B681] font-semibold"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Or chat instantly on WhatsApp →</span>
                  </a>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};

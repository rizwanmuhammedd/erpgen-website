import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, X } from 'lucide-react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import { SITE_DATA, getWhatsAppUrl } from '../../data/siteData';
import { submitContactEnquiry } from '../../services/contactService';

const VISITOR_STORAGE_KEY = 'erpgen_visitor_contact';

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { t, isRtl } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: 'ERP Lite (Standard Product)',
    message: '',
  });

  const [hasRestoredDetails, setHasRestoredDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Restore returning visitor's locally stored contact information and handle query parameters
  useEffect(() => {
    let initialType = 'ERP Lite (Standard Product)';
    const searchParams = new URLSearchParams(location.search);
    const tier = searchParams.get('tier');
    if (tier === 'lite') {
      initialType = 'ERP Lite (Standard Product)';
    } else if (tier === 'pro') {
      initialType = 'ERP Pro (Custom Solution)';
    }

    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(VISITOR_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') {
            setFormData({
              name: parsed.name || '',
              email: parsed.email || '',
              phone: parsed.phone || '',
              businessType: initialType,
              message: '',
            });
            if (parsed.name || parsed.email || parsed.phone) {
              setHasRestoredDetails(true);
            }
            return;
          }
        }
      } catch {
        // Fallback gracefully on parsing errors
      }
    }

    setFormData((prev) => ({ ...prev, businessType: initialType }));
  }, [location.search]);

  const handleClearSavedDetails = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(VISITOR_STORAGE_KEY);
    }
    setFormData((prev) => ({
      ...prev,
      name: '',
      email: '',
      phone: '',
    }));
    setHasRestoredDetails(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const fullMessage = formData.businessType
        ? `[Product Tier / Context: ${formData.businessType}]\n${formData.message}`
        : formData.message;

      await submitContactEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() ? formData.phone.trim() : undefined,
        message: fullMessage.trim(),
      });

      // Save valid contact details locally for convenient returning visitor autofill
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(
            VISITOR_STORAGE_KEY,
            JSON.stringify({
              name: formData.name.trim(),
              email: formData.email.trim(),
              phone: formData.phone.trim(),
            })
          );
        } catch {
          // Ignore local storage quota limits
        }
      }

      setSuccessMessage(t('contact.successDesc'));
      // Clear message only; retain name/email/phone for returning convenience
      setFormData((prev) => ({
        ...prev,
        message: '',
      }));
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'An error occurred while submitting your enquiry. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current.children,
          {
            transformPerspective: 1200,
            rotateX: 10,
            y: 30,
            opacity: 0,
          },
          {
            rotateX: 0,
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 sm:py-24 relative overflow-hidden bg-white border-t border-[#E9E4F1]"
      aria-label="Contact and Technical Consultation Section"
    >
      <Container size="xl" className="space-y-12">
        {/* Section Heading */}
        <div className="max-w-3xl space-y-3 text-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8FC] border border-[#E9E4F1] text-[11px] font-mono font-semibold text-[#6D57A5] shadow-xs">
            <MessageSquare className="w-3.5 h-3.5 text-[#17B681]" />
            <span>{t('contact.eyebrow')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1B2D] font-heading tracking-tight">
            {t('contact.title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D57A5] to-[#17B681]">
              {t('contact.titleGradient')}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#625D6B] max-w-2xl leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        {/* 2-Column Split: Contact Channels + Functional Consultation Form */}
        <div ref={cardRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-6">
            <Card
              variant="brand-border"
              spotlight={true}
              className="p-6 sm:p-8 space-y-6 bg-[#FAF8FC] border border-[#E9E4F1] rounded-2xl shadow-xs"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold block">
                  Technical Consultation
                </span>
                <h3 className="text-xl font-bold text-[#1F1B2D] font-heading">
                  Direct Engineering Engagement
                </h3>
                <p className="text-xs text-[#625D6B] leading-relaxed">
                  We engage with technical clarity from your very first conversation. Discuss standard ERP Lite deployment or tailored ERP Pro adaptations directly.
                </p>
              </div>

              {/* Direct CTAs */}
              <div className="space-y-3">
                {/* WhatsApp Action CTA */}
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#E9E4F1] hover:border-[#17B681]/50 hover:shadow-xs transition-all group focus-ring-purple"
                  aria-label="Direct Chat with ERPGen Specialist on WhatsApp"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#E4F8F0] border border-[#17B681]/30 text-[#129267] flex items-center justify-center group-hover:bg-[#17B681] group-hover:text-white transition-all shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-[#129267] font-semibold uppercase tracking-wider block">
                      Fastest Response
                    </span>
                    <span className="text-sm font-bold text-[#1F1B2D] group-hover:text-[#17B681] transition-colors block">
                      {t('contact.whatsAppUs')}
                    </span>
                  </div>
                </a>

                {/* Email Action CTA */}
                <a
                  href={`mailto:${SITE_DATA.contact.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#E9E4F1] hover:border-[#6D57A5]/40 hover:shadow-xs transition-all group focus-ring-purple"
                  aria-label={`Email ERPGen at ${SITE_DATA.contact.email}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center group-hover:bg-[#6D57A5] group-hover:text-white transition-all shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-[#625D6B] uppercase tracking-wider block">
                      {t('contact.officialEmail')}
                    </span>
                    <span className="text-sm font-bold text-[#1F1B2D] group-hover:text-[#6D57A5] transition-colors truncate block">
                      {SITE_DATA.contact.email}
                    </span>
                  </div>
                </a>

                {/* Phone Action CTA */}
                <a
                  href={SITE_DATA.contact.phoneTel}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#E9E4F1] hover:border-[#17B681]/40 hover:shadow-xs transition-all group focus-ring-purple"
                  aria-label={`Call ERPGen at ${SITE_DATA.contact.phone}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#17B681] flex items-center justify-center group-hover:bg-[#17B681] group-hover:text-white transition-all shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-[#625D6B] uppercase tracking-wider block">
                      {t('contact.directPhone')}
                    </span>
                    <span className="text-sm font-bold text-[#1F1B2D] group-hover:text-[#17B681] transition-colors block">
                      {SITE_DATA.contact.phone}
                    </span>
                  </div>
                </a>
              </div>

              <div className="pt-4 border-t border-[#E9E4F1] text-xs text-[#625D6B] flex items-center justify-between">
                <span>{t('contact.supportHours')}</span>
                <span className="text-[#6D57A5] font-semibold">{t('footer.slogan')}</span>
              </div>
            </Card>
          </div>

          {/* Right Column: Public Consultation Form Panel */}
          <div className="lg:col-span-7">
            <Card variant="default" spotlight={true} className="p-6 sm:p-8 space-y-6 border border-[#E9E4F1] bg-white shadow-sm rounded-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#E9E4F1]">
                <div>
                  <h3 className="text-xl font-bold text-[#1F1B2D] font-heading">
                    {t('contact.formTitle')}
                  </h3>
                  <p className="text-xs text-[#625D6B] mt-1">
                    {t('contact.formDesc')}
                  </p>
                </div>
                <MessageSquare className="w-5 h-5 text-[#6D57A5] hidden xs:block" />
              </div>

              {/* Returning Visitor Notice */}
              {hasRestoredDetails && !successMessage && (
                <div className="p-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-xs text-[#625D6B] flex items-center justify-between gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex items-center gap-1.5 truncate">
                    <Sparkles className="w-3.5 h-3.5 text-[#6D57A5] shrink-0" />
                    <span className="text-[11px]">{t('contact.autofillBadge')}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearSavedDetails}
                    className="text-[10px] font-semibold text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2 py-0.5 rounded-md flex items-center gap-0.5 cursor-pointer shrink-0 transition-all active:scale-95"
                    title={t('contact.clearAutofill')}
                  >
                    <X className="w-3 h-3" />
                    <span>{t('contact.clearAutofill')}</span>
                  </button>
                </div>
              )}

              {/* Success Notification */}
              {successMessage ? (
                <div className="p-6 rounded-2xl bg-[#E4F8F0] border border-[#17B681]/30 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#17B681] text-white flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-[#1F1B2D]">{t('contact.successTitle')}</h4>
                    <p className="text-xs text-[#625D6B] leading-relaxed max-w-md mx-auto">
                      {successMessage}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSuccessMessage(null)}
                    className="mt-2"
                  >
                    {t('contact.submitAnother')}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-[#1F1B2D] block">
                        {t('contact.nameLabel')} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        maxLength={150}
                        placeholder={t('contact.namePlaceholder')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#1F1B2D] text-xs placeholder:text-[#625D6B]/60 focus:bg-white focus-ring-purple disabled:opacity-60 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-[#1F1B2D] block">
                        {t('contact.emailLabel')} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={256}
                        placeholder={t('contact.emailPlaceholder')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#1F1B2D] text-xs placeholder:text-[#625D6B]/60 focus:bg-white focus-ring-purple disabled:opacity-60 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="text-xs font-semibold text-[#1F1B2D] block">
                        {t('contact.phoneLabel')}{' '}
                        <span className="text-[#625D6B] font-normal">{t('contact.optional')}</span>
                      </label>
                      <input
                        id="contact-phone"
                        name="tel"
                        type="tel"
                        autoComplete="tel"
                        maxLength={50}
                        placeholder={t('contact.phonePlaceholder')}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#1F1B2D] text-xs placeholder:text-[#625D6B]/60 focus:bg-white focus-ring-purple disabled:opacity-60 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-business" className="text-xs font-semibold text-[#1F1B2D] block">
                        {t('contact.businessLabel')}
                      </label>
                      <select
                        id="contact-business"
                        name="businessType"
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#1F1B2D] text-xs focus:bg-white focus-ring-purple cursor-pointer disabled:opacity-60 transition-all"
                      >
                        <option value="ERP Lite (Standard Product)">ERP Lite (Standard Ready Product)</option>
                        <option value="ERP Pro (Custom Solution)">ERP Pro (Custom Configured Solution)</option>
                        <option value="ERPGen Invoice Standalone">ERPGen Invoice Standalone</option>
                        <option value="ERPGen POS Standalone">ERPGen POS Standalone</option>
                        <option value="Restaurant POS Workflow">Restaurant POS Workflow</option>
                        <option value="Barbershop POS Workflow">Barbershop POS Workflow</option>
                        <option value="Supermarket POS Workflow">Supermarket POS Workflow</option>
                        <option value="Laundry POS Workflow">Laundry POS Workflow</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-[#1F1B2D] block">
                      {t('contact.messageLabel')} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      maxLength={4000}
                      placeholder={t('contact.messagePlaceholder')}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={isSubmitting}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#1F1B2D] text-xs placeholder:text-[#625D6B]/60 focus:bg-white focus-ring-purple resize-none disabled:opacity-60 transition-all"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={isSubmitting}
                      icon={
                        isSubmitting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                        )
                      }
                      className="w-full sm:w-auto shadow-md shadow-[#6D57A5]/20"
                    >
                      {isSubmitting ? t('contact.submitting') : t('contact.submitBtn')}
                    </Button>

                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#129267] hover:text-[#17B681] font-semibold"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{t('contact.whatsAppUs')}</span>
                    </a>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { SITE_DATA, getWhatsAppUrl } from '../../data/siteData';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#FAF8FC] border-t border-[#E9E4F1] pt-16 pb-12 relative z-10 text-[#625D6B] text-sm">
      <Container size="xl" className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {/* COLUMN 1: Company & Product Brand */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block focus-ring-purple rounded-lg p-0.5 hover:opacity-90 transition-opacity" aria-label="ERPGen Home">
              <img
                src="/erpgen-logo-blue.png"
                alt="ERPGen — Smarter Business. Simpler ERP."
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-[#625D6B] text-xs sm:text-sm leading-relaxed max-w-sm">
              {t('footer.brandDesc')}
            </p>
            <div className="pt-1">
              <span className="text-[11px] font-mono text-[#6D57A5] font-semibold tracking-wider uppercase">
                {t('footer.slogan')}
              </span>
            </div>
          </div>

          {/* COLUMN 2: PRODUCTS */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
              {t('footer.products')}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products" className="hover:text-[#6D57A5] transition-colors">
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link to="/products/invoice" className="hover:text-[#6D57A5] transition-colors">
                  {t('nav.invoice')}
                </Link>
              </li>
              <li>
                <Link to="/products/pos" className="hover:text-[#6D57A5] transition-colors">
                  {t('nav.pos')}
                </Link>
              </li>
              <li>
                <Link to="/products/pos/restaurant" className="hover:text-[#6D57A5] transition-colors">
                  {t('nav.restaurantPos')}
                </Link>
              </li>
              <li>
                <Link to="/products/pos/barbershop" className="hover:text-[#6D57A5] transition-colors">
                  {t('nav.barbershopPos')}
                </Link>
              </li>
              <li>
                <Link to="/products/pos/supermarket" className="hover:text-[#6D57A5] transition-colors">
                  {t('nav.supermarketPos')}
                </Link>
              </li>
              <li>
                <Link to="/products/pos/laundry" className="hover:text-[#6D57A5] transition-colors">
                  {t('nav.laundryPos')}
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: ERP TIERS & SOLUTIONS */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
              {t('footer.solutions')}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/#erp-tiers" className="hover:text-[#6D57A5] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17B681]" />
                  <span>{t('tiers.liteTitle')} • {t('tiers.liteTag')}</span>
                </a>
              </li>
              <li>
                <a href="/#erp-tiers" className="hover:text-[#6D57A5] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6D57A5]" />
                  <span>{t('tiers.proTitle')} • {t('tiers.proTag')}</span>
                </a>
              </li>
              <li>
                <a href="/#erp-tiers" className="hover:text-[#6D57A5] transition-colors">
                  {t('tiers.compareTitle')}
                </a>
              </li>
              <li>
                <Link to="/contact?tier=lite" className="hover:text-[#6D57A5] transition-colors">
                  {t('tiers.liteCta')}
                </Link>
              </li>
              <li>
                <Link to="/contact?tier=pro" className="hover:text-[#6D57A5] transition-colors">
                  {t('tiers.proCta')}
                </Link>
              </li>
              <li>
                <a href="/#core-modules" className="hover:text-[#6D57A5] transition-colors">
                  {t('hero.highlight3')}
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: COMPANY & CONTACT */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
              {t('footer.company')}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-[#6D57A5] transition-colors">
                  {t('nav.whyUs')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#6D57A5] transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>

            <div className="space-y-2.5 text-xs pt-2 border-t border-[#E9E4F1]">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E4F8F0] border border-[#17B681]/30 text-[#129267] hover:bg-[#17B681] hover:text-white font-semibold transition-all shadow-xs"
                aria-label="Chat with ERPGen on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span>{t('contact.whatsAppUs')}</span>
                <ArrowUpRight className="w-3 h-3 rtl:rotate-90 opacity-60" />
              </a>

              <a
                href={SITE_DATA.contact.phoneTel}
                className="flex items-center gap-2 text-[#1F1B2D] hover:text-[#6D57A5] transition-colors"
                aria-label={`Call ERPGen at ${SITE_DATA.contact.phone}`}
              >
                <Phone className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                <span dir="ltr">{SITE_DATA.contact.phone}</span>
              </a>

              <a
                href={`mailto:${SITE_DATA.contact.email}`}
                className="flex items-center gap-2 text-[#1F1B2D] hover:text-[#6D57A5] transition-colors"
                aria-label={`Email ERPGen at ${SITE_DATA.contact.email}`}
              >
                <Mail className="w-3.5 h-3.5 text-[#6D57A5] shrink-0" />
                <span>{SITE_DATA.contact.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Status Bar */}
        <div className="pt-8 border-t border-[#E9E4F1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#625D6B]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} ERPGen. {t('footer.rights')}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[#129267] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
              {t('footer.status')}
            </span>
            <span className="text-[#625D6B]/50">•</span>
            <span>{t('footer.slogan')}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

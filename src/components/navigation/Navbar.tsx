import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, MessageSquare, Layers } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { DesktopMegaMenu } from './DesktopMegaMenu';
import { AnimatedERPGenLogo } from './AnimatedERPGenLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';
import { getWhatsAppUrl } from '../../data/siteData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const prevPathnameRef = useRef(location.pathname);
  const { t, isRtl } = useLanguage();

  // Handle scroll effect and progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollY / maxScroll)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    if (prevPathnameRef.current !== location.pathname) {
      prevPathnameRef.current = location.pathname;
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
  }, [location.pathname, mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-[#E9E4F1] py-2 sm:py-2.5 shadow-[0_4px_25px_rgba(109,87,165,0.06)]'
          : 'bg-white/80 backdrop-blur-md py-3 sm:py-3.5 border-b border-[#E9E4F1]/60'
      }`}
    >
      {/* Scroll Depth Hairline Indicator */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-transparent pointer-events-none overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#6D57A5] via-[#8C74CC] to-[#17B681] transition-all duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      <Container size="xl">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Animated ERPGen Logo Component */}
          <AnimatedERPGenLogo onNavigateHome={() => setMobileMenuOpen(false)} />

          {/* Desktop Navigation with Mega Menus */}
          <nav className="hidden lg:flex items-center bg-[#FAF8FC] p-1.5 rounded-2xl border border-[#E9E4F1] backdrop-blur-md">
            <DesktopMegaMenu />
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher variant="navbar" />

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-[#FAF8FC] border border-transparent hover:border-[#E9E4F1] transition-all"
              aria-label="Consult ERPGen expert on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#17B681]" />
              <span className="hidden xl:inline">{t('nav.consultWhatsApp')}</span>
            </a>

            <Button
              variant="primary"
              size="sm"
              icon={<ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}
              onClick={() => navigate('/contact')}
            >
              {t('nav.buildPlan')}
            </Button>
          </div>

          {/* Mobile Actions: Language + WhatsApp + Menu Toggle */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher variant="compact" />

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg bg-[#E4F8F0] border border-[#17B681]/30 text-[#129267] font-semibold"
              aria-label="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#1F1B2D] hover:text-[#6D57A5] bg-[#FAF8FC] border border-[#E9E4F1] focus-ring-purple cursor-pointer transition-transform active:scale-95"
              aria-label={mobileMenuOpen ? t('nav.close') : t('nav.open')}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <Menu className={`w-5 h-5 absolute inset-0 transition-all duration-200 ${mobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
                <X className={`w-5 h-5 text-[#17B681] absolute inset-0 transition-all duration-200 ${mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="lg:hidden mt-3 pt-4 pb-6 px-4 bg-white/98 border border-[#E9E4F1] rounded-2xl backdrop-blur-2xl shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 origin-top"
          >
            <div className="flex flex-col space-y-2.5">
              <div className="pb-3 border-b border-[#E9E4F1] flex justify-center">
                <LanguageSwitcher variant="navbar" className="w-full justify-center" />
              </div>

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-colors ${
                  location.pathname === '/'
                    ? 'bg-[#FAF8FC] text-[#6D57A5] font-bold border-s-2 border-[#6D57A5]'
                    : 'text-[#1F1B2D] hover:bg-[#FAF8FC] hover:text-[#6D57A5]'
                }`}
              >
                {t('nav.home')}
              </Link>

              {/* ERP Tiers Link */}
              <a
                href="/#erp-tiers"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl text-xs font-semibold text-[#6D57A5] bg-[#FAF8FC] border border-[#E9E4F1] flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#17B681]" />
                  <span>{t('nav.erpTiers')}</span>
                </span>
                <span className="text-[10px] font-mono text-[#17B681] font-bold">Lite | Pro</span>
              </a>

              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-colors ${
                  location.pathname.startsWith('/products')
                    ? 'bg-[#FAF8FC] text-[#6D57A5] font-bold border-s-2 border-[#6D57A5]'
                    : 'text-[#1F1B2D] hover:bg-[#FAF8FC] hover:text-[#6D57A5]'
                }`}
              >
                {t('nav.products')}
              </Link>

              <div className="ms-3 space-y-1 text-xs text-[#625D6B] border-s-2 border-[#E9E4F1] ps-2.5">
                <Link to="/products/invoice" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#6D57A5]">
                  • {t('nav.invoice')}
                </Link>
                <Link to="/products/pos" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#6D57A5]">
                  • {t('nav.pos')}
                </Link>
              </div>

              <a
                href="/#core-modules"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl text-xs font-semibold text-[#1F1B2D] hover:bg-[#FAF8FC] hover:text-[#6D57A5] transition-colors"
              >
                {t('nav.coreErp')}
              </a>

              <a
                href="/#business-types"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl text-xs font-semibold text-[#1F1B2D] hover:bg-[#FAF8FC] hover:text-[#6D57A5] transition-colors"
              >
                {t('nav.businessTypes')}
              </a>

              <a
                href="/#why-erpgen"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl text-xs font-semibold text-[#1F1B2D] hover:bg-[#FAF8FC] hover:text-[#6D57A5] transition-colors"
              >
                {t('nav.whyUs')}
              </a>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-colors ${
                  location.pathname === '/about'
                    ? 'bg-[#FAF8FC] text-[#6D57A5] font-bold border-s-2 border-[#6D57A5]'
                    : 'text-[#1F1B2D] hover:bg-[#FAF8FC] hover:text-[#6D57A5]'
                }`}
              >
                {t('nav.about')}
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-colors ${
                  location.pathname === '/contact'
                    ? 'bg-[#FAF8FC] text-[#6D57A5] font-bold border-s-2 border-[#6D57A5]'
                    : 'text-[#1F1B2D] hover:bg-[#FAF8FC] hover:text-[#6D57A5]'
                }`}
              >
                {t('nav.contact')}
              </Link>

              <div className="pt-3 border-t border-[#E9E4F1] flex flex-col gap-2">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#E4F8F0] border border-[#17B681]/30 text-[#129267] font-bold text-xs hover:bg-[#17B681] hover:text-white transition-all shadow-xs"
                  aria-label="Chat with ERPGen on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t('contact.whatsAppUs')}</span>
                </a>

                <Button
                  variant="primary"
                  fullWidth
                  icon={<ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/contact');
                  }}
                >
                  {t('nav.buildPlan')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, MessageSquare } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { DesktopMegaMenu } from './DesktopMegaMenu';
import { AnimatedERPGenLogo } from './AnimatedERPGenLogo';
import { getWhatsAppUrl } from '../../data/siteData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-[#E9E4F1] py-3 shadow-sm shadow-[#6D57A5]/5'
          : 'bg-white/90 backdrop-blur-md py-4 border-b border-[#E9E4F1]/60'
      }`}
    >
      <Container size="xl">
        <div className="flex items-center justify-between">
          {/* Reusable Animated ERPGen Logo Component synchronized with mobile menu */}
          <AnimatedERPGenLogo
            isMobileMenuOpen={mobileMenuOpen}
            onNavigateHome={() => setMobileMenuOpen(false)}
          />

          {/* Desktop Navigation with Mega Menus */}
          <nav className="hidden lg:flex items-center bg-[#FAF8FC] p-1.5 rounded-2xl border border-[#E9E4F1] backdrop-blur-md">
            <DesktopMegaMenu />
          </nav>

          {/* Desktop Actions */}
          <div className="hidden xl:flex items-center gap-3">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-[#FAF8FC] border border-transparent hover:border-[#E9E4F1] transition-all"
              aria-label="Consult ERPGen expert on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#17B681]" />
              <span>Consult Expert</span>
            </a>
            <Button
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/contact')}
            >
              Build Your ERP
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-[#E4F8F0] border border-[#17B681]/30 text-[#129267] font-semibold"
              aria-label="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#1F1B2D] hover:text-[#6D57A5] bg-[#FAF8FC] border border-[#E9E4F1] focus-ring-purple cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#17B681]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="lg:hidden mt-4 pt-4 pb-6 px-4 bg-white border border-[#E9E4F1] rounded-2xl backdrop-blur-2xl shadow-xl animate-in fade-in slide-in-from-top-4 duration-200"
          >
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl text-sm font-medium text-[#1F1B2D] hover:bg-[#FAF8FC] hover:text-[#6D57A5]"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl text-sm font-medium text-[#1F1B2D] hover:bg-[#FAF8FC] hover:text-[#6D57A5]"
              >
                Products Overview
              </Link>
              <div className="pl-3 space-y-1 text-xs text-[#625D6B]">
                <Link to="/products/invoice" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#6D57A5]">• Invoice Module</Link>
                <Link to="/products/pos" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#6D57A5]">• POS System</Link>
              </div>

              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl text-sm font-medium text-[#1F1B2D] hover:bg-[#FAF8FC] hover:text-[#6D57A5]"
              >
                Services Overview
              </Link>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl text-sm font-medium text-[#1F1B2D] hover:bg-[#FAF8FC] hover:text-[#6D57A5]"
              >
                Why Us / About
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl text-sm font-medium text-[#1F1B2D] hover:bg-[#FAF8FC] hover:text-[#6D57A5]"
              >
                Contact & Consultation
              </Link>

              <div className="pt-4 border-t border-[#E9E4F1] flex flex-col gap-2.5">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#E4F8F0] border border-[#17B681]/30 text-[#129267] font-bold text-sm hover:bg-[#17B681] hover:text-white transition-all shadow-xs"
                  aria-label="Chat with ERPGen on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <Button
                  variant="primary"
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/contact');
                  }}
                >
                  Build Custom ERP Plan
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

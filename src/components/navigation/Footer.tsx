import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { SITE_DATA, getWhatsAppUrl } from '../../data/siteData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF8FC] border-t border-[#E9E4F1] pt-16 pb-12 relative z-10 text-[#625D6B] text-sm">
      <Container size="xl" className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {/* COLUMN 1: Company & Product Brand */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block focus-ring-purple rounded-lg p-0.5" aria-label="ERPGen Home">
              <img
                src="/erpgen-logo.png"
                alt="ERPGen — Smarter Business. Simpler ERP."
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-[#625D6B] text-xs sm:text-sm leading-relaxed max-w-sm">
              The flexible business management platform. Choose standalone Invoice, high-speed POS, or configure a combined solution around your exact business requirements.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Badge variant="brand" size="sm">
                Enterprise Modular ERP
              </Badge>
            </div>
          </div>

          {/* COLUMN 2: PRODUCTS */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
              Products
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products" className="hover:text-[#6D57A5] transition-colors">
                  Products Overview
                </Link>
              </li>
              <li>
                <Link to="/products/invoice" className="hover:text-[#6D57A5] transition-colors">
                  ERPGen Invoice
                </Link>
              </li>
              <li>
                <Link to="/products/pos" className="hover:text-[#6D57A5] transition-colors">
                  ERPGen POS
                </Link>
              </li>
              <li>
                <Link to="/products/pos/restaurant" className="hover:text-[#6D57A5] transition-colors">
                  Restaurant POS
                </Link>
              </li>
              <li>
                <Link to="/products/pos/barbershop" className="hover:text-[#6D57A5] transition-colors">
                  Barbershop POS
                </Link>
              </li>
              <li>
                <Link to="/products/pos/supermarket" className="hover:text-[#6D57A5] transition-colors">
                  Supermarket POS
                </Link>
              </li>
              <li>
                <Link to="/products/pos/laundry" className="hover:text-[#6D57A5] transition-colors">
                  Laundry POS
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: SERVICES */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
              Services
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services" className="hover:text-[#6D57A5] transition-colors">
                  Services Overview
                </Link>
              </li>
              <li>
                <Link to="/services/ai-software-development" className="hover:text-[#6D57A5] transition-colors">
                  AI Software Development
                </Link>
              </li>
              <li>
                <Link to="/services/web-app-development" className="hover:text-[#6D57A5] transition-colors">
                  Web & App Development
                </Link>
              </li>
              <li>
                <Link to="/services/ip-telephony-voip" className="hover:text-[#6D57A5] transition-colors">
                  IP Telephony & VoIP
                </Link>
              </li>
              <li>
                <Link to="/services/cybersecurity" className="hover:text-[#6D57A5] transition-colors">
                  Cybersecurity Services
                </Link>
              </li>
              <li>
                <Link to="/services/enterprise-email" className="hover:text-[#6D57A5] transition-colors">
                  Enterprise Email Hosting
                </Link>
              </li>
              <li>
                <Link to="/services/managed-it-support" className="hover:text-[#6D57A5] transition-colors">
                  Managed IT Support
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: COMPANY & CONTACT */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
              Company & Contact
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-[#6D57A5] transition-colors">
                  About / Why Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#6D57A5] transition-colors">
                  Contact & Consultation
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
                <span>WhatsApp Us</span>
              </a>

              <a
                href={SITE_DATA.contact.phoneTel}
                className="flex items-center gap-2 text-[#1F1B2D] hover:text-[#6D57A5] transition-colors"
                aria-label={`Call ERPGen at ${SITE_DATA.contact.phone}`}
              >
                <Phone className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                <span>{SITE_DATA.contact.phone}</span>
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
            <span>© {new Date().getFullYear()} ERPGen. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[#129267] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] animate-pulse" />
              ERPGen Cloud & Enterprise Platform
            </span>
            <span className="text-[#625D6B]/50">•</span>
            <span>Smarter Business. Simpler ERP.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  ShoppingBag,
  Utensils,
  Scissors,
  ShoppingCart,
  Shirt,
  BrainCircuit,
  Globe,
  PhoneCall,
  ShieldCheck,
  Mail,
  Server,
  ChevronDown,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const DesktopMegaMenu: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<'products' | 'services' | null>(null);

  return (
    <div className="flex items-center gap-1">
      {/* Home Link */}
      <Link
        to="/"
        className="px-3 py-1.5 text-xs font-medium text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-[#FAF8FC] rounded-xl transition-all"
      >
        Home
      </Link>

      {/* Products Mega-Menu Trigger */}
      <div
        className="relative"
        onMouseEnter={() => setActiveMenu('products')}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <Link
          to="/products"
          className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all flex items-center gap-1 ${
            activeMenu === 'products'
              ? 'text-[#6D57A5] bg-[#FAF8FC] font-semibold'
              : 'text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-[#FAF8FC]'
          }`}
        >
          <span>Products</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'products' ? 'rotate-180 text-[#6D57A5]' : 'text-[#625D6B]'}`} />
        </Link>

        {/* Products Mega Menu Dropdown */}
        {activeMenu === 'products' && (
          <div className="absolute top-full left-0 mt-2 w-[520px] p-4 bg-white border border-[#E9E4F1] rounded-2xl backdrop-blur-2xl shadow-xl animate-in fade-in duration-200 z-50">
            <div className="grid grid-cols-2 gap-4">
              {/* Core ERP Modules Column */}
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#E9E4F1]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                    Core Modules
                  </span>
                  <Badge variant="brand" size="sm" className="text-[8px] py-0 px-1">
                    Confirmed
                  </Badge>
                </div>

                <Link
                  to="/products/invoice"
                  onClick={() => setActiveMenu(null)}
                  className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAF8FC] transition-all group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center shrink-0 group-hover:bg-[#6D57A5] group-hover:text-white transition-colors">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#6D57A5] transition-colors">ERPGen Invoice</h5>
                    <p className="text-[10px] text-[#625D6B]">Billing & PDF Invoices</p>
                  </div>
                </Link>

                <Link
                  to="/products/pos"
                  onClick={() => setActiveMenu(null)}
                  className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAF8FC] transition-all group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#E4F8F0] border border-[#17B681]/30 text-[#17B681] flex items-center justify-center shrink-0 group-hover:bg-[#17B681] group-hover:text-white transition-colors">
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#17B681] transition-colors">ERPGen POS</h5>
                    <p className="text-[10px] text-[#625D6B]">High-Speed Counter POS</p>
                  </div>
                </Link>
              </div>

              {/* POS Industry Solutions Column */}
              <div className="space-y-2">
                <div className="pb-2 border-b border-[#E9E4F1]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#625D6B] font-bold">
                    POS Workflows
                  </span>
                </div>

                <div className="space-y-1">
                  <Link
                    to="/products/pos/restaurant"
                    onClick={() => setActiveMenu(null)}
                    className="flex items-center gap-2 p-1.5 rounded-lg text-xs text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-[#FAF8FC] transition-colors"
                  >
                    <Utensils className="w-3.5 h-3.5 text-[#6D57A5]" />
                    <span>Restaurant POS</span>
                  </Link>

                  <Link
                    to="/products/pos/barbershop"
                    onClick={() => setActiveMenu(null)}
                    className="flex items-center gap-2 p-1.5 rounded-lg text-xs text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-[#FAF8FC] transition-colors"
                  >
                    <Scissors className="w-3.5 h-3.5 text-[#6D57A5]" />
                    <span>Barbershop POS</span>
                  </Link>

                  <Link
                    to="/products/pos/supermarket"
                    onClick={() => setActiveMenu(null)}
                    className="flex items-center gap-2 p-1.5 rounded-lg text-xs text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-[#FAF8FC] transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-[#6D57A5]" />
                    <span>Supermarket POS</span>
                  </Link>

                  <Link
                    to="/products/pos/laundry"
                    onClick={() => setActiveMenu(null)}
                    className="flex items-center gap-2 p-1.5 rounded-lg text-xs text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-[#FAF8FC] transition-colors"
                  >
                    <Shirt className="w-3.5 h-3.5 text-[#6D57A5]" />
                    <span>Laundry POS</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Mega-Menu Callout */}
            <div className="mt-3 pt-3 border-t border-[#E9E4F1] flex items-center justify-between text-xs bg-[#FAF8FC] p-2.5 rounded-xl border border-[#E9E4F1]">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#17B681]" />
                <span className="text-[11px] text-[#625D6B]">Choose standalone or combine Invoice + POS</span>
              </div>
              <Link
                to="/products"
                onClick={() => setActiveMenu(null)}
                className="text-[11px] font-bold text-[#6D57A5] hover:text-[#584488] flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Services Mega-Menu Trigger */}
      <div
        className="relative"
        onMouseEnter={() => setActiveMenu('services')}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <Link
          to="/services"
          className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all flex items-center gap-1 ${
            activeMenu === 'services'
              ? 'text-[#6D57A5] bg-[#FAF8FC] font-semibold'
              : 'text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-[#FAF8FC]'
          }`}
        >
          <span>Services</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'services' ? 'rotate-180 text-[#6D57A5]' : 'text-[#625D6B]'}`} />
        </Link>

        {/* Services Mega Menu Dropdown */}
        {activeMenu === 'services' && (
          <div className="absolute top-full left-0 mt-2 w-[540px] p-4 bg-white border border-[#E9E4F1] rounded-2xl backdrop-blur-2xl shadow-xl animate-in fade-in duration-200 z-50">
            <div className="pb-2 border-b border-[#E9E4F1] mb-3 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                ERPGen Technology Ecosystem
              </span>
              <Badge variant="neutral" size="sm" className="text-[8px] py-0 px-1">
                IT Services
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/services/ai-software-development"
                onClick={() => setActiveMenu(null)}
                className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAF8FC] transition-all group"
              >
                <BrainCircuit className="w-4 h-4 text-[#6D57A5] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#6D57A5] transition-colors">AI Software Dev</h5>
                  <p className="text-[10px] text-[#625D6B]">ML & Automation</p>
                </div>
              </Link>

              <Link
                to="/services/web-app-development"
                onClick={() => setActiveMenu(null)}
                className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAF8FC] transition-all group"
              >
                <Globe className="w-4 h-4 text-[#6D57A5] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#6D57A5] transition-colors">Web & App Dev</h5>
                  <p className="text-[10px] text-[#625D6B]">PWA & High-Perf SPAs</p>
                </div>
              </Link>

              <Link
                to="/services/ip-telephony-voip"
                onClick={() => setActiveMenu(null)}
                className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAF8FC] transition-all group"
              >
                <PhoneCall className="w-4 h-4 text-[#6D57A5] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#6D57A5] transition-colors">IP Telephony & VoIP</h5>
                  <p className="text-[10px] text-[#625D6B]">PBX & Voice Traffic</p>
                </div>
              </Link>

              <Link
                to="/services/cybersecurity"
                onClick={() => setActiveMenu(null)}
                className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAF8FC] transition-all group"
              >
                <ShieldCheck className="w-4 h-4 text-[#6D57A5] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#6D57A5] transition-colors">Cybersecurity</h5>
                  <p className="text-[10px] text-[#625D6B]">24/7 SOC & Protection</p>
                </div>
              </Link>

              <Link
                to="/services/enterprise-email"
                onClick={() => setActiveMenu(null)}
                className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAF8FC] transition-all group"
              >
                <Mail className="w-4 h-4 text-[#6D57A5] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#6D57A5] transition-colors">Enterprise Email</h5>
                  <p className="text-[10px] text-[#625D6B]">Corporate Email Hosting</p>
                </div>
              </Link>

              <Link
                to="/services/managed-it-support"
                onClick={() => setActiveMenu(null)}
                className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAF8FC] transition-all group"
              >
                <Server className="w-4 h-4 text-[#6D57A5] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#6D57A5] transition-colors">Managed IT Support</h5>
                  <p className="text-[10px] text-[#625D6B]">Cloud & Helpdesk</p>
                </div>
              </Link>
            </div>

            <div className="mt-3 pt-3 border-t border-[#E9E4F1] flex items-center justify-between text-xs bg-[#FAF8FC] p-2.5 rounded-xl border border-[#E9E4F1]">
              <span className="text-[11px] text-[#625D6B]">Enterprise technology & IT infrastructure</span>
              <Link
                to="/services"
                onClick={() => setActiveMenu(null)}
                className="text-[11px] font-bold text-[#17B681] hover:text-[#129267] flex items-center gap-1"
              >
                <span>Services Overview</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Why Us / About Link */}
      <Link
        to="/about"
        className="px-3 py-1.5 text-xs font-medium text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-[#FAF8FC] rounded-xl transition-all"
      >
        Why Us
      </Link>

      {/* Contact Link */}
      <Link
        to="/contact"
        className="px-3 py-1.5 text-xs font-medium text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-[#FAF8FC] rounded-xl transition-all"
      >
        Contact
      </Link>
    </div>
  );
};

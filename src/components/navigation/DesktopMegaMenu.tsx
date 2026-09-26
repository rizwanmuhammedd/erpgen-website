import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FileText,
  ShoppingBag,
  Utensils,
  Scissors,
  ShoppingCart,
  Shirt,
  ChevronDown,
  Layers,
  ArrowRight,
  Package,
  Sliders,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useLanguage } from '../../context/LanguageContext';

export const DesktopMegaMenu: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<'products' | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const { t, isRtl } = useLanguage();

  const isHome = location.pathname === '/';
  const isProducts = location.pathname.startsWith('/products');
  const isAbout = location.pathname === '/about';
  const isContact = location.pathname === '/contact';

  const handleMouseEnter = (menu: 'products') => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const closeMenuImmediately = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(null);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-1">
      {/* Home Link with Active Indicator */}
      <Link
        to="/"
        className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all relative ${
          isHome
            ? 'text-[#6D57A5] bg-white shadow-xs font-bold'
            : 'text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-white'
        }`}
      >
        <span>{t('nav.home')}</span>
        {isHome && (
          <span className="absolute bottom-0.5 inset-x-2.5 h-0.5 bg-[#6D57A5] rounded-full" />
        )}
      </Link>

      {/* Products Mega-Menu Trigger */}
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter('products')}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to="/products"
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1 relative ${
            isProducts || activeMenu === 'products'
              ? 'text-[#6D57A5] bg-white shadow-xs font-bold'
              : 'text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-white'
          }`}
        >
          <span>{t('nav.products')}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              activeMenu === 'products' ? 'rotate-180 text-[#6D57A5]' : 'text-[#625D6B]'
            }`}
          />
          {isProducts && activeMenu !== 'products' && (
            <span className="absolute bottom-0.5 inset-x-2.5 h-0.5 bg-[#6D57A5] rounded-full" />
          )}
        </Link>

        {/* Products Mega Menu Dropdown with Smooth Scale & Opacity Reveal */}
        {activeMenu === 'products' && (
          <div
            onMouseEnter={() => handleMouseEnter('products')}
            onMouseLeave={handleMouseLeave}
            className={`absolute top-full pt-2 w-[540px] z-50 animate-in fade-in zoom-in-95 duration-200 origin-top ${
              isRtl ? 'right-0' : 'left-0'
            }`}
          >
            <div className="p-4 bg-white/95 backdrop-blur-2xl border border-[#E9E4F1] rounded-2xl shadow-2xl shadow-[#6D57A5]/10">
              <div className="grid grid-cols-2 gap-4">
                {/* Core Products & Tiers Column */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E9E4F1]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold">
                      {t('nav.coreModules')}
                    </span>
                    <Badge variant="brand" size="sm" className="text-[8px] py-0 px-1">
                      {t('nav.confirmed')}
                    </Badge>
                  </div>

                  <a
                    href="/#erp-tiers"
                    onClick={closeMenuImmediately}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAF8FC] hover:shadow-2xs transition-all group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center shrink-0 group-hover:bg-[#6D57A5] group-hover:text-white group-hover:scale-110 transition-all">
                      <Package className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#6D57A5] transition-colors">
                        {t('nav.erpLite')}
                      </h5>
                      <p className="text-[10px] text-[#625D6B]">Standard ready offering</p>
                    </div>
                  </a>

                  <a
                    href="/#erp-tiers"
                    onClick={closeMenuImmediately}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAF8FC] hover:shadow-2xs transition-all group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 text-[#17B681] flex items-center justify-center shrink-0 group-hover:bg-[#17B681] group-hover:text-white group-hover:scale-110 transition-all">
                      <Sliders className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#17B681] transition-colors">
                        {t('nav.erpPro')}
                      </h5>
                      <p className="text-[10px] text-[#625D6B]">Custom tailored ERP</p>
                    </div>
                  </a>

                  <Link
                    to="/products/invoice"
                    onClick={closeMenuImmediately}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAF8FC] hover:shadow-2xs transition-all group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center shrink-0 group-hover:bg-[#6D57A5] group-hover:text-white group-hover:scale-110 transition-all">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#6D57A5] transition-colors">
                        {t('nav.invoice')}
                      </h5>
                      <p className="text-[10px] text-[#625D6B]">Billing & PDF Invoices</p>
                    </div>
                  </Link>

                  <Link
                    to="/products/pos"
                    onClick={closeMenuImmediately}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAF8FC] hover:shadow-2xs transition-all group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#E4F8F0] border border-[#17B681]/30 text-[#17B681] flex items-center justify-center shrink-0 group-hover:bg-[#17B681] group-hover:text-white group-hover:scale-110 transition-all">
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#1F1B2D] group-hover:text-[#17B681] transition-colors">
                        {t('nav.pos')}
                      </h5>
                      <p className="text-[10px] text-[#625D6B]">High-Speed Counter POS</p>
                    </div>
                  </Link>
                </div>

                {/* POS Industry Solutions Column */}
                <div className="space-y-2">
                  <div className="pb-2 border-b border-[#E9E4F1]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#625D6B] font-bold">
                      {t('nav.posWorkflows')}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <Link
                      to="/products/pos/restaurant"
                      onClick={closeMenuImmediately}
                      className="flex items-center gap-2 p-1.5 rounded-lg text-xs text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-[#FAF8FC] transition-all group"
                    >
                      <Utensils className="w-3.5 h-3.5 text-[#6D57A5] shrink-0 group-hover:scale-115 transition-transform" />
                      <span>{t('nav.restaurantPos')}</span>
                    </Link>

                    <Link
                      to="/products/pos/barbershop"
                      onClick={closeMenuImmediately}
                      className="flex items-center gap-2 p-1.5 rounded-lg text-xs text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-[#FAF8FC] transition-all group"
                    >
                      <Scissors className="w-3.5 h-3.5 text-[#6D57A5] shrink-0 group-hover:scale-115 transition-transform" />
                      <span>{t('nav.barbershopPos')}</span>
                    </Link>

                    <Link
                      to="/products/pos/supermarket"
                      onClick={closeMenuImmediately}
                      className="flex items-center gap-2 p-1.5 rounded-lg text-xs text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-[#FAF8FC] transition-all group"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 text-[#6D57A5] shrink-0 group-hover:scale-115 transition-transform" />
                      <span>{t('nav.supermarketPos')}</span>
                    </Link>

                    <Link
                      to="/products/pos/laundry"
                      onClick={closeMenuImmediately}
                      className="flex items-center gap-2 p-1.5 rounded-lg text-xs text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-[#FAF8FC] transition-all group"
                    >
                      <Shirt className="w-3.5 h-3.5 text-[#6D57A5] shrink-0 group-hover:scale-115 transition-transform" />
                      <span>{t('nav.laundryPos')}</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Mega-Menu Callout */}
              <div className="mt-3 pt-3 border-t border-[#E9E4F1] flex items-center justify-between text-xs bg-[#FAF8FC] p-2.5 rounded-xl border border-[#E9E4F1]">
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#17B681] shrink-0" />
                  <span className="text-[11px] text-[#625D6B]">{t('nav.combos')}</span>
                </div>
                <Link
                  to="/products"
                  onClick={closeMenuImmediately}
                  className="text-[11px] font-bold text-[#6D57A5] hover:text-[#584488] flex items-center gap-1 group"
                >
                  <span>{t('nav.viewAll')}</span>
                  <ArrowRight className={`w-3 h-3 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ERP Lite & Pro Link */}
      <a
        href="/#erp-tiers"
        className="px-3 py-1.5 text-xs font-semibold text-[#6D57A5] hover:bg-white rounded-xl transition-all flex items-center gap-1.5 group"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#17B681] group-hover:scale-125 transition-transform duration-200" />
        <span className="group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform duration-200">{t('nav.erpTiers')}</span>
      </a>

      {/* Core Platform Link */}
      <a
        href="/#core-modules"
        className="px-3 py-1.5 text-xs font-semibold text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-white rounded-xl transition-all"
      >
        {t('nav.coreErp')}
      </a>

      {/* Business Types Link */}
      <a
        href="/#business-types"
        className="px-3 py-1.5 text-xs font-semibold text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-white rounded-xl transition-all"
      >
        {t('nav.businessTypes')}
      </a>

      {/* Why ERPGen Link */}
      <a
        href="/#why-erpgen"
        className="px-3 py-1.5 text-xs font-semibold text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-white rounded-xl transition-all"
      >
        {t('nav.whyUs')}
      </a>

      {/* About Link */}
      <Link
        to="/about"
        className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all relative ${
          isAbout
            ? 'text-[#6D57A5] bg-white shadow-xs font-bold'
            : 'text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-white'
        }`}
      >
        <span>{t('nav.about')}</span>
        {isAbout && (
          <span className="absolute bottom-0.5 inset-x-2.5 h-0.5 bg-[#6D57A5] rounded-full" />
        )}
      </Link>

      {/* Contact Link */}
      <Link
        to="/contact"
        className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all relative ${
          isContact
            ? 'text-[#6D57A5] bg-white shadow-xs font-bold'
            : 'text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-white'
        }`}
      >
        <span>{t('nav.contact')}</span>
        {isContact && (
          <span className="absolute bottom-0.5 inset-x-2.5 h-0.5 bg-[#6D57A5] rounded-full" />
        )}
      </Link>
    </div>
  );
};

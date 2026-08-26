import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface AnimatedERPGenLogoProps {
  isMobileMenuOpen?: boolean;
  onNavigateHome?: () => void;
}

export const AnimatedERPGenLogo: React.FC<AnimatedERPGenLogoProps> = ({
  isMobileMenuOpen = false,
  onNavigateHome,
}) => {
  // Desktop logo toggle state (Blue <-> Normal on user click)
  const [isDesktopBlueLogo, setIsDesktopBlueLogo] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Preload logo assets to prevent image loading flicker
  useEffect(() => {
    const imgBlue = new Image();
    imgBlue.src = '/erpgen-logo-blue.png';
    const imgNormal = new Image();
    imgNormal.src = '/erpgen-logo.png';
  }, []);

  // Handle click interaction
  const handleLogoClick = () => {
    // 1. Toggle desktop logo state (blue -> normal -> blue -> normal...)
    setIsDesktopBlueLogo((prev) => !prev);

    // 2. If mobile callback provided (e.g. close mobile drawer if open)
    if (onNavigateHome) {
      onNavigateHome();
    }

    // 3. Handle smooth React Router navigation to homepage
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  // Mobile logo asset synchronization:
  // Closed mobile menu (false) -> shows Blue logo (/erpgen-logo-blue.png)
  // Open mobile menu (true) -> shows Normal logo (/erpgen-logo.png)
  const isMobileBlueLogo = !isMobileMenuOpen;

  return (
    <Link
      to="/"
      onClick={handleLogoClick}
      className="relative flex items-center justify-start focus-ring-purple rounded-lg p-1 transition-transform active:scale-95 shrink-0 group cursor-pointer min-w-[170px] sm:min-w-[195px] lg:min-w-[230px] h-10 sm:h-11 lg:h-12"
      aria-label="ERPGen — Smarter Business. Simpler ERP."
      title="ERPGen — Smarter Business. Simpler ERP."
    >
      {/* =========================================================================
          1. DESKTOP LOGO DISPLAY (visible on lg: and above)
          Controlled by desktop click toggle state: isDesktopBlueLogo
          ========================================================================= */}
      <div className="hidden lg:flex items-center relative w-full h-full">
        {/* Desktop Blue Logo Asset */}
        <img
          src="/erpgen-logo-blue.png"
          alt="ERPGen — Smarter Business. Simpler ERP."
          className={`h-10 sm:h-11 lg:h-12 w-auto max-w-[200px] sm:max-w-[230px] lg:max-w-[260px] object-contain transition-all duration-500 ease-in-out ${
            isDesktopBlueLogo
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none absolute left-0 top-0'
          }`}
        />

        {/* Desktop Normal Logo Asset */}
        <img
          src="/erpgen-logo.png"
          alt="ERPGen — Smarter Business. Simpler ERP."
          className={`h-10 sm:h-11 lg:h-12 w-auto max-w-[200px] sm:max-w-[230px] lg:max-w-[260px] object-contain transition-all duration-500 ease-in-out ${
            !isDesktopBlueLogo
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none absolute left-0 top-0'
          }`}
        />
      </div>

      {/* =========================================================================
          2. MOBILE LOGO DISPLAY (visible below lg:)
          Strictly synchronized with mobileMenuOpen state:
          - isMobileMenuOpen === false -> isMobileBlueLogo === true -> Blue Logo
          - isMobileMenuOpen === true -> isMobileBlueLogo === false -> Normal Logo
          ========================================================================= */}
      <div className="flex lg:hidden items-center relative w-full h-full">
        {/* Mobile Blue Logo Asset */}
        <img
          src="/erpgen-logo-blue.png"
          alt="ERPGen — Smarter Business. Simpler ERP."
          className={`h-10 sm:h-11 w-auto max-w-[185px] sm:max-w-[210px] object-contain transition-all duration-300 ease-in-out ${
            isMobileBlueLogo
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none absolute left-0 top-0'
          }`}
        />

        {/* Mobile Normal Logo Asset */}
        <img
          src="/erpgen-logo.png"
          alt="ERPGen — Smarter Business. Simpler ERP."
          className={`h-10 sm:h-11 w-auto max-w-[185px] sm:max-w-[210px] object-contain transition-all duration-300 ease-in-out ${
            !isMobileBlueLogo
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none absolute left-0 top-0'
          }`}
        />
      </div>
    </Link>
  );
};

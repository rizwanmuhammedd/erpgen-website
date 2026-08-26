import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface AnimatedERPGenLogoProps {
  onNavigateHome?: () => void;
}

export const AnimatedERPGenLogo: React.FC<AnimatedERPGenLogoProps> = ({
  onNavigateHome,
}) => {
  // Desktop logo toggle state: Starts with Blue Logo (true = /erpgen-logo-blue.png, false = /erpgen-logo.png)
  const [isDesktopBlueLogo, setIsDesktopBlueLogo] = useState(true);

  // Mobile logo toggle state: Starts with Normal Logo (false = /erpgen-logo.png, true = /erpgen-logo-blue.png)
  const [isMobileBlueLogo, setIsMobileBlueLogo] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Preload logo assets to prevent image loading flicker
  useEffect(() => {
    const imgBlue = new Image();
    imgBlue.src = '/erpgen-logo-blue.png';
    const imgNormal = new Image();
    imgNormal.src = '/erpgen-logo.png';
  }, []);

  // Handle click / tap interaction
  const handleLogoClick = () => {
    // 1. Toggle desktop logo state (Blue -> Normal -> Blue -> Normal...)
    setIsDesktopBlueLogo((prev) => !prev);

    // 2. Toggle mobile logo state (Normal -> Blue -> Normal -> Blue...)
    setIsMobileBlueLogo((prev) => !prev);

    // 3. If mobile callback provided (e.g. close mobile drawer if open)
    if (onNavigateHome) {
      onNavigateHome();
    }

    // 4. Handle smooth React Router navigation to homepage
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

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
          - Initial State on load: /erpgen-logo-blue.png
          - On click: toggles to /erpgen-logo.png, then back on next click
          ========================================================================= */}
      <div className="hidden lg:flex items-center relative w-full h-full">
        {/* Desktop Blue Logo Asset (Initial on desktop) */}
        <img
          src="/erpgen-logo-blue.png"
          alt="ERPGen — Smarter Business. Simpler ERP."
          className={`h-10 sm:h-11 lg:h-12 w-auto max-w-[200px] sm:max-w-[230px] lg:max-w-[260px] object-contain transition-all duration-500 ease-in-out ${
            isDesktopBlueLogo
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none absolute left-0 top-0'
          }`}
        />

        {/* Desktop Normal Logo Asset (Secondary on desktop) */}
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
          - Initial State on load: /erpgen-logo.png
          - On tap/click: toggles to /erpgen-logo-blue.png, then back on next tap
          ========================================================================= */}
      <div className="flex lg:hidden items-center relative w-full h-full">
        {/* Mobile Normal Logo Asset (Initial on mobile) */}
        <img
          src="/erpgen-logo.png"
          alt="ERPGen — Smarter Business. Simpler ERP."
          className={`h-10 sm:h-11 w-auto max-w-[185px] sm:max-w-[210px] object-contain transition-all duration-300 ease-in-out ${
            !isMobileBlueLogo
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none absolute left-0 top-0'
          }`}
        />

        {/* Mobile Blue Logo Asset (Secondary on mobile) */}
        <img
          src="/erpgen-logo-blue.png"
          alt="ERPGen — Smarter Business. Simpler ERP."
          className={`h-10 sm:h-11 w-auto max-w-[185px] sm:max-w-[210px] object-contain transition-all duration-300 ease-in-out ${
            isMobileBlueLogo
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none absolute left-0 top-0'
          }`}
        />
      </div>
    </Link>
  );
};

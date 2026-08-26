import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const AnimatedERPGenLogo: React.FC = () => {
  // isBlueLogo state controls which logo asset is active:
  // true = /erpgen-logo-blue.png (Initial state on load)
  // false = /erpgen-logo.png
  // Toggles continuously on EVERY user click (Blue <-> Normal)
  const [isBlueLogo, setIsBlueLogo] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Preload logo assets to prevent image loading flicker
  useEffect(() => {
    const imgBlue = new Image();
    imgBlue.src = '/erpgen-logo-blue.png';
    const imgNormal = new Image();
    imgNormal.src = '/erpgen-logo.png';
  }, []);

  // Handle click interaction: Toggle between Blue and Normal logo indefinitely
  const handleLogoClick = () => {
    // 1. Toggle logo state permanently on each click (blue -> normal -> blue -> normal...)
    setIsBlueLogo((prev) => !prev);

    // 2. Handle smooth React Router navigation to homepage
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
      aria-label="ERPGen — Smarter Business. Simpler ERP. Click to toggle logo state."
      title="ERPGen — Click to toggle branding"
    >
      {/* 1. Large Blue ERPGen Logo (/erpgen-logo-blue.png) — Active when isBlueLogo is TRUE */}
      <img
        src="/erpgen-logo-blue.png"
        alt="ERPGen — Smarter Business. Simpler ERP."
        className={`h-10 sm:h-11 lg:h-12 w-auto max-w-[200px] sm:max-w-[230px] lg:max-w-[260px] object-contain transition-all duration-500 ease-in-out ${
          isBlueLogo
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none absolute left-1 top-1'
        }`}
      />

      {/* 2. Large Normal ERPGen Logo (/erpgen-logo.png) — Active when isBlueLogo is FALSE */}
      <img
        src="/erpgen-logo.png"
        alt="ERPGen — Smarter Business. Simpler ERP."
        className={`h-10 sm:h-11 lg:h-12 w-auto max-w-[200px] sm:max-w-[230px] lg:max-w-[260px] object-contain transition-all duration-500 ease-in-out ${
          !isBlueLogo
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none absolute left-1 top-1'
        }`}
      />
    </Link>
  );
};

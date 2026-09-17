import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface AnimatedERPGenLogoProps {
  onNavigateHome?: () => void;
  className?: string;
}

export const AnimatedERPGenLogo: React.FC<AnimatedERPGenLogoProps> = ({
  onNavigateHome,
  className = '',
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigateHome) {
      onNavigateHome();
    }

    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <Link
      to="/"
      onClick={handleLogoClick}
      className={`relative inline-flex items-center focus-ring-purple rounded-lg transition-opacity duration-200 hover:opacity-90 active:scale-[0.98] shrink-0 select-none py-1 ${className}`}
      aria-label="ERPGen — Smarter Business. Simpler ERP."
      title="ERPGen — Smarter Business. Simpler ERP."
    >
      <img
        src="/erpgen-logo-blue.png"
        alt="ERPGen — Smarter Business. Simpler ERP."
        draggable={false}
        className="h-8 sm:h-9 w-auto object-contain select-none"
      />
    </Link>
  );
};


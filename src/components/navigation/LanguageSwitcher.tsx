import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'navbar' | 'compact' | 'footer';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'navbar',
}) => {
  const { language, setLanguage, isRtl } = useLanguage();

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E9E4F1] bg-[#FAF8FC] hover:bg-white text-xs font-semibold text-[#1F1B2D] hover:text-[#6D57A5] transition-all cursor-pointer ${className}`}
        aria-label={isRtl ? 'Switch to English' : 'التحويل إلى العربية'}
      >
        <Globe className="w-3.5 h-3.5 text-[#6D57A5]" />
        <span>{language === 'en' ? 'العربية' : 'English'}</span>
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center p-1 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-xs font-medium ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-lg transition-all text-xs font-semibold cursor-pointer ${
          language === 'en'
            ? 'bg-white text-[#6D57A5] shadow-xs border border-[#E9E4F1]/60'
            : 'text-[#625D6B] hover:text-[#1F1B2D]'
        }`}
        aria-pressed={language === 'en'}
      >
        English
      </button>

      <span className="text-[#E9E4F1] mx-0.5 select-none" aria-hidden="true">|</span>

      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={`px-2.5 py-1 rounded-lg transition-all text-xs font-semibold font-arabic cursor-pointer ${
          language === 'ar'
            ? 'bg-white text-[#6D57A5] shadow-xs border border-[#E9E4F1]/60'
            : 'text-[#625D6B] hover:text-[#1F1B2D]'
        }`}
        aria-pressed={language === 'ar'}
      >
        العربية
      </button>
    </div>
  );
};

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { en } from '../locales/en';
import { ar } from '../locales/ar';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRtl: boolean;
  t: (key: string, fallback?: string) => string;
}

const STORAGE_KEY = 'erpgen_language';

const translations: Record<Language, Record<string, string>> = {
  en,
  ar,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'ar' || stored === 'en') {
        return stored;
      }
    }
    return 'en';
  });

  const isRtl = language === 'ar';

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', lang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  }, [language, setLanguage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', language);
    }
  }, [isRtl, language]);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const currentDict = translations[language] || translations.en;
      if (currentDict && key in currentDict) {
        return currentDict[key];
      }
      // Fallback to English dictionary
      if (translations.en && key in translations.en) {
        return translations.en[key];
      }
      return fallback || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isRtl,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = '/erpgen-logo.png',
}) => {
  const { t } = useLanguage();
  const location = useLocation();
  const effectiveTitle = title || t('seo.defaultTitle');
  const effectiveDescription = description || t('seo.defaultDesc');

  useEffect(() => {
    // 1. Update Document Title
    document.title = effectiveTitle;

    // 2. Helper function to set/update meta tag
    const setMetaTag = (nameAttr: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Update Standard & OpenGraph & Twitter Meta Tags
    setMetaTag('name', 'description', effectiveDescription);
    setMetaTag('property', 'og:title', effectiveTitle);
    setMetaTag('property', 'og:description', effectiveDescription);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', window.location.href);
    setMetaTag('name', 'twitter:title', effectiveTitle);
    setMetaTag('name', 'twitter:description', effectiveDescription);
    setMetaTag('name', 'twitter:image', image);

    // 4. Update Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
  }, [effectiveTitle, effectiveDescription, image, location.pathname]);

  return null;
};

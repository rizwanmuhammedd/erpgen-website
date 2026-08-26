export const SITE_DATA = {
  name: 'ERPGen',
  tagline: 'Smarter Business. Simpler ERP.',
  headline: 'ERP that fits the way you work.',
  subheadline: 'Choose standalone Invoice, high-speed POS, or configure a combined solution around your exact business requirements.',
  contact: {
    phone: '+966 563656543',
    phoneFormatted: '+966 563656543',
    phoneTel: 'tel:+966563656543',
    email: 'info@erpgen.com',
    supportEmail: 'support@erpgen.com',
    whatsappNumber: '966563656543',
    whatsappDefaultMessage: 'Hello ERPGen team, I would like to know more about your products and services.',
    whatsappUrl: 'https://wa.me/966563656543?text=Hello%20ERPGen%20team%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products%20and%20services.',
  },
  brandColors: {
    primaryPurple: '#6D57A5',
    darkPurple: '#584488',
    lightPurple: '#8E78CA',
    accentGreen: '#17B681',
    darkGreen: '#129267',
    surface: '#FFFFFF',
    surfaceElevated: '#FAF8FC',
    textPrimary: '#1F1B2D',
    textSecondary: '#625D6B',
    border: '#E9E4F1',
  },
};

/**
 * Generates a direct WhatsApp link with an optional pre-filled message.
 */
export const getWhatsAppUrl = (customMessage?: string): string => {
  const text = customMessage || SITE_DATA.contact.whatsappDefaultMessage;
  return `https://wa.me/${SITE_DATA.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
};


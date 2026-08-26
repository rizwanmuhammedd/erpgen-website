import React from 'react';
import { ServicePageLayout } from '../../components/services/ServicePageLayout';
import { ERPGEN_SERVICES } from '../../data/serviceData';

export const CybersecurityPage: React.FC = () => {
  const service = ERPGEN_SERVICES.find((s) => s.slug === 'cybersecurity') || ERPGEN_SERVICES[3];
  return <ServicePageLayout service={service} />;
};

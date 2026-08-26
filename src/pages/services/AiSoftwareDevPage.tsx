import React from 'react';
import { ServicePageLayout } from '../../components/services/ServicePageLayout';
import { ERPGEN_SERVICES } from '../../data/serviceData';

export const AiSoftwareDevPage: React.FC = () => {
  const service = ERPGEN_SERVICES.find((s) => s.slug === 'ai-software-development') || ERPGEN_SERVICES[0];
  return <ServicePageLayout service={service} />;
};

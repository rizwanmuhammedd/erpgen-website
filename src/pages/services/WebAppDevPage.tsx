import React from 'react';
import { ServicePageLayout } from '../../components/services/ServicePageLayout';
import { ERPGEN_SERVICES } from '../../data/serviceData';

export const WebAppDevPage: React.FC = () => {
  const service = ERPGEN_SERVICES.find((s) => s.slug === 'web-app-development') || ERPGEN_SERVICES[1];
  return <ServicePageLayout service={service} />;
};

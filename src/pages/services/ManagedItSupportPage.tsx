import React from 'react';
import { ServicePageLayout } from '../../components/services/ServicePageLayout';
import { ERPGEN_SERVICES } from '../../data/serviceData';

export const ManagedItSupportPage: React.FC = () => {
  const service = ERPGEN_SERVICES.find((s) => s.slug === 'managed-it-support') || ERPGEN_SERVICES[5];
  return <ServicePageLayout service={service} />;
};

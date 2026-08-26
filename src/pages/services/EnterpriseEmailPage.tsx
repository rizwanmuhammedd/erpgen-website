import React from 'react';
import { ServicePageLayout } from '../../components/services/ServicePageLayout';
import { ERPGEN_SERVICES } from '../../data/serviceData';

export const EnterpriseEmailPage: React.FC = () => {
  const service = ERPGEN_SERVICES.find((s) => s.slug === 'enterprise-email') || ERPGEN_SERVICES[4];
  return <ServicePageLayout service={service} />;
};

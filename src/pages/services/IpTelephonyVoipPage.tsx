import React from 'react';
import { ServicePageLayout } from '../../components/services/ServicePageLayout';
import { ERPGEN_SERVICES } from '../../data/serviceData';

export const IpTelephonyVoipPage: React.FC = () => {
  const service = ERPGEN_SERVICES.find((s) => s.slug === 'ip-telephony-voip') || ERPGEN_SERVICES[2];
  return <ServicePageLayout service={service} />;
};

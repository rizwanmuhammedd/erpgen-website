import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { getWhatsAppUrl } from '../../data/siteData';
import { useLanguage } from '../../context/LanguageContext';

export const CustomConfiguration: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div id="custom-config" className="scroll-mt-28">
      <Card variant="default" className="relative overflow-hidden bg-[#FAF8FC] border border-[#E9E4F1] hover:border-[#6D57A5]/40 shadow-xs transition-colors group p-6 sm:p-8 lg:p-10">
        {/* Glow Element */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#6D57A5]/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] font-mono text-[#6D57A5] font-bold uppercase tracking-wider block">
              {t('customConfig.eyebrow')}
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading tracking-tight">
              {t('customConfig.title')}
            </h3>

            <p className="text-sm sm:text-base text-[#625D6B] font-normal leading-relaxed">
              {t('customConfig.desc')}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a href={getWhatsAppUrl("Hello ERPGen team, I would like to discuss custom ERP configuration for my business.")} target="_blank" rel="noopener noreferrer">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
                className="w-full sm:w-auto shadow-md shadow-[#6D57A5]/20"
              >
                {t('customConfig.whatsApp')}
              </Button>
            </a>
            <a href="#contact">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {t('customConfig.sendInquiry')}
              </Button>
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

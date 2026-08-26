import React from 'react';
import { Sliders, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { getWhatsAppUrl } from '../../data/siteData';

export const CustomConfiguration: React.FC = () => {
  return (
    <div id="custom-config" className="scroll-mt-28">
      <Card variant="default" className="relative overflow-hidden bg-white border border-[#E9E4F1] hover:border-[#6D57A5]/40 shadow-sm transition-colors group">
        {/* Glow Element */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#6D57A5]/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="brand" size="sm" icon={<Sliders className="w-3.5 h-3.5 text-[#17B681]" />}>
                Custom Architecture
              </Badge>
              <span className="text-xs text-[#625D6B] font-medium">Customer-Specific ERP Config</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F1B2D] font-heading tracking-tight">
              Need something more specific?
            </h3>

            <p className="text-sm sm:text-base text-[#625D6B] font-normal leading-relaxed">
              ERPGen can be configured around your business requirements, with the modules and setup that fit your needs. Talk to our team for a tailored deployment plan.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a href={getWhatsAppUrl("Hello ERPGen team, I would like to discuss custom ERP configuration for my business.")} target="_blank" rel="noopener noreferrer">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-md shadow-[#6D57A5]/20"
              >
                Discuss on WhatsApp
              </Button>
            </a>
            <a href="#contact">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Send Inquiry
              </Button>
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

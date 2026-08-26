import React from 'react';
import {
  CreditCard,
  RotateCcw,
  Package,
  AlertTriangle,
  Users,
  History,
  BarChart3,
  Check,
} from 'lucide-react';
import { Card } from '../ui/Card';

interface PosFeatureCardProps {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const PosFeatureCard: React.FC<PosFeatureCardProps> = ({
  id,
  name,
  description,
  isSelected,
  onSelect,
}) => {
  const getIcon = () => {
    switch (id) {
      case 'pos-billing':
        return <CreditCard className="w-5 h-5" />;
      case 'returns':
        return <RotateCcw className="w-5 h-5" />;
      case 'inventory':
        return <Package className="w-5 h-5" />;
      case 'damaged-products':
        return <AlertTriangle className="w-5 h-5" />;
      case 'customers':
        return <Users className="w-5 h-5" />;
      case 'sales-history':
        return <History className="w-5 h-5" />;
      case 'reports':
        return <BarChart3 className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  return (
    <Card
      variant={isSelected ? 'brand-border' : 'default'}
      onClick={onSelect}
      className={`cursor-pointer transition-all duration-300 relative group p-4 sm:p-5 select-none ${
        isSelected
          ? 'bg-white ring-2 ring-[#6D57A5] shadow-md border-[#6D57A5]/30 -translate-y-1'
          : 'bg-white hover:border-[#6D57A5]/40 hover:shadow-md hover:-translate-y-0.5 border-[#E9E4F1]'
      }`}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`View ${name} feature details`}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isSelected
                ? 'bg-[#6D57A5] text-white shadow-md shadow-[#6D57A5]/20'
                : 'bg-[#FAF8FC] text-[#6D57A5] border border-[#E9E4F1] group-hover:border-[#6D57A5]/30'
            }`}
          >
            {getIcon()}
          </div>

          <h3 className="text-base font-bold text-[#1F1B2D] font-heading group-hover:text-[#6D57A5] transition-colors">
            {name}
          </h3>
        </div>

        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 transition-all ${
            isSelected
              ? 'bg-[#17B681] border-[#17B681] text-white font-bold'
              : 'border-[#E9E4F1] text-transparent opacity-0 group-hover:opacity-40'
          }`}
        >
          <Check className="w-3 h-3 stroke-[3]" />
        </div>
      </div>

      <p className="text-xs text-[#625D6B] leading-relaxed font-normal mt-2.5">
        {description}
      </p>
    </Card>
  );
};

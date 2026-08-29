import React from 'react';
import { Utensils, Scissors, ShoppingCart, Shirt, Check } from 'lucide-react';
import type { PosBusinessType } from '../../types';
import { Card } from '../ui/Card';

interface BusinessTypeCardProps {
  id: PosBusinessType;
  title: string;
  subtitle: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const BusinessTypeCard: React.FC<BusinessTypeCardProps> = ({
  id,
  title,
  subtitle,
  isSelected,
  onSelect,
}) => {
  const renderIcon = () => {
    switch (id) {
      case 'restaurant':
        return <Utensils className="w-5 h-5" />;
      case 'barbershop':
        return <Scissors className="w-5 h-5" />;
      case 'supermarket':
        return <ShoppingCart className="w-5 h-5" />;
      case 'laundry':
        return <Shirt className="w-5 h-5" />;
    }
  };

  return (
    <Card
      variant={isSelected ? 'brand-border' : 'default'}
      onClick={onSelect}
      className={`cursor-pointer transition-all duration-300 relative group select-none p-5 sm:p-6 ${
        isSelected
          ? 'bg-white ring-2 ring-[#6D57A5] shadow-md -translate-y-1 border-[#6D57A5]/30'
          : 'bg-[#FAF8FC] hover:bg-white hover:border-[#6D57A5]/40 hover:shadow-md hover:-translate-y-0.5 border-[#E9E4F1]'
      }`}
      role="tab"
      aria-selected={isSelected}
      tabIndex={0}
      aria-label={`Select ${title} POS workflow`}
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
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isSelected
                ? 'bg-[#6D57A5] text-white shadow-md shadow-[#6D57A5]/20'
                : 'bg-[#FAF8FC] text-[#6D57A5] border border-[#E9E4F1] group-hover:border-[#6D57A5]/30'
            }`}
          >
            {renderIcon()}
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#1F1B2D] font-heading leading-tight group-hover:text-[#6D57A5] transition-colors">
              {title}
            </h3>
            <p className="text-xs font-semibold text-[#17B681] mt-0.5">{subtitle}</p>
          </div>
        </div>

        {/* Selected checkmark indicator */}
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

      <div className="mt-4 pt-3 border-t border-[#E9E4F1] flex items-center justify-between text-[11px] text-[#625D6B] font-medium">
        <span>{isSelected ? 'Active Workflow' : 'Click to preview'}</span>
        <span className="font-mono text-[10px] text-[#6D57A5] font-semibold uppercase">
          {isSelected ? 'Selected' : 'Pre-Configured'}
        </span>
      </div>
    </Card>
  );
};

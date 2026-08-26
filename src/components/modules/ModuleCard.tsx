import React from 'react';
import { Check, Plus } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface ModuleCardProps {
  id: 'invoice' | 'pos';
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onToggle: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  subtitle,
  description,
  icon,
  isSelected,
  onToggle,
}) => {
  return (
    <Card
      variant={isSelected ? 'brand-border' : 'default'}
      onClick={onToggle}
      className={`cursor-pointer transition-all duration-300 relative group flex flex-col justify-between select-none ${
        isSelected
          ? 'bg-white ring-2 ring-[#6D57A5] shadow-md border-[#6D57A5]/30'
          : 'bg-white hover:border-[#6D57A5]/40 hover:shadow-md border-[#E9E4F1]'
      }`}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Select ${title} module`}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <div className="space-y-4">
        {/* Header: Icon & Selection Indicator */}
        <div className="flex items-center justify-between">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isSelected
                ? 'bg-[#6D57A5] text-white shadow-md shadow-[#6D57A5]/20'
                : 'bg-[#FAF8FC] text-[#6D57A5] border border-[#E9E4F1] group-hover:border-[#6D57A5]/30'
            }`}
          >
            {icon}
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant={isSelected ? 'brand' : 'neutral'}
              size="sm"
              className="text-[10px]"
            >
              {isSelected ? 'Selected' : 'Click to add'}
            </Badge>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                isSelected
                  ? 'bg-[#17B681] border-[#17B681] text-white font-bold'
                  : 'border-[#E9E4F1] text-[#625D6B] group-hover:border-[#6D57A5]/40'
              }`}
            >
              {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-2xl font-bold text-[#1F1B2D] font-heading tracking-tight flex items-center gap-2">
            {title}
          </h3>
          <p className="text-xs font-semibold text-[#17B681] mt-0.5">{subtitle}</p>
        </div>

        <p className="text-sm text-[#625D6B] leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {/* Footer Visual Status */}
      <div className="mt-6 pt-4 border-t border-[#E9E4F1] flex items-center justify-between text-xs font-medium">
        <span className={isSelected ? 'text-[#6D57A5] font-semibold' : 'text-[#625D6B]'}>
          {isSelected ? 'Active in your configuration' : 'Available as standalone'}
        </span>
        <span className="text-[11px] font-mono tracking-wider uppercase text-[#17B681] font-bold">
          Module
        </span>
      </div>
    </Card>
  );
};

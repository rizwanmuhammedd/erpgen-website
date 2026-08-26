import React from 'react';
import { FileText, ShoppingBag, ArrowRightLeft, Layers, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface ModuleConfiguratorProps {
  invoiceSelected: boolean;
  posSelected: boolean;
  onToggleInvoice: () => void;
  onTogglePos: () => void;
}

export const ModuleConfigurator: React.FC<ModuleConfiguratorProps> = ({
  invoiceSelected,
  posSelected,
  onToggleInvoice,
  onTogglePos,
}) => {
  const isBoth = invoiceSelected && posSelected;
  const isNone = !invoiceSelected && !posSelected;

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E9E4F1] shadow-sm relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#6D57A5]/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="space-y-8 relative z-10">
        {/* Configurator Header Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E4F1]">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-semibold">
              Interactive System Preview
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-[#1F1B2D] font-heading mt-1">
              Your Configured ERP Setup
            </h4>
          </div>

          {/* Module Selector Buttons */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1]">
            <button
              type="button"
              onClick={onToggleInvoice}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus-ring-purple ${
                invoiceSelected
                  ? 'bg-[#6D57A5] text-white shadow-md shadow-[#6D57A5]/20'
                  : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-white'
              }`}
              aria-pressed={invoiceSelected}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Invoice</span>
            </button>

            <button
              type="button"
              onClick={onTogglePos}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus-ring-purple ${
                posSelected
                  ? 'bg-[#6D57A5] text-white shadow-md shadow-[#6D57A5]/20'
                  : 'text-[#625D6B] hover:text-[#1F1B2D] hover:bg-white'
              }`}
              aria-pressed={posSelected}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>POS</span>
            </button>
          </div>
        </div>

        {/* Dynamic Connected Node Diagram */}
        <div className="py-4">
          {isNone ? (
            <div className="text-center py-10 px-4 bg-[#FAF8FC] rounded-2xl border border-dashed border-[#E9E4F1] text-[#625D6B] space-y-3">
              <ShieldAlert className="w-8 h-8 text-[#6D57A5] mx-auto" />
              <p className="text-sm font-medium text-[#1F1B2D]">Select at least one module above to preview your configuration.</p>
              <p className="text-xs text-[#625D6B]">Click on Invoice or POS to see how your solution is structured.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
              {/* Invoice Node */}
              <div
                className={`md:col-span-4 p-5 rounded-2xl transition-all duration-300 border ${
                  invoiceSelected
                    ? 'bg-white border-[#6D57A5]/40 shadow-md shadow-[#6D57A5]/5'
                    : 'bg-[#FAF8FC]/60 border-[#E9E4F1] opacity-50 grayscale'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-[#1F1B2D] font-heading">Invoice System</h5>
                    <span className="text-[11px] text-[#17B681] font-semibold">Billing & PDF Invoices</span>
                  </div>
                </div>
              </div>

              {/* Connector Node */}
              <div className="md:col-span-3 flex flex-col items-center justify-center py-2 text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isBoth
                      ? 'bg-[#17B681] text-white border-[#17B681] shadow-md shadow-[#17B681]/30 animate-pulse'
                      : 'bg-[#FAF8FC] text-[#625D6B] border-[#E9E4F1]'
                  }`}
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-[#625D6B] mt-2">
                  {isBoth ? 'Connected System' : 'Standalone Setup'}
                </span>
              </div>

              {/* POS Node */}
              <div
                className={`md:col-span-4 p-5 rounded-2xl transition-all duration-300 border ${
                  posSelected
                    ? 'bg-white border-[#17B681]/40 shadow-md shadow-[#17B681]/5'
                    : 'bg-[#FAF8FC]/60 border-[#E9E4F1] opacity-50 grayscale'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E4F8F0] border border-[#17B681]/30 text-[#17B681] flex items-center justify-center font-bold">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-[#1F1B2D] font-heading">POS Counter</h5>
                    <span className="text-[11px] text-[#6D57A5] font-semibold">Store & Counter Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Configuration Summary Callout */}
        {!isNone && (
          <div className="pt-4 border-t border-[#E9E4F1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF8FC] p-4 rounded-xl border border-[#E9E4F1]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1F1B2D]">
                  {isBoth
                    ? 'Selected Plan: Combined Invoice + POS Suite'
                    : invoiceSelected
                    ? 'Selected Plan: Standalone Invoice System'
                    : 'Selected Plan: Standalone POS Counter System'}
                </p>
                <p className="text-[11px] text-[#625D6B]">
                  {isBoth
                    ? 'Both modules communicate seamlessly in one screen.'
                    : 'Focused deployment tailored exclusively for your current operation.'}
                </p>
              </div>
            </div>

            <Badge variant="brand" size="sm" icon={<Layers className="w-3 h-3" />}>
              Tailored Setup
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

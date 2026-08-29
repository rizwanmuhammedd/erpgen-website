import React from 'react';
import {
  CreditCard,
  RotateCcw,
  Package,
  AlertTriangle,
  Users,
  History,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '../ui/Badge';

interface PosDashboardPreviewProps {
  selectedFeatureId: string;
  onSelectFeature: (id: string) => void;
}

export const PosDashboardPreview: React.FC<PosDashboardPreviewProps> = ({
  selectedFeatureId,
  onSelectFeature,
}) => {
  const posNavItems = [
    { id: 'pos-billing', label: 'POS / Billing', icon: CreditCard },
    { id: 'returns', label: 'Returns', icon: RotateCcw },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'damaged-products', label: 'Damaged Products', icon: AlertTriangle },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'sales-history', label: 'Sales History', icon: History },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  const settingsNavItems = [
    { id: 'variants', label: 'Variants' },
    { id: 'warranties', label: 'Warranties' },
    { id: 'receipts', label: 'Receipts' },
    { id: 'products', label: 'Products' },
    { id: 'category', label: 'Category' },
    { id: 'pdf-custom', label: 'PDF Custom' },
    { id: 'points', label: 'Points' },
    { id: 'printer', label: 'Printer' },
  ];

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl border border-[#E9E4F1] shadow-xl overflow-hidden bg-white">
      {/* macOS Style Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#FAF8FC] border-b border-[#E9E4F1] text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#6D57A5]/40 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#17B681]/40 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#6D57A5]/20 inline-block" />
          </div>
          <span className="text-[#625D6B] font-mono text-[11px] ml-2 hidden sm:inline-block">
            ERPGen POS / Workspace
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="brand" size="sm" className="text-[10px]">
            Live Counter Session
          </Badge>
        </div>
      </div>

      {/* Main Application Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-3 bg-[#FAF8FC] border-r border-[#E9E4F1] p-4 space-y-6">
          {/* POS Area Grouping */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6D57A5] font-bold px-2 block mb-2">
              POS Modules
            </span>
            <div className="space-y-1">
              {posNavItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = selectedFeatureId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectFeature(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer focus-ring-purple ${
                      isActive
                        ? 'bg-[#6D57A5] text-white font-bold shadow-md shadow-[#6D57A5]/20'
                        : 'text-[#1F1B2D] hover:text-[#6D57A5] hover:bg-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#17B681]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Settings Area Grouping */}
          <div className="pt-3 border-t border-[#E9E4F1]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#625D6B] font-semibold px-2 block mb-2">
              Settings & Config
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-1">
              {settingsNavItems.map((item) => (
                <div
                  key={item.id}
                  className="px-3 py-1.5 rounded-lg text-[11px] text-[#625D6B] font-medium hover:text-[#6D57A5] hover:bg-white/80 transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-[#6D57A5]/40" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Main Dashboard / Targeted Context Viewport */}
        <div className="lg:col-span-9 p-4 sm:p-6 lg:p-8 bg-white flex flex-col justify-between text-[#1F1B2D]">
          {/* Top Bar Status */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E9E4F1] text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#1F1B2D] font-heading text-sm sm:text-base">
                {selectedFeatureId === 'pos-billing' && 'POS / Billing Checkout'}
                {selectedFeatureId === 'returns' && 'Returns & Refunds Workspace'}
                {selectedFeatureId === 'inventory' && 'Connected Live Inventory'}
                {selectedFeatureId === 'damaged-products' && 'Damaged Products Register'}
                {selectedFeatureId === 'customers' && 'Customer Database'}
                {selectedFeatureId === 'sales-history' && 'Sales & Transaction History'}
                {selectedFeatureId === 'reports' && 'POS Analytics & Daily Summary'}
              </span>
            </div>
            <span className="text-[#625D6B] text-[11px] font-mono hidden sm:inline">Active Terminal</span>
          </div>

          {/* Confirmed Real POS Application Metric Cards (High-Level Summary) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
            <div className="p-3.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1]">
              <span className="text-[10px] text-[#625D6B] font-medium block uppercase tracking-wider">Today's Transactions</span>
              <span className="text-xl font-bold text-[#1F1B2D] font-heading mt-0.5 block">142 Processed</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1]">
              <span className="text-[10px] text-[#6D57A5] font-semibold block uppercase tracking-wider">Active Terminals</span>
              <span className="text-xl font-bold text-[#6D57A5] font-heading mt-0.5 block">4 Registers Synced</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#E4F8F0] border border-[#17B681]/30">
              <span className="text-[10px] text-[#129267] font-semibold block uppercase tracking-wider">Net Sales Revenue</span>
              <span className="text-xl font-bold text-[#17B681] font-heading mt-0.5 block">$4,280.50</span>
            </div>
          </div>

          {/* Dynamic Targeted View Based on Selected Feature */}
          <div key={selectedFeatureId} className="space-y-4 my-2 animate-in fade-in slide-in-from-bottom-1 duration-200">
            {/* 1. POS / BILLING VIEW */}
            {selectedFeatureId === 'pos-billing' && (
              <div className="p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#1F1B2D]">
                  <span>Current Transaction #REC-9842</span>
                  <Badge variant="brand" size="sm">Touch Billing</Badge>
                </div>
                <div className="space-y-1.5 text-xs text-[#625D6B]">
                  <div className="flex justify-between py-1 border-b border-[#E9E4F1]">
                    <span>Counter Billing Item #1</span>
                    <span className="font-mono text-[#17B681] font-semibold">$34.00</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Counter Billing Item #2</span>
                    <span className="font-mono text-[#17B681] font-semibold">$18.50</span>
                  </div>
                </div>
                <div className="pt-2 flex justify-between items-center text-xs border-t border-[#E9E4F1] text-[#1F1B2D] font-bold">
                  <span>Subtotal</span>
                  <span className="text-[#17B681] font-mono text-sm">$52.50</span>
                </div>
              </div>
            )}

            {/* 2. RETURNS VIEW */}
            {selectedFeatureId === 'returns' && (
              <div className="p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#1F1B2D]">
                  <span>Return Request #RET-104</span>
                  <Badge variant="neutral" size="sm">Inspection Passed</Badge>
                </div>
                <p className="text-xs text-[#625D6B]">Receipt #REC-9800 • Customer Refund Processed</p>
                <div className="flex justify-between text-xs pt-2 border-t border-[#E9E4F1] text-[#6D57A5] font-mono font-semibold">
                  <span>Refund Amount</span>
                  <span>-$24.00</span>
                </div>
              </div>
            )}

            {/* 3. INVENTORY VIEW */}
            {selectedFeatureId === 'inventory' && (
              <div className="p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#1F1B2D]">
                  <span>Live Stock Level Monitor</span>
                  <span className="text-[#17B681] text-[11px] font-semibold">Synced Across Counters</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-[#E9E4F1]">
                    <span className="text-[#625D6B] text-[10px] block">Active SKUs</span>
                    <span className="text-[#1F1B2D] font-bold text-sm">1,240 Items</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-[#E9E4F1]">
                    <span className="text-[#6D57A5] text-[10px] block font-medium">Low-Stock Alerts</span>
                    <span className="text-[#17B681] font-bold text-sm">4 Items Remaining</span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. DAMAGED PRODUCTS VIEW */}
            {selectedFeatureId === 'damaged-products' && (
              <div className="p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#1F1B2D]">
                  <span>Damaged & Expired Item Log</span>
                  <Badge variant="brand" size="sm">Audit Register</Badge>
                </div>
                <p className="text-xs text-[#625D6B]">Item #SKU-402 • 1 Unit Reported Damaged • Separated from Sales Stock</p>
              </div>
            )}

            {/* 5. CUSTOMERS VIEW */}
            {selectedFeatureId === 'customers' && (
              <div className="p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#1F1B2D]">
                  <span>Customer Profile #CUST-410</span>
                  <span className="text-[#17B681] font-mono text-[11px] font-semibold">150 Loyalty Points</span>
                </div>
                <p className="text-xs text-[#625D6B]">Order History: 12 Visits • Total Spent: $840.00</p>
              </div>
            )}

            {/* 6. SALES HISTORY VIEW */}
            {selectedFeatureId === 'sales-history' && (
              <div className="p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#1F1B2D]">
                  <span>Recent Transaction Audit Log</span>
                  <span className="text-[#625D6B] text-[11px]">Today 13:42 PM</span>
                </div>
                <div className="space-y-1 text-xs text-[#625D6B]">
                  <div className="flex justify-between py-1 border-b border-[#E9E4F1]">
                    <span>#REC-9841 • Cash Tender</span>
                    <span className="font-mono text-[#17B681] font-semibold">$45.00</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>#REC-9840 • Card Payment</span>
                    <span className="font-mono text-[#17B681] font-semibold">$128.50</span>
                  </div>
                </div>
              </div>
            )}

            {/* 7. REPORTS VIEW */}
            {selectedFeatureId === 'reports' && (
              <div className="p-4 rounded-xl bg-[#FAF8FC] border border-[#E9E4F1] space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#1F1B2D]">
                  <span>Receipt Summary & Daily Analytics</span>
                  <Badge variant="brand" size="sm">Daily Total</Badge>
                </div>
                <div className="w-full bg-[#E9E4F1] h-2.5 rounded-full overflow-hidden flex border border-[#E9E4F1]">
                  <div className="bg-[#17B681] h-full w-[97%]" title="Paid Receipts (97%)" />
                  <div className="bg-[#6D57A5] h-full w-[3%]" title="Cancelled Receipts (3%)" />
                </div>
                <div className="flex justify-between text-[11px] text-[#625D6B] font-medium">
                  <span className="text-[#17B681]">97% Paid Receipts</span>
                  <span className="text-[#6D57A5]">3% Cancelled/Void</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Callout */}
          <div className="pt-4 border-t border-[#E9E4F1] flex items-center justify-between text-xs text-[#625D6B]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681]" />
              <span>Real-time counter and back-office synchronization</span>
            </div>
            <span className="text-[11px] text-[#6D57A5] font-mono font-medium">ERPGen Core Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
};

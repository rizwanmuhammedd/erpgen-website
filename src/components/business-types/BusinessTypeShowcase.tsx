import React from 'react';
import {
  Utensils,
  Scissors,
  ShoppingCart,
  Shirt,
  CheckCircle2,
  Clock,
  UserCheck,
  Barcode,
} from 'lucide-react';
import type { PosBusinessType } from '../../types';
import { Badge } from '../ui/Badge';

interface BusinessTypeShowcaseProps {
  businessId: PosBusinessType;
}

export const BusinessTypeShowcase: React.FC<BusinessTypeShowcaseProps> = ({
  businessId,
}) => {
  return (
    <div className="w-full bg-[#FAF8FC] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E9E4F1] shadow-sm relative overflow-hidden transition-all duration-500">
      {/* Background Subtle Radial Light Spot */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6D57A5]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E4F1] relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#E9E4F1] text-[#6D57A5] flex items-center justify-center font-bold shadow-sm">
            {businessId === 'restaurant' && <Utensils className="w-5 h-5" />}
            {businessId === 'barbershop' && <Scissors className="w-5 h-5" />}
            {businessId === 'supermarket' && <ShoppingCart className="w-5 h-5" />}
            {businessId === 'laundry' && <Shirt className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6D57A5] font-semibold">
                Conceptual POS Workflow
              </span>
              <Badge variant="brand" size="sm" className="text-[9px] py-0 px-1.5">
                Active View
              </Badge>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-[#1F1B2D] font-heading mt-0.5">
              {businessId === 'restaurant' && 'Restaurant POS — Table Management & Dine-in'}
              {businessId === 'barbershop' && 'Barbershop POS — Appointments & Styling'}
              {businessId === 'supermarket' && 'Supermarket POS — Inventory & Fast Checkout'}
              {businessId === 'laundry' && 'Laundry POS — Order Tracking & Pickups'}
            </h4>
          </div>
        </div>

        <div className="text-xs text-[#625D6B] font-medium">
          Targeted Workflow Configuration
        </div>
      </div>

      {/* Interactive Conceptual POS Interface Showcase Area */}
      <div className="py-6 relative z-10">
        {/* 1. RESTAURANT POS WORKFLOW */}
        {businessId === 'restaurant' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#E9E4F1] shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1F1B2D] font-heading">Table 01 — Main Floor</span>
                  <span className="px-2 py-0.5 rounded bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30 text-[10px] font-semibold">
                    Occupied
                  </span>
                </div>
                <p className="text-xs text-[#625D6B]">4 Guests • Kitchen Dispatch Active</p>
                <div className="pt-2 flex items-center justify-between text-xs border-t border-[#E9E4F1] text-[#17B681] font-semibold">
                  <span>Bill Total</span>
                  <span>$142.50</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E9E4F1] shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1F1B2D] font-heading">Table 02 — Patio</span>
                  <span className="px-2 py-0.5 rounded bg-[#FAF8FC] text-[#6D57A5] border border-[#E9E4F1] text-[10px] font-semibold">
                    Billing Ready
                  </span>
                </div>
                <p className="text-xs text-[#625D6B]">2 Guests • Split Check Requested</p>
                <div className="pt-2 flex items-center justify-between text-xs border-t border-[#E9E4F1] text-[#1F1B2D] font-semibold">
                  <span>Bill Total</span>
                  <span>$68.00</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/70 border border-[#E9E4F1] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#625D6B] font-heading">Table 03 — Window</span>
                  <span className="px-2 py-0.5 rounded bg-[#FAF8FC] text-[#625D6B] border border-[#E9E4F1] text-[10px] font-semibold">
                    Available
                  </span>
                </div>
                <p className="text-xs text-[#625D6B]/70">Ready for walk-in seating</p>
                <div className="pt-2 flex items-center justify-between text-xs border-t border-[#E9E4F1] text-[#625D6B]">
                  <span>Status</span>
                  <span>Cleaned</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E9E4F1] shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <Badge variant="brand" size="sm">
                  Dine-in / Takeaway Switch
                </Badge>
                <span className="text-[#625D6B]">Kitchen Display Integration Ready</span>
              </div>
              <span className="text-[#17B681] font-mono font-semibold">Average Order Billing: &lt;30s</span>
            </div>
          </div>
        )}

        {/* 2. BARBERSHOP POS WORKFLOW */}
        {businessId === 'barbershop' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#E9E4F1] shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#17B681]" />
                    <span className="font-bold text-[#1F1B2D] font-heading">Stylist: Alex M.</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#FAF8FC] text-[#6D57A5] border border-[#E9E4F1] text-[10px] font-semibold">
                    In Service
                  </span>
                </div>
                <div className="text-xs space-y-1 text-[#1F1B2D] bg-[#FAF8FC] p-2.5 rounded-lg border border-[#E9E4F1]">
                  <div className="flex justify-between">
                    <span>Signature Haircut & Beard Trim</span>
                    <span className="text-[#17B681] font-semibold">$55.00</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#625D6B]">
                    <span>Styling Care Product</span>
                    <span>$22.00</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E9E4F1] shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#17B681]" />
                    <span className="font-bold text-[#1F1B2D] font-heading">Walk-in Queue (2 Waiting)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30 text-[10px] font-semibold">
                    Next Up: Sam K.
                  </span>
                </div>
                <div className="text-xs space-y-1.5 text-[#625D6B]">
                  <div className="flex items-center justify-between py-1 border-b border-[#E9E4F1]">
                    <span>14:30 Appointment — Marcus V.</span>
                    <span className="text-[#6D57A5] text-[11px] font-semibold">Confirmed</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>15:00 Walk-in — David L.</span>
                    <span className="text-[#625D6B] text-[11px]">In Queue</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E9E4F1] shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <Badge variant="brand" size="sm">
                  Service & Product Sales
                </Badge>
                <span className="text-[#625D6B]">Stylist Queue & Commission Tracker</span>
              </div>
              <span className="text-[#17B681] font-mono font-semibold">Counter Checkout: Instant</span>
            </div>
          </div>
        )}

        {/* 3. SUPERMARKET POS WORKFLOW */}
        {businessId === 'supermarket' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-4 rounded-xl bg-white border border-[#E9E4F1] shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E9E4F1]">
                <div className="flex items-center gap-2">
                  <Barcode className="w-4 h-4 text-[#17B681]" />
                  <span className="font-bold text-[#1F1B2D] font-heading">Rapid Barcode Scanner Active</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30 text-[10px] font-semibold">
                  Lane 04 • Scanning
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1.5 px-2.5 rounded bg-[#FAF8FC] border border-[#E9E4F1] text-[#1F1B2D]">
                  <span>[SKU-8842] Organic Dairy Milk 1L (x2)</span>
                  <span className="font-mono text-[#17B681] font-semibold">$8.40</span>
                </div>
                <div className="flex items-center justify-between py-1.5 px-2.5 rounded bg-[#FAF8FC] border border-[#E9E4F1] text-[#1F1B2D]">
                  <span>[SKU-9120] Whole Wheat Artisanal Bread</span>
                  <span className="font-mono text-[#17B681] font-semibold">$3.50</span>
                </div>
                <div className="flex items-center justify-between py-1.5 px-2.5 rounded bg-[#FAF8FC] border border-[#E9E4F1] text-[#1F1B2D]">
                  <span className="text-[#6D57A5] font-medium">[SKU-1044] Fresh Produce Item (x4) • Low Stock Alert (12 left)</span>
                  <span className="font-mono text-[#17B681] font-semibold">$5.00</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E9E4F1] shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <Badge variant="brand" size="sm">
                  Batch & Stock Sync
                </Badge>
                <span className="text-[#625D6B]">Multi-lane Cashier Thermal Printing</span>
              </div>
              <div className="text-[#17B681] font-bold text-sm">Total: $16.90</div>
            </div>
          </div>
        )}

        {/* 4. LAUNDRY POS WORKFLOW */}
        {businessId === 'laundry' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#E9E4F1] shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1F1B2D] font-heading">Ticket #LND-4892</span>
                  <span className="px-2 py-0.5 rounded bg-[#FAF8FC] text-[#6D57A5] border border-[#E9E4F1] text-[10px] font-semibold">
                    In Washing / Pressing
                  </span>
                </div>
                <div className="text-xs space-y-1.5 text-[#1F1B2D] bg-[#FAF8FC] p-2.5 rounded-lg border border-[#E9E4F1]">
                  <div className="flex justify-between">
                    <span>4x Shirts (Clean & Press)</span>
                    <span className="text-[#17B681] font-semibold">$24.00</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#625D6B]">
                    <span>1x Outer Garment (Care Tagged)</span>
                    <span>$18.00</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#625D6B]">
                  <span>Scheduled Pickup:</span>
                  <span className="text-[#1F1B2D] font-medium">Today 17:00 PM</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E9E4F1] shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1F1B2D] font-heading">Ticket #LND-4890</span>
                  <span className="px-2 py-0.5 rounded bg-[#E4F8F0] text-[#129267] border border-[#17B681]/30 text-[10px] font-semibold">
                    Ready for Pickup
                  </span>
                </div>
                <div className="text-xs space-y-1 text-[#625D6B]">
                  <p className="text-[#1F1B2D]">Customer: Sarah T. • Order Notification Active</p>
                  <p className="text-[11px] text-[#625D6B]">2 Items Tagged & Rack Assigned (#R-14)</p>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs border-t border-[#E9E4F1] text-[#17B681] font-semibold">
                  <span>Balance Due</span>
                  <span>$32.50</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E9E4F1] shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <Badge variant="brand" size="sm">
                  Garment Tagging System
                </Badge>
                <span className="text-[#625D6B]">Drop-off & Pickup Workflow</span>
              </div>
              <span className="text-[#17B681] font-mono font-semibold">Status Updates: Real-time</span>
            </div>
          </div>
        )}
      </div>

      {/* Conceptual Footer Note */}
      <div className="pt-4 border-t border-[#E9E4F1] flex items-center justify-between text-xs text-[#625D6B]">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#17B681]" />
          <span>Configurable interface elements adapted to actual operational needs</span>
        </div>
        <span className="text-[11px] text-[#6D57A5] font-medium hidden sm:inline">
          ERPGen Business Adaptation
        </span>
      </div>
    </div>
  );
};

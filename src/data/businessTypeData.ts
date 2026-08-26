import type { BusinessTypeSpec } from '../types';

export const BUSINESS_TYPE_SPECS: BusinessTypeSpec[] = [
  {
    id: 'restaurant',
    title: 'Restaurant',
    subtitle: 'Table management & dine-in orders',
    description: 'Effortlessly manage floor tables, kitchen order dispatch, split checks, and dine-in or takeaway counter operations.',
    iconName: 'Utensils',
    keyCapabilities: ['Table Layout & Floor Management', 'Dine-in & Takeaway Billing', 'Kitchen Order Dispatch', 'Split Payments']
  },
  {
    id: 'barbershop',
    title: 'Barbershop',
    subtitle: 'Appointments, walk-ins & styling',
    description: 'Track staff appointments, manage walk-in queues, bill hair styling services and product sales seamlessly.',
    iconName: 'Scissors',
    keyCapabilities: ['Appointment Scheduling', 'Stylist Queue Tracking', 'Walk-in Queue Billing', 'Service & Product Sales']
  },
  {
    id: 'supermarket',
    title: 'Supermarket',
    subtitle: 'Inventory & fast checkout',
    description: 'Process items rapidly with barcode scanning, instant stock updates, category variants, and multi-lane cashier performance.',
    iconName: 'ShoppingCart',
    keyCapabilities: ['Barcode & QR Rapid Scanning', 'Batch & Expiry Management', 'Multi-lane Cashier Sync', 'Low-stock Threshold Alerts']
  },
  {
    id: 'laundry',
    title: 'Laundry',
    subtitle: 'Order tracking & pickups',
    description: 'Tag clothing items, track garment status from drop-off to wash and press, and streamline customer pickups.',
    iconName: 'Shirt',
    keyCapabilities: ['Garment Tagging & Itemization', 'Drop-off & Pickup Workflow', 'Service Status Tracking', 'Customer Account Balances']
  }
];

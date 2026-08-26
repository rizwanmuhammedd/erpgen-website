import type { BusinessTypeSpec, PosFeature } from '../types';

export const SITE_METADATA = {
  companyName: 'ERPGen',
  tagline: 'Smarter Business. Simpler ERP.',
  headline: 'The Flexible ERP Platform Built Around Your Business',
  subheadline: 'Choose the exact modules you need today — from standalone Invoice or POS to custom enterprise combinations. Scale seamlessly as your business grows.',
  brandColor: '#6D57A5',
};

export const CONFIRMED_MODULES = [
  {
    id: 'invoice',
    name: 'ERPGen Invoice',
    tagline: 'Streamlined Invoicing & Cash Flow Management',
    description: 'Create professional invoices, manage customer billing, track payments, and customize PDF templates with effortless automated precision.',
    features: [
      'PDF Customization & Branding',
      'One-click Instant Invoicing',
      'Customer Billing Profiles',
      'Automated Sales History',
      'Warranties & Receipt Generator',
      'Custom Payment Terms'
    ]
  },
  {
    id: 'pos',
    name: 'ERPGen POS',
    tagline: 'Next-Generation Counter & Store Checkout System',
    description: 'Fast, touch-optimized point-of-sale built specifically for counters, restaurants, retail supermarkets, barbershops, and service stores.',
    features: [
      'Multi-industry POS / Billing',
      'Live Stock & Inventory Sync',
      'Product & Variant Management',
      'Customer Loyalty & Points',
      'Printer Settings & Receipt Templates',
      'Returns & Damaged Product Tracking'
    ]
  }
];

export const POS_BUSINESS_TYPES: BusinessTypeSpec[] = [
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

export const POS_REAL_FEATURES: PosFeature[] = [
  { id: 'pos-billing', name: 'POS / Billing', description: 'Handle everyday point-of-sale billing from a dedicated checkout workflow.', category: 'core' },
  { id: 'returns', name: 'Returns', description: 'Manage product returns as part of your POS operations.', category: 'operations' },
  { id: 'inventory', name: 'Inventory', description: 'Keep inventory information connected to your day-to-day POS workflow.', category: 'core' },
  { id: 'damaged-products', name: 'Damaged Products', description: 'Track damaged products separately from normal inventory activity.', category: 'operations' },
  { id: 'customers', name: 'Customers', description: 'Keep customer information available within the POS system.', category: 'management' },
  { id: 'sales-history', name: 'Sales History', description: 'Review previous sales and transaction activity.', category: 'management' },
  { id: 'reports', name: 'Reports', description: 'Access reporting information from your POS operations.', category: 'management' },
  { id: 'variants', name: 'Product Variants', description: 'Support for item sizes, colors, flavors, modifiers, and custom attributes.', category: 'core' },
  { id: 'warranties', name: 'Warranties', description: 'Issue and track product serial numbers, warranty terms, and claim status.', category: 'operations' },
  { id: 'receipts', name: 'Custom Receipts', description: 'Instant print receipts with branded headers, QR codes, and footers.', category: 'settings' },
  { id: 'products', name: 'Product Catalog', description: 'Manage thousands of SKUs with bulk pricing and discount rules.', category: 'core' },
  { id: 'categories', name: 'Categories', description: 'Organize inventory into intuitive visual categories for touch selection.', category: 'core' },
  { id: 'pdf-customization', name: 'PDF Customization', description: 'Tailor invoice and receipt PDF layouts to match your company branding.', category: 'settings' },
  { id: 'points', name: 'Points & Loyalty', description: 'Reward repeat customers with customizable loyalty points and store credit.', category: 'management' },
  { id: 'printer-settings', name: 'Printer & Hardware Settings', description: 'Plug-and-play setup for thermal receipt printers, cash drawers, and barcode scanners.', category: 'settings' }
];

export const MODULE_COMBINATIONS = [
  {
    title: 'Standalone Invoice',
    description: 'Perfect for businesses seeking focused invoicing and billing without a counter POS.',
    recommendedFor: 'B2B Services & Billing'
  },
  {
    title: 'Standalone POS',
    description: 'Ideal for counters needing high-speed checkout and POS operations.',
    recommendedFor: 'Restaurants, Barbershops, Supermarkets, Laundry'
  },
  {
    title: 'POS + Invoice (Full Suite)',
    description: 'The complete connected system combining counter checkout with corporate invoicing.',
    recommendedFor: 'Multi-operation Businesses'
  }
];

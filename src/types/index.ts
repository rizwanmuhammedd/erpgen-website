import React from 'react';

export type ModuleType = 'invoice' | 'pos';

export type PosBusinessType = 'restaurant' | 'barbershop' | 'supermarket' | 'laundry';

export interface PosFeature {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'operations' | 'management' | 'settings';
}

export interface BusinessTypeSpec {
  id: PosBusinessType;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  keyCapabilities: string[];
}

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'purple' | 'neutral' | 'outline' | 'success';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'brand-border' | 'hover-glow';
  className?: string;
  onClick?: () => void;
}

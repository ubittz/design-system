'use client';

import React from 'react';

import { cn } from '../../../utils/cn';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gray' | 'outline';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  shape?: 'default' | 'round' | 'square' | 'semi-round';
  iconFront?: React.ReactNode;
  iconBack?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const SIZE_CLASSES = {
  xs: 'h-7 px-3 gap-1 text-xs font-medium leading-5 tracking-[-0.02em]',
  s: 'h-8 px-4 gap-1 text-xs font-medium leading-5 tracking-[-0.02em]',
  m: 'h-10 px-5 gap-1.5 text-sm font-medium leading-[22px] tracking-[-0.02em]',
  l: 'h-12 px-6 gap-1.5 text-base font-medium leading-6 tracking-[-0.02em]',
  xl: 'h-[52px] px-8 gap-2 text-base font-medium leading-6 tracking-[-0.02em]',
} as const;

const ICON_SIZE_CLASSES = {
  xs: 'w-4 h-4',
  s: 'w-4 h-4',
  m: 'w-5 h-5',
  l: 'w-5 h-5',
  xl: 'w-6 h-6',
} as const;

const SHAPE_CLASSES = {
  default: 'rounded',
  round: 'rounded-full',
  square: 'rounded-none',
  'semi-round': 'rounded-lg',
} as const;

function getVariantClasses(variant: NonNullable<ButtonProps['variant']>, disabled: boolean): string {
  if (disabled) {
    return 'bg-[var(--component-button-disabled-background)] text-[var(--component-button-disabled-label)] border-0 cursor-not-allowed';
  }

  switch (variant) {
    case 'primary':
      return 'bg-[var(--component-button-primary-background)] text-[var(--component-button-primary-label)] border-0';
    case 'secondary':
      return 'bg-[var(--component-button-secondary-background)] text-[var(--component-button-secondary-label)] border-0';
    case 'ghost':
      return 'bg-transparent text-[var(--component-button-ghost-label)] border border-[var(--component-button-ghost-border)]';
    case 'gray':
      return 'bg-[var(--component-button-gray-background)] text-[var(--component-button-gray-label)] border-0';
    case 'outline':
      return 'bg-transparent text-[var(--component-button-outline-label)] border border-[var(--component-button-outline-border)]';
  }
}

function getIconColor(variant: NonNullable<ButtonProps['variant']>, disabled: boolean): string {
  if (disabled) return 'var(--component-button-disabled-icon)';

  switch (variant) {
    case 'primary':
      return 'var(--component-button-primary-icon)';
    case 'secondary':
      return 'var(--component-button-secondary-icon)';
    case 'ghost':
      return 'var(--component-button-ghost-icon)';
    case 'gray':
      return 'var(--component-button-gray-icon)';
    case 'outline':
      return 'var(--component-button-outline-icon)';
  }
}

export function Button({
  children,
  variant = 'primary',
  size = 'm',
  shape = 'default',
  iconFront,
  iconBack,
  disabled = false,
  fullWidth = false,
  onClick,
  className,
  style,
}: ButtonProps): React.JSX.Element {
  const iconColor = getIconColor(variant, disabled);

  return (
    <button
      type='button'
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={cn(
        'inline-flex items-center justify-center',
        SIZE_CLASSES[size],
        SHAPE_CLASSES[shape],
        getVariantClasses(variant, disabled),
        !disabled && 'cursor-pointer',
        fullWidth && 'w-full',
        className
      )}
      style={style}
    >
      {iconFront && (
        <span className={cn('inline-flex items-center justify-center', ICON_SIZE_CLASSES[size])} style={{ color: iconColor }}>
          {iconFront}
        </span>
      )}
      {children}
      {iconBack && (
        <span className={cn('inline-flex items-center justify-center', ICON_SIZE_CLASSES[size])} style={{ color: iconColor }}>
          {iconBack}
        </span>
      )}
    </button>
  );
}

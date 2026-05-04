'use client';

import React from 'react';

import { cn } from '../../../utils/cn';

export interface IconButtonProps {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gray' | 'outline';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  disabled?: boolean;
  onClick?: () => void;
  'aria-label': string;
  className?: string;
  style?: React.CSSProperties;
}

const SIZE_CLASSES = {
  xs: 'w-7 h-7',
  s: 'w-8 h-8',
  m: 'w-10 h-10',
  l: 'w-12 h-12',
  xl: 'w-[52px] h-[52px]',
} as const;

const ICON_SIZE_CLASSES = {
  xs: 'w-4 h-4',
  s: 'w-4 h-4',
  m: 'w-5 h-5',
  l: 'w-5 h-5',
  xl: 'w-6 h-6',
} as const;

function getVariantClasses(variant: NonNullable<IconButtonProps['variant']>, disabled: boolean): string {
  if (disabled) {
    return 'bg-[var(--component-button-disabled-background)] text-[var(--component-button-disabled-icon)] border-0 cursor-not-allowed';
  }

  switch (variant) {
    case 'primary':
      return 'bg-[var(--component-button-primary-background)] text-[var(--component-button-primary-icon)] border-0';
    case 'secondary':
      return 'bg-[var(--component-button-secondary-background)] text-[var(--component-button-secondary-icon)] border-0';
    case 'ghost':
      return 'bg-transparent text-[var(--component-button-ghost-icon)] border border-[var(--component-button-ghost-border)]';
    case 'gray':
      return 'bg-[var(--component-button-gray-background)] text-[var(--component-button-gray-icon)] border-0';
    case 'outline':
      return 'bg-transparent text-[var(--component-button-outline-icon)] border border-[var(--component-button-outline-border)]';
  }
}

export function IconButton({
  icon,
  variant = 'primary',
  size = 'm',
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
  className,
  style,
}: IconButtonProps): React.JSX.Element {
  return (
    <button
      type='button'
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center justify-center rounded-full p-0',
        SIZE_CLASSES[size],
        getVariantClasses(variant, disabled),
        !disabled && 'cursor-pointer',
        className
      )}
      style={style}
    >
      <span className={cn('inline-flex items-center justify-center', ICON_SIZE_CLASSES[size])}>{icon}</span>
    </button>
  );
}

'use client';

import React from 'react';

import { cn } from '../../../utils/cn';

export interface FullButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gray' | 'outline';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface FullButtonGroupProps {
  children: React.ReactNode;
  layout?: 'horizontal' | 'vertical';
  gap?: number;
  className?: string;
  style?: React.CSSProperties;
}

function getVariantClasses(variant: NonNullable<FullButtonProps['variant']>, disabled: boolean): string {
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

function FullButtonBase({ children, variant = 'primary', disabled = false, onClick, className, style }: FullButtonProps): React.JSX.Element {
  return (
    <button
      type='button'
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={cn(
        'flex items-center justify-center w-full h-[52px] rounded text-base font-medium leading-6 tracking-[-0.02em]',
        getVariantClasses(variant, disabled),
        !disabled && 'cursor-pointer',
        className
      )}
      style={style}
    >
      {children}
    </button>
  );
}

function FullButtonGroup({ children, layout = 'vertical', gap = 8, className, style }: FullButtonGroupProps): React.JSX.Element {
  return (
    <div className={cn('flex', layout === 'horizontal' ? 'flex-row' : 'flex-col', className)} style={{ gap, ...style }}>
      {children}
    </div>
  );
}

export const FullButton = Object.assign(FullButtonBase, {
  Group: FullButtonGroup,
});

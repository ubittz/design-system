'use client';

import React from 'react';

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

function getVariantStyle(
  variant: NonNullable<FullButtonProps['variant']>,
  disabled: boolean,
): React.CSSProperties {
  if (disabled) {
    return {
      background: 'var(--component-button-disabled-background)',
      color: 'var(--component-button-disabled-label)',
      border: 'none',
      cursor: 'not-allowed',
    };
  }

  switch (variant) {
    case 'primary':
      return {
        background: 'var(--component-button-primary-background)',
        color: 'var(--component-button-primary-label)',
        border: 'none',
      };
    case 'secondary':
      return {
        background: 'var(--component-button-secondary-background)',
        color: 'var(--component-button-secondary-label)',
        border: 'none',
      };
    case 'ghost':
      return {
        background: 'transparent',
        color: 'var(--component-button-ghost-label)',
        border: '1px solid var(--component-button-ghost-border)',
      };
    case 'gray':
      return {
        background: 'var(--component-button-gray-background)',
        color: 'var(--component-button-gray-label)',
        border: 'none',
      };
    case 'outline':
      return {
        background: 'transparent',
        color: 'var(--component-button-outline-label)',
        border: '1px solid var(--component-button-outline-border)',
      };
  }
}

function FullButtonBase({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  className,
  style,
}: FullButtonProps): React.JSX.Element {
  const variantStyle = getVariantStyle(variant, disabled);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 52,
        borderRadius: 4,
        fontSize: 16,
        fontWeight: 500,
        lineHeight: '24px',
        letterSpacing: '-0.02em',
        boxSizing: 'border-box',
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...variantStyle,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function FullButtonGroup({
  children,
  layout = 'vertical',
  gap = 8,
  className,
  style,
}: FullButtonGroupProps): React.JSX.Element {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: layout === 'horizontal' ? 'row' : 'column',
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export const FullButton = Object.assign(FullButtonBase, {
  Group: FullButtonGroup,
});

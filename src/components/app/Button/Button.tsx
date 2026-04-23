'use client';

import React from 'react';

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

const SIZE_MAP = {
  xs: { height: 28, fontSize: 12, fontWeight: 500, lineHeight: '20px', paddingH: 12, iconSize: 16, gap: 4 },
  s: { height: 32, fontSize: 12, fontWeight: 500, lineHeight: '20px', paddingH: 16, iconSize: 16, gap: 4 },
  m: { height: 40, fontSize: 14, fontWeight: 500, lineHeight: '22px', paddingH: 20, iconSize: 20, gap: 6 },
  l: { height: 48, fontSize: 16, fontWeight: 500, lineHeight: '24px', paddingH: 24, iconSize: 20, gap: 6 },
  xl: { height: 52, fontSize: 16, fontWeight: 500, lineHeight: '24px', paddingH: 32, iconSize: 24, gap: 8 },
} as const;

const SHAPE_RADIUS = {
  default: 4,
  round: 999,
  square: 0,
  'semi-round': 8,
} as const;

function getVariantStyle(variant: NonNullable<ButtonProps['variant']>, disabled: boolean): React.CSSProperties {
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
  const sizeSpec = SIZE_MAP[size];
  const variantStyle = getVariantStyle(variant, disabled);
  const iconColor = getIconColor(variant, disabled);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: sizeSpec.gap,
        height: sizeSpec.height,
        padding: `0 ${sizeSpec.paddingH}px`,
        borderRadius: SHAPE_RADIUS[shape],
        fontSize: sizeSpec.fontSize,
        fontWeight: sizeSpec.fontWeight,
        lineHeight: sizeSpec.lineHeight,
        letterSpacing: '-0.02em',
        boxSizing: 'border-box',
        cursor: disabled ? 'not-allowed' : 'pointer',
        width: fullWidth ? '100%' : undefined,
        ...variantStyle,
        ...style,
      }}
    >
      {iconFront && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: sizeSpec.iconSize,
            height: sizeSpec.iconSize,
            color: iconColor,
          }}
        >
          {iconFront}
        </span>
      )}
      {children}
      {iconBack && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: sizeSpec.iconSize,
            height: sizeSpec.iconSize,
            color: iconColor,
          }}
        >
          {iconBack}
        </span>
      )}
    </button>
  );
}

'use client';

import React from 'react';

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

const SIZE_MAP = {
  xs: { dimension: 28, iconSize: 16 },
  s: { dimension: 32, iconSize: 16 },
  m: { dimension: 40, iconSize: 20 },
  l: { dimension: 48, iconSize: 20 },
  xl: { dimension: 52, iconSize: 24 },
} as const;

function getVariantStyle(
  variant: NonNullable<IconButtonProps['variant']>,
  disabled: boolean,
): React.CSSProperties {
  if (disabled) {
    return {
      background: 'var(--component-button-disabled-background)',
      color: 'var(--component-button-disabled-icon)',
      border: 'none',
      cursor: 'not-allowed',
    };
  }

  switch (variant) {
    case 'primary':
      return {
        background: 'var(--component-button-primary-background)',
        color: 'var(--component-button-primary-icon)',
        border: 'none',
      };
    case 'secondary':
      return {
        background: 'var(--component-button-secondary-background)',
        color: 'var(--component-button-secondary-icon)',
        border: 'none',
      };
    case 'ghost':
      return {
        background: 'transparent',
        color: 'var(--component-button-ghost-icon)',
        border: '1px solid var(--component-button-ghost-border)',
      };
    case 'gray':
      return {
        background: 'var(--component-button-gray-background)',
        color: 'var(--component-button-gray-icon)',
        border: 'none',
      };
    case 'outline':
      return {
        background: 'transparent',
        color: 'var(--component-button-outline-icon)',
        border: '1px solid var(--component-button-outline-border)',
      };
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
  const sizeSpec = SIZE_MAP[size];
  const variantStyle = getVariantStyle(variant, disabled);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      aria-label={ariaLabel}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: sizeSpec.dimension,
        height: sizeSpec.dimension,
        borderRadius: 999,
        padding: 0,
        boxSizing: 'border-box',
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...variantStyle,
        ...style,
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeSpec.iconSize,
          height: sizeSpec.iconSize,
        }}
      >
        {icon}
      </span>
    </button>
  );
}

'use client';

import React from 'react';

import { SelectableOptionProps } from './types';

const SIZE_MAP = {
  s: { paddingH: 14, paddingV: 6, fontSize: 14, lineHeight: '20px', letterSpacing: '-0.28px' },
  m: { paddingH: 18, paddingV: 10, fontSize: 14, lineHeight: '20px', letterSpacing: '-0.28px' },
  l: { paddingH: 18, paddingV: 6, fontSize: 16, lineHeight: '24px', letterSpacing: '-0.32px', height: 48 },
} as const;

const SHAPE_RADIUS = {
  default: 4,
  round: 999,
  square: 0,
} as const;

export function SelectableOption({
  shape = 'default',
  size = 'm',
  selected = false,
  children,
  style,
  ...buttonProps
}: SelectableOptionProps): React.JSX.Element {
  const sizeSpec = SIZE_MAP[size];

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${sizeSpec.paddingV}px ${sizeSpec.paddingH}px`,
    borderRadius: SHAPE_RADIUS[shape],
    fontSize: sizeSpec.fontSize,
    fontWeight: 400,
    lineHeight: sizeSpec.lineHeight,
    letterSpacing: sizeSpec.letterSpacing,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    cursor: 'pointer',
    height: 'height' in sizeSpec ? sizeSpec.height : undefined,
    ...(selected
      ? {
          background: 'var(--component-input-selected-background)',
          color: 'var(--component-input-selected-text)',
          border: '1px solid transparent',
        }
      : {
          background: 'transparent',
          color: 'var(--component-input-default-label)',
          border: '1px solid var(--component-input-default-border)',
        }),
    ...style,
  };

  return (
    <button type="button" style={baseStyle} {...buttonProps}>
      {children}
    </button>
  );
}

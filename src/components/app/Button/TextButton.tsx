'use client';

import React from 'react';

import { RoundStroke } from '../../../icons';

export interface TextButtonProps {
  children: React.ReactNode;
  size?: 's' | 'm' | 'l';
  showArrow?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const SIZE_MAP = {
  s: { fontSize: 12, fontWeight: 500, lineHeight: '20px', iconSize: 12 },
  m: { fontSize: 14, fontWeight: 500, lineHeight: '22px', iconSize: 16 },
  l: { fontSize: 16, fontWeight: 500, lineHeight: '24px', iconSize: 16 },
} as const;

export function TextButton({
  children,
  size = 'm',
  showArrow = false,
  onClick,
  className,
  style,
}: TextButtonProps): React.JSX.Element {
  const sizeSpec = SIZE_MAP[size];

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: 0,
        border: 'none',
        background: 'transparent',
        color: 'var(--component-button-text-label)',
        fontSize: sizeSpec.fontSize,
        fontWeight: sizeSpec.fontWeight,
        lineHeight: sizeSpec.lineHeight,
        letterSpacing: '-0.02em',
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
      {showArrow && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: sizeSpec.iconSize,
            height: sizeSpec.iconSize,
            color: 'var(--component-button-text-icon)',
          }}
        >
          <RoundStroke.Right size={sizeSpec.iconSize} />
        </span>
      )}
    </button>
  );
}

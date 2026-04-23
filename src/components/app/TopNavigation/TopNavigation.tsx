'use client';

import React from 'react';

export interface TopNavigationProps {
  /** Left slot (back button, hamburger, etc.) */
  left?: React.ReactNode;
  /** Center title (absolute centered) */
  title?: string;
  /** Right slot (cart, close, etc.) */
  right?: React.ReactNode;
  /** Additional className */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
}

export function TopNavigation({ left, title, right, className, style }: TopNavigationProps): React.JSX.Element {
  return (
    <header
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        height: 56,
        padding: '0 16px',
        background: 'var(--component-navigation-default-background)',
        borderBottom: '1px solid var(--component-navigation-default-borderPrimary)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>{left}</div>
      {title && (
        <span
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 16,
            fontWeight: 500,
            color: 'var(--component-navigation-default-title)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 'calc(100% - 120px)',
          }}
        >
          {title}
        </span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>{right}</div>
    </header>
  );
}

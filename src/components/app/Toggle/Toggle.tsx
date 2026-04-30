'use client';

import React from 'react';

import { ToggleProps } from './types';

export function Toggle({
  items,
  activeIndex,
  onChange,
  className,
  style,
}: ToggleProps): React.JSX.Element {
  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            type="button"
            onClick={() => onChange?.(index)}
            style={{
              ...itemStyle,
              background: isActive
                ? 'var(--component-toggle-selected-background)'
                : 'transparent',
              color: isActive
                ? 'var(--component-toggle-selected-label)'
                : 'var(--component-toggle-default-label)',
            }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// Styles
// ============================================================================

const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: 4,
  borderRadius: 16,
  background: 'var(--component-toggle-default-background)',
  overflow: 'hidden',
  boxSizing: 'border-box',
};

const itemStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 16px',
  borderRadius: 12,
  border: 'none',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '22px',
  letterSpacing: '-0.28px',
  boxSizing: 'border-box',
};

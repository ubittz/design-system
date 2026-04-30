'use client';

import React from 'react';

import { FilterBarProps } from './types';

export function FilterBar({ options, value, onChange, className, style }: FilterBarProps): React.JSX.Element {
  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            style={isSelected ? pillSelectedStyle : pillDefaultStyle}
            onClick={() => onChange?.(option.value)}
          >
            {option.label}
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
  gap: 12,
  height: 56,
  padding: '0 16px',
  borderBottom: '1px solid var(--component-navigation-default-borderPrimary)',
  overflowX: 'auto',
  boxSizing: 'border-box',
};

const pillBaseStyle: React.CSSProperties = {
  borderRadius: 999,
  padding: '6px 14px',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '22px',
  letterSpacing: '-0.28px',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  cursor: 'pointer',
  boxSizing: 'border-box',
};

const pillDefaultStyle: React.CSSProperties = {
  ...pillBaseStyle,
  background: 'transparent',
  border: '1px solid var(--component-filter-default-border)',
  color: 'var(--component-filter-default-text)',
};

const pillSelectedStyle: React.CSSProperties = {
  ...pillBaseStyle,
  background: 'var(--component-filter-selected-background)',
  border: '1px solid transparent',
  color: 'var(--component-filter-selected-text)',
};

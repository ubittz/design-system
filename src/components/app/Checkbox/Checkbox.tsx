'use client';

import React from 'react';

import { RoundStroke, RoundSolid, DefaultStroke, DefaultSolid } from '../../../icons';

import { CheckboxProps } from './types';

const SIZE_CONFIG = {
  S: {
    paddingY: 10,
    iconSize: 20,
    fontSize: 14,
    lineHeight: '22px',
    letterSpacing: '-0.28px',
  },
  M: {
    paddingY: 12,
    iconSize: 24,
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '-0.32px',
  },
} as const;

function getCheckboxIcon(
  shape: 'default' | 'square',
  checked: boolean,
  size: number,
  color: string,
): React.JSX.Element {
  if (shape === 'square') {
    return checked ? (
      <DefaultSolid.Checkbox size={size} color={color} />
    ) : (
      <DefaultStroke.Sqaure size={size} color={color} />
    );
  }

  return checked ? (
    <RoundSolid.Checkbox size={size} color={color} />
  ) : (
    <RoundStroke.Sqaure size={size} color={color} />
  );
}

export function Checkbox({
  checked = false,
  size = 'S',
  shape = 'default',
  label,
  caption,
  arrow = false,
  disabled = false,
  onChange,
  className,
  style,
}: CheckboxProps): React.JSX.Element {
  const config = SIZE_CONFIG[size];

  const iconColor = checked
    ? 'var(--component-input-selected-icon)'
    : 'var(--component-input-default-icon)';

  const handleClick = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  return (
    <div
      className={className}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleClick();
        }
      }}
      style={{
        ...containerStyle,
        paddingTop: config.paddingY,
        paddingBottom: config.paddingY,
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
    >
      <span style={iconWrapperStyle}>
        {getCheckboxIcon(shape, checked, config.iconSize, iconColor)}
      </span>

      {(label || caption) && (
        <span
          style={{
            ...labelAreaStyle,
            fontSize: config.fontSize,
            lineHeight: config.lineHeight,
            letterSpacing: config.letterSpacing,
          }}
        >
          {caption && <span style={captionStyle}>[{caption}]</span>}
          {label && <span style={labelStyle}>{label}</span>}
        </span>
      )}

      {arrow && (
        <span style={arrowStyle}>
          <RoundStroke.Bottom size={config.iconSize} color="var(--component-input-default-icon)" />
        </span>
      )}
    </div>
  );
}

// ============================================================================
// Styles
// ============================================================================

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  width: '100%',
  boxSizing: 'border-box',
  userSelect: 'none',
};

const iconWrapperStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const labelAreaStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  flex: 1,
  minWidth: 0,
  fontWeight: 400,
};

const captionStyle: React.CSSProperties = {
  color: 'var(--text-default-brandPrimary)',
  flexShrink: 0,
};

const labelStyle: React.CSSProperties = {
  color: 'var(--component-input-default-text)',
};

const arrowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  marginLeft: 'auto',
};

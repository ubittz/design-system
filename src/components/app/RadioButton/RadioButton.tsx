'use client';

import React from 'react';

import { RoundStroke, RoundSolid } from '../../../icons';

import { RadioButtonProps } from './types';

const SIZE_MAP = {
  S: { iconSize: 20, fontSize: 14, lineHeight: '22px', letterSpacing: '-0.28px' },
  M: { iconSize: 24, fontSize: 16, lineHeight: '24px', letterSpacing: '-0.32px' },
} as const;

export function RadioButton({
  checked = false,
  size = 'S',
  label,
  value,
  name,
  disabled = false,
  onChange,
  className,
  style,
}: RadioButtonProps): React.JSX.Element {
  const sizeSpec = SIZE_MAP[size];

  const handleClick = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange?.(!checked);
    }
  };

  const IconComponent = checked ? RoundSolid.Radio : RoundStroke.Circle;
  const iconColor = checked
    ? 'var(--component-input-selected-icon)'
    : 'var(--component-input-default-icon)';

  return (
    <label
      className={className}
      style={{
        ...containerStyle,
        ...(disabled ? disabledStyle : {}),
        ...style,
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="radio"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange?.(!checked)}
        style={hiddenInputStyle}
        tabIndex={-1}
      />
      <IconComponent
        size={sizeSpec.iconSize}
        color={iconColor}
        style={iconStyle}
      />
      {label && (
        <span
          style={{
            ...labelStyle,
            fontSize: sizeSpec.fontSize,
            lineHeight: sizeSpec.lineHeight,
            letterSpacing: sizeSpec.letterSpacing,
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
}

// ============================================================================
// Styles
// ============================================================================

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  paddingTop: 8,
  paddingBottom: 8,
  cursor: 'pointer',
  boxSizing: 'border-box',
};

const disabledStyle: React.CSSProperties = {
  cursor: 'not-allowed',
  opacity: 0.4,
};

const hiddenInputStyle: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

const iconStyle: React.CSSProperties = {
  flexShrink: 0,
};

const labelStyle: React.CSSProperties = {
  color: 'var(--component-input-default-text)',
  fontWeight: 400,
};

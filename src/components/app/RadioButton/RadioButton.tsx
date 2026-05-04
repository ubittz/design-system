'use client';

import React from 'react';

import { RadioButtonProps } from './types';
import { RoundStroke, RoundSolid } from '../../../icons';
import { cn } from '../../../utils/cn';


const SIZE_MAP = {
  S: { iconSize: 20, fontSize: 'text-sm', lineHeight: 'leading-[22px]', letterSpacing: 'tracking-[-0.28px]' },
  M: { iconSize: 24, fontSize: 'text-base', lineHeight: 'leading-6', letterSpacing: 'tracking-[-0.32px]' },
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
  const iconColor = checked ? 'var(--component-input-selected-icon)' : 'var(--component-input-default-icon)';

  return (
    <label
      className={cn('flex flex-row items-center gap-1 py-2 cursor-pointer', disabled && 'cursor-not-allowed opacity-40', className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role='radio'
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      style={style}
    >
      <input
        type='radio'
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange?.(!checked)}
        className='absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0'
        style={{ clip: 'rect(0, 0, 0, 0)' }}
        tabIndex={-1}
      />
      <IconComponent size={sizeSpec.iconSize} color={iconColor} style={{ flexShrink: 0 }} />
      {label && (
        <span
          className={cn('font-normal text-[var(--component-input-default-text)]', sizeSpec.fontSize, sizeSpec.lineHeight, sizeSpec.letterSpacing)}
        >
          {label}
        </span>
      )}
    </label>
  );
}

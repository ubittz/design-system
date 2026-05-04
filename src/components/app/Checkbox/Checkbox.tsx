'use client';

import React from 'react';

import { cn } from '../../../utils/cn';
import { RoundStroke, RoundSolid, DefaultStroke, DefaultSolid } from '../../../icons';

import { CheckboxProps } from './types';

const SIZE_CONFIG = {
  S: {
    paddingY: 'py-[10px]',
    iconSize: 20,
    fontSize: 'text-sm',
    lineHeight: 'leading-[22px]',
    letterSpacing: 'tracking-[-0.28px]',
  },
  M: {
    paddingY: 'py-3',
    iconSize: 24,
    fontSize: 'text-base',
    lineHeight: 'leading-6',
    letterSpacing: 'tracking-[-0.32px]',
  },
} as const;

function getCheckboxIcon(shape: 'default' | 'square', checked: boolean, size: number, color: string): React.JSX.Element {
  if (shape === 'square') {
    return checked ? <DefaultSolid.Checkbox size={size} color={color} /> : <DefaultStroke.Sqaure size={size} color={color} />;
  }

  return checked ? <RoundSolid.Checkbox size={size} color={color} /> : <RoundStroke.Sqaure size={size} color={color} />;
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

  const iconColor = checked ? 'var(--component-input-selected-icon)' : 'var(--component-input-default-icon)';

  const handleClick = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  return (
    <div
      className={cn(
        'flex flex-row items-center gap-2 w-full select-none',
        config.paddingY,
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      role='checkbox'
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
      style={style}
    >
      <span className='flex items-center justify-center shrink-0'>{getCheckboxIcon(shape, checked, config.iconSize, iconColor)}</span>

      {(label || caption) && (
        <span className={cn('flex flex-row items-center gap-1 flex-1 min-w-0 font-normal', config.fontSize, config.lineHeight, config.letterSpacing)}>
          {caption && <span className='text-[var(--text-default-brandPrimary)] shrink-0'>[{caption}]</span>}
          {label && <span className='text-[var(--component-input-default-text)]'>{label}</span>}
        </span>
      )}

      {arrow && (
        <span className='flex items-center justify-center shrink-0 ml-auto'>
          <RoundStroke.Bottom size={config.iconSize} color='var(--component-input-default-icon)' />
        </span>
      )}
    </div>
  );
}

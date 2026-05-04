'use client';

import React from 'react';

import { cn } from '../../../utils/cn';

import { SelectableOptionProps } from './types';

const SIZE_CLASSES = {
  s: 'px-[14px] py-1.5 text-sm leading-5 tracking-[-0.28px]',
  m: 'px-[18px] py-[10px] text-sm leading-5 tracking-[-0.28px]',
  l: 'px-[18px] py-1.5 text-base leading-6 tracking-[-0.32px] h-12',
} as const;

const SHAPE_CLASSES = {
  default: 'rounded',
  round: 'rounded-full',
  square: 'rounded-none',
} as const;

export function SelectableOption({
  shape = 'default',
  size = 'm',
  selected = false,
  children,
  className,
  style,
  ...buttonProps
}: SelectableOptionProps): React.JSX.Element {
  return (
    <button
      type='button'
      className={cn(
        'inline-flex items-center justify-center font-normal text-center whitespace-nowrap cursor-pointer',
        SIZE_CLASSES[size],
        SHAPE_CLASSES[shape],
        selected
          ? 'bg-[var(--component-input-selected-background)] text-[var(--component-input-selected-text)] border border-transparent'
          : 'bg-transparent text-[var(--component-input-default-label)] border border-[var(--component-input-default-border)]',
        className
      )}
      style={style}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

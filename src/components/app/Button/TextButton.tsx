'use client';

import React from 'react';

import { cn } from '../../../utils/cn';
import { RoundStroke } from '../../../icons';

export interface TextButtonProps {
  children: React.ReactNode;
  size?: 's' | 'm' | 'l';
  showArrow?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const SIZE_CLASSES = {
  s: 'text-xs font-medium leading-5 tracking-[-0.02em]',
  m: 'text-sm font-medium leading-[22px] tracking-[-0.02em]',
  l: 'text-base font-medium leading-6 tracking-[-0.02em]',
} as const;

const ICON_SIZE_MAP = {
  s: 12,
  m: 16,
  l: 16,
} as const;

const ICON_SIZE_CLASSES = {
  s: 'w-3 h-3',
  m: 'w-4 h-4',
  l: 'w-4 h-4',
} as const;

export function TextButton({ children, size = 'm', showArrow = false, onClick, className, style }: TextButtonProps): React.JSX.Element {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1 p-0 border-0 bg-transparent text-[var(--component-button-text-label)] cursor-pointer',
        SIZE_CLASSES[size],
        className
      )}
      style={style}
    >
      {children}
      {showArrow && (
        <span className={cn('inline-flex items-center justify-center text-[var(--component-button-text-icon)]', ICON_SIZE_CLASSES[size])}>
          <RoundStroke.Right size={ICON_SIZE_MAP[size]} />
        </span>
      )}
    </button>
  );
}

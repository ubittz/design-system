'use client';

import React from 'react';

import { ToggleProps } from './types';
import { cn } from '../../../utils/cn';


export function Toggle({ items, activeIndex, onChange, className, style }: ToggleProps): React.JSX.Element {
  return (
    <div
      className={cn('flex items-center gap-1 p-1 rounded-2xl bg-[var(--component-toggle-default-background)] overflow-hidden', className)}
      style={style}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            type='button'
            onClick={() => onChange?.(index)}
            className={cn(
              'flex-1 min-w-0 flex items-center justify-center px-4 py-2 rounded-xl border-0 cursor-pointer text-sm font-medium leading-[22px] tracking-[-0.28px]',
              isActive
                ? 'bg-[var(--component-toggle-selected-background)] text-[var(--component-toggle-selected-label)]'
                : 'bg-transparent text-[var(--component-toggle-default-label)]'
            )}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

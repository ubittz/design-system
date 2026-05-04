'use client';

import React from 'react';

import { FilterBarProps } from './types';
import { cn } from '../../../utils/cn';


export function FilterBar({ options, value, onChange, className, style }: FilterBarProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'flex items-center gap-3 h-14 px-4 border-b border-b-[var(--component-navigation-default-borderPrimary)] overflow-x-auto',
        className
      )}
      style={style}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type='button'
            className={cn(
              'rounded-full px-[14px] py-1.5 text-sm font-normal leading-[22px] tracking-[-0.28px] whitespace-nowrap shrink-0 cursor-pointer',
              isSelected
                ? 'bg-[var(--component-filter-selected-background)] border border-transparent text-[var(--component-filter-selected-text)]'
                : 'bg-transparent border border-[var(--component-filter-default-border)] text-[var(--component-filter-default-text)]'
            )}
            onClick={() => onChange?.(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

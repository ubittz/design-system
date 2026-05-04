'use client';

import React from 'react';

import { RoundStroke } from '../../../icons';
import { cn } from '../../../utils/cn';

export interface PaginationProps {
  current: number;
  total: number;
  onChange?: (page: number) => void;
  maxVisible?: number;
  className?: string;
  style?: React.CSSProperties;
}

const getVisiblePages = (current: number, total: number, maxVisible: number): number[] => {
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = current - half;
  let end = current + half;

  if (start < 1) {
    start = 1;
    end = maxVisible;
  } else if (end > total) {
    end = total;
    start = total - maxVisible + 1;
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export function Pagination({ current, total, onChange, maxVisible = 5, className, style }: PaginationProps): React.JSX.Element {
  const pages = getVisiblePages(current, total, maxVisible);

  return (
    <nav className={cn('flex items-center gap-4', className)} style={style}>
      <button
        type='button'
        onClick={() => current > 1 && onChange?.(current - 1)}
        disabled={current <= 1}
        className={cn(
          'flex items-center justify-center w-6 h-6 border-0 bg-transparent p-0 text-[var(--component-navigation-default-iconDefault)]',
          current <= 1 ? 'opacity-30 cursor-default' : 'cursor-pointer'
        )}
        aria-label='Previous page'
      >
        <RoundStroke.Left size={24} />
      </button>

      <div className='flex items-center gap-3'>
        {pages.map((page) => {
          const isActive = page === current;
          return (
            <button
              key={page}
              type='button'
              onClick={() => onChange?.(page)}
              className={cn(
                'flex items-center justify-center w-9 h-7 rounded border-0 cursor-pointer text-sm font-normal p-0',
                isActive
                  ? 'text-[var(--component-navigation-selected-inverseText)] bg-[var(--component-navigation-selected-background)]'
                  : 'text-[var(--component-navigation-default-text)] bg-transparent'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type='button'
        onClick={() => current < total && onChange?.(current + 1)}
        disabled={current >= total}
        className={cn(
          'flex items-center justify-center w-6 h-6 border-0 bg-transparent p-0 text-[var(--component-navigation-default-iconDefault)]',
          current >= total ? 'opacity-30 cursor-default' : 'cursor-pointer'
        )}
        aria-label='Next page'
      >
        <RoundStroke.Right size={24} />
      </button>
    </nav>
  );
}

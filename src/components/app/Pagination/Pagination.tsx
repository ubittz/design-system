'use client';

import React from 'react';

import { RoundStroke } from '../../../icons';

export interface PaginationProps {
  /** Current active page (1-based) */
  current: number;
  /** Total number of pages */
  total: number;
  /** Page change handler */
  onChange?: (page: number) => void;
  /** Maximum visible page numbers */
  maxVisible?: number;
  /** Additional className */
  className?: string;
  /** Additional styles */
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

export function Pagination({
  current,
  total,
  onChange,
  maxVisible = 5,
  className,
  style,
}: PaginationProps): React.JSX.Element {
  const pages = getVisiblePages(current, total, maxVisible);

  const arrowButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    padding: 0,
    color: 'var(--component-navigation-default-iconDefault)',
  };

  return (
    <nav
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        ...style,
      }}
    >
      <button
        type="button"
        onClick={() => current > 1 && onChange?.(current - 1)}
        disabled={current <= 1}
        style={{
          ...arrowButtonStyle,
          opacity: current <= 1 ? 0.3 : 1,
          cursor: current <= 1 ? 'default' : 'pointer',
        }}
        aria-label="Previous page"
      >
        <RoundStroke.Left size={24} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {pages.map((page) => {
          const isActive = page === current;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onChange?.(page)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 28,
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 400,
                padding: 0,
                color: isActive
                  ? 'var(--component-navigation-selected-inverseText)'
                  : 'var(--component-navigation-default-text)',
                background: isActive
                  ? 'var(--component-navigation-selected-background)'
                  : 'transparent',
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => current < total && onChange?.(current + 1)}
        disabled={current >= total}
        style={{
          ...arrowButtonStyle,
          opacity: current >= total ? 0.3 : 1,
          cursor: current >= total ? 'default' : 'pointer',
        }}
        aria-label="Next page"
      >
        <RoundStroke.Right size={24} />
      </button>
    </nav>
  );
}

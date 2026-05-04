'use client';

import React from 'react';

import { cn } from '../../../utils/cn';

export interface TabMenuProps {
  items: string[];
  activeIndex: number;
  onChange?: (index: number) => void;
  variant?: 'line' | 'box';
  className?: string;
  style?: React.CSSProperties;
}

export function TabMenu({ items, activeIndex, onChange, variant = 'line', className, style }: TabMenuProps): React.JSX.Element {
  if (variant === 'box') {
    return (
      <div
        className={cn(
          'flex items-center h-[52px] bg-[var(--component-navigation-default-background)] border-b border-b-[var(--component-navigation-default-borderPrimary)]',
          className
        )}
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
                'flex-1 flex items-center justify-center h-full border-0 cursor-pointer text-sm',
                isActive
                  ? 'font-semibold text-[var(--component-navigation-selected-inverseText)] bg-[var(--component-navigation-selected-background)]'
                  : 'font-normal text-[var(--component-navigation-default-text)] bg-[var(--component-navigation-default-background)]'
              )}
            >
              {item}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-stretch h-[52px] bg-[var(--component-navigation-default-background)] border-b border-b-[var(--component-navigation-default-borderSecondary)]',
        className
      )}
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
              'flex-1 flex items-center justify-center h-full border-0 cursor-pointer text-sm bg-transparent',
              isActive
                ? 'font-semibold text-[var(--component-navigation-selected-text)] border-b-2 border-b-[var(--component-navigation-selected-border)]'
                : 'font-normal text-[var(--component-navigation-default-text)] border-b-2 border-b-transparent'
            )}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

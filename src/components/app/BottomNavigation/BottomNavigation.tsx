'use client';

import React from 'react';

import { cn } from '../../../utils/cn';

export interface BottomNavigationItem {
  value: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  label: string;
}

export interface BottomNavigationProps {
  items: BottomNavigationItem[];
  value: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function BottomNavigation({ items, value, onChange, className, style }: BottomNavigationProps): React.JSX.Element {
  return (
    <nav
      className={cn(
        'flex items-stretch bg-[var(--component-navigation-default-background)] border-t border-t-[var(--component-navigation-default-borderPrimary)]',
        className
      )}
      style={style}
    >
      {items.map((item) => {
        const isActive = item.value === value;

        return (
          <button
            key={item.value}
            type='button'
            onClick={() => onChange?.(item.value)}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-1 py-2 border-0 bg-transparent cursor-pointer',
              isActive ? 'text-[var(--component-navigation-selected-text)]' : 'text-[var(--component-navigation-default-text)]'
            )}
          >
            <div className='w-8 h-8 flex items-center justify-center'>{isActive ? item.activeIcon : item.icon}</div>
            <span className={cn('text-xs leading-4 text-inherit', isActive ? 'font-semibold' : 'font-normal')}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

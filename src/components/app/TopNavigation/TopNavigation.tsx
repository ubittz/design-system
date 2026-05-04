'use client';

import React from 'react';

import { cn } from '../../../utils/cn';

export interface TopNavigationProps {
  left?: React.ReactNode;
  title?: string;
  right?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function TopNavigation({ left, title, right, className, style }: TopNavigationProps): React.JSX.Element {
  return (
    <header
      className={cn(
        'flex items-center justify-between relative h-14 px-4 bg-[var(--component-navigation-default-background)] border-b border-b-[var(--component-navigation-default-borderPrimary)]',
        className
      )}
      style={style}
    >
      <div className='flex items-center z-[1]'>{left}</div>
      {title && (
        <span className='absolute left-1/2 -translate-x-1/2 text-base font-medium text-[var(--component-navigation-default-title)] whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-120px)]'>
          {title}
        </span>
      )}
      <div className='flex items-center z-[1]'>{right}</div>
    </header>
  );
}

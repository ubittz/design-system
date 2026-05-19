'use client';

import React from 'react';

import { TopNavigationProps } from './types';
import { cn } from '../../../utils/cn';

export function TopNavigation({ left, title, right, className, style, maxWidth = 1200 }: TopNavigationProps): React.JSX.Element {
  return (
    <header
      className={cn(
        'flex items-center h-[80px] px-4 bg-(--component-navigation-default-background) border-b border-b-(--component-navigation-default-border-primary)',
        className
      )}
      style={style}
    >
      <div className='mx-auto w-full flex relative justify-between' style={{ maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }}>
        <div className='flex items-center z-1'>{left}</div>
        {title && (
          <span className='absolute left-1/2 -translate-x-1/2 text-base font-medium text-(--component-navigation-default-title) whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-120px)]'>
            {title}
          </span>
        )}
        <div className='flex items-center z-1'>{right}</div>
      </div>
    </header>
  );
}

'use client';

import React, { useState, useCallback } from 'react';

import { SearchProps } from './types';
import { Search as SearchIcon } from '../../../icons/round/stroke/Search';
import { cn } from '../../../utils/cn';


export function Search({ className, style, onFocus, onBlur, onSearch, onKeyDown, disabled, ...inputProps }: SearchProps): React.JSX.Element {
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(e.currentTarget.value);
      }
      onKeyDown?.(e);
    },
    [onSearch, onKeyDown]
  );

  const handleIconClick = useCallback(() => {
    if (!disabled && onSearch) {
      const input = document.querySelector<HTMLInputElement>('.ds-search-input');
      if (input) onSearch(input.value);
    }
  }, [disabled, onSearch]);

  const getBorderColor = () => {
    if (focused) return 'var(--component-input-focused-border)';
    return 'var(--component-input-default-border)';
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 w-full h-10 px-4 py-2 rounded bg-[var(--component-input-default-background)] transition-[border-color] duration-200',
        className
      )}
      style={{ border: `1px solid ${getBorderColor()}`, ...style }}
    >
      <input
        className='ds-textfield ds-search-input flex-1 w-full min-w-0 border-0 outline-none bg-transparent p-0 text-sm font-normal leading-[22px] tracking-[-0.02em] text-[var(--component-input-default-text)]'
        type='text'
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        {...inputProps}
      />
      <SearchIcon
        size={24}
        color='var(--component-input-default-icon)'
        style={{ flexShrink: 0, cursor: disabled ? 'default' : 'pointer' }}
        onClick={handleIconClick}
      />
    </div>
  );
}

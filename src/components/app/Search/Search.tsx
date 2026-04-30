'use client';

import React, { useState, useCallback } from 'react';

import { Search as SearchIcon } from '../../../icons/round/stroke/Search';

import { SearchProps } from './types';

export function Search({
  className,
  style,
  onFocus,
  onBlur,
  onSearch,
  onKeyDown,
  disabled,
  ...inputProps
}: SearchProps): React.JSX.Element {
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(e.currentTarget.value);
      }
      onKeyDown?.(e);
    },
    [onSearch, onKeyDown],
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

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    height: 40,
    padding: '8px 16px',
    border: `1px solid ${getBorderColor()}`,
    borderRadius: 4,
    background: 'var(--component-input-default-background)',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    ...style,
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    width: '100%',
    minWidth: 0,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    padding: 0,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: '-0.02em',
    color: 'var(--component-input-default-text)',
  };

  return (
    <div className={className} style={containerStyle}>
      <input
        className="ds-textfield ds-search-input"
        style={inputStyle}
        type="text"
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        {...inputProps}
      />
      <SearchIcon
        size={24}
        color="var(--component-input-default-icon)"
        style={{ flexShrink: 0, cursor: disabled ? 'default' : 'pointer' }}
        onClick={handleIconClick}
      />
    </div>
  );
}

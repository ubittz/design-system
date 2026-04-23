'use client';

import React from 'react';

export interface TabMenuProps {
  /** Tab labels */
  items: string[];
  /** Active tab index */
  activeIndex: number;
  /** Change handler */
  onChange?: (index: number) => void;
  /** Tab style variant */
  variant?: 'line' | 'box';
  /** Additional className */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
}

export const TabMenu: React.FC<TabMenuProps> = ({
  items,
  activeIndex,
  onChange,
  variant = 'line',
  className,
  style,
}) => {
  if (variant === 'box') {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 52,
          background: 'var(--component-navigation-default-background)',
          borderBottom: '1px solid var(--component-navigation-default-borderPrimary)',
          boxSizing: 'border-box',
          ...style,
        }}
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              type="button"
              onClick={() => onChange?.(index)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                color: isActive
                  ? 'var(--component-navigation-selected-inverseText)'
                  : 'var(--component-navigation-default-text)',
                background: isActive
                  ? 'var(--component-navigation-selected-background)'
                  : 'var(--component-navigation-default-background)',
                boxSizing: 'border-box',
              }}
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
      className={className}
      style={{
        display: 'flex',
        alignItems: 'stretch',
        height: 52,
        background: 'var(--component-navigation-default-background)',
        borderBottom: '1px solid var(--component-navigation-default-borderSecondary)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            type="button"
            onClick={() => onChange?.(index)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              border: 'none',
              borderBottom: isActive
                ? '2px solid var(--component-navigation-selected-border)'
                : '2px solid transparent',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              color: isActive
                ? 'var(--component-navigation-selected-text)'
                : 'var(--component-navigation-default-text)',
              background: 'transparent',
              boxSizing: 'border-box',
            }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

TabMenu.displayName = 'TabMenu';

'use client';

import React from 'react';

export interface BottomNavigationItem {
  /** Icon for inactive state */
  icon: React.ReactNode;
  /** Icon for active state */
  activeIcon: React.ReactNode;
  /** Tab label */
  label: string;
}

export interface BottomNavigationProps {
  /** Navigation items */
  items: BottomNavigationItem[];
  /** Active tab index */
  activeIndex: number;
  /** Change handler */
  onChange?: (index: number) => void;
  /** Additional className */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items,
  activeIndex,
  onChange,
  className,
  style,
}) => {
  return (
    <nav
      className={className}
      style={{
        display: 'flex',
        alignItems: 'stretch',
        background: 'var(--component-navigation-default-background)',
        borderTop: '1px solid var(--component-navigation-default-borderPrimary)',
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
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              padding: '8px 0',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: isActive
                ? 'var(--component-navigation-selected-text)'
                : 'var(--component-navigation-default-text)',
            }}
          >
            <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isActive ? item.activeIcon : item.icon}
            </div>
            <span
              style={{
                fontSize: 12,
                lineHeight: '16px',
                fontWeight: isActive ? 600 : 400,
                color: 'inherit',
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

BottomNavigation.displayName = 'BottomNavigation';

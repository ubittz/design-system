'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { RoundSolid } from '../../../icons';

import { SortSelectProps } from './types';

const PANEL_GAP = 4;

export function SortSelect(props: SortSelectProps): React.JSX.Element {
  const { options = [], value, onChange, className, style } = props;

  const [open, setOpen] = useState(false);
  const [panelPos, setPanelPos] = useState<{ top: number; left: number; minWidth: number }>({
    top: 0,
    left: 0,
    minWidth: 0,
  });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const displayLabel = selectedOption ? selectedOption.label : options[0]?.label ?? '';

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPanelPos({
      top: rect.bottom + PANEL_GAP,
      left: rect.left,
      minWidth: rect.width,
    });
  }, []);

  const handleToggle = useCallback(() => {
    setOpen((prev) => {
      if (!prev) updatePosition();
      return !prev;
    });
  }, [updatePosition]);

  const handleSelect = useCallback(
    (optionValue: string) => {
      onChange?.(optionValue);
      setOpen(false);
    },
    [onChange],
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        panelRef.current &&
        !panelRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on external scroll / resize
  useEffect(() => {
    if (!open) return;
    const handleScroll = (e: Event) => {
      if (panelRef.current && panelRef.current.contains(e.target as Node)) return;
      setOpen(false);
    };
    const handleResize = () => setOpen(false);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [open]);

  const triggerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 0,
    paddingRight: 0,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: '-0.28px',
    color: 'var(--semantic-text-default-tertiary)',
    whiteSpace: 'nowrap',
  };

  const iconStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: 'var(--semantic-text-default-tertiary)',
  };

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    top: panelPos.top,
    left: panelPos.left,
    minWidth: panelPos.minWidth,
    background: '#FFFFFF',
    borderRadius: 8,
    boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.05)',
    border: '1px solid var(--semantic-border-default, #F2F4F7)',
    zIndex: 9999,
    overflow: 'hidden',
  };

  return (
    <div className={className} style={{ display: 'inline-flex', ...style }}>
      <button ref={triggerRef} type="button" onClick={handleToggle} style={triggerStyle}>
        <span style={labelStyle}>{displayLabel}</span>
        <span style={iconStyle}>
          <RoundSolid.Bottom size={16} />
        </span>
      </button>

      {open &&
        options.length > 0 &&
        createPortal(
          <div ref={panelRef} style={panelStyle}>
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--semantic-background-default, #F9FAFB)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = '#FFFFFF';
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: '12px 16px',
                    border: 'none',
                    background: '#FFFFFF',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: '22px',
                    letterSpacing: '-0.28px',
                    color: isSelected
                      ? 'var(--component-input-selected-text)'
                      : 'var(--semantic-text-default-tertiary)',
                    textAlign: 'left',
                    boxSizing: 'border-box',
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
}

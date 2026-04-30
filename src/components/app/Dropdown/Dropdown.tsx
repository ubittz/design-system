'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { RoundStroke } from '../../../icons';
import { FormGroup, useFormGroupProps } from '../FormGroup';

import { DropdownProps } from './types';

const PANEL_MAX_HEIGHT = 180;
const PANEL_GAP = 4;

export function Dropdown(props: DropdownProps): React.JSX.Element {
  const {
    formGroupProps,
    shape = 'default',
    placeholder,
    value,
    options = [],
    disabled = false,
    onChange,
    className,
    style,
  } = useFormGroupProps(props);

  const [open, setOpen] = useState(false);
  const [panelPos, setPanelPos] = useState<{ top: number; left: number; width: number; direction: 'down' | 'up' }>({
    top: 0,
    left: 0,
    width: 0,
    direction: 'down',
  });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isError = !!formGroupProps.errorMessage;
  const selectedOption = options.find((o) => o.value === value);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - PANEL_GAP;
    const spaceAbove = rect.top - PANEL_GAP;
    const openUp = spaceBelow < PANEL_MAX_HEIGHT && spaceAbove > spaceBelow;

    setPanelPos({
      top: openUp ? rect.top - PANEL_GAP : rect.bottom + PANEL_GAP,
      left: rect.left,
      width: rect.width,
      direction: openUp ? 'up' : 'down',
    });
  }, []);

  const handleToggle = useCallback(() => {
    if (disabled) return;
    setOpen((prev) => {
      if (!prev) updatePosition();
      return !prev;
    });
  }, [disabled, updatePosition]);

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
        triggerRef.current && !triggerRef.current.contains(target) &&
        panelRef.current && !panelRef.current.contains(target)
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
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', () => setOpen(false));
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', () => setOpen(false));
    };
  }, [open]);

  const getBorderColor = () => {
    if (disabled) return 'var(--component-input-default-border)';
    if (isError) return 'var(--component-input-error-border)';
    if (open) return 'var(--component-input-focused-border)';
    return 'var(--component-input-default-border)';
  };

  const triggerStyle: React.CSSProperties =
    shape === 'line'
      ? {
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          height: 42,
          padding: '10px 8px',
          border: 'none',
          borderBottom: `1px solid ${getBorderColor()}`,
          background: disabled ? 'var(--component-input-disabled-background)' : 'transparent',
          boxSizing: 'border-box',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'border-color 0.2s',
        }
      : {
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          height: 42,
          padding: '10px 12px',
          border: `1px solid ${getBorderColor()}`,
          borderRadius: 4,
          background: disabled
            ? 'var(--component-input-disabled-background)'
            : 'var(--component-input-default-background)',
          boxSizing: 'border-box',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'border-color 0.2s',
        };

  const textColor = disabled
    ? 'var(--component-input-disabled-text)'
    : selectedOption
      ? 'var(--component-input-default-text)'
      : 'var(--component-input-default-placeholder)';

  const iconColor = disabled
    ? 'var(--component-input-disabled-icon)'
    : 'var(--component-input-default-icon)';

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    left: panelPos.left,
    width: panelPos.width,
    maxHeight: PANEL_MAX_HEIGHT,
    overflowY: 'auto',
    borderRadius: 4,
    boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.05)',
    zIndex: 9999,
    ...(panelPos.direction === 'up'
      ? { bottom: window.innerHeight - panelPos.top }
      : { top: panelPos.top }),
  };

  return (
    <FormGroup className={className} style={style} {...formGroupProps}>
      <div style={{ position: 'relative', width: '100%' }}>
        <button ref={triggerRef} type="button" onClick={handleToggle} disabled={disabled} style={triggerStyle}>
          <span
            style={{
              flex: 1,
              minWidth: 0,
              textAlign: 'left',
              fontSize: 14,
              fontWeight: 400,
              lineHeight: '22px',
              letterSpacing: '-0.28px',
              color: textColor,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {selectedOption ? selectedOption.label : (placeholder ?? '')}
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 20,
              height: 20,
              flexShrink: 0,
              color: iconColor,
              transform: open ? 'rotate(180deg)' : undefined,
              transition: 'transform 0.2s',
            }}
          >
            <RoundStroke.Bottom size={20} />
          </span>
        </button>

        {open && options.length > 0 &&
          createPortal(
            <div ref={panelRef} style={panelStyle}>
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: '8px 12px',
                      border: 'none',
                      background: 'var(--component-input-default-background)',
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: '22px',
                      letterSpacing: '-0.28px',
                      color: isSelected
                        ? 'var(--component-input-selected-text)'
                        : 'var(--component-input-default-text)',
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
    </FormGroup>
  );
}

'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { RoundStroke } from '../../../icons';
import { Calendar } from '../Calendar';
import { FormGroup, useFormGroupProps } from '../FormGroup';

import { PickerProps } from './types';

const PANEL_GAP = 4;

function defaultFormatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

function defaultFormatRange(range: [Date, Date]): string {
  return `${defaultFormatDate(range[0])} ~ ${defaultFormatDate(range[1])}`;
}

export function Picker(props: PickerProps): React.JSX.Element {
  const {
    formGroupProps,
    shape = 'default',
    placeholder,
    disabled = false,
    className,
    style,
    ...rest
  } = useFormGroupProps(props);

  const mode = (rest as { mode?: string }).mode ?? 'single';
  const value = rest.value;
  const onChange = rest.onChange;
  const formatDate = (rest as { formatDate?: (date: Date) => string }).formatDate;
  const formatRange = (rest as { formatRange?: (range: [Date, Date]) => string }).formatRange;
  const minDate = (rest as { minDate?: Date }).minDate;
  const maxDate = (rest as { maxDate?: Date }).maxDate;

  const [open, setOpen] = useState(false);
  const [panelPos, setPanelPos] = useState<{ top: number; left: number; direction: 'down' | 'up' }>({
    top: 0,
    left: 0,
    direction: 'down',
  });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isError = !!formGroupProps.errorMessage;

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    // Calendar is ~480px tall, estimate for flip check
    const panelHeight = 480;
    const spaceBelow = window.innerHeight - rect.bottom - PANEL_GAP;
    const spaceAbove = rect.top - PANEL_GAP;
    const openUp = spaceBelow < panelHeight && spaceAbove > spaceBelow;

    setPanelPos({
      top: openUp ? rect.top - PANEL_GAP : rect.bottom + PANEL_GAP,
      left: rect.left,
      direction: openUp ? 'up' : 'down',
    });
  }, []);

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

  const handleToggle = useCallback(() => {
    if (disabled) return;
    setOpen((prev) => {
      if (!prev) updatePosition();
      return !prev;
    });
  }, [disabled, updatePosition]);

  const getDisplayText = (): string | null => {
    if (mode === 'single' && value instanceof Date) {
      return formatDate ? formatDate(value) : defaultFormatDate(value);
    }
    if (mode === 'range' && Array.isArray(value)) {
      return formatRange
        ? formatRange(value as [Date, Date])
        : defaultFormatRange(value as [Date, Date]);
    }
    return null;
  };

  const displayText = getDisplayText();

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
          height: 40,
          padding: '8px 12px',
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
    : displayText
      ? 'var(--component-input-default-text)'
      : 'var(--component-input-default-placeholder)';

  const iconColor = disabled
    ? 'var(--component-input-disabled-icon)'
    : 'var(--component-input-default-icon)';

  const handleCalendarChange = useCallback(
    (dateOrRange: Date | [Date, Date] | null) => {
      if (mode === 'single') {
        (onChange as ((date: Date) => void) | undefined)?.(dateOrRange as Date);
        setOpen(false);
      } else {
        (onChange as ((range: [Date, Date] | null) => void) | undefined)?.(
          dateOrRange as [Date, Date] | null,
        );
        if (dateOrRange) setOpen(false);
      }
    },
    [mode, onChange],
  );

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    left: panelPos.left,
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
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 20,
              height: 20,
              flexShrink: 0,
              color: iconColor,
            }}
          >
            <RoundStroke.Calendar size={20} />
          </span>
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
            {displayText ?? (placeholder ?? '')}
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

        {open &&
          createPortal(
            <div ref={panelRef} style={panelStyle}>
              {mode === 'single' ? (
                <Calendar
                  mode="single"
                  value={(value as Date | null) ?? null}
                  onChange={handleCalendarChange as (date: Date) => void}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              ) : (
                <Calendar
                  mode="range"
                  value={(value as [Date, Date] | null) ?? null}
                  onChange={handleCalendarChange as (range: [Date, Date] | null) => void}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              )}
            </div>,
            document.body,
          )}
      </div>
    </FormGroup>
  );
}

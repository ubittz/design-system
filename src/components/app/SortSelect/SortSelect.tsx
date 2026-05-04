'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '../../../utils/cn';
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
  const displayLabel = selectedOption ? selectedOption.label : (options[0]?.label ?? '');

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
    [onChange]
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current && !triggerRef.current.contains(target) && panelRef.current && !panelRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

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

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    top: panelPos.top,
    left: panelPos.left,
    minWidth: panelPos.minWidth,
    zIndex: 9999,
  };

  return (
    <div className={cn('inline-flex', className)} style={style}>
      <button
        ref={triggerRef}
        type='button'
        onClick={handleToggle}
        className='flex items-center gap-1 py-1 px-0 border-0 bg-transparent cursor-pointer'
      >
        <span className='text-sm font-normal leading-[22px] tracking-[-0.28px] text-[var(--semantic-text-default-tertiary)] whitespace-nowrap'>
          {displayLabel}
        </span>
        <span className='inline-flex items-center justify-center shrink-0 text-[var(--semantic-text-default-tertiary)]'>
          <RoundSolid.Bottom size={16} />
        </span>
      </button>

      {open &&
        options.length > 0 &&
        createPortal(
          <div
            ref={panelRef}
            className='bg-white rounded-lg shadow-[0px_0px_10px_4px_rgba(0,0,0,0.05)] border border-[var(--semantic-border-default,#F2F4F7)] overflow-hidden'
            style={panelStyle}
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type='button'
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--semantic-background-default, #F9FAFB)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = '#FFFFFF';
                  }}
                  className='flex items-center w-full px-4 py-3 border-0 bg-white cursor-pointer text-sm font-normal leading-[22px] tracking-[-0.28px] text-left'
                  style={{
                    color: isSelected ? 'var(--component-input-selected-text)' : 'var(--semantic-text-default-tertiary)',
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
}

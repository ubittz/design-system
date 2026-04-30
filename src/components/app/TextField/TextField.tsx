'use client';

import React, { useState, useCallback, useRef } from 'react';

import { FormGroup, useFormGroupProps } from '../FormGroup';

import { TextFieldProps } from './types';

function extractDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function getMaxDigits(format: string): number {
  return (format.match(/d/g) || []).length;
}

function applyFormat(digits: string, format: string): string {
  let result = '';
  let digitIndex = 0;
  for (let i = 0; i < format.length && digitIndex < digits.length; i++) {
    if (format[i] === 'd') {
      result += digits[digitIndex++];
    } else {
      result += format[i];
    }
  }
  return result;
}

export function TextField({
  shape = 'default',
  unit,
  format,
  ...props
}: TextFieldProps): React.JSX.Element {
  const { formGroupProps, className, style, onFocus, onBlur, onChange, inputMode, ...inputProps } =
    useFormGroupProps(props);

  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isError = !!formGroupProps.errorMessage;
  const isDisabled = !!inputProps.disabled;

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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (format) {
        const digits = extractDigits(e.target.value).slice(0, getMaxDigits(format));
        const formatted = applyFormat(digits, format);
        e.target.value = formatted;

        const cursorPos = formatted.length;
        requestAnimationFrame(() => {
          inputRef.current?.setSelectionRange(cursorPos, cursorPos);
        });
      }
      onChange?.(e);
    },
    [format, onChange],
  );

  const resolvedInputMode = format ? inputMode ?? 'numeric' : inputMode;

  const getBorderColor = () => {
    if (isDisabled) return 'var(--component-input-default-border)';
    if (isError) return 'var(--component-input-error-border)';
    if (focused) return 'var(--component-input-focused-border)';
    return 'var(--component-input-default-border)';
  };

  const containerStyle: React.CSSProperties =
    shape === 'line'
      ? {
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          height: 40,
          padding: 8,
          borderBottom: `1px solid ${getBorderColor()}`,
          background: isDisabled ? 'var(--component-input-disabled-background)' : 'transparent',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s',
        }
      : {
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          height: 40,
          padding: '0 12px',
          border: `1px solid ${getBorderColor()}`,
          borderRadius: 4,
          background: isDisabled
            ? 'var(--component-input-disabled-background)'
            : 'var(--component-input-default-background)',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s',
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
    color: isDisabled
      ? 'var(--component-input-disabled-text)'
      : 'var(--component-input-default-text)',
  };

  return (
    <FormGroup className={className} style={style} {...formGroupProps}>
      <div style={containerStyle}>
        <input
          ref={inputRef}
          className="ds-textfield"
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          inputMode={resolvedInputMode}
          {...inputProps}
        />
        {unit && (
          <span
            style={{
              flexShrink: 0,
              fontSize: 14,
              fontWeight: 400,
              lineHeight: '22px',
              letterSpacing: '-0.02em',
              color: isDisabled
                ? 'var(--component-input-disabled-text)'
                : 'var(--component-input-default-text)',
            }}
          >
            {unit}
          </span>
        )}
      </div>
    </FormGroup>
  );
}

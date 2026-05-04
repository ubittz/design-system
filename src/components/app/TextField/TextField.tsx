'use client';

import React, { useState, useCallback, useRef } from 'react';

import { cn } from '../../../utils/cn';
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

export function TextField({ shape = 'default', unit, format, ...props }: TextFieldProps): React.JSX.Element {
  const { formGroupProps, className, style, onFocus, onBlur, onChange, inputMode, ...inputProps } = useFormGroupProps(props);

  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isError = !!formGroupProps.errorMessage;
  const isDisabled = !!inputProps.disabled;

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
    [format, onChange]
  );

  const resolvedInputMode = format ? (inputMode ?? 'numeric') : inputMode;

  const getBorderColor = () => {
    if (isDisabled) return 'var(--component-input-default-border)';
    if (isError) return 'var(--component-input-error-border)';
    if (focused) return 'var(--component-input-focused-border)';
    return 'var(--component-input-default-border)';
  };

  return (
    <FormGroup className={className} style={style} {...formGroupProps}>
      <div
        className={cn(
          'flex items-center gap-2 w-full h-10 transition-[border-color] duration-200',
          shape === 'line' ? 'p-2' : 'px-3 rounded',
          isDisabled && 'bg-[var(--component-input-disabled-background)]',
          !isDisabled && shape !== 'line' && 'bg-[var(--component-input-default-background)]',
          !isDisabled && shape === 'line' && 'bg-transparent'
        )}
        style={{
          ...(shape === 'line' ? { borderBottom: `1px solid ${getBorderColor()}` } : { border: `1px solid ${getBorderColor()}` }),
        }}
      >
        <input
          ref={inputRef}
          className={cn(
            'ds-textfield flex-1 w-full min-w-0 border-0 outline-none bg-transparent p-0 text-sm font-normal leading-[22px] tracking-[-0.02em]',
            isDisabled ? 'text-[var(--component-input-disabled-text)]' : 'text-[var(--component-input-default-text)]'
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          inputMode={resolvedInputMode}
          {...inputProps}
        />
        {unit && (
          <span
            className={cn(
              'shrink-0 text-sm font-normal leading-[22px] tracking-[-0.02em]',
              isDisabled ? 'text-[var(--component-input-disabled-text)]' : 'text-[var(--component-input-default-text)]'
            )}
          >
            {unit}
          </span>
        )}
      </div>
    </FormGroup>
  );
}

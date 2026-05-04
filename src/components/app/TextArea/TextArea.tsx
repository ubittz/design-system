'use client';

import React, { useState, useCallback } from 'react';

import { cn } from '../../../utils/cn';
import { FormGroup, useFormGroupProps } from '../FormGroup';

import { TextAreaProps } from './types';

export function TextArea({ shape = 'default', ...props }: TextAreaProps): React.JSX.Element {
  const { formGroupProps, className, style, onFocus, onBlur, ...textareaProps } = useFormGroupProps(props);

  const [focused, setFocused] = useState(false);
  const isError = !!formGroupProps.errorMessage;
  const isDisabled = !!textareaProps.disabled;

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur]
  );

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
          'flex w-full h-[140px] py-2 px-3 transition-[border-color] duration-200',
          shape === 'square' ? 'rounded-none' : 'rounded',
          isDisabled ? 'bg-[var(--component-input-disabled-background)]' : 'bg-[var(--component-input-default-background)]'
        )}
        style={{ border: `1px solid ${getBorderColor()}` }}
      >
        <textarea
          className={cn(
            'ds-textfield flex-1 w-full min-w-0 h-full border-0 outline-none bg-transparent p-0 resize-none text-sm font-normal leading-[22px] tracking-[-0.02em] font-[inherit]',
            isDisabled ? 'text-[var(--component-input-disabled-text)]' : 'text-[var(--component-input-default-text)]'
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...textareaProps}
        />
      </div>
    </FormGroup>
  );
}

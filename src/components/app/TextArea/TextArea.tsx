'use client';

import React, { useState, useCallback } from 'react';

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
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  const getBorderColor = () => {
    if (isDisabled) return 'var(--component-input-default-border)';
    if (isError) return 'var(--component-input-error-border)';
    if (focused) return 'var(--component-input-focused-border)';
    return 'var(--component-input-default-border)';
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    height: 140,
    padding: '8px 12px',
    border: `1px solid ${getBorderColor()}`,
    borderRadius: shape === 'square' ? 0 : 4,
    background: isDisabled
      ? 'var(--component-input-disabled-background)'
      : 'var(--component-input-default-background)',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  const textareaStyle: React.CSSProperties = {
    flex: 1,
    width: '100%',
    minWidth: 0,
    height: '100%',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    padding: 0,
    resize: 'none',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: '-0.02em',
    fontFamily: 'inherit',
    color: isDisabled
      ? 'var(--component-input-disabled-text)'
      : 'var(--component-input-default-text)',
  };

  return (
    <FormGroup className={className} style={style} {...formGroupProps}>
      <div style={containerStyle}>
        <textarea
          className="ds-textfield"
          style={textareaStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...textareaProps}
        />
      </div>
    </FormGroup>
  );
}

'use client';

import React from 'react';

import { Button } from '../Button';

import { FormGroupProps } from './types';

interface FormGroupComponentProps extends FormGroupProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function FormGroup({
  label,
  required,
  caption,
  errorMessage,
  buttonProps,
  timerContent,
  children,
  className,
  style,
}: FormGroupComponentProps): React.JSX.Element {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: '100%',
        ...style,
      }}
    >
      {label && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '22px',
            letterSpacing: '-0.02em',
            color: 'var(--component-input-default-label)',
          }}
        >
          {label}
          {required && (
            <span style={{ color: 'var(--component-input-error-caption)' }}>*</span>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
        <div style={{ position: 'relative', width: '100%', flex: 1 }}>
          {children}
          {timerContent && (
            <div
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 14,
                fontWeight: 400,
                lineHeight: '22px',
                letterSpacing: '-0.02em',
                color: 'var(--component-input-default-caption)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              {timerContent}
            </div>
          )}
        </div>
        {buttonProps && <Button size="m" {...buttonProps} />}
      </div>

      {caption && !errorMessage && (
        <div
          style={{
            fontSize: 12,
            fontWeight: 400,
            lineHeight: '20px',
            letterSpacing: '-0.02em',
            color: 'var(--component-input-default-caption)',
          }}
        >
          {caption}
        </div>
      )}

      {errorMessage && (
        <div
          style={{
            fontSize: 12,
            fontWeight: 400,
            lineHeight: '20px',
            letterSpacing: '-0.02em',
            color: 'var(--component-input-error-caption)',
          }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}

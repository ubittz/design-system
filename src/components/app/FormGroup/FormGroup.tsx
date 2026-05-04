'use client';

import React from 'react';

import { cn } from '../../../utils/cn';
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
    <div className={cn('flex flex-col gap-2 w-full', className)} style={style}>
      {label && (
        <div className='flex items-center gap-0.5 text-sm font-normal leading-[22px] tracking-[-0.02em] text-[var(--component-input-default-label)]'>
          {label}
          {required && <span className='text-[var(--component-input-error-caption)]'>*</span>}
        </div>
      )}

      <div className='flex gap-2 items-stretch'>
        <div className='relative w-full flex-1'>
          {children}
          {timerContent && (
            <div className='absolute right-3 top-1/2 -translate-y-1/2 text-sm font-normal leading-[22px] tracking-[-0.02em] text-[var(--component-input-default-caption)] pointer-events-none z-[1]'>
              {timerContent}
            </div>
          )}
        </div>
        {buttonProps && <Button size='m' {...buttonProps} />}
      </div>

      {caption && !errorMessage && (
        <div className='text-xs font-normal leading-5 tracking-[-0.02em] text-[var(--component-input-default-caption)]'>{caption}</div>
      )}

      {errorMessage && (
        <div className='text-xs font-normal leading-5 tracking-[-0.02em] text-[var(--component-input-error-caption)]'>{errorMessage}</div>
      )}
    </div>
  );
}

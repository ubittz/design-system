'use client';

import React, { useCallback, useRef } from 'react';

import { ImageUploaderProps } from './types';
import { RoundSolid } from '../../../icons';
import { cn } from '../../../utils/cn';

export function ImageUploader({
  value = [],
  maxCount = 10,
  accept = 'image/*',
  disabled = false,
  onClick,
  onChange,
  className,
  style,
}: ImageUploaderProps): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    if (disabled || value.length >= maxCount) return;
    if (onClick) {
      onClick();
    } else {
      inputRef.current?.click();
    }
  }, [disabled, value.length, maxCount, onClick]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      if (!fileList || fileList.length === 0) return;

      const remaining = maxCount - value.length;
      const files = Array.from(fileList).slice(0, remaining);

      const newImages = files.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        file,
        url: URL.createObjectURL(file),
        name: file.name,
      }));

      onChange?.([...value, ...newImages]);
      e.target.value = '';
    },
    [value, maxCount, onChange]
  );

  const handleRemove = useCallback(
    (id: string) => {
      const target = value.find((f) => f.id === id);
      if (target?.file) URL.revokeObjectURL(target.url);
      onChange?.(value.filter((f) => f.id !== id));
    },
    [value, onChange]
  );

  const isFull = value.length >= maxCount;

  return (
    <div className={cn('flex flex-wrap items-start content-start gap-y-3 gap-x-2', className)} style={style}>
      <input ref={inputRef} type='file' accept={accept} multiple onChange={handleFileChange} className='hidden' />

      <button
        type='button'
        onClick={handleClick}
        disabled={disabled || isFull}
        className={cn(
          'flex flex-col items-center justify-center w-[76px] h-[76px] px-[22px] py-3 border border-[var(--component-input-default-border)] rounded bg-transparent shrink-0',
          disabled || isFull ? 'cursor-not-allowed' : 'cursor-pointer',
          disabled && 'opacity-50'
        )}
      >
        <span className='inline-flex text-[var(--component-input-default-icon)]'>
          <RoundSolid.Camera size={24} />
        </span>
        <span className='text-[10px] font-normal leading-4 text-[#aeb1b7] text-center'>
          ({value.length}/{maxCount})
        </span>
      </button>

      {value.map((image) => (
        <div key={image.id} className='flex flex-col items-start gap-1 shrink-0'>
          <div className='relative w-[76px] h-[76px] rounded overflow-hidden shrink-0'>
            <img src={image.url} alt={image.name} className='w-full h-full object-cover block bg-[var(--color-gray-50,#f1f2f3)]' />
            <button
              type='button'
              onClick={() => handleRemove(image.id)}
              className='absolute top-1 right-1 w-5 h-5 p-0 border-0 bg-transparent cursor-pointer inline-flex items-center justify-center text-[#cbcfd7]'
            >
              <RoundSolid.CircleCancel size={20} />
            </button>
          </div>
          <span className='text-[10px] font-normal leading-4 text-[#aeb1b7] w-[76px] overflow-hidden text-ellipsis whitespace-nowrap'>
            {image.name}
          </span>
        </div>
      ))}
    </div>
  );
}

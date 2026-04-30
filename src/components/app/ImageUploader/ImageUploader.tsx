'use client';

import React, { useCallback, useRef } from 'react';

import { ImageUploaderProps } from './types';
import { RoundSolid } from '../../../icons';

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

      // Reset input so same file can be re-selected
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
    <div className={className} style={{ ...containerStyle, ...style }}>
      <input ref={inputRef} type='file' accept={accept} multiple onChange={handleFileChange} style={{ display: 'none' }} />

      {/* Upload Button */}
      <button
        type='button'
        onClick={handleClick}
        disabled={disabled || isFull}
        style={{
          ...uploadButtonStyle,
          cursor: disabled || isFull ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <span style={{ display: 'inline-flex', color: 'var(--component-input-default-icon)' }}>
          <RoundSolid.Camera size={24} />
        </span>
        <span style={countTextStyle}>
          ({value.length}/{maxCount})
        </span>
      </button>

      {/* Uploaded Files */}
      {value.map((image) => (
        <div key={image.id} style={fileWrapperStyle}>
          <div style={thumbnailContainerStyle}>
            <img src={image.url} alt={image.name} style={thumbnailImageStyle} />
            <button type='button' onClick={() => handleRemove(image.id)} style={removeButtonStyle}>
              <RoundSolid.CircleCancel size={20} />
            </button>
          </div>
          <span style={fileNameStyle}>{image.name}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Styles
// ============================================================================

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  alignContent: 'flex-start',
  rowGap: 12,
  columnGap: 8,
};

const uploadButtonStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 76,
  height: 76,
  padding: '12px 22px',
  border: '1px solid var(--component-input-default-border)',
  borderRadius: 4,
  background: 'transparent',
  boxSizing: 'border-box',
  flexShrink: 0,
};

const countTextStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 400,
  lineHeight: '16px',
  color: '#aeb1b7',
  textAlign: 'center',
};

const fileWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 4,
  flexShrink: 0,
};

const thumbnailContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: 76,
  height: 76,
  borderRadius: 4,
  overflow: 'hidden',
  flexShrink: 0,
};

const thumbnailImageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  background: 'var(--color-gray-50, #f1f2f3)',
};

const removeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: 4,
  right: 4,
  width: 20,
  height: 20,
  padding: 0,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#cbcfd7',
};

const fileNameStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 400,
  lineHeight: '16px',
  color: '#aeb1b7',
  width: 76,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

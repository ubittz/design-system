'use client';

import React, { useCallback, useEffect } from 'react';

import { createPortal } from 'react-dom';

import { PopupProps } from './types';
import { cn } from '../../../utils/cn';
import { Button } from '../Button';

export function Popup({
  open = false,
  title,
  body,
  confirmButton,
  cancelButton,
  onBackdropClick,
  className,
  style,
}: PopupProps): React.JSX.Element | null {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onBackdropClick?.();
      }
    },
    [onBackdropClick]
  );

  if (!open) return null;

  const {
    label: confirmLabel = '확인',
    variant: confirmVariant = 'primary',
    size: confirmSize = 'm',
    style: confirmStyle,
    ...confirmRest
  } = confirmButton ?? {};

  const renderCancel = !!cancelButton;
  const {
    label: cancelLabel = '취소',
    variant: cancelVariant = 'gray',
    size: cancelSize = 'm',
    style: cancelStyle,
    ...cancelRest
  } = cancelButton ?? {};

  return createPortal(
    <div className='fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]' onClick={handleBackdropClick}>
      <div
        className={cn('flex flex-col w-[284px] min-h-[200px] rounded-xl bg-[var(--component-modal-background)] overflow-hidden', className)}
        style={style}
      >
        <div className='flex-1 flex flex-col items-center justify-center gap-2 px-8 pt-7 pb-3 text-center'>
          <div className='w-full text-lg font-bold leading-[26px] tracking-[-0.36px] text-[var(--component-modal-title)]'>{title}</div>
          {body && <div className='w-full text-sm font-normal leading-[22px] tracking-[-0.28px] text-[var(--component-modal-body)]'>{body}</div>}
        </div>

        <div className='flex items-center justify-center gap-2 px-6 pt-3 pb-6 shrink-0'>
          {renderCancel && (
            <Button variant={cancelVariant} size={cancelSize} {...cancelRest} className='flex-1 min-w-0' style={cancelStyle}>
              {cancelLabel}
            </Button>
          )}
          <Button variant={confirmVariant} size={confirmSize} {...confirmRest} className='flex-1 min-w-0' style={confirmStyle}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}

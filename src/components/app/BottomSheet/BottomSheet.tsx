'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import { BottomSheetProps } from './types';
import { RoundStroke } from '../../../icons';
import { cn } from '../../../utils/cn';
import { FullButton } from '../Button';

export function BottomSheet({
  open = false,
  title,
  showClose = false,
  button,
  onClose,
  children,
  className,
  style,
}: BottomSheetProps): React.JSX.Element | null {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (open) {
      setVisible(true);
      timerRef.current = setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      timerRef.current = setTimeout(() => setVisible(false), 300);
    }
    return () => clearTimeout(timerRef.current);
  }, [open]);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose?.();
      }
    },
    [onClose]
  );

  if (!visible) return null;

  const hasHeader = !!title || showClose;

  const { label: buttonLabel, variant: buttonVariant = 'primary', style: buttonStyle, ...buttonRest } = button ?? {};

  return createPortal(
    <div
      className='fixed inset-0 flex items-end justify-center bg-black/40 z-[9999] transition-opacity duration-300 ease-in-out'
      style={{ opacity: animate ? 1 : 0 }}
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          'flex flex-col w-full max-w-[480px] max-h-[90vh] rounded-t-xl bg-[var(--component-modal-background)] transition-transform duration-300 ease-in-out',
          className
        )}
        style={{
          transform: animate ? 'translateY(0)' : 'translateY(100%)',
          ...style,
        }}
      >
        <div className='flex items-center justify-center py-4 shrink-0'>
          <div className='w-10 h-1 rounded-[27px] bg-[#f1f2f3]' />
        </div>

        {hasHeader && (
          <div className='flex items-center h-14 px-4 py-3 shrink-0 gap-[10px]'>
            <div className='flex-1 min-w-0 text-lg font-medium leading-[26px] tracking-[-0.36px] text-[var(--component-navigation-default-title)]'>
              {title}
            </div>
            {showClose && (
              <button
                type='button'
                onClick={onClose}
                className='inline-flex items-center justify-center w-6 h-6 p-0 border-0 bg-transparent cursor-pointer shrink-0 text-[var(--component-navigation-default-iconPrimary)]'
              >
                <RoundStroke.Cancel size={24} />
              </button>
            )}
          </div>
        )}

        <div className='flex-1 min-h-0 overflow-y-auto'>{children}</div>

        {button && (
          <div className='px-4 py-2 shrink-0'>
            <FullButton variant={buttonVariant} {...buttonRest} style={buttonStyle}>
              {buttonLabel}
            </FullButton>
          </div>
        )}

        <div className='h-6 shrink-0' />
      </div>
    </div>,
    document.body
  );
}

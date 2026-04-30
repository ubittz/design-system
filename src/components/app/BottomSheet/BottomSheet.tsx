'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import { BottomSheetProps } from './types';
import { FullButton } from '../Button';
import { RoundStroke } from '../../../icons';

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

  // Open: mount → next frame animate in
  // Close: animate out → unmount
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

  // Prevent body scroll
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
    [onClose],
  );

  if (!visible) return null;

  const hasHeader = !!title || showClose;

  const {
    label: buttonLabel,
    variant: buttonVariant = 'primary',
    style: buttonStyle,
    ...buttonRest
  } = button ?? {};

  return createPortal(
    <div
      style={{
        ...overlayStyle,
        opacity: animate ? 1 : 0,
      }}
      onClick={handleBackdropClick}
    >
      <div
        className={className}
        style={{
          ...sheetStyle,
          transform: animate ? 'translateY(0)' : 'translateY(100%)',
          ...style,
        }}
      >
        {/* Grabber */}
        <div style={grabberAreaStyle}>
          <div style={grabberBarStyle} />
        </div>

        {/* Header */}
        {hasHeader && (
          <div style={headerStyle}>
            <div style={titleStyle}>{title}</div>
            {showClose && (
              <button type="button" onClick={onClose} style={closeButtonStyle}>
                <RoundStroke.Cancel size={24} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div style={contentStyle}>{children}</div>

        {/* Button */}
        {button && (
          <div style={buttonAreaStyle}>
            <FullButton variant={buttonVariant} {...buttonRest} style={buttonStyle}>
              {buttonLabel}
            </FullButton>
          </div>
        )}

        {/* Bottom Safe Area */}
        <div style={safeAreaStyle} />
      </div>
    </div>,
    document.body,
  );
}

// ============================================================================
// Styles
// ============================================================================

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  background: 'rgba(0, 0, 0, 0.4)',
  zIndex: 9999,
  transition: 'opacity 0.3s ease',
};

const sheetStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 480,
  maxHeight: '90vh',
  borderRadius: '12px 12px 0 0',
  background: 'var(--component-modal-background)',
  boxSizing: 'border-box',
  transition: 'transform 0.3s ease',
};

const grabberAreaStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px 0',
  flexShrink: 0,
};

const grabberBarStyle: React.CSSProperties = {
  width: 40,
  height: 4,
  borderRadius: 27,
  background: '#f1f2f3',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  height: 56,
  padding: '12px 16px',
  flexShrink: 0,
  boxSizing: 'border-box',
  gap: 10,
};

const titleStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  fontSize: 18,
  fontWeight: 500,
  lineHeight: '26px',
  letterSpacing: '-0.36px',
  color: 'var(--component-navigation-default-title)',
};

const closeButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  padding: 0,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  flexShrink: 0,
  color: 'var(--component-navigation-default-iconPrimary)',
};

const contentStyle: React.CSSProperties = {
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
};

const buttonAreaStyle: React.CSSProperties = {
  padding: '8px 16px',
  flexShrink: 0,
  boxSizing: 'border-box',
};

const safeAreaStyle: React.CSSProperties = {
  height: 24,
  flexShrink: 0,
};

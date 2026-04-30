'use client';

import React, { useCallback, useEffect } from 'react';

import { createPortal } from 'react-dom';

import { PopupProps } from './types';
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
  // Prevent body scroll when open
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
    <div style={overlayStyle} onClick={handleBackdropClick}>
      <div className={className} style={{ ...cardStyle, ...style }}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={titleStyle}>{title}</div>
          {body && <div style={bodyStyle}>{body}</div>}
        </div>

        {/* Action */}
        <div style={actionStyle}>
          {renderCancel && (
            <Button variant={cancelVariant} size={cancelSize} {...cancelRest} style={{ ...actionButtonStyle, ...cancelStyle }}>
              {cancelLabel}
            </Button>
          )}
          <Button variant={confirmVariant} size={confirmSize} {...confirmRest} style={{ ...actionButtonStyle, ...confirmStyle }}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ============================================================================
// Styles
// ============================================================================

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0, 0, 0, 0.4)',
  zIndex: 9999,
};

const cardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: 284,
  minHeight: 200,
  borderRadius: 12,
  background: 'var(--component-modal-background)',
  overflow: 'hidden',
  boxSizing: 'border-box',
};

const headerStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '28px 32px 12px',
  textAlign: 'center',
  boxSizing: 'border-box',
};

const titleStyle: React.CSSProperties = {
  width: '100%',
  fontSize: 18,
  fontWeight: 700,
  lineHeight: '26px',
  letterSpacing: '-0.36px',
  color: 'var(--component-modal-title)',
};

const bodyStyle: React.CSSProperties = {
  width: '100%',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '22px',
  letterSpacing: '-0.28px',
  color: 'var(--component-modal-body)',
};

const actionStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '12px 24px 24px',
  flexShrink: 0,
  boxSizing: 'border-box',
};

const actionButtonStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
};

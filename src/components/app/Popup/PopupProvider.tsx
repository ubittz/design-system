'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { PopupContextValue, PopupOptions } from './types';
import { Popup } from './Popup';

const PopupContext = createContext<PopupContextValue | null>(null);

export function PopupProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [options, setOptions] = useState<PopupOptions | null>(null);

  const close = useCallback(() => {
    setOptions(null);
  }, []);

  const open = useCallback((opts: PopupOptions) => {
    setOptions(opts);
  }, []);

  const contextValue = useMemo(() => ({ open, close }), [open, close]);

  // Wrap button onClick to auto-close after callback
  const wrapOnClick = useCallback(
    (onClick?: () => void) => {
      return () => {
        onClick?.();
        close();
      };
    },
    [close],
  );

  const popupProps = options
    ? {
        ...options,
        open: true,
        onBackdropClick: wrapOnClick(options.onBackdropClick),
        confirmButton: options.confirmButton
          ? { ...options.confirmButton, onClick: wrapOnClick(options.confirmButton.onClick) }
          : undefined,
        cancelButton: options.cancelButton
          ? { ...options.cancelButton, onClick: wrapOnClick(options.cancelButton.onClick) }
          : undefined,
      }
    : null;

  return (
    <PopupContext.Provider value={contextValue}>
      {children}
      {popupProps && <Popup {...popupProps} />}
    </PopupContext.Provider>
  );
}

export function usePopup(): PopupContextValue {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
}

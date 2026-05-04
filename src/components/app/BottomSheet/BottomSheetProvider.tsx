'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { BottomSheet } from './BottomSheet';
import { BottomSheetContextValue, BottomSheetOptions } from './types';

const BottomSheetContext = createContext<BottomSheetContextValue | null>(null);

export function BottomSheetProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [options, setOptions] = useState<BottomSheetOptions | null>(null);

  const close = useCallback(() => {
    setOptions(null);
  }, []);

  const open = useCallback((opts: BottomSheetOptions) => {
    setOptions(opts);
  }, []);

  const contextValue = useMemo(() => ({ open, close }), [open, close]);

  const wrapOnClick = useCallback(
    (onClick?: () => void) => {
      return () => {
        onClick?.();
        close();
      };
    },
    [close]
  );

  const sheetProps = options
    ? {
        ...options,
        open: true,
        onClose: wrapOnClick(options.onClose),
        button: options.button ? { ...options.button, onClick: wrapOnClick(options.button.onClick) } : undefined,
      }
    : null;

  return (
    <BottomSheetContext.Provider value={contextValue}>
      {children}
      {sheetProps && <BottomSheet {...sheetProps}>{sheetProps.content}</BottomSheet>}
    </BottomSheetContext.Provider>
  );
}

export function useBottomSheet(): BottomSheetContextValue {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
}

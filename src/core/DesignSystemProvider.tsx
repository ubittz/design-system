import { createContext, useContext, useMemo } from 'react';

import type { DesignSystemConfig, DesignSystemContextValue } from './types';
import { semanticColors } from '../tokens/colors';

const defaultConfig: DesignSystemContextValue = {
  platform: 'web',
  defaultLang: 'kr',
  theme: {
    brand: semanticColors.brand,
  },
};

const DesignSystemContext = createContext<DesignSystemContextValue>(defaultConfig);

export function DesignSystemProvider({ platform = 'web', defaultLang = 'kr', theme, children }: DesignSystemConfig & { children: React.ReactNode }) {
  const mergedTheme = useMemo(
    () => ({
      brand: {
        primary: {
          ...semanticColors.brand.primary,
          ...theme?.brand?.primary,
        },
        secondary: {
          ...semanticColors.brand.secondary,
          ...theme?.brand?.secondary,
        },
      },
    }),
    [theme]
  );

  const contextValue = useMemo(
    () => ({
      platform,
      defaultLang,
      theme: mergedTheme,
    }),
    [platform, defaultLang, mergedTheme]
  );

  const generateColorScaleVars = (prefix: string, colors: Record<string, string>) => {
    return Object.entries(colors)
      .map(([key, value]) => `--color-brand-${prefix}-${key}: ${value};`)
      .join('\n          ');
  };

  return (
    <DesignSystemContext.Provider value={contextValue}>
      <style>{`
        :root {
          ${generateColorScaleVars('primary', mergedTheme.brand.primary)}
          ${generateColorScaleVars('secondary', mergedTheme.brand.secondary)}
        }
      `}</style>
      {children}
    </DesignSystemContext.Provider>
  );
}

export const useDesignSystem = () => {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within DesignSystemProvider');
  }
  return context;
};

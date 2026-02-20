import { createContext, useContext, useMemo } from 'react';

import type { DesignSystemConfig, DesignSystemContextValue } from './types';
import { defaultSemanticColors, componentTokens } from '../tokens/colors';
import { resolveTokenReferences, tokensToCSSVariables } from '../tokens/resolveTokens';

const defaultConfig: DesignSystemContextValue = {
  platform: 'web',
  defaultLang: 'kr',
  theme: {
    semanticColors: defaultSemanticColors,
  },
  resolvedSemanticColors: defaultSemanticColors,
};

const DesignSystemContext = createContext<DesignSystemContextValue>(defaultConfig);

export function DesignSystemProvider({
  platform = 'web',
  defaultLang = 'kr',
  theme,
  children,
}: DesignSystemConfig & { children: React.ReactNode }) {
  const contextValue = useMemo(() => {
    // 1. Semantic Colors 병합 (사용자 오버라이드 적용)
    const mergedSemanticColors = theme?.semanticColors
      ? deepMerge(defaultSemanticColors, theme.semanticColors)
      : defaultSemanticColors;

    // 2. Semantic Colors의 참조 해결 (brand.primary.500 등)
    const resolvedSemanticColors = resolveTokenReferences(mergedSemanticColors);

    // 3. Component Tokens의 참조 해결 (semantic colors 기반)
    const resolvedComponentTokens = resolveTokenReferences(componentTokens, resolvedSemanticColors);

    return {
      platform,
      defaultLang,
      theme: {
        semanticColors: mergedSemanticColors,
      },
      resolvedSemanticColors,
      resolvedComponentTokens,
    };
  }, [platform, defaultLang, theme]);

  // CSS Variables 생성
  const cssVariables = useMemo(() => {
    const semanticVars = tokensToCSSVariables(contextValue.resolvedSemanticColors, 'semantic');
    const componentVars = tokensToCSSVariables(contextValue.resolvedComponentTokens, 'component');

    return `:root {\n          ${semanticVars}\n\n          ${componentVars}\n        }`;
  }, [contextValue.resolvedSemanticColors, contextValue.resolvedComponentTokens]);

  return (
    <DesignSystemContext.Provider value={contextValue}>
      <style>{cssVariables}</style>
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

/**
 * 깊은 병합 (Deep Merge)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge<T extends Record<string, any>>(target: T, source: any): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = { ...target };

  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = result[key];

    if (
      sourceValue &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === 'object' &&
      !Array.isArray(targetValue)
    ) {
      result[key] = deepMerge(targetValue, sourceValue);
    } else if (sourceValue !== undefined) {
      result[key] = sourceValue;
    }
  }

  return result;
}

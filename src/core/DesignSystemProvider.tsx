import { createContext, useContext, useMemo } from 'react';

import type { BaseColorLevel, DesignSystemConfig, DesignSystemContextValue } from './types';
import { baseColors, defaultSemanticColors, componentTokens } from '../tokens/colors';
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

export function DesignSystemProvider({ platform = 'web', defaultLang = 'kr', baseColorLevel, theme, children }: DesignSystemConfig & { children: React.ReactNode }) {
  const contextValue = useMemo(() => {
    // 0. baseColorLevel이 지정되면 brand.primary.500에 해당 레벨의 색상 적용
    const baseColorOverride = buildBaseColorOverride(baseColorLevel);
    const themeWithBaseColor = baseColorOverride
      ? { ...theme, semanticColors: deepMerge(theme?.semanticColors ?? {}, baseColorOverride) }
      : theme;

    // 1. Semantic Colors 병합 (사용자 오버라이드 적용)
    const mergedSemanticColors = themeWithBaseColor?.semanticColors ? deepMerge(defaultSemanticColors, themeWithBaseColor.semanticColors) : defaultSemanticColors;

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
  }, [platform, defaultLang, baseColorLevel, theme]);

  // CSS Variables 생성 ([data-ds-provider]에 스코프하여 tokens.css :root보다 우선)
  const cssVariables = useMemo(() => {
    const semanticVars = tokensToCSSVariables(contextValue.resolvedSemanticColors, 'color');
    const componentVars = tokensToCSSVariables(contextValue.resolvedComponentTokens, 'component');

    return `[data-ds-provider] {\n          ${semanticVars}\n\n          ${componentVars}\n        }`;
  }, [contextValue.resolvedSemanticColors, contextValue.resolvedComponentTokens]);

  return (
    <DesignSystemContext.Provider value={contextValue}>
      <div data-ds-provider style={{ display: 'contents' }}>
        <style>{cssVariables}</style>
        {children}
      </div>
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
 * baseColorLevel에 따라 brand.primary.500을 오버라이드하는 객체 생성
 * 예: baseColorLevel=600 → brand.primary.500에 sky[600] 적용
 */
function buildBaseColorOverride(level?: BaseColorLevel) {
  if (level === undefined || level === 500) return undefined;
  return {
    brand: {
      primary: {
        500: baseColors.sky[level],
      },
    },
  };
}

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

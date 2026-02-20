import type { DeepPartial } from '../core/types';

type TokenValue = string | Record<string, unknown>;

/**
 * 토큰 참조({token.path})를 실제 색상 값으로 변환합니다.
 * @param tokens - 참조를 포함한 토큰 객체
 * @param customSemanticColors - 사용자가 오버라이드한 semantic colors
 * @returns 모든 참조가 해결된 토큰 객체
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveTokenReferences<T extends Record<string, any>>(
  tokens: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customSemanticColors?: DeepPartial<any>
): T {
  const resolvedCache = new Map<string, string>();

  // 1단계: semantic colors 병합
  const semanticColors = customSemanticColors
    ? deepMerge(tokens, customSemanticColors)
    : tokens;

  // 2단계: 모든 참조 해결
  function resolve(value: TokenValue, path: string[] = []): string | Record<string, unknown> {
    if (typeof value === 'string') {
      // {token.path} 형식의 참조인지 확인
      const match = value.match(/^\{(.+)\}$/);
      if (match) {
        const refPath = match[1];

        // 순환 참조 방지
        const cacheKey = refPath;
        if (resolvedCache.has(cacheKey)) {
          return resolvedCache.get(cacheKey)!;
        }

        // 토큰 경로로 값 찾기
        const resolvedValue = getValueByPath(semanticColors, refPath);

        if (resolvedValue === undefined) {
          console.warn(`Token reference not found: ${refPath}`);
          return value; // 찾을 수 없으면 원본 반환
        }

        // 재귀적으로 해결
        const finalValue = resolve(resolvedValue, [...path, refPath]);
        const finalString = typeof finalValue === 'string' ? finalValue : String(finalValue);
        resolvedCache.set(cacheKey, finalString);
        return finalString;
      }

      return value;
    }

    if (typeof value === 'object' && value !== null) {
      const resolved: Record<string, unknown> = {};
      for (const [key, val] of Object.entries(value)) {
        resolved[key] = resolve(val as TokenValue, [...path, key]);
      }
      return resolved;
    }

    return value;
  }

  return resolve(tokens) as T;
}

/**
 * 경로 문자열(예: "brand.primary.500")로 객체 값 가져오기
 */
function getValueByPath(obj: Record<string, unknown>, path: string): TokenValue | undefined {
  const keys = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }

  return current;
}

/**
 * 깊은 병합 (Deep Merge)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge<T extends Record<string, any>>(target: T, source: DeepPartial<T>): T {
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

/**
 * 토큰 객체를 CSS Variables로 변환
 * @param tokens - 토큰 객체
 * @param prefix - CSS Variable 접두사 (기본: 'color')
 * @returns CSS Variable 문자열
 */
export function tokensToCSSVariables(
  tokens: Record<string, unknown> | undefined,
  prefix: string = 'color'
): string {
  if (!tokens) return '';

  const variables: string[] = [];

  function traverse(obj: Record<string, unknown>, path: string[] = []) {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        // CSS Variable 이름 생성: --color-brand-primary-500
        const varName = `--${prefix}-${[...path, key].join('-')}`;
        variables.push(`${varName}: ${value};`);
      } else if (typeof value === 'object' && value !== null) {
        traverse(value as Record<string, unknown>, [...path, key]);
      }
    }
  }

  traverse(tokens);
  return variables.join('\n          ');
}

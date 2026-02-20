# Design System Package Specification

> Claude Code + Figma MCP 작업용 설계 문서

---

## 1. 프로젝트 개요

### 배경

- 앱/웹 개발 에이전시
- PWA 앱 제공
- 디자인 시스템 기반 일관된 디자인 제공
- 프로젝트별 메인 색상 커스터마이징 필요

### 목표

- 디자인 시스템 React 패키지화
- 개발 일정 단축
- Storybook 기반 컴포넌트 문서화
- 오픈소스 디자인 패키지 배포

---

## 2. 패키지 구조

### 권장: 단일 패키지 + Tree-shaking

```
@ubittz/design-system
```

### 디렉토리 구조

```
packages/design-system/
├── src/
│   ├── tokens/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   ├── icons/
│   │   ├── stroke/
│   │   ├── solid/
│   │   └── index.ts
│   ├── components/
│   │   ├── app/
│   │   ├── web/
│   │   └── shared/
│   ├── core/
│   │   ├── DesignSystemProvider.tsx
│   │   ├── useDesignSystem.ts
│   │   ├── useTheme.ts
│   │   └── index.ts
│   ├── styles/
│   │   ├── base.css
│   │   ├── tokens.css
│   │   └── index.css
│   └── index.ts
├── .storybook/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 3. Design Tokens

### 3.1 Color Token 계층

```
Base Color (불변)
    ↓
Semantic Color (오버라이딩 가능)
    ↓
Component Token (Semantic 참조)
```

### 3.2 Color 구조 (Figma Variables 기반)

#### Base Color (불변)

```ts
// tokens/colors.ts

export const baseColors = {
  // Gray Scale
  gray: {
    0: '#FFFFFF',
    10: '#DCDFE4',
    50: '#F3F5F7',
    100: '#E1E4E8',
    200: '#CBCFD7',
    300: '#B4BAC5',
    400: '#9DA5B4',
    500: '#808A9D',
    600: '#667085',
    700: '#4B5362',
    800: '#31363F',
    900: '#16181D',
  },

  // Sky (Primary Base)
  sky: {
    50: '#EBF5FE',
    100: '#D8EBFD',
    // ... 200~900
    500: '#288FF6', // main
  },

  // Pistachio (Secondary Base)
  pistachio: {
    50: '#F3FAF0',
    // ... 100~900
  },

  // System Colors
  grass: { /* Success */ },
  apple: { /* Error */ },
  orange: { /* Warning */ },

  // Additional Colors
  coral: { /* ... */ },
  // ... 기타 색상들
} as const;
```

#### Semantic Color (오버라이딩 가능)

```ts
export const defaultSemanticColors = {
  brand: {
    primary: {
      50: baseColors.sky[50],
      100: baseColors.sky[100],
      // ...
      500: baseColors.sky[500], // main - 오버라이딩 가능
      // ...
      900: baseColors.sky[900],
    },
    secondary: {
      50: baseColors.pistachio[50],
      // ...
      500: baseColors.pistachio[500], // 오버라이딩 가능
      // ...
    },
  },

  surface: {
    default: {
      background: baseColors.gray[50],
      foreground: baseColors.gray[0],
      primary: '{brand.primary.500}', // 동적 참조 → Brand.Primary.500
      brandSecondary: '{brand.primary.50}', // 동적 참조
      gray: baseColors.gray[50],
      disabled: baseColors.gray[100],
      hover: baseColors.gray[50],
    },
    inverse: {
      background: baseColors.gray[900],
    },
  },

  border: {
    default: {
      default: baseColors.gray[100],
      primary: baseColors.gray[900],
      secondary: baseColors.gray[50],
      brand: '{brand.primary.500}', // 동적 참조
      hover: '{brand.primary.500}', // 동적 참조
    },
    // ...
  },

  text: {
    default: {
      primary: baseColors.gray[900],
      secondary: baseColors.gray[700],
      tertiary: baseColors.gray[600],
      // ...
      brandPrimary: '{brand.primary.500}', // 동적 참조
    },
    // ...
  },

  icon: {
    default: {
      primary: baseColors.gray[800],
      brand: '{brand.primary.500}', // 동적 참조
      selected: '{brand.primary.500}', // 동적 참조
      // ...
    },
    // ...
  },

  system: {
    success: {
      content: baseColors.grass[600],
      surface: baseColors.grass[50],
      borderPrimary: baseColors.grass[200],
      borderSecondary: baseColors.grass[600],
    },
    // info, warning, error ...
  },
} as const;
```

#### Component Token (Semantic 참조)

```ts
export const componentTokens = {
  button: {
    primary: {
      background: '{surface.default.primary}', // → Brand.Primary.500
      label: '{text.inverse.primary}', // → White
      icon: '{icon.inverse.primary}', // → White
    },
    secondary: {
      background: '{surface.default.brandSecondary}', // → Brand.Primary.50
      label: '{text.default.brandPrimary}', // → Brand.Primary.500
      icon: '{icon.default.brand}', // → Brand.Primary.500
    },
    ghost: {
      border: '{border.default.brand}', // → Brand.Primary.500
      label: '{text.default.brandPrimary}',
      icon: '{icon.default.brand}',
    },
    // ...
  },
  input: {
    default: {
      background: '{surface.default.foreground}', // → White
      border: '{border.default.default}', // → Gray.100
      // ...
    },
    focused: {
      border: '{border.default.brand}', // → Brand.Primary.500
      cursor: '{surface.default.primary}', // → Brand.Primary.500
    },
    // ...
  },
  // navigation, calendar, modal, list, filter, toggle ...
} as const;
```

**동적 참조 시스템**: Component Token의 `{token.path}` 형식은 런타임에 실제 색상값으로 해결됩니다.

### 3.3 Typography 구조

#### Platform × Language 매트릭스

|         | KR         | EN    |
| ------- | ---------- | ----- |
| **App** | Pretendard | Inter |
| **Web** | Pretendard | Inter |

#### Typography Token

```ts
// tokens/typography.ts

export const typography = {
  fontFamily: {
    kr: "'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
    en: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  app: {
    fontSize: {
      heading1: '24px',
      heading2: '20px',
      heading3: '18px',
      body1: '16px',
      body2: '14px',
      caption: '12px',
      overline: '10px',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      kr: { tight: 1.3, normal: 1.5, relaxed: 1.7 },
      en: { tight: 1.2, normal: 1.4, relaxed: 1.6 },
    },
    letterSpacing: {
      kr: { tight: '-0.02em', normal: '0', wide: '0.02em' },
      en: { tight: '-0.01em', normal: '0', wide: '0.05em' },
    },
  },

  web: {
    fontSize: {
      display: '48px',
      heading1: '32px',
      heading2: '28px',
      heading3: '24px',
      heading4: '20px',
      body1: '16px',
      body2: '14px',
      caption: '12px',
      overline: '10px',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      kr: { tight: 1.3, normal: 1.6, relaxed: 1.8 },
      en: { tight: 1.2, normal: 1.5, relaxed: 1.7 },
    },
    letterSpacing: {
      kr: { tight: '-0.02em', normal: '0', wide: '0.02em' },
      en: { tight: '-0.01em', normal: '0', wide: '0.05em' },
    },
  },
} as const;
```

---

## 4. Core - Theme Provider

### 4.1 타입 정의

```ts
// core/types.ts

export type Platform = 'app' | 'web';
export type Lang = 'kr' | 'en';

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export interface ColorScale {
  50?: string;
  100?: string;
  200?: string;
  // ... 300~900
}

export interface BrandColors {
  primary?: DeepPartial<ColorScale>;
  secondary?: DeepPartial<ColorScale>;
}

export interface SemanticColors {
  brand?: BrandColors;
  surface?: DeepPartial<{...}>;
  border?: DeepPartial<{...}>;
  text?: DeepPartial<{...}>;
  icon?: DeepPartial<{...}>;
  system?: DeepPartial<{...}>;
}

export interface ThemeConfig {
  semanticColors?: DeepPartial<SemanticColors>;
}

export interface DesignSystemConfig {
  platform: Platform;
  defaultLang: Lang;
  theme?: ThemeConfig;
}

export interface DesignSystemContextValue extends DesignSystemConfig {
  theme: Required<ThemeConfig>;
  resolvedSemanticColors: SemanticColors;
}
```

### 4.2 Provider 구현

```tsx
// core/DesignSystemProvider.tsx

import { createContext, useContext, useMemo } from 'react';
import { defaultSemanticColors, componentTokens } from '../tokens/colors';
import { resolveTokenReferences, tokensToCSSVariables } from '../tokens/resolveTokens';
import type { DesignSystemConfig, DesignSystemContextValue } from './types';

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
  children
}: DesignSystemConfig & { children: React.ReactNode }) {
  const contextValue = useMemo(() => {
    // 1. Semantic Colors 병합 (사용자 오버라이드 적용)
    const mergedSemanticColors = theme?.semanticColors
      ? deepMerge(defaultSemanticColors, theme.semanticColors)
      : defaultSemanticColors;

    // 2. Semantic Colors의 참조 해결 (brand.primary.500 등)
    const resolvedSemanticColors = resolveTokenReferences(mergedSemanticColors);

    // 3. Component Tokens의 참조 해결 (semantic colors 기반)
    const resolvedComponentTokens = resolveTokenReferences(
      componentTokens,
      resolvedSemanticColors
    );

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
    const semanticVars = tokensToCSSVariables(
      contextValue.resolvedSemanticColors,
      'semantic'
    );
    const componentVars = tokensToCSSVariables(
      contextValue.resolvedComponentTokens,
      'component'
    );

    return `:root {
      ${semanticVars}

      ${componentVars}
    }`;
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
```

---

## 5. Components

### 5.1 Text 컴포넌트 (Shared)

```tsx
// components/shared/Text.tsx

import { useDesignSystem } from '../../core';
import type { Lang } from '../../core/types';

type TextVariant = 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'body1' | 'body2' | 'caption' | 'overline';

interface TextProps {
  variant?: TextVariant;
  lang?: Lang;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
}

export function Text({ variant = 'body1', lang, weight, as: Component = 'span', className, children }: TextProps) {
  const { platform, defaultLang } = useDesignSystem();
  const activeLang = lang ?? defaultLang;

  const classes = [`ds-text`, `ds-text--${variant}`, `ds-text--${activeLang}`, `ds-text--${platform}`, weight && `ds-text--${weight}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} lang={activeLang === 'kr' ? 'ko' : 'en'}>
      {children}
    </Component>
  );
}
```

### 5.2 컴포넌트 목록

#### App Components

| 카테고리       | 컴포넌트                                           |
| -------------- | -------------------------------------------------- |
| **Layout**     | Container, Stack, Grid, Divider                    |
| **Navigation** | AppBar, BottomNav, TabBar                          |
| **Input**      | Button, TextField, Checkbox, Radio, Switch, Select |
| **Feedback**   | Toast, Modal, BottomSheet, Spinner                 |
| **Display**    | Card, List, ListItem, Avatar, Badge, Chip          |

#### Web Components

| 카테고리       | 컴포넌트                                                       |
| -------------- | -------------------------------------------------------------- |
| **Layout**     | Container, Stack, Grid, Section, Divider                       |
| **Navigation** | Header, Navbar, Sidebar, Breadcrumb, Pagination                |
| **Input**      | Button, TextField, Checkbox, Radio, Switch, Select, DatePicker |
| **Feedback**   | Toast, Modal, Dialog, Spinner, Progress                        |
| **Display**    | Card, Table, List, Avatar, Badge, Chip, Accordion              |

---

## 6. Icons

### 6.1 구조

```
icons/
├── stroke/
│   ├── ArrowLeft.tsx
│   ├── ArrowRight.tsx
│   ├── Check.tsx
│   ├── Close.tsx
│   ├── Menu.tsx
│   └── ...
├── solid/
│   ├── Home.tsx
│   ├── Heart.tsx
│   ├── Star.tsx
│   └── ...
├── Icon.tsx          # Base Icon 컴포넌트
└── index.ts
```

### 6.2 Base Icon 컴포넌트

```tsx
// icons/Icon.tsx

interface IconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number; // stroke 아이콘용
  className?: string;
}

export function createIcon(path: React.ReactNode, displayName: string, defaultProps?: Partial<IconProps>) {
  const Icon = ({ size = 24, color = 'currentColor', strokeWidth = 1.5, className, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      {...props}
    >
      {path}
    </svg>
  );

  Icon.displayName = displayName;
  return Icon;
}
```

---

## 7. 사용 예시

### 7.1 프로젝트 설정

```tsx
// App.tsx (클라이언트 프로젝트)

import { DesignSystemProvider } from '@ubittz/design-system';

function App() {
  return (
    <DesignSystemProvider
      platform='app'
      defaultLang='kr'
      theme={{
        semanticColors: {
          brand: {
            primary: {
              500: '#FF6B00', // Main primary color 오버라이드
              400: '#FF8533', // Light variant
              600: '#CC5500', // Dark variant
            },
            secondary: {
              500: '#00A5FF', // Main secondary color 오버라이드
            },
          },
        },
      }}
    >
      <Router />
    </DesignSystemProvider>
  );
}
```

**동작 방식:**
- `brand.primary.500`을 `#FF6B00`으로 오버라이드하면
- `{brand.primary.500}`을 참조하는 모든 Component Token이 자동으로 `#FF6B00`으로 변경됩니다
- 예: `Button/Primary/Background`, `Input/Focused/Border`, `Icon/Default/Brand` 등

### 7.2 컴포넌트 사용

```tsx
// pages/ProductDetail.tsx

import { Text, Button, Card } from '@ubittz/design-system';
import { Heart } from '@ubittz/design-system/icons/stroke';

function ProductDetail() {
  return (
    <Card>
      {/* 영문 브랜드명 */}
      <Text variant='overline' lang='en'>
        PREMIUM COLLECTION
      </Text>

      {/* 한글 제품명 */}
      <Text variant='heading2' lang='kr' weight='bold'>
        프리미엄 니트 스웨터
      </Text>

      {/* 가격 (영문) */}
      <Text variant='heading3' lang='en'>
        ₩89,000
      </Text>

      {/* 설명 (한글) */}
      <Text variant='body1' lang='kr'>
        부드러운 캐시미어 블렌드 소재로 제작된 고급 니트입니다.
      </Text>

      <Button variant='primary' fullWidth>
        <Heart size={20} />
        장바구니 담기
      </Button>
    </Card>
  );
}
```

---

## 8. Storybook 구성

### 8.1 스토리 구조

```
.storybook/
├── main.ts
├── preview.ts
└── manager.ts

src/
├── tokens/
│   └── colors.stories.mdx
│   └── typography.stories.mdx
├── components/
│   ├── shared/
│   │   └── Text.stories.tsx
│   ├── app/
│   │   └── Button.stories.tsx
│   └── web/
│       └── Button.stories.tsx
└── icons/
    └── Icons.stories.tsx
```

### 8.2 문서 카테고리

```ts
// .storybook/preview.ts

export const parameters = {
  options: {
    storySort: {
      order: [
        'Introduction',
        'Design Tokens',
        ['Colors', 'Typography', 'Spacing'],
        'Icons',
        ['Stroke', 'Solid'],
        'Components',
        ['Shared', 'App', 'Web'],
      ],
    },
  },
};
```

---

## 9. Figma 연동 체크리스트

### Figma Variables 매핑

| Figma Variable             | Token Path                         |
| -------------------------- | ---------------------------------- |
| `Base/Gray/50`             | `baseColors.gray.50`               |
| `Semantic/Brand/Primary`   | `semanticColors.brand.primary`     |
| `Semantic/Surface/Default` | `semanticColors.surface.default`   |
| `Semantic/Text/Primary`    | `semanticColors.text.primary`      |
| `App/Typography/Heading1`  | `typography.app.fontSize.heading1` |

### 작업 순서

1. [ ] Figma Variables 구조 확인
2. [ ] Design Tokens 정의
3. [ ] CSS Variables 생성
4. [ ] Core Provider 구현
5. [ ] Shared 컴포넌트 구현
6. [ ] App 컴포넌트 구현
7. [ ] Web 컴포넌트 구현
8. [ ] Icons 변환
9. [ ] Storybook 문서 작성
10. [ ] 패키지 빌드 설정
11. [ ] NPM 배포

---

## 10. 기술 스택

| 항목            | 선택                                               |
| --------------- | -------------------------------------------------- |
| Framework       | React 18+                                          |
| Language        | TypeScript                                         |
| Build Tool      | Vite                                               |
| Styling         | CSS Variables + CSS Modules (또는 Vanilla Extract) |
| Documentation   | Storybook 8                                        |
| Package Manager | pnpm                                               |
| Monorepo        | Turborepo (필요시)                                 |

---

## Appendix: CSS Variables 전체 목록

```css
:root {
  /* Base Colors */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  /* Brand Colors (Overridable) */
  --color-brand-primary: #6366f1;
  --color-brand-primary-light: #818cf8;
  --color-brand-primary-dark: #4f46e5;
  --color-brand-secondary: #ec4899;
  --color-brand-secondary-light: #f472b6;
  --color-brand-secondary-dark: #db2777;

  /* Surface */
  --color-surface-default: #ffffff;
  --color-surface-subtle: var(--color-gray-50);
  --color-surface-muted: var(--color-gray-100);
  --color-surface-emphasis: var(--color-gray-900);

  /* Border */
  --color-border-default: var(--color-gray-200);
  --color-border-subtle: var(--color-gray-100);
  --color-border-emphasis: var(--color-gray-300);

  /* Text */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-tertiary: var(--color-gray-400);
  --color-text-inverse: #ffffff;
  --color-text-on-primary: #ffffff;
  --color-text-on-secondary: #ffffff;

  /* Icon */
  --color-icon-default: var(--color-gray-600);
  --color-icon-subtle: var(--color-gray-400);
  --color-icon-emphasis: var(--color-gray-900);
  --color-icon-inverse: #ffffff;

  /* System State */
  --color-system-success: #10b981;
  --color-system-success-light: #d1fae5;
  --color-system-warning: #f59e0b;
  --color-system-warning-light: #fef3c7;
  --color-system-error: #ef4444;
  --color-system-error-light: #fee2e2;
  --color-system-info: #3b82f6;
  --color-system-info-light: #dbeafe;

  /* Typography - Font Family */
  --font-family-kr: 'Pretendard Variable', 'Pretendard', -apple-system, sans-serif;
  --font-family-en: 'Inter', -apple-system, sans-serif;

  /* Typography - App Font Size */
  --font-size-app-heading1: 24px;
  --font-size-app-heading2: 20px;
  --font-size-app-heading3: 18px;
  --font-size-app-body1: 16px;
  --font-size-app-body2: 14px;
  --font-size-app-caption: 12px;
  --font-size-app-overline: 10px;

  /* Typography - Web Font Size */
  --font-size-web-display: 48px;
  --font-size-web-heading1: 32px;
  --font-size-web-heading2: 28px;
  --font-size-web-heading3: 24px;
  --font-size-web-heading4: 20px;
  --font-size-web-body1: 16px;
  --font-size-web-body2: 14px;
  --font-size-web-caption: 12px;
  --font-size-web-overline: 10px;

  /* Typography - Font Weight */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Typography - Line Height (KR) */
  --line-height-kr-tight: 1.3;
  --line-height-kr-normal: 1.5;
  --line-height-kr-relaxed: 1.7;

  /* Typography - Line Height (EN) */
  --line-height-en-tight: 1.2;
  --line-height-en-normal: 1.4;
  --line-height-en-relaxed: 1.6;

  /* Typography - Letter Spacing (KR) */
  --letter-spacing-kr-tight: -0.02em;
  --letter-spacing-kr-normal: 0;
  --letter-spacing-kr-wide: 0.02em;

  /* Typography - Letter Spacing (EN) */
  --letter-spacing-en-tight: -0.01em;
  --letter-spacing-en-normal: 0;
  --letter-spacing-en-wide: 0.05em;
}
```

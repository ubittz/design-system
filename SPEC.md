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

### 3.2 Color 구조

#### Base Color

```ts
// tokens/colors.ts

export const baseColors = {
  // Gray Scale
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Status Colors
  red: {
    /* ... */
  },
  green: {
    /* ... */
  },
  yellow: {
    /* ... */
  },
  blue: {
    /* ... */
  },

  // Absolute
  white: '#FFFFFF',
  black: '#000000',
} as const;
```

#### Semantic Color

```ts
export const semanticColors = {
  brand: {
    primary: '#6366F1', // 오버라이딩 대상
    primaryLight: '#818CF8', // 오버라이딩 대상
    primaryDark: '#4F46E5', // 오버라이딩 대상
    secondary: '#EC4899', // 오버라이딩 대상
    secondaryLight: '#F472B6', // 오버라이딩 대상
    secondaryDark: '#DB2777', // 오버라이딩 대상
  },

  surface: {
    default: baseColors.white,
    subtle: baseColors.gray[50],
    muted: baseColors.gray[100],
    emphasis: baseColors.gray[900],
  },

  border: {
    default: baseColors.gray[200],
    subtle: baseColors.gray[100],
    emphasis: baseColors.gray[300],
  },

  text: {
    primary: baseColors.gray[900],
    secondary: baseColors.gray[600],
    tertiary: baseColors.gray[400],
    inverse: baseColors.white,
    onPrimary: baseColors.white, // brand.primary 위 텍스트
    onSecondary: baseColors.white, // brand.secondary 위 텍스트
  },

  icon: {
    default: baseColors.gray[600],
    subtle: baseColors.gray[400],
    emphasis: baseColors.gray[900],
    inverse: baseColors.white,
  },

  system: {
    success: '#10B981',
    successLight: '#D1FAE5',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
  },
} as const;
```

#### Component Token

```ts
export const componentTokens = {
  button: {
    primary: {
      bg: 'var(--color-brand-primary)',
      bgHover: 'var(--color-brand-primary-dark)',
      text: 'var(--color-text-on-primary)',
    },
    secondary: {
      bg: 'var(--color-brand-secondary)',
      bgHover: 'var(--color-brand-secondary-dark)',
      text: 'var(--color-text-on-secondary)',
    },
    // ...
  },
  input: {
    bg: 'var(--color-surface-default)',
    border: 'var(--color-border-default)',
    borderFocus: 'var(--color-brand-primary)',
    text: 'var(--color-text-primary)',
    placeholder: 'var(--color-text-tertiary)',
  },
  // ...
} as const;
```

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

export interface BrandColors {
  primary?: string;
  primaryLight?: string;
  primaryDark?: string;
  secondary?: string;
  secondaryLight?: string;
  secondaryDark?: string;
}

export interface ThemeConfig {
  brand?: BrandColors;
  // 필요시 확장
}

export interface DesignSystemConfig {
  platform: Platform;
  defaultLang: Lang;
  theme?: ThemeConfig;
}

export interface DesignSystemContextValue extends DesignSystemConfig {
  theme: Required<ThemeConfig>;
}
```

### 4.2 Provider 구현

```tsx
// core/DesignSystemProvider.tsx

import { createContext, useContext, useMemo } from 'react';
import { semanticColors } from '../tokens/colors';
import type { DesignSystemConfig, DesignSystemContextValue } from './types';

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
        ...semanticColors.brand,
        ...theme?.brand,
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

  return (
    <DesignSystemContext.Provider value={contextValue}>
      <style>{`
        :root {
          --color-brand-primary: ${mergedTheme.brand.primary};
          --color-brand-primary-light: ${mergedTheme.brand.primaryLight};
          --color-brand-primary-dark: ${mergedTheme.brand.primaryDark};
          --color-brand-secondary: ${mergedTheme.brand.secondary};
          --color-brand-secondary-light: ${mergedTheme.brand.secondaryLight};
          --color-brand-secondary-dark: ${mergedTheme.brand.secondaryDark};
        }
      `}</style>
      {children}
    </DesignSystemContext.Provider>
  );
}

export function useDesignSystem() {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within DesignSystemProvider');
  }
  return context;
}
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

import { DesignSystemProvider } from '@corp/design-system';

function App() {
  return (
    <DesignSystemProvider
      platform='app'
      defaultLang='kr'
      theme={{
        brand: {
          primary: '#FF6B00',
          primaryLight: '#FF8533',
          primaryDark: '#CC5500',
          secondary: '#00A5FF',
        },
      }}
    >
      <Router />
    </DesignSystemProvider>
  );
}
```

### 7.2 컴포넌트 사용

```tsx
// pages/ProductDetail.tsx

import { Text, Button, Card } from '@corp/design-system';
import { Heart } from '@corp/design-system/icons/stroke';

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

# @ubittz/design-system

일관된 디자인과 개발 경험을 제공하기 위한 React 기반 디자인 시스템 패키지입니다.

[![npm](https://img.shields.io/npm/v/@ubittz/design-system)](https://www.npmjs.com/package/@ubittz/design-system)
[![license](https://img.shields.io/npm/l/@ubittz/design-system)](./LICENSE)

## 주요 특징

- **Figma 연동** — Figma Variable과 동기화된 디자인 토큰
- **플랫폼 지원** — Web / App 플랫폼 대응
- **다국어 타이포그래피** — 한글(KR) / 영문(EN) 최적화
- **테마 커스터마이징** — 브랜드 컬러를 프로젝트별로 커스터마이징
- **Tailwind CSS 연동** — Preset과 CSS 변수 기반 유틸리티 클래스 제공
- **Tree-shaking** — 사용하는 컴포넌트만 번들에 포함

## 설치

```bash
npm install @ubittz/design-system
# or
yarn add @ubittz/design-system
```

**Requirements:** React >= 18.3.1

## 빠른 시작

```tsx
import { DesignSystemProvider } from '@ubittz/design-system';

function App() {
  return (
    <DesignSystemProvider platform='app' defaultLang='kr'>
      <YourApp />
    </DesignSystemProvider>
  );
}
```

| Prop          | Type             | Default | Description                             |
| ------------- | ---------------- | ------- | --------------------------------------- |
| `platform`    | `'app' \| 'web'` | —       | 플랫폼 타입                             |
| `defaultLang` | `'kr' \| 'en'`   | —       | 기본 언어 (타이포그래피 letter-spacing) |
| `theme`       | `ThemeConfig`    | —       | 시맨틱 컬러 오버라이드                  |

## 컴포넌트

### Form

| 컴포넌트           | 설명                                    |
| ------------------ | --------------------------------------- |
| `TextField`        | 텍스트 입력 (format masking, unit 지원) |
| `TextArea`         | 멀티라인 텍스트 입력                    |
| `Search`           | 검색 입력                               |
| `Dropdown`         | 셀렉트 드롭다운                         |
| `Picker`           | 날짜 선택 입력 (single / range)         |
| `RadioButton`      | 라디오 버튼                             |
| `Checkbox`         | 체크박스 (default / square)             |
| `Toggle`           | 세그먼트 토글                           |
| `SelectableOption` | 선택 가능 옵션 칩                       |
| `ImageUploader`    | 이미지 업로드 (미리보기, 삭제)          |
| `FormGroup`        | 라벨, 캡션, 에러 메시지 래퍼            |

### Display

| 컴포넌트     | 설명                                                |
| ------------ | --------------------------------------------------- |
| `Button`     | 버튼 (primary / secondary / ghost / gray / outline) |
| `FullButton` | 전체 너비 버튼, `FullButton.Group` 지원             |
| `IconButton` | 아이콘 버튼                                         |
| `TextButton` | 텍스트 버튼                                         |
| `Calendar`   | 달력 (single / range 선택)                          |
| `Pagination` | 페이지네이션                                        |
| `FilterBar`  | 필터 칩 바                                          |
| `SortSelect` | 정렬 셀렉트                                         |

### Navigation

| 컴포넌트           | 설명               |
| ------------------ | ------------------ |
| `TopNavigation`    | 상단 네비게이션 바 |
| `BottomNavigation` | 하단 네비게이션 바 |
| `TabMenu`          | 탭 메뉴            |

### Overlay

| 컴포넌트      | 설명                               |
| ------------- | ---------------------------------- |
| `Popup`       | 모달 팝업 (Portal 기반)            |
| `BottomSheet` | 바텀 시트 (슬라이드 업 애니메이션) |

Popup과 BottomSheet는 직접 컴포넌트 사용 또는 Context/Hooks 방식을 지원합니다:

```tsx
import { PopupProvider, usePopup, BottomSheetProvider, useBottomSheet } from '@ubittz/design-system';

// Provider 설정
<DesignSystemProvider platform='app' defaultLang='kr'>
  <PopupProvider>
    <BottomSheetProvider>
      <App />
    </BottomSheetProvider>
  </PopupProvider>
</DesignSystemProvider>;

// Hook 사용
function MyComponent() {
  const popup = usePopup();
  const bottomSheet = useBottomSheet();

  popup.open({
    title: '확인',
    body: '삭제하시겠습니까?',
    confirmButton: { label: '삭제', variant: 'primary', onClick: handleDelete },
    cancelButton: { label: '취소', variant: 'gray' },
  });

  bottomSheet.open({
    title: '옵션 선택',
    showClose: true,
    content: <OptionList />,
    button: { label: '적용', variant: 'primary', onClick: handleApply },
  });
}
```

## 아이콘

4개 네임스페이스, 370+ 아이콘:

```tsx
import { RoundStroke, RoundSolid, DefaultStroke, DefaultSolid } from '@ubittz/design-system';

<RoundStroke.Search size={24} />
<RoundSolid.Heart size={20} color="#E51931" />
```

| 네임스페이스    | 스타일          | 수량 |
| --------------- | --------------- | ---- |
| `RoundStroke`   | 라운드 아웃라인 | 127  |
| `RoundSolid`    | 라운드 솔리드   | 96   |
| `DefaultStroke` | 기본 아웃라인   | 83   |
| `DefaultSolid`  | 기본 솔리드     | 64   |

## 디자인 토큰

3단계 컬러 토큰 아키텍처:

```
baseColors (상수) → semanticColors (오버라이드 가능) → componentTokens (파생)
```

모든 토큰은 런타임에 CSS 변수로 제공됩니다:

```css
var(--semantic-brand-primary-500)
var(--semantic-text-default-primary)
var(--component-button-primary-background)
```

### 테마 커스터마이징

```tsx
<DesignSystemProvider
  platform="app"
  defaultLang="kr"
  theme={{
    semanticColors: {
      brand: {
        primary: { 500: '#FF6B00', 600: '#CC5500' },
      },
    },
  }}
>
```

## Tailwind CSS 연동

### 소비 프로젝트 content 설정

디자인 시스템 컴포넌트가 Tailwind 클래스를 사용하므로, 소비 프로젝트의 Tailwind 설정에 디자인 시스템 패키지 경로를 content에 추가해야 합니다:

```js
// tailwind.config.js (v3)
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@ubittz/design-system/dist/**/*.js', // 필수
  ],
  // ...
};
```

```ts
// tailwind.config.ts (v3)
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@ubittz/design-system/dist/**/*.js', // 필수
  ],
  // ...
};
```

### Tailwind v4

```css
@import 'tailwindcss';
@import '@ubittz/design-system/tokens.css';
@import '@ubittz/design-system/tailwind-theme.css';

@source "../node_modules/@ubittz/design-system/dist";
```

### Tailwind v3

```js
// tailwind.config.js
const ubittzPreset = require('@ubittz/design-system/tailwind-preset');

module.exports = {
  presets: [ubittzPreset],
};
```

```ts
// tailwind.config.ts
import ubittzPreset from '@ubittz/design-system/tailwind-preset';

export default {
  presets: [ubittzPreset],
};
```

컴포넌트를 import하면 `tokens.css`가 자동 로드되므로 별도 CSS import는 불필요합니다.
컴포넌트 없이 토큰만 사용하는 경우 `@import "@ubittz/design-system/tokens.css"`를 추가하세요.

## 문서

- **Storybook**: [https://ubittz.github.io/design-system/](https://ubittz.github.io/design-system/)
- **AI 협업 가이드**: Storybook의 AI Guide 페이지에서 `AGENTS.md`를 다운로드하여 프로젝트 루트에 배치하면 AI 어시스턴트가 디자인 시스템을 효율적으로 활용할 수 있습니다.

## 개발

```bash
# 빌드
yarn build

# 개발 모드 (watch)
yarn dev

# Storybook 실행
yarn storybook

# Storybook 빌드
yarn build-storybook
```

## 라이선스

[MIT](./LICENSE)

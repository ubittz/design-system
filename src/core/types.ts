export type Platform = 'app' | 'web';
export type Lang = 'kr' | 'en';

/**
 * 깊은 부분 타입 (Deep Partial)
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * 색상 스케일 (50~900)
 */
export interface ColorScale {
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
}

/**
 * 브랜드 색상 (오버라이딩 가능)
 */
export interface BrandColors {
  primary?: DeepPartial<ColorScale>;
  secondary?: DeepPartial<ColorScale>;
}

/**
 * Semantic Colors (오버라이딩 가능)
 */
export interface SemanticColors {
  brand?: BrandColors;
  surface?: DeepPartial<{
    default: {
      background: string;
      foreground: string;
      primary: string;
      brandSecondary: string;
      gray: string;
      disabled: string;
      hover: string;
    };
    inverse: {
      background: string;
    };
  }>;
  border?: DeepPartial<{
    default: {
      default: string;
      primary: string;
      secondary: string;
      brand: string;
      hover: string;
    };
    inverse: {
      primary: string;
      secondary: string;
      brand: string;
    };
  }>;
  text?: DeepPartial<{
    default: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      label: string;
      placeholder: string;
      caption: string;
      disabled: string;
      brandPrimary: string;
      discount: string;
    };
    inverse: {
      primary: string;
      secondary: string;
      tertiary: string;
      caption: string;
      disabled: string;
      brand: string;
    };
  }>;
  icon?: DeepPartial<{
    default: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      brand: string;
      disabled: string;
      selected: string;
    };
    inverse: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      disabled: string;
    };
  }>;
  system?: DeepPartial<{
    success: {
      content: string;
      surface: string;
      borderPrimary: string;
      borderSecondary: string;
    };
    info: {
      content: string;
      surface: string;
      borderPrimary: string;
      borderSecondary: string;
    };
    warning: {
      content: string;
      surface: string;
      borderPrimary: string;
      borderSecondary: string;
    };
    error: {
      content: string;
      surface: string;
      borderPrimary: string;
      borderSecondary: string;
    };
  }>;
}

/**
 * 테마 설정
 */
export interface ThemeConfig {
  /**
   * Semantic Colors 오버라이드
   * 예: { brand: { primary: { 500: '#FF0000' } } }
   */
  semanticColors?: DeepPartial<SemanticColors>;
}

/**
 * 디자인 시스템 설정
 */
export interface DesignSystemConfig {
  platform: Platform;
  defaultLang: Lang;
  theme?: ThemeConfig;
}

/**
 * 디자인 시스템 Context 값
 */
export interface DesignSystemContextValue extends DesignSystemConfig {
  theme: Required<ThemeConfig>;
  /**
   * 참조가 모두 해결된 Semantic Colors
   */
  resolvedSemanticColors: SemanticColors;
}

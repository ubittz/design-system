export type Platform = 'app' | 'web';
export type Lang = 'kr' | 'en';

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

export interface BrandColors {
  primary?: ColorScale;
  secondary?: ColorScale;
}

export interface ThemeConfig {
  brand?: BrandColors;
}

export interface DesignSystemConfig {
  platform: Platform;
  defaultLang: Lang;
  theme?: ThemeConfig;
}

export interface DesignSystemContextValue extends DesignSystemConfig {
  theme: Required<ThemeConfig>;
}

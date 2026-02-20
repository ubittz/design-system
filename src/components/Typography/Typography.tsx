'use client';

import React from 'react';

import { useDesignSystem } from '../../core/DesignSystemProvider';
import { mobileTypography, webTypography, type TypographyStyle } from '../../tokens/typography';

export interface TypographyProps {
  /** Typography variant */
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'subtitle1'
    | 'subtitle2'
    | 'subtitle3'
    | 'body1'
    | 'body2'
    | 'body3'
    | 'body4'
    | 'caption'
    | 'caption1'
    | 'caption2'
    | 'button1'
    | 'button2'
    | 'button3';
  /** Text content */
  children: React.ReactNode;
  /** Language (kr or en) - defaults to context defaultLang */
  lang?: 'kr' | 'en';
  /** Text color */
  color?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** HTML tag to render */
  as?: React.ElementType;
  /** Additional className */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
}

const getTypographyStyle = (
  variant: TypographyProps['variant'],
  lang: 'kr' | 'en',
  platform: 'web' | 'mobile'
): TypographyStyle => {
  const typography = platform === 'web' ? webTypography : mobileTypography;
  const langTypography = typography[lang];

  // Variant를 카테고리와 스타일로 분리
  const titleVariants = ['h1', 'h2', 'h3', 'h4', 'subtitle1', 'subtitle2', 'subtitle3'];
  const bodyVariants = ['body1', 'body2', 'body3', 'body4', 'caption', 'caption1', 'caption2'];
  const buttonVariants = ['button1', 'button2', 'button3'];

  if (titleVariants.includes(variant)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (langTypography.title as any)[variant];
  } else if (bodyVariants.includes(variant)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (langTypography.body as any)[variant];
  } else if (buttonVariants.includes(variant)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (langTypography.button as any)[variant];
  }

  // Fallback
  return langTypography.body.body3 || langTypography.body.body1;
};

const getDefaultTag = (variant: TypographyProps['variant']): React.ElementType => {
  if (variant.startsWith('h')) return variant as 'h1' | 'h2' | 'h3' | 'h4';
  if (variant.startsWith('subtitle')) return 'h5';
  if (variant.startsWith('button')) return 'span';
  if (variant.startsWith('caption')) return 'span';
  return 'p';
};

export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  lang,
  color,
  align = 'left',
  as,
  className,
  style,
}) => {
  const { platform, defaultLang } = useDesignSystem();
  const effectiveLang = lang || defaultLang;
  // 'app' platform을 'mobile'로 매핑
  const effectivePlatform: 'web' | 'mobile' = platform === 'app' ? 'mobile' : platform;
  const typographyStyle = getTypographyStyle(variant, effectiveLang, effectivePlatform);
  const Component = as || getDefaultTag(variant);

  const combinedStyle: React.CSSProperties = {
    fontFamily: typographyStyle.fontFamily,
    fontSize: typographyStyle.fontSize,
    fontWeight: typographyStyle.fontWeight,
    lineHeight: typographyStyle.lineHeight,
    letterSpacing: typographyStyle.letterSpacing,
    textAlign: align,
    color: color,
    margin: 0,
    ...style,
  };

  return (
    <Component className={className} style={combinedStyle}>
      {children}
    </Component>
  );
};

Typography.displayName = 'Typography';

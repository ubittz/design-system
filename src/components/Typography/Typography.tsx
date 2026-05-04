'use client';

import React from 'react';

import { cn } from '../../utils/cn';
import { useDesignSystem } from '../../core/DesignSystemProvider';
import { mobileTypography, webTypography, type TypographyStyle } from '../../tokens/typography';

export interface TypographyProps {
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
  children: React.ReactNode;
  lang?: 'kr' | 'en';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
}

const getTypographyStyle = (variant: TypographyProps['variant'], lang: 'kr' | 'en', platform: 'web' | 'mobile'): TypographyStyle => {
  const typography = platform === 'web' ? webTypography : mobileTypography;
  const langTypography = typography[lang];

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

  return langTypography.body.body3 || langTypography.body.body1;
};

const ALIGN_CLASSES = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
} as const;

const getDefaultTag = (variant: TypographyProps['variant']): React.ElementType => {
  if (variant.startsWith('h')) return variant as 'h1' | 'h2' | 'h3' | 'h4';
  if (variant.startsWith('subtitle')) return 'h5';
  if (variant.startsWith('button')) return 'span';
  if (variant.startsWith('caption')) return 'span';
  return 'p';
};

export const Typography: React.FC<TypographyProps> = ({ variant, children, lang, color, align = 'left', as, className, style }) => {
  const { platform, defaultLang } = useDesignSystem();
  const effectiveLang = lang || defaultLang;
  const effectivePlatform: 'web' | 'mobile' = platform === 'app' ? 'mobile' : platform;
  const typographyStyle = getTypographyStyle(variant, effectiveLang, effectivePlatform);
  const Component = as || getDefaultTag(variant);

  return (
    <Component
      className={cn('m-0', ALIGN_CLASSES[align], className)}
      style={{
        fontFamily: typographyStyle.fontFamily,
        fontSize: typographyStyle.fontSize,
        fontWeight: typographyStyle.fontWeight,
        lineHeight: typographyStyle.lineHeight,
        letterSpacing: typographyStyle.letterSpacing,
        color: color,
        ...style,
      }}
    >
      {children}
    </Component>
  );
};

Typography.displayName = 'Typography';

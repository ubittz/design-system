import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from './Typography';
import { webTypography, mobileTypography } from '../../tokens/typography';
import type { TypographyVariant } from '../../tokens/typography';

type VariantKey = TypographyVariant;

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

const getVariants = (platform: string, lang: 'kr' | 'en') => {
  const typography = platform === 'web' ? webTypography : mobileTypography;
  const langTypography = typography[lang];

  return {
    title: Object.keys(langTypography.title) as VariantKey[],
    body: Object.keys(langTypography.body) as VariantKey[],
    button: Object.keys(langTypography.button) as VariantKey[],
  };
};

const LABELS = {
  kr: {
    title: (platform: string) => `${platform === 'web' ? 'Web' : 'Mobile'} Typography - 한글(KR)`,
    description: (isWeb: boolean) =>
      isWeb
        ? '웹용 한글 타이포그래피입니다. 자간 -2%를 적용하여 가독성을 높였습니다.'
        : '모바일 앱용 한글 타이포그래피입니다.',
    sampleTitle: '디자인 시스템',
    sampleBody: '디자인 시스템은 일관된 사용자 경험을 제공합니다.',
  },
  en: {
    title: (platform: string) => `${platform === 'web' ? 'Web' : 'Mobile'} Typography - English`,
    description: (isWeb: boolean) =>
      isWeb
        ? 'Web typography for English with 0% letter spacing for optimal readability.'
        : 'Mobile app typography for English.',
    sampleTitle: 'Design System',
    sampleBody: 'A design system provides consistent user experience.',
  },
} as const;

const formatName = (v: string) => v.charAt(0).toUpperCase() + v.slice(1).replace(/(\d)/, ' $1');

// ============================================================================
// Overview - Platform & Language 툴바로 전환
// ============================================================================
export const Overview: Story = {
  args: {
    variant: 'h1',
    children: '',
  },
  render: (_args, { globals }) => {
    const platform = globals.platform || 'web';
    const lang = (globals.lang || 'kr') as 'kr' | 'en';
    const isWeb = platform === 'web';

    const variants = getVariants(platform, lang);
    const label = LABELS[lang];

    return (
      <div style={{ padding: '24px', maxWidth: isWeb ? undefined : '375px' }}>
        <h1 style={{ fontSize: isWeb ? '32px' : '24px', fontWeight: 700, marginBottom: isWeb ? '32px' : '24px' }}>
          {label.title(platform)}
        </h1>
        <p style={{ fontSize: isWeb ? '16px' : '14px', color: '#667085', marginBottom: isWeb ? '48px' : '32px' }}>
          {label.description(isWeb)}
        </p>

        <div style={{ marginBottom: isWeb ? '48px' : '32px' }}>
          <h2 style={{ fontSize: isWeb ? '24px' : '18px', fontWeight: 700, marginBottom: isWeb ? '24px' : '16px' }}>Title</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: isWeb ? '16px' : '12px' }}>
            {variants.title.map((v) => (
              <Typography key={v} variant={v} lang={lang}>
                {formatName(v)} - {label.sampleTitle}
              </Typography>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: isWeb ? '48px' : '32px' }}>
          <h2 style={{ fontSize: isWeb ? '24px' : '18px', fontWeight: 700, marginBottom: isWeb ? '24px' : '16px' }}>Body</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: isWeb ? '16px' : '12px' }}>
            {variants.body.map((v) => (
              <Typography key={v} variant={v} lang={lang}>
                {formatName(v)} - {label.sampleBody}
              </Typography>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: isWeb ? '24px' : '18px', fontWeight: 700, marginBottom: isWeb ? '24px' : '16px' }}>Button</h2>
          <div style={{ display: 'flex', gap: isWeb ? '16px' : '12px' }}>
            {variants.button.map((v) => (
              <Typography key={v} variant={v} lang={lang}>
                {formatName(v)}
              </Typography>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// ============================================================================
// Playground
// ============================================================================
export const Playground: Story = {
  args: {
    variant: 'h1',
    children: 'Typography Component',
    color: '#000000',
    align: 'left',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'subtitle1',
        'subtitle2',
        'subtitle3',
        'body1',
        'body2',
        'body3',
        'body4',
        'caption',
        'caption1',
        'caption2',
        'button1',
        'button2',
        'button3',
      ],
    },
    children: {
      control: 'text',
      description: 'Enter your text here',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
    },
    color: {
      control: 'color',
    },
  },
  render: (args) => (
    <div style={{ padding: '40px' }}>
      <Typography {...args} />
    </div>
  ),
};

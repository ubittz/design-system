import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '../../src/components/Typography/Typography';
import { DesignSystemProvider } from '../../src/core/DesignSystemProvider';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Web Typography - Korean
// ============================================================================
export const WebKorean: Story = {
  args: {
    variant: 'h1',
    children: '',
  },
  render: () => (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Web Typography - 한글(KR)</h1>
      <p style={{ fontSize: '16px', color: '#667085', marginBottom: '48px' }}>
        웹용 한글 타이포그래피입니다. 자간 -2%를 적용하여 가독성을 높였습니다.
      </p>

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Title</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Typography variant='h1' lang='kr'>
            Heading 1 - 디자인 시스템
          </Typography>
          <Typography variant='h2' lang='kr'>
            Heading 2 - 디자인 시스템
          </Typography>
          <Typography variant='h3' lang='kr'>
            Heading 3 - 디자인 시스템
          </Typography>
          <Typography variant='h4' lang='kr'>
            Heading 4 - 디자인 시스템
          </Typography>
          <Typography variant='subtitle1' lang='kr'>
            Subtitle 1 - 디자인 시스템
          </Typography>
          <Typography variant='subtitle2' lang='kr'>
            Subtitle 2 - 디자인 시스템
          </Typography>
        </div>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Body</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Typography variant='body1' lang='kr'>
            Body 1 - 디자인 시스템은 일관된 사용자 경험을 제공하기 위한 재사용 가능한 컴포넌트 모음입니다.
          </Typography>
          <Typography variant='body3' lang='kr'>
            Body 3 - 디자인 시스템은 일관된 사용자 경험을 제공하기 위한 재사용 가능한 컴포넌트 모음입니다.
          </Typography>
          <Typography variant='body4' lang='kr'>
            Body 4 - 디자인 시스템은 일관된 사용자 경험을 제공하기 위한 재사용 가능한 컴포넌트 모음입니다.
          </Typography>
          <Typography variant='caption' lang='kr'>
            Caption - 작은 크기의 보조 텍스트입니다.
          </Typography>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Button</h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Typography variant='button1' lang='kr'>
            Button 1
          </Typography>
          <Typography variant='button2' lang='kr'>
            Button 2
          </Typography>
          <Typography variant='button3' lang='kr'>
            Button 3
          </Typography>
        </div>
      </div>
    </div>
  ),
};

// ============================================================================
// Web Typography - English
// ============================================================================
export const WebEnglish: Story = {
  args: {
    variant: 'h1',
    children: '',
  },
  render: () => (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Web Typography - English</h1>
      <p style={{ fontSize: '16px', color: '#667085', marginBottom: '48px' }}>
        Web typography for English with 0% letter spacing for optimal readability.
      </p>

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Title</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Typography variant='h1' lang='en'>
            Heading 1 - Design System
          </Typography>
          <Typography variant='h2' lang='en'>
            Heading 2 - Design System
          </Typography>
          <Typography variant='h3' lang='en'>
            Heading 3 - Design System
          </Typography>
          <Typography variant='h4' lang='en'>
            Heading 4 - Design System
          </Typography>
          <Typography variant='subtitle1' lang='en'>
            Subtitle 1 - Design System
          </Typography>
          <Typography variant='subtitle2' lang='en'>
            Subtitle 2 - Design System
          </Typography>
        </div>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Body</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Typography variant='body1' lang='en'>
            Body 1 - A design system is a collection of reusable components for consistent user experience.
          </Typography>
          <Typography variant='body3' lang='en'>
            Body 3 - A design system is a collection of reusable components for consistent user experience.
          </Typography>
          <Typography variant='body4' lang='en'>
            Body 4 - A design system is a collection of reusable components for consistent user experience.
          </Typography>
          <Typography variant='caption' lang='en'>
            Caption - Small auxiliary text.
          </Typography>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Button</h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Typography variant='button2' lang='en'>
            Button 2
          </Typography>
          <Typography variant='button3' lang='en'>
            Button 3
          </Typography>
        </div>
      </div>
    </div>
  ),
};

// ============================================================================
// Mobile Typography - Korean
// ============================================================================
export const MobileKorean: Story = {
  args: {
    variant: 'h1',
    children: '',
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 800,
      },
    },
  },
  render: () => (
    <div style={{ padding: '24px', maxWidth: '375px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Mobile Typography - 한글(KR)</h1>
      <p style={{ fontSize: '14px', color: '#667085', marginBottom: '32px' }}>
        모바일 앱용 한글 타이포그래피입니다.
      </p>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Title</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography variant='h1' lang="kr">
            Heading 1 - 디자인 시스템
          </Typography>
          <Typography variant='h2' lang="kr">
            Heading 2 - 디자인 시스템
          </Typography>
          <Typography variant='h3' lang="kr">
            Heading 3 - 디자인 시스템
          </Typography>
          <Typography variant='h4' lang="kr">
            Heading 4 - 디자인 시스템
          </Typography>
          <Typography variant='subtitle1' lang="kr">
            Subtitle 1 - 디자인 시스템
          </Typography>
          <Typography variant='subtitle2' lang="kr">
            Subtitle 2 - 디자인 시스템
          </Typography>
          <Typography variant='subtitle3' lang="kr">
            Subtitle 3 - 디자인 시스템
          </Typography>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Body</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography variant='body1' lang="kr">
            Body 1 - 디자인 시스템은 일관된 UX를 제공합니다.
          </Typography>
          <Typography variant='body2' lang="kr">
            Body 2 - 디자인 시스템은 일관된 UX를 제공합니다.
          </Typography>
          <Typography variant='body3' lang="kr">
            Body 3 - 디자인 시스템은 일관된 UX를 제공합니다.
          </Typography>
          <Typography variant='caption1' lang="kr">
            Caption 1 - 보조 텍스트
          </Typography>
          <Typography variant='caption2' lang="kr">
            Caption 2 - 보조 텍스트
          </Typography>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Button</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Typography variant='button1' lang="kr">
            Button 1
          </Typography>
          <Typography variant='button2' lang="kr">
            Button 2
          </Typography>
          <Typography variant='button3' lang="kr">
            Button 3
          </Typography>
        </div>
      </div>
    </div>
  ),
};

// ============================================================================
// Mobile Typography - English
// ============================================================================
export const MobileEnglish: Story = {
  args: {
    variant: 'h1',
    children: '',
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 800,
      },
    },
  },
  render: () => (
    <div style={{ padding: '24px', maxWidth: '375px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Mobile Typography - English</h1>
      <p style={{ fontSize: '14px', color: '#667085', marginBottom: '32px' }}>Mobile app typography for English.</p>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Title</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography variant='h1' lang='en'>
            Heading 1 - Design System
          </Typography>
          <Typography variant='h2' lang='en'>
            Heading 2 - Design System
          </Typography>
          <Typography variant='h3' lang='en'>
            Heading 3 - Design System
          </Typography>
          <Typography variant='h4' lang='en'>
            Heading 4 - Design System
          </Typography>
          <Typography variant='subtitle1' lang='en'>
            Subtitle 1 - Design System
          </Typography>
          <Typography variant='subtitle2' lang='en'>
            Subtitle 2 - Design System
          </Typography>
          <Typography variant='subtitle3' lang='en'>
            Subtitle 3 - Design System
          </Typography>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Body</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography variant='body1' lang='en'>
            Body 1 - Design system provides consistent UX.
          </Typography>
          <Typography variant='body2' lang='en'>
            Body 2 - Design system provides consistent UX.
          </Typography>
          <Typography variant='body3' lang='en'>
            Body 3 - Design system provides consistent UX.
          </Typography>
          <Typography variant='caption1' lang='en'>
            Caption 1 - Auxiliary text
          </Typography>
          <Typography variant='caption2' lang='en'>
            Caption 2 - Auxiliary text
          </Typography>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Button</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Typography variant='button1' lang='en'>
            Button 1
          </Typography>
          <Typography variant='button2' lang='en'>
            Button 2
          </Typography>
          <Typography variant='button3' lang='en'>
            Button 3
          </Typography>
        </div>
      </div>
    </div>
  ),
};

// ============================================================================
// Playground
// ============================================================================
export const Playground: Story = {
  args: {
    variant: 'h1',
    children: 'Typography Component',
    lang: 'kr',
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
    lang: {
      control: 'select',
      options: ['kr', 'en'],
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
    <DesignSystemProvider platform='web' defaultLang={args.lang || 'kr'}>
      <div style={{ padding: '40px' }}>
        <Typography {...args} />
      </div>
    </DesignSystemProvider>
  ),
};

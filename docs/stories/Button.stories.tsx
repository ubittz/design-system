import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button, IconButton, TextButton, FullButton, SNSButton } from '../../src/components/app/Button';
import { RoundStroke } from '../../src/icons';

// ============================================================================
// Meta
// ============================================================================

const meta = {
  title: 'Components/App/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Helper
// ============================================================================

const PhoneFrame: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div style={{ marginBottom: 32 }}>
    {title && <h3 style={{ fontSize: 14, color: '#667085', marginBottom: 12 }}>{title}</h3>}
    <div
      style={{
        width: 375,
        border: '1px solid #E1E4E8',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#fff',
        padding: 24,
      }}
    >
      {children}
    </div>
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 style={{ fontSize: 14, fontWeight: 600, color: '#667085', marginBottom: 12 }}>{children}</h3>
);

const Row: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 12 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap, flexWrap: 'wrap' }}>{children}</div>
);

// ============================================================================
// 1. Button — Variants
// ============================================================================

export const Variants: Story = {
  name: 'Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <SectionTitle>Variants</SectionTitle>
        <Row>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="gray">Gray</Button>
          <Button variant="outline">Outline</Button>
        </Row>
      </div>
      <div>
        <SectionTitle>Disabled</SectionTitle>
        <Row>
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="ghost" disabled>Ghost</Button>
          <Button variant="outline" disabled>Outline</Button>
        </Row>
      </div>
    </div>
  ),
};

// ============================================================================
// 2. Button — Sizes
// ============================================================================

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionTitle>Sizes (xs → xl)</SectionTitle>
      <Row gap={16}>
        <Button size="xs">XS (28px)</Button>
        <Button size="s">S (32px)</Button>
        <Button size="m">M (40px)</Button>
        <Button size="l">L (48px)</Button>
        <Button size="xl">XL (52px)</Button>
      </Row>
    </div>
  ),
};

// ============================================================================
// 3. Button — Shapes
// ============================================================================

export const Shapes: Story = {
  name: 'Shapes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionTitle>Shapes</SectionTitle>
      <Row gap={16}>
        <Button shape="default">Default (4px)</Button>
        <Button shape="round">Round (999px)</Button>
        <Button shape="square">Square (0px)</Button>
        <Button shape="semi-round">Semi-round (8px)</Button>
      </Row>
    </div>
  ),
};

// ============================================================================
// 4. Button — With Icons
// ============================================================================

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <SectionTitle>Icon Front</SectionTitle>
        <Row>
          <Button iconFront={<RoundStroke.Search size={20} />}>검색</Button>
          <Button variant="ghost" iconFront={<RoundStroke.Left size={20} />}>뒤로</Button>
        </Row>
      </div>
      <div>
        <SectionTitle>Icon Back</SectionTitle>
        <Row>
          <Button iconBack={<RoundStroke.Right size={20} />}>다음</Button>
          <Button variant="secondary" iconBack={<RoundStroke.Download size={20} />}>다운로드</Button>
        </Row>
      </div>
      <div>
        <SectionTitle>Both Icons</SectionTitle>
        <Row>
          <Button iconFront={<RoundStroke.Left size={20} />} iconBack={<RoundStroke.Right size={20} />}>양쪽</Button>
        </Row>
      </div>
    </div>
  ),
};

// ============================================================================
// 5. Button — Full Width
// ============================================================================

export const FullWidth: Story = {
  name: 'Full Width',
  render: () => (
    <PhoneFrame title="fullWidth = true">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button fullWidth>Primary Full Width</Button>
        <Button fullWidth variant="ghost">Ghost Full Width</Button>
        <Button fullWidth variant="outline">Outline Full Width</Button>
      </div>
    </PhoneFrame>
  ),
};

// ============================================================================
// 6. IconButton
// ============================================================================

export const IconButtons: Story = {
  name: 'IconButton',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <SectionTitle>Variants</SectionTitle>
        <Row>
          <IconButton icon={<RoundStroke.Search size={20} />} variant="primary" aria-label="검색" />
          <IconButton icon={<RoundStroke.Search size={20} />} variant="secondary" aria-label="검색" />
          <IconButton icon={<RoundStroke.Search size={20} />} variant="ghost" aria-label="검색" />
          <IconButton icon={<RoundStroke.Search size={20} />} variant="gray" aria-label="검색" />
          <IconButton icon={<RoundStroke.Search size={20} />} variant="outline" aria-label="검색" />
        </Row>
      </div>
      <div>
        <SectionTitle>Sizes</SectionTitle>
        <Row>
          <IconButton icon={<RoundStroke.Search size={16} />} size="xs" aria-label="검색" />
          <IconButton icon={<RoundStroke.Search size={16} />} size="s" aria-label="검색" />
          <IconButton icon={<RoundStroke.Search size={20} />} size="m" aria-label="검색" />
          <IconButton icon={<RoundStroke.Search size={20} />} size="l" aria-label="검색" />
          <IconButton icon={<RoundStroke.Search size={24} />} size="xl" aria-label="검색" />
        </Row>
      </div>
      <div>
        <SectionTitle>Disabled</SectionTitle>
        <Row>
          <IconButton icon={<RoundStroke.Search size={20} />} disabled aria-label="검색" />
          <IconButton icon={<RoundStroke.Search size={20} />} variant="ghost" disabled aria-label="검색" />
        </Row>
      </div>
    </div>
  ),
};

// ============================================================================
// 7. TextButton
// ============================================================================

export const TextButtons: Story = {
  name: 'TextButton',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <SectionTitle>Sizes</SectionTitle>
        <Row gap={24}>
          <TextButton size="s">Small (12px)</TextButton>
          <TextButton size="m">Medium (14px)</TextButton>
          <TextButton size="l">Large (16px)</TextButton>
        </Row>
      </div>
      <div>
        <SectionTitle>With Arrow</SectionTitle>
        <Row gap={24}>
          <TextButton size="s" showArrow>더보기</TextButton>
          <TextButton size="m" showArrow>더보기</TextButton>
          <TextButton size="l" showArrow>더보기</TextButton>
        </Row>
      </div>
    </div>
  ),
};

// ============================================================================
// 8. FullButton + Group
// ============================================================================

export const FullButtons: Story = {
  name: 'FullButton',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PhoneFrame title="단일 FullButton">
        <FullButton>확인</FullButton>
      </PhoneFrame>

      <PhoneFrame title="FullButton.Group — vertical (Primary + Ghost)">
        <FullButton.Group layout="vertical" gap={8}>
          <FullButton variant="primary">확인</FullButton>
          <FullButton variant="ghost">취소</FullButton>
        </FullButton.Group>
      </PhoneFrame>

      <PhoneFrame title="FullButton.Group — horizontal">
        <FullButton.Group layout="horizontal" gap={8}>
          <FullButton variant="ghost" style={{ flex: 1 }}>취소</FullButton>
          <FullButton variant="primary" style={{ flex: 1 }}>확인</FullButton>
        </FullButton.Group>
      </PhoneFrame>

      <PhoneFrame title="Disabled">
        <FullButton disabled>비활성 버튼</FullButton>
      </PhoneFrame>
    </div>
  ),
};

// ============================================================================
// 9. SNSButton
// ============================================================================

export const SNSButtons: Story = {
  name: 'SNSButton',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <SectionTitle>Circle</SectionTitle>
        <Row gap={16}>
          <SNSButton provider="kakao" />
          <SNSButton provider="naver" />
          <SNSButton provider="google" />
          <SNSButton provider="apple" />
        </Row>
      </div>
      <PhoneFrame title="Square (with label)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SNSButton provider="kakao" shape="square" label="카카오로 시작하기" />
          <SNSButton provider="naver" shape="square" label="네이버로 시작하기" />
          <SNSButton provider="google" shape="square" label="Google로 시작하기" />
          <SNSButton provider="apple" shape="square" label="Apple로 시작하기" />
        </div>
      </PhoneFrame>
    </div>
  ),
};

// ============================================================================
// 10. Playground
// ============================================================================

export const Playground: Story = {
  args: {
    children: '버튼 텍스트',
    variant: 'primary',
    size: 'm',
    shape: 'default',
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    children: {
      control: 'text',
      description: '버튼 라벨 텍스트',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'gray', 'outline'],
      description: '버튼 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xl'],
      description: '버튼 크기',
    },
    shape: {
      control: 'select',
      options: ['default', 'round', 'square', 'semi-round'],
      description: '버튼 모양 (border-radius)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태',
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 채우기',
    },
    iconFront: { control: false },
    iconBack: { control: false },
  },
};

// ============================================================================
// 11. All Variants Gallery
// ============================================================================

const VARIANTS = ['primary', 'secondary', 'ghost', 'gray', 'outline'] as const;
const SIZES = ['xs', 's', 'm', 'l', 'xl'] as const;

export const AllVariants: Story = {
  name: 'All Variants Gallery',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      {/* Variant × Size Matrix */}
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Variant × Size</h2>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px 16px', textAlign: 'left', fontSize: 13, color: '#667085', borderBottom: '1px solid #E1E4E8' }}>Variant</th>
              {SIZES.map((s) => (
                <th key={s} style={{ padding: '8px 16px', textAlign: 'center', fontSize: 13, color: '#667085', borderBottom: '1px solid #E1E4E8' }}>{s.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {VARIANTS.map((v) => (
              <tr key={v}>
                <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500, borderBottom: '1px solid #F2F4F7' }}>{v}</td>
                {SIZES.map((s) => (
                  <td key={s} style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid #F2F4F7' }}>
                    <Button variant={v} size={s}>Label</Button>
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500, color: '#98A2B3' }}>disabled</td>
              {SIZES.map((s) => (
                <td key={s} style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <Button variant="primary" size={s} disabled>Label</Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Shapes */}
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Shapes</h2>
        <Row gap={16}>
          <Button shape="default">Default</Button>
          <Button shape="round">Round</Button>
          <Button shape="square">Square</Button>
          <Button shape="semi-round">Semi-round</Button>
        </Row>
      </div>

      {/* IconButton sizes */}
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>IconButton Sizes</h2>
        <Row gap={16}>
          {SIZES.map((s) => {
            const iconSize = s === 'xs' || s === 's' ? 16 : s === 'xl' ? 24 : 20;
            return <IconButton key={s} icon={<RoundStroke.Search size={iconSize} />} size={s} aria-label="검색" />;
          })}
        </Row>
      </div>

      {/* TextButton */}
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>TextButton</h2>
        <Row gap={24}>
          <TextButton size="s">Small</TextButton>
          <TextButton size="m">Medium</TextButton>
          <TextButton size="l">Large</TextButton>
          <TextButton size="s" showArrow>Arrow S</TextButton>
          <TextButton size="m" showArrow>Arrow M</TextButton>
          <TextButton size="l" showArrow>Arrow L</TextButton>
        </Row>
      </div>
    </div>
  ),
};

// ============================================================================
// 12. Login Page Example
// ============================================================================

export const LoginExample: Story = {
  name: 'Login Page Example',
  render: () => {
    const LoginDemo = () => {
      const [clicked, setClicked] = useState('');
      return (
        <PhoneFrame title="로그인 페이지 예시">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 700, paddingBottom: 8 }}>
              로그인
            </div>

            {/* 이메일/비밀번호 입력 영역 (placeholder) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ height: 48, border: '1px solid #E1E4E8', borderRadius: 4, padding: '0 16px', display: 'flex', alignItems: 'center', color: '#98A2B3', fontSize: 14 }}>이메일</div>
              <div style={{ height: 48, border: '1px solid #E1E4E8', borderRadius: 4, padding: '0 16px', display: 'flex', alignItems: 'center', color: '#98A2B3', fontSize: 14 }}>비밀번호</div>
            </div>

            <FullButton onClick={() => setClicked('login')}>로그인</FullButton>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <TextButton size="s">비밀번호 찾기</TextButton>
              <span style={{ color: '#E1E4E8' }}>|</span>
              <TextButton size="s">회원가입</TextButton>
            </div>

            <div style={{ position: 'relative', textAlign: 'center', margin: '8px 0' }}>
              <div style={{ borderTop: '1px solid #E1E4E8' }} />
              <span style={{ position: 'relative', top: -10, background: '#fff', padding: '0 12px', fontSize: 12, color: '#98A2B3' }}>SNS 로그인</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <SNSButton provider="kakao" onClick={() => setClicked('kakao')} />
              <SNSButton provider="naver" onClick={() => setClicked('naver')} />
              <SNSButton provider="google" onClick={() => setClicked('google')} />
              <SNSButton provider="apple" onClick={() => setClicked('apple')} />
            </div>

            {clicked && (
              <div style={{ textAlign: 'center', fontSize: 13, color: '#667085' }}>
                클릭: {clicked}
              </div>
            )}
          </div>
        </PhoneFrame>
      );
    };

    return <LoginDemo />;
  },
};

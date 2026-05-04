import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from '../../src/components/app/TextArea';

const meta = {
  title: 'Components/App/TextArea',
  component: TextArea,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Helper
// ============================================================================

const PhoneFrame: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div style={{ marginBottom: 32 }}>
    {title && <h3 style={{ fontSize: 14, fontWeight: 600, color: '#667085', marginBottom: 12 }}>{title}</h3>}
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

// ============================================================================
// 1. Default
// ============================================================================

export const Default: Story = {
  name: 'Default',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState('');
      return (
        <PhoneFrame title="기본 TextArea">
          <TextArea
            placeholder="플레이스 홀더입니다."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </PhoneFrame>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 2. Shapes
// ============================================================================

export const Shapes: Story = {
  name: 'Shapes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PhoneFrame title="Default (rounded)">
        <TextArea shape="default" placeholder="플레이스 홀더입니다." />
      </PhoneFrame>
      <PhoneFrame title="Square">
        <TextArea shape="square" placeholder="플레이스 홀더입니다." />
      </PhoneFrame>
    </div>
  ),
};

// ============================================================================
// 3. With Label
// ============================================================================

export const WithLabel: Story = {
  name: 'With Label',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PhoneFrame>
        <TextArea label="내용" placeholder="내용을 입력해주세요." />
      </PhoneFrame>
      <PhoneFrame>
        <TextArea label="내용" placeholder="내용을 입력해주세요." required />
      </PhoneFrame>
    </div>
  ),
};

// ============================================================================
// 4. States
// ============================================================================

export const States: Story = {
  name: 'States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PhoneFrame title="기본">
        <TextArea label="Label" placeholder="플레이스 홀더입니다." />
      </PhoneFrame>
      <PhoneFrame title="입력됨">
        <TextArea label="Label" value="기본 텍스트입니다." readOnly />
      </PhoneFrame>
      <PhoneFrame title="비활성">
        <TextArea label="Label" placeholder="비활성화 텍스트입니다." disabled />
      </PhoneFrame>
      <PhoneFrame title="에러">
        <TextArea label="Label" placeholder="플레이스 홀더입니다." errorMessage="에러 문구 입니다." />
      </PhoneFrame>
      <PhoneFrame title="캡션">
        <TextArea label="Label" placeholder="플레이스 홀더입니다." caption="안내 문구 입니다." />
      </PhoneFrame>
    </div>
  ),
};

// ============================================================================
// 5. Playground
// ============================================================================

export const Playground: Story = {
  args: {
    placeholder: '플레이스 홀더입니다.',
    shape: 'default',
    disabled: false,
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    shape: {
      control: 'select',
      options: ['default', 'square'],
      description: '입력 필드 형태',
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
    required: {
      control: 'boolean',
      description: '필수 표시',
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태',
    },
    caption: {
      control: 'text',
      description: '안내 문구',
    },
    errorMessage: {
      control: 'text',
      description: '에러 문구',
    },
  },
  render: (args) => (
    <div style={{ width: 328, padding: 24 }}>
      <TextArea {...args} />
    </div>
  ),
};

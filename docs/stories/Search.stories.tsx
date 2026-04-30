import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Search } from '../../src/components/app/Search';

const meta = {
  title: 'Components/App/Search',
  component: Search,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Search>;

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
        <PhoneFrame title="기본 Search">
          <Search
            placeholder="플레이스 홀더 입니다."
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
// 2. With Search Callback
// ============================================================================

export const WithSearchCallback: Story = {
  name: 'With Search Callback',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState('');
      const [result, setResult] = useState('');
      return (
        <PhoneFrame title="Enter 또는 아이콘 클릭 시 onSearch 호출">
          <Search
            placeholder="검색어를 입력하세요."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onSearch={(v) => setResult(v)}
          />
          {result && (
            <p style={{ marginTop: 12, fontSize: 14, color: '#667085' }}>
              검색어: {result}
            </p>
          )}
        </PhoneFrame>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 3. States
// ============================================================================

export const States: Story = {
  name: 'States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PhoneFrame title="기본 (placeholder)">
        <Search placeholder="플레이스 홀더 입니다." />
      </PhoneFrame>
      <PhoneFrame title="입력됨">
        <Search value="검색어 텍스트 입니다." readOnly />
      </PhoneFrame>
    </div>
  ),
};

// ============================================================================
// 4. Playground
// ============================================================================

export const Playground: Story = {
  args: {
    placeholder: '플레이스 홀더 입니다.',
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태',
    },
  },
  render: (args) => (
    <div style={{ width: 328, padding: 24 }}>
      <Search {...args} />
    </div>
  ),
};

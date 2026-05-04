import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from '../../src/components/app/Dropdown';

const meta = {
  title: 'Components/App/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const Section: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div style={{ marginBottom: 32 }}>
    {title && <h3 style={{ fontSize: 14, fontWeight: 600, color: '#667085', marginBottom: 12 }}>{title}</h3>}
    {children}
  </div>
);

const SAMPLE_OPTIONS = [
  { label: '기본 데이터', value: '1' },
  { label: '선택된 데이터', value: '2' },
  { label: '기본 데이터', value: '3' },
  { label: '기본 데이터', value: '4' },
  { label: '기본 데이터', value: '5' },
];

// ============================================================================
// 1. Default
// ============================================================================

export const Default: Story = {
  name: 'Default',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<string | undefined>();
      return (
        <Section title="기본 Dropdown">
          <div style={{ width: 328 }}>
            <Dropdown
              placeholder="플레이스 홀더입니다."
              value={value}
              options={SAMPLE_OPTIONS}
              onChange={setValue}
            />
          </div>
        </Section>
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
  render: () => {
    const Demo = () => {
      const [v1, setV1] = useState<string | undefined>();
      const [v2, setV2] = useState<string | undefined>();
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Section title="Default Shape">
            <div style={{ width: 328 }}>
              <Dropdown
                shape="default"
                placeholder="플레이스 홀더입니다."
                value={v1}
                options={SAMPLE_OPTIONS}
                onChange={setV1}
              />
            </div>
          </Section>
          <Section title="Line Shape">
            <div style={{ width: 328 }}>
              <Dropdown
                shape="line"
                placeholder="플레이스 홀더입니다."
                value={v2}
                options={SAMPLE_OPTIONS}
                onChange={setV2}
              />
            </div>
          </Section>
        </div>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 3. With Label
// ============================================================================

export const WithLabel: Story = {
  name: 'With Label',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<string | undefined>();
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Section title="라벨">
            <div style={{ width: 328 }}>
              <Dropdown
                label="라벨"
                placeholder="플레이스 홀더입니다."
                value={value}
                options={SAMPLE_OPTIONS}
                onChange={setValue}
              />
            </div>
          </Section>
          <Section title="라벨 + 필수">
            <div style={{ width: 328 }}>
              <Dropdown
                label="라벨"
                required
                placeholder="플레이스 홀더입니다."
                value={value}
                options={SAMPLE_OPTIONS}
                onChange={setValue}
              />
            </div>
          </Section>
        </div>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 4. States
// ============================================================================

export const States: Story = {
  name: 'States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section title="Disabled">
        <div style={{ width: 328 }}>
          <Dropdown
            placeholder="비활성화 텍스트입니다."
            disabled
            options={SAMPLE_OPTIONS}
          />
        </div>
      </Section>
      <Section title="Error">
        <div style={{ width: 328 }}>
          <Dropdown
            placeholder="플레이스 홀더입니다."
            errorMessage="에러 문구 입니다."
            options={SAMPLE_OPTIONS}
          />
        </div>
      </Section>
      <Section title="Caption">
        <div style={{ width: 328 }}>
          <Dropdown
            placeholder="플레이스 홀더입니다."
            caption="캡션 텍스트입니다."
            options={SAMPLE_OPTIONS}
          />
        </div>
      </Section>
    </div>
  ),
};

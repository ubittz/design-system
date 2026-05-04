import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Picker } from '../../src/components/app/Picker';

const meta = {
  title: 'Components/App/Picker',
  component: Picker,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Picker>;

export default meta;
type Story = StoryObj<typeof meta>;

const Section: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div style={{ marginBottom: 32 }}>
    {title && <h3 style={{ fontSize: 14, fontWeight: 600, color: '#667085', marginBottom: 12 }}>{title}</h3>}
    {children}
  </div>
);

// ============================================================================
// 1. Single Date
// ============================================================================

export const SingleDate: Story = {
  name: 'Single Date',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<Date | null>(null);
      return (
        <Section title="단일 날짜 선택">
          <div style={{ width: 328 }}>
            <Picker
              placeholder="플레이스 홀더입니다."
              value={value}
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
// 2. Date Range
// ============================================================================

export const DateRange: Story = {
  name: 'Date Range',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<[Date, Date] | null>(null);
      return (
        <Section title="날짜 범위 선택">
          <div style={{ width: 328 }}>
            <Picker
              mode="range"
              placeholder="플레이스 홀더입니다."
              value={value}
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
// 3. Shapes
// ============================================================================

export const Shapes: Story = {
  name: 'Shapes',
  render: () => {
    const Demo = () => {
      const [v1, setV1] = useState<Date | null>(null);
      const [v2, setV2] = useState<Date | null>(null);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Section title="Default Shape">
            <div style={{ width: 328 }}>
              <Picker
                shape="default"
                placeholder="플레이스 홀더입니다."
                value={v1}
                onChange={setV1}
              />
            </div>
          </Section>
          <Section title="Line Shape">
            <div style={{ width: 328 }}>
              <Picker
                shape="line"
                placeholder="플레이스 홀더입니다."
                value={v2}
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
// 4. With Label
// ============================================================================

export const WithLabel: Story = {
  name: 'With Label',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<Date | null>(null);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Section title="라벨">
            <div style={{ width: 328 }}>
              <Picker
                label="라벨"
                placeholder="플레이스 홀더입니다."
                value={value}
                onChange={setValue}
              />
            </div>
          </Section>
          <Section title="라벨 + 필수">
            <div style={{ width: 328 }}>
              <Picker
                label="라벨"
                required
                placeholder="플레이스 홀더입니다."
                value={value}
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
// 5. States
// ============================================================================

export const States: Story = {
  name: 'States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section title="Disabled">
        <div style={{ width: 328 }}>
          <Picker
            placeholder="비활성화 텍스트입니다."
            disabled
          />
        </div>
      </Section>
      <Section title="Error">
        <div style={{ width: 328 }}>
          <Picker
            placeholder="플레이스 홀더입니다."
            errorMessage="에러 문구 입니다."
          />
        </div>
      </Section>
      <Section title="Caption">
        <div style={{ width: 328 }}>
          <Picker
            placeholder="플레이스 홀더입니다."
            caption="캡션 텍스트입니다."
          />
        </div>
      </Section>
    </div>
  ),
};

// ============================================================================
// 6. Min/Max Date
// ============================================================================

export const MinMaxDate: Story = {
  name: 'Min/Max Date',
  render: () => {
    const Demo = () => {
      const today = new Date();
      const minDate = new Date(today.getFullYear(), today.getMonth(), 5);
      const maxDate = new Date(today.getFullYear(), today.getMonth(), 25);
      const [value, setValue] = useState<Date | null>(null);
      return (
        <Section title="선택 가능 범위 제한 (5일~25일)">
          <div style={{ width: 328 }}>
            <Picker
              placeholder="날짜를 선택하세요."
              value={value}
              onChange={setValue}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
        </Section>
      );
    };
    return <Demo />;
  },
};

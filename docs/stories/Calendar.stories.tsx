import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Calendar } from '../../src/components/app/Calendar';

const meta = {
  title: 'Components/App/Calendar',
  component: Calendar,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Helper
// ============================================================================

const Section: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div style={{ marginBottom: 32 }}>
    {title && <h3 style={{ fontSize: 14, fontWeight: 600, color: '#667085', marginBottom: 12 }}>{title}</h3>}
    {children}
  </div>
);

// ============================================================================
// 1. Single Select (Default)
// ============================================================================

export const SingleSelect: Story = {
  name: 'Single Select',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<Date | null>(null);
      return (
        <Section title="단일 날짜 선택">
          <Calendar value={value} onChange={setValue} />
          {value && (
            <p style={{ marginTop: 12, fontSize: 14, color: '#667085' }}>
              선택: {value.toLocaleDateString('ko-KR')}
            </p>
          )}
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 2. Range Select
// ============================================================================

export const RangeSelect: Story = {
  name: 'Range Select',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<[Date, Date] | null>(null);
      return (
        <Section title="날짜 범위 선택">
          <Calendar mode="range" value={value} onChange={setValue} />
          {value && (
            <p style={{ marginTop: 12, fontSize: 14, color: '#667085' }}>
              선택: {value[0].toLocaleDateString('ko-KR')} ~ {value[1].toLocaleDateString('ko-KR')}
            </p>
          )}
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 3. With Buttons
// ============================================================================

export const WithButtons: Story = {
  name: 'With Buttons',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<Date | null>(null);
      return (
        <Section title="하단 버튼 포함">
          <Calendar
            value={value}
            onChange={setValue}
            showButton
            onCancel={() => setValue(null)}
            onConfirm={() => alert(`확인: ${value?.toLocaleDateString('ko-KR') ?? '선택 없음'}`)}
          />
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 4. Without Day Header
// ============================================================================

export const WithoutDayHeader: Story = {
  name: 'Without Day Header',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<Date | null>(null);
      return (
        <Section title="요일 헤더 숨김">
          <Calendar value={value} onChange={setValue} showDayHeader={false} />
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 5. Min/Max Date
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
          <Calendar value={value} onChange={setValue} minDate={minDate} maxDate={maxDate} />
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 6. Range With Buttons
// ============================================================================

export const RangeWithButtons: Story = {
  name: 'Range With Buttons',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<[Date, Date] | null>(null);
      return (
        <Section title="범위 선택 + 버튼">
          <Calendar
            mode="range"
            value={value}
            onChange={setValue}
            showButton
            onCancel={() => setValue(null)}
            onConfirm={() => {
              if (value) {
                alert(`확인: ${value[0].toLocaleDateString('ko-KR')} ~ ${value[1].toLocaleDateString('ko-KR')}`);
              }
            }}
          />
        </Section>
      );
    };
    return <Demo />;
  },
};

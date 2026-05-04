import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { SortSelect } from '../../src/components/app/SortSelect';

const meta = {
  title: 'Components/App/SortSelect',
  component: SortSelect,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof SortSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const Section: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div style={{ marginBottom: 32 }}>
    {title && <h3 style={{ fontSize: 14, fontWeight: 600, color: '#667085', marginBottom: 12 }}>{title}</h3>}
    {children}
  </div>
);

const SAMPLE_OPTIONS = [
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popular' },
  { label: '가격 낮은순', value: 'price_asc' },
  { label: '가격 높은순', value: 'price_desc' },
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
        <Section title="기본 SortSelect">
          <SortSelect
            options={SAMPLE_OPTIONS}
            value={value}
            onChange={setValue}
          />
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 2. WithValue
// ============================================================================

export const WithValue: Story = {
  name: 'WithValue',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<string>('popular');
      return (
        <Section title="초기값이 설정된 SortSelect">
          <SortSelect
            options={SAMPLE_OPTIONS}
            value={value}
            onChange={setValue}
          />
        </Section>
      );
    };
    return <Demo />;
  },
};

import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Toggle } from '../../src/components/app/Toggle';

const meta = {
  title: 'Components/App/Toggle',
  component: Toggle,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const Section: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div style={{ marginBottom: 32 }}>
    {title && <h3 style={{ fontSize: 14, fontWeight: 600, color: '#667085', marginBottom: 12 }}>{title}</h3>}
    {children}
  </div>
);

// ============================================================================
// 1. Default (2 options)
// ============================================================================

export const Default: Story = {
  name: 'Default',
  render: () => {
    const Demo = () => {
      const [activeIndex, setActiveIndex] = useState(0);
      return (
        <Section title="2개 옵션">
          <div style={{ width: 320 }}>
            <Toggle items={['Label', 'Label']} activeIndex={activeIndex} onChange={setActiveIndex} />
          </div>
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 2. Three Options
// ============================================================================

export const ThreeOptions: Story = {
  name: 'Three Options',
  render: () => {
    const Demo = () => {
      const [activeIndex, setActiveIndex] = useState(0);
      return (
        <Section title="3개 옵션">
          <div style={{ width: 320 }}>
            <Toggle items={['전체', '진행중', '완료']} activeIndex={activeIndex} onChange={setActiveIndex} />
          </div>
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 3. Full Width
// ============================================================================

export const FullWidth: Story = {
  name: 'Full Width',
  render: () => {
    const Demo = () => {
      const [activeIndex, setActiveIndex] = useState(1);
      return (
        <Section title="전체 너비">
          <Toggle items={['월별', '주별']} activeIndex={activeIndex} onChange={setActiveIndex} />
        </Section>
      );
    };
    return <Demo />;
  },
};

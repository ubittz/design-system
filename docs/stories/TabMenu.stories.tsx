import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { TabMenu } from '../../src/components/app/TabMenu';

const meta = {
  title: 'Components/App/TabMenu',
  component: TabMenu,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TabMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabItems = ['전체', '인기', '신상품', '할인'];

const PhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      width: 375,
      margin: 24,
      border: '1px solid #E1E4E8',
      borderRadius: 12,
      overflow: 'hidden',
      background: '#fff',
    }}
  >
    {children}
  </div>
);

// ============================================================================
// Line variant
// ============================================================================

const InteractiveLineTab = () => {
  const [active, setActive] = useState(0);
  return (
    <PhoneFrame>
      <TabMenu items={tabItems} activeIndex={active} onChange={setActive} variant="line" />
      <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9DA5B4' }}>
        {tabItems[active]} 콘텐츠
      </div>
    </PhoneFrame>
  );
};

export const Line: Story = {
  name: 'Line (default)',
  render: () => <InteractiveLineTab />,
};

// ============================================================================
// Box variant
// ============================================================================

const InteractiveBoxTab = () => {
  const [active, setActive] = useState(0);
  return (
    <PhoneFrame>
      <TabMenu items={tabItems} activeIndex={active} onChange={setActive} variant="box" />
      <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9DA5B4' }}>
        {tabItems[active]} 콘텐츠
      </div>
    </PhoneFrame>
  );
};

export const Box: Story = {
  name: 'Box',
  render: () => <InteractiveBoxTab />,
};

// ============================================================================
// Two tabs
// ============================================================================

const InteractiveTwoTabs = () => {
  const [lineActive, setLineActive] = useState(0);
  const [boxActive, setBoxActive] = useState(0);
  const items = ['탭 1', '탭 2'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24 }}>
      <div>
        <h3 style={{ fontSize: 14, color: '#667085', marginBottom: 8 }}>Line - 2 tabs</h3>
        <div style={{ width: 375, border: '1px solid #E1E4E8', borderRadius: 8, overflow: 'hidden' }}>
          <TabMenu items={items} activeIndex={lineActive} onChange={setLineActive} variant="line" />
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: 14, color: '#667085', marginBottom: 8 }}>Box - 2 tabs</h3>
        <div style={{ width: 375, border: '1px solid #E1E4E8', borderRadius: 8, overflow: 'hidden' }}>
          <TabMenu items={items} activeIndex={boxActive} onChange={setBoxActive} variant="box" />
        </div>
      </div>
    </div>
  );
};

export const TwoTabs: Story = {
  name: '2 Tabs',
  render: () => <InteractiveTwoTabs />,
};

// ============================================================================
// Comparison
// ============================================================================

const VariantComparison = () => {
  const [lineActive, setLineActive] = useState(0);
  const [boxActive, setBoxActive] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 24 }}>
      <div>
        <h3 style={{ fontSize: 14, color: '#667085', marginBottom: 8 }}>Line variant</h3>
        <div style={{ width: 375, border: '1px solid #E1E4E8', borderRadius: 8, overflow: 'hidden' }}>
          <TabMenu items={tabItems} activeIndex={lineActive} onChange={setLineActive} variant="line" />
          <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9DA5B4' }}>
            {tabItems[lineActive]} 콘텐츠
          </div>
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: 14, color: '#667085', marginBottom: 8 }}>Box variant</h3>
        <div style={{ width: 375, border: '1px solid #E1E4E8', borderRadius: 8, overflow: 'hidden' }}>
          <TabMenu items={tabItems} activeIndex={boxActive} onChange={setBoxActive} variant="box" />
          <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9DA5B4' }}>
            {tabItems[boxActive]} 콘텐츠
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Playground
// ============================================================================

export const Playground: Story = {
  args: {
    items: tabItems,
    activeIndex: 0,
    variant: 'line',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'box'],
      description: '탭 메뉴 스타일',
    },
    activeIndex: {
      control: { type: 'number', min: 0, max: 3 },
      description: '현재 활성화된 탭 인덱스',
    },
    items: {
      control: false,
      description: '탭 라벨 문자열 배열',
    },
  },
  render: (args) => (
    <div style={{ width: 375, margin: 24, border: '1px solid #E1E4E8', borderRadius: 8, overflow: 'hidden' }}>
      <TabMenu {...args} />
    </div>
  ),
};

export const Comparison: Story = {
  name: 'Line vs Box',
  render: () => <VariantComparison />,
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { BottomNavigation } from '../../src/components/app/BottomNavigation';
import { RoundStroke, RoundSolid } from '../../src/icons';

const meta = {
  title: 'Components/App/BottomNavigation',
  component: BottomNavigation,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BottomNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    icon: <RoundStroke.Home size={24} />,
    activeIcon: <RoundSolid.Home size={24} />,
    label: '홈',
  },
  {
    icon: <RoundStroke.Compass size={24} />,
    activeIcon: <RoundSolid.Compass size={24} />,
    label: '탐색',
  },
  {
    icon: <RoundStroke.Heart size={24} />,
    activeIcon: <RoundSolid.Heart size={24} />,
    label: '찜',
  },
  {
    icon: <RoundStroke.Cart size={24} />,
    activeIcon: <RoundSolid.Cart size={24} />,
    label: '장바구니',
  },
  {
    icon: <RoundStroke.My size={24} />,
    activeIcon: <RoundSolid.My size={24} />,
    label: '마이',
  },
];

const InteractiveBottomNav = () => {
  const [active, setActive] = useState(0);
  return (
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
      <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9DA5B4' }}>
        {defaultItems[active].label} 페이지
      </div>
      <BottomNavigation items={defaultItems} activeIndex={active} onChange={setActive} />
    </div>
  );
};

export const Default: Story = {
  render: () => <InteractiveBottomNav />,
};

export const ThreeTabs: Story = {
  name: '3 Tabs',
  render: () => {
    const items = [
      {
        icon: <RoundStroke.Home size={24} />,
        activeIcon: <RoundSolid.Home size={24} />,
        label: '홈',
      },
      {
        icon: <RoundStroke.Heart size={24} />,
        activeIcon: <RoundSolid.Heart size={24} />,
        label: '찜',
      },
      {
        icon: <RoundStroke.My size={24} />,
        activeIcon: <RoundSolid.My size={24} />,
        label: '마이',
      },
    ];

    const [active, setActive] = useState(0);
    return (
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
        <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9DA5B4' }}>
          {items[active].label} 페이지
        </div>
        <BottomNavigation items={items} activeIndex={active} onChange={setActive} />
      </div>
    );
  },
};

export const FourTabs: Story = {
  name: '4 Tabs',
  render: () => {
    const items = [
      {
        icon: <RoundStroke.Home size={24} />,
        activeIcon: <RoundSolid.Home size={24} />,
        label: '홈',
      },
      {
        icon: <RoundStroke.Compass size={24} />,
        activeIcon: <RoundSolid.Compass size={24} />,
        label: '탐색',
      },
      {
        icon: <RoundStroke.Heart size={24} />,
        activeIcon: <RoundSolid.Heart size={24} />,
        label: '찜',
      },
      {
        icon: <RoundStroke.My size={24} />,
        activeIcon: <RoundSolid.My size={24} />,
        label: '마이',
      },
    ];

    const [active, setActive] = useState(0);
    return (
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
        <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9DA5B4' }}>
          {items[active].label} 페이지
        </div>
        <BottomNavigation items={items} activeIndex={active} onChange={setActive} />
      </div>
    );
  },
};

// ============================================================================
// Playground
// ============================================================================

export const Playground: Story = {
  args: {
    items: defaultItems,
    activeIndex: 0,
  },
  argTypes: {
    activeIndex: {
      control: { type: 'number', min: 0, max: 4 },
      description: '현재 활성화된 탭 인덱스',
    },
    items: {
      control: false,
      description: '네비게이션 아이템 배열',
    },
  },
  render: (args) => (
    <div style={{ width: 375, margin: 24, border: '1px solid #E1E4E8', borderRadius: 8, overflow: 'hidden' }}>
      <BottomNavigation {...args} />
    </div>
  ),
};

export const ActiveStates: Story = {
  name: 'Active States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24 }}>
      {defaultItems.map((_, idx) => (
        <div key={idx}>
          <h3 style={{ fontSize: 14, color: '#667085', marginBottom: 8 }}>Active: {defaultItems[idx].label}</h3>
          <div style={{ width: 375, border: '1px solid #E1E4E8', borderRadius: 8, overflow: 'hidden' }}>
            <BottomNavigation items={defaultItems} activeIndex={idx} />
          </div>
        </div>
      ))}
    </div>
  ),
};

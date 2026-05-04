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
    value: '/home',
    icon: <RoundStroke.Home size={24} />,
    activeIcon: <RoundSolid.Home size={24} />,
    label: '홈',
  },
  {
    value: '/explore',
    icon: <RoundStroke.Compass size={24} />,
    activeIcon: <RoundSolid.Compass size={24} />,
    label: '탐색',
  },
  {
    value: '/favorites',
    icon: <RoundStroke.Heart size={24} />,
    activeIcon: <RoundSolid.Heart size={24} />,
    label: '찜',
  },
  {
    value: '/cart',
    icon: <RoundStroke.Cart size={24} />,
    activeIcon: <RoundSolid.Cart size={24} />,
    label: '장바구니',
  },
  {
    value: '/my',
    icon: <RoundStroke.My size={24} />,
    activeIcon: <RoundSolid.My size={24} />,
    label: '마이',
  },
];

const InteractiveBottomNav = () => {
  const [active, setActive] = useState('/home');
  const currentItem = defaultItems.find((item) => item.value === active);
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
        {currentItem?.label} 페이지 ({active})
      </div>
      <BottomNavigation items={defaultItems} value={active} onChange={setActive} />
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
        value: '/home',
        icon: <RoundStroke.Home size={24} />,
        activeIcon: <RoundSolid.Home size={24} />,
        label: '홈',
      },
      {
        value: '/favorites',
        icon: <RoundStroke.Heart size={24} />,
        activeIcon: <RoundSolid.Heart size={24} />,
        label: '찜',
      },
      {
        value: '/my',
        icon: <RoundStroke.My size={24} />,
        activeIcon: <RoundSolid.My size={24} />,
        label: '마이',
      },
    ];

    const [active, setActive] = useState('/home');
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
          {items.find((i) => i.value === active)?.label} 페이지
        </div>
        <BottomNavigation items={items} value={active} onChange={setActive} />
      </div>
    );
  },
};

export const FourTabs: Story = {
  name: '4 Tabs',
  render: () => {
    const items = [
      {
        value: '/home',
        icon: <RoundStroke.Home size={24} />,
        activeIcon: <RoundSolid.Home size={24} />,
        label: '홈',
      },
      {
        value: '/explore',
        icon: <RoundStroke.Compass size={24} />,
        activeIcon: <RoundSolid.Compass size={24} />,
        label: '탐색',
      },
      {
        value: '/favorites',
        icon: <RoundStroke.Heart size={24} />,
        activeIcon: <RoundSolid.Heart size={24} />,
        label: '찜',
      },
      {
        value: '/my',
        icon: <RoundStroke.My size={24} />,
        activeIcon: <RoundSolid.My size={24} />,
        label: '마이',
      },
    ];

    const [active, setActive] = useState('/home');
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
          {items.find((i) => i.value === active)?.label} 페이지
        </div>
        <BottomNavigation items={items} value={active} onChange={setActive} />
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
    value: '/home',
  },
  argTypes: {
    value: {
      control: 'select',
      options: ['/home', '/explore', '/favorites', '/cart', '/my'],
      description: '현재 활성화된 라우트 값',
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
      {defaultItems.map((item) => (
        <div key={item.value}>
          <h3 style={{ fontSize: 14, color: '#667085', marginBottom: 8 }}>Active: {item.label} ({item.value})</h3>
          <div style={{ width: 375, border: '1px solid #E1E4E8', borderRadius: 8, overflow: 'hidden' }}>
            <BottomNavigation items={defaultItems} value={item.value} />
          </div>
        </div>
      ))}
    </div>
  ),
};

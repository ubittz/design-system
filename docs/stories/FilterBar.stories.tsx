import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { FilterBar } from '../../src/components/app/FilterBar';

const meta = {
  title: 'Components/App/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// 1. Default
// ============================================================================

export const Default: Story = {
  name: 'Default',
  render: () => {
    const Demo = () => {
      const [selected, setSelected] = useState('all');
      const options = [
        { label: '전체', value: 'all' },
        { label: '진행중', value: 'in-progress' },
        { label: '완료', value: 'completed' },
        { label: '대기', value: 'pending' },
        { label: '취소', value: 'cancelled' },
      ];
      return (
        <FilterBar options={options} value={selected} onChange={setSelected} />
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 2. WithSelection
// ============================================================================

export const WithSelection: Story = {
  name: 'WithSelection',
  render: () => {
    const Demo = () => {
      const [selected, setSelected] = useState('korean');
      const options = [
        { label: '한식', value: 'korean' },
        { label: '중식', value: 'chinese' },
        { label: '일식', value: 'japanese' },
        { label: '양식', value: 'western' },
        { label: '분식', value: 'snack' },
        { label: '카페/디저트', value: 'cafe' },
        { label: '패스트푸드', value: 'fastfood' },
        { label: '치킨', value: 'chicken' },
        { label: '피자', value: 'pizza' },
        { label: '아시안', value: 'asian' },
      ];
      return (
        <div style={{ maxWidth: 400 }}>
          <FilterBar options={options} value={selected} onChange={setSelected} />
        </div>
      );
    };
    return <Demo />;
  },
};

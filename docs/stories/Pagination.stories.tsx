import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from '../../src/components/app/Pagination';

const meta = {
  title: 'Components/App/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Interactive
// ============================================================================

const InteractivePagination = ({ total, maxVisible }: { total: number; maxVisible?: number }) => {
  const [current, setCurrent] = useState(1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <Pagination current={current} total={total} onChange={setCurrent} maxVisible={maxVisible} />
      <span style={{ fontSize: 13, color: '#667085' }}>
        현재 페이지: {current} / {total}
      </span>
    </div>
  );
};

export const Default: Story = {
  render: () => <InteractivePagination total={10} />,
};

export const FewPages: Story = {
  name: 'Few pages (3)',
  render: () => <InteractivePagination total={3} />,
};

export const ManyPages: Story = {
  name: 'Many pages (50)',
  render: () => <InteractivePagination total={50} />,
};

export const CustomMaxVisible: Story = {
  name: 'Max visible = 7',
  render: () => <InteractivePagination total={20} maxVisible={7} />,
};

// ============================================================================
// All States
// ============================================================================

// ============================================================================
// Playground
// ============================================================================

export const Playground: Story = {
  args: {
    current: 1,
    total: 10,
    maxVisible: 5,
  },
  argTypes: {
    current: {
      control: { type: 'number', min: 1, max: 100 },
      description: '현재 활성 페이지 (1-based)',
    },
    total: {
      control: { type: 'number', min: 1, max: 100 },
      description: '전체 페이지 수',
    },
    maxVisible: {
      control: { type: 'number', min: 3, max: 10 },
      description: '한 번에 표시할 최대 페이지 번호 수',
    },
  },
};

export const States: Story = {
  name: 'Static states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h3 style={{ fontSize: 14, color: '#667085', marginBottom: 12 }}>First page</h3>
        <Pagination current={1} total={10} />
      </div>
      <div>
        <h3 style={{ fontSize: 14, color: '#667085', marginBottom: 12 }}>Middle page</h3>
        <Pagination current={5} total={10} />
      </div>
      <div>
        <h3 style={{ fontSize: 14, color: '#667085', marginBottom: 12 }}>Last page</h3>
        <Pagination current={10} total={10} />
      </div>
      <div>
        <h3 style={{ fontSize: 14, color: '#667085', marginBottom: 12 }}>Single page</h3>
        <Pagination current={1} total={1} />
      </div>
    </div>
  ),
};

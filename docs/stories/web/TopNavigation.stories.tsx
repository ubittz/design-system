import type { Meta, StoryObj } from '@storybook/react';

import { TopNavigation } from '../../../src/components/web/TopNavigation';
import { RoundStroke } from '../../../src/icons';

const meta = {
  title: 'Components/Web/TopNavigation',
  component: TopNavigation,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TopNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

const IconButton: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => (
  <button
    type='button'
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 24,
      height: 24,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 0,
      color: 'var(--component-navigation-default-iconPrimary)',
    }}
  >
    {children}
  </button>
);

// ============================================================================
// Variants
// ============================================================================

export const BackWithTitle: Story = {
  name: 'Back + Title',
  render: () => (
    <TopNavigation
      left={
        <IconButton>
          <RoundStroke.Left size={24} />
        </IconButton>
      }
      title='페이지 타이틀'
    />
  ),
};

export const BackWithTitleAndActions: Story = {
  name: 'Back + Title + Actions',
  render: () => (
    <TopNavigation
      left={
        <IconButton>
          <RoundStroke.Left size={24} />
        </IconButton>
      }
      title='상품 상세'
      right={
        <div style={{ display: 'flex', gap: 16 }}>
          <IconButton>
            <RoundStroke.Cart size={24} />
          </IconButton>
          <IconButton>
            <RoundStroke.Share size={24} />
          </IconButton>
        </div>
      }
    />
  ),
};

export const MenuWithLogo: Story = {
  name: 'Menu + Logo area',
  render: () => (
    <TopNavigation
      left={
        <IconButton>
          <RoundStroke.Hamburger size={24} />
        </IconButton>
      }
      right={
        <div style={{ display: 'flex', gap: 16 }}>
          <IconButton>
            <RoundStroke.Search size={24} />
          </IconButton>
          <IconButton>
            <RoundStroke.Cart size={24} />
          </IconButton>
        </div>
      }
    />
  ),
};

export const CloseAction: Story = {
  name: 'Close action',
  render: () => (
    <TopNavigation
      title='필터'
      right={
        <IconButton>
          <RoundStroke.Cancel size={24} />
        </IconButton>
      }
    />
  ),
};

// ============================================================================
// Playground
// ============================================================================

export const Playground: Story = {
  args: {
    title: '페이지 타이틀',
  },
  argTypes: {
    title: {
      control: 'text',
      description: '중앙에 표시되는 타이틀 텍스트',
    },
    left: {
      control: false,
      description: '왼쪽 슬롯 (ReactNode)',
    },
    right: {
      control: false,
      description: '오른쪽 슬롯 (ReactNode)',
    },
  },
  render: (args) => (
    <TopNavigation
      {...args}
      left={
        <IconButton>
          <RoundStroke.Left size={24} />
        </IconButton>
      }
      right={
        <div style={{ display: 'flex', gap: 16 }}>
          <IconButton>
            <RoundStroke.Cart size={24} />
          </IconButton>
        </div>
      }
    />
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24 }}>
      <div>
        <h3 style={{ fontSize: 14, color: '#667085', marginBottom: 8 }}>Back + Title</h3>
        <div style={{ border: '1px solid #E1E4E8', borderRadius: 8, overflow: 'hidden' }}>
          <TopNavigation
            left={
              <IconButton>
                <RoundStroke.Left size={24} />
              </IconButton>
            }
            title='페이지 타이틀'
          />
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: 14, color: '#667085', marginBottom: 8 }}>Back + Title + Right actions</h3>
        <div style={{ border: '1px solid #E1E4E8', borderRadius: 8, overflow: 'hidden' }}>
          <TopNavigation
            left={
              <IconButton>
                <RoundStroke.Left size={24} />
              </IconButton>
            }
            title='상품 상세'
            right={
              <div style={{ display: 'flex', gap: 16 }}>
                <IconButton>
                  <RoundStroke.Cart size={24} />
                </IconButton>
                <IconButton>
                  <RoundStroke.Share size={24} />
                </IconButton>
              </div>
            }
          />
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: 14, color: '#667085', marginBottom: 8 }}>Menu + Search/Cart</h3>
        <div style={{ border: '1px solid #E1E4E8', borderRadius: 8, overflow: 'hidden' }}>
          <TopNavigation
            left={
              <IconButton>
                <RoundStroke.Hamburger size={24} />
              </IconButton>
            }
            right={
              <div style={{ display: 'flex', gap: 16 }}>
                <IconButton>
                  <RoundStroke.Search size={24} />
                </IconButton>
                <IconButton>
                  <RoundStroke.Cart size={24} />
                </IconButton>
              </div>
            }
          />
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: 14, color: '#667085', marginBottom: 8 }}>Title + Close</h3>
        <div style={{ border: '1px solid #E1E4E8', borderRadius: 8, overflow: 'hidden' }}>
          <TopNavigation
            title='필터'
            right={
              <IconButton>
                <RoundStroke.Cancel size={24} />
              </IconButton>
            }
          />
        </div>
      </div>
    </div>
  ),
};

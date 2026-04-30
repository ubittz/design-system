import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheet, BottomSheetProvider, useBottomSheet } from '../../src/components/app/BottomSheet';
import { Button } from '../../src/components/app/Button';

const meta = {
  title: 'Components/App/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = ({ text }: { text?: string }) => (
  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        style={{
          padding: '12px 16px',
          background: '#f3f5f7',
          borderRadius: 4,
          fontSize: 14,
          color: '#4b5362',
        }}
      >
        {text || `항목 ${i + 1}`}
      </div>
    ))}
  </div>
);

// ============================================================================
// 1. Default (Title + Content)
// ============================================================================

export const Default: Story = {
  name: 'Default',
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>BottomSheet 열기</Button>
          <BottomSheet open={open} title="Title" onClose={() => setOpen(false)}>
            <SampleContent />
          </BottomSheet>
        </>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 2. With Close Button
// ============================================================================

export const WithClose: Story = {
  name: 'With Close',
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>BottomSheet 열기</Button>
          <BottomSheet open={open} title="Title" showClose onClose={() => setOpen(false)}>
            <SampleContent />
          </BottomSheet>
        </>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 3. With Button
// ============================================================================

export const WithButton: Story = {
  name: 'With Button',
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>BottomSheet 열기</Button>
          <BottomSheet
            open={open}
            title="Title"
            showClose
            button={{ label: '확인', onClick: () => setOpen(false) }}
            onClose={() => setOpen(false)}
          >
            <SampleContent />
          </BottomSheet>
        </>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 4. useBottomSheet Hook
// ============================================================================

export const WithHook: Story = {
  name: 'useBottomSheet Hook',
  render: () => {
    const Inner = () => {
      const sheet = useBottomSheet();
      return (
        <Button
          onClick={() =>
            sheet.open({
              title: 'Title',
              showClose: true,
              content: <SampleContent text="Hook으로 호출된 항목" />,
              button: { label: '확인' },
            })
          }
        >
          useBottomSheet로 열기
        </Button>
      );
    };
    return (
      <BottomSheetProvider>
        <Inner />
      </BottomSheetProvider>
    );
  },
};

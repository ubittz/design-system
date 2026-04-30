import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popup, PopupProvider, usePopup } from '../../src/components/app/Popup';
import { Button } from '../../src/components/app/Button';

const meta = {
  title: 'Components/App/Popup',
  component: Popup,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// 1. Horizontal Buttons (with body)
// ============================================================================

export const HorizontalWithBody: Story = {
  name: 'Horizontal (Body 있음)',
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>팝업 열기</Button>
          <Popup
            open={open}
            title="Title"
            body="Body Text Body Text Body Text Body Text Body Text Body"
            cancelButton={{ label: '취소', onClick: () => setOpen(false) }}
            confirmButton={{ label: '확인', onClick: () => setOpen(false) }}
            onBackdropClick={() => setOpen(false)}
          />
        </>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 2. Single Button (with body)
// ============================================================================

export const SingleWithBody: Story = {
  name: 'Single (Body 있음)',
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>팝업 열기</Button>
          <Popup
            open={open}
            title="Title"
            body="Body Text Body Text Body Text Body Text Body Text Body"
            confirmButton={{ label: '확인', onClick: () => setOpen(false) }}
            onBackdropClick={() => setOpen(false)}
          />
        </>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 3. Horizontal Buttons (no body)
// ============================================================================

export const HorizontalNoBody: Story = {
  name: 'Horizontal (Body 없음)',
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>팝업 열기</Button>
          <Popup
            open={open}
            title="Title"
            cancelButton={{ label: '취소', onClick: () => setOpen(false) }}
            confirmButton={{ label: '확인', onClick: () => setOpen(false) }}
            onBackdropClick={() => setOpen(false)}
          />
        </>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 4. Single Button (no body)
// ============================================================================

export const SingleNoBody: Story = {
  name: 'Single (Body 없음)',
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>팝업 열기</Button>
          <Popup
            open={open}
            title="Title"
            confirmButton={{ label: '확인', onClick: () => setOpen(false) }}
            onBackdropClick={() => setOpen(false)}
          />
        </>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 5. usePopup Hook
// ============================================================================

export const WithHook: Story = {
  name: 'usePopup Hook',
  render: () => {
    const Inner = () => {
      const popup = usePopup();
      return (
        <Button
          onClick={() =>
            popup.open({
              title: 'Title',
              body: 'usePopup Hook으로 호출된 팝업입니다.',
              cancelButton: { label: '취소' },
              confirmButton: { label: '확인' },
            })
          }
        >
          usePopup으로 열기
        </Button>
      );
    };
    return (
      <PopupProvider>
        <Inner />
      </PopupProvider>
    );
  },
};

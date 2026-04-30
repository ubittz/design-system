import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ImageUploader, ImageFile } from '../../src/components/app/ImageUploader';

const meta = {
  title: 'Components/App/ImageUploader',
  component: ImageUploader,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ImageUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

const Section: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div style={{ marginBottom: 32 }}>
    {title && <h3 style={{ fontSize: 14, fontWeight: 600, color: '#667085', marginBottom: 12 }}>{title}</h3>}
    {children}
  </div>
);

// ============================================================================
// 1. Default
// ============================================================================

export const Default: Story = {
  name: 'Default',
  render: () => {
    const Demo = () => {
      const [files, setFiles] = useState<ImageFile[]>([]);
      return (
        <Section title="기본 이미지 업로더">
          <div style={{ width: 328 }}>
            <ImageUploader value={files} onChange={setFiles} />
          </div>
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 2. With Max Count
// ============================================================================

export const MaxCount: Story = {
  name: 'Max Count',
  render: () => {
    const Demo = () => {
      const [files, setFiles] = useState<ImageFile[]>([]);
      return (
        <Section title="최대 3장 제한">
          <div style={{ width: 328 }}>
            <ImageUploader value={files} onChange={setFiles} maxCount={3} />
          </div>
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 3. Disabled
// ============================================================================

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <Section title="비활성화">
      <div style={{ width: 328 }}>
        <ImageUploader disabled />
      </div>
    </Section>
  ),
};

// ============================================================================
// 4. Pre-filled
// ============================================================================

export const PreFilled: Story = {
  name: 'Pre-filled',
  render: () => {
    const Demo = () => {
      const [files, setFiles] = useState<ImageFile[]>([
        { id: '1', url: 'https://picsum.photos/seed/a/200', name: 'photo_01.jpg' },
        { id: '2', url: 'https://picsum.photos/seed/b/200', name: 'photo_02.jpg' },
        { id: '3', url: 'https://picsum.photos/seed/c/200', name: 'landscape_long_filename.jpg' },
      ]);
      return (
        <Section title="초기 이미지 포함">
          <div style={{ width: 328 }}>
            <ImageUploader value={files} onChange={setFiles} />
          </div>
        </Section>
      );
    };
    return <Demo />;
  },
};

import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '../../src/components/app/Checkbox';

const meta = {
  title: 'Components/App/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const Section: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div style={{ marginBottom: 32 }}>
    {title && <h3 style={{ fontSize: 14, fontWeight: 600, color: '#667085', marginBottom: 12 }}>{title}</h3>}
    <div style={{ width: 320 }}>{children}</div>
  </div>
);

// ============================================================================
// 1. Default
// ============================================================================

export const Default: Story = {
  name: 'Default',
  render: () => {
    const Demo = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Section title="기본">
          <Checkbox label="동의합니다" checked={checked} onChange={setChecked} />
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 2. Selected
// ============================================================================

export const Selected: Story = {
  name: 'Selected',
  render: () => {
    const Demo = () => {
      const [checked, setChecked] = useState(true);
      return (
        <Section title="선택됨">
          <Checkbox label="동의합니다" checked={checked} onChange={setChecked} />
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 3. WithCaption
// ============================================================================

export const WithCaption: Story = {
  name: 'With Caption',
  render: () => {
    const Demo = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Section title="캡션 포함">
          <Checkbox label="개인정보 수집 및 이용에 동의합니다" caption="필수" checked={checked} onChange={setChecked} />
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 4. WithArrow
// ============================================================================

export const WithArrow: Story = {
  name: 'With Arrow',
  render: () => {
    const Demo = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Section title="화살표 포함">
          <Checkbox label="이용약관에 동의합니다" caption="필수" arrow checked={checked} onChange={setChecked} />
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 5. SquareShape
// ============================================================================

export const SquareShape: Story = {
  name: 'Square Shape',
  render: () => {
    const Demo = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Section title="사각형 모양">
          <Checkbox label="동의합니다" shape="square" checked={checked} onChange={setChecked} />
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 6. SizeM
// ============================================================================

export const SizeM: Story = {
  name: 'Size M',
  render: () => {
    const Demo = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Section title="Size M">
          <Checkbox label="전체 약관에 동의합니다" size="M" checked={checked} onChange={setChecked} />
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 7. Disabled
// ============================================================================

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <Section title="비활성화">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Checkbox label="비활성 (미선택)" disabled />
        <Checkbox label="비활성 (선택됨)" disabled checked />
      </div>
    </Section>
  ),
};

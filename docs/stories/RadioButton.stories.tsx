import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { RadioButton } from '../../src/components/app/RadioButton';

const meta = {
  title: 'Components/App/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RadioButton>;

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
      const [checked, setChecked] = useState(false);
      return (
        <Section title="기본 (Size S)">
          <RadioButton
            label="라디오 버튼"
            checked={checked}
            onChange={setChecked}
          />
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
      const [selected, setSelected] = useState<string>('option1');
      return (
        <Section title="선택 상태">
          <RadioButton
            label="옵션 1"
            value="option1"
            name="selected-group"
            checked={selected === 'option1'}
            onChange={() => setSelected('option1')}
          />
          <RadioButton
            label="옵션 2"
            value="option2"
            name="selected-group"
            checked={selected === 'option2'}
            onChange={() => setSelected('option2')}
          />
          <RadioButton
            label="옵션 3"
            value="option3"
            name="selected-group"
            checked={selected === 'option3'}
            onChange={() => setSelected('option3')}
          />
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 3. Size M
// ============================================================================

export const SizeM: Story = {
  name: 'Size M',
  render: () => {
    const Demo = () => {
      const [selected, setSelected] = useState<string>('a');
      return (
        <Section title="Size M">
          <RadioButton
            size="M"
            label="큰 라디오 A"
            value="a"
            name="size-m-group"
            checked={selected === 'a'}
            onChange={() => setSelected('a')}
          />
          <RadioButton
            size="M"
            label="큰 라디오 B"
            value="b"
            name="size-m-group"
            checked={selected === 'b'}
            onChange={() => setSelected('b')}
          />
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 4. Disabled
// ============================================================================

export const Disabled: Story = {
  name: 'Disabled',
  render: () => {
    return (
      <Section title="비활성화">
        <RadioButton label="비활성 (미선택)" disabled />
        <RadioButton label="비활성 (선택)" checked disabled />
      </Section>
    );
  },
};

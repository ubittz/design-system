import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { SelectableOption } from '../../src/components/app/SelectableOption';

const meta = {
  title: 'Components/App/SelectableOption',
  component: SelectableOption,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof SelectableOption>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Helper
// ============================================================================

const Section: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div style={{ marginBottom: 32 }}>
    {title && <h3 style={{ fontSize: 14, fontWeight: 600, color: '#667085', marginBottom: 12 }}>{title}</h3>}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{children}</div>
  </div>
);

// ============================================================================
// 1. Default
// ============================================================================

export const Default: Story = {
  name: 'Default',
  render: () => {
    const Demo = () => {
      const [selected, setSelected] = useState<string | null>(null);
      const options = ['옵션 1', '옵션 2', '옵션 3', '옵션 4'];
      return (
        <Section title="단일 선택">
          {options.map((opt) => (
            <SelectableOption
              key={opt}
              selected={selected === opt}
              onClick={() => setSelected(selected === opt ? null : opt)}
            >
              {opt}
            </SelectableOption>
          ))}
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 2. Shapes
// ============================================================================

export const Shapes: Story = {
  name: 'Shapes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section title="Default (4px)">
        <SelectableOption shape="default">Default</SelectableOption>
        <SelectableOption shape="default" selected>Selected</SelectableOption>
      </Section>
      <Section title="Round (999px)">
        <SelectableOption shape="round">Default</SelectableOption>
        <SelectableOption shape="round" selected>Selected</SelectableOption>
      </Section>
      <Section title="Square (0px)">
        <SelectableOption shape="square">Default</SelectableOption>
        <SelectableOption shape="square" selected>Selected</SelectableOption>
      </Section>
    </div>
  ),
};

// ============================================================================
// 3. Sizes
// ============================================================================

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Section title="Small">
        <SelectableOption size="s">Label</SelectableOption>
        <SelectableOption size="s" selected>Label</SelectableOption>
      </Section>
      <Section title="Medium">
        <SelectableOption size="m">Label</SelectableOption>
        <SelectableOption size="m" selected>Label</SelectableOption>
      </Section>
      <Section title="Large">
        <SelectableOption size="l">Label</SelectableOption>
        <SelectableOption size="l" selected>Label</SelectableOption>
      </Section>
    </div>
  ),
};

// ============================================================================
// 4. Multi Select
// ============================================================================

export const MultiSelect: Story = {
  name: 'Multi Select',
  render: () => {
    const Demo = () => {
      const [selected, setSelected] = useState<Set<string>>(new Set());
      const options = ['한식', '중식', '일식', '양식', '분식'];
      const toggle = (opt: string) => {
        setSelected((prev) => {
          const next = new Set(prev);
          if (next.has(opt)) next.delete(opt);
          else next.add(opt);
          return next;
        });
      };
      return (
        <Section title="복수 선택">
          {options.map((opt) => (
            <SelectableOption
              key={opt}
              shape="round"
              selected={selected.has(opt)}
              onClick={() => toggle(opt)}
            >
              {opt}
            </SelectableOption>
          ))}
        </Section>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 5. Playground
// ============================================================================

export const Playground: Story = {
  args: {
    children: 'Label',
    shape: 'default',
    size: 'm',
    selected: false,
  },
  argTypes: {
    shape: {
      control: 'select',
      options: ['default', 'round', 'square'],
      description: '모서리 형태',
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description: '크기',
    },
    selected: {
      control: 'boolean',
      description: '선택 상태',
    },
    children: {
      control: 'text',
      description: '라벨 텍스트',
    },
  },
};

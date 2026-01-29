import type { Meta, StoryObj } from '@storybook/react';

import { baseColors, semanticColors } from '../../src/tokens/colors';

const meta = {
  title: 'Design Tokens/Colors',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ColorSwatch = ({ name, value }: { name: string; value: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
    <div
      style={{
        width: '80px',
        height: '40px',
        backgroundColor: value,
        border: '1px solid #e1e4e8',
        borderRadius: '4px',
        marginRight: '12px',
      }}
    />
    <div>
      <div style={{ fontSize: '14px', fontWeight: 600 }}>{name}</div>
      <div style={{ fontSize: '12px', color: '#667085' }}>{value}</div>
    </div>
  </div>
);

const ColorScaleSection = ({ title, colors }: { title: string; colors: Record<string, string> }) => (
  <div style={{ marginBottom: '32px' }}>
    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>{title}</h3>
    <div>
      {Object.entries(colors).map(([key, value]) => (
        <ColorSwatch key={key} name={key} value={value} />
      ))}
    </div>
  </div>
);

export const BaseColors: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Base Colors</h1>
      <p style={{ fontSize: '16px', color: '#667085', marginBottom: '48px' }}>기본 컬러 팔레트입니다. 각 컬러는 050~900 단계로 구성되어 있습니다.</p>

      <ColorScaleSection title='Gray' colors={baseColors.gray} />
      <ColorScaleSection title='Coral' colors={baseColors.coral} />
      <ColorScaleSection title='Apple' colors={baseColors.apple} />
      <ColorScaleSection title='Carrot' colors={baseColors.carrot} />
      <ColorScaleSection title='Orange' colors={baseColors.orange} />
      <ColorScaleSection title='Mustard' colors={baseColors.mustard} />
      <ColorScaleSection title='Lemon' colors={baseColors.lemon} />
      <ColorScaleSection title='Coffee' colors={baseColors.coffee} />
      <ColorScaleSection title='Grass' colors={baseColors.grass} />
      <ColorScaleSection title='Sage' colors={baseColors.sage} />
      <ColorScaleSection title='Pistachio' colors={baseColors.pistachio} />
      <ColorScaleSection title='Sky' colors={baseColors.sky} />
      <ColorScaleSection title='Blueberry' colors={baseColors.blueberry} />
      <ColorScaleSection title='Violet' colors={baseColors.violet} />
      <ColorScaleSection title='Plum' colors={baseColors.plum} />
      <ColorScaleSection title='Purple' colors={baseColors.purple} />
      <ColorScaleSection title='Wine' colors={baseColors.wine} />
    </div>
  ),
};

export const BrandColors: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Brand Colors</h1>
      <p style={{ fontSize: '16px', color: '#667085', marginBottom: '48px' }}>브랜드 컬러입니다. Primary와 Secondary 컬러로 구성됩니다.</p>

      <ColorScaleSection title='Primary' colors={semanticColors.brand.primary} />
      <ColorScaleSection title='Secondary' colors={semanticColors.brand.secondary} />
    </div>
  ),
};

export const SemanticColors: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Semantic Colors</h1>
      <p style={{ fontSize: '16px', color: '#667085', marginBottom: '48px' }}>
        의미가 부여된 컬러입니다. Surface, Border, Text, Icon 등으로 구성됩니다.
      </p>

      <ColorScaleSection title='Surface Default' colors={semanticColors.surface.default} />
      <ColorScaleSection title='Border Default' colors={semanticColors.border.default} />
      <ColorScaleSection title='Text Default' colors={semanticColors.text.default} />
      <ColorScaleSection title='Icon Default' colors={semanticColors.icon.default} />
    </div>
  ),
};

export const SystemColors: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>System State Colors</h1>
      <p style={{ fontSize: '16px', color: '#667085', marginBottom: '48px' }}>
        시스템 상태를 나타내는 컬러입니다. Success, Info, Warning, Error로 구성됩니다.
      </p>

      <ColorScaleSection title='Success' colors={semanticColors.system.success} />
      <ColorScaleSection title='Info' colors={semanticColors.system.info} />
      <ColorScaleSection title='Warning' colors={semanticColors.system.warning} />
      <ColorScaleSection title='Error' colors={semanticColors.system.error} />
    </div>
  ),
};

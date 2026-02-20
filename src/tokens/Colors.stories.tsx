import type { Meta, StoryObj } from '@storybook/react';

import { baseColors, defaultSemanticColors, componentTokens } from './colors';
import { resolveTokenReferences } from './resolveTokens';

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

      <ColorScaleSection title='Primary' colors={defaultSemanticColors.brand.primary as Record<string, string>} />
      <ColorScaleSection title='Secondary' colors={defaultSemanticColors.brand.secondary as Record<string, string>} />
    </div>
  ),
};

export const SemanticColors: Story = {
  render: () => {
    // 참조를 실제 값으로 변환하기 위해 필터링
    const getSurfaceColors = () => {
      const colors: Record<string, string> = {};
      Object.entries(defaultSemanticColors.surface.default).forEach(([key, value]) => {
        if (typeof value === 'string' && !value.startsWith('{')) {
          colors[key] = value;
        }
      });
      return colors;
    };

    const getBorderColors = () => {
      const colors: Record<string, string> = {};
      Object.entries(defaultSemanticColors.border.default).forEach(([key, value]) => {
        if (typeof value === 'string' && !value.startsWith('{')) {
          colors[key] = value;
        }
      });
      return colors;
    };

    const getTextColors = () => {
      const colors: Record<string, string> = {};
      Object.entries(defaultSemanticColors.text.default).forEach(([key, value]) => {
        if (typeof value === 'string' && !value.startsWith('{')) {
          colors[key] = value;
        }
      });
      return colors;
    };

    const getIconColors = () => {
      const colors: Record<string, string> = {};
      Object.entries(defaultSemanticColors.icon.default).forEach(([key, value]) => {
        if (typeof value === 'string' && !value.startsWith('{')) {
          colors[key] = value;
        }
      });
      return colors;
    };

    return (
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Semantic Colors</h1>
        <p style={{ fontSize: '16px', color: '#667085', marginBottom: '48px' }}>
          의미가 부여된 컬러입니다. Surface, Border, Text, Icon 등으로 구성됩니다.
          <br />
          <small>(동적 참조는 표시되지 않습니다)</small>
        </p>

        <ColorScaleSection title='Surface Default' colors={getSurfaceColors()} />
        <ColorScaleSection title='Border Default' colors={getBorderColors()} />
        <ColorScaleSection title='Text Default' colors={getTextColors()} />
        <ColorScaleSection title='Icon Default' colors={getIconColors()} />
      </div>
    );
  },
};

export const SystemColors: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>System State Colors</h1>
      <p style={{ fontSize: '16px', color: '#667085', marginBottom: '48px' }}>
        시스템 상태를 나타내는 컬러입니다. Success, Info, Warning, Error로 구성됩니다.
      </p>

      <ColorScaleSection title='Success' colors={defaultSemanticColors.system.success as Record<string, string>} />
      <ColorScaleSection title='Info' colors={defaultSemanticColors.system.info as Record<string, string>} />
      <ColorScaleSection title='Warning' colors={defaultSemanticColors.system.warning as Record<string, string>} />
      <ColorScaleSection title='Error' colors={defaultSemanticColors.system.error as Record<string, string>} />
    </div>
  ),
};

const TokenReferenceItem = ({
  name,
  value,
  resolvedValue,
}: {
  name: string;
  value: string;
  resolvedValue: string;
}) => (
  <div style={{ marginBottom: '12px', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: resolvedValue,
          border: '1px solid #e1e4e8',
          borderRadius: '4px',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{name}</div>
        <div style={{ fontSize: '12px', color: '#667085', marginBottom: '2px' }}>
          Reference: <code style={{ color: '#0969da' }}>{value}</code>
        </div>
        <div style={{ fontSize: '12px', color: '#667085' }}>
          Resolved: <code>{resolvedValue}</code>
        </div>
      </div>
    </div>
  </div>
);

const ComponentTokenSection = ({
  title,
  tokens,
  resolvedTokens,
}: {
  title: string;
  tokens: Record<string, string>;
  resolvedTokens: Record<string, string>;
}) => (
  <div style={{ marginBottom: '32px' }}>
    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>{title}</h3>
    <div>
      {Object.entries(tokens).map(([key, value]) => (
        <TokenReferenceItem key={key} name={key} value={value} resolvedValue={resolvedTokens[key] || value} />
      ))}
    </div>
  </div>
);

export const ComponentTokens: Story = {
  render: () => {
    // Component 토큰 해석
    const resolvedComponentTokens = resolveTokenReferences(componentTokens, defaultSemanticColors);

    return (
      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Component Tokens</h1>
        <p style={{ fontSize: '16px', color: '#667085', marginBottom: '48px' }}>
          컴포넌트에서 사용하는 토큰입니다. Semantic 토큰을 참조하여 동적으로 값이 결정됩니다.
          <br />
          <small>토큰 참조를 변경하면 모든 컴포넌트의 색상이 자동으로 업데이트됩니다.</small>
        </p>

        <ComponentTokenSection
          title='Button - Primary'
          tokens={componentTokens.button.primary as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.button.primary as Record<string, string>}
        />
        <ComponentTokenSection
          title='Button - Secondary'
          tokens={componentTokens.button.secondary as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.button.secondary as Record<string, string>}
        />
        <ComponentTokenSection
          title='Button - Ghost'
          tokens={componentTokens.button.ghost as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.button.ghost as Record<string, string>}
        />
        <ComponentTokenSection
          title='Button - Gray'
          tokens={componentTokens.button.gray as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.button.gray as Record<string, string>}
        />
        <ComponentTokenSection
          title='Button - Outline'
          tokens={componentTokens.button.outline as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.button.outline as Record<string, string>}
        />
        <ComponentTokenSection
          title='Button - Disabled'
          tokens={componentTokens.button.disabled as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.button.disabled as Record<string, string>}
        />
        <ComponentTokenSection
          title='Button - Text'
          tokens={componentTokens.button.text as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.button.text as Record<string, string>}
        />

        <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '48px', marginBottom: '24px' }}>System Buttons</h2>
        <ComponentTokenSection
          title='System Button - Success'
          tokens={componentTokens.systemButton.success as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.systemButton.success as Record<string, string>}
        />
        <ComponentTokenSection
          title='System Button - Info'
          tokens={componentTokens.systemButton.info as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.systemButton.info as Record<string, string>}
        />
        <ComponentTokenSection
          title='System Button - Warning'
          tokens={componentTokens.systemButton.warning as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.systemButton.warning as Record<string, string>}
        />
        <ComponentTokenSection
          title='System Button - Error'
          tokens={componentTokens.systemButton.error as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.systemButton.error as Record<string, string>}
        />

        <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '48px', marginBottom: '24px' }}>Navigation</h2>
        <ComponentTokenSection
          title='Navigation - Default'
          tokens={componentTokens.navigation.default as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.navigation.default as Record<string, string>}
        />
        <ComponentTokenSection
          title='Navigation - Selected'
          tokens={componentTokens.navigation.selected as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.navigation.selected as Record<string, string>}
        />

        <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '48px', marginBottom: '24px' }}>Input</h2>
        <ComponentTokenSection
          title='Input - Default'
          tokens={componentTokens.input.default as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.input.default as Record<string, string>}
        />
        <ComponentTokenSection
          title='Input - Focused'
          tokens={componentTokens.input.focused as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.input.focused as Record<string, string>}
        />
        <ComponentTokenSection
          title='Input - Selected'
          tokens={componentTokens.input.selected as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.input.selected as Record<string, string>}
        />
        <ComponentTokenSection
          title='Input - Disabled'
          tokens={componentTokens.input.disabled as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.input.disabled as Record<string, string>}
        />
        <ComponentTokenSection
          title='Input - Hover'
          tokens={componentTokens.input.hover as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.input.hover as Record<string, string>}
        />
        <ComponentTokenSection
          title='Input - Error'
          tokens={componentTokens.input.error as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.input.error as Record<string, string>}
        />

        <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '48px', marginBottom: '24px' }}>Calendar</h2>
        <ComponentTokenSection
          title='Calendar - Default'
          tokens={componentTokens.calendar.default as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.calendar.default as Record<string, string>}
        />
        <ComponentTokenSection
          title='Calendar - Today'
          tokens={componentTokens.calendar.today as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.calendar.today as Record<string, string>}
        />
        <ComponentTokenSection
          title='Calendar - Hover'
          tokens={componentTokens.calendar.hover as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.calendar.hover as Record<string, string>}
        />
        <ComponentTokenSection
          title='Calendar - Selected'
          tokens={componentTokens.calendar.selected as Record<string, string>}
          resolvedTokens={resolvedComponentTokens.calendar.selected as Record<string, string>}
        />
      </div>
    );
  },
};

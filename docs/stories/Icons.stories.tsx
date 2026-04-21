import { useState, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import * as RoundStrokeIcons from '../../src/icons/round/stroke';
import * as RoundSolidIcons from '../../src/icons/round/solid';
import * as DefaultStrokeIcons from '../../src/icons/default/stroke';
import * as DefaultSolidIcons from '../../src/icons/default/solid';

const meta = {
  title: 'Design Tokens/Icons',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type IconModule = Record<string, React.FC<{ size?: number | string; color?: string }>>;

const categories: Record<string, IconModule> = {
  'Round / Stroke': RoundStrokeIcons as IconModule,
  'Round / Solid': RoundSolidIcons as IconModule,
  'Default / Stroke': DefaultStrokeIcons as IconModule,
  'Default / Solid': DefaultSolidIcons as IconModule,
};

const sizes = [16, 20, 24, 32, 40];

const IconGallery = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [size, setSize] = useState(24);
  const [color, setColor] = useState('#1D1D1D');

  const filteredIcons = useMemo(() => {
    const result: { category: string; name: string; Icon: React.FC<{ size?: number | string; color?: string }> }[] = [];

    const categoriesToShow =
      selectedCategory === 'all'
        ? Object.entries(categories)
        : Object.entries(categories).filter(([cat]) => cat === selectedCategory);

    for (const [category, icons] of categoriesToShow) {
      for (const [name, Icon] of Object.entries(icons)) {
        if (!search || name.toLowerCase().includes(search.toLowerCase())) {
          result.push({ category, name, Icon });
        }
      }
    }
    return result;
  }, [search, selectedCategory]);

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Icons</h1>
      <p style={{ fontSize: '16px', color: '#667085', marginBottom: '32px' }}>
        총 {Object.values(categories).reduce((sum, c) => sum + Object.keys(c).length, 0)}개의 아이콘이 4개 카테고리로 구성되어 있습니다.
      </p>

      {/* Controls */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '32px',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
        }}
      >
        {/* Search */}
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>검색</label>
          <input
            type="text"
            placeholder="아이콘 이름 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d0d5dd',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Category filter */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>카테고리</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #d0d5dd',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
            }}
          >
            <option value="all">전체</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat} ({Object.keys(categories[cat]).length})
              </option>
            ))}
          </select>
        </div>

        {/* Size */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>사이즈</label>
          <div style={{ display: 'flex', gap: '4px' }}>
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid',
                  borderColor: size === s ? '#1D1D1D' : '#d0d5dd',
                  borderRadius: '6px',
                  backgroundColor: size === s ? '#1D1D1D' : '#fff',
                  color: size === s ? '#fff' : '#1D1D1D',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>색상</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ width: '40px', height: '36px', border: '1px solid #d0d5dd', borderRadius: '6px', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Results count */}
      <p style={{ fontSize: '13px', color: '#667085', marginBottom: '16px' }}>
        {filteredIcons.length}개 아이콘
      </p>

      {/* Icon grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '8px',
        }}
      >
        {filteredIcons.map(({ category, name, Icon }) => (
          <div
            key={`${category}-${name}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px 8px',
              border: '1px solid #e4e7ec',
              borderRadius: '8px',
              cursor: 'default',
              transition: 'border-color 0.15s',
            }}
            title={`${category} / ${name}`}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = '#98a2b3';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = '#e4e7ec';
            }}
          >
            <Icon size={size} color={color} />
            <span
              style={{
                marginTop: '8px',
                fontSize: '11px',
                color: '#475467',
                textAlign: 'center',
                wordBreak: 'break-all',
                lineHeight: '1.3',
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>

      {filteredIcons.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px', color: '#98a2b3' }}>
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export const Gallery: Story = {
  render: () => <IconGallery />,
};

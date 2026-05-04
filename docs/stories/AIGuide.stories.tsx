import { useCallback } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import agentsMd from '../../AGENTS.md?raw';

function AIGuideDownload() {
  const handleDownload = useCallback(() => {
    const blob = new Blob([agentsMd], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AGENTS.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(agentsMd);
    alert('Copied to clipboard!');
  }, []);

  return (
    <div style={{ fontFamily: 'Pretendard, sans-serif' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        <button
          onClick={handleDownload}
          style={{
            padding: '12px 24px',
            backgroundColor: '#288FF6',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Download AGENTS.md
        </button>
        <button
          onClick={handleCopy}
          style={{
            padding: '12px 24px',
            backgroundColor: '#fff',
            color: '#4b5362',
            border: '1px solid #E1E4E8',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Copy to Clipboard
        </button>
      </div>
      <pre
        style={{
          padding: '24px',
          backgroundColor: '#f6f8fa',
          borderRadius: '8px',
          border: '1px solid #E1E4E8',
          fontSize: '13px',
          lineHeight: '1.6',
          overflow: 'auto',
          maxHeight: '600px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {agentsMd}
      </pre>
    </div>
  );
}

const meta = {
  title: 'AI Guide',
  component: AIGuideDownload,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof AIGuideDownload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Download: Story = {};

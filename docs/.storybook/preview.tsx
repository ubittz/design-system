import './app.css';
import type { Preview } from '@storybook/react';

import { DesignSystemProvider } from '../../src/core/DesignSystemProvider';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Design Tokens', ['Colors', 'Typography', 'Icons', 'Spacing'], 'Components', ['Shared', 'App', 'Web'], 'AI Guide'],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const platform = context.globals.platform || 'web';
      const lang = context.globals.lang || 'kr';

      const baseColorLevel = context.globals.baseColorLevel
        ? (Number(context.globals.baseColorLevel) as 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900)
        : undefined;

      return (
        <DesignSystemProvider platform={platform} defaultLang={lang} baseColorLevel={baseColorLevel}>
          <Story />
        </DesignSystemProvider>
      );
    },
  ],
  globalTypes: {
    platform: {
      name: 'Platform',
      description: 'Platform type',
      defaultValue: 'web',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'web', title: 'Web' },
          { value: 'app', title: 'App' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
    lang: {
      name: 'Language',
      description: 'Language',
      defaultValue: 'kr',
      toolbar: {
        icon: 'document',
        items: [
          { value: 'kr', title: 'Korean' },
          { value: 'en', title: 'English' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
    baseColorLevel: {
      name: 'Base Color Level',
      description: 'Brand Primary 500 슬롯에 적용할 색상 레벨',
      defaultValue: '',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: '', title: 'Default (500)' },
          { value: '50', title: '50' },
          { value: '100', title: '100' },
          { value: '200', title: '200' },
          { value: '300', title: '300' },
          { value: '400', title: '400' },
          { value: '600', title: '600' },
          { value: '700', title: '700' },
          { value: '800', title: '800' },
          { value: '900', title: '900' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
};

export default preview;

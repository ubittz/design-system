import type { Preview } from '@storybook/react';
import { DesignSystemProvider } from '../../src/core/DesignSystemProvider';
import '../../src/styles/index.css';

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
        order: [
          'Introduction',
          'Design Tokens',
          ['Colors', 'Typography', 'Spacing'],
          'Components',
          ['Shared', 'App', 'Web'],
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const platform = context.globals.platform || 'web';
      const lang = context.globals.lang || 'kr';

      return (
        <DesignSystemProvider platform={platform} defaultLang={lang}>
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
  },
};

export default preview;

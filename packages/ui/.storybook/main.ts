import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  core: {
    disableTelemetry: true
  },
  docs: {
    autodocs: 'tag'
  },
  viteFinal: async (config) => {
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = [
      ...(config.optimizeDeps.include ?? []),
      'clsx',
      'tailwind-merge'
    ];
    config.css = config.css || {};
    config.css.postcss = {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    };
    return config;
  }
};

export default config;

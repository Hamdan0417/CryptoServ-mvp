import type { Config } from 'tailwindcss';
import sharedConfig from '@crypto-serv/config/tailwind';

const config: Config = {
  ...sharedConfig,
  content: ['src/**/*.{ts,tsx}'],
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...sharedConfig.theme?.extend,
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          lg: '4rem'
        }
      }
    }
  }
};

export default config;

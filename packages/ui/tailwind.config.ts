import type { Config } from 'tailwindcss';
import baseConfig from '@crypto-serv/config/tailwind';

export default {
  ...baseConfig,
  content: ['src/**/*.{ts,tsx}']
} satisfies Config;

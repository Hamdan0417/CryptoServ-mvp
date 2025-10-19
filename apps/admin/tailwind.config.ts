import type { Config } from 'tailwindcss';
import shared from '@crypto-serv/config/tailwind';

const config: Config = {
  ...shared,
  content: ['app/**/*.{ts,tsx,mdx}', 'components/**/*.{ts,tsx}']
};

export default config;

import type { Config } from 'tailwindcss';
import shared from '@crypto-serv/config/tailwind';

const config: Config = {
  ...shared,
  content: [
    './apps/web/**/*.{ts,tsx,js,jsx,mdx}',
    './apps/admin/**/*.{ts,tsx,js,jsx,mdx}',
    './packages/ui/src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}'
  ]
};

export default config;

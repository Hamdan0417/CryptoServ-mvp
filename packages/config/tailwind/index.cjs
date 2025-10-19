const sharedConfig = {
  darkMode: ['class'],
  content: [
    '../../apps/web/**/*.{ts,tsx,js,jsx}',
    '../../apps/admin/**/*.{ts,tsx,js,jsx}',
    '../../packages/ui/**/*.{ts,tsx,js,jsx}',
    '../../components/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#7047EB',
          dark: '#4F29C6',
          light: '#9572FF'
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

module.exports = sharedConfig;

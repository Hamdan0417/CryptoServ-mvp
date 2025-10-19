const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
        display: ['"Clash Display"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: {
          DEFAULT: '#5E3FF6',
          foreground: colors.white
        },
        secondary: {
          DEFAULT: '#0A1324',
          foreground: colors.slate[100]
        },
        accent: {
          DEFAULT: '#33E2A0',
          foreground: '#0B1B2B'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};

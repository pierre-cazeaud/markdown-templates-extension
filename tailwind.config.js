import colors from 'tailwindcss/colors';
import { COLOR_PICKER_LIST } from './src/lib/constants';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,svelte,tsx}'],
  safelist: [
    ...COLOR_PICKER_LIST.map((color) => `text-${color}-600`),
    ...COLOR_PICKER_LIST.map((color) => `hover:bg-${color}-500`),
    ...COLOR_PICKER_LIST.map((color) => `bg-${color}-300`),
    ...COLOR_PICKER_LIST.map((color) => `bg-${color}-100`),
  ],
  theme: {
    extend: {
      colors: {
        // Hack to have bg-white-100 and bg-white-300 available
        'white-300': colors.white,
        'white-100': colors.white,

        background: colors.slate[100],
        'on-background': colors.slate[600],

        primary: colors.purple[600],
        'on-primary': colors.slate[50],
        'hover-primary': colors.purple[700],
        'hover-on-primary': colors.purple[100],

        secondary: colors.slate[500],
        'on-secondary': colors.slate[50],
        'hover-secondary': colors.slate[400],
        'hover-on-secondary': colors.slate[50],

        surface: colors.white,
        'on-surface': colors.slate[600],
        'hover-surface': colors.slate[400],

        // Status
        destructive: colors.red[200],
        'on-destructive': colors.slate[700],
        'hover-destructive': colors.red[400],
        'hover-on-destructive': colors.slate[800],

        interactive: colors.cyan[200],
        'on-interactive': colors.slate[700],
        'hover-interactive': colors.cyan[400],
        'hover-on-interactive': colors.slate[800],

        neutral: colors.slate[200],
        'on-neutral': colors.slate[700],
        'hover-neutral': colors.slate[400],
        'hover-on-neutral': colors.slate[800],

        successful: colors.green[200],
        'on-successful': colors.slate[700],
        'hover-successful': colors.green[400],
        'hover-on-successful': colors.slate[800],
      },
      screens: {
        sm: '600px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
  ],
};

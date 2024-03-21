import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,svelte,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.purple[600],
        'on-primary': colors.slate[50],
        'hover-primary': colors.purple[700],
        'hover-on-primary': colors.purple[100],

        secondary: colors.slate[500],
        'on-secondary': colors.slate[50],
        'hover-secondary': colors.slate[400],
        'hover-on-secondary': colors.slate[50],

        bg: colors.slate[100],
        'on-bg': colors.slate[400],

        surface: colors.slate[50],
        'on-surface': colors.slate[400],
      },
    },
  },
  plugins: [],
};

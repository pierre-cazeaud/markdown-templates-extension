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

        background: colors.slate[100],
        'on-background': colors.slate[600],

        surface: colors.white,
        'on-surface': colors.slate[600],

        // Status
        destructive: colors.red[200],
        'on-destructive': colors.slate[700],
        'hover-destructive': colors.red[400],
        'hover-on-destructive': colors.slate[800],

        interactive: colors.cyan[200],
        'on-interactive': colors.slate[700],
        'hover-interactive': colors.cyan[400],
        'hover-on-interactive': colors.slate[800],
      },
    },
  },
  plugins: [],
};

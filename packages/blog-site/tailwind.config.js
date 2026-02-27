const { colors } = require('@verial/design-tokens/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/fumadocs-ui/dist/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors,
      fontFamily: {
        serif: ['var(--font-serif)', 'Source Serif 4', 'serif'],
        display: ['var(--font-display)', 'Newsreader', 'serif'],
        sans: ['var(--font-serif)', 'Source Serif 4', 'serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

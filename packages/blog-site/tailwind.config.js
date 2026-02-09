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
      colors: {
        background: 'hsl(0, 0%, 4%)',
        foreground: 'hsl(0, 0%, 93%)',
        border: 'hsla(0, 0%, 100%, 0.08)',
        muted: 'hsl(0, 0%, 12%)',
        'muted-foreground': 'hsl(0, 0%, 60%)',
        accent: 'hsl(210, 15%, 20%)',
        'accent-foreground': 'hsl(210, 15%, 85%)',
        primary: 'hsl(215, 100%, 60%)',
        'primary-foreground': 'hsl(0, 0%, 100%)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Newsreader', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

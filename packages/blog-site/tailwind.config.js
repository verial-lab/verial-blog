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
        background: 'hsl(0, 0%, 3%)',
        foreground: 'hsl(0, 0%, 92%)',
        border: 'hsla(0, 0%, 40%, 0.1)',
        muted: 'hsl(0, 0%, 15%)',
        'muted-foreground': 'hsl(0, 0%, 70%)',
        accent: 'hsl(210, 15%, 25%)',
        'accent-foreground': 'hsl(210, 15%, 85%)',
        primary: 'hsl(210, 100%, 60%)',
        'primary-foreground': 'hsl(0, 0%, 98%)',
      },
      fontFamily: {
        serif: ['Newsreader', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export const colors = {
  background: 'hsl(0, 0%, 0%)',
  foreground: 'hsl(0, 0%, 96%)',
  border: 'hsla(0, 0%, 100%, 0.08)',
  muted: 'hsl(0, 0%, 12%)',
  'muted-foreground': 'hsl(0, 0%, 78%)',
  accent: 'hsl(210, 15%, 20%)',
  'accent-foreground': 'hsl(210, 15%, 85%)',
  primary: 'hsl(40, 15%, 85%)',
  'primary-foreground': 'hsl(0, 0%, 100%)',
} as const;

/** Hex equivalents for use in email templates (inline styles) */
export const emailColors = {
  background: '#ffffff',
  foreground: '#1a1a1a',
  mutedForeground: '#666666',
  primary: '#d9d0c1',
  accent: '#2b3540',
  accentForeground: '#c4cdd6',
  gold: '#c4a44a',
  border: '#e5e5e5',
  darkBg: '#000000',
  darkFg: '#f5f5f5',
} as const;

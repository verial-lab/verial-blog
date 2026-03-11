/**
 * Brand constants — single source of truth for all packages.
 * Import from '@verial/design-tokens/brand' or '@verial/design-tokens'.
 */

export const brand = {
  name: 'Verial',
  tagline: 'Inquiry · Engineering · Transformation',
  subtitle:
    'High-density writing on engineering, systems thinking, and applied wisdom for the exponential age.',
  philosophy: {
    /** Full philosophy statement (JSX-safe plain text version) */
    text: 'Verial — from veritas (truth) and aerial (limitless sky). The belief that when we seek truth and build with intention, the cosmic microwave background is the limit.',
    /** HTML version with italics for use in dangerouslySetInnerHTML or JSX */
    html: '<em>Verial</em> — from <em>veritas</em> (truth) and <em>aerial</em> (limitless sky). The belief that when we seek truth and build with intention, the cosmic microwave background is the limit.',
  },
  url: 'https://verial.xyz',
  email: 'hello@verial.xyz',
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
} as const;

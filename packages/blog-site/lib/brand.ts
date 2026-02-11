/**
 * Brand constants — single source of truth for copy used across the site.
 * Import from here instead of hardcoding strings in components.
 */

export const brand = {
  name: 'Verial',
  tagline: 'Inquiry · Engineering · Transformation',
  subtitle: 'High-density writing on building, technology, and the systems that shape our exponential future.',
  philosophy: {
    /** Full philosophy statement (JSX-safe plain text version) */
    text: 'Verial — from veritas (truth) and aerial (limitless sky). The belief that when we seek truth and build with intention, the cosmic microwave background is the limit.',
    /** HTML version with italics for use in dangerouslySetInnerHTML or JSX */
    html: '<em>Verial</em> — from <em>veritas</em> (truth) and <em>aerial</em> (limitless sky). The belief that when we seek truth and build with intention, the cosmic microwave background is the limit.',
  },
  url: 'https://verial.xyz',
} as const;

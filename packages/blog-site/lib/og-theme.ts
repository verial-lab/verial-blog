/**
 * OG image theme constants.
 * 
 * ⚠️  SYNC WITH DESIGN TOKENS
 * These values MUST match @verial/design-tokens/colors and /brand.
 * Edge runtime can't resolve monorepo imports, so values are inlined here.
 * 
 * Source of truth:
 *   Colors → packages/design-tokens/src/colors.ts
 *   Brand  → packages/design-tokens/src/brand.ts
 */

// From colors.ts
export const bg = 'hsl(0, 0%, 0%)';          // colors.background
export const fg = 'hsl(0, 0%, 96%)';          // colors.foreground
export const muted = 'hsl(0, 0%, 78%)';       // colors['muted-foreground']
export const accent = 'hsl(40, 15%, 85%)';    // colors.primary
export const border = 'hsla(0, 0%, 100%, 0.08)'; // colors.border

// From brand.ts
export const brandName = 'Verial';
export const brandTagline = 'Inquiry · Engineering · Transformation';
export const brandSubtitle = 'High-density writing on building, technology, and the systems that shape our exponential future.';
export const brandUrl = 'https://verial.xyz';
export const brandHostname = 'verial.xyz';

/**
 * Centralized typography configuration for Verial.
 * 
 * Change font sizes, line heights, and colors here —
 * they're referenced across all components and the global CSS.
 * 
 * Reference: Dario Amodei's blog uses 20px/32px body text (serif).
 * For dark mode, we need slightly larger text and brighter colors
 * to compensate for reduced contrast perception.
 */

export const typography = {
  // ── Body Text ──────────────────────────────────────────────
  body: {
    size: 'text-lg',           // 18px — sweet spot for dark-mode serif
    leading: 'leading-[1.75]', // ~31.5px line height at 18px
  },

  // ── Prose / Article Body ───────────────────────────────────
  prose: {
    size: 'text-[19px]',       // Slightly larger for long-form reading
    leading: 'leading-[1.8]',  // ~34px line height
  },

  // ── Secondary / Muted Text ─────────────────────────────────
  muted: {
    size: 'text-base',         // 16px
    leading: 'leading-relaxed',
    color: 'text-muted-foreground', // Now 72% lightness (from tailwind config)
  },

  // ── Small / Labels ─────────────────────────────────────────
  small: {
    size: 'text-sm',           // 14px
    leading: 'leading-relaxed',
  },

  // ── Caption / Fine Print ───────────────────────────────────
  caption: {
    size: 'text-sm',           // 14px (minimum for dark mode readability)
    color: 'text-muted-foreground/70',
  },

  // ── Headings ───────────────────────────────────────────────
  h1: 'text-4xl md:text-5xl font-serif font-normal leading-[1.2] tracking-normal',
  h2: 'text-3xl font-serif font-normal tracking-normal',
  h3: 'text-2xl font-serif font-normal tracking-normal',
  h4: 'text-xl font-serif font-normal tracking-normal',
} as const;

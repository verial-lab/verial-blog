# Verial Blog — Requirements & QA Checklist

## Deploy URL
https://verial-blog-9ct2.vercel.app/

## Routes & Expected Behavior

### `/` — Landing Page
- [x] Loads without errors
- [x] Hero section has visual impact (Resend-level) ✅ Fixed — gradient text, radial glow, eyebrow label, better CTAs
- [ ] "Read Essays →" links to `/essays` ✅
- [ ] "Get Updates" scrolls to email signup
- [ ] Content cards (Essays, Notes, Framework) link correctly ✅
- [x] Email signup form present and styled ✅
- [ ] Latest Essays section shows essay cards that link correctly
- [ ] Framer Motion entrance animations on scroll
- [ ] Mobile responsive
- [x] No excessive whitespace/dead space between sections ✅

### `/essays` — Essay Index
- [x] Loads without errors
- [x] Lists essay cards with title, excerpt, date
- [ ] Clean editorial feel (NOT docs-site feel)
- [ ] Cards link to individual essay pages ✅
- [ ] Mobile responsive

### `/essays/containment-systems-design` — Sample Essay
- [x] Loads without errors (was 404, now fixed)
- [x] Title, excerpt render
- [x] Body content renders
- [ ] "← Essays" back link works
- [ ] Clean reading experience — generous whitespace, readable line length
- [ ] Typography: serif title, sans body, mono code blocks
- [ ] No sidebar (editorial, not docs)
- [ ] Mobile responsive

### `/notes` — Notes Index
- [x] Loads without errors
- [x] Shows "No notes yet" placeholder
- [ ] Clean layout matching essays style
- [ ] Mobile responsive

### `/framework` — Framework Section
- [x] Loads without errors
- [x] **BUG: FumaDocs theme toggle icons (☀️🌙📱) bleeding through** — visible in top-left overlapping the title ✅
- [x] Should use same clean layout as essays/notes (no FumaDocs DocsLayout chrome) ✅
- [ ] Mobile responsive

## Design Issues (Priority Order)

### P0 — Must Fix
1. ~~**Framework page has FumaDocs UI chrome bleeding through**~~ ✅ Fixed
2. ~~**Excessive dead space on landing page**~~ ✅ Fixed — reduced hero to 75vh, tightened margins
3. ~~**Email signup section missing or invisible**~~ ✅ Fixed — framer-motion was preventing SSR render, replaced with plain HTML
4. ~~**"Get Updates" button** — verify it actually scrolls to signup anchor~~ ✅ Verified — href="#subscribe" links to EmailSignup id="subscribe"
5. ~~**Typography needs major upgrade**~~ ✅ Fixed — Instrument Serif (titles) + Plus Jakarta Sans (body) + JetBrains Mono (code)
6. ~~**Headers on essays/notes need more padding**~~ ✅ Fixed — increased top padding to pt-24, larger header text, more bottom margin

### P1 — Should Fix
7. ~~**Landing page lacks Resend-level polish**~~ ✅ Fixed — radial glow, gradient text, card glow hover states, tighter spacing, Verial philosophy section
8. ~~**No footer** — add minimal footer with links~~ ✅ Fixed — added Footer component with brand, nav links, copyright
9. ~~**Hero could use more visual interest**~~ ✅ Fixed — radial glow, gradient text on "Applied.", eyebrow label, vertical accent line
10. **Navigation** — could benefit from scroll-aware background blur/opacity change

### P2 — Nice to Have
9. **Framer Motion animations** — entrance animations on content cards, staggered reveals
10. **Essay page** — add reading time estimate, better date formatting
11. **Code block styling** — ensure dark theme with syntax highlighting
12. **og:image / meta tags** — for social sharing

## Brand & Voice

**Verial** = veritas (truth) + aerial (limitless sky). The pursuit of understanding + belief that possibilities are endless.

**Author identity:** Innovation technologist. Not just software — philosophy, systems thinking, innovation, wisdom, life principles. Essays are accessible to general public, not developer-only.

**Content scope (broader than just tech):**
- Philosophy & life principles (Covey's 7 Habits, wisdom traditions)
- Systems thinking (from a philosophical angle, applicable to life + orgs + tech)
- Innovation & technology
- Strategic/organizational thinking
- Engineering as a lens for understanding the world

**Hero tagline should NOT be** "Systems. Architecture. Clarity." — too narrow, too dev-focused.
**Should evoke:** truth-seeking, limitless potential, practical wisdom, engineering principles applied broadly.

**Existing landing page copy to preserve:** The Verial Philosophy paragraph from verial.xyz — explains the name's etymology and the author's approach.

## Design Reference
- **North Star:** https://resend.com — dark bg, sophisticated, engineering-forward
- **Key principles:** Black bg `hsl(0,0%,3%)`, soft white `hsl(0,0%,92%)`, subtle borders, serif titles, generous whitespace
- **Full spec:** `/PARA/Projects/verial-blog/SPEC.md` in workspace
- **Existing site:** https://verial.xyz — has Verial symbolism and philosophy copy worth preserving

## Validation Process
After each change:
1. Push to `verial-lab/verial-blog` main branch
2. Wait ~60s for Vercel deploy
3. Screenshot each route via browserless (`http://browserless:3000`)
4. Verify against this checklist

# Verial Blog — Requirements & QA Checklist

## Deploy URL
https://verial-blog-9ct2.vercel.app/

## Routes & Expected Behavior

### `/` — Landing Page
- [x] Loads without errors
- [ ] Hero section has visual impact (Resend-level)
- [ ] "Read Essays →" links to `/essays` ✅
- [ ] "Get Updates" scrolls to email signup
- [ ] Content cards (Essays, Notes, Framework) link correctly ✅
- [ ] Email signup form present and styled
- [ ] Latest Essays section shows essay cards that link correctly
- [ ] Framer Motion entrance animations on scroll
- [ ] Mobile responsive
- [ ] No excessive whitespace/dead space between sections

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
1. ~~**Framework page has FumaDocs UI chrome bleeding through**~~ ✅ Fixed — replaced DocsLayout with clean editorial layout
2. **Excessive dead space on landing page** — huge gap between content cards and "Latest Essays" section  
3. **Email signup section missing or invisible** — should be prominently placed
4. **"Get Updates" button** — verify it actually scrolls to signup anchor

### P1 — Should Fix
5. **Landing page lacks Resend-level polish** — needs: subtle gradient/glow effects, better card hover states, tighter spacing
6. **No footer** — add minimal footer with links
7. **Hero could use more visual interest** — consider subtle background effects, gradient text, or animated element
8. **Navigation** — could benefit from scroll-aware background blur/opacity change

### P2 — Nice to Have
9. **Framer Motion animations** — entrance animations on content cards, staggered reveals
10. **Essay page** — add reading time estimate, better date formatting
11. **Code block styling** — ensure dark theme with syntax highlighting
12. **og:image / meta tags** — for social sharing

## Design Reference
- **North Star:** https://resend.com — dark bg, sophisticated, engineering-forward
- **Key principles:** Black bg `hsl(0,0%,3%)`, soft white `hsl(0,0%,92%)`, subtle borders, serif titles, generous whitespace
- **Full spec:** `/PARA/Projects/verial-blog/SPEC.md` in workspace

## Validation Process
After each change:
1. Push to `verial-lab/verial-blog` main branch
2. Wait ~60s for Vercel deploy
3. Screenshot each route via browserless (`http://browserless:3000`)
4. Verify against this checklist

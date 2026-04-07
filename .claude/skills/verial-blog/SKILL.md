---
name: verial-blog
description: Build, write, and maintain the Verial blog (verial.xyz). Use when creating content (essays, posts, systems), working with footnotes/glossary, email pipeline (Buttondown), 3D hero animations (Blender), design system, or any FumaDocs/MDX work in the verial-blog repo.
---

# Verial Blog — Skill Reference

Turborepo monorepo deployed to Vercel via FumaDocs + Next.js 15.

## Repo Layout

```
packages/
  blog-site/          # FumaDocs Next.js site (deployed to verial.xyz)
    app/              # Next.js app router
    content/          # MDX content: essays/, posts/, systems/
    components/       # React components
    lib/              # Utilities, brand constants
  design-tokens/      # Shared colors, brand, spacing (lib/brand.ts)
  email-templates/    # react-email templates + Buttondown send scripts
scripts/
  lint-writing.js     # Em dash linter — run: npm run lint:writing
.github/workflows/
  lint-content.yml    # CI: runs lint-writing on push/PR to main
```

---

## References (go here for details)

### Writing & Content
**[references/writing.md](references/writing.md)**
Content types (essays/posts/systems), frontmatter spec, em dash rule, footnote syntax with Wikipedia citation format, glossary system, writing voice.

Key rules at a glance:
- No em dashes anywhere — CI enforced
- Footnotes: `LastName, FirstName (Year). ["Title"](url). *Publication*.`
- Glossary terms auto-linked by remark plugin — never add `<GlossaryTerm>` manually

### Email (Buttondown)
**[references/email.md](references/email.md)**
Architecture (MDX → react-email → Buttondown draft), sending domain (`mail.verial.xyz`), tag routing (essays/posts/systems), subscription flow, key files.

Key files: `app/api/subscribe/route.ts`, `packages/email-templates/`, `lib/brand.ts`

### Content Distribution
**[references/distribution.md](references/distribution.md)**
Blog-first distribution via Typefully (Twitter, LinkedIn, Threads, Bluesky) + Buttondown email. API integration, platform voice templates, publish-to-draft automation pipeline.

### 3D Hero Animations
**[references/3d-hero.md](references/3d-hero.md)**
Blender headless rendering, glass/crystal material recipes, animation loop patterns, asset pipeline (Blender → MP4/WebM → `public/icons/`), `SectionIcon` component.

---

## Design System

| Token | Value |
|-------|-------|
| Background | `#000` pure black |
| Primary | `hsl(40, 15%, 85%)` / `#d9d0c1` warm off-white |
| Body font | Source Serif 4, 19px, 1.8 line-height, weight 500 |
| Display font | Newsreader, semibold |
| Code font | JetBrains Mono |

Brand constants live in `packages/blog-site/lib/brand.ts` — single source of truth for name, tagline, email copy, tint color.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 + FumaDocs (MDX pipeline) |
| Styling | Tailwind CSS 3 + custom prose in `globals.css` |
| Animation | Framer Motion |
| Search | Orama full-text (custom cmd-K dialog) |
| Email | Buttondown API + react-email |
| 3D | Blender headless → MP4/WebM assets |
| Deploy | Vercel (auto-deploys from `main`) |

---

## Dev Workflow

```bash
npm run dev           # start dev server at localhost:3000
npm run lint:writing  # check for em dashes in content
npm run build         # production build via Turbo
```

Branch naming for content: `post/<slug>` or `essay/<slug>`.
After merging, update monorepo submodule pointer in `verial-blog_monorepo`.

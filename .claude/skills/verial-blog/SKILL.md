---
name: verial-blog
description: Build, write, and maintain the Verial blog (verial.xyz). Use when creating content (essays, posts, systems), working with footnotes/glossary, email pipeline (Buttondown), 3D hero animations (Blender), design system, or any FumaDocs/MDX work in the verial-blog repo.
---

# Verial Blog — Skill Reference

Verial is a Turborepo monorepo (`verial-lab/verial-blog`) deployed to Vercel via FumaDocs.

## Architecture

```
packages/
├── blog-site/          # FumaDocs Next.js site (deployed)
│   ├── app/            # Next.js app router
│   ├── content/        # MDX content (essays/, posts/, systems/)
│   ├── components/     # React components
│   └── lib/            # Utilities, brand constants, sources
├── design/             # Interactive components (future)
├── design-tokens/      # Shared colors, brand, spacing
├── email-templates/    # react-email templates + send scripts
└── writing-pipeline/   # AI writing tools (future)
```

## Content & Writing

See [references/writing.md](references/writing.md) for:
- Content types, directories, tone
- Frontmatter spec
- Footnotes syntax and guidelines
- Glossary system (planned)
- Writing voice and brand

## Email System (Buttondown)

See [references/email.md](references/email.md) for:
- Buttondown integration architecture
- Sending domain setup (`mail.verial.xyz`)
- Tag routing (essays/posts/systems)
- Email pipeline: MDX → react-email → Buttondown draft
- GitHub Action workflow

## 3D Hero Animations (Blender)

See [references/3d-hero.md](references/3d-hero.md) for:
- Blender rendering approach and lessons learned
- Glass/crystal material recipes
- Animation loop techniques
- Asset pipeline (Blender → MP4/WebM → site)
- Design direction and anti-patterns

## Design System

- **Background:** pure `#000`
- **Primary:** warm off-white `hsl(40, 15%, 85%)` / `#d9d0c1`
- **Body font:** Source Serif 4, 19px, 1.8 line-height, weight 500
- **Display font:** Newsreader, semibold
- **Code font:** JetBrains Mono
- **Footer:** Spacetime-curved SVG grid with gold Tron-style pulses
- **Inspiration:** Resend.com — pure black, sophisticated, minimal
- **Brand constants:** `lib/brand.ts` (single source of truth)

## Tech Stack

- **Framework:** Next.js 15 + FumaDocs (MDX content pipeline)
- **Styling:** Tailwind CSS 3 + custom prose styles in `globals.css`
- **Animation:** Framer Motion
- **Search:** Orama full-text search (custom ⌘K dialog)
- **Email:** Buttondown API + react-email templates
- **3D:** Blender headless rendering → MP4/WebM assets
- **Deploy:** Vercel (auto-deploys from `main`)

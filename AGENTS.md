# AGENTS.md — verial-blog

Agent instructions for the Verial blog (verial.xyz). This is a Next.js + FumaDocs + Turborepo monorepo. Read this before writing, editing, or publishing any content.

---

## Repo Structure

```
packages/
  blog-site/
    app/              # Next.js app router (essays, posts, systems, glossary pages)
    content/          # All written content (MDX + YAML)
      essays/         # Long-form essays
      posts/          # Shorter build logs and technical notes
      systems/        # Living documentation / frameworks
      glossary.yaml   # Site-wide glossary definitions
    components/       # Shared React components (GlossaryTerm, TableOfContents, etc.)
    public/
      images/         # Static images — reference as /images/filename.png
      videos/         # Static videos — reference as /videos/filename.mp4
  email-templates/    # Buttondown email rendering pipeline
```

---

## Content Types

### Essays (`content/essays/`)
Long-form, polished writing. Engineering philosophy, systems thinking, applied wisdom. High production value. New essays are sent by email to subscribers.

### Posts (`content/posts/`)
Shorter notes — build logs, technical discoveries, tool releases, reflections. Less formal than essays.

### Systems (`content/systems/`)
Living documentation for frameworks and methodologies.

---

## Frontmatter

Every MDX file requires at minimum `title` and `date`. Full reference:

```yaml
---
title: "Post Title"
description: "One-sentence description shown in listings and meta tags."
date: "YYYY-MM-DD"
author: "Verial"
email_draft: true   # Set to true if this should be sent as a Buttondown email newsletter
---
```

`email_draft: true` marks the post for the email pipeline. It does not affect rendering on the site.

---

## Glossary System

Terms are defined in `content/glossary.yaml`:

```yaml
- term: Term Name
  definition: "The definition text shown in the popover and on /glossary."
```

**The glossary is auto-linked.** A remark plugin (`lib/remark-glossary.mjs`) runs at build time and automatically wraps the **first occurrence** of each glossary term on every page with a `<GlossaryTerm>` popover. You do not need to add `<GlossaryTerm>` components manually in MDX.

**Rules:**
- To add a new glossary term: add it to `glossary.yaml` only. The plugin handles the rest.
- **Never write `<GlossaryTerm>` components manually in MDX.** The plugin auto-links terms; manual components cause double-linking and break the first-occurrence logic.
- Never use a footnote as a substitute for a glossary definition.
- The plugin skips headings, code blocks, links, and existing JSX elements — so terms inside those will not be auto-linked.

---

## Footnotes

Use standard MDX/GFM footnote syntax for citations and academic references:

```mdx
The concept was proposed by Wettel & Lanza[^wettel2007].

[^wettel2007]: Richard Wettel & Michele Lanza — ["CodeCity"](https://...) (VISSOFT 2007). Description.
```

**Rules:**
- Footnotes are for citations, references, and source material — not definitions (use glossary for those).
- Conference acronyms (ICSE, VISSOFT, NeurIPS, etc.) belong in footnote definitions, not in body text.
- Em dashes (—) are fine in footnote definitions.
- Do not include a `---` horizontal rule before the footnote block — the footnotes section already has its own border.

---

## Writing Style

### Voice
Match the tone of the Legibility essay (`content/essays/legibility.mdx`) — first-person, direct, personal experience before broader point, short punchy sentences that land hard.

- Write "I" for personal experience and reflection.
- Write "we" for Agent Paradise work (Verial is building Agent Paradise).
- Start with a personal moment or observation, not a summary.

### Em Dashes
**Never use em dashes (—) anywhere.** Use commas, colons, or restructure the sentence instead. In footnote citations, use a colon to separate author from work: `Author: [*Title*](url) (Year).`

### Academic references
Use Wikipedia citation style. Keep conference names and paper metadata out of the body text.
- Body: "Wettel & Lanza had the original idea[^wettel2007]"
- Footnote (paper): `Wettel, Richard; Lanza, Michele (2007). ["CodeCity"](link). *VISSOFT 2007*. Description.`
- Footnote (web): `["Title"](link). *Publication*. Description.`

Format: `LastName, FirstName (Year). "Title". *Publication*. Description.` For books, italicise the title instead of quoting it.

### Agent Paradise context
- **Agent Paradise** (https://github.com/AgentParadise) is an agentic engineering lab that Verial is building.
- **APSS** (Agent Paradise Standards System) is one system within Agent Paradise — not the other way around.
- **Syntropic137** was born out of Agent Paradise, not APSS.

### Terminology
- Use **agentic engineering** instead of "AI-assisted development." It is defined in `glossary.yaml` and will be auto-linked by the remark plugin — just write the plain term, no `<GlossaryTerm>` needed.

---

## Images and Video

```mdx
<img src="/images/filename.png" alt="Description" style={{ width: "100%", borderRadius: "8px" }} />

<video autoPlay loop muted playsInline style={{ width: "100%", borderRadius: "8px" }}>
  <source src="/videos/filename.mp4" type="video/mp4" />
</video>
```

Use JSX tags directly (not markdown `![]()` syntax) — FumaDocs MDX processes images differently and markdown syntax may break.

---

## Email Draft Workflow (Buttondown)

Posts with `email_draft: true` in frontmatter can be sent to Buttondown as a newsletter draft.

```bash
# From verial-blog/
BUTTONDOWN_API_KEY=your_key npm run email:draft -- packages/blog-site/content/posts/your-post.mdx

# Preview the email locally
npm run email:preview
```

This converts the MDX to HTML, renders it using the email template, and creates a draft in Buttondown. The draft is not sent automatically — review and send from the Buttondown dashboard.

---

## QA with Playwright

Use Playwright to visually review content before publishing.

```bash
# Start the dev server first (from verial-blog/)
npm run dev

# Then in a separate terminal, screenshot a page
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/posts/your-slug', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/review.png', fullPage: true });
  await browser.close();
})();
"
```

**Things to check with Playwright:**
- Images and videos are loading (check `naturalWidth > 0`)
- Footnotes section renders without a double separator
- No broken layout at the bottom of the page
- GlossaryTerm popovers are present in the DOM

---

## Dev Workflow

```bash
# Start dev server
cd verial-blog/
npm install   # first time only
npm run dev   # → http://localhost:3000
```

Branch naming for new posts: `post/<slug>` — create in the `verial-blog` submodule.

After finishing a post, update the monorepo submodule pointer with a commit in `verial-blog_monorepo`.

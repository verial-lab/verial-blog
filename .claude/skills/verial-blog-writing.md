---
name: verial-blog-writing
description: Write and format content for the Verial blog (verial.xyz). Use when creating essays, posts, or systems pages, or when working with footnotes, glossary terms, frontmatter, or MDX content in the verial-blog repo.
---

# Verial Blog Writing

Content lives in `packages/blog-site/content/` within the `verial-lab/verial-blog` repo.

## Content Types

| Type | Dir | Purpose | Tone |
|------|-----|---------|------|
| Essays | `content/essays/` | Polished, high-density explorations | Authoritative, timeless |
| Posts | `content/posts/` | Shorter reflections, book notes, discoveries | Conversational, concise |
| Systems | `content/systems/` | Frameworks, mental models, methodologies | Practical, reference-style |

## Creating Content

Create an MDX file in the appropriate directory:

```mdx
---
title: "Your Title Here"
description: "One-line summary for cards and meta tags."
---

Your content here.
```

### Frontmatter Fields

- `title` (required) — display title
- `description` (required) — summary for listings and SEO
- `send_email: true` (optional) — triggers email pipeline on merge

## Footnotes

Use standard markdown footnote syntax. Rendered by remark-gfm v4 (built into FumaDocs).

### Syntax

```mdx
This is a claim that needs sourcing[^1]. Another point worth noting[^2].

Body content continues here...

[^1]: Source: *Book Title*, Author Name, Year.
[^2]: See also: relevant context or link.
```

### How it works

- `[^1]` in text → superscript pill badge (clickable)
- Footnote definitions at bottom of file → rendered in a styled endnotes section
- Click superscript → smooth scrolls to note
- Click ↩ on note → returns to exact inline position
- Auto-numbered in reading order

### Guidelines

- Place footnote definitions at the very end of the file
- Use for: sources, citations, tangential context, "see also" references
- Don't overuse — 3-8 per essay is typical, fewer for posts
- Keep footnote text concise (1-2 sentences)

## Glossary (planned — #22)

Terms defined once in `content/glossary/`, auto-linked across all content at build time. Inline popover on click (no navigation away). Dedicated `/glossary` page with backlinks.

Not yet implemented — track progress on GitHub issue #22.

## Typography & Style

- Body: Source Serif 4, 19px, 1.8 line-height, weight 500
- Display/nav: Newsreader, semibold
- Code: JetBrains Mono
- Background: pure #000
- Primary: warm off-white `hsl(40, 15%, 85%)`

## Writing Voice (Verial brand)

- **"Truth-seeking. Applied."** — not academic, not clickbait
- Lead with insight, not summary
- Concrete examples > abstract claims
- Earn the reader's time — every paragraph should justify its existence
- OK to have a point of view — strong positions, loosely held

# Writing & Content Reference

## Content Types

| Type | Dir | Purpose | Tone |
|------|-----|---------|------|
| Essays | `content/essays/` | Polished, high-density explorations | Authoritative, timeless |
| Posts | `content/posts/` | Shorter reflections, book notes, discoveries | Conversational, concise |
| Systems | `content/systems/` | Frameworks, mental models, methodologies | Practical, reference-style |

## Frontmatter

```yaml
---
title: "Your Title Here"           # required
description: "One-line summary."   # required — used in cards + SEO
send_email: true                   # optional — triggers email pipeline on merge
---
```

## Footnotes

Standard markdown syntax via remark-gfm v4 (built into FumaDocs). Zero custom components.

### Syntax

```mdx
This claim needs sourcing[^1]. Another point[^2].

[^1]: Source: *Book Title*, Author, Year.
[^2]: See also: relevant link or context.
```

### Behavior
- `[^1]` → superscript pill badge (clickable)
- Footnote definitions → styled endnotes section at article bottom
- Click superscript → smooth scroll to note
- Click ↩ → returns to exact inline position
- Auto-numbered in reading order
- `scroll-padding-top: 80px` offsets fixed navbar

### Guidelines
- Place definitions at the very end of the file
- Use for: sources, citations, tangential context, "see also"
- 3-8 per essay typical, fewer for posts
- Keep footnote text concise (1-2 sentences)

## Glossary (planned — GitHub #22)

- Terms defined in `content/glossary/` (one MDX per term)
- Auto-linked at build time — no manual tagging in essays
- Inline: click term → popover with definition (no navigation away)
- `/glossary` page: alphabetical listing with backlinks to content that uses each term

## Writing Voice

**Tagline:** "Truth-seeking. Applied."

- Lead with insight, not summary
- Concrete examples > abstract claims
- Every paragraph justifies its existence
- Strong positions, loosely held
- Not academic, not clickbait — dense and honest

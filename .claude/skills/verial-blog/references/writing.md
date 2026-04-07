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
description: "One-line summary."   # required, used in cards + SEO
send_email: true                   # optional, triggers email pipeline on merge
---
```

## Em Dashes

**Never use em dashes (—) anywhere** — body prose, footnotes, frontmatter, or anywhere else. The CI linter (`npm run lint:writing`) will catch them.

Use instead:
- Comma for parenthetical asides
- Colon for elaboration or lists
- Restructure the sentence if neither fits

## Footnotes

Standard markdown syntax via remark-gfm v4 (built into FumaDocs). Zero custom components.

### Syntax

```mdx
This claim needs sourcing[^key].

[^key]: LastName, FirstName (Year). ["Title"](url). *Publication*. Description.
```

### Citation format (Wikipedia style)

- **Paper/article:** `LastName, FirstName (Year). ["Title"](url). *Venue/Publication*. Description.`
- **Book:** `LastName, FirstName (Year). *Title*. Description.`
- **Website:** `["Title"](url). *Site name*. Description.`
- Multiple authors: separated by semicolons — `LastName, First; LastName, First`

Examples:
```mdx
[^miller]: Miller, George A. (1956). ["The Magical Number Seven, Plus or Minus Two"](url). *Psychological Review*.
[^evans]: Evans, Eric (2003). *Domain-Driven Design*. Ubiquitous language, bounded contexts.
[^mdn]: ["Array.prototype.map()"](url). *MDN Web Docs*.
```

### Behavior
- `[^key]` renders as a superscript pill badge (clickable)
- Footnote definitions render as a styled endnotes section at article bottom
- Click superscript: smooth scroll to note
- Click arrow: returns to exact inline position
- Auto-numbered in reading order

### Guidelines
- Place all definitions at the very end of the file
- Use for: sources, citations, tangential context, "see also"
- 3-8 per essay typical, fewer for posts
- Keep footnote text concise (1-2 sentences)

## Glossary

- Terms defined in `content/glossary.yaml`
- Auto-linked at build time via remark plugin, no manual tagging in essays
- Inline: click term opens a popover with the definition
- `/glossary` page: alphabetical listing

## Writing Voice

**Tagline:** "Truth-seeking. Applied."

- Lead with insight, not summary
- Concrete examples > abstract claims
- Every paragraph justifies its existence
- Strong positions, loosely held
- Not academic, not clickbait: dense and honest

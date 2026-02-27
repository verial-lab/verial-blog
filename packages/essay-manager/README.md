# @verial/essay-manager

Simple file-based essay writing pipeline. No database — just markdown, JSON, and TypeScript.

## Structure

Each essay lives in `essays/<slug>/`:

```
essays/
  _template/          # Template for new essays
    outline.md        # Planning document
    essay.md          # The essay itself
    status.json       # Section completion tracking
    sources.json      # Research sources
  my-essay/
    ...
```

## CLI

```bash
# Create a new essay
essay new my-essay-slug

# Check section statuses
essay status                # all essays
essay status my-essay-slug  # specific essay

# Publish to MDX with footnotes
essay publish my-essay-slug
```

## Workflow

1. `essay new <slug>` — scaffold from template
2. Fill in `outline.md` with your thesis and structure
3. Write sections in `essay.md` (use `## Headers` for sections)
4. Add sources to `sources.json` and reference them as `[source:id]` in the essay
5. Track progress via `status.json` (draft → in-progress → complete)
6. `essay publish <slug>` — generates MDX with footnotes from sources

## Source References

In your essay, reference sources with `[source:source-id]`. On publish, these become numbered footnotes linking to the source URL.

## API

All utilities are exported for programmatic use:

```typescript
import { parseSections, readStatus, addSource, publish } from '@verial/essay-manager';
```

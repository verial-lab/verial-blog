# @verial/writing-tool

Block-based essay writing tool with AI co-editing. Built with Next.js 14, Tailwind CSS, and the `@verial/essay-manager` package.

## Features

- **Essay Dashboard** — create, list, and manage essays with status tracking
- **Block-based Editor** — each section is a block you can reorder, collapse, and edit
- **Markdown-first** — write in markdown with monospace editing
- **Source Management** — track sources, insert `[source:id]` references inline
- **Status Tracking** — per-section status (outline → draft → revised → final) with progress bar
- **AI Co-editing** — rewrite, expand, simplify, or challenge text with AI; per-section chat

## Setup

```bash
# From repo root
npm install

# Set your OpenAI API key
export OPENAI_API_KEY=sk-...

# Run the writing tool
npm run dev --filter=@verial/writing-tool
```

The app runs on `http://localhost:3100`.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key for AI features | required |
| `OPENAI_MODEL` | Model to use | `gpt-4o-mini` |

## File Storage

Essays are stored as JSON files in the `essays/` directory within the package. No database required.

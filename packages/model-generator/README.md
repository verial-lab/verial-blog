# @verial/model-generator

Generate branded mental model diagrams from declarative JSON specs.

## Usage

```bash
# Render all specs to PNG
npm run generate

# Render a single spec
npx tsx src/cli.ts --input specs/bottleneck-shift.json

# Output HTML only (no screenshot)
npx tsx src/cli.ts --input specs/bottleneck-shift.json --html

# Custom output path
npx tsx src/cli.ts --input specs/bottleneck-shift.json --output ./my-output.png
```

## Spec Format

Each JSON spec defines a `ModelSpec`:

```json
{
  "id": "bottleneck-shift",
  "title": {
    "subtitle": "mental model",
    "main": "The Bottleneck Shift",
    "sub2": "comprehension is the new limit"
  },
  "elements": [
    { "type": "box", "x": 100, "y": 200, "w": 160, "h": 60 },
    { "type": "label", "x": 180, "y": 230, "text": "EXAMPLE", "size": 12 },
    { "type": "line", "x1": 100, "y1": 300, "x2": 400, "y2": 300, "arrow": "end" },
    { "type": "circle", "cx": 400, "cy": 400, "r": 50 }
  ],
  "masks": [{ "cx": 400, "cy": 400, "rx": 300, "ry": 200 }],
  "footer": [{ "text": "verial.xyz", "y": 780, "opacity": 0.25 }]
}
```

## Brand Encoding

- **Neon filter:** Triple-layer Gaussian blur glow on titles and key elements
- **Watermark:** 3×3 VERIAL.XYZ deep-carved letter grid
- **Title block:** Subtitle → main title (neon) → sub-subtitle
- **Canvas:** 800×800px, #060606 background

## Architecture

- `src/brand/` — Pure functions returning SVG fragments (filters, watermark, title)
- `src/layout/` — Element rendering, masking, full SVG composition
- `src/render/` — HTML wrapping and browserless screenshot
- `src/schema/` — Zod schema for ModelSpec validation
- `specs/` — Built-in model JSON specs

## Requirements

- Browserless sidecar at `http://browserless:3000/screenshot` (or set `BROWSERLESS_URL`)

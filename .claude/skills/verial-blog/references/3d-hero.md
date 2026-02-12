# 3D Hero Animations Reference (Blender)

## Overview

Section icons on the blog are 3D animated loops rendered in Blender, exported as MP4/WebM. Displayed via `<SectionIcon>` component with video autoplay.

## Rendering Setup

- **Blender sidecar** running headless (HTTP API)
- Python scripts submitted via HTTP → renders frames → FFmpeg composites
- Output: MP4 (fallback) + WebM (preferred), transparent or black bg
- Typical: 120-180 frames, 30fps, 4-6 second loops

## Material Recipes

### Glass BSDF — Critical Lesson
Glass BSDF in a black void = **invisible**. The material needs something to reflect/refract. Solutions:
1. **Emission inside glass shell** — emissive wireframe/geometry inside a glass enclosure
2. **Environment lighting** — subtle HDRI or area lights (less preferred for pure black bg)
3. **Edge-lit only** — Fresnel → Glossy mix, zero underglow

### Best Glass Recipe (v6)
Glass BSDF + Fresnel→Glossy mix, zero underglow, edge-lit only. Rated 7/10.

### Best Crystal/Icon Approach
Emissive wireframe inside faceted icosphere (subdivisions=1), counter-rotating elements, 8 orbiting hex petals. Emission strength 2-5 through glass (it amplifies). Thicker wireframe geometry (0.02+ radius).

## Design Direction

- **V letterform** stays stationary, shell/orbitals spin
- **Top forms:** Gyro rings, Atom (7.5/10), dark glass plate v1
- **Round/orbital >> linear** forms at icon scale
- **Anti-patterns:** Rectangular panels = jewelry look. Volume shaders = too slow for iteration.
- **Target quality:** See `header-reference.png` for glass quality benchmark

## Animation Loops

- Counter-rotating elements for visual interest
- Perfect loops: ensure frame 0 = frame N state
- Blender 5 caveats: no `scene.node_tree` (compositor changed), no `action.fcurves` (layered actions)

## Pipeline

Two-cron experiment loop pattern:
1. **Submitter cron** (fire-and-forget): sends render script to Blender sidecar
2. **Poster cron** (checks .done markers): posts results when complete
3. Queue file: JSON array of experiments to process

### Key Files (workspace)
- Design spec: `PARA/Areas/Code/design-analysis/verial-3d/BLENDER-DESIGN-SPEC.md`
- Direction log: `PARA/Areas/Code/design-analysis/verial-3d/DIRECTION.md`
- Beta assets: `output/verial-hero/beta/`

### Key Files (repo)
- `packages/blog-site/components/SectionIcon.tsx` — video player component
- `packages/blog-site/public/icons/` — MP4/WebM assets served statically

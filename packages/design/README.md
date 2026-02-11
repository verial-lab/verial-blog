# @verial/design — Design System

The Verial visual design system. Documents the brand language, 3D icon pipeline, lighting recipes, and component specs so future work builds on proven foundations.

## Brand Aesthetic

**Core principle**: Black/white sophistication with subtle warm accents. Think premium tech — not flashy, not cold.

- **Background**: Pure black (`#000`)
- **Typography**: White/off-white on black. Source Serif 4 (body), Newsreader (display/nav)
- **Borders**: `border-border/40` — barely visible, sophisticated
- **Accents**: Warm off-white `hsl(40, 15%, 85%)` for hover/primary states
- **Gold glow**: Reserved for footer spacetime grid animation only

## 3D Section Icons

### Overview

Each content section has an animated 3D icon rendered in Blender. Icons sit on a dark chrome plate with colored underglow accent lights that identify the section.

| Section | Icon Form | Accent Color | RGB |
|---------|-----------|-------------|-----|
| Essays | Pyramid (tetrahedron) | Gold | `(1.0, 0.65, 0.1)` |
| Posts | Atom (nucleus + orbital rings + electron balls) | Violet | `(0.5, 0.3, 0.9)` |
| Systems | DNA (molecular, real PDB 1BNA data) | Teal | `(0.2, 0.7, 0.7)` |

### Render Specs

- **Resolution**: 512×512px
- **Frames**: 90 (3 seconds at 30fps, perfect loop)
- **Format**: WebM (VP9 + alpha transparency) + MP4 fallback
- **Background**: Transparent (`film_transparent = True`)
- **Engine**: Cycles (Metal GPU), 48 samples, 10 bounces
- **Animation**: Single full rotation around Z axis

### Lighting Recipe: Cool Silver

The "cool silver" lighting setup creates a monochrome, sophisticated look that matches the blog's black/white aesthetic.

**World (Hidden HDRI Technique)**:
- Camera sees pure black background (via Light Path → Is Camera Ray)
- Chrome surfaces see a warm spherical gradient for reflections
- Gradient ramp: `(0.02, 0.02, 0.025)` → `(0.12, 0.12, 0.14)` → `(0.3, 0.3, 0.35)`

**Area Lights** (4 lights, all cool/neutral white):
| Light | Position | Energy | Color | Size |
|-------|----------|--------|-------|------|
| Key (front-right) | `(2.8, -2.5, 1.8)` | 100W | `(0.95, 0.95, 1.0)` | 5 |
| Fill (left) | `(-2.5, -2, 2)` | 55W | `(0.92, 0.92, 0.98)` | 4 |
| Back rim | `(0, 3.5, 2)` | 45W | `(0.9, 0.9, 0.95)` | 4 |
| Rim kicker | `(2, 4, 2)` | 30W | `(0.9, 0.88, 0.95)` | 3 |

**Key rule**: No overhead light reflecting on plate center. Key light is shifted to side.

### Plate Material: Reflective Dark Chrome

```
Principled BSDF:
  Base Color: near-black (0.01, 0.01, 0.012)
  Metallic: 1.0
  Roughness: 0.05  (highly reflective)
  Coat Weight: 1.0
  Coat Roughness: 0.01
```

Plate geometry: Cube scaled to `(0.85, 0.85, 0.04)` with Bevel modifier (width=0.18, segments=12).

### Icon Chrome Material

```
Principled BSDF:
  Base Color: neutral silver (0.8, 0.8, 0.8)
  Metallic: 1.0
  Roughness: 0.08
```

**Warmth comes from the environment**, not the material. Chrome base stays neutral.

### Emissive Accent Material

Used for electron balls, orbital highlights, and decorative elements:

```
Emission shader:
  Color: cool white/silver (0.9, 0.85, 1.0)
  Strength: 8-18 (higher = brighter, >12 washes out color)
```

### Colored Underglow (Section Identity)

Camera-invisible emissive plane beneath the plate. Light bleeds up around edges and reflects off chrome, creating a subtle colored lip.

```python
# Camera-invisible emission plane
Light Path → Is Camera Ray → Mix Shader Fac
  Shader 1 (non-camera): Emission (section color, strength 40)
  Shader 2 (camera): Transparent BSDF
```

Plane: `size=1.8`, `location=(0, 0, -0.1)`

### Camera

```
Location: (0.5, -2.8, 2.2)
Lens: 55mm
Target: (0, 0, 0.12)
```

**Never change the camera angle** — this is the proven perspective.

### Z Positioning

**NEVER hardcode Z position for icons.** Always use `auto_z()`:

```python
def auto_z(obj, plate_top=0.04, clearance=0.02):
    bpy.context.view_layer.update()
    bbox = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
    min_z = min(v.z for v in bbox)
    obj.location.z += (plate_top + clearance - min_z)
```

### Render Pipeline

1. Script sent to Blender sidecar (`http://blender:8000/execute`)
2. Sidecar has 300s timeout — split animations >50 frames into two renders
3. Frames rendered as PNG (RGBA), then stitched with ffmpeg:
   - MP4: `libx264 -pix_fmt yuv420p -movflags +faststart`
   - WebM: `libvpx-vp9 -pix_fmt yuva420p` (preserves alpha)

### Saved Baselines

- `cool-silver-v1`: Uniform amber underglow on all icons
- `accent-colors-v1`: Distinct accent colors (gold/violet/teal)

## SectionIcon Component

React component for displaying animated 3D icons on section pages.

```tsx
<SectionIcon
  src="/icons/essays-pyramid.webm"
  fallbackSrc="/icons/essays-pyramid.mp4"
  size={180}
  className="shrink-0"
/>
```

**Key behaviors**:
- Fade-in animation on mount (framer-motion)
- Forces autoplay via ref-based `play()` call (mobile browser policy workaround)
- Retries play on `visibilitychange` (tab switch recovery)
- `preload="auto"` for instant start

**Layout**: Inline with section header — icon left, title + description right on desktop (`md:flex-row`), stacks on mobile (`flex-col`).

## Icon Files

Located in `packages/blog-site/public/icons/`:

| File | Section | Format |
|------|---------|--------|
| `essays-pyramid.mp4` / `.webm` | Essays | Pyramid + gold underglow |
| `posts-atom.mp4` / `.webm` | Posts | Atom + violet underglow |
| `dna-molecular.mp4` / `.webm` | Systems | DNA + teal underglow |

## Anti-Patterns (Lessons Learned)

| ❌ Don't | ✅ Do Instead |
|----------|---------------|
| Hardcode Z position (`IZ = 0.55`) | Use `auto_z()` from bounding box |
| Warm amber lights | Cool/neutral white lights |
| Glass BSDF plate in black void | Principled BSDF metallic plate |
| Representational forms (books, scrolls) | Abstract geometric forms only |
| `action.fcurves` in Blender 5.x | `keyframe_insert()` directly |
| Single render >50 frames | Split into two renders (300s timeout) |
| Overhead key light | Side-shifted key light |
| Colored chrome base | Neutral chrome + environment warmth |
| Purple/blue as primary light color | Keep lights neutral, color only in underglow |

## Future Directions

- **Black glass plate**: Principled BSDF with Transmission 0.9, IOR 1.52, thicker geometry (0.08)
- **Atom ring rotation**: Orbital rings should spin independently around nucleus
- **Geometry Nodes**: Move from primitive mesh ops to GeoNodes via Python for cleaner geometry
- **Curve-based edges**: Use bevel_depth on curves instead of cylinder-as-edge hack

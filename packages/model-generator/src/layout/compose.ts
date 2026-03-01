import { SIZE, COLOR_BG, FONT_FAMILY, COLOR_WHITE, OPACITY_DIM } from '../brand/constants.js';
import { allFilters } from '../brand/filters.js';
import { watermarkGrid } from '../brand/watermark.js';
import { titleBlock } from '../brand/title-block.js';
import { renderElements } from './elements.js';
import { softMask } from './mask.js';
import type { ModelSpec } from '../schema/model-spec.js';

/**
 * Assemble a complete SVG from a ModelSpec:
 *   defs (filters + mask) → background → watermark (masked) → diagram → title → footer
 */
export function compose(spec: ModelSpec): string {
  const maskDef = softMask('wm-mask', spec.masks);

  const footer = spec.footer
    ? spec.footer.map(f => {
        const op = f.opacity ?? OPACITY_DIM;
        return `<text x="${SIZE / 2}" y="${f.y}" font-family="${FONT_FAMILY}" font-size="10" fill="${COLOR_WHITE}" opacity="${op}" text-anchor="middle">${f.text}</text>`;
      }).join('\n')
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    ${allFilters()}
    ${maskDef}
  </defs>
  <rect width="${SIZE}" height="${SIZE}" fill="${COLOR_BG}"/>
  <g mask="url(#wm-mask)">
    ${watermarkGrid()}
  </g>
  ${renderElements(spec.elements)}
  ${titleBlock(spec.title)}
  ${footer}
</svg>`;
}

import { FONT_FAMILY, TITLE_MAIN_SIZE, TITLE_SUB_SIZE, SIZE, COLOR_WHITE, OPACITY_DIM } from './constants.js';

export interface TitleSpec {
  subtitle: string;
  main: string;
  sub2: string;
}

/**
 * Three-line title block anchored at the bottom of the canvas:
 *   subtitle (small, dim, letter-spaced)
 *   MAIN TITLE (larger, bold, neon glow)
 *   = subtitle (small, dim)
 */
export function titleBlock(spec: TitleSpec, baseY: number = SIZE - 60): string {
  const subStyle = `font-family="${FONT_FAMILY}" font-size="${TITLE_SUB_SIZE}" fill="${COLOR_WHITE}" opacity="${OPACITY_DIM}" letter-spacing="0.25em" text-anchor="middle"`;
  const mainStyle = `font-family="${FONT_FAMILY}" font-size="${TITLE_MAIN_SIZE}" font-weight="700" fill="${COLOR_WHITE}" filter="url(#neon)" text-anchor="middle"`;

  return `<g class="title-block">
    <text x="${SIZE / 2}" y="${baseY - 32}" ${subStyle}>${spec.subtitle.toUpperCase()}</text>
    <text x="${SIZE / 2}" y="${baseY}" ${mainStyle}>${spec.main}</text>
    <text x="${SIZE / 2}" y="${baseY + 22}" ${subStyle}>= ${spec.sub2}</text>
  </g>`;
}

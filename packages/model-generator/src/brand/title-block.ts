import { FONT_FAMILY, TITLE_MAIN_SIZE, TITLE_SUB_SIZE, SIZE, COLOR_WHITE, OPACITY_DIM } from './constants.js';

export interface TitleSpec {
  subtitle: string;
  main: string;
  sub2: string;
}

/**
 * Three-line title block — matches render-legibility-final.js exactly.
 * Default position: top of canvas (y=58, 90, 112).
 */
export function titleBlock(spec: TitleSpec, baseY: number = 90): string {
  return `<g class="title-block">
    <text x="${SIZE / 2}" y="${baseY - 32}" text-anchor="middle" style="font-size: ${TITLE_SUB_SIZE}px; letter-spacing: 0.25em; opacity: ${OPACITY_DIM}; text-transform: uppercase;">${spec.subtitle}</text>
    <text x="${SIZE / 2}" y="${baseY}" text-anchor="middle" style="font-size: ${TITLE_MAIN_SIZE}px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;" filter="url(#neon)">${spec.main}</text>
    <text x="${SIZE / 2}" y="${baseY + 22}" text-anchor="middle" style="font-size: ${TITLE_SUB_SIZE}px; letter-spacing: 0.15em; opacity: ${OPACITY_DIM}; text-transform: uppercase;">= ${spec.sub2}</text>
  </g>`;
}

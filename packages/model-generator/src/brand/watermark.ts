import { SIZE, WATERMARK_FONT_SIZE, FONT_FAMILY } from './constants.js';

const GRID = [
  ['V', 'E', 'R'],
  ['I', 'A', 'L'],
  ['.X', 'Y', 'Z'],
];

/**
 * Generate the 3×3 VERIAL.XYZ watermark grid.
 * Each letter is centered in its cell with the deep-carve wm filter.
 */
export function watermarkGrid(): string {
  const cellW = SIZE / 3;
  const cellH = SIZE / 3;
  const letters: string[] = [];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const x = col * cellW + cellW / 2;
      const y = row * cellH + cellH / 2;
      letters.push(
        `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central"
               font-family="${FONT_FAMILY}" font-size="${WATERMARK_FONT_SIZE}" font-weight="bold"
               fill="#060606" filter="url(#wm)">${GRID[row][col]}</text>`
      );
    }
  }

  return `<g class="watermark">${letters.join('\n')}</g>`;
}

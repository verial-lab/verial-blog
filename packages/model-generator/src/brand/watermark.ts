import { SIZE, WATERMARK_FONT_SIZE, FONT_FAMILY } from './constants.js';

const GRID = [
  ['V', 'E', 'R'],
  ['I', 'A', 'L'],
  ['.X', 'Y', 'Z'],
];

/**
 * Generate the 3×3 VERIAL.XYZ watermark grid.
 * Matches render-legibility-final.js watermarkSVG() exactly.
 */
export function watermarkGrid(): string {
  const cellW = SIZE / 3;
  const cellH = SIZE / 3;
  const letters: string[] = [];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const x = col * cellW + cellW / 2;
      const y = row * cellH + cellH / 2 + 40;
      letters.push(
        `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle"
               style="font-family: system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif; font-size: ${WATERMARK_FONT_SIZE}px; font-weight: bold; fill: #FFFFFF; letter-spacing: 0; text-transform: none;"
               filter="url(#wm)">${GRID[row][col]}</text>`
      );
    }
  }

  return `<g class="watermark">${letters.join('\n')}</g>`;
}

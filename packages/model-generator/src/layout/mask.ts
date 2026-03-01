import type { MaskEllipseType } from '../schema/model-spec.js';

/**
 * Generate a soft-mask definition from ellipse zones.
 * The mask whites-out areas where the watermark should be visible,
 * fading at the edges via radial gradients.
 */
export function softMask(id: string, ellipses: MaskEllipseType[]): string {
  const gradients = ellipses.map((e, i) => `
    <radialGradient id="${id}-grad-${i}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="black"/>
      <stop offset="70%" stop-color="black"/>
      <stop offset="100%" stop-color="white"/>
    </radialGradient>`).join('');

  const rects = ellipses.map((e, i) => `
    <ellipse cx="${e.cx}" cy="${e.cy}" rx="${e.rx}" ry="${e.ry}" fill="url(#${id}-grad-${i})"/>`).join('');

  return `
    ${gradients}
    <mask id="${id}">
      <rect width="100%" height="100%" fill="white"/>
      ${rects}
    </mask>`;
}

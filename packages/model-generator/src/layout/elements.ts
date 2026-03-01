import { FONT_FAMILY, COLOR_WHITE, COLOR_ACCENT } from '../brand/constants.js';
import type { DiagramElementType } from '../schema/model-spec.js';

export function renderElement(el: DiagramElementType): string {
  switch (el.type) {
    case 'box': {
      const stroke = el.stroke ?? COLOR_WHITE;
      const sw = el.strokeWidth ?? 1;
      const dash = el.dashed ? ' stroke-dasharray="6,4"' : '';
      const filter = el.neon ? ' filter="url(#neon)"' : '';
      const opacity = el.opacity != null ? ` opacity="${el.opacity}"` : '';
      const rx = el.rx != null ? ` rx="${el.rx}"` : '';
      const fill = el.fill ?? 'none';
      return `<rect x="${el.x}" y="${el.y}" width="${el.w}" height="${el.h}"${rx} fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash}${filter}${opacity}/>`;
    }
    case 'label': {
      const size = el.size ?? 12;
      const weight = el.weight ?? 400;
      const opacity = el.opacity != null ? ` opacity="${el.opacity}"` : '';
      const anchor = el.anchor ?? 'middle';
      const filter = el.neon ? ' filter="url(#neon)"' : '';
      const ls = el.letterSpacing ? ` letter-spacing="${el.letterSpacing}"` : '';
      return `<text x="${el.x}" y="${el.y}" font-family="${FONT_FAMILY}" font-size="${size}" font-weight="${weight}" fill="${COLOR_WHITE}" text-anchor="${anchor}"${opacity}${filter}${ls}>${el.text}</text>`;
    }
    case 'line': {
      const stroke = el.accent ? COLOR_ACCENT : COLOR_WHITE;
      const dash = el.dashed ? ' stroke-dasharray="6,4"' : '';
      const opacity = el.opacity != null ? ` opacity="${el.opacity}"` : '';
      const sw = el.strokeWidth ?? 1;
      const markerSuffix = el.accent ? '-accent' : '';
      let markers = '';
      if (el.arrow === 'end' || el.arrow === 'both') markers += ` marker-end="url(#chevron${markerSuffix})"`;
      if (el.arrow === 'start' || el.arrow === 'both') markers += ` marker-start="url(#chevron${markerSuffix})"`;
      return `<line x1="${el.x1}" y1="${el.y1}" x2="${el.x2}" y2="${el.y2}" stroke="${stroke}" stroke-width="${sw}"${dash}${markers}${opacity}/>`;
    }
    case 'circle': {
      const stroke = el.stroke ?? COLOR_WHITE;
      const dash = el.dashed ? ' stroke-dasharray="6,4"' : '';
      const filter = el.neon ? ' filter="url(#neon)"' : '';
      const opacity = el.opacity != null ? ` opacity="${el.opacity}"` : '';
      return `<circle cx="${el.cx}" cy="${el.cy}" r="${el.r}" fill="none" stroke="${stroke}" stroke-width="1"${dash}${filter}${opacity}/>`;
    }
  }
}

export function renderElements(elements: DiagramElementType[]): string {
  return `<g class="diagram">${elements.map(renderElement).join('\n')}</g>`;
}

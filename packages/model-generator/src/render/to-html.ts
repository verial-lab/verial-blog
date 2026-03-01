import { COLOR_BG } from '../brand/constants.js';

/**
 * Wrap SVG in an HTML shell suitable for browserless screenshot.
 * Matches render-legibility-final.js wrap() exactly.
 */
export function toHtml(svg: string): string {
  return `<!DOCTYPE html><html><head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 800px; height: 800px; background: ${COLOR_BG}; overflow: hidden; }
  svg text { font-family: system-ui, -apple-system, sans-serif; fill: #FFF; text-transform: uppercase; letter-spacing: 0.1em; }
</style>
<script>document.addEventListener('DOMContentLoaded', () => document.body.classList.add('ready'));</script>
</head>
<body>
${svg}
</body></html>`;
}

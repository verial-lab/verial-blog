import { COLOR_BG } from '../brand/constants.js';

/**
 * Wrap SVG in an HTML shell suitable for browserless screenshot.
 */
export function toHtml(svg: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    * { margin: 0; padding: 0; }
    body {
      background: ${COLOR_BG};
      display: flex;
      align-items: center;
      justify-content: center;
      width: 800px;
      height: 800px;
      overflow: hidden;
    }
  </style>
</head>
<body class="ready">
  ${svg}
</body>
</html>`;
}

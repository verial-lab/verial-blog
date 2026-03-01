import fs from 'node:fs';
import path from 'node:path';

const BROWSERLESS_URL = process.env.BROWSERLESS_URL ?? 'http://browserless:3000/screenshot';

/**
 * POST HTML to browserless and save the resulting PNG.
 */
export async function screenshot(html: string, outputPath: string): Promise<void> {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const resp = await fetch(BROWSERLESS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      html,
      options: {
        type: 'png',
        clip: { x: 0, y: 0, width: 800, height: 800 },
        fullPage: false,
      },
      waitForSelector: { selector: '.ready', timeout: 5000 },
    }),
  });

  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`Browserless failed (${resp.status}): ${body}`);
  }

  fs.writeFileSync(outputPath, Buffer.from(await resp.arrayBuffer()));
  console.log(`✓ ${outputPath} (${fs.statSync(outputPath).size} bytes)`);
}

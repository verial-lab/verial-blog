#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ModelSpecSchema } from './schema/model-spec.js';
import { compose } from './layout/compose.js';
import { toHtml } from './render/to-html.js';
import { screenshot } from './render/screenshot.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = path.resolve(__dirname, '..');
const SPECS_DIR = path.join(PKG_ROOT, 'specs');
const OUTPUT_DIR = path.join(PKG_ROOT, 'output');

function parseArgs(argv: string[]) {
  const args = argv.slice(2);
  let input: string | null = null;
  let all = false;
  let htmlOnly = false;
  let output: string | null = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' && args[i + 1]) { input = args[++i]; }
    else if (args[i] === '--output' && args[i + 1]) { output = args[++i]; }
    else if (args[i] === '--all') { all = true; }
    else if (args[i] === '--html') { htmlOnly = true; }
  }

  return { input, all, htmlOnly, output };
}

async function renderSpec(specPath: string, opts: { htmlOnly: boolean; output?: string | null }) {
  const raw = JSON.parse(fs.readFileSync(specPath, 'utf-8'));
  const spec = ModelSpecSchema.parse(raw);
  const svg = compose(spec);
  const html = toHtml(svg);

  if (opts.htmlOnly) {
    const outPath = opts.output ?? path.join(OUTPUT_DIR, `${spec.id}.html`);
    if (!fs.existsSync(path.dirname(outPath))) fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    console.log(`✓ ${outPath}`);
  } else {
    const outPath = opts.output ?? path.join(OUTPUT_DIR, `${spec.id}.png`);
    await screenshot(html, outPath);
  }
}

async function main() {
  const opts = parseArgs(process.argv);

  if (opts.all) {
    const specs = fs.readdirSync(SPECS_DIR).filter(f => f.endsWith('.json'));
    if (specs.length === 0) { console.error('No specs found in', SPECS_DIR); process.exit(1); }
    for (const file of specs) {
      await renderSpec(path.join(SPECS_DIR, file), { htmlOnly: opts.htmlOnly });
    }
  } else if (opts.input) {
    await renderSpec(opts.input, { htmlOnly: opts.htmlOnly, output: opts.output });
  } else {
    console.error('Usage: model-generator --input <spec.json> [--output <path>] [--html]');
    console.error('       model-generator --all [--html]');
    process.exit(1);
  }
}

main().catch(err => { console.error(err); process.exit(1); });

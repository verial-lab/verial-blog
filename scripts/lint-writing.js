#!/usr/bin/env node
/**
 * lint-writing.js
 *
 * Scans public-facing writing for em dashes (—).
 *
 * Usage:
 *   npm run lint:writing                      # report only
 *   npm run lint:writing -- --ci             # exit 1 if any found (CI mode)
 *
 * Exit codes:
 *   0  no violations found
 *   1  violations found (--ci mode only)
 */

const fs = require('fs');
const path = require('path');

const EM_DASH = '—';
const CI_MODE = process.argv.includes('--ci');

// Paths to scan, relative to the repo root (verial-blog/).
const SCAN_TARGETS = [
  'packages/blog-site/content',
  'README.md',
];

const EXTENSIONS = new Set(['.mdx', '.md']);

function collectFiles(target, root) {
  const abs = path.join(root, target);
  if (!fs.existsSync(abs)) return [];
  const stat = fs.statSync(abs);
  if (stat.isFile()) return EXTENSIONS.has(path.extname(abs)) ? [abs] : [];
  const results = [];
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    results.push(...collectFiles(path.join(target, entry.name), root));
  }
  return results;
}

const root = path.resolve(__dirname, '..');
const files = SCAN_TARGETS.flatMap(t => collectFiles(t, root));

console.log(`Scanning ${files.length} file${files.length === 1 ? '' : 's'} in: ${SCAN_TARGETS.join(', ')}\n`);

let totalHits = 0;
let affectedFiles = 0;

for (const file of files) {
  const lines = fs.readFileSync(file, 'utf-8').split('\n');
  const hits = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes(EM_DASH)) continue;
    hits.push({ lineNum: i + 1, line });
  }

  if (hits.length === 0) continue;

  const rel = path.relative(root, file);
  console.log(`${rel} (${hits.length} hit${hits.length === 1 ? '' : 's'})`);
  for (const { lineNum, line } of hits) {
    const display = line.length > 120 ? line.slice(0, 117) + '...' : line;
    console.log(`  line ${lineNum}: ${display}`);
  }
  console.log('');
  totalHits += hits.length;
  affectedFiles++;
}

if (totalHits === 0) {
  console.log('✓ No em dashes found.');
  process.exit(0);
} else {
  console.log(`${totalHits} em dash${totalHits === 1 ? '' : 'es'} found in ${affectedFiles} file${affectedFiles === 1 ? '' : 's'}.`);
  if (CI_MODE) {
    console.log(`Em dashes are not allowed in public-facing content (${SCAN_TARGETS.join(', ')}). Fix before merging.`);
    process.exit(1);
  }
}

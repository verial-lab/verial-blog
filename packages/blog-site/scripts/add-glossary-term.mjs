#!/usr/bin/env node
/**
 * Add a glossary term. Validates no duplicates, inserts alphabetically.
 *
 * Usage:
 *   node scripts/add-glossary-term.mjs "Term Name" "Definition text here."
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GLOSSARY_PATH = join(__dirname, '..', 'content', 'glossary.yaml');

const term = process.argv[2];
const definition = process.argv[3];

if (!term || !definition) {
  console.error('Usage: node scripts/add-glossary-term.mjs "Term" "Definition"');
  process.exit(1);
}

// Read existing entries (simple YAML parse — avoids needing js-yaml at CLI)
let raw = '';
try {
  raw = readFileSync(GLOSSARY_PATH, 'utf8');
} catch {
  // File doesn't exist yet, start fresh
}

// Parse entries from YAML (simple parser for our flat structure)
const entries = [];
const blocks = raw.split(/^- /m).filter(Boolean);
for (const block of blocks) {
  const termMatch = block.match(/term:\s*(.+)/);
  const defMatch = block.match(/definition:\s*"(.+)"/);
  if (termMatch && defMatch) {
    entries.push({ term: termMatch[1].trim(), definition: defMatch[1].trim() });
  }
}

// Check for duplicates
const existing = entries.find(e => e.term.toLowerCase() === term.toLowerCase());
if (existing) {
  console.error(`❌ Term "${term}" already exists in glossary.`);
  console.error(`   Existing definition: "${existing.definition}"`);
  process.exit(1);
}

// Add and sort
entries.push({ term, definition });
entries.sort((a, b) => a.term.localeCompare(b.term));

// Write back
const yaml = entries
  .map(e => `- term: ${e.term}\n  definition: "${e.definition}"`)
  .join('\n\n');

writeFileSync(GLOSSARY_PATH, yaml + '\n');

console.log(`✅ Added "${term}" to glossary (${entries.length} terms total).`);

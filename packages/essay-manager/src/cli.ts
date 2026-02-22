#!/usr/bin/env node

import { mkdirSync, cpSync, readFileSync, existsSync, writeFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseSections } from './parse-sections.js';
import { readStatus, initStatus } from './status.js';
import { publish } from './publish.js';

const ESSAYS_DIR = resolve(process.cwd(), 'essays');
const TEMPLATE_DIR = join(ESSAYS_DIR, '_template');

function essayDir(slug: string): string {
  return join(ESSAYS_DIR, slug);
}

function cmdNew(slug: string): void {
  const dir = essayDir(slug);
  if (existsSync(dir)) {
    console.error(`Essay "${slug}" already exists at ${dir}`);
    process.exit(1);
  }

  if (!existsSync(TEMPLATE_DIR)) {
    console.error(`Template not found at ${TEMPLATE_DIR}`);
    process.exit(1);
  }

  cpSync(TEMPLATE_DIR, dir, { recursive: true });

  // Update the essay.md title placeholder
  const essayPath = join(dir, 'essay.md');
  if (existsSync(essayPath)) {
    let content = readFileSync(essayPath, 'utf-8');
    const title = slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    content = content.replace(/\{\{title\}\}/g, title);
    content = content.replace(/\{\{slug\}\}/g, slug);
    writeFileSync(essayPath, content);
  }

  console.log(`✨ Created new essay: ${dir}`);
}

function cmdStatus(slug?: string): void {
  if (!slug) {
    // List all essays with summary
    // readdirSync imported at top
    if (!existsSync(ESSAYS_DIR)) {
      console.log('No essays directory found.');
      return;
    }
    const entries = readdirSync(ESSAYS_DIR, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith('_')) continue;
      printStatus(entry.name);
    }
    return;
  }
  printStatus(slug);
}

function printStatus(slug: string): void {
  const dir = essayDir(slug);
  const statusPath = join(dir, 'status.json');
  const essayPath = join(dir, 'essay.md');

  if (!existsSync(dir)) {
    console.error(`Essay "${slug}" not found.`);
    return;
  }

  // Sync status with actual sections
  if (existsSync(essayPath)) {
    const md = readFileSync(essayPath, 'utf-8');
    const sections = parseSections(md);
    initStatus(statusPath, sections.map((s) => s.id));
  }

  const status = readStatus(statusPath);
  console.log(`\n📝 ${slug}`);
  for (const [id, state] of Object.entries(status)) {
    const icon = state === 'complete' ? '✅' : state === 'in-progress' ? '🔄' : '📋';
    console.log(`  ${icon} ${id}: ${state}`);
  }
}

function cmdPublish(slug: string): void {
  const dir = essayDir(slug);
  const essayPath = join(dir, 'essay.md');
  const sourcesPath = join(dir, 'sources.json');

  if (!existsSync(essayPath)) {
    console.error(`Essay not found: ${essayPath}`);
    process.exit(1);
  }

  const output = publish(essayPath, sourcesPath);
  const outPath = join(dir, `${slug}.mdx`);
  writeFileSync(outPath, output);
  console.log(`📄 Published to ${outPath}`);
}

// --- Main ---

const [, , command, arg] = process.argv;

switch (command) {
  case 'new':
    if (!arg) {
      console.error('Usage: essay new <slug>');
      process.exit(1);
    }
    cmdNew(arg);
    break;
  case 'status':
    cmdStatus(arg);
    break;
  case 'publish':
    if (!arg) {
      console.error('Usage: essay publish <slug>');
      process.exit(1);
    }
    cmdPublish(arg);
    break;
  default:
    console.log(`
Essay Manager — Simple essay writing pipeline

Commands:
  essay new <slug>       Create a new essay from template
  essay status [slug]    Show section statuses
  essay publish <slug>   Generate MDX with footnotes
`);
}

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

export interface GlossaryEntry {
  term: string;
  definition: string;
}

export interface GlossaryBacklink {
  title: string;
  url: string;
}

/**
 * Load glossary entries from YAML without js-yaml dependency.
 */
export function loadGlossary(): GlossaryEntry[] {
  try {
    const raw = readFileSync(join(process.cwd(), 'content/glossary.yaml'), 'utf8');
    const entries: GlossaryEntry[] = [];
    const blocks = raw.split(/^- /m).filter(Boolean);
    for (const block of blocks) {
      const termMatch = block.match(/term:\s*(.+)/);
      const defMatch = block.match(/definition:\s*"([^"]+)"/);
      if (termMatch && defMatch) {
        entries.push({
          term: termMatch[1].trim(),
          definition: defMatch[1].trim(),
        });
      }
    }
    return entries.sort((a, b) => a.term.localeCompare(b.term));
  } catch {
    return [];
  }
}

/**
 * Scan all content files to find which pages reference each glossary term.
 * Returns a map: lowercase term → array of backlinks.
 */
export function buildBacklinks(entries: GlossaryEntry[]): Map<string, GlossaryBacklink[]> {
  const backlinks = new Map<string, GlossaryBacklink[]>();
  const contentDir = join(process.cwd(), 'content');

  const sections = [
    { dir: 'essays', urlPrefix: '/essays' },
    { dir: 'posts', urlPrefix: '/posts' },
    { dir: 'systems', urlPrefix: '/systems' },
  ];

  for (const section of sections) {
    const sectionDir = join(contentDir, section.dir);
    let files: string[];
    try {
      files = readdirSync(sectionDir).filter(f => f.endsWith('.mdx') && f !== 'index.mdx');
    } catch {
      continue;
    }

    for (const file of files) {
      const raw = readFileSync(join(sectionDir, file), 'utf8');
      const titleMatch = raw.match(/title:\s*["']?(.+?)["']?\s*$/m);
      const title = titleMatch ? titleMatch[1].trim() : file.replace('.mdx', '');
      const slug = file.replace('.mdx', '');
      const url = `${section.urlPrefix}/${slug}`;

      // Strip frontmatter for content scanning
      const content = raw.replace(/^---[\s\S]*?---/, '').toLowerCase();

      for (const entry of entries) {
        const termLower = entry.term.toLowerCase();
        const regex = new RegExp(`\\b${entry.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (regex.test(content)) {
          if (!backlinks.has(termLower)) backlinks.set(termLower, []);
          const anchor = `glossary-ref-${termLower.replace(/\s+/g, '-')}`;
          backlinks.get(termLower)!.push({ title, url: `${url}#${anchor}` });
        }
      }
    }
  }

  return backlinks;
}

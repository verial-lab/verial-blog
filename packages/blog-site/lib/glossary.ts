import { readFileSync } from 'fs';
import { join } from 'path';

export interface GlossaryEntry {
  term: string;
  definition: string;
}

/**
 * Load glossary entries from YAML without js-yaml dependency.
 * Simple parser for our flat YAML structure.
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

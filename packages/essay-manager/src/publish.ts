import { readFileSync } from 'node:fs';
import { readSources } from './sources.js';
import type { SourcesList } from './types.js';

/**
 * Convert [source:id] references in essay markdown to numbered footnotes,
 * and append a footnotes section at the bottom.
 *
 * Pattern in essay.md: [source:my-source-id]
 * Output: numbered superscript reference + footnotes list
 */
export function publish(essayPath: string, sourcesPath: string): string {
  const markdown = readFileSync(essayPath, 'utf-8');
  const sources = readSources(sourcesPath);

  return renderWithFootnotes(markdown, sources);
}

export function renderWithFootnotes(
  markdown: string,
  sources: SourcesList
): string {
  const usedSources: Source[] = [];
  const sourceIndexMap = new Map<string, number>();

  // Replace [source:id] with footnote numbers
  const body = markdown.replace(/\[source:([^\]]+)\]/g, (_match, id: string) => {
    const trimmedId = id.trim();
    if (!sourceIndexMap.has(trimmedId)) {
      const source = sources.find((s) => s.id === trimmedId);
      if (source) {
        usedSources.push(source);
        sourceIndexMap.set(trimmedId, usedSources.length);
      } else {
        return `[source:${trimmedId}]`; // leave unresolved
      }
    }
    const num = sourceIndexMap.get(trimmedId)!;
    return `[^${num}]`;
  });

  if (usedSources.length === 0) return body;

  // Build footnotes section
  const footnotes = usedSources
    .map((s, i) => `[^${i + 1}]: [${s.title}](${s.url})`)
    .join('\n');

  return `${body.trimEnd()}\n\n---\n\n${footnotes}\n`;
}

type Source = SourcesList[number];

import type { Section } from './types.js';

/**
 * Derive a section ID from a header title.
 * "My Section Title" → "my-section-title"
 */
export function toSectionId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Parse markdown into sections split by ## headers.
 * Content before the first ## is ignored (or treated as intro).
 */
export function parseSections(markdown: string): Section[] {
  const lines = markdown.split('\n');
  const sections: Section[] = [];
  let current: Section | null = null;
  const contentLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^##\s+(.+)$/);

    if (match) {
      // Flush previous section
      if (current) {
        current.content = contentLines.join('\n').trim();
        sections.push(current);
        contentLines.length = 0;
      }

      current = {
        id: toSectionId(match[1]),
        title: match[1],
        content: '',
        line: i + 1,
      };
    } else if (current) {
      contentLines.push(line);
    }
  }

  // Flush last section
  if (current) {
    current.content = contentLines.join('\n').trim();
    sections.push(current);
  }

  return sections;
}

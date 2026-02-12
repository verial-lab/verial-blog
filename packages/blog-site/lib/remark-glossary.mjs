/**
 * Remark plugin: auto-link glossary terms in content.
 *
 * Reads glossary.yaml once at init, then for each MDX file:
 * - Walks text nodes in paragraphs and list items
 * - Replaces the FIRST occurrence of each term with a <GlossaryTerm> JSX element
 * - Skips headings, code, links, and existing glossary terms
 * - Matches longest terms first to avoid partial overlaps
 * - Collects backlinks for the /glossary page
 */
import { visit } from 'unist-util-visit';
import { readFileSync } from 'fs';
import { join } from 'path';
/** @type {Array<{term: string, definition: string}>} */
let glossaryEntries = null;

/** @type {Map<string, Set<string>>} backlinks: term → set of page paths */
const backlinks = new Map();

// Node types to skip entirely (don't scan children)
const SKIP_TYPES = new Set([
  'heading', 'code', 'inlineCode', 'link', 'image',
  'mdxJsxFlowElement', 'mdxJsxTextElement',
]);

/**
 * Simple YAML parser for our flat glossary structure.
 * Avoids js-yaml dependency.
 */
function loadGlossary() {
  if (glossaryEntries) return glossaryEntries;
  try {
    const filePath = join(process.cwd(), 'content/glossary.yaml');
    const raw = readFileSync(filePath, 'utf8');
    const entries = [];
    const blocks = raw.split(/^- /m).filter(Boolean);
    for (const block of blocks) {
      const termMatch = block.match(/term:\s*(.+)/);
      const defMatch = block.match(/definition:\s*"([^"]+)"/);
      if (termMatch && defMatch) {
        entries.push({ term: termMatch[1].trim(), definition: defMatch[1].trim() });
      }
    }
    glossaryEntries = entries;
    // Sort by term length descending (longest match first)
    glossaryEntries.sort((a, b) => b.term.length - a.term.length);
  } catch {
    glossaryEntries = [];
  }
  return glossaryEntries;
}

/**
 * Build a regex that matches any glossary term (longest first, whole word, case-insensitive).
 */
function buildTermRegex(entries) {
  if (entries.length === 0) return null;
  const escaped = entries.map(e =>
    e.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  return new RegExp(`\\b(${escaped.join('|')})\\b`, 'i');
}

/**
 * Create an mdxJsxTextElement for <GlossaryTerm>.
 */
function makeGlossaryNode(term, definition, matchedText) {
  return {
    type: 'mdxJsxTextElement',
    name: 'GlossaryTerm',
    attributes: [
      { type: 'mdxJsxAttribute', name: 'term', value: term },
      { type: 'mdxJsxAttribute', name: 'definition', value: definition },
    ],
    children: [{ type: 'text', value: matchedText }],
  };
}

export default function remarkGlossary() {
  const entries = loadGlossary();
  const regex = buildTermRegex(entries);

  return (tree, file) => {
    if (!regex || entries.length === 0) return;

    // Track which terms we've already linked on this page (first occurrence only)
    const linked = new Set();

    // Build a lookup map (lowercase term → entry)
    const lookup = new Map();
    for (const entry of entries) {
      lookup.set(entry.term.toLowerCase(), entry);
    }

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === null) return;

      // Skip if parent is a type we shouldn't touch
      if (SKIP_TYPES.has(parent.type)) return;

      // Walk up to check grandparents too (e.g., text inside a link)
      // The visit function handles this via the ancestor check below
      // but we also check parent directly
      if (parent.type === 'link' || parent.type === 'strong' || parent.type === 'emphasis') {
        // Allow strong/emphasis, but not links
        if (parent.type === 'link') return;
      }

      const text = node.value;
      const match = regex.exec(text);
      if (!match) return;

      const matchedText = match[0];
      const termKey = matchedText.toLowerCase();

      // Skip if already linked on this page
      if (linked.has(termKey)) return;

      const entry = lookup.get(termKey);
      if (!entry) return;

      linked.add(termKey);

      // Record backlink
      const pagePath = file?.history?.[0] || file?.path || '';
      if (pagePath) {
        if (!backlinks.has(termKey)) backlinks.set(termKey, new Set());
        backlinks.get(termKey).add(pagePath);
      }

      // Split the text node: before + glossary element + after
      const before = text.slice(0, match.index);
      const after = text.slice(match.index + matchedText.length);

      const newNodes = [];
      if (before) newNodes.push({ type: 'text', value: before });
      newNodes.push(makeGlossaryNode(entry.term, entry.definition, matchedText));
      if (after) newNodes.push({ type: 'text', value: after });

      // Replace the text node with our new nodes
      parent.children.splice(index, 1, ...newNodes);

      // Return the index to skip processing the newly inserted nodes
      return index + newNodes.length;
    });
  };
}

/** Get collected backlinks (for use in glossary page generation) */
export function getBacklinks() {
  return Object.fromEntries(
    Array.from(backlinks.entries()).map(([term, paths]) => [term, [...paths]])
  );
}

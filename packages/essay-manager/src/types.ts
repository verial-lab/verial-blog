// --- Status ---

export type SectionStatus = 'draft' | 'in-progress' | 'complete';

/** Maps section IDs (derived from ## headers) to their status */
export type StatusMap = Record<string, SectionStatus>;

// --- Sources ---

export interface Source {
  id: string;
  url: string;
  title: string;
  snippet: string;
  /** Quality score 0-10 */
  quality: number;
  /** Section IDs where this source is referenced */
  usedInSections: string[];
}

export type SourcesList = Source[];

// --- Essay Config / Frontmatter ---

export interface EssayFrontmatter {
  title: string;
  slug: string;
  description?: string;
  tags?: string[];
  date?: string;
  draft?: boolean;
}

// --- Section ---

export interface Section {
  id: string;
  title: string;
  content: string;
  /** Line number where the section starts */
  line: number;
}

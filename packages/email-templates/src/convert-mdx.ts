import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface ContentMeta {
  title: string;
  description?: string;
  excerpt?: string;
  date?: string;
  type: string;
  slug: string;
  email_draft?: boolean;
}

export interface ConvertedContent {
  meta: ContentMeta;
  html: string;
  canonicalUrl: string;
  tags: string[];
}

/**
 * Detect content type from file path
 */
function detectType(filePath: string): string {
  if (filePath.includes('/essays/')) return 'essays';
  if (filePath.includes('/posts/')) return 'posts';
  if (filePath.includes('/systems/')) return 'systems';
  return 'essays';
}

/**
 * Derive slug from filename
 */
function deriveSlug(filePath: string): string {
  return path.basename(filePath, path.extname(filePath));
}

/**
 * Map content type to Buttondown tags
 */
function mapTags(type: string): string[] {
  switch (type) {
    case 'essays':
      return ['essays'];
    case 'posts':
      return ['essays', 'posts'];
    case 'systems':
      return ['essays', 'systems'];
    default:
      return ['essays'];
  }
}

/**
 * Strip JSX/MDX components from markdown, keep plain markdown
 */
function stripJsx(content: string): string {
  // Remove import statements
  let cleaned = content.replace(/^import\s+.*$/gm, '');
  // Remove JSX self-closing tags like <Component ... />
  cleaned = cleaned.replace(/<[A-Z][a-zA-Z]*\s*[^>]*\/>/g, '');
  // Remove JSX opening+closing tags and their content if they span single line
  cleaned = cleaned.replace(/<[A-Z][a-zA-Z]*[^>]*>.*?<\/[A-Z][a-zA-Z]*>/gs, '');
  // Remove remaining JSX opening/closing tags (multi-line components)
  cleaned = cleaned.replace(/<\/?[A-Z][a-zA-Z]*[^>]*>/g, '');
  // Remove export statements
  cleaned = cleaned.replace(/^export\s+.*$/gm, '');
  // Clean up excessive blank lines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  return cleaned.trim();
}

/**
 * Convert an MDX file to email-ready HTML
 */
export async function convertMdxToEmail(filePath: string): Promise<ConvertedContent> {
  const absolutePath = path.resolve(filePath);
  const raw = fs.readFileSync(absolutePath, 'utf-8');
  const { data, content } = matter(raw);

  const type = detectType(absolutePath);
  const slug = deriveSlug(absolutePath);
  const cleanMarkdown = stripJsx(content);
  const html = await marked.parse(cleanMarkdown);

  const meta: ContentMeta = {
    title: data.title || slug,
    description: data.description,
    excerpt: data.excerpt || data.description,
    date: data.date,
    type,
    slug,
    email_draft: data.email_draft,
  };

  return {
    meta,
    html,
    canonicalUrl: `https://verial.xyz/${type}/${slug}`,
    tags: mapTags(type),
  };
}

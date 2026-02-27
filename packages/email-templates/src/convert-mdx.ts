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
 * Convert markdown footnotes to simple HTML
 * [^1] → superscript link, [^1]: text → footnote list at bottom
 */
function processFootnotes(html: string): string {
  // Collect footnote definitions: <p>[^N]: text</p> or standalone [^N]: text
  const definitions: Record<string, string> = {};
  // Remove footnote definitions from body and collect them
  let cleaned = html.replace(
    /(?:<p>)?\[\^(\d+)\]:\s*(.*?)(?:<\/p>)?(?:\n|$)/g,
    (_, id, text) => {
      definitions[id] = text.replace(/<\/?p>/g, '').trim();
      return '';
    }
  );

  // Replace inline footnote references [^N] with superscript
  cleaned = cleaned.replace(
    /\[\^(\d+)\]/g,
    (_, id) => `<sup><a href="#fn-${id}" id="fnref-${id}" style="color:#4D80FF;text-decoration:none">[${id}]</a></sup>`
  );

  // Append footnotes section if any exist
  const ids = Object.keys(definitions).sort((a, b) => Number(a) - Number(b));
  if (ids.length > 0) {
    cleaned += '<hr style="border-top:1px solid #e5e5e5;margin:24px 0">';
    cleaned += '<div style="font-size:14px;color:#666;line-height:1.6">';
    for (const id of ids) {
      cleaned += `<p id="fn-${id}" style="margin:4px 0"><sup>[${id}]</sup> ${definitions[id]} <a href="#fnref-${id}" style="color:#4D80FF;text-decoration:none">↩</a></p>`;
    }
    cleaned += '</div>';
  }

  return cleaned;
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
  const rawHtml = await marked.parse(cleanMarkdown);
  const html = processFootnotes(rawHtml);

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

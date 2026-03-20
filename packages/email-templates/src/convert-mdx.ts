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

const SITE_URL = 'https://verial.xyz';

// ---------------------------------------------------------------------------
// Content metadata helpers
// ---------------------------------------------------------------------------

function detectType(filePath: string): string {
  if (filePath.includes('/essays/')) return 'essays';
  if (filePath.includes('/posts/')) return 'posts';
  if (filePath.includes('/systems/')) return 'systems';
  return 'essays';
}

function deriveSlug(filePath: string): string {
  return path.basename(filePath, path.extname(filePath));
}

function mapTags(type: string): string[] {
  switch (type) {
    case 'essays':  return ['essays'];
    case 'posts':   return ['posts'];
    case 'systems': return ['systems'];
    default:        return ['essays'];
  }
}

// ---------------------------------------------------------------------------
// MDX → plain markdown
// ---------------------------------------------------------------------------

/**
 * Strip JSX/MDX-specific syntax, leaving plain markdown that `marked` can parse.
 * Only removes uppercase-starting React components — lowercase HTML elements
 * (img, video, source, etc.) are kept and processed later by email transforms.
 */
function stripJsx(content: string): string {
  let out = content;
  out = out.replace(/^import\s+.*$/gm, '');                          // import statements
  out = out.replace(/<[A-Z][a-zA-Z]*\s*[^>]*\/>/g, '');             // <Component />
  out = out.replace(/<[A-Z][a-zA-Z]*[^>]*>[\s\S]*?<\/[A-Z][a-zA-Z]*>/g, ''); // <Component>…</Component>
  out = out.replace(/<\/?[A-Z][a-zA-Z]*[^>]*>/g, '');               // remaining open/close tags
  out = out.replace(/^export\s+.*$/gm, '');                          // export statements
  out = out.replace(/\n{3,}/g, '\n\n');
  return out.trim();
}

// ---------------------------------------------------------------------------
// HTML post-processing for email clients
//
// Each transform is a named function — easy to add, remove, or reorder.
// ---------------------------------------------------------------------------

/**
 * Convert relative /images/... and /videos/... src URLs to absolute.
 * Email clients fetch images directly; relative paths don't resolve.
 */
function absolutifyUrls(html: string): string {
  return html.replace(
    /(<(?:img|source)[^>]+src=")\/([^"]+)"/g,
    `$1${SITE_URL}/$2"`
  );
}

/**
 * Remove JSX-style style attributes: style={{ ... }}
 * These are valid JSX but not valid HTML — email clients ignore or break on them.
 */
function stripJsxStyleAttributes(html: string): string {
  // Matches style={{ ... }} where content contains no nested {{ }}
  return html.replace(/\s+style=\{\{[^{}]*\}\}/g, '');
}

/**
 * Replace <video> elements with a linked CTA.
 * Email clients don't support video; a plain link is the fallback.
 */
function replaceVideos(html: string, canonicalUrl: string): string {
  return html.replace(
    /<video[\s\S]*?<\/video>/gi,
    `<p style="text-align:center;margin:24px 0">` +
    `<a href="${canonicalUrl}" style="color:#4D80FF;text-decoration:none">` +
    `&#9654; Watch the video on verial.xyz &#8594;</a></p>`
  );
}

/**
 * Run all email HTML transforms in order.
 * To add a new transform: write a function above and add it to the list below.
 */
function processEmailHtml(html: string, canonicalUrl: string): string {
  let out = html;
  out = absolutifyUrls(out);
  out = stripJsxStyleAttributes(out);
  out = replaceVideos(out, canonicalUrl);
  return out;
}

// ---------------------------------------------------------------------------
// Footnotes
// ---------------------------------------------------------------------------

/**
 * Convert GFM footnotes to email-safe HTML.
 *
 * Supports both numeric [^1] and named [^wettel2007] footnote identifiers,
 * which is what the blog uses for academic citations.
 *
 * Input (in markdown/HTML):  [^wettel2007]: Author — Title (Year).
 * Output: inline superscript + footnote list at bottom of email.
 */
function processFootnotes(html: string): string {
  const FOOTNOTE_ID = '[\\w-]+'; // matches numeric (1) and named (wettel2007)
  const definitions: Record<string, string> = {};

  // Collect and remove footnote definitions
  let out = html.replace(
    new RegExp(`(?:<p>)?\\[\\^(${FOOTNOTE_ID})\\]:\\s*(.*?)(?:</p>)?(?:\\n|$)`, 'g'),
    (_, id, text) => {
      definitions[id] = text.replace(/<\/?p>/g, '').trim();
      return '';
    }
  );

  // Replace inline references with superscript links
  out = out.replace(
    new RegExp(`\\[\\^(${FOOTNOTE_ID})\\]`, 'g'),
    (_, id) =>
      `<sup><a href="#fn-${id}" id="fnref-${id}" style="color:#4D80FF;text-decoration:none">[${id}]</a></sup>`
  );

  // Append footnote list if any were found
  const ids = Object.keys(definitions);
  if (ids.length > 0) {
    out += '<hr style="border-top:1px solid #e5e5e5;margin:24px 0">';
    out += '<div style="font-size:14px;color:#666;line-height:1.6">';
    for (const id of ids) {
      out += `<p id="fn-${id}" style="margin:4px 0">` +
             `<sup>[${id}]</sup> ${definitions[id]} ` +
             `<a href="#fnref-${id}" style="color:#4D80FF;text-decoration:none">&#8617;</a></p>`;
    }
    out += '</div>';
  }

  return out;
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export async function convertMdxToEmail(filePath: string): Promise<ConvertedContent> {
  const absolutePath = path.resolve(filePath);
  const raw = fs.readFileSync(absolutePath, 'utf-8');
  const { data, content } = matter(raw);

  const type = detectType(absolutePath);
  const slug = deriveSlug(absolutePath);
  const canonicalUrl = `${SITE_URL}/${type}/${slug}`;

  const cleanMarkdown = stripJsx(content);
  const rawHtml = await marked.parse(cleanMarkdown);
  const withFootnotes = processFootnotes(rawHtml);
  const html = processEmailHtml(withFootnotes, canonicalUrl);

  const meta: ContentMeta = {
    title: data.title || slug,
    description: data.description,
    excerpt: data.excerpt || data.description,
    date: data.date,
    type,
    slug,
    email_draft: data.email_draft,
  };

  return { meta, html, canonicalUrl, tags: mapTags(type) };
}

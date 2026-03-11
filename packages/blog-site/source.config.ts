import { defineDocs, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';
import remarkGlossary from './lib/remark-glossary.mjs';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import { z } from 'zod';

const contentSchema = frontmatterSchema.extend({
  date: z.string().optional(),
});

export const essays = defineDocs({
  dir: 'content/essays',
  docs: { schema: contentSchema },
});

export const posts = defineDocs({
  dir: 'content/posts',
  docs: { schema: contentSchema },
});

export const systems = defineDocs({
  dir: 'content/systems',
  docs: { schema: contentSchema },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkGlossary],
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'append',
        properties: {
          className: ['anchor-link'],
          ariaHidden: true,
          tabIndex: -1,
        },
        content: {
          type: 'element',
          tagName: 'span',
          properties: { className: ['anchor-icon'] },
          children: [{ type: 'text', value: '#' }],
        },
      }],
    ],
  },
});

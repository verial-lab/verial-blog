import { defineDocs, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';
import remarkGlossary from './lib/remark-glossary.mjs';
import { z } from 'zod';

const sharedSchema = frontmatterSchema.extend({
  date: z.string().date().optional(),
});

export const essays = defineDocs({
  dir: 'content/essays',
  schema: sharedSchema,
});

export const posts = defineDocs({
  dir: 'content/posts',
  schema: sharedSchema,
});

export const systems = defineDocs({
  dir: 'content/systems',
  schema: sharedSchema,
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkGlossary],
  },
});

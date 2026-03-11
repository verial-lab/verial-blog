import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import { pageSchema } from 'fumadocs-core/source/schema';
import remarkGlossary from './lib/remark-glossary.mjs';
import { z } from 'zod';

const docsSchema = pageSchema.extend({
  date: z.string().optional(),
});

export const essays = defineDocs({
  dir: 'content/essays',
  docs: { schema: docsSchema },
});

export const posts = defineDocs({
  dir: 'content/posts',
  docs: { schema: docsSchema },
});

export const systems = defineDocs({
  dir: 'content/systems',
  docs: { schema: docsSchema },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkGlossary],
  },
});

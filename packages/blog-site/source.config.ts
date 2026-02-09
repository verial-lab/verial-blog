import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

export const essays = defineDocs({
  dir: 'content/essays',
});

export const notes = defineDocs({
  dir: 'content/notes',
});

export const framework = defineDocs({
  dir: 'content/framework',
});

export default defineConfig();

import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

export const essays = defineDocs({
  dir: 'content/essays',
});

export const posts = defineDocs({
  dir: 'content/posts',
});

export const systems = defineDocs({
  dir: 'content/systems',
});

export default defineConfig();

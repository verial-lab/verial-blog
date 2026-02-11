import { essays, posts, systems } from '@/.source';
import { loader } from 'fumadocs-core/source';

export const essaySource = loader({
  baseUrl: '/essays',
  source: essays.toFumadocsSource(),
});

export const postSource = loader({
  baseUrl: '/posts',
  source: posts.toFumadocsSource(),
});

export const systemSource = loader({
  baseUrl: '/systems',
  source: systems.toFumadocsSource(),
});

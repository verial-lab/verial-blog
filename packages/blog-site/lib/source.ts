import { essays, notes, framework } from '@/.source';
import { loader } from 'fumadocs-core/source';

export const essaySource = loader({
  baseUrl: '/essays',
  source: essays.toFumadocsSource(),
});

export const noteSource = loader({
  baseUrl: '/notes',
  source: notes.toFumadocsSource(),
});

export const frameworkSource = loader({
  baseUrl: '/framework',
  source: framework.toFumadocsSource(),
});

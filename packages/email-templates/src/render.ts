import { render } from '@react-email/components';
import { createElement } from 'react';
import { Newsletter } from '../emails/newsletter';
import type { ConvertedContent } from './convert-mdx';

export async function renderEmail(content: ConvertedContent): Promise<string> {
  const element = createElement(Newsletter, {
    title: content.meta.title,
    bodyHtml: content.html,
    contentType: content.meta.type,
    excerpt: content.meta.excerpt || '',
    canonicalUrl: content.canonicalUrl,
    unsubscribeUrl: '{{ unsubscribe_url }}',
  });

  return await render(element);
}

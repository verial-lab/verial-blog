import { essaySource, postSource } from '@/lib/source';

export function GET() {
  const baseUrl = 'https://verial.xyz';
  const now = new Date().toUTCString();

  const essays = essaySource.getPages()
    .filter(p => p.slugs.length > 0)
    .map(p => ({
      title: p.data.title,
      description: p.data.description || '',
      url: `${baseUrl}${p.url}`,
      type: 'Essay',
    }));

  const posts = postSource.getPages()
    .filter(p => p.slugs.length > 0)
    .map(p => ({
      title: p.data.title,
      description: p.data.description || '',
      url: `${baseUrl}${p.url}`,
      type: 'Post',
    }));

  const items = [...essays, ...posts];

  const escapeXml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Verial</title>
    <link>${baseUrl}</link>
    <description>Truth-seeking. Applied. Essays on philosophy, systems thinking, and the exponential age.</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items.map(item => `<item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <description>${escapeXml(item.description)}</description>
      <category>${item.type}</category>
    </item>`).join('\n    ')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

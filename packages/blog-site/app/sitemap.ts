import type { MetadataRoute } from 'next';
import { essaySource, postSource, systemSource } from '@/lib/source';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://verial.xyz';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/essays`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/posts`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/systems`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/glossary`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const essayPages = essaySource.getPages()
    .filter(p => p.slugs.length > 0)
    .map(p => ({ url: `${baseUrl}${p.url}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 }));

  const postPages = postSource.getPages()
    .filter(p => p.slugs.length > 0)
    .map(p => ({ url: `${baseUrl}${p.url}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 }));

  const systemPages = systemSource.getPages()
    .filter(p => p.slugs.length > 0)
    .map(p => ({ url: `${baseUrl}${p.url}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 }));

  return [...staticPages, ...essayPages, ...postPages, ...systemPages];
}

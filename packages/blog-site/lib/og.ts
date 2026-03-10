import type { Metadata } from 'next';

/**
 * Generate OpenGraph + Twitter card metadata for a page.
 * Uses the /og endpoint for dynamic image generation.
 */
export function ogMeta(title: string, description: string): Pick<Metadata, 'openGraph' | 'twitter'> {
  const image = `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
  return {
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

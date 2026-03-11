import Link from 'next/link';
import { essaySource } from '@/lib/source';
import { postSource } from '@/lib/source';
import { systemSource } from '@/lib/source';

interface ContentItem {
  url: string;
  title: string;
  description?: string;
  date?: string;
  type: 'Essay' | 'Post' | 'System';
}

function getRecentContent(): ContentItem | null {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const allContent: ContentItem[] = [];

  essaySource.getPages().filter(p => p.slugs.length > 0).forEach(p => {
    const date = (p.data as any).date;
    if (date) allContent.push({ url: p.url, title: p.data.title, description: p.data.description, date, type: 'Essay' });
  });

  postSource.getPages().filter(p => p.slugs.length > 0).forEach(p => {
    const date = (p.data as any).date;
    if (date) allContent.push({ url: p.url, title: p.data.title, description: p.data.description, date, type: 'Post' });
  });

  systemSource.getPages().filter(p => p.slugs.length > 0).forEach(p => {
    const date = (p.data as any).date;
    if (date) allContent.push({ url: p.url, title: p.data.title, description: p.data.description, date, type: 'System' });
  });

  // Sort by date descending, pick most recent
  allContent.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const latest = allContent[0];

  if (!latest?.date) return null;

  // Check if within last 7 days
  const pubDate = new Date(latest.date + 'T00:00:00');
  if (pubDate < sevenDaysAgo) return null;

  return latest;
}

export function LatestContent() {
  const latest = getRecentContent();
  if (!latest) return null;

  const formattedDate = new Date(latest.date! + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mb-14">
      <Link
        href={latest.url}
        className="block group border border-primary/20 rounded-xl p-6 hover:border-primary/40 hover:bg-muted/10 transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            New {latest.type}
          </span>
          <span className="text-sm text-muted-foreground/60">{formattedDate}</span>
        </div>
        <h3 className="font-serif text-xl font-normal mb-2 group-hover:text-primary transition-colors">
          {latest.title}
        </h3>
        {latest.description && (
          <p className="text-base text-muted-foreground leading-relaxed">
            {latest.description}
          </p>
        )}
      </Link>
    </div>
  );
}

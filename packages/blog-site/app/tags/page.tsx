import { essaySource, postSource, systemSource } from '@/lib/source';
import Link from 'next/link';

function getAllTagsWithCount(): { tag: string; count: number }[] {
  const tagMap = new Map<string, number>();
  const sources = [essaySource, postSource, systemSource];
  for (const source of sources) {
    for (const page of source.getPages()) {
      const tags: string[] = (page.data as any).tags ?? [];
      tags.forEach((t) => tagMap.set(t, (tagMap.get(t) ?? 0) + 1));
    }
  }
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export default function TagsIndex() {
  const tags = getAllTagsWithCount();

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <header className="mb-12">
          <h1 className="font-serif text-4xl font-normal tracking-normal mb-4">Tags</h1>
          <p className="text-muted-foreground leading-relaxed">
            Browse content by topic.
          </p>
        </header>

        <div className="flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-muted/20 transition-all duration-200"
            >
              {tag}
              <span className="text-xs text-muted-foreground/50">{count}</span>
            </Link>
          ))}
          {tags.length === 0 && (
            <p className="text-muted-foreground/60 italic">No tags yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Tags | Verial',
  description: 'Browse all content tags.',
};

import Link from 'next/link';

export function TagChip({ tag }: { tag: string }) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className="inline-block text-xs font-medium px-2.5 py-1 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-muted/20 transition-all duration-200"
    >
      {tag}
    </Link>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <TagChip key={tag} tag={tag} />
      ))}
    </div>
  );
}

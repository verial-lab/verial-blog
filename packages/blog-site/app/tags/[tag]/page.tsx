import { essaySource, postSource, systemSource } from '@/lib/source';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TagList } from '@/components/TagChip';

type ContentItem = {
  url: string;
  title: string;
  description?: string;
  tags: string[];
  section: string;
};

function getAllContentByTag(tag: string): ContentItem[] {
  const items: ContentItem[] = [];

  for (const page of essaySource.getPages()) {
    if (page.slugs.length === 0) continue;
    const tags: string[] = (page.data as any).tags ?? [];
    if (tags.includes(tag)) {
      items.push({
        url: page.url,
        title: page.data.title,
        description: page.data.description,
        tags,
        section: 'Essays',
      });
    }
  }

  for (const page of postSource.getPages()) {
    if (page.slugs.length === 0) continue;
    const tags: string[] = (page.data as any).tags ?? [];
    if (tags.includes(tag)) {
      items.push({
        url: page.url,
        title: page.data.title,
        description: page.data.description,
        tags,
        section: 'Posts',
      });
    }
  }

  for (const page of systemSource.getPages()) {
    if (page.slugs.length === 0) continue;
    const tags: string[] = (page.data as any).tags ?? [];
    if (tags.includes(tag)) {
      items.push({
        url: page.url,
        title: page.data.title,
        description: page.data.description,
        tags,
        section: 'Systems',
      });
    }
  }

  return items;
}

function getAllTags(): string[] {
  const tagSet = new Set<string>();
  const sources = [essaySource, postSource, systemSource];
  for (const source of sources) {
    for (const page of source.getPages()) {
      const tags: string[] = (page.data as any).tags ?? [];
      tags.forEach((t) => tagSet.add(t));
    }
  }
  return Array.from(tagSet).sort();
}

export default async function TagPage(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const tag = decodeURIComponent(params.tag);
  const items = getAllContentByTag(tag);

  if (items.length === 0) notFound();

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <div className="mb-6">
          <Link
            href="/tags"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            ← All Tags
          </Link>
        </div>

        <header className="mb-12">
          <h1 className="font-serif text-4xl font-normal tracking-normal mb-2">
            Tagged: <span className="text-primary">{tag}</span>
          </h1>
          <p className="text-muted-foreground">
            {items.length} {items.length === 1 ? 'piece' : 'pieces'} tagged with "{tag}"
          </p>
        </header>

        <div className="space-y-4">
          {items.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className="block group border border-border/40 rounded-xl p-6 hover:border-primary/20 hover:bg-muted/10 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                  {item.section}
                </span>
              </div>
              <h2 className="font-serif text-xl font-normal mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h2>
              {item.description && (
                <p className="text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              )}
              {item.tags.length > 0 && (
                <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                  <TagList tags={item.tags} />
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const tag = decodeURIComponent(params.tag);
  return {
    title: `Tagged: ${tag} | Verial`,
    description: `Content tagged with "${tag}"`,
  };
}

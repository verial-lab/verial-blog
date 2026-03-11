import { postSource } from '@/lib/source';
import { ogMeta } from '@/lib/og';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SectionIcon } from '@/components/SectionIcon';
import { GlossaryTerm } from '@/components/GlossaryTerm';
import { TableOfContents } from '@/components/TableOfContents';

export default async function NotePage(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  // Index page — list all posts
  if (!slug || slug.length === 0) {
    const pages = postSource.getPages().filter(p => p.slugs.length > 0).sort((a, b) => (b.data.date || '').localeCompare(a.data.date || ''));
    return (
      <div className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
          <header className="mb-16 flex flex-col md:flex-row items-center md:items-center gap-6">
            <SectionIcon
              src="/icons/posts-atom.webm"
              fallbackSrc="/icons/posts-atom.mp4"
              size={180}
              className="shrink-0"
            />
            <div className="text-center md:text-left">
              <h1 className="font-serif text-4xl font-normal mb-4 tracking-normal">Posts</h1>
              <p className="text-muted-foreground leading-relaxed">
                Shorter reflections, book notes, and discoveries. Not everything needs to be a manifesto.
              </p>
            </div>
          </header>
          <div className="space-y-3">
            {pages.map((page) => (
              <Link
                key={page.url}
                href={page.url}
                className="block group border border-border/40 rounded-lg p-5 hover:border-primary/20 hover:bg-muted/10 transition-all duration-300"
              >
                <h2 className="font-serif text-lg font-normal group-hover:text-primary transition-colors">
                  {page.data.title}
                </h2>
                {page.data.description && (
                  <p className="text-base text-muted-foreground mt-1.5 leading-relaxed">
                    {page.data.description}
                  </p>
                )}
              </Link>
            ))}
            {pages.length === 0 && (
              <p className="text-muted-foreground/60 italic">No posts yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Individual post page
  const page = postSource.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <div className="min-h-screen">
      <article className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <div className="mb-10">

          <Link
            href="/posts"
            className="text-base text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 font-medium"
          >
            <SectionIcon
              src="/icons/posts-atom.webm"
              fallbackSrc="/icons/posts-atom.mp4"
              size={28}
              className="shrink-0"
            />
            ← Posts
          </Link>
        </div>

        <header className="mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-normal leading-snug tracking-normal mb-4">
            {page.data.title}
          </h1>
          {page.data.date && (
            <p className="text-sm text-muted-foreground/60 mb-4">{new Date(page.data.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          )}
          {page.data.description && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {page.data.description}
            </p>
          )}
        </header>

        <TableOfContents toc={page.data.toc as any} />

        <div className="prose">
          <MDX components={{ GlossaryTerm }} />
        </div>
      </article>

      <footer className="border-t border-border/30 px-6 py-8">
        <div className="max-w-3xl mx-auto text-center">

          <Link
            href="/posts"
            className="text-base text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 font-medium"
          >
            <SectionIcon
              src="/icons/posts-atom.webm"
              fallbackSrc="/icons/posts-atom.mp4"
              size={28}
              className="shrink-0"
            />
            ← Back to Posts
          </Link>
        </div>
      </footer>
    </div>
  );
}

export function generateStaticParams() {
  return postSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = postSource.getPage(params.slug);
  if (!page) {
    return { title: 'Posts | Verial', description: 'Build logs, technical discoveries, and engineering reflections.', ...ogMeta('Posts', 'Build logs, technical discoveries, and engineering reflections.') };
  }
  const title = page.data.title;
  const description = page.data.description || '';
  return { title, description, ...ogMeta(title, description) };
}

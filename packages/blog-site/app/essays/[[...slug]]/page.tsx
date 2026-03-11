import { essaySource } from '@/lib/source';
import { ogMeta } from '@/lib/og';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SectionIcon } from '@/components/SectionIcon';
import { GlossaryTerm } from '@/components/GlossaryTerm';
import { TableOfContents } from '@/components/TableOfContents';

export default async function EssayPage(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  // Index page — list all essays
  if (!slug || slug.length === 0) {
    const pages = essaySource.getPages().filter(p => p.slugs.length > 0).sort((a, b) => (b.data.date || '').localeCompare(a.data.date || ''));
    return (
      <div className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
          <header className="mb-16 flex flex-col md:flex-row items-center md:items-center gap-6">
            <SectionIcon
              src="/icons/essays-pyramid.webm"
              fallbackSrc="/icons/essays-pyramid.mp4"
              size={180}
              className="shrink-0"
            />
            <div className="text-center md:text-left">
              <h1 className="font-serif text-4xl font-normal mb-4 tracking-normal">Essays</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Polished, high-density writing on building, technology, and the principles that survive contact with reality. New essays are sent by email.
              </p>
            </div>
          </header>
          <div className="space-y-4">
            {pages.map((page) => (
              <Link
                key={page.url}
                href={page.url}
                className="block group border border-border/40 rounded-xl p-6 hover:border-primary/20 hover:bg-muted/10 transition-all duration-300"
              >
                <h2 className="font-serif text-xl font-normal mb-2 group-hover:text-primary transition-colors">
                  {page.data.title}
                </h2>
                {page.data.date && (
                  <p className="text-sm text-muted-foreground/60 mb-2">{new Date(page.data.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                )}
                {page.data.description && (
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {page.data.description}
                  </p>
                )}
              </Link>
            ))}
            {pages.length === 0 && (
              <p className="text-muted-foreground/60 italic">No essays yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Individual essay page
  const page = essaySource.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <div className="min-h-screen">
      <article className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <div className="mb-12">

          <Link
            href="/essays"
            className="text-base text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 font-medium"
          >
            <SectionIcon
              src="/icons/essays-pyramid.webm"
              fallbackSrc="/icons/essays-pyramid.mp4"
              size={28}
              className="shrink-0"
            />
            ← Essays
          </Link>
        </div>

        <header className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-normal leading-[1.25] tracking-normal mb-6">
            {page.data.title}
          </h1>
          {page.data.date && (
            <p className="text-sm text-muted-foreground/60 mb-4">{new Date(page.data.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          )}
          {page.data.description && (
            <p className="text-xl text-muted-foreground leading-relaxed">
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
            href="/essays"
            className="text-base text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 font-medium"
          >
            <SectionIcon
              src="/icons/essays-pyramid.webm"
              fallbackSrc="/icons/essays-pyramid.mp4"
              size={28}
              className="shrink-0"
            />
            ← Back to Essays
          </Link>
        </div>
      </footer>
    </div>
  );
}

export function generateStaticParams() {
  return essaySource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug;
  if (!slug || slug.length === 0) {
    return { title: 'Essays | Verial', description: 'Deep explorations of engineering philosophy, building lessons, and the ideas shaping the exponential age.', ...ogMeta('Essays', 'Deep explorations of engineering philosophy, building lessons, and the ideas shaping the exponential age.') };
  }
  const page = essaySource.getPage(slug);
  if (!page) notFound();
  const title = page.data.title;
  const description = page.data.description || '';
  return { title, description, ...ogMeta(title, description) };
}

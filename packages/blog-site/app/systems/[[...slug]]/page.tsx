import { systemSource } from '@/lib/source';
import { ogMeta } from '@/lib/og';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SectionIcon } from '@/components/SectionIcon';
import { GlossaryTerm } from '@/components/GlossaryTerm';

export default async function SystemsPage(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  // Index page — list all systems pages
  if (!slug || slug.length === 0) {
    const pages = systemSource.getPages().filter(p => p.slugs.length > 0);
    return (
      <div className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
          <header className="mb-12 flex flex-col md:flex-row items-center md:items-center gap-6">
            <SectionIcon
              src="/icons/dna-molecular.webm"
              fallbackSrc="/icons/dna-molecular.mp4"
              size={180}
              className="shrink-0"
            />
            <div className="text-center md:text-left">
              <h1 className="font-serif text-3xl font-normal mb-3 tracking-normal">Systems</h1>
              <p className="text-muted-foreground leading-relaxed">
                Frameworks worth living by. Mental models, methodologies, and practical wisdom — tested, not theoretical.
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
                <h2 className="font-serif text-lg font-normal mb-2 group-hover:text-primary transition-colors">
                  {page.data.title}
                </h2>
                {page.data.description && (
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {page.data.description}
                  </p>
                )}
              </Link>
            ))}
            {pages.length === 0 && (
              <p className="text-muted-foreground/60 italic">No systems pages yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Individual systems page
  const page = systemSource.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <div className="min-h-screen">
      <article className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <div className="mb-12">
          <Link
            href="/systems"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            ← Systems
          </Link>
        </div>

        <header className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-normal leading-[1.25] tracking-normal mb-6">
            {page.data.title}
          </h1>
          {page.data.description && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {page.data.description}
            </p>
          )}
        </header>

        <div className="prose">
          <MDX components={{ GlossaryTerm }} />
        </div>
      </article>

      <footer className="border-t border-border/30 px-6 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/systems"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Systems
          </Link>
        </div>
      </footer>
    </div>
  );
}

export function generateStaticParams() {
  return systemSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug;
  if (!slug || slug.length === 0) {
    return { title: 'Systems | Verial', description: 'Frameworks worth living by. Mental models, methodologies, and practical wisdom — tested, not theoretical.', ...ogMeta('Systems', 'Frameworks worth living by. Mental models, methodologies, and practical wisdom — tested, not theoretical.') };
  }
  const page = systemSource.getPage(slug);
  if (!page) notFound();
  const title = page.data.title;
  const description = page.data.description || '';
  return { title, description, ...ogMeta(title, description) };
}

import { essaySource } from '@/lib/source';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function EssayPage(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  // Index page — list all essays
  if (!slug || slug.length === 0) {
    const pages = essaySource.getPages().filter(p => p.slugs.length > 0);
    return (
      <div className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
          <header className="mb-16">
            <h1 className="font-serif text-4xl font-normal mb-4 tracking-normal">Essays</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Polished, high-density writing on building, technology, and the principles that survive contact with reality. New essays are sent by email.
            </p>
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
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <Link
            href="/essays"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            ← Essays
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
          <MDX />
        </div>
      </article>

      <footer className="border-t border-border/30 px-6 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/essays"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
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
    return { title: 'Essays | Verial', description: 'Essays on systems design, architecture, and engineering philosophy.' };
  }
  const page = essaySource.getPage(slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}

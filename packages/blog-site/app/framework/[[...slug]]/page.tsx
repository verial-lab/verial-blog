import { frameworkSource } from '@/lib/source';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function FrameworkPage(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  // Index page — list all framework pages
  if (!slug || slug.length === 0) {
    const pages = frameworkSource.getPages().filter(p => p.slugs.length > 0);
    return (
      <div className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <header className="mb-12">
            <h1 className="font-serif text-3xl font-normal mb-3 tracking-normal">Framework</h1>
            <p className="text-muted-foreground leading-relaxed">
              Living documentation — evolving models, principles, and design patterns.
            </p>
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
                  <p className="text-[15px] text-muted-foreground leading-relaxed">
                    {page.data.description}
                  </p>
                )}
              </Link>
            ))}
            {pages.length === 0 && (
              <p className="text-muted-foreground/60 italic">No framework pages yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Individual framework page
  const page = frameworkSource.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <div className="min-h-screen">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <Link
            href="/framework"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            ← Framework
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
            href="/framework"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Framework
          </Link>
        </div>
      </footer>
    </div>
  );
}

export function generateStaticParams() {
  return frameworkSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug;
  if (!slug || slug.length === 0) {
    return { title: 'Framework | Verial', description: 'Living documentation — evolving models, principles, and design patterns.' };
  }
  const page = frameworkSource.getPage(slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}

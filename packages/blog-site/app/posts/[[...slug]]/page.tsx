import { postSource } from '@/lib/source';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function NotePage(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  // Index page — list all posts
  if (!slug || slug.length === 0) {
    const pages = postSource.getPages().filter(p => p.slugs.length > 0);
    return (
      <div className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
          <header className="mb-16">
            <h1 className="font-serif text-4xl font-normal mb-4 tracking-normal">Posts</h1>
            <p className="text-muted-foreground leading-relaxed">
              Shorter reflections, book notes, and discoveries. Not everything needs to be a manifesto.
            </p>
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
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10">
          <Link
            href="/posts"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            ← Posts
          </Link>
        </div>

        <header className="mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-normal leading-snug tracking-normal mb-4">
            {page.data.title}
          </h1>
          {page.data.description && (
            <p className="text-lg text-muted-foreground leading-relaxed">
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
            href="/posts"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
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
  if (!page) return { title: 'Posts | Verial' };
  return { title: page.data.title, description: page.data.description };
}

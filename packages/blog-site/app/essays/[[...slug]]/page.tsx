import { essaySource } from '@/lib/source';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function EssayPage(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = essaySource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <div className="min-h-screen">
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Back link */}
        <div className="mb-12">
          <Link 
            href="/essays" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            ← Essays
          </Link>
        </div>

        {/* Header */}
        <header className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight mb-6">
            {page.data.title}
          </h1>
          {page.data.description && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {page.data.description}
            </p>
          )}
        </header>

        {/* Body */}
        <div className="prose">
          <MDX />
        </div>
      </article>

      {/* Footer */}
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
  const page = essaySource.getPage(params.slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}

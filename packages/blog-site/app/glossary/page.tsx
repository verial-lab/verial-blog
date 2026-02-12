import { loadGlossary, buildBacklinks } from '@/lib/glossary';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glossary',
  description: 'Definitions and terminology used across Verial.',
};

export default function GlossaryPage() {
  const entries = loadGlossary();
  const backlinks = buildBacklinks(entries);

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <header className="mb-16">
          <h1 className="font-serif text-4xl font-normal mb-4 tracking-normal">Glossary</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Key terms and definitions used across essays, posts, and systems.
            Terms are automatically linked throughout the site.
          </p>
        </header>

        <div className="space-y-8">
          {entries.map((entry) => {
            const links = backlinks.get(entry.term.toLowerCase()) || [];
            return (
              <div
                key={entry.term}
                id={entry.term.toLowerCase().replace(/\s+/g, '-')}
                className="border-b border-border/20 pb-6"
              >
                <h2 className="font-serif text-xl font-normal mb-2 text-foreground">
                  {entry.term}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-3">
                  {entry.definition}
                </p>
                {links.length > 0 && (
                  <div className="text-sm text-foreground/50">
                    <span className="mr-2">Referenced in:</span>
                    {links.map((link, i) => (
                      <span key={link.url}>
                        {i > 0 && <span className="mx-1">·</span>}
                        <Link
                          href={link.url}
                          className="text-primary/70 hover:text-primary transition-colors"
                        >
                          {link.title}
                        </Link>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {entries.length === 0 && (
            <p className="text-muted-foreground/60 italic">No glossary terms yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

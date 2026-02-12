import { loadGlossary } from '@/lib/glossary';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glossary',
  description: 'Definitions and terminology used across Verial.',
};

export default function GlossaryPage() {
  const entries = loadGlossary();

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
          {entries.map((entry) => (
            <div
              key={entry.term}
              id={entry.term.toLowerCase().replace(/\s+/g, '-')}
              className="border-b border-border/20 pb-6"
            >
              <h2 className="font-serif text-xl font-normal mb-2 text-foreground">
                {entry.term}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {entry.definition}
              </p>
            </div>
          ))}

          {entries.length === 0 && (
            <p className="text-muted-foreground/60 italic">No glossary terms yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

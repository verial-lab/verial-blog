import { Navigation } from '@/components/Navigation';
import { EmailSignup } from '@/components/EmailSignup';
import { ContentPreview } from '@/components/ContentPreview';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
            Systems. <span className="text-primary">Architecture.</span> Clarity.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Low frequency, high density essays on the principles that govern
            complex systems—from software to governance to personal discipline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a href="/essays" className="button-primary inline-flex items-center gap-2 text-lg">
              Read Essays →
            </a>
            <a href="#subscribe" className="button-secondary inline-flex items-center gap-2 text-lg">
              Get Updates
            </a>
          </div>
        </div>
      </section>

      {/* Content Overview */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-6">
              A controlled knowledge surface
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Low frequency, high density writing on systems design, architecture,
              and engineering philosophy. Essays that compound clarity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <ContentPreview
              title="Essays"
              description="Polished, timeless, high-density explorations of systems thinking and architecture principles."
              href="/essays"
              badge="Email alerts"
            />
            <ContentPreview
              title="Notes"
              description="Build logs, technical discoveries, and engineering reflections. Raw and unfiltered."
              href="/notes"
            />
            <ContentPreview
              title="Framework"
              description="Living documentation for the Agent Evaluation Framework and related methodologies."
              href="/framework"
            />
          </div>

          <EmailSignup />
        </div>
      </section>
    </main>
  );
}

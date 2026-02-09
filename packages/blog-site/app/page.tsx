import { HeroSection } from '@/components/HeroSection';
import { EmailSignup } from '@/components/EmailSignup';
import { ContentPreview } from '@/components/ContentPreview';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* Content Overview */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">
              A controlled knowledge surface
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Writing on systems design, architecture, and engineering philosophy. 
              Essays that compound clarity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
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

          {/* Latest Essays */}
          <div className="mt-24">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-serif font-semibold">Latest Essays</h3>
              <Link 
                href="/essays" 
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="space-y-4">
              <article className="group border border-border/50 rounded-xl p-6 hover:border-primary/20 hover:bg-muted/10 transition-all duration-300">
                <Link href="/essays/containment-systems-design">
                  <h4 className="text-lg font-serif font-semibold mb-2 group-hover:text-primary transition-colors">
                    Containment as a Systems Design Principle
                  </h4>
                  <p className="text-muted-foreground text-[15px] mb-3 leading-relaxed">
                    Why containment is the hidden constraint behind scalable agent systems—from physics to software to governance.
                  </p>
                  <time className="text-xs text-muted-foreground/60">February 4, 2026</time>
                </Link>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

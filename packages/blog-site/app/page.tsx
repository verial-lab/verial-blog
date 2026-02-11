import { HeroSection } from '@/components/HeroSection';
import { EmailSignup } from '@/components/EmailSignup';
import { ContentPreview } from '@/components/ContentPreview';
import { Triangle, Atom, Dna } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* Content Overview */}
      <section className="py-14 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Verial Philosophy */}
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground/60 mb-4 font-medium">
              The Verial Philosophy
            </p>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              <em>Verial</em> — from <em>veritas</em> (truth) and <em>aerial</em> (limitless sky). 
              The belief that when we seek truth and build with intention, 
              the cosmic microwave background is the limit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-14">
            <ContentPreview
              title="Essays"
              description="Deep, polished explorations of engineering philosophy, building lessons, and the ideas shaping the exponential age."
              href="/essays"
              badge="Email alerts"
              icon={Triangle}
            />
            <ContentPreview
              title="Posts"
              description="Shorter reflections, book notes, and discoveries. Not everything needs to be a manifesto."
              href="/posts"
              icon={Atom}
            />
            <ContentPreview
              title="Systems"
              description="Frameworks worth living by. Mental models, methodologies, and practical wisdom — tested, not theoretical."
              href="/systems"
              icon={Dna}
            />
          </div>

          <EmailSignup />

          {/* Latest Essays */}
          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-serif font-normal tracking-normal text-foreground/80">Latest Essays</h3>
              <Link 
                href="/essays" 
                className="text-sm text-muted-foreground/60 hover:text-primary font-medium transition-colors uppercase tracking-wider"
              >
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              <article className="group border border-border/30 rounded-xl p-6 hover:border-border/50 hover:bg-muted/[0.04] transition-all duration-300">
                <Link href="/essays/containment-systems-design">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-serif font-normal mb-2 group-hover:text-primary transition-colors">
                        Containment as a Systems Design Principle
                      </h4>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        Why containment is the hidden constraint behind scalable agent systems—from physics to software to governance.
                      </p>
                    </div>
                    <time className="text-xs text-muted-foreground/50 whitespace-nowrap mt-1 font-mono">Feb 2026</time>
                  </div>
                </Link>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

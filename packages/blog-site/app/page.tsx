import { HeroSection } from '@/components/HeroSection';
import { EmailSignup } from '@/components/EmailSignup';
import { ContentPreview } from '@/components/ContentPreview';
import { brand } from '@/lib/brand';

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
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
               dangerouslySetInnerHTML={{ __html: brand.philosophy.html }} />
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-14">
            <ContentPreview
              title="Essays"
              description="Deep, polished explorations of engineering philosophy, building lessons, and the ideas shaping the exponential age."
              href="/essays"
              badge="Email alerts"
              iconName="triangle"
            />
            <ContentPreview
              title="Posts"
              description="Shorter reflections, book notes, and discoveries. Not everything needs to be a manifesto."
              href="/posts"
              iconName="atom"
            />
            <ContentPreview
              title="Systems"
              description="Frameworks worth living by. Mental models, methodologies, and practical wisdom — tested, not theoretical."
              href="/systems"
              iconName="dna"
            />
          </div>

          <EmailSignup />
        </div>
      </section>
    </main>
  );
}

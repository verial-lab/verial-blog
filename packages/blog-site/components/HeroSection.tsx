export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden pt-16 pb-8">
      {/* 3D Hero Video — standalone, prominent */}
      <div
        style={{ animation: 'fadeInScale 1.2s ease-out both' }}
        className="relative w-full max-w-[720px] aspect-video mb-10"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-3d-poster.jpg"
          preload="metadata"
          width={1280}
          height={720}
          className="w-full h-full object-contain"
          src="/hero-3d.mp4"
        />
        {/* Edge vignette — blends into black bg */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_40%,black_85%)]" />
      </div>

      {/* Content below the video */}
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div
          style={{ animation: 'fadeInUp 0.8s ease-out 0.4s both' }}
          className="space-y-8"
        >
          {/* Eyebrow */}
          <div
            style={{ animation: 'fadeInUp 0.6s ease-out 0.5s both' }}
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-muted-foreground/70 font-medium"
          >
            <span className="w-8 h-px bg-muted-foreground/20" />
            Inquiry &middot; Engineering &middot; Transformation
            <span className="w-8 h-px bg-muted-foreground/20" />
          </div>

          <h1 
            className="text-5xl md:text-7xl font-serif font-normal leading-[1.15]"
            style={{ animation: 'fadeInUp 0.8s ease-out 0.6s both' }}
          >
            Truth-seeking.{' '}
            <span className="text-foreground/70">
              Applied.
            </span>
          </h1>
          
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            style={{ animation: 'fadeInUp 0.8s ease-out 0.8s both' }}
          >
            High-density writing on building, technology, and the systems behind 
            a life well-engineered. For those paying attention to what comes next.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
            style={{ animation: 'fadeInUp 0.8s ease-out 1.0s both' }}
          >
            <a
              href="/essays"
              className="group relative inline-flex items-center gap-2 text-base font-display font-semibold bg-foreground text-background px-7 py-3.5 rounded-lg overflow-hidden transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">Read Essays</span>
              <svg className="relative z-10 w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            
            <a
              href="/#subscribe"
              className="inline-flex items-center gap-2 text-base font-display font-semibold text-muted-foreground hover:text-foreground px-7 py-3.5 rounded-lg border border-border/50 hover:border-border transition-all hover:bg-muted/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Updates
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

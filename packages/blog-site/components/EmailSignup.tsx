'use client';

import { useState } from 'react';

export function EmailSignup() {
  const [email, setEmail] = useState('');
  const [includeNotes, setIncludeNotes] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'already' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, includeNotes }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(data.alreadySubscribed ? 'already' : 'success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="subscribe"
      className="border border-border/40 rounded-2xl p-8 md:p-12 scroll-mt-24"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-serif font-normal mb-4 tracking-normal">
          Get new essays by email
        </h3>
        
        <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
          No weekly obligation. No algorithm chasing. Just high-density essays 
          on systems thinking when they&apos;re ready.
        </p>

        {status === 'success' ? (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <div className="flex items-center justify-center gap-2 text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Thanks! Check your email to confirm.</span>
            </div>
          </div>
        ) : status === 'already' ? (
          <div className="bg-muted/30 border border-border/50 rounded-lg p-6">
            <span className="text-muted-foreground font-medium">You&apos;re already subscribed! 🎉</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all text-base"
              />
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="button-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Joining...
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
            )}
            
            <label className="flex items-center gap-2 justify-center text-base cursor-pointer">
              <input
                type="checkbox"
                checked={includeNotes}
                onChange={(e) => setIncludeNotes(e.target.checked)}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-muted-foreground">
                Also get engineering notes &amp; framework updates
              </span>
            </label>
            
            <p className="text-sm text-muted-foreground/60">
              Powered by Buttondown. No spam, unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

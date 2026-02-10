'use client';

import { useState } from 'react';

export function EmailSignup() {
  const [email, setEmail] = useState('');
  const [includeNotes, setIncludeNotes] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section
      id="subscribe"
      className="border border-border/40 rounded-2xl p-8 md:p-12"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-serif font-normal mb-4 tracking-normal">
          Get new essays by email
        </h3>
        
        <p className="text-muted-foreground mb-8 leading-relaxed text-[15px]">
          No weekly obligation. No algorithm chasing. Just high-density essays 
          on systems thinking when they&apos;re ready.
        </p>

        {isSubmitted ? (
          <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-6">
            <div className="flex items-center justify-center gap-2 text-foreground">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Thanks! Check your email to confirm.</span>
            </div>
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
                className="flex-1 px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:border-foreground/30 focus:outline-none focus:ring-1 focus:ring-foreground/10 transition-all text-[15px]"
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
            
            <label className="flex items-center gap-2 justify-center text-sm cursor-pointer">
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
            
            <p className="text-xs text-muted-foreground/60">
              Powered by Buttondown. No spam, unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

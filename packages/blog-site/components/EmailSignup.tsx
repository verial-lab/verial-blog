'use client';

import { useState } from 'react';

export function EmailSignup() {
  const [email, setEmail] = useState('');
  const [includeNotes, setIncludeNotes] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire to Buttondown API
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="subscribe" className="bg-muted/20 border border-border rounded-xl p-8 md:p-12">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-serif font-bold mb-4">
          Get new essays by email
        </h3>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          No weekly obligation. No algorithm chasing. Just high-density essays
          on systems thinking when they&apos;re ready. Notes and build logs stay on-site.
        </p>

        {isSubmitted ? (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <span className="text-primary font-medium">Thanks! Check your email to confirm.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!email}
                className="button-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
              >
                Subscribe
              </button>
            </div>
            <label className="flex items-center gap-2 justify-center text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={includeNotes}
                onChange={(e) => setIncludeNotes(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-muted-foreground">
                Also get engineering notes &amp; framework updates
              </span>
            </label>
            <p className="text-xs text-muted-foreground">
              Powered by Buttondown. No spam, unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

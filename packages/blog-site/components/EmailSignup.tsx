'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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
    <motion.section
      id="subscribe"
      className="bg-muted/10 border border-border/50 rounded-2xl p-8 md:p-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-serif font-bold mb-4">
          Get new essays by email
        </h3>
        
        <p className="text-muted-foreground mb-8 leading-relaxed text-[15px]">
          No weekly obligation. No algorithm chasing. Just high-density essays 
          on systems thinking when they&apos;re ready.
        </p>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/10 border border-primary/20 rounded-lg p-6"
          >
            <div className="flex items-center justify-center gap-2 text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Thanks! Check your email to confirm.</span>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all text-[15px]"
              />
              <motion.button
                type="submit"
                disabled={isSubmitting || !email}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="button-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Joining...
                  </span>
                ) : (
                  'Subscribe'
                )}
              </motion.button>
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
    </motion.section>
  );
}

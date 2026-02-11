'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const pathname = usePathname();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, email: email || undefined, page: pathname }),
      });

      if (res.ok) {
        setStatus('success');
        setMessage('');
        setEmail('');
        setTimeout(() => {
          setOpen(false);
          setStatus('idle');
        }, 2500);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* Floating pill */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 1 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-border/40 bg-background/90 backdrop-blur-md px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-border/60 transition-colors shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Feedback
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setOpen(false); setStatus('idle'); }}
            />
            <motion.div
              className="fixed bottom-6 right-6 z-[51] w-[360px] max-w-[calc(100vw-3rem)]"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <div className="rounded-xl border border-border/50 bg-background shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
                  <h3 className="text-base font-display font-semibold">Send Feedback</h3>
                  <button
                    onClick={() => { setOpen(false); setStatus('idle'); }}
                    className="text-muted-foreground/50 hover:text-foreground transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {status === 'success' ? (
                  <div className="p-6 text-center">
                    <div className="text-2xl mb-2">✨</div>
                    <p className="text-foreground font-medium">Thanks for your feedback!</p>
                    <p className="text-sm text-muted-foreground/60 mt-1">We&apos;ll take a look.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-4 space-y-3">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What's on your mind? Bug reports, suggestions, ideas..."
                      required
                      minLength={5}
                      rows={4}
                      className="w-full px-3 py-2 bg-muted/20 border border-border/40 rounded-lg text-base text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/50 resize-none"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email (optional — for follow-ups)"
                      className="w-full px-3 py-2 bg-muted/20 border border-border/40 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/50"
                    />
                    {status === 'error' && (
                      <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                    )}
                    <button
                      type="submit"
                      disabled={status === 'sending' || message.trim().length < 5}
                      className="w-full button-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? (
                        <span className="flex items-center gap-2 justify-center">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        'Submit Feedback'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

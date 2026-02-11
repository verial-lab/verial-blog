'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: string;
  url: string;
  type: 'page' | 'heading' | 'text';
  content: string;
}

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // ⌘K / Ctrl+K to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
      setSelected(0);
    }
  }, [open]);

  // Search with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          setSelected(0);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [query]);

  const navigate = useCallback(
    (url: string) => {
      setOpen(false);
      router.push(url);
    },
    [router]
  );

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selected]) {
      navigate(results[selected].url);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Dialog */}
          <motion.div
            className="fixed inset-x-0 top-[15vh] z-[101] mx-auto w-full max-w-xl px-4"
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <div className="overflow-hidden rounded-xl border border-border/50 bg-background shadow-2xl">
              {/* Input */}
              <div className="flex items-center gap-3 border-b border-border/30 px-4 py-3">
                <svg
                  className="w-5 h-5 text-muted-foreground/50 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search essays, notes, framework..."
                  className="flex-1 bg-transparent text-lg text-foreground placeholder:text-muted-foreground/40 outline-none"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border/40 px-1.5 py-0.5 text-xs text-muted-foreground/40">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[50vh] overflow-y-auto p-2">
                {loading && (
                  <div className="flex items-center justify-center py-8">
                    <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                {!loading && query && results.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground/60">
                    No results found for &ldquo;{query}&rdquo;
                  </div>
                )}

                {!loading && results.length > 0 && (
                  <ul>
                    {results.map((result, i) => (
                      <li key={result.id + i}>
                        <button
                          className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors ${
                            i === selected
                              ? 'bg-muted/40 text-foreground'
                              : 'text-muted-foreground hover:bg-muted/20'
                          }`}
                          onClick={() => navigate(result.url)}
                          onMouseEnter={() => setSelected(i)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground/40 uppercase tracking-wider">
                              {result.type === 'page' ? '📄' : result.type === 'heading' ? '#' : '¶'}
                            </span>
                            <span className="text-base font-medium truncate">
                              {result.content}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground/50 ml-6 truncate block">
                            {result.url}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {!loading && !query && (
                  <div className="py-8 text-center text-muted-foreground/40 text-sm">
                    Start typing to search...
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

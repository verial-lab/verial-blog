'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/essays', label: 'Essays' },
  { href: '/notes', label: 'Notes' },
  { href: '/framework', label: 'Framework' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border/50' : 'bg-background/70 backdrop-blur-sm border-b border-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-display font-semibold tracking-wide hover:text-primary transition-colors">
            Verial
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-display text-muted-foreground hover:text-foreground transition-colors font-semibold"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                // Trigger FumaDocs search dialog via keyboard shortcut
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
              }}
              className="flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors border border-border/40 rounded-lg px-3 py-1.5"
              aria-label="Search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs text-muted-foreground/40">⌘K</span>
            </button>
          </div>

          <button
            className="md:hidden relative w-6 h-5 flex flex-col justify-between"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-full h-px bg-foreground origin-center"
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-full h-px bg-foreground"
              animate={{ opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-full h-px bg-foreground origin-center"
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="pt-4 pb-2 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block font-display text-muted-foreground hover:text-foreground transition-colors font-semibold py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

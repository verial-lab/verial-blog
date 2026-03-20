'use client';
import React, { useState, useEffect, useRef } from 'react';
import { List, X } from 'lucide-react';

interface TocItem {
  title: React.ReactNode;
  url: string;
  depth: number;
}

function getTextContent(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join('');
  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<{ className?: string; children?: React.ReactNode }>;
    if (el.props.className?.includes('anchor-link')) return '';
    return getTextContent(el.props.children);
  }
  return '';
}

interface TableOfContentsProps {
  toc: TocItem[];
  title?: string;
}

export function TableOfContents({ toc, title }: TableOfContentsProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeId, setActiveId] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const showPanel = isPinned || (!isMobile && isHovered);

  // Detect mobile (no hover capability)
  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);


  // Track active section
  useEffect(() => {
    if (!toc || toc.length === 0) return;
    const observers: IntersectionObserver[] = [];
    toc.forEach(item => {
      const id = item.url.replace('#', '');
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: '-20% 0% -70% 0%', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(obs => obs.disconnect());
  }, [toc]);

  // Close pin on outside click/touch
  useEffect(() => {
    if (!isPinned) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsPinned(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchend', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchend', handler);
    };
  }, [isPinned]);

  if (!toc || toc.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed right-4 sm:right-6 bottom-6 z-40 flex flex-col items-end transition-all duration-300 ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Panel */}
      <div
        className={`mb-2 transition-all duration-200 origin-bottom-right ${
          showPanel
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-1 pointer-events-none'
        }`}
      >
        <nav aria-label="Table of contents" className="w-56 sm:w-60 bg-background/95 backdrop-blur-md border border-border/40 rounded-xl shadow-lg p-4 max-h-[60vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-medium text-muted-foreground/40 uppercase tracking-widest">Contents</p>
            {isMobile && (
              <button
                onClick={() => setIsPinned(false)}
                aria-label="Close table of contents"
                className="text-muted-foreground/40 hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <ul className="space-y-0.5">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsPinned(false);
                }}
                className="block text-[13px] leading-relaxed py-0.5 pl-2 border-l-2 border-l-transparent text-muted-foreground/50 hover:text-foreground transition-all duration-150"
              >
                {title || 'Top'}
              </a>
            </li>
            {toc.map((item, i) => {
              const id = item.url.replace('#', '');
              const isActive = activeId === id;
              return (
                <li key={i} style={{ paddingLeft: `${(item.depth - 2) * 12}px` }}>
                  <a
                    href={item.url}
                    onClick={() => setIsPinned(false)}
                    className={`block text-[13px] leading-relaxed py-0.5 pl-2 border-l-2 transition-all duration-150 ${
                      isActive
                        ? 'text-foreground font-semibold border-l-foreground'
                        : 'text-muted-foreground/50 hover:text-foreground border-l-transparent'
                    }`}
                  >
                    {getTextContent(item.title)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Trigger button */}
      <button
        onClick={() => setIsPinned(prev => !prev)}
        aria-label="Toggle table of contents"
        className={`flex items-center gap-2 pl-3 pr-3.5 py-2 rounded-xl border text-sm font-medium shadow-sm transition-all duration-200 ${
          isPinned
            ? 'bg-background border-border/50 text-foreground shadow-md'
            : 'bg-background/80 backdrop-blur-sm border-border/30 text-muted-foreground hover:text-foreground hover:border-border/50 hover:bg-background/95'
        }`}
      >
        <List className="w-4 h-4 shrink-0" strokeWidth={1.5} />
        <span className="hidden sm:inline">Contents</span>
      </button>
    </div>
  );
}

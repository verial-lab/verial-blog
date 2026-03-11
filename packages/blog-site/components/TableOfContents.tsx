'use client';
import type React from 'react';

import { useState } from 'react';

interface TocItem {
  title: React.ReactNode;
  url: string;
  depth: number;
}

interface TableOfContentsProps {
  toc: TocItem[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!toc || toc.length === 0) return null;

  return (
    <div className="mb-10 border border-border/40 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-base text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="font-serif font-normal">Table of Contents</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <nav className="px-5 pb-4 border-t border-border/30">
          <ul className="space-y-1.5 pt-3">
            {toc.map((item, i) => (
              <li key={i} style={{ paddingLeft: `${(item.depth - 2) * 16}px` }}>
                <a
                  href={item.url}
                  className="text-[15px] text-muted-foreground/70 hover:text-foreground transition-colors leading-relaxed"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

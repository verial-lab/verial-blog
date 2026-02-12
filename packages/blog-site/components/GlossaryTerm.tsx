'use client';

/**
 * Inline glossary term with pure CSS popover.
 * Click/tap to show definition, click outside or press Escape to dismiss.
 */
import { useState, useRef, useEffect } from 'react';

export function GlossaryTerm({
  term,
  definition,
  children,
}: {
  term: string;
  definition: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <span ref={ref} className="glossary-term-wrapper">
      <button
        type="button"
        className="glossary-term-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={`Definition: ${term}`}
      >
        {children}
      </button>
      {open && (
        <span className="glossary-popover" role="tooltip">
          <span className="glossary-popover-title">{term}</span>
          <span className="glossary-popover-def">{definition}</span>
        </span>
      )}
    </span>
  );
}

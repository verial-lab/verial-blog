'use client';

/**
 * Inline glossary term with pure CSS popover.
 * Uses fixed positioning to avoid mobile overflow.
 */
import { useState, useRef, useEffect, useCallback } from 'react';

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
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const position = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const pop = popoverRef.current;
    const popRect = pop.getBoundingClientRect();

    // Position above the trigger, centered
    let left = rect.left + rect.width / 2 - popRect.width / 2;
    let top = rect.top - popRect.height - 8;

    // Clamp horizontally
    const pad = 16;
    if (left < pad) left = pad;
    if (left + popRect.width > window.innerWidth - pad) {
      left = window.innerWidth - pad - popRect.width;
    }

    // If no room above, show below
    if (top < pad) {
      top = rect.bottom + 8;
    }

    pop.style.left = `${left}px`;
    pop.style.top = `${top}px`;
  }, []);

  useEffect(() => {
    if (!open) return;
    // Position after render
    requestAnimationFrame(position);

    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node) &&
          popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const handleScroll = () => position();

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [open, position]);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <span
      ref={wrapperRef}
      className="glossary-term-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={triggerRef}
        type="button"
        className="glossary-term-trigger"
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        aria-label={`Definition: ${term}`}
      >
        {children}
      </button>
      {open && (
        <span ref={popoverRef} className="glossary-popover" role="tooltip">
          <a
            href={`/glossary#${term.toLowerCase().replace(/\s+/g, '-')}`}
            className="glossary-popover-title"
            onClick={(e) => e.stopPropagation()}
          >
            {term}
          </a>
          <span className="glossary-popover-def">{definition}</span>
        </span>
      )}
    </span>
  );
}

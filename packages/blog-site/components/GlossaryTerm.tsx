'use client';

/**
 * Inline glossary term with pure CSS popover.
 * Uses fixed positioning to avoid mobile overflow.
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';

export function GlossaryTerm({
  term,
  definition,
  id,
  children,
}: {
  term: string;
  definition: string;
  id?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const glossaryHref = `/glossary#${term.toLowerCase().replace(/\s+/g, '-')}`;
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
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

  const popoverId = `glossary-popover-${term.toLowerCase().replace(/\s+/g, '-')}`;

  const openPopover = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const closePopover = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <span
      ref={wrapperRef}
      id={id}
      className="glossary-term-wrapper"
      onMouseEnter={openPopover}
      onMouseLeave={closePopover}
    >
      <Link
        ref={triggerRef}
        href={glossaryHref}
        className="glossary-term-trigger"
        aria-label={`Definition: ${term}`}
        aria-describedby={open ? popoverId : undefined}
        onFocus={openPopover}
        onBlur={closePopover}
      >
        {children}
      </Link>
      {open && (
        <span ref={popoverRef} id={popoverId} className="glossary-popover" role="tooltip">
          <span className="glossary-popover-title">{term}</span>
          <span className="glossary-popover-def">{definition}</span>
        </span>
      )}
    </span>
  );
}

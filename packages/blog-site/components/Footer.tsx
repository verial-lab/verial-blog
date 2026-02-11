'use client';

import Link from 'next/link';

const navSections = [
  {
    title: 'Content',
    links: [
      { href: '/essays', label: 'Essays' },
      { href: '/notes', label: 'Notes' },
      { href: '/framework', label: 'Framework' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { href: '#subscribe', label: 'Subscribe' },
    ],
  },
];

function GridPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="footer-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#footer-grid)" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Top gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/[0.06] blur-[120px] rounded-full pointer-events-none" />

      {/* Bottom-up gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-muted/[0.08] to-muted/[0.15] pointer-events-none" />

      {/* SVG grid background */}
      <GridPattern />

      <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-medium tracking-wide text-foreground">
                Verial
              </span>
            </Link>
            <p className="text-base text-muted-foreground leading-relaxed max-w-[300px]">
              From <em>veritas</em> (truth) and <em>aerial</em> (limitless sky) — the pursuit of understanding and the belief that with the right approach, possibilities are endless.
            </p>
          </div>

          {/* Nav columns */}
          {navSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground/50 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...('external' in link && link.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="text-base text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                    >
                      {link.label}
                      {'external' in link && link.external && (
                        <svg
                          className="w-3.5 h-3.5 opacity-50"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground/60">
            © {new Date().getFullYear()} Verial. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground/50 italic font-serif">
            Truth-seeking. Applied.
          </p>
        </div>
      </div>
    </footer>
  );
}

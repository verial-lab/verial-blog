import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg tracking-tight">Verial</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-sm text-muted-foreground/60">Truth. Applied.</span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/essays" className="hover:text-foreground transition-colors">
              Essays
            </Link>
            <Link href="/notes" className="hover:text-foreground transition-colors">
              Notes
            </Link>
            <Link href="/framework" className="hover:text-foreground transition-colors">
              Framework
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground/40">
            © {new Date().getFullYear()} Verial
          </p>
        </div>
      </div>
    </footer>
  );
}

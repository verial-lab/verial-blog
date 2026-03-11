'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const DURATION = 8000;

export function SubscriptionBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<'pending' | 'confirmed' | null>(null);
  const [progress, setProgress] = useState(1); // 1 → 0
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const status = searchParams.get('subscribed');
    if (status === 'pending' || status === 'confirmed') {
      setType(status);
      setVisible(true);

      const params = new URLSearchParams(searchParams.toString());
      params.delete('subscribed');
      const newUrl = params.size > 0 ? `${pathname}?${params}` : pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  // Countdown progress bar
  useEffect(() => {
    if (!visible) return;
    startRef.current = performance.now();

    function tick(now: number) {
      const elapsed = now - startRef.current!;
      const remaining = Math.max(0, 1 - elapsed / DURATION);
      setProgress(remaining);
      if (remaining > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setVisible(false);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [visible]);

  // Confetti on confirmed
  useEffect(() => {
    if (type !== 'confirmed' || !visible) return;
    let cancelled = false;

    import('canvas-confetti').then(({ default: confetti }) => {
      if (cancelled) return;
      const fire = (opts: object) => confetti({
        particleCount: 40,
        spread: 60,
        colors: ['#DAB541', '#E8C96A', '#F5E6A3', '#FFFFFF', '#B8922E'],
        gravity: 0.9,
        scalar: 0.85,
        ...opts,
      });
      fire({ origin: { x: 0.2, y: 0.6 }, angle: 60 });
      setTimeout(() => { if (!cancelled) fire({ origin: { x: 0.8, y: 0.6 }, angle: 120 }); }, 150);
      setTimeout(() => { if (!cancelled) fire({ origin: { x: 0.5, y: 0.5 }, angle: 90, spread: 80 }); }, 350);
    });

    return () => { cancelled = true; };
  }, [type, visible]);

  if (!visible || !type) return null;

  return (
    <div
      className={`fixed top-[68px] right-4 sm:right-6 z-40 w-[300px] transition-all duration-500 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
      }`}
    >
      <div
        className="relative overflow-hidden rounded-xl bg-background/98 backdrop-blur-md shadow-2xl shadow-black/40 cursor-pointer"
        style={{ border: '1px solid hsl(var(--border) / 0.3)' }}
        onClick={() => setVisible(false)}
      >
        {/* Content */}
        <div className="pl-5 pr-10 pt-4 pb-4">
          {type === 'confirmed' ? (
            <>
              <p className="font-serif text-[17px] font-medium text-foreground leading-tight tracking-wide">
                You&apos;re in!
              </p>
              <p className="font-serif text-[13px] text-muted-foreground/70 leading-relaxed mt-1">
                Welcome to the high signal list.
              </p>
            </>
          ) : (
            <>
              <p className="font-serif text-[17px] font-medium text-foreground leading-tight tracking-wide">
                Check your email.
              </p>
              <p className="font-serif text-[13px] text-muted-foreground/70 leading-relaxed mt-1">
                One click to confirm your subscription.
              </p>
            </>
          )}
        </div>

        {/* Depleting gold progress bar */}
        <div className="h-[2px] bg-border/10">
          <div
            className="h-full bg-gradient-to-r from-primary/60 to-primary origin-left"
            style={{ transform: `scaleX(${progress})`, transition: 'none' }}
          />
        </div>

        {/* Dismiss */}
        <button
          onClick={(e) => { e.stopPropagation(); setVisible(false); }}
          className="absolute top-3 right-3 text-muted-foreground/30 hover:text-muted-foreground/70 transition-colors text-xl leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}

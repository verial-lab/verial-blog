'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function SubscriptionBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<'pending' | 'confirmed' | null>(null);

  useEffect(() => {
    const status = searchParams.get('subscribed');
    if (status === 'pending' || status === 'confirmed') {
      setType(status);
      setVisible(true);

      // Clean the query param from the URL without a reload
      const params = new URLSearchParams(searchParams.toString());
      params.delete('subscribed');
      const newUrl = params.size > 0 ? `${pathname}?${params}` : pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, pathname, router]);

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

      // Two bursts from the sides
      fire({ origin: { x: 0.2, y: 0.6 }, angle: 60 });
      setTimeout(() => { if (!cancelled) fire({ origin: { x: 0.8, y: 0.6 }, angle: 120 }); }, 150);
      setTimeout(() => { if (!cancelled) fire({ origin: { x: 0.5, y: 0.5 }, angle: 90, spread: 80 }); }, 350);
    });

    return () => { cancelled = true; };
  }, [type, visible]);

  // Auto-dismiss after 8 seconds
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(t);
  }, [visible]);

  if (!visible || !type) return null;

  return (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-primary/30 bg-background/95 backdrop-blur-md shadow-xl shadow-black/30 text-sm font-medium">
        {type === 'confirmed' ? (
          <>
            <span className="text-lg">🎉</span>
            <span className="text-foreground">
              You&apos;re in. Welcome to the list.
            </span>
          </>
        ) : (
          <>
            <span className="text-lg">✉️</span>
            <span className="text-foreground">
              Check your email to confirm your subscription.
            </span>
          </>
        )}
        <button
          onClick={() => setVisible(false)}
          className="ml-2 text-muted-foreground/50 hover:text-foreground transition-colors text-base leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}

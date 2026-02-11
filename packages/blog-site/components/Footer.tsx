'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

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

/**
 * Animated Tron-style grid with glowing pulses that travel along
 * random grid lines then fade out.
 */
function TronGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CELL = 40;
    const BASE_OPACITY = 0.06;
    const GLOW_COLOR = { r: 0, g: 255, b: 200 }; // neon cyan-green
    const MAX_PULSES = 4;
    const PULSE_SPEED = 80; // px per second
    const PULSE_LENGTH = 120; // px
    const SPAWN_INTERVAL = 1800; // ms between new pulses

    interface Pulse {
      x: number;
      y: number;
      horizontal: boolean;
      progress: number; // 0..totalLength
      totalLength: number;
      opacity: number;
    }

    let pulses: Pulse[] = [];
    let lastSpawn = 0;
    let animId: number;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawnPulse() {
      const rect = canvas!.getBoundingClientRect();
      const horizontal = Math.random() > 0.5;

      if (horizontal) {
        const row = Math.floor(Math.random() * (rect.height / CELL)) * CELL;
        pulses.push({
          x: -PULSE_LENGTH,
          y: row,
          horizontal: true,
          progress: 0,
          totalLength: rect.width + PULSE_LENGTH * 2,
          opacity: 0.4 + Math.random() * 0.4,
        });
      } else {
        const col = Math.floor(Math.random() * (rect.width / CELL)) * CELL;
        pulses.push({
          x: col,
          y: -PULSE_LENGTH,
          horizontal: false,
          progress: 0,
          totalLength: rect.height + PULSE_LENGTH * 2,
          opacity: 0.4 + Math.random() * 0.4,
        });
      }
    }

    function draw(time: number) {
      const rect = canvas!.getBoundingClientRect();
      ctx!.clearRect(0, 0, rect.width, rect.height);

      // Draw base grid
      ctx!.strokeStyle = `rgba(255, 255, 255, ${BASE_OPACITY})`;
      ctx!.lineWidth = 0.5;
      ctx!.beginPath();
      for (let x = 0; x <= rect.width; x += CELL) {
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, rect.height);
      }
      for (let y = 0; y <= rect.height; y += CELL) {
        ctx!.moveTo(0, y);
        ctx!.lineTo(rect.width, y);
      }
      ctx!.stroke();

      // Spawn pulses
      if (time - lastSpawn > SPAWN_INTERVAL && pulses.length < MAX_PULSES) {
        spawnPulse();
        lastSpawn = time;
      }

      // Draw and update pulses
      const dt = 16 / 1000; // ~60fps
      pulses = pulses.filter((p) => {
        p.progress += PULSE_SPEED * dt;

        if (p.progress > p.totalLength) return false;

        const { r, g, b } = GLOW_COLOR;

        if (p.horizontal) {
          const headX = p.x + p.progress;
          const tailX = headX - PULSE_LENGTH;

          const gradient = ctx!.createLinearGradient(tailX, p.y, headX, p.y);
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
          gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${p.opacity})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          // Glow
          ctx!.shadowColor = `rgba(${r}, ${g}, ${b}, ${p.opacity * 0.6})`;
          ctx!.shadowBlur = 8;
          ctx!.strokeStyle = gradient;
          ctx!.lineWidth = 1.5;
          ctx!.beginPath();
          ctx!.moveTo(tailX, p.y);
          ctx!.lineTo(headX, p.y);
          ctx!.stroke();
          ctx!.shadowBlur = 0;
        } else {
          const headY = p.y + p.progress;
          const tailY = headY - PULSE_LENGTH;

          const gradient = ctx!.createLinearGradient(p.x, tailY, p.x, headY);
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
          gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${p.opacity})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          ctx!.shadowColor = `rgba(${r}, ${g}, ${b}, ${p.opacity * 0.6})`;
          ctx!.shadowBlur = 8;
          ctx!.strokeStyle = gradient;
          ctx!.lineWidth = 1.5;
          ctx!.beginPath();
          ctx!.moveTo(p.x, tailY);
          ctx!.lineTo(p.x, headY);
          ctx!.stroke();
          ctx!.shadowBlur = 0;
        }

        return true;
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
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

      {/* Animated Tron grid */}
      <TronGrid />

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
                      className="text-base text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
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

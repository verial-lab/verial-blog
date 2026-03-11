'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { brand } from '@/lib/brand';

const navSections = [
  {
    title: 'Content',
    links: [
      { href: '/essays', label: 'Essays' },
      { href: '/posts', label: 'Posts' },
      { href: '/systems', label: 'Systems' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { href: '/#subscribe', label: 'Subscribe' },
      { href: '#feedback', label: 'Feedback' },
    ],
  },
  {
    title: 'Reference',
    links: [
      { href: '/glossary', label: 'Glossary' },
    ],
  },
];

/**
 * Spacetime-curved grid with glowing pulses that travel along warped lines.
 * The grid simulates gravitational lensing — lines curve toward a mass point.
 */
function SpacetimeGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const GRID_LINES = 20;
    const BASE_OPACITY = 0.15;
    const GLOW = { r: 218, g: 175, b: 65 }; // metallic gold
    const MAX_PULSES = 4;
    const PULSE_SPEED = 0.004; // progress per frame (0→1)
    const SPAWN_INTERVAL = 2000;

    // Gravity wells — positions normalized 0..1
    let wells = [
      { x: 0.5, y: 0.55, strength: 0.06 },
      { x: 0.25, y: 0.4, strength: 0.03 },
      { x: 0.78, y: 0.35, strength: 0.035 },
    ];

    interface Pulse {
      lineIdx: number;
      horizontal: boolean;
      progress: number; // 0..1
      opacity: number;
    }

    let pulses: Pulse[] = [];
    let lastSpawn = 0;
    let animId: number;
    let w = 0;
    let h = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      w = rect.width;
      h = rect.height;
    }

    /** Apply gravitational displacement to a point */
    function warp(px: number, py: number): [number, number] {
      let dx = 0;
      let dy = 0;
      for (const well of wells) {
        const wx = well.x * w;
        const wy = well.y * h;
        const distX = px - wx;
        const distY = py - wy;
        const dist = Math.sqrt(distX * distX + distY * distY) + 1;
        const force = (well.strength * w * w) / (dist * dist);
        // Pull toward the well
        dx -= (distX / dist) * force;
        dy -= (distY / dist) * force;
      }
      return [px + dx, py + dy];
    }

    /** Get points along a grid line (warped) */
    function getLinePoints(index: number, total: number, horizontal: boolean, steps: number): [number, number][] {
      const points: [number, number][] = [];
      const t = index / (total - 1); // 0..1

      for (let i = 0; i <= steps; i++) {
        const s = i / steps;
        let px: number, py: number;
        if (horizontal) {
          px = s * w;
          py = t * h;
        } else {
          px = t * w;
          py = s * h;
        }
        points.push(warp(px, py));
      }
      return points;
    }

    function drawCurve(points: [number, number][]) {
      if (points.length < 2) return;
      ctx!.beginPath();
      ctx!.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        ctx!.lineTo(points[i][0], points[i][1]);
      }
      ctx!.stroke();
    }

    function spawnPulse() {
      const horizontal = Math.random() > 0.5;
      const lineIdx = Math.floor(Math.random() * GRID_LINES);
      pulses.push({
        lineIdx,
        horizontal,
        progress: 0,
        opacity: 0.5 + Math.random() * 0.4,
      });
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, w, h);
      const steps = 60;

      // Draw base grid
      ctx!.strokeStyle = `rgba(255, 255, 255, ${BASE_OPACITY})`;
      ctx!.lineWidth = 0.5;

      for (let i = 0; i < GRID_LINES; i++) {
        const hPoints = getLinePoints(i, GRID_LINES, true, steps);
        drawCurve(hPoints);
        const vPoints = getLinePoints(i, GRID_LINES, false, steps);
        drawCurve(vPoints);
      }

      // Spawn
      if (time - lastSpawn > SPAWN_INTERVAL && pulses.length < MAX_PULSES) {
        spawnPulse();
        lastSpawn = time;
      }

      // Draw pulses
      const { r, g, b } = GLOW;
      const pulseLen = 0.15; // fraction of line length

      pulses = pulses.filter((p) => {
        p.progress += PULSE_SPEED;
        if (p.progress > 1 + pulseLen) return false;

        const points = getLinePoints(p.lineIdx, GRID_LINES, p.horizontal, steps);

        // Draw glowing segment
        const head = Math.min(Math.floor(p.progress * steps), steps);
        const tail = Math.max(Math.floor((p.progress - pulseLen) * steps), 0);

        if (head <= tail) return true;

        for (let i = tail; i < head && i < points.length - 1; i++) {
          const segProgress = (i - tail) / (head - tail);
          // Bell curve opacity — bright in middle, fade at edges
          const edgeFade = Math.sin(segProgress * Math.PI);
          const alpha = p.opacity * edgeFade;

          ctx!.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.7})`;
          ctx!.shadowBlur = 10;
          ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx!.lineWidth = 1.5;
          ctx!.beginPath();
          ctx!.moveTo(points[i][0], points[i][1]);
          ctx!.lineTo(points[i + 1][0], points[i + 1][1]);
          ctx!.stroke();
        }

        ctx!.shadowBlur = 0;
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

      {/* Animated spacetime grid */}
      <SpacetimeGrid />

      <div className="relative max-w-4xl mx-auto px-6 pt-10 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-medium tracking-wide text-foreground">
                Verial
              </span>
            </Link>
            <p className="text-base text-muted-foreground leading-relaxed max-w-[300px]">
              <span dangerouslySetInnerHTML={{ __html: brand.philosophy.html }} />
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
                    {link.href === '#feedback' ? (
                      <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-feedback'))}
                        className="text-base font-display font-semibold text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-base font-display font-semibold text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
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

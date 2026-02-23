"use client";

import type { Section } from "@/app/essay/[slug]/page";

const weights: Record<string, number> = {
  outline: 0.25,
  draft: 0.5,
  revised: 0.75,
  final: 1,
};

export function StatusBar({ sections }: { sections: Section[] }) {
  const progress =
    sections.length > 0
      ? sections.reduce((sum, s) => sum + (weights[s.status] ?? 0), 0) /
        sections.length
      : 0;

  const pct = Math.round(progress * 100);

  return (
    <div className="mb-4">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[10px] text-verial-muted">
          {sections.length} section{sections.length !== 1 && "s"}
        </span>
        <span className="text-[10px] text-verial-muted">{pct}%</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-verial-border">
        <div
          className="h-full rounded-full bg-verial-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

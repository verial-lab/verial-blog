"use client";

import Link from "next/link";
import type { EssayMeta } from "@/app/page";

const statusColors: Record<string, string> = {
  draft: "bg-yellow-500/20 text-yellow-400",
  "in-progress": "bg-blue-500/20 text-blue-400",
  review: "bg-purple-500/20 text-purple-400",
  done: "bg-green-500/20 text-green-400",
};

export function EssayList({ essays }: { essays: EssayMeta[] }) {
  if (essays.length === 0) {
    return (
      <p className="text-sm text-verial-muted">
        No essays yet. Create one above.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {essays.map((e) => (
        <Link
          key={e.slug}
          href={`/essay/${e.slug}`}
          className="flex items-center justify-between rounded border border-verial-border bg-verial-surface px-4 py-3 transition hover:border-verial-primary/50"
        >
          <div>
            <h3 className="text-sm font-medium text-white">{e.title}</h3>
            <p className="mt-0.5 text-xs text-verial-muted">
              {e.sections} section{e.sections !== 1 && "s"}
              {e.updatedAt && ` · ${new Date(e.updatedAt).toLocaleDateString()}`}
            </p>
          </div>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[e.status] ?? statusColors.draft}`}
          >
            {e.status}
          </span>
        </Link>
      ))}
    </div>
  );
}

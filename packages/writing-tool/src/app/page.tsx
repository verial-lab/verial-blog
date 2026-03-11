"use client";

import { useEffect, useState } from "react";
import { EssayList } from "@/components/EssayList";

export interface EssayMeta {
  slug: string;
  title: string;
  status: "draft" | "in-progress" | "review" | "done";
  sections: number;
  updatedAt: string;
}

export default function Dashboard() {
  const [essays, setEssays] = useState<EssayMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetch("/api/essays")
      .then((r) => r.json())
      .then((data) => setEssays(data.essays ?? []))
      .finally(() => setLoading(false));
  }, []);

  const createEssay = async () => {
    if (!newTitle.trim()) return;
    const res = await fetch("/api/essays", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle.trim() }),
    });
    if (res.ok) {
      const essay = await res.json();
      setNewTitle("");
      setEssays((prev) => [essay, ...prev]);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-end gap-3">
        <div className="flex-1">
          <label className="mb-1 block text-xs text-verial-muted">New Essay</label>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createEssay()}
            placeholder="Essay title..."
            className="w-full rounded border border-verial-border bg-verial-surface px-3 py-2 text-sm text-white placeholder:text-verial-muted focus:border-verial-primary focus:outline-none"
          />
        </div>
        <button
          onClick={createEssay}
          className="rounded bg-verial-primary px-4 py-2 text-sm font-medium text-white hover:bg-verial-secondary"
        >
          Create
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-verial-muted">Loading...</p>
      ) : (
        <EssayList essays={essays} />
      )}
    </div>
  );
}

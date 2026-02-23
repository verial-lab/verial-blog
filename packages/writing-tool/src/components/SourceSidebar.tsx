"use client";

import { useState } from "react";
import type { Source } from "@/app/essay/[slug]/page";

interface Props {
  sources: Source[];
  onUpdate: (sources: Source[]) => void;
  onClose: () => void;
}

export function SourceSidebar({ sources, onUpdate, onClose }: Props) {
  const [items, setItems] = useState(sources);

  const save = (updated: Source[]) => {
    setItems(updated);
    onUpdate(updated);
  };

  const addSource = () => {
    save([
      ...items,
      { id: crypto.randomUUID(), title: "", url: "", notes: "" },
    ]);
  };

  const updateSource = (id: string, patch: Partial<Source>) => {
    save(items.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const removeSource = (id: string) => {
    save(items.filter((s) => s.id !== id));
  };

  return (
    <div className="w-72 shrink-0 rounded border border-verial-border bg-verial-surface p-3">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-medium text-white">Sources</h3>
        <button onClick={onClose} className="text-xs text-verial-muted hover:text-white">
          ×
        </button>
      </div>

      <div className="space-y-3">
        {items.map((source) => (
          <div key={source.id} className="space-y-1">
            <input
              value={source.title}
              onChange={(e) => updateSource(source.id, { title: e.target.value })}
              placeholder="Source title"
              className="w-full bg-transparent text-xs font-medium text-white placeholder:text-verial-muted focus:outline-none"
            />
            <input
              value={source.url ?? ""}
              onChange={(e) => updateSource(source.id, { url: e.target.value })}
              placeholder="URL"
              className="w-full bg-transparent text-[10px] text-verial-muted placeholder:text-verial-muted focus:outline-none"
            />
            <div className="flex items-center justify-between">
              <code className="text-[10px] text-verial-primary">
                [source:{source.id.slice(0, 8)}]
              </code>
              <button
                onClick={() => removeSource(source.id)}
                className="text-[10px] text-verial-muted hover:text-red-400"
              >
                remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addSource}
        className="mt-3 w-full rounded border border-dashed border-verial-border py-1 text-[10px] text-verial-muted hover:border-verial-primary hover:text-white"
      >
        + Add Source
      </button>
    </div>
  );
}

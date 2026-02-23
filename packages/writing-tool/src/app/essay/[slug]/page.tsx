"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { BlockEditor } from "@/components/BlockEditor";
import { SourceSidebar } from "@/components/SourceSidebar";
import { StatusBar } from "@/components/StatusBar";

export interface Section {
  id: string;
  heading: string;
  content: string;
  status: "outline" | "draft" | "revised" | "final";
}

export interface Source {
  id: string;
  title: string;
  url?: string;
  notes?: string;
}

export interface Essay {
  slug: string;
  title: string;
  status: string;
  sections: Section[];
  sources: Source[];
}

export default function EssayEditor() {
  const { slug } = useParams<{ slug: string }>();
  const [essay, setEssay] = useState<Essay | null>(null);
  const [showSources, setShowSources] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/essays?slug=${slug}`)
      .then((r) => r.json())
      .then(setEssay);
  }, [slug]);

  const save = useCallback(
    async (updated: Partial<Essay>) => {
      setSaving(true);
      const body = { ...essay, ...updated };
      await fetch("/api/essays", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setEssay(body as Essay);
      setSaving(false);
    },
    [essay]
  );

  if (!essay) {
    return <p className="text-sm text-verial-muted">Loading essay...</p>;
  }

  return (
    <div className="flex gap-6">
      <div className="min-w-0 flex-1">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">{essay.title}</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-verial-muted">
              {saving ? "Saving..." : "Saved"}
            </span>
            <button
              onClick={() => setShowSources((s) => !s)}
              className="rounded border border-verial-border px-3 py-1 text-xs text-verial-muted hover:border-verial-primary hover:text-white"
            >
              Sources
            </button>
          </div>
        </div>

        <StatusBar sections={essay.sections} />

        <BlockEditor
          sections={essay.sections}
          onUpdate={(sections) => save({ sections })}
          essaySlug={slug}
        />
      </div>

      {showSources && (
        <SourceSidebar
          sources={essay.sources}
          onUpdate={(sources) => save({ sources })}
          onClose={() => setShowSources(false)}
        />
      )}
    </div>
  );
}

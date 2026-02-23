"use client";

import { useState } from "react";
import type { Section } from "@/app/essay/[slug]/page";
import { SectionBlock } from "./SectionBlock";

interface Props {
  sections: Section[];
  onUpdate: (sections: Section[]) => void;
  essaySlug: string;
}

export function BlockEditor({ sections, onUpdate, essaySlug }: Props) {
  const [items, setItems] = useState(sections);

  const update = (updated: Section[]) => {
    setItems(updated);
    onUpdate(updated);
  };

  const updateSection = (id: string, patch: Partial<Section>) => {
    update(items.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const moveSection = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    update(next);
  };

  const addSection = () => {
    update([
      ...items,
      {
        id: crypto.randomUUID(),
        heading: "New Section",
        content: "",
        status: "outline",
      },
    ]);
  };

  const removeSection = (id: string) => {
    if (items.length <= 1) return;
    update(items.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-3">
      {items.map((section, i) => (
        <SectionBlock
          key={section.id}
          section={section}
          index={i}
          total={items.length}
          onUpdate={(patch) => updateSection(section.id, patch)}
          onMove={(dir) => moveSection(i, dir)}
          onRemove={() => removeSection(section.id)}
          essaySlug={essaySlug}
        />
      ))}

      <button
        onClick={addSection}
        className="w-full rounded border border-dashed border-verial-border py-2 text-xs text-verial-muted transition hover:border-verial-primary hover:text-white"
      >
        + Add Section
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { Section } from "@/app/essay/[slug]/page";
import { AIPanel } from "./AIPanel";

const statusLabels = {
  outline: "Outline",
  draft: "Draft",
  revised: "Revised",
  final: "Final",
} as const;

const statusOrder: Section["status"][] = ["outline", "draft", "revised", "final"];

interface Props {
  section: Section;
  index: number;
  total: number;
  onUpdate: (patch: Partial<Section>) => void;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
  essaySlug: string;
}

export function SectionBlock({
  section,
  index,
  total,
  onUpdate,
  onMove,
  onRemove,
  essaySlug,
}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [editingHeading, setEditingHeading] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  const cycleStatus = () => {
    const idx = statusOrder.indexOf(section.status);
    onUpdate({ status: statusOrder[(idx + 1) % statusOrder.length] });
  };

  const handleTextSelect = () => {
    const sel = window.getSelection()?.toString();
    if (sel && sel.length > 0) {
      setSelectedText(sel);
    }
  };

  return (
    <div className="rounded border border-verial-border bg-verial-surface">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-verial-border px-3 py-2">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="text-xs text-verial-muted hover:text-white"
        >
          {collapsed ? "▶" : "▼"}
        </button>

        {editingHeading ? (
          <input
            autoFocus
            value={section.heading}
            onChange={(e) => onUpdate({ heading: e.target.value })}
            onBlur={() => setEditingHeading(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditingHeading(false)}
            className="flex-1 bg-transparent text-sm font-medium text-white outline-none"
          />
        ) : (
          <button
            onDoubleClick={() => setEditingHeading(true)}
            className="flex-1 text-left text-sm font-medium text-white"
          >
            {section.heading}
          </button>
        )}

        <button
          onClick={cycleStatus}
          className="rounded-full px-2 py-0.5 text-[10px] font-medium text-verial-primary ring-1 ring-verial-primary/30 hover:ring-verial-primary"
        >
          {statusLabels[section.status]}
        </button>

        <div className="flex gap-1 text-verial-muted">
          <button
            onClick={() => onMove(-1)}
            disabled={index === 0}
            className="text-xs hover:text-white disabled:opacity-30"
          >
            ↑
          </button>
          <button
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            className="text-xs hover:text-white disabled:opacity-30"
          >
            ↓
          </button>
          <button
            onClick={() => setShowAI((s) => !s)}
            className="ml-1 text-xs hover:text-verial-primary"
            title="AI Assistant"
          >
            ✦
          </button>
          <button
            onClick={onRemove}
            className="ml-1 text-xs hover:text-red-400"
          >
            ×
          </button>
        </div>
      </div>

      {/* Editor */}
      {!collapsed && (
        <div className="p-3">
          <textarea
            value={section.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            onMouseUp={handleTextSelect}
            placeholder="Start writing..."
            className="min-h-[120px] w-full resize-y bg-transparent font-mono text-sm leading-relaxed text-gray-300 placeholder:text-verial-muted focus:outline-none"
          />

          {selectedText && (
            <div className="mt-2 flex gap-2 border-t border-verial-border pt-2">
              {(["rewrite", "expand", "simplify", "challenge"] as const).map(
                (action) => (
                  <button
                    key={action}
                    onClick={() => {
                      setShowAI(true);
                    }}
                    className="rounded bg-verial-bg px-2 py-1 text-[10px] font-medium capitalize text-verial-muted hover:text-verial-primary"
                  >
                    {action}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      )}

      {/* AI Panel */}
      {showAI && (
        <AIPanel
          sectionContent={section.content}
          selectedText={selectedText}
          essaySlug={essaySlug}
          onInsert={(text) => onUpdate({ content: section.content + "\n\n" + text })}
          onClose={() => setShowAI(false)}
        />
      )}
    </div>
  );
}

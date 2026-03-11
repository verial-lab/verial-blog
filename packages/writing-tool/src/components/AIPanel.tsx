"use client";

import { useState } from "react";

interface Props {
  sectionContent: string;
  selectedText: string;
  essaySlug: string;
  onInsert: (text: string) => void;
  onClose: () => void;
}

type AIAction = "rewrite" | "expand" | "simplify" | "challenge" | "chat";

export function AIPanel({
  sectionContent,
  selectedText,
  onInsert,
  onClose,
}: Props) {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const runAction = async (action: AIAction, context?: string) => {
    setLoading(true);
    setResponse("");

    const text = selectedText || sectionContent;

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, action, context }),
      });

      if (!res.ok || !res.body) {
        setResponse("Error: AI service unavailable");
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ") && !line.includes("[DONE]")) {
            try {
              const { text: t } = JSON.parse(line.slice(6));
              full += t;
              setResponse(full);
            } catch {
              // skip malformed
            }
          }
        }
      }
    } catch {
      setResponse("Error connecting to AI service");
    }

    setLoading(false);
  };

  return (
    <div className="border-t border-verial-border bg-verial-bg p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-verial-primary">
          ✦ AI Assistant
        </span>
        <button onClick={onClose} className="text-xs text-verial-muted hover:text-white">
          ×
        </button>
      </div>

      <div className="mb-2 flex flex-wrap gap-1">
        {(["rewrite", "expand", "simplify", "challenge"] as const).map(
          (action) => (
            <button
              key={action}
              onClick={() => runAction(action)}
              disabled={loading}
              className="rounded bg-verial-surface px-2 py-1 text-[10px] font-medium capitalize text-verial-muted hover:text-verial-primary disabled:opacity-50"
            >
              {action}
            </button>
          )
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && chatInput.trim()) {
              runAction("chat", chatInput);
              setChatInput("");
            }
          }}
          placeholder="Ask about this section..."
          className="flex-1 rounded border border-verial-border bg-verial-surface px-2 py-1 text-xs text-white placeholder:text-verial-muted focus:border-verial-primary focus:outline-none"
        />
      </div>

      {(response || loading) && (
        <div className="mt-2 max-h-48 overflow-y-auto rounded border border-verial-border bg-verial-surface p-2">
          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-gray-300">
            {response || "Thinking..."}
          </pre>
          {response && !loading && (
            <button
              onClick={() => onInsert(response)}
              className="mt-2 rounded bg-verial-primary px-2 py-1 text-[10px] font-medium text-white hover:bg-verial-secondary"
            >
              Insert into section
            </button>
          )}
        </div>
      )}
    </div>
  );
}

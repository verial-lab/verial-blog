import { NextRequest } from "next/server";
import { streamAIResponse } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const { text, action, context } = await req.json();

  if (!text || !action) {
    return new Response(JSON.stringify({ error: "text and action required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const prompts: Record<string, string> = {
    rewrite: `Rewrite the following text, improving clarity and flow while preserving the author's voice and meaning:\n\n${text}`,
    expand: `Expand on the following text, adding more detail, examples, and nuance:\n\n${text}`,
    simplify: `Simplify the following text, making it more accessible while keeping the core ideas:\n\n${text}`,
    challenge: `Play devil's advocate. Challenge the argument made in this text — find weaknesses, counter-arguments, and blind spots:\n\n${text}`,
    chat: `You are a writing assistant helping with an essay. The writer wants to discuss this section:\n\n---\n${text}\n---\n\nWriter's message: ${context ?? "Help me improve this section."}`,
  };

  const prompt = prompts[action] ?? prompts.chat;

  try {
    const stream = await streamAIResponse(prompt);
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "AI service unavailable" }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }
}

import { NextResponse } from "next/server";
import { generateLessonReply } from "@/lib/llm";
import { ChatMessage } from "@/lib/llm/types";

type ChatBody = {
  lessonId: string;
  lessonTitle: string;
  pageIndex: number;
  pageTitle: string;
  pageText: string;
  messages: ChatMessage[]; // user/assistant turns only (system is built server-side)
};

function buildSystemPrompt(input: Omit<ChatBody, "messages">) {
  return [
    `You are UnicornSheepDog1's lesson guide: warm, calm, adult-friendly, Bluey-inspired (but NOT childish).`,
    `You help the user learn about money with a ~3rd-grade reading level in wording (short sentences, simple words).`,
    `Be factual, nonpartisan, and non-hypey. No financial advice. No price predictions.`,
    `If the user asks for something outside the lesson, you MUST clearly label your answer sections:`,
    `- "From this lesson:" (only uses lesson text)`,
    `- "Extra context:" (general knowledge; admit uncertainty; suggest verifying)`,
    ``,
    `Current lesson: ${input.lessonTitle} (${input.lessonId})`,
    `Current page: ${input.pageIndex + 1} — ${input.pageTitle}`,
    ``,
    `LESSON TEXT (primary source):`,
    input.pageText
  ].join("\n");
}

export async function POST(req: Request) {
  let body: ChatBody | null = null;
  try {
    body = (await req.json()) as ChatBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || !body.lessonId || !body.lessonTitle || !body.pageText) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const system: ChatMessage = { role: "system", content: buildSystemPrompt(body) };
  const messages: ChatMessage[] = [system, ...(body.messages ?? [])];

  try {
    const result = await generateLessonReply({
      // Use env override when provided; otherwise use a safer "latest" model name.
      model: process.env.LLM_MODEL ?? "grok-2-latest",
      messages,
      temperature: 0.3
    });

    return NextResponse.json({ text: result.text });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    // Keep the site functional even when AI is off.
    const status =
      msg === "LLM_DISABLED" ||
      msg.includes("Missing XAI_API_KEY") ||
      msg.includes("Missing GROK_API_KEY") ||
      msg.includes("Grok API error 401") ||
      msg.includes("Grok API error 403") ||
      msg.includes("Grok API error 429")
        ? 503
        : 500;
    return NextResponse.json(
      {
        error: "AI unavailable",
        detail: msg,
        hint: "Set XAI_API_KEY (or GROK_API_KEY) and redeploy, or set LLM_DISABLED=true to hide chat."
      },
      { status }
    );
  }
}



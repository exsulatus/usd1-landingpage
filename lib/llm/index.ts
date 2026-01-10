import { grokChatCompletion } from "@/lib/llm/providers/grok";
import { ChatCompletionRequest } from "@/lib/llm/types";

export type LlmResult = {
  text: string;
};

function getApiKey(): string | null {
  // Support common env var names so deployments don't fail silently due to naming mismatch.
  const raw =
    process.env.XAI_API_KEY ??
    process.env.GROK_API_KEY ??
    process.env.XAI_KEY ??
    process.env.GROK_KEY ??
    null;
  const trimmed = raw?.trim();
  return trimmed ? trimmed : null;
}

export async function generateLessonReply(req: ChatCompletionRequest): Promise<LlmResult> {
  if (process.env.LLM_DISABLED === "true") {
    throw new Error("LLM_DISABLED");
  }

  // Provider is intentionally behind one function so we can swap later.
  const provider = (process.env.LLM_PROVIDER ?? "grok").toLowerCase();
  if (provider !== "grok") {
    throw new Error(`Unsupported LLM_PROVIDER: ${provider}`);
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Missing XAI_API_KEY (or GROK_API_KEY)");
  }

  const baseUrl = process.env.XAI_BASE_URL;
  const response = await grokChatCompletion(req, { apiKey, baseUrl });
  const text = response.choices?.[0]?.message?.content ?? "";
  return { text };
}



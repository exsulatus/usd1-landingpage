import { ChatCompletionRequest, ChatCompletionResponse } from "@/lib/llm/types";

export type GrokClientOptions = {
  apiKey: string;
  baseUrl?: string;
};

export async function grokChatCompletion(
  req: ChatCompletionRequest,
  opts: GrokClientOptions
): Promise<ChatCompletionResponse> {
  const baseUrl = (opts.baseUrl ?? "https://api.x.ai/v1").replace(/\/+$/, "");
  const url = `${baseUrl}/chat/completions`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${opts.apiKey}`
    },
    body: JSON.stringify(req)
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Grok API error ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as ChatCompletionResponse;
}



import { NextResponse } from "next/server";

export async function GET() {
  const provider = (process.env.LLM_PROVIDER ?? "grok").toLowerCase();
  const disabled = process.env.LLM_DISABLED === "true";
  const hasKey = Boolean((process.env.XAI_API_KEY ?? process.env.GROK_API_KEY)?.trim());
  const model = process.env.LLM_MODEL ?? "grok-2-latest";

  const ok = !disabled && provider === "grok" && hasKey;

  return NextResponse.json({
    ok,
    disabled,
    provider,
    hasKey,
    model
  });
}



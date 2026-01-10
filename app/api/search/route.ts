import { NextResponse } from "next/server";
import { searchSite } from "@/lib/search";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";

  const results = await searchSite(q, 9);

  return NextResponse.json(
    { results },
    {
      headers: {
        // Keep it responsive; index is server-built and stable, but query-specific.
        "Cache-Control": "no-store"
      }
    }
  );
}



"use client";

import React from "react";
import { copyToClipboard } from "@/lib/copy";

export function MintCopyButton({ mint }: { mint: string }) {
  const [status, setStatus] = React.useState<"idle" | "copied" | "error">("idle");

  async function onCopy() {
    const ok = await copyToClipboard(mint);
    setStatus(ok ? "copied" : "error");
    window.setTimeout(() => setStatus("idle"), 1400);
  }

  const label =
    status === "copied" ? "Copied" : status === "error" ? "Copy failed" : "Copy mint address";

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button type="button" className="btn btnPrimary" onClick={onCopy}>
        {label}
      </button>
      <span className="muted" style={{ fontSize: 13 }} aria-live="polite">
        {status === "copied" ? "Mint address copied to clipboard." : status === "error" ? "Couldn’t access clipboard." : " "}
      </span>
    </div>
  );
}


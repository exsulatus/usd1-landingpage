"use client";

import React from "react";

type UiMsg = { role: "user" | "assistant"; content: string };

export function LessonChat({
  lessonId,
  lessonTitle,
  pageIndex,
  pageTitle,
  pageText
}: {
  lessonId: string;
  lessonTitle: string;
  pageIndex: number;
  pageTitle: string;
  pageText: string;
}) {
  const [messages, setMessages] = React.useState<UiMsg[]>([
    {
      role: "assistant",
      content:
        "Hey! I’m your lesson guide. Want a quick question, a simple summary, or do you want to ask something specific?"
    }
  ]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [offline, setOffline] = React.useState(false);
  const [offlineReason, setOfflineReason] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Best-effort: reflect whether chat is configured before the user hits Send.
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/chat/health", { method: "GET" });
        if (!res.ok) return;
        const data = (await res.json()) as {
          ok?: boolean;
          disabled?: boolean;
          provider?: string;
          hasKey?: boolean;
          model?: string;
        };
        if (cancelled) return;
        const ok = Boolean(data.ok);
        setOffline(!ok);
        if (!ok) {
          if (data.disabled) setOfflineReason("AI chat is disabled on the server (LLM_DISABLED=true).");
          else if (data.provider && data.provider !== "grok") setOfflineReason(`AI chat provider is misconfigured (LLM_PROVIDER=${data.provider}).`);
          else if (data.hasKey === false) setOfflineReason("AI chat isn’t configured (missing XAI_API_KEY / GROK_API_KEY).");
          else setOfflineReason("AI chat is unavailable.");
        } else {
          setOfflineReason(null);
        }
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    // When the page changes, gently reset context while keeping the chat.
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `Page changed → ${pageTitle}. Ask me anything about this page, or say “quiz me.”`
      }
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, pageIndex]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setOffline(false);
    setOfflineReason(null);
    setBusy(true);

    const nextMsgs: UiMsg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMsgs);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId,
          lessonTitle,
          pageIndex,
          pageTitle,
          pageText,
          messages: nextMsgs.slice(-12)
        })
      });

      if (!res.ok) {
        setOffline(true);
        let detail = "";
        let hint = "";
        try {
          const err = (await res.json()) as { detail?: string; hint?: string };
          detail = (err.detail ?? "").trim();
          hint = (err.hint ?? "").trim();
        } catch {
          // ignore
        }

        const configuredMsg =
          detail.includes("Missing XAI_API_KEY") || detail.includes("Missing GROK_API_KEY")
            ? "AI isn’t configured on the server yet (missing API key). Set XAI_API_KEY (or GROK_API_KEY) and redeploy."
            : "";
        const upstreamMsg = detail.startsWith("Grok API error")
          ? `The AI provider returned an error. ${detail}`
          : "";
        const next =
          configuredMsg ||
          upstreamMsg ||
          "AI is unavailable right now. You can still use the lesson pages. Tip: ask me again later, or use the page text on the left and I’ll help you make a checklist.";
        setOfflineReason(configuredMsg || upstreamMsg || null);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: hint ? `${next}\n\nTip: ${hint}` : next
          }
        ]);
        return;
      }

      const data = (await res.json()) as { text?: string };
      const reply = (data.text ?? "").trim() || "Hmm. I didn’t get a reply. Try again?";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setOffline(true);
      setOfflineReason("Network error talking to /api/chat.");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "AI is unavailable right now. Try again in a bit." }
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="chat card">
      <div className="head">
        <div>
          <div className="kicker">AI Guide</div>
          <div className="titleRow">
            <div className="title">Grok (swappable)</div>
            {offline ? (
              <span className="badge" title={offlineReason ?? undefined}>
                Offline
              </span>
            ) : (
              <span className="badge ok">Online</span>
            )}
          </div>
          <div className="sub muted">
            Lesson: <strong>{lessonTitle}</strong>
            <br />
            Page: <strong>{pageIndex + 1}</strong>
          </div>
        </div>
      </div>

      <div className="msgs" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "msg user" : "msg bot"}>
            <div className="bubble">{m.content}</div>
          </div>
        ))}
      </div>

      <div className="quick">
        <button className="btn" type="button" onClick={() => send("Give me a 3-sentence summary of this page.")} disabled={busy}>
          Summary
        </button>
        <button className="btn" type="button" onClick={() => send("Quiz me with 3 questions: one multiple choice, one fill-in-the-blank, one select-all-that-apply. Keep it short.")} disabled={busy}>
          Quiz me
        </button>
        <button className="btn" type="button" onClick={() => send("Give me one fun fact related to this page. If it’s extra context, label it clearly.")} disabled={busy}>
          Fun fact
        </button>
      </div>

      <form
        className="composer"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <textarea
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question…"
          rows={3}
        />
        <button className="btn btnPrimary" type="submit" disabled={busy || !input.trim()}>
          {busy ? "Thinking…" : "Send"}
        </button>
      </form>

      <style jsx>{`
        .chat {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          height: 100%;
          min-height: 0;
        }
        .head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          border-bottom: 1px dashed var(--border);
          padding-bottom: 12px;
          flex-shrink: 0;
        }
        .kicker {
          font-size: 12px;
          color: var(--muted);
          margin-bottom: 4px;
        }
        .titleRow {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .title {
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .badge {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 999px;
          border: 1px solid rgba(255, 122, 107, 0.38);
          color: var(--text);
          background: rgba(255, 122, 107, 0.12);
        }
        .badge.ok {
          border-color: rgba(33, 181, 143, 0.35);
          background: rgba(33, 181, 143, 0.12);
        }
        .sub {
          font-size: 12px;
          margin-top: 8px;
        }
        .msgs {
          display: grid;
          gap: 10px;
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding-right: 4px;
          scrollbar-width: thin;
        }
        .msg {
          display: flex;
        }
        .msg.user {
          justify-content: flex-end;
        }
        .bubble {
          max-width: 92%;
          white-space: pre-wrap;
          border-radius: 18px;
          padding: 10px 12px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.65);
          box-shadow: var(--shadowSoft);
          font-size: 14px;
          line-height: 1.45;
        }
        :global(html.dark) .bubble {
          background: rgba(255, 255, 255, 0.06);
        }
        .msg.user .bubble {
          border-color: rgba(33, 181, 143, 0.30);
          background: rgba(33, 181, 143, 0.10);
        }
        .quick {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .composer {
          display: grid;
          gap: 10px;
        }
        .input {
          width: 100%;
          resize: vertical;
          border-radius: 18px;
          border: 1px solid var(--border);
          background: var(--surface);
          padding: 10px 12px;
          color: var(--text);
          box-shadow: var(--shadowSoft);
        }
        .input:focus {
          outline: none;
          box-shadow: var(--shadowSoft), var(--focus);
        }
      `}</style>
    </div>
  );
}



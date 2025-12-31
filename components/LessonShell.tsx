"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lesson } from "@/lib/lessons/types";
import { LessonChat } from "@/components/LessonChat";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function LessonShell({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initial = Number(searchParams.get("p") ?? "0");
  const [pageIndex, setPageIndex] = React.useState(() =>
    clamp(Number.isFinite(initial) ? initial : 0, 0, Math.max(0, lesson.pages.length - 1))
  );
  const [zoom, setZoom] = React.useState(1);

  React.useEffect(() => {
    const next = clamp(pageIndex, 0, Math.max(0, lesson.pages.length - 1));
    const params = new URLSearchParams(searchParams.toString());
    params.set("p", String(next));
    router.replace(`?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  const page = lesson.pages[pageIndex];

  return (
    <div className="page">
      <div className="container wrap">
        <div className="left card">
          <div className="topRow">
            <div>
              <div className="kicker">Lesson</div>
              <h1 className="title">{lesson.title}</h1>
            </div>
            <div className="tools">
              <button className="btn" type="button" onClick={() => setZoom((z) => clamp(z - 0.1, 0.8, 1.6))}>
                Zoom −
              </button>
              <button className="btn" type="button" onClick={() => setZoom((z) => clamp(z + 0.1, 0.8, 1.6))}>
                Zoom +
              </button>
              <button className="btn" type="button" onClick={() => setZoom(1)}>
                Reset
              </button>
            </div>
          </div>

          <div className="pager">
            <button className="btn" type="button" onClick={() => setPageIndex((p) => Math.max(0, p - 1))} disabled={pageIndex === 0}>
              ← Prev
            </button>
            <div className="pill">
              Page <strong>{pageIndex + 1}</strong> / {lesson.pages.length}
              {page.title ? <span className="muted"> • {page.title}</span> : null}
            </div>
            <button
              className="btn"
              type="button"
              onClick={() => setPageIndex((p) => Math.min(lesson.pages.length - 1, p + 1))}
              disabled={pageIndex >= lesson.pages.length - 1}
            >
              Next →
            </button>
          </div>

          <div className="lessonPage" style={{ transform: `scale(${zoom})` }}>
            {page.title ? <h2 className="pageTitle">{page.title}</h2> : null}
            <pre className="pageBody">{page.body}</pre>
          </div>

          <div className="hint muted">
            You can select and copy text like normal. The AI guide (right) will always know your
            current lesson + page.
          </div>
        </div>

        <aside className="right">
          <LessonChat
            lessonId={lesson.id}
            lessonTitle={lesson.title}
            pageIndex={pageIndex}
            pageTitle={page.title ?? `Page ${pageIndex + 1}`}
            pageText={page.body}
          />
        </aside>

        <style jsx>{`
        .wrap {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 18px;
          align-items: start;
        }
        .left {
          padding: 18px;
        }
        .topRow {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
          border-bottom: 1px dashed var(--border);
          padding-bottom: 14px;
          margin-bottom: 14px;
        }
        .kicker {
          font-size: 12px;
          color: var(--muted);
          margin-bottom: 4px;
        }
        .title {
          margin: 0;
          letter-spacing: -0.03em;
          font-size: 32px;
          line-height: 1.05;
        }
        .tools {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 10px;
        }
        .pager {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin: 10px 0 16px 0;
        }
        .lessonPage {
          transform-origin: top left;
          transition: transform 120ms ease;
        }
        .pageTitle {
          margin: 0 0 10px 0;
          letter-spacing: -0.02em;
        }
        .pageBody {
          margin: 0;
          white-space: pre-wrap;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
          font-size: 16px;
          line-height: 1.5;
          color: var(--text);
          user-select: text;
        }
        .hint {
          margin-top: 14px;
          font-size: 13px;
        }
        .right {
          position: sticky;
          top: 96px;
        }
        @media (max-width: 1080px) {
          .wrap {
            grid-template-columns: 1fr;
          }
          .right {
            position: static;
          }
        }
      `}</style>
      </div>
    </div>
  );
}



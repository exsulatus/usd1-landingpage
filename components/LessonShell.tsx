"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lesson } from "@/lib/lessons/types";
import { LessonChat } from "@/components/LessonChat";
import { addRecentLesson } from "@/lib/lessons/storage";

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
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const stepRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const hasScrolledInitial = React.useRef(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  React.useEffect(() => {
    const next = clamp(pageIndex, 0, Math.max(0, lesson.pages.length - 1));
    const params = new URLSearchParams(searchParams.toString());
    params.set("p", String(next));
    router.replace(`?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  // Track this lesson as recently viewed
  const currentPage = lesson.pages[pageIndex] ?? lesson.pages[0];
  React.useEffect(() => {
    if (!currentPage) return;
    addRecentLesson({
      lessonId: lesson.id,
      pageIndex,
      title: currentPage.title ?? lesson.title,
    });
  }, [lesson.id, lesson.title, pageIndex, currentPage]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;
        const viewportTarget = window.innerHeight * 0.32;
        const sorted = visible
          .map((entry) => ({
            index: Number((entry.target as HTMLElement).dataset.index),
            distance: Math.abs(entry.boundingClientRect.top - viewportTarget),
          }))
          .sort((a, b) => a.distance - b.distance);
        const next = sorted[0]?.index;
        if (Number.isInteger(next)) {
          setPageIndex((prev) => (prev === next ? prev : next));
        }
      },
      {
        rootMargin: "-10% 0px -42% 0px",
        threshold: [0.35, 0.6],
      }
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [lesson.pages.length]);

  React.useEffect(() => {
    if (hasScrolledInitial.current) return;
    const el = stepRefs.current[pageIndex];
    if (!el) return;
    hasScrolledInitial.current = true;
    el.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [pageIndex, prefersReducedMotion]);

  const zoomVars = { "--stoneZoom": zoom } as React.CSSProperties;

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

          <div className="riverScene" style={zoomVars}>
            <div className="riverLane" aria-hidden />
            <div className="riverTexture" aria-hidden />
            <div className="bankDecor bankDecorLeft" aria-hidden>
              <span className="tree" />
              <span className="rocks" />
              <span className="reed" />
            </div>
            <div className="bankDecor bankDecorRight" aria-hidden>
              <span className="rocks" />
              <span className="tree" />
              <span className="reed" />
            </div>

            <div className="stoneList">
              {lesson.pages.map((page, idx) => (
                <div
                  key={page.index}
                  ref={(el) => { stepRefs.current[idx] = el; }}
                  data-index={idx}
                  className={`stone ${pageIndex === idx ? "isActive" : ""} ${idx % 2 === 0 ? "isLeft" : "isRight"}`}
                >
                  <div className="stoneHeader">
                    <span className="stepLabel">Step {idx + 1}</span>
                    {page.title ? <h2 className="pageTitle">{page.title}</h2> : null}
                  </div>
                  <pre className="pageBody">{page.body}</pre>
                </div>
              ))}
            </div>
          </div>

          <div className="hint muted">
            Scroll down the river path to follow each step. You can select and copy text like normal. The AI guide
            (right) will always know your current step.
          </div>
        </div>

        <aside className="right">
          <LessonChat
            lessonId={lesson.id}
            lessonTitle={lesson.title}
            pageIndex={pageIndex}
            pageTitle={currentPage?.title ?? `Step ${pageIndex + 1}`}
            pageText={currentPage?.body ?? ""}
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
        .riverScene {
          --river: rgba(33, 181, 143, 0.18);
          --riverAlt: rgba(33, 181, 143, 0.12);
          --riverHighlight: rgba(33, 181, 143, 0.28);
          --bank: rgba(33, 181, 143, 0.09);
          position: relative;
          padding: 24px 8px 10px 8px;
          margin: 4px -4px 0 -4px;
          overflow: hidden;
          border-radius: var(--radius-xl);
          background: linear-gradient(
            90deg,
            var(--bank) 0%,
            var(--bank) 17%,
            transparent 17%,
            transparent 83%,
            var(--bank) 83%,
            var(--bank) 100%
          );
        }
        .riverLane {
          position: absolute;
          inset: 0;
          width: 72%;
          margin: 0 auto;
          border-radius: 999px;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.28)),
            repeating-linear-gradient(180deg, var(--river) 0 220px, var(--riverAlt) 220px 440px);
          background-size: 100% 440px, 100% 440px;
          background-attachment: fixed;
          opacity: 0.9;
          filter: saturate(1.04);
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.16),
            0 0 0 1px rgba(17, 24, 39, 0.04);
        }
        .riverTexture {
          position: absolute;
          inset: 0;
          width: 72%;
          margin: 0 auto;
          border-radius: 999px;
          background: radial-gradient(circle at 16% 10%, rgba(255, 255, 255, 0.22), transparent 34%),
            radial-gradient(circle at 78% 24%, rgba(255, 255, 255, 0.16), transparent 36%),
            radial-gradient(circle at 42% 78%, rgba(255, 255, 255, 0.12), transparent 30%);
          opacity: 0.5;
          pointer-events: none;
        }
        .bankDecor {
          position: absolute;
          top: 12px;
          bottom: 12px;
          width: 18%;
          display: grid;
          grid-template-rows: repeat(3, min-content);
          align-content: space-evenly;
          gap: 32px;
          pointer-events: none;
        }
        .bankDecorLeft {
          left: 2%;
        }
        .bankDecorRight {
          right: 2%;
        }
        .bankDecor span {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 68px;
          height: 68px;
          border-radius: 20px;
          background: rgba(33, 181, 143, 0.12);
          box-shadow:
            inset 0 0 0 1px rgba(17, 24, 39, 0.05),
            0 8px 18px rgba(17, 24, 39, 0.08);
          opacity: 0.8;
        }
        .bankDecor .tree {
          background: linear-gradient(180deg, rgba(33, 181, 143, 0.32), rgba(33, 181, 143, 0.18));
        }
        .bankDecor .tree::after {
          content: "";
          position: absolute;
          bottom: 10px;
          width: 10px;
          height: 24px;
          border-radius: 999px;
          background: rgba(87, 65, 40, 0.35);
          box-shadow: 0 0 0 1px rgba(17, 24, 39, 0.04);
        }
        .bankDecor .rocks {
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.45), transparent 50%),
            rgba(33, 181, 143, 0.16);
          border-radius: 26px;
        }
        .bankDecor .rocks::after {
          content: "";
          position: absolute;
          width: 60%;
          height: 22%;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.24);
          top: 22%;
          left: 20%;
          opacity: 0.6;
        }
        .bankDecor .reed {
          background: linear-gradient(180deg, rgba(33, 181, 143, 0.18), rgba(33, 181, 143, 0.12));
        }
        .bankDecor .reed::before,
        .bankDecor .reed::after {
          content: "";
          position: absolute;
          bottom: 12px;
          width: 8px;
          border-radius: 999px;
          background: rgba(87, 65, 40, 0.32);
          box-shadow: 0 0 0 1px rgba(17, 24, 39, 0.04);
        }
        .bankDecor .reed::before {
          height: 30px;
          left: 36%;
        }
        .bankDecor .reed::after {
          height: 36px;
          left: 54%;
        }
        .stoneList {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 26px;
          padding: 8px 0 12px 0;
        }
        .stone {
          --stone-offset: 0px;
          position: relative;
          max-width: 760px;
          width: min(92%, 760px);
          margin: 0 auto;
          padding: 18px 18px 20px 18px;
          border-radius: 18px;
          background:
            radial-gradient(circle at 20% 18%, rgba(255, 255, 255, 0.16), transparent 36%),
            var(--surface);
          border: 1px solid var(--border);
          box-shadow: var(--shadowSm);
          transform: translateX(var(--stone-offset));
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            transform 220ms ease,
            background 180ms ease;
        }
        .stone.isLeft {
          --stone-offset: -12px;
        }
        .stone.isRight {
          --stone-offset: 12px;
        }
        .stone.isActive {
          border-color: rgba(33, 181, 143, 0.32);
          box-shadow:
            0 12px 26px rgba(33, 181, 143, 0.16),
            var(--shadowSm);
          background:
            radial-gradient(circle at 20% 18%, rgba(33, 181, 143, 0.08), transparent 42%),
            var(--surface);
        }
        .stoneHeader {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .stepLabel {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(33, 181, 143, 0.12);
          border: 1px solid rgba(33, 181, 143, 0.28);
          color: var(--text);
          font-weight: 650;
          font-size: 13px;
        }
        .pageTitle {
          margin: 0;
          letter-spacing: -0.02em;
          font-size: 20px;
          line-height: 1.2;
        }
        .pageBody {
          margin: 0;
          white-space: pre-wrap;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
          font-size: calc(16px * var(--stoneZoom, 1));
          line-height: calc(1.48 * var(--stoneZoom, 1));
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
        :global(html.dark) .riverScene {
          --river: rgba(33, 181, 143, 0.24);
          --riverAlt: rgba(33, 181, 143, 0.18);
          --riverHighlight: rgba(33, 181, 143, 0.34);
          --bank: rgba(33, 181, 143, 0.12);
        }
        :global(html.dark) .riverLane {
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.12),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }
        :global(html.dark) .stone {
          background:
            radial-gradient(circle at 20% 18%, rgba(255, 255, 255, 0.06), transparent 36%),
            var(--surface);
        }
        :global(html.dark) .stone.isActive {
          background:
            radial-gradient(circle at 20% 18%, rgba(33, 181, 143, 0.12), transparent 42%),
            var(--surface);
        }
        :global(html.dark) .bankDecor span {
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.08),
            0 8px 18px rgba(0, 0, 0, 0.35);
        }
        @media (max-width: 1080px) {
          .wrap {
            grid-template-columns: 1fr;
          }
          .right {
            position: static;
          }
        }
        @media (max-width: 720px) {
          .riverScene {
            padding: 16px 4px 10px 4px;
          }
          .stone {
            width: 100%;
            --stone-offset: 0px;
          }
          .stone.isLeft,
          .stone.isRight {
            --stone-offset: 0px;
          }
          .bankDecor {
            width: 14%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .stone,
          .pageBody {
            transition: none;
          }
        }
      `}</style>
      </div>
    </div>
  );
}

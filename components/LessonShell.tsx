"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lesson } from "@/lib/lessons/types";
import { LessonChat } from "@/components/LessonChat";
import { WindingRiver } from "@/components/WindingRiver";
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
  const stoneRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const riverSceneRef = React.useRef<HTMLDivElement | null>(null);
  const [stoneOffsetsPx, setStoneOffsetsPx] = React.useState<number[]>([]);
  const [viewMode, setViewMode] = React.useState<"river" | "reader">("river");

  // Constants to match WindingRiver.tsx for synchronized bending
  const stepHeight = 300;
  const paddingY = 150;
  const waveLength = stepHeight * 2.5;
  const amplitude = 50; // SVG units (out of 300)
  const viewBoxWidth = 300;
  const viewBoxHeight = Math.max(800, lesson.pages.length * stepHeight + paddingY * 2);
  const hasScrolledInitial = React.useRef(false);

  const recomputeStoneOffsets = React.useCallback(() => {
    const sceneEl = riverSceneRef.current;
    if (!sceneEl) return;

    const sceneRect = sceneEl.getBoundingClientRect();
    if (sceneRect.width <= 0 || sceneRect.height <= 0) return;

    // WindingRiver uses preserveAspectRatio="xMidYMin slice"
    // so effective scale is the max scale that covers the container.
    const scale = Math.max(sceneRect.width / viewBoxWidth, sceneRect.height / viewBoxHeight);

    const next: number[] = stoneRefs.current.map((el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const yPxInScene = r.top - sceneRect.top + r.height / 2;
      const ySvg = yPxInScene / scale;
      const xOffsetSvg = Math.sin((ySvg / waveLength) * Math.PI * 2) * amplitude;
      return xOffsetSvg * scale;
    });

    setStoneOffsetsPx(next);
  }, [amplitude, viewBoxHeight, viewBoxWidth, waveLength]);

  React.useEffect(() => {
    // Compute after the first paint so active sizing/layout is accounted for.
    if (typeof window === "undefined") return;
    const raf = window.requestAnimationFrame(() => recomputeStoneOffsets());
    return () => window.cancelAnimationFrame(raf);
  }, [pageIndex, lesson.pages.length, zoom, recomputeStoneOffsets]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const onResize = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => recomputeStoneOffsets());
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(raf);
    };
  }, [recomputeStoneOffsets]);

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
    if (viewMode === "reader") {
      params.set("view", "reader");
    } else {
      params.delete("view");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, viewMode]);

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
  const scrollToStep = React.useCallback(
    (idx: number) => {
      const el = stepRefs.current[idx];
      if (!el) return;
      el.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [prefersReducedMotion]
  );

  React.useEffect(() => {
    const view = searchParams.get("view");
    if (view === "reader") {
      setViewMode("reader");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

          {viewMode === "river" ? (
            <>
              <div ref={riverSceneRef} className="riverScene" style={zoomVars}>
                <WindingRiver stepCount={lesson.pages.length} />

                <div className="stoneList">
                  {lesson.pages.map((page, idx) => (
                    <button
                      key={page.index}
                      ref={(el) => {
                        stoneRefs.current[idx] = el;
                      }}
                      className={`stone ${pageIndex === idx ? "isActive" : ""}`}
                      onClick={() => {
                        setPageIndex(idx);
                        setViewMode("reader");
                      }}
                      aria-current={pageIndex === idx ? "step" : undefined}
                      style={{
                        transform: `translateX(${stoneOffsetsPx[idx] ?? 0}px)`,
                      }}
                    >
                      <span className="stoneInner">
                        <span className="stoneNumber">{idx + 1}</span>
                        {page.title ? <span className="stoneTitle">{page.title}</span> : null}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="hint muted">
                Scroll down the river path to follow each step, or click a stone to open that step. The AI guide
                (right) will always know your current step.
              </div>
            </>
          ) : (
            <div className="readerView">
              <div className="readerHeader">
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => {
                    setViewMode("river");
                    scrollToStep(pageIndex);
                  }}
                >
                  ← Back to river
                </button>
                <div>
                  <div className="kicker">Step {pageIndex + 1}</div>
                  <h2 className="readerTitle">{currentPage?.title ?? "Untitled"}</h2>
                </div>
              </div>
              <div className="readerBody">{currentPage?.body}</div>
            </div>
          )}
        </div>

        <aside className="right">
          <div className="rightInner">
            <LessonChat
              lessonId={lesson.id}
              lessonTitle={lesson.title}
              pageIndex={pageIndex}
              pageTitle={currentPage?.title ?? `Step ${pageIndex + 1}`}
              pageText={currentPage?.body ?? ""}
            />
          </div>
        </aside>

        <style jsx>{`
        .wrap {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 18px;
          align-items: stretch;
        }
        .left {
          padding: 18px;
          min-width: 0;
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
          position: relative;
          padding: 0;
          margin: 4px -4px 0 -4px;
          overflow: hidden;
          border-radius: var(--radius-xl);
          background: var(--tintMint);
        }
        .stoneList {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 160px;
          padding: 150px 0;
          justify-items: center;
        }
        .stone {
          cursor: pointer;
          position: relative;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: var(--surface);
          border: 2px solid var(--border);
          box-shadow: var(--shadowMd);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          transition: 
            transform 240ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
            width 240ms ease,
            height 240ms ease,
            border-color 240ms ease,
            box-shadow 240ms ease;
          user-select: none;
          padding: 0;
          color: inherit;
          font: inherit;
        }
        .stoneInner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px;
          gap: 2px;
        }
        .stoneNumber {
          font-size: 32px;
          font-weight: 900;
          line-height: 1;
          color: var(--text);
        }
        .stoneTitle {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          line-height: 1.2;
          color: var(--muted);
          max-width: 100px;
        }
        .stone:hover {
          border-color: rgba(33, 181, 143, 0.3);
          box-shadow: 0 10px 25px rgba(33, 181, 143, 0.15);
        }
        .stone:focus-visible {
          outline: none;
          box-shadow: inset var(--focus), 0 10px 25px rgba(33, 181, 143, 0.15);
        }
        .stone.isActive {
          width: 160px;
          height: 160px;
          border-color: var(--accentMint);
          box-shadow: 
            0 0 0 4px rgba(33, 181, 143, 0.1),
            0 15px 35px rgba(33, 181, 143, 0.25);
          background: radial-gradient(circle at 30% 30%, #fff, #f0fdfa);
          z-index: 2;
        }
        :global(html.dark) .stone.isActive {
          background: radial-gradient(circle at 30% 30%, #1a1a1a, #0d2d26);
        }
        .stone.isActive .stoneNumber {
          font-size: 42px;
          color: var(--accentMint);
        }
        .stone.isActive .stoneTitle {
          font-size: 13px;
          color: var(--text);
        }
        .hint {
          margin-top: 14px;
          font-size: 13px;
        }
        .right {
          min-width: 0;
          position: sticky;
          top: calc(var(--siteHeaderH, 72px) + 18px);
          height: calc(100dvh - var(--siteHeaderH, 72px) - 36px);
          align-self: start;
          z-index: 10;
        }
        .rightInner {
          height: 100%;
          min-height: 0;
          display: flex;
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
        .readerView {
          padding: 10px 6px;
        }
        .readerHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .readerTitle {
          margin: 4px 0 0 0;
          font-size: 28px;
          letter-spacing: -0.02em;
        }
        .readerBody {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 18px 16px;
          font-size: 15px;
          line-height: 1.6;
          white-space: pre-wrap;
          box-shadow: var(--shadowSm);
          min-height: 280px;
        }
        /* Mobile layout: stack, dock AI chat to bottom (always visible). */
        @media (max-width: 740px) {
          .wrap {
            grid-template-columns: 1fr;
            padding-bottom: calc(min(520px, 52dvh) + 16px);
          }
          .right {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            top: auto;
            height: auto;
            z-index: 50;
            padding: 0 20px 16px 20px;
          }
          .rightInner {
            max-width: var(--container);
            margin: 0 auto;
            width: 100%;
            height: min(520px, 52dvh);
            min-height: 260px;
          }
        }
        @media (max-width: 720px) {
          .riverScene {
            padding: 16px 4px 10px 4px;
          }
          .stone {
            width: 100%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .stone,
          .readerBody {
            transition: none;
          }
        }
      `}</style>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSeriesBySlug, getLessonBySlug, getLessonIndex } from "@/data/series";
import { LessonPageNav } from "@/components/LessonPageNav";
import { LessonChat } from "@/components/LessonChat";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function SeriesLessonPage({
  params,
}: {
  params: { seriesSlug: string; lessonSlug: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const series = getSeriesBySlug(params.seriesSlug);
  const lesson = getLessonBySlug(params.seriesSlug, params.lessonSlug);
  const lessonIndex = getLessonIndex(params.seriesSlug, params.lessonSlug);

  if (!series || !lesson) {
    notFound();
  }

  const totalPages = lesson.pages.length;
  const initialPage = Number(searchParams.get("page") ?? "1") - 1; // URL is 1-indexed
  const [pageIndex, setPageIndex] = React.useState(() =>
    clamp(Number.isFinite(initialPage) ? initialPage : 0, 0, Math.max(0, totalPages - 1))
  );

  const currentPage = lesson.pages[pageIndex];

  // Update URL when page changes
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pageIndex + 1)); // URL is 1-indexed
    router.replace(`?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  const handlePageChange = React.useCallback((newPage: number) => {
    setPageIndex(clamp(newPage, 0, totalPages - 1));
  }, [totalPages]);

  // Navigation to prev/next lesson in series
  const prevLesson = lessonIndex > 0 ? series.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < series.lessons.length - 1 ? series.lessons[lessonIndex + 1] : null;

  return (
    <div className="page">
      <div
        className="container lessonWrap"
        style={{ "--series-color": series.color } as React.CSSProperties}
      >
        {/* Left: Lesson content */}
        <div className="lessonContent card">
          <div className="lessonHeader">
            <Link
              href={`/learn/series/${series.slug}`}
              className="backToRiver"
            >
              ← Back to {series.title}
            </Link>
            <div className="lessonMeta">
              <span className="lessonKicker">
                Lesson {lessonIndex + 1} of {series.lessons.length}
              </span>
              <h1 className="lessonTitle">{lesson.title}</h1>
            </div>
          </div>

          <div className="pageContent">
            <h2 className="pageTitle">{currentPage?.title}</h2>
            <div className="pageBody">{currentPage?.content}</div>
          </div>

          <LessonPageNav
            currentPage={pageIndex}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            seriesColor={series.color}
          />

          {/* Lesson navigation (prev/next lesson in series) */}
          {(prevLesson || nextLesson) && (
            <div className="lessonNav">
              {prevLesson ? (
                <Link
                  href={`/learn/series/${series.slug}/${prevLesson.slug}`}
                  className="lessonNavLink lessonNavPrev"
                >
                  <span className="lessonNavDir">← Previous Lesson</span>
                  <span className="lessonNavTitle">{prevLesson.title}</span>
                </Link>
              ) : (
                <div />
              )}
              {nextLesson ? (
                <Link
                  href={`/learn/series/${series.slug}/${nextLesson.slug}`}
                  className="lessonNavLink lessonNavNext"
                >
                  <span className="lessonNavDir">Next Lesson →</span>
                  <span className="lessonNavTitle">{nextLesson.title}</span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}
        </div>

        {/* Right: AI Chat */}
        <aside className="lessonChat">
          <div className="lessonChatInner">
            <LessonChat
              lessonId={`${params.seriesSlug}/${params.lessonSlug}`}
              lessonTitle={lesson.title}
              pageIndex={pageIndex}
              pageTitle={currentPage?.title ?? `Page ${pageIndex + 1}`}
              pageText={currentPage?.content ?? ""}
            />
          </div>
        </aside>

        <style jsx>{`
          .lessonWrap {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 18px;
            align-items: stretch;
          }

          .lessonContent {
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .lessonHeader {
            border-bottom: 1px dashed var(--border);
            padding-bottom: 16px;
          }

          .backToRiver {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 14px;
            font-weight: 600;
            color: var(--series-color);
            margin-bottom: 12px;
            transition: opacity 150ms ease;
          }

          .backToRiver:hover {
            opacity: 0.8;
          }

          .lessonMeta {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .lessonKicker {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--muted);
          }

          .lessonTitle {
            margin: 0;
            font-size: 28px;
            font-weight: 900;
            letter-spacing: -0.02em;
          }

          .pageContent {
            flex: 1;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 24px;
            box-shadow: var(--shadowSm);
          }

          .pageTitle {
            margin: 0 0 16px 0;
            font-size: 20px;
            font-weight: 800;
            letter-spacing: -0.01em;
            color: var(--series-color);
          }

          .pageBody {
            font-size: 16px;
            line-height: 1.7;
            color: var(--text);
          }

          .lessonNav {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            padding-top: 16px;
            border-top: 1px dashed var(--border);
          }

          .lessonNavLink {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 12px 14px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            transition: border-color 150ms ease, background 150ms ease;
          }

          .lessonNavLink:hover {
            border-color: var(--series-color);
            background: color-mix(in srgb, var(--series-color) 6%, var(--surface));
          }

          .lessonNavNext {
            text-align: right;
          }

          .lessonNavDir {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            color: var(--series-color);
          }

          .lessonNavTitle {
            font-size: 14px;
            font-weight: 600;
            color: var(--text);
          }

          .lessonChat {
            min-width: 0;
            position: sticky;
            top: calc(var(--siteHeaderH, 72px) + 18px);
            height: calc(100dvh - var(--siteHeaderH, 72px) - 36px);
            align-self: start;
            z-index: 10;
          }

          .lessonChatInner {
            height: 100%;
            min-height: 0;
            display: flex;
          }

          @media (max-width: 800px) {
            .lessonWrap {
              grid-template-columns: 1fr;
              padding-bottom: calc(min(480px, 50dvh) + 16px);
            }

            .lessonChat {
              position: fixed;
              left: 0;
              right: 0;
              bottom: 0;
              top: auto;
              height: auto;
              z-index: 50;
              padding: 0 16px 16px 16px;
            }

            .lessonChatInner {
              max-width: var(--container);
              margin: 0 auto;
              width: 100%;
              height: min(480px, 50dvh);
              min-height: 240px;
            }
          }

          @media (max-width: 480px) {
            .lessonContent {
              padding: 16px;
            }
            .pageContent {
              padding: 16px;
            }
            .lessonTitle {
              font-size: 24px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

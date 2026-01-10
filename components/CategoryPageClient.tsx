"use client";

import Link from "next/link";
import type { LessonPage, CategoryMeta } from "@/lib/lessons/types";

function getPreview(body: string): string {
  const cleaned = body
    .split("\n")
    .filter((line) => !line.startsWith("#") && line.trim() !== "")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.length > 120 ? cleaned.slice(0, 120) + "…" : cleaned;
}

export function CategoryPageClient({
  category,
  pages,
}: {
  category: CategoryMeta;
  pages: LessonPage[];
}) {
  const accentVar =
    category.accent === "coral"
      ? "var(--accentCoral)"
      : category.accent === "lavender"
        ? "var(--accentLavender)"
        : "var(--accentMint)";

  return (
    <div className="page">
      <div className="container">
        <nav className="breadcrumb">
          <Link href="/learn" className="breadcrumbLink">
            Learn
          </Link>
          <span className="breadcrumbSep" aria-hidden="true">/</span>
          <span className="breadcrumbCurrent">{category.title}</span>
        </nav>

        <div className="categoryHeader">
          <div className="categoryDot" style={{ background: accentVar }} />
          <h1 className="pageTitle">{category.title}</h1>
          <p className="pageLead">{category.description}</p>
        </div>

        <div className="lessonList">
          {pages.map((page, idx) => (
            <Link
              key={page.index}
              href={`/learn/${category.id}?p=${page.index}`}
              className="lessonItem"
            >
              <span className="lessonNumber">{idx + 1}</span>
              <div className="lessonContent">
                <span className="lessonTitle">
                  {page.title || `Page ${page.index + 1}`}
                </span>
                <p className="lessonPreview">{getPreview(page.body)}</p>
              </div>
              <span className="lessonArrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>

        <style jsx>{`
          .breadcrumb {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 20px;
            font-size: 14px;
          }
          .breadcrumbLink {
            color: var(--muted);
            transition: color 100ms ease;
          }
          .breadcrumbLink:hover {
            color: var(--text);
          }
          .breadcrumbSep {
            color: var(--muted2);
          }
          .breadcrumbCurrent {
            color: var(--text);
            font-weight: 600;
          }
          .categoryHeader {
            display: grid;
            gap: 8px;
            margin-bottom: 28px;
          }
          .categoryDot {
            width: 14px;
            height: 14px;
            border-radius: 999px;
            box-shadow: var(--shadowXs);
          }
          .lessonList {
            display: flex;
            flex-direction: column;
            gap: 2px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadowSm);
            overflow: hidden;
          }
          .lessonItem {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 18px 20px;
            border-bottom: 1px solid var(--border);
            transition: background 100ms ease;
          }
          .lessonItem:last-child {
            border-bottom: none;
          }
          .lessonItem:hover {
            background: rgba(33, 181, 143, 0.05);
          }
          .lessonItem:focus-visible {
            outline: none;
            box-shadow: inset var(--focus);
          }
          .lessonNumber {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            background: var(--surface-2);
            border: 1px solid var(--border);
            font-weight: 700;
            font-size: 14px;
            color: var(--muted);
            flex-shrink: 0;
          }
          .lessonContent {
            flex: 1;
            min-width: 0;
          }
          .lessonTitle {
            font-weight: 600;
            letter-spacing: -0.01em;
            display: block;
          }
          .lessonPreview {
            margin: 4px 0 0 0;
            font-size: 14px;
            color: var(--muted);
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .lessonArrow {
            color: var(--muted2);
            font-size: 16px;
            flex-shrink: 0;
            transition: transform 120ms ease, color 120ms ease;
          }
          .lessonItem:hover .lessonArrow {
            color: ${accentVar};
            transform: translateX(2px);
          }
        `}</style>
      </div>
    </div>
  );
}


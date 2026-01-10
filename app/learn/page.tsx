"use client";

import Link from "next/link";
import React from "react";
import { FEATURED_LESSONS, CATEGORIES } from "@/lib/lessons/registry";
import type { FeaturedLesson, CategoryMeta } from "@/lib/lessons/types";
import {
  getRecentLessons,
  getSavedLessons,
  toggleSavedLesson,
  isLessonSaved,
  type RecentLesson,
  type SavedLesson,
} from "@/lib/lessons/storage";

type TabId = "recommended" | "recent" | "saved";

function SaveIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function LeftPanel() {
  const [activeTab, setActiveTab] = React.useState<TabId>("recommended");
  const [recent, setRecent] = React.useState<RecentLesson[]>([]);
  const [saved, setSaved] = React.useState<SavedLesson[]>([]);
  const [savedSet, setSavedSet] = React.useState<Set<string>>(new Set());

  // Load data from localStorage on mount
  React.useEffect(() => {
    setRecent(getRecentLessons());
    const savedLessons = getSavedLessons();
    setSaved(savedLessons);
    setSavedSet(new Set(savedLessons.map((l) => `${l.lessonId}-${l.pageIndex}`)));
  }, []);

  const handleToggleSave = React.useCallback(
    (lesson: { lessonId: string; pageIndex: number; title: string; description?: string }) => {
      const isSaved = toggleSavedLesson(lesson);
      const key = `${lesson.lessonId}-${lesson.pageIndex}`;
      
      setSavedSet((prev) => {
        const next = new Set(prev);
        if (isSaved) {
          next.add(key);
        } else {
          next.delete(key);
        }
        return next;
      });
      
      // Refresh saved list
      setSaved(getSavedLessons());
    },
    []
  );

  const tabs: { id: TabId; label: string }[] = [
    { id: "recommended", label: "Recommended" },
    { id: "recent", label: "Recent" },
    { id: "saved", label: "Saved" },
  ];

  return (
    <div className="leftPanel">
      <div className="leftPanelHeader">
        <h2 className="leftPanelTitle">Start here</h2>
        <p className="leftPanelLead">
          Curated reads to get you started, or pick up where you left off.
        </p>
      </div>

      <div className="tabSwitcher" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`tabBtn ${activeTab === tab.id ? "isActive" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.id === "saved" && saved.length > 0 && (
              <span className="tabBadge">{saved.length}</span>
            )}
          </button>
        ))}
      </div>

      <div className="tabContent" style={{ maxHeight: 260, overflowY: 'auto' }}>
        {activeTab === "recommended" && (
          <div className="lessonList">
            {FEATURED_LESSONS.map((lesson) => (
              <LessonRow
                key={`${lesson.lessonId}-${lesson.pageIndex}`}
                lessonId={lesson.lessonId}
                pageIndex={lesson.pageIndex}
                title={lesson.title}
                description={lesson.description}
                tag={lesson.tag}
                isSaved={savedSet.has(`${lesson.lessonId}-${lesson.pageIndex}`)}
                onToggleSave={() =>
                  handleToggleSave({
                    lessonId: lesson.lessonId,
                    pageIndex: lesson.pageIndex,
                    title: lesson.title,
                    description: lesson.description,
                  })
                }
              />
            ))}
          </div>
        )}

        {activeTab === "recent" && (
          <>
            {recent.length === 0 ? (
              <EmptyState
                title="No recent lessons yet"
                message="Lessons you read will appear here, so you can pick up where you left off."
              />
            ) : (
              <div className="lessonList">
                {recent.map((lesson) => (
                  <LessonRow
                    key={`${lesson.lessonId}-${lesson.pageIndex}-${lesson.timestamp}`}
                    lessonId={lesson.lessonId}
                    pageIndex={lesson.pageIndex}
                    title={lesson.title}
                    isSaved={savedSet.has(`${lesson.lessonId}-${lesson.pageIndex}`)}
                    onToggleSave={() =>
                      handleToggleSave({
                        lessonId: lesson.lessonId,
                        pageIndex: lesson.pageIndex,
                        title: lesson.title,
                      })
                    }
                  />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "saved" && (
          <>
            {saved.length === 0 ? (
              <EmptyState
                title="Nothing saved yet"
                message="Tap the bookmark icon on any lesson to save it for later."
              />
            ) : (
              <div className="lessonList">
                {saved.map((lesson) => (
                  <LessonRow
                    key={`${lesson.lessonId}-${lesson.pageIndex}-${lesson.savedAt}`}
                    lessonId={lesson.lessonId}
                    pageIndex={lesson.pageIndex}
                    title={lesson.title}
                    description={lesson.description}
                    isSaved={true}
                    onToggleSave={() =>
                      handleToggleSave({
                        lessonId: lesson.lessonId,
                        pageIndex: lesson.pageIndex,
                        title: lesson.title,
                        description: lesson.description,
                      })
                    }
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        .leftPanel {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadowSm);
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .leftPanelHeader {
          padding: 24px 24px 18px;
          border-bottom: 1px solid var(--border);
        }
        .leftPanelTitle {
          margin: 0 0 6px 0;
          font-size: 24px;
          font-weight: 950;
          letter-spacing: -0.02em;
        }
        .leftPanelLead {
          margin: 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.45;
        }
        .tabSwitcher {
          display: flex;
          gap: 4px;
          padding: 12px 16px 0;
          border-bottom: 1px solid var(--border);
        }
        .tabBtn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          border: none;
          background: transparent;
          color: var(--muted);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 10px 10px 0 0;
          position: relative;
          transition: color 120ms ease, background 120ms ease;
        }
        .tabBtn:hover {
          color: var(--text);
          background: rgba(33, 181, 143, 0.06);
        }
        .tabBtn.isActive {
          color: var(--text);
          background: rgba(33, 181, 143, 0.08);
        }
        .tabBtn.isActive::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accentMint);
          border-radius: 2px 2px 0 0;
        }
        .tabBadge {
          font-size: 11px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 999px;
          background: rgba(33, 181, 143, 0.12);
          color: var(--accentMint);
        }
        .tabContent {
          overflow-y: auto;
          padding: 8px;
          /* Show ~4 lessons initially, scroll for more */
          height: 280px;
          max-height: 280px;
        }
        .tabContent::-webkit-scrollbar {
          width: 6px;
        }
        .tabContent::-webkit-scrollbar-track {
          background: transparent;
        }
        .tabContent::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 999px;
        }
        .tabContent::-webkit-scrollbar-thumb:hover {
          background: var(--borderStrong);
        }
        .lessonList {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}

function LessonRow({
  lessonId,
  pageIndex,
  title,
  description,
  tag,
  isSaved,
  onToggleSave,
}: {
  lessonId: string;
  pageIndex: number;
  title: string;
  description?: string;
  tag?: string;
  isSaved: boolean;
  onToggleSave: () => void;
}) {
  const tagColors: Record<string, string> = {
    "Good first read": "var(--accentMint)",
    Popular: "var(--accentLavender)",
    Short: "var(--accentCoral)",
    Foundational: "var(--accentMint)",
  };

  return (
    <div className="lessonRow">
      <Link href={`/learn/${lessonId}?p=${pageIndex}`} className="lessonRowLink">
        <div className="lessonRowContent">
          <div className="lessonRowTop">
            <span className="lessonRowTitle">{title}</span>
            {tag && (
              <span
                className="lessonRowTag"
                style={{ "--tagColor": tagColors[tag] ?? "var(--muted)" } as React.CSSProperties}
              >
                {tag}
              </span>
            )}
          </div>
          {description && <p className="lessonRowDesc">{description}</p>}
        </div>
        <span className="lessonRowArrow" aria-hidden="true">
          →
        </span>
      </Link>
      <button
        type="button"
        className={`saveBtn ${isSaved ? "isSaved" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleSave();
        }}
        aria-label={isSaved ? "Remove from saved" : "Save for later"}
      >
        <SaveIcon filled={isSaved} />
      </button>
      <style jsx>{`
        .lessonRow {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px;
        }
        .lessonRowLink {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 14px;
          border-radius: var(--radius-md);
          transition: background 100ms ease;
          min-width: 0;
        }
        .lessonRowLink:hover {
          background: rgba(33, 181, 143, 0.06);
        }
        .lessonRowLink:focus-visible {
          outline: none;
          box-shadow: inset var(--focus);
        }
        .lessonRowContent {
          flex: 1;
          min-width: 0;
        }
        .lessonRowTop {
          display: flex;
          align-items: baseline;
          gap: 10px;
          flex-wrap: wrap;
        }
        .lessonRowTitle {
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .lessonRowTag {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--tagColor);
          padding: 3px 8px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--tagColor) 12%, transparent);
        }
        .lessonRowDesc {
          margin: 4px 0 0 0;
          font-size: 14px;
          color: var(--muted);
          line-height: 1.4;
        }
        .lessonRowArrow {
          color: var(--muted2);
          font-size: 16px;
          flex-shrink: 0;
          transition: transform 120ms ease, color 120ms ease;
        }
        .lessonRowLink:hover .lessonRowArrow {
          color: var(--accentMint);
          transform: translateX(2px);
        }
        .saveBtn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--muted2);
          cursor: pointer;
          transition: color 120ms ease, border-color 120ms ease, background 120ms ease;
          flex-shrink: 0;
        }
        .saveBtn:hover {
          color: var(--accentMint);
          border-color: rgba(33, 181, 143, 0.3);
          background: rgba(33, 181, 143, 0.06);
        }
        .saveBtn.isSaved {
          color: var(--accentMint);
          border-color: rgba(33, 181, 143, 0.3);
          background: rgba(33, 181, 143, 0.08);
        }
        .saveBtn:focus-visible {
          outline: none;
          box-shadow: var(--focus);
        }
      `}</style>
    </div>
  );
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="emptyState">
      <div className="emptyStateIcon" aria-hidden="true">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
        </svg>
      </div>
      <h3 className="emptyStateTitle">{title}</h3>
      <p className="emptyStateMessage">{message}</p>
      <style jsx>{`
        .emptyState {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 48px 24px;
          min-height: 240px;
        }
        .emptyStateIcon {
          color: var(--muted2);
          margin-bottom: 16px;
          opacity: 0.6;
        }
        .emptyStateTitle {
          margin: 0 0 8px 0;
          font-size: 17px;
          font-weight: 700;
          color: var(--text);
        }
        .emptyStateMessage {
          margin: 0;
          font-size: 15px;
          color: var(--muted);
          max-width: 28ch;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}

function CategoryCard({ category }: { category: CategoryMeta }) {
  const accentVar =
    category.accent === "coral"
      ? "var(--accentCoral)"
      : category.accent === "lavender"
        ? "var(--accentLavender)"
        : "var(--accentMint)";

  return (
    <Link href={`/learn/category/${category.id}`} className="categoryItem">
      <div className="categoryContent">
        <h3 className="categoryTitle">{category.title}</h3>
        <p className="categoryDesc">{category.description}</p>
      </div>
      <span className="categoryArrow" aria-hidden="true">→</span>
      <style jsx>{`
        .categoryItem {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 14px 16px 24px;
          background: transparent;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          position: relative;
          z-index: 1;
          transition: background 200ms ease;
        }
        .categoryItem::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          /* Soft, readable fill in the topic's accent color */
          background: linear-gradient(to right, ${accentVar} 0%, ${accentVar} 100%);
          transform: scaleX(0);
          transform-origin: left center;
          opacity: 0.12;
          transition: transform 260ms ease;
          pointer-events: none;
          z-index: 0;
        }
        .categoryItem:is(:hover, :focus-visible)::before {
          transform: scaleX(1);
        }
        :global(html.dark) .categoryItem::before {
          opacity: 0.14;
        }
        .categoryItem:focus-visible {
          outline: none;
          box-shadow: inset var(--focus);
        }
        @media (prefers-reduced-motion: reduce) {
          .categoryItem::before {
            transition: none;
          }
        }
        /* Desktop: let the accent fill originate from the left gradient strip */
        @media (min-width: 901px) {
          .categoryItem::before {
            left: -16px;
            right: 0;
            /* With left:-16px, set the origin 16px in so the fill starts at the strip (x=0). */
            transform-origin: 16px center;
          }
        }
        .categoryContent {
          flex: 1;
          min-width: 0;
          position: relative;
          z-index: 1;
        }
        .categoryTitle {
          margin: 0;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--text);
          line-height: 1.3;
        }
        .categoryDesc {
          margin: 4px 0 0 0;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.4;
        }
        .categoryArrow {
          color: var(--muted2);
          font-size: 16px;
          transition: transform 140ms ease, color 140ms ease;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }
        .categoryItem:hover .categoryArrow {
          transform: translateX(2px);
          color: ${accentVar};
        }
      `}</style>
    </Link>
  );
}

export default function LearnIndexPage() {
  return (
    <div className="page">
      <div className="container">
        <div className="pageHeader">
          <h1 className="pageTitle">Learn</h1>
          <p className="pageLead">
            Simple explanations written for adults. Take your time — there's no rush.
          </p>
        </div>

        <div className="learnLayout">
          <div className="learnPrimary">
            <LeftPanel />
          </div>
          <div className="learnSecondary">
            <div className="categoriesHeader">
              <h2 className="categoriesTitle">Topics</h2>
            </div>
            <div className="categoriesStack">
              {CATEGORIES.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          .learnLayout {
            display: grid;
            grid-template-columns: 1fr 320px;
            gap: 24px;
            align-items: stretch;
          }
          .learnPrimary {
            min-width: 0;
            display: flex;
            flex-direction: column;
          }
          .learnSecondary {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .categoriesHeader {
            padding: 0 4px;
            margin-bottom: 4px;
          }
          .categoriesTitle {
            margin: 0;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--muted2);
          }
          .categoriesStack {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 0;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius-xl);
            padding: 6px;
            padding-left: 16px;
            position: relative;
            overflow: hidden;
            flex: 1;
          }
          .categoriesStack::before {
            content: "";
            position: absolute;
            left: 0;
            top: 6px;
            bottom: 6px;
            width: 5px;
            border-radius: 0 3px 3px 0;
            background: linear-gradient(
              to bottom,
              var(--accentMint) 0%,
              var(--accentMint) 28%,
              var(--accentLavender) 38%,
              var(--accentLavender) 61%,
              var(--accentCoral) 71%,
              var(--accentCoral) 100%
            );
            /* Keep the strip visually on top so hover fills feel like they emanate from it. */
            z-index: 2;
            pointer-events: none;
          }
          @media (max-width: 900px) {
            .learnLayout {
              grid-template-columns: 1fr;
            }
            .learnSecondary {
              order: 2;
            }
            .learnPrimary {
              order: 1;
            }
            .categoriesStack {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
              gap: 14px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

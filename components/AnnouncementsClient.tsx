"use client";

import React from "react";
import { FeedControls, SortMode, ViewMode } from "@/components/FeedControls";
import type { Announcement } from "@/data/announcements";

function byName(a: string, b: string) {
  return a.localeCompare(b, undefined, { sensitivity: "base" });
}

function byDate(a: string, b: string) {
  return new Date(a).getTime() - new Date(b).getTime();
}

export function AnnouncementsClient({ items }: { items: Announcement[] }) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortMode>("date-new");
  const [view, setView] = React.useState<ViewMode>("list");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = !q
      ? items
      : items.filter((it) => {
          const hay = `${it.authorName} ${it.handle} ${it.preview}`.toLowerCase();
          return hay.includes(q);
        });

    const sorted = [...base];
    sorted.sort((a, b) => {
      if (sort === "name-asc") return byName(a.authorName, b.authorName);
      if (sort === "name-desc") return byName(b.authorName, a.authorName);
      if (sort === "date-old") return byDate(a.date, b.date);
      return byDate(b.date, a.date);
    });
    return sorted;
  }, [items, query, sort]);

  return (
    <>
      <FeedControls
        query={query}
        setQuery={setQuery}
        sort={sort}
        setSort={setSort}
        view={view}
        setView={setView}
      />

      <div className={view === "grid" ? "grid" : "list"}>
        {filtered.map((a) => (
          <a key={a.id} className="card item" href={a.url} target="_blank" rel="noreferrer">
            <div className="top">
              <div className="who">
                <div className="name">{a.authorName}</div>
                <div className="handle muted">{a.handle}</div>
              </div>
              <div className="date muted">{a.date}</div>
            </div>
            <pre className="preview">{a.preview}</pre>
            <div className="open muted">Open on X →</div>
          </a>
        ))}
      </div>

      <style jsx>{`
        .list {
          display: grid;
          gap: 14px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 14px;
        }
        .item {
          padding: 18px;
          display: grid;
          gap: 10px;
        }
        .grid .item {
          grid-column: span 6;
        }
        .top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .name {
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .preview {
          margin: 0;
          white-space: pre-wrap;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
          color: var(--text);
        }
        .open {
          font-size: 13px;
        }
        @media (max-width: 980px) {
          .grid .item {
            grid-column: span 12;
          }
        }
      `}</style>
    </>
  );
}



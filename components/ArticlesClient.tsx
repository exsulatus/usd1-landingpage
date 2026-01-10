"use client";

import React from "react";
import { FeedControls, SortMode, ViewMode } from "@/components/FeedControls";
import type { Article } from "@/data/articles";

function byName(a: string, b: string) {
  return a.localeCompare(b, undefined, { sensitivity: "base" });
}

function byDate(a: string, b: string) {
  return new Date(a).getTime() - new Date(b).getTime();
}

export function ArticlesClient({ items }: { items: Article[] }) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortMode>("date-new");
  const [view, setView] = React.useState<ViewMode>("grid");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = !q
      ? items
      : items.filter((it) => {
          const hay = `${it.authorName} ${it.title}`.toLowerCase();
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
            <div className="title">{a.title}</div>
            <div className="meta muted">
              {a.date} • {a.authorName}
            </div>
            <div className="open muted">Open article →</div>
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
          min-height: 140px;
        }
        .grid .item {
          grid-column: span 4;
        }
        .title {
          font-weight: 900;
          letter-spacing: -0.02em;
        }
        .meta {
          font-size: 13px;
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





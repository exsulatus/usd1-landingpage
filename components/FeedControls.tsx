"use client";

import React from "react";

export type SortMode = "name-asc" | "name-desc" | "date-new" | "date-old";
export type ViewMode = "list" | "grid";

export function FeedControls({
  query,
  setQuery,
  sort,
  setSort,
  view,
  setView
}: {
  query: string;
  setQuery: (v: string) => void;
  sort: SortMode;
  setSort: (v: SortMode) => void;
  view: ViewMode;
  setView: (v: ViewMode) => void;
}) {
  return (
    <div className="controls card">
      <div className="row">
        <label className="field">
          <span className="label">Filter</span>
          <input
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a name or keyword…"
          />
        </label>

        <label className="field">
          <span className="label">Sort</span>
          <select className="input" value={sort} onChange={(e) => setSort(e.target.value as SortMode)}>
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
            <option value="date-new">Date (newest)</option>
            <option value="date-old">Date (oldest)</option>
          </select>
        </label>

        <label className="field">
          <span className="label">View</span>
          <div className="toggle">
            <button className={view === "list" ? "btn btnPrimary" : "btn"} type="button" onClick={() => setView("list")}>
              List
            </button>
            <button className={view === "grid" ? "btn btnPrimary" : "btn"} type="button" onClick={() => setView("grid")}>
              Grid
            </button>
          </div>
        </label>
      </div>

      <style jsx>{`
        .controls {
          padding: 16px;
          margin: 18px 0;
        }
        .row {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr 0.9fr;
          gap: 14px;
          align-items: end;
        }
        .field {
          display: grid;
          gap: 6px;
        }
        .label {
          font-size: 12px;
          color: var(--muted);
        }
        .input {
          width: 100%;
          border-radius: 16px;
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
        .toggle {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        @media (max-width: 980px) {
          .row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}



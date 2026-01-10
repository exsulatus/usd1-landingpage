"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IconSearch } from "@/components/icons";

type SearchResult = {
  id: string;
  title: string;
  type: "lesson" | "section" | "concept";
  href: string;
  snippet: string;
  pinned?: boolean;
};

function typeLabel(t: SearchResult["type"]) {
  if (t === "lesson") return "Lesson";
  if (t === "section") return "Section";
  return "Concept";
}

export function HeaderSearch() {
  const router = useRouter();
  const pathname = usePathname();

  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const [expanded, setExpanded] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<SearchResult[]>([]);

  React.useEffect(() => {
    function onOpenSearch() {
      setExpanded(true);
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }

    window.addEventListener("usd1:open-search", onOpenSearch);
    return () => window.removeEventListener("usd1:open-search", onOpenSearch);
  }, []);

  React.useEffect(() => {
    // Close the panel on navigation so it feels “done” after a click.
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setExpanded(false);
        setQuery("");
        setResults([]);
        setLoading(false);
      }
      if (e.key === "Enter" && expanded && open && results.length > 0 && document.activeElement === inputRef.current) {
        e.preventDefault();
        router.push(results[0].href);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded, open, results, router]);

  React.useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      const el = wrapRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setOpen(false);
        if (!query.trim()) setExpanded(false);
      }
    }
    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, [query]);

  React.useEffect(() => {
    const q = query.trim();
    if (!expanded) return;

    if (q.length < 2) {
      setResults([]);
      setLoading(false);
      setOpen(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const t = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`Search failed: ${res.status}`);
        const data = (await res.json()) as { results: SearchResult[] };
        setResults(data.results ?? []);
        setOpen(true);
      } catch (err) {
        if ((err as { name?: string })?.name === "AbortError") return;
        setResults([]);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }, 220);

    return () => {
      controller.abort();
      window.clearTimeout(t);
    };
  }, [expanded, query]);

  const showPanel = expanded && (open || loading);
  const hasResults = results.length > 0;
  const showEmpty = !loading && query.trim().length >= 2 && results.length === 0;

  return (
    <div ref={wrapRef} className={`headerSearch ${expanded ? "isExpanded" : ""}`}>
      <div className="headerSearchInner">
        <input
          ref={inputRef}
          className="headerSearchInput"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search concepts, lessons…"
          aria-label="Search"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls="headerSearchPanel"
          aria-autocomplete="list"
          onFocus={() => {
            setExpanded(true);
            if (query.trim().length >= 2) setOpen(true);
          }}
        />

        <button
          type="button"
          className="siteHeaderIconBtn headerSearchIconBtn"
          aria-label={expanded ? "Close search" : "Open search"}
          aria-expanded={expanded}
          onClick={() => {
            setExpanded((v) => {
              const next = !v;
              if (next) {
                window.setTimeout(() => inputRef.current?.focus(), 0);
              } else {
                setQuery("");
                setResults([]);
                setOpen(false);
                setLoading(false);
              }
              return next;
            });
          }}
        >
          <IconSearch />
        </button>
      </div>

      {showPanel ? (
        <div id="headerSearchPanel" className="headerSearchPanel" role="listbox" aria-label="Search results">
          {loading ? <div className="headerSearchStatus">Searching…</div> : null}

          {hasResults ? (
            <div className="headerSearchList">
              {results.map((r) => (
                <Link
                  key={r.id}
                  href={r.href}
                  className={`headerSearchItem ${r.pinned ? "isPinned" : ""}`}
                  role="option"
                  aria-selected="false"
                  onClick={() => setOpen(false)}
                >
                  <div className="headerSearchItemTop">
                    <div className="headerSearchTitle">{r.title}</div>
                    <div className="headerSearchMeta">
                      {r.pinned ? <span className="headerSearchPinned">Pinned</span> : null}
                      <span className="headerSearchType">{typeLabel(r.type)}</span>
                    </div>
                  </div>
                  <div className="headerSearchSnippet">{r.snippet}</div>
                </Link>
              ))}
            </div>
          ) : null}

          {showEmpty ? (
            <div className="headerSearchEmpty">
              <div className="headerSearchEmptyTitle">Nothing yet.</div>
              <div className="headerSearchEmptyText">
                We’re adding more lessons and concept notes over time. Try a broader word like “money” or “learn”.
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}



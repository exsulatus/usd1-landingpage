"use client";

import Link from "next/link";
import type { Series } from "@/data/series";

interface SeriesCardProps {
  series: Series;
}

export function SeriesCard({ series }: SeriesCardProps) {
  const lessonCount = series.lessons.length;

  return (
    <Link
      href={`/learn/series/${series.slug}`}
      className="seriesCard"
      style={{ "--series-color": series.color } as React.CSSProperties}
    >
      <div className="seriesCardAccent" aria-hidden="true" />
      <div className="seriesCardContent">
        <h3 className="seriesCardTitle">{series.title}</h3>
        <p className="seriesCardDesc">{series.description}</p>
        <div className="seriesCardMeta">
          <span className="seriesCardCount">
            {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
          </span>
        </div>
      </div>
      <span className="seriesCardArrow" aria-hidden="true">
        →
      </span>

      <style jsx>{`
        .seriesCard {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 20px 20px 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          position: relative;
          overflow: hidden;
          transition: border-color 180ms ease, box-shadow 180ms ease;
        }

        .seriesCard:hover {
          border-color: color-mix(in srgb, var(--series-color) 40%, var(--border));
          box-shadow: 0 4px 20px color-mix(in srgb, var(--series-color) 12%, transparent);
        }

        .seriesCard:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--series-color);
        }

        .seriesCardAccent {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 5px;
          background: var(--series-color);
          border-radius: 0 3px 3px 0;
          opacity: 0.85;
          transition: width 180ms ease;
        }

        .seriesCard:hover .seriesCardAccent {
          width: 7px;
        }

        .seriesCardContent {
          flex: 1;
          min-width: 0;
        }

        .seriesCardTitle {
          margin: 0 0 6px 0;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text);
        }

        .seriesCardDesc {
          margin: 0 0 10px 0;
          font-size: 14px;
          color: var(--muted);
          line-height: 1.45;
        }

        .seriesCardMeta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .seriesCardCount {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--series-color);
          padding: 4px 10px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--series-color) 12%, transparent);
        }

        .seriesCardArrow {
          font-size: 20px;
          color: var(--muted2);
          transition: transform 140ms ease, color 140ms ease;
          flex-shrink: 0;
        }

        .seriesCard:hover .seriesCardArrow {
          transform: translateX(4px);
          color: var(--series-color);
        }

        @media (max-width: 600px) {
          .seriesCard {
            padding: 16px 16px 16px 20px;
          }
          .seriesCardTitle {
            font-size: 16px;
          }
        }
      `}</style>
    </Link>
  );
}

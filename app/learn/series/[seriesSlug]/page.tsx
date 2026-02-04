"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { getSeriesBySlug } from "@/data/series";
import { SeriesRiver } from "@/components/SeriesRiver";

export default function SeriesPage({
  params,
}: {
  params: { seriesSlug: string };
}) {
  const series = getSeriesBySlug(params.seriesSlug);

  if (!series) {
    notFound();
  }

  return (
    <div className="page">
      <div className="container">
        <div className="seriesHeader">
          <Link href="/learn" className="backLink">
            ← All Series
          </Link>
          <div
            className="seriesAccent"
            style={{ "--series-color": series.color } as React.CSSProperties}
          />
          <h1 className="seriesTitle">{series.title}</h1>
          <p className="seriesDesc">{series.description}</p>
          <p className="seriesHint">
            Click a stepping stone to start a lesson. Each stone is one lesson.
          </p>
        </div>

        <SeriesRiver series={series} />

        <style jsx>{`
          .seriesHeader {
            margin-bottom: 32px;
            position: relative;
          }
          .backLink {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 14px;
            font-weight: 600;
            color: var(--muted);
            margin-bottom: 16px;
            transition: color 150ms ease;
          }
          .backLink:hover {
            color: var(--text);
          }
          .seriesAccent {
            width: 48px;
            height: 5px;
            background: var(--series-color);
            border-radius: 3px;
            margin-bottom: 12px;
            opacity: 0.85;
          }
          .seriesTitle {
            margin: 0 0 8px 0;
            font-size: 32px;
            font-weight: 950;
            letter-spacing: -0.03em;
          }
          .seriesDesc {
            margin: 0 0 8px 0;
            font-size: 17px;
            color: var(--muted);
            line-height: 1.5;
            max-width: 48ch;
          }
          .seriesHint {
            margin: 0;
            font-size: 14px;
            color: var(--muted2);
          }
        `}</style>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { SERIES } from "@/data/series";
import { SeriesCard } from "@/components/SeriesCard";

export default function LearnIndexPage() {
  return (
    <div className="page">
      <div className="container">
        <div className="pageHeader">
          <h1 className="pageTitle">Learn</h1>
          <p className="pageLead">
            Choose a series and follow the river. Each stepping stone is a lesson.
            Take your time — there's no rush.
          </p>
        </div>

        <div className="seriesGrid">
          {SERIES.map((series) => (
            <SeriesCard key={series.slug} series={series} />
          ))}
        </div>

        <style jsx>{`
          .pageHeader {
            margin-bottom: 32px;
          }
          .pageTitle {
            margin: 0 0 8px 0;
            font-size: 36px;
            font-weight: 950;
            letter-spacing: -0.03em;
          }
          .pageLead {
            margin: 0;
            font-size: 17px;
            color: var(--muted);
            line-height: 1.5;
            max-width: 48ch;
          }
          .seriesGrid {
            display: grid;
            gap: 16px;
          }
          @media (min-width: 700px) {
            .seriesGrid {
              grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
              gap: 20px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

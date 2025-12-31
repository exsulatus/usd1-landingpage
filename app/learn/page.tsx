"use client";

import { LESSONS } from "@/lib/lessons/registry";
import { LinkCard } from "@/components/LinkCard";

export default function LearnIndexPage() {
  return (
    <div className="page">
      <div className="container">
        <div className="pageHeader">
          <h1 className="pageTitle">Learn</h1>
          <p className="pageLead">
            These lessons are written in simple words (3rd-grade reading level) but made for adults.
            They’re split into pages so you can move step-by-step.
          </p>
        </div>

        <div className="cardGrid">
          {LESSONS.map((l, idx) => (
            <div key={l.id} style={{ gridColumn: "span 4" }}>
              <LinkCard
                href={`/learn/${l.id}`}
                title={l.title}
                description={l.summary}
                accent={idx === 0 ? "blue" : idx === 1 ? "mint" : "violet"}
              />
            </div>
          ))}
        </div>

        <style jsx>{`
          @media (max-width: 980px) {
            div[style*="grid-column"] {
              grid-column: span 12 !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}



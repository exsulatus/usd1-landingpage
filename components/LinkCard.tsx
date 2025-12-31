"use client";

import Link from "next/link";
import React from "react";

export function LinkCard({
  href,
  title,
  description,
  accent = "blue"
}: {
  href: string;
  title: string;
  description: string;
  accent?: "blue" | "red" | "mint" | "violet" | "gold";
}) {
  const accentVar =
    accent === "red"
      ? "var(--accentRed)"
      : accent === "mint"
        ? "var(--accentMint)"
        : accent === "violet"
          ? "var(--accentViolet)"
          : accent === "gold"
            ? "var(--accentGold)"
            : "var(--accentBlue)";

  return (
    <Link className="card linkCard" href={href}>
      <div className="top">
        <div className="dot" aria-hidden="true" />
        <h3 className="title">{title}</h3>
      </div>
      <p className="desc">{description}</p>
      <div className="ctaRow">
        <span className="cta">Open</span>
        <span className="arrow" aria-hidden="true">
          →
        </span>
      </div>
      <style jsx>{`
        .linkCard {
          display: grid;
          gap: 12px;
          padding: 20px;
          min-height: 180px;
          position: relative;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .linkCard:focus-visible {
          outline: none;
          box-shadow: var(--focus);
          border-color: rgba(33, 181, 143, 0.26);
        }
        .linkCard:before {
          content: "";
          position: absolute;
          top: -56px;
          right: -72px;
          width: 220px;
          height: 220px;
          background: ${accentVar};
          opacity: 0.10;
          border-radius: 70px;
          transform: rotate(12deg);
          pointer-events: none;
        }
        .top {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 1;
        }
        .dot {
          width: 14px;
          height: 14px;
          border-radius: 999px;
          background: ${accentVar};
          box-shadow: var(--shadowXs);
        }
        .title {
          margin: 0;
          letter-spacing: -0.02em;
          font-size: 20px;
        }
        .desc {
          margin: 0;
          color: var(--muted);
          position: relative;
          z-index: 1;
        }
        .ctaRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border);
          padding-top: 12px;
          color: var(--muted);
          position: relative;
          z-index: 1;
          margin-top: auto;
        }
        .cta {
          font-weight: 700;
          color: var(--text);
        }
      `}</style>
    </Link>
  );
}



"use client";

import Link from "next/link";

export function LearnSpotlight({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/learn"
      className={`learnSpotlightCard card ${className}`}
      aria-label="Read: What money actually is"
    >
      <span className="learnSpotlightStrip" aria-hidden="true" />
      <span className="learnSpotlightWash" aria-hidden="true" />

      <span className="learnSpotlightContent">
        <span className="learnSpotlightTopRow">
          <span className="learnSpotlightEyebrow">IN FOCUS</span>
          <span className="learnSpotlightMeta">5 min · Basics</span>
        </span>

        <span className="learnSpotlightTitle">What money actually is</span>
        <span className="learnSpotlightBody">
          A calm starting point for understanding value, coordination, and why money shows up everywhere.
        </span>

        <span className="learnSpotlightCta">Read →</span>
      </span>

      <style jsx>{`
        .learnSpotlightCard {
          display: block;
          width: 100%;
          padding: 28px 32px;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadowMd);
        }

        /* Override the global .card hover lift/glow for this editorial card */
        .learnSpotlightCard.card:hover {
          transform: none;
          box-shadow: var(--shadowMd);
          border-color: rgba(17, 24, 39, 0.08);
        }
        :global(html.dark) .learnSpotlightCard.card:hover {
          border-color: rgba(255, 255, 255, 0.10);
        }

        .learnSpotlightStrip {
          position: absolute;
          inset: 0 auto 0 0;
          width: 6px;
          background: linear-gradient(180deg, var(--accentLavender) 0%, var(--accentMint) 100%);
          opacity: 0.9;
          z-index: 2;
          pointer-events: none;
        }

        .learnSpotlightWash {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 320ms ease;
          background: linear-gradient(
            90deg,
            rgba(123, 108, 255, 0.1) 0%,
            rgba(33, 181, 143, 0.1) 50%,
            rgba(123, 108, 255, 0.1) 100%
          );
          background-size: 200% 100%;
          background-position: 0% 0%;
          will-change: background-position, opacity;
        }

        .learnSpotlightCard:hover .learnSpotlightWash {
          opacity: 1;
          animation: learnSpotlightWash 800ms ease both;
        }

        @keyframes learnSpotlightWash {
          from {
            background-position: 0% 0%;
          }
          to {
            background-position: 100% 0%;
          }
        }

        .learnSpotlightContent {
          position: relative;
          z-index: 3;
          display: grid;
          gap: 12px;
        }

        .learnSpotlightTopRow {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
        }

        .learnSpotlightEyebrow {
          font-weight: 900;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted2);
        }

        .learnSpotlightMeta {
          font-weight: 800;
          font-size: 12px;
          color: var(--muted2);
          white-space: nowrap;
        }

        .learnSpotlightTitle {
          font-size: 24px;
          font-weight: 950;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }

        .learnSpotlightBody {
          color: var(--muted);
          font-size: 17px;
          line-height: 1.55;
          max-width: 54ch;
        }

        .learnSpotlightCta {
          margin-top: 6px;
          font-weight: 900;
          letter-spacing: -0.01em;
          width: fit-content;
        }
      `}</style>
    </Link>
  );
}



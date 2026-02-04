"use client";

import React from "react";

interface LessonPageNavProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  seriesColor?: string;
}

/**
 * Internal page navigation for stepping through pages within a lesson.
 * Provides Prev/Next buttons and a "Page X of Y" indicator.
 */
export function LessonPageNav({
  currentPage,
  totalPages,
  onPageChange,
  seriesColor = "var(--accentMint)",
}: LessonPageNavProps) {
  const hasPrev = currentPage > 0;
  const hasNext = currentPage < totalPages - 1;

  return (
    <div
      className="lessonPageNav"
      style={{ "--series-color": seriesColor } as React.CSSProperties}
    >
      <button
        type="button"
        className="navBtn navBtnPrev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        aria-label="Previous page"
      >
        <span className="navBtnArrow">←</span>
        <span className="navBtnLabel">Prev</span>
      </button>

      <div className="pageIndicator">
        <span className="pageIndicatorCurrent">{currentPage + 1}</span>
        <span className="pageIndicatorSep">/</span>
        <span className="pageIndicatorTotal">{totalPages}</span>
      </div>

      <button
        type="button"
        className="navBtn navBtnNext"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        aria-label="Next page"
      >
        <span className="navBtnLabel">Next</span>
        <span className="navBtnArrow">→</span>
      </button>

      <style jsx>{`
        .lessonPageNav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 16px 0;
        }

        .navBtn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--surface);
          color: var(--text);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 150ms ease, background 150ms ease,
            color 150ms ease, transform 150ms ease;
        }

        .navBtn:hover:not(:disabled) {
          border-color: var(--series-color);
          background: color-mix(in srgb, var(--series-color) 8%, var(--surface));
        }

        .navBtn:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--series-color);
        }

        .navBtn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .navBtnArrow {
          font-size: 16px;
          transition: transform 150ms ease;
        }

        .navBtn:hover:not(:disabled) .navBtnArrow {
          transform: translateX(2px);
        }

        .navBtnPrev:hover:not(:disabled) .navBtnArrow {
          transform: translateX(-2px);
        }

        .pageIndicator {
          display: flex;
          align-items: baseline;
          gap: 4px;
          font-size: 15px;
          color: var(--muted);
          min-width: 60px;
          justify-content: center;
        }

        .pageIndicatorCurrent {
          font-weight: 800;
          color: var(--series-color);
          font-size: 18px;
        }

        .pageIndicatorSep {
          color: var(--muted2);
        }

        .pageIndicatorTotal {
          font-weight: 600;
        }

        @media (max-width: 480px) {
          .navBtnLabel {
            display: none;
          }
          .navBtn {
            padding: 10px 12px;
          }
        }
      `}</style>
    </div>
  );
}

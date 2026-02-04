"use client";

import React from "react";
import Link from "next/link";
import type { Series } from "@/data/series";

interface SeriesRiverProps {
  series: Series;
}

/**
 * A winding river UI where each stepping stone represents a lesson in the series.
 * Uses the series accent color for active/highlight states.
 */
export function SeriesRiver({ series }: SeriesRiverProps) {
  const lessonCount = series.lessons.length;
  const stepHeight = 200;
  const paddingY = 120;
  const calculatedHeight = Math.max(600, lessonCount * stepHeight + paddingY * 2);
  const riverWidth = 80;
  const amplitude = 45;
  const centerX = 150;

  // Generate the river path using sine wave
  const pathD = React.useMemo(() => {
    const points: { x: number; y: number }[] = [];
    const stepSize = 20;

    for (let y = -100; y <= calculatedHeight + 100; y += stepSize) {
      const waveLength = stepHeight * 2.5;
      const x = centerX + Math.sin((y / waveLength) * Math.PI * 2) * amplitude;
      points.push({ x, y });
    }

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const segmentHeight = curr.y - prev.y;
      const cp1y = prev.y + segmentHeight * 0.5;
      const cp2y = curr.y - segmentHeight * 0.5;
      d += ` C ${prev.x} ${cp1y}, ${curr.x} ${cp2y}, ${curr.x} ${curr.y}`;
    }
    return d;
  }, [calculatedHeight]);

  // Calculate stone positions that follow the river
  const stonePositions = React.useMemo(() => {
    return series.lessons.map((_, idx) => {
      const y = paddingY + idx * stepHeight;
      const waveLength = stepHeight * 2.5;
      const x = centerX + Math.sin((y / waveLength) * Math.PI * 2) * amplitude;
      return { x, y };
    });
  }, [series.lessons]);

  const maskId = React.useId().replace(/:/g, "");
  const patternId = React.useId().replace(/:/g, "");

  return (
    <div
      className="seriesRiverContainer"
      style={{ "--series-color": series.color } as React.CSSProperties}
    >
      <svg
        className="riverSvg"
        viewBox={`0 0 300 ${calculatedHeight}`}
        preserveAspectRatio="xMidYMin meet"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100" height="100" fill="transparent" />
            <circle cx="20" cy="30" r="1.5" fill="rgba(255,255,255,0.10)" />
            <circle cx="60" cy="70" r="1" fill="rgba(255,255,255,0.07)" />
            <path
              d="M 10 10 Q 25 5, 40 10 T 70 10"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="2"
              fill="none"
            />
          </pattern>

          <mask id={maskId}>
            <path
              d={pathD}
              stroke="white"
              strokeWidth={riverWidth}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </mask>
        </defs>

        {/* River bed glow - uses series color */}
        <path
          d={pathD}
          stroke="color-mix(in srgb, var(--series-color) 20%, transparent)"
          strokeWidth={riverWidth + 16}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="riverGlow"
        />

        {/* Water */}
        <g mask={`url(#${maskId})`}>
          <rect
            x="0"
            y="0"
            width="300"
            height={calculatedHeight}
            fill="color-mix(in srgb, var(--series-color) 25%, rgba(30, 40, 50, 0.4))"
          />
          <rect
            x="0"
            y="0"
            width="300"
            height={calculatedHeight}
            fill={`url(#${patternId})`}
            className="waterTexture"
          />
        </g>

        {/* Center flow line */}
        <path
          d={pathD}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="10 40"
          className="flowLine"
        />
      </svg>

      {/* Stepping stones - positioned over the SVG */}
      <div className="stonesOverlay" style={{ height: calculatedHeight }}>
        {series.lessons.map((lesson, idx) => {
          const pos = stonePositions[idx];
          // Convert SVG coordinates to percentage positions
          const leftPercent = (pos.x / 300) * 100;
          const topPx = pos.y;

          return (
            <Link
              key={lesson.slug}
              href={`/learn/series/${series.slug}/${lesson.slug}`}
              className="stone"
              style={{
                left: `${leftPercent}%`,
                top: `${topPx}px`,
              }}
            >
              <span className="stoneInner">
                <span className="stoneNumber">{idx + 1}</span>
                <span className="stoneTitle">{lesson.title}</span>
              </span>
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        .seriesRiverContainer {
          position: relative;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          background: var(--tintMint);
          border-radius: var(--radius-xl);
          overflow: hidden;
        }

        .riverSvg {
          display: block;
          width: 100%;
          height: auto;
        }

        .riverGlow {
          filter: blur(8px);
        }

        .waterTexture {
          animation: waterFlow 20s linear infinite;
        }

        .flowLine {
          animation: flowDash 10s linear infinite;
        }

        @keyframes waterFlow {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100px);
          }
        }

        @keyframes flowDash {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -50;
          }
        }

        .stonesOverlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          pointer-events: none;
        }

        .stone {
          position: absolute;
          transform: translate(-50%, -50%);
          pointer-events: auto;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: var(--surface);
          border: 2px solid var(--border);
          box-shadow: var(--shadowMd);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          transition: transform 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
            border-color 200ms ease, box-shadow 200ms ease;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
        }

        .stone:hover {
          transform: translate(-50%, -50%) scale(1.08);
          border-color: var(--series-color);
          box-shadow: 0 8px 24px color-mix(in srgb, var(--series-color) 25%, transparent),
            0 0 0 4px color-mix(in srgb, var(--series-color) 12%, transparent);
        }

        .stone:focus-visible {
          outline: none;
          border-color: var(--series-color);
          box-shadow: 0 0 0 3px var(--series-color);
        }

        .stoneInner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px;
          gap: 4px;
        }

        .stoneNumber {
          font-size: 28px;
          font-weight: 900;
          line-height: 1;
          color: var(--series-color);
        }

        .stoneTitle {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          line-height: 1.25;
          color: var(--muted);
          max-width: 90px;
          text-align: center;
        }

        :global(html.dark) .seriesRiverContainer {
          background: color-mix(in srgb, var(--series-color) 8%, var(--bg));
        }

        :global(html.dark) .stone {
          background: radial-gradient(
              circle at 20% 18%,
              rgba(255, 255, 255, 0.04),
              transparent 36%
            ),
            var(--surface);
        }

        @media (prefers-reduced-motion: reduce) {
          .waterTexture,
          .flowLine {
            animation: none;
          }
          .stone {
            transition: border-color 200ms ease, box-shadow 200ms ease;
          }
        }

        @media (max-width: 500px) {
          .stone {
            width: 100px;
            height: 100px;
          }
          .stoneNumber {
            font-size: 24px;
          }
          .stoneTitle {
            font-size: 10px;
            max-width: 75px;
          }
        }
      `}</style>
    </div>
  );
}

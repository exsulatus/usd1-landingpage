"use client";

import React from "react";

interface RiverPathProps {
  /** Number of lesson steps - used to calculate river length */
  stepCount: number;
  /** Vertical spacing between steps in pixels */
  stepSpacing?: number;
}

/**
 * A winding river SVG that flows from top to bottom.
 * The river curves left and right naturally, with animated water texture.
 */
export function RiverPath({ stepCount, stepSpacing = 180 }: RiverPathProps) {
  // Calculate river height based on steps
  const minHeight = 600;
  const calculatedHeight = Math.max(minHeight, stepCount * stepSpacing + 200);
  const riverWidth = 48; // Narrow river width
  const amplitude = 60; // How far the river curves left/right
  const segments = Math.max(4, stepCount + 1); // Number of curve segments

  // Generate a winding path
  const generatePath = () => {
    const centerX = 150; // Center of the 300-wide viewBox
    const points: { x: number; y: number }[] = [];

    // Start point
    points.push({ x: centerX, y: 0 });

    // Generate curve points
    for (let i = 1; i <= segments; i++) {
      const progress = i / segments;
      const y = progress * calculatedHeight;
      // Alternate left/right with some variation
      const direction = i % 2 === 0 ? 1 : -1;
      const curveAmount = amplitude * direction * (0.6 + Math.sin(i * 1.3) * 0.4);
      const x = centerX + curveAmount;
      points.push({ x, y });
    }

    // Build SVG path with smooth curves
    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const segmentHeight = curr.y - prev.y;
      
      // Control points for smooth S-curves
      const cp1x = prev.x;
      const cp1y = prev.y + segmentHeight * 0.45;
      const cp2x = curr.x;
      const cp2y = curr.y - segmentHeight * 0.45;
      
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }

    return d;
  };

  const pathD = generatePath();
  const maskId = React.useId();
  const gradientId = React.useId();
  const textureId = React.useId();

  return (
    <div className="riverPathContainer" aria-hidden="true">
      <svg
        className="riverSvg"
        viewBox={`0 0 300 ${calculatedHeight}`}
        preserveAspectRatio="xMidYMin slice"
        fill="none"
      >
        <defs>
          {/* River gradient - darker mint green */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(22, 140, 110, 0.85)" />
            <stop offset="50%" stopColor="rgba(26, 155, 122, 0.9)" />
            <stop offset="100%" stopColor="rgba(22, 140, 110, 0.85)" />
          </linearGradient>

          {/* Water texture pattern */}
          <pattern
            id={textureId}
            patternUnits="userSpaceOnUse"
            width="20"
            height="40"
            patternTransform="rotate(-5)"
          >
            <rect width="20" height="40" fill="transparent" />
            <path
              d="M0 10 Q5 8, 10 10 T20 10"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M0 25 Q5 23, 10 25 T20 25"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="5" cy="5" r="1" fill="rgba(255,255,255,0.08)" />
            <circle cx="15" cy="30" r="1.5" fill="rgba(255,255,255,0.06)" />
          </pattern>

          {/* Mask for the river shape */}
          <mask id={maskId}>
            <path
              d={pathD}
              stroke="white"
              strokeWidth={riverWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </mask>
        </defs>

        {/* River shadow/glow */}
        <path
          d={pathD}
          stroke="rgba(17, 94, 75, 0.2)"
          strokeWidth={riverWidth + 12}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="riverGlow"
        />

        {/* Main river fill */}
        <path
          d={pathD}
          stroke={`url(#${gradientId})`}
          strokeWidth={riverWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="riverMain"
        />

        {/* River edge highlight (left) */}
        <path
          d={pathD}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={riverWidth - 4}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="riverHighlight"
          style={{ transform: "translateX(-2px)" }}
        />

        {/* Animated water texture overlay */}
        <g mask={`url(#${maskId})`}>
          <rect
            x="0"
            y="-40"
            width="300"
            height={calculatedHeight + 80}
            fill={`url(#${textureId})`}
            className="waterTexture"
          />
        </g>

        {/* River center flow line (animated) */}
        <path
          d={pathD}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8 16"
          fill="none"
          className="flowLine"
        />
      </svg>

      <style jsx>{`
        .riverPathContainer {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          overflow: hidden;
          pointer-events: none;
        }

        .riverSvg {
          width: 100%;
          height: 100%;
          min-height: 100%;
        }

        .riverGlow {
          filter: blur(6px);
        }

        .waterTexture {
          animation: flowDown 4s linear infinite;
        }

        .flowLine {
          animation: dashFlow 2s linear infinite;
        }

        @keyframes flowDown {
          from {
            transform: translateY(-40px);
          }
          to {
            transform: translateY(0px);
          }
        }

        @keyframes dashFlow {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -24;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .waterTexture,
          .flowLine {
            animation: none;
          }
        }

        :global(html.dark) .riverMain {
          stroke: rgba(26, 155, 122, 0.75);
        }

        :global(html.dark) .riverGlow {
          stroke: rgba(17, 94, 75, 0.35);
        }

        :global(html.dark) .riverHighlight {
          stroke: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  );
}

/**
 * Bank decorations - trees, shrubs, and rocks scattered along the river banks
 */
interface BankDecorationsProps {
  stepCount: number;
  stepSpacing?: number;
}

export function BankDecorations({ stepCount, stepSpacing = 180 }: BankDecorationsProps) {
  const decorations = React.useMemo(() => {
    const items: Array<{
      type: "tree" | "shrub" | "rock" | "grass";
      side: "left" | "right";
      top: number;
      offset: number;
      scale: number;
    }> = [];

    const totalHeight = stepCount * stepSpacing + 200;
    const decorCount = Math.max(8, stepCount * 3);

    for (let i = 0; i < decorCount; i++) {
      const types: Array<"tree" | "shrub" | "rock" | "grass"> = ["tree", "shrub", "rock", "grass"];
      items.push({
        type: types[i % types.length],
        side: i % 2 === 0 ? "left" : "right",
        top: (i / decorCount) * totalHeight + Math.random() * 40 - 20,
        offset: 10 + Math.random() * 25,
        scale: 0.7 + Math.random() * 0.5,
      });
    }

    return items;
  }, [stepCount, stepSpacing]);

  return (
    <div className="bankDecorations" aria-hidden="true">
      {decorations.map((decor, i) => (
        <div
          key={i}
          className={`decor decor-${decor.type} decor-${decor.side}`}
          style={{
            top: `${decor.top}px`,
            [decor.side]: `${decor.offset}%`,
            transform: `scale(${decor.scale})`,
          }}
        />
      ))}

      <style jsx>{`
        .bankDecorations {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .decor {
          position: absolute;
          width: 32px;
          height: 32px;
        }

        /* Tree - simple triangular evergreen */
        .decor-tree {
          width: 28px;
          height: 40px;
        }
        .decor-tree::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 10px;
          background: rgba(120, 85, 50, 0.5);
          border-radius: 2px;
        }
        .decor-tree::after {
          content: "";
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 14px solid transparent;
          border-right: 14px solid transparent;
          border-bottom: 30px solid rgba(33, 140, 100, 0.45);
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }

        /* Shrub - rounded bush */
        .decor-shrub {
          width: 26px;
          height: 20px;
          background: radial-gradient(
            ellipse 100% 80% at 50% 60%,
            rgba(40, 160, 115, 0.5) 0%,
            rgba(33, 140, 100, 0.35) 70%,
            transparent 100%
          );
          border-radius: 50% 50% 45% 45%;
        }
        .decor-shrub::before {
          content: "";
          position: absolute;
          top: 2px;
          left: 25%;
          width: 50%;
          height: 40%;
          background: radial-gradient(
            ellipse at 50% 50%,
            rgba(255, 255, 255, 0.2) 0%,
            transparent 70%
          );
          border-radius: 50%;
        }

        /* Rock - irregular rounded shape */
        .decor-rock {
          width: 22px;
          height: 16px;
          background: linear-gradient(
            145deg,
            rgba(140, 140, 130, 0.55) 0%,
            rgba(100, 100, 95, 0.45) 100%
          );
          border-radius: 45% 55% 50% 50% / 60% 60% 40% 40%;
          box-shadow: inset 1px 1px 3px rgba(255,255,255,0.2),
                      inset -1px -1px 3px rgba(0,0,0,0.1);
        }
        .decor-rock::after {
          content: "";
          position: absolute;
          top: 15%;
          left: 20%;
          width: 35%;
          height: 25%;
          background: rgba(255,255,255,0.15);
          border-radius: 50%;
        }

        /* Grass tuft */
        .decor-grass {
          width: 20px;
          height: 18px;
          position: relative;
        }
        .decor-grass::before,
        .decor-grass::after {
          content: "";
          position: absolute;
          bottom: 0;
          width: 3px;
          background: linear-gradient(to top, rgba(60, 150, 100, 0.5), rgba(80, 170, 120, 0.3));
          border-radius: 2px 2px 0 0;
        }
        .decor-grass::before {
          left: 30%;
          height: 14px;
          transform: rotate(-8deg);
        }
        .decor-grass::after {
          left: 55%;
          height: 16px;
          transform: rotate(5deg);
        }

        :global(html.dark) .decor-tree::after {
          border-bottom-color: rgba(33, 140, 100, 0.55);
        }
        :global(html.dark) .decor-shrub {
          background: radial-gradient(
            ellipse 100% 80% at 50% 60%,
            rgba(40, 160, 115, 0.4) 0%,
            rgba(33, 140, 100, 0.25) 70%,
            transparent 100%
          );
        }
        :global(html.dark) .decor-rock {
          background: linear-gradient(
            145deg,
            rgba(120, 120, 115, 0.45) 0%,
            rgba(80, 80, 75, 0.35) 100%
          );
        }
      `}</style>
    </div>
  );
}

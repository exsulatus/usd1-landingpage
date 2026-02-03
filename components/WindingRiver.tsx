"use client";

import React from "react";

interface WindingRiverProps {
  stepCount: number;
  stepHeight?: number;
  paddingY?: number;
}

/**
 * A winding river component that renders a narrow curvy stream with animated water
 * and bank decorations. Used as the background for the lessons page.
 */
export function WindingRiver({ stepCount, stepHeight = 300, paddingY = 150 }: WindingRiverProps) {
  // Constants for synchronization with LessonShell
  const calculatedHeight = Math.max(stepHeight === 190 ? 500 : 800, stepCount * stepHeight + paddingY * 2);
  const riverWidth = 100;
  const amplitude = 50;
  const centerX = 150;

  // Generate the main river path using a sine wave for predictability
  const pathD = React.useMemo(() => {
    const points: { x: number; y: number }[] = [];
    const stepSize = 20; // Resolution of the curve
    
    for (let y = -100; y <= calculatedHeight + 100; y += stepSize) {
      // Use a consistent sine wave formula
      // Period is roughly 2.5 steps for one full S-curve
      const waveLength = stepHeight * 2.5;
      const x = centerX + Math.sin(y / waveLength * Math.PI * 2) * amplitude;
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

  const maskId = React.useId().replace(/:/g, "");
  const patternId = React.useId().replace(/:/g, "");

  // Generate random decorations along the river banks
  const decorations = React.useMemo(() => {
    const items = [];
    const seed = stepCount * 123; // Stable seed for consistent decorations
    
    // More trees for a real forest feel
    const treeCount = 5 + Math.floor((seed % 4));
    for (let i = 0; i < treeCount; i++) {
      items.push({
        id: `tree-${i}`,
        type: "tree" as const,
        variant: i % 3, // 3 tree variants
        side: (i % 2 === 0) ? "left" : "right" as "left" | "right",
        top: (i * (calculatedHeight / treeCount)) + ((seed + i * 47) % 80),
        offset: 3 + ((seed + i * 23) % 8),
        scale: 0.8 + ((seed + i * 31) % 40) / 100,
        rotation: ((seed + i * 17) % 20) - 10,
      });
    }

    // Bushes and shrubs scattered along banks
    const bushCount = 10 + stepCount;
    for (let i = 0; i < bushCount; i++) {
      items.push({
        id: `bush-${i}`,
        type: "bush" as const,
        variant: i % 2,
        side: (i % 3 === 0) ? "left" : "right" as "left" | "right",
        top: (i * (calculatedHeight / bushCount)) + ((seed + i * 13) % 60),
        offset: 2 + ((seed + i * 29) % 12),
        scale: 0.7 + ((seed + i * 19) % 50) / 100,
        rotation: ((seed + i * 11) % 30) - 15,
      });
    }

    // Rock piles and individual rocks
    const rockCount = 6 + Math.floor(stepCount / 2);
    for (let i = 0; i < rockCount; i++) {
      const isPile = i % 3 === 0;
      items.push({
        id: `rock-${i}`,
        type: isPile ? "rockpile" : "rock" as "rockpile" | "rock",
        side: (i % 2 === 0) ? "left" : "right" as "left" | "right",
        top: (i * (calculatedHeight / rockCount)) + ((seed + i * 37) % 70),
        offset: 1 + ((seed + i * 41) % 10),
        scale: 0.6 + ((seed + i * 27) % 60) / 100,
        rotation: ((seed + i * 43) % 40) - 20,
      });
    }

    // Reeds/grass near water edge
    const reedCount = 8 + stepCount;
    for (let i = 0; i < reedCount; i++) {
      items.push({
        id: `reed-${i}`,
        type: "reed" as const,
        side: (i % 2 === 0) ? "left" : "right" as "left" | "right",
        top: (i * (calculatedHeight / reedCount)) + ((seed + i * 7) % 40),
        offset: 0.5 + ((seed + i * 3) % 3),
        scale: 0.8 + ((seed + i * 5) % 40) / 100,
        rotation: ((seed + i * 9) % 20) - 10,
      });
    }

    // Surgical fix: remove only the single bush that overlaps the river next to Step 2
    // for the Money, Simply lesson (5 steps). Keep everything else identical.
    if (stepCount === 5) {
      return items.filter((item) => !(item.type === "bush" && item.id === "bush-4"));
    }
    return items;
  }, [calculatedHeight, stepCount]);

  return (
    <div className="windingRiverContainer" aria-hidden="true">
      <svg
        className="riverSvg"
        viewBox={`0 0 300 ${calculatedHeight}`}
        preserveAspectRatio="xMidYMin slice"
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
            <circle cx="20" cy="30" r="1.5" fill="rgba(255,255,255,0.12)" />
            <circle cx="60" cy="70" r="1" fill="rgba(255,255,255,0.08)" />
            <path
              d="M 10 10 Q 25 5, 40 10 T 70 10"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 20 50 Q 35 45, 50 50 T 80 50"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1.5"
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

        {/* River Bed Glow */}
        <path
          d={pathD}
          stroke="rgba(33, 181, 143, 0.15)"
          strokeWidth={riverWidth + 12}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Water */}
        <g mask={`url(#${maskId})`}>
          <rect x="0" y="0" width="300" height={calculatedHeight} fill="rgba(26, 145, 115, 0.3)" />
          <rect x="0" y="0" width="300" height={calculatedHeight} fill={`url(#${patternId})`} className="waterTexture" />
        </g>

        {/* Center Flow Line */}
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

      {decorations.map((d) => (
        <div
          key={d.id}
          className={`decor decor-${d.type} ${d.variant !== undefined ? `variant-${d.variant}` : ''}`}
          style={{
            top: `${d.top}px`,
            [d.side]: `${d.offset}%`,
            transform: `scale(${d.scale}) rotate(${d.rotation}deg)`,
          }}
        >
          {d.type === "tree" && (
            <div className="tree-wrap">
              <div className="tree-trunk" />
              <div className="tree-branches">
                <div className="branch branch-left" />
                <div className="branch branch-right" />
                <div className="branch branch-mid" />
              </div>
              <div className="tree-crown">
                <div className="crown-shape" />
              </div>
            </div>
          )}
          {d.type === "bush" && (
            <div className="bush-wrap">
              <div className="bush-cluster bush-cluster-1" />
              <div className="bush-cluster bush-cluster-2" />
              <div className="bush-cluster bush-cluster-3" />
              <div className="bush-cluster bush-cluster-4" />
            </div>
          )}
          {d.type === "rockpile" && (
            <div className="rockpile-wrap">
              <div className="rockpile-shape" />
            </div>
          )}
          {d.type === "rock" && (
            <div className="rock-single" />
          )}
          {d.type === "reed" && (
            <div className="reed-wrap">
              <div className="reed-cluster" />
            </div>
          )}
        </div>
      ))}

      <style jsx>{`
        .windingRiverContainer {
          position: absolute;
          inset: 0;
          background: var(--tintMint);
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }
        
        .riverSvg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .waterTexture {
          animation: waterFlow 20s linear infinite;
        }

        .flowLine {
          animation: flowDash 10s linear infinite;
        }

        @keyframes waterFlow {
          from { transform: translateY(0); }
          to { transform: translateY(100px); }
        }

        @keyframes flowDash {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -50; }
        }

        .decor {
          position: absolute;
          opacity: 0.6;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
        }

        /* Trees - 3 variants */
        .decor-tree {
          width: 56px;
          height: 80px;
        }

        .tree-wrap {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .tree-trunk {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 40px;
          background: linear-gradient(90deg, rgba(100, 70, 40, 0.4) 0%, rgba(120, 85, 50, 0.35) 50%, rgba(90, 60, 35, 0.3) 100%);
          border-radius: 5px 5px 2px 2px;
          box-shadow: inset -1px 0 2px rgba(0, 0, 0, 0.1);
        }

        .tree-branches {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 28px;
        }

        .branch {
          position: absolute;
          width: 18px;
          height: 3px;
          background: linear-gradient(90deg, rgba(100, 70, 40, 0.35), rgba(120, 85, 50, 0.3));
          border-radius: 2px;
        }

        .branch-left {
          bottom: 4px;
          left: 6px;
          transform: rotate(35deg);
          transform-origin: right center;
        }

        .branch-right {
          bottom: 4px;
          right: 6px;
          transform: rotate(-35deg);
          transform-origin: left center;
        }

        .branch-mid {
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%) rotate(15deg);
          width: 14px;
        }

        .tree-crown {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 54px;
          height: 52px;
        }

        .crown-shape {
          position: absolute;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(ellipse at 50% 20%, rgba(33, 181, 143, 0.55) 0%, transparent 40%),
            radial-gradient(ellipse at 30% 45%, rgba(26, 145, 115, 0.48) 0%, transparent 35%),
            radial-gradient(ellipse at 70% 45%, rgba(26, 145, 115, 0.48) 0%, transparent 35%),
            radial-gradient(ellipse at 50% 70%, rgba(20, 120, 95, 0.42) 0%, transparent 30%),
            linear-gradient(180deg, 
              rgba(33, 181, 143, 0.5) 0%,
              rgba(26, 145, 115, 0.45) 40%,
              rgba(20, 120, 95, 0.38) 100%
            );
          border-radius: 50% 50% 48% 52% / 60% 60% 40% 40%;
          box-shadow: 
            inset 3px -2px 6px rgba(255, 255, 255, 0.12),
            inset -2px 3px 6px rgba(0, 0, 0, 0.08);
        }

        /* Tree variants */
        .variant-1 .crown-shape {
          border-radius: 52% 48% 50% 50% / 65% 65% 35% 35%;
          background: 
            radial-gradient(ellipse at 50% 25%, rgba(33, 181, 143, 0.52) 0%, transparent 38%),
            radial-gradient(ellipse at 35% 50%, rgba(26, 145, 115, 0.46) 0%, transparent 33%),
            radial-gradient(ellipse at 65% 50%, rgba(26, 145, 115, 0.46) 0%, transparent 33%),
            linear-gradient(180deg, 
              rgba(33, 181, 143, 0.48) 0%,
              rgba(26, 145, 115, 0.42) 50%,
              rgba(20, 120, 95, 0.36) 100%
            );
        }

        .variant-2 .tree-crown {
          width: 50px;
          height: 48px;
        }

        .variant-2 .crown-shape {
          border-radius: 48% 52% 50% 50% / 55% 55% 45% 45%;
          background: 
            radial-gradient(ellipse at 50% 30%, rgba(26, 145, 115, 0.58) 0%, transparent 42%),
            radial-gradient(ellipse at 25% 55%, rgba(20, 120, 95, 0.50) 0%, transparent 36%),
            radial-gradient(ellipse at 75% 55%, rgba(20, 120, 95, 0.50) 0%, transparent 36%),
            linear-gradient(180deg, 
              rgba(26, 145, 115, 0.52) 0%,
              rgba(20, 120, 95, 0.45) 60%,
              rgba(15, 100, 80, 0.38) 100%
            );
        }

        .variant-2 .tree-trunk {
          height: 36px;
          width: 8px;
        }

        /* Bushes - distinct rounded clusters */
        .decor-bush {
          width: 60px;
          height: 32px;
        }

        .bush-wrap {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .bush-cluster {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, rgba(40, 160, 130, 0.55), rgba(30, 130, 105, 0.42));
          box-shadow: 
            inset 2px -1px 3px rgba(255, 255, 255, 0.18),
            inset -1px 2px 3px rgba(0, 0, 0, 0.10),
            0 2px 3px rgba(0, 0, 0, 0.08);
        }

        .bush-cluster-1 {
          width: 22px;
          height: 22px;
          bottom: 2px;
          left: 2px;
          background: radial-gradient(circle at 35% 35%, rgba(35, 150, 120, 0.52), rgba(28, 125, 100, 0.40));
        }

        .bush-cluster-2 {
          width: 26px;
          height: 26px;
          bottom: 0;
          left: 16px;
          z-index: 2;
        }

        .bush-cluster-3 {
          width: 24px;
          height: 24px;
          bottom: 4px;
          right: 4px;
          background: radial-gradient(circle at 35% 35%, rgba(38, 155, 125, 0.54), rgba(30, 128, 103, 0.41));
        }

        .bush-cluster-4 {
          width: 20px;
          height: 20px;
          top: 0;
          left: 24px;
          background: radial-gradient(circle at 35% 35%, rgba(42, 165, 133, 0.50), rgba(32, 135, 108, 0.38));
        }

        /* Variant bushes */
        .variant-1 .bush-cluster-2 {
          width: 28px;
          height: 28px;
          left: 18px;
        }

        .variant-1 .bush-cluster-3 {
          width: 26px;
          height: 26px;
        }

        .variant-1 .bush-cluster-4 {
          top: 2px;
          left: 26px;
        }

        /* Rock piles */
        .decor-rockpile {
          width: 52px;
          height: 32px;
        }

        .rockpile-wrap {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .rockpile-shape {
          position: absolute;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(ellipse at 60% 35%, rgba(148, 163, 184, 0.45) 0%, transparent 28%),
            radial-gradient(ellipse at 35% 60%, rgba(130, 145, 165, 0.42) 0%, transparent 32%),
            radial-gradient(ellipse at 75% 70%, rgba(120, 135, 155, 0.40) 0%, transparent 30%),
            radial-gradient(ellipse at 20% 75%, rgba(110, 125, 145, 0.38) 0%, transparent 26%),
            linear-gradient(135deg, 
              rgba(148, 163, 184, 0.40) 0%,
              rgba(130, 145, 165, 0.35) 40%,
              rgba(120, 135, 155, 0.30) 70%,
              rgba(110, 125, 145, 0.28) 100%
            );
          border-radius: 45% 55% 48% 52% / 35% 40% 60% 65%;
          box-shadow: 
            inset 3px -2px 5px rgba(255, 255, 255, 0.18),
            inset -2px 3px 5px rgba(0, 0, 0, 0.12);
        }

        /* Single rocks */
        .decor-rock {
          width: 32px;
          height: 22px;
        }

        .rock-single {
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(ellipse at 40% 30%, rgba(148, 163, 184, 0.42) 0%, transparent 35%),
            radial-gradient(ellipse at 65% 60%, rgba(130, 145, 165, 0.38) 0%, transparent 32%),
            linear-gradient(125deg, 
              rgba(148, 163, 184, 0.38) 0%,
              rgba(130, 145, 165, 0.32) 50%,
              rgba(120, 135, 155, 0.28) 100%
            );
          border-radius: 52% 48% 55% 45% / 45% 50% 50% 55%;
          box-shadow: 
            inset 2px -1px 4px rgba(255, 255, 255, 0.16),
            inset -1px 2px 4px rgba(0, 0, 0, 0.10);
        }

        /* Reeds/Grass */
        .decor-reed {
          width: 32px;
          height: 48px;
        }

        .reed-wrap {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .reed-cluster {
          position: absolute;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(178deg, 
              transparent 0%,
              transparent 15%,
              rgba(33, 181, 143, 0.42) 15%,
              rgba(33, 181, 143, 0.38) 20%,
              rgba(26, 145, 115, 0.32) 50%,
              rgba(20, 120, 95, 0.22) 80%,
              transparent 100%
            ),
            linear-gradient(182deg, 
              transparent 0%,
              transparent 8%,
              rgba(26, 145, 115, 0.40) 8%,
              rgba(26, 145, 115, 0.36) 15%,
              rgba(20, 120, 95, 0.28) 55%,
              rgba(15, 100, 80, 0.18) 85%,
              transparent 100%
            ),
            linear-gradient(176deg, 
              transparent 0%,
              transparent 20%,
              rgba(26, 145, 115, 0.38) 20%,
              rgba(20, 120, 95, 0.30) 35%,
              rgba(20, 120, 95, 0.24) 60%,
              rgba(15, 100, 80, 0.16) 88%,
              transparent 100%
            );
          background-position: 4px 0, 14px 0, 24px 0;
          background-size: 3px 100%, 3px 100%, 3px 100%;
          background-repeat: no-repeat;
          filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.06));
        }

        :global(html.dark) .windingRiverContainer {
          background: rgba(33, 181, 143, 0.12);
        }
        
        :global(html.dark) .decor {
          opacity: 0.4;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
        }
        
        :global(html.dark) .tree-trunk {
          background: linear-gradient(90deg, rgba(100, 70, 40, 0.5) 0%, rgba(120, 85, 50, 0.45) 50%, rgba(90, 60, 35, 0.4) 100%);
        }

        :global(html.dark) .branch {
          background: linear-gradient(90deg, rgba(100, 70, 40, 0.45), rgba(120, 85, 50, 0.4));
        }

        :global(html.dark) .crown-shape {
          background: 
            radial-gradient(ellipse at 50% 20%, rgba(33, 181, 143, 0.38) 0%, transparent 40%),
            radial-gradient(ellipse at 30% 45%, rgba(26, 145, 115, 0.32) 0%, transparent 35%),
            radial-gradient(ellipse at 70% 45%, rgba(26, 145, 115, 0.32) 0%, transparent 35%),
            radial-gradient(ellipse at 50% 70%, rgba(20, 120, 95, 0.28) 0%, transparent 30%),
            linear-gradient(180deg, 
              rgba(33, 181, 143, 0.35) 0%,
              rgba(26, 145, 115, 0.30) 40%,
              rgba(20, 120, 95, 0.25) 100%
            );
        }

        :global(html.dark) .variant-1 .crown-shape {
          background: 
            radial-gradient(ellipse at 50% 25%, rgba(33, 181, 143, 0.36) 0%, transparent 38%),
            radial-gradient(ellipse at 35% 50%, rgba(26, 145, 115, 0.30) 0%, transparent 33%),
            radial-gradient(ellipse at 65% 50%, rgba(26, 145, 115, 0.30) 0%, transparent 33%),
            linear-gradient(180deg, 
              rgba(33, 181, 143, 0.33) 0%,
              rgba(26, 145, 115, 0.28) 50%,
              rgba(20, 120, 95, 0.24) 100%
            );
        }

        :global(html.dark) .variant-2 .crown-shape {
          background: 
            radial-gradient(ellipse at 50% 30%, rgba(26, 145, 115, 0.40) 0%, transparent 42%),
            radial-gradient(ellipse at 25% 55%, rgba(20, 120, 95, 0.34) 0%, transparent 36%),
            radial-gradient(ellipse at 75% 55%, rgba(20, 120, 95, 0.34) 0%, transparent 36%),
            linear-gradient(180deg, 
              rgba(26, 145, 115, 0.36) 0%,
              rgba(20, 120, 95, 0.30) 60%,
              rgba(15, 100, 80, 0.25) 100%
            );
        }

        :global(html.dark) .bush-cluster {
          background: radial-gradient(circle at 35% 35%, rgba(40, 160, 130, 0.38), rgba(30, 130, 105, 0.28));
        }

        :global(html.dark) .bush-cluster-1 {
          background: radial-gradient(circle at 35% 35%, rgba(35, 150, 120, 0.36), rgba(28, 125, 100, 0.26));
        }

        :global(html.dark) .bush-cluster-3 {
          background: radial-gradient(circle at 35% 35%, rgba(38, 155, 125, 0.37), rgba(30, 128, 103, 0.27));
        }

        :global(html.dark) .bush-cluster-4 {
          background: radial-gradient(circle at 35% 35%, rgba(42, 165, 133, 0.35), rgba(32, 135, 108, 0.25));
        }

        :global(html.dark) .rockpile-shape {
          background: 
            radial-gradient(ellipse at 60% 35%, rgba(148, 163, 184, 0.30) 0%, transparent 28%),
            radial-gradient(ellipse at 35% 60%, rgba(130, 145, 165, 0.28) 0%, transparent 32%),
            radial-gradient(ellipse at 75% 70%, rgba(120, 135, 155, 0.26) 0%, transparent 30%),
            radial-gradient(ellipse at 20% 75%, rgba(110, 125, 145, 0.24) 0%, transparent 26%),
            linear-gradient(135deg, 
              rgba(148, 163, 184, 0.28) 0%,
              rgba(130, 145, 165, 0.24) 40%,
              rgba(120, 135, 155, 0.20) 70%,
              rgba(110, 125, 145, 0.18) 100%
            );
        }

        :global(html.dark) .rock-single {
          background: 
            radial-gradient(ellipse at 40% 30%, rgba(148, 163, 184, 0.28) 0%, transparent 35%),
            radial-gradient(ellipse at 65% 60%, rgba(130, 145, 165, 0.25) 0%, transparent 32%),
            linear-gradient(125deg, 
              rgba(148, 163, 184, 0.26) 0%,
              rgba(130, 145, 165, 0.22) 50%,
              rgba(120, 135, 155, 0.18) 100%
            );
        }

        :global(html.dark) .reed-cluster {
          background: 
            linear-gradient(178deg, 
              transparent 0%,
              transparent 15%,
              rgba(33, 181, 143, 0.30) 15%,
              rgba(33, 181, 143, 0.26) 20%,
              rgba(26, 145, 115, 0.22) 50%,
              rgba(20, 120, 95, 0.15) 80%,
              transparent 100%
            ),
            linear-gradient(182deg, 
              transparent 0%,
              transparent 8%,
              rgba(26, 145, 115, 0.28) 8%,
              rgba(26, 145, 115, 0.24) 15%,
              rgba(20, 120, 95, 0.19) 55%,
              rgba(15, 100, 80, 0.12) 85%,
              transparent 100%
            ),
            linear-gradient(176deg, 
              transparent 0%,
              transparent 20%,
              rgba(26, 145, 115, 0.26) 20%,
              rgba(20, 120, 95, 0.20) 35%,
              rgba(20, 120, 95, 0.16) 60%,
              rgba(15, 100, 80, 0.11) 88%,
              transparent 100%
            );
          background-position: 4px 0, 14px 0, 24px 0;
          background-size: 3px 100%, 3px 100%, 3px 100%;
          background-repeat: no-repeat;
        }
      `}</style>
    </div>
  );
}

"use client";

import React from "react";

type IdeaFlowGraphicProps = {
  className?: string;
};

/**
 * Architectural, spacious flow graphic for the "Ideas, in motion" section.
 * Color progression: lavender (top) → mint (middle) → peach (bottom)
 * Reflects the Learn → transition → Games conceptual flow.
 * Subtle continuous animation (slow path drift, no pulsing).
 */
export function IdeaFlowGraphic({ className }: IdeaFlowGraphicProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 700"
      role="img"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMin slice"
      overflow="visible"
    >
      <defs>
        {/* Lavender → Mint → Peach gradient for main paths */}
        <linearGradient id="ideaFlowMainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(123, 108, 255, 0.55)" />
          <stop offset="45%" stopColor="rgba(33, 181, 143, 0.50)" />
          <stop offset="100%" stopColor="rgba(255, 122, 107, 0.45)" />
        </linearGradient>

        {/* Softer version for background paths */}
        <linearGradient id="ideaFlowBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(123, 108, 255, 0.25)" />
          <stop offset="45%" stopColor="rgba(33, 181, 143, 0.22)" />
          <stop offset="100%" stopColor="rgba(255, 122, 107, 0.20)" />
        </linearGradient>

        {/* Node halo gradients by position */}
        <radialGradient id="nodeHaloLavender" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(123, 108, 255, 0.28)" />
          <stop offset="100%" stopColor="rgba(123, 108, 255, 0)" />
        </radialGradient>
        <radialGradient id="nodeHaloMint" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(33, 181, 143, 0.28)" />
          <stop offset="100%" stopColor="rgba(33, 181, 143, 0)" />
        </radialGradient>
        <radialGradient id="nodeHaloPeach" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255, 122, 107, 0.28)" />
          <stop offset="100%" stopColor="rgba(255, 122, 107, 0)" />
        </radialGradient>

        {/* Soft blur for depth */}
        <filter id="ideaSoften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>

        {/* Faint grid texture pattern */}
        <pattern id="ideaGridPattern" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
        </pattern>
      </defs>

      <style>
        {`
          .idea-flow-animated {
            animation: ideaFlowDrift 120s linear infinite;
          }

          @keyframes ideaFlowDrift {
            from {
              stroke-dashoffset: 0;
            }
            to {
              stroke-dashoffset: -2400;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .idea-flow-animated {
              animation: none !important;
            }
          }
        `}
      </style>

      {/* Faint background grid texture */}
      <rect
        x="0"
        y="0"
        width="400"
        height="700"
        fill="url(#ideaGridPattern)"
        opacity="0.4"
      />

      {/* Main structural backbone - multiple flowing paths */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Primary path - S-curve flowing top to bottom */}
        <path
          d="M 80 20
             L 80 80
             Q 80 140 140 160
             L 260 200
             Q 320 220 320 280
             L 320 340
             Q 320 400 260 420
             L 140 460
             Q 80 480 80 540
             L 80 600
             Q 80 660 140 680"
          stroke="url(#ideaFlowBgGrad)"
          strokeWidth="3"
          opacity="0.5"
          filter="url(#ideaSoften)"
        />

        {/* Animated flow overlay on primary path */}
        <path
          className="idea-flow-animated"
          d="M 80 20
             L 80 80
             Q 80 140 140 160
             L 260 200
             Q 320 220 320 280
             L 320 340
             Q 320 400 260 420
             L 140 460
             Q 80 480 80 540
             L 80 600
             Q 80 660 140 680"
          stroke="url(#ideaFlowMainGrad)"
          strokeWidth="2"
          strokeDasharray="60 30 120 40"
          pathLength="2400"
          opacity="0.7"
        />

        {/* Secondary path - gentler curve on right side */}
        <path
          d="M 320 60
             L 320 120
             Q 320 180 260 200"
          stroke="url(#ideaFlowBgGrad)"
          strokeWidth="2"
          opacity="0.35"
        />

        {/* Secondary path - branch from mid-left */}
        <path
          d="M 140 460
             Q 100 480 60 500
             L 60 560"
          stroke="url(#ideaFlowBgGrad)"
          strokeWidth="2"
          opacity="0.30"
        />

        {/* Tertiary branch - right side extension */}
        <path
          d="M 320 340
             Q 360 360 380 400
             L 380 480"
          stroke="url(#ideaFlowBgGrad)"
          strokeWidth="1.5"
          opacity="0.25"
        />
      </g>

      {/* Dashed connector paths - architectural detail */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="4 10"
        opacity="0.18"
      >
        <path d="M 80 80 L 160 80" />
        <path d="M 260 200 L 260 260" />
        <path d="M 140 420 L 200 420" />
        <path d="M 320 280 L 380 280" />
        <path d="M 80 540 L 40 540" />
        <path d="M 140 680 L 200 680" />
      </g>

      {/* Nodes - positioned along the flow with appropriate halo colors */}
      <g>
        {/* Node 1 - Top/Start (Lavender zone) */}
        <circle cx="80" cy="20" r="24" fill="url(#nodeHaloLavender)" opacity="0.9" />
        <circle
          cx="80"
          cy="20"
          r="10"
          fill="var(--surface, #ffffff)"
          stroke="rgba(123, 108, 255, 0.45)"
          strokeWidth="1.5"
          opacity="0.85"
        />

        {/* Node 2 - Upper junction (Lavender zone) */}
        <circle cx="320" cy="60" r="20" fill="url(#nodeHaloLavender)" opacity="0.75" />
        <circle
          cx="320"
          cy="60"
          r="8"
          fill="var(--surface, #ffffff)"
          stroke="rgba(123, 108, 255, 0.40)"
          strokeWidth="1.4"
          opacity="0.80"
        />

        {/* Node 3 - First turn (Lavender→Mint transition) */}
        <circle cx="140" cy="160" r="22" fill="url(#nodeHaloLavender)" opacity="0.7" />
        <circle
          cx="140"
          cy="160"
          r="9"
          fill="var(--surface, #ffffff)"
          stroke="rgba(90, 140, 180, 0.42)"
          strokeWidth="1.4"
          opacity="0.82"
        />

        {/* Node 4 - Mid intersection (Mint zone) */}
        <circle cx="260" cy="200" r="26" fill="url(#nodeHaloMint)" opacity="0.85" />
        <circle
          cx="260"
          cy="200"
          r="11"
          fill="var(--surface, #ffffff)"
          stroke="rgba(33, 181, 143, 0.48)"
          strokeWidth="1.5"
          opacity="0.88"
        />

        {/* Node 5 - Central hub (Mint zone) */}
        <circle cx="320" cy="340" r="28" fill="url(#nodeHaloMint)" opacity="0.8" />
        <circle
          cx="320"
          cy="340"
          r="12"
          fill="var(--surface, #ffffff)"
          stroke="rgba(33, 181, 143, 0.50)"
          strokeWidth="1.6"
          opacity="0.90"
        />

        {/* Node 6 - Lower turn (Mint→Peach transition) */}
        <circle cx="140" cy="460" r="24" fill="url(#nodeHaloMint)" opacity="0.72" />
        <circle
          cx="140"
          cy="460"
          r="10"
          fill="var(--surface, #ffffff)"
          stroke="rgba(120, 150, 130, 0.45)"
          strokeWidth="1.4"
          opacity="0.84"
        />

        {/* Node 7 - Branch endpoint left (Peach zone) */}
        <circle cx="60" cy="560" r="18" fill="url(#nodeHaloPeach)" opacity="0.65" />
        <circle
          cx="60"
          cy="560"
          r="7"
          fill="var(--surface, #ffffff)"
          stroke="rgba(255, 122, 107, 0.42)"
          strokeWidth="1.3"
          opacity="0.78"
        />

        {/* Node 8 - Branch endpoint right (Peach zone) */}
        <circle cx="380" cy="480" r="16" fill="url(#nodeHaloPeach)" opacity="0.6" />
        <circle
          cx="380"
          cy="480"
          r="6.5"
          fill="var(--surface, #ffffff)"
          stroke="rgba(255, 122, 107, 0.40)"
          strokeWidth="1.2"
          opacity="0.75"
        />

        {/* Node 9 - Final destination (Peach zone) */}
        <circle cx="140" cy="680" r="22" fill="url(#nodeHaloPeach)" opacity="0.75" />
        <circle
          cx="140"
          cy="680"
          r="9"
          fill="var(--surface, #ffffff)"
          stroke="rgba(255, 122, 107, 0.48)"
          strokeWidth="1.5"
          opacity="0.85"
        />
      </g>

      {/* Small satellite nodes - quiet architectural hints */}
      <g opacity="0.5">
        <circle
          cx="160"
          cy="80"
          r="5"
          fill="var(--surface, #ffffff)"
          stroke="rgba(123, 108, 255, 0.35)"
          strokeWidth="1"
        />
        <circle
          cx="260"
          cy="260"
          r="5"
          fill="var(--surface, #ffffff)"
          stroke="rgba(33, 181, 143, 0.35)"
          strokeWidth="1"
        />
        <circle
          cx="200"
          cy="420"
          r="5"
          fill="var(--surface, #ffffff)"
          stroke="rgba(33, 181, 143, 0.32)"
          strokeWidth="1"
        />
        <circle
          cx="380"
          cy="280"
          r="5"
          fill="var(--surface, #ffffff)"
          stroke="rgba(33, 181, 143, 0.30)"
          strokeWidth="1"
        />
        <circle
          cx="40"
          cy="540"
          r="4.5"
          fill="var(--surface, #ffffff)"
          stroke="rgba(255, 122, 107, 0.30)"
          strokeWidth="1"
        />
        <circle
          cx="200"
          cy="680"
          r="4.5"
          fill="var(--surface, #ffffff)"
          stroke="rgba(255, 122, 107, 0.28)"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}

"use client";

import React from "react";

type KnowledgeMapProps = {
  className?: string;
};

/**
 * Static, low-contrast “knowledge map” diagram.
 * Intentionally non-interactive and visually quiet.
 */
export function KnowledgeMap({ className }: KnowledgeMapProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 336"
      role="img"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMinYMin meet"
      overflow="visible"
    >
      <defs>
        <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.25" />
        </filter>
      </defs>

      <style>
        {`
          .km-halo {
            transform-box: fill-box;
            transform-origin: center;
            animation: km-halo-pulse var(--km-halo-dur, 4.6s) ease-in-out var(--km-halo-delay, 0s) infinite;
            will-change: transform, opacity;
          }

          .km-endpoint {
            transform-box: fill-box;
            transform-origin: center;
            animation: km-pulse var(--km-endpoint-dur, 3.2s) ease-in-out var(--km-endpoint-delay, 0s) infinite;
            filter: drop-shadow(0 0 2px currentColor);
          }

          @keyframes km-halo-pulse {
            0%,
            100% {
              transform: scale(1);
              opacity: 0.72;
            }
            50% {
              transform: scale(1.12);
              opacity: 0.92;
            }
          }

          @keyframes km-pulse {
            0%,
            100% {
              transform: scale(1);
              opacity: 0.46;
            }
            50% {
              transform: scale(1.08);
              opacity: 0.68;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .km-halo {
              animation: none;
            }
            .km-endpoint {
              animation: none;
              filter: none;
            }
          }
        `}
      </style>

      {/* Scale internals only (no layout / container changes) */}
      <g transform="translate(-2 14) translate(120 168) scale(1.15 0.92) translate(-120 -168)">
        {/* Structural backbone */}
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M56 82 C78 110, 90 128, 104 150 C116 170, 134 182, 158 198"
            opacity="0.42"
            filter="url(#soften)"
          />
          <path d="M158 198 C142 226, 118 248, 88 270" opacity="0.38" />
          <path d="M158 198 C174 236, 176 270, 160 316" opacity="0.36" />
          <path d="M88 270 C96 304, 114 330, 142 352" opacity="0.34" />
          <path d="M104 150 C132 142, 160 134, 190 128" opacity="0.32" />
          <path d="M88 270 C110 262, 134 258, 172 262" opacity="0.30" />
        </g>

        {/* Secondary connections (subtle, dashed) */}
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 6"
          opacity="0.32"
        >
          <path d="M56 82 C84 74, 112 74, 136 82" />
          <path d="M190 128 C186 156, 178 178, 158 198" />
          <path d="M172 262 C198 266, 210 284, 214 310" />
          <path d="M142 352 C122 372, 92 386, 56 392" />
        </g>

        {/* Nodes (tinted halos + paper cores) */}
        <g>
          {/* Money */}
          <circle
            className="km-halo"
            cx="56"
            cy="82"
            r="16"
            fill="rgba(33, 181, 143, 0.18)"
            opacity="0.88"
            style={
              {
                ["--km-halo-delay" as any]: "0s",
                ["--km-halo-dur" as any]: "12.8s",
              } as React.CSSProperties
            }
          />
          <circle cx="56" cy="82" r="7.5" fill="var(--surface)" stroke="currentColor" strokeWidth="1.4" opacity="0.70" />

          {/* Incentives */}
          <circle
            className="km-halo"
            cx="104"
            cy="150"
            r="18"
            fill="rgba(123, 108, 255, 0.18)"
            opacity="0.86"
            style={
              {
                ["--km-halo-delay" as any]: "0.35s",
                ["--km-halo-dur" as any]: "10.9s",
              } as React.CSSProperties
            }
          />
          <circle cx="104" cy="150" r="8" fill="var(--surface)" stroke="currentColor" strokeWidth="1.4" opacity="0.70" />

          {/* Trade-offs */}
          <circle
            className="km-halo"
            cx="190"
            cy="128"
            r="14"
            fill="rgba(255, 122, 107, 0.18)"
            opacity="0.80"
            style={
              {
                ["--km-halo-delay" as any]: "0.7s",
                ["--km-halo-dur" as any]: "14.2s",
              } as React.CSSProperties
            }
          />
          <circle cx="190" cy="128" r="7" fill="var(--surface)" stroke="currentColor" strokeWidth="1.4" opacity="0.70" />

          {/* Behavior */}
          <circle
            className="km-halo"
            cx="88"
            cy="270"
            r="18"
            fill="rgba(33, 181, 143, 0.18)"
            opacity="0.74"
            style={
              {
                ["--km-halo-delay" as any]: "1.05s",
                ["--km-halo-dur" as any]: "9.7s",
              } as React.CSSProperties
            }
          />
          <circle cx="88" cy="270" r="8" fill="var(--surface)" stroke="currentColor" strokeWidth="1.4" opacity="0.70" />

          {/* Patterns */}
          <circle
            className="km-halo"
            cx="160"
            cy="316"
            r="16"
            fill="rgba(123, 108, 255, 0.18)"
            opacity="0.72"
            style={
              {
                ["--km-halo-delay" as any]: "1.4s",
                ["--km-halo-dur" as any]: "13.5s",
              } as React.CSSProperties
            }
          />
          <circle cx="160" cy="316" r="7.5" fill="var(--surface)" stroke="currentColor" strokeWidth="1.4" opacity="0.70" />

          {/* Bridge node */}
          <circle cx="158" cy="198" r="12" fill="var(--border)" opacity="0.92" />
          <circle cx="158" cy="198" r="6.2" fill="var(--surface)" stroke="currentColor" strokeWidth="1.4" opacity="0.70" />

          {/* Quiet satellite hints (endpoints) */}
          <circle
            className="km-endpoint"
            cx="136"
            cy="82"
            r="5.5"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.45"
            style={
              {
                ["--km-endpoint-delay" as any]: "0s",
                ["--km-endpoint-dur" as any]: "8.6s",
              } as React.CSSProperties
            }
          />
          <circle
            className="km-endpoint"
            cx="172"
            cy="262"
            r="5.5"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.45"
            style={
              {
                ["--km-endpoint-delay" as any]: "0.45s",
                ["--km-endpoint-dur" as any]: "11.2s",
              } as React.CSSProperties
            }
          />
          <circle
            className="km-endpoint"
            cx="214"
            cy="310"
            r="5.5"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.40"
            style={
              {
                ["--km-endpoint-delay" as any]: "0.9s",
                ["--km-endpoint-dur" as any]: "9.1s",
              } as React.CSSProperties
            }
          />
          <circle
            className="km-endpoint"
            cx="142"
            cy="352"
            r="5.5"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.42"
            style={
              {
                ["--km-endpoint-delay" as any]: "1.35s",
                ["--km-endpoint-dur" as any]: "12.4s",
              } as React.CSSProperties
            }
          />
        </g>
      </g>
    </svg>
  );
}


import React from "react";

export function BridgeLoopGraphic() {
  return (
    <div className="bridgeLoopWrap" aria-hidden="true">
      <svg
        className="bridgeLoopSvg"
        viewBox="0 0 620 260"
        width="620"
        height="260"
        focusable="false"
      >
        <defs>
          <linearGradient
            id="usd1BridgeLoopGrad"
            x1="40"
            y1="120"
            x2="580"
            y2="120"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#21b58f" stopOpacity="0.65" />
            <stop offset="0.55" stopColor="#b7e6d9" stopOpacity="0.32" />
            <stop offset="1" stopColor="#ff7a6b" stopOpacity="0.55" />
          </linearGradient>
          <filter id="usd1BridgeLoopBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        </defs>

        {/* Soft, abstract loop path (closed) */}
        <path
          d="M150 136
             C120 58 210 28 274 84
             C320 124 342 172 386 186
             C450 206 520 178 512 124
             C504 70 434 60 382 96
             C326 134 302 220 230 214
             C176 210 140 176 150 136
             Z"
          pathLength={1000}
          fill="none"
          stroke="url(#usd1BridgeLoopGrad)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.11"
          filter="url(#usd1BridgeLoopBlur)"
        />

        <path
          d="M150 136
             C120 58 210 28 274 84
             C320 124 342 172 386 186
             C450 206 520 178 512 124
             C504 70 434 60 382 96
             C326 134 302 220 230 214
             C176 210 140 176 150 136
             Z"
          pathLength={1000}
          fill="none"
          stroke="url(#usd1BridgeLoopGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.20"
        />

        {/* Slow continuous drift: a mostly-solid dash with a subtle moving "breath" gap */}
        <path
          className="bridgeLoopFlow"
          d="M150 136
             C120 58 210 28 274 84
             C320 124 342 172 386 186
             C450 206 520 178 512 124
             C504 70 434 60 382 96
             C326 134 302 220 230 214
             C176 210 140 176 150 136
             Z"
          pathLength={1000}
          fill="none"
          stroke="url(#usd1BridgeLoopGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.18"
          strokeDasharray="860 140"
        />
      </svg>

      {/* Small, understated USD1 observer (expressionless; no text) */}
      <svg
        className="bridgeUsd1"
        viewBox="0 0 180 180"
        width="180"
        height="180"
        focusable="false"
      >
        <defs>
          <filter id="usd1BridgeSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000" floodOpacity="0.10" />
          </filter>
        </defs>
        <g filter="url(#usd1BridgeSoftShadow)" opacity="0.88">
          {/* body (sitting) */}
          <path
            d="M52 150c0-30 16-50 38-50s38 20 38 50"
            fill="rgba(255,255,255,0.78)"
            stroke="rgba(15,23,42,0.10)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* head */}
          <path
            d="M90 36c-30 0-54 24-54 54 0 17 8 33 21 43 9 7 21 11 33 11s24-4 33-11c13-10 21-26 21-43 0-30-24-54-54-54Z"
            fill="rgba(255,255,255,0.86)"
            stroke="rgba(15,23,42,0.10)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* ears */}
          <path
            d="M42 70c-13 3-24 15-24 28s10 20 23 18"
            fill="rgba(244,246,255,0.78)"
            stroke="rgba(15,23,42,0.10)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M138 70c13 3 24 15 24 28s-10 20-23 18"
            fill="rgba(244,246,255,0.78)"
            stroke="rgba(15,23,42,0.10)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* horn */}
          <path
            d="M86 20c8 10 15 28 12 45-7-12-17-22-30-28 5-8 11-14 18-17Z"
            fill="rgba(123,108,255,0.26)"
          />
          {/* no eyes / mouth (expressionless by design) */}
        </g>
      </svg>
    </div>
  );
}



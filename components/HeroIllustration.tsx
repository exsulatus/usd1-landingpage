import React from "react";

export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 1200 520"
      width="100%"
      height="auto"
      role="img"
      aria-label="UnicornSheepDog1 smiling"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Flat, softly-shaded backdrop (no gradients) */}
      <rect x="18" y="18" width="1164" height="484" rx="46" fill="rgba(33, 181, 143, 0.10)" />
      <circle cx="1020" cy="110" r="86" fill="rgba(123, 108, 255, 0.10)" />
      <circle cx="1100" cy="380" r="72" fill="rgba(255, 122, 107, 0.10)" />
      <circle cx="130" cy="410" r="64" fill="rgba(123, 108, 255, 0.08)" />

      {/* Character */}
      <g transform="translate(130 70)">
        {/* Body */}
        <path
          d="M220 352c-74 0-134-50-134-124 0-78 55-142 142-142 74 0 132 44 149 114 5 19 6 40 3 64-7 60-68 88-160 88Z"
          fill="#ffffff"
          stroke="rgba(15, 23, 42, 0.08)"
          strokeWidth="4"
        />
        {/* Tail */}
        <path
          d="M90 290c-44 0-70 26-76 54 22-12 48-12 74 4 22 14 46 12 62 0-20-6-36-20-46-38-5-8-10-16-14-20Z"
          fill="#f4f6ff"
          stroke="rgba(15, 23, 42, 0.06)"
          strokeWidth="3"
        />

        {/* Head */}
        <path
          d="M230 88c-66 0-120 54-120 120 0 38 18 72 46 94 20 16 44 26 74 26 30 0 54-10 74-26 28-22 46-56 46-94 0-66-54-120-120-120Z"
          fill="#ffffff"
          stroke="rgba(15, 23, 42, 0.08)"
          strokeWidth="4"
        />

        {/* Ears */}
        <path
          d="M144 162c-22 4-42 24-42 46 0 22 18 34 40 30"
          fill="#f4f6ff"
          stroke="rgba(15, 23, 42, 0.12)"
          strokeWidth="3"
        />
        <path
          d="M316 162c22 4 42 24 42 46 0 22-18 34-40 30"
          fill="#f4f6ff"
          stroke="rgba(15, 23, 42, 0.12)"
          strokeWidth="3"
        />

        {/* Horn */}
        <path
          d="M220 62c16 18 30 50 26 82-14-22-34-40-56-50 8-14 18-24 30-32Z"
          fill="var(--accentLavender)"
        />

        {/* Eyes */}
        <circle cx="190" cy="220" r="12" fill="#0e1624" />
        <circle cx="270" cy="220" r="12" fill="#0e1624" />
        <circle cx="186" cy="216" r="4" fill="#ffffff" />
        <circle cx="266" cy="216" r="4" fill="#ffffff" />

        {/* Nose */}
        <path d="M230 252c-12 0-18 8-18 16 0 12 10 18 18 18s18-6 18-18c0-8-6-16-18-16Z" fill="#0e1624" />

        {/* Smile */}
        <path
          d="M202 296c10 12 18 16 28 16s18-4 28-16"
          stroke="#0e1624"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Little “magic” sparkle */}
        <path
          d="M372 114l8 12 12 8-12 8-8 12-8-12-12-8 12-8 8-12Z"
          fill="var(--accentCoral)"
          opacity="0.9"
        />

        {/* Bubble tail overlap for “intertwined” feel */}
        <path
          d="M470 150c-36 18-56 48-58 88 18-22 40-38 70-44"
          stroke="var(--accentMint)"
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.70"
        />
      </g>
    </svg>
  );
}



import React from "react";

export function TeacherMascot({
  stickAngleDeg,
  showStick = true
}: {
  stickAngleDeg: number;
  showStick?: boolean;
}) {
  const angle = Number.isFinite(stickAngleDeg) ? stickAngleDeg : 180;

  return (
    <svg
      viewBox="0 0 520 520"
      width="100%"
      height="auto"
      role="img"
      aria-label="Unicorn sheepdog teacher holding a pointing stick"
    >
      <defs>
        <filter id="shadow2" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000" floodOpacity="0.18" />
        </filter>
      </defs>

      <g filter="url(#shadow2)">
        {/* Body */}
        <path
          d="M148 434c0-86 50-132 112-132s112 46 112 132"
          fill="#ffffff"
          stroke="rgba(15, 23, 42, 0.10)"
          strokeWidth="4"
        />

        {/* Head */}
        <path
          d="M260 90c-70 0-126 56-126 126 0 40 18 76 48 100 22 18 48 28 78 28s56-10 78-28c30-24 48-60 48-100 0-70-56-126-126-126Z"
          fill="#ffffff"
          stroke="rgba(15, 23, 42, 0.10)"
          strokeWidth="4"
        />

        {/* Glasses */}
        <path
          d="M176 212c0-22 18-40 40-40h28c22 0 40 18 40 40v12c0 22-18 40-40 40h-28c-22 0-40-18-40-40v-12Z"
          fill="rgba(123, 108, 255, 0.10)"
          stroke="rgba(15, 23, 42, 0.22)"
          strokeWidth="4"
        />
        <path
          d="M276 212c0-22 18-40 40-40h28c22 0 40 18 40 40v12c0 22-18 40-40 40h-28c-22 0-40-18-40-40v-12Z"
          fill="rgba(33, 181, 143, 0.10)"
          stroke="rgba(15, 23, 42, 0.22)"
          strokeWidth="4"
        />
        <path
          d="M284 210h-8c-8 0-14 6-14 14v0"
          stroke="rgba(15, 23, 42, 0.22)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Eyes */}
        <circle cx="232" cy="230" r="10" fill="#0e1624" />
        <circle cx="336" cy="230" r="10" fill="#0e1624" />
        <circle cx="228" cy="226" r="3.5" fill="#ffffff" />
        <circle cx="332" cy="226" r="3.5" fill="#ffffff" />

        {/* Horn */}
        <path
          d="M250 62c18 20 34 56 30 92-16-24-40-44-66-56 10-16 22-28 36-36Z"
          fill="var(--accentLavender)"
        />

        {/* Ears */}
        <path
          d="M164 170c-26 6-48 30-48 56 0 26 20 40 46 36"
          fill="#f4f6ff"
          stroke="rgba(15, 23, 42, 0.10)"
          strokeWidth="4"
        />
        <path
          d="M356 170c26 6 48 30 48 56 0 26-20 40-46 36"
          fill="#f4f6ff"
          stroke="rgba(15, 23, 42, 0.10)"
          strokeWidth="4"
        />

        {/* Chalkboard-ish cape */}
        <path
          d="M168 318c20-20 54-32 92-32s72 12 92 32c-14 50-44 76-92 76s-78-26-92-76Z"
          fill="rgba(11, 18, 32, 0.08)"
        />

        {/* Tie */}
        <path
          d="M260 308l-16 22 16 18 16-18-16-22Z"
          fill="rgba(255, 122, 107, 0.22)"
          stroke="rgba(15, 23, 42, 0.10)"
        />
      </g>

      {/* Stick — optional; for the homepage Learn section we draw a long stick overlay above cards */}
      {showStick ? (
        <g transform={`rotate(${angle} 356 342)`}>
          <path
            d="M356 342L484 330"
            stroke="#6b5b3f"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M356 342L484 330"
            stroke="rgba(33, 181, 143, 0.40)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="484" cy="330" r="8" fill="var(--accentMint)" opacity="0.85" />
        </g>
      ) : null}

      {/* Hand */}
      <g filter="url(#shadow2)">
        <path
          d="M340 352c10-20 30-26 44-12 14 14 4 42-22 52-24 8-38-12-22-40Z"
          fill="#ffffff"
          stroke="rgba(15, 23, 42, 0.10)"
          strokeWidth="4"
        />
      </g>
    </svg>
  );
}



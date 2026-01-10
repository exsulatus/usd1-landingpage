"use client";

import React from "react";

type IdeasSituationsFieldProps = {
  className?: string;
};

type CSSVars = React.CSSProperties & {
  ["--tileTint"]?: string;
  ["--delayMs"]?: string;
  ["--driftR"]?: string;
  ["--driftDur"]?: string;
  ["--driftDelay"]?: string;
};

const TILES: Array<{
  text: string;
  top: string;
  left: string;
  width: string;
  tint: "lavender" | "mint" | "peach";
  delayMs: number;
}> = [
  {
    text: "You decide whether to buy now or wait for a sale.",
    top: "6%",
    left: "6%",
    width: "min(320px, 44%)",
    tint: "lavender",
    delayMs: 0,
  },
  {
    text: "A friend asks if a “guaranteed return” offer is real.",
    top: "18%",
    left: "52%",
    width: "min(340px, 46%)",
    tint: "lavender",
    delayMs: 70,
  },
  {
    text: "Your paycheck changes and you wonder where the difference went.",
    top: "32%",
    left: "16%",
    width: "min(360px, 48%)",
    tint: "lavender",
    delayMs: 120,
  },
  {
    text: "You compare two monthly plans and try to tell which costs less.",
    top: "40%",
    left: "58%",
    width: "min(320px, 44%)",
    tint: "mint",
    delayMs: 170,
  },
  {
    text: "You set a budget and realize it’s really a set of tradeoffs.",
    top: "52%",
    left: "8%",
    width: "min(330px, 46%)",
    tint: "mint",
    delayMs: 210,
  },
  {
    text: "You choose between paying down debt or building an emergency fund.",
    top: "60%",
    left: "46%",
    width: "min(380px, 54%)",
    tint: "mint",
    delayMs: 250,
  },
  {
    text: "You see a headline and ask what’s hype versus what’s data.",
    top: "72%",
    left: "18%",
    width: "min(340px, 48%)",
    tint: "peach",
    delayMs: 290,
  },
  {
    text: "You plan a trip and watch small fees quietly change the total.",
    top: "78%",
    left: "56%",
    width: "min(340px, 46%)",
    tint: "peach",
    delayMs: 330,
  },
  {
    text: "You talk about rent going up and ask why prices move.",
    top: "88%",
    left: "10%",
    width: "min(320px, 44%)",
    tint: "peach",
    delayMs: 370,
  },
];

function isInViewport(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || 0;
  // A bit forgiving so it doesn't "arm" when the section is barely visible.
  return r.top < vh * 0.92 && r.bottom > vh * 0.08;
}

export function IdeasSituationsField({ className }: IdeasSituationsFieldProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [mode, setMode] = React.useState<"off" | "armed" | "entered">("off");
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduced) {
      setMode("off");
      return;
    }

    // If it's already on screen, don't apply entrance motion (avoids a flash/jump).
    if (isInViewport(el)) {
      setMode("off");
      return;
    }

    setMode("armed");
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setMode("entered");
          io.disconnect();
        }
      },
      { root: null, threshold: 0.18 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hasActive = activeIdx !== null;

  return (
    <div
      ref={ref}
      className={`ideasSituationsField ${className ?? ""}`}
      data-mode={mode}
      data-has-active={hasActive ? "true" : "false"}
      role="list"
      aria-label="Familiar situations where ideas show up"
      onPointerLeave={() => setActiveIdx(null)}
      onBlurCapture={(e) => {
        const next = e.relatedTarget as Node | null;
        if (!next) {
          setActiveIdx(null);
          return;
        }
        if (!e.currentTarget.contains(next)) setActiveIdx(null);
      }}
    >
      {TILES.map((t, idx) => {
        const tintVar =
          t.tint === "lavender"
            ? "var(--tintLavender)"
            : t.tint === "mint"
              ? "var(--tintMint)"
              : "var(--tintCoral)";

        const driftR = 5 + (idx % 4); // 5–8px (very subtle)
        const driftDur = 34 + (idx % 7) * 6; // 34–70s (unsynced)
        const driftDelay = -idx * 3.5; // negative = desync on load

        const style: CSSVars = {
          top: t.top,
          left: t.left,
          width: t.width,
          ["--tileTint"]: tintVar,
          ["--delayMs"]: `${t.delayMs}ms`,
          ["--driftR"]: `${driftR}px`,
          ["--driftDur"]: `${driftDur}s`,
          ["--driftDelay"]: `${driftDelay}s`,
        };

        const isActive = activeIdx === idx;

        return (
          <div
            key={idx}
            className="ideasSituationTile"
            style={style}
            role="listitem"
            tabIndex={0}
            data-active={isActive ? "true" : "false"}
            onPointerEnter={() => setActiveIdx(idx)}
            onFocus={() => setActiveIdx(idx)}
          >
            <div className="ideasSituationDrift">
              <div className="ideasSituationCard">
                <span className="ideasSituationText">{t.text}</span>
              </div>
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .ideasSituationsField {
          position: relative;
          width: 100%;
          min-height: 440px;
          border-radius: var(--radius-xl);
          overflow: visible;
        }

        .ideasSituationTile {
          position: absolute;
          --dx: 0px;
          --dy: 0px;
          transform: translate3d(var(--dx), var(--dy), 0);
          z-index: 1;
          outline: none;
          cursor: default;
        }

        .ideasSituationText {
          position: relative;
          z-index: 1;
          display: block;
          color: var(--text);
          font-size: 16px;
          line-height: 1.38;
          letter-spacing: -0.01em;
          user-select: text;
        }

        /* Drift wrapper: moves the whole chip surface (felt, not noticed) */
        .ideasSituationDrift {
          position: relative;
          width: 100%;
          height: 100%;
          transform: translate3d(0, 0, 0) rotate(0deg);
          animation: ideasChipDrift var(--driftDur, 52s) ease-in-out infinite;
          animation-delay: var(--driftDelay, 0s);
          will-change: transform;
        }

        /* Softly framed rounded chip surface (tinted paper) */
        .ideasSituationCard {
          position: relative;
          max-width: 100%;
          padding: 16px 18px;
          border-radius: 18px;
          border: 1px solid rgba(17, 24, 39, 0.11);
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 10px 26px rgba(17, 24, 39, 0.085);
          overflow: hidden;
          isolation: isolate;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, opacity 180ms ease;
        }

        :global(html.dark) .ideasSituationCard {
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 10px 26px rgba(0, 0, 0, 0.42);
          background: rgba(15, 19, 20, 0.72);
        }

        /* Low-saturation tint overlay (lavender → mint → peach, per-tile) */
        .ideasSituationCard::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: var(--tileTint, rgba(33, 181, 143, 0.10));
          opacity: 0.95;
          z-index: 0;
        }

        /* Gentle inner highlight for "paper" consistency */
        .ideasSituationCard::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: radial-gradient(
            circle at 22% 18%,
            rgba(255, 255, 255, 0.44) 0%,
            rgba(255, 255, 255, 0) 58%
          );
          opacity: 0.75;
          z-index: 0;
        }

        /* Dark mode: reduce bright highlight + keep tints subtle */
        :global(html.dark) .ideasSituationCard::before {
          opacity: 0.72;
        }
        :global(html.dark) .ideasSituationCard::after {
          background: radial-gradient(
            circle at 22% 18%,
            rgba(255, 255, 255, 0.10) 0%,
            rgba(255, 255, 255, 0) 62%
          );
          opacity: 0.55;
        }

        @keyframes ideasChipDrift {
          0% {
            transform: translate3d(0, calc(var(--driftR) * -0.30), 0) rotate(-0.35deg);
          }
          20% {
            transform: translate3d(calc(var(--driftR) * 0.85), 0, 0) rotate(0.25deg);
          }
          40% {
            transform: translate3d(0, calc(var(--driftR) * 0.75), 0) rotate(0.45deg);
          }
          60% {
            transform: translate3d(calc(var(--driftR) * -0.90), 0, 0) rotate(-0.20deg);
          }
          80% {
            transform: translate3d(0, calc(var(--driftR) * -0.80), 0) rotate(0.15deg);
          }
          100% {
            transform: translate3d(0, calc(var(--driftR) * -0.30), 0) rotate(-0.35deg);
          }
        }

        /* Slight overlap and drift without “structure” */
        .ideasSituationTile:nth-child(1) {
          --dx: 0px;
          --dy: 0px;
        }
        .ideasSituationTile:nth-child(2) {
          --dx: -10px;
          --dy: 4px;
        }
        .ideasSituationTile:nth-child(3) {
          --dx: 8px;
          --dy: -6px;
        }
        .ideasSituationTile:nth-child(4) {
          --dx: -6px;
          --dy: 6px;
        }
        .ideasSituationTile:nth-child(5) {
          --dx: 10px;
          --dy: 2px;
        }
        .ideasSituationTile:nth-child(6) {
          --dx: -8px;
          --dy: -4px;
        }
        .ideasSituationTile:nth-child(7) {
          --dx: 6px;
          --dy: 6px;
        }
        .ideasSituationTile:nth-child(8) {
          --dx: -10px;
          --dy: -2px;
        }
        .ideasSituationTile:nth-child(9) {
          --dx: 8px;
          --dy: 4px;
        }

        /* Optional entrance motion on scroll (no loops) */
        .ideasSituationsField[data-mode="armed"] .ideasSituationTile {
          opacity: 0;
          transform: translate3d(var(--dx), calc(var(--dy) + 10px), 0);
          transition: opacity 520ms ease, transform 520ms ease;
          transition-delay: var(--delayMs, 0ms);
        }
        .ideasSituationsField[data-mode="entered"] .ideasSituationTile {
          opacity: 1;
          transform: translate3d(var(--dx), var(--dy), 0);
        }

        /* Hover/focus pop-out above neighbors */
        .ideasSituationTile:hover,
        .ideasSituationTile:focus-visible,
        .ideasSituationTile[data-active="true"] {
          z-index: 30;
        }

        .ideasSituationTile:hover .ideasSituationCard,
        .ideasSituationTile:focus-visible .ideasSituationCard,
        .ideasSituationTile[data-active="true"] .ideasSituationCard {
          box-shadow: 0 16px 44px rgba(17, 24, 39, 0.16);
          border-color: rgba(17, 24, 39, 0.18);
          transform: translate3d(0, 0, 0) scale(1.035);
        }

        :global(html.dark) .ideasSituationTile:hover .ideasSituationCard,
        :global(html.dark) .ideasSituationTile:focus-visible .ideasSituationCard,
        :global(html.dark) .ideasSituationTile[data-active="true"] .ideasSituationCard {
          box-shadow: 0 18px 46px rgba(0, 0, 0, 0.66);
          border-color: rgba(255, 255, 255, 0.18);
        }

        .ideasSituationTile:hover .ideasSituationCard::before,
        .ideasSituationTile:focus-visible .ideasSituationCard::before,
        .ideasSituationTile[data-active="true"] .ideasSituationCard::before {
          opacity: 1;
        }

        /* Dim non-hovered chips when one is active */
        .ideasSituationsField[data-has-active="true"] .ideasSituationCard {
          opacity: 0.72;
          filter: saturate(0.96) contrast(0.98);
        }
        .ideasSituationsField[data-has-active="true"] .ideasSituationTile[data-active="true"] .ideasSituationCard {
          opacity: 1;
          filter: saturate(1.02) contrast(1.03);
        }

        @media (max-width: 980px) {
          .ideasSituationsField {
            min-height: 520px;
          }

          /* Reflow the field to stay full without a strict grid */
          .ideasSituationTile {
            font-size: 16px;
          }
        }

        @media (max-width: 560px) {
          .ideasSituationsField {
            min-height: 560px;
          }
          .ideasSituationTile {
            width: min(92%, 380px) !important;
            left: 4% !important;
          }

          .ideasSituationTile:nth-child(1) {
            top: 4% !important;
          }
          .ideasSituationTile:nth-child(2) {
            top: 16% !important;
          }
          .ideasSituationTile:nth-child(3) {
            top: 30% !important;
          }
          .ideasSituationTile:nth-child(4) {
            top: 42% !important;
          }
          .ideasSituationTile:nth-child(5) {
            top: 54% !important;
          }
          .ideasSituationTile:nth-child(6) {
            top: 66% !important;
          }
          .ideasSituationTile:nth-child(7) {
            top: 78% !important;
          }
          .ideasSituationTile:nth-child(8) {
            top: 90% !important;
          }
          .ideasSituationTile:nth-child(9) {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ideasSituationsField[data-mode="armed"] .ideasSituationTile,
          .ideasSituationsField[data-mode="entered"] .ideasSituationTile {
            opacity: 1 !important;
            transform: translate3d(var(--dx), var(--dy), 0) !important;
            transition: none !important;
          }

          .ideasSituationDrift {
            animation: none !important;
            transform: translate3d(0, 0, 0) rotate(0deg) !important;
            will-change: auto;
          }
        }
      `}</style>
    </div>
  );
}



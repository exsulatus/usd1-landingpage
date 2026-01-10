"use client";

import React from "react";

type Tone = "mint" | "lavender" | "coral" | "neutral";

export function ExpandableCard({
  title,
  summary,
  children,
  details,
  defaultOpen = false,
  featured = false,
  tone = "neutral",
  className = ""
}: {
  title: string;
  summary: React.ReactNode;
  children: React.ReactNode;
  details?: React.ReactNode;
  defaultOpen?: boolean;
  featured?: boolean;
  tone?: Tone;
  className?: string;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const contentId = React.useId();
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const [measuredHeight, setMeasuredHeight] = React.useState(0);

  const toneTint =
    tone === "mint"
      ? "var(--tintMint)"
      : tone === "lavender"
        ? "var(--tintLavender)"
        : tone === "coral"
          ? "var(--tintCoral)"
          : "rgba(17, 24, 39, 0.04)";

  React.useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el || !details) return;

    function measure() {
      if (el) setMeasuredHeight(el.scrollHeight);
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [details]);

  return (
    <div
      className={`expCard card ${featured ? "expFeatured" : "expSecondary"} ${open ? "isOpen" : ""} ${className}`}
      style={{ ["--expTint" as any]: toneTint }}
    >
      <div className="expHoverPattern" aria-hidden="true" />
      <div className="expVisiblePart">
        <button
          type="button"
          className="expHeader"
          aria-expanded={open}
          aria-controls={details ? contentId : undefined}
          onClick={() => details && setOpen((v) => !v)}
          style={{ cursor: details ? "pointer" : "default" }}
        >
          <div className="expHeaderText">
            <div className="expTitleRow">
              <div className="expTitle">{title}</div>
              {details && (
                <span className="expChevron" aria-hidden="true">
                  ▾
                </span>
              )}
            </div>
            <div className="expSummary">{summary}</div>
          </div>
        </button>

        <div className="expChildrenArea">
          {children}
        </div>
      </div>

      {details && (
        <div
          id={contentId}
          className="expBody"
          style={{ height: open ? measuredHeight : 0 }}
          aria-hidden={!open}
        >
          <div ref={innerRef} className="expBodyInner">
            {details}
          </div>
        </div>
      )}

      <style jsx>{`
        .expCard {
          padding: 0;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--surface);
          position: relative;
        }

        .expHoverPattern {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 400ms ease;
          pointer-events: none;
          z-index: 1;
          /* Stained glass feel: hard-edged geometric shapes with varying greens */
          background-image: 
            conic-gradient(from 0deg at 50% 50%,
              rgba(33, 181, 143, 0.15) 0deg 60deg,
              rgba(22, 122, 96, 0.12) 60deg 120deg,
              rgba(33, 181, 143, 0.2) 120deg 180deg,
              rgba(168, 230, 207, 0.18) 180deg 240deg,
              rgba(33, 181, 143, 0.1) 240deg 300deg,
              rgba(22, 122, 96, 0.16) 300deg 360deg
            ),
            linear-gradient(15deg, rgba(33, 181, 143, 0.08) 0%, transparent 40%),
            linear-gradient(165deg, rgba(22, 122, 96, 0.06) 0%, transparent 40%);
          background-blend-mode: multiply;
        }

        .expCard:hover .expHoverPattern {
          opacity: 1;
        }

        .expFeatured {
          box-shadow: var(--shadowMd);
        }
        .expSecondary {
          box-shadow: var(--shadowSm);
        }

        .expVisiblePart {
          position: relative;
          z-index: 2;
        }

        .expHeader {
          width: 100%;
          text-align: left;
          border: 0;
          background: transparent;
          color: inherit;
          padding: 20px 24px 10px 24px;
          position: relative;
          z-index: 1;
          transition: padding 200ms ease;
        }
        .isOpen .expHeader {
          padding: 24px 24px 12px 24px;
        }
        .expHeader:focus-visible {
          outline: none;
          box-shadow: inset 0 0 0 2px var(--accentMint);
          border-radius: var(--radius-xl) var(--radius-xl) 0 0;
        }
        .expHeaderText {
          display: grid;
          gap: 8px;
        }
        .expTitleRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .expTitle {
          font-weight: 950;
          letter-spacing: -0.02em;
          font-size: 20px;
          line-height: 1.15;
        }
        .expSummary {
          color: var(--muted);
          font-size: 16px;
          line-height: 1.5;
          max-width: 72ch;
        }
        .expChevron {
          width: 34px;
          height: 34px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.65);
          transform: rotate(0deg);
          transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
          flex: 0 0 auto;
        }
        :global(html.dark) .expChevron {
          background: rgba(255, 255, 255, 0.06);
        }
        .isOpen .expChevron {
          transform: rotate(180deg);
          background: rgba(255, 255, 255, 0.8);
        }
        :global(html.dark) .isOpen .expChevron {
          background: rgba(255, 255, 255, 0.08);
        }

        .expChildrenArea {
          padding: 0 24px 20px 24px;
          display: grid;
          gap: 16px;
          transition: padding 200ms ease;
        }
        .isOpen .expChildrenArea {
          padding: 0 24px 24px 24px;
        }

        .expBody {
          overflow: hidden;
          position: relative;
          z-index: 1;
          transition: height 220ms ease;
          background: rgba(255, 255, 255, 0.3);
          border-top: 1px dashed var(--border);
        }
        :global(html.dark) .expBody {
          background: rgba(0, 0, 0, 0.1);
        }
        .expBodyInner {
          padding: 20px 24px;
          display: grid;
          gap: 16px;
        }
      `}</style>
    </div>
  );
}



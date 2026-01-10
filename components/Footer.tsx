"use client";

import Link from "next/link";
import React from "react";

type FooterOverlay = "none" | "faq" | "howto";

function FaqItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `${id}-panel`;
  return (
    <div className={`faqItem ${isOpen ? "isOpen" : ""}`}>
      <button
        type="button"
        className="faqQuestion"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="faqQText">{question}</span>
        <span className="faqChevron" aria-hidden="true">
          ▾
        </span>
      </button>
      {isOpen ? (
        <div id={panelId} className="faqAnswer" role="region" aria-label={question}>
          {answer}
        </div>
      ) : null}
    </div>
  );
}

export function Footer() {
  const [overlay, setOverlay] = React.useState<FooterOverlay>("none");
  const [overlayMounted, setOverlayMounted] = React.useState(false);
  const [openFaqId, setOpenFaqId] = React.useState<string | null>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);

  const isOverlayOpen = overlay !== "none";

  const openOverlay = React.useCallback((next: Exclude<FooterOverlay, "none">) => {
    setOverlay((cur) => (cur === next ? "none" : next));
  }, []);

  const closeOverlay = React.useCallback(() => setOverlay("none"), []);

  React.useEffect(() => {
    if (overlay !== "none") {
      setOverlayMounted(true);
      return;
    }
    if (!overlayMounted) return;
    const t = window.setTimeout(() => setOverlayMounted(false), 220);
    return () => window.clearTimeout(t);
  }, [overlay, overlayMounted]);

  React.useEffect(() => {
    if (!isOverlayOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeOverlay, isOverlayOpen]);

  React.useEffect(() => {
    if (!isOverlayOpen) return;
    closeBtnRef.current?.focus();
  }, [isOverlayOpen]);

  React.useEffect(() => {
    if (overlay !== "faq") setOpenFaqId(null);
  }, [overlay]);

  const faqItems = React.useMemo(
    () => [
      {
        id: "what-is-usd1",
        q: "What is $USD1?",
        a: "USD1 is a memecoin on Solana. It’s community-driven, high-volatility, and meant to be explored carefully—start small and move at your own pace.",
      },
      {
        id: "financial-advice",
        q: "Is this financial advice?",
        a: "No. This site is for education and links—not investment recommendations. Memecoins can go to zero; only risk what you can comfortably lose.",
      },
      {
        id: "contract-verification",
        q: "Where can I find the contract and verification?",
        a: "Use the official links on this site and our announcements. Then cross-check the contract on Solscan and confirm the same address appears on charts and swap UIs.",
      },
      {
        id: "streamflow-lock",
        q: "What’s the Streamflow lock?",
        a: "Streamflow can be used to lock tokens on a public schedule. It’s one transparency signal—still verify the exact lock details and wallet addresses yourself.",
      },
      {
        id: "charts-liquidity",
        q: "Where do I see charts/liquidity?",
        a: "Charts/liquidity views typically live on DexScreener, with swaps on Jupiter. For on-chain details (holders, txs), use Solscan.",
      },
      {
        id: "announcements-links",
        q: "Where do announcements/live links live?",
        a: "Check the site’s announcements and our official social channels. Treat random DMs and sponsored replies as untrusted until verified across multiple sources.",
      },
      {
        id: "why-price-changes-fast",
        q: "Why does the price move so fast?",
        a: "Memecoins are thin, sentiment-driven markets. Small trades can move price, spreads can widen, and slippage can spike—especially during hype cycles.",
      },
    ],
    [],
  );

  return (
    <footer className="siteFooter" aria-label="Site footer">
      <div className="footerPanel">
        <div className="container">
          <div className="footerInner">
            <div className="footerLayout">
              {/* Left: Navigation */}
              <div className="footerLeft">
                <div className="footerNav">
                  <div className="footerNavGroup">
                    <span className="groupLabel">Resources</span>
                    <div className="footerPills" aria-label="Footer quick panels">
                      <button
                        type="button"
                        className={`footerPillBtn ${overlay === "howto" ? "isActive" : ""}`}
                        onClick={() => openOverlay("howto")}
                        aria-expanded={overlay === "howto"}
                      >
                        How to buy
                      </button>
                      <button
                        type="button"
                        className={`footerPillBtn ${overlay === "faq" ? "isActive" : ""}`}
                        onClick={() => openOverlay("faq")}
                        aria-expanded={overlay === "faq"}
                      >
                        FAQ
                      </button>
                    </div>
                  </div>

                  <div className="footerNavGroup">
                    <span className="groupLabel">Ecosystem</span>
                    <ul className="linkList">
                      <li>
                        <a
                          href="https://dexscreener.com/solana"
                          className="footerLink"
                          target="_blank"
                          rel="noreferrer"
                        >
                          DexScreener
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://jup.ag"
                          className="footerLink"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Jupiter
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://solscan.io/"
                          className="footerLink"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Solscan
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://streamflow.finance/"
                          className="footerLink"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Token Locks
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="footerNavGroup">
                    <span className="groupLabel">Social</span>
                    <ul className="linkList">
                      <li>
                        <a
                          href="https://x.com/unicornsheepdog"
                          className="footerLink"
                          target="_blank"
                          rel="noreferrer"
                        >
                          X
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://t.me/unicornsheepdog"
                          className="footerLink"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Telegram
                        </a>
                      </li>
                      <li>
                        <Link href="/gallery" className="footerLink">
                          Meme / Art Gallery
                        </Link>
                      </li>
                      <li>
                        <a href="mailto:hello@theunicornsheep.dog" className="footerLink">
                          hello@theunicornsheep.dog
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right: Editorial Typography */}
              <div className="footerRight">
                <div className="statementWrap">
                  <p className="statementEyebrow">Not all questions have clear answers.</p>
                  <h2 className="statementHeadline">Stay curious.</h2>
                </div>
              </div>
            </div>

            <p className="footerDisclaimer">
              USD1 is a memecoin. Memecoins are risky. Only invest what you are willing to lose.
            </p>
          </div>
        </div>

        {/* Footer overlays (cover the entire footer area) */}
        {overlayMounted ? (
          <div className={`footerOverlayRoot ${isOverlayOpen ? "isOpen" : ""}`} aria-hidden={!isOverlayOpen}>
            <div
              className="footerOverlayBackdrop"
              onClick={closeOverlay}
            />
            <div
              className="container footerOverlayContainer"
              onClick={(e) => {
                if (e.target === e.currentTarget) closeOverlay();
              }}
            >
              <button
                type="button"
                className="footerOverlayClose"
                onClick={closeOverlay}
                aria-label="Close"
                ref={closeBtnRef}
              >
                ×
              </button>
              <div
                className="footerOverlayPanel"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="footerOverlayTitle"
              >
                {overlay === "faq" ? (
                  <div className="footerOverlayContent">
                    <div className="footerOverlayHead">
                      <h3 className="footerOverlayTitle" id="footerOverlayTitle">
                        FAQ
                      </h3>
                      <p className="footerOverlaySub">
                        Calm answers, verified links, and a reminder to go slow.
                      </p>
                    </div>

                    <div className="faqList" aria-label="Frequently asked questions">
                      {faqItems.map((item) => (
                        <FaqItem
                          key={item.id}
                          id={item.id}
                          question={item.q}
                          answer={item.a}
                          isOpen={openFaqId === item.id}
                          onToggle={() => setOpenFaqId((cur) => (cur === item.id ? null : item.id))}
                        />
                      ))}
                    </div>

                    <div className="footerOverlayHint">
                      Tip: click outside, press the <span className="kbdLike">×</span>, or press <span className="kbdLike">Esc</span> to close.
                    </div>
                  </div>
                ) : null}

                {overlay === "howto" ? (
                  <div className="footerOverlayContent">
                    <div className="footerOverlayHead">
                      <h3 className="footerOverlayTitle" id="footerOverlayTitle">
                        How to buy
                      </h3>
                      <p className="footerOverlaySub">
                        A simple Solana flow. No hype—just steps and safety checks.
                      </p>
                    </div>

                    <div className="howToGrid">
                      <div className="howToSteps">
                        <h4 className="overlaySectionTitle">Steps</h4>
                        <ol className="overlayOl">
                          <li>Get a Solana wallet (Phantom, Solflare, etc.).</li>
                          <li>Fund it with a small amount of SOL (fees + swap).</li>
                          <li>
                            Use{" "}
                            <a
                              href="https://jup.ag"
                              target="_blank"
                              rel="noreferrer"
                              className="overlayLink"
                            >
                              Jupiter
                            </a>{" "}
                            to swap SOL → USD1.
                          </li>
                          <li>Verify the contract address from official sources.</li>
                          <li>
                            Cross-check on{" "}
                            <a
                              href="https://solscan.io/"
                              target="_blank"
                              rel="noreferrer"
                              className="overlayLink"
                            >
                              Solscan
                            </a>{" "}
                            and{" "}
                            <a
                              href="https://dexscreener.com/solana"
                              target="_blank"
                              rel="noreferrer"
                              className="overlayLink"
                            >
                              DexScreener
                            </a>
                            .
                          </li>
                        </ol>
                      </div>

                      <div className="howToSafety">
                        <h4 className="overlaySectionTitle">Safety checks</h4>
                        <ul className="overlayUl">
                          <li>
                            <strong>Verify the contract address</strong> in at least two trusted places
                            (site + Solscan, or announcements + DexScreener).
                          </li>
                          <li>
                            <strong>Avoid fake links</strong>: ignore random DMs/replies; use bookmarks and
                            official channels.
                          </li>
                          <li>
                            <strong>Slippage basics</strong>: if price is moving fast, slippage can spike
                            —start small and understand what you’re approving.
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="footerOverlayHint">
                      Tip: click outside, press the <span className="kbdLike">×</span>, or press <span className="kbdLike">Esc</span> to close.
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <style jsx>{`
        .siteFooter {
          margin-top: 0;
        }

        .footerPanel {
          background: var(--surface-2);
          color: var(--text);
          overflow: hidden;
          position: relative;
          border-top: 1px solid var(--border);
        }
        :global(html.dark) .footerPanel {
          background: var(--surface);
        }

        .footerInner {
          padding: 100px 0 60px 0;
        }

        .footerLayout {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 80px;
          align-items: start;
        }

        /* Left Column */
        .footerLeft {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .footerNav {
          display: flex;
          flex-wrap: nowrap;
          gap: 40px 60px;
        }

        .footerNavGroup {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .groupLabel {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted2);
        }

        .linkList {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footerLink {
          display: block;
          font-size: 17px;
          font-weight: 500;
          color: var(--muted);
          transition: color 150ms ease, transform 150ms ease;
          text-decoration: none;
        }

        .footerLink:hover {
          color: var(--text);
          transform: translateX(3px);
        }

        .footerPills {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
        }

        .footerPillBtn {
          appearance: none;
          border: 1px solid var(--border);
          background: var(--surface-2);
          color: var(--text);
          border-radius: 999px;
          padding: 10px 14px;
          font-size: 14px;
          font-weight: 650;
          letter-spacing: -0.01em;
          cursor: pointer;
          transition: transform 140ms ease, background 140ms ease, border-color 140ms ease;
        }
        .footerPillBtn:hover {
          transform: translateY(-1px);
          background: var(--surface-3);
          border-color: var(--borderStrong);
        }
        .footerPillBtn:focus-visible {
          outline: none;
          box-shadow: var(--focus);
        }
        .footerPillBtn.isActive {
          background: var(--surface-3);
          border-color: var(--borderStrong);
          color: var(--text);
        }

        /* Right Column */
        .footerRight {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .statementWrap {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .statementEyebrow {
          margin: 0;
          font-size: 15px;
          font-weight: 500;
          font-style: italic;
          letter-spacing: 0;
          color: var(--muted2);
          text-align: right;
          white-space: nowrap;
        }

        .statementHeadline {
          margin: 0;
          font-size: 82px;
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.05em;
          color: var(--text);
          text-align: right;
          white-space: nowrap;
        }

        .footerDisclaimer {
          margin: 80px 0 0 0;
          font-size: 13px;
          color: var(--muted2);
          line-height: 1.6;
          text-align: center;
        }

        /* Overlay system */
        .footerOverlayRoot {
          position: fixed;
          inset: 0;
          z-index: 1000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 180ms ease;
        }

        .footerOverlayRoot.isOpen {
          opacity: 1;
          pointer-events: auto;
        }

        .footerOverlayBackdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(2px);
        }

        .footerOverlayContainer {
          position: relative;
          height: 100%;
          padding: 80px 0 60px 0;
          display: flex;
          align-items: flex-end; /* Push panel to the bottom */
        }

        .footerOverlayPanel {
          position: relative;
          width: 100%;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 26px;
          box-shadow: var(--shadowLg);
          padding: 32px;
          max-height: 85vh;
          overflow: auto;
          transform: translateY(20px);
          opacity: 0;
          transition: transform 220ms ease, opacity 220ms ease;
        }

        .footerOverlayRoot.isOpen .footerOverlayPanel {
          transform: translateY(0);
          opacity: 1;
        }

        .footerOverlayClose {
          position: absolute;
          top: 24px;
          right: 20px;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          border: 1px solid var(--borderStrong);
          background: var(--surface);
          color: var(--text);
          cursor: pointer;
          font-size: 28px;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          z-index: 1010;
          transition: background 140ms ease, border-color 140ms ease, transform 140ms ease;
        }

        .footerOverlayClose:hover {
          background: var(--surface-2);
          border-color: var(--borderStrong);
          transform: translateY(-2px);
        }

        .footerOverlayClose:focus-visible {
          outline: none;
          box-shadow: var(--focus);
        }

        .footerOverlayContent {
          display: grid;
          gap: 18px;
          padding-top: 10px;
        }

        .footerOverlayHead {
          display: grid;
          gap: 10px;
          padding-right: 56px;
        }

        .footerOverlayTitle {
          margin: 0;
          font-size: 36px;
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.05;
        }

        .footerOverlaySub {
          margin: 0;
          font-size: 15px;
          color: var(--muted);
          line-height: 1.5;
          max-width: 70ch;
        }

        .footerOverlayHint {
          font-size: 13px;
          color: var(--muted2);
        }

        .kbdLike {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 2px 8px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--surface-2);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
            "Courier New", monospace;
          font-size: 12px;
          color: var(--muted);
        }

        /* FAQ */
        .faqList {
          display: grid;
          gap: 10px;
        }

        .faqItem {
          border: 1px solid var(--border);
          background: var(--surface-2);
          border-radius: 18px;
          overflow: hidden;
        }

        .faqQuestion {
          width: 100%;
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 14px 14px;
          background: transparent;
          border: 0;
          color: var(--text);
          cursor: pointer;
        }

        .faqQText {
          font-size: 16px;
          font-weight: 750;
          letter-spacing: -0.01em;
        }

        .faqChevron {
          color: var(--muted);
          transition: transform 160ms ease;
        }

        .faqItem.isOpen .faqChevron {
          transform: rotate(180deg);
        }

        .faqAnswer {
          padding: 0 14px 14px 14px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.5;
          max-width: 90ch;
        }

        /* How-to */
        .howToGrid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 18px;
          align-items: start;
        }

        .howToSteps,
        .howToSafety {
          border: 1px solid var(--border);
          background: var(--surface-2);
          border-radius: 18px;
          padding: 16px;
        }

        .overlaySectionTitle {
          margin: 0 0 10px 0;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted2);
        }

        .overlayOl {
          margin: 0;
          padding-left: 18px;
          display: grid;
          gap: 10px;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.45;
        }

        .overlayUl {
          margin: 0;
          padding-left: 18px;
          display: grid;
          gap: 10px;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.45;
        }

        .overlayLink {
          color: var(--text);
          text-decoration: underline;
          text-decoration-color: var(--border);
          text-underline-offset: 3px;
          transition: text-decoration-color 140ms ease, color 140ms ease;
        }

        .overlayLink:hover {
          color: var(--text);
          text-decoration-color: var(--borderStrong);
        }

        .overlayActions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .statementHeadline {
            font-size: 64px;
          }
          .footerInner {
            padding: 80px 0 50px 0;
          }
          .footerOverlayContainer {
            padding: 80px 0 50px 0;
          }
        }

        @media (max-width: 960px) {
          .footerLayout {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          
          .footerRight {
            order: -1;
          }

          .footerLeft {
            gap: 24px;
          }

          .howToGrid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .footerNav {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 600px) {
          .siteFooter {
            margin-top: 60px;
          }

          .footerInner {
            padding: 60px 0 32px 0;
          }
          .footerOverlayContainer {
            padding: 60px 0 32px 0;
          }

          .statementHeadline {
            font-size: 48px;
          }

          .statementEyebrow {
            font-size: 13px;
          }

          .footerNav {
            gap: 32px;
          }

          .footerOverlayTitle {
            font-size: 30px;
          }
        }
      `}</style>
    </footer>
  );
}

"use client";

import React from "react";
import { useI18n } from "@/lib/i18n/context";

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
  answer: React.ReactNode;
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
        <span className="faqChevronCircle">
          <svg className="faqChevron" width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4.5 7l4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
  const { t } = useI18n();
  const [overlay, setOverlay] = React.useState<FooterOverlay>("none");
  const [overlayMounted, setOverlayMounted] = React.useState(false);
  const [openFaqId, setOpenFaqId] = React.useState<string | null>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const [slippageOpen, setSlippageOpen] = React.useState(false);

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
    const tm = window.setTimeout(() => setOverlayMounted(false), 220);
    return () => window.clearTimeout(tm);
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
    setSlippageOpen(false);
  }, [overlay]);

  /* Listen for external triggers (e.g. header nav) */
  React.useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<"howto" | "faq">).detail;
      if (detail === "howto" || detail === "faq") {
        setOverlay(detail);
      }
    };
    window.addEventListener("open-footer-overlay", handler);
    return () => window.removeEventListener("open-footer-overlay", handler);
  }, []);

  const faqItems = React.useMemo(
    () =>
      [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
        id: `faq-${n}`,
        q: t(`footer.faq_q${n}` as any),
        a: t(`footer.faq_a${n}` as any),
      })),
    [t],
  );

  const overlayHint = t("footer.overlay_hint" as any);

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
                    <span className="groupLabel">{t("footer.resources")}</span>
                    <div className="footerPills" aria-label="Footer quick panels">
                      <button
                        type="button"
                        className={`footerPillBtn ${overlay === "howto" ? "isActive" : ""}`}
                        onClick={() => openOverlay("howto")}
                        aria-expanded={overlay === "howto"}
                      >
                        {t("footer.how_to_buy")}
                      </button>
                      <button
                        type="button"
                        className={`footerPillBtn ${overlay === "faq" ? "isActive" : ""}`}
                        onClick={() => openOverlay("faq")}
                        aria-expanded={overlay === "faq"}
                      >
                        {t("footer.faq")}
                      </button>
                    </div>
                  </div>

                  <div className="footerNavGroup">
                    <span className="groupLabel">{t("footer.ecosystem")}</span>
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
                          {t("footer.token_locks")}
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="footerNavGroup">
                    <span className="groupLabel">{t("footer.social")}</span>
                    <ul className="linkList">
                      <li>
                        <a
                          href="https://x.com/UnicornSheepDog"
                          className="footerLink"
                          target="_blank"
                          rel="noreferrer"
                        >
                          X
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://t.me/UnicornSheepDog1"
                          className="footerLink"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Telegram
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://t.me/USD1_Memes"
                          className="footerLink"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t("footer.meme_gallery")}
                        </a>
                      </li>
                      <li>
                        <a href="mailto:support@theunicornsheep.dog" className="footerLink">
                          support@theunicornsheep.dog
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right: Editorial Typography */}
              <div className="footerRight">
                <div className="statementWrap">
                  <p className="statementEyebrow">{t("footer.statement_eyebrow")}</p>
                  <h2 className="statementHeadline">{t("footer.statement_headline")}</h2>
                </div>
              </div>
            </div>

            <p className="footerDisclaimer">
              {t("footer.disclaimer")}
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
              <div
                className="footerOverlayPanel"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="footerOverlayTitle"
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
                {overlay === "faq" ? (
                  <div className="footerOverlayContent">
                    <div className="footerOverlayHead">
                      <h3 className="footerOverlayTitle" id="footerOverlayTitle">
                        {t("footer.faq_title" as any)}
                      </h3>
                      <p className="footerOverlaySub">
                        {t("footer.faq_sub" as any)}
                      </p>
                    </div>

                    <div className="faqList">
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
                      {overlayHint.split("{x}")[0]}
                      <span className="kbdLike">×</span>
                      {overlayHint.split("{x}")[1]?.split("{esc}")[0]}
                      <span className="kbdLike">Esc</span>
                      {overlayHint.split("{x}")[1]?.split("{esc}")[1]}
                    </div>
                  </div>
                ) : null}

                {overlay === "howto" ? (
                  <div className="footerOverlayContent">
                    <div className="footerOverlayHead">
                      <h3 className="footerOverlayTitle" id="footerOverlayTitle">
                        {t("footer.howto_title" as any)}
                      </h3>
                      <p className="footerOverlaySub">
                        {t("footer.howto_sub" as any)}
                      </p>
                    </div>

                    <div className="howToFlow">
                      <div className="howToCard howToCard--steps">
                        <h4 className="overlaySectionLabel">{t("footer.howto_steps" as any)}</h4>
                        <div className="stepTimeline">
                          <div className="stepRow">
                            <span className="stepNum">1</span>
                            <span className="stepText">{t("footer.howto_step1" as any)}</span>
                          </div>
                          <div className="stepRow">
                            <span className="stepNum">2</span>
                            <span className="stepText">{t("footer.howto_step2" as any)}</span>
                          </div>
                          <div className="stepRow">
                            <span className="stepNum">3</span>
                            <span className="stepText">
                              {t("footer.howto_step3_pre" as any)}{" "}
                              <a href="https://jup.ag" target="_blank" rel="noreferrer" className="overlayLink">
                                Jupiter
                              </a>{" "}
                              {t("footer.howto_step3_post" as any)}
                            </span>
                          </div>
                          <div className="stepRow">
                            <span className="stepNum">4</span>
                            <span className="stepText">{t("footer.howto_step4" as any)}</span>
                          </div>
                          <div className="stepRow">
                            <span className="stepNum">5</span>
                            <span className="stepText">
                              {t("footer.howto_step5_pre" as any)}{" "}
                              <a href="https://solscan.io/" target="_blank" rel="noreferrer" className="overlayLink">
                                Solscan
                              </a>{" "}
                              {t("footer.howto_step5_mid" as any)}{" "}
                              <a href="https://dexscreener.com/solana" target="_blank" rel="noreferrer" className="overlayLink">
                                DexScreener
                              </a>
                              .
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="howToCard howToCard--safety">
                        <h4 className="overlaySectionLabel">{t("footer.howto_safety" as any)}</h4>
                        {!slippageOpen ? (
                          <div className="safetyList">
                            <div className="safetyItem">
                              <span className="safetyDot" />
                              <span className="safetyText">
                                {t("footer.howto_safety1" as any)}
                              </span>
                            </div>
                            <div className="safetyItem">
                              <span className="safetyDot" />
                              <span className="safetyText">
                                {t("footer.howto_safety2" as any)}
                              </span>
                            </div>
                            <div className="safetyItem">
                              <span className="safetyDot" />
                              <span className="safetyText">
                                {t("footer.howto_safety3" as any)}{" "}
                                <button
                                  type="button"
                                  className="slippageLink"
                                  onClick={() => setSlippageOpen(true)}
                                >
                                  {t("footer.howto_slippage_q" as any)}
                                </button>
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="slippageBody">
                            <p>
                              {t("footer.howto_slippage_p1" as any)}
                            </p>
                            <p>
                              {t("footer.howto_slippage_p2" as any)}
                            </p>
                            <p className="slippageMuted">
                              {t("footer.howto_slippage_tip" as any)}
                            </p>
                            <button
                              type="button"
                              className="slippageBack"
                              onClick={() => setSlippageOpen(false)}
                            >
                              {t("footer.howto_slippage_back" as any)}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="howToCTARow">
                      <a
                        href="https://jup.ag"
                        target="_blank"
                        rel="noreferrer"
                        className="howToCTABtn"
                      >
                        {t("footer.howto_cta" as any)}
                        <span className="howToCTAArrow" aria-hidden="true">&#8599;</span>
                      </a>
                    </div>

                    <div className="footerOverlayHint">
                      {overlayHint.split("{x}")[0]}
                      <span className="kbdLike">×</span>
                      {overlayHint.split("{x}")[1]?.split("{esc}")[0]}
                      <span className="kbdLike">Esc</span>
                      {overlayHint.split("{x}")[1]?.split("{esc}")[1]}
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
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          border: 1px solid rgba(255, 122, 107, 0.25);
          background: var(--surface-2);
          color: var(--accentCoral);
          cursor: pointer;
          font-size: 24px;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          transition: background 140ms ease, border-color 140ms ease, transform 140ms ease, color 140ms ease;
        }

        .footerOverlayClose:hover {
          background: rgba(255, 122, 107, 0.08);
          border-color: rgba(255, 122, 107, 0.40);
          color: var(--accentCoral);
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

        /* FAQ — :global() needed because FaqItem is a child component */
        .faqList {
          display: flex;
          flex-direction: column;
        }

        .faqList :global(.faqItem) {
          border-bottom: 1px solid var(--border);
        }

        .faqList :global(.faqItem:last-child) {
          border-bottom: none;
        }

        .faqList :global(.faqQuestion) {
          width: 100%;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 0;
          background: none;
          border: 0;
          color: var(--text);
          cursor: pointer;
        }

        .faqList :global(.faqQText) {
          flex: 1;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.015em;
          line-height: 1.35;
        }

        .faqList :global(.faqChevronCircle) {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 200ms ease;
        }

        .faqList :global(.faqItem:nth-child(3n+1) .faqChevronCircle) {
          background: rgba(33, 181, 143, 0.10);
        }
        .faqList :global(.faqItem:nth-child(3n+2) .faqChevronCircle) {
          background: rgba(255, 122, 107, 0.10);
        }
        .faqList :global(.faqItem:nth-child(3n) .faqChevronCircle) {
          background: rgba(123, 108, 255, 0.10);
        }

        :global(html.dark) .faqList :global(.faqItem:nth-child(3n+1) .faqChevronCircle) {
          background: rgba(33, 181, 143, 0.15);
        }
        :global(html.dark) .faqList :global(.faqItem:nth-child(3n+2) .faqChevronCircle) {
          background: rgba(255, 122, 107, 0.15);
        }
        :global(html.dark) .faqList :global(.faqItem:nth-child(3n) .faqChevronCircle) {
          background: rgba(123, 108, 255, 0.15);
        }

        .faqList :global(.faqChevron) {
          color: var(--muted2);
          transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faqList :global(.faqItem.isOpen .faqChevron) {
          transform: rotate(180deg);
        }

        .faqList :global(.faqAnswer) {
          padding: 0 0 20px 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.7;
          max-width: 90ch;
        }
        .faqList :global(.faqLink) {
          color: var(--accentMint);
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-color: rgba(33, 181, 143, 0.35);
          transition: text-decoration-color 150ms ease;
        }
        .faqList :global(.faqLink:hover) {
          text-decoration-color: var(--accentMint);
        }

        /* How-to */
        .howToFlow {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 18px;
          align-items: start;
        }

        .howToCard {
          border: 1px solid var(--border);
          background: var(--surface-2);
          border-radius: 18px;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .howToCard::before {
          content: "";
          position: absolute;
          top: 0;
          left: 24px;
          width: 36px;
          height: 3px;
          border-radius: 0 0 4px 4px;
        }

        .howToCard--steps::before {
          background: #21b58f;
        }

        .howToCard--safety::before {
          background: #ff7a6b;
        }

        /* How-to CTA row */
        .howToCTARow {
          display: flex;
          justify-content: center;
          padding: 24px 0 4px 0;
        }
        .howToCTABtn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          background: var(--accentMint);
          border: 1.5px solid var(--accentMint);
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: background 160ms ease, box-shadow 160ms ease;
          cursor: pointer;
        }
        .howToCTABtn:hover {
          background: #1ca37f;
          box-shadow: 0 2px 12px rgba(33, 181, 143, 0.25);
        }
        .howToCTAArrow {
          font-size: 15px;
        }

        .overlaySectionLabel {
          margin: 0 0 16px 0;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted2);
        }

        /* Step timeline */
        .stepTimeline {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .stepRow {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 11px 0;
          border-bottom: 1px solid var(--border);
        }

        .stepRow:first-child {
          padding-top: 0;
        }

        .stepRow:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .stepNum {
          flex-shrink: 0;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(33, 181, 143, 0.10);
          color: #21b58f;
          font-size: 13px;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0;
        }

        :global(html.dark) .stepNum {
          background: rgba(33, 181, 143, 0.18);
          color: #3bc9a4;
        }

        .stepText {
          font-size: 15px;
          line-height: 1.5;
          color: var(--muted);
          padding-top: 3px;
        }

        /* Safety list */
        .safetyList {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .safetyItem {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 11px 0;
          border-bottom: 1px solid var(--border);
        }

        .safetyItem:first-child {
          padding-top: 0;
        }

        .safetyItem:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .safetyDot {
          flex-shrink: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ff7a6b;
          margin-top: 7px;
        }

        :global(html.dark) .safetyDot {
          background: #ff9488;
        }

        .safetyText {
          font-size: 15px;
          line-height: 1.5;
          color: var(--muted);
        }

        /* Slippage inline link + flip body */
        .slippageLink {
          appearance: none;
          background: none;
          border: 0;
          padding: 0;
          font-size: inherit;
          font-weight: 600;
          color: #21b58f;
          cursor: pointer;
          text-decoration: underline;
          text-decoration-color: rgba(33, 181, 143, 0.3);
          text-underline-offset: 2px;
          transition: text-decoration-color 140ms ease;
        }

        .slippageLink:hover {
          text-decoration-color: #21b58f;
        }

        :global(html.dark) .slippageLink {
          color: #3bc9a4;
          text-decoration-color: rgba(59, 201, 164, 0.3);
        }

        :global(html.dark) .slippageLink:hover {
          text-decoration-color: #3bc9a4;
        }

        .slippageBody {
          padding: 0;
        }

        .slippageBody p {
          margin: 0 0 12px 0;
          font-size: 14px;
          line-height: 1.6;
          color: var(--muted);
        }

        .slippageBody p:last-child {
          margin-bottom: 0;
        }

        .slippageMuted {
          font-size: 13px !important;
          color: var(--muted2) !important;
          font-style: italic;
        }

        .slippageBack {
          appearance: none;
          background: none;
          border: 0;
          padding: 0;
          margin-top: 14px;
          font-size: 13px;
          font-weight: 600;
          color: #21b58f;
          cursor: pointer;
          transition: opacity 140ms ease;
        }

        .slippageBack:hover {
          opacity: 0.7;
        }

        :global(html.dark) .slippageBack {
          color: #3bc9a4;
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

          .howToFlow {
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

          .faqList :global(.faqQText) {
            font-size: 16px;
          }

          .faqList :global(.faqQuestion) {
            padding: 16px 0;
          }
        }
      `}</style>
    </footer>
  );
}

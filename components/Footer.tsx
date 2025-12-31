"use client";

import Link from "next/link";
import React from "react";
import { IconCopy, IconX } from "@/components/icons";
import { copyToClipboard } from "@/lib/copy";

const CONTRACT_ADDRESS = "PASTE_CONTRACT_ADDRESS_HERE";

export function Footer() {
  const [copied, setCopied] = React.useState(false);

  async function onCopy() {
    const ok = await copyToClipboard(CONTRACT_ADDRESS);
    setCopied(ok);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <footer id="discover" className="footer">
      <div className="container top">
        <div className="col">
          <h3 className="title">Follow us @unicornsheepdog</h3>
          <div className="links">
            <a className="link" href="https://x.com/unicornsheepdog" target="_blank" rel="noreferrer">
              <IconX /> X
            </a>
            <a className="link" href="https://tiktok.com/@unicornsheepdog" target="_blank" rel="noreferrer">
              TikTok
            </a>
            <a
              className="link"
              href="https://instagram.com/unicornsheepdog"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>

          <div className="sub">
            <h4 className="subTitle">Contact Us</h4>
            <div className="links">
              <a className="link" href="mailto:hello@usd1.edu">
                Email
              </a>
              <a className="link" href="https://x.com/unicornsheepdog" target="_blank" rel="noreferrer">
                Support DMs
              </a>
            </div>
          </div>
        </div>

        <div className="col">
          <h3 className="title">Education</h3>
          <p className="muted small">
            Short, simple lessons — built for clarity. We’ll always label what’s “from the lesson” vs
            what’s “extra context.”
          </p>
          <Link className="btn btnPrimary" href="/education/articles">
            View articles on X
          </Link>
        </div>

        <div className="col">
          <h3 className="title">$USD1</h3>
          <button className="btn" type="button" onClick={onCopy}>
            <IconCopy /> {copied ? "Copied!" : "Copy contract address"}
          </button>
          <div className="links">
            <a className="link" href="https://solscan.io/" target="_blank" rel="noreferrer">
              View on Solscan
            </a>
            <a className="link" href="https://dexscreener.com/" target="_blank" rel="noreferrer">
              View on DexScreener
            </a>
          </div>
          <Link className="btn" href="/usd1/how-to-buy">
            HOW TO BUY
          </Link>
        </div>
      </div>

      <div className="container bottom">
        <p className="disclaimer">
          Disclaimer: USD1 is a memecoin. Memecoins are risky. Only invest what you are willing to
          lose.
        </p>
      </div>

      <style jsx>{`
        .footer {
          background: var(--surface-2);
          border-top: 1px solid var(--border);
          color: var(--text);
          position: relative;
        }
        .top {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr;
          gap: 18px;
          padding: 30px 20px 22px 20px;
          align-items: start;
        }
        .title {
          margin: 0 0 10px 0;
          letter-spacing: -0.02em;
        }
        .sub {
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
        }
        .subTitle {
          margin: 0 0 10px 0;
          font-size: 14px;
          color: var(--muted2);
        }
        .links {
          display: grid;
          gap: 10px;
          margin-bottom: 14px;
        }
        .link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--muted);
          padding: 10px 12px;
          border: 1px solid var(--border);
          border-radius: 14px;
          background: var(--surface);
          width: fit-content;
          box-shadow: none;
        }
        :global(html.dark) .link {
          background: rgba(255, 255, 255, 0.06);
        }
        .link:hover {
          color: var(--text);
          border-color: rgba(33, 181, 143, 0.24);
        }
        .small {
          font-size: 14px;
          margin: 0 0 14px 0;
          color: var(--muted);
        }
        :global(.footer .btn) {
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          box-shadow: none;
        }
        :global(html.dark .footer .btn) {
          background: rgba(255, 255, 255, 0.06);
        }
        :global(.footer .btn:hover) {
          border-color: rgba(33, 181, 143, 0.24);
        }
        :global(.footer .btnPrimary) {
          border-color: rgba(33, 181, 143, 0.44);
          background: var(--accentMint);
          color: var(--accentWhite);
        }
        .bottom {
          padding: 12px 20px 18px 20px;
          border-top: 1px solid var(--border);
        }
        .disclaimer {
          margin: 0;
          color: var(--muted2);
          text-align: center;
          font-size: 13px;
        }
        @media (max-width: 980px) {
          .top {
            grid-template-columns: 1fr;
          }
        }

        /* In landscape, keep the 3-column “3:1-ish” balanced footer even on narrower widths */
        @media (max-width: 980px) and (orientation: landscape) {
          .top {
            grid-template-columns: 1fr 1fr 1fr;
          }
          .link {
            width: 100%;
          }
        }
      `}</style>
    </footer>
  );
}



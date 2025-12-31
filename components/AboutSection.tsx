"use client";

import React from "react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="sectionTitle">About</h2>
        <p className="sectionLead">
          UnicornSheepDog1 (ticker: USD1) started as a silly “meme mirror” of a well-known USD1
          stablecoin story — then holders turned it into something more useful: simple, friendly
          money education.
        </p>

        <div className="grid">
          <div className="bubble card">
            <h3 className="bubbleTitle">A meme that grew up</h3>
            <p className="bubbleText">
              USD1 began as a community joke: a unicorn-sheepdog who wants to teach money without
              making people feel dumb. Over time, it became a group of builders and holders who like
              two things:
            </p>
            <ul className="list">
              <li>
                Clear explanations (3rd-grade reading level… but for adult brains, adult stakes).
              </li>
              <li>
                Playful vibes — a tiny hint of magic — without loud, spammy “buy now” energy.
              </li>
            </ul>
            <p className="bubbleText">
              We’re building lessons first, then adding merch and IRL stuff later (yes: plushies).
              You might also notice subtle nods to the wider memecoin world — kept tasteful and
              non-promotional.
            </p>
            <div className="bubbleNote pill">
              <span>
                Goal: help people understand money basics, so they can spot nonsense faster.
              </span>
            </div>
          </div>

          <div className="mascot card" aria-hidden="true">
            <div className="img">
              <Image src="/mascot/mark.svg" alt="" width={220} height={220} priority />
            </div>
            <div className="caption muted">
              A friendly mascot for a serious goal: make money basics easy to understand.
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 18px;
          align-items: stretch;
        }
        .bubble {
          padding: 22px;
        }
        .bubbleTitle {
          margin: 0 0 10px 0;
          letter-spacing: -0.02em;
          font-size: 22px;
        }
        .bubbleText {
          margin: 0 0 12px 0;
          color: var(--muted);
          font-size: 16px;
        }
        .list {
          margin: 0 0 12px 18px;
          color: var(--text);
        }
        .bubbleNote {
          margin-top: 8px;
          color: var(--text);
        }
        .mascot {
          padding: 18px;
          display: grid;
          gap: 10px;
          align-content: start;
          place-items: center;
        }
        .img {
          width: 240px;
          max-width: 100%;
          filter: drop-shadow(0 8px 14px rgba(17, 24, 39, 0.14));
          transition: transform 160ms ease, filter 160ms ease;
          transform: translateY(0);
        }
        .mascot:hover .img {
          transform: translateY(-3px) rotate(1deg);
          filter: drop-shadow(0 12px 20px rgba(17, 24, 39, 0.16));
        }
        .caption {
          font-size: 13px;
        }
        /* Portrait stacks; landscape keeps side-by-side */
        @media (max-width: 980px) and (orientation: portrait) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}



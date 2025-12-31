"use client";

import Link from "next/link";
import { AboutSection } from "@/components/AboutSection";
import { HeroIllustration } from "@/components/HeroIllustration";
import { EducationSection } from "@/components/EducationSection";
import { LinkCard } from "@/components/LinkCard";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container heroInner">
          <div className="heroAside">
            <h1 className="headline">
              Money basics, explained simply —
              <span className="spark"> with a little magic.</span>
            </h1>
            <p className="lead">
              UnicornSheepDog1 (USD1) is building lessons at a 3rd-grade reading level, designed for
              adults. Warm, friendly, and actually useful.
            </p>
            <div className="ctaRow">
              <Link className="btn btnPrimary" href="/learn">
                Start learning
              </Link>
              <Link className="btn" href="/news/announcements">
                See announcements
              </Link>
            </div>
            <p className="fine muted">
              Education-first. Not financial advice. Nothing here should be taken as financial advice.
            </p>
          </div>

          <div className="heroArt card">
            <HeroIllustration />
            <div className="heroBubble" aria-label="USD1 speech bubble">
              <div className="heroBubbleTitle">Hi! I’m USD1.</div>
              <div className="heroBubbleText">I teach money in small, easy steps.</div>
              <div className="heroBubbleText">No scary words. Just “how it works.”</div>
              <div className="heroBubbleText">You bring curiosity. I bring the map.</div>
              <div className="heroBubbleLine" aria-hidden="true" />
            </div>
            <div className="heroBubbleTail" aria-hidden="true" />
          </div>
        </div>
      </section>

      <AboutSection />

      <EducationSection />

      <section id="fun" className="section">
        <div className="container">
          <h2 className="sectionTitle">Fun &amp; Games</h2>
          <p className="sectionLead">
            Little breaks that still match the vibe: playful, bright, and kind of chaotic… but not
            childish.
          </p>
          <div className="cardGrid">
            <div className="span4">
              <LinkCard
                href="/fun/coloring"
                title="Coloring"
                description="Pick a template, grab a color, and paint. Freehand or fill-by-section."
                accent="gold"
              />
            </div>
            <div className="span4">
              <LinkCard
                href="/fun/flappy"
                title="Flappy USD1"
                description="Tap/click/press to fly between green pipes. One point per pass. Don’t bonk the pipe."
                accent="mint"
              />
            </div>
            <div className="span4">
              <LinkCard
                href="/fun/quiz"
                title="TAKE THE USD1 QUIZ"
                description="A chaotic history quiz. Answer correctly to advance. Miss too much and you restart."
                accent="red"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="news" className="section">
        <div className="container">
          <div className="banner card">
            <div>
              <h2 className="bannerTitle">News</h2>
              <p className="muted bannerText">
                Hand-picked announcements from X. No scraping, no live API calls — just curated
                links.
              </p>
            </div>
            <Link className="btn btnPrimary" href="/news/announcements">
              SEE ANNOUNCEMENTS
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          padding: 42px 0 10px 0;
        }
        .heroInner {
          display: grid;
          grid-template-columns: 0.78fr 1.22fr;
          gap: 22px;
          align-items: center;
        }
        .heroArt {
          padding: 14px;
          position: relative;
          overflow: hidden;
        }
        /* Let the illustration lead: make the “card” chrome quieter without changing structure */
        .heroArt:global(.card) {
          background: transparent;
          border-color: transparent;
          box-shadow: none;
        }
        .heroBubble {
          position: absolute;
          right: 34px;
          top: 26px;
          width: min(420px, 46%);
          background: var(--surface);
          border: 1px solid var(--borderStrong);
          border-radius: 22px;
          box-shadow: var(--shadowSm);
          padding: 16px 16px 14px 16px;
          color: var(--text);
          z-index: 5;
        }

        /* Subtle illustration-led motion (Duolingo-ish), respects reduced motion */
        :global(.heroArt svg) {
          transform: translateY(0);
          animation: floaty 6s ease-in-out infinite;
        }
        @keyframes floaty {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.heroArt svg) {
            animation: none;
          }
        }
        .heroBubbleTitle {
          font-weight: 1000;
          letter-spacing: -0.02em;
          font-size: 22px;
          margin-bottom: 6px;
        }
        .heroBubbleText {
          font-size: 15px;
          line-height: 1.35;
          opacity: 0.95;
          margin: 4px 0;
        }
        .heroBubbleLine {
          height: 6px;
          border-radius: 999px;
          margin-top: 10px;
          background: var(--tintMint);
          opacity: 0.9;
        }
        .heroBubbleTail {
          position: absolute;
          right: 250px;
          top: 190px;
          width: 0;
          height: 0;
          border-left: 18px solid transparent;
          border-right: 18px solid transparent;
          border-top: 28px solid var(--surface);
          filter: drop-shadow(0 6px 12px rgba(17, 24, 39, 0.14));
          z-index: 4;
          transform: rotate(12deg);
        }
        .heroAside {
          display: grid;
          gap: 12px;
          padding: 10px 2px;
        }
        .headline {
          margin: 0;
          letter-spacing: -0.03em;
          font-size: 44px;
          line-height: 1.05;
          font-weight: 950;
        }
        .spark {
          color: var(--accentLavender);
        }
        .lead {
          margin: 0;
          color: var(--muted);
          font-size: 17px;
        }
        .ctaRow {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 4px;
        }
        .fine {
          margin: 4px 0 0 0;
          font-size: 13px;
        }
        .banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 22px;
        }
        .bannerTitle {
          margin: 0;
          letter-spacing: -0.02em;
        }
        .bannerText {
          margin: 6px 0 0 0;
          max-width: 70ch;
        }
        .span4 {
          grid-column: span 4;
        }
        @media (max-width: 980px) {
          /* Portrait stacks; landscape keeps side-by-side */
          .heroInner {
            grid-template-columns: 1fr;
          }
          .headline {
            font-size: 34px;
          }
          .banner {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 980px) and (orientation: landscape) {
          .heroInner {
            grid-template-columns: 0.9fr 1.1fr;
          }
          .headline {
            font-size: 32px;
          }
          .banner {
            flex-direction: row;
            align-items: center;
          }
        }

        @media (max-width: 740px) {
          .heroBubble {
            right: 16px;
            top: 16px;
            width: min(360px, 72%);
          }
          .heroBubbleTail {
            right: 160px;
            top: 170px;
          }
        }

        /* Make Fun & Games cards feel like a “catalog” (consistent, not gimmicky squares) */
        #fun :global(.linkCard) {
          min-height: 200px;
        }
      `}</style>
    </>
  );
}



"use client";

import Link from "next/link";
import React from "react";
import { HeroIllustration } from "@/components/HeroIllustration";
import { SplitSection } from "@/components/SplitSection";
import { KnowledgeMap } from "@/components/KnowledgeMap";
import { IdeasSituationsField } from "@/components/IdeasSituationsField";
import { LearnSpotlight } from "@/components/LearnSpotlight";
import { ANNOUNCEMENTS } from "@/data/announcements";

export default function HomePage() {
  const howLeftRef = React.useRef<HTMLDivElement>(null);
  const howRightGraphicRef = React.useRef<HTMLDivElement>(null);
  const howTitleRef = React.useRef<HTMLHeadingElement>(null);
  const howEndRef = React.useRef<HTMLDivElement>(null);
  
  // Refs for interactive animations
  const learnCard1Ref = React.useRef<HTMLDivElement>(null);
  const gameCardsRef = React.useRef<HTMLDivElement>(null);
  
  // Handle ASK click: scroll to about + open search
  const handleAskClick = React.useCallback(() => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // Delay the search popup slightly so the scroll starts first
    window.setTimeout(() => {
      window.dispatchEvent(new Event("usd1:open-search"));
    }, 300);
  }, []);
  
  // Handle LEARN click: scroll to learn section + sparkle highlight card
  const handleLearnClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.blur(); // Remove focus outline
    const learnSection = document.getElementById("learn");
    if (learnSection) {
      learnSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // Trigger sparkle animation after scroll starts
    window.setTimeout(() => {
      learnCard1Ref.current?.classList.add("sparkleHighlight");
      // Remove class after animation
      window.setTimeout(() => {
        learnCard1Ref.current?.classList.remove("sparkleHighlight");
      }, 1800);
    }, 500);
  }, []);
  
  // Handle EXPLORE click: scroll to games + sequential hover gradients
  const handleExploreClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.blur(); // Remove focus outline
    const gamesSection = document.getElementById("games");
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // Trigger sequential hover animation after scroll
    window.setTimeout(() => {
      const gameCards = gameCardsRef.current?.querySelectorAll(".gameCard");
      if (gameCards) {
        gameCards.forEach((card, i) => {
          window.setTimeout(() => {
            card.classList.add("hoverReveal");
            window.setTimeout(() => {
              card.classList.remove("hoverReveal");
            }, 600);
          }, i * 200);
        });
      }
    }, 600);
  }, []);

  const featured = React.useMemo(() => {
    if (!ANNOUNCEMENTS.length) return null;
    return ANNOUNCEMENTS.reduce((best, it) => (it.date > best.date ? it : best), ANNOUNCEMENTS[0]);
  }, []);

  const featuredLines = React.useMemo(() => {
    if (!featured) return [];
    return featured.preview
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
  }, [featured]);

  const featuredHeadline = featuredLines[0] ?? "Latest update";
  const featuredContext = featuredLines[1] ?? "";


  React.useLayoutEffect(() => {
    const leftEl = howLeftRef.current;
    const rightEl = howRightGraphicRef.current;
    const titleEl = howTitleRef.current;
    const endEl = howEndRef.current;
    if (!leftEl || !rightEl || !titleEl || !endEl) return;

    const mq = window.matchMedia("(min-width: 981px)");
    let raf = 0;

    const apply = () => {
      // Only force equal heights when the layout is truly two-column.
      if (!mq.matches) {
        rightEl.style.height = "";
        rightEl.style.top = "";
        return;
      }
      
      const titleRect = titleEl.getBoundingClientRect();
      const endRect = endEl.getBoundingClientRect();
      const containerRect = leftEl.parentElement!.getBoundingClientRect();
      
      // Calculate the base height (title to end of text)
      const baseH = Math.round(endRect.bottom - titleRect.top);
      // Distance from top of section to the title
      const baseTop = Math.round(titleRect.top - containerRect.top);
      
      // Overlap amounts (98px is the section padding; 445px reaches significantly into About)
      const overlapTop = 445; 
      const overlapBottom = 220;
      
      if (baseH > 0) {
        // Set the container to be the full expanded height
        rightEl.style.height = `${baseH + overlapTop + overlapBottom}px`;
        // Move the container up by the overlap amount
        rightEl.style.top = `${baseTop - overlapTop}px`;
      }
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    const ro = new ResizeObserver(schedule);
    ro.observe(leftEl);

    const onMqChange = () => schedule();
    // Safari <= 13 uses addListener/removeListener.
    if ("addEventListener" in mq) mq.addEventListener("change", onMqChange);
    else (mq as any).addListener(onMqChange);
    window.addEventListener("resize", schedule, { passive: true });

    // Initial sync (after paint)
    schedule();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if ("removeEventListener" in mq) mq.removeEventListener("change", onMqChange);
      else (mq as any).removeListener(onMqChange);
      window.removeEventListener("resize", schedule);
    };
  }, []);


  return (
    <>
      <section className="hero">
        <div className="container heroInner">
          <div className="heroAside">
            <h1 className="headline">
              Money, simply.
            </h1>
            <p className="subhead">Plain-language explanations of how things work, for curious people.</p>
            <div className="ctaRow">
              <Link className="btn btnPrimary btnHero" href="/learn">
                Start here →
              </Link>
            </div>
            <p className="fine muted">
              <span className="fineLine">For informational and entertainment purposes only.</span>
              <span className="fineLine">Not financial advice.</span>
            </p>
          </div>

          <div className="heroArt card">
            <HeroIllustration />
            <div className="heroBubble" aria-label="USD1 speech bubble">
              <div className="heroBubbleTitle">Hi — I’m USD1.</div>
              <div className="heroBubbleText">This is a place to understand how things work.</div>
              <div className="heroBubbleText">Take your time. Skip what you don’t need.</div>
              <div className="heroBubbleLine" aria-hidden="true" />
            </div>
            <div className="heroBubbleTail" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section id="about" className="section aboutSection" aria-label="About USD1" style={{ background: 'var(--tintLavender)' }}>
        <div className="aboutAmbient" aria-hidden="true">
          <span className="aboutBlob aboutBlobTL" />
          <span className="aboutBlob aboutBlobBR" />
        </div>
        <div className="container">
          <div className="aboutTopGrid">
            <div className="aboutCopy">
              <h2 className="sectionTitle">About USD1</h2>
              <p className="aboutProse">
                USD1 is a small education project focused on helping people understand how things work, starting with money.
                <br />
                <br />
                It explains incentives, trade-offs, and patterns that show up again and again in everyday decisions, using plain language and familiar situations.
                <br />
                <br />
                The goal is simple: make it easier to recognize what’s happening when money comes up in real life.
              </p>
            </div>

            <div className="aboutMapCol" aria-hidden="true">
              <div className="aboutMapInner">
                <div className="aboutImagePlaceholder">
                  <span className="placeholderLabel">UnicornSheepDog1</span>
                </div>
              </div>
            </div>
          </div>

          <div className="aboutPillars" aria-label="USD1 pillars">
            <div className="pillarCard card">
              <div className="pillarHoverPattern" aria-hidden="true" />
              <div className="pillarContent">
                <div className="pillLabel">Clarity</div>
                <p className="pillText">
                  Plain language that respects your intelligence. We explain ideas without dressing them up or talking down.
                </p>
              </div>
            </div>
            <div className="pillarCard card">
              <div className="pillarHoverPattern" aria-hidden="true" />
              <div className="pillarContent">
                <div className="pillLabel">On Your Terms</div>
                <p className="pillText">
                  Learn when it's useful. Leave when it isn't. Come back whenever you need it.
                </p>
              </div>
            </div>
            <div className="pillarCard card">
              <div className="pillarHoverPattern" aria-hidden="true" />
              <div className="pillarContent">
                <div className="pillLabel">Practical</div>
                <p className="pillText">
                  Examples drawn from situations you're likely to recognize. Real examples, explained clearly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section howSection" aria-label="How it works">
        <div className="container">
          <div className="howLayout">
            <div className="howLeft" ref={howLeftRef}>
              <div className="howHeader">
                <h2 className="sectionTitle" ref={howTitleRef}>How it works</h2>
                <p className="sectionLead">A simple loop that helps things click.</p>
              </div>

              <div className="howStack">
                <button
                  type="button"
                  className="howRow howRowLavender card howRowBtn"
                  aria-label="Ask (jump to about and open search)"
                  onClick={handleAskClick}
                >
                  <div className="howAccent" aria-hidden="true">
                    <div className="howLabel">ASK</div>
                  </div>
                  <div className="howText">
                    <div className="howLine">
                      Ask a question or search a topic. Get guided to the explanation that fits.
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  className="howRow howRowMint card howRowBtn"
                  aria-label="Learn (jump to Learn section)"
                  onClick={handleLearnClick}
                >
                  <div className="howAccent" aria-hidden="true">
                    <div className="howLabel">LEARN</div>
                  </div>
                  <div className="howText">
                    <div className="howLine">
                      Short lessons that explain how money, incentives, and behavior work together.
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  className="howRow howRowCoral card howRowBtn"
                  aria-label="Explore (jump to Games)"
                  onClick={handleExploreClick}
                >
                  <div className="howAccent" aria-hidden="true">
                    <div className="howLabel">EXPLORE</div>
                  </div>
                  <div className="howText">
                    <div className="howLine" ref={howEndRef}>
                      Guided walkthroughs that show how ideas play out in real situations.
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="howRight" aria-hidden="true">
              <div className="howRightGraphic" ref={howRightGraphicRef}>
                <KnowledgeMap className="howRightMap" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="learn" className="section learnSection" aria-label="Learn">
        <div className="learnAmbient" aria-hidden="true">
          <div className="learnBlob learnBlobTR" />
          <div className="learnBlob learnBlobML" />
          <div className="learnBlob learnBlobBR" />
        </div>
        <div className="container">
          <div className="learnHead">
            <h2 className="sectionTitle">Learn</h2>
            <p className="sectionLead">A growing reference for understanding money, incentives, and behavior.</p>
          </div>
          <div className="learnCards">
            <div className="learnCtaGroup" ref={learnCard1Ref}>
              <div className="learnCtaCard card">
                <div className="learnCtaHoverPattern" aria-hidden="true" />
                <div className="learnCtaContent">
                  <h3 className="learnCtaTitle">Start when you're ready</h3>
                  <p className="learnCtaDesc">
                    Short lessons written for adults. Read in any order, at your own pace.
                  </p>
                  <Link className="btn btnPrimary learnCtaBtn" href="/learn">
                    Explore lessons →
                  </Link>
                </div>
              </div>
            </div>

            <LearnSpotlight />
          </div>
        </div>
      </section>

      <section className="section ideasBridgeSection" aria-label="Ideas in motion">
        <div className="container ideasBridgeContainer">
          <div className="ideasBridgeLeft">
            <h2 className="sectionTitle ideasBridgeTitle">Ideas, in motion</h2>
            <p className="sectionLead ideasBridgeLead">
              Ideas move through situations. They start somewhere, pass through decisions, 
              and arrive at outcomes. Understanding those paths helps you see what's really happening.
            </p>
            <p className="ideasBridgeSecondary">
              The concepts here connect. When you learn one, it sheds light on the others.
            </p>
          </div>
          <div className="ideasBridgeRight">
            <IdeasSituationsField className="ideasBridgeField" />
          </div>
        </div>
      </section>

      <SplitSection
        id="games"
        topAnchors={["fun"]}
        ariaLabel="Games"
        title="Games"
        lead="A playful way to revisit ideas — calm, low-pressure, and just for fun."
        visualSide="left"
        visual={null}
        className="gamesCombined"
      >
        <div className="gamesAmbient" aria-hidden="true">
          <span className="gamesToken gamesTile gamesTokenTR" />
          <span className="gamesToken gamesPill gamesTokenML" />
          <span className="gamesToken gamesCoin gamesTokenBR" />
          <span className="gamesToken gamesTile gamesTokenTR2" />
          <span className="gamesToken gamesPill gamesTokenBR2" />
        </div>
        <div className="gamesContent">
          <div className="gamesHeadDecor" aria-hidden="true">
            <div className="tileGrid">
              <span className="tile small" />
              <span className="tile" />
              <span className="tile" />
              <span className="tile small" />
            </div>
          </div>
          <div className="gamesPanel" aria-label="Playful practice">
            <div className="gamesInner" aria-label="Games">
              <div className="gamesRow" ref={gameCardsRef}>
                <div className="gameCard card">
                  <div className="gameHoverPattern" aria-hidden="true" />
                  <div className="gameCardBody">
                    <div className="gameTitle">Color & learn</div>
                    <p className="gameText">Relax with simple coloring while revisiting a few core ideas.</p>
                    <div className="gameActions">
                      <Link className="btn" href="/fun/coloring">
                        Play Coloring →
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="gameCard card">
                  <div className="gameHoverPattern" aria-hidden="true" />
                  <div className="gameCardBody">
                    <div className="gameTitle">Flappy focus</div>
                    <p className="gameText">A quick, playful loop with gentle reminders of money basics.</p>
                    <div className="gameActions">
                      <Link className="btn" href="/fun/flappy">
                        Play Flappy →
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="gameCard card">
                  <div className="gameHoverPattern" aria-hidden="true" />
                  <div className="gameCardBody">
                    <div className="gameTitle">Quick prompts</div>
                    <p className="gameText">A few low-stakes questions that connect ideas to real situations.</p>
                    <div className="gameActions">
                      <Link className="btn" href="/fun/quiz">
                        Try Prompts →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SplitSection>

      <section id="news" className="section newsSection" aria-label="News">
        <div className="container">
          <div className="newsLayout">
            <div className="newsLeft">
              <h2 className="sectionTitle">News</h2>
              <p className="sectionLead newsLead">
                A single, quiet pointer to the most important update — optional context before you leave.
              </p>
            </div>

            <div className="newsRight" aria-label="Latest update">
              <div className="newsRightInner">
                {featured ? (
                  <a
                    className="newsPill"
                    href={featured.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Featured announcement: ${featuredHeadline} (opens in new tab)`}
                  >
                    <div className="newsHoverPattern" aria-hidden="true" />
                    <div className="newsPillContent">
                      <div className="newsHeadline">{featuredHeadline}</div>
                      {featuredContext ? <div className="newsContext muted">{featuredContext}</div> : null}
                    </div>
                  </a>
                ) : null}

                <Link className="newsAllLink" href="/news">
                  View all updates →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          /* Match the page’s section rhythm so the hero doesn’t feel cramped */
          padding: 82px 0 82px 0;
        }
        .heroInner {
          display: grid;
          grid-template-columns: 0.78fr 1.22fr;
          gap: 28px;
          align-items: stretch;
        }
        .heroArt {
          padding: 14px;
          position: relative;
          overflow: hidden;
          min-height: 540px;
          display: grid;
          align-items: stretch;
        }
        .heroArt :global(svg) {
          width: 100%;
          height: 100%;
          display: block;
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
          gap: 14px;
          padding: 18px 2px;
          align-content: center;
        }
        .headline {
          margin: 0;
          letter-spacing: -0.03em;
          font-size: 44px;
          line-height: 1.08;
          font-weight: 950;
        }
        .subhead {
          margin: -6px 0 0 0; /* reduce gap below headline */
          font-size: 18px;
          line-height: 1.45;
          font-weight: 650;
          letter-spacing: -0.01em;
          opacity: 0.92; /* no new color; just a lighter hierarchy */
          max-width: 56ch;
        }
        .lead {
          margin: 0;
          color: var(--muted);
          font-size: 17px;
          line-height: 1.55;
          max-width: 52ch;
        }
        .ctaRow {
          display: flex;
          margin-top: 18px;
        }
        /* Hero primary CTA: larger, bolder */
        .ctaRow :global(.btnHero) {
          position: relative;
          overflow: hidden;
          font-size: 17px;
          font-weight: 800;
          letter-spacing: -0.01em;
          padding: 14px 32px;
          box-shadow: var(--shadowSm), 0 4px 14px rgba(33, 181, 143, 0.25);
          border-width: 1.5px;
        }
        .ctaRow :global(.btnHero::before) {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 400ms ease;
          pointer-events: none;
          z-index: 1;
          /* Mixture of About (Lavender), Learn (Mint), and Games (Peach) pattern colors */
          background-image: 
            /* Primary conic: balanced lavender-mint-peach segments */
            conic-gradient(from 0deg at 50% 50%,
              rgba(123, 108, 255, 0.4) 0deg 30deg,
              rgba(88, 73, 200, 0.35) 30deg 60deg,
              rgba(33, 181, 143, 0.4) 60deg 90deg,
              rgba(22, 122, 96, 0.35) 90deg 120deg,
              rgba(255, 122, 107, 0.4) 120deg 150deg,
              rgba(255, 168, 120, 0.35) 150deg 180deg,
              rgba(123, 108, 255, 0.4) 180deg 210deg,
              rgba(88, 73, 200, 0.35) 210deg 240deg,
              rgba(33, 181, 143, 0.4) 240deg 270deg,
              rgba(22, 122, 96, 0.35) 270deg 300deg,
              rgba(255, 122, 107, 0.4) 300deg 330deg,
              rgba(255, 168, 120, 0.35) 330deg 360deg
            ),
            /* Secondary conic offset: adds depth */
            conic-gradient(from 45deg at 30% 70%,
              rgba(123, 108, 255, 0.25) 0deg 120deg,
              rgba(33, 181, 143, 0.25) 120deg 240deg,
              rgba(255, 122, 107, 0.25) 240deg 360deg
            ),
            conic-gradient(from 45deg at 70% 30%,
              rgba(255, 122, 107, 0.25) 0deg 120deg,
              rgba(123, 108, 255, 0.25) 120deg 240deg,
              rgba(33, 181, 143, 0.25) 240deg 360deg
            ),
            /* Symmetric linear gradients - Lavender (About) */
            linear-gradient(15deg, rgba(123, 108, 255, 0.3) 0%, transparent 40%),
            linear-gradient(195deg, rgba(180, 170, 255, 0.3) 0%, transparent 40%),
            /* Symmetric linear gradients - Mint (Learn) */
            linear-gradient(75deg, rgba(33, 181, 143, 0.3) 0%, transparent 40%),
            linear-gradient(255deg, rgba(168, 230, 207, 0.3) 0%, transparent 40%),
            /* Symmetric linear gradients - Peach (Games) */
            linear-gradient(135deg, rgba(255, 122, 107, 0.25) 0%, transparent 40%),
            linear-gradient(315deg, rgba(255, 216, 190, 0.25) 0%, transparent 40%);
          background-blend-mode: multiply;
        }
        .ctaRow :global(.btnHero:hover::before) {
          opacity: 1;
        }
        .ctaRow :global(.btnHero:hover) {
          transform: translateY(-2px);
          box-shadow: 
            0 12px 36px -8px rgba(123, 108, 255, 0.4),
            0 12px 36px -8px rgba(33, 181, 143, 0.4),
            0 12px 36px -8px rgba(255, 122, 107, 0.4);
        }
        .fine {
          margin: 10px 0 0 0;
          font-size: 13px;
          text-align: left;
        }
        .fineLine {
          display: block;
        }

        :global(#about),
        :global(#learn),
        :global(#games),
        :global(#fun),
        :global(#news) {
          scroll-margin-top: 92px; /* sticky header offset */
        }

        .panelVisual {
          position: relative;
          display: grid;
          grid-template-rows: auto 1fr auto;
          gap: 14px;
          align-content: stretch;
          min-height: 280px;
          height: 100%;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border);
          background: linear-gradient(160deg, rgba(17, 24, 39, 0.02), rgba(17, 24, 39, 0.05));
          box-shadow: var(--shadowSm);
          overflow: hidden;
          padding: 18px;
        }
        .panelAbout .panelIconCircle {
          align-self: center;
        }
        .panelAbout .panelBadge.subtle {
          align-self: end;
          justify-self: start;
        }
        .panelBadge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.7);
          font-weight: 800;
          letter-spacing: -0.01em;
        }
        .panelBadge.subtle {
          font-weight: 700;
          color: var(--muted);
          background: rgba(255, 255, 255, 0.6);
        }
        .badgeDot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: 2px solid rgba(17, 24, 39, 0.18);
          background: var(--tintLavender);
        }
        .panelIconCircle {
          width: 112px;
          height: 112px;
          border-radius: 26px;
          border: 1px solid var(--borderStrong);
          background: rgba(17, 24, 39, 0.02);
          display: grid;
          place-items: center;
          box-shadow: var(--shadowXs);
        }
        .panelIconCircle svg {
          width: 64px;
          height: 64px;
        }
        .panelStroke {
          stroke: rgba(17, 24, 39, 0.48);
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        :global(html.dark) .panelStroke {
          stroke: rgba(255, 255, 255, 0.72);
        }
        :global(html.dark) .panelVisual {
          background: linear-gradient(160deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.05));
          border-color: rgba(255, 255, 255, 0.14);
        }
        :global(html.dark) .panelBadge {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.16);
        }
        :global(html.dark) .badgeDot {
          border-color: rgba(255, 255, 255, 0.28);
        }
        .panelBlob {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          filter: blur(12px);
          opacity: 0.65;
          right: -40px;
          bottom: -80px;
        }
        .panelBlobLavender {
          background: var(--tintLavender);
        }
        .panelBlobMint {
          background: var(--tintMint);
        }
        .panelBlobCoral {
          background: var(--tintCoral);
        }
        .howDotCoral {
          box-shadow: var(--shadowXs), 0 0 0 6px var(--tintCoral);
        }

        .tileGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          width: 100%;
          max-width: 340px;
        }
        .tile {
          display: block;
          aspect-ratio: 1;
          border-radius: 14px;
          border: 1px solid var(--borderStrong);
          background: rgba(17, 24, 39, 0.04);
          box-shadow: var(--shadowXs);
        }
        .tile.small {
          aspect-ratio: 1.2;
          border-style: dashed;
          background: rgba(17, 24, 39, 0.02);
        }
        :global(html.dark) .tile {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.16);
        }
        :global(html.dark) .tile.small {
          background: rgba(255, 255, 255, 0.03);
        }

        .pillarsGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
        }
        .aboutSection .aboutTopGrid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(240px, 0.8fr);
          gap: 22px;
          align-items: stretch;
          position: relative;
          z-index: 1;
        }
        .aboutSection .aboutMapCol {
          display: grid;
          align-items: center;
          position: relative;
        }
        .aboutSection .aboutMapInner {
          width: 100%;
          height: 280px; /* Base height for mobile */
          max-height: 420px; 
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          position: relative;
          overflow: visible;
        }
        @media (min-width: 981px) {
          .aboutSection .aboutMapInner {
            height: 100%; /* Stretch to match text on desktop */
          }
        }
        .aboutSection .aboutImagePlaceholder {
          width: 100%;
          height: 100%;
          border-radius: var(--radius-xl);
          border: 1px dashed var(--borderStrong);
          background: rgba(17, 24, 39, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted2);
        }
        .aboutSection .placeholderLabel {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          opacity: 0.6;
        }
        .aboutSection .aboutCopy {
          display: flex;
          flex-direction: column;
          min-height: 0;
          gap: 12px;
        }
        .aboutSection .aboutCopy :global(.sectionTitle) {
          margin: 0;
          line-height: 1.1;
        }
        .aboutSection .aboutProse {
          margin: 0;
          color: var(--muted);
          font-size: 19px;
          line-height: 1.8;
          max-width: 72ch;
        }
        .aboutSection .aboutPillars {
          margin-top: 32px; /* Add space below the top grid */
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          align-items: stretch;
          position: relative;
          z-index: 2;
        }
        .aboutSection .aboutPillars .pillarCard {
          width: 100%;
          background: var(--surface);
          border: 1px solid var(--borderStrong);
          box-shadow: var(--shadowSm);
        }
        .pillarCard {
          padding: 20px;
          box-shadow: none;
          position: relative;
          overflow: hidden;
        }
        .pillarHoverPattern {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 400ms ease;
          pointer-events: none;
          z-index: 1;
          /* Stained glass feel: hard-edged geometric shapes with varying purples */
          background-image: 
            conic-gradient(from 0deg at 50% 50%,
              rgba(123, 108, 255, 0.18) 0deg 60deg,
              rgba(88, 73, 200, 0.14) 60deg 120deg,
              rgba(123, 108, 255, 0.22) 120deg 180deg,
              rgba(180, 170, 255, 0.20) 180deg 240deg,
              rgba(123, 108, 255, 0.12) 240deg 300deg,
              rgba(88, 73, 200, 0.18) 300deg 360deg
            ),
            linear-gradient(15deg, rgba(123, 108, 255, 0.10) 0%, transparent 40%),
            linear-gradient(165deg, rgba(88, 73, 200, 0.08) 0%, transparent 40%);
          background-blend-mode: multiply;
        }
        .pillarCard:hover .pillarHoverPattern {
          opacity: 1;
        }
        .pillarContent {
          position: relative;
          z-index: 2;
        }
        .pillLabel {
          font-weight: 900;
          letter-spacing: -0.01em;
          margin-bottom: 6px;
        }
        .pillText {
          margin: 0;
          color: var(--muted);
        }

        /* Learn cards */
        .learnCards {
          display: grid;
          gap: 18px;
          align-items: start;
        }
        @media (min-width: 981px) {
          .learnCards {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        /* Learn CTA card */
        .learnCtaGroup {
          position: relative;
          border-radius: var(--radius-xl);
        }
        .learnCtaGroup::before {
          content: "";
          position: absolute;
          inset: -3px;
          border-radius: calc(var(--radius-xl) + 3px);
          pointer-events: none;
          z-index: 10;
          opacity: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(33, 181, 143, 0.6) 20%,
            rgba(168, 230, 207, 0.9) 50%,
            rgba(33, 181, 143, 0.6) 80%,
            transparent 100%
          );
          background-size: 200% 100%;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          padding: 2px;
        }
        .learnCtaGroup.sparkleHighlight::before {
          opacity: 1;
          animation: sparkleMove 1.2s ease-out forwards;
        }
        @keyframes sparkleMove {
          0% {
            background-position: 200% 0;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            background-position: -200% 0;
            opacity: 0;
          }
        }
        .learnCtaCard {
          padding: 28px 32px;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadowMd);
        }
        .learnCtaHoverPattern {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 400ms ease;
          pointer-events: none;
          z-index: 1;
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
        .learnCtaCard:hover .learnCtaHoverPattern {
          opacity: 1;
        }
        .learnCtaContent {
          position: relative;
          z-index: 2;
          display: grid;
          gap: 14px;
        }
        .learnCtaTitle {
          margin: 0;
          font-size: 24px;
          font-weight: 950;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }
        .learnCtaDesc {
          margin: 0;
          color: var(--muted);
          font-size: 17px;
          line-height: 1.55;
          max-width: 48ch;
        }
        .learnCtaBtn {
          margin-top: 6px;
          width: fit-content;
        }
        
        /* Game cards sequential hover reveal */
        :global(.gameCard.hoverReveal) :global(.gameHoverPattern) {
          opacity: 1 !important;
        }
        :global(.gameCard.hoverReveal) {
          transform: translateY(-1px);
          border-color: rgba(255, 122, 107, 0.16);
        }

        /* Learn: layout refinements */
        .learnSection {
          padding-top: 110px;
          padding-bottom: 110px;
          position: relative;
          overflow: hidden; /* clip decorative layers */
          /* Match the "HI Im USD1" backdrop / How it works Learn card tone */
          background: var(--tintMint) !important;
        }
        :global(html.dark) .learnSection {
          background: var(--tintMint) !important;
        }
        .learnSection::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          /* Extremely faint “paper grid” — should disappear unless you pause and look for it. */
          opacity: 0.05;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 96px 96px;
          background-position: 0 0, 0 0;
          /* Keep static; ambient motion comes from the soft blobs layer only. */
        }
        .learnAmbient {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        /* About/Games: reuse Learn ambient motion (same keyframes/timing), but distinct shapes/colors */
        .aboutSection,
        :global(#games.section) {
          position: relative;
          overflow: hidden; /* clip drifting decor like Learn */
        }
        .aboutAmbient,
        .gamesAmbient {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .aboutSection > .container {
          position: relative;
          z-index: 2;
        }
        :global(#games.section) :global(.splitInner) {
          position: relative;
          z-index: 2;
        }
        :global(#games.section) .gamesContent {
          position: relative;
          z-index: 2;
        }

        /* About: fewer, larger, softer blobs (lavender / neutral) */
        .aboutBlob {
          position: absolute;
          border-radius: 999px;
          filter: none;
          opacity: 0.38;
          mix-blend-mode: normal;
          background-image:
            radial-gradient(circle at 28% 26%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.08) 52%, transparent 72%),
            radial-gradient(circle at 70% 80%, rgba(123, 108, 255, 0.18) 0%, rgba(123, 108, 255, 0.06) 56%, transparent 76%),
            radial-gradient(circle at 22% 78%, rgba(148, 163, 184, 0.14) 0%, transparent 62%);
          border: 1px solid rgba(255, 255, 255, 0.46);
          box-shadow:
            0 18px 44px rgba(17, 24, 39, 0.10),
            inset 0 1px 0 rgba(255, 255, 255, 0.30);
          transform: translate3d(0, 0, 0) scale(1);
          will-change: transform;
        }
        /* Light mode: increase contrast so blobs are actually visible */
        :global(html:not(.dark)) .aboutBlob {
          opacity: 0.56;
          border-color: rgba(255, 255, 255, 0.64);
          box-shadow:
            0 22px 54px rgba(17, 24, 39, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.38);
          background-image:
            radial-gradient(circle at 28% 26%, rgba(255, 255, 255, 0.62) 0%, rgba(255, 255, 255, 0.10) 52%, transparent 72%),
            radial-gradient(circle at 70% 80%, rgba(123, 108, 255, 0.30) 0%, rgba(123, 108, 255, 0.12) 56%, transparent 76%),
            radial-gradient(circle at 22% 78%, rgba(148, 163, 184, 0.18) 0%, transparent 62%);
        }
        :global(html.dark) .aboutBlob {
          border-color: rgba(255, 255, 255, 0.18);
          box-shadow:
            0 18px 44px rgba(0, 0, 0, 0.40),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
          opacity: 0.32;
        }
        .aboutBlob::before {
          content: "";
          position: absolute;
          inset: 14%;
          border-radius: inherit;
          pointer-events: none;
          background:
            radial-gradient(circle at 34% 32%, rgba(255, 255, 255, 0.32) 0%, transparent 58%),
            radial-gradient(circle at 70% 76%, rgba(255, 255, 255, 0.18) 0%, transparent 62%);
          opacity: 0.9;
        }
        .aboutBlobTL {
          width: 720px;
          height: 720px;
          top: -360px;
          left: -360px;
          animation: learnBlobTR 24s ease-in-out infinite;
          animation-delay: -2s;
        }
        .aboutBlobBR {
          width: 600px;
          height: 600px;
          right: -360px;
          bottom: -380px;
          opacity: 0.30;
          animation: learnBlobBR 31s ease-in-out infinite;
          animation-delay: -12s;
        }

        /* Games: more playful “tokens” (rounded tiles/pills) in warm peach tones */
        .gamesToken {
          position: absolute;
          filter: none;
          opacity: 0.40;
          mix-blend-mode: normal;
          background-image:
            linear-gradient(135deg, rgba(255, 255, 255, 0.44) 0%, rgba(255, 255, 255, 0.10) 58%, rgba(255, 255, 255, 0.18) 100%),
            linear-gradient(35deg, rgba(255, 122, 107, 0.22) 0%, rgba(255, 122, 107, 0.06) 60%, transparent 100%),
            radial-gradient(circle at 70% 22%, rgba(255, 216, 190, 0.22) 0%, transparent 58%);
          border: 1px solid rgba(255, 255, 255, 0.50);
          box-shadow:
            0 18px 44px rgba(17, 24, 39, 0.10),
            inset 0 1px 0 rgba(255, 255, 255, 0.28),
            inset 0 -22px 46px rgba(255, 122, 107, 0.10);
          transform: translate3d(0, 0, 0) scale(1);
          will-change: transform;
        }
        /* Light mode: increase contrast so tokens read on the peach panel */
        :global(html:not(.dark)) .gamesToken {
          opacity: 0.58;
          border-color: rgba(255, 255, 255, 0.64);
          box-shadow:
            0 22px 54px rgba(17, 24, 39, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.36),
            inset 0 -26px 56px rgba(255, 122, 107, 0.14);
          background-image:
            linear-gradient(135deg, rgba(255, 255, 255, 0.56) 0%, rgba(255, 255, 255, 0.12) 58%, rgba(255, 255, 255, 0.24) 100%),
            linear-gradient(35deg, rgba(255, 122, 107, 0.34) 0%, rgba(255, 122, 107, 0.12) 60%, transparent 100%),
            radial-gradient(circle at 70% 22%, rgba(255, 216, 190, 0.30) 0%, transparent 58%);
        }
        :global(html.dark) .gamesToken {
          border-color: rgba(255, 255, 255, 0.18);
          box-shadow:
            0 18px 44px rgba(0, 0, 0, 0.40),
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            inset 0 -22px 46px rgba(255, 122, 107, 0.12);
          opacity: 0.34;
        }
        .gamesToken::before {
          content: "";
          position: absolute;
          inset: 10px;
          border-radius: inherit;
          pointer-events: none;
          background:
            radial-gradient(circle at 26% 22%, rgba(255, 255, 255, 0.30) 0%, transparent 56%),
            radial-gradient(circle at 78% 82%, rgba(255, 255, 255, 0.16) 0%, transparent 60%);
          opacity: 0.85;
        }
        .gamesTile {
          border-radius: 34px;
        }
        .gamesPill {
          border-radius: 999px;
        }
        .gamesCoin {
          border-radius: 999px;
        }
        .gamesTokenTR {
          width: 420px;
          height: 320px;
          top: -140px;
          right: -240px;
          animation: learnBlobTR 24s ease-in-out infinite;
        }
        .gamesTokenML {
          width: 520px;
          height: 240px;
          top: 34%;
          left: -360px;
          opacity: 0.34;
          animation: learnBlobML 28s ease-in-out infinite;
          animation-delay: -5s;
        }
        .gamesTokenBR {
          width: 320px;
          height: 320px;
          right: -240px;
          bottom: -260px;
          opacity: 0.30;
          animation: learnBlobBR 31s ease-in-out infinite;
          animation-delay: -12s;
        }
        .gamesTokenTR2 {
          width: 240px;
          height: 240px;
          top: 62%;
          right: -160px;
          opacity: 0.26;
          animation: learnBlobTR 24s ease-in-out infinite;
          animation-delay: -9s;
        }
        .gamesTokenBR2 {
          width: 420px;
          height: 220px;
          bottom: 18%;
          left: -300px;
          opacity: 0.24;
          animation: learnBlobBR 31s ease-in-out infinite;
          animation-delay: -18s;
        }
        .learnBlob {
          position: absolute;
          /* Ice-cube vibe: crisp silhouette + faceted translucency */
          border-radius: 28px;
          clip-path: polygon(
            10% 0%,
            90% 0%,
            100% 10%,
            100% 90%,
            90% 100%,
            10% 100%,
            0% 90%,
            0% 10%
          );
          filter: none;
          opacity: 0.44;
          mix-blend-mode: normal;
          background-image:
            /* crisp rim highlight */
            linear-gradient(135deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.08) 55%, rgba(255, 255, 255, 0.16) 100%),
            /* mint “water” tint */
            linear-gradient(35deg, rgba(33, 181, 143, 0.18) 0%, rgba(33, 181, 143, 0.06) 58%, transparent 100%),
            /* subtle facet banding */
            linear-gradient(115deg, transparent 0% 36%, rgba(255, 255, 255, 0.14) 36% 44%, transparent 44% 100%),
            linear-gradient(205deg, transparent 0% 52%, rgba(255, 255, 255, 0.10) 52% 60%, transparent 60% 100%);
          border: 1px solid rgba(255, 255, 255, 0.46);
          box-shadow:
            0 18px 44px rgba(17, 24, 39, 0.10),
            inset 0 1px 0 rgba(255, 255, 255, 0.30),
            inset 0 -22px 46px rgba(33, 181, 143, 0.10);
          transform: translate3d(0, 0, 0) scale(1);
          will-change: transform;
        }
        /* Light mode: make Learn blobs easier to see without changing motion */
        :global(html:not(.dark)) .learnBlob {
          opacity: 0.64;
          border-color: rgba(255, 255, 255, 0.62);
          box-shadow:
            0 22px 54px rgba(17, 24, 39, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.36),
            inset 0 -26px 56px rgba(33, 181, 143, 0.14);
          background-image:
            linear-gradient(135deg, rgba(255, 255, 255, 0.54) 0%, rgba(255, 255, 255, 0.10) 55%, rgba(255, 255, 255, 0.22) 100%),
            linear-gradient(35deg, rgba(33, 181, 143, 0.30) 0%, rgba(33, 181, 143, 0.12) 58%, transparent 100%),
            linear-gradient(115deg, transparent 0% 36%, rgba(255, 255, 255, 0.18) 36% 44%, transparent 44% 100%),
            linear-gradient(205deg, transparent 0% 52%, rgba(255, 255, 255, 0.12) 52% 60%, transparent 60% 100%);
        }
        .learnBlob::before {
          content: "";
          position: absolute;
          inset: 10px;
          border-radius: 22px;
          clip-path: inherit;
          pointer-events: none;
          /* inner refraction highlight */
          background:
            radial-gradient(circle at 26% 22%, rgba(255, 255, 255, 0.34) 0%, transparent 55%),
            radial-gradient(circle at 72% 78%, rgba(255, 255, 255, 0.18) 0%, transparent 60%);
          opacity: 0.9;
        }
        /* Top-right: noticeable drifting bubble */
        .learnBlobTR {
          width: 440px;
          height: 440px;
          top: -120px;
          right: -220px;
          opacity: 0.48;
          transform: rotate(8deg);
          animation: learnBlobTR 24s ease-in-out infinite;
        }
        /* Mid-left: peeking in from the edge */
        .learnBlobML {
          width: 560px;
          height: 560px;
          top: 30%;
          left: -420px;
          opacity: 0.42;
          transform: rotate(-10deg);
          animation: learnBlobML 28s ease-in-out infinite;
          animation-delay: -5s;
        }
        /* Low-right: faintest, near the bottom edge */
        .learnBlobBR {
          width: 520px;
          height: 520px;
          right: -320px;
          bottom: -340px;
          opacity: 0.36;
          transform: rotate(14deg);
          animation: learnBlobBR 31s ease-in-out infinite;
          animation-delay: -12s;
        }
        .learnSection > .container {
          position: relative;
          z-index: 2; /* keep all content above the decorative layers */
        }

        /* Ideas Bridge: architectural section with embedded flow graphic */
        .ideasBridgeSection {
          background: transparent !important;
          position: relative;
          z-index: 5;
          overflow: visible;
          padding-top: 110px;
          padding-bottom: 110px;
          min-height: 520px;
        }
        .ideasBridgeSection::before {
          display: none;
        }
        /* Grey toggle at top is inherited from global section::after styles */

        .ideasBridgeContainer {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
          gap: 28px;
          align-items: center;
        }

        .ideasBridgeLeft {
          display: flex;
          flex-direction: column;
          gap: 18px;
          position: relative;
          z-index: 3;
          max-width: 64ch;
        }

        .ideasBridgeRight {
          position: relative;
          z-index: 2;
          align-self: stretch;
          display: grid;
          align-items: center;
        }

        .ideasBridgeField {
          /* Keep the field visually present without feeling like a “card within a card” */
          padding: 10px;
        }

        .ideasBridgeTitle {
          margin-bottom: 6px;
        }

        .ideasBridgeLead {
          margin-bottom: 0;
          font-size: 19px;
          line-height: 1.7;
          color: var(--muted);
          max-width: 42ch;
        }

        .ideasBridgeSecondary {
          margin: 0;
          font-size: 16px;
          line-height: 1.6;
          color: var(--muted2);
          max-width: 40ch;
        }

        @media (max-width: 980px) {
          .ideasBridgeSection {
            padding-top: 80px;
            padding-bottom: 80px;
            min-height: auto;
          }
          .ideasBridgeContainer {
            grid-template-columns: 1fr;
            gap: 22px;
          }
          .ideasBridgeRight {
            order: 2;
          }
          .ideasBridgeLead {
            max-width: 56ch;
          }
          .ideasBridgeSecondary {
            max-width: 52ch;
          }
        }

        @keyframes learnBlobTR {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1.01) rotate(8deg);
          }
          33% {
            transform: translate3d(22px, -14px, 0) scale(1.04) rotate(10deg);
          }
          66% {
            transform: translate3d(-16px, 18px, 0) scale(1.02) rotate(6deg);
          }
        }
        @keyframes learnBlobML {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1.01) rotate(-10deg);
          }
          40% {
            transform: translate3d(-24px, 12px, 0) scale(1.03) rotate(-7deg);
          }
          75% {
            transform: translate3d(16px, -18px, 0) scale(1.02) rotate(-12deg);
          }
        }
        @keyframes learnBlobBR {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1.01) rotate(14deg);
          }
          30% {
            transform: translate3d(18px, 22px, 0) scale(1.03) rotate(12deg);
          }
          65% {
            transform: translate3d(-18px, -20px, 0) scale(1.04) rotate(16deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .learnBlob,
          .aboutBlob,
          .gamesToken {
            animation: none !important;
            transform: translate3d(0, 0, 0) scale(1) !important;
          }
        }
        .learnHead {
          margin-bottom: 32px;
        }
        .learnHead :global(.sectionTitle) {
          font-size: 48px;
          line-height: 1.05;
          margin-bottom: 14px;
          font-weight: 1000;
        }
        .learnHead :global(.sectionLead) {
          font-size: 20px;
          line-height: 1.5;
          max-width: 52ch;
          margin-bottom: 4px;
          font-weight: 600;
        }

        /* Match Learn title treatment for key home sections (requested) */
        .aboutSection :global(.sectionTitle),
        .howSection :global(.sectionTitle),
        .ideasBridgeSection :global(.sectionTitle),
        :global(#games.section) :global(.sectionTitle) {
          font-size: 48px;
          line-height: 1.05;
          margin-bottom: 14px;
          font-weight: 1000;
          letter-spacing: -0.03em;
        }

        .gamesPanel {
          display: grid;
          gap: 14px;
        }
        .gamesPanelTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
        }
        /* Games: move decorative tile strip into the section header (top-right) */
        :global(#games) :global(.splitContent) {
          position: relative;
        }
        :global(#games) :global(.splitHead) {
          padding-right: 360px;
        }
        .gamesHeadDecor {
          position: absolute;
          top: 0;
          right: 0;
        }
        .gamesHeadDecor .tileGrid {
          max-width: 320px;
        }
        .gamesInner {
          border-radius: var(--radius-xl);
          padding: 18px;
          /* Keep this light so the peach section color reads through */
          background: rgba(255, 255, 255, 0.62);
          border: 1px solid var(--border);
          box-shadow: var(--shadowXs);
        }
        :global(html.dark) .gamesInner {
          background: rgba(255, 255, 255, 0.08);
        }
        .gamesRow {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          align-items: stretch;
        }
        .gameCard {
          display: flex;
          flex-direction: column;
          gap: 8px;
          box-shadow: var(--shadowSm);
          height: 100%;
          position: relative;
          overflow: hidden;
          /* Keep hover calm; delight comes from the soft pattern overlay */
          transform: translateY(0);
          transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
        }
        .gameHoverPattern {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 400ms ease;
          pointer-events: none;
          z-index: 1;
          /* Peach “stained glass”: same geometry language as Learn/About, softer + warmer */
          background-image:
            conic-gradient(from 0deg at 50% 50%,
              rgba(255, 122, 107, 0.12) 0deg 60deg,
              rgba(255, 168, 120, 0.10) 60deg 120deg,
              rgba(255, 122, 107, 0.16) 120deg 180deg,
              rgba(255, 216, 190, 0.14) 180deg 240deg,
              rgba(255, 122, 107, 0.08) 240deg 300deg,
              rgba(255, 168, 120, 0.12) 300deg 360deg
            ),
            linear-gradient(15deg, rgba(255, 122, 107, 0.06) 0%, transparent 40%),
            linear-gradient(165deg, rgba(255, 168, 120, 0.05) 0%, transparent 40%);
          background-blend-mode: multiply;
        }
        .gameCardBody {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 8px;
          height: 100%;
        }
        .gameCard:hover .gameHoverPattern {
          opacity: 1;
        }
        .gameCard:hover {
          transform: translateY(-1px);
          border-color: rgba(255, 122, 107, 0.16);
          box-shadow: var(--shadowSm);
        }
        .gameCard:focus-within {
          border-color: rgba(255, 122, 107, 0.20);
        }
        .gameLabel {
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted2);
        }
        .gameTitle {
          font-weight: 950;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .gameText {
          margin: 0;
          color: var(--muted);
        }
        .gameActions {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-top: auto;
        }

        /* Games: soft peach section background (muted, low saturation) */
        :global(#games.section) {
          background: var(--tintCoral) !important;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        :global(#games.section)::before {
          /* Avoid the global panel texture; keep it clean like Learn */
          display: none;
        }
        :global(#games.section) :global(.splitInner) {
          /* Let the section tint do the work; keep the split wrapper quiet */
          background: transparent;
          border-color: transparent;
          box-shadow: none;
          padding: 14px;
        }
        :global(#games.section) :global(.splitContent) {
          gap: 18px;
        }

        .howHeader {
          margin-bottom: 22px;
        }

        .howSection {
          padding-top: 98px;
          padding-bottom: 98px;
          position: relative;
          z-index: 10;
          overflow: visible; /* Allow map to overlap other sections */
        }

        .howLayout {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
          gap: 34px;
          align-items: flex-start;
          overflow: visible;
        }
        .howLeft {
          min-width: 0;
        }
        .howStack {
          display: flex;
          flex-direction: column;
          gap: 18px;
          align-items: flex-start; /* hard requirement: do NOT center */
        }
        .howRow {
          display: grid;
          /* ~22% of max-width (640px) */
          grid-template-columns: 140px 1fr;
          align-items: stretch;
          padding: 0;
          width: 100%;
          max-width: 640px;
          margin: 0;
          min-height: 120px;
          overflow: hidden;
          /* Card that responds to theme */
          background: var(--surface);
          color: var(--text);
          border: 1px solid var(--borderStrong);
          border-radius: var(--radius-xl);
          transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
        }

        .howAccent {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          border-right: 1px solid var(--borderStrong);
          position: relative;
          z-index: 2;
        }

        .howRowLavender .howAccent { 
          background: rgba(123, 108, 255, 0.12); 
        }
        .howRowMint .howAccent { 
          background: rgba(33, 181, 143, 0.12); 
        }
        .howRowCoral .howAccent { 
          background: rgba(255, 122, 107, 0.12); 
        }
        :global(html.dark) .howRowLavender .howAccent { 
          background: rgba(123, 108, 255, 0.18); 
        }
        :global(html.dark) .howRowMint .howAccent { 
          background: rgba(33, 181, 143, 0.18); 
        }
        :global(html.dark) .howRowCoral .howAccent { 
          background: rgba(255, 122, 107, 0.18); 
        }

        /* Match the typography and feel of the original tag */
        .howLabel {
          font-size: 14px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          font-weight: 1000;
          text-align: center;
          padding: 0 8px;
        }

        /* Hover: soft perimeter underglow and slight lift */
        .howRow:hover {
          transform: translateY(-3px);
          border-color: var(--borderStrong);
        }
        .howRowLavender:hover {
          box-shadow: 0 12px 36px -8px rgba(123, 108, 255, 0.35);
          border-color: rgba(123, 108, 255, 0.25);
        }
        .howRowMint:hover {
          box-shadow: 0 12px 36px -8px rgba(33, 181, 143, 0.35);
          border-color: rgba(33, 181, 143, 0.25);
        }
        .howRowCoral:hover {
          box-shadow: 0 12px 36px -8px rgba(255, 122, 107, 0.35);
          border-color: rgba(255, 122, 107, 0.25);
        }
        :global(html.dark) .howRowLavender:hover {
          box-shadow: 0 12px 36px -8px rgba(123, 108, 255, 0.45);
        }
        :global(html.dark) .howRowMint:hover {
          box-shadow: 0 12px 36px -8px rgba(33, 181, 143, 0.45);
        }
        :global(html.dark) .howRowCoral:hover {
          box-shadow: 0 12px 36px -8px rgba(255, 122, 107, 0.45);
        }

        .howRowLink,
        .howRowBtn {
          cursor: pointer;
          text-align: left;
          width: 100%;
        }
        .howText {
          padding: 24px 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: transparent;
        }
        .howLine {
          color: var(--text);
          font-size: 18px;
          font-weight: 600;
          line-height: 1.5;
          margin: 0;
        }

        /* Right column: site-tied, low-contrast KnowledgeMap (calm, no motion) */
        .howRight {
          min-width: 0;
          position: relative;
        }
        .howRightGraphic {
          position: absolute;
          left: 0;
          right: 0;
          /* Part of background: no border/bg/shadow */
          opacity: 0.46;
          pointer-events: none;
          user-select: none;
          overflow: visible;
          /* Ensure centered relative to the text content */
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .howRightGraphic :global(.howRightMap) {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -58%) rotate(-6deg) scale(1.25);
          height: 53%;
          width: 100%;
          display: block;
          /* Slightly darker in light mode for legibility (stays “background-y”) */
          color: rgba(17, 24, 39, 0.70);
          z-index: 1;
          pointer-events: none;
        }
        /* Keep a very subtle endpoint glow; timing is handled per-node in the SVG for a sporadic feel */
        .howRight :global(.km-endpoint) {
          filter: drop-shadow(0 0 1px currentColor);
        }

        :global(html.dark) .howRightGraphic {
          opacity: 0.56;
        }
        :global(html.dark) .howRightGraphic :global(.howRightMap) {
          /* Brighter in dark mode so it doesn’t disappear into the panel */
          color: rgba(255, 255, 255, 0.78);
        }
        .funSection {
          padding-top: 84px;
          padding-bottom: 80px;
        }

        /* News: match main-section structure, but keep it clean (white, no decorative chrome). */
        :global(main > section#news.section)::before,
        :global(main > section#news.section)::after {
          display: none !important;
        }
        .newsSection {
          background: var(--surface) !important;
          border-top: 1px solid var(--border);
          border-bottom: 0;
          padding-top: 62px;
          padding-bottom: 68px;
        }
        :global(html.dark) .newsSection {
          /* Dark-mode-only: make News the darkest section on the site. */
          background: #000 !important;
        }
        .newsLayout {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: 28px;
          align-items: center;
        }
        .newsLeft {
          min-width: 0;
        }
        .newsLead {
          margin-bottom: 0;
          max-width: 56ch;
        }
        .newsRight {
          min-width: 0;
          display: grid;
          place-items: center;
        }
        .newsRightInner {
          width: 100%;
          max-width: 860px;
          display: grid;
          justify-items: center;
          gap: 14px;
        }
        .newsPill {
          width: min(620px, 100%);
          display: grid;
          gap: 8px;
          padding: 12px 16px;
          border-radius: 999px;
          border: 1px solid rgba(33, 181, 143, 0.44);
          background: var(--accentMint);
          box-shadow: var(--shadowSm);
          color: var(--accentWhite);
          position: relative;
          overflow: hidden;
          transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease, background 160ms ease;
        }
        .newsPillContent {
          position: relative;
          z-index: 2;
          display: grid;
          gap: 8px;
        }
        .newsHoverPattern {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 400ms ease;
          pointer-events: none;
          z-index: 1;
          /* Mixture of About (Lavender), Learn (Mint), and Games (Peach) pattern colors */
          background-image: 
            /* Primary conic: balanced lavender-mint-peach segments */
            conic-gradient(from 0deg at 50% 50%,
              rgba(123, 108, 255, 0.4) 0deg 30deg,
              rgba(88, 73, 200, 0.35) 30deg 60deg,
              rgba(33, 181, 143, 0.4) 60deg 90deg,
              rgba(22, 122, 96, 0.35) 90deg 120deg,
              rgba(255, 122, 107, 0.4) 120deg 150deg,
              rgba(255, 168, 120, 0.35) 150deg 180deg,
              rgba(123, 108, 255, 0.4) 180deg 210deg,
              rgba(88, 73, 200, 0.35) 210deg 240deg,
              rgba(33, 181, 143, 0.4) 240deg 270deg,
              rgba(22, 122, 96, 0.35) 270deg 300deg,
              rgba(255, 122, 107, 0.4) 300deg 330deg,
              rgba(255, 168, 120, 0.35) 330deg 360deg
            ),
            /* Secondary conic offset: adds depth */
            conic-gradient(from 45deg at 30% 70%,
              rgba(123, 108, 255, 0.25) 0deg 120deg,
              rgba(33, 181, 143, 0.25) 120deg 240deg,
              rgba(255, 122, 107, 0.25) 240deg 360deg
            ),
            conic-gradient(from 45deg at 70% 30%,
              rgba(255, 122, 107, 0.25) 0deg 120deg,
              rgba(123, 108, 255, 0.25) 120deg 240deg,
              rgba(33, 181, 143, 0.25) 240deg 360deg
            ),
            /* Symmetric linear gradients - Lavender (About) */
            linear-gradient(15deg, rgba(123, 108, 255, 0.3) 0%, transparent 40%),
            linear-gradient(195deg, rgba(180, 170, 255, 0.3) 0%, transparent 40%),
            /* Symmetric linear gradients - Mint (Learn) */
            linear-gradient(75deg, rgba(33, 181, 143, 0.3) 0%, transparent 40%),
            linear-gradient(255deg, rgba(168, 230, 207, 0.3) 0%, transparent 40%),
            /* Symmetric linear gradients - Peach (Games) */
            linear-gradient(135deg, rgba(255, 122, 107, 0.25) 0%, transparent 40%),
            linear-gradient(315deg, rgba(255, 216, 190, 0.25) 0%, transparent 40%);
          background-blend-mode: multiply;
        }
        .newsPill:hover {
          transform: translateY(-2px);
          border-color: rgba(33, 181, 143, 0.55);
          box-shadow: 
            0 12px 36px -8px rgba(123, 108, 255, 0.4),
            0 12px 36px -8px rgba(33, 181, 143, 0.4),
            0 12px 36px -8px rgba(255, 122, 107, 0.4);
        }
        .newsPill:hover .newsHoverPattern {
          opacity: 1;
        }
        .newsHeadline {
          font-weight: 950;
          letter-spacing: -0.02em;
          line-height: 1.25;
          font-size: 15px;
          text-align: left;
        }
        .newsContext {
          font-size: 13px;
          line-height: 1.45;
          text-align: left;
          color: rgba(255, 255, 255, 0.85);
        }
        .newsAllLink {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          color: var(--muted);
          font-weight: 750;
          text-decoration: underline;
          text-decoration-color: rgba(17, 24, 39, 0.22);
          text-underline-offset: 4px;
          text-decoration-thickness: 1px;
        }
        .newsAllLink:hover {
          color: var(--text);
          text-decoration-color: rgba(17, 24, 39, 0.30);
        }
        :global(html.dark) .newsAllLink {
          text-decoration-color: rgba(255, 255, 255, 0.22);
        }
        :global(html.dark) .newsAllLink:hover {
          text-decoration-color: rgba(255, 255, 255, 0.30);
        }

        @media (min-width: 981px) {
          .howRow {
            height: auto;
          }
        }

        @media (max-width: 980px) and (orientation: portrait) {
          /* Portrait stacks */
          .heroInner {
            grid-template-columns: 1fr;
          }
          .headline {
            font-size: 34px;
          }
          .heroArt {
            min-height: 420px;
          }
          .hero {
            padding: 66px 0 66px 0;
          }
          .howLayout {
            grid-template-columns: 1fr;
            gap: 22px;
          }
          /* Keep accent block beside text (don’t drop below) */
          .howRow {
            grid-template-columns: 100px 1fr;
            min-height: 0;
          }
          @media (max-width: 560px) {
            .howRow {
              grid-template-columns: 1fr;
            }
            .howAccent {
              height: 42px;
              border-right: none;
              border-bottom: 1px solid var(--borderStrong);
            }
            .howText {
              padding: 20px;
            }
            .howLine {
              font-size: 16px;
            }
          }
          .howRightGraphic {
            min-height: 320px;
          }
          .gamesRow {
            grid-template-columns: 1fr;
          }
          .stepItem {
            grid-template-columns: auto 1fr;
          }
          .newsLayout {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          /* Keep the “quiet pointer” centered when stacked */
          .newsRightInner {
            gap: 12px;
          }
          :global(#games) :global(.splitHead) {
            padding-right: 0;
          }
          .gamesHeadDecor {
            position: static;
            margin-top: 10px;
            justify-self: end;
          }
          .aboutSection .aboutTopGrid {
            grid-template-columns: 1fr;
          }
          .aboutSection .aboutPillars {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 980px) and (orientation: landscape) {
          .heroInner {
            grid-template-columns: 0.9fr 1.1fr;
          }
          .headline {
            font-size: 32px;
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
      `}</style>
    </>
  );
}



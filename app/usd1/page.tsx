"use client";

import React from "react";
import { IconCopy } from "@/components/icons";

/* ─── Constants ─── */

const MINT = "5H1jkA7erRxwD8uqH8KimMD74ctjUYBd32rbp2jubonk";

const LINKS = {
  dexscreener:
    "https://dexscreener.com/solana/32vjneqs23a7vhh6g8gcuwem14ffssj1kdzz59hz5nyk",
  jupiter:
    "https://jup.ag/tokens/5H1jkA7erRxwD8uqH8KimMD74ctjUYBd32rbp2jubonk",
  solscan:
    "https://solscan.io/token/5H1jkA7erRxwD8uqH8KimMD74ctjUYBd32rbp2jubonk",
  axiom:
    "https://axiom.trade/meme/32VjnEqs23a7vhH6G8Gcuwem14ffsSj1kdZz59HZ5NYK?chain=sol",
  padre:
    "https://trade.padre.gg/trade/solana/32VjnEqs23a7vhH6G8Gcuwem14ffssj1kdZz59HZ5NYK",
  streamflow:
    "https://app.streamflow.finance/token-dashboard/solana/mainnet/5H1jkA7erRxwD8uqH8KimMD74ctjUYBd32rbp2jubonk?type=lock",
  x: "https://x.com/UnicornSheepDog",
  telegram: "https://t.me/UnicornSheepDog1",
  email: "mailto:support@theunicornsheep.dog",
} as const;

const TEAM = [
  {
    initials: "PL",
    name: "Project Lead",
    title: "Strategy & Vision",
    desc: "Drives direction, coordinates development, and guides community growth.",
    accent: "var(--accentMint)",
    tint: "var(--tintMint)",
  },
  {
    initials: "LD",
    name: "Lead Developer",
    title: "On-chain Infrastructure",
    desc: "Builds, maintains, and verifies the smart contract and tooling layer.",
    accent: "var(--accentLavender)",
    tint: "var(--tintLavender)",
  },
  {
    initials: "CM",
    name: "Community Manager",
    title: "Community & Socials",
    desc: "Nurtures the community, moderates channels, and surfaces feedback.",
    accent: "var(--accentCoral)",
    tint: "var(--tintCoral)",
  },
  {
    initials: "CD",
    name: "Creative Director",
    title: "Art & Identity",
    desc: "Creates memes, visual assets, and the overall brand aesthetic.",
    accent: "var(--accentMint)",
    tint: "var(--tintMint)",
  },
];

const MEMES = [
  { id: 1, accent: "var(--accentMint)", glow: "rgba(33,181,143,0.22)", glowFocus: "rgba(33,181,143,0.50)", label: "Meme #1" },
  { id: 2, accent: "var(--accentLavender)", glow: "rgba(123,108,255,0.22)", glowFocus: "rgba(123,108,255,0.50)", label: "Meme #2" },
  { id: 3, accent: "var(--accentCoral)", glow: "rgba(255,122,107,0.22)", glowFocus: "rgba(255,122,107,0.50)", label: "Meme #3" },
  { id: 4, accent: "var(--accentMint)", glow: "rgba(33,181,143,0.22)", glowFocus: "rgba(33,181,143,0.50)", label: "Meme #4" },
  { id: 5, accent: "var(--accentLavender)", glow: "rgba(123,108,255,0.22)", glowFocus: "rgba(123,108,255,0.50)", label: "Meme #5" },
  { id: 6, accent: "var(--accentCoral)", glow: "rgba(255,122,107,0.22)", glowFocus: "rgba(255,122,107,0.50)", label: "Meme #6" },
  { id: 7, accent: "var(--accentMint)", glow: "rgba(33,181,143,0.22)", glowFocus: "rgba(33,181,143,0.50)", label: "Meme #7" },
  { id: 8, accent: "var(--accentLavender)", glow: "rgba(123,108,255,0.22)", glowFocus: "rgba(123,108,255,0.50)", label: "Meme #8" },
  { id: 9, accent: "var(--accentCoral)", glow: "rgba(255,122,107,0.22)", glowFocus: "rgba(255,122,107,0.50)", label: "Meme #9" },
];
const MEME_COUNT = MEMES.length;
const MEME_ANGLE = 360 / MEME_COUNT; // 40deg per item

/* ─── Page ─── */

export default function Usd1Page() {
  const [copied, setCopied] = React.useState(false);

  /* ─── Revolving meme carousel ─── */
  /* Track cumulative rotation so the ring always spins the same direction */
  const [memeRotation, setMemeRotation] = React.useState(0);
  const [memeVisible, setMemeVisible] = React.useState(false);
  const memeSectionRef = React.useRef<HTMLElement>(null);
  const activeIndex = ((memeRotation % MEME_COUNT) + MEME_COUNT) % MEME_COUNT;

  /* Start auto-rotation when section scrolls into view */
  React.useEffect(() => {
    const el = memeSectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setMemeVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!memeVisible) return;
    const id = setInterval(() => {
      setMemeRotation((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(id);
  }, [memeVisible]);

  /* Jump to a specific dot — take the shortest path */
  const goToMeme = React.useCallback((targetIndex: number) => {
    setMemeRotation((prev) => {
      const current = ((prev % MEME_COUNT) + MEME_COUNT) % MEME_COUNT;
      let delta = targetIndex - current;
      if (delta > MEME_COUNT / 2) delta -= MEME_COUNT;
      if (delta < -MEME_COUNT / 2) delta += MEME_COUNT;
      return prev + delta;
    });
  }, []);

  const copyMint = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(MINT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: do nothing */
    }
  }, []);

  /* Controlled-supply percentage */
  const controlledPct = ((400_206_164 / 999_834_836.562034) * 100).toFixed(1);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="u1Hero">
        <div className="u1HeroBg" aria-hidden="true" />
        <div className="container u1HeroContainer">
          <div className="u1HeroContent">
            <p className="u1HeroEyebrow">Solana Memecoin</p>
            <h1 className="u1HeroTitle">
              UnicornSheepDog1{" "}
              <span className="u1HeroTicker">(USD1)</span>
            </h1>
            <p className="u1HeroTagline">
              Built on transparency and public verification.
            </p>

            <div className="u1HeroActions">
              <button
                type="button"
                className={`btn u1CopyBtn ${copied ? "isCopied" : ""}`}
                onClick={copyMint}
                aria-label="Copy mint address to clipboard"
              >
                <IconCopy size={16} />
                {copied ? "Copied!" : "Copy Mint Address"}
              </button>
            </div>

            <div className="u1MintRow">
              <code className="u1Mint">{MINT}</code>
              <span className="u1MintNote">
                Ticker collision exists — verify mint address.
              </span>
            </div>
          </div>

          <div className="u1HeroVisual">
            <div className="u1HeroPlaceholder" aria-label="Meme image placeholder">
              <span className="u1PlaceholderIcon" aria-hidden="true">
                🦄🐑🐕
              </span>
              <span className="u1PlaceholderText">Meme image</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quick links ─── */}
      <div className="u1QuickLinks">
        <div className="container u1QLGrid">
          <div className="u1QLCol">
            <span className="u1QLLabel u1QLMint">Trade</span>
            <div className="u1QLLinks">
              <a href={LINKS.jupiter} target="_blank" rel="noreferrer" className="u1QLLink u1QLLinkMint">Jupiter</a>
              <a href={LINKS.dexscreener} target="_blank" rel="noreferrer" className="u1QLLink u1QLLinkMint">DexScreener</a>
            </div>
          </div>
          <div className="u1QLDivider" />
          <div className="u1QLCol">
            <span className="u1QLLabel u1QLLav">Verify</span>
            <div className="u1QLLinks">
              <a href={LINKS.solscan} target="_blank" rel="noreferrer" className="u1QLLink u1QLLinkLav">Solscan</a>
              <a href={LINKS.streamflow} target="_blank" rel="noreferrer" className="u1QLLink u1QLLinkLav">Streamflow</a>
            </div>
          </div>
          <div className="u1QLDivider" />
          <div className="u1QLCol">
            <span className="u1QLLabel u1QLCoral">Community</span>
            <div className="u1QLLinks">
              <a href={LINKS.x} target="_blank" rel="noreferrer" className="u1QLLink u1QLLinkCoral">X</a>
              <a href={LINKS.telegram} target="_blank" rel="noreferrer" className="u1QLLink u1QLLinkCoral">Telegram</a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── About ─── */}
      <section id="usd1-about" className="section u1Section u1AboutSection">
        {/* Floating ice-cube squares */}
        <div className="u1AboutCubes" aria-hidden="true">
          <div className="u1Cube u1Cube1" />
          <div className="u1Cube u1Cube2" />
          <div className="u1Cube u1Cube3" />
          <div className="u1Cube u1Cube4" />
          <div className="u1Cube u1Cube5" />
          <div className="u1Cube u1Cube6" />
        </div>
        <div className="container u1AboutContainer">
          <p className="u1AboutEyebrow">About USD1</p>
          <h2 className="u1AboutHeadline">
            Transparency you can<br />
            verify on-chain.
          </h2>
          <p className="u1AboutSub">
            USD1 is a community-driven memecoin on Solana where every token
            movement is traceable, every lock is time-bound, and every reserve
            is disclosed. No guessing, no hidden wallets.
          </p>

          <div className="u1AboutFeatures">
            <div className="u1AboutFeature">
              <div className="u1FeatureDot u1FeatureDotMint" />
              <div className="u1FeatureText">
                <span className="u1FeatureLabel">Public Locks</span>
                <span className="u1FeatureDesc">Time-bound &amp; verifiable on-chain</span>
              </div>
            </div>
            <div className="u1AboutFeatureDivider" />
            <div className="u1AboutFeature">
              <div className="u1FeatureDot u1FeatureDotLav" />
              <div className="u1FeatureText">
                <span className="u1FeatureLabel">Open Reserves</span>
                <span className="u1FeatureDesc">Fully disclosed holdings</span>
              </div>
            </div>
            <div className="u1AboutFeatureDivider" />
            <div className="u1AboutFeature">
              <div className="u1FeatureDot u1FeatureDotCoral" />
              <div className="u1FeatureText">
                <span className="u1FeatureLabel">Fully Traceable</span>
                <span className="u1FeatureDesc">Every movement on Solscan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tokenomics ─── */}
      <section id="usd1-tokenomics" className="section u1Section">
        <div className="container">
          <p className="u1SectionEyebrow">Tokenomics</p>
          <h2 className="u1SectionHeadline">Supply at a glance</h2>

          {/* Token identity - compact inline strip */}
          <div className="u1TokenMeta">
            <span className="u1TokenMetaItem">
              <span className="u1TokenMetaKey">Name</span> UnicornSheepDog1
            </span>
            <span className="u1TokenMetaSep" aria-hidden="true">/</span>
            <span className="u1TokenMetaItem">
              <span className="u1TokenMetaKey">Ticker</span> USD1
            </span>
            <span className="u1TokenMetaSep" aria-hidden="true">/</span>
            <span className="u1TokenMetaItem">
              <span className="u1TokenMetaKey">Chain</span> Solana
            </span>
          </div>

          {/* Mint address */}
          <div className="u1TokenMintRow">
            <span className="u1TokenMetaKey">Mint</span>
            <code className="u1TokenMintAddr">{MINT}</code>
          </div>

          {/* Hero supply numbers */}
          <div className="u1SupplyRow">
            <div className="u1SupplyItem">
              <span className="u1SupplyNum">999,834,836</span>
              <span className="u1SupplyLabel">Total Supply</span>
            </div>
            <div className="u1SupplyDivider" />
            <div className="u1SupplyItem">
              <span className="u1SupplyNum">599,628,672</span>
              <span className="u1SupplyLabel">Circulating</span>
            </div>
            <div className="u1SupplyDivider" />
            <div className="u1SupplyItem u1SupplyItemHighlight">
              <span className="u1SupplyNum">
                400,206,164
                <span className="u1SupplyPct"> ({controlledPct}%)</span>
              </span>
              <span className="u1SupplyLabel">Controlled</span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="u1BreakdownSection">
            <h3 className="u1SmallHeading">Breakdown</h3>
            <div className="u1BreakdownList">
              <div className="u1BreakdownItem">
                <span className="u1BreakdownDot" style={{ background: "var(--accentMint)" }} />
                <span className="u1BreakdownKey">Community Locks</span>
                <span className="u1BreakdownLine" />
                <span className="u1BreakdownVal">
                  150,231,128 <span className="u1BreakdownPct" style={{ color: "var(--accentMint)" }}>(15.0%)</span>
                </span>
              </div>
              <div className="u1BreakdownItem">
                <span className="u1BreakdownDot" style={{ background: "var(--accentLavender)" }} />
                <span className="u1BreakdownKey">Team Locks</span>
                <span className="u1BreakdownLine" />
                <span className="u1BreakdownVal">
                  60,152,159 <span className="u1BreakdownPct" style={{ color: "var(--accentLavender)" }}>(6.0%)</span>
                </span>
              </div>
              <div className="u1BreakdownItem">
                <span className="u1BreakdownDot" style={{ background: "var(--accentCoral)" }} />
                <span className="u1BreakdownKey">BONKfun Reserve</span>
                <span className="u1BreakdownLine" />
                <span className="u1BreakdownVal">
                  181,925,054 <span className="u1BreakdownPct" style={{ color: "var(--accentCoral)" }}>(18.2%)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Buybacks + Verification strip */}
          <div className="u1ProofStrip">
            <div className="u1ProofCard">
              <span className="u1ProofLabel">Buyback Events</span>
              <span className="u1ProofValue">62</span>
            </div>
            <div className="u1ProofDivider" />
            <div className="u1ProofCard">
              <span className="u1ProofLabel">USD1 Removed</span>
              <span className="u1ProofValue">68,049,982</span>
            </div>
            <div className="u1ProofDivider" />
            <div className="u1ProofCard u1ProofCardAction">
              <span className="u1ProofLabel">Team Multisig</span>
              <a
                href="https://app.squads.so/squads/CGAys8fAeWfYGCRBZ4opFoCcdHmLyWvc3TikC2DbLXUK/home"
                target="_blank"
                rel="noreferrer"
                className="u1ProofBtn"
              >
                View on Squads
                <span className="u1ProofArrow" aria-hidden="true">&#8599;</span>
              </a>
            </div>
          </div>

          {/* Lock ledger graphic */}
          <div className="u1LedgerWrap">
            <div className="u1LedgerPlaceholder" aria-label="Lock ledger graphic placeholder">
              <span className="u1LedgerPlaceholderText">
                Lock Ledger Graphic
              </span>
              <span className="u1LedgerCaption">
                /public/lock-ledger.png — add image to display here
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Memes ─── */}
      <section
        id="usd1-memes"
        className="section u1Section u1MemesSection"
        ref={memeSectionRef}
      >
        <div className="container">
          <p className="u1SectionEyebrow">Community</p>
          <h2 className="u1SectionHeadline">Memes &amp; Art</h2>

          <div className="u1RevolveViewport">
            <div
              className="u1RevolveRing"
              style={{
                transform: `rotateY(${-memeRotation * MEME_ANGLE}deg)`,
              }}
            >
              {MEMES.map((m, i) => {
                const isFocus = i === activeIndex;
                return (
                  <div
                    key={m.id}
                    className={`u1RevolveItem${isFocus ? " u1RevolveFocus" : ""}`}
                    style={{
                      "--ri": i,
                      "--meme-accent": m.accent,
                      "--meme-glow": m.glow,
                      "--meme-glow-focus": m.glowFocus,
                    } as React.CSSProperties}
                  >
                    <div className="u1MemeInner">
                      <span className="u1MemeLabel">{m.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Manual controls */}
          <div className="u1RevolveControls">
            <button
              type="button"
              className="u1RevolveBtn"
              onClick={() => setMemeRotation((p) => p - 1)}
              aria-label="Previous meme"
            >
              &#8249;
            </button>
            <span className="u1RevolveDots">
              {MEMES.map((m, i) => (
                <button
                  key={m.id}
                  type="button"
                  className={`u1RevolveDot${i === activeIndex ? " u1RevolveDotActive" : ""}`}
                  onClick={() => goToMeme(i)}
                  aria-label={`Go to ${m.label}`}
                  style={{ "--dot-accent": m.accent } as React.CSSProperties}
                />
              ))}
            </span>
            <button
              type="button"
              className="u1RevolveBtn"
              onClick={() => setMemeRotation((p) => p + 1)}
              aria-label="Next meme"
            >
              &#8250;
            </button>
          </div>
        </div>
      </section>

      {/* ─── Roadmap + Community CTA ─── */}
      <section id="usd1-roadmap" className="section u1Section" style={{ paddingBottom: 40 }}>
        <div className="container">
          <p className="u1SectionEyebrow">Roadmap</p>
          <h2 className="u1SectionHeadline">Where we&rsquo;ve been, where we&rsquo;re going</h2>

          <div className="u1Timeline">
            <div className="u1TimelineLine" aria-hidden="true" />

            <div className="u1Milestone u1MilestoneDone">
              <span className="u1MilestoneDot" style={{ background: "var(--accentMint)" }} />
              <span className="u1MilestoneTitle">Launch</span>
              <span className="u1MilestoneDesc">Token deployed on Solana via BONKfun</span>
            </div>

            <div className="u1Milestone u1MilestoneDone">
              <span className="u1MilestoneDot" style={{ background: "var(--accentLavender)" }} />
              <span className="u1MilestoneTitle">Multisig</span>
              <span className="u1MilestoneDesc">Treasury migrated to Squads multisig</span>
            </div>

            <div className="u1Milestone u1MilestoneOngoing">
              <span className="u1MilestoneDot u1MilestoneDotLoading">
                <svg className="u1LoadRing" viewBox="0 0 20 20">
                  <circle className="u1LoadRingWash" cx="10" cy="10" r="8" style={{ stroke: "var(--accentCoral)" }} />
                  <circle className="u1LoadRingDash" cx="10" cy="10" r="8" style={{ stroke: "var(--accentCoral)" }} />
                  <circle className="u1LoadRingArc" cx="10" cy="10" r="8" style={{ stroke: "var(--accentCoral)" }} />
                </svg>
              </span>
              <span className="u1MilestoneTitle">Locks</span>
              <span className="u1MilestoneDesc">Community &amp; team locks on Streamflow</span>
            </div>

            <div className="u1Milestone u1MilestoneOngoing">
              <span className="u1MilestoneDot u1MilestoneDotLoading">
                <svg className="u1LoadRing" viewBox="0 0 20 20">
                  <circle className="u1LoadRingWash" cx="10" cy="10" r="8" style={{ stroke: "var(--accentMint)" }} />
                  <circle className="u1LoadRingDash" cx="10" cy="10" r="8" style={{ stroke: "var(--accentMint)" }} />
                  <circle className="u1LoadRingArc" cx="10" cy="10" r="8" style={{ stroke: "var(--accentMint)" }} />
                </svg>
              </span>
              <span className="u1MilestoneTitle">Buybacks</span>
              <span className="u1MilestoneDesc">62 events removing 68M+ USD1</span>
            </div>

            <div className="u1Milestone u1MilestoneUpcoming">
              <span className="u1MilestoneDot u1MilestoneDotOutline" style={{ borderColor: "var(--accentLavender)", color: "var(--accentLavender)" }} />
              <span className="u1MilestoneTitle">Ecosystem</span>
              <span className="u1MilestoneDesc">Community growth, partnerships &amp; listings</span>
            </div>
          </div>

          <p className="u1TimelineDisclaimer">
            Milestones are directional and may change. Additional content and features are in development.
          </p>

          {/* Community CTA */}
          <div className="u1CTA">
            <h3 className="u1CTAHeadline">Join the Community</h3>
            <p className="u1CTASub">
              Follow along, share memes, and be part of the herd.
            </p>
            <div className="u1CTAButtons">
              <a
                href={LINKS.x}
                target="_blank"
                rel="noreferrer"
                className="u1CTABtn u1CTABtnMint"
              >
                Follow us on X
                <span className="u1CTAArrow" aria-hidden="true">&#8599;</span>
              </a>
              <a
                href={LINKS.telegram}
                target="_blank"
                rel="noreferrer"
                className="u1CTABtn u1CTABtnLav"
              >
                Join the Telegram
                <span className="u1CTAArrow" aria-hidden="true">&#8599;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <section id="usd1-team" className="section u1Section u1TeamSection">
        <div className="container">
          <p className="u1SectionEyebrow">Team</p>
          <h2 className="u1SectionHeadline">The people behind USD1</h2>

          <div className="u1TeamGrid">
            {TEAM.map((member) => (
              <div
                key={member.initials}
                className="u1TeamCard"
                style={{
                  "--team-accent": member.accent,
                  "--team-tint": member.tint,
                } as React.CSSProperties}
              >
                <div className="u1Avatar">
                  <span className="u1AvatarInitials">{member.initials}</span>
                </div>
                <div className="u1TeamInfo">
                  <span className="u1TeamName">{member.name}</span>
                  <span className="u1TeamTitle">{member.title}</span>
                  <p className="u1TeamDesc">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ─── Shared section eyebrow + headline ─── */
        .u1SectionEyebrow,
        .u1AboutEyebrow,
        .u1HeroEyebrow {
          margin: 0;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--accentMint);
          margin-bottom: 10px;
        }
        .u1SectionHeadline {
          margin: 0 0 32px 0;
          font-size: 34px;
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: var(--text);
        }

        /* ─── Hero ─── */
        .u1Hero {
          padding: 80px 0 72px 0;
          border-bottom: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }
        .u1HeroBg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(
            135deg,
            rgba(33, 181, 143, 0.18) 0%,
            rgba(123, 108, 255, 0.16) 25%,
            rgba(255, 122, 107, 0.16) 50%,
            rgba(123, 108, 255, 0.14) 75%,
            rgba(33, 181, 143, 0.18) 100%
          );
          background-size: 400% 400%;
          animation: heroGradientShift 12s ease infinite;
        }
        :global(html.dark) .u1HeroBg {
          background: linear-gradient(
            135deg,
            rgba(33, 181, 143, 0.22) 0%,
            rgba(123, 108, 255, 0.20) 25%,
            rgba(255, 122, 107, 0.20) 50%,
            rgba(123, 108, 255, 0.18) 75%,
            rgba(33, 181, 143, 0.22) 100%
          );
          background-size: 400% 400%;
          animation: heroGradientShift 12s ease infinite;
        }
        @keyframes heroGradientShift {
          0%   { background-position: 0% 50%; }
          25%  { background-position: 100% 0%; }
          50%  { background-position: 100% 100%; }
          75%  { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
        .u1HeroContainer {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 56px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .u1HeroContent {
          display: flex;
          flex-direction: column;
        }
        .u1HeroEyebrow {
          color: var(--accentLavender);
          margin-bottom: 14px;
        }
        .u1HeroTitle {
          margin: 0 0 16px 0;
          font-size: 52px;
          font-weight: 950;
          letter-spacing: -0.04em;
          line-height: 1.02;
          color: var(--text);
        }
        .u1HeroTicker {
          color: var(--accentMint);
        }
        .u1HeroTagline {
          margin: 0 0 28px 0;
          font-size: 19px;
          color: var(--muted);
          line-height: 1.55;
          max-width: 42ch;
        }
        .u1HeroActions {
          margin-bottom: 20px;
        }
        .u1CopyBtn {
          font-size: 14px;
          font-weight: 700;
          gap: 8px;
        }
        .u1CopyBtn.isCopied {
          border-color: rgba(33, 181, 143, 0.44);
          background: var(--accentMint);
          color: var(--accentWhite);
        }
        .u1MintRow {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .u1Mint {
          font-family: var(--font-mono);
          font-size: 12.5px;
          color: var(--muted);
          word-break: break-all;
          line-height: 1.5;
          padding: 10px 14px;
          background: rgba(255,255,255,0.55);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          max-width: max-content;
        }
        :global(html.dark) .u1Mint {
          background: rgba(255,255,255,0.06);
        }
        .u1MintNote {
          font-size: 12.5px;
          color: var(--muted2);
          font-style: italic;
        }

        /* Hero visual placeholder */
        .u1HeroVisual {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .u1HeroPlaceholder {
          width: 100%;
          aspect-ratio: 1;
          max-width: 380px;
          border-radius: var(--radius-xl);
          background: rgba(255,255,255,0.45);
          border: 2px dashed var(--border);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        :global(html.dark) .u1HeroPlaceholder {
          background: rgba(255,255,255,0.05);
        }
        .u1PlaceholderIcon {
          font-size: 48px;
        }
        .u1PlaceholderText {
          font-size: 14px;
          font-weight: 600;
          color: var(--muted2);
        }

        /* ─── Quick Links ─── */
        .u1QuickLinks {
          padding: 28px 0;
          border-bottom: 1px solid var(--border);
          background: var(--surface-2);
        }
        :global(html.dark) .u1QuickLinks {
          background: var(--surface);
        }
        .u1QLGrid {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 0;
        }
        .u1QLCol {
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
        }
        .u1QLDivider {
          width: 1px;
          align-self: stretch;
          background: var(--border);
          flex: 0 0 auto;
        }
        .u1QLLabel {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.14em;
        }
        .u1QLMint { color: var(--accentMint); }
        .u1QLLav { color: var(--accentLavender); }
        .u1QLCoral { color: var(--accentCoral); }
        .u1QLLinks {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }
        .u1QLLink {
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          text-decoration: none;
          padding: 6px 16px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.45);
          transition: color 140ms ease, border-color 140ms ease, background 140ms ease, transform 140ms ease, box-shadow 140ms ease;
          cursor: pointer;
        }
        :global(html.dark) .u1QLLink {
          background: rgba(255,255,255,0.05);
        }
        .u1QLLink:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadowXs);
        }
        .u1QLLinkMint:hover {
          color: var(--accentMint);
          border-color: rgba(33,181,143,0.35);
          background: rgba(33,181,143,0.08);
        }
        .u1QLLinkLav:hover {
          color: var(--accentLavender);
          border-color: rgba(123,108,255,0.35);
          background: rgba(123,108,255,0.08);
        }
        .u1QLLinkCoral:hover {
          color: var(--accentCoral);
          border-color: rgba(255,122,107,0.35);
          background: rgba(255,122,107,0.08);
        }

        /* ─── Sections shared ─── */
        .u1Section {
          scroll-margin-top: 80px;
        }

        /* ────────────────────────────────────────────
           ABOUT
        ──────────────────────────────────────────── */
        .u1AboutSection {
          background: rgba(123, 108, 255, 0.07) !important;
          position: relative;
          overflow: hidden;
        }
        :global(html.dark) .u1AboutSection {
          background: rgba(123, 108, 255, 0.10) !important;
        }

        /* Floating cubes */
        .u1AboutCubes {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .u1Cube {
          position: absolute;
          border-radius: 14px;
          border: 2px solid rgba(123, 108, 255, 0.12);
          background: rgba(123, 108, 255, 0.04);
        }
        :global(html.dark) .u1Cube {
          border-color: rgba(123, 108, 255, 0.16);
          background: rgba(123, 108, 255, 0.05);
        }
        .u1Cube1 { width: 120px; height: 120px; top: 8%; left: 4%;
          animation: cubeFloat1 18s ease-in-out infinite; }
        .u1Cube2 { width: 80px; height: 80px; top: 60%; left: 80%;
          animation: cubeFloat2 22s ease-in-out infinite; }
        .u1Cube3 { width: 100px; height: 100px; top: 22%; left: 58%;
          animation: cubeFloat3 20s ease-in-out infinite; }
        .u1Cube4 { width: 64px; height: 64px; top: 72%; left: 16%;
          animation: cubeFloat4 24s ease-in-out infinite; }
        .u1Cube5 { width: 140px; height: 140px; top: -8%; left: 84%;
          animation: cubeFloat5 19s ease-in-out infinite; }
        .u1Cube6 { width: 56px; height: 56px; top: 44%; left: 36%;
          animation: cubeFloat6 26s ease-in-out infinite; }
        @keyframes cubeFloat1 {
          0%, 100% { transform: translate(0,0) rotate(12deg); }
          25% { transform: translate(30px,-20px) rotate(20deg); }
          50% { transform: translate(15px,25px) rotate(8deg); }
          75% { transform: translate(-20px,10px) rotate(16deg); }
        }
        @keyframes cubeFloat2 {
          0%, 100% { transform: translate(0,0) rotate(-8deg); }
          25% { transform: translate(-25px,15px) rotate(-16deg); }
          50% { transform: translate(-10px,-30px) rotate(-4deg); }
          75% { transform: translate(20px,-10px) rotate(-12deg); }
        }
        @keyframes cubeFloat3 {
          0%, 100% { transform: translate(0,0) rotate(25deg); }
          33% { transform: translate(-20px,-25px) rotate(18deg); }
          66% { transform: translate(25px,15px) rotate(32deg); }
        }
        @keyframes cubeFloat4 {
          0%, 100% { transform: translate(0,0) rotate(-15deg); }
          25% { transform: translate(18px,-12px) rotate(-10deg); }
          50% { transform: translate(-15px,-28px) rotate(-22deg); }
          75% { transform: translate(-25px,8px) rotate(-18deg); }
        }
        @keyframes cubeFloat5 {
          0%, 100% { transform: translate(0,0) rotate(6deg); }
          33% { transform: translate(-18px,22px) rotate(14deg); }
          66% { transform: translate(12px,-15px) rotate(0deg); }
        }
        @keyframes cubeFloat6 {
          0%, 100% { transform: translate(0,0) rotate(30deg); }
          25% { transform: translate(22px,18px) rotate(22deg); }
          50% { transform: translate(-12px,28px) rotate(38deg); }
          75% { transform: translate(-20px,-10px) rotate(26deg); }
        }

        /* About content */
        .u1AboutContainer {
          position: relative;
          z-index: 1;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .u1AboutEyebrow {
          color: var(--accentLavender);
        }
        .u1AboutHeadline {
          margin: 0 0 20px 0;
          font-size: 42px;
          font-weight: 950;
          letter-spacing: -0.035em;
          line-height: 1.08;
          color: var(--text);
        }
        .u1AboutSub {
          margin: 0 0 48px 0;
          font-size: 18px;
          color: var(--muted);
          line-height: 1.65;
          max-width: 52ch;
        }

        /* Feature highlights */
        .u1AboutFeatures {
          display: flex;
          align-items: center;
          gap: 28px;
          padding: 24px 36px;
          border-radius: var(--radius-xl);
          background: rgba(255,255,255,0.50);
          border: 1px solid rgba(123, 108, 255, 0.10);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        :global(html.dark) .u1AboutFeatures {
          background: rgba(255,255,255,0.05);
          border-color: rgba(123, 108, 255, 0.14);
        }
        .u1AboutFeature {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .u1AboutFeatureDivider {
          width: 1px;
          height: 36px;
          background: var(--border);
          flex: 0 0 auto;
        }
        .u1FeatureDot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex: 0 0 auto;
        }
        .u1FeatureDotMint { background: var(--accentMint); }
        .u1FeatureDotLav { background: var(--accentLavender); }
        .u1FeatureDotCoral { background: var(--accentCoral); }
        .u1FeatureText {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: left;
        }
        .u1FeatureLabel {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--text);
        }
        .u1FeatureDesc {
          font-size: 13px;
          color: var(--muted);
        }

        /* ────────────────────────────────────────────
           TOKENOMICS
        ──────────────────────────────────────────── */

        /* Token identity strip */
        .u1TokenMeta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px 14px;
          font-size: 15px;
          color: var(--text);
          margin-bottom: 14px;
        }
        .u1TokenMetaKey {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.10em;
          color: var(--muted2);
          margin-right: 6px;
        }
        .u1TokenMetaItem {
          font-weight: 700;
        }
        .u1TokenMetaSep {
          color: var(--border);
          font-weight: 400;
        }

        /* Mint row */
        .u1TokenMintRow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        .u1TokenMintAddr {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--muted);
          word-break: break-all;
          line-height: 1.5;
        }

        /* Hero supply row */
        .u1SupplyRow {
          display: flex;
          align-items: stretch;
          gap: 0;
          margin-bottom: 48px;
          border-radius: var(--radius-xl);
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: var(--shadowXs);
          overflow: hidden;
        }
        .u1SupplyItem {
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 32px 20px;
          text-align: center;
        }
        .u1SupplyItemHighlight {
          background: var(--tintMint);
        }
        :global(html.dark) .u1SupplyItemHighlight {
          background: rgba(33,181,143,0.08);
        }
        .u1SupplyDivider {
          width: 1px;
          background: var(--border);
          flex: 0 0 auto;
        }
        .u1SupplyNum {
          font-size: 26px;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: var(--text);
          line-height: 1.1;
        }
        .u1SupplyPct {
          font-size: 16px;
          font-weight: 700;
          color: var(--accentMint);
        }
        .u1SupplyLabel {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.10em;
          color: var(--muted2);
        }

        /* Breakdown section */
        .u1BreakdownSection {
          margin-bottom: 36px;
        }
        .u1SmallHeading {
          margin: 0 0 16px 0;
          font-size: 16px;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--text);
        }
        .u1BreakdownList {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .u1BreakdownItem {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
        }
        .u1BreakdownItem:last-child {
          border-bottom: none;
        }
        .u1BreakdownDot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex: 0 0 auto;
        }
        .u1BreakdownKey {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          flex: 0 0 auto;
        }
        .u1BreakdownLine {
          flex: 1 1 auto;
          height: 1px;
          background: var(--border);
          min-width: 20px;
        }
        .u1BreakdownVal {
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--text);
          flex: 0 0 auto;
          font-variant-numeric: tabular-nums;
        }
        .u1BreakdownPct {
          font-size: 13px;
          font-weight: 700;
        }

        /* Proof strip — buybacks + multisig */
        .u1ProofStrip {
          display: flex;
          align-items: stretch;
          border-radius: var(--radius-xl);
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: var(--shadowXs);
          overflow: hidden;
          margin-top: 36px;
        }
        .u1ProofCard {
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 24px 16px;
          text-align: center;
        }
        .u1ProofDivider {
          width: 1px;
          background: var(--border);
          flex: 0 0 auto;
        }
        .u1ProofLabel {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.10em;
          color: var(--muted2);
        }
        .u1ProofValue {
          font-size: 22px;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: var(--text);
          font-variant-numeric: tabular-nums;
        }
        .u1ProofCardAction {
          gap: 10px;
        }
        .u1ProofBtn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: var(--accentLavender);
          text-decoration: none;
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid rgba(123,108,255,0.25);
          background: rgba(123,108,255,0.06);
          transition: background 140ms ease, border-color 140ms ease, transform 140ms ease, box-shadow 140ms ease;
          cursor: pointer;
        }
        .u1ProofBtn:hover {
          background: rgba(123,108,255,0.12);
          border-color: rgba(123,108,255,0.40);
          transform: translateY(-1px);
          box-shadow: var(--shadowXs);
        }
        .u1ProofBtn:focus-visible {
          outline: none;
          box-shadow: var(--focus);
        }
        .u1ProofArrow {
          font-size: 14px;
          line-height: 1;
        }

        /* Lock ledger placeholder */
        .u1LedgerWrap {
          margin-top: 40px;
        }
        .u1LedgerPlaceholder {
          width: 100%;
          min-height: 180px;
          border-radius: var(--radius-xl);
          background: var(--surface);
          border: 2px dashed var(--border);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 32px;
        }
        .u1LedgerPlaceholderText {
          font-size: 15px;
          font-weight: 700;
          color: var(--muted2);
        }
        .u1LedgerCaption {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--muted2);
        }

        /* ────────────────────────────────────────────
           MEMES — 3D Revolving Carousel
        ──────────────────────────────────────────── */
        .u1MemesSection {
          background: rgba(33, 181, 143, 0.07) !important;
          overflow: hidden;
        }
        :global(html.dark) .u1MemesSection {
          background: rgba(33, 181, 143, 0.10) !important;
        }

        /* Perspective wrapper */
        .u1RevolveViewport {
          perspective: 1200px;
          overflow: visible;
          padding: 80px 20px 72px 20px;
          display: flex;
          justify-content: center;
        }

        /* Rotating ring that holds all cards */
        .u1RevolveRing {
          position: relative;
          width: 200px;
          height: 200px;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Each card positioned around the ring */
        .u1RevolveItem {
          position: absolute;
          top: 0;
          left: 0;
          width: 200px;
          height: 200px;
          transform: rotateY(calc(var(--ri) * 40deg)) translateZ(380px);
          backface-visibility: hidden;
          transition: opacity 0.6s ease, filter 0.6s ease;
          opacity: 0.45;
          filter: blur(1px) saturate(0.7);
        }
        .u1RevolveItem.u1RevolveFocus {
          opacity: 1;
          filter: blur(0) saturate(1);
          z-index: 2;
        }

        /* Card inner — outlined with glow */
        .u1MemeInner {
          width: 100%;
          height: 100%;
          border-radius: var(--radius-xl);
          background: transparent;
          border: 2px solid var(--meme-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: box-shadow 0.6s ease, transform 0.6s ease, border-width 0.6s ease;
          box-shadow: 0 0 12px 2px var(--meme-glow),
                      inset 0 0 8px 2px var(--meme-glow);
        }
        .u1RevolveFocus .u1MemeInner {
          transform: scale(1.12);
          border-width: 2.5px;
          box-shadow: 0 0 36px 10px var(--meme-glow-focus),
                      0 0 12px 3px var(--meme-glow),
                      inset 0 0 14px 4px var(--meme-glow);
        }
        .u1MemeLabel {
          font-size: 14px;
          font-weight: 700;
          color: var(--muted2);
          transition: color 0.4s ease;
        }
        .u1RevolveFocus .u1MemeLabel {
          color: var(--text);
        }

        /* Controls below the carousel */
        .u1RevolveControls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 4px;
        }
        .u1RevolveBtn {
          appearance: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease;
        }
        .u1RevolveBtn:hover {
          transform: scale(1.08);
          box-shadow: var(--shadowSm);
          border-color: var(--accentMint);
        }
        .u1RevolveBtn:focus-visible {
          outline: none;
          box-shadow: var(--focus);
        }

        /* Dot indicators */
        .u1RevolveDots {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .u1RevolveDot {
          appearance: none;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: var(--border);
          cursor: pointer;
          padding: 0;
          transition: transform 200ms ease, background 200ms ease, box-shadow 200ms ease;
        }
        .u1RevolveDot:hover {
          transform: scale(1.3);
          background: var(--muted2);
        }
        .u1RevolveDot.u1RevolveDotActive {
          background: var(--dot-accent);
          transform: scale(1.4);
          box-shadow: 0 0 6px 2px var(--dot-accent);
        }

        /* ────────────────────────────────────────────
           ROADMAP + CTA
        ──────────────────────────────────────────── */

        /* Timeline */
        .u1Timeline {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 0;
          margin-bottom: 20px;
          padding: 0 12px;
        }
        .u1TimelineLine {
          position: absolute;
          top: 7px;
          left: 12px;
          right: 12px;
          height: 2px;
          background: var(--border);
          z-index: 0;
        }
        .u1Milestone {
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
          position: relative;
          z-index: 1;
        }
        .u1MilestoneDot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          flex: 0 0 auto;
          box-shadow: 0 0 0 4px var(--bg);
        }
        :global(html.dark) .u1MilestoneDot {
          box-shadow: 0 0 0 4px var(--bg);
        }
        .u1MilestoneDotOutline {
          background: transparent !important;
          border: 2.5px solid;
          box-shadow: 0 0 0 3px var(--bg);
          opacity: 0.45;
        }
        .u1MilestoneDotLoading {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }
        .u1LoadRing {
          width: 100%;
          height: 100%;
          display: block;
          animation: loadRingSpin 12s linear infinite;
        }
        /* Layer 1: faint full-circle wash — always visible color */
        .u1LoadRingWash {
          fill: none;
          stroke-width: 2;
          opacity: 0.18;
          stroke-linecap: round;
        }
        /* Layer 2: dashed texture ring in the accent color */
        .u1LoadRingDash {
          fill: none;
          stroke-width: 1.5;
          stroke-dasharray: 2.5 4;
          opacity: 0.35;
          stroke-linecap: round;
        }
        /* Layer 3: bright arc that breathes between ~35% and ~95% */
        .u1LoadRingArc {
          fill: none;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-dasharray: 50.26;
          stroke-dashoffset: 32.67;
          animation: loadArcBreathe 4s ease-in-out infinite alternate;
        }
        /* Slow rotation of the whole ring */
        @keyframes loadRingSpin {
          from { transform: rotate(-90deg); }
          to { transform: rotate(270deg); }
        }
        /* Arc breathes between ~35% and ~95% filled */
        @keyframes loadArcBreathe {
          0% { stroke-dashoffset: 32.67; }
          100% { stroke-dashoffset: 2.51; }
        }
        .u1MilestoneTitle {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--text);
        }
        .u1MilestoneDesc {
          font-size: 12.5px;
          color: var(--muted);
          line-height: 1.4;
          max-width: 16ch;
        }
        .u1MilestoneUpcoming .u1MilestoneTitle,
        .u1MilestoneUpcoming .u1MilestoneDesc {
          opacity: 0.55;
        }

        .u1TimelineDisclaimer {
          margin: 0 0 48px 0;
          text-align: center;
          font-size: 12.5px;
          font-style: italic;
          color: var(--muted2);
        }

        /* Community CTA */
        .u1CTA {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 28px 20px 0;
          border-top: 1px solid var(--border);
          margin-top: 8px;
        }
        .u1CTAHeadline {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .u1CTASub {
          margin: 0 0 16px 0;
          font-size: 14px;
          color: var(--muted2);
          max-width: 40ch;
        }
        .u1CTAButtons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .u1CTABtn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 999px;
          border: 1px solid;
          transition: background 140ms ease, border-color 140ms ease, transform 140ms ease, box-shadow 140ms ease;
          cursor: pointer;
        }
        .u1CTABtn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadowSm);
        }
        .u1CTABtn:focus-visible {
          outline: none;
          box-shadow: var(--focus);
        }
        .u1CTABtnMint {
          color: var(--accentMint);
          border-color: rgba(33,181,143,0.30);
          background: rgba(33,181,143,0.07);
        }
        .u1CTABtnMint:hover {
          background: rgba(33,181,143,0.14);
          border-color: rgba(33,181,143,0.45);
        }
        .u1CTABtnLav {
          color: var(--accentLavender);
          border-color: rgba(123,108,255,0.30);
          background: rgba(123,108,255,0.07);
        }
        .u1CTABtnLav:hover {
          background: rgba(123,108,255,0.14);
          border-color: rgba(123,108,255,0.45);
        }
        .u1CTAArrow {
          font-size: 15px;
          line-height: 1;
        }

        /* ────────────────────────────────────────────
           TEAM
        ──────────────────────────────────────────── */
        .u1TeamSection {
          background: rgba(255, 122, 107, 0.07) !important;
        }
        :global(html.dark) .u1TeamSection {
          background: rgba(255, 122, 107, 0.10) !important;
        }
        .u1TeamGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .u1TeamCard {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 22px 24px;
          border-radius: var(--radius-xl);
          background: rgba(255,255,255,0.50);
          border: 1px solid rgba(255,122,107,0.10);
          transition: transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease;
        }
        :global(html.dark) .u1TeamCard {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,122,107,0.12);
        }
        .u1TeamCard:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadowSm);
          border-color: rgba(255,122,107,0.18);
        }
        .u1Avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--team-tint);
          border: 2px solid var(--team-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }
        .u1AvatarInitials {
          font-size: 17px;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: var(--team-accent);
        }
        .u1TeamInfo {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .u1TeamName {
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--text);
        }
        .u1TeamTitle {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--team-accent);
        }
        .u1TeamDesc {
          margin: 4px 0 0 0;
          font-size: 13.5px;
          color: var(--muted);
          line-height: 1.45;
        }

        /* ─── Responsive ─── */
        @media (max-width: 980px) {
          .u1HeroContainer {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .u1HeroTitle { font-size: 40px; }
          .u1HeroVisual { order: -1; }
          .u1HeroPlaceholder { max-width: 260px; }
          .u1AboutHeadline { font-size: 34px; }
          .u1SupplyRow { flex-direction: column; }
          .u1SupplyDivider { width: 100%; height: 1px; }
          .u1SupplyItem { padding: 22px 20px; }
          .u1ProofStrip { flex-direction: column; }
          .u1ProofDivider { width: 100%; height: 1px; }
          .u1ProofCard { padding: 20px 16px; }
          .u1RevolveRing { width: 180px; height: 180px; }
          .u1RevolveItem { width: 180px; height: 180px;
            transform: rotateY(calc(var(--ri) * 40deg)) translateZ(340px);
          }
        }

        @media (max-width: 740px) {
          .u1Hero { padding: 48px 0 40px 0; }
          .u1HeroTitle { font-size: 34px; }
          .u1HeroTagline { font-size: 17px; }
          .u1SectionHeadline { font-size: 28px; }
          .u1AboutHeadline { font-size: 28px; }
          .u1AboutFeatures {
            flex-direction: column;
            gap: 16px;
            padding: 22px 24px;
            align-items: flex-start;
          }
          .u1AboutFeatureDivider {
            width: 100%;
            height: 1px;
          }
          .u1SupplyNum { font-size: 22px; }
          .u1QLGrid {
            flex-direction: column;
            gap: 24px;
          }
          .u1QLDivider {
            width: 100%;
            height: 1px;
          }
          .u1QLCol {
            gap: 8px;
          }
          .u1RevolveRing { width: 160px; height: 160px; }
          .u1RevolveItem { width: 160px; height: 160px;
            transform: rotateY(calc(var(--ri) * 40deg)) translateZ(280px);
          }
          .u1TeamGrid { grid-template-columns: 1fr; }
          .u1TokenMeta { flex-direction: column; align-items: flex-start; gap: 4px; }
          .u1TokenMetaSep { display: none; }
          .u1Timeline {
            flex-direction: column;
            gap: 0;
            padding: 0 0 0 20px;
          }
          .u1TimelineLine {
            top: 0;
            bottom: 0;
            left: 27px;
            right: auto;
            width: 2px;
            height: auto;
          }
          .u1Milestone {
            flex-direction: row;
            align-items: flex-start;
            text-align: left;
            gap: 14px;
            padding: 12px 0;
          }
          .u1MilestoneDesc { max-width: none; }
          .u1CTAHeadline { font-size: 15px; }
          .u1CTAButtons { flex-direction: column; align-items: center; }
        }

        @media (max-width: 600px) {
          .u1HeroPlaceholder { max-width: 200px; }
          .u1BreakdownItem { flex-wrap: wrap; }
          .u1BreakdownLine { display: none; }
          .u1BreakdownVal { margin-left: auto; }
          .u1RevolveViewport { padding: 40px 10px 40px 10px; }
          .u1RevolveRing { width: 130px; height: 130px; }
          .u1RevolveItem { width: 130px; height: 130px;
            transform: rotateY(calc(var(--ri) * 40deg)) translateZ(220px);
          }
          .u1RevolveDots { gap: 6px; }
          .u1RevolveDot { width: 6px; height: 6px; }
        }
      `}</style>
    </>
  );
}

"use client";

import React from "react";
import { IconCopy } from "@/components/icons";
import TOKENOMICS from "@/data/tokenomics.json";
import { useI18n } from "@/lib/i18n/context";

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
    name: "Exs",
    handle: "@exsulatus",
    handleUrl: "https://x.com/exsulatus",
    desc: "Focused on development, transparency infrastructure, and ongoing creative direction.",
    descKey: "usd1.team_exs",
    accent: "var(--accentMint)",
    tint: "var(--tintMint)",
    pfp: "/images/pfp.exs.jpeg",
  },
  {
    initials: "LD",
    name: "Genie",
    handle: "@GreenGenieGuild",
    handleUrl: "https://x.com/GreenGenieGuild",
    desc: "Supports creative output and community perspective with prior experience in crypto project environments.",
    descKey: "usd1.team_genie",
    accent: "var(--accentLavender)",
    tint: "var(--tintLavender)",
    pfp: "/images/pfp.genie.jpeg",
  },
  {
    initials: "CM",
    name: "Duck",
    handle: "@duck_king74",
    handleUrl: "https://x.com/duck_king74",
    desc: "Helps with communications, social infrastructure, and outreach related to listings and verification.",
    descKey: "usd1.team_duck",
    accent: "var(--accentCoral)",
    tint: "var(--tintCoral)",
    pfp: "/images/pfp.duck.jpeg",
  },
  {
    initials: "CD",
    name: "Bubba",
    handle: "@0x_bubba",
    handleUrl: "https://x.com/0x_bubba",
    desc: "Contributes on-chain research, liquidity discussions, and broader ecosystem connections.",
    descKey: "usd1.team_bubba",
    accent: "var(--accentMint)",
    tint: "var(--tintMint)",
    pfp: "/images/pfp.bubba.jpeg",
  },
];

const MEMES = [
  { id: 1, accent: "var(--accentMint)", glow: "rgba(33,181,143,0.22)", glowFocus: "rgba(33,181,143,0.50)", label: "Legendary", src: "/images/memes/usd1.legendary.jpg" },
  { id: 2, accent: "var(--accentLavender)", glow: "rgba(123,108,255,0.22)", glowFocus: "rgba(123,108,255,0.50)", label: "Architect", src: "/images/memes/usd1.architect.jpg" },
  { id: 3, accent: "var(--accentCoral)", glow: "rgba(255,122,107,0.22)", glowFocus: "rgba(255,122,107,0.50)", label: "Executive Orders", src: "/images/memes/usd1.executiveorders.jpg" },
  { id: 4, accent: "var(--accentMint)", glow: "rgba(33,181,143,0.22)", glowFocus: "rgba(33,181,143,0.50)", label: "USD1 Tower", src: "/images/memes/usd1.usd1tower.jpg" },
  { id: 5, accent: "var(--accentLavender)", glow: "rgba(123,108,255,0.22)", glowFocus: "rgba(123,108,255,0.50)", label: "Phoenix", src: "/images/memes/usd1.phoenix.jpg" },
  { id: 6, accent: "var(--accentCoral)", glow: "rgba(255,122,107,0.22)", glowFocus: "rgba(255,122,107,0.50)", label: "Rocky Shhh", src: "/images/memes/usd1.rockyshhh.jpg" },
  { id: 7, accent: "var(--accentMint)", glow: "rgba(33,181,143,0.22)", glowFocus: "rgba(33,181,143,0.50)", label: "Ricky Bobby", src: "/images/memes/usd1.rickybobby.jpg" },
  { id: 8, accent: "var(--accentLavender)", glow: "rgba(123,108,255,0.22)", glowFocus: "rgba(123,108,255,0.50)", label: "Top Gun", src: "/images/memes/usd1.topgun.thumbsup.jpg" },
  { id: 9, accent: "var(--accentCoral)", glow: "rgba(255,122,107,0.22)", glowFocus: "rgba(255,122,107,0.50)", label: "Spiderman Bonk", src: "/images/memes/usd1.spidermanbonk.jpg" },
];
const MEME_COUNT = MEMES.length;
const MEME_ANGLE = 360 / MEME_COUNT; // 40deg per item

/* ─── Page ─── */

export default function Usd1Page() {
  const { t } = useI18n();
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

  /* Controlled-supply percentage (auto-calculated from tokenomics.json) */
  const controlledPct = ((TOKENOMICS.controlledSupplyRaw / TOKENOMICS.totalSupplyRaw) * 100).toFixed(1);

  return (
    <>
      {/* ─── Splash (pixelated burst — edges → center) ─── */}
      <div id="u1-splash" aria-hidden="true" style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {Array.from({ length: 70 }, (_, i) => {
          const c = i % 10;
          const r = Math.floor(i / 10);
          const dx = (c - 4.5) / 4.5;
          const dy = (r - 3) / 3;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const delay = Math.round(1000 + (1 - dist / Math.SQRT2) * 1000);
          return (
            <div
              key={i}
              className="u1SplashCell"
              style={{
                left: `${c * 10}vw`,
                top: `${r * 14.2857}vh`,
                animationDelay: `${delay}ms`,
              } as React.CSSProperties}
            />
          );
        })}
        <span className="u1SplashText">{t("usd1.splash")}</span>
      </div>

      {/* ─── Hero ─── */}
      <section className="u1Hero">
        <div className="u1HeroBg" aria-hidden="true" />
        <div className="container u1HeroContainer">
          <div className="u1HeroContent">
            <p className="u1HeroEyebrow">{t("usd1.hero_eyebrow")}</p>
            <h1 className="u1HeroTitle">
              UnicornSheepDog1{" "}
              <span className="u1HeroTicker">(USD1)</span>
            </h1>
            <p className="u1HeroTagline">
              {t("usd1.hero_tagline")}
            </p>

            <div className="u1HeroActions">
              <a
                href={LINKS.jupiter}
                target="_blank"
                rel="noreferrer"
                className="btn u1BuyBtn"
              >
                {t("usd1.buy_on_jupiter" as any)}
                <span className="u1BuyArrow" aria-hidden="true">&#8599;</span>
              </a>
              <button
                type="button"
                className={`btn u1CopyBtn ${copied ? "isCopied" : ""}`}
                onClick={copyMint}
                aria-label="Copy mint address to clipboard"
              >
                <IconCopy size={16} />
                {copied ? t("usd1.copied") : t("usd1.copy_mint")}
              </button>
            </div>

            <div className="u1MintRow">
              <code className="u1Mint">{MINT}</code>
              <span className="u1MintNote">
                {t("usd1.mint_note")}
              </span>
            </div>
          </div>

          <div className="u1HeroVisual">
            <img
              src="/images/memes/usd1.hero.png"
              alt="UnicornSheepDog1"
              className="u1HeroImg"
              draggable={false}
            />
          </div>
        </div>
      </section>

      {/* ─── Quick links ─── */}
      <div className="u1QuickLinks">
        <div className="container u1QLGrid">
          <div className="u1QLCol">
            <span className="u1QLLabel u1QLMint">{t("usd1.quick_trade")}</span>
            <div className="u1QLLinks">
              <a href={LINKS.jupiter} target="_blank" rel="noreferrer" className="u1QLLink u1QLLinkMint u1QLPrimary">Jupiter &#8599;</a>
              <a href={LINKS.dexscreener} target="_blank" rel="noreferrer" className="u1QLLink u1QLLinkMint">DexScreener</a>
            </div>
          </div>
          <div className="u1QLDivider" />
          <div className="u1QLCol">
            <span className="u1QLLabel u1QLLav">{t("usd1.quick_verify")}</span>
            <div className="u1QLLinks">
              <a href={LINKS.solscan} target="_blank" rel="noreferrer" className="u1QLLink u1QLLinkLav">Solscan</a>
              <a href={LINKS.streamflow} target="_blank" rel="noreferrer" className="u1QLLink u1QLLinkLav">Streamflow</a>
            </div>
          </div>
          <div className="u1QLDivider" />
          <div className="u1QLCol">
            <span className="u1QLLabel u1QLCoral">{t("usd1.quick_community")}</span>
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
          <p className="u1AboutEyebrow">{t("usd1.about_eyebrow")}</p>
          <h2 className="u1AboutHeadline">
            {t("usd1.about_headline_1")}<br />
            {t("usd1.about_headline_2")}
          </h2>
          <p className="u1AboutSub">
            {t("usd1.about_desc")}
          </p>

          <div className="u1AboutFeatures">
            <div className="u1AboutFeature">
              <div className="u1FeatureDot u1FeatureDotMint" />
              <div className="u1FeatureText">
                <span className="u1FeatureLabel">{t("usd1.feat_locks")}</span>
                <span className="u1FeatureDesc">{t("usd1.feat_locks_desc")}</span>
              </div>
            </div>
            <div className="u1AboutFeatureDivider" />
            <div className="u1AboutFeature">
              <div className="u1FeatureDot u1FeatureDotLav" />
              <div className="u1FeatureText">
                <span className="u1FeatureLabel">{t("usd1.feat_reserves")}</span>
                <span className="u1FeatureDesc">{t("usd1.feat_reserves_desc")}</span>
              </div>
            </div>
            <div className="u1AboutFeatureDivider" />
            <div className="u1AboutFeature">
              <div className="u1FeatureDot u1FeatureDotCoral" />
              <div className="u1FeatureText">
                <span className="u1FeatureLabel">{t("usd1.feat_traceable")}</span>
                <span className="u1FeatureDesc">{t("usd1.feat_traceable_desc")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tokenomics ─── */}
      <section id="usd1-tokenomics" className="section u1Section">
        <div className="container">
          <p className="u1SectionEyebrow">{t("usd1.tok_eyebrow")}</p>
          <h2 className="u1SectionHeadline">{t("usd1.tok_headline")}</h2>

          {/* Token identity - compact inline strip */}
          <div className="u1TokenMeta">
            <span className="u1TokenMetaItem">
              <span className="u1TokenMetaKey">{t("usd1.label_name")}</span> UnicornSheepDog1
            </span>
            <span className="u1TokenMetaSep" aria-hidden="true">/</span>
            <span className="u1TokenMetaItem">
              <span className="u1TokenMetaKey">{t("usd1.label_ticker")}</span> USD1
            </span>
            <span className="u1TokenMetaSep" aria-hidden="true">/</span>
            <span className="u1TokenMetaItem">
              <span className="u1TokenMetaKey">{t("usd1.label_chain")}</span> Solana
            </span>
          </div>

          {/* Mint address */}
          <div className="u1TokenMintRow">
            <span className="u1TokenMetaKey">{t("usd1.label_mint")}</span>
            <code className="u1TokenMintAddr">{MINT}</code>
          </div>

          {/* Hero supply numbers */}
          <div className="u1SupplyRow">
            <div className="u1SupplyItem">
              <span className="u1SupplyNum">{TOKENOMICS.totalSupply}</span>
              <span className="u1SupplyLabel">{t("usd1.label_total_supply")}</span>
            </div>
            <div className="u1SupplyDivider" />
            <div className="u1SupplyItem">
              <span className="u1SupplyNum">{TOKENOMICS.circulatingSupply}</span>
              <span className="u1SupplyLabel">{t("usd1.label_circulating")}</span>
            </div>
            <div className="u1SupplyDivider" />
            <div className="u1SupplyItem u1SupplyItemHighlight">
              <span className="u1SupplyNum">
                {TOKENOMICS.controlledSupply}
                <span className="u1SupplyPct"> ({controlledPct}%)</span>
              </span>
              <span className="u1SupplyLabel">{t("usd1.label_controlled")}</span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="u1BreakdownSection">
            <h3 className="u1SmallHeading">{t("usd1.label_breakdown")}</h3>
            <div className="u1BreakdownList">
              <div className="u1BreakdownItem">
                <span className="u1BreakdownDot" style={{ background: "var(--accentMint)" }} />
                <span className="u1BreakdownKey">{t("usd1.label_community_locks")}</span>
                <span className="u1BreakdownLine" />
                <span className="u1BreakdownVal">
                  {TOKENOMICS.breakdown.communityLocks} <span className="u1BreakdownPct" style={{ color: "var(--accentMint)" }}>({TOKENOMICS.breakdown.communityLocksPct})</span>
                </span>
              </div>
              <div className="u1BreakdownItem">
                <span className="u1BreakdownDot" style={{ background: "var(--accentLavender)" }} />
                <span className="u1BreakdownKey">{t("usd1.label_team_locks")}</span>
                <span className="u1BreakdownLine" />
                <span className="u1BreakdownVal">
                  {TOKENOMICS.breakdown.teamLocks} <span className="u1BreakdownPct" style={{ color: "var(--accentLavender)" }}>({TOKENOMICS.breakdown.teamLocksPct})</span>
                </span>
              </div>
              <div className="u1BreakdownItem">
                <span className="u1BreakdownDot" style={{ background: "var(--accentCoral)" }} />
                <span className="u1BreakdownKey">{t("usd1.label_bonkfun_reserve")}</span>
                <span className="u1BreakdownLine" />
                <span className="u1BreakdownVal">
                  {TOKENOMICS.breakdown.bonkfunReserve} <span className="u1BreakdownPct" style={{ color: "var(--accentCoral)" }}>({TOKENOMICS.breakdown.bonkfunReservePct})</span>
                </span>
              </div>
            </div>
          </div>

          {/* Buybacks + Verification strip */}
          <div className="u1ProofStrip">
            <div className="u1ProofCard">
              <span className="u1ProofLabel">{t("usd1.label_buyback_events")}</span>
              <span className="u1ProofValue">{TOKENOMICS.buybacks.events}</span>
            </div>
            <div className="u1ProofDivider" />
            <div className="u1ProofCard">
              <span className="u1ProofLabel">{t("usd1.label_usd1_removed")}</span>
              <span className="u1ProofValue">{TOKENOMICS.buybacks.usd1Removed}</span>
            </div>
            <div className="u1ProofDivider" />
            <div className="u1ProofCard u1ProofCardAction">
              <span className="u1ProofLabel">{t("usd1.label_team_multisig")}</span>
              <a
                href="https://app.squads.so/squads/CGAys8fAeWfYGCRBZ4opFoCcdHmLyWvc3TikC2DbLXUK/home"
                target="_blank"
                rel="noreferrer"
                className="u1ProofBtn"
              >
                {t("usd1.view_on_squads")}
                <span className="u1ProofArrow" aria-hidden="true">&#8599;</span>
              </a>
            </div>
          </div>

          {/* Lock CTA */}
          <div className="u1LockCTASection">
            <div className="u1LockCTAContainer">
              <div className="u1LockCTAAccent" aria-hidden="true" />
              <div className="u1LockCTAContent">
                <div className="u1LockCTAText">
                  <h3 className="u1LockCTAHeadline">{t("usd1.lock_cta_headline")}</h3>
                  <p className="u1LockCTABody">
                    {t("usd1.lock_cta_body")}
                  </p>
                </div>
                <div className="u1LockCTAAction">
                  <a
                    href="https://app.streamflow.finance/token-lock"
                    target="_blank"
                    rel="noreferrer"
                    className="u1LockCTABtn"
                  >
                    {t("usd1.lock_cta_btn")}
                    <span className="u1LockCTAArrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
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
        {/* Floating ice-cube circles */}
        <div className="u1MemeShapes" aria-hidden="true">
          <div className="u1MemeShape u1MemeShape1" />
          <div className="u1MemeShape u1MemeShape2" />
          <div className="u1MemeShape u1MemeShape3" />
          <div className="u1MemeShape u1MemeShape4" />
          <div className="u1MemeShape u1MemeShape5" />
          <div className="u1MemeShape u1MemeShape6" />
        </div>
        <div className="container">
          <p className="u1SectionEyebrow">{t("usd1.memes_eyebrow")}</p>
          <h2 className="u1SectionHeadline">{t("usd1.memes_headline")}</h2>

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
                      <img
                        src={m.src}
                        alt={m.label}
                        className="u1MemeImg"
                        loading={i < 3 ? "eager" : "lazy"}
                        draggable={false}
                      />
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
              aria-label={t("usd1.memes_prev")}
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
                  aria-label={t("usd1.memes_goto") + " " + m.label}
                  style={{ "--dot-accent": m.accent } as React.CSSProperties}
                />
              ))}
            </span>
            <button
              type="button"
              className="u1RevolveBtn"
              onClick={() => setMemeRotation((p) => p + 1)}
              aria-label={t("usd1.memes_next")}
            >
              &#8250;
            </button>
          </div>

          <a
            href="https://t.me/USD1_Memes"
            target="_blank"
            rel="noreferrer"
            className="u1GalleryLink"
            style={{ color: MEMES[activeIndex].accent } as React.CSSProperties}
            aria-label="View full meme gallery on Telegram (opens in new tab)"
          >
            {t("usd1.memes_gallery")} &#8599;
          </a>
        </div>
      </section>

      {/* ─── Roadmap + Community CTA ─── */}
      <section id="usd1-roadmap" className="section u1Section" style={{ paddingBottom: 40 }}>
        <div className="container">
          <p className="u1SectionEyebrow">{t("usd1.road_eyebrow")}</p>
          <h2 className="u1SectionHeadline">{t("usd1.road_headline")}</h2>

          <div className="u1Timeline">
            <div className="u1TimelineLine" aria-hidden="true" />

            <div className="u1Milestone u1MilestoneDone">
              <span className="u1MilestoneDot" style={{ background: "var(--accentMint)" }} />
              <span className="u1MilestoneTitle">{t("usd1.road_launch")}</span>
              <span className="u1MilestoneDesc">{t("usd1.road_launch_desc")}</span>
            </div>

            <div className="u1Milestone u1MilestoneDone">
              <span className="u1MilestoneDot" style={{ background: "var(--accentLavender)" }} />
              <span className="u1MilestoneTitle">{t("usd1.road_multisig")}</span>
              <span className="u1MilestoneDesc">{t("usd1.road_multisig_desc")}</span>
            </div>

            <div className="u1Milestone u1MilestoneOngoing">
              <span className="u1MilestoneDot u1MilestoneDotLoading">
                <svg className="u1LoadRing" viewBox="0 0 20 20">
                  <circle className="u1LoadRingWash" cx="10" cy="10" r="8" style={{ stroke: "var(--accentCoral)" }} />
                  <circle className="u1LoadRingDash" cx="10" cy="10" r="8" style={{ stroke: "var(--accentCoral)" }} />
                  <circle className="u1LoadRingArc" cx="10" cy="10" r="8" style={{ stroke: "var(--accentCoral)" }} />
                </svg>
              </span>
              <span className="u1MilestoneTitle">{t("usd1.road_locks")}</span>
              <span className="u1MilestoneDesc">{t("usd1.road_locks_desc")}</span>
            </div>

            <div className="u1Milestone u1MilestoneOngoing">
              <span className="u1MilestoneDot u1MilestoneDotLoading">
                <svg className="u1LoadRing" viewBox="0 0 20 20">
                  <circle className="u1LoadRingWash" cx="10" cy="10" r="8" style={{ stroke: "var(--accentMint)" }} />
                  <circle className="u1LoadRingDash" cx="10" cy="10" r="8" style={{ stroke: "var(--accentMint)" }} />
                  <circle className="u1LoadRingArc" cx="10" cy="10" r="8" style={{ stroke: "var(--accentMint)" }} />
                </svg>
              </span>
              <span className="u1MilestoneTitle">{t("usd1.road_buybacks")}</span>
              <span className="u1MilestoneDesc">{t("usd1.road_buybacks_desc")}</span>
            </div>

            <div className="u1Milestone u1MilestoneUpcoming">
              <span className="u1MilestoneDot u1MilestoneDotOutline" style={{ borderColor: "var(--accentLavender)", color: "var(--accentLavender)" }} />
              <span className="u1MilestoneTitle">{t("usd1.road_ecosystem")}</span>
              <span className="u1MilestoneDesc">{t("usd1.road_ecosystem_desc")}</span>
            </div>
          </div>

          <p className="u1TimelineDisclaimer">
            {t("usd1.road_disclaimer")}
          </p>

          {/* Trade CTA */}
          <div className="u1CTA">
            <h3 className="u1CTAHeadline">{t("usd1.road_cta_headline" as any)}</h3>
            <p className="u1CTASub">
              {t("usd1.road_cta_sub" as any)}
            </p>
            <div className="u1CTAButtons">
              <a
                href={LINKS.jupiter}
                target="_blank"
                rel="noreferrer"
                className="u1CTABtn u1CTABtnMintFilled"
              >
                {t("usd1.road_cta_buy" as any)}
                <span className="u1CTAArrow" aria-hidden="true">&#8599;</span>
              </a>
              <a
                href={LINKS.dexscreener}
                target="_blank"
                rel="noreferrer"
                className="u1CTABtn u1CTABtnMint"
              >
                {t("usd1.road_cta_chart" as any)}
                <span className="u1CTAArrow" aria-hidden="true">&#8599;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <section id="usd1-team" className="section u1Section u1TeamSection">
        {/* Floating ice-cube hexagons */}
        <div className="u1TeamShapes" aria-hidden="true">
          {[1,2,3,4,5,6].map((n) => (
            <svg key={n} className={`u1TeamShape u1TeamShape${n}`} viewBox="0 0 100 115.47" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon className="u1HexPoly" points="50,2 97,28.87 97,86.6 50,113.47 3,86.6 3,28.87" />
            </svg>
          ))}
        </div>
        <div className="container">
          <p className="u1SectionEyebrow">{t("usd1.team_eyebrow")}</p>
          <h2 className="u1SectionHeadline">{t("usd1.team_headline")}</h2>

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
                  <img src={member.pfp} alt={member.name} className="u1AvatarImg" draggable={false} />
                </div>
                <div className="u1TeamInfo">
                  <span className="u1TeamName">{member.name}</span>
                  {member.handle && (
                    <a href={member.handleUrl} target="_blank" rel="noreferrer" className="u1TeamTitle">
                      {member.handle.split("").map((ch, j) =>
                        ch === "0" ? <span key={j} className="u1Zero">{ch}</span> : ch
                      )}
                    </a>
                  )}
                  <p className="u1TeamDesc">{t(member.descKey as any)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing community CTA */}
          <div className="u1TeamCTA">
            <h3 className="u1TeamCTAHeadline">{t("usd1.team_cta_headline" as any)}</h3>
            <p className="u1TeamCTASub">{t("usd1.team_cta_sub" as any)}</p>
            <div className="u1TeamCTAButtons">
              <a
                href={LINKS.x}
                target="_blank"
                rel="noreferrer"
                className="u1CTABtn u1CTABtnMint"
              >
                {t("usd1.follow_x")}
                <span className="u1CTAArrow" aria-hidden="true">&#8599;</span>
              </a>
              <a
                href={LINKS.telegram}
                target="_blank"
                rel="noreferrer"
                className="u1CTABtn u1CTABtnLav"
              >
                {t("usd1.join_telegram")}
                <span className="u1CTAArrow" aria-hidden="true">&#8599;</span>
              </a>
            </div>
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
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }
        .u1BuyBtn {
          font-size: 14px;
          font-weight: 700;
          gap: 8px;
          background: var(--accentMint);
          color: #fff;
          border: 1.5px solid var(--accentMint);
          text-decoration: none;
          padding: 10px 22px;
          border-radius: var(--radius-sm);
          display: inline-flex;
          align-items: center;
          transition: background 160ms ease, box-shadow 160ms ease;
        }
        .u1BuyBtn:hover {
          background: #1ca37f;
          box-shadow: 0 2px 12px rgba(33, 181, 143, 0.25);
        }
        .u1BuyArrow {
          font-size: 15px;
          margin-left: 2px;
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

        /* Hero visual */
        .u1HeroVisual {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .u1HeroImg {
          width: 100%;
          max-width: 380px;
          border-radius: var(--radius-xl);
          object-fit: cover;
          display: block;
          box-shadow: 0 8px 32px rgba(17, 24, 39, 0.18);
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
        .u1QLPrimary {
          background: var(--accentMint);
          color: #fff;
          border-color: var(--accentMint);
          font-weight: 700;
        }
        .u1QLPrimary:hover {
          background: #1ca37f;
          border-color: #1ca37f;
          color: #fff;
          box-shadow: 0 2px 10px rgba(33,181,143,0.25);
        }
        :global(html.dark) .u1QLPrimary {
          background: var(--accentMint);
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

        /* Lock CTA */
        .u1LockCTASection {
          margin-top: 48px;
          padding: 0;
        }
        .u1LockCTAContainer {
          position: relative;
          padding: 36px 32px;
          border-radius: var(--radius-xl);
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: var(--shadowXs);
          transition: border-color 200ms ease, box-shadow 200ms ease;
        }
        :global(html.dark) .u1LockCTAContainer {
          background: var(--surface-2);
          border-color: var(--border);
        }
        .u1LockCTAContainer:hover {
          border-color: var(--borderStrong);
          box-shadow: var(--shadowSm);
        }
        :global(html.dark) .u1LockCTAContainer:hover {
          border-color: var(--borderStrong);
          box-shadow: var(--shadowSm);
        }
        .u1LockCTAAccent {
          position: absolute;
          top: 36px;
          left: 32px;
          width: 3px;
          height: 22px;
          border-radius: 2px;
          background: linear-gradient(
            180deg,
            var(--accentMint) 0%,
            rgba(33, 181, 143, 0.5) 100%
          );
        }
        .u1LockCTAContent {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 32px 44px;
          align-items: center;
          padding-left: 20px;
        }
        .u1LockCTAText {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .u1LockCTAHeadline {
          margin: 0;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text);
          line-height: 1.2;
        }
        .u1LockCTABody {
          margin: 0;
          font-size: 15px;
          color: var(--muted);
          line-height: 1.6;
          max-width: 52ch;
          letter-spacing: -0.01em;
        }
        .u1LockCTAAction {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .u1LockCTABtn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--accentMint);
          text-decoration: none;
          padding: 14px 34px 14px 30px;
          border-radius: 999px;
          border: 1.5px solid rgba(33, 181, 143, 0.22);
          background: rgba(33, 181, 143, 0.05);
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
        }
        .u1LockCTABtn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(33, 181, 143, 0.1) 0%,
            rgba(33, 181, 143, 0.05) 100%
          );
          opacity: 0;
          transition: opacity 200ms ease;
        }
        .u1LockCTABtn:hover {
          border-color: rgba(33, 181, 143, 0.35);
          background: rgba(33, 181, 143, 0.10);
          transform: translateY(-1.5px);
          box-shadow: 0 4px 16px rgba(33, 181, 143, 0.15);
        }
        .u1LockCTABtn:hover::before {
          opacity: 1;
        }
        .u1LockCTABtn:hover .u1LockCTAArrow {
          transform: translateX(2px);
        }
        .u1LockCTABtn:active {
          transform: translateY(-0.5px);
        }
        .u1LockCTABtn:focus-visible {
          outline: none;
          box-shadow: var(--focus);
        }
        .u1LockCTAArrow {
          display: inline-block;
          transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 18px;
          line-height: 1;
        }

        /* ────────────────────────────────────────────
           MEMES — 3D Revolving Carousel
        ──────────────────────────────────────────── */
        .u1MemesSection {
          background: rgba(33, 181, 143, 0.07) !important;
          overflow: hidden;
          position: relative;
        }
        :global(html.dark) .u1MemesSection {
          background: rgba(33, 181, 143, 0.10) !important;
        }

        /* Floating circles — ice-cube effect */
        .u1MemeShapes {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .u1MemeShape {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(33, 181, 143, 0.12);
          background: rgba(33, 181, 143, 0.04);
        }
        :global(html.dark) .u1MemeShape {
          border-color: rgba(33, 181, 143, 0.16);
          background: rgba(33, 181, 143, 0.05);
        }
        .u1MemeShape1 { width: 100px; height: 100px; top: 12%; left: 6%;
          animation: memeShapeFloat1 20s ease-in-out infinite; }
        .u1MemeShape2 { width: 72px; height: 72px; top: 65%; left: 78%;
          animation: memeShapeFloat2 24s ease-in-out infinite; }
        .u1MemeShape3 { width: 88px; height: 88px; top: 28%; left: 62%;
          animation: memeShapeFloat3 22s ease-in-out infinite; }
        .u1MemeShape4 { width: 56px; height: 56px; top: 78%; left: 12%;
          animation: memeShapeFloat4 26s ease-in-out infinite; }
        .u1MemeShape5 { width: 116px; height: 116px; top: -4%; left: 82%;
          animation: memeShapeFloat5 18s ease-in-out infinite; }
        .u1MemeShape6 { width: 48px; height: 48px; top: 48%; left: 32%;
          animation: memeShapeFloat6 28s ease-in-out infinite; }
        @keyframes memeShapeFloat1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          25% { transform: translate(24px,-18px) scale(1.05); }
          50% { transform: translate(12px,20px) scale(0.98); }
          75% { transform: translate(-18px,8px) scale(1.02); }
        }
        @keyframes memeShapeFloat2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          25% { transform: translate(-22px,12px) scale(0.97); }
          50% { transform: translate(-8px,-24px) scale(1.04); }
          75% { transform: translate(18px,-8px) scale(1); }
        }
        @keyframes memeShapeFloat3 {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(-18px,-20px) scale(1.03); }
          66% { transform: translate(22px,12px) scale(0.99); }
        }
        @keyframes memeShapeFloat4 {
          0%, 100% { transform: translate(0,0) scale(1); }
          25% { transform: translate(14px,-10px) scale(1.01); }
          50% { transform: translate(-12px,-22px) scale(0.96); }
          75% { transform: translate(-20px,6px) scale(1.04); }
        }
        @keyframes memeShapeFloat5 {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(-16px,18px) scale(0.98); }
          66% { transform: translate(10px,-12px) scale(1.02); }
        }
        @keyframes memeShapeFloat6 {
          0%, 100% { transform: translate(0,0) scale(1); }
          25% { transform: translate(20px,14px) scale(1.06); }
          50% { transform: translate(-10px,24px) scale(0.95); }
          75% { transform: translate(-18px,-8px) scale(1.01); }
        }

        .u1MemesSection .container {
          position: relative;
          z-index: 1;
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
          overflow: hidden;
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
        .u1MemeImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
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

        /* Gallery link */
        .u1GalleryLink {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          margin-top: 18px;
          width: 100%;
          text-align: center;
          font-size: 13px;
          font-weight: 650;
          text-decoration: none;
          transition: color 0.8s ease, opacity 140ms ease;
        }
        .u1GalleryLink:hover {
          opacity: 0.75;
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
        .u1CTABtnMintFilled {
          color: #fff;
          border-color: var(--accentMint);
          background: var(--accentMint);
        }
        .u1CTABtnMintFilled:hover {
          background: #1ca37f;
          border-color: #1ca37f;
          box-shadow: 0 2px 12px rgba(33,181,143,0.25);
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
          position: relative;
          overflow: hidden;
        }
        :global(html.dark) .u1TeamSection {
          background: rgba(255, 122, 107, 0.10) !important;
        }

        /* Floating hexagons — ice-cube effect */
        .u1TeamShapes {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .u1TeamShape {
          position: absolute;
          overflow: visible;
        }
        .u1TeamShape :global(.u1HexPoly) {
          fill: rgba(255, 122, 107, 0.04);
          stroke: rgba(255, 122, 107, 0.12);
          stroke-width: 2;
        }
        :global(html.dark) .u1TeamShape :global(.u1HexPoly) {
          fill: rgba(255, 122, 107, 0.05);
          stroke: rgba(255, 122, 107, 0.16);
        }
        .u1TeamShape1 { width: 86px; height: 100px; top: 6%; left: 8%;
          animation: teamShapeFloat1 19s ease-in-out infinite; }
        .u1TeamShape2 { width: 60px; height: 68px; top: 58%; left: 76%;
          animation: teamShapeFloat2 23s ease-in-out infinite; }
        .u1TeamShape3 { width: 72px; height: 84px; top: 24%; left: 56%;
          animation: teamShapeFloat3 21s ease-in-out infinite; }
        .u1TeamShape4 { width: 44px; height: 52px; top: 70%; left: 18%;
          animation: teamShapeFloat4 25s ease-in-out infinite; }
        .u1TeamShape5 { width: 94px; height: 108px; top: -6%; left: 86%;
          animation: teamShapeFloat5 17s ease-in-out infinite; }
        .u1TeamShape6 { width: 38px; height: 44px; top: 42%; left: 38%;
          animation: teamShapeFloat6 27s ease-in-out infinite; }
        @keyframes teamShapeFloat1 {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          25% { transform: translate(26px,-16px) rotate(8deg); }
          50% { transform: translate(12px,22px) rotate(-5deg); }
          75% { transform: translate(-18px,8px) rotate(4deg); }
        }
        @keyframes teamShapeFloat2 {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          25% { transform: translate(-22px,14px) rotate(-7deg); }
          50% { transform: translate(-8px,-26px) rotate(6deg); }
          75% { transform: translate(18px,-10px) rotate(-3deg); }
        }
        @keyframes teamShapeFloat3 {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          33% { transform: translate(-16px,-22px) rotate(5deg); }
          66% { transform: translate(24px,14px) rotate(-8deg); }
        }
        @keyframes teamShapeFloat4 {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          25% { transform: translate(16px,-10px) rotate(-6deg); }
          50% { transform: translate(-14px,-24px) rotate(4deg); }
          75% { transform: translate(-22px,6px) rotate(-2deg); }
        }
        @keyframes teamShapeFloat5 {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          33% { transform: translate(-14px,20px) rotate(7deg); }
          66% { transform: translate(10px,-14px) rotate(-4deg); }
        }
        @keyframes teamShapeFloat6 {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          25% { transform: translate(18px,16px) rotate(5deg); }
          50% { transform: translate(-8px,26px) rotate(-6deg); }
          75% { transform: translate(-16px,-8px) rotate(3deg); }
        }

        .u1TeamSection .container {
          position: relative;
          z-index: 1;
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
          border: 2.5px solid var(--team-accent);
          overflow: hidden;
          flex: 0 0 auto;
          background: var(--team-tint);
        }
        .u1AvatarImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 50%;
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
          text-decoration: none;
        }
        .u1Zero {
          position: relative;
        }
        .u1Zero::after {
          content: "";
          position: absolute;
          top: 18%;
          bottom: 18%;
          left: 50%;
          width: 1.2px;
          background: currentColor;
          transform: translateX(-50%) rotate(24deg);
          pointer-events: none;
        }
        .u1TeamDesc {
          margin: 4px 0 0 0;
          font-size: 13.5px;
          color: var(--muted);
          line-height: 1.45;
        }

        /* Team closing CTA */
        .u1TeamCTA {
          text-align: center;
          padding-top: 52px;
        }
        .u1TeamCTAHeadline {
          margin: 0 0 8px 0;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text);
        }
        .u1TeamCTASub {
          margin: 0 0 20px 0;
          font-size: 15px;
          color: var(--muted);
          line-height: 1.5;
        }
        .u1TeamCTAButtons {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* ─── Responsive ─── */
        @media (max-width: 980px) {
          .u1HeroContainer {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .u1HeroContent {
            align-items: center;
            text-align: center;
          }
          .u1HeroTitle { font-size: 40px; }
          .u1HeroActions { justify-content: center; }
          .u1MintRow { align-items: center; }
          .u1HeroVisual { order: -1; }
          .u1HeroImg { max-width: 260px; }
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
          .u1LockCTAContent {
            gap: 32px;
          }
        }

        @media (max-width: 740px) {
          .u1Hero { padding: 48px 0 40px 0; }
          .u1HeroTitle { font-size: 34px; }
          .u1HeroTagline { font-size: 17px; }
          .u1Mint {
            font-size: 10.5px;
            padding: 8px 12px;
          }
          .u1TokenMintAddr {
            font-size: 10.5px;
          }
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
            align-items: center;
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
          .u1LockCTAContainer {
            padding: 28px 24px;
          }
          .u1LockCTAAccent {
            top: 28px;
            left: 24px;
            height: 20px;
          }
          .u1LockCTAContent {
            grid-template-columns: 1fr;
            gap: 20px 0;
            padding-left: 18px;
          }
          .u1LockCTAText {
            gap: 8px;
          }
          .u1LockCTAAction {
            padding-top: 0;
          }
          .u1LockCTABtn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 600px) {
          .u1HeroImg { max-width: 200px; }
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
          .u1LockCTAContainer {
            padding: 24px 20px;
          }
          .u1LockCTAAccent {
            top: 24px;
            left: 20px;
            height: 18px;
          }
          .u1LockCTAContent {
            padding-left: 16px;
            gap: 16px 0;
          }
          .u1LockCTAHeadline {
            font-size: 18px;
          }
          .u1LockCTABody {
            font-size: 14px;
            line-height: 1.55;
          }
        }
      `}</style>
    </>
  );
}

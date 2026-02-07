"use client";

import React from "react";
import { copyToClipboard } from "@/lib/copy";

const MINT_ADDRESS = "5H1jkA7erRxwD8uqH8KimMD74ctjUYBd32rbp2jubonk";

const TOKENOMICS = {
  name: "UnicornSheepDog1",
  ticker: "USD1",
  chain: "Solana",
  mint: MINT_ADDRESS,
  totalSupply: "999,834,836.562034",
  circulatingSupply: "599,628,672.562",
  totalControlled: "400,206,164",
  breakdown: {
    communityLocks: "150,231,128",
    teamLocks: "60,152,159",
    bonkfunReserve: "181,925,054",
    bonkfunPercent: "18.2%"
  },
  buybacks: {
    events: "62",
    usd1Removed: "68,049,982"
  }
};

const LINKS = {
  dexscreener: "https://dexscreener.com/solana/32vjneqs23a7vhh6g8gcuwem14ffssj1kdzz59hz5nyk",
  jupiter: `https://jup.ag/tokens/${MINT_ADDRESS}`,
  solscan: `https://solscan.io/token/${MINT_ADDRESS}`,
  axiom: "https://axiom.trade/meme/32VjnEqs23a7vhH6G8Gcuwem14ffsSj1kdZz59HZ5NYK?chain=sol",
  padre: "https://trade.padre.gg/trade/solana/32VjnEqs23a7vhH6G8Gcuwem14ffsSj1kdZz59HZ5NYK",
  x: "https://x.com/UnicornSheepDog",
  telegram: "https://t.me/UnicornSheepDog1",
  email: "support@theunicornsheep.dog"
};

const TEAM = [
  {
    name: "Co-Founder & Strategy",
    title: "Operations Lead",
    description: "Focused on community growth and strategic planning"
  },
  {
    name: "Co-Founder & Development",
    title: "Technical Lead",
    description: "Building transparent systems and tooling"
  },
  {
    name: "Community Manager",
    title: "Community Lead",
    description: "Coordination and member engagement"
  },
  {
    name: "Content & Communications",
    title: "Content Lead",
    description: "Clear messaging and public updates"
  }
];

const MEME_PLACEHOLDERS = Array(4).fill(null);

export default function USD1Client() {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    const success = await copyToClipboard(MINT_ADDRESS);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const scrollToSection = React.useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const controlledPercent = React.useMemo(() => {
    const total = parseFloat(TOKENOMICS.totalSupply.replace(/,/g, ""));
    const controlled = parseFloat(TOKENOMICS.totalControlled.replace(/,/g, ""));
    return ((controlled / total) * 100).toFixed(1);
  }, []);

  return (
    <>
      {/* Header */}
      <header className="usd1Header">
        <div className="container usd1HeaderBar">
          <div className="usd1Logo">USD1</div>
          <nav className="usd1Nav">
            <button onClick={() => scrollToSection("about")} className="usd1NavLink">
              About
            </button>
            <button onClick={() => scrollToSection("tokenomics")} className="usd1NavLink">
              Tokenomics
            </button>
            <button onClick={() => scrollToSection("memes")} className="usd1NavLink">
              Memes
            </button>
            <button onClick={() => scrollToSection("team")} className="usd1NavLink">
              Team
            </button>
          </nav>
        </div>
      </header>

      <main className="usd1Main">
        {/* Hero */}
        <section className="usd1Hero">
          <div className="container usd1HeroInner">
            <div className="usd1HeroLeft">
              <h1 className="usd1HeroTitle">UnicornSheepDog1</h1>
              <p className="usd1HeroSubtitle">A Solana memecoin focused on transparency and community</p>
              
              <div className="usd1HeroActions">
                <button
                  onClick={handleCopy}
                  className="btn btnPrimary usd1CopyBtn"
                  aria-label="Copy mint address to clipboard"
                >
                  {copied ? "✓ Copied!" : "Copy Mint Address"}
                </button>
              </div>

              <div className="usd1MintDisplay">
                <code className="usd1MintCode">{MINT_ADDRESS}</code>
              </div>

              <p className="usd1Warning">
                ⚠️ Ticker collision exists — verify mint address before trading.
              </p>
            </div>

            <div className="usd1HeroRight">
              <div className="usd1MemePlaceholder">
                <span className="placeholderLabel">Meme Image</span>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="section usd1About">
          <div className="container">
            <h2 className="sectionTitle">About</h2>
            <div className="usd1AboutContent">
              <p className="usd1AboutText">
                USD1 is a Solana memecoin built with a strong focus on transparency. 
                The project maintains public locks and openly shares reserve holdings, 
                allowing the community to verify the state of the token supply at any time. 
                This approach helps build trust and accountability within the community.
              </p>
            </div>
          </div>
        </section>

        {/* Tokenomics */}
        <section id="tokenomics" className="section usd1Tokenomics">
          <div className="container">
            <h2 className="sectionTitle">Tokenomics</h2>
            
            <div className="usd1TokenGrid">
              <div className="card usd1StatCard">
                <div className="usd1StatLabel">Name</div>
                <div className="usd1StatValue">{TOKENOMICS.name}</div>
              </div>
              
              <div className="card usd1StatCard">
                <div className="usd1StatLabel">Ticker</div>
                <div className="usd1StatValue">{TOKENOMICS.ticker}</div>
              </div>
              
              <div className="card usd1StatCard">
                <div className="usd1StatLabel">Chain</div>
                <div className="usd1StatValue">{TOKENOMICS.chain}</div>
              </div>
              
              <div className="card usd1StatCard usd1StatCardWide">
                <div className="usd1StatLabel">Mint Address</div>
                <div className="usd1StatValue usd1StatValueMono">{TOKENOMICS.mint}</div>
              </div>
              
              <div className="card usd1StatCard">
                <div className="usd1StatLabel">Total Supply</div>
                <div className="usd1StatValue">{TOKENOMICS.totalSupply}</div>
              </div>
              
              <div className="card usd1StatCard">
                <div className="usd1StatLabel">Circulating Supply</div>
                <div className="usd1StatValue">{TOKENOMICS.circulatingSupply}</div>
              </div>
              
              <div className="card usd1StatCard">
                <div className="usd1StatLabel">Total Supply Controlled</div>
                <div className="usd1StatValue">{TOKENOMICS.totalControlled}</div>
                <div className="usd1StatNote">({controlledPercent}% of total)</div>
              </div>
            </div>

            <div className="usd1BreakdownSection">
              <h3 className="usd1BreakdownTitle">Supply Breakdown</h3>
              <div className="usd1BreakdownGrid">
                <div className="card usd1BreakdownCard">
                  <div className="usd1StatLabel">Community Locks</div>
                  <div className="usd1StatValue">{TOKENOMICS.breakdown.communityLocks}</div>
                </div>
                
                <div className="card usd1BreakdownCard">
                  <div className="usd1StatLabel">Team Locks</div>
                  <div className="usd1StatValue">{TOKENOMICS.breakdown.teamLocks}</div>
                </div>
                
                <div className="card usd1BreakdownCard">
                  <div className="usd1StatLabel">BONKfun Reserve</div>
                  <div className="usd1StatValue">{TOKENOMICS.breakdown.bonkfunReserve}</div>
                  <div className="usd1StatNote">({TOKENOMICS.breakdown.bonkfunPercent})</div>
                </div>
              </div>

              <div className="usd1ExplanationBox">
                <p className="usd1ExplanationText">
                  Community locks are time-bound and publicly verifiable. 
                  Controlled supply includes locks and reserve holdings.
                </p>
              </div>
            </div>

            <div className="usd1BuybackSection">
              <h3 className="usd1BuybackTitle">Buybacks</h3>
              <div className="usd1BuybackGrid">
                <div className="card usd1BuybackCard">
                  <div className="usd1StatLabel">Buyback Events</div>
                  <div className="usd1StatValue">{TOKENOMICS.buybacks.events}</div>
                </div>
                
                <div className="card usd1BuybackCard">
                  <div className="usd1StatLabel">USD1 Removed</div>
                  <div className="usd1StatValue">{TOKENOMICS.buybacks.usd1Removed}</div>
                </div>
              </div>
            </div>

            <div className="usd1LockLedgerBox">
              <div className="usd1LockLedgerPlaceholder">
                <span className="placeholderLabel">Lock Ledger Graphic</span>
                <span className="placeholderCaption">Visualization of lock schedule</span>
              </div>
            </div>
          </div>
        </section>

        {/* Memes */}
        <section id="memes" className="section usd1Memes">
          <div className="container">
            <h2 className="sectionTitle">Memes</h2>
            <p className="sectionLead">Community-created content and artwork</p>
            
            <div className="usd1MemeCarousel">
              {MEME_PLACEHOLDERS.map((_, i) => (
                <div key={i} className="card usd1MemeCard">
                  <div className="usd1MemeCardInner">
                    <span className="placeholderLabel">Meme #{i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="section usd1Team">
          <div className="container">
            <h2 className="sectionTitle">Team</h2>
            <p className="sectionLead">Building with transparency and accountability</p>
            
            <div className="usd1TeamGrid">
              {TEAM.map((member, i) => (
                <div key={i} className="card usd1TeamCard">
                  <div className="usd1TeamAvatar">
                    <span className="usd1TeamAvatarInitial">{member.name.charAt(0)}</span>
                  </div>
                  <div className="usd1TeamName">{member.name}</div>
                  <div className="usd1TeamTitle">{member.title}</div>
                  <p className="usd1TeamDesc">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Links Section */}
        <section className="section usd1Links">
          <div className="container">
            <h2 className="sectionTitle">Links</h2>
            
            <div className="usd1LinksGrid">
              <div className="usd1LinksGroup">
                <h3 className="usd1LinksGroupTitle">Trading</h3>
                <ul className="usd1LinksList">
                  <li>
                    <a href={LINKS.dexscreener} target="_blank" rel="noreferrer" className="usd1Link">
                      Dexscreener →
                    </a>
                  </li>
                  <li>
                    <a href={LINKS.jupiter} target="_blank" rel="noreferrer" className="usd1Link">
                      Jupiter →
                    </a>
                  </li>
                  <li>
                    <a href={LINKS.solscan} target="_blank" rel="noreferrer" className="usd1Link">
                      Solscan →
                    </a>
                  </li>
                  <li>
                    <a href={LINKS.axiom} target="_blank" rel="noreferrer" className="usd1Link">
                      Axiom →
                    </a>
                  </li>
                  <li>
                    <a href={LINKS.padre} target="_blank" rel="noreferrer" className="usd1Link">
                      Padre →
                    </a>
                  </li>
                </ul>
              </div>

              <div className="usd1LinksGroup">
                <h3 className="usd1LinksGroupTitle">Community</h3>
                <ul className="usd1LinksList">
                  <li>
                    <a href={LINKS.x} target="_blank" rel="noreferrer" className="usd1Link">
                      X (Twitter) →
                    </a>
                  </li>
                  <li>
                    <a href={LINKS.telegram} target="_blank" rel="noreferrer" className="usd1Link">
                      Telegram →
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${LINKS.email}`} className="usd1Link">
                      {LINKS.email} →
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Disclaimer */}
      <div className="usd1Disclaimer">
        <div className="container">
          <p className="usd1DisclaimerText">
            USD1 is a memecoin. Memecoins are risky. Only invest what you are willing to lose.
          </p>
        </div>
      </div>

      <style jsx>{`
        /* Header */
        .usd1Header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: var(--surface-2);
          border-bottom: 1px solid var(--border);
        }
        :global(html.dark) .usd1Header {
          background: var(--surface);
        }

        .usd1HeaderBar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          gap: 20px;
        }

        .usd1Logo {
          font-size: 20px;
          font-weight: 950;
          letter-spacing: -0.02em;
          color: var(--text);
        }

        .usd1Nav {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .usd1NavLink {
          padding: 9px 12px;
          border-radius: 999px;
          color: var(--muted);
          border: 1px solid transparent;
          background: transparent;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 120ms ease, background 120ms ease, color 120ms ease;
        }
        .usd1NavLink:hover {
          color: var(--text);
          border-color: var(--border);
          background: rgba(33, 181, 143, 0.10);
        }
        .usd1NavLink:focus-visible {
          outline: none;
          box-shadow: var(--focus);
        }

        /* Main */
        .usd1Main {
          min-height: 60vh;
        }

        /* Hero */
        .usd1Hero {
          padding: 82px 0;
        }

        .usd1HeroInner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .usd1HeroLeft {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .usd1HeroTitle {
          margin: 0;
          font-size: 48px;
          font-weight: 950;
          letter-spacing: -0.03em;
          line-height: 1.05;
        }

        .usd1HeroSubtitle {
          margin: 0;
          font-size: 20px;
          line-height: 1.5;
          color: var(--muted);
          max-width: 42ch;
        }

        .usd1HeroActions {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .usd1CopyBtn {
          font-size: 16px;
          font-weight: 700;
          padding: 12px 24px;
        }

        .usd1MintDisplay {
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          overflow: auto;
        }

        .usd1MintCode {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text);
          word-break: break-all;
        }

        .usd1Warning {
          margin: 0;
          font-size: 14px;
          color: var(--muted2);
          font-weight: 600;
        }

        .usd1HeroRight {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .usd1MemePlaceholder {
          width: 100%;
          aspect-ratio: 1;
          max-width: 420px;
          border-radius: var(--radius-xl);
          border: 1px dashed var(--borderStrong);
          background: rgba(17, 24, 39, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted2);
        }

        .placeholderLabel {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          opacity: 0.6;
        }

        .placeholderCaption {
          font-size: 12px;
          font-weight: 600;
          color: var(--muted2);
          opacity: 0.7;
        }

        /* About */
        .usd1About {
          background: var(--tintLavender) !important;
        }

        .usd1AboutContent {
          max-width: 75ch;
        }

        .usd1AboutText {
          margin: 0;
          font-size: 19px;
          line-height: 1.7;
          color: var(--muted);
        }

        /* Tokenomics */
        .usd1Tokenomics {
          background: var(--tintMint) !important;
        }

        .usd1TokenGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 14px;
          margin-top: 24px;
        }

        .usd1StatCard {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .usd1StatCardWide {
          grid-column: 1 / -1;
        }

        .usd1StatLabel {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted2);
        }

        .usd1StatValue {
          font-size: 22px;
          font-weight: 950;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: var(--text);
        }

        .usd1StatValueMono {
          font-family: var(--font-mono);
          font-size: 14px;
          word-break: break-all;
        }

        .usd1StatNote {
          font-size: 13px;
          color: var(--muted2);
          margin-top: 2px;
        }

        .usd1BreakdownSection {
          margin-top: 48px;
        }

        .usd1BreakdownTitle {
          margin: 0 0 18px 0;
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        .usd1BreakdownGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 14px;
        }

        .usd1BreakdownCard {
          padding: 18px;
        }

        .usd1ExplanationBox {
          margin-top: 24px;
          padding: 18px 20px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
        }

        .usd1ExplanationText {
          margin: 0;
          font-size: 16px;
          line-height: 1.6;
          color: var(--muted);
        }

        .usd1BuybackSection {
          margin-top: 48px;
        }

        .usd1BuybackTitle {
          margin: 0 0 18px 0;
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        .usd1BuybackGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 14px;
        }

        .usd1BuybackCard {
          padding: 18px;
        }

        .usd1LockLedgerBox {
          margin-top: 32px;
        }

        .usd1LockLedgerPlaceholder {
          width: 100%;
          min-height: 280px;
          border-radius: var(--radius-xl);
          border: 1px dashed var(--borderStrong);
          background: rgba(17, 24, 39, 0.03);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: var(--muted2);
          padding: 40px;
        }

        /* Memes */
        .usd1Memes {
          background: var(--tintCoral) !important;
        }

        .usd1MemeCarousel {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
          margin-top: 32px;
        }

        .usd1MemeCard {
          padding: 0;
          overflow: hidden;
          aspect-ratio: 1;
        }

        .usd1MemeCardInner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(17, 24, 39, 0.02);
        }

        /* Team */
        .usd1Team {
          background: var(--surface-2) !important;
        }

        .usd1TeamGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 18px;
          margin-top: 32px;
        }

        .usd1TeamCard {
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
        }

        .usd1TeamAvatar {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: var(--tintMint);
          border: 2px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadowSm);
        }

        .usd1TeamAvatarInitial {
          font-size: 36px;
          font-weight: 900;
          color: var(--text);
          opacity: 0.7;
        }

        .usd1TeamName {
          font-size: 18px;
          font-weight: 900;
          letter-spacing: -0.01em;
          color: var(--text);
        }

        .usd1TeamTitle {
          font-size: 14px;
          font-weight: 700;
          color: var(--muted);
        }

        .usd1TeamDesc {
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
          color: var(--muted2);
        }

        /* Links */
        .usd1Links {
          background: transparent !important;
        }

        .usd1LinksGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          margin-top: 32px;
        }

        .usd1LinksGroup {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .usd1LinksGroupTitle {
          margin: 0;
          font-size: 18px;
          font-weight: 900;
          letter-spacing: -0.01em;
          color: var(--text);
        }

        .usd1LinksList {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .usd1Link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 16px;
          font-weight: 600;
          color: var(--muted);
          transition: color 140ms ease, transform 140ms ease;
        }

        .usd1Link:hover {
          color: var(--text);
          transform: translateX(3px);
        }

        /* Disclaimer */
        .usd1Disclaimer {
          background: var(--footerBg);
          border-top: 1px solid var(--border);
          padding: 32px 0;
        }

        .usd1DisclaimerText {
          margin: 0;
          text-align: center;
          font-size: 14px;
          line-height: 1.6;
          color: var(--footerMuted);
        }

        /* Responsive */
        @media (max-width: 920px) {
          .usd1Nav {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .usd1HeroInner {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .usd1HeroTitle {
            font-size: 36px;
          }

          .usd1HeroSubtitle {
            font-size: 18px;
          }

          .usd1MemePlaceholder {
            max-width: 320px;
          }

          .usd1TokenGrid,
          .usd1BreakdownGrid,
          .usd1BuybackGrid {
            grid-template-columns: 1fr;
          }

          .usd1StatCardWide {
            grid-column: 1;
          }

          .usd1MemeCarousel {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          }

          .usd1TeamGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

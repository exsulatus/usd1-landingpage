import Link from "next/link";

export default function HowToBuyPage() {
  return (
    <div className="page">
      <div className="container">
        <div className="pageHeader">
          <h1 className="pageTitle">How to buy $USD1</h1>
          <p className="pageLead">
            This is a simple “how it works” guide — not financial advice. Go slow, double-check
            links, and never risk money you need for real life.
          </p>
        </div>

        <div className="card" style={{ padding: 22, display: "grid", gap: 14 }}>
          <h2 style={{ margin: 0 }}>1) Create a wallet</h2>
          <p className="muted" style={{ margin: 0 }}>
            Install a Solana wallet you trust (like Phantom or Solflare). Write down your recovery
            phrase and store it offline. Never share it.
          </p>

          <h2 style={{ margin: 0 }}>2) Fund it with SOL</h2>
          <p className="muted" style={{ margin: 0 }}>
            Buy SOL on an exchange, then send it to your wallet address. Start with a small test
            send if you’re new.
          </p>

          <h2 style={{ margin: 0 }}>3) Swap SOL → USD1 using Jupiter</h2>
          <p className="muted" style={{ margin: 0 }}>
            Use Jupiter to swap SOL for USD1. Always verify the token address from a trusted source
            (this site’s copy button, Solscan, and DexScreener should all match).
          </p>

          <div className="pill">
            Safety tip: if a link looks weird, stop. Use bookmarks. Use official sources.
          </div>

          <div className="pageActions">
            <a className="btn btnPrimary" href="https://jup.ag" target="_blank" rel="noreferrer">
              Open Jupiter
            </a>
            <Link className="btn" href="/#discover">
              Back to footer links
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}



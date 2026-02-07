import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "USD1 — UnicornSheepDog1 on Solana",
  description:
    "USD1 is a Solana memecoin focused on transparency, public locks, and verified reserve holdings. Verify the mint address and explore tokenomics.",
  openGraph: {
    title: "USD1 — UnicornSheepDog1 on Solana",
    description:
      "USD1 is a Solana memecoin focused on transparency, public locks, and verified reserve holdings.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "USD1 — UnicornSheepDog1 on Solana",
    description:
      "USD1 is a Solana memecoin focused on transparency, public locks, and verified reserve holdings.",
  },
};

export default function Usd1Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

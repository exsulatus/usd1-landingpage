import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/lib/i18n/context";

export const metadata: Metadata = {
  metadataBase: new URL("https://theunicornsheep.dog"),
  title: "UnicornSheepDog1 (USD1) — Community-Driven Solana Token",
  description:
    "USD1 is a community-driven Solana token built on transparency — public locks, disclosed reserves, and verifiable buybacks. Trade on Jupiter, verify on-chain.",
  icons: [{ rel: "icon", url: "/icon.svg" }],
  openGraph: {
    title: "UnicornSheepDog1 (USD1)",
    description:
      "Community-driven Solana token built on transparency — public locks, disclosed reserves, and verifiable buybacks.",
    url: "https://theunicornsheep.dog",
    siteName: "UnicornSheepDog1",
    images: [
      {
        url: "/images/memes/usd1.hero.png",
        width: 2048,
        height: 2048,
        alt: "UnicornSheepDog1 (USD1)",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UnicornSheepDog1 (USD1)",
    description:
      "Community-driven Solana token — public locks, disclosed reserves, verifiable buybacks. Trade on Jupiter.",
    images: ["/images/memes/usd1.hero.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Theme is applied client-side to avoid hydration mismatches.
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("usd1-theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <a className="skipLink" href="#main">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

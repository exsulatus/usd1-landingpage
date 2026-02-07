import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { I18nProvider } from "@/lib/i18n/context";

export const metadata: Metadata = {
  title: "UnicornSheepDog1 (USD1) — Learn money, simply",
  description:
    "UnicornSheepDog1 (USD1) is a friendly money teacher for grown-ups — simple lessons, playful tools, and community-made fun.",
  icons: [{ rel: "icon", url: "/icon.svg" }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Theme is applied client-side to avoid hydration mismatches.
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <a className="skipLink" href="#main">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}



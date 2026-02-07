"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MascotMark } from "@/components/MascotMark";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { IconMenu, IconX, IconTelegram, IconClose } from "@/components/icons";

type NavItem = { label: string; href: string };

const DEFAULT_NAV: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Learn", href: "/#learn" },
  { label: "Fun & Games", href: "/#fun" },
  { label: "News", href: "/#news" },
  { label: "Discover", href: "/#discover" },
];

const USD1_NAV: NavItem[] = [
  { label: "About", href: "#usd1-about" },
  { label: "Tokenomics", href: "#usd1-tokenomics" },
  { label: "Memes", href: "#usd1-memes" },
  { label: "Roadmap", href: "#usd1-roadmap" },
  { label: "Team", href: "#usd1-team" },
];

const SOCIAL_LINKS = {
  x: "https://x.com/UnicornSheepDog",
  telegram: "https://t.me/UnicornSheepDog1",
};

export function Header() {
  const pathname = usePathname();
  const isUsd1 = pathname === "/usd1";
  const nav = isUsd1 ? USD1_NAV : DEFAULT_NAV;

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  /* Lock body scroll when mobile menu is open */
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("#")) {
        e.preventDefault();
        const el = document.getElementById(href.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        setOpen(false);
      }
    },
    [],
  );

  return (
    <header className="siteHeader">
      <div className="siteHeaderBar container">
        {/* ── Left: Brand ── */}
        <MascotMark />

        {/* ── Center: Navigation ── */}
        <nav className="siteNav" aria-label="Primary navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="siteNavLink"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ── Right: Actions ── */}
        <div className="siteHeaderRight">
          {/* Social links */}
          <div className="siteHeaderSocials">
            <a
              href={SOCIAL_LINKS.x}
              target="_blank"
              rel="noopener noreferrer"
              className="siteHeaderSocialBtn"
              aria-label="Follow us on X"
            >
              <IconX size={16} />
            </a>
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="siteHeaderSocialBtn"
              aria-label="Join our Telegram"
            >
              <IconTelegram size={16} />
            </a>
          </div>

          <span className="siteHeaderDivider" aria-hidden="true" />

          <LanguageToggle />
          <ThemeToggle />

          {/* Hamburger (mobile only) */}
          <button
            type="button"
            className="siteHeaderIconBtn siteHamburger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <IconClose size={22} /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <>
          <div
            className="siteMobileOverlay"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="siteMobilePanel" role="dialog" aria-label="Menu">
            <div className="siteMobilePanelInner container">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="siteMobileLink"
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ))}

              <div className="siteMobileSocials">
                <a
                  href={SOCIAL_LINKS.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="siteMobileSocialBtn"
                  aria-label="Follow us on X"
                >
                  <IconX size={18} />
                  <span>Follow on X</span>
                </a>
                <a
                  href={SOCIAL_LINKS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="siteMobileSocialBtn"
                  aria-label="Join our Telegram"
                >
                  <IconTelegram size={18} />
                  <span>Join Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

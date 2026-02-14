"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MascotMark } from "@/components/MascotMark";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { IconMenu, IconX, IconTelegram, IconClose } from "@/components/icons";
import { useI18n } from "@/lib/i18n/context";

type NavItem = { labelKey: string; href: string };

const DEFAULT_NAV: NavItem[] = [
  { labelKey: "nav.about", href: "/#about" },
  { labelKey: "nav.learn", href: "/#learn" },
  { labelKey: "nav.games", href: "/#fun" },
  { labelKey: "nav.news", href: "/#news" },
  { labelKey: "nav.discover", href: "/#discover" },
];

const USD1_NAV: NavItem[] = [
  { labelKey: "nav.about", href: "#usd1-about" },
  { labelKey: "nav.tokenomics", href: "#usd1-tokenomics" },
  { labelKey: "nav.memes", href: "#usd1-memes" },
  { labelKey: "nav.roadmap", href: "#usd1-roadmap" },
  { labelKey: "nav.team", href: "#usd1-team" },
];

const SOCIAL_LINKS = {
  x: "https://x.com/UnicornSheepDog",
  telegram: "https://t.me/UnicornSheepDog1",
};

export function Header() {
  const pathname = usePathname();
  const isUsd1 = pathname === "/usd1" || pathname === "/";
  const nav = isUsd1 ? USD1_NAV : DEFAULT_NAV;
  const { t } = useI18n();

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

  const openFooterOverlay = React.useCallback(
    (panel: "howto" | "faq") => {
      window.dispatchEvent(
        new CustomEvent("open-footer-overlay", { detail: panel }),
      );
      /* Delay closing the menu so the overlay backdrop fades in first,
         preventing a flash of the underlying page */
      setTimeout(() => setOpen(false), 180);
    },
    [],
  );

  return (
    <>
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
                {t(item.labelKey as keyof typeof import("@/lib/i18n/translations/en").default)}
              </Link>
            ))}
          </nav>

          {/* ── Right: Actions ── */}
          <div className="siteHeaderRight">
            {/* Overlay triggers */}
            <div className="siteHeaderActions">
              <button
                type="button"
                className="siteNavOverlayBtn"
                onClick={() => openFooterOverlay("howto")}
              >
                {t("footer.how_to_buy" as any)}
              </button>
              <button
                type="button"
                className="siteNavOverlayBtn"
                onClick={() => openFooterOverlay("faq")}
              >
                {t("footer.faq" as any)}
              </button>
            </div>

            <span className="siteHeaderDivider" aria-hidden="true" />

            {/* Social links */}
            <div className="siteHeaderSocials">
              <a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                className="siteHeaderSocialBtn"
                aria-label={t("header.follow_x")}
              >
                <IconX size={16} />
              </a>
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="siteHeaderSocialBtn"
                aria-label={t("header.join_telegram")}
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
              aria-label={open ? t("header.close_menu") : t("header.open_menu")}
              aria-expanded={open}
            >
              {open ? <IconClose size={22} /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen menu (rendered outside header to avoid backdrop-filter containing block) ── */}
      {open && (
        <div className="siteMobileScreen" role="dialog" aria-label="Menu">
          <div className="siteMobileFlow">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="siteMobileLink"
                style={{ animationDelay: `${i * 35}ms` }}
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  setOpen(false);
                }}
              >
                {t(item.labelKey as keyof typeof import("@/lib/i18n/translations/en").default)}
              </Link>
            ))}

            <div
              className="siteMobilePills"
              style={{ animationDelay: `${nav.length * 35}ms` }}
            >
              <button
                type="button"
                className="siteMobilePill"
                onClick={() => openFooterOverlay("howto")}
              >
                {t("footer.how_to_buy" as any)}
              </button>
              <button
                type="button"
                className="siteMobilePill"
                onClick={() => openFooterOverlay("faq")}
              >
                {t("footer.faq" as any)}
              </button>
            </div>

            <div
              className="siteMobileSocials"
              style={{ animationDelay: `${(nav.length + 1) * 35}ms` }}
            >
              <a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                className="siteMobileSocialRow"
              >
                <IconX size={15} />
                <span>X (Twitter)</span>
                <span className="siteMobileSocialArrow" aria-hidden="true">&#8599;</span>
              </a>
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="siteMobileSocialRow"
              >
                <IconTelegram size={15} />
                <span>Telegram</span>
                <span className="siteMobileSocialArrow" aria-hidden="true">&#8599;</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

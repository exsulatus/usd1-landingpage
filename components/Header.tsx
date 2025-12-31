"use client";

import Link from "next/link";
import React from "react";
import { MascotMark } from "@/components/MascotMark";
import { ThemeToggle } from "@/components/ThemeToggle";
import { IconMenu } from "@/components/icons";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Learn", href: "/#learn" },
  { label: "Fun & Games", href: "/#fun" },
  { label: "News", href: "/#news" },
  { label: "Discover", href: "/#discover" }
];

export function Header() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="siteHeader">
      <div className="siteHeaderBar container">
        <MascotMark />

        <nav className="siteNav" aria-label="Primary navigation">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="siteNavLink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="siteHeaderRight">
          <button
            type="button"
            className="siteHeaderIconBtn siteHamburger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <IconMenu />
          </button>
          <ThemeToggle />
        </div>
      </div>

      {open ? (
        <div className="siteMobilePanel" role="dialog" aria-label="Menu">
          <div className="siteMobilePanelInner container">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="siteMobileLink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}



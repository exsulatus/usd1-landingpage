"use client";

import React from "react";
import { useI18n, LANGUAGES, type Language } from "@/lib/i18n/context";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const selected = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelect = (l: Language) => {
    setLang(l.code);
    setIsOpen(false);
  };

  return (
    <div className="langToggleWrapper">
      <button
        ref={buttonRef}
        type="button"
        className="langToggleBtn"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="langToggleFlag">{selected.flag}</span>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="langDropdown"
          role="listbox"
          aria-label="Select language"
        >
          <div className="langDropdownScroll">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                type="button"
                className={`langDropdownItem ${l.code === selected.code ? "isSelected" : ""}`}
                role="option"
                aria-selected={l.code === selected.code}
                onClick={() => handleSelect(l)}
              >
                <span className="langDropdownFlag">{l.flag}</span>
                <span className="langDropdownName">
                  <span className="langDropdownEnglish">{l.name}</span>
                  <span className="langDropdownNative">{l.nativeName}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

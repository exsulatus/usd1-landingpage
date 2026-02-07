"use client";

import React, { useState, useRef, useEffect } from "react";

type Language = {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
};

const LANGUAGES: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸", nativeName: "English" },
  { code: "es", name: "Spanish", flag: "🇪🇸", nativeName: "Español" },
  { code: "zh", name: "Chinese (Simplified)", flag: "🇨🇳", nativeName: "简体中文" },
  { code: "pt", name: "Portuguese", flag: "🇧🇷", nativeName: "Português" },
  { code: "ru", name: "Russian", flag: "🇷🇺", nativeName: "Русский" },
  { code: "ko", name: "Korean", flag: "🇰🇷", nativeName: "한국어" },
  { code: "ja", name: "Japanese", flag: "🇯🇵", nativeName: "日本語" },
  { code: "tr", name: "Turkish", flag: "🇹🇷", nativeName: "Türkçe" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳", nativeName: "Tiếng Việt" },
  { code: "ar", name: "Arabic", flag: "🇸🇦", nativeName: "العربية" },
  { code: "fr", name: "French", flag: "🇫🇷", nativeName: "Français" },
  { code: "de", name: "German", flag: "🇩🇪", nativeName: "Deutsch" },
  { code: "it", name: "Italian", flag: "🇮🇹", nativeName: "Italiano" },
  { code: "hi", name: "Hindi", flag: "🇮🇳", nativeName: "हिन्दी" },
  { code: "id", name: "Indonesian", flag: "🇮🇩", nativeName: "Bahasa Indonesia" },
];

const STORAGE_KEY = "usd1-lang";

export function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Language>(LANGUAGES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Load saved language on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const lang = LANGUAGES.find((l) => l.code === saved);
      if (lang) setSelected(lang);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
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

  const handleSelect = (lang: Language) => {
    setSelected(lang);
    localStorage.setItem(STORAGE_KEY, lang.code);
    setIsOpen(false);
    // In a real app, this would trigger i18n context update
    document.documentElement.lang = lang.code;
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
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                className={`langDropdownItem ${lang.code === selected.code ? "isSelected" : ""}`}
                role="option"
                aria-selected={lang.code === selected.code}
                onClick={() => handleSelect(lang)}
              >
                <span className="langDropdownFlag">{lang.flag}</span>
                <span className="langDropdownName">
                  <span className="langDropdownEnglish">{lang.name}</span>
                  <span className="langDropdownNative">{lang.nativeName}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


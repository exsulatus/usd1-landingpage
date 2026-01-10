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
  { code: "zh", name: "Chinese", flag: "🇨🇳", nativeName: "中文" },
  { code: "hi", name: "Hindi", flag: "🇮🇳", nativeName: "हिन्दी" },
  { code: "es", name: "Spanish", flag: "🇪🇸", nativeName: "Español" },
  { code: "fr", name: "French", flag: "🇫🇷", nativeName: "Français" },
  { code: "ar", name: "Arabic", flag: "🇸🇦", nativeName: "العربية" },
  { code: "bn", name: "Bengali", flag: "🇧🇩", nativeName: "বাংলা" },
  { code: "pt", name: "Portuguese", flag: "🇧🇷", nativeName: "Português" },
  { code: "ru", name: "Russian", flag: "🇷🇺", nativeName: "Русский" },
  { code: "ja", name: "Japanese", flag: "🇯🇵", nativeName: "日本語" },
  { code: "de", name: "German", flag: "🇩🇪", nativeName: "Deutsch" },
  { code: "ko", name: "Korean", flag: "🇰🇷", nativeName: "한국어" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳", nativeName: "Tiếng Việt" },
  { code: "it", name: "Italian", flag: "🇮🇹", nativeName: "Italiano" },
  { code: "tr", name: "Turkish", flag: "🇹🇷", nativeName: "Türkçe" },
  { code: "th", name: "Thai", flag: "🇹🇭", nativeName: "ไทย" },
  { code: "pl", name: "Polish", flag: "🇵🇱", nativeName: "Polski" },
  { code: "nl", name: "Dutch", flag: "🇳🇱", nativeName: "Nederlands" },
  { code: "uk", name: "Ukrainian", flag: "🇺🇦", nativeName: "Українська" },
  { code: "id", name: "Indonesian", flag: "🇮🇩", nativeName: "Bahasa Indonesia" },
  { code: "ms", name: "Malay", flag: "🇲🇾", nativeName: "Bahasa Melayu" },
  { code: "fa", name: "Persian", flag: "🇮🇷", nativeName: "فارسی" },
  { code: "ro", name: "Romanian", flag: "🇷🇴", nativeName: "Română" },
  { code: "el", name: "Greek", flag: "🇬🇷", nativeName: "Ελληνικά" },
  { code: "cs", name: "Czech", flag: "🇨🇿", nativeName: "Čeština" },
  { code: "sv", name: "Swedish", flag: "🇸🇪", nativeName: "Svenska" },
  { code: "hu", name: "Hungarian", flag: "🇭🇺", nativeName: "Magyar" },
  { code: "he", name: "Hebrew", flag: "🇮🇱", nativeName: "עברית" },
  { code: "da", name: "Danish", flag: "🇩🇰", nativeName: "Dansk" },
  { code: "fi", name: "Finnish", flag: "🇫🇮", nativeName: "Suomi" },
  { code: "no", name: "Norwegian", flag: "🇳🇴", nativeName: "Norsk" },
  { code: "sk", name: "Slovak", flag: "🇸🇰", nativeName: "Slovenčina" },
  { code: "bg", name: "Bulgarian", flag: "🇧🇬", nativeName: "Български" },
  { code: "hr", name: "Croatian", flag: "🇭🇷", nativeName: "Hrvatski" },
  { code: "sr", name: "Serbian", flag: "🇷🇸", nativeName: "Српски" },
  { code: "sl", name: "Slovenian", flag: "🇸🇮", nativeName: "Slovenščina" },
  { code: "lt", name: "Lithuanian", flag: "🇱🇹", nativeName: "Lietuvių" },
  { code: "lv", name: "Latvian", flag: "🇱🇻", nativeName: "Latviešu" },
  { code: "et", name: "Estonian", flag: "🇪🇪", nativeName: "Eesti" },
  { code: "fil", name: "Filipino", flag: "🇵🇭", nativeName: "Filipino" },
  { code: "ta", name: "Tamil", flag: "🇱🇰", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", flag: "🇮🇳", nativeName: "తెలుగు" },
  { code: "mr", name: "Marathi", flag: "🇮🇳", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", flag: "🇮🇳", nativeName: "ગુજરાતી" },
  { code: "kn", name: "Kannada", flag: "🇮🇳", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", flag: "🇮🇳", nativeName: "മലയാളം" },
  { code: "pa", name: "Punjabi", flag: "🇮🇳", nativeName: "ਪੰਜਾਬੀ" },
  { code: "sw", name: "Swahili", flag: "🇰🇪", nativeName: "Kiswahili" },
  { code: "am", name: "Amharic", flag: "🇪🇹", nativeName: "አማርኛ" },
  { code: "ne", name: "Nepali", flag: "🇳🇵", nativeName: "नेपाली" },
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


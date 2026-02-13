"use client";

import React from "react";
import type { TranslationKeys } from "./translations/en";
import en from "./translations/en";

/* ─── Language list (shared with LanguageToggle) ─── */

export type Language = {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
};

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸", nativeName: "English" },
  { code: "es", name: "Spanish", flag: "🇪🇸", nativeName: "Español" },
  { code: "zh", name: "Chinese", flag: "🇨🇳", nativeName: "简体中文" },
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

export const STORAGE_KEY = "usd1-lang";

/* ─── Lazy-load translations ─── */

const translationLoaders: Record<string, () => Promise<{ default: TranslationKeys }>> = {
  en: () => import("./translations/en"),
  es: () => import("./translations/es"),
  zh: () => import("./translations/zh"),
  pt: () => import("./translations/pt"),
  ru: () => import("./translations/ru"),
  ko: () => import("./translations/ko"),
  ja: () => import("./translations/ja"),
  tr: () => import("./translations/tr"),
  vi: () => import("./translations/vi"),
  ar: () => import("./translations/ar"),
  fr: () => import("./translations/fr"),
  de: () => import("./translations/de"),
  it: () => import("./translations/it"),
  hi: () => import("./translations/hi"),
  id: () => import("./translations/id"),
};

/* ─── Context ─── */

type I18nContextValue = {
  lang: string;
  setLang: (code: string) => void;
  t: (key: keyof TranslationKeys) => string;
};

const I18nContext = React.createContext<I18nContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => en[key] ?? String(key),
});

/* ─── Provider ─── */

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState("en");
  const [strings, setStrings] = React.useState<TranslationKeys>(en);

  /* Load saved language on mount */
  React.useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved && saved !== "en" && translationLoaders[saved]) {
      setLangState(saved);
      translationLoaders[saved]().then((mod) => setStrings(mod.default));
    }
  }, []);

  const setLang = React.useCallback((code: string) => {
    setLangState(code);
    localStorage.setItem(STORAGE_KEY, code);
    document.documentElement.lang = code;
    if (code === "en") {
      setStrings(en);
    } else if (translationLoaders[code]) {
      translationLoaders[code]().then((mod) => setStrings(mod.default));
    }
  }, []);

  const t = React.useCallback(
    (key: keyof TranslationKeys): string => {
      return strings[key] ?? en[key] ?? String(key);
    },
    [strings],
  );

  const value = React.useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/* ─── Hook ─── */

export function useI18n() {
  return React.useContext(I18nContext);
}

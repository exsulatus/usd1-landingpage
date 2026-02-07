"use client";

import React, {
  createContext, useContext, useState, useEffect, useCallback,
} from "react";
import { translations, type TranslationKey } from "./translations";

type I18nContextValue = {
  lang: string;
  setLang: (code: string) => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);
const STORAGE_KEY = "usd1-lang";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && translations[saved]) {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch { /* noop */ }
  }, []);

  const setLang = useCallback((code: string) => {
    if (!translations[code]) return;
    setLangState(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch { /* noop */ }
    document.documentElement.lang = code;
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      const dict = translations[lang] ?? translations.en;
      return dict[key] ?? translations.en[key] ?? key;
    },
    [lang],
  );

  const value = React.useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useT() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useT must be used within I18nProvider");
  return ctx;
}

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "usd1-theme";

export function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export function applyTheme(mode: ThemeMode) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  if (mode === "dark") html.classList.add("dark");
  else html.classList.remove("dark");
}

export function persistTheme(mode: ThemeMode) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, mode);
}



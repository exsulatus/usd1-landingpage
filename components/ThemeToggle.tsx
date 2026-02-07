"use client";

import React from "react";
import { applyTheme, getInitialTheme, persistTheme, ThemeMode } from "@/lib/theme";
import { IconMoon, IconSun } from "@/components/icons";

export function ThemeToggle() {
  const [mode, setMode] = React.useState<ThemeMode>("light");

  React.useEffect(() => {
    const initial = getInitialTheme();
    setMode(initial);
    applyTheme(initial);
  }, []);

  const nextMode: ThemeMode = mode === "dark" ? "light" : "dark";

  return (
    <button
      className="themeToggleBtn iconOnly"
      type="button"
      onClick={() => {
        setMode(nextMode);
        persistTheme(nextMode);
        applyTheme(nextMode);
      }}
      aria-label={`Switch to ${nextMode} mode`}
    >
      {mode === "dark" ? <IconMoon size={20} /> : <IconSun size={20} />}
    </button>
  );
}



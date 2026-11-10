"use client";

import { createContext, useCallback, useContext, useLayoutEffect, useState } from "react";
import { Theme } from "@astryxdesign/core/theme";
import { themes, defaultThemeSlug } from "@/astryx-themes";

type Mode = "light" | "dark" | "system";

const ModeContext = createContext<{ mode: Mode; toggle: () => void }>({ mode: "system", toggle: () => {} });

export const useColorMode = () => useContext(ModeContext);

/**
 * Root Astryx theme. <Theme mode> owns the `data-theme` attribute on <html>
 * ("light" / "dark", or none to follow the OS). The visitor's choice is kept in
 * localStorage under "theme"; the inline script in layout.tsx applies it before
 * first paint, and this restores it into state before the browser paints.
 */
export default function AppTheme({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("system");

  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") setMode(saved);
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    setMode((m) => {
      const current = m === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : m;
      const next = current === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {}
      return next;
    });
  }, []);

  return (
    <ModeContext.Provider value={{ mode, toggle }}>
      <Theme theme={themes[defaultThemeSlug]} mode={mode}>
        {children}
      </Theme>
    </ModeContext.Provider>
  );
}

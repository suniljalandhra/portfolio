"use client";

import { Sun, Moon } from "@phosphor-icons/react";
import { useColorMode } from "./AppTheme";

export default function ThemeToggle() {
  const { toggle } = useColorMode();
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle dark mode">
      <Sun className="icon-sun" size={18} weight="duotone" aria-hidden />
      <Moon className="icon-moon" size={18} weight="duotone" aria-hidden />
    </button>
  );
}

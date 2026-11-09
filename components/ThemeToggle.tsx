"use client";

import { Sun, Moon } from "@phosphor-icons/react";

function currentTheme(): "light" | "dark" {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const toggle = () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle dark mode">
      <Sun className="icon-sun" size={18} weight="duotone" aria-hidden />
      <Moon className="icon-moon" size={18} weight="duotone" aria-hidden />
    </button>
  );
}

"use client";

import { useLayoutEffect, useState } from "react";

export const THEME_STORAGE_KEY = "proart-theme";

function themeColorFor(theme: "dark" | "light") {
  return theme === "light" ? "#f6f3ec" : "#09090b";
}

function applyTheme(theme: "dark" | "light") {
  document.documentElement.setAttribute("data-theme", theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColorFor(theme));
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode / storage blocked — the toggle still works for this visit.
  }
}

// Sun/moon icon toggle for the header. Starts rendered as "dark" (matching
// the server-rendered default) and corrects itself in useLayoutEffect, which
// runs before the browser paints — so there's no visible icon flash even
// when the inline script in layout.tsx has already put the visitor in light
// mode before React hydrates.
export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useLayoutEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={isLight}
      className="flex size-11 shrink-0 items-center justify-center rounded-[8px] border border-line-strong text-ink transition-colors hover:border-accent-line hover:text-accent"
    >
      {isLight ? (
        // Moon — tap to go dark
        <svg aria-hidden="true" viewBox="0 0 20 20" width="19" height="19" fill="none">
          <path
            d="M17.1 12.2a7.6 7.6 0 0 1-9.3-9.3 7.8 7.8 0 1 0 9.3 9.3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // Sun — tap to go light
        <svg aria-hidden="true" viewBox="0 0 20 20" width="19" height="19" fill="none">
          <circle cx="10" cy="10" r="3.6" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M10 1.8v2.3M10 15.9v2.3M18.2 10h-2.3M4.1 10H1.8M15.7 4.3l-1.6 1.6M5.9 14.1l-1.6 1.6M15.7 15.7l-1.6-1.6M5.9 5.9 4.3 4.3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

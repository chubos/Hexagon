"use client";

import { useEffect, useState } from "react";

import {
  applyTheme,
  getStoredThemePreference,
  THEME_OPTIONS,
  type ThemePreference,
} from "@/lib/theme";
import "../styles/theme-toggle.css";

export default function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("auto");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prefAttr = document.documentElement.dataset.themePref;
    const stored =
      prefAttr === "light" || prefAttr === "dark" || prefAttr === "auto"
        ? prefAttr
        : getStoredThemePreference();
    setPreference(stored);
    applyTheme(stored);
    setReady(true);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      const current = getStoredThemePreference();
      if (current === "auto") applyTheme("auto");
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  const activeIndex = THEME_OPTIONS.findIndex((o) => o.value === preference);

  const select = (value: ThemePreference) => {
    setPreference(value);
    applyTheme(value);
  };

  return (
    <div
      className={`theme-toggle${ready ? " theme-toggle--ready" : ""}`}
      role="radiogroup"
      aria-label="Motyw kolorystyczny"
    >
      <span
        className="theme-toggle-thumb"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
        aria-hidden
      />
      {THEME_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={preference === option.value}
          aria-label={option.label}
          title={option.label}
          className={`theme-toggle-option${
            preference === option.value ? " theme-toggle-option--active" : ""
          }`}
          onClick={() => select(option.value)}
        >
          {option.value === "light" && <SunIcon />}
          {option.value === "auto" && <AutoIcon />}
          {option.value === "dark" && <MoonIcon />}
        </button>
      ))}
    </div>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-toggle-icon">
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-toggle-icon">
      <path
        d="M20 14.5A7.5 7.5 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AutoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-toggle-icon">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 4a8 8 0 0 0 0 16Z" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

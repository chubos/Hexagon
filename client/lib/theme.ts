export const THEME_STORAGE_KEY = "hexagon-theme";

export type ThemePreference = "light" | "dark" | "auto";

export const THEME_OPTIONS: {
  value: ThemePreference;
  label: string;
}[] = [
  { value: "light", label: "Jasny" },
  { value: "auto", label: "Auto" },
  { value: "dark", label: "Ciemny" },
];

export function isThemePreference(value: string | null): value is ThemePreference {
  return value === "light" || value === "dark" || value === "auto";
}

export function getStoredThemePreference(): ThemePreference {
  if (typeof window === "undefined") return "auto";
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(stored) ? stored : "auto";
  } catch {
    return "auto";
  }
}

export function resolveTheme(preference: ThemePreference): "light" | "dark" {
  if (preference === "light" || preference === "dark") return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyTheme(preference: ThemePreference) {
  const resolved = resolveTheme(preference);
  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themePref = preference;
  document.documentElement.style.colorScheme = resolved;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", resolved === "dark" ? "#0a0a0a" : "#ffffff");
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    /* ignore */
  }
}

/** Inline script — runs before paint to avoid flash */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var p=localStorage.getItem(k);if(p!=="light"&&p!=="dark"&&p!=="auto")p="auto";var d=p==="dark"||(p==="auto"&&matchMedia("(prefers-color-scheme: dark)").matches);var t=d?"dark":"light";document.documentElement.dataset.theme=t;document.documentElement.dataset.themePref=p;document.documentElement.style.colorScheme=t}catch(e){}})();`;

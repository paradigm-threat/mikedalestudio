"use client";

import { useTheme } from "next-themes";

export default function ThemeToggleInner() {
  const { setTheme, resolvedTheme } = useTheme();
  if (!resolvedTheme) {
    return (
      <span
        className="border-border inline-flex h-10 w-10 rounded-lg border"
        aria-hidden
      />
    );
  }
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="border-border hover:bg-muted focus:ring-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors focus:ring-2 focus:outline-none"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <span aria-hidden className="text-lg">
          ☀
        </span>
      ) : (
        <span aria-hidden className="text-lg">
          ☽
        </span>
      )}
    </button>
  );
}

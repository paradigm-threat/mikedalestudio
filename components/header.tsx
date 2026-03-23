"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_ROUTES } from "@/lib/routes";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-border bg-background/90 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          prefetch
          className="font-display text-foreground hover:text-accent shrink-0 text-lg font-semibold tracking-tight sm:text-xl"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        <nav
          id="site-nav"
          className={cn(
            "border-border bg-background absolute top-full right-0 left-0 flex flex-col gap-1 border-b p-4 shadow-lg sm:static sm:flex sm:flex-row sm:items-center sm:gap-1 sm:border-0 sm:p-0 sm:shadow-none",
            open ? "flex" : "hidden sm:flex",
          )}
          aria-label="Primary"
        >
          {NAV_ROUTES.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                prefetch
                className={cn(
                  "focus:ring-ring rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:outline-none sm:py-1.5",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="border-border hover:bg-muted focus:ring-ring inline-flex h-10 items-center justify-center rounded-lg border px-3 text-sm font-medium sm:hidden"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}

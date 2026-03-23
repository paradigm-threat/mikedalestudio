"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PREFETCH_PATHS } from "@/lib/routes";

/**
 * Eagerly prefetch all main routes after hydration.
 * Mobile nav links are often `display:none`, so viewport-based Link prefetch may not run;
 * this makes client transitions feel instant once prefetch completes.
 */
export function NavPrefetch() {
  const router = useRouter();

  useEffect(() => {
    for (const href of PREFETCH_PATHS) {
      router.prefetch(href);
    }
  }, [router]);

  return null;
}

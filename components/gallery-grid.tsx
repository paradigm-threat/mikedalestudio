"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/types";
import { cn } from "@/lib/cn";
import { PortfolioImage } from "@/components/portfolio-image";

type Props = { items: GalleryItem[] };

export function GalleryGrid({ items }: Props) {
  const [active, setActive] = useState<GalleryItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = useCallback(() => {
    setActive(null);
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => setActive(null);
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d || !active) return;
    if (!d.open) d.showModal();
  }, [active]);

  const isGif = active?.src.toLowerCase().endsWith(".gif");

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.src}>
            <button
              type="button"
              className="w-full cursor-zoom-in text-left transition-opacity hover:opacity-95"
              onClick={() => setActive(item)}
              aria-haspopup="dialog"
              aria-label={`Open larger view: ${item.alt}`}
            >
              <PortfolioImage src={item.src} alt={item.alt} />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={cn(
          "border-border bg-card text-foreground fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[min(96vw,1200px)] -translate-x-1/2 -translate-y-1/2 rounded-xl border p-4 shadow-xl backdrop:bg-black/60",
          "open:flex open:flex-col",
        )}
        aria-labelledby="lightbox-title"
      >
        <div className="mb-3 flex justify-end gap-2">
          <button
            type="button"
            className="border-border hover:bg-muted focus:ring-ring rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            onClick={close}
          >
            Close
          </button>
        </div>
        {active ? (
          <>
            <h2 id="lightbox-title" className="sr-only">
              {active.alt}
            </h2>
            <div className="relative h-[min(75vh,820px)] w-full">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="object-contain"
                sizes="100vw"
                unoptimized={isGif}
                priority
              />
            </div>
            {active.title ? (
              <p className="text-muted-foreground mt-3 text-center text-sm">{active.title}</p>
            ) : null}
          </>
        ) : null}
      </dialog>
    </>
  );
}

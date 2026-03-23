"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/types";
import { cn } from "@/lib/cn";
import { PortfolioImage } from "@/components/portfolio-image";
import { GallerySlideshow } from "@/components/gallery-slideshow";

type Props = { items: GalleryItem[] };

export function GalleryGrid({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const active = activeIndex !== null ? (items[activeIndex] ?? null) : null;

  const close = useCallback(() => {
    setActiveIndex(null);
    dialogRef.current?.close();
  }, []);

  const goPrev = useCallback(() => {
    if (activeIndex === null || items.length === 0) return;
    setActiveIndex((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length]);

  const goNext = useCallback(() => {
    if (activeIndex === null || items.length === 0) return;
    setActiveIndex((activeIndex + 1) % items.length);
  }, [activeIndex, items.length]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => setActiveIndex(null);
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d || activeIndex === null) return;
    if (!d.open) d.showModal();
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, goPrev, goNext]);

  const isGif = active?.src.toLowerCase().endsWith(".gif");
  const hasNav = items.length > 1;
  const position = activeIndex !== null ? activeIndex + 1 : 0;

  const btnOverlay =
    "bg-card/95 text-foreground border-border hover:bg-muted focus:ring-ring absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border shadow-md backdrop-blur-sm focus:ring-2 focus:outline-none disabled:pointer-events-none disabled:opacity-40 sm:h-14 sm:w-14";

  return (
    <>
      {items.length > 0 ? (
        <div className="mb-4 flex justify-end">
          <GallerySlideshow items={items} />
        </div>
      ) : null}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <li key={item.src}>
            <button
              type="button"
              className="w-full cursor-zoom-in text-left transition-opacity hover:opacity-95"
              onClick={() => setActiveIndex(index)}
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
          "border-border bg-card text-foreground fixed top-1/2 left-1/2 z-50 max-h-[92vh] w-[min(96vw,1200px)] -translate-x-1/2 -translate-y-1/2 rounded-xl border p-4 shadow-xl backdrop:bg-black/60",
          "open:flex open:flex-col",
        )}
        aria-labelledby="lightbox-title"
        aria-modal="true"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          {hasNav ? (
            <span className="text-muted-foreground text-sm tabular-nums" aria-live="polite">
              {position} / {items.length}
            </span>
          ) : (
            <span />
          )}
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
            <div className="relative min-h-[min(75vh,820px)] w-full">
              {hasNav ? (
                <>
                  <button
                    type="button"
                    className={cn(btnOverlay, "left-2 sm:left-3")}
                    onClick={goPrev}
                    aria-label="Previous image"
                  >
                    <span className="text-2xl leading-none" aria-hidden>
                      ‹
                    </span>
                  </button>
                  <button
                    type="button"
                    className={cn(btnOverlay, "right-2 sm:right-3")}
                    onClick={goNext}
                    aria-label="Next image"
                  >
                    <span className="text-2xl leading-none" aria-hidden>
                      ›
                    </span>
                  </button>
                </>
              ) : null}
              <div className="relative h-[min(75vh,820px)] w-full">
                <Image
                  key={active.src}
                  src={active.src}
                  alt={active.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  unoptimized={isGif}
                  priority
                />
              </div>
            </div>
            {active.title ? (
              <p className="text-muted-foreground mt-3 text-center text-sm">{active.title}</p>
            ) : null}
            {hasNav ? (
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  className="border-border hover:bg-muted focus:ring-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium focus:ring-2 focus:outline-none"
                  onClick={goPrev}
                  aria-label="Previous image"
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="border-border hover:bg-muted focus:ring-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium focus:ring-2 focus:outline-none"
                  onClick={goNext}
                  aria-label="Next image"
                >
                  Next
                </button>
              </div>
            ) : null}
          </>
        ) : null}
      </dialog>
    </>
  );
}

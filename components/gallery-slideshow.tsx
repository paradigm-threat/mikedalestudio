"use client";

/**
 * Fullscreen image slideshow with Play/Pause autoplay.
 * Slide transitions match paradigm-threat-site ImageGalleryContext (GalleryImageItem):
 * spring x + opacity + scale; reduced-motion uses opacity-only.
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/types";
import { cn } from "@/lib/cn";

const AUTO_ADVANCE_MS = 6000;

function requestFullscreenEl(el: HTMLElement | null) {
  if (!el) return Promise.resolve();
  const anyEl = el as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
  };
  if (el.requestFullscreen) return el.requestFullscreen().catch(() => undefined);
  if (anyEl.webkitRequestFullscreen) {
    return Promise.resolve(anyEl.webkitRequestFullscreen()).catch(() => undefined);
  }
  return Promise.resolve();
}

function exitFullscreenDoc() {
  const d = document as Document & { webkitExitFullscreen?: () => void };
  if (document.fullscreenElement) {
    void document.exitFullscreen().catch(() => undefined);
  } else if (d.webkitExitFullscreen) {
    d.webkitExitFullscreen();
  }
}

function SlideshowSlide({
  item,
  direction,
  reduceMotion,
}: {
  item: GalleryItem;
  direction: number;
  reduceMotion: boolean;
}) {
  const isGif = item.src.toLowerCase().endsWith(".gif");

  if (reduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 flex max-h-[calc(100vh-7rem)] w-full max-w-[min(96vw,1400px)] flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[min(78vh,900px)] w-full">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-contain drop-shadow-2xl"
            sizes="100vw"
            unoptimized={isGif}
            priority
          />
        </div>
        {item.title ? (
          <p className="text-white/85 mt-4 max-w-2xl text-center text-sm font-medium">
            {item.title}
          </p>
        ) : null}
      </motion.div>
    );
  }

  const isInitial = direction === 0;

  return (
    <motion.div
      key={item.src}
      custom={direction}
      initial={
        isInitial
          ? { opacity: 0, scale: 0.95 }
          : {
              x: direction > 0 ? "50%" : direction < 0 ? "-50%" : 0,
              opacity: 0,
              scale: 0.95,
            }
      }
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={
        isInitial
          ? { opacity: 0, scale: 1.02 }
          : {
              x: direction < 0 ? "50%" : direction > 0 ? "-50%" : 0,
              opacity: 0,
              scale: 1.05,
            }
      }
      transition={{
        x: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.2 },
        scale: { type: "spring", stiffness: 200, damping: 28 },
      }}
      className="relative z-10 flex max-h-[calc(100vh-7rem)] w-full max-w-[min(96vw,1400px)] flex-col items-center justify-center"
      style={{ willChange: "transform, opacity" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative h-[min(78vh,900px)] w-full">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-contain drop-shadow-2xl"
          sizes="100vw"
          unoptimized={isGif}
          priority
        />
      </div>
      {item.title ? (
        <p className="text-white/85 mt-4 max-w-2xl text-center text-sm font-medium drop-shadow-md">
          {item.title}
        </p>
      ) : null}
    </motion.div>
  );
}

type Props = { items: GalleryItem[] };

export function GallerySlideshow({ items }: Props) {
  const reduceMotion = useReducedMotion() === true;
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [playing, setPlaying] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const enterFsAfterOpen = useRef(false);

  const current = items[index] ?? null;
  const hasMany = items.length > 1;

  const goNext = useCallback(() => {
    if (!hasMany) return;
    setDirection(1);
    setIndex((i) => (i + 1) % items.length);
  }, [hasMany, items.length]);

  const goPrev = useCallback(() => {
    if (!hasMany) return;
    setDirection(-1);
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [hasMany, items.length]);

  const close = useCallback(() => {
    setPlaying(false);
    setOpen(false);
    exitFullscreenDoc();
  }, []);

  const togglePlay = useCallback(() => {
    setPlaying((p) => !p);
  }, []);

  const openAndPlay = useCallback(() => {
    setIndex(0);
    setDirection(0);
    setPlaying(!reduceMotion);
    enterFsAfterOpen.current = true;
    setOpen(true);
  }, [reduceMotion]);

  useLayoutEffect(() => {
    if (!open || !enterFsAfterOpen.current) return;
    enterFsAfterOpen.current = false;
    void requestFullscreenEl(shellRef.current);
  }, [open]);

  useEffect(() => {
    if (!open || !playing || !hasMany || reduceMotion) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % items.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [open, playing, hasMany, reduceMotion, items.length]);

  useEffect(() => {
    if (!open || !current) return;
    const nextIdx = (index + 1) % items.length;
    const prevIdx = (index - 1 + items.length) % items.length;
    for (const img of [items[nextIdx], items[prevIdx]]) {
      if (img?.src) {
        const pre = new window.Image();
        pre.src = img.src;
      }
    }
  }, [open, index, current, items]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        if (hasMany && !reduceMotion) setPlaying((p) => !p);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, goNext, goPrev, hasMany, reduceMotion]);

  if (items.length === 0) return null;

  const barBtn =
    "rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/60 focus:outline-none";

  return (
    <>
      <button
        type="button"
        onClick={openAndPlay}
        className="border-border bg-accent text-accent-foreground hover:opacity-95 focus:ring-ring inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold shadow-sm focus:ring-2 focus:outline-none"
      >
        <span aria-hidden>▶</span>
        Slideshow
      </button>

      <AnimatePresence>
        {open && current ? (
          <motion.div
            ref={shellRef}
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen slideshow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col bg-black/95 text-white"
            onClick={close}
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <span className="truncate text-xs text-white/60 sm:text-sm" aria-live="polite">
                {index + 1} / {items.length}
                {reduceMotion ? " · Use arrows to navigate (reduced motion)" : ""}
              </span>
              <div className="flex flex-wrap items-center justify-end gap-2">
                {hasMany ? (
                  <>
                    <button type="button" className={barBtn} onClick={goPrev} aria-label="Previous slide">
                      ‹ Prev
                    </button>
                    {reduceMotion ? null : (
                      <button
                        type="button"
                        className={cn(barBtn, playing && "bg-emerald-600/40 border-emerald-400/40")}
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay();
                        }}
                        aria-pressed={playing}
                        aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                      >
                        {playing ? "Pause" : "Play"}
                      </button>
                    )}
                    <button type="button" className={barBtn} onClick={goNext} aria-label="Next slide">
                      Next ›
                    </button>
                  </>
                ) : null}
                <button
                  type="button"
                  className={cn(barBtn, "border-red-400/30 bg-red-950/40")}
                  onClick={(e) => {
                    e.stopPropagation();
                    close();
                  }}
                  aria-label="Exit slideshow"
                >
                  Exit
                </button>
              </div>
            </div>

            <div
              className="relative flex min-h-0 flex-1 items-center justify-center px-2 py-4 sm:px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <SlideshowSlide
                  key={current.src}
                  item={current}
                  direction={direction}
                  reduceMotion={reduceMotion}
                />
              </AnimatePresence>

              {hasMany ? (
                <>
                  <button
                    type="button"
                    className="absolute top-1/2 left-2 z-20 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-3 text-2xl text-white backdrop-blur-sm hover:bg-black/70 focus:ring-2 focus:ring-white/50 focus:outline-none sm:block"
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    aria-label="Previous slide"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="absolute top-1/2 right-2 z-20 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-3 text-2xl text-white backdrop-blur-sm hover:bg-black/70 focus:ring-2 focus:ring-white/50 focus:outline-none sm:block"
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    aria-label="Next slide"
                  >
                    ›
                  </button>
                </>
              ) : null}
            </div>

            <p className="text-white/45 pb-3 text-center text-xs">
              {reduceMotion
                ? "← →: navigate · Esc: exit"
                : "Space: play/pause · ← →: navigate · Esc: exit"}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryItem } from "@/lib/types";
import { cn } from "@/lib/cn";
import { PortfolioImage } from "@/components/portfolio-image";

type Props = { items: GalleryItem[]; label: string };

export function GalleryCarousel({ items, label }: Props) {
  const reduceMotion = useReducedMotion() === true;
  const plugins = useMemo(() => {
    if (reduceMotion) return [];
    return [
      Autoplay({
        delay: 4800,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    ];
  }, [reduceMotion]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, plugins);
  const [selected, setSelected] = useState(0);
  const [announce, setAnnounce] = useState("");

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const i = emblaApi.selectedScrollSnap();
    setSelected(i);
    const it = items[i];
    if (it) {
      setAnnounce(`Slide ${i + 1} of ${items.length}: ${it.alt}`);
    }
  }, [emblaApi, items]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  if (items.length === 0) return null;

  const btnClass =
    "border-border hover:bg-muted focus:ring-ring inline-flex h-11 min-w-11 items-center justify-center rounded-lg border text-lg font-medium transition-colors focus:ring-2 focus:outline-none";

  return (
    <section
      className="mb-12"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className="border-border bg-card relative overflow-hidden rounded-2xl border p-2 shadow-sm">
        <div className="relative">
          <button
            type="button"
            className="bg-card/90 text-foreground border-border hover:bg-muted focus:ring-ring absolute top-1/2 left-1 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border shadow-md backdrop-blur-sm focus:ring-2 focus:outline-none sm:h-14 sm:w-14"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <span className="text-2xl leading-none" aria-hidden>
              ‹
            </span>
          </button>
          <button
            type="button"
            className="bg-card/90 text-foreground border-border hover:bg-muted focus:ring-ring absolute top-1/2 right-1 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border shadow-md backdrop-blur-sm focus:ring-2 focus:outline-none sm:h-14 sm:w-14"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <span className="text-2xl leading-none" aria-hidden>
              ›
            </span>
          </button>
          <div ref={emblaRef} className="overflow-hidden rounded-xl">
            <div className="flex touch-pan-y">
              {items.map((item, i) => (
                <div
                  key={item.src}
                  className="min-w-0 flex-[0_0_100%] px-1 sm:flex-[0_0_85%] lg:flex-[0_0_70%]"
                >
                  <PortfolioImage
                    src={item.src}
                    alt={item.alt}
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 70vw"
                  />
                  {item.title ? (
                    <p className="text-muted-foreground mt-2 text-center text-sm">
                      {item.title}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className={btnClass}
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            Previous
          </button>
          <span className="text-muted-foreground text-sm tabular-nums" aria-live="polite">
            {selected + 1} / {items.length}
          </span>
          <button
            type="button"
            className={btnClass}
            onClick={scrollNext}
            aria-label="Next slide"
          >
            Next
          </button>
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className={cn(
                "h-2 rounded-full transition-all focus:ring-2 focus:ring-ring focus:outline-none",
                i === selected ? "bg-accent w-6" : "bg-border w-2 hover:opacity-80",
              )}
              aria-label={`Go to slide ${i + 1}`}
              aria-pressed={i === selected}
              onClick={() => emblaApi?.scrollTo(i)}
            />
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announce}
      </p>
    </section>
  );
}

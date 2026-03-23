import type { GalleryItem } from "@/lib/types";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { GalleryGrid } from "@/components/gallery-grid";

type Props = {
  title: string;
  description: string;
  intro: string;
  items: GalleryItem[];
  carouselLabel: string;
};

export function SectionGalleryPage({
  title,
  description,
  intro,
  items,
  carouselLabel,
}: Props) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 max-w-3xl">
        <h1 className="font-display text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed whitespace-pre-line">
          {intro}
        </p>
        <p className="sr-only">{description}</p>
      </header>
      <GalleryCarousel items={items} label={carouselLabel} />
      <h2 className="font-display text-foreground mb-6 text-2xl font-semibold">All works</h2>
      <GalleryGrid items={items} />
    </div>
  );
}

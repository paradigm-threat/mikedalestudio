import Link from "next/link";
import { homeBookCredit } from "@/content/copy";
import { HOME_HERO } from "@/content/home-hero";
import { site } from "@/content/site";
import { getGallery } from "@/lib/galleries";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { GalleryGrid } from "@/components/gallery-grid";
import { PortfolioImage } from "@/components/portfolio-image";

const sectionCards = [
  {
    href: "/graphic-design",
    title: "Graphic Design",
    text: "Marketing, publishing, education, and more — 25+ years of client work.",
  },
  {
    href: "/printmaking",
    title: "Printmaking",
    text: "Hand-carved linoleum prints, editions, and originals on Etsy.",
  },
  {
    href: "/illustration",
    title: "Illustration",
    text: "Maps, posters, apparel graphics, and personal series.",
  },
];

export function HomePage() {
  const items = getGallery("home");
  const galleryItems = items.filter((i) => i.src !== HOME_HERO.src);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="mx-auto w-full max-w-sm lg:mx-0">
          <PortfolioImage
            src={HOME_HERO.src}
            alt={HOME_HERO.alt}
            priority
            aspectClassName="aspect-[3/4]"
            sizes="(max-width: 1024px) 80vw, 400px"
          />
        </div>
        <div>
          <h1 className="font-display text-foreground text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {site.name}
          </h1>
          <p className="text-accent mt-2 text-xl font-medium sm:text-2xl">{site.roles}</p>
          <p className="text-muted-foreground mt-4 max-w-lg text-lg leading-relaxed">
            {site.tagline} Based in {site.studioArea} — living in {site.location}.
          </p>
          <ul className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
            <li>
              <a
                href={site.instagram}
                className="border-border hover:bg-muted focus:ring-ring inline-flex rounded-full border px-4 py-2 focus:ring-2 focus:outline-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.linkedIn}
                className="border-border hover:bg-muted focus:ring-ring inline-flex rounded-full border px-4 py-2 focus:ring-2 focus:outline-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={site.etsy}
                className="border-border hover:bg-muted focus:ring-ring inline-flex rounded-full border px-4 py-2 focus:ring-2 focus:outline-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                Etsy
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-foreground mb-6 text-2xl font-semibold sm:text-3xl">
          Highlights
        </h2>
        <GalleryCarousel items={galleryItems} label="Home page image slideshow" />
      </section>

      <p className="text-muted-foreground mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed whitespace-pre-line">
        {homeBookCredit}
      </p>

      <section className="mt-16">
        <h2 className="font-display text-foreground mb-6 text-2xl font-semibold">Explore</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {sectionCards.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                prefetch
                className="border-border bg-card hover:border-accent block h-full rounded-2xl border p-5 shadow-sm transition-colors focus:ring-2 focus:ring-ring focus:outline-none"
              >
                <span className="font-display text-lg font-semibold">{c.title}</span>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{c.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-foreground mb-6 text-2xl font-semibold">Gallery</h2>
        <GalleryGrid items={galleryItems} />
      </section>
    </div>
  );
}

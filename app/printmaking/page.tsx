import type { Metadata } from "next";
import { SectionGalleryPage } from "@/components/section-gallery-page";
import { printmakingIntro } from "@/content/copy";
import { site } from "@/content/site";
import { getGallery } from "@/lib/galleries";

export const metadata: Metadata = {
  title: "Printmaking",
  description: printmakingIntro.replace(/\s+/g, " ").slice(0, 160),
  openGraph: {
    title: `Printmaking | ${site.name}`,
    description: printmakingIntro,
  },
};

export default function Page() {
  const items = getGallery("printmaking");
  return (
    <SectionGalleryPage
      title="Printmaking"
      description={printmakingIntro}
      intro={printmakingIntro}
      items={items}
      carouselLabel="Printmaking portfolio slideshow"
    />
  );
}

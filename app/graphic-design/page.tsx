import type { Metadata } from "next";
import { SectionGalleryPage } from "@/components/section-gallery-page";
import { graphicDesignIntro } from "@/content/copy";
import { site } from "@/content/site";
import { getGallery } from "@/lib/galleries";

export const metadata: Metadata = {
  title: "Graphic Design",
  description: `Graphic design portfolio by ${site.name} — marketing, publishing, education, government, and small business work.`,
  openGraph: {
    title: `Graphic Design | ${site.name}`,
    description: graphicDesignIntro,
  },
};

export default function Page() {
  const items = getGallery("graphic-design");
  return (
    <SectionGalleryPage
      title="Graphic Design"
      description={graphicDesignIntro}
      intro={graphicDesignIntro}
      items={items}
      carouselLabel="Graphic design portfolio slideshow"
    />
  );
}

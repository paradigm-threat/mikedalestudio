import type { Metadata } from "next";
import { SectionGalleryPage } from "@/components/section-gallery-page";
import { illustrationIntro } from "@/content/copy";
import { site } from "@/content/site";
import { getGallery } from "@/lib/galleries";

export const metadata: Metadata = {
  title: "Illustration",
  description: illustrationIntro,
  openGraph: {
    title: `Illustration | ${site.name}`,
    description: illustrationIntro,
  },
};

export default function Page() {
  const items = getGallery("illustration");
  return (
    <SectionGalleryPage
      title="Illustration"
      description={illustrationIntro}
      intro={illustrationIntro}
      items={items}
      carouselLabel="Illustration portfolio slideshow"
    />
  );
}

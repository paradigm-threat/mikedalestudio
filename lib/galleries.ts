import type { GalleryItem } from "@/lib/types";
import graphicDesign from "@/content/galleries/graphic-design.json";
import home from "@/content/galleries/home.json";
import illustration from "@/content/galleries/illustration.json";
import printmaking from "@/content/galleries/printmaking.json";

const map: Record<string, GalleryItem[]> = {
  home: home.items as GalleryItem[],
  "graphic-design": graphicDesign.items as GalleryItem[],
  printmaking: printmaking.items as GalleryItem[],
  illustration: illustration.items as GalleryItem[],
};

export function getGallery(key: keyof typeof map): GalleryItem[] {
  return map[key] ?? [];
}

import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl().replace(/\/$/, "");
  const paths = ["", "/graphic-design", "/printmaking", "/illustration", "/about", "/contact"];
  const now = new Date();
  return paths.map((p) => ({
    url: p === "" ? `${base}/` : `${base}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.8,
  }));
}

import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl().replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}

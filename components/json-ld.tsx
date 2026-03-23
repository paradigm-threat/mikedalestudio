import { site, siteUrl } from "@/content/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Graphic Designer / Artist",
    email: site.email,
    url: siteUrl(),
    sameAs: [site.instagram, site.linkedIn, site.etsy],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location,
      addressRegion: "GA",
    },
    description: site.tagline,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

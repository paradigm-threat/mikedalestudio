export const site = {
  name: "Mike Dale",
  titleSuffix: "Graphic Design + Fine Art",
  tagline: "Graphic design and art studio based in Savannah, GA",
  roles: "Graphic Designer / Artist",
  email: "switchbackdesign@gmail.com",
  instagram: "https://www.instagram.com/goodfortunepress/",
  linkedIn: "https://www.linkedin.com/in/mike-dale-ab67aa198/",
  etsy: "https://www.etsy.com/shop/TheGoodFortunePress",
  tybeeYoga: "http://www.tybeeyogahealingarts.com",
  location: "Tybee Island, GA",
  studioArea: "Savannah, GA",
  copyright: "© Copyright 2022 Switchback Design",
  printCopyright: "© Copyright 2025 Michael Dale / Switchback Design",
} as const;

export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

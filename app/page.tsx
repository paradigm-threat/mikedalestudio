import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Home",
  description: `${site.tagline} Portfolio of graphic design, printmaking, and illustration by ${site.name}.`,
};

export default function Page() {
  return <HomePage />;
}

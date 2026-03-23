import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { aboutSections } from "@/content/copy";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — graphic designer, artist, and printmaker based in ${site.location}.`,
  openGraph: {
    title: `About | ${site.name}`,
    description: `Artist and designer based in ${site.studioArea}.`,
    images: [
      {
        url: "/media/2022/07/93c0ba8c-16be-4c2e-803b-d0dbe41776c2.jpg",
        width: 1920,
        height: 1080,
      },
    ],
  },
};

function Paragraph({ children }: { children: ReactNode }) {
  return (
    <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{children}</p>
  );
}

function renderWithTybeeLink(text: string) {
  const needle = "(Tybee Yoga)";
  const i = text.indexOf(needle);
  if (i === -1) {
    return text;
  }
  return (
    <>
      {text.slice(0, i)}(
      <Link
        href={site.tybeeYoga}
        className="text-accent font-medium underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        Tybee Yoga
      </Link>
      ){text.slice(i + needle.length)}
    </>
  );
}

export default function Page() {
  const section = aboutSections[0];
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
        About
      </h1>
      <div className="border-border bg-card relative mt-8 overflow-hidden rounded-2xl border shadow-sm">
        <div className="relative aspect-video w-full sm:aspect-[16/9]">
          <Image
            src="/media/2022/07/93c0ba8c-16be-4c2e-803b-d0dbe41776c2.jpg"
            alt="Mike Dale outdoors"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      </div>
      <div className="mt-10">
        <h2 className="font-display text-foreground text-2xl font-semibold tracking-tight whitespace-pre-line sm:text-3xl">
          {section.heading}
        </h2>
        {section.paragraphs.map((p, idx) => (
          <Paragraph key={idx}>
            {p.includes("(Tybee Yoga)") ? renderWithTybeeLink(p) : p}
          </Paragraph>
        ))}
      </div>
      <p className="text-muted-foreground mt-10 text-center text-sm">{site.copyright}</p>
    </div>
  );
}

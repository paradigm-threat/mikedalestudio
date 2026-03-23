import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-border bg-muted/40 mt-auto border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-foreground font-semibold">{site.name}</p>
          <p className="text-muted-foreground text-sm">{site.tagline}</p>
          <p className="text-muted-foreground mt-2 text-sm">{site.copyright}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <a
            href={site.instagram}
            className="text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href={site.linkedIn}
            className="text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href={site.etsy}
            className="text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Etsy
          </a>
          <Link href="/contact" className="text-accent hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { contactIntro } from "@/content/copy";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} for graphic design, printmaking, and illustration — ${site.email}`,
  openGraph: {
    title: `Contact | ${site.name}`,
    description: contactIntro,
  },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
        Contact
      </h1>
      <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{contactIntro}</p>

      <div className="mt-8">
        <h2 className="font-display text-foreground text-2xl font-semibold">Get in Touch</h2>
        <p className="mt-2">
          <a
            href={`mailto:${site.email}`}
            className="text-accent text-lg font-medium underline underline-offset-2"
          >
            {site.email}
          </a>
        </p>
        <ul className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
          <li>
            <Link
              href={site.instagram}
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </Link>
          </li>
          <li>
            <Link
              href={site.linkedIn}
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
          </li>
          <li>
            <Link
              href={site.etsy}
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Etsy — The Good Fortune Press
            </Link>
          </li>
        </ul>
      </div>

      <ContactForm />
    </div>
  );
}

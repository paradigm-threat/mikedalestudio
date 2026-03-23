import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { SkipLink } from "@/components/skip-link";
import { site, siteUrl } from "@/content/site";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const base = siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: `${site.name} — ${site.titleSuffix}`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  icons: {
    icon: "/media/2025/08/cropped-waves-small-1.jpg",
    apple: "/media/2025/08/cropped-waves-small-1.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: `${site.name} — ${site.titleSuffix}`,
    title: `${site.name} — ${site.titleSuffix}`,
    description: site.tagline,
    url: base,
    images: [
      {
        url: "/media/2025/08/home-page-pic.png",
        width: 1397,
        height: 1756,
        alt: `${site.name} — portrait`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.titleSuffix}`,
    description: site.tagline,
    images: ["/media/2025/08/home-page-pic.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground flex min-h-full flex-col font-sans antialiased">
        <Providers>
          <SkipLink />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <JsonLd />
        </Providers>
      </body>
    </html>
  );
}

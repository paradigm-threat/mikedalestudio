# Mike Dale — Portfolio & Resume Site (Next.js)

Plan for `mikedalestudio`: a responsive, accessible, SEO-friendly site with dark/light themes (system default), slideshows plus section pages, and content migrated from [mikedalestudio.wordpress.com](https://mikedalestudio.wordpress.com/).

---

## 1. Goals

| Requirement | Approach |
|-------------|----------|
| Resume + art | Dedicated **Home**, **About**, **Contact**, **Graphic Design**, **Printmaking**, **Illustration** routes mirroring the WordPress IA. |
| Slideshow + pages | **Per-section carousel** (hero / featured strip) + **grid or masonry gallery** on the same page using the same image manifest (single source of truth). |
| All text from WordPress | Author **typed content** in `content/` (MDX or JSON + MD) transcribed from saved HTML; no runtime scraping. |
| Blogs | **RSS `/feed/` has no `<item>` entries** — the site is **pages only**. No blog section unless Mike adds posts later; optional `/journal` placeholder or omit. |
| All images | **157 originals** downloaded to `public/media/` (see §6). Optional second-pass script for edge URLs (see §6). |
| SEO | Next.js **Metadata API** (`generateMetadata`), `sitemap.ts`, `robots.ts`, canonical URLs, Open Graph + Twitter cards, `json-ld` (`Person` + `CreativeWork` where appropriate). |
| ADA / WCAG | Semantic landmarks, **skip link**, visible focus, **keyboard** carousel, `prefers-reduced-motion`, color contrast in both themes, **alt text** from migration (empty alt only for decorative), form labels, `aria-live` for slideshow changes. |
| Themes | **`next-themes`** with `attribute="class"` on `<html>`, default **`system`**, toggle in header; CSS variables for surfaces, text, accents. |
| Mobile + desktop | Mobile-first layout; touch-friendly controls; max-width content column; large tap targets. |

---

## 2. Tech stack

- **Framework:** Next.js 15 (App Router), TypeScript, **React 19**.
- **Styling:** Tailwind CSS v4 (or v3 if tooling prefers) + CSS variables for theming.
- **Motion (flashy but tasteful):** **Framer Motion** for page transitions and subtle section reveals; respect `prefers-reduced-motion`.
- **Carousel / slideshow:** **Embla Carousel** (lightweight, a11y-friendly) or **Swiper** (if we need more built-ins); pick one and use consistently.
- **Smooth scroll (optional):** **Lenis** — only if it does not harm accessibility; disable when `prefers-reduced-motion`.
- **Images:** `next/image` with explicit `width`/`height` or `fill` + sizes; static files from `/media/...`.
- **Content:** **MDX** (`next-mdx-remote` or `@next/mdx`) **or** Zod-validated **JSON** manifests for galleries + markdown bodies for long copy — choose one for maintainability.
- **Fonts:** `next/font` — distinctive pairing (avoid default Inter-only); e.g. a strong display + readable sans (aligned with “designer portfolio” feel).
- **Analytics:** None in v1 unless requested (privacy-friendly if added later).

---

## 3. Information architecture

Routes (match WordPress menu):

| Path | Source page |
|------|-------------|
| `/` | Home |
| `/graphic-design` | `/visual-design/` (label: Graphic Design) |
| `/printmaking` | `/printmaking/` |
| `/illustration` | `/illustration/` |
| `/about` | `/about/` |
| `/contact` | `/contact/` |

**Redirects:** `visual-design` → `graphic-design` if we want parity with old URLs (optional).

---

## 4. Content model

- **`content/site.ts`** (or YAML): site name, tagline, description, social links (Instagram, LinkedIn — **normalize one LinkedIn URL**; WordPress had inconsistent `michael-dale` vs `mike-dale`), email, Etsy, Tybee Yoga link.
- **`content/pages/*.mdx`** (or `.md`): About, Contact intro, section intros (Graphic Design, Printmaking) — paragraphs copied from WordPress.
- **`content/galleries/*.json`**: ordered lists of `{ slug, file, title?, alt, section, caption? }` where `file` is under `/media/YYYY/MM/filename`.
- **Home-only blocks:** book credit line, tiled gallery set — separate array or part of `home.json`.

Single manifest can drive both **Embla** slides and **grid** on each section page.

---

## 5. UI / UX outline

- **Shell:** Sticky header (logo/wordmark, nav, theme toggle), footer (copyright Switchback Design / Michael Dale per source text, socials).
- **Home:** Hero (portrait + name + role), short intro, social row, **slideshow** of “highlights”, book mention, link cards to sections.
- **Section pages:** H1 + intro paragraph, **full-width carousel** (keyboard + dots + optional thumbs), then **all works** in responsive grid; optional lightbox (Dialog + focus trap) for detail.
- **About / Contact:** Typography-focused layout; contact form can be **mailto-first** v1 or server action + Resend later.
- **404:** Branded minimal page.

---

## 6. Assets — download status

- **Mirror HTML:** `../mikedale-wget/mikedalestudio.wordpress.com/` (sibling to this repo).
- **Scripts:**
  - `scripts/extract-asset-urls.sh` — parses `data-orig-file` (+ favicon URL) from mirror HTML → `scripts/asset-urls.txt`.
  - `scripts/download-assets.sh` — downloads each URL to **`public/media/<YYYY>/<MM>/<file>`** (same path as WordPress uploads).
- **Current run:** **157 files**, **~274 MB**, **0 failures** (verified after fixing URL extraction).
- **Gap vs earlier estimates (~187):** some images may appear only in `src`/`srcset` without `data-orig-file`, or only on lazy-loaded fragments. **Follow-up:** add `scripts/extract-asset-urls-extra.sh` to union URLs matching `wp-content/uploads/.*\.(jpg|png|gif|webp)` in HTML attributes, diff against `asset-urls.txt`, download misses.

**Git:** `public/media/` is large — decide whether to **Git LFS**, **submodule**, or **document “run download script”** for deploy CI. PLAN recommendation: **do not commit binaries**; CI/CD runs `download-assets.sh` with mirror present or cached artifact.

---

## 7. SEO checklist

- Unique `<title>` and `meta description` per route.
- Open Graph + Twitter metadata; `og:image` per key page (hero paths).
- `sitemap.xml` + `robots.txt`.
- Clean URLs, HTTPS assumed in production.
- Structured data: `Person` (Mike Dale, Savannah/Tybee, sameAs socials).

---

## 8. Accessibility checklist

- `lang="en"` on `<html>`.
- Skip to main content link.
- Heading hierarchy one H1 per page.
- Carousel: arrow buttons with `aria-label`, `aria-roledescription="carousel"`, slide announcements for screen readers (limited use of `aria-live="polite"`).
- Focus trap only inside modals.
- Target contrast **WCAG AA** for text; test both themes.
- No essential information by color alone.

---

## 9. Implementation phases

1. **Bootstrap** — `create-next-app`, TypeScript, Tailwind, ESLint, `next-themes`, folder layout (`app/`, `content/`, `components/`).
2. **Theme + layout** — CSS variables, header/footer, responsive nav (drawer on mobile).
3. **Content files** — transcribe all WordPress text into `content/`; build Zod schemas for galleries.
4. **Gallery + carousel** — shared `GallerySection` component; wire Graphic Design / Printmaking / Illustration / Home.
5. **About, Contact, Home** — static pages from content.
6. **SEO + polish** — metadata, sitemap, robots, JSON-LD, Lighthouse pass (a11y, SEO, performance).
7. **Deploy** — Vercel or similar; env for future form API if needed.

---

## 10. Docs in this repo

| File | Purpose |
|------|---------|
| `PLAN.md` | This document (roadmap and decisions). |
| `README.md` | Quick start: clone, `pnpm i`, run asset scripts, `pnpm dev`, deploy notes. |

(Add `docs/ACCESSIBILITY.md` later if the team wants a formal VPAT-style note.)

---

## 11. Open decisions

- **LinkedIn URL:** pick canonical profile after verifying with Mike.
- **Committing `public/media`:** LFS vs CI download vs external bucket (S3/R2).
- **Contact form:** mailto-only v1 vs serverless email.
- **Lightbox:** yes/no for v1 (adds complexity but improves art viewing).

---

*Last updated: asset download verified (157 files, 0 failures).*

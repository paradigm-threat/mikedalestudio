# Mike Dale — Graphic Design + Fine Art

Next.js portfolio and resume site: graphic design, printmaking, illustration, about, and contact. See **[PLAN.md](./PLAN.md)** for product and migration notes.

## Develop

```bash
pnpm install
pnpm dev
```

## Assets

Gallery JSON is generated from the WordPress HTML mirror (optional, sibling folder):

```bash
./scripts/extract-asset-urls.sh
./scripts/download-assets.sh   # downloads into public/media/
node scripts/build-galleries.mjs
```

`public/media/` holds originals (~157 files). Regenerate `content/galleries/*.json` after re-downloading.

## Build

```bash
pnpm lint
pnpm build
pnpm start
```

## Deploy (Vercel)

1. Connect this repo to Vercel (framework: Next.js).
2. Set **Environment variable** `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://mikedalestudio.vercel.app`) so Open Graph, sitemap, and JSON-LD use the correct origin.
3. Push to `main`; Vercel builds with `pnpm build`.

---

© Content: Mike Dale / Switchback Design.

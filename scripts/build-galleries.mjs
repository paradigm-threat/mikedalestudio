/**
 * Parse WordPress mirror HTML → content/galleries/*.json
 * Run from repo root: node scripts/build-galleries.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MIRROR = path.join(ROOT, "..", "mikedale-wget", "mikedalestudio.wordpress.com");

function decodeEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/** @returns {{ src: string, title: string | null, alt: string }[]} */
function extractFromHtml(html) {
  const results = [];
  const imgRe = /<img\b[^>]*>/gi;
  let m;
  while ((m = imgRe.exec(html))) {
    const tag = m[0];
    const of = tag.match(
      /data-orig-file="https:\/\/mikedalestudio\.wordpress\.com\/wp-content\/uploads\/([^"?]+)/,
    );
    if (!of) continue;
    const rel = of[1].split("?")[0];
    const tit = tag.match(/data-image-title="([^"]*)"/);
    const rawTitle = tit ? decodeEntities(tit[1]) : null;
    const title =
      rawTitle && !/^[\dA-F-]{36}$/i.test(rawTitle.trim()) ? rawTitle.trim() : null;
    const base = path.basename(rel).replace(/\.[^.]+$/, "");
    const alt =
      title ||
      base
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    results.push({ src: `/media/${rel}`, title, alt });
  }
  /** Dedupe by src, preserve order */
  const seen = new Set();
  return results.filter((item) => {
    if (seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  });
}

const pages = [
  { key: "home", file: "index.html" },
  { key: "graphic-design", file: "visual-design/index.html" },
  { key: "printmaking", file: "printmaking/index.html" },
  { key: "illustration", file: "illustration/index.html" },
];

if (!fs.existsSync(MIRROR)) {
  console.error("Mirror not found:", MIRROR);
  process.exit(1);
}

const outDir = path.join(ROOT, "content", "galleries");
fs.mkdirSync(outDir, { recursive: true });

for (const { key, file } of pages) {
  const fp = path.join(MIRROR, file);
  if (!fs.existsSync(fp)) {
    console.warn("Skip missing:", fp);
    continue;
  }
  const html = fs.readFileSync(fp, "utf8");
  const items = extractFromHtml(html);
  fs.writeFileSync(
    path.join(outDir, `${key}.json`),
    JSON.stringify({ section: key, items }, null, 2) + "\n",
  );
  console.log(key, items.length);
}

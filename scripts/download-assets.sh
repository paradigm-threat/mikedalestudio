#!/usr/bin/env bash
# Download all URLs in asset-urls.txt into public/media/ preserving uploads path.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LIST="$ROOT/scripts/asset-urls.txt"
DEST="$ROOT/public/media"

[[ -f "$LIST" ]] || { echo "Run scripts/extract-asset-urls.sh first" >&2; exit 1; }

mkdir -p "$DEST"
ok=0
fail=0
while IFS= read -r url; do
  [[ -n "$url" ]] || continue
  rel="${url#https://mikedalestudio.wordpress.com/wp-content/uploads/}"
  dir="$DEST/$(dirname "$rel")"
  file="$DEST/$rel"
  mkdir -p "$dir"
  if [[ -f "$file" ]]; then
    ((ok++)) || true
    continue
  fi
  if curl -fsSL --connect-timeout 20 --max-time 120 "$url" -o "$file.tmp" && mv "$file.tmp" "$file"; then
    ((ok++)) || true
  else
    rm -f "$file.tmp"
    echo "FAIL: $url" >&2
    ((fail++)) || true
  fi
done <"$LIST"

echo "Done: ok=$ok fail=$fail → $DEST"

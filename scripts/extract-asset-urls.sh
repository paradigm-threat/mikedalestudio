#!/usr/bin/env bash
# Extract unique full-size media URLs from saved WordPress HTML mirrors.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MIRROR="${MIRROR:-$ROOT/../mikedale-wget/mikedalestudio.wordpress.com}"
OUT="$ROOT/scripts/asset-urls.txt"

if [[ ! -d "$MIRROR" ]]; then
  echo "Mirror not found: $MIRROR" >&2
  exit 1
fi

tmp="$(mktemp)"
# Original files from gallery blocks
rg --no-filename -o 'data-orig-file="https://mikedalestudio\.wordpress\.com/wp-content/uploads/[^"]+' "$MIRROR" --glob '*.html' 2>/dev/null \
  | sed 's/data-orig-file="//' >>"$tmp" || true
# Favicon / site icon (not always data-orig-file)
rg --no-filename -o 'https://mikedalestudio\.wordpress\.com/wp-content/uploads/2025/08/cropped-waves-small-1\.jpg[^"'\'' ]*' "$MIRROR" --glob '*.html' 2>/dev/null \
  | sed 's/?w=[0-9]*$//' | sort -u >>"$tmp" || true

# Normalize: drop query strings for dedupe; originals are without ?w=
grep -E '\.(jpg|jpeg|png|gif|webp)(\?|$)' "$tmp" | sed 's/?.*//' | sort -u >"$OUT"
rm -f "$tmp"

echo "Wrote $(wc -l <"$OUT") URLs to $OUT"

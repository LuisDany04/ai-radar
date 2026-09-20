#!/usr/bin/env bash
# Genera dist/ai-radar.html: el panel entero en un único archivo HTML,
# con el CSS, el JavaScript y todo el contenido incrustados.
# Se abre con doble clic, sin servidor y sin conexión.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

bash scripts/build.sh > /dev/null

# El inlineado rompería si algún archivo JS contuviera la cadena de cierre de script.
for f in assets/md.js assets/app.js assets/data.js; do
  if grep -q '</script' "$f"; then
    echo "ERROR: $f contiene '</script' y no se puede incrustar tal cual." >&2
    exit 1
  fi
done

mkdir -p dist
OUT="dist/ai-radar.html"

awk '
  /<link rel="stylesheet" href="assets\/styles.css">/ {
    print "<style>"
    while ((getline line < "assets/styles.css") > 0) print line
    close("assets/styles.css")
    print "</style>"
    next
  }
  /<script src="assets\// {
    if (match($0, /assets\/[a-z]+\.js/)) {
      f = substr($0, RSTART, RLENGTH)
      print "<script>"
      while ((getline line < f) > 0) print line
      close(f)
      print "</" "script>"
      next
    }
  }
  { print }
' index.html > "$OUT"

SIZE="$(du -k "$OUT" | cut -f1)"
echo "==> $OUT generado (${SIZE} KB)"
echo "    Ábrelo con doble clic: no necesita servidor ni conexión."

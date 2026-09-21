#!/usr/bin/env bash
# Genera assets/data.js (bundle que consume el panel) y content/index.json (índice legible).
# No necesita Node ni Python: solo bash, awk, base64 y sed.
#
# La validación y el índice se hacen en UNA sola pasada de awk sobre todas las fichas.
# Un bucle de bash con sustituciones por archivo tardaba más de dos minutos en Windows,
# donde lanzar procesos es caro.
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

NOW="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
TODAY="$(date -u +%Y-%m-%d)"
OUT_JS="assets/data.js"
OUT_JSON="content/index.json"

shopt -s nullglob
FILES=(content/*/*.md)
shopt -u nullglob

if [ "${#FILES[@]}" -eq 0 ]; then
  echo "No hay fichas en content/. Nada que construir."
  exit 0
fi

# ---------------------------------------------------------------------------
# Validación + índice, en una sola pasada
# ---------------------------------------------------------------------------
echo "==> Validando ${#FILES[@]} fichas"

awk -v now="$NOW" -v outjson="$OUT_JSON" '
  function esc(s,   i, c, out) {
    out = ""
    for (i = 1; i <= length(s); i++) {
      c = substr(s, i, 1)
      if (c == "\\") out = out "\\\\"
      else if (c == "\"") out = out "\\\""
      else if (c == "\t") out = out "\\t"
      else if (c == "\r") continue
      else out = out c
    }
    return out
  }
  function unquote(v) {
    if (substr(v, 1, 1) == "\"") v = substr(v, 2)
    if (substr(v, length(v), 1) == "\"") v = substr(v, 1, length(v) - 1)
    return v
  }
  function err(msg) { print "  ERROR " FILENAME ": " msg; errors++ }
  function warn(msg) { print "  AVISO " FILENAME ": " msg; warnings++ }

  BEGIN {
    split("id title track type level tags summary updated reading_minutes source_span confidence", REQ, " ")
    TRACKS = " claude-code skills mcp modelos herramientas practicas tendencias seguridad "
    TYPES  = " guia feature opinion dato comparativa ejemplo release herramienta "
    # Palabras que en español SIEMPRE llevan tilde. Sin pares ambiguos (que/qué, como/cómo).
    ACC = "configuracion|suscripcion|ejecucion|revision|documentacion|informacion|aplicacion|" \
          "integracion|automatizacion|verificacion|comparacion|evaluacion|generacion|migracion|" \
          "adopcion|codigo|analisis|metrica|linea|ingenieria|economia|energia|categoria|" \
          "compania|estandar|ademas|segun|tambien|practicamente|automaticamente"
    printf "" > outjson
    jfirst = 1
    count = 0; errors = 0; warnings = 0; orto = 0; totsrc = 0
  }

  # BEGINFILE/ENDFILE en lugar de cerrar el archivo anterior desde FNR==1:
  # así FILENAME siempre apunta al archivo que se está informando. Hacerlo de
  # la otra forma atribuía cada aviso al archivo siguiente.
  BEGINFILE {
    delete fm
    n = split(FILENAME, seg, "/")
    base = seg[n]; sub(/\.md$/, "", base)
    dir = seg[n - 1]
    inside = 0; done_fm = 0; has_src_head = 0; nsrc = 0; has_seen = 0; accwords = ""; infence = 0
    count++
  }

  FNR == 1 {
    if ($0 !~ /^---[[:space:]]*$/) err("no empieza con --- (falta frontmatter)")
    else inside = 1
    next
  }

  {
    if (inside && !done_fm) {
      if ($0 ~ /^---[[:space:]]*$/) { done_fm = 1; next }
      p = index($0, ":")
      if (p > 0) {
        k = substr($0, 1, p - 1)
        gsub(/^[[:space:]]+|[[:space:]]+$/, "", k)
        v = substr($0, p + 1)
        gsub(/^[[:space:]]+|[[:space:]]+$/, "", v)
        fm[k] = unquote(v)
      }
      next
    }
    if ($0 ~ /^##[[:space:]]+Fuentes[[:space:]]*$/) has_src_head = 1
    if ($0 ~ /^-[[:space:]]*\[.*\]\(http/) nsrc++
    if ($0 ~ /visto:[[:space:]]*[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/) has_seen = 1

    # El aviso ortográfico ignora los bloques de código: ahí el texto es código,
    # y un identificador como "codigo_fuente" no es una falta de ortografía.
    if ($0 ~ /^[[:space:]]*```/) { infence = !infence; next }
    if (infence) next
    line = tolower($0)
    gsub(/`[^`]*`/, "", line)
    while (match(line, "(^|[^a-záéíóúñ])(" ACC ")([^a-záéíóúñ]|$)")) {
      w = substr(line, RSTART, RLENGTH)
      gsub(/[^a-z]/, "", w)
      if (index(accwords, " " w " ") == 0) accwords = accwords " " w " "
      line = substr(line, RSTART + RLENGTH)
    }
  }

  function finish(   i, k, miss) {
    # Claves obligatorias
    for (i in REQ) if (!(REQ[i] in fm)) err("falta la clave obligatoria \"" REQ[i] "\"")

    if (fm["id"] != "" && fm["id"] != base) err("id \"" fm["id"] "\" != nombre de archivo \"" base "\"")
    if (fm["track"] != "" && fm["track"] != dir) err("track \"" fm["track"] "\" != carpeta \"" dir "\"")
    if (fm["track"] != "" && index(TRACKS, " " fm["track"] " ") == 0) err("track \"" fm["track"] "\" no válido")
    if (fm["type"] != "" && index(TYPES, " " fm["type"] " ") == 0) err("type \"" fm["type"] "\" no válido")
    if (fm["updated"] != "" && fm["updated"] !~ /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) err("updated \"" fm["updated"] "\" no es YYYY-MM-DD")

    if (!has_src_head) err("falta la sección \"## Fuentes\"")
    if (nsrc < 4) warn("solo " nsrc " fuentes enlazadas (el mínimo son 4)")
    if (nsrc > 0 && !has_seen) warn("ninguna fuente lleva \"visto: YYYY-MM-DD\"")
    if (length(fm["summary"]) > 300) warn("summary de " length(fm["summary"]) " caracteres (el tope son 280)")
    if (accwords != "") { print "  ORTO  " FILENAME ":" accwords; orto++; warnings++ }

    # ids duplicados
    if (fm["id"] in seenid) err("id duplicado, ya usado en " seenid[fm["id"]])
    else seenid[fm["id"]] = FILENAME

    totsrc += nsrc

    # Fila del índice
    if (jfirst) { jfirst = 0 } else { printf ",\n" >> outjson }
    printf "    {\"id\":\"%s\",\"title\":\"%s\",\"track\":\"%s\",\"type\":\"%s\",\"level\":\"%s\",\"tags\":\"%s\",\"summary\":\"%s\",\"updated\":\"%s\",\"reading_minutes\":\"%s\",\"source_span\":\"%s\",\"confidence\":\"%s\",\"sources\":%d,\"path\":\"%s\"}",
      esc(fm["id"]), esc(fm["title"]), esc(fm["track"]), esc(fm["type"]), esc(fm["level"]),
      esc(fm["tags"]), esc(fm["summary"]), esc(fm["updated"]), esc(fm["reading_minutes"]),
      esc(fm["source_span"]), esc(fm["confidence"]), nsrc, esc(FILENAME) >> outjson
  }

  ENDFILE { finish() }

  END {
    printf "\n" >> outjson
    close(outjson)
    print "    " count " fichas, " errors " errores, " warnings " avisos" > "/dev/stderr"
    if (orto > 0) print "    " orto " fichas con palabras sin tilde (aviso, no bloquea)" > "/dev/stderr"
    print count "\t" errors "\t" totsrc > "/dev/stderr"
    exit (errors > 0 ? 1 : 0)
  }
' "${FILES[@]}" 2> "$ROOT/.build-stats"

rc=$?
stats="$(tail -n 1 "$ROOT/.build-stats")"
head -n -1 "$ROOT/.build-stats"
rm -f "$ROOT/.build-stats"

COUNT="$(printf '%s' "$stats" | cut -f1)"
ERRORS="$(printf '%s' "$stats" | cut -f2)"
TOTSRC="$(printf '%s' "$stats" | cut -f3)"

if [ "$rc" -ne 0 ]; then
  echo "==> Build abortado: hay errores de validación."
  rm -f "$OUT_JSON"
  exit 1
fi

# Envolver el índice que awk dejó a medio escribir.
{
  echo "{"
  echo "  \"generated\": \"$NOW\","
  echo "  \"count\": $COUNT,"
  echo "  \"docs\": ["
  cat "$OUT_JSON"
  echo "  ]"
  echo "}"
} > "$OUT_JSON.tmp" && mv "$OUT_JSON.tmp" "$OUT_JSON"

# ---------------------------------------------------------------------------
# Bundle JS
# ---------------------------------------------------------------------------
# Cada ficha viaja en base64: así el markdown (con comillas, backticks, acentos
# y bloques de código) llega intacto sin ningún escapado frágil en bash.
echo "==> Generando $OUT_JS"
{
  echo "/* Generado por scripts/build.sh — no editar a mano. */"
  echo "window.__RADAR__ = {"
  echo "  generated: \"$NOW\","
  echo "  docs: ["
  for f in "${FILES[@]}"; do
    printf '    {"path":"%s","b64":"%s"},\n' "$f" "$(base64 -w0 "$f")"
  done
  echo "  ]"
  echo "};"
} > "$OUT_JS"

UNIQSRC="$(grep -ho '](https\?://[^)]*)' "${FILES[@]}" 2>/dev/null | sort -u | wc -l | tr -d ' ')"

echo ""
echo "==> Listo — $TODAY"
echo "    fichas:            $COUNT"
echo "    fuentes citadas:   $TOTSRC ($UNIQSRC URLs únicas)"
echo "    bundle:            $(du -k "$OUT_JS" | cut -f1) KB"
exit 0

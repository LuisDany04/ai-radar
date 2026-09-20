#!/usr/bin/env bash
# Genera assets/data.js (bundle que consume el panel) y content/index.json (índice legible).
# No necesita Node ni Python: solo bash, awk, base64 y sed.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

NOW="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
TODAY="$(date -u +%Y-%m-%d)"
OUT_JS="assets/data.js"
OUT_JSON="content/index.json"
REQUIRED="id title track type level tags summary updated reading_minutes source_span confidence"
VALID_TRACKS="claude-code skills mcp modelos herramientas practicas tendencias seguridad"
VALID_TYPES="guia feature opinion dato comparativa ejemplo release herramienta"

errors=0
warnings=0
count=0

# --- Validación -------------------------------------------------------------
echo "==> Validando fichas"
for f in content/*/*.md; do
  [ -e "$f" ] || continue
  count=$((count + 1))
  base="$(basename "$f" .md)"
  dir="$(basename "$(dirname "$f")")"

  if [ "$(head -n 1 "$f")" != "---" ]; then
    echo "  ERROR $f: no empieza con '---' (falta frontmatter)"
    errors=$((errors + 1))
    continue
  fi

  fm="$(awk 'NR==1&&/^---$/{inside=1;next} inside&&/^---$/{exit} inside{print}' "$f")"

  for key in $REQUIRED; do
    if ! printf '%s\n' "$fm" | grep -q "^${key}:"; then
      echo "  ERROR $f: falta la clave obligatoria '$key'"
      errors=$((errors + 1))
    fi
  done

  fm_id="$(printf '%s\n' "$fm" | sed -n 's/^id:[[:space:]]*//p' | head -n1 | tr -d '"'"'"'\r')"
  fm_track="$(printf '%s\n' "$fm" | sed -n 's/^track:[[:space:]]*//p' | head -n1 | tr -d '"'"'"'\r')"
  fm_type="$(printf '%s\n' "$fm" | sed -n 's/^type:[[:space:]]*//p' | head -n1 | tr -d '"'"'"'\r')"

  [ "$fm_id" = "$base" ] || { echo "  ERROR $f: id '$fm_id' != nombre de archivo '$base'"; errors=$((errors + 1)); }
  [ "$fm_track" = "$dir" ] || { echo "  ERROR $f: track '$fm_track' != carpeta '$dir'"; errors=$((errors + 1)); }

  case " $VALID_TRACKS " in *" $fm_track "*) ;; *) echo "  ERROR $f: track '$fm_track' no es válido"; errors=$((errors + 1));; esac
  case " $VALID_TYPES " in *" $fm_type "*) ;; *) echo "  ERROR $f: type '$fm_type' no es válido"; errors=$((errors + 1));; esac

  grep -q '^## Fuentes' "$f" || { echo "  ERROR $f: falta la sección '## Fuentes'"; errors=$((errors + 1)); }

  n_src="$(grep -c '^- \[.*](http' "$f" || true)"
  if [ "$n_src" -lt 4 ]; then
    echo "  AVISO $f: solo $n_src fuentes con enlace (el mínimo son 4)"
    warnings=$((warnings + 1))
  fi

  if grep -q '^- \[.*](http' "$f" && ! grep -q 'visto: [0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}' "$f"; then
    echo "  AVISO $f: ninguna fuente lleva 'visto: YYYY-MM-DD'"
    warnings=$((warnings + 1))
  fi
done

echo "    $count fichas, $errors errores, $warnings avisos"
if [ "$errors" -gt 0 ]; then
  echo "==> Build abortado por errores de validación."
  exit 1
fi

# --- Duplicados de id -------------------------------------------------------
dupes="$(for f in content/*/*.md; do [ -e "$f" ] && basename "$f" .md; done | sort | uniq -d || true)"
if [ -n "$dupes" ]; then
  echo "==> ERROR: ids duplicados:"; printf '%s\n' "$dupes"; exit 1
fi

# --- Bundle JS --------------------------------------------------------------
# Cada ficha se empaqueta en base64: así el markdown (con comillas, backticks,
# acentos y bloques de código) viaja intacto sin ningún escapado frágil en bash.
echo "==> Generando $OUT_JS"
{
  echo "/* Generado por scripts/build.sh — no editar a mano. */"
  echo "window.__RADAR__ = {"
  echo "  generated: \"$NOW\","
  echo "  docs: ["
  for f in content/*/*.md; do
    [ -e "$f" ] || continue
    printf '    {"path":"%s","b64":"%s"},\n' "$f" "$(base64 -w0 "$f")"
  done
  echo "  ]"
  echo "};"
} > "$OUT_JS"

# --- Índice JSON ------------------------------------------------------------
echo "==> Generando $OUT_JSON"
{
  echo "{"
  echo "  \"generated\": \"$NOW\","
  echo "  \"count\": $count,"
  echo "  \"docs\": ["
  first=1
  for f in content/*/*.md; do
    [ -e "$f" ] || continue
    [ $first -eq 1 ] && first=0 || echo "    ,"
    awk -v path="$f" '
      function esc(s,   i, c, out) {
        out = ""
        for (i = 1; i <= length(s); i++) {
          c = substr(s, i, 1)
          if (c == "\\") out = out "\\\\"
          else if (c == "\"") out = out "\\\""
          else if (c == "\t") out = out "\t"
          else if (c == "\r") continue
          else out = out c
        }
        return out
      }
      function val(line,   v) {
        v = line
        sub(/^[A-Za-z_]+:[ \t]*/, "", v)
        if (substr(v, 1, 1) == "\"") v = substr(v, 2)
        if (substr(v, length(v), 1) == "\"") v = substr(v, 1, length(v) - 1)
        return esc(v)
      }
      NR == 1 && /^---$/ { inside = 1; next }
      inside && /^---$/ { exit }
      inside {
        p = index($0, ":")
        if (p == 0) next
        k = substr($0, 1, p - 1)
        if (k == "id") id = val($0)
        else if (k == "title") title = val($0)
        else if (k == "track") track = val($0)
        else if (k == "type") type = val($0)
        else if (k == "level") level = val($0)
        else if (k == "tags") tags = val($0)
        else if (k == "summary") summary = val($0)
        else if (k == "updated") updated = val($0)
        else if (k == "reading_minutes") mins = val($0)
        else if (k == "source_span") span = val($0)
        else if (k == "confidence") conf = val($0)
      }
      END {
        printf "    {\"id\":\"%s\",\"title\":\"%s\",\"track\":\"%s\",\"type\":\"%s\",\"level\":\"%s\",", id, title, track, type, level
        printf "\"tags\":\"%s\",\"summary\":\"%s\",\"updated\":\"%s\",\"reading_minutes\":\"%s\",", tags, summary, updated, mins
        printf "\"source_span\":\"%s\",\"confidence\":\"%s\",\"path\":\"%s\"}\n", span, conf, path
      }
    ' "$f"
  done
  echo "  ]"
  echo "}"
} > "$OUT_JSON"

# --- Recuento de fuentes ----------------------------------------------------
total_src="$(cat content/*/*.md 2>/dev/null | grep -c '^- \[.*](http' || true)"
uniq_src="$(cat content/*/*.md 2>/dev/null | grep -o '](https\?://[^)]*)' | sort -u | wc -l | tr -d ' ')"

echo ""
echo "==> Listo — $TODAY"
echo "    fichas:            $count"
echo "    fuentes citadas:   $total_src ($uniq_src URLs únicas)"
echo "    bundle:            $(du -k "$OUT_JS" | cut -f1) KB"
[ "$warnings" -gt 0 ] && echo "    avisos:            $warnings (revisa arriba)"
exit 0

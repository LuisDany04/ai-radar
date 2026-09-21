#!/usr/bin/env bash
# Comprueba que cada URL citada en las fichas responde de verdad.
# Escribe un informe en docs/link-check.md y devuelve 1 si hay enlaces rotos.
# Requiere: bash, curl, awk, sort. Nada más.
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

TODAY="$(date -u +%Y-%m-%d)"
NOW="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36"
PAR="${PAR:-8}"
TIMEOUT="${TIMEOUT:-25}"

echo "==> Extrayendo URLs de las fichas"
grep -ho '](https\?://[^)]*)' content/*/*.md 2>/dev/null \
  | sed 's/^](//; s/)$//' \
  | sed 's/[.,;]$//' \
  | sort -u > "$TMP/urls.txt"

TOTAL="$(wc -l < "$TMP/urls.txt" | tr -d ' ')"
echo "    $TOTAL URLs únicas"
if [ "$TOTAL" -eq 0 ]; then
  echo "    Nada que comprobar."
  exit 0
fi

# Una sola comprobación, pensada para ejecutarse en paralelo vía xargs.
# Cada trabajador escribe en SU PROPIO archivo, numerado. Con ocho procesos
# haciendo append al mismo archivo se perdían resultados, y un resultado perdido
# es un enlace que nadie comprobó aunque el informe diga "0 rotas".
mkdir -p "$TMP/out"
cat > "$TMP/one.sh" <<'ONE'
#!/usr/bin/env bash
# Recibe el número de línea y la URL; el resto llega por entorno.
n="$1"; url="$2"
code=$(curl -s -o /dev/null -L --max-time "$LC_TO" --retry 1 \
         -A "$LC_UA" -H 'Accept-Language: en,es;q=0.8' \
         -w '%{http_code}' "$url" 2>/dev/null)
# Algunos sitios rechazan HEAD o bots: si falla, reintenta pidiendo solo el primer byte.
if [ -z "$code" ] || [ "$code" = "000" ] || [ "$code" = "403" ] || [ "$code" = "405" ]; then
  code2=$(curl -s -o /dev/null -L --max-time "$LC_TO" -r 0-2048 \
            -A "$LC_UA" -H 'Accept: text/html,*/*' \
            -w '%{http_code}' "$url" 2>/dev/null)
  [ -n "$code2" ] && [ "$code2" != "000" ] && code="$code2"
fi
printf '%s\t%s\n' "${code:-000}" "$url" > "$LC_DIR/$n"
ONE
chmod +x "$TMP/one.sh"

export LC_UA="$UA" LC_TO="$TIMEOUT" LC_DIR="$TMP/out"

echo "==> Comprobando (${PAR} en paralelo, timeout ${TIMEOUT}s)"
tr -d '\r' < "$TMP/urls.txt" | awk '{printf "%06d %s\n", NR, $0}' \
  | xargs -P "$PAR" -L1 "$TMP/one.sh" || true

# Respaldo secuencial: cualquier URL cuyo archivo quedara vacío se reintenta a solas.
i=0
while IFS= read -r u; do
  i=$((i + 1))
  nn="$(printf '%06d' "$i")"
  [ -s "$TMP/out/$nn" ] || "$TMP/one.sh" "$nn" "$u"
done < <(tr -d '\r' < "$TMP/urls.txt")

cat "$TMP/out"/* > "$TMP/results.tsv" 2>/dev/null
sort -k1,1 "$TMP/results.tsv" > "$TMP/sorted.tsv"

CHECKED="$(wc -l < "$TMP/sorted.tsv" | tr -d ' ')"
if [ "$CHECKED" -ne "$TOTAL" ]; then
  echo "  AVISO: se comprobaron $CHECKED de $TOTAL URLs. El informe está incompleto."
fi

ok=$(awk -F'\t' '$1 ~ /^2/' "$TMP/sorted.tsv" | wc -l | tr -d ' ')
redir=$(awk -F'\t' '$1 ~ /^3/' "$TMP/sorted.tsv" | wc -l | tr -d ' ')
notfound=$(awk -F'\t' '$1 == "404" || $1 == "410"' "$TMP/sorted.tsv" | wc -l | tr -d ' ')
forbidden=$(awk -F'\t' '$1 == "401" || $1 == "403" || $1 == "429"' "$TMP/sorted.tsv" | wc -l | tr -d ' ')
servererr=$(awk -F'\t' '$1 ~ /^5/' "$TMP/sorted.tsv" | wc -l | tr -d ' ')
unreach=$(awk -F'\t' '$1 == "000"' "$TMP/sorted.tsv" | wc -l | tr -d ' ')
# Cajón para todo lo que no encaja arriba (402, 406, 451...). Sin él, esas URLs
# desaparecían del recuento y el informe no cuadraba con el total.
otros=$(awk -F'\t' '$1 !~ /^[235]/ && $1 != "000" && $1 != "404" && $1 != "410" && $1 != "401" && $1 != "403" && $1 != "429"' "$TMP/sorted.tsv" | wc -l | tr -d ' ')
suma=$((ok + redir + notfound + forbidden + servererr + unreach + otros))

# --- Informe ---------------------------------------------------------------
mkdir -p docs
{
  echo "# Verificación de enlaces"
  echo ""
  echo "Comprobación automática de todas las URLs citadas en las fichas."
  echo "Última ejecución: **$NOW**"
  echo ""
  echo "| Resultado | URLs |"
  echo "|---|---:|"
  echo "| Responden (2xx) | $ok |"
  echo "| Redirigen (3xx sin seguir) | $redir |"
  echo "| No encontradas (404/410) | $notfound |"
  echo "| Bloquean al verificador (401/403/429) | $forbidden |"
  echo "| Error del servidor (5xx) | $servererr |"
  echo "| Sin respuesta (timeout/DNS) | $unreach |"
  echo "| Otro código (402, 406, 451...) | $otros |"
  echo "| **Total comprobado** | **$suma** de $TOTAL |"
  echo ""
  if [ "$suma" -ne "$TOTAL" ]; then
    echo "> No cuadra: $((TOTAL - suma)) URLs sin resultado. El informe está incompleto."
    echo ""
  fi

  if [ "$otros" -gt 0 ]; then
    echo "## Otros códigos"
    echo ""
    echo "Respuestas que no son ni éxito ni error claro. Suelen ser muros de pago o"
    echo "bloqueos de plataforma, no enlaces rotos, pero conviene abrirlas a mano."
    echo ""
    awk -F'\t' '$1 !~ /^[235]/ && $1 != "000" && $1 != "404" && $1 != "410" && $1 != "401" && $1 != "403" && $1 != "429" {print "- `" $1 "` " $2}' "$TMP/sorted.tsv"
    echo ""
  fi

  if [ "$notfound" -gt 0 ]; then
    echo "## Rotas — hay que corregirlas"
    echo ""
    awk -F'\t' '$1 == "404" || $1 == "410" {print "- `" $1 "` " $2}' "$TMP/sorted.tsv"
    echo ""
  fi

  if [ "$forbidden" -gt 0 ] || [ "$unreach" -gt 0 ] || [ "$servererr" -gt 0 ]; then
    echo "## No concluyentes"
    echo ""
    echo "Estas URLs no se pudieron confirmar de forma automática. Suele deberse a"
    echo "protección anti-bots o a un límite de peticiones, no a que el enlace esté roto."
    echo "Conviene abrirlas a mano antes de darlas por malas."
    echo ""
    awk -F'\t' '$1 == "401" || $1 == "403" || $1 == "429" || $1 == "000" || $1 ~ /^5/ {print "- `" $1 "` " $2}' "$TMP/sorted.tsv"
    echo ""
  fi

  echo "## Sitios más citados"
  echo ""
  echo "| Sitio | Referencias |"
  echo "|---|---:|"
  awk -F'\t' '{print $2}' "$TMP/sorted.tsv" \
    | sed 's#^https\?://##; s#/.*##; s#^www\.##' \
    | sort | uniq -c | sort -rn | head -25 \
    | awk '{printf "| %s | %s |\n", $2, $1}'
} > docs/link-check.md

# Lista de enlaces rotos aparte, para poder arreglarlos con un script.
awk -F'\t' '$1 == "404" || $1 == "410" {print $2}' "$TMP/sorted.tsv" > docs/broken-links.txt

echo ""
echo "==> Resultado ($TODAY)"
printf '    responden       %s\n' "$ok"
printf '    redirigen       %s\n' "$redir"
printf '    ROTAS           %s\n' "$notfound"
printf '    no concluyentes %s\n' "$((forbidden + unreach + servererr + otros))"
[ "$suma" -ne "$TOTAL" ] && printf '    SIN RESULTADO   %s\n' "$((TOTAL - suma))"
echo "    informe: docs/link-check.md"

if [ "$notfound" -gt 0 ]; then
  echo ""
  echo "==> Enlaces rotos encontrados:"
  cat docs/broken-links.txt
  exit 1
fi
exit 0

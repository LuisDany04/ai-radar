# AI Radar

Panel de lectura sobre IA aplicada al desarrollo de software: Claude Code, Agent Skills,
MCP, modelos, herramientas agénticas, prácticas de ingeniería, tendencias y seguridad.

**Cada afirmación con cifra, fecha, precio o versión lleva su fuente, con la fecha en que
se publicó y la fecha en que se consultó.** Las URLs se verifican automáticamente antes
de publicar.

👉 **[Abrir el panel](https://luisdany04.github.io/ai-radar/)**

---

## Qué es

Un sitio estático sin dependencias: HTML, CSS y JavaScript escritos a mano, sin build de
Node, sin framework, sin CDN. Se puede leer en tres sitios:

| Formato | Dónde | Para qué |
|---|---|---|
| Sitio web | [GitHub Pages](https://luisdany04.github.io/ai-radar/) | Lectura normal, también desde el móvil |
| Archivo único | `dist/ai-radar.html` | Offline, sin servidor, doble clic y listo |
| Markdown | `content/<tema>/*.md` | Leer en el editor, hacer grep, versionar |

### Cómo se navega

- **Panorama** — portada con las cifras del panel y por dónde empezar.
- **Ocho temas** en la columna izquierda, más filtros por formato (guía, datos, opinión,
  comparativa…) y por nivel.
- **Fuentes** — todas las referencias del panel en una tabla, ordenables por fecha de
  publicación. Sirve para ver de un vistazo qué tan fresco es el material.
- Buscador sobre el texto completo de todas las fichas.
- Atajos: `/` busca, `j` y `k` recorren la lista, `Esc` limpia.
- Marca de leída por ficha, que se guarda en el navegador.

---

## Las reglas del contenido

Están escritas en [`docs/CONTENT-SCHEMA.md`](docs/CONTENT-SCHEMA.md) y las aplica el
validador del build:

1. Ninguna afirmación con cifra, fecha, precio o versión entra sin fuente.
2. Mínimo 4 fuentes por ficha, al menos una primaria (documentación oficial, changelog,
   repositorio, anuncio del fabricante).
3. Toda fuente lleva fecha de publicación (`pub:`) y fecha de consulta (`visto:`).
4. Cuando dos fuentes se contradicen, se muestran las dos en un recuadro, en lugar de
   elegir una y callar la otra.
5. Las opiniones van atribuidas a una persona concreta con enlace. Nunca "algunos dicen".
6. Cada ficha declara su **confianza**: `alta` (fuente primaria oficial), `media` (varias
   fuentes secundarias coinciden), `baja` (fuente única o dato en disputa).

---

## Uso

No hace falta instalar nada: solo `bash`, `awk`, `curl` y `base64`, que ya vienen en
Git Bash, macOS y Linux.

```bash
bash scripts/build.sh             # valida las fichas y regenera el bundle
bash scripts/check-links.sh       # comprueba que todas las URLs responden
bash scripts/build-standalone.sh  # genera dist/ai-radar.html (archivo único offline)
```

`build.sh` **falla** si una ficha no cumple el esquema: frontmatter incompleto, `id` que
no coincide con el nombre del archivo, track inválido o sección `## Fuentes` ausente.
Así el contenido no se degrada con el tiempo.

`check-links.sh` escribe [`docs/link-check.md`](docs/link-check.md) con el resultado de
cada URL y `docs/broken-links.txt` con las rotas, si las hay.

### Añadir una ficha a mano

```bash
cp docs/plantilla.md content/practicas/mi-ficha.md
# editar, y luego:
bash scripts/build.sh
```

### Actualizar el contenido con agentes

El flujo completo con el que se generó esto está documentado en
[`docs/WORKFLOW.md`](docs/WORKFLOW.md). Dentro de Claude Code:

```
/refresh-radar modelos
```

relanza la investigación de un tema concreto respetando el esquema y la verificación.

---

## Estructura

```
index.html              panel (carga assets/)
assets/
  styles.css            estilos, tema claro y oscuro
  md.js                 renderizador de Markdown propio
  app.js                aplicación: filtros, búsqueda, rutas, lector
  data.js               GENERADO — el contenido en base64
content/
  <tema>/*.md           las fichas, una por archivo
  index.json            GENERADO — índice legible por máquinas
scripts/
  build.sh              valida + genera
  check-links.sh        verifica URLs con curl
  build-standalone.sh   empaqueta todo en un archivo
docs/
  CONTENT-SCHEMA.md     el contrato que cumple cada ficha
  WORKFLOW.md           cómo se investigó y se construyó
  link-check.md         GENERADO — informe de verificación
```

---

## Limitaciones

Esto es una foto fija. El ecosistema cambia cada semana y las fichas de **modelos,
precios y herramientas** envejecerán rápido; por eso la fecha de cada fuente está
siempre visible.

Los resúmenes son interpretaciones. Cuando algo importe de verdad, abre la fuente
original: para eso está enlazada.

La verificación de enlaces comprueba que la URL **responde**, no que siga diciendo lo
mismo que decía cuando se consultó.

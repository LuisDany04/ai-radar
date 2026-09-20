# Esquema de contenido de AI Radar

Cada ficha del panel es **un archivo Markdown** en `content/<track>/<id>.md`.
El build script (`scripts/build.sh`) lee el frontmatter con `awk` y genera el bundle.

## Reglas duras (no negociables)

1. **El frontmatter es plano.** Solo `clave: valor` en una línea. Nada de listas YAML,
   nada de anidamiento, nada de valores multilínea. Si un valor lleva `:` va entre comillas dobles.
2. **Nunca inventes una URL.** Toda URL que escribas en `## Fuentes` debe haber sido
   abierta por ti con WebFetch en esta sesión. Si no la pudiste abrir, no la cites.
3. **Toda afirmación con número, fecha, precio, versión o benchmark necesita fuente.**
   Si no encuentras fuente, no escribas la afirmación.
4. **Fechas absolutas siempre.** Nunca "la semana pasada" o "recientemente": `2026-08-14`.
5. **Citas literales**: máximo una por ficha, menos de 15 palabras, entre comillas y con atribución.
   El resto va parafraseado.
6. El cuerpo va **en español**. Los títulos de fuentes y los nombres propios de productos
   se mantienen en su idioma original.

## Frontmatter

```
---
id: claude-code-hooks
title: "Hooks: ejecutar tus propios comandos en el ciclo de vida del agente"
track: claude-code
type: guia
level: intermedio
tags: automatizacion, hooks, configuracion
summary: "Una o dos frases, máximo 280 caracteres, que se leen en la tarjeta del listado."
updated: 2026-09-19
reading_minutes: 6
source_span: 2025-06-01..2026-09-12
confidence: alta
---
```

| Campo | Obligatorio | Valores |
|---|---|---|
| `id` | sí | kebab-case, único en todo el repo, igual al nombre de archivo sin `.md` |
| `title` | sí | entre comillas dobles |
| `track` | sí | `claude-code`, `skills`, `mcp`, `modelos`, `herramientas`, `practicas`, `tendencias`, `seguridad` |
| `type` | sí | `guia`, `feature`, `opinion`, `dato`, `comparativa`, `ejemplo`, `release`, `herramienta` |
| `level` | sí | `intro`, `intermedio`, `avanzado` |
| `tags` | sí | lista separada por comas, minúsculas, sin acentos |
| `summary` | sí | entre comillas dobles, máx 280 caracteres, sin saltos de línea |
| `updated` | sí | `YYYY-MM-DD`, la fecha en que escribiste la ficha |
| `reading_minutes` | sí | entero |
| `source_span` | sí | `YYYY-MM-DD..YYYY-MM-DD`: fecha de la fuente más antigua y la más nueva |
| `confidence` | sí | `alta` (fuente primaria oficial), `media` (fuentes secundarias coincidentes), `baja` (fuente única o en disputa) |

## Cuerpo

Estructura recomendada, en este orden. Usa `##` para las secciones (el `#` del título
lo pone el panel, no lo repitas).

1. **Qué es / qué cambió** — párrafo directo.
2. **Por qué importa** — sección `## Por qué importa`.
3. **Ejemplo real** — sección `## Ejemplo` con bloque de código, comando o configuración
   que se pueda copiar y pegar. Prefiere ejemplos sacados de documentación oficial o de
   repos públicos, y di de dónde salió.
4. **Datos** — sección `## Datos` con números y su fecha. Formato de tabla cuando haya 3+ cifras.
5. **Opiniones / debate** — sección `## Debate` cuando el tema esté en disputa.
   Presenta **las dos posturas** con nombre y fuente de quien las sostiene.
6. **Cómo empezar** — sección `## Cómo empezar` con pasos accionables, cuando aplique.
7. **Fuentes** — sección `## Fuentes`, obligatoria, siempre la última.

### Formato obligatorio de `## Fuentes`

Cada fuente es un ítem de lista con este formato exacto, separado por ` — `:

```
- [Título exacto de la página](https://url.completa) — Publicador — pub: 2026-08-14 — visto: 2026-09-19
```

- `pub:` es la fecha de publicación o última actualización que declara la página.
  Si la página no declara ninguna, escribe `pub: s/f`.
- `visto:` es la fecha en que tú la abriste (hoy).
- Mínimo **4 fuentes** por ficha. Al menos **una primaria** (documentación oficial,
  repositorio, changelog, paper, post del propio fabricante).

### Marcado de incertidumbre

Cuando algo sea provisional, cámbialo o márcalo en línea:

```
> [!duda] Dos fuentes dan cifras distintas: X dice 40%, Y dice 52%. No hay dato oficial.
```

## Ejemplo mínimo completo

```markdown
---
id: ejemplo-ficha
title: "Título de la ficha"
track: practicas
type: guia
level: intro
tags: ejemplo, plantilla
summary: "Resumen corto que aparece en la tarjeta del listado."
updated: 2026-09-19
reading_minutes: 3
source_span: 2026-01-10..2026-09-01
confidence: alta
---

Párrafo de apertura que explica de qué va.

## Por qué importa

...

## Ejemplo

```bash
claude --help
```

## Fuentes

- [Título](https://ejemplo.com/pagina) — Publicador — pub: 2026-01-10 — visto: 2026-09-19
```

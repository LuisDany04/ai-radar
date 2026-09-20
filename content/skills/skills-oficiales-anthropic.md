---
id: skills-oficiales-anthropic
title: "Qué hay dentro de las skills oficiales de Anthropic y cuáles valen la pena"
track: skills
type: guia
level: intermedio
tags: agent-skills, anthropic, docx, pdf, pptx, xlsx, mcp-builder
summary: "Recorrido por las 19 skills del repositorio anthropics/skills: qué hace cada una, cuáles son licencia propietaria y cuáles Apache-2.0, y cuáles son genuinamente útiles fuera de la demo."
updated: 2026-09-20
reading_minutes: 8
source_span: 2025-10-16..2026-09-20
confidence: alta
---

El repositorio [`anthropics/skills`](https://github.com/anthropics/skills) contiene, al 20-09-2026, 19 skills organizadas en cuatro grupos: documentos, creativo/diseño, desarrollo/técnico y empresa/comunicación. El propio README aclara que la mayoría son "para demostración y fines educativos", con una excepción explícita: las cuatro skills de documentos son las que de verdad usa Claude en producción.

## Por qué importa

Este repo es la referencia canónica de "cómo escribe Anthropic sus propias skills", y mezcla dos cosas distintas que conviene no confundir: herramientas que están corriendo ahora mismo dentro de Claude.ai y la API (docx, pdf, pptx, xlsx) y ejemplos ilustrativos pensados para copiar el patrón, no necesariamente para usar tal cual.

## Ejemplo

Instalación como plugin de Claude Code, según el README oficial:

```bash
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
```

## Datos

Las 19 skills del repositorio, agrupadas como en el README oficial:

**Skills de documentos (licencia propietaria — "Proprietary. LICENSE.txt has complete terms" en su propio frontmatter; son las que potencian la creación de archivos de Claude.ai según el anuncio [Create files with Claude](https://www.anthropic.com/news/create-files)):**

| Skill | Qué hace |
|---|---|
| `docx` | Crear, leer y editar Word (.docx/.dotx): tabla de decisión entre `docx` (npm) para crear, editar XML directo para modificar, `pandoc` para leer |
| `pdf` | Extraer texto/tablas, combinar, dividir, rotar, poner marca de agua, rellenar formularios, OCR sobre PDFs |
| `pptx` | Crear y editar PowerPoint (.pptx/.potx): `pptxgenjs` para crear, edición de XML para plantillas, `markitdown` para leer |
| `xlsx` | Crear/editar Excel con fórmulas (`openpyxl`), operaciones masivas (`pandas`), lectura rápida (`markitdown`) |

**Desarrollo y técnico (licencia Apache-2.0 según el README general del repo):**

| Skill | Qué hace |
|---|---|
| `claude-api` | Referencia actualizada de la API de Claude/SDKs en 8 lenguajes; viene empaquetada por defecto con Claude Code |
| `mcp-builder` | Guía para construir servidores MCP de calidad en Python (FastMCP) o Node/TypeScript |
| `skill-creator` | Meta-skill para crear, iterar y evaluar otras skills |
| `webapp-testing` | Testear apps web locales con scripts nativos de Playwright en Python |
| `web-artifacts-builder` | Construir artifacts HTML complejos de claude.ai con React, Tailwind y shadcn/ui |

**Creativo y diseño:**

| Skill | Qué hace |
|---|---|
| `algorithmic-art` | Arte generativo con p5.js y aleatoriedad con semilla |
| `brand-guidelines` | Aplica los colores y tipografía de marca de Anthropic a un artifact |
| `canvas-design` | Diseño visual estático (.png/.pdf) a partir de una "filosofía de diseño" |
| `frontend-design` | Guía de dirección de arte para no caer en UI "genérica" |
| `theme-factory` | 10 temas preestablecidos de color/tipografía para aplicar a artifacts |

**Empresa y comunicación:**

| Skill | Qué hace |
|---|---|
| `internal-comms` | Plantillas para 3P updates, newsletters, FAQs, reportes de incidentes |
| `doc-coauthoring` | Workflow guiado de tres etapas para coescribir documentación/specs |
| `slack-gif-creator` | Genera GIFs animados dentro de los límites de tamaño de Slack |
| `academy-guide` | Recomienda cursos de Claude Academy cuando el usuario pregunta cómo usar Claude |
| `discernment-nudge` | Agrega 2-3 preguntas de verificación después de respuestas sustantivas (consejos, planes, cifras) |

Las dos últimas (`academy-guide`, `discernment-nudge`) no estaban documentadas en el anuncio original de octubre de 2025; son adiciones posteriores orientadas a moldear el comportamiento por defecto de Claude más que a dar una capacidad nueva al usuario.

## Cuáles valen la pena

- **Si vas a usar Claude para generar archivos de oficina**, `docx`/`pdf`/`pptx`/`xlsx` no son opcionales ni ejemplos: son literalmente el código en producción. Vale la pena leerlas para entender los "gotchas" de cada formato (por ejemplo, que `docx-js` no puede abrir archivos existentes).
- **`mcp-builder` y `skill-creator`** son las de mayor apalancamiento para quien construye herramientas propias: la primera resume buenas prácticas de diseño de tools para LLM, la segunda formaliza el ciclo de evaluación que describe la ficha sobre cómo escribir una skill.
- **`claude-api`** ya viene instalada por defecto en Claude Code — no hace falta ir a buscarla al repo salvo que quieras usarla en otro entorno compatible con skills.
- **`webapp-testing`** es directamente aplicable a cualquier proyecto con frontend local; usa Playwright con scripts ya escritos en vez de generar código de automatización desde cero.
- El resto (arte algorítmico, temas, GIFs de Slack, comms internas) son más demostrativas: útiles como plantilla de estructura, pero el propio README advierte que "el comportamiento real de Claude puede diferir" de lo mostrado ahí.

## Fuentes

- [anthropics/skills — README](https://github.com/anthropics/skills/blob/main/README.md) — Anthropic (GitHub) — pub: 2026-09-10 — visto: 2026-09-20
- [anthropics/skills — carpeta skills/](https://github.com/anthropics/skills/tree/main/skills) — Anthropic (GitHub) — pub: 2026-09-10 — visto: 2026-09-20
- [Agent Skills — Available Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview#available-skills) — Anthropic (Claude Platform Docs) — pub: s/f — visto: 2026-09-20
- [Claude API skill](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/claude-api-skill) — Anthropic (Claude Platform Docs) — pub: s/f — visto: 2026-09-20

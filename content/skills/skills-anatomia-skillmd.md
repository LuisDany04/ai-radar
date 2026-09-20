---
id: skills-anatomia-skillmd
title: "Anatomía de una Agent Skill: SKILL.md, frontmatter y divulgación progresiva"
track: skills
type: guia
level: intro
tags: agent-skills, skillmd, frontmatter, progressive-disclosure, anthropic
summary: "Cómo está construido un SKILL.md por dentro: los dos campos obligatorios, los tres niveles de carga progresiva y cómo decide Claude cuándo activar una skill."
updated: 2026-09-20
reading_minutes: 7
source_span: 2025-10-16..2026-09-20
confidence: alta
---

Una Agent Skill es una carpeta con un archivo `SKILL.md` obligatorio (metadatos en YAML más instrucciones en Markdown) y, opcionalmente, scripts, plantillas y documentos de referencia adicionales. Anthropic lanzó el formato el 16 de octubre de 2025 y lo publicó como estándar abierto el 18 de diciembre de 2025, bajo el nombre Agent Skills, con especificación mantenida ahora en agentskills.io.

## Por qué importa

El diseño entero gira en torno a la **divulgación progresiva**: Claude no carga todo el contenido de una skill de golpe, sino en tres niveles, para no gastar contexto en algo que quizás no necesite.

| Nivel | Cuándo se carga | Costo aproximado | Contenido |
|---|---|---|---|
| 1. Metadatos | Siempre, al arrancar la sesión | ~100 tokens por skill | `name` y `description` del frontmatter |
| 2. Instrucciones | Cuando la skill se activa | menos de 5.000 tokens recomendado | El cuerpo de SKILL.md |
| 3. Recursos y código | Solo si se referencian | cero hasta que se acceden | Archivos `.md` adicionales, scripts, plantillas |

Esto permite instalar cientos de skills sin penalidad de contexto: hasta que una se dispara, solo ocupan espacio su nombre y su descripción. El campo `description` es el que Claude compara contra la petición del usuario para decidir si activa la skill, así que tiene que decir **qué hace y cuándo usarla**, no solo lo primero.

El frontmatter solo exige dos campos:

- `name`: máximo 64 caracteres, únicamente minúsculas, números y guiones, sin empezar ni terminar en guion, sin guiones consecutivos, y debe coincidir con el nombre de la carpeta que lo contiene.
- `description`: no vacío, máximo 1.024 caracteres, sin etiquetas XML.

Campos opcionales que define la especificación: `license`, `compatibility` (requisitos de entorno, máx. 500 caracteres), `metadata` (mapa libre clave-valor) y `allowed-tools` (lista de herramientas preaprobadas, marcado como experimental).

Cuando la skill se activa, Claude usa `bash` para leer `SKILL.md` del sistema de archivos —eso es lo que mete el contenido en la ventana de contexto—. Si las instrucciones referencian otro archivo (`FORMS.md`, `reference.md`), Claude lo lee con otro comando cuando lo necesita. Si referencian un script, Claude lo ejecuta y solo la salida entra al contexto: el código del script nunca se carga.

## Ejemplo

Este es el `SKILL.md` completo y real de la skill `internal-comms`, publicada por Anthropic en su repositorio de ejemplos. Es corto a propósito: delega el detalle a archivos separados en `examples/`, siguiendo el patrón de "guía de alto nivel con referencias".

```markdown
---
name: internal-comms
description: A set of resources to help me write all kinds of internal communications, using the formats that my company likes to use. Claude should use this skill whenever asked to write some sort of internal communications (status reports, leadership updates, 3P updates, company newsletters, FAQs, incident reports, project updates, etc.).
license: Complete terms in LICENSE.txt
---

## When to use this skill
To write internal communications, use this skill for:
- 3P updates (Progress, Plans, Problems)
- Company newsletters
- FAQ responses
- Status reports
- Leadership updates
- Project updates
- Incident reports

## How to use this skill

To write any internal communication:

1. **Identify the communication type** from the request
2. **Load the appropriate guideline file** from the `examples/` directory:
    - `examples/3p-updates.md` - For Progress/Plans/Problems team updates
    - `examples/company-newsletter.md` - For company-wide newsletters
    - `examples/faq-answers.md` - For answering frequently asked questions
    - `examples/general-comms.md` - For anything else that doesn't explicitly match one of the above
3. **Follow the specific instructions** in that file for formatting, tone, and content gathering

If the communication type doesn't match any existing guideline, ask for clarification or more context about the desired format.

## Keywords
3P updates, company newsletter, company comms, weekly update, faqs, common questions, updates, internal comms
```

Fuente: [`skills/internal-comms/SKILL.md`](https://github.com/anthropics/skills/blob/main/skills/internal-comms/SKILL.md) en el repositorio `anthropics/skills`, leído el 20-09-2026.

## Datos

- SKILL.md recomendado: cuerpo bajo 500 líneas; si crece más, hay que partirlo en archivos referenciados.
- Nivel 2 (instrucciones): se recomienda mantenerlo bajo 5.000 tokens.
- Las referencias deben quedar a un solo nivel de profundidad desde SKILL.md: Claude puede leer parcialmente (`head -100`) archivos referenciados desde archivos ya referenciados, perdiendo información.
- El `name` no puede usar las palabras reservadas "anthropic" ni "claude".

## Cómo empezar

1. Crea una carpeta `mi-skill/` con un archivo `SKILL.md` dentro.
2. Escribe el frontmatter con `name` y `description` (usa el [template oficial](https://github.com/anthropics/skills/blob/main/template/SKILL.md) como punto de partida).
3. Redacta el cuerpo asumiendo que Claude ya sabe lo básico del dominio; no expliques lo obvio.
4. Si necesitas guías extensas, scripts o datos, ponlos en archivos separados (`references/`, `scripts/`, `assets/`) y enlázalos desde SKILL.md.
5. En Claude Code, guarda la carpeta en `.claude/skills/<nombre>/` (proyecto) o `~/.claude/skills/<nombre>/` (personal) y Claude la descubre sola.

## Fuentes

- [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) — Anthropic (Claude Platform Docs) — pub: s/f — visto: 2026-09-20
- [Specification](https://agentskills.io/specification) — agentskills.io — pub: s/f — visto: 2026-09-20
- [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) — Anthropic Engineering — pub: 2025-10-16 — visto: 2026-09-20
- [anthropics/skills — template/SKILL.md](https://github.com/anthropics/skills/blob/main/template/SKILL.md) — Anthropic (GitHub) — pub: 2026-09-10 — visto: 2026-09-20
- [anthropics/skills — skills/internal-comms/SKILL.md](https://github.com/anthropics/skills/blob/main/skills/internal-comms/SKILL.md) — Anthropic (GitHub) — pub: 2026-09-10 — visto: 2026-09-20

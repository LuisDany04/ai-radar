---
id: repos-preparados-para-agentes
title: "Preparar un repo para agentes: AGENTS.md, CLAUDE.md y scripts de verificación"
track: practicas
type: guia
level: intro
tags: agentsmd, claudemd, documentacion, verificacion, estructura de repos
summary: "Qué hace que un repositorio sea fácil de trabajar para un agente de código: el estándar AGENTS.md, CLAUDE.md, estructura de carpetas y checks que el agente pueda correr solo."
updated: 2026-09-21
reading_minutes: 6
source_span: 2025-11-01..2026-09-18
confidence: alta
---

Un repositorio "preparado para agentes" tiene tres piezas: un archivo de instrucciones que el agente lee al arrancar (AGENTS.md o CLAUDE.md), una estructura y documentación que un agente pueda navegar sin que alguien le explique todo por chat, y una forma de verificar el propio trabajo (tests, build, linter) sin depender de que una persona lo revise a ojo. Ninguna de las tres es nueva por separado; lo que cambió es que en 2025-2026 se consolidaron en una convención compartida entre herramientas de distintos fabricantes.

## Por qué importa

Hasta 2025 cada herramienta de código agéntico inventaba su propio archivo de contexto: `CLAUDE.md` para Claude Code, reglas propias para Cursor, otro formato para Copilot. Un mismo repo usado con varias herramientas terminaba con instrucciones duplicadas o desactualizadas en varios archivos. AGENTS.md nace como formato común: "un README para agentes", markdown plano sin campos obligatorios, pensado para que cualquier agente lo pueda leer sin parseo especial (agents.md).

La adopción práctica llegó rápido: Claude Code empezó a leer AGENTS.md de forma nativa en la versión **2.1.277** — "en un proyecto sin CLAUDE.md, Claude Code lee AGENTS.md en su lugar; se puede cambiar en 'Project instructions' dentro de `/config`" —, según el CHANGELOG de `anthropics/claude-code`, publicado el 18-09-2026. Es decir, si el repo ya tiene un CLAUDE.md, ese archivo sigue teniendo prioridad; AGENTS.md es el respaldo cuando no existe.

## Ejemplo

Ejemplo real de CLAUDE.md corto, tomado de la documentación oficial de Claude Code (sección "Write an effective CLAUDE.md"):

```markdown
# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you're done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
```

La misma guía da una tabla de qué meter y qué no meter en ese archivo — porque se carga en cada sesión, cada línea de más cuesta contexto y, si el archivo crece demasiado, el agente empieza a ignorar partes:

| Incluir | Excluir |
|---|---|
| Comandos de bash que el agente no puede adivinar | Cualquier cosa que el agente puede deducir leyendo el código |
| Reglas de estilo que difieren de lo estándar | Convenciones del lenguaje que el agente ya conoce |
| Instrucciones de testing y el test runner preferido | Documentación detallada de API (mejor enlazarla) |
| Etiqueta del repositorio (nombres de rama, convenciones de PR) | Información que cambia seguido |
| Decisiones de arquitectura propias del proyecto | Explicaciones largas o tutoriales |

Para verificación, la misma documentación recomienda darle al agente "un check que pueda correr: tests, un build, una captura para comparar", y ejemplifica cómo convertir una petición vaga en una verificable:

- Antes: *"implementa una función que valide direcciones de correo"*
- Después: *"escribe una función validateEmail. Casos de prueba: user@example.com es true, invalid es false, user@.com es false. Corre las pruebas después de implementar"*

(Anthropic, "Best practices for Claude Code", `code.claude.com/docs/en/best-practices`.)

Un ejemplo de estructura de skill reutilizable, del mismo documento, en `.claude/skills/api-conventions/SKILL.md`:

```markdown
---
name: api-conventions
description: REST API design conventions for our services
---
# API Conventions
- Use kebab-case for URL paths
- Use camelCase for JSON properties
- Always include pagination for list endpoints
- Version APIs in the URL path (/v1/, /v2/)
```

## Datos

| Dato | Cifra | Fuente |
|---|---|---|
| Repos open source que ya usan AGENTS.md | más de 60.000 | agents.md |
| Versión de Claude Code que agrega lectura nativa de AGENTS.md | 2.1.277 | CHANGELOG, anthropics/claude-code, pub: 2026-09-18 |
| Ring de AGENTS.md en el Technology Radar de Thoughtworks | Trial | Thoughtworks Technology Radar vol. 34, 11-2025 |
| Largo recomendado de CLAUDE.md para no perder adherencia a las reglas | mantenerlo corto; dividir con imports o `.claude/rules/` si crece | Anthropic, `code.claude.com/docs/en/best-practices` |

> [!duda] La cifra de "60.000+ repos" viene del propio sitio del estándar (agents.md), que no publica metodología de conteo ni fecha de corte. Es la única fuente encontrada para esa cifra: tómala como estimación del propio proyecto, no como medición independiente.

## Debate

Thoughtworks ubica AGENTS.md en el anillo **Trial** de su Technology Radar (volumen 34, noviembre de 2025) — no en "Adopt" — describiéndolo como una convención simple cuyo valor está precisamente en ser un punto de partida mínimo, no un estándar completo de context engineering. Eso implica una recomendación de "pruébalo en proyectos de menor riesgo", no de adopción generalizada inmediata.

Birgitta Böckeler (Thoughtworks), en el artículo "Harness engineering for coding agent users" publicado en martinfowler.com el 02-04-2026, separa la preparación de un repo en tres capas de "arnés" (harness): mantenibilidad (linters, type checkers, tests — la que mejor funciona hoy porque es determinista), fitness de arquitectura (funciones de fitness y pruebas de rendimiento) y comportamiento (la más débil, porque depende sobre todo de especificaciones y de tests generados por el propio agente, complementados con pruebas manuales). Su conclusión: "un buen arnés no debería necesariamente aspirar a eliminar por completo el aporte humano, sino a dirigirlo hacia donde nuestro aporte importa más" — es decir, documentar y automatizar no reemplaza el juicio humano, lo reubica.

## Cómo empezar

1. Si el repo no tiene ningún archivo de contexto para agentes, corre `/init` en Claude Code para generar un CLAUDE.md de partida basado en la estructura actual, y ajústalo después.
2. Si trabajas con más de una herramienta de código agéntico (Claude Code, Cursor, Copilot), usa AGENTS.md como archivo común; Claude Code lo lee automáticamente si no hay CLAUDE.md.
3. Para cada línea que agregues al archivo de contexto, pregúntate: "¿quitarla haría que el agente se equivocara?" Si la respuesta es no, bórrala.
4. Dale al agente al menos un check automático que pueda correr solo: una suite de tests, un build, un linter. Sin eso, la única señal de "terminé" es que el código se ve terminado, y toda la verificación recae en la persona.
5. Mueve el conocimiento que solo aplica a veces (un flujo específico, una integración puntual) a un skill en `.claude/skills/`, no al archivo de contexto que se carga siempre.
6. Revisa el archivo de contexto igual que revisas código: si el agente repite un error a pesar de tener una regla en contra, el archivo probablemente está sobrecargado y esa regla se está perdiendo en el ruido.

## Fuentes

- [AGENTS.md](https://agents.md/) — agents.md (estándar abierto) — pub: s/f — visto: 2026-09-21
- [CHANGELOG.md, versión 2.1.277](https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md) — anthropics/claude-code — pub: 2026-09-18 — visto: 2026-09-21
- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) — Anthropic — pub: s/f — visto: 2026-09-21
- [AGENTS.md](https://www.thoughtworks.com/en-us/radar/techniques/agents-md) — Thoughtworks Technology Radar, vol. 34 — pub: 2025-11-01 — visto: 2026-09-21
- [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html) — Birgitta Böckeler, martinfowler.com — pub: 2026-04-02 — visto: 2026-09-21

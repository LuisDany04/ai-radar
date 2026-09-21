---
id: skills-colecciones-comunitarias
title: "Colecciones comunitarias de skills: Superpowers y las listas grandes"
track: skills
type: guia
level: intermedio
tags: agent-skills, superpowers, comunidad, awesome-list, claude-code
summary: "Qué propone Superpowers de obra, cómo se instala en más de una decena de agentes, y el debate real sobre si las colecciones grandes de skills ayudan o degradan el resultado."
updated: 2026-09-20
reading_minutes: 7
source_span: 2025-10-09..2026-09-20
confidence: media
---

Más allá de las skills oficiales de Anthropic, el ecosistema tiene dos tipos de colecciones comunitarias muy distintas: **frameworks de metodología** (una sola visión de cómo debe trabajar el agente, empaquetada como set de skills que se disparan solas) y **listas curadas** ("awesome-lists" que catalogan cientos de skills sueltas de terceros). La más grande de la primera categoría, con enorme diferencia, es Superpowers.

## Por qué importa

Superpowers, creada por Jesse Vincent (usuario `obra`), tiene 288.923 estrellas medidas el 20-09-2026 con `gh api`: más que el propio repositorio `anthropics/claude-code` (146.807) y más que `anthropics/skills` (177.207). Es, por lejos, el proyecto de terceros más grande construido sobre el formato Agent Skills, y ya fue adoptado dentro del directorio oficial de plugins de Anthropic.

## Ejemplo

Instalación de Superpowers en Claude Code vía el marketplace oficial de Anthropic (no uno de terceros):

```bash
/plugin install superpowers@claude-plugins-official
```

O vía el marketplace propio del proyecto:

```bash
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

El propio README lista instalación equivalente para más de una decena de agentes distintos: Antigravity, Codex App, Codex CLI, Cursor, Devin CLI, Factory Droid, Gemini CLI, GitHub Copilot CLI, Grok Build CLI, Kimi Code, OpenCode, Pi, Qwen Code y Hermes Agent.

## Qué propone

Según su propio autor, Superpowers es una metodología completa de desarrollo de software para agentes de código, construida sobre un set de skills componibles. El flujo que impone, cuando detecta que el usuario está construyendo algo, es:

1. **Brainstorming**: en vez de saltar a escribir código, el agente pregunta qué se busca realmente y arma una spec en fragmentos legibles.
2. **Plan**: una vez aprobada la spec, arma un plan de implementación lo bastante detallado como para que lo pueda seguir un ingeniero junior sin contexto del proyecto y sin hábito de testear.
3. **TDD rojo/verde**: escribir un test que falla, implementar lo mínimo para que pase, seguir.
4. **Desarrollo dirigido por subagentes**: cada tarea del plan se despacha a un subagente distinto, con revisión de código antes de seguir.

## Debate

**Postura a favor (emschwartz, reseña independiente en Hacker News, 2026):** valora el enfoque estructurado; suele saltarse la revisión del plan y pasar directo a implementación porque confía en el andamiaje. `tao_oat`, en el mismo hilo, destaca la skill de brainstorming para desarrollar ideas poco definidas y la autorevisión adversarial entre subagentes para detectar problemas que se pasarían por alto.

**Postura escéptica (`d--b`, mismo hilo de Hacker News, 2026):** reporta que "Claude makes more mistakes when using superpowers than when not", aunque reconoce que podría ser su forma de usarlo más que el framework en sí, y agrega que sigue siendo el mismo modelo por debajo.

**Postura escéptica más amplia, sobre colecciones de skills en general (Kyle Redelinghuys, ksred.com, 2026-08-10):** cita un análisis de Mikhail Shcheglov que instaló las 47 skills de una colección popular (no identificada por nombre en el artículo) y las probó contra Claude Code sin skills: 40 de las 47 empeoraron el resultado. La recomendación del artículo es instalar de forma selectiva, con pocas skills públicas y el resto propias y con evaluaciones, en vez de acumular colecciones enteras.

> [!duda] El artículo de ksred.com no confirma si la colección de 47 skills evaluada por Shcheglov era Superpowers, una de las listas awesome-claude-skills, u otra distinta. La cifra de 40 de 47 empeoran no debe leerse como una medición sobre Superpowers específicamente.

## Otras colecciones grandes

Más allá de Superpowers, la otra forma de "colección comunitaria grande" son las listas curadas (no frameworks), medidas también el 20-09-2026 con `gh search repos "claude skills"`:

- **[ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)** (75.355 estrellas): catálogo curado de skills y recursos, sin metodología propia.
- **[mukul975/Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills)** (33.003 estrellas): 817+ skills de ciberseguridad mapeadas a MITRE ATT&CK, NIST CSF y otros frameworks, compatible con 20+ plataformas.

> [!duda] Pese al nombre, "Anthropic-Cybersecurity-Skills" no es un repositorio de Anthropic: lo publica un usuario individual (`mukul975`) y usa "Anthropic" en el nombre del repo, no como organización propietaria. Conviene no confundirlo con contenido oficial.

- **[alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills)** (26.160 estrellas): más de 380 skills/agentes/comandos genéricos para "8+ agentes de código".

## Cómo empezar

1. Antes de instalar una colección grande completa, lee qué skills incluye — muchas se disparan automáticamente por descripción y compiten por el mismo contexto.
2. Si solo te interesa la metodología (TDD, planning), instala Superpowers desde el marketplace oficial (`@claude-plugins-official`) para evitar forks no mantenidos.
3. Si buscas una skill puntual, las listas "awesome" son mejores como catálogo de búsqueda que como paquete para instalar entero.
4. Corre `/skill-doctor` en Claude Code (v2.1.252+) para ver qué skills instaladas realmente se están usando y cuánto contexto consumen antes de decidir qué desinstalar.

## Fuentes

- [obra/superpowers](https://github.com/obra/superpowers) — GitHub (medido con `gh api`) — pub: 2026-09-19 — visto: 2026-09-20
- [obra/superpowers — README](https://github.com/obra/superpowers/blob/main/README.md) — Jesse Vincent (GitHub) — pub: 2026-09-19 — visto: 2026-09-20
- [Superpowers: how I'm using coding agents in October 2025](https://blog.fsck.com/2025/10/09/superpowers/) — Jesse Vincent (blog personal) — pub: 2025-10-09 — visto: 2026-09-20
- [A Rave Review of Superpowers (For Claude Code) — hilo de Hacker News](https://news.ycombinator.com/item?id=47623101) — Hacker News — pub: s/f — visto: 2026-09-20
- [Best Claude Code Skills: Which Are Actually Worth It](https://www.ksred.com/best-claude-code-skills-which-ones-are-actually-worth-installing/) — Kyle Redelinghuys — pub: 2026-08-10 — visto: 2026-09-20
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) — GitHub / Anthropic (medido con `gh api`) — pub: 2026-09-18 — visto: 2026-09-20

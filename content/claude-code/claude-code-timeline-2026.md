---
id: claude-code-timeline-2026
title: "Línea de tiempo 2026: que se lanzó en Claude Code, mes a mes"
track: claude-code
type: release
level: intermedio
tags: release, changelog, historial, modelos
summary: "De la v2.0.76 a la v2.1.278: worktrees, auto mode por defecto, tres generaciones de modelos (Opus 4.6 a 5, Sonnet 5, Fable 5.1) y la fusión de slash commands con skills, con fecha y versión exactas de cada hito."
updated: 2026-09-20
reading_minutes: 9
source_span: 2026-05-06..2026-09-19
confidence: alta
---

Claude Code publicó 222 releases con tag en GitHub entre el 1 de enero y el 19 de septiembre de 2026 (conteo propio vía `gh api repos/anthropics/claude-code/releases`), casi uno cada día hábil. La mayoría son fixes menores; acá va el recorte de los hitos que cambiaron cómo se usa la herramienta, con versión y fecha reales sacadas del `CHANGELOG.md` del repo y cruzadas con el blog oficial.

## Por qué importa

Un changelog de más de 7.000 líneas es imposible de leer entero, pero también es la única fuente que no miente sobre cuándo pasó algo. Cruzarlo con las fechas de release de GitHub permite fechar con precisión de día funciones que la mayoría de las guías de terceros mencionan sin fecha.

## Ejemplo

**Enero — el salto de versión mayor.** El 7 de enero de 2026, en un solo día, Claude Code pasó de v2.0.76 a v2.1.0 y v2.1.1. La v2.1.0 sumó `/teleport` y `/remote-env`, comandos para que suscriptores de claude.ai retomen y configuren sesiones remotas desde la terminal.

**Febrero.** El 5 de febrero (v2.1.32): "Claude Opus 4.6 is now available!" en Claude Code. El 19 de febrero (v2.1.49) llegó el flag `--worktree` / `-w` para arrancar una sesión en un git worktree aislado.

**Marzo.** El 13 de marzo (v2.1.75): ventana de contexto de 1M tokens para Opus 4.6 por defecto en los planes Max, Team y Enterprise (antes requería activarla aparte).

**Abril.** El 16 de abril (v2.1.111): nivel de esfuerzo `xhigh` para Opus 4.7 (entre `high` y `max`), y auto mode disponible para suscriptores Max usando ese modelo.

**Mayo.** El 6 de mayo, Anthropic hizo el evento "Code with Claude 2026" en San Francisco; según la cobertura de InfoQ de una charla de Dickson Tsai (equipo Claude Code), se mostraron remote control ("lets a session start on one machine and continue on a phone"), un rediseño del escritorio con vistas divididas y comentarios de diff inline, auto mode como clasificador de permisos, y una herramienta para que Claude entre y salga de worktrees aislados por su cuenta. El 28 de mayo (v2.1.154) el fast mode de Opus 4.8 bajó de precio (2x la tarifa estándar por 2,5x la velocidad).

**Junio.** El 9 de junio (v2.1.170): "Introducing Claude Fable 5: a Mythos-class model". El 30 de junio (v2.1.197): "Introducing Claude Sonnet 5: now the default model in Claude Code", con ventana de contexto nativa de 1M tokens y precio promocional de $2/$10 por Mtok hasta el 31 de agosto.

**Julio.** El 2 de julio (v2.1.199): los slash commands personalizados se fusionan formalmente con skills (ver ficha de skills y comandos de este mismo track).

**Agosto.** El 4 de agosto (v2.1.219): Opus 5 pasa a ser el modelo Opus por defecto, con 1M de contexto y fast mode a $10/$50 por Mtok. El 7 de agosto, el blog oficial anunció que auto mode sería el modo por defecto para sesiones nuevas en Pro, Max y Team a partir del 14 de agosto — con datos propios de Anthropic respaldando la decisión (ver Datos).

**Septiembre.** El 1 de septiembre (v2.1.257): Fable 5.1 pasa a ser el modelo Fable por defecto, también con 1M de contexto. El 18 de septiembre (v2.1.277): Claude Code por fin lee `AGENTS.md` directamente cuando no hay `CLAUDE.md` en el proyecto. El 19 de septiembre (v2.1.278), la versión más reciente al cierre de esta ficha: el clasificador de auto mode pasa a correr del lado del servidor por defecto para usuarios de la API de Claude y Enterprise.

## Datos

| Mes 2026 | Versión | Hito |
|---|---|---|
| 7 ene | v2.1.0 / v2.1.1 | Salto de versión mayor 2.0→2.1; `/teleport`, `/remote-env` |
| 5 feb | v2.1.32 | Opus 4.6 disponible |
| 19 feb | v2.1.49 | Flag `--worktree` / `-w` |
| 13 mar | v2.1.75 | 1M de contexto por defecto (Opus 4.6, Max/Team/Enterprise) |
| 16 abr | v2.1.111 | Esfuerzo `xhigh` en Opus 4.7 |
| 6 may | — (evento) | "Code with Claude 2026", San Francisco |
| 9 jun | v2.1.170 | Fable 5 ("Mythos-class") |
| 30 jun | v2.1.197 | Sonnet 5, modelo por defecto en Claude Code |
| 2 jul | v2.1.199 | Slash commands se fusionan con skills |
| 4 ago | v2.1.219 | Opus 5, modelo Opus por defecto |
| 14 ago | — (cambio de default anunciado el 7 ago) | Auto mode pasa a ser el modo por defecto en Pro/Max/Team |
| 1 sep | v2.1.257 | Fable 5.1, modelo Fable por defecto |
| 18 sep | v2.1.277 | Lectura directa de AGENTS.md |

Datos que Anthropic publicó para justificar el cambio a auto mode por defecto (`claude.com/blog/auto-mode-default-in-claude-code`, 7 de agosto de 2026): en pruebas controladas con 1.053 evaluadores pagos, los revisores humanos detectaron solo el 13,6% de comandos peligrosos mientras que el clasificador de auto mode bloqueó el 89%; auto mode bloqueó 800 comandos que los humanos habían aprobado, contra solo 6 que auto mode dejó pasar y los humanos no. Los usuarios de auto mode generaron, según el mismo post, un 25% más de pull requests.

> [!duda] El changelog menciona "Mythos 5" como nombre de modelo en una sola línea (junto a Opus 4.8, Sonnet 5 y Fable 5, como modelos donde ciertas herramientas de tareas están deshabilitadas por defecto), pero no encontramos un anuncio propio tipo "Introducing Claude Mythos 5" ni una fecha de lanzamiento — solo confirmamos que "Mythos" es una clase/tier de modelo ("Mythos-class") a la que pertenece Fable 5, según el propio anuncio de Fable 5. No pudimos verificar si Mythos 5 es un modelo distinto ya lanzado, uno interno, o el nombre de la clase mal usado como nombre de modelo en esa línea puntual del changelog.

## Cómo empezar

1. Si no actualizas seguido, al menos revisa los releases marcados "Introducing Claude..." en el CHANGELOG — son los que cambian qué modelo corre por defecto y a qué precio.
2. `claude --version` te dice dónde estás parado; compara contra la tabla de arriba para saber qué te estás perdiendo.
3. Para no perderte el próximo cambio de default (modelo o modo), mira `claude.com/blog` una vez por mes en vez de leer el changelog entero.

## Fuentes

- [CHANGELOG.md — anthropics/claude-code](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) — Anthropic (GitHub) — pub: 2026-09-19 — visto: 2026-09-20
- [Releases — anthropics/claude-code](https://github.com/anthropics/claude-code/releases) — Anthropic (GitHub) — pub: 2026-09-19 — visto: 2026-09-20
- [Auto mode is now the default in Claude Code for Pro, Max, and Team plans](https://claude.com/blog/auto-mode-default-in-claude-code) — Anthropic — pub: 2026-08-07 — visto: 2026-09-20
- [Code with Claude San Francisco](https://claude.com/code-with-claude/san-francisco) — Anthropic — pub: 2026-05-06 — visto: 2026-09-20
- [Anthropic's Code with Claude Announces Managed Agents, Proactive Workflows, Capability Curve](https://www.infoq.com/news/2026/05/code-with-claude/) — InfoQ (Andrew Hoblitzell) — pub: 2026-05-18 — visto: 2026-09-20

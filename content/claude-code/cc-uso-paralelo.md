---
id: cc-uso-paralelo
title: "Trabajar en paralelo con Claude Code: worktrees, sesiones multiples y agentes en background"
track: claude-code
type: guia
level: avanzado
tags: worktrees, paralelismo, subagentes, productividad
summary: "Git worktrees permite correr varias sesiones de Claude Code sin que se pisen los archivos. Los comandos reales y por que algunos desarrolladores con experiencia han dejado de usarlos."
updated: 2026-09-20
reading_minutes: 7
source_span: 2025-07-30..2025-10-30
confidence: media
---

Un git worktree es un directorio de trabajo separado con su propia rama, que comparte el historial y el remoto del repositorio principal. Claude Code lo usa como mecanismo de aislamiento: cada sesión en su propio worktree significa que las ediciones de una sesión nunca tocan los archivos de otra, así que una sesión puede construir una función mientras otra arregla un bug.

## Por qué importa

Cuando Claude genera subagentes de forma normal, todos comparten un mismo directorio de trabajo, así que dos agentes editando el mismo archivo pueden chocar. Con aislamiento por worktree, cada subagente recibe una copia fresca del repositorio: editan de forma independiente y el desarrollador revisa los resultados después. Esto es distinto de usar solo subagentes (que dividen trabajo dentro de una sesión) o mensajería entre sesiones (que deja que sesiones en distintos worktrees se pasen hallazgos entre sí).

## Ejemplo

Comandos documentados por Anthropic para crear y usar worktrees:

```bash
# Crear un worktree aislado y arrancar Claude ahí
claude --worktree feature-auth

# Crear un worktree a partir de un pull request existente
claude --worktree "#1234"

# Ver los worktrees activos
git worktree list

# Eliminar uno cuando termines
git worktree remove ../project-feature-a
```

Para que un subagente definido en `.claude/agents/` siempre corra en su propio worktree, se añade `isolation: worktree` a su frontmatter:

```markdown
---
name: refactorer
description: Applies mechanical refactors across many files
isolation: worktree
---
Apply the requested refactor across every affected file, then run
the tests and report the results.
```

Para migraciones grandes, Anthropic documenta el comando `/batch <instruction>`, que reparte el cambio entre 5 y 30 subagentes, cada uno en su propio worktree y abriendo su propio pull request.

## Datos

Correr trabajo en paralelo no es gratis en tokens. Según la documentación oficial de costes de Claude Code, los "agent teams" (equipos de agentes coordinados) consumen aproximadamente 7 veces más tokens que una sesión estándar cuando los miembros del equipo trabajan en plan mode, porque cada uno mantiene su propia ventana de contexto como una instancia separada de Claude.

## Debate

¿Vale la pena la sobrecarga de gestionar sesiones paralelas? Gergely Orosz documentó en su newsletter (2025-10-30) que un ingeniero de Anthropic, Sid Bidasaria, reporta más productividad corriendo agentes en paralelo, y que Simon Willison, inicialmente escéptico, terminó adoptando el enfoque para tareas de investigación y mantenimiento que no añaden mucha carga cognitiva al trabajo principal. Pero el propio Armin Ronacher, creador de Flask, le puso un límite en esa misma pieza: "It's only so much my mind can review!" — para él el cuello de botella sigue siendo revisar lo que el agente produjo, sin importar cuánto se paralelice la generación.

Orosz añade que quienes mejor aprovechan este flujo son ingenieros senior que ya sabían gestionar varios frentes de trabajo, revisar código en distintas áreas y comunicarse por escrito; el paralelismo no sustituye esas habilidades, las exige más.

El propio Ronacher, en su lista de cosas que no le funcionaron (2025-07-30), incluye los sub-agentes y tareas de investigación delegadas: resultados mixtos, y advierte que la gestión de contexto sigue siendo un problema real en ese modo de trabajo.

## Cómo empezar

- Usa `claude --worktree <nombre>` para features independientes que no quieres que choquen con tu checkout principal.
- Añade `.claude/worktrees/` a tu `.gitignore`.
- Si usas archivos con secretos (`.env`) fuera de git, crea un `.worktreeinclude` para copiarlos a cada worktree nuevo.
- Para revisión de calidad, prueba el patrón Writer/Reviewer: una sesión implementa, otra sesión en contexto limpio revisa el diff sin el sesgo de haber escrito el código.
- No asumas que paralelizar la escritura paraleliza también la revisión: sigue siendo tu cuello de botella.

## Fuentes

- [Run parallel sessions with worktrees](https://code.claude.com/docs/en/worktrees) — Anthropic — pub: s/f — visto: 2026-09-20
- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) — Anthropic — pub: s/f — visto: 2026-09-20
- [Manage costs effectively](https://code.claude.com/docs/en/costs) — Anthropic — pub: s/f — visto: 2026-09-20
- [New trend: programming by kicking off parallel AI agents](https://blog.pragmaticengineer.com/new-trend-programming-by-kicking-off-parallel-ai-agents/) — Gergely Orosz — pub: 2025-10-30 — visto: 2026-09-20
- [Agentic Coding Things That Didn't Work](https://lucumr.pocoo.org/2025/7/30/things-that-didnt-work/) — Armin Ronacher (lucumr) — pub: 2025-07-30 — visto: 2026-09-20

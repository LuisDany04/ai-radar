---
id: claude-code-subagentes
title: "Subagentes en Claude Code: cuando delegar y cuando no"
track: claude-code
type: guia
level: avanzado
tags: subagentes, agentes, contexto, orquestacion
summary: "Los subagentes corren en su propia ventana de contexto con prompt, herramientas y permisos propios. Sirven para aislar trabajo ruidoso, pero tienen costos reales de latencia y tokens que la comunidad no siempre tiene en cuenta."
updated: 2026-09-20
reading_minutes: 8
source_span: 2025-08-03..2026-09-18
confidence: alta
---

Un subagente es una instancia de Claude que corre en su propia ventana de contexto, con su propio system prompt, su propio set de herramientas permitidas y sus propios permisos, y que le devuelve un resumen a la conversación principal en vez de contaminarla con todo lo que investigó por el camino.

## Por qué importa

El motivo real para usar subagentes no es "paralelismo" en abstracto: es que el contexto de la conversación principal es un recurso escaso y cada archivo leído, cada log revisado, cada búsqueda fallida se queda ahí ocupando espacio y compitiendo con las instrucciones importantes. Un subagente absorbe ese ruido y solo entrega la conclusión.

## Ejemplo

Definición de un subagente de solo lectura, con frontmatter YAML, guardado en `.claude/agents/` (proyecto) o `~/.claude/agents/` (usuario), según la referencia oficial (`code.claude.com/docs/en/sub-agents`, actualizada 2026-09-18):

```markdown
---
name: restricted-researcher
description: Investiga temas especificos manteniendo lecturas seguras
tools: Read, Grep, Glob, WebFetch
disallowedTools: Write, Edit, Bash
model: sonnet
---

Sos un especialista en investigacion de codigo que hace busquedas
exhaustivas y analisis sin realizar cambios. Nunca edites archivos.
```

Campos de frontmatter reales confirmados en la documentación (hay más de veinte; los más usados): `name` y `description` son obligatorios; `tools` / `disallowedTools` controlan el acceso a herramientas; `model` acepta `sonnet`, `opus`, `haiku`, `fable`, un ID completo o `inherit`; `isolation: worktree` le da al subagente una copia aislada del repo en un git worktree que se limpia solo si no hizo cambios; `memory: user|project|local` habilita aprendizaje entre sesiones; `skills` precarga el contenido completo de skills en su contexto inicial.

## Datos

| Dato | Valor | Fuente |
|---|---|---|
| Señal que la propia Anthropic da para delegar a un subagente | explorar 10+ archivos, o 3+ piezas de trabajo independientes | claude.com/blog/subagents-in-claude-code, 2026-04-07 |
| Qué NO ve un subagente que no es fork al arrancar | historial de la conversación principal, skills ya invocados, archivos ya leídos | code.claude.com/docs/en/sub-agents, 2026-09-18 |
| Versión mínima para que `omitClaudeMd` funcione en subagentes | v2.1.271 | code.claude.com/docs/en/sub-agents, 2026-09-18 |
| Versión mínima para elegir TTL de cache de prompt por subagente (`experimental.cacheTtl`) | v2.1.248 | code.claude.com/docs/en/sub-agents, 2026-09-18 |

## Debate

**A favor (postura mayoritaria en blogs técnicos de 2026):** el consenso que resume el sitio Vibecoding en su guía de subagentes de 2026 es que, para la mayoría de tareas de desarrollo, "subagents are the right answer — they are stable, well-understood, and the isolation model maps cleanly onto how engineers already think about task decomposition". Karen Spinner, en un post de Substack del 1 de febrero de 2026, cuenta un proyecto real armado con subagentes en paralelo ("Total project runtime? About 10 minutes from start to working extension"), aunque reconoce fricciones: "Sometimes one agent couldn't access files that another agent had created. This required some manual intervention to grant permissions", y remata: "Claude subagents aren't magic. They won't turn bad ideas into good products, and they still make mistakes."

**En contra / escéptica:** un desarrollador que documenta sus primeros pasos con subagentes en Claude Code escribe, medio en broma pero en serio, "I feel like Subagents were created... just to consume more $ tokens from us haha", y aclara que no todas las tareas los necesitan — usarlos en trabajo trivial solo quema tokens sin beneficio. La propia documentación oficial de Anthropic valida parte de esa preocupación sin la ironía: advierte explícitamente que "Running many subagents that each return detailed results can consume significant context" y que un subagente que no es fork "starts fresh and may need time to gather context", es decir, hay un costo real de latencia y tokens que hay que justificar tarea por tarea.

## Cómo empezar

1. Pedile a Claude en lenguaje natural que cree el subagente: "Creá un subagente de solo lectura en `~/.claude/agents/` para revisar código, usando Sonnet."
2. O escribí el archivo `.md` a mano en `.claude/agents/` (proyecto, versionable) o `~/.claude/agents/` (personal).
3. Restringí `tools` al mínimo necesario — es la forma más simple de evitar que un subagente de investigación termine editando archivos.
4. Invocalo con @-mención (`@"nombre-agente (agent)"`) para garantizar que se ejecute, en vez de dejar que Claude decida solo.
5. Si la tarea necesita ida y vuelta iterativa o comparte contexto entre fases, quedate en la conversación principal: ahí los subagentes agregan latencia sin beneficio.

## Fuentes

- [Create custom subagents](https://code.claude.com/docs/en/sub-agents) — Anthropic — pub: 2026-09-18 — visto: 2026-09-20
- [How and when to use subagents in Claude Code](https://claude.com/blog/subagents-in-claude-code) — Anthropic (blog oficial) — pub: 2026-04-07 — visto: 2026-09-20
- [Claude Code subagents explained](https://aiblewmymind.substack.com/p/claude-code-subagents-explained) — Karen Spinner (Substack) — pub: 2026-02-01 — visto: 2026-09-20
- [[VC-01] First Steps Using Sub-agents in Claude Code](https://faafospecialist.substack.com/p/vb-01-first-steps-using-sub-agents) — Substack (autoría independiente) — pub: 2025-08-03 — visto: 2026-09-20

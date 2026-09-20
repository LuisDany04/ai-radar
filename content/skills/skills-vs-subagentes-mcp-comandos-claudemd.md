---
id: skills-vs-subagentes-mcp-comandos-claudemd
title: "Skills vs subagentes vs MCP vs slash commands vs CLAUDE.md: cuándo usar cada cosa"
track: skills
type: comparativa
level: intermedio
tags: agent-skills, subagentes, mcp, slash-commands, claudemd, claude-code
summary: "Tabla de decisión oficial para elegir entre CLAUDE.md, skills, subagentes, MCP, hooks y comandos, más el debate real sobre cuánto contexto cuesta cada uno."
updated: 2026-09-20
reading_minutes: 8
source_span: 2025-10-16..2026-09-20
confidence: alta
---

Claude Code ofrece al menos seis mecanismos para extender su comportamiento: CLAUDE.md, skills, subagentes, MCP, hooks y (ya fusionados dentro de skills) los slash commands clásicos. La documentación oficial de Claude Code publicó en 2026 una guía dedicada solo a distinguirlos, porque las confusiones entre ellos son el error de configuración más común.

## Por qué importa

Elegir el mecanismo equivocado tiene un costo real: CLAUDE.md se carga entero en cada sesión (costo de contexto en cada request), una skill mal usada como subagente pierde el historial de la conversación, y un hook mal usado como skill deja de ser determinista. La propia documentación resume la regla de oro: **CLAUDE.md es lo que Claude debe saber siempre; una skill es lo que Claude necesita a veces; un subagente es para aislar trabajo ruidoso del contexto principal; MCP es para conectar con sistemas externos; un hook es para lo que debe pasar sí o sí, sin que el modelo decida.**

## Ejemplo

Tabla comparativa tomada de la guía oficial "Extend Claude Code":

| Función | Qué hace | Cuándo usarla | Ejemplo |
|---|---|---|---|
| **CLAUDE.md** | Contexto persistente cargado cada conversación | Convenciones del proyecto, reglas "siempre haz X" | "Usa pnpm, no npm. Corre los tests antes de commitear." |
| **Skill** | Instrucciones, conocimiento y workflows que Claude puede usar | Contenido reusable, docs de referencia, tareas repetibles | `/deploy` corre tu checklist de despliegue |
| **Subagente** | Contexto de ejecución aislado que devuelve un resumen | Aislar contexto, trabajo en paralelo, workers especializados | Una tarea de research que lee muchos archivos pero solo devuelve hallazgos clave |
| **MCP** | Conecta con servicios externos | Datos o acciones externas | Consultar tu base de datos, postear en Slack, controlar un navegador |
| **Hook** | Script, request HTTP, tool call de MCP, prompt o subagente disparado por un evento | Automatización que debe correr en cada evento que aplica | Correr ESLint después de cada edición de archivo |

Guía de cuándo agregar cada extensión, según el mismo documento:

| Disparador | Qué agregar |
|---|---|
| Claude se equivoca dos veces con una convención o comando | Agrégalo a CLAUDE.md |
| Sigues escribiendo el mismo prompt para empezar una tarea | Guárdalo como skill invocable por ti |
| Pegaste el mismo procedimiento de varios pasos en el chat por tercera vez | Conviértelo en skill |
| Sigues copiando datos de una pestaña del navegador que Claude no puede ver | Conecta ese sistema como servidor MCP |
| Una tarea secundaria inunda tu conversación con output que no vas a volver a usar | Enrútala por un subagente |
| Quieres que algo pase siempre, sin que nadie lo pida | Escribe un hook |
| Un segundo repositorio necesita la misma configuración | Empaquétalo como plugin |

## Datos

- Costo de contexto por función, según la misma guía: CLAUDE.md se carga completo en cada request; las skills cargan solo su descripción al inicio (~100 tokens) y el cuerpo completo cuando se usan; los servidores MCP cargan nombres de herramientas al inicio y esquemas completos solo bajo demanda; los subagentes usan una ventana de contexto aislada; los hooks no cargan nada salvo que devuelvan texto.
- Regla práctica publicada: mantener CLAUDE.md bajo 200 líneas y el cuerpo de un SKILL.md bajo 500 líneas.
- Jerarquía de resolución cuando dos definiciones comparten nombre: para skills y subagentes, "managed > user > project" (skills) o "managed > CLI > project > user > plugin" (subagentes); los servidores MCP resuelven "local > project > user"; los hooks de distintos orígenes simplemente se acumulan.

## Debate

**Postura 1 — Anthropic (docs oficiales, 2026-06-18):** las seis herramientas son complementarias y cada una resuelve un problema distinto; combinarlas es lo esperado: CLAUDE.md para contexto siempre activo, skills para conocimiento bajo demanda, MCP para conexiones externas, subagentes para aislamiento y hooks para automatización. El blog oficial insiste en que una instrucción como no editar un archivo `.env`, puesta en CLAUDE.md o en una skill, es un pedido y no una garantía: si algo debe cumplirse siempre, va en un hook, no en un prompt.

**Postura 2 — Práctica de la comunidad (múltiples fuentes técnicas, 2026):** el eje real de decisión entre Skills y MCP no es conceptual sino de **volatilidad de los datos**: si la información cambia entre invocaciones (una API en vivo, una base de datos), es MCP; si se mantiene estable durante semanas (un checklist, un estilo de commit), es una skill. Esta lectura, repetida por varias fuentes técnicas de comparación en 2026, es más operativa que la distinción oficial de "acceso vs. conocimiento" y ayuda quien no tiene claro dónde trazar la línea en casos ambiguos.

> [!duda] La documentación oficial de Claude Code no da un axioma único de decisión Skill-vs-MCP más allá de "MCP conecta, Skills enseñan"; la heurística de "datos que cambian = MCP, datos estables = Skill" viene de análisis independientes de terceros, no de Anthropic.

## Cómo empezar

1. Si es una regla que Claude debe cumplir en cada sesión sin excepción de contenido (convención, comando de build): CLAUDE.md.
2. Si es un procedimiento que se repite pero no hace falta tenerlo siempre en contexto: skill.
3. Si la tarea genera mucho ruido (logs, resultados de búsqueda) que no necesitas ver en la conversación principal: subagente.
4. Si necesitas que Claude hable con un sistema externo (Slack, una base de datos, un navegador): MCP.
5. Si algo debe pasar siempre y no puede depender del criterio del modelo: hook.
6. Si vas a repetir la misma combinación de skills, hooks, subagentes y MCP en otro repositorio: empaquétalo como plugin.

## Fuentes

- [Extend Claude Code](https://code.claude.com/docs/en/features-overview) — Anthropic (Claude Code Docs) — pub: s/f — visto: 2026-09-20
- [Using Skills in Claude Code](https://code.claude.com/docs/en/skills) — Anthropic (Claude Code Docs) — pub: s/f — visto: 2026-09-20
- [Subagents in Claude Code](https://code.claude.com/docs/en/sub-agents) — Anthropic (Claude Code Docs) — pub: s/f — visto: 2026-09-20
- [Slash Commands in Claude Code](https://code.claude.com/docs/en/slash-commands) — Anthropic (Claude Code Docs) — pub: s/f — visto: 2026-09-20
- [How Claude remembers your project](https://code.claude.com/docs/en/memory) — Anthropic (Claude Code Docs) — pub: s/f — visto: 2026-09-20
- [MCP in Claude Code](https://code.claude.com/docs/en/mcp) — Anthropic (Claude Code Docs) — pub: s/f — visto: 2026-09-20
- [Steering Claude Code: when to use CLAUDE.md, skills, hooks, rules, subagents and more](https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more) — Claude (blog oficial) — pub: 2026-06-18 — visto: 2026-09-20

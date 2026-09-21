---
id: mcp-debate-alternativas
title: "¿MCP se queda sin tokens? El debate sobre ejecutar código en vez de llamar herramientas"
track: mcp
type: opinion
level: avanzado
tags: mcp, tokens, ejecucion-de-codigo, skills, contexto
summary: "Cargar las definiciones de todas las herramientas MCP por adelantado puede costar decenas de miles de tokens. Tres respuestas en disputa: ejecutar código en vez de MCP directo, buscar herramientas bajo demanda, o usar Skills."
updated: 2026-09-21
reading_minutes: 8
source_span: 2025-09-26..2026-03-05
confidence: alta
---

Conectar varios servidores MCP a un agente tiene un costo que no se ve hasta que se mide:
cada herramienta expone su nombre, descripción y esquema de parámetros, y todo eso entra
al contexto del modelo **antes** de que el agente haga nada. Anthropic reportó
internamente que, sin optimizar, las definiciones de herramientas les consumían **134.000
tokens**; un usuario con siete o más servidores MCP conectados puede gastar unos
**67.000 tokens** antes de escribir el primer mensaje.

## Por qué importa

Si el costo de "tener las herramientas disponibles" compite con el espacio para el
trabajo real, conectar más servidores deja de ser gratis. Esto disparó, entre
septiembre de 2025 y enero de 2026, propuestas distintas y no siempre compatibles sobre
qué hacer al respecto — no hay consenso todavía sobre cuál es la solución "correcta".

## Datos

| Medición | Cifra | Fuente / fecha |
|---|---|---|
| Definiciones de tools sin optimizar, uso interno de Anthropic | 134.000 tokens | Anthropic, 2025-11-24 |
| Setup con 5 servidores MCP, antes de empezar la conversación | ~55.000 tokens | Anthropic, 2025-11-24 |
| Servidor MCP de GitHub por sí solo | ~26.000 tokens | Anthropic, 2025-11-24 |
| Ejemplo Google Drive → Salesforce: llamadas directas vs. código ejecutado | 150.000 → 2.000 tokens (-98,7%) | Anthropic, 2025-11-25 |
| Cloudflare "Code Mode": tareas complejas por lotes, tokens usados | -81% | Cloudflare, 2025-09-26 |
| Cloudflare "Code Mode": tareas simples, tokens usados | -32% | Cloudflare, 2025-09-26 |
| MCP Tool Search en Claude Code (búsqueda bajo demanda vs. carga completa) | -85% de tokens | Anthropic (Thariq Shihipar), anuncio de enero de 2026 |

## Debate

**Postura 1 — reemplazar la llamada directa a herramientas por código generado.**
Anthropic propuso, en su propio blog de ingeniería (2025-11-04), convertir cada
herramienta MCP en un archivo de código (TypeScript) que el agente invoca escribiendo un
script, en vez de recibir el esquema completo en el prompt: el archivo "no consume
tokens porque es un archivo en disco", y los resultados intermedios se procesan en un
entorno aislado antes de volver al modelo. Cloudflare llegó a una conclusión similar por
su cuenta un mes y medio antes con "Code Mode" (2025-09-26), resumida en su propia frase:
**"LLMs are better at writing code to call MCP, than at calling MCP directly"**. El
desarrollador y comentarista Simon Willison respaldó el enfoque de Anthropic el mismo día
de su publicación: "This all looks very solid to me! I think it's a sensible way to take
advantage of the strengths of coding agents and address some of the major drawbacks of
MCP" — aunque señaló que Anthropic "outline the proposal in some detail but provide no
code to execute on it" (simonwillison.net, 2025-11-04). Willison venía de una postura más
escéptica: dijo haber dejado de usar MCP con agentes de código porque el "context
pollution" no le compensaba, prefiriendo utilidades de CLI y librerías como Playwright
Python.

**Postura 2 — no reemplazar MCP, arreglar cómo se cargan sus definiciones.**
Anthropic, semanas después de su propio post sobre ejecución de código, lanzó una
solución distinta que mantiene el protocolo intacto: "Tool Search", que activa
automáticamente una búsqueda bajo demanda cuando las descripciones de herramientas
superarían el 10% de la ventana de contexto, en vez de cargarlas todas de entrada
(Anthropic, "Introducing advanced tool use on the Claude Developer Platform",
2025-11-24). Esta misma mecánica llegó a Claude Code en enero de 2026, anunciada por
Thariq Shihipar, del equipo de Claude Code en Anthropic: "MCP servers may have up to 50+
tools and take up a large amount of context" (citado en tessl.io, 2026-02-09). Es, en los
hechos, una respuesta a la misma medición que Postura 1, pero sin abandonar la llamada
directa a herramientas ni introducir un entorno de ejecución de código adicional.

Ninguna de las dos fuentes enmarca esto como una disputa directa entre bandos — ambas son
del mismo fabricante (Anthropic) publicadas con un mes de diferencia — pero representan
caminos técnicos distintos para el mismo problema, y un servidor MCP o un cliente no
puede beneficiarse de ambos automáticamente: adoptar "ejecución de código" implica correr
un sandbox adicional; adoptar "tool search" implica que el cliente soporte esa función
específica.

> [!duda] No hay una comparación directa y oficial entre "ejecutar código" (-98,7% en el
> ejemplo de Anthropic) y "tool search" (-85%) sobre el mismo caso de uso — son ejemplos
> distintos (transferencia de datos entre apps vs. carga de definiciones), así que no se
> puede concluir cuál de las dos técnicas ahorra más en términos absolutos.

**Una tercera vía, no directamente competidora: Agent Skills.** Anthropic lanzó Agent
Skills en octubre de 2025 como "conocimiento procedimental" empaquetado en carpetas
(`SKILL.md` más scripts y recursos) que el agente carga solo cuando hace falta
("Equipping agents for the real world with Agent Skills", 2025-10-16). La postura oficial
de Anthropic es que Skills y MCP son complementarios, no alternativas: **"MCP connects
Claude to data; Skills teach Claude what to do with that data"** (claude.com/blog,
2026-03-05). Aun así, en la práctica compiten por el mismo presupuesto de contexto y por
la atención de quien diseña el agente: cada Skill o servidor adicional es una decisión de
"¿esto necesita ser una conexión MCP, una Skill, o simplemente código?".

## Cómo empezar

- Antes de conectar un servidor MCP nuevo, mide cuánto contexto agrega: revisa si tu
  cliente soporta descubrimiento bajo demanda (tool search) antes de sumar más
  servidores "por si acaso".
- Si tu caso de uso mueve datos grandes entre herramientas (archivos, transcripciones),
  considera si un enfoque de ejecución de código con resultados filtrados localmente
  encaja mejor que encadenar llamadas directas.
- Para conocimiento de "cómo hacer" un proceso repetible, evalúa si una Skill resuelve el
  problema sin necesidad de un servidor MCP nuevo.

## Fuentes

- [Code Mode: the better way to use MCP](https://blog.cloudflare.com/code-mode/) — Cloudflare — pub: 2025-09-26 — visto: 2026-09-21
- [Code execution with MCP: building more efficient AI agents](https://www.anthropic.com/engineering/code-execution-with-mcp) — Anthropic — pub: 2025-11-04 — visto: 2026-09-21
- [Code execution with MCP: Building more efficient agents (comentario)](https://simonwillison.net/2025/Nov/4/code-execution-with-mcp/) — Simon Willison — pub: 2025-11-04 — visto: 2026-09-21
- [Introducing advanced tool use on the Claude Developer Platform](https://www.anthropic.com/engineering/advanced-tool-use) — Anthropic — pub: 2025-11-24 — visto: 2026-09-21
- [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) — Anthropic — pub: 2025-10-16 — visto: 2026-09-21
- [Skills explained: How Skills compares to prompts, Projects, MCP, and subagents](https://claude.com/blog/skills-explained) — Anthropic — pub: 2026-03-05 — visto: 2026-09-21
- [Anthropic brings MCP tool search to Claude Code](https://tessl.io/blog/anthropic-brings-mcp-tool-search-to-claude-code) — Tessl — pub: 2026-02-09 — visto: 2026-09-21

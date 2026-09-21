---
id: datos-popularidad-repos
title: "Ranking medido: estrellas y actividad de las herramientas agénticas open source"
track: tendencias
type: dato
level: intro
tags: github, mcp, claude-code, agentes, ranking, medicion-propia
summary: "21 repositorios del ecosistema de Claude Code, MCP y agentes de codificación, medidos directamente con gh api el 2026-09-21: estrellas, forks y fecha del último commit."
updated: 2026-09-21
reading_minutes: 7
source_span: 2026-09-21..2026-09-21
confidence: alta
---

Esta ficha no cita un ranking de terceros: es una medición propia hecha con `gh api`/`gh repo view` el **2026-09-21**, sobre repositorios públicos de GitHub. Los números de estrellas y forks son instantáneas de ese momento y cambian todos los días; el dato es el valor exacto capturado en esa fecha, no una estimación.

## Por qué importa

Las estrellas de GitHub no miden calidad ni adopción en producción, pero sí sirven como señal de atención pública relativa dentro del mismo ecosistema, medida de forma consistente. Aquí se comparan solo repos de la misma familia (agentes de codificación, MCP, frameworks multiagente) para que la comparación tenga sentido.

## Metodología

Medición directa vía `gh repo view <owner>/<repo> --json stargazerCount,forkCount,pushedAt,createdAt,primaryLanguage` (API de GitHub a través de la CLI oficial `gh`, autenticada), ejecutada el 2026-09-21. Para dos repos, el nombre histórico difiere del propietario actual en GitHub porque el repositorio fue transferido a otra organización; se indica el nombre anterior entre paréntesis para que se reconozca.

## Datos

### Agentes de codificación en terminal / CLI

| Repositorio | Estrellas | Forks | Último push | Lenguaje principal | Creado |
|---|---|---|---|---|---|
| anomalyco/opencode (antes sst/opencode) | 209.091 | 27.542 | 2026-09-21 | TypeScript | 2025-04-30 |
| anthropics/claude-code | 147.430 | 24.105 | 2026-09-21 | TypeScript | 2025-02-22 |
| openai/codex | 125.726 | 19.561 | 2026-09-21 | Rust | 2025-04-13 |
| cline/cline | 68.952 | 7.473 | 2026-09-21 | TypeScript | 2024-07-06 |
| Aider-AI/aider | 49.099 | 4.984 | 2026-05-22 | Python | 2023-05-09 |
| aaif-goose/goose (antes block/goose) | 54.534 | 6.288 | 2026-09-21 | Rust | 2024-08-23 |
| charmbracelet/crush | 28.223 | 2.274 | 2026-09-21 | Go | 2025-05-21 |
| continuedev/continue | 35.971 | 5.411 | 2026-09-21 | TypeScript | 2023-05-24 |

> [!duda] `anomalyco/opencode` (209.091 estrellas) supera a `anthropics/claude-code` (147.430) en conteo de estrellas a fecha de medición, pese a que Claude Code es el agente con más cobertura de prensa del ecosistema en 2025-2026. Las estrellas de GitHub no distinguen entre adopción real y otras dinámicas de visibilidad (trending, campañas de lanzamiento, bots) — este dato se reporta tal como se midió, sin ajustar.

> [!duda] `Aider-AI/aider` no recibe un push desde 2026-05-22 (cuatro meses antes de la medición) y `microsoft/autogen` no recibe uno desde 2026-04-15 (cinco meses antes) — ambos con actividad de commits mucho más baja que el resto de la tabla en el momento de medir. No se pudo determinar desde `gh api` si el proyecto está en pausa, mantenido en otra rama, o si el desarrollo se movió a otro repositorio.

### Frameworks multiagente y orquestación

| Repositorio | Estrellas | Forks | Último push | Lenguaje principal | Creado |
|---|---|---|---|---|---|
| Significant-Gravitas/AutoGPT | 187.474 | 46.008 | 2026-09-21 | Python | 2023-03-16 |
| browser-use/browser-use | 115.734 | 12.733 | 2026-09-18 | Python | 2024-10-31 |
| OpenHands/OpenHands | 88.721 | 11.674 | 2026-09-21 | TypeScript | 2024-03-13 |
| microsoft/autogen | 61.095 | 9.239 | 2026-04-15 | Python | 2023-08-18 |
| crewAIInc/crewAI | 58.860 | 8.531 | 2026-09-21 | Python | 2023-10-27 |
| langchain-ai/langgraph | 42.081 | 7.104 | 2026-09-21 | Python | 2023-08-09 |
| letta-ai/letta | 24.823 | 2.626 | 2026-09-10 | n/d | 2023-10-11 |
| google/adk-python | 21.586 | 4.045 | 2026-09-21 | Python | 2025-04-01 |
| e2b-dev/E2B | 13.902 | 1.042 | 2026-09-21 | Python | 2023-03-04 |

### Ecosistema MCP (Model Context Protocol)

| Repositorio | Estrellas | Forks | Último push | Lenguaje principal | Creado |
|---|---|---|---|---|---|
| modelcontextprotocol/servers | 90.529 | 11.673 | 2026-09-03 | TypeScript | 2024-11-19 |
| modelcontextprotocol/python-sdk | 24.353 | 3.961 | 2026-09-19 | Python | 2024-09-24 |
| modelcontextprotocol/typescript-sdk | 13.439 | 2.203 | 2026-09-21 | TypeScript | 2024-09-24 |

### Listas curadas (no son herramientas, son recopilaciones de la comunidad)

| Repositorio | Estrellas | Forks | Último push | Creado |
|---|---|---|---|---|
| hesreallyhim/awesome-claude-code | 54.391 | 4.742 | 2026-09-21 | 2025-04-19 |

## Debate

El propio ranking es evidencia del debate de la sección anterior sobre metodología de rankings de lenguajes: RedMonk (ver [`lenguajes-quien-sube-quien-baja`](/tendencias/lenguajes-quien-sube-quien-baja)) reconoce que las señales de GitHub y Stack Overflow se están volviendo menos fiables porque las herramientas de codificación con IA cambian el comportamiento de quién hace qué en un repositorio (menos preguntas en Stack Overflow, más commits automatizados). El mismo problema aplica aquí: no hay forma de distinguir, solo con estrellas y forks, cuánta de la actividad es de agentes automatizados frente a humanos.

## Fuentes

- [anthropics/claude-code](https://github.com/anthropics/claude-code) — GitHub — pub: s/f — visto: 2026-09-21 (medido vía `gh api`)
- [anomalyco/opencode](https://github.com/anomalyco/opencode) — GitHub — pub: s/f — visto: 2026-09-21 (medido vía `gh api`)
- [openai/codex](https://github.com/openai/codex) — GitHub — pub: s/f — visto: 2026-09-21 (medido vía `gh api`)
- [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) — GitHub — pub: s/f — visto: 2026-09-21 (medido vía `gh api`)
- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) — GitHub — pub: s/f — visto: 2026-09-21 (medido vía `gh api`)
- [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) — GitHub — pub: s/f — visto: 2026-09-21 (medido vía `gh api`)
- [aaif-goose/goose](https://github.com/aaif-goose/goose) — GitHub — pub: s/f — visto: 2026-09-21 (medido vía `gh api`)
- [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) — GitHub — pub: s/f — visto: 2026-09-21 (medido vía `gh api`)

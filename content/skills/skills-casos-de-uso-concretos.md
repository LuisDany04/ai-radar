---
id: skills-casos-de-uso-concretos
title: "10 skills concretas y el problema puntual que resuelve cada una"
track: skills
type: ejemplo
level: intro
tags: agent-skills, ejemplos, casos-de-uso, github
summary: "Diez skills reales, con enlace al código, elegidas para mostrar la variedad del ecosistema: de construir servidores MCP a controlar Unreal Engine o auditar ciberseguridad."
updated: 2026-09-20
reading_minutes: 6
source_span: 2025-10-16..2026-09-20
confidence: alta
---

Listado de skills concretas, con el problema que resuelven y el link a su código. Todas fueron verificadas leyendo su README o SKILL.md el 20-09-2026.

## Por qué importa

La forma más rápida de entender qué es una Agent Skill en la práctica no es leer la especificación, sino ver diez de ellas resolviendo problemas distintos: documentos, testing, control de un motor de videojuegos, ciberseguridad, decisiones difíciles.

## Ejemplo

1. **[`mcp-builder`](https://github.com/anthropics/skills/tree/main/skills/mcp-builder)** (Anthropic) — Problema: escribir un servidor MCP nuevo sin reinventar patrones de diseño de tools. Da una guía de proceso para Python (FastMCP) o Node/TypeScript, con foco en qué hace que un servidor MCP sea realmente usable por un LLM.

2. **[`webapp-testing`](https://github.com/anthropics/skills/tree/main/skills/webapp-testing)** (Anthropic) — Problema: verificar que una app web local funciona sin que Claude tenga que generar scripts de automatización desde cero cada vez. Trae `scripts/with_server.py` para levantar uno o varios servidores y usa Playwright en Python como caja negra.

3. **[`claude-api`](https://github.com/anthropics/skills/tree/main/skills/claude-api)** (Anthropic) — Problema: mantener actualizada la referencia de la API/SDKs de Claude en 8 lenguajes sin que Claude alucine parámetros viejos. Viene empaquetada por defecto en Claude Code y detecta automáticamente el lenguaje del proyecto (`requirements.txt`, `go.mod`, etc.); también sabe migrar un proyecto entero a un modelo nuevo con `/claude-api migrate`.

4. **[`dev-browser`](https://github.com/SawyerHood/dev-browser)** (Sawyer Hood, 6.627 estrellas) — Problema: dar control real de un navegador Chrome a un agente sin reiniciar el estado en cada llamada. Mantiene pestañas nombradas persistentes entre scripts y usa snapshots de árbol de accesibilidad en vez de capturas de pantalla para que el agente "vea" la página de forma compacta.

5. **[`unreal-mcp` / unreal-engine-skills-for-claude-code](https://github.com/EpicGames/unreal-engine-skills-for-claude-code-plugin)** (Epic Games, plugin oficial en el marketplace de Anthropic) — Problema: operar el editor de Unreal Engine (actors, blueprints, materiales, Niagara, Sequencer, Gameplay Ability System) desde Claude Code en vez de la UI. Se apoya en un servidor MCP con cientos de tools expuestas por `ToolsetRegistry`, más un hook de inicio de sesión que le avisa a Claude que está en un proyecto Unreal.

6. **[HashiCorp Agent Skills](https://github.com/hashicorp/agent-skills)** (HashiCorp) — Problema: escribir y revisar configuración de Terraform y Packer siguiendo las convenciones oficiales del fabricante. 16 skills para Terraform y 4 para Packer, empaquetadas como bundles de producto instalables por separado.

7. **[Posit Claude Skills — `critical-code-reviewer`](https://github.com/posit-dev/skills)** (Posit) — Problema: revisiones de código que de verdad encuentren huecos de seguridad, patrones perezosos y casos borde, en vez de un review superficial. Cubre Python, R, JavaScript/TypeScript, SQL y frontend; la misma colección incluye skills separadas para el flujo completo de PRs en GitHub (`pr-create`, `pr-threads-address`).

8. **[Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills)** (proyecto comunitario, no de Anthropic pese al nombre, 33.003 estrellas) — Problema: dar a un agente conocimiento estructurado de ciberseguridad mapeado a marcos reconocidos. 817+ skills organizadas en 34 dominios de seguridad, mapeadas a MITRE ATT&CK, NIST CSF 2.0, MITRE ATLAS, D3FEND, NIST AI RMF y MITRE F3.

9. **[LLM Council](https://github.com/aiwithremy/claude-skills-llm-council)** (Ole Lehmann, 2.152 estrellas, basado en la metodología "LLM Council" de Andrej Karpathy) — Problema: no confiar en una sola respuesta para una decisión difícil. La skill hace que Claude despache 5 asesores que analizan la pregunta desde ángulos distintos, se revisan entre sí, y entrega un veredicto sintetizado.

10. **[HTML PPT Studio](https://github.com/lewislulu/html-ppt-skill)** (comunidad, 8.437 estrellas) — Problema: generar presentaciones sin depender de PowerPoint/`pptxgenjs`. Construye decks como HTML con 24 temas, 31 layouts y más de 20 animaciones predefinidas.

## Datos

| Skill | Estrellas (medido 20-09-2026) | Última actividad |
|---|---|---|
| dev-browser | 6.627 | 2026-09-05 |
| unreal-engine-skills-for-claude-code-plugin | 296 | 2026-09-17 |
| hashicorp/agent-skills | 869 | 2026-09-04 |
| posit-dev/skills | 517 | 2026-09-18 |
| Anthropic-Cybersecurity-Skills | 33.003 | 2026-08-31 |
| claude-skills-llm-council | 2.152 | 2026-04-26 |
| html-ppt-skill | 8.437 | 2026-09-14 |

Las tres skills oficiales de Anthropic (`mcp-builder`, `webapp-testing`, `claude-api`) no tienen contador de estrellas propio: viven dentro de `anthropics/skills`, que en conjunto tiene 177.207 estrellas medidas el mismo día.

## Fuentes

- [anthropics/skills — carpeta skills/](https://github.com/anthropics/skills/tree/main/skills) — Anthropic (GitHub) — pub: 2026-09-10 — visto: 2026-09-20
- [SawyerHood/dev-browser — README](https://github.com/SawyerHood/dev-browser) — Sawyer Hood (GitHub) — pub: 2026-09-05 — visto: 2026-09-20
- [EpicGames/unreal-engine-skills-for-claude-code-plugin — README](https://github.com/EpicGames/unreal-engine-skills-for-claude-code-plugin) — Epic Games (GitHub) — pub: 2026-09-17 — visto: 2026-09-20
- [hashicorp/agent-skills — README](https://github.com/hashicorp/agent-skills) — HashiCorp (GitHub) — pub: 2026-09-04 — visto: 2026-09-20
- [posit-dev/skills — README](https://github.com/posit-dev/skills) — Posit (GitHub) — pub: 2026-09-18 — visto: 2026-09-20
- [mukul975/Anthropic-Cybersecurity-Skills — README](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) — comunidad (GitHub) — pub: 2026-08-31 — visto: 2026-09-20
- [aiwithremy/claude-skills-llm-council — README](https://github.com/aiwithremy/claude-skills-llm-council) — Ole Lehmann (GitHub) — pub: 2026-04-26 — visto: 2026-09-20

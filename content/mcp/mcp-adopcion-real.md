---
id: mcp-adopcion-real
title: "Quién soporta MCP hoy: OpenAI, Google, Microsoft, AWS y el resto"
track: mcp
type: dato
level: intro
tags: mcp, adopcion, openai, google, microsoft, aws
summary: "Cronología con fechas de anuncio de qué empresas y productos soportan Model Context Protocol: de los primeros adoptantes en 2024 a la donación del proyecto a la Agentic AI Foundation en 2025."
updated: 2026-09-21
reading_minutes: 5
source_span: 2024-11-25..2025-12-09
confidence: alta
---

MCP pasó de ser un protocolo de un solo fabricante (Anthropic) a un estándar con soporte
declarado por sus dos mayores competidores —OpenAI y Google— en menos de cinco meses, y a
tener gobernanza compartida bajo una fundación en poco más de un año desde su
lanzamiento.

## Por qué importa

Cuando dos laboratorios que compiten directamente con el creador del protocolo (OpenAI y
Google DeepMind con Anthropic) lo adoptan en semanas, deja de ser una apuesta de
proveedor único. Eso cambia el cálculo de riesgo de construir sobre MCP: si tu servidor
funciona con el SDK oficial, hoy habla con Claude, ChatGPT, Gemini, Copilot y varios
editores sin reescribir nada.

## Datos

| Organización / producto | Qué soporta | Fecha de anuncio |
|---|---|---|
| Anthropic (Claude, Claude Desktop, Claude Code) | Creador del protocolo; MCP nativo en toda la línea de producto, servidores de referencia (filesystem, git, Slack, GitHub, Postgres, Puppeteer) | 2024-11-25 |
| Block, Apollo, Zed, Replit, Codeium, Sourcegraph | Primeros adoptantes citados en el lanzamiento original | 2024-11-25 |
| OpenAI | Soporte en Agents SDK (inmediato), luego ChatGPT desktop app y Responses API | 2025-03-26 |
| Google DeepMind / Gemini | Demis Hassabis anuncia soporte para modelos Gemini y su SDK | 2025-04-09 |
| Microsoft Windows 11 | Preview de MCP como capa del sistema operativo (registry curado, aislamiento en tiempo de ejecución, autorización por herramienta), en colaboración con Anthropic y el MCP Steering Committee | 2025-05-19 |
| AWS | Servidores MCP para Lambda, ECS, EKS y Finch (primeros de una serie que luego cubrió Bedrock, S3, MSK y el AWS Price List) | 2025-05-29 |
| Google Gemini API / SDK | Soporte nativo (no solo anunciado): definiciones MCP integradas en el SDK de Gemini | 2025-05-20 |
| VS Code (Microsoft) | Soporte MCP pasa a disponibilidad general en el editor (v1.102) | 2025-07-09 |
| Agentic AI Foundation (Linux Foundation) | Gobernanza del proyecto donada por Anthropic; cofundadores Anthropic, Block y OpenAI; miembros de soporte Google, Microsoft, AWS, Cloudflare y Bloomberg | 2025-12-09 |

Para el primer aniversario del protocolo (2025-11-25), el blog oficial de MCP reportó
GitHub, OpenAI, Microsoft (Azure y M365), AWS (Bedrock), Google Cloud, Stripe, Notion,
Hugging Face y Postman con servidores MCP propios, además de 58 mantenedores y más de
2.900 personas activas en el Discord del proyecto.

## Cómo empezar

- Si evalúas construir un servidor MCP, revisa primero si el cliente que te importa
  (Claude Code, ChatGPT, Copilot, Gemini) ya tiene soporte estable antes de asumir
  compatibilidad total: cada cliente adopta las revisiones de la especificación con
  retraso distinto (ver la ficha `mcp-que-es-y-estado-spec`).
- Para adopción dentro de un producto propio, los SDKs oficiales (Python, TypeScript, y
  los que listan los "Tier" de la fundación) son el punto de partida recomendado — ver la
  ficha `mcp-escribir-tu-servidor`.

## Fuentes

- [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol) — Anthropic — pub: 2024-11-25 — visto: 2026-09-21
- [OpenAI adopts rival Anthropic's standard for connecting AI models to data](https://finance.yahoo.com/news/openai-adopts-rival-anthropics-standard-181835300.html) — TechCrunch (vía Yahoo Finance) — pub: 2025-03-26 — visto: 2026-09-21
- [Google says it'll embrace Anthropic's standard for connecting AI models to data](https://techcrunch.com/2025/04/09/google-says-itll-embrace-anthropics-standard-for-connecting-ai-models-to-data/) — TechCrunch — pub: 2025-04-09 — visto: 2026-09-21
- [Securing the Model Context Protocol: Building a safer agentic future on Windows](https://blogs.windows.com/windowsexperience/2025/05/19/securing-the-model-context-protocol-building-a-safer-agentic-future-on-windows/) — Microsoft (Windows Experience Blog) — pub: 2025-05-19 — visto: 2026-09-21
- [Announcing new Model Context Protocol (MCP) Servers for AWS Serverless and Containers](https://aws.amazon.com/about-aws/whats-new/2025/05/new-model-context-protocol-servers-aws-serverless-containers/) — AWS — pub: 2025-05-29 — visto: 2026-09-21
- [Google I/O 2025: Updates to Gemini 2.5 from Google DeepMind](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/google-gemini-updates-io-2025/) — Google — pub: 2025-05-20 — visto: 2026-09-21
- [Visual Studio Code June 2025 (v1.102)](https://code.visualstudio.com/updates/v1_102) — Microsoft — pub: 2025-07-09 — visto: 2026-09-21
- [One Year of MCP: November 2025 Spec Release](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/) — Model Context Protocol — pub: 2025-11-25 — visto: 2026-09-21
- [Donating the Model Context Protocol and establishing the Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation) — Anthropic — pub: 2025-12-09 — visto: 2026-09-21

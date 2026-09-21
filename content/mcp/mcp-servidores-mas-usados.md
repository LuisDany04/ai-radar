---
id: mcp-servidores-mas-usados
title: "Los servidores MCP con más estrellas en GitHub (medición propia)"
track: mcp
type: dato
level: intro
tags: mcp, servidores, github, estrellas, ranking
summary: "Tabla de servidores MCP más populares por estrellas de GitHub, medidas directamente con gh api el 2026-09-21. Estrellas no es lo mismo que uso activo."
updated: 2026-09-21
reading_minutes: 4
source_span: 2024-11-25..2026-09-21
confidence: alta
---

No existe una métrica oficial de "uso" por servidor MCP (el registry no publica número de
instalaciones ni de llamadas). La mejor aproximación pública son las estrellas de GitHub,
que miden atención de desarrolladores, no tráfico real. Esta tabla se construyó
consultando directamente `gh api repos/<owner>/<repo>` el **2026-09-21**; los números
cambian todos los días, así que trátalos como una fotografía, no como una cifra fija.

## Por qué importa

Con miles de servidores listados en directorios como el registry oficial o
`awesome-mcp-servers`, elegir por dónde empezar es difícil. Las estrellas no dicen si un
servidor es seguro o si está mantenido, pero sí filtran rápido entre "lo prueban miles de
desarrolladores" y "lo subió alguien la semana pasada y nadie más lo vio".

## Datos

Estrellas medidas el 2026-09-21 vía `gh api repos/<owner>/<repo>`:

| Servidor | Qué hace | Estrellas | Repo |
|---|---|---|---|
| MCP Servers (referencia oficial) | Colección de servidores de referencia mantenidos por el proyecto MCP: filesystem, git, fetch, memory, time, sequential-thinking | 90.529 | `modelcontextprotocol/servers` |
| Chrome DevTools MCP | Controla e inspecciona Chrome en vivo (rendimiento, red, consola) para agentes de código; lo mantiene el equipo de Chrome DevTools | 52.428 | `ChromeDevTools/chrome-devtools-mcp` |
| Context7 | Inyecta documentación de librerías actualizada como contexto para editores con IA | 62.277 | `upstash/context7` |
| Playwright MCP | Automatiza navegadores vía Playwright usando accessibility snapshots en vez de capturas de pantalla; lo mantiene Microsoft | 37.436 | `microsoft/playwright-mcp` |
| GitHub MCP Server | Servidor oficial de GitHub: repos, issues, pull requests, Actions, disponible remoto (hosted) o local (Docker) | 33.102 | `github/github-mcp-server` |
| Blender MCP | Controla Blender (modelado 3D) desde un LLM, de la comunidad | 29.132 | `ahujasid/mcp-for-blender` |
| Desktop Commander | Control de terminal, búsqueda de archivos y edición de diffs en el sistema local | 9.685 | `wonderwhy-er/DesktopCommanderMCP` |
| Apify MCP Server | Scraping web y miles de "actors" de Apify (redes sociales, buscadores, e-commerce) como herramientas | 7.935 | `apify/apify-mcp-server` |
| Firecrawl MCP | Scraping y búsqueda web oficial de Firecrawl | 7.498 | `firecrawl/firecrawl-mcp-server` |
| Notion MCP Server | Servidor oficial de Notion: páginas, bases de datos | 4.642 | `makenotion/notion-mcp-server` |

> [!duda] `punkpeye/awesome-mcp-servers` tiene 95.388 estrellas (medición del
> 2026-09-21), más que cualquier servidor individual de la tabla — pero es un **directorio
> curado en Markdown**, no un servidor MCP ejecutable. Se excluyó de la tabla principal
> por eso, aunque sus estrellas son reales y verificables igual que las demás.

Como referencia de escala agregada: Anthropic reportó más de **97 millones de descargas
mensuales** combinadas de los SDK oficiales de Python y TypeScript en su anuncio de
donación del proyecto a la Agentic AI Foundation (2025-12-09) — una señal de que el
volumen real de uso es varios órdenes de magnitud mayor que lo que reflejan las estrellas
de repos individuales.

## Cómo empezar

- Para reproducir esta medición: `gh api repos/<owner>/<repo> -q '.stargazers_count'`.
- Estrellas altas no sustituyen una revisión de seguridad: ver la ficha `mcp-seguridad`
  antes de conectar un servidor de terceros a datos sensibles.

## Fuentes

- [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) — GitHub / Model Context Protocol — pub: s/f — visto: 2026-09-21
- [github/github-mcp-server](https://github.com/github/github-mcp-server) — GitHub — pub: s/f — visto: 2026-09-21
- [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) — Google — pub: s/f — visto: 2026-09-21
- [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) — Microsoft — pub: s/f — visto: 2026-09-21
- [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol) — Anthropic — pub: 2024-11-25 — visto: 2026-09-21
- [Donating the Model Context Protocol and establishing the Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation) — Anthropic — pub: 2025-12-09 — visto: 2026-09-21

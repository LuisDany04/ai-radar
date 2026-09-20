---
id: claude-code-que-es-hoy
title: "Que es Claude Code hoy: superficies, precios y en que se diferencia de un chat"
track: claude-code
type: feature
level: intro
tags: claude-code, overview, precios, ide, cli
summary: "Claude Code ya no es solo una CLI: corre en terminal, VS Code, JetBrains, una app de escritorio y el navegador, todo sobre el mismo motor. Repasamos superficies, precios vigentes y que lo distingue de chatear con un modelo."
updated: 2026-09-20
reading_minutes: 7
source_span: 2026-09-15..2026-09-20
confidence: alta
---

Claude Code es una herramienta de codificación agéntica: lee tu repositorio, edita archivos, corre comandos y se integra con tu flujo de trabajo, en vez de limitarse a responder texto. La documentación oficial lo resume así: "reads your codebase, edits files, runs commands, and integrates with your development tools." La diferencia con chatear con un modelo no es el modelo en sí (usa los mismos Claude por debajo), sino el bucle agéntico: Claude decide qué herramienta usar, la ejecuta, lee el resultado y sigue iterando sin que vos copies y pegues nada.

## Por qué importa

En 2026 "Claude Code" dejó de ser sinónimo de "la CLI". Es un mismo motor —mismo `CLAUDE.md`, mismos settings, mismos servidores MCP— que corre sobre cinco superficies distintas, y elegir la superficie correcta importa tanto como elegir bien el prompt.

## Ejemplo

Las cinco superficies oficiales, según `code.claude.com/docs/en/overview` (actualizada 2026-09-18):

1. **Terminal (CLI)**: instalación nativa recomendada.
   ```bash
   curl -fsSL https://claude.ai/install.sh | bash   # macOS, Linux, WSL
   ```
   ```powershell
   irm https://claude.ai/install.ps1 | iex          # Windows PowerShell
   ```
   También hay Homebrew (`brew install --cask claude-code`, con canal `@latest` para las versiones más nuevas), WinGet (`winget install Anthropic.ClaudeCode`), y paquetes apt/dnf/apk en Linux.
2. **VS Code**: extensión con diffs inline, @-menciones y revisión de planes; se instala desde el Marketplace o con `vscode:extension/anthropic.claude-code`.
3. **JetBrains**: plugin (`plugins.jetbrains.com/plugin/27310-claude-code-beta-`) para IntelliJ, PyCharm, WebStorm y otros IDE de la familia; requiere la CLI instalada aparte.
4. **App de escritorio**: standalone, con revisión visual de diffs, sesiones múltiples en paralelo y tareas programadas; requiere una suscripción paga.
5. **Web**: en `claude.ai/code`, para lanzar tareas largas sin entorno local o trabajar en paralelo sobre repos que no tenés clonados.

Todas comparten el mismo backend: "Each surface connects to the same underlying Claude Code engine, so your repo's CLAUDE.md files, settings, and MCP servers work across all of them."

Un ejemplo real de uso agéntico por CLI, tomado literal de la documentación:

```bash
# Analizar logs recientes
tail -200 app.log | claude -p "Slack me if you see any anomalies"

# Revisar archivos cambiados
git diff main --name-only | claude -p "review these changed files for security issues"
```

## Datos

| Dato | Valor | Fuente |
|---|---|---|
| Estrellas en GitHub del repo `anthropics/claude-code` | 146.810 | GitHub API, 2026-09-20 |
| Forks del mismo repo | 23.979 | GitHub API, 2026-09-20 |
| Descargas de npm de `@anthropic-ai/claude-code` en el último mes (20 ago – 18 sep 2026) | 64.859.569 | api.npmjs.org, 2026-09-20 |
| Precio plan Pro (incluye Claude Code) | USD 17/mes (anual) o USD 20/mes (mensual) | claude.com/pricing, visto 2026-09-20 |
| Precio plan Max (incluye Claude Code) | desde USD 100/mes | claude.com/pricing, visto 2026-09-20 |
| Precio asiento Team estándar (incluye Claude Code y Claude Cowork) | USD 20/asiento/mes anual, USD 25/mes mensual | claude.com/pricing, visto 2026-09-20 |
| Precio Enterprise | USD 20/asiento/mes + uso a tarifas de API, facturado anual | claude.com/pricing, visto 2026-09-20 |

> [!duda] El plan Free explícitamente NO incluye Claude Code según la página de precios. Para usar Claude Code hace falta como mínimo Pro, o una cuenta de Anthropic Console (pago por uso de API) según indica `code.claude.com/docs/en/overview`.

## Cómo empezar

1. Si nunca lo usaste: instalá la CLI nativa y corré `claude` dentro de un proyecto; te pide login la primera vez.
2. Si ya usás VS Code o un IDE JetBrains a diario, la extensión/plugin da diffs inline sin salir del editor.
3. Para tareas largas que no querés monitorear (auditorías, migraciones grandes), usá la web (`claude.ai/code`) o `claude --cloud` desde la terminal.
4. `claude --teleport` trae de vuelta a tu terminal una sesión que arrancaste en la web o en el celular (requiere suscripción de claude.ai).
5. Para automatizar en CI, usá `claude -p "prompt"` en modo no interactivo en vez de cualquiera de las superficies interactivas.

## Fuentes

- [Overview](https://code.claude.com/docs/en/overview) — Anthropic — pub: 2026-09-18 — visto: 2026-09-20
- [Pricing](https://claude.com/pricing) — Anthropic — pub: s/f — visto: 2026-09-20
- [anthropics/claude-code (repositorio)](https://github.com/anthropics/claude-code) — Anthropic (GitHub) — pub: s/f — visto: 2026-09-20
- [Descargas npm de @anthropic-ai/claude-code](https://api.npmjs.org/downloads/point/last-month/@anthropic-ai/claude-code) — npm (registry API) — pub: s/f — visto: 2026-09-20

---
id: mcp-conectar-servidores
title: "Cómo conectar un servidor MCP a Claude Code y otros clientes"
track: mcp
type: guia
level: intermedio
tags: mcp, configuracion, claude-code, servidores, oauth
summary: "Configuración copiable para dar de alta servidores MCP por stdio, HTTP y remoto con OAuth en Claude Code, Claude Desktop y VS Code, con los tres alcances (local, project, user)."
updated: 2026-09-21
reading_minutes: 8
source_span: 2025-07-09..2026-08-04
confidence: alta
---

Un servidor MCP se conecta a un cliente (Claude Code, Claude Desktop, VS Code, etc.) de
tres formas: **stdio** (el cliente lanza un proceso local y le habla por entrada/salida
estándar), **HTTP** (Streamable HTTP, el transporte remoto recomendado desde la
especificación 2025-03-26) o **SSE**, el transporte remoto anterior, hoy deprecado a
favor de HTTP. Los servidores remotos casi siempre exigen autenticación, típicamente
OAuth 2.1.

## Por qué importa

Cada cliente guarda la configuración en un sitio distinto y con sintaxis distinta:
Claude Code usa el comando `claude mcp add` o un archivo `.mcp.json`, Claude Desktop usa
`claude_desktop_config.json`, VS Code usa `.vscode/mcp.json`. Si no sabes dónde va cada
cosa, terminas editando el archivo equivocado y el servidor "no aparece". Además, mezclar
alcances (local/project/user) sin querer es la causa más común de que un servidor
funcione en un proyecto y no en otro.

## Ejemplo

### Claude Code — servidor local (stdio)

```bash
# sintaxis: claude mcp add [opciones] <nombre> -- <comando> [args...]
claude mcp add --transport stdio airtable \
  --env AIRTABLE_API_KEY=TU_CLAVE \
  -- npx -y airtable-mcp-server
```

### Claude Code — servidor remoto (HTTP)

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

### Claude Code — remoto con OAuth preconfigurado

```bash
claude mcp add --transport http my-server https://mcp.example.com/mcp \
  --client-id TU_CLIENT_ID --client-secret --callback-port 8080
```

O de forma interactiva, dentro de una sesión: `/mcp` → elegir el servidor → seguir el
flujo de login en el navegador. `claude mcp login <nombre>` y `claude mcp logout <nombre>`
hacen lo mismo desde la línea de comandos.

### Claude Code — alcance del servidor

```bash
claude mcp add --transport http stripe --scope local https://mcp.stripe.com     # solo este proyecto, ~/.claude.json
claude mcp add --transport http shared  --scope project https://ejemplo.com/mcp  # equipo, vía .mcp.json versionado
claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com    # todos tus proyectos
```

### `.mcp.json` en la raíz del proyecto (alcance `project`)

```json
{
  "mcpServers": {
    "notion": { "type": "http", "url": "https://mcp.notion.com/mcp" },
    "database": {
      "type": "stdio",
      "command": "/ruta/al/servidor-db",
      "args": ["--config", "${CLAUDE_PROJECT_DIR}/config.json"],
      "env": { "DB_URL": "${DB_URL}" }
    },
    "slack": {
      "type": "http",
      "url": "https://mcp.slack.com/mcp",
      "oauth": { "clientId": "tu-client-id", "callbackPort": 8080 }
    }
  }
}
```

### Claude Desktop — `claude_desktop_config.json`

Ubicación: macOS `~/Library/Application Support/Claude/claude_desktop_config.json`,
Windows `%APPDATA%\Claude\claude_desktop_config.json`.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:\\Users\\usuario\\Desktop"]
    }
  }
}
```

Para servidores remotos, Claude Desktop y Claude web usan la UI (Settings → Connectors →
Add custom connector → pegar la URL → completar el login OAuth que pida el servidor), no
un JSON manual.

### VS Code — `.vscode/mcp.json`

```json
{
  "servers": {
    "github": { "type": "http", "url": "https://api.githubcopilot.com/mcp" },
    "playwright": { "command": "npx", "args": ["-y", "@microsoft/mcp-server-playwright"] }
  }
}
```

VS Code también acepta configuración a nivel de usuario con el comando de paleta
**MCP: Open User Configuration**.

## Datos

| Hito | Fecha |
|---|---|
| VS Code: soporte MCP pasa a disponibilidad general (v1.102) | 2025-07-09 |
| Streamable HTTP reemplaza a HTTP+SSE en la especificación | 2025-03-26 |
| Claude Code v2.1.221: caché de descubrimiento de tools en servidores HTTP/SSE remotos | 2026-08-04 |
| Claude Code, última versión publicada al momento de escribir esta ficha | v2.1.278 — 2026-09-19 |

## Cómo empezar

1. Decide el transporte: si el servidor corre en tu máquina, stdio; si es un servicio de
   terceros, HTTP.
2. Para Claude Code, usa `claude mcp add` con `--scope project` si el equipo debe
   compartir el servidor (el archivo `.mcp.json` se versiona) o `--scope local`/`user`
   si es solo para ti.
3. Verifica la conexión con `claude mcp list` o `/mcp` dentro de una sesión.
4. Si el servidor requiere login, usa `/mcp` (flujo interactivo) o pasa
   `--client-id`/`--client-secret`/`--callback-port` si ya tienes credenciales de OAuth
   registradas.
5. Evita SSE para servidores nuevos: está deprecado desde la revisión 2025-03-26 de la
   especificación; usa `--transport http`.

## Fuentes

- [Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp) — Anthropic — pub: s/f — visto: 2026-09-21
- [Connect to local MCP servers](https://modelcontextprotocol.io/quickstart/user) — Model Context Protocol — pub: s/f — visto: 2026-09-21
- [Connect to remote MCP Servers](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-remote-servers) — Model Context Protocol / Anthropic — pub: s/f — visto: 2026-09-21
- [Use MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) — Microsoft — pub: s/f — visto: 2026-09-21
- [Visual Studio Code June 2025 (v1.102)](https://code.visualstudio.com/updates/v1_102) — Microsoft — pub: 2025-07-09 — visto: 2026-09-21
- [Releases · anthropics/claude-code (API)](https://github.com/anthropics/claude-code/releases) — GitHub / Anthropic — pub: 2026-09-19 — visto: 2026-09-21

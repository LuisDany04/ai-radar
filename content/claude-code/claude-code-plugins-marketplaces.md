---
id: claude-code-plugins-marketplaces
title: "Plugins y marketplaces: como se empaqueta y distribuye una extension de Claude Code"
track: claude-code
type: guia
level: intermedio
tags: plugins, marketplace, distribucion, mcp
summary: "Un plugin empaqueta skills, subagentes, hooks y servidores MCP en una sola unidad instalable. Hay un marketplace oficial curado (310 plugins) y uno comunitario mucho mas grande (2282), mas los que arma cada organizacion."
updated: 2026-09-20
reading_minutes: 8
source_span: 2026-09-16..2026-09-20
confidence: alta
---

Un plugin de Claude Code es un directorio autocontenido que agrupa skills, subagentes, hooks, servidores MCP o LSP, y hasta ejecutables propios, con un manifiesto `plugin.json` opcional que le da nombre y versión. La diferencia con tener esas mismas piezas sueltas en `.claude/` es la distribución: un plugin se instala con un comando, se versiona, y se comparte entre proyectos o con toda una comunidad a través de un "marketplace" — un catálogo con un archivo `marketplace.json`.

## Por qué importa

Antes de plugins, compartir un hook o un subagente con el equipo era copiar y pegar archivos entre repos. Ahora es `/plugin install nombre@marketplace`. El costo de esa comodidad es de confianza: la propia documentación de Anthropic lo dice sin vueltas — "Plugins and marketplaces are highly trusted components that can execute arbitrary code on your machine with your user privileges." Anthropic no audita el contenido de cada plugin de terceros, ni siquiera los del marketplace comunitario más allá de un escaneo automático de seguridad.

## Ejemplo

Estructura mínima de un plugin con un skill, tal como la genera el quickstart oficial (`code.claude.com/docs/en/plugins`, actualizada 2026-09-16):

```text
my-first-plugin/
├── .claude-plugin/
│   └── plugin.json
└── skills/
    └── hello/
        └── SKILL.md
```

```json
// my-first-plugin/.claude-plugin/plugin.json
{
  "name": "my-first-plugin",
  "description": "A greeting plugin to learn the basics",
  "version": "1.0.0",
  "author": { "name": "Your Name" }
}
```

Para probarlo localmente sin publicarlo en ningún marketplace:

```bash
claude --plugin-dir ./my-first-plugin
```

Para instalar algo real desde el marketplace oficial (que se registra solo la primera vez que arrancás Claude Code de forma interactiva):

```bash
/plugin install github@claude-plugins-official
```

Y para agregar un marketplace de un repo de GitHub cualquiera:

```bash
/plugin marketplace add owner/repo
```

Los marketplaces también se declaran en `.claude/settings.json` para que todo el equipo los reciba al clonar el repo (una vez que confían en la carpeta):

```json
{
  "extraKnownMarketplaces": {
    "my-team-tools": {
      "source": { "source": "github", "repo": "your-org/claude-plugins" }
    }
  }
}
```

## Datos

| Dato | Valor | Fuente |
|---|---|---|
| Plugins listados en el marketplace oficial (`claude-plugins-official`) | 310 | marketplace.json del repo, leído vía `gh api`, 2026-09-20 |
| Plugins listados en el marketplace comunitario (`claude-plugins-community`) | 2.282 | marketplace.json del repo, leído vía `gh api`, 2026-09-20 |
| Estrellas en GitHub de `anthropics/claude-plugins-official` | 36.517 | GitHub API (`gh api repos/anthropics/claude-plugins-official`), 2026-09-20 |
| Estrellas en GitHub de `anthropics/claude-plugins-community` | 4.276 | GitHub API, 2026-09-20 |
| Categorías del marketplace oficial | code intelligence (LSP), integraciones externas (GitHub, Jira/Confluence, Figma, Slack, Sentry, etc.), revisión de seguridad automática, workflows de desarrollo, estilos de salida | code.claude.com/docs/en/discover-plugins, 2026-09-18 |

> [!duda] No encontramos una cifra oficial de "instalaciones" por plugin publicada por Anthropic; el conteo de 310 y 2.282 es nuestro, contando entradas del array `plugins` en cada `marketplace.json` al 2026-09-20, así que crece semana a semana y puede no coincidir con lo que veas si lo repetís más adelante.

## Cómo empezar

1. Para uso personal rápido, no hace falta plugin: alcanza con `.claude/skills/`, `.claude/agents/` o un hook en `settings.json`.
2. Convertí a plugin recién cuando quieras compartirlo: copiá `commands/`, `agents/`, `skills/` a la carpeta del plugin y armá `hooks/hooks.json` a partir del bloque `hooks` de tu `settings.json`.
3. Antes de instalar cualquier plugin de terceros, revisá qué agrega: el panel de detalles de `/plugin` muestra costo de contexto, última actualización y qué componentes instala (comandos, agentes, skills, hooks, servidores MCP/LSP).
4. Para plugins de intelligence de código (LSP), instalá primero el binario del language server (por ejemplo `rust-analyzer` o `pyright-langserver`) — el plugin no lo instala por vos.
5. `claude plugin validate ./tu-plugin` corre localmente el mismo chequeo que usa el pipeline de revisión antes de aceptar un plugin en el marketplace comunitario.

## Fuentes

- [Create plugins](https://code.claude.com/docs/en/plugins) — Anthropic — pub: 2026-09-16 — visto: 2026-09-20
- [Discover and install prebuilt plugins through marketplaces](https://code.claude.com/docs/en/discover-plugins) — Anthropic — pub: 2026-09-18 — visto: 2026-09-20
- [anthropics/claude-plugins-official (marketplace.json)](https://github.com/anthropics/claude-plugins-official/blob/main/.claude-plugin/marketplace.json) — Anthropic (GitHub) — pub: s/f — visto: 2026-09-20
- [anthropics/claude-plugins-community (marketplace.json)](https://github.com/anthropics/claude-plugins-community/blob/main/.claude-plugin/marketplace.json) — Anthropic (GitHub) — pub: s/f — visto: 2026-09-20

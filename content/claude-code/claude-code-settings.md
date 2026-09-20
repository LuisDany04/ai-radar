---
id: claude-code-settings
title: "Configuracion de Claude Code: settings.json, jerarquia y permisos"
track: claude-code
type: guia
level: intermedio
tags: configuracion, settings, permisos, variables-de-entorno, modelo
summary: "Como se organizan los settings.json de Claude Code (managed, linea de comandos, local, proyecto, usuario), como funcionan permisos allow/ask/deny y como fijar el modelo, con ejemplos oficiales copiables."
updated: 2026-09-20
reading_minutes: 8
source_span: 2026-07-15..2026-09-18
confidence: alta
---

Claude Code se configura con archivos JSON planos llamados `settings.json`. No hay un único archivo: hay hasta cinco fuentes que se combinan, y entender el orden en que se pisan entre si es la parte que más confunde a quien recién empieza.

## Por qué importa

Un mismo comportamiento (por ejemplo, si Claude puede correr `curl` sin preguntar) puede estar definido en el archivo del usuario, en el del proyecto, en uno local sin versionar, o impuesto por la organización. Si no sabés cuál gana, terminás editando el archivo equivocado y el cambio "no se aplica" sin razón aparente. Además, algunas claves de permisos (`disableClaudeAiConnectors`, `isolatePeerMachines`, `maxEffortLevel`, entre otras) invierten la jerarquía a propósito: gana el valor más restrictivo venga de donde venga, como mecanismo de seguridad.

## Ejemplo

Jerarquía de mayor a menor precedencia, según la documentación oficial (`code.claude.com/docs/en/settings`, actualizada 2026-09-17):

1. **Managed settings** — `managed-settings.json`, MDM o la consola de claude.ai. La define la organización; nada de lo que vos configures la sobreescribe.
2. **Línea de comandos** — `claude --settings '{...}'`, solo para esa sesión.
3. **Proyecto local** — `.claude/settings.local.json`. Tuyo, para ese proyecto; Claude Code lo agrega solo a `git excludes` la primera vez que escribe ahí (por ejemplo al aceptar "Yes, and don't ask again" en un prompt de permiso).
4. **Proyecto compartido** — `.claude/settings.json`, versionado, para todo el equipo.
5. **Usuario** — `~/.claude/settings.json` (en Windows, `%USERPROFILE%\.claude`), tuyo para todos los proyectos.

Las listas (como `permissions.allow`) no se pisan entre niveles: se combinan. Las excepciones son `fallbackModel`, `modelPicker`, `availableModels` (cuando lo define managed) y `modelSettings`, que tienen reglas propias de resolución.

Ejemplo real de archivo de usuario, tomado literal de la página oficial "Example settings files" (`code.claude.com/docs/en/settings-example`, 2026-09-15):

```json
// ~/.claude/settings.json
{
  "model": "claude-sonnet-5",
  "effortLevel": "xhigh",
  "editorMode": "vim",
  "theme": "light-daltonized",
  "statusLine": {
    "type": "command",
    "command": "jq -r '\"[\\(.model.display_name)] \\(.context_window.used_percentage // 0)% context\"'",
    "padding": 2
  },
  "spinnerTipsEnabled": false,
  "preferredNotifChannel": "terminal_bell",
  "permissions": {
    "allow": [
      "Bash(git diff *)",
      "Read(~/.zshrc)"
    ]
  },
  "autoUpdatesChannel": "stable",
  "cleanupPeriodDays": 20
}
```

Y el equivalente para un archivo de equipo (`.claude/settings.json`, versionado), también literal de la misma página:

```json
{
  "permissions": {
    "allow": ["Bash(npm run *)"],
    "ask": ["Bash(git push *)"],
    "deny": ["Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)"]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/block-rm.sh" }
        ]
      }
    ]
  },
  "extraKnownMarketplaces": {
    "acme-tools": { "source": { "source": "github", "repo": "acme-corp/claude-plugins" } }
  },
  "enabledPlugins": { "code-formatter@acme-tools": true }
}
```

Para probar un valor sin tocar archivos, se pasa por CLI para una sola sesión:

```bash
claude --settings '{"model": "claude-opus-4-8"}'
```

Y para variables de entorno, el bloque `env` dentro de cualquier settings.json es una clave más y sigue la misma jerarquía; por ejemplo, para mandar telemetría OpenTelemetry desde el archivo de equipo:

```json
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_PROTOCOL": "grpc",
    "OTEL_EXPORTER_OTLP_ENDPOINT": "http://collector.example.com:4317"
  }
}
```

Para seleccionar modelo hay tres vías, cada una con su propia precedencia: la clave `model` en un settings.json, el flag `--model` (o `--effort` para nivel de esfuerzo), o exportar `ANTHROPIC_MODEL` en la shell (que pisa el `model` de cualquier archivo). `/model` dentro de una sesión guarda el valor como default en `~/.claude/settings.json`.

> [!duda] La documentación oficial no publica un changelog fechado por clave: para saber desde qué versión existe cada ajuste hay que cruzar `settings-reference` con el CHANGELOG del repo. Dos ejemplos confirmados cruzando ambas fuentes: `settings.local.json` pasó a guardarse en la raíz del repo (antes: el directorio de arranque) desde la v2.1.211 (2026-07-15), y leer los archivos del proyecto tras moverse con `/cd` a otro directorio requiere v2.1.246 (2026-08-25) o posterior.

## Datos

| Dato | Valor | Fuente |
|---|---|---|
| Archivos de settings que Claude Code combina | 4 archivos locales + managed (5 fuentes) | code.claude.com/docs/en/settings, 2026-09-17 |
| Versión desde la que `.claude/settings.local.json` vive en la raíz del repo (antes: directorio de arranque) | v2.1.211 | GitHub release v2.1.211, 2026-07-15 |
| Versión mínima para que `modelPicker` tenga reglas propias de fusión | v2.1.242 | code.claude.com/docs/en/settings, 2026-09-17 |
| Versión mínima para el tope `maxEffortLevel` como excepción a precedencia managed | v2.1.267 | code.claude.com/docs/en/settings, 2026-09-17 |

## Cómo empezar

1. Corré `/status` dentro de una sesión para ver qué archivos de settings se cargaron (línea "Setting sources").
2. Si algo no aplica, primero sospechá de un nivel más alto: proyecto pisa usuario, managed pisa todo.
3. Para permisos personales que no querés versionar, escribí en `.claude/settings.local.json` en vez de `.claude/settings.json`.
4. Usá `claude doctor` para ver qué entradas del archivo fueron rechazadas por JSON inválido o clave desconocida.
5. Para autocompletado en el editor, agregá `"$schema": "https://json.schemastore.org/claude-code-settings.json"` al archivo.

## Fuentes

- [Settings files and precedence](https://code.claude.com/docs/en/settings) — Anthropic (docs.claude.com/code.claude.com) — pub: 2026-09-17 — visto: 2026-09-20
- [All settings (settings reference)](https://code.claude.com/docs/en/settings-reference) — Anthropic — pub: 2026-09-18 — visto: 2026-09-20
- [Example settings files](https://code.claude.com/docs/en/settings-example) — Anthropic — pub: 2026-09-15 — visto: 2026-09-20
- [CHANGELOG.md — anthropics/claude-code](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) — Anthropic (GitHub) — pub: 2026-09-19 — visto: 2026-09-20
- [Release v2.1.211](https://github.com/anthropics/claude-code/releases/tag/v2.1.211) — Anthropic (GitHub) — pub: 2026-07-15 — visto: 2026-09-20

---
id: claude-code-hooks
title: "Hooks: ejecutar tus propios comandos en el ciclo de vida del agente"
track: claude-code
type: guia
level: intermedio
tags: automatizacion, hooks, configuracion, permisos
summary: "Los hooks corren comandos deterministicos (o llamadas a un modelo) en puntos fijos del ciclo de vida de Claude Code: antes o despues de una tool, al iniciar sesion, al compactar, etc. Con eventos, formato JSON y ejemplos oficiales."
updated: 2026-09-20
reading_minutes: 9
source_span: 2026-09-11..2026-09-19
confidence: alta
---

Los hooks son comandos de shell (o, desde hace poco, prompts a un modelo o llamadas HTTP/MCP) que Claude Code ejecuta automáticamente en puntos fijos de su ciclo de vida: antes de usar una herramienta, después de editar un archivo, al iniciar sesión, al compactar contexto, etc. La diferencia con pedirle a Claude "siempre corré el linter después de editar" en un CLAUDE.md es que un hook se ejecuta sí o sí, sin depender de que el modelo decida hacerlo.

## Por qué importa

Un CLAUDE.md es contexto que el modelo puede ignorar parcialmente; un hook con `exit 2` bloquea la acción pase lo que pase, incluso en modo `bypassPermissions`. Es la única forma de tener una regla realmente dura (por ejemplo, "nunca commitear a `main`" o "nunca editar `.env`") en lugar de una sugerencia que el modelo suele respetar.

## Ejemplo

Bloquear ediciones a archivos protegidos con un `PreToolUse` (ejemplo literal de `code.claude.com/docs/en/hooks-guide`, actualizada 2026-09-11). Primero el script `.claude/hooks/protect-files.sh`:

```bash
#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
FILE_PATH="${FILE_PATH//\\//}"

PROTECTED_PATTERNS=(".env" "package-lock.json" ".git/")

for pattern in "${PROTECTED_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "Blocked: $FILE_PATH matches protected pattern '$pattern'" >&2
    exit 2
  fi
done

exit 0
```

Y el registro en `.claude/settings.json` (`chmod +x` el script antes):

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-files.sh" }
        ]
      }
    ]
  }
}
```

Cuando Claude intenta tocar `.env`, el hook corta la edición antes de que ocurra y le devuelve el mensaje de `stderr` como feedback para que ajuste el plan.

Otro caso real, de la misma página: reformatear con Prettier después de cada edición, usando `PostToolUse`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write" }
        ]
      }
    ]
  }
}
```

## Datos

Eventos de hooks disponibles según la referencia oficial (`code.claude.com/docs/en/hooks-guide`, 2026-09-11 y `code.claude.com/docs/en/hooks`, 2026-09-18) — la lista completa supera los 30 eventos; los más usados en la práctica:

| Categoría | Eventos |
|---|---|
| Ciclo de sesión | `SessionStart`, `Setup`, `SessionEnd` |
| Por turno | `UserPromptSubmit`, `UserPromptExpansion`, `Stop`, `StopFailure` |
| Por llamada a herramienta | `PreToolUse`, `PermissionRequest`, `PermissionDenied`, `PostToolUse`, `PostToolUseFailure`, `PostToolBatch` |
| Subagentes / equipos | `SubagentStart`, `SubagentStop`, `TaskCreated`, `TaskCompleted`, `TeammateIdle` |
| Configuración y entorno | `ConfigChange`, `InstructionsLoaded`, `CwdChanged`, `DirectoryAdded`, `FileChanged` |
| Modelo y contexto | `PreModelSwitch`, `PostModelSwitch`, `PreCompact`, `PostCompact` |

| Dato | Valor | Fuente |
|---|---|---|
| Tipos de handler de hook | `command`, `http`, `mcp_tool`, `prompt`, `agent` | code.claude.com/docs/en/hooks-guide, 2026-09-11 |
| Timeout por defecto de un hook `command`/`http`/`mcp_tool` | 10 minutos (600s) | code.claude.com/docs/en/hooks-guide, 2026-09-11 |
| Timeout por defecto de un hook `UserPromptSubmit` | 30 segundos | code.claude.com/docs/en/hooks-guide, 2026-09-11 |
| Tope de bloqueos consecutivos de un `Stop` hook antes de que Claude Code lo pase por alto | 8 veces | code.claude.com/docs/en/hooks-guide, 2026-09-11 |

## Cómo empezar

1. Abrí `~/.claude/settings.json` (o `.claude/settings.json` para compartir con el equipo) y agregá un bloque `hooks` con al menos un evento.
2. Corré `/hooks` dentro de una sesión para ver todos los hooks configurados, agrupados por evento — el menú es de solo lectura, la edición es en el archivo.
3. Probá el hook disparando la acción correspondiente y mirá la transcripción con `Ctrl+O`, o activá logging con `claude --debug-file /tmp/claude.log`.
4. Si el hook no corre, lo más común es un matcher mal escrito (son case-sensitive) o el script sin permiso de ejecución (`chmod +x`).
5. Para decisiones que necesitan criterio en vez de una regla fija, usá `type: "prompt"` (una llamada a Haiku por defecto) o `type: "agent"` (un subagente con herramientas) en lugar de un script determinístico.

## Fuentes

- [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide) — Anthropic — pub: 2026-09-11 — visto: 2026-09-20
- [Hooks reference](https://code.claude.com/docs/en/hooks) — Anthropic — pub: 2026-09-18 — visto: 2026-09-20
- [CHANGELOG.md — anthropics/claude-code](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) — Anthropic (GitHub) — pub: 2026-09-19 — visto: 2026-09-20
- [bash_command_validator_example.py](https://github.com/anthropics/claude-code/blob/main/examples/hooks/bash_command_validator_example.py) — Anthropic (GitHub) — pub: s/f — visto: 2026-09-20

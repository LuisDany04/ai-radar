---
id: claude-code-skills-comandos
title: "Skills y slash commands en Claude Code: se fusionaron en un solo formato"
track: claude-code
type: guia
level: intermedio
tags: skills, slash-commands, comandos, personalizacion
summary: "Desde la v2.1.199 (julio 2026) los slash commands personalizados y los skills son el mismo mecanismo: un SKILL.md con frontmatter. Los .claude/commands/*.md viejos siguen funcionando, pero el formato nuevo es SKILL.md con carpeta propia."
updated: 2026-09-20
reading_minutes: 7
source_span: 2026-07-02..2026-09-18
confidence: alta
---

Hasta hace poco, Claude Code trataba los "slash commands personalizados" (archivos en `.claude/commands/*.md`) y los "skills" (`SKILL.md` con carpeta propia) como dos mecanismos separados. Eso cambió: la documentación oficial dice, sin rodeos, "Custom commands have been merged into skills." Un archivo en `.claude/commands/deploy.md` y un skill en `.claude/skills/deploy/SKILL.md` hoy crean el mismo `/deploy` y funcionan igual; los archivos viejos en `commands/` se siguen leyendo, pero el formato con carpeta propia (`SKILL.md`) suma funciones que el formato plano no tiene: una carpeta para archivos de soporte, frontmatter para decidir quién puede invocar el skill, y carga automática por parte de Claude cuando el contexto lo amerita.

## Por qué importa

Si aprendiste Claude Code con documentación o cursos de 2025, es fácil quedarte con el modelo mental de "commands para atajos, skills para conocimiento". Ese modelo ya no aplica: son la misma cosa vista desde dos formatos de archivo, y el que tiene más opciones es `SKILL.md`. Además, desde la v2.1.199 los skills se pueden encadenar en una sola línea.

## Ejemplo

Un skill mínimo, en `~/.claude/skills/summarize-changes/SKILL.md`:

```yaml
---
name: summarize-changes
description: Resume cambios sin commitear y senala riesgos. Usar cuando pregunten que cambio o pidan revisar el diff.
allowed-tools: Bash(git diff *)
---

## Cambios actuales

!`git diff HEAD`

## Instrucciones

Resumi los cambios de arriba en 2-3 puntos, despues listá riesgos como
manejo de errores faltante o valores hardcodeados.
```

Se invoca con `/summarize-changes`, o Claude lo carga solo si el `description` matchea lo que le estás pidiendo. El bloque `` !`comando` `` corre en tu máquina antes de que Claude vea el contenido, y si el comando falla (exit code distinto de cero) aborta todo el skill.

Encadenar varios skills en una sola línea (soportado desde v2.1.199, fecha 2026-07-02 según el release de GitHub):

```text
/skill-a /skill-b do XYZ
```

Cada skill nombrado al inicio se carga, y el texto final (`do XYZ`) se pasa como argumento a cada uno.

Campos de frontmatter confirmados de forma literal en `code.claude.com/docs/en/skills` (actualizada 2026-09-17): `name`, `description`, `when_to_use`, `argument-hint`, `arguments`, `disable-model-invocation`, `user-invocable`, `allowed-tools`, `disallowed-tools`, `model`, `effort`, `context` (con valor `fork` para correr en un subagente), `agent`, `background`, `hooks`, `paths`, `shell`, `metadata`, `license` y `compatibility` (estos dos últimos, parte de la especificación abierta [Agent Skills](https://agentskills.io), aceptados pero sin efecto propio en Claude Code).

## Datos

| Dato | Valor | Fuente |
|---|---|---|
| Versión desde la que los slash commands son, formalmente, skills | v2.1.199 | GitHub release v2.1.199, 2026-07-02 |
| Límite de caracteres de `description` + `when_to_use` combinados antes de truncarse en el listado | 1.536 caracteres | code.claude.com/docs/en/skills, 2026-09-17 |
| Máximo de skills encadenables en una sola invocación | 6 | code.claude.com/docs/en/commands, 2026-09-18 |
| Límite recomendado de tamaño de un `SKILL.md` | 500 líneas (mover el resto a archivos de soporte) | code.claude.com/docs/en/skills, 2026-09-17 |

> [!duda] La documentación no fecha explícitamente cuándo se introdujo cada campo del frontmatter (por ejemplo `compatibility` o `license`, ligados a la especificación externa Agent Skills). Solo pudimos confirmar con fecha la fusión commands→skills (v2.1.199) y el requisito de v2.1.218 para `background: false` en skills con `context: fork`.

## Cómo empezar

1. Si venís de `.claude/commands/`, no hace falta migrar nada: sigue funcionando igual.
2. Para un skill nuevo, creá una carpeta `nombre-skill/SKILL.md` (no un archivo suelto) si vas a necesitar archivos de referencia o scripts al lado.
3. Usá `disable-model-invocation: true` cuando quieras que el skill solo se dispare a mano con `/nombre`, nunca solo.
4. Usá `context: fork` cuando el skill deba correr en un subagente aislado (por ejemplo, una investigación larga que no debe ensuciar el contexto principal).
5. Corré `/skill-doctor` (donde esté disponible) para ver cuánto contexto cuesta cada skill y qué tan seguido se usa.

## Fuentes

- [Commands](https://code.claude.com/docs/en/commands) — Anthropic — pub: 2026-09-18 — visto: 2026-09-20
- [Extend Claude with skills](https://code.claude.com/docs/en/skills) — Anthropic — pub: 2026-09-17 — visto: 2026-09-20
- [Create plugins](https://code.claude.com/docs/en/plugins) — Anthropic — pub: 2026-09-16 — visto: 2026-09-20
- [Release v2.1.199](https://github.com/anthropics/claude-code/releases/tag/v2.1.199) — Anthropic (GitHub) — pub: 2026-07-02 — visto: 2026-09-20

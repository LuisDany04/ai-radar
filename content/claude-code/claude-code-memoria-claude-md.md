---
id: claude-code-memoria-claude-md
title: "CLAUDE.md y memoria automática: qué contexto persiste entre sesiones"
track: claude-code
type: guia
level: intermedio
tags: memoria, claude-md, agents-md, contexto, configuracion
summary: "Cómo funcionan CLAUDE.md, AGENTS.md y la memoria automática (auto memory) de Claude Code: jerarquía de archivos, qué conviene escribir ahí y qué no, con ejemplos oficiales."
updated: 2026-09-20
reading_minutes: 8
source_span: 2026-09-18..2026-09-19
confidence: alta
---

Cada sesión de Claude Code arranca con una ventana de contexto vacía. Dos mecanismos distintos le dan continuidad: `CLAUDE.md` (instrucciones que tú escribes) y la memoria automática o "auto memory" (notas que Claude escribe solo a partir de tus correcciones). Son complementarios, no alternativos, y la documentación oficial es explícita en que ninguno de los dos es una capa de aplicación forzada: Claude "trata ambos como contexto, no como configuración exigida". Para bloquear algo pase lo que pase hace falta un hook `PreToolUse`, no un CLAUDE.md.

## Por qué importa

Es fácil convertir el CLAUDE.md en un basurero de instrucciones acumuladas que Claude termina ignorando parcialmente. La documentación oficial pone un límite concreto: menos de 200 líneas por archivo, porque archivos más largos "consumen más contexto y reducen la adherencia". También separa con claridad qué va en CLAUDE.md (reglas, convenciones, arquitectura) y qué va en memoria automática (preferencias, correcciones, contexto de negocio que Claude no puede deducir del código).

## Ejemplo

Jerarquía de archivos CLAUDE.md, de más general a más específico (se concatenan, no se pisan), según `code.claude.com/docs/en/memory` (actualizada 2026-09-18):

| Alcance | Ubicación | Para qué |
|---|---|---|
| Managed policy | macOS `/Library/Application Support/ClaudeCode/CLAUDE.md`, Linux/WSL `/etc/claude-code/CLAUDE.md`, Windows `C:\Program Files\ClaudeCode\CLAUDE.md` | Política de toda la organización |
| Usuario | `~/.claude/CLAUDE.md` | Preferencias personales en todo proyecto |
| Proyecto | `./CLAUDE.md` o `./.claude/CLAUDE.md` | Instrucciones de equipo, versionadas |
| Local | `./CLAUDE.local.md` | Preferencias personales de ese proyecto, en `.gitignore` |

Dentro de cada directorio, `CLAUDE.local.md` se agrega después del `CLAUDE.md` de ese nivel; y entre directorios, el contenido va de la raíz del filesystem hacia el directorio de trabajo, así que las instrucciones más cercanas a donde arrancaste Claude se leen al final (y pesan más en la práctica).

Para importar archivos dentro de un CLAUDE.md se usa `@ruta`:

```text
See @README for project overview and @package.json for available npm commands for this project.

# Additional Instructions
- git workflow @docs/git-instructions.md
```

Desde 2026, si un repo ya tiene `AGENTS.md` (el formato que usan otros agentes de código) y no hay ningún `CLAUDE.md`/`CLAUDE.local.md`, Claude Code lee `AGENTS.md` directamente sin necesidad de symlink ni import — soporte agregado en la v2.1.277 (18 de septiembre de 2026). Esto se configura con la opción **Project instructions** en `/config`, con cuatro valores posibles: `claude-md-or-agents-md` (default), `claude-md-and-agents-md`, `claude-md` o `managed-only`.

La memoria automática guarda cuatro tipos de nota, marcados con `type` en el frontmatter del archivo: `user`, `feedback`, `project` y `reference`. Vive en `~/.claude/projects/<project>/memory/`, con un índice `MEMORY.md` (se cargan solo las primeras 200 líneas o 25 KB, lo que ocurra antes) y un archivo por tema, que Claude lee bajo demanda. Es local a la máquina: no se comparte entre equipos ni entre entornos cloud. Para desactivarla en un proyecto puntual:

```json
{
  "autoMemoryEnabled": false
}
```

## Datos

| Dato | Valor | Fuente |
|---|---|---|
| Límite recomendado de un CLAUDE.md | menos de 200 líneas | code.claude.com/docs/en/memory, 2026-09-18 |
| Límite duro de tamaño de un CLAUDE.md (se ignora si se supera) | 4 MiB | code.claude.com/docs/en/memory, 2026-09-18 |
| Ventana de carga del índice de memoria automática (MEMORY.md) | primeras 200 líneas o 25 KB | code.claude.com/docs/en/memory, 2026-09-18 |
| Profundidad máxima de imports anidados con `@ruta` | 4 saltos | code.claude.com/docs/en/memory, 2026-09-18 |
| Versión desde la que Claude Code lee `AGENTS.md` directamente | v2.1.277 | GitHub release v2.1.277, 2026-09-18 |

## Debate

No encontramos una controversia pública activa sobre CLAUDE.md vs. memoria automática en foros o blogs de terceros al momento de escribir esto — es una función relativamente nueva y la documentación oficial ya viene con su propia recomendación de uso (arriba). Lo que sí es explícito en la propia documentación, y vale como advertencia práctica: dos reglas que se contradicen entre CLAUDE.md files pueden hacer que "Claude elija una de forma arbitraria", así que revisar consistencia entre archivos anidados es responsabilidad de quien mantiene el repo, no algo que Claude resuelva solo.

## Cómo empezar

1. Ejecuta `/init` para generar un CLAUDE.md inicial a partir del análisis del propio código (build commands, convenciones detectadas).
2. Suma algo a CLAUDE.md solo cuando Claude repite el mismo error dos veces, o cuando escribes la misma corrección en el chat que ya escribiste la sesión anterior.
3. Si la instrucción es un procedimiento de varios pasos o solo aplica a una parte del repo, no va en CLAUDE.md: va en un skill o en una regla con `paths:` dentro de `.claude/rules/`.
4. Verifica qué se cargó con `/context` (lista "Memory files"), y navega o edita memoria con `/memory`.
5. En monorepos, usa `claudeMdExcludes` para que no se carguen CLAUDE.md de otros equipos que no tocan tu trabajo.

## Fuentes

- [How Claude remembers your project](https://code.claude.com/docs/en/memory) — Anthropic — pub: 2026-09-18 — visto: 2026-09-20
- [CHANGELOG.md — anthropics/claude-code](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) — Anthropic (GitHub) — pub: 2026-09-19 — visto: 2026-09-20
- [Release v2.1.277](https://github.com/anthropics/claude-code/releases/tag/v2.1.277) — Anthropic (GitHub) — pub: 2026-09-18 — visto: 2026-09-20
- [Overview](https://code.claude.com/docs/en/overview) — Anthropic — pub: 2026-09-18 — visto: 2026-09-20

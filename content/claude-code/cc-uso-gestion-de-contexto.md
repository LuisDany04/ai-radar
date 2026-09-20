---
id: cc-uso-gestion-de-contexto
title: "Gestionar el contexto en Claude Code: cuando compactar, cuando empezar de cero"
track: claude-code
type: guia
level: intermedio
tags: contexto, compactacion, sesiones, rendimiento
summary: "El contexto que se acumula en una sesion larga degrada el rendimiento del modelo. Que dicen Anthropic y la investigacion de Chroma sobre cuando usar /compact, /clear o una sesion nueva."
updated: 2026-09-20
reading_minutes: 6
source_span: 2025-07-14..2026-04-28
confidence: alta
---

Claude Code guarda toda la conversación en su ventana de contexto: cada mensaje, cada archivo leído, cada salida de comando. Anthropic llama a la degradación que eso provoca "context rot": el rendimiento del modelo empeora a medida que crece el contexto, porque la atención se reparte entre más tokens y el contenido antiguo e irrelevante empieza a distraer de la tarea actual.

## Por qué importa

Según la guía oficial de Claude Code, la mayoría de las buenas prácticas existen por una sola restricción: el contexto se llena rápido y el rendimiento cae según se llena. Cuando eso pasa, Claude puede empezar a "olvidar" instrucciones anteriores o cometer más errores. Por eso Anthropic trata la ventana de contexto como el recurso más importante a gestionar, más que el propio modelo.

La investigación de Chroma sobre "context rot", publicada el 2025-07-14, es la base empírica de esa afirmación: evaluaron 18 modelos de frontera (entre ellos GPT-4.1, Claude 4 y Gemini 2.5) y encontraron que todos empeoran conforme crece la entrada, incluso en tareas simples de recuperación de información, y aunque la ventana de contexto no esté cerca de su límite.

## Ejemplo

Comandos reales documentados por Anthropic para gestionar el contexto durante una sesión:

```txt
# Compactar con instrucciones específicas sobre qué conservar
/compact Focus on the API changes

# Limpiar del todo entre tareas no relacionadas
/clear

# Resumir solo una parte de la conversación
Esc + Esc  →  elegir "Summarize from here" o "Summarize up to here"

# Instrucción persistente en CLAUDE.md sobre qué preservar al compactar
"When compacting, always preserve the full list of modified files
and any test commands"
```

La diferencia entre los dos comandos principales: `/compact` resume el historial y lo reemplaza por ese resumen, así que conserva continuidad; `/clear` borra la conversación por completo y solo deja cargado el archivo CLAUDE.md del proyecto.

## Datos

| Dato | Cifra | Fuente / fecha |
|---|---|---|
| Modelos evaluados por Chroma que muestran degradación con más contexto | 18 de 18 | Chroma, 2025-07-14 |
| Tasa de negativa a completar una tarea simple de repetición de palabras, en secuencias largas | hasta 4.21% | Chroma, 2025-07-14 |
| Respuestas incorrectas cuando hay varios "distractores" en el contexto, según configuración | ~60-70% de los casos | Chroma, 2025-07-14 |
| Ventana de contexto de Claude Code (anunciada) | 1 millón de tokens | Anthropic, 2026-04-15 |

> [!duda] Anthropic anunció una ventana de 1 millón de tokens el 2026-04-15 como mejora para tareas largas, pero un hilo de Hacker News del 2026-04-28 atribuye el inicio de la sensación de "Claude Code empeoró" justo a la introducción de ese contexto de 1M en la versión 4.6 (usuario e-nouri). No hay dato oficial que confirme o descarte una relación causal.

## Debate

La postura oficial es que un contexto más grande es una mejora neta para tareas largas, aunque advierte que el context rot puede seguir ocurriendo dentro de esa ventana ampliada. Frente a eso, en el hilo de Hacker News "Ask HN: Is it just me or is Claude Code getting worse?" (2026-04-28), el usuario idempotent_ señala que el "system prompt cruft" (relleno del propio prompt de sistema de la herramienta) contamina el contexto disponible, independientemente del tamaño de la ventana. Otro comentarista, journal, insiste en que el progreso real depende de una gestión de tokens deliberada por parte del usuario, no de confiar en los valores por defecto de la herramienta.

## Cómo empezar

- Corre `/context` para ver qué está consumiendo espacio en tu sesión actual.
- Compacta pronto: la propia guía de Anthropic recomienda no esperar a que el contexto esté casi lleno, porque el resumen se genera a partir de una conversación ya degradada.
- Usa `/clear` al cambiar de tarea no relacionada, no solo al final del día.
- Si llevas más de dos correcciones seguidas sobre lo mismo, es señal de limpiar contexto en vez de seguir corrigiendo.
- Delega exploración pesada (leer muchos archivos) a subagentes: su contexto no se suma al de tu conversación principal.

## Fuentes

- [Context Rot: How Increasing Input Tokens Impacts LLM Performance](https://www.trychroma.com/research/context-rot) — Chroma — pub: 2025-07-14 — visto: 2026-09-20
- [Using Claude Code: session management and 1M context](https://claude.com/blog/using-claude-code-session-management-and-1m-context) — Anthropic — pub: 2026-04-15 — visto: 2026-09-20
- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) — Anthropic — pub: s/f — visto: 2026-09-20
- [Manage costs effectively](https://code.claude.com/docs/en/costs) — Anthropic — pub: s/f — visto: 2026-09-20
- [Ask HN: Is it just me or is Claude Code getting worse?](https://news.ycombinator.com/item?id=47936579) — Hacker News — pub: 2026-04-28 — visto: 2026-09-20

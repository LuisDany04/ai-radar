---
id: cc-uso-plan-mode
title: "Plan mode y desarrollo dirigido por especificación: cuándo usar cada uno"
track: claude-code
type: guia
level: intermedio
tags: plan mode, especificaciones, flujo de trabajo, prompts
summary: "Plan mode resuelve tareas de una sesión; el desarrollo dirigido por especificación persiste el plan en disco. La regla práctica que usan los desarrolladores: unos 4 archivos como umbral."
updated: 2026-09-20
reading_minutes: 5
source_span: 2026-05-19..2026-05-19
confidence: alta
---

Plan mode es un modo de Claude Code en el que el agente lee archivos, ejecuta comandos de solo lectura y propone un plan, pero no edita nada hasta que lo apruebas. El desarrollo dirigido por especificación (spec-driven development, SDD) es un paso más allá: en vez de que el plan viva solo en la conversación, se escribe a un archivo (`SPEC.md` o `PLAN.md`) que sobrevive entre sesiones y pasa por revisión humana antes de implementar.

## Por qué importa

La diferencia práctica es la persistencia. Plan mode comprime exploración y planificación en un único turno de chat: funciona bien en tareas acotadas, pero según Bex Tuychiev, autor de un tutorial de DataCamp sobre SDD con Claude Code, ese enfoque "fails as soon as the codebase grows" (falla en cuanto crece la base de código). El spec-driven development, en cambio, deja un documento revisable en disco que no depende de la memoria de una sola conversación.

## Ejemplo

Para activar plan mode, Anthropic documenta dos formas:

```bash
# Alternar dentro de una sesión interactiva
Shift+Tab   # hasta ver "⏸ plan mode on"

# Arrancar directamente en plan mode
claude --permission-mode plan
```

Para spec-driven development, la guía oficial de Anthropic recomienda dejar que Claude entreviste al desarrollador antes de escribir la especificación:

```txt
I want to build [brief description]. Interview me in detail using
the AskUserQuestion tool.

Ask about technical implementation, UI/UX, edge cases, concerns, and
tradeoffs. Don't ask obvious questions, dig into the hard parts I
might not have considered.

Keep interviewing until we've covered everything, then write a
complete spec to SPEC.md.
```

Una vez escrita la especificación, Anthropic recomienda empezar una sesión nueva para implementarla, con el contexto limpio y enfocado solo en ejecutar.

## Debate

¿Cuándo conviene pasar de plan mode a una especificación persistida? Anthropic da un criterio de una frase: si puedes describir el cambio en una sola línea, no hace falta planificar. Tuychiev propone un umbral más concreto para dar el salto a SDD: alrededor de cuatro archivos afectados, un refactor con un estado final coherente, o cuando lo difícil es decidir qué debe hacer el sistema y no cómo escribir el código. Ambas fuentes coinciden en que el plan mode sin persistir es apropiado para el caso común, y que la especificación en disco se justifica solo cuando el cambio es lo bastante grande como para que valga la pena una revisión humana intermedia.

## Cómo empezar

- Para cambios pequeños o de un archivo, no actives plan mode: descríbelo directamente.
- Para cambios de varios archivos, activa plan mode, deja que Claude explore, y revisa el plan con `Ctrl+G` antes de aprobarlo.
- Para features grandes o ambiguas, pide que te entreviste con `AskUserQuestion` y que escriba el resultado a `SPEC.md` antes de tocar código.
- Empieza la implementación en una sesión nueva que solo cargue la especificación, no el historial de la entrevista.

## Fuentes

- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) — Anthropic — pub: s/f — visto: 2026-09-20
- [Choose a permission mode](https://code.claude.com/docs/en/permission-modes) — Anthropic — pub: s/f — visto: 2026-09-20
- [Manage costs effectively](https://code.claude.com/docs/en/costs) — Anthropic — pub: s/f — visto: 2026-09-20
- [Spec-Driven Development with Claude Code: A Guided Tutorial](https://www.datacamp.com/tutorial/spec-driven-development-with-claude-code) — Bex Tuychiev / DataCamp — pub: 2026-05-19 — visto: 2026-09-20

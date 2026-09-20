---
id: cc-uso-bucle-de-trabajo
title: "El bucle explorar, planificar, implementar, verificar: qué dice Anthropic y qué funciona de verdad"
track: claude-code
type: guia
level: intermedio
tags: flujo de trabajo, verificacion, plan mode, buenas practicas
summary: "Anthropic recomienda explorar y planificar antes de tocar código. Practicantes como Armin Ronacher y Birgitta Bockeler coinciden en el principio pero discrepan en cuanta autonomia darle al agente."
updated: 2026-09-20
reading_minutes: 6
source_span: 2025-06-12..2026-06-23
confidence: media
---

La guía oficial de buenas prácticas de Claude Code resume el flujo recomendado en cuatro pasos: explorar, planificar, implementar y confirmar (commit). La idea central es simple: dejar que Claude empiece a escribir código de inmediato produce con frecuencia una solución al problema equivocado, así que conviene separar la investigación y la planificación de la ejecución.

## Por qué importa

El documento de Anthropic lo plantea como una cuestión de coste de oportunidad: dejar que Claude salte directo a programar puede producir código que resuelve el problema equivocado. Para eso existe el plan mode: un modo de solo lectura donde Claude explora archivos y responde preguntas sin editar nada, y donde el desarrollador aprueba un plan antes de que se ejecute cualquier cambio.

Pero el propio documento matiza que planificar tiene coste de tiempo, y no siempre compensa. Su regla práctica: si puedes describir el diff en una sola frase, sáltate el plan.

## Ejemplo

Flujo de cuatro fases tal como lo documenta Anthropic, con los prompts reales que usa como ejemplo:

```txt
# 1. Explorar (plan mode activado con Shift+Tab)
read /src/auth and understand how we handle sessions and login.
also look at how we manage environment variables for secrets.

# 2. Planificar
I want to add Google OAuth. What files need to change?
What's the session flow? Create a plan.

# 3. Implementar (tras salir de plan mode)
implement the OAuth flow from your plan. write tests for the
callback handler, run the test suite and fix any failures.

# 4. Confirmar
commit with a descriptive message and open a PR
```

## Debate

No todos coinciden en cuánta autonomía darle al agente dentro de ese bucle. Armin Ronacher, creador de Flask, describe su forma de trabajar como asignar una tarea a un agente con permisos completos y esperar a que termine, usando casi siempre Sonnet en vez de Opus por resultarle "perfectamente adecuado". Es un extremo de confianza alta: explorar y planificar ocurren dentro del propio bucle del agente, con supervisión mínima del humano en el camino.

Meses después, el mismo Ronacher matizó esa postura para el código que más le importa. Distingue entre el "agent loop" (el modelo llamando herramientas dentro de una sesión) y el "harness loop" (un sistema externo que decide cuándo sigue el trabajo), y reconoce que ese segundo modo, más autónomo, no le ha dado buenos resultados en el código que le importa de verdad. Sobre dejar que el bucle itere solo sin revisión, advierte: "the system slowly becomes less understandable."

Birgitta Böckeler, de Thoughtworks, aporta un marco intermedio: el harness (todo lo que rodea al modelo) se compone de "guides" que dirigen al agente antes de actuar y "sensors" que verifican después. Para ella la confianza para dar más autonomía al agente se construye con esas dos piezas, no se asume de entrada.

> [!duda] Ronacher documentó públicamente dos posturas distintas en poco más de un año: alta autonomía en 2025-06-12 y cautela explícita para código crítico en 2026-06-23. No queda claro si cambió de opinión en general o si siempre distinguió por tipo de tarea.

## Cómo empezar

- Activa plan mode con `Shift+Tab` hasta ver `⏸ plan mode on`, o arranca la sesión con `claude --permission-mode plan`.
- Pide primero exploración acotada ("lee X y explícame Y"), no "investiga todo el proyecto".
- Antes de aprobar el plan, ábrelo en tu editor con `Ctrl+G` si quieres editarlo a mano.
- Reserva el plan mode para cambios de varios archivos o código que no conoces bien; sáltatelo en fixes triviales.

## Fuentes

- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) — Anthropic — pub: s/f — visto: 2026-09-20
- [Agentic Coding Recommendations](https://lucumr.pocoo.org/2025/6/12/agentic-coding/) — Armin Ronacher (lucumr) — pub: 2025-06-12 — visto: 2026-09-20
- [The Coming Loop](https://lucumr.pocoo.org/2026/6/23/the-coming-loop/) — Armin Ronacher (lucumr) — pub: 2026-06-23 — visto: 2026-09-20
- [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html) — Birgitta Bockeler / martinfowler.com — pub: 2026-04-02 — visto: 2026-09-20

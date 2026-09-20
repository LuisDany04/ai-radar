---
id: cc-uso-verificacion
title: "Verificar lo que Claude Code produce: tests, revision adversarial y el debate sobre cuanto revisar"
track: claude-code
type: guia
level: intermedio
tags: verificacion, revision de codigo, testing, calidad
summary: "Anthropic dice que dar a Claude una forma de verificar su propio trabajo es la practica mas importante de todas. El debate real es cuanta revision humana sigue haciendo falta despues."
updated: 2026-09-20
reading_minutes: 7
source_span: 2026-03-09..2026-07-22
confidence: alta
---

La guía oficial de Claude Code presenta la verificación como la práctica más importante de todas: darle a Claude un cheque que pueda ejecutar (tests, un build, una captura de pantalla comparada con un diseño) es la diferencia entre una sesión que hay que vigilar y una de la que te puedes ir. Sin ese cheque, "parece terminado" es la única señal disponible, y el humano se convierte en el bucle de verificación: cada error espera a que alguien lo note.

## Por qué importa

Anthropic describe un patrón de fallo concreto al que llama "the trust-then-verify gap": Claude produce una implementación que parece plausible pero no maneja casos límite. Su corrección es tajante: si no puedes verificarlo, no lo despliegues. Birgitta Böckeler, de Thoughtworks, lo enmarca de forma más amplia: los modelos "piensan en tokens" y no entienden de verdad el código, así que la confianza para darles más autonomía se construye con dos tipos de control -- "guides" que dirigen al agente antes de actuar y "sensors" que verifican después -- no se asume de entrada.

## Ejemplo

Prompt de verificación básica, tal como lo documenta Anthropic (antes / después):

```txt
Antes: "implement a function that validates email addresses"

Después: "write a validateEmail function. example test cases:
user@example.com is true, invalid is false, user@.com is false.
run the tests after implementing"
```

Para una segunda opinión con contexto limpio, el patrón de revisión adversarial que recomienda Anthropic:

```txt
Use a subagent to review the rate limiter diff against PLAN.md. Check
that every requirement is implemented, the listed edge cases have
tests, and nothing outside the task's scope changed. Report gaps,
not style preferences.
```

## Datos

Anthropic lanzó el 2026-03-09 un producto de revisión de código con múltiples agentes en paralelo, integrado en Claude Code para planes Team y Enterprise. Sus propias cifras:

| Métrica | Valor | Fuente |
|---|---|---|
| PRs grandes (1000+ líneas) que reciben hallazgos | 84%, con 7.5 problemas de media | Anthropic, 2026-03-09 |
| PRs pequeños (menos de 50 líneas) que reciben hallazgos | 31%, con 0.5 problemas de media | Anthropic, 2026-03-09 |
| Tasa de falsos positivos reportada | menos del 1% | Anthropic, 2026-03-09 |
| Coste por revisión | 15-25 USD de media, según tamaño | Anthropic, 2026-03-09 |
| PRs internos de Anthropic con comentarios sustantivos, antes / después de adoptar la herramienta | 16% → 54% | Anthropic, 2026-03-09 |

## Debate

¿Cuánta revisión humana sigue haciendo falta cuando el código lo escribe y lo revisa una IA? Ankit Jain, CEO de Aviator, sostiene que la revisión post-PR tal como se practicaba se está volviendo obsoleta: cita un informe de Faros según el cual el "code churn" subió 861%, los incidentes por PR subieron 243% y el 31% de los PRs se fusionan sin revisión. Su argumento de fondo es que cuando el mismo modelo escribe y revisa, comparten los mismos puntos ciegos: "they share the same blind spots". Su propuesta no es eliminar la revisión sino moverla más arriba, a la intención y los criterios de aceptación, en vez de al diff línea por línea.

Cat Wu, responsable de producto en Anthropic, defiende la postura contraria desde el lanzamiento de la herramienta: la empresa decidió enfocar la revisión automática "purely on logic errors" y la presenta como respuesta a que el volumen de código generado por IA ya supera lo que un equipo humano puede revisar a mano. En el hilo de Hacker News sobre el lanzamiento (2026-03-09), varios comentaristas cuestionan ese enfoque desde otro ángulo: jgraettinger1 observa que la herramienta "will always find about 8 issues" independientemente de la calidad real del código, y toniantunovi propone separar responsabilidades -- linters para estilo, IA solo para razonamiento complejo sobre seguridad o diseño.

## Cómo empezar

- Da criterios de verificación en el propio prompt: casos de prueba concretos, no "que funcione bien".
- Para cambios visuales, pide captura de pantalla del resultado comparada con el diseño original.
- Pide evidencia, no afirmaciones: que Claude muestre la salida del test o el comando que corrió, no que diga "ya funciona".
- Usa un subagente en contexto limpio para revisar el diff contra el plan, no contra su propio razonamiento.
- Si vas a confiar en revisión automática de PRs, decide de antemano qué tipo de hallazgos te interesan (lógica, seguridad) para no perseguir cada sugerencia de estilo.

## Fuentes

- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) — Anthropic — pub: s/f — visto: 2026-09-20
- [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html) — Birgitta Bockeler / martinfowler.com — pub: 2026-04-02 — visto: 2026-09-20
- [Code Review for Claude Code](https://claude.com/blog/code-review) — Anthropic — pub: 2026-03-09 — visto: 2026-09-20
- [Anthropic launches code review tool to check flood of AI-generated code](https://techcrunch.com/2026/03/09/anthropic-launches-code-review-tool-to-check-flood-of-ai-generated-code/) — TechCrunch — pub: 2026-03-09 — visto: 2026-09-20
- [Code Review for Claude Code (discusión)](https://news.ycombinator.com/item?id=47313787) — Hacker News — pub: 2026-03-09 — visto: 2026-09-20
- [How to kill the code review](https://www.aviator.co/blog/how-to-kill-the-code-review/) — Ankit Jain / Aviator — pub: 2026-07-22 — visto: 2026-09-20

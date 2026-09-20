---
id: cc-uso-antipatrones
title: "Antipatrones reales de Claude Code: lo que reportan los usuarios en 2026"
track: claude-code
type: opinion
level: intermedio
tags: antipatrones, quejas, calidad, hacker news
summary: "Sesion cajon de sastre, correcciones en bucle, CLAUDE.md sobrecargado. Anthropic los documenta como errores comunes; usuarios en Hacker News en 2026 los viven como quejas concretas."
updated: 2026-09-20
reading_minutes: 6
source_span: 2026-04-23..2026-04-28
confidence: media
---

La propia guía de buenas prácticas de Claude Code dedica una sección a evitar patrones de fallo comunes: errores que se repiten con la suficiente frecuencia como para que Anthropic los documente por nombre. Por separado, hilos de Hacker News de 2026 muestran cómo se sienten esos mismos patrones desde el lado del usuario cuando nadie los corrige a tiempo.

## Por qué importa

Reconocer el patrón a tiempo ahorra las horas más caras: las que se pierden corrigiendo sobre un contexto ya contaminado en vez de empezar de nuevo con un prompt mejor.

## Ejemplo

Los cinco antipatrones que documenta Anthropic, con su corrección recomendada:

| Antipatrón | Qué pasa | Corrección de Anthropic |
|---|---|---|
| La sesión cajón de sastre | Empiezas una tarea, pides algo no relacionado, vuelves a la primera; el contexto se llena de información irrelevante | `/clear` entre tareas no relacionadas |
| Corregir una y otra vez | Claude se equivoca, lo corriges, sigue mal, corriges de nuevo; el contexto queda contaminado de intentos fallidos | Tras dos correcciones fallidas, `/clear` y escribir un prompt inicial mejor |
| El CLAUDE.md sobrecargado | Si es muy largo, Claude ignora la mitad porque las reglas importantes se pierden en el ruido | Podar sin piedad; si Claude ya hace algo bien sin la instrucción, borrarla |
| El salto de confianza sin verificar | Claude produce una implementación que parece plausible pero no cubre casos límite | Dar siempre una forma de verificar (tests, scripts, capturas); si no se puede verificar, no desplegarlo |
| La exploración infinita | Pedir "investiga X" sin acotar hace que Claude lea cientos de archivos y llene el contexto | Acotar la investigación o delegarla a un subagente |

## Debate

En el hilo "Ask HN: Is it just me or is Claude Code getting worse?" (2026-04-28), el usuario tstrimple describe que versiones recientes de Opus fallan en tareas que versiones anteriores resolvían sin problema, y lo describe como un modelo "lobotomizado"; SnyDi coincide en que el modelo empeora con el tiempo. Pero rosenlykke matiza desde el mismo hilo: buena parte de lo que parece regresión del modelo puede ser deriva de configuración, ya que cambios de setup producen salidas muy distintas para la misma tarea.

En "I cancelled Claude: Token issues, declining quality, and poor support" (2026-04-24), el autor original (wg0) reporta que el código generado no cumplía los requisitos y tenía código duplicado, y que el mismo prompt produce resultados distintos cada vez, lo que le hizo dudar de si la herramienta era rentable para software de producción. Otros comentaristas del mismo hilo, sin embargo, reportan ganancias de productividad reales cuando cuidan el prompting.

Un tercer caso muestra el otro lado del problema: no es el modelo el que degrada, es un cambio no anunciado. Boris Cherny, del equipo de Claude Code, explicó en el hilo "An update on recent Claude Code quality reports" (2026-04-23) que un cambio del 26 de marzo, pensado para reducir coste limpiando el razonamiento interno de sesiones inactivas, empezó a limpiarlo en cada turno en vez de una sola vez, haciendo que Claude pareciera olvidadizo y repetitivo hasta que lo arreglaron el 10 de abril. El usuario CjHuber lo vivió como una traición: "Claude literally became useless to me". El comentarista jwr generalizó la queja: cambiar el comportamiento del producto sin avisar a quien lo usa.

## Cómo empezar

- Si notas respuestas contradictorias o "olvido" de decisiones ya tomadas, sospecha primero del contexto acumulado, no del modelo.
- Antes de asumir que el modelo empeoró, revisa si cambiaste algo de tu propia configuración (CLAUDE.md, hooks, MCP servers) recientemente.
- Trata el CLAUDE.md como código: revísalo cuando algo falle, pódalo con regularidad.
- No dejes que una sesión se convierta en cajón de sastre: una tarea, un `/clear`, la siguiente tarea.
- Cuando algo que antes funcionaba deja de hacerlo de un día para otro, busca primero si Anthropic cambió algo del lado del servidor antes de rehacer tu propio setup.

## Fuentes

- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) — Anthropic — pub: s/f — visto: 2026-09-20
- [Ask HN: Is it just me or is Claude Code getting worse?](https://news.ycombinator.com/item?id=47936579) — Hacker News — pub: 2026-04-28 — visto: 2026-09-20
- [I cancelled Claude: Token issues, declining quality, and poor support](https://news.ycombinator.com/item?id=47892019) — Hacker News — pub: 2026-04-24 — visto: 2026-09-20
- [An update on recent Claude Code quality reports](https://news.ycombinator.com/item?id=47878905) — Hacker News — pub: 2026-04-23 — visto: 2026-09-20

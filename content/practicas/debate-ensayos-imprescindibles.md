---
id: debate-ensayos-imprescindibles
title: "15 textos que definieron el debate sobre programar con IA (2025-2026)"
track: practicas
type: opinion
level: intermedio
tags: ensayos, lecturas, agentes, vibe coding, historia del debate
summary: "Una lista comentada de los textos de 2025 y 2026 que más movieron la conversación pública sobre programar con IA, desde el tweet que acuñó vibe coding hasta el informe que puso cifras a la caída de la mantenibilidad."
updated: 2026-09-21
reading_minutes: 10
source_span: 2025-02-02..2026-09-08
confidence: media
---

No hay un canon oficial de "los textos imprescindibles" sobre programar con IA, pero hay un puñado que se cita una y otra vez en los demás: acuñan un término, aportan el primer dato duro, o documentan un cambio de opinión de alguien con credibilidad técnica. Esta lista, ordenada cronológicamente, reúne los que más aparecieron al investigar el resto de las fichas de este track.

## Por qué importa

Seguir estos textos en orden deja ver algo que una sola pieza no muestra: el debate no es estático. La misma persona (Armin Ronacher, DHH) puede defender un extremo en 2025 y matizarlo o revertirlo en 2026, y los informes con cifras (METR, GitClear, Anthropic) se corrigen o se ponen en duda a sí mismos con el tiempo.

## Los 15 textos

1. **El tweet que le dio nombre al fenómeno** — Andrej Karpathy, 02-02-2025. En unas líneas describe programar "sin leer los diffs", aceptando todo lo que sugiere el modelo, "sólo para proyectos de fin de semana desechables". El término se le escapó de las manos: en menos de un año pasó de chiste interno a Palabra del Año de Collins Dictionary (noviembre de 2025, según recoge Wikipedia).

2. **La guía que popularizó el "modo YOLO"** — Armin Ronacher, "Agentic Coding Recommendations", lucumr.pocoo.org, 12-06-2025. El texto de referencia para quien defendía dar permisos amplios al agente y contenerlo con Docker en vez de revisar cada paso. Punto de partida de un arco que el propio Ronacher revertiría un año después.

3. **El cambio de nombre de "prompt engineering"** — Simon Willison, "Context engineering", simonwillison.net, 27-06-2025. Documenta, con citas de Andrej Karpathy y del CEO de Shopify Tobi Lütke, por qué la comunidad dejó de hablar de escribir prompts ingeniosos y empezó a hablar de curar todo lo que entra en la ventana de contexto.

4. **El estudio que más se cita para decir que la IA hace más lento a un desarrollador experimentado** — Joel Becker, Nate Rush, Beth Barnes y David Rein (METR), "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity", 10-07-2025. Ensayo aleatorizado con 16 desarrolladores: 19% más lentos con IA, pero convencidos de haber ido 20% más rápido.

5. **La definición oficial de context engineering** — Anthropic, "Effective context engineering for AI agents", 29-09-2025. Post técnico que fija vocabulario (context rot, compactación, subagentes) que después usa todo el resto del campo.

6. **El texto que reconoce que lo difícil no es la autonomía sino medirla** — Armin Ronacher, "Agent Design Is Still Hard", lucumr.pocoo.org, 21-11-2025. Antes de revertir su postura sobre permisos amplios, Ronacher ya señalaba que "testing and evals" era, en su experiencia, el problema más difícil del diseño de agentes de larga duración.

7. **Por qué el modo YOLO choca con el plan mode** — Armin Ronacher, "What Actually Is Claude Code's Plan Mode?", lucumr.pocoo.org, 17-12-2025. Primer indicio público de que Ronacher empezaba a preferir el control explícito (un archivo de plan que puede leer y editar) sobre la confianza ciega.

8. **El informe con más cifras en contra de la calidad del código con IA** — GitClear (Bill Harding), "The Maintainability Gap: 2026 AI Code Quality Research", enero de 2026. 623 millones de cambios de código analizados; la fuente cuantitativa más citada del bando crítico.

9. **Los datos oficiales sobre cuánto se supervisa realmente a un agente** — Anthropic, "Measuring AI agent autonomy in practice", 18-02-2026. Contrapeso directo al alarmismo sobre autonomía total: solo 0,8% de las acciones se clasifican como irreversibles y el 73% de las llamadas a herramientas tienen participación humana en algún punto.

10. **El framework que separa "vibe coding" de trabajo profesional** — Simon Willison, "Agentic Engineering Patterns", simonw.substack.com, 27-02-2026. Distingue explícitamente la codificación sin supervisión de la "ingeniería agéntica" dirigida por humanos, con pruebas automatizadas como condición de confianza.

11. **El arnés como modelo mental para confiar en un agente** — Birgitta Böckeler, "Harness engineering for coding agent users", martinfowler.com, 02-04-2026. Propone guías (controles preventivos) y sensores (controles correctivos) para dirigir la supervisión humana a donde más importa, en vez de eliminarla o aplicarla a todo por igual.

12. **La conversión de un escéptico influyente** — Gergely Orosz, "DHH's new way of writing code", newsletter.pragmaticengineer.com, 08-04-2026. Documenta cómo David Heinemeier Hansson, que meses antes escribía todo su código a mano, pasó a apenas escribir código manualmente con agentes basados en Opus 4.5.

13. **La distinción autorizada entre programación agéntica y vibe coding** — Martin Fowler, "bliki: Agentic Programming", martinfowler.com, 21-05-2026. Fowler fija el vocabulario que separa "aceptar todo sin leer" de un flujo donde el humano sigue siendo responsable y hace revisión detallada.

14. **El cierre del arco de Ronacher** — Armin Ronacher, "The Coming Loop", lucumr.pocoo.org, 23-06-2026. Un año después de defender el modo YOLO, admite: "I have not had much success with this way of working for code I deeply care about". La pieza más citada en esta ficha para mostrar que el debate cambia con la experiencia, no solo con la ideología.

15. **La crítica más reciente sobre qué se pierde al no leer el código** — Kieran Klaassen, "To Read—Or Not to Read the Code?", Every (Source Code), 08-09-2026. Argumenta que lo que un humano aporta a un flujo agéntico "no es código, sino criterio", y que automatizar sin seguir aprendiendo apaga esa capacidad de juicio.

## Debate

La propia composición de esta lista es un punto de fricción: quienes defienden la autonomía amplia (el Ronacher de 2025, el Karpathy del tweet original) están representados por textos más cortos y más viejos, mientras que las piezas más recientes —Böckeler, Klaassen, el Ronacher de 2026— tienden hacia más control humano y más lectura del código. Eso podría reflejar un cambio real de consenso o simplemente que esta selección, hecha en septiembre de 2026, pesa más lo reciente. No hay forma de descartar ese sesgo con los datos disponibles.

## Dónde queda el debate

Lo que sí puede afirmarse: varios de los textos más influyentes de 2025 fueron escritos por gente que después escribió, con su nombre, un texto igual de influyente matizando o revirtiendo lo anterior (Ronacher es el caso más claro y documentado; DHH va en la dirección contraria, de escéptico a converso). Eso sugiere que el terreno se mueve más rápido que las conclusiones fijas de cualquier ensayo individual, incluidos los de esta lista. Lo que queda abierto es si en 2027 esta selección se leerá como un mapa fiel del debate o como una foto de un momento particular —el verano boreal de 2026— que pesó más el pesimismo sobre autonomía del que pesaba un año antes.

## Fuentes

- [Andrej Karpathy on X: "vibe coding"](https://en.wikipedia.org/wiki/Vibe_coding) — recogido por Wikipedia (tweet original de Andrej Karpathy, 02-02-2025) — pub: 2025-02-02 — visto: 2026-09-21
- [Agentic Coding Recommendations](https://lucumr.pocoo.org/2025/6/12/agentic-coding/) — Armin Ronacher — pub: 2025-06-12 — visto: 2026-09-21
- [Context engineering](https://simonwillison.net/2025/jun/27/context-engineering/) — Simon Willison — pub: 2025-06-27 — visto: 2026-09-21
- [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) — METR (Joel Becker, Nate Rush, Beth Barnes, David Rein) — pub: 2025-07-10 — visto: 2026-09-21
- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — Anthropic — pub: 2025-09-29 — visto: 2026-09-21
- [Agent Design Is Still Hard](https://lucumr.pocoo.org/2025/11/21/agents-are-hard/) — Armin Ronacher — pub: 2025-11-21 — visto: 2026-09-21
- [What Actually Is Claude Code's Plan Mode?](https://lucumr.pocoo.org/2025/12/17/what-is-plan-mode/) — Armin Ronacher — pub: 2025-12-17 — visto: 2026-09-21
- [The Maintainability Gap: 2026 AI Code Quality Research](https://www.gitclear.com/the_ai_code_quality_maintainability_gap) — GitClear (Bill Harding) — pub: s/f (declara "enero de 2026" sin día exacto) — visto: 2026-09-21
- [Measuring AI agent autonomy in practice](https://www.anthropic.com/research/measuring-agent-autonomy) — Anthropic — pub: 2026-02-18 — visto: 2026-09-21
- [Agentic Engineering Patterns](https://simonw.substack.com/p/agentic-engineering-patterns) — Simon Willison — pub: 2026-02-27 — visto: 2026-09-21
- [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html) — Birgitta Böckeler, martinfowler.com — pub: 2026-04-02 — visto: 2026-09-21
- [DHH's new way of writing code](https://newsletter.pragmaticengineer.com/p/dhhs-new-way-of-writing-code) — Gergely Orosz — pub: 2026-04-08 — visto: 2026-09-21
- [bliki: Agentic Programming](https://martinfowler.com/bliki/AgenticProgramming.html) — Martin Fowler — pub: 2026-05-21 — visto: 2026-09-21
- [The Coming Loop](https://lucumr.pocoo.org/2026/6/23/the-coming-loop/) — Armin Ronacher — pub: 2026-06-23 — visto: 2026-09-21
- [To Read—Or Not to Read the Code?](https://every.to/source-code/to-read-or-not-to-read-the-code) — Kieran Klaassen, Every — pub: 2026-09-08 — visto: 2026-09-21

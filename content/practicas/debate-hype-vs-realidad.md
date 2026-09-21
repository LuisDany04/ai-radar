---
id: debate-hype-vs-realidad
title: "Hype contra realidad: las predicciones que fallaron y las que se cumplieron"
track: practicas
type: opinion
level: intermedio
tags: hype, predicciones, expectativas, evidencia, critica
summary: "Dario Amodei predijo que la IA escribiría el 90% del código en 3-6 meses; no pasó como lo dijo. Devin se vendió como 'el primer ingeniero de software de IA' y fallaba el 86% de sus tareas. Pero algo cambió de verdad entre octubre y diciembre de 2025."
updated: 2026-09-21
reading_minutes: 8
source_span: 2025-03-27..2026-07-10
confidence: media
---

Separar el hype de la sustancia requiere memoria, y este campo se mueve tan rápido que es fácil olvidar qué predicción concreta se hizo, cuándo, y si se cumplió. Dos casos —uno de una predicción de plazo y otro de un producto entero— muestran el patrón: la promesa inicial fue exagerada, pero eso no significa que no haya sustancia real detrás, solo que llegó más despacio y con más matices de los anunciados.

## Qué cambió

El 10 de marzo de 2025, en un evento del Council on Foreign Relations, Dario Amodei, CEO de Anthropic, dijo: "I think we'll be there in three to six months, where AI is writing 90 percent of the code. And then in twelve months, we may be in a world where AI is writing essentially all of the code" (reportado por LaToya Scott en Yahoo Finance/Benzinga, 27-03-2025). Un año después, en el pódcast de Dwarkesh Patel de febrero de 2026, Amodei defendió la predicción diciendo que dentro de Anthropic sí se había cumplido, pero el analista Zvi Mowshowitz, que cubrió el episodio en su newsletter (16-02-2026), concluyó que la predicción "seguía siendo claramente errónea" a nivel de industria general, aunque reconoce que Amodei acertó más que quienes no anticiparon ningún avance significativo en programación con IA.

El caso de Devin, de Cognition Labs, sigue el mismo patrón a mayor escala. Presentado el 12 de marzo de 2024 como "el primer ingeniero de software de IA", su propio benchmark autoinformado de 13,86% en SWE-bench implicaba que fallaba más del 86% de las tareas. En abril de 2024, Carl Brown (canal Internet of Bugs) mostró que el demo viral de Upwork pedía ayuda para ejecutar un modelo ya existente, no escribir código desde cero. En enero de 2025, según recoge un repaso publicado en DEV Community (Alex, vibeagentmaking.com, 10-07-2026), un equipo independiente le dio a Devin veinte tareas reales: completó tres, catorce fueron fracasos totales.

## Por qué importa

Si cada predicción exagerada se toma al pie de la letra y luego se descarta entera cuando no se cumple exactamente, se pierde la señal real que sí hay debajo. Devin no desapareció: se repreció de 500 a 20 dólares al mes (una caída de 25 veces) en abril de 2025, se reposicionó de "reemplazo autónomo" a "agente de código supervisado", y Cognition adquirió Windsurf en julio de 2025 antes de levantar 400 millones de dólares a una valuación de 10.200 millones en septiembre de ese año. La sustancia sobrevivió a la exageración inicial, con una forma mucho más modesta.

## Datos

| Predicción o afirmación | Resultado documentado | Fecha |
|---|---|---|
| Amodei: 90% del código escrito por IA en 3-6 meses | No se cumplió a nivel de industria; Amodei sostiene que sí ocurrió dentro de Anthropic | predicción: 10-03-2025 / evaluación: 16-02-2026 |
| Devin: benchmark SWE-bench autoinformado | 13,86% de éxito (>86% de fallo) | 12-03-2024 |
| Devin: prueba independiente de 20 tareas reales | 3 completadas, 14 fracasos totales | enero de 2025 |
| Devin: reposicionamiento de precio | de 500 USD/mes a 20 USD/mes + consumo (caída de 25x) | abril de 2025 |
| Cognition (empresa de Devin): valuación tras nueva ronda | 10.200 millones de dólares | septiembre de 2025 |

## Debate

**El hype es el problema central y distorsiona la conversación pública**: el propio Andrej Karpathy, referencia habitual de este campo, sirve de termómetro. Gergely Orosz documenta en su newsletter (06-01-2026) que en octubre de 2025 Karpathy describía las herramientas de agentes como decepcionantes: "Overall, the models are not there... It's slop". Casos como el de Devin —vendido como reemplazo autónomo y reducido después a herramienta supervisada de nicho— alimentan esta lectura: la distancia entre el anuncio y el producto real fue enorme, y se necesitaron analistas externos, no la propia empresa, para exponerla.

**Hay sustancia real, y llegó más rápido de lo que el propio Karpathy esperaba**: dos meses después de llamarlo "slop", en diciembre de 2025 el mismo Karpathy escribió: "I've never felt this much behind as a programmer. The profession is being dramatically refactored" (recogido en el mismo artículo de Orosz). Orosz atribuye el cambio a los lanzamientos de Opus 4.5, GPT-5.2 y Gemini 3 entre noviembre y diciembre de 2025, y lo respalda con datos concretos: Boris Cherny, creador de Claude Code, reportó 200 pull requests generados al 100% por IA en un mes; Peter Steinberger dijo que el salto de GPT-5.0 a GPT-5.2 redujo la necesidad de intervención humana "de varias veces al día a pocas veces por semana". Del lado de los datos oficiales, Anthropic documentó en febrero de 2026 ("Measuring AI agent autonomy in practice") que el percentil 99,9 de duración de turno del agente casi se duplicó (de menos de 25 a más de 45 minutos) entre octubre de 2025 y enero de 2026, un salto de capacidad medido, no anunciado.

> [!duda] No hay una definición compartida de qué cuenta como "código escrito por IA" (¿incluye autocompletado?, ¿scripts de un solo uso?, ¿código generado y luego reescrito a mano?), lo que hace casi imposible verificar de forma independiente afirmaciones como la de Amodei sobre el 90% dentro de Anthropic.

## Dónde queda el debate

Lo que parece razonablemente claro: las predicciones de plazo fijo y porcentaje exacto (90% en 3-6 meses, "el primer ingeniero de software de IA") fallan sistemáticamente por exceso de optimismo y falta de definiciones verificables, y eso se ha repetido con suficiente frecuencia —Amodei, Devin— como para tratarlo como un patrón, no una excepción. Lo que también parece claro, y es la parte que los críticos del hype a veces pasan por alto, es que debajo de esas predicciones falsas sí hubo saltos de capacidad reales y medibles, concentrados en ventanas de tiempo específicas (noviembre-diciembre de 2025, según Karpathy y Orosz) más que en una curva suave y continua. La pregunta sin resolver es cómo distinguir, en el momento en que se anuncia, cuál predicción exagerada esconde una sustancia real que tardará más de lo prometido, y cuál es simplemente ruido publicitario que no va a llegar. Con la evidencia disponible hasta septiembre de 2026, no hay un método confiable para saberlo de antemano: solo se puede juzgar en retrospectiva, como en los dos casos de esta ficha.

## Fuentes

- [Anthropic CEO Says AI Could Write '90% Of Code' In '3 To 6 Months'—Warns 'Every Industry' Will Be Affected](https://finance.yahoo.com/news/anthropic-ceo-says-ai-could-193020957.html) — LaToya Scott, Yahoo Finance/Benzinga — pub: 2025-03-27 — visto: 2026-09-21
- [On Dwarkesh Patel's 2026 Podcast With Dario Amodei](https://thezvi.substack.com/i/188060213/step-two) — Zvi Mowshowitz — pub: 2026-02-16 — visto: 2026-09-21
- [Devin, the "First AI Software Engineer," Failed 86% of Its Benchmark Tasks, and Then What](https://dev.to/vibeagentmaking/devin-the-first-ai-software-engineer-failed-86-of-its-benchmark-tasks-and-then-what-1h4a) — Alex, vibeagentmaking.com / DEV Community — pub: 2026-07-10 — visto: 2026-09-21
- [When AI writes almost all code, what happens to software engineering?](https://newsletter.pragmaticengineer.com/p/when-ai-writes-almost-all-code-what) — Gergely Orosz — pub: 2026-01-06 — visto: 2026-09-21
- [Measuring AI agent autonomy in practice](https://www.anthropic.com/research/measuring-agent-autonomy) — Anthropic — pub: 2026-02-18 — visto: 2026-09-21

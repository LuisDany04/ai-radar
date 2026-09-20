---
id: benchmarks-programacion-2026
title: "Benchmarks de programación en 2026: por qué SWE-bench Verified ya no sirve solo"
track: modelos
type: dato
level: avanzado
tags: benchmarks, swe-bench, terminal-bench, evaluacion, programacion
summary: "SWE-bench Verified, SWE-bench Pro y Terminal-Bench en septiembre de 2026: puntajes reales, quién los reportó, y por qué tres benchmarks distintos dan tres historias distintas."
updated: 2026-09-20
reading_minutes: 10
source_span: 2026-04-29..2026-09-20
confidence: media
---

En septiembre de 2026 no existe un benchmark único de programación en el que confiar a ciegas. SWE-bench Verified, el estándar de facto desde 2024, está saturado y contaminado según la propia OpenAI. Su reemplazo, SWE-bench Pro, todavía no tiene un número "canónico": tres organizaciones distintas reportan tres cifras distintas para el mismo modelo. Terminal-Bench cambió de versión (2.1 a 4.0) subiendo tanto la dificultad que los puntajes de ambas versiones no se pueden comparar entre sí. Esta ficha documenta los números disponibles y, sobre todo, sus límites.

## Por qué estos números engañan

**SWE-bench Verified está contaminado.** Según un análisis de OpenAI reportado por GIGAZINE el 29 de abril de 2026 (la publicación original de OpenAI es de febrero de 2026), la compañía auditó el 27.6% de los problemas que sus modelos fallaban con más frecuencia y encontró que al menos el 59.4% de esos problemas tenían "casos de prueba defectuosos que rechazaban respuestas funcionalmente correctas". Además, modelos de frontera podían reproducir literalmente el parche de referencia y el enunciado del problema, indicando que ya lo habían visto durante el entrenamiento. OpenAI dejó de reportar SWE-bench Verified y recomienda SWE-bench Pro en su lugar.

**SWE-bench Pro no tiene un número único.** El leaderboard oficial de Scale AI (conjunto público) muestra un modelo de Meta liderando con 61.5%, muy por debajo del 80%+ que agregadores de terceros atribuyen a modelos de Anthropic para el "mismo" benchmark. La diferencia no es un error: depende del split de datos (público vs. comercial privado), el harness/scaffold del agente, el presupuesto de reintentos y el número de corridas. El mismo modelo de Meta que saca 61.5% en el conjunto público de Scale saca 51.5% en el conjunto comercial privado de Scale — dos números "oficiales" del mismo evaluador para el mismo modelo, 10 puntos distintos.

**Terminal-Bench cambió de escala sin avisar en el número.** La versión 4.0 (actualizada el 11 de septiembre de 2026 según Artificial Analysis) es sustancialmente más difícil que la 2.1: requiere operar shells, instalar cadenas de herramientas, compilar dependencias y ejecutar los propios benchmarks como parte de la tarea. El resultado es que los mismos modelos que sacaban 85-88% en Terminal-Bench 2.1 sacan 50-60% en la versión 4.0. Comparar un "88% en Terminal-Bench" de un modelo con un "58% en Terminal-Bench" de otro sin mirar la versión es comparar dos pruebas distintas.

> [!duda] Los agregadores de terceros consultados (sitios de "pricing y benchmarks" que no son ni el evaluador oficial ni el fabricante) dieron cifras marcadamente distintas entre sí para el mismo par modelo-benchmark, incluyendo un caso de SWE-bench Verified donde tres modelos de la misma familia aparecían con 95-96%, todos "empatados" en el techo — un patrón típico de saturación, no de diferenciación real. No se incluyen esas cifras aquí porque no hay forma de verificar cuál, si alguna, es correcta.

## Datos

SWE-bench Pro, conjunto público, leaderboard oficial de Scale AI (fecha de consulta 2026-09-20, sin fecha de actualización visible en la página):

| Modelo | Resolución | Harness |
|---|---|---|
| Muse Spark 1.1 (Meta) | 61.50% ± 3.10 | mini-swe-agent |
| GPT-5.4 (xHigh) | 59.10% ± 3.56 | mini-swe-agent |
| Muse Spark (Meta) | 55.00% ± 3.60 | mini-swe-agent |
| Claude Opus 4.6 (thinking) | 51.90% ± 3.61 | mini-swe-agent |
| Gemini 3.1 Pro (thinking) | 46.10% ± 3.60 | mini-swe-agent |
| Claude Opus 4.5 | 45.89% ± 3.60 | — |
| Claude Sonnet 4.5 | 43.60% ± 3.60 | — |
| Gemini 3 Pro (preview) | 43.30% ± 3.60 | — |

Terminal-Bench 4.0, Artificial Analysis (consultado 2026-09-20):

| Modelo | Puntaje |
|---|---|
| GPT-6 Astra (xhigh) | 59.6% |
| GPT-6 Astra (max) | 59.1% |
| Claude Fable 5.1 (adaptive, xhigh, fallback por defecto) | 55.1% |

El margen de error (±3 a ±3.6 puntos porcentuales) en la tabla de SWE-bench Pro es mayor que la distancia entre varios modelos consecutivos del ranking: la diferencia entre el 4º y 5º lugar (Opus 4.6 vs. Gemini 3.1 Pro, 51.90% vs 46.10%) sí es estadísticamente significativa, pero no todos los saltos en la tabla lo son.

## Debate

**Postura 1 — los benchmarks de código ya no miden lo que dicen medir.** OpenAI, en su propio análisis (reportado por GIGAZINE, 2026-04-29), argumenta que SWE-bench Verified "ya no mide la capacidad de programación de frontera" por contaminación de datos de entrenamiento y fallas en los casos de prueba, y que hay que migrar a benchmarks con datos confidenciales como SWE-bench Pro.

**Postura 2 — incluso el reemplazo depende de quién lo corre.** El propio leaderboard de Scale AI para SWE-bench Pro muestra que el mismo modelo puede sacar 61.5% o 51.5% según el split de datos, y que agregadores externos reportan hasta 80% para modelos que Scale AI no tiene en su tabla pública con ese puntaje. Esto sugiere que el problema no es solo el benchmark (Verified vs. Pro) sino la falta de un protocolo de evaluación estandarizado (harness, reintentos, temperatura) que toda la industria siga igual.

## Cómo empezar

1. Cuando alguien cite "X% en SWE-bench", pregunta: ¿Verified o Pro?, ¿qué split?, ¿qué harness de agente?, ¿de qué fecha es el leaderboard?
2. Prioriza leaderboards con metodología pública y auditable (Scale AI publica el harness usado por fila) sobre cifras sueltas de un blog de marketing.
3. Para decisiones de producto, complementa cualquier benchmark público con un eval propio sobre tareas representativas de tu caso de uso: ningún benchmark público de 2026 está libre de saturación, contaminación o inconsistencia de scaffold.

## Fuentes

- [SWE-Bench Pro Leaderboard AI Coding Benchmark (Public Dataset)](https://labs.scale.com/leaderboard/swe_bench_pro_public) — Scale AI — pub: s/f — visto: 2026-09-20
- [Terminal-Bench 4.0 Benchmark Leaderboard](https://artificialanalysis.ai/evaluations/terminalbench-4-0) — Artificial Analysis — pub: s/f (actualizado 2026-09-11 según el propio agregador) — visto: 2026-09-20
- [OpenAI explains that the standard benchmark used to measure AI coding ability is 'no longer meaningful'](https://gigazine.net/gsc_news/en/20260429-swe-bench-verified/) — GIGAZINE — pub: 2026-04-29 — visto: 2026-09-20
- [Is SWE-bench Verified Contaminated? OpenAI Shifts to SWE-bench Pro](https://www.codesota.com/news/swe-bench-contamination-debate) — CodeSOTA — pub: s/f — visto: 2026-09-20
- [Top AI Models on OpenRouter (rankings)](https://openrouter.ai/rankings) — OpenRouter — pub: s/f (datos "a través del 19 de septiembre de 2026") — visto: 2026-09-20

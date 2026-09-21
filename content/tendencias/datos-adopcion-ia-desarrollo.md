---
id: datos-adopcion-ia-desarrollo
title: "Adopción de IA en desarrollo: cuántos programadores la usan y cuánto código escriben con ella"
track: tendencias
type: dato
level: intermedio
tags: adopcion, ia, encuestas, copilot, productividad
summary: "Entre el 84% y el 90% de los desarrolladores ya usa IA según las encuestas de 2025, pero las cifras de cuánto código generan varían mucho: de 16% a 75% según la fuente y el método."
updated: 2026-09-21
reading_minutes: 8
source_span: 2025-04-29..2026-06-26
confidence: media
---

No existe una única cifra de "adopción de IA en programación": existen varias, medidas con metodologías distintas (encuestas autoinformadas, telemetría de producto, declaraciones de ejecutivos) que no siempre son comparables entre sí. Esta ficha reúne las más citadas de 2025-2026 y marca explícitamente dónde se contradicen.

## Por qué importa

Las cifras de adopción se usan para justificar decisiones de presupuesto, contratación y política de producto. Cuando se citan sin indicar metodología ni fecha —algo muy común— se mezclan encuestas de intención ("uso o planeo usar IA"), telemetría real de aceptación de código, y declaraciones públicas de directivos sobre código interno, que miden cosas distintas y no son intercambiables.

## Datos

### Porcentaje de desarrolladores que usa herramientas de IA (encuestas)

| Fuente | Cifra | Muestra | Fecha del dato | Tipo de dato |
|---|---|---|---|---|
| Stack Overflow Developer Survey 2025 | 84% usa o planea usar IA (76% en 2024) | 49.000+ respuestas, 177 países | pub. 2025-07/08 | Autoinformado (encuesta) |
| Stack Overflow Developer Survey 2025 | 47,1% usa IA a diario (todos los encuestados) | ídem | ídem | Autoinformado (encuesta) |
| JetBrains State of Developer Ecosystem 2025 | 85% usa IA con regularidad para programar | 24.534 desarrolladores, 194 países | encuesta abr-jun 2025, pub. oct. 2025 | Autoinformado (encuesta) |
| JetBrains State of Developer Ecosystem 2025 | 62% depende de al menos un asistente/agente/editor con IA | ídem | ídem | Autoinformado (encuesta) |
| DORA State of AI-assisted Software Development 2025 | 90% de profesionales de software usa IA en el trabajo (+14 puntos vs. 2024) | ~5.000 profesionales | pub. 2025-09-23 | Autoinformado (encuesta) |
| GitHub Octoverse 2025 | 80% de desarrolladores nuevos usa Copilot en su primera semana | Telemetría de GitHub | pub. 2025-10-28 (act. 2026-02-28) | Medido (telemetría de producto) |

> [!duda] JetBrains reporta 85% de uso regular de IA pero solo 44% dice tener la IA "totalmente o parcialmente integrada" en su flujo de trabajo — la propia JetBrains lo señala como una paradoja de uso superficial vs. integración real. Fuente: [The State of Developer Ecosystem 2025](https://blog.jetbrains.com/research/2025/10/state-of-developer-ecosystem-2025/) — JetBrains — pub: 2025-10-01 — visto: 2026-09-21.

**Sobre la edición 2026:** la Stack Overflow Developer Survey 2026 abrió el 2026-06-23 y a fecha de esta ficha (2026-09-21) sus resultados **no se han publicado todavía**. Cualquier cifra que circule atribuida a "Stack Overflow 2026" corresponde en realidad a la edición 2025 mal etiquetada; no hay dato oficial de 2026 disponible aún.

### Cuánto código se genera con IA (declaraciones de empresas, no medición independiente)

| Empresa / fuente | Cifra | Fecha de la declaración | Quién lo publicó |
|---|---|---|---|
| Google (Sundar Pichai, Google Cloud Next 2026) | 75% del código nuevo de Google lo genera IA, "revisado y aprobado por ingenieros" (era 50% en otoño de 2025 y 25% a fines de 2024) | 2026-04-23 | Declaración del CEO en evento propio, recogida por prensa |
| Microsoft (Satya Nadella, LlamaCon) | 20%-30% del código en los repositorios de Microsoft está escrito por IA, con variación según el lenguaje | 2025-04-29 | Declaración del CEO en conferencia de Meta, recogida por CNBC |

> [!duda] Ni Google ni Microsoft han publicado una metodología pública de cómo miden "código generado por IA" (¿líneas sugeridas? ¿líneas aceptadas sin cambios? ¿commits con algún aporte de IA?). Son cifras autoinformadas por la propia empresa en eventos públicos, no auditorías externas. Trátense como declaraciones corporativas, no como mediciones independientes.

### Qué proporción del uso de un asistente de IA es "programar"

| Fuente | Cifra | Fecha del informe |
|---|---|---|
| Anthropic Economic Index (Claude.ai) | La programación es ~36% de las conversaciones en Claude.ai | pub. 2025-09 |
| Anthropic Economic Index — informe "Cadences" | El trabajo de código y tareas técnicas es "aproximadamente una sexta parte" (~16-17%) de las conversaciones muestreadas | pub. 2026-06-26 |

> [!duda] Los dos informes de Anthropic dan cifras muy distintas (36% vs. ~16-17%) para una pregunta similar. Anthropic no explica en el segundo informe si cambió la metodología de clasificación o si el producto cambió de mezcla de uso; el propio informe de junio de 2026 advierte que "accurately classifying the work that Claude does will remain a moving target". No se puede asumir que ambas cifras sean comparables entre sí. Fuentes: [Economic Index: Uneven AI adoption](https://www.anthropic.com/research/anthropic-economic-index-september-2025-report) — Anthropic — pub: 2025-09 — visto: 2026-09-21; [Anthropic Economic Index report: Cadences](https://www.anthropic.com/research/economic-index-june-2026-report) — Anthropic — pub: 2026-06-26 — visto: 2026-09-21.

### Adopción de Copilot en cifras absolutas (Microsoft, autoinformado)

- 4,7 millones de suscriptores de pago de GitHub Copilot, +75% interanual — reportado en la llamada de resultados de Microsoft del **2026-01-28** (FY26 Q2).
- Copilot usado en aproximadamente el 90% de las organizaciones Fortune 100, según declaraciones de Microsoft/GitHub (sin fecha de medición específica declarada).

## Debate

**Postura A — la adopción es casi total y sigue creciendo:** las cuatro encuestas grandes de 2025 (Stack Overflow, JetBrains, DORA, Octoverse) coinciden en cifras de 80-90% de uso, con crecimiento de doble dígito respecto a 2024. Quien sostiene esto: los propios publicadores de las encuestas.

**Postura B — el uso masivo no implica integración real ni confianza:** Stack Overflow 2025 encontró que la confianza en la precisión del código de IA cayó del 40% (2024) al 33% (2025), con un 46% que directamente desconfía; JetBrains encontró la brecha de 85% de uso vs. 44% de integración real. Quien sostiene esto: análisis de la propia Stack Overflow ("AI-assisted development in 2026 is ubiquitous, useful, and generating a quiet, widespread frustration") y de JetBrains sobre su propio dato.

## Fuentes

- [2025 Stack Overflow Developer Survey](https://survey.stackoverflow.co/2025/) — Stack Overflow — pub: 2025-07-01 — visto: 2026-09-21
- [Diving into the results of the 2025 Developer Survey](https://stackoverflow.blog/2025/08/01/diving-into-the-results-of-the-2025-developer-survey/) — Stack Overflow — pub: 2025-08-01 — visto: 2026-09-21
- [The 2026 Developer Survey is now open (for human developers only)!](https://stackoverflow.blog/2026/06/23/the-2026-developer-survey-is-now-open-for-human-developers-only/) — Stack Overflow — pub: 2026-06-23 — visto: 2026-09-21
- [The State of Developer Ecosystem 2025: Coding in the Age of AI, New Productivity Metrics, and Changing Realities](https://blog.jetbrains.com/research/2025/10/state-of-developer-ecosystem-2025/) — JetBrains — pub: 2025-10-01 — visto: 2026-09-21
- [Octoverse: A new developer joins GitHub every second as AI leads TypeScript to #1](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/) — GitHub — pub: 2025-10-28 — visto: 2026-09-21
- [Announcing the 2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) — Google Cloud — pub: 2025-09-23 — visto: 2026-09-21
- [El 75% del código de Google ya lo escribe una máquina, y la fábrica que lo entrena se vende al resto del mundo](https://www.infobae.com/estados-unidos/2026/04/23/google-cloud-next-2026-el-75-del-codigo-de-google-ya-lo-escribe-una-maquina-y-la-fabrica-que-lo-entrena-se-vende-al-resto-del-mundo/) — Infobae — pub: 2026-04-23 — visto: 2026-09-21
- [Satya Nadella says as much as 30% of Microsoft code is written by AI](https://www.cnbc.com/2025/04/29/satya-nadella-says-as-much-as-30percent-of-microsoft-code-is-written-by-ai.html) — CNBC — pub: 2025-04-29 — visto: 2026-09-21
- [Anthropic Economic Index report: Cadences](https://www.anthropic.com/research/economic-index-june-2026-report) — Anthropic — pub: 2026-06-26 — visto: 2026-09-21
- [Microsoft (MSFT) Q2 2026 Earnings Call Transcript](https://www.fool.com/earnings/call-transcripts/2026/01/28/microsoft-msft-q2-2026-earnings-call-transcript/) — The Motley Fool — pub: 2026-01-28 — visto: 2026-09-21

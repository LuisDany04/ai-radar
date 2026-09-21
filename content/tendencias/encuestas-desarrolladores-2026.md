---
id: encuestas-desarrolladores-2026
title: "Las cifras que importan de las grandes encuestas de desarrolladores"
track: tendencias
type: dato
level: intro
tags: encuestas, stack-overflow, jetbrains, state-of-js, muestra
summary: "Tamaño de muestra, fechas y hallazgos centrales de Stack Overflow, JetBrains y State of JS: las tres encuestas grandes con datos ya publicados en 2025-2026."
updated: 2026-09-21
reading_minutes: 6
source_span: 2025-08-01..2026-07-16
confidence: alta
---

Tres encuestas grandes con metodología pública tienen resultados publicados y disponibles a septiembre de 2026: Stack Overflow Developer Survey (edición 2025), JetBrains State of Developer Ecosystem (edición 2025) y State of JavaScript (edición 2025). Cada una mide poblaciones y preguntas distintas — no son sustituibles entre sí.

## Por qué importa

El tamaño y el sesgo de la muestra determinan qué tan generalizable es cada cifra. Una encuesta autoseleccionada de 13.000 desarrolladores de JavaScript no dice lo mismo que un panel de 24.500 usuarios de herramientas JetBrains, y ninguna de las dos es una muestra aleatoria de "todos los desarrolladores del mundo".

## Datos

### Ficha técnica de cada encuesta

| Encuesta | Edición | Muestra | Países | Período de recolección | Publicación de resultados |
|---|---|---|---|---|---|
| Stack Overflow Developer Survey | 2025 (15ª edición) | 49.000+ respuestas | 177 | no publicado en la fuente consultada | 2025-07/08 |
| JetBrains State of Developer Ecosystem | 2025 | 24.534 desarrolladores | 194 | abril-junio 2025 | 2025-10 |
| State of JavaScript (Devographics) | 2025 | 13.002 desarrolladores | no especificado en la fuente consultada | septiembre-noviembre 2025 | resultados publicados desde 2026-01, cobertura de prensa 2026-03/07 |

> [!duda] La Stack Overflow Developer Survey 2026 abrió el 2026-06-23 y, a fecha de esta ficha (2026-09-21), **no tiene resultados publicados todavía**. No hay dato oficial 2026 de Stack Overflow disponible; cualquier cifra "2026" atribuida a Stack Overflow que no cite explícitamente la fecha de publicación de resultados debe tratarse con sospecha.

### Herramientas y lenguajes (Stack Overflow 2025)

| Métrica | Cifra |
|---|---|
| Lenguaje más usado (todos los encuestados) | JavaScript, 66% |
| Segundo y tercero | HTML/CSS 61,9%, SQL 58,6% |
| Python | 57,9%, +7 puntos vs. 2024 |
| Editor/IDE más usado | Visual Studio Code, 75,9% — 4º año consecutivo como líder |
| Docker | 71,1% de uso, +17 puntos vs. 2024 |
| Modelo de IA preferido entre quienes usan IA | Claude Sonnet, 45% |

### Lenguajes (JetBrains 2025)

Según JetBrains, JavaScript se mantiene como el lenguaje más usado en general y Python como el segundo, pero el informe describe el panorama como "especialización" más que un único lenguaje dominante: Python domina en IA/ML, mientras TypeScript, Rust y Go son los que JetBrains identifica con mayor "potencial de crecimiento percibido" por los propios desarrolladores, frente a JavaScript, PHP y SQL, que el informe describe como lenguajes en meseta de madurez.

### Frameworks y build tools (State of JS 2025)

| Herramienta | Cifra |
|---|---|
| React (uso) | 83,6% |
| Vite (uso) | 84,4%, satisfacción 78,11% |
| Next.js (uso) | 58,6%, satisfacción 55% |
| Express (uso) | 79,9%, satisfacción 81% |
| Frameworks de frontend usados en promedio por respondente (carrera completa) | 2,6 |

## Debate

Las tres encuestas coinciden en que la fase de "guerra de frameworks" se está estabilizando (State of JS lo dice explícitamente: "the framework wars are effectively over"), pero difieren en énfasis: Stack Overflow pone el foco en confianza y desconfianza hacia la IA, JetBrains en la brecha entre adopción superficial e integración real, y State of JS en consolidación de herramientas de build. Ver las fichas [`datos-adopcion-ia-desarrollo`](/tendencias/datos-adopcion-ia-desarrollo) y [`estado-desarrollo-web-2026`](/tendencias/estado-desarrollo-web-2026) para el desglose de cada tema.

## Fuentes

- [2025 Stack Overflow Developer Survey](https://survey.stackoverflow.co/2025/) — Stack Overflow — pub: 2025-07-01 — visto: 2026-09-21
- [Diving into the results of the 2025 Developer Survey](https://stackoverflow.blog/2025/08/01/diving-into-the-results-of-the-2025-developer-survey/) — Stack Overflow — pub: 2025-08-01 — visto: 2026-09-21
- [The State of Developer Ecosystem 2025: Coding in the Age of AI, New Productivity Metrics, and Changing Realities](https://blog.jetbrains.com/research/2025/10/state-of-developer-ecosystem-2025/) — JetBrains — pub: 2025-10-01 — visto: 2026-09-21
- [State of JavaScript 2025: Key Takeaways for Dev Teams](https://strapi.io/blog/state-of-javascript-2025-key-takeaways) — Strapi (cobertura de los resultados de Devographics) — pub: 2026-03-18 (act. 2026-07-16) — visto: 2026-09-21
- [State of JavaScript 2025: Front-end Frameworks](https://2025.stateofjs.com/en-US/libraries/front-end-frameworks/) — Devographics / State of JS — pub: s/f — visto: 2026-09-21
- [The 2026 Developer Survey is now open (for human developers only)!](https://stackoverflow.blog/2026/06/23/the-2026-developer-survey-is-now-open-for-human-developers-only/) — Stack Overflow — pub: 2026-06-23 — visto: 2026-09-21

---
id: revision-de-codigo-generado
title: "Revisar código generado por agentes: qué se escapa y qué dicen los datos"
track: practicas
type: guia
level: intermedio
tags: revision de codigo, code review, calidad, defectos, dora
summary: "Datos publicados sobre cómo cambia la revisión de código cuando gran parte lo escribe un agente: qué se atasca, qué se escapa y qué defectos aparecen con más frecuencia."
updated: 2026-09-21
reading_minutes: 7
source_span: 2025-08-29..2026-05-04
confidence: alta
---

Generar código más rápido no acorta el ciclo completo si la revisión sigue funcionando igual que antes: varios reportes publicados entre 2025 y 2026 coinciden en que el cuello de botella se movió de "escribir" a "revisar y verificar". El "Estado de DORA" 2025 encontró que el 30% de los desarrolladores confía poco o nada en el código que genera la IA, y el reporte de balance de tensiones de DORA de 2026 describe el fenómeno como una "verification tax": el tiempo que se ahorra al escribir se reasigna a auditar (DORA, "Balancing AI tensions", 10-03-2026).

## Por qué importa

El código generado por un agente suele estar bien formateado y ser sintácticamente correcto, lo que lo hace más difícil de cuestionar en una revisión rápida: no "se ve mal", simplemente puede estar mal en un nivel que no salta a la vista —encaje arquitectónico, acoplamiento oculto entre servicios, una regla de negocio mal interpretada—. Un estudio académico a gran escala encontró además que el perfil de defectos entre código humano y código de IA es distinto, no solo su volumen: el código de los modelos analizados tiene código muerto y sentencias de depuración olvidadas con más frecuencia, y concentra más vulnerabilidades de seguridad de alto riesgo, aunque es estructuralmente más simple y repetitivo que el código humano (Cotroneo, Improta y Liguori, "Human-Written vs. AI-Generated Code: A Large-Scale Study of Defects, Vulnerabilities, and Complexity", ISSRE 2025, 29-08-2025).

## Ejemplo

LinearB analizó 8,1 millones de pull requests de 4.800 equipos en 42 países, comparando PRs sin asistencia de IA, con asistencia de IA y "agénticos" (generados por un agente que abre el PR directamente). Los PRs asistidos por IA no solo tardan más en empezar a revisarse: son notablemente más grandes y casi no incluyen refactorización, es decir, agregan código nuevo en vez de tocar el existente:

| Métrica (percentil 75) | Sin IA | Asistido por IA |
|---|---|---|
| Tamaño del PR | 157 líneas | más de 400 líneas |
| Tasa de refactorización | 37% | ~0% |

(LinearB, "8 million pull requests reveal where engineering productivity breaks down", 04-05-2026.)

DORA recomienda, frente a este patrón, cambiar dónde ocurre la verificación en vez de solo pedir más revisión humana: mover el feedback automatizado (linters, análisis estático) a la etapa de escritura, para que el agente lo resuelva antes de abrir el PR, y exigir lotes pequeños y revisables en vez de un PR grande generado de una sola vez (DORA, "Balancing AI tensions", 10-03-2026).

## Datos

| Dato | Cifra | Fuente |
|---|---|---|
| Desarrolladores con poca o ninguna confianza en código generado por IA | 30% | DORA, "State of AI-assisted Software Development" 2025, citado en 10-03-2026 |
| PRs analizados por LinearB (muestra del informe) | 8,1 millones, 4.800 equipos, 42 países | LinearB, 04-05-2026 |
| Tasa de aceptación de PR en 30 días: sin IA vs. asistido por IA | 84,5% vs. 32,7% | LinearB, 04-05-2026 |
| Tiempo de espera hasta la primera revisión: sin IA vs. asistido por IA | ~200 minutos vs. más de 16 horas | LinearB, 04-05-2026 |
| Muestra del estudio académico de defectos (Python + Java) | más de 500.000 fragmentos de código | Cotroneo, Improta y Liguori, 29-08-2025 |
| Bloques de código duplicados, cambio desde antes de la adopción masiva de IA | +81% | GitClear, "The Maintainability Gap", 01-2026 |
| Actividad de refactorización sobre el total de líneas cambiadas, 2022 vs. 2026 | 21% → 3,8% | GitClear, "The Maintainability Gap", 01-2026 |

> [!duda] Los números de LinearB y de GitClear miden cosas distintas con metodologías propias no auditadas de forma independiente (PRs de clientes de LinearB; commits analizados por GitClear con su propia herramienta). Ambos apuntan en la misma dirección —más código nuevo, menos refactorización— pero no son la misma medición y no deberían combinarse como si fueran un solo dato.

## Debate

DORA enmarca el problema como una cuestión de **proceso**: el cuello de botella no es la IA en sí, sino que el resto del ciclo de vida (revisión, aprobación, despliegue) no cambió al mismo ritmo que la generación de código, y su recomendación es rediseñar el flujo de revisión, no frenar la adopción de IA.

GitClear, en cambio, enmarca el problema como una cuestión de **resultado**: analizando 623 millones de cambios de código entre 2023 y 2026, encuentra que ante la opción de reutilizar o refactorizar código existente, los equipos ahora eligen "redundante" sobre "refactorizar" con una probabilidad ~5 veces mayor que en 2022, antes de la adopción masiva de estas herramientas (GitClear, "The Maintainability Gap", 01-2026). Es decir: aunque se arregle el cuello de botella de revisión, para GitClear el patrón de fondo —código que se acumula sin consolidarse— no se resuelve solo con revisar más rápido.

## Cómo empezar

1. No asumas que "código bien formateado" equivale a "código revisado a fondo". Pide explícitamente que el agente señale decisiones de diseño no obvias en la descripción del PR, no solo qué cambió.
2. Limita el tamaño de los PRs generados por agentes. Un PR de más de 400 líneas generado de una sola vez es, según los datos de LinearB, el patrón que menos se revisa a tiempo y menos se acepta.
3. Mueve la verificación automática (linter, análisis estático, tests) a antes de abrir el PR, para que el agente la resuelva en su propio ciclo, no la persona que revisa.
4. Presta atención especial a vulnerabilidades de seguridad y a código muerto o de depuración olvidado: son los dos patrones que el estudio de ISSRE 2025 encontró con más frecuencia en código de IA que en código humano.
5. Si el objetivo es mantenibilidad a largo plazo, revisa explícitamente si el cambio reutiliza código existente o solo agrega código nuevo: la tendencia medida por GitClear es que, sin intervención, se prefiere lo segundo.

## Fuentes

- [Balancing AI tensions: Moving from AI adoption to effective SDLC use](https://dora.dev/insights/balancing-ai-tensions/) — DORA (Google) — pub: 2026-03-10 — visto: 2026-09-21
- [8 million pull requests reveal where engineering productivity breaks down](https://linearb.io/blog/8-million-prs-engineering-productivity) — LinearB — pub: 2026-05-04 — visto: 2026-09-21
- [Human-Written vs. AI-Generated Code: A Large-Scale Study of Defects, Vulnerabilities, and Complexity](https://arxiv.org/abs/2508.21634) — Cotroneo, Improta y Liguori (ISSRE 2025) — pub: 2025-08-29 — visto: 2026-09-21
- [The Maintainability Gap: 2026 AI Code Quality Research](https://www.gitclear.com/the_ai_code_quality_maintainability_gap) — GitClear — pub: 2026-01 — visto: 2026-09-21

---
id: datos-productividad-evidencia
title: "Lo que la evidencia empírica dice (y no dice) sobre IA y productividad"
track: tendencias
type: dato
level: avanzado
tags: productividad, evidencia, metr, estudios, controversia
summary: "De los estudios controlados a las encuestas de percepción hay un abismo: unos miden +55% de velocidad, otros miden -19%. Repaso metodología, muestra y fecha de cada uno, sin promediarlos."
updated: 2026-09-21
reading_minutes: 10
source_span: 2023-02-13..2026-06-26
confidence: baja
---

La honestidad intelectual aquí importa más que en cualquier otra ficha: no hay consenso científico sobre el efecto neto de la IA en la productividad del desarrollo de software. Los estudios controlados existentes son pocos, con muestras pequeñas, en contextos muy distintos (tarea de juguete vs. repositorio real, principiante vs. experto, greenfield vs. código heredado), y dan resultados que van de "+55% más rápido" a "19% más lento". Esta ficha no promedia esos números — sería estadísticamente sin sentido — sino que los presenta uno por uno con su método.

## Por qué importa

Cualquier titular tipo "la IA hace X% más productivos a los desarrolladores" que no diga qué estudio, qué tarea y qué muestra está citando, es ruido. Distinguir experimento controlado de encuesta de percepción de telemetría de producto es la diferencia entre evidencia causal y una opinión agregada.

## Datos

### Estudios experimentales (asignación aleatoria a tratamiento/control)

| Estudio | Muestra | Tarea / contexto | Resultado | Fecha |
|---|---|---|---|---|
| Peng, Kalliamvakou, Cihon, Demirer — "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot" (Microsoft Research/GitHub/MIT) | 95 programadores profesionales | Implementar un servidor HTTP en JavaScript, tarea de laboratorio acotada | Grupo con Copilot completó la tarea **55,8% más rápido** (71 min vs. 161 min; p=0,0017; IC 95%: [21%, 89%]) | Experimento: primavera 2022. Paper: 2023-02-13 |
| GitHub + Accenture — estudio empresarial | Desarrolladores de Accenture (cifra exacta de N no publicada en el post) | Uso real de Copilot en el día a día, con telemetría DevOps | +8,69% en pull requests creados, +15% en tasa de fusión de PRs, +84% en compilaciones exitosas; ~30% de sugerencias aceptadas, 88% de caracteres sugeridos retenidos | pub. 2024-05-13 |
| METR — "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity" | 16 desarrolladores experimentados, 246 tareas | Tareas reales en repositorios open source grandes y maduros que los propios desarrolladores mantenían, con Cursor Pro + Claude 3.5/3.7 Sonnet | El grupo con IA permitida tardó **19% más** en completar las tareas (IC 95%: +2% a +39%), contra una expectativa previa de mejora del 24% | pub. 2025-07-10 |
| METR — actualización de seguimiento ("uplift update") | 57 desarrolladores (10 del estudio original + 47 nuevos), 143 repos, 800+ tareas | Igual que el estudio anterior, muestra ampliada | Desarrolladores originales: -18% (IC 95%: -38% a +9%); desarrolladores nuevos: -4% (IC 95%: -15% a +9%). Los intervalos cruzan el cero: no se puede afirmar ni mejora ni empeoramiento con esta muestra | pub. 2026-02-24 |

> [!duda] METR advierte explícitamente en la actualización de febrero de 2026 que entre el 30% y el 50% de los desarrolladores invitados **no enviaron tareas** porque preferían no trabajar sin herramientas de IA — un sesgo de selección que probablemente infla la señal negativa, porque quienes más se benefician de la IA abandonan el brazo "sin IA" del experimento. METR concluye que la verdadera aceleración "podría ser mucho mayor" que lo que mide el experimento. Fuente: [We are Changing our Developer Productivity Experiment Design](https://metr.org/blog/2026-02-24-uplift-update/) — METR — pub: 2026-02-24 — visto: 2026-09-21.

### Percepción de los propios desarrolladores (autoinformado, no medido)

| Fuente | Muestra | Pregunta | Resultado |
|---|---|---|---|
| METR, estudio de julio de 2025 | Los mismos 16 desarrolladores del RCT | Cuánto creen que la IA los aceleró, después de haber sido medidos 19% más lentos | Seguían creyendo que la IA los había acelerado **20%** |
| METR, encuesta de mayo de 2026 | 349 trabajadores técnicos (87 ingenieros de software, 71 investigadores, 129 académicos/doctorandos, 48 fundadores/gerentes) | Cambio de valor y velocidad percibidos con acceso a IA (marzo 2026) | Mediana de 1,4-2x en "valor producido" y 3x en velocidad percibida; proyectan 2,5x para marzo de 2027 |

> [!duda] El propio METR señala, comparando su encuesta de mayo de 2026 con su experimento medido de 2025, que "en un estudio de principios de 2025, las personas sobrestimaron el efecto de la IA en el tiempo en aproximadamente 40 puntos porcentuales en promedio". Es decir: la brecha entre percepción y medición real es, según su propia evidencia, sistemática y grande. Fuente: [Measuring the Self-Reported Impact of Early-2026 AI on Technical Worker Productivity](https://metr.org/blog/2026-05-11-ai-usage-survey/) — METR — pub: 2026-05-11 — visto: 2026-09-21.

### Evidencia observacional sobre calidad y mantenibilidad (no es un experimento controlado)

| Fuente | Volumen analizado | Hallazgo | Fecha |
|---|---|---|---|
| GitClear — "The Maintainability Gap: 2026 AI Code Quality Research" | 623 millones de cambios de código analizados, 2023-2026 | Duplicación de bloques de código +81% (de 40,3 a 73,0 por millón de líneas modificadas); refactorización cayó de 21% (2022) a 3,8% (2026); copy/paste subió de 9,4% (2022) a 15,7% (1er semestre 2026); conectividad entre funciones -35% desde 2023 | pub. enero de 2026 |

> [!duda] GitClear es una empresa que vende herramientas comerciales de análisis de código y tiene interés comercial en señalar estos problemas — no es un estudio independiente ni experimental, sino un análisis observacional/correlacional sobre repositorios públicos con metodología propia no revisada por pares. Se cita aquí como dato de mercado, no como evidencia causal. Fuente: [The Maintainability Gap: 2026 AI Code Quality Research](https://www.gitclear.com/the_ai_code_quality_maintainability_gap) — GitClear — pub: 2026-01 — visto: 2026-09-21.

### Lo que dice el informe DORA 2025 (correlacional, no experimental)

Ver la ficha [`dora-y-rendimiento-de-equipos`](/tendencias/dora-y-rendimiento-de-equipos) para el detalle. En resumen: DORA 2025 encuentra una relación positiva entre adopción de IA y throughput/desempeño de producto, pero una relación **negativa** con la estabilidad de entrega — y subraya que el efecto depende más de las capacidades previas del equipo que de la herramienta en sí ("AI amplifica lo que ya existe, para bien o para mal").

## Debate

**Postura A — la IA sí acelera, y de forma sustancial, en tareas acotadas:** el experimento de Peng et al. (2023) con Copilot muestra +55,8% en una tarea de laboratorio bien definida, y el estudio de Accenture muestra mejoras de doble dígito en métricas de flujo de trabajo real. Quien lo sostiene: los propios autores del paper (afiliados a Microsoft Research y GitHub) y el equipo de investigación de GitHub/Accenture — vale notar que ambos tienen interés comercial en el resultado.

**Postura B — en trabajo real, sobre código maduro y con desarrolladores expertos, la IA puede frenar:** el RCT de METR (no afiliado a ninguna empresa de IA ni de herramientas de codificación) mide 19% más lento en 2025, con una réplica en 2026 que no logra distinguirse estadísticamente de cero. Quien lo sostiene: METR, una organización sin ánimo de lucro dedicada a evaluar capacidades de IA, que además documenta que los propios desarrolladores no perciben correctamente su propia desaceleración.

**Conclusión honesta:** los estudios no son comparables entre sí porque miden tareas, poblaciones y herramientas distintas. La evidencia más rigurosa metodológicamente (asignación aleatoria) es también la más pequeña en tamaño de muestra. No hay, a septiembre de 2026, un estudio a gran escala, aleatorizado y replicado que zanje la pregunta "¿la IA hace más productivos a los desarrolladores, en general?". Cualquier respuesta categórica a esa pregunta va más allá de lo que la evidencia publicada permite afirmar.

## Fuentes

- [The Impact of AI on Developer Productivity: Evidence from GitHub Copilot](https://arxiv.org/abs/2302.06590) — arXiv / Microsoft Research, GitHub, MIT Sloan — pub: 2023-02-13 — visto: 2026-09-21
- [Research: Quantifying GitHub Copilot's impact in the enterprise with Accenture](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/) — GitHub Blog — pub: 2024-05-13 — visto: 2026-09-21
- [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) — METR — pub: 2025-07-10 — visto: 2026-09-21
- [We are Changing our Developer Productivity Experiment Design](https://metr.org/blog/2026-02-24-uplift-update/) — METR — pub: 2026-02-24 — visto: 2026-09-21
- [Measuring the Self-Reported Impact of Early-2026 AI on Technical Worker Productivity](https://metr.org/blog/2026-05-11-ai-usage-survey/) — METR — pub: 2026-05-11 — visto: 2026-09-21
- [The Maintainability Gap: 2026 AI Code Quality Research](https://www.gitclear.com/the_ai_code_quality_maintainability_gap) — GitClear — pub: 2026-01 — visto: 2026-09-21
- [Announcing the 2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) — Google Cloud — pub: 2025-09-23 — visto: 2026-09-21

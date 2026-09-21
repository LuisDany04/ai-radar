---
id: debate-calidad-del-codigo
title: "¿La IA está degradando la calidad del código? La evidencia, en disputa"
track: practicas
type: opinion
level: intermedio
tags: calidad de codigo, deuda tecnica, productividad, mantenibilidad, metricas
summary: "GitClear mide más duplicación y menos refactorización desde que se generaliza el código asistido por IA; METR retractó la confianza en su propio estudio de lentitud; DORA dice que la IA amplifica lo que cada equipo ya era."
updated: 2026-09-21
reading_minutes: 8
source_span: 2025-02-17..2026-06-23
confidence: media
---

Dos preguntas distintas se mezclan todo el tiempo en este debate y conviene separarlas: ¿la IA hace más lentos o más rápidos a los desarrolladores?, y ¿el código que produce ese trabajo es peor que el que se escribía antes? La evidencia de 2025-2026 da respuestas distintas a cada una, y ninguna de las dos está cerrada.

## Por qué importa

Si el código generado con IA acumula deuda técnica más rápido de lo que se detecta en revisión, el ahorro de tiempo al escribirlo se paga después, con intereses, en mantenimiento. Si además la percepción de velocidad de los propios desarrolladores no coincide con la realidad medida, ninguna de las dos partes del debate puede apoyarse solo en "a mí me funciona".

## Datos

GitClear analizó 623 millones de cambios de código entre 2023 y 2026 y publicó estas cifras en su informe "The Maintainability Gap" (enero de 2026):

| Señal | Cambio reportado |
|---|---|
| Copy/paste dentro de un commit | +41% (llega a 15,7% de las líneas modificadas en 2026, frente a 9,4% en 2022) |
| Duplicación de bloques de código | +81% |
| Construcciones que enmascaran errores (catch vacíos, etc.) | +47% |
| Churn de código a dos semanas | +15% |
| Líneas movidas por refactorización | −70% |
| Mantenimiento de código heredado a largo plazo | −74% (de 1,7% a 0,46% de las líneas) |
| Llamadas a funciones entre archivos (conectividad) | de 343 a 223 por cada mil líneas cambiadas (−35%) |

En paralelo, el estudio aleatorizado de METR "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity" (10-07-2025, autores Joel Becker, Nate Rush, Beth Barnes y David Rein) encontró que 16 desarrolladores con experiencia previa en sus propios repositorios tardaron **19% más** en completar 246 tareas cuando podían usar IA (principalmente Cursor Pro con Claude 3.5/3.7 Sonnet), pese a que antes de empezar esperaban ir **24% más rápido** y, terminado el experimento, seguían creyendo que habían ido **20% más rápido**.

## Debate

**La IA degrada la calidad**: Bill Harding, fundador de GitClear, sostiene que el patrón que ve en los datos no es casualidad sino un estilo de trabajo del modelo: "AI strongly prefers to write code that won't be labeled as a defect", lo que en la práctica produce código que atrapa errores sin resolver su causa. Su conclusión es que la IA favorece la generación de código nuevo sobre la reutilización o el arreglo de lo existente. Armin Ronacher, mucho más favorable a los agentes en general, coincide en el diagnóstico de calidad en "The Coming Loop" (lucumr.pocoo.org, 23-06-2026): describe el código que producen los modelos actuales como demasiado defensivo, demasiado complejo y "too local in its reasoning", y afirma no ver progreso en ese frente.

**La evidencia es más débil o está mal interpretada de lo que parece**: Rob Bowley, en su blog (17-02-2025, sobre un informe previo de GitClear con la misma metodología), acepta que las señales de calidad son malas pero cuestiona la causalidad exclusiva de la IA: apunta a los recortes de personal técnico del mismo periodo como factor de confusión, y concluye que "code quality is suffering badly (and GenAI, at the very least, isn't helping)" sin llegar a culpar solo a la IA. Sobre el propio estudio de lentitud, METR publicó en febrero de 2026 una revisión de su diseño experimental ("We are Changing our Developer Productivity Experiment Design", 24-02-2026) en la que reconoce que su nuevo experimento sufre "sesgo selectivo" (los desarrolladores que aceptan participar sin usar IA no son representativos) y admite textualmente que sus datos actuales son "solo evidencia muy débil del tamaño" de cualquier mejora de productividad, aunque sospechan que los desarrolladores van hoy más rápido con IA que lo que medían a inicios de 2025. El informe DORA 2026 de Google Cloud, cubierto por Matt Saunders en InfoQ (11-05-2026), ofrece una tercera lectura: la IA no cambia la calidad de forma uniforme, la amplifica en la dirección que ya tenía cada equipo, y buena parte de lo que se lee como pérdida de productividad es en realidad un "verification tax": el tiempo que antes se iba en escribir código ahora se va en revisarlo.

> [!duda] GitClear presenta sus hallazgos como correlación entre el porcentaje de código asistido por IA y el deterioro de las señales de mantenibilidad, no como una prueba de causalidad directa. El propio informe no aísla otras variables (recortes de personal, presión de entrega) que podrían explicar parte del mismo patrón.

## Dónde queda el debate

Lo que parece razonablemente sólido: las métricas de mantenibilidad tradicionales (duplicación, refactorización, conectividad entre funciones) sí se mueven en la dirección negativa desde que el código asistido por IA se generalizó, y eso lo reportan tanto quien mide en serio (GitClear) como quien lo critica (Bowley coincide en que "no está ayudando"). Lo que sigue sin resolverse es la causalidad y la velocidad: nadie ha aislado el efecto de la IA del de los despidos, la presión de entrega o el simple crecimiento del volumen de código; y el propio METR, la fuente más citada para decir que la IA hace más lentos a los desarrolladores, ahora dice públicamente que no confía en la magnitud de sus propios números más recientes. La lectura de DORA —que la IA amplifica la disciplina o el desorden que ya existía en un equipo— es la que mejor concilia datos que, tomados por separado, parecen contradictorios.

## Fuentes

- [The Maintainability Gap: 2026 AI Code Quality Research](https://www.gitclear.com/the_ai_code_quality_maintainability_gap) — GitClear (Bill Harding) — pub: s/f (declara "enero de 2026" sin día exacto) — visto: 2026-09-21
- [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) — METR (Joel Becker, Nate Rush, Beth Barnes, David Rein) — pub: 2025-07-10 — visto: 2026-09-21
- [We are Changing our Developer Productivity Experiment Design](https://metr.org/blog/2026-02-24-uplift-update/) — METR — pub: 2026-02-24 — visto: 2026-09-21
- [DORA 2026: The ROI of AI in Software Development Runs Through Code Review](https://www.infoq.com/news/2026/05/dora-roi-ai-assisted-dev-report/) — Matt Saunders, InfoQ — pub: 2026-05-11 — visto: 2026-09-21
- [Gitclear's latest report indicates GenAI is having a negative impact on code quality](https://blog.robbowley.net/2025/02/17/gitclears-latest-report-indicates-genai-is-having-a-negative-impact-on-code-quality/) — Rob Bowley — pub: 2025-02-17 — visto: 2026-09-21
- [The Coming Loop](https://lucumr.pocoo.org/2026/6/23/the-coming-loop/) — Armin Ronacher — pub: 2026-06-23 — visto: 2026-09-21

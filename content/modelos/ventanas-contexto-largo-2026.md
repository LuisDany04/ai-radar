---
id: ventanas-contexto-largo-2026
title: "Ventanas de contexto largas: quién ofrece qué y si de verdad se puede usar todo"
track: modelos
type: dato
level: avanzado
tags: contexto-largo, benchmarks, precios, degradacion
summary: "Comparación de precios por umbral de contexto entre Anthropic, OpenAI, Google y xAI, más la evidencia sobre degradación de calidad al usar contexto largo."
updated: 2026-09-20
reading_minutes: 8
source_span: 2026-09-20..2026-09-20
confidence: media
---

Los cuatro laboratorios grandes anuncian ventanas de 500K a 1M de tokens, pero difieren en algo más importante que el tamaño anunciado: cómo cobran ese tamaño y qué tan bien lo usa el modelo. Esta ficha separa las dos preguntas.

## Datos: precio por umbral de contexto

| Proveedor | Ventana anunciada | Umbral de recargo | Recargo |
|---|---|---|---|
| Anthropic (Claude 4.6 en adelante) | 1M tokens | Ninguno | El precio por token es el mismo en toda la ventana |
| OpenAI (GPT-6 Astra, GPT-5.6 Sol/Terra) | 1M tokens | 272K tokens | 2x en entrada (y en cache-write/cache-read); ~1.5x en salida |
| Google (Gemini 3.1 Pro) | 1M tokens | 200K tokens | De $2/$12 a $4/$18 por millón (entrada/salida) |
| xAI (Grok 4.6) | 500K tokens | 200K tokens | De $2/$6 a $4/$12 por millón (entrada/salida) |

Anthropic es, de los cuatro, el único que documenta explícitamente no aplicar recargo dentro del 1M de contexto: "una solicitud de 900k tokens se cobra a la misma tarifa por token que una de 9k". Los otros tres cobran hasta el doble por cruzar un umbral que va de 200K a 272K tokens, independientemente de si el modelo aprovecha bien esos tokens adicionales.

## Debate: ¿el contexto anunciado es el contexto útil?

**Postura 1 — el número de la ficha técnica no es el número que importa.** El benchmark RULER, publicado por NVIDIA (repositorio público en GitHub, metodología descrita en su paper original de 2024 y todavía usado como referencia en 2026), mide la "longitud de contexto efectiva" con tareas sintéticas de recuperación y agregación de múltiples datos, no solo con una aguja en un pajar. Su hallazgo original —que sigue citándose como marco de referencia— es que "casi todos los modelos caen por debajo del umbral de calidad antes de alcanzar la longitud de contexto anunciada". La compilación de resultados 2026 del leaderboard RULER (visible en agregadores de benchmarks) sitúa al modelo líder actual, Nemotron 3 Ultra de NVIDIA, en 0.947 sobre 1.0 — un resultado alto, pero de un solo modelo entre los evaluados, no una validación de que "1M anunciado = 1M útil" sea la norma.

**Postura 2 — los benchmarks de razonamiento en contexto largo muestran que sí hay progreso real, aunque incompleto.** Artificial Analysis diseñó específicamente AA-LCR (Long Context Reasoning) para medir esto: 100 preguntas que exigen razonar sobre documentos de 10.000 a 100.000 tokens combinando información de varias partes del texto, no solo recuperar un dato puntual. Según el leaderboard de AA-LCR consultado el 20 de septiembre de 2026, Kimi K3 lidera con 88.7%, seguido por Claude Fable 5.1 con 85.3% — puntajes que indican que al menos en la tarea de "razonar sobre ~100K tokens dispersos en varios documentos", los modelos de frontera de 2026 superan ampliamente el "menos del 50% de precisión" que, según cobertura de investigación de 2026, lograban los modelos de mediados de 2024 en tareas de dificultad comparable.

> [!duda] No encontré, dentro de lo que pude verificar con WebFetch en esta sesión, un benchmark que mida específicamente la degradación de un mismo modelo de frontera de 2026 (por ejemplo, Fable 5.1) a distintas profundidades de un contexto de 1M de tokens completo. AA-LCR usa documentos de hasta 100K tokens, muy por debajo de la ventana anunciada de 1M; RULER es la referencia más citada para longitudes mayores, pero los resultados 2026 específicos que encontré para modelos de esta ficha (Claude, GPT, Gemini, Grok) en RULER no pude confirmarlos con una fuente que pudiera abrir. El fenómeno de "lost in the middle" (pérdida de precisión cuando el dato relevante está en medio del contexto, no al principio o al final) está bien documentado en la literatura académica desde 2023-2024, pero no tengo una cifra 2026 específica y verificada por modelo para incluir aquí.

## Por qué importa

Pagar por una ventana de 1M de tokens no garantiza que el modelo use esos tokens de manera uniforme. Si el patrón de "lost in the middle" sigue vigente, la ubicación de la información relevante dentro del prompt (al inicio, al final, o enterrada en medio de un documento largo) puede importar tanto como el tamaño total del contexto. Esto tiene una consecuencia práctica directa: dos proveedores con la misma ventana anunciada (Anthropic y OpenAI, ambos en 1M) no necesariamente ofrecen la misma calidad de recuperación a 500K tokens, y solo un benchmark de razonamiento en contexto largo —no la cifra de la ficha técnica— puede indicar la diferencia.

## Cómo empezar

1. No asumas que "más contexto anunciado" es igual a "mejor recuperación": pide o corre un benchmark tipo aguja-en-el-pajar o RULER sobre tu propio caso de uso antes de diseñar un flujo que dependa de recuperar un dato específico enterrado en un documento largo.
2. Si tu tarea requiere razonar (no solo recuperar) sobre varios documentos largos, mira benchmarks de razonamiento en contexto largo como AA-LCR en vez de benchmarks de recuperación pura.
3. Calcula el costo real de cruzar el umbral de recargo (200K–272K según proveedor) antes de decidir si conviene resumir/compactar el contexto o pagar el precio de contexto largo.

## Fuentes

- [Pricing](https://platform.claude.com/docs/en/about-claude/pricing) — Anthropic — pub: s/f — visto: 2026-09-20
- [Pricing](https://ai.google.dev/gemini-api/docs/pricing) — Google AI for Developers — pub: s/f — visto: 2026-09-20
- [Grok Models & Pricing](https://docs.x.ai/developers/models) — xAI — pub: s/f — visto: 2026-09-20
- [Artificial Analysis Long Context Reasoning Benchmark Leaderboard](https://artificialanalysis.ai/evaluations/artificial-analysis-long-context-reasoning) — Artificial Analysis — pub: s/f — visto: 2026-09-20
- [NVIDIA/RULER](https://github.com/NVIDIA/RULER) — NVIDIA (GitHub) — pub: s/f — visto: 2026-09-20

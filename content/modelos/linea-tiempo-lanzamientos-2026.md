---
id: linea-tiempo-lanzamientos-2026
title: "Línea de tiempo: lanzamientos de modelos de 2026 con fecha verificada"
track: modelos
type: release
level: intro
tags: lanzamientos, timeline, modelos, 2026
summary: "Fechas exactas y verificadas de los lanzamientos de modelos más relevantes de 2026, de enero a septiembre, con la fuente primaria de cada una."
updated: 2026-09-20
reading_minutes: 6
source_span: 2026-02-19..2026-09-04
confidence: alta
---

Cronología de lanzamientos de modelos de lenguaje relevantes en 2026, ordenada por fecha, con solo los eventos cuya fecha pude confirmar en una fuente que abrí en esta sesión. Es una selección, no un registro exhaustivo de cada actualización menor.

## Datos

| Fecha | Lanzamiento | Detalle verificado |
|---|---|---|
| 2026-02-19 | Gemini 3.1 Pro (preview) | Google anuncia un salto en razonamiento central; ARC-AGI-2 pasa a 77.1%, "más del doble" del resultado de Gemini 3 Pro. Ventana de 1M de tokens. |
| 2026-04-08 | Meta Muse Spark | Primer modelo de frontera de pesos cerrados de Meta, construido por la nueva Superintelligence Labs; marca un giro respecto a la estrategia histórica de pesos abiertos de Llama (ver nota de incertidumbre abajo). |
| 2026-06-09 | Claude Fable 5 y Claude Mythos 5 | Anthropic libera al público Fable 5, un modelo "de clase Mythos" con salvaguardas, y mantiene Mythos 5 de acceso restringido para el Project Glasswing. |
| 2026-08-03 | Qwen3.8-Max | Alibaba lanza su modelo más capaz hasta la fecha: 2.4 billones de parámetros MoE, contexto de 1M de tokens, $2/$6 por millón de tokens de entrada/salida. Pesos abiertos anunciados para la semana siguiente. |
| 2026-08-12 | Grok 4.6 | xAI lanza su modelo insignia: contexto de 500K tokens, $2/$6 por millón de tokens por debajo de 200K de entrada. |
| 2026-09-01 | Claude Fable 5.1 y Claude Mythos 5.1 | Anthropic actualiza la clase Fable/Mythos: costo ~25% menor en cargas típicas, lectura de caché 75% más barata, salvaguardas de ciberseguridad con 60% menos falsos positivos según la propia compañía. |
| 2026-09-03/04 | GPT-6 Astra | OpenAI lanza su modelo más capaz; primero a usuarios aprobados el 3 de septiembre, disponibilidad general al día siguiente. Primer modelo de OpenAI en alcanzar el nivel "Crítico" de capacidad de ciberseguridad bajo su Preparedness Framework, con capacidades sensibles limitadas a un programa de acceso confiable. |

> [!duda] La fecha y el alcance exacto de varios lanzamientos de pesos abiertos de mediados de 2026 (GLM-5.3 de Z.ai, DeepSeek V4 Pro/Flash) no pude fijarlos con un día exacto en una fuente que pude abrir: las tarjetas de modelo y la documentación de Z.ai no exponen fecha de publicación, y la cobertura de prensa que sí da fechas específicas (agosto de 2026 para GLM-5.3, abril-agosto de 2026 para las variantes de DeepSeek V4) no pude verificarla con WebFetch en esta sesión. Se omiten de la tabla principal por esa razón, aunque se documentan con lo que sí pude verificar en la ficha de pesos abiertos.

> [!duda] La situación de Meta respecto a "Llama 5" en 2026 es contradictoria entre fuentes: el blog oficial de Meta no muestra ningún anuncio de una nueva generación Llama en 2026, mientras múltiples sitios de terceros describen lanzamientos con fechas y especificaciones distintas entre sí. Ver la ficha de pesos abiertos para el detalle. Por esa razón, esta línea de tiempo solo incluye el lanzamiento confirmado de Muse Spark (pesos cerrados), no ningún supuesto lanzamiento de Llama en 2026.

## Por qué importa

En ocho meses (febrero a septiembre de 2026), los cuatro laboratorios grandes lanzaron o actualizaron su modelo insignia al menos una vez cada uno, y dos laboratorios de pesos abiertos (Alibaba, xAI parcialmente) lanzaron modelos de frontera con menos de dos semanas de diferencia entre sí (Qwen3.8-Max el 3 de agosto, Grok 4.6 el 12 de agosto). Cualquier comparación de "el mejor modelo disponible" tiene una fecha de caducidad de semanas, no de meses.

## Cómo empezar

1. Si vas a citar "el modelo más reciente" en una decisión de producto, anota la fecha de tu verificación junto con el nombre del modelo: en este panorama, "más reciente" cambia varias veces por trimestre.
2. Antes de migrar a un modelo recién anunciado, espera a que su documentación de precios y su model card estén completas: en el caso de Qwen3.8-Max, Alibaba lanzó el servicio de pago antes de publicar tabla de benchmarks, licencia o conteo de parámetros activos.
3. Cuando una nota de prensa hable de un lanzamiento "de días atrás" sin fecha exacta, trata la afirmación con cautela: en esta investigación, varias fuentes secundarias daban fechas distintas para el mismo lanzamiento.

## Fuentes

- [Gemini 3.1 Pro: A smarter model for your most complex tasks](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/) — Google — pub: 2026-02-19 — visto: 2026-09-20
- [Introducing Claude Fable 5.1 and Claude Mythos 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1) — Anthropic — pub: 2026-09-01 — visto: 2026-09-20
- [Anthropic upgrades Claude with new Fable 5.1 model, details here](https://9to5mac.com/2026/09/01/anthropic-upgrades-claude-with-new-fable-5-1-model-details-here/) — 9to5Mac — pub: 2026-09-01 — visto: 2026-09-20
- [Introducing Grok 4.6](https://x.ai/news/grok-4-6) — xAI — pub: 2026-08-12 — visto: 2026-09-20
- [Alibaba Qwen Releases Qwen3.8-Max](https://www.marktechpost.com/2026/08/03/alibaba-qwen-releases-qwen3-8-max/) — MarkTechPost — pub: 2026-08-03 — visto: 2026-09-20
- [OpenAI releasing major upgrade to ChatGPT and Codex with GPT-6 Astra, details here](https://9to5mac.com/2026/09/04/openai-releasing-major-upgrade-to-chatgpt-and-codex-with-gpt-6-astra-details-here/) — 9to5Mac — pub: 2026-09-04 — visto: 2026-09-20
- [Meta AI blog](https://ai.meta.com/blog/) — Meta — pub: s/f (listado consultado el 2026-09-20) — visto: 2026-09-20

---
id: mapa-modelos-vigentes-2026
title: "Mapa de modelos vigentes: quién cobra qué en septiembre de 2026"
track: modelos
type: comparativa
level: intermedio
tags: modelos, precios, contexto, comparativa, anthropic, openai, google, xai
summary: "Tabla verificada de familia, modelo, fecha, contexto y precio por millón de tokens de los modelos de pago vigentes en septiembre de 2026, con fuente primaria por proveedor."
updated: 2026-09-20
reading_minutes: 9
source_span: 2025-12-02..2026-09-20
confidence: alta
---

Cuatro laboratorios (Anthropic, OpenAI, Google y xAI) controlan la mayoría del tráfico de pago en septiembre de 2026, cada uno con una familia de 3-4 modelos escalonados por precio. Esta ficha reúne los precios y ventanas de contexto **verificados hoy** contra la documentación oficial de cada proveedor. Los precios de pesos abiertos (DeepSeek, Qwen, GLM, Kimi, Mistral) se cubren con más detalle en la ficha de pesos abiertos; aquí se listan solo para comparar.

## Tabla comparativa

Precios en USD por millón de tokens (MTok), entrada/salida, sin caché ni batch. "Mejor para" resume la descripción oficial del proveedor, no un benchmark.

| Familia | Modelo | Lanzamiento | Contexto | Precio entrada/salida (MTok) | Mejor para |
|---|---|---|---|---|---|
| Anthropic | Claude Fable 5.1 | 2026-09-01 | 1M tokens | $10 / $50 | Razonamiento exigente y trabajo agéntico de largo horizonte |
| Anthropic | Claude Opus 5 | s/f (vigente) | 1M tokens | $5 / $25 | Programación agéntica compleja y trabajo empresarial |
| Anthropic | Claude Sonnet 5 | s/f (vigente) | 1M tokens | $2 / $10 | Mejor combinación de velocidad e inteligencia |
| Anthropic | Claude Haiku 4.5 | s/f (vigente) | 200K tokens | $1 / $5 | El modelo más rápido con inteligencia casi de frontera |
| OpenAI | GPT-6 Astra | 2026-09-03 | 1M tokens (272K sin recargo) | $10 / $50 (hasta 272K); $20 / $75 sobre 272K | El modelo más capaz para trabajo de extremo a extremo |
| OpenAI | GPT-5.6 Sol | s/f (vigente) | 1M tokens (272K sin recargo) | $5 / $30 (hasta 272K); $10 / $45 sobre 272K | Trabajo profesional complejo con rendimiento equilibrado |
| OpenAI | GPT-5.6 Terra | s/f (vigente) | 1M tokens (272K sin recargo) | $2 / $12 (hasta 272K); $4 / $18 sobre 272K | Balance inteligencia-costo para cargas generales |
| OpenAI | GPT-5.6 Luna | s/f (vigente) | 1M tokens | $0.20 / $1.20 | Aplicaciones de alto volumen sensibles al costo |
| Google | Gemini 3.1 Pro (preview) | 2026-02-19 | 1M tokens | $2 / $12 (≤200K); $4 / $18 (>200K) | Razonamiento central para problemas complejos |
| Google | Gemini 3.6 Flash | s/f (vigente) | no verificado aquí | $0.75 / $3.75 (hasta 2026-12-31; luego $1.50 / $7.50) | Relación precio-rendimiento |
| Google | Gemini 3.1 Flash-Lite | s/f (vigente) | no verificado aquí | $0.25 / $1.50 | Trabajo de alto volumen |
| xAI | Grok 4.6 | 2026-08-12 | 500K tokens | $2 / $6 (<200K); $4 / $12 (≥200K) | Agentes de largo horizonte y trabajo interactivo/visual |
| xAI | Grok 4.3 | s/f (vigente) | 1M tokens | $1.25 / $2.50 (<200K); $2.50 / $5 (≥200K) | Uso general de menor costo con contexto amplio |
| xAI | Grok Build 0.1 | s/f (vigente) | 256K tokens | $1 / $2 (<200K); $2 / $4 (≥200K) | Programación específica, más barato que el resto de la gama |

> [!duda] La documentación oficial de OpenAI y de xAI no publica una fecha de lanzamiento explícita para cada variante (por ejemplo GPT-5.6 Sol/Terra/Luna o Grok 4.3): solo confirman que el modelo está "vigente" en sus tablas de precios de hoy. Donde no encontré una fecha exacta en una fuente que pude abrir, escribí "s/f (vigente)" en vez de inventarla.

## Por qué importa

El precio de entrada varió mucho entre generaciones en 2026: Anthropic congeló el precio de lanzamiento de Sonnet 5 ($2/$10) en vez de subirlo a $3/$15 como estaba anunciado para el 1 de septiembre de 2026, y OpenAI aplicó un recorte del 80% a GPT-5.6 Luna el 30 de julio de 2026. Elegir modelo por precio de tabla sin mirar la fecha de la última revisión de precios puede llevar a comparar una promoción con un precio ya retirado.

También cambió la forma de cobrar el contexto largo: Anthropic factura el 1M de contexto completo al mismo precio por token en toda la ventana ("una solicitud de 900k tokens se cobra a la misma tarifa por token que una de 9k", según su documentación), mientras que OpenAI, Google y xAI mantienen un recargo (hasta 2x) por encima de un umbral (272K en OpenAI, 200K en Google y xAI). Ver la ficha de ventanas de contexto largas para el detalle y el debate sobre si esos tokens "extra" realmente se usan bien.

## Datos

Precio de entrada por millón de tokens de los modelos insignia (el más caro de cada proveedor), septiembre de 2026:

| Proveedor | Modelo insignia | Entrada | Salida | Ventana |
|---|---|---|---|---|
| Anthropic | Claude Fable 5.1 | $10 | $50 | 1M |
| OpenAI | GPT-6 Astra | $10 (hasta 272K) | $50 (hasta 272K) | 1M |
| Google | Gemini 3.1 Pro | $2 (≤200K) | $12 (≤200K) | 1M |
| xAI | Grok 4.6 | $2 (<200K) | $6 (<200K) | 500K |

Nota: Gemini 3.1 Pro y Grok 4.6 no son los modelos "más caros por token" de sus respectivos catálogos en esta comparación porque, a diferencia de Anthropic y OpenAI, sus insignias de razonamiento cuestan menos por token de entrada que el Fable 5.1 o el GPT-6 Astra; la comparación de "quién es más caro" depende de qué tarea se mida, no solo del precio de tabla.

## Cómo empezar

1. Antes de fijar un modelo en producción, confirma el precio en la página oficial del día (los agregadores de precios suelen ir varias semanas atrasados o mezclar promociones vencidas con precios vigentes; en la investigación de esta ficha varios agregadores de terceros daban cifras contradictorias entre sí para el mismo modelo).
2. Revisa si tu carga se mueve por debajo o por encima del umbral de contexto largo de tu proveedor (200K–272K según el caso): cruzar ese umbral puede duplicar el costo de entrada sin que cambie el resultado.
3. Si comparas "mejor para", usa la descripción oficial del proveedor como punto de partida, pero valida con tus propios evals — ver la ficha de benchmarks de programación sobre por qué los puntajes públicos no bastan.

## Fuentes

- [Pricing](https://platform.claude.com/docs/en/about-claude/pricing) — Anthropic — pub: s/f — visto: 2026-09-20
- [Models overview](https://platform.claude.com/docs/en/models/overview) — Anthropic — pub: s/f — visto: 2026-09-20
- [Pricing](https://developers.openai.com/api/docs/pricing) — OpenAI — pub: s/f — visto: 2026-09-20
- [Models](https://developers.openai.com/api/docs/models) — OpenAI — pub: s/f — visto: 2026-09-20
- [Pricing](https://ai.google.dev/gemini-api/docs/pricing) — Google AI for Developers — pub: s/f — visto: 2026-09-20
- [Gemini 3.1 Pro: A smarter model for your most complex tasks](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/) — Google — pub: 2026-02-19 — visto: 2026-09-20
- [Grok Models & Pricing](https://docs.x.ai/developers/models) — xAI — pub: s/f — visto: 2026-09-20
- [Introducing Grok 4.6](https://x.ai/news/grok-4-6) — xAI — pub: 2026-08-12 — visto: 2026-09-20

---
id: costo-real-agentes-ia
title: "El precio real de trabajar con agentes: caché, batch y cómo se dispara la factura"
track: modelos
type: guia
level: intermedio
tags: agentes, precios, cache, batch, costos, anthropic, openai
summary: "Cómo se compone el costo de una tarea agéntica (caché, batch, modo rápido, contexto largo) con ejemplos de cálculo verificados en la documentación oficial."
updated: 2026-09-20
reading_minutes: 9
source_span: 2025-12-02..2026-09-20
confidence: alta
---

El precio de tabla (entrada/salida por millón de tokens) casi nunca es el precio que paga un agente en producción. Cuatro factores lo mueven en ambas direcciones: caché de prompts (baja el costo), procesamiento por lotes (baja el costo pero añade latencia), modo rápido/prioritario (sube el costo) y superar el umbral de contexto largo (sube el costo). Esta ficha usa los ejemplos de cálculo publicados por los propios proveedores.

## Por qué importa

Un agente que reenvía el mismo system prompt o el mismo historial de conversación en cada turno paga varias veces por el mismo texto si no usa caché. Un agente que corre miles de tareas no interactivas de golpe paga el doble de lo necesario si no usa batch. Y un agente que deja crecer su contexto sin compactarlo puede cruzar un umbral de precio (200K–272K tokens según el proveedor) sin que nadie lo note hasta la factura.

## Ejemplo

Ejemplo de cálculo publicado por Anthropic para una sesión de una hora con Claude Opus 5 en Claude Managed Agents, sin caché:

```
Entrada:  50,000 tokens × $5  / 1,000,000  = $0.25
Salida:   15,000 tokens × $25 / 1,000,000  = $0.375
Runtime:  1.0 hora × $0.08                 = $0.08
Total                                       = $0.705
```

La misma sesión, con 40,000 de los 50,000 tokens de entrada servidos desde caché:

```
Entrada sin caché: 10,000 × $5  / 1,000,000        = $0.05
Lectura de caché:  40,000 × $5 × 0.1 / 1,000,000   = $0.02
Salida:            15,000 × $25 / 1,000,000        = $0.375
Runtime:           1.0 hora × $0.08                = $0.08
Total                                               = $0.525
```

Usar caché en este ejemplo baja el costo un 25%, solo por reutilizar contexto que de otro modo se reenviaría íntegro. Anthropic reporta un segundo ejemplo, agregado, para un caso de soporte al cliente: aproximadamente 3,700 tokens por conversación con Claude Haiku 4.5 ($1/MTok entrada, $5/MTok salida) sale en total a "~$37.00 por 10,000 tickets".

## Datos

Cómo funciona la caché de prompts en Claude (multiplicadores sobre el precio base de entrada):

| Operación | Multiplicador | Duración |
|---|---|---|
| Escritura de caché (5 min) | 1.25x | 5 minutos |
| Escritura de caché (1 hora) | 2x | 1 hora |
| Lectura de caché (hit) | 0.1x (0.025x en Fable 5.1 / Mythos 5.1) | igual que la escritura |

Un hit de caché recupera la inversión de la escritura de 5 minutos después de un solo acierto (1.25x de escritura vs. 0.1x por lectura), y la de 1 hora después de dos aciertos (2x de escritura). En Fable 5.1 y Mythos 5.1, donde la lectura cuesta 0.025x, el punto de equilibrio llega todavía más rápido.

Descuentos por procesamiento por lotes (batch), verificados en cada proveedor:

| Proveedor | Descuento batch | Contrapartida |
|---|---|---|
| Anthropic | 50% en entrada y salida | Procesamiento asíncrono, no apto para conversación en vivo |
| OpenAI | "Batch reduce a la mitad cada tarifa" | Mismo trade-off de latencia |
| Google Gemini | 50% en los modelos que soportan batch/flex | Mismo trade-off de latencia |

En sentido contrario, el modo rápido/prioritario sube el precio: en Anthropic, el "Fast mode" de Claude Opus 5 y Opus 4.8 cobra $10/MTok de entrada y $50/MTok de salida —el doble del precio estándar de Opus 5 ($5/$25)— y se aplica a toda la ventana de contexto, incluso por encima de 200K tokens de entrada. Es una función en vista previa de investigación ("research preview"), solo disponible en la API de Claude de primera parte, no en Bedrock ni Google Cloud.

Recargo por contexto largo verificado en la documentación de precios de OpenAI: los modelos insignia (GPT-6 Astra, GPT-5.6 Sol/Terra) cobran el doble de la entrada al superar 272,000 tokens en una sola solicitud. Anthropic, en cambio, documenta explícitamente que sus modelos de la generación 4.6 en adelante no aplican recargo dentro de la ventana de 1M de tokens.

## Debate

**Postura 1 — el costo por token esconde el costo real del agente.** La propia documentación de precios de Anthropic recomienda "usar el modelo apropiado" (Haiku para tareas simples, Sonnet para la mayoría de cargas de producción, Opus solo para razonamiento complejo) como primera palanca de ahorro, antes que optimizar el prompt: el salto de precio entre Haiku 4.5 ($1/$5) y Fable 5.1 ($10/$50) es de 10x, mayor que cualquier ahorro que la caché o el batch puedan ofrecer sobre un modelo mal elegido.

**Postura 2 — el runtime, no los tokens, es el costo oculto.** En Claude Managed Agents, Anthropic cobra por separado $0.08 por hora de sesión activa, además de los tokens. Para agentes de larga duración con mucho tiempo de espera entre llamadas a herramientas (por ejemplo, esperando una API externa o una revisión humana), el runtime puede pesar más que los tokens en la factura total si la sesión permanece en estado "running" en vez de "idle".

## Cómo empezar

1. Activa caché de prompts en cualquier agente que reenvíe el mismo system prompt, herramientas o documentos de referencia en turnos sucesivos.
2. Mueve a batch cualquier tarea que no necesite respuesta en tiempo real (clasificación masiva, generación de resúmenes nocturnos, evaluación de datasets).
3. Antes de activar un modo "rápido" o "prioritario", mide si la mejora de latencia justifica pagar 2x; en Anthropic esta función no es compatible con batch, así que hay que elegir una de las dos optimizaciones, no ambas.
4. Monitorea el tamaño de contexto por solicitud si usas OpenAI o proveedores con recargo por umbral: compactar el historial de conversación para quedarse debajo de 272K (OpenAI) o 200K (Google, xAI) tokens puede evitar pagar el doble sin perder capacidad si la tarea no necesita ese contexto extra.

## Fuentes

- [Pricing](https://platform.claude.com/docs/en/about-claude/pricing) — Anthropic — pub: s/f — visto: 2026-09-20
- [Pricing](https://developers.openai.com/api/docs/pricing) — OpenAI — pub: s/f — visto: 2026-09-20
- [Pricing](https://ai.google.dev/gemini-api/docs/pricing) — Google AI for Developers — pub: s/f — visto: 2026-09-20
- [Grok Models & Pricing](https://docs.x.ai/developers/models) — xAI — pub: s/f — visto: 2026-09-20

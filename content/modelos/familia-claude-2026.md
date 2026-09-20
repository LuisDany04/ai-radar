---
id: familia-claude-2026
title: "La familia Claude en septiembre de 2026: Fable, Mythos, Opus, Sonnet y Haiku"
track: modelos
type: dato
level: intermedio
tags: anthropic, claude, modelos, precios, agentes
summary: "Qué modelo Claude usar para qué en septiembre de 2026, con precios verificados y qué cambió frente a las generaciones 4.x."
updated: 2026-09-20
reading_minutes: 8
source_span: 2026-06-09..2026-09-20
confidence: alta
---

En septiembre de 2026 la familia Claude vigente tiene cinco nombres distintos: Fable, Mythos, Opus, Sonnet y Haiku. Fable y Mythos son nombres nuevos (no "Claude 6"): Anthropic los introdujo en junio de 2026 como una clase de modelo separada de la numeración Opus/Sonnet/Haiku, y los actualizó a la versión "5.1" el 1 de septiembre de 2026. Mythos nunca se vendió al público en general: es una variante del mismo modelo subyacente que Fable, con las salvaguardas de seguridad relajadas en ciertas áreas (ciberseguridad, biología), y solo se entrega a organizaciones verificadas.

## Por qué importa

Elegir entre estos cinco modelos ya no es solo "cuánto quiero gastar": Fable 5.1 razona siempre (adaptive thinking permanente) y cuesta 5 veces más por token de entrada que Sonnet 5, mientras que Sonnet 5 es, según la propia comparación de Anthropic, "la mejor combinación de velocidad e inteligencia" para la mayoría de cargas de producción. La recomendación oficial de Anthropic es empezar por Claude Opus 5 para la mayoría de trabajos y subir a Fable 5.1 solo cuando los evals contra Opus 5 en el nivel de esfuerzo más alto sigan quedándose cortos.

## Datos

Modelos vigentes de pago (excluye modelos retirados salvo por comparación), septiembre de 2026:

| Modelo | Precio entrada/salida (MTok) | Contexto | Corte de conocimiento confiable | Retiro no antes de |
|---|---|---|---|---|
| Claude Fable 5.1 | $10 / $50 | 1M tokens | jun 2026 | 2027-09-01 |
| Claude Mythos 5.1 (acceso restringido) | $10 / $50 | 1M tokens | jun 2026 | 2027-09-01 |
| Claude Fable 5 (legado) | $10 / $50 | 1M tokens | s/f | s/f |
| Claude Opus 5 | $5 / $25 | 1M tokens | may 2026 | 2027-07-24 |
| Claude Sonnet 5 | $2 / $10 | 1M tokens | ene 2026 | 2027-06-30 |
| Claude Haiku 4.5 | $1 / $5 | 200K tokens | feb 2025 | 2026-10-15 |

Cambios de precio verificados en la página oficial de precios: la lectura de caché en Fable 5.1 y Mythos 5.1 cuesta $0.25/MTok, una cuarta parte de lo que cobraba Fable 5 ($1/MTok) por el mismo concepto — Anthropic documenta esto como "0.025x el precio base de entrada" frente al multiplicador estándar de "0.1x" en el resto de modelos. Además, el aumento de precio de Sonnet 5 previsto para el 1 de septiembre de 2026 (de $2/$10 a $3/$15) fue cancelado; el precio de lanzamiento se volvió permanente, según una nota explícita en la página de precios de Anthropic.

Sobre el tokenizador: los modelos Claude 4.7 y posteriores (incluidos Fable y Mythos) usan un tokenizador distinto que genera "aproximadamente 30% más tokens para el mismo texto" que el tokenizador usado hasta Sonnet 4.6, según la documentación oficial. Esto significa que comparar el "costo por palabra" entre Sonnet 5 y modelos anteriores a partir del precio por token puede subestimar el costo real de los modelos más nuevos si no se ajusta por esta diferencia.

## Qué cambió frente a Fable 5 / Mythos 5

Según el anuncio oficial de Fable 5.1 y Mythos 5.1 (1 de septiembre de 2026):

- Costo aproximadamente 25% menor que Fable 5 en cargas típicas, con hasta 45% de ahorro en trabajo agéntico (cifra de la propia Anthropic, sin desglose metodológico público).
- Las salvaguardas de ciberseguridad producen "60% menos falsos positivos" y las de biología se activan "85% menos" en solicitudes benignas, según Anthropic.
- Fable 5.1 puede identificar vulnerabilidades de software con fines defensivos, una capacidad que antes estaba reservada a Mythos.
- En Terminal-Bench-Science 0.1, Anthropic reporta 52.6% para Fable 5.1 frente a 24.7% para Fable 5; en Terminal-Bench 4.0, 55.8% frente a 42.0%. Estas cifras provienen del propio anuncio de Anthropic, no de un tercero independiente — ver la ficha de benchmarks de programación sobre las limitaciones de tomar cifras de un solo proveedor al pie de la letra.

> [!duda] El anuncio de Anthropic no especifica la metodología exacta (número de intentos, harness de agente) detrás del ahorro de "hasta 45%" en trabajo agéntico ni de las cifras de reducción de falsos positivos. Son afirmaciones de la propia compañía sobre su propio producto, no verificadas por un tercero en esta sesión.

## Ejemplo

Selección de nivel de esfuerzo con el parámetro `effort`, disponible en todos los modelos Claude 4.5 en adelante (ejemplo tomado de la documentación oficial):

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-opus-5",
    "max_tokens": 4096,
    "messages": [{"role": "user", "content": "Analiza microservicios vs monolito"}],
    "output_config": {"effort": "medium"}
  }'
```

Por defecto todos estos modelos usan `effort: "high"`. Bajar a `low` o `medium` reduce tokens de pensamiento y de salida, útil para subagentes o tareas rutinarias; subir a `xhigh` o `max` está pensado para trabajo agéntico de más de 30 minutos con presupuestos de millones de tokens.

## Cómo empezar

1. Para la mayoría de integraciones nuevas, la propia Anthropic recomienda partir de Claude Opus 5, no de Fable 5.1.
2. Si tu caso de uso es alto volumen y sensible a latencia (clasificación, soporte, extracción), evalúa primero Claude Haiku 4.5 antes de pagar el precio de un modelo de razonamiento permanente.
3. Antes de mover una carga de Sonnet 4.6/4.5 a Sonnet 5, corre tu batería de evals: Anthropic advierte que las migraciones entre generaciones pueden mostrar mejoras grandes en el rendimiento general, pero también cambios de comportamiento que vale la pena medir, no asumir.

## Fuentes

- [Introducing Claude Fable 5.1 and Claude Mythos 5.1](https://www.anthropic.com/claude-fable-and-mythos-5-1) — Anthropic — pub: 2026-09-01 — visto: 2026-09-20
- [Anthropic upgrades Claude with new Fable 5.1 model, details here](https://9to5mac.com/2026/09/01/anthropic-upgrades-claude-with-new-fable-5-1-model-details-here/) — 9to5Mac — pub: 2026-09-01 — visto: 2026-09-20
- [Pricing](https://platform.claude.com/docs/en/about-claude/pricing) — Anthropic — pub: s/f — visto: 2026-09-20
- [Models overview](https://platform.claude.com/docs/en/models/overview) — Anthropic — pub: s/f — visto: 2026-09-20
- [Effort](https://platform.claude.com/docs/en/build-with-claude/effort) — Anthropic — pub: s/f — visto: 2026-09-20

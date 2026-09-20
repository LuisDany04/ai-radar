---
id: razonamiento-extendido-2026
title: "Razonamiento extendido en 2026: cómo se controla el presupuesto de pensar"
track: modelos
type: guia
level: intermedio
tags: razonamiento, thinking, effort, agentes, anthropic, openai, google
summary: "Cómo Anthropic, OpenAI y Google exponen el control de cuánto 'piensa' un modelo antes de responder, y cuándo subir ese presupuesto compensa el costo extra."
updated: 2026-09-20
reading_minutes: 8
source_span: 2026-09-20..2026-09-20
confidence: alta
---

Los tres laboratorios grandes exponen un control explícito de cuánto razonamiento interno (tokens de "pensamiento" antes de la respuesta visible) usa el modelo, pero con mecanismos distintos: Anthropic usa un parámetro de "esfuerzo" cualitativo, OpenAI usa `reasoning_effort` con niveles nombrados, y Google pasó de un presupuesto en tokens a un nivel cualitativo con la generación Gemini 3. Ninguno de los tres cobra un precio distinto por nivel de esfuerzo: el costo cambia porque cambia la cantidad de tokens generados, no la tarifa por token.

## Datos: cómo controla cada proveedor el razonamiento

**Anthropic — parámetro `effort`.** Disponible en Claude Fable 5.1, Mythos 5.1, Fable 5, Mythos 5, Mythos Preview, Opus 5, Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 5 y Sonnet 4.6. Niveles: `low`, `medium`, `high` (equivalente a no pasar el parámetro, y valor por defecto de la API), `xhigh` y `max`. No todos los modelos soportan `xhigh`. El efecto es distinto de un "presupuesto de tokens" fijo: según la documentación oficial, "el esfuerzo es una señal de comportamiento, no un presupuesto estricto de tokens" — a esfuerzo bajo, el modelo todavía piensa en problemas suficientemente difíciles, solo que menos que a esfuerzo alto para el mismo problema. En Claude Opus 5, el pensamiento no puede desactivarse en los niveles `xhigh` o `max`: una solicitud que intente `thinking: {"type": "disabled"}` en esos niveles devuelve error 400.

**OpenAI — parámetro `reasoning_effort`.** Siete valores posibles: `none`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`, aunque "los valores soportados varían según el modelo". GPT-6 Astra, por ejemplo, no acepta `none`. El control de presupuesto se hace indirectamente con `max_output_tokens`, que limita el total de tokens generados incluyendo razonamiento, salida visible y tokens de formato no visibles; la documentación recomienda reservar al menos 25.000 tokens para razonamiento y salida como punto de partida.

**Google — de `thinkingBudget` a `thinking_level`.** En la generación Gemini 2.5, el control era un número de tokens (`thinkingBudget`, entero entre 0 y 24576; 0 desactiva el pensamiento, -1 activa pensamiento dinámico). Con Gemini 3 el control cambió a `thinking_level`, un valor cualitativo (`minimal` en modelos que lo soportan, `low`, `medium`, `high`), sin exponer un número de tokens directo. El precio de la respuesta es la suma de tokens de salida visibles más tokens de pensamiento, reportados por separado en `total_thought_tokens`. Google advierte explícitamente que fijar un `max_output_tokens` bajo junto con un nivel de pensamiento alto puede truncar la respuesta, y recomienda bajar `thinking_level` en vez de recortar el límite de salida para controlar el costo.

## Por qué importa

El nivel de esfuerzo/razonamiento es, junto con la elección de modelo, la palanca de costo más directa que tiene quien construye un agente: subir de `high` a `xhigh` o `max` en Anthropic, o de `medium` a `high`/`xhigh` en OpenAI, puede multiplicar los tokens de salida (y por tanto el costo) sin cambiar el precio por token. Además, cambiar el nivel de esfuerzo entre solicitudes puede invalidar la caché de prompts: la documentación de Anthropic recomienda mantener el nivel de esfuerzo constante dentro de una conversación que dependa de aciertos de caché, y usar el cambio de esfuerzo "por mensaje" (función en beta, solo en Fable 5.1, Mythos 5.1 y Opus 5) cuando se necesite variar el nivel sin perder la caché.

## Ejemplo

Cambiar el nivel de esfuerzo a mitad de conversación en Claude, preservando la caché de prompt (función en beta, requiere encabezado beta), tomado de la documentación oficial:

```json
{
  "model": "claude-fable-5-1",
  "max_tokens": 4096,
  "output_config": {"effort": "high"},
  "messages": [
    {"role": "user", "content": "Plan a migration from SQLite to PostgreSQL in three short steps."},
    {"role": "assistant", "content": "1. Export... 2. Create schema... 3. Import and verify."},
    {"role": "system", "content": [], "output_config": {"effort": "low"}},
    {"role": "user", "content": "Summarize the plan in one sentence."}
  ]
}
```

El mensaje `system` sin contenido de texto, con solo `output_config.effort`, baja el nivel de esfuerzo desde el siguiente turno de usuario sin reiniciar la caché del prefijo de la conversación.

## Cuándo merece la pena subir el presupuesto

Según las recomendaciones oficiales de Anthropic por modelo:

- **Trabajo agéntico de más de 30 minutos con presupuestos de millones de tokens**: subir a `xhigh` o `max`, y fijar un `max_tokens` grande (Anthropic sugiere partir de 64k y ajustar) para que el modelo tenga espacio de pensar y actuar a través de subagentes y llamadas a herramientas.
- **Tareas rutinarias o sensibles a la latencia** (subagentes simples, clasificación, chat no técnico): usar `low`, con ahorro significativo de tokens a cambio de una reducción de capacidad medible en evals propios.
- **La guía cambia entre versiones del mismo modelo**: Anthropic advierte que Claude Opus 4.7 "respeta los niveles de esfuerzo de forma más estricta" que Opus 4.6, especialmente en `low` y `medium` — quien migre de una versión a otra debería correr un nuevo barrido de esfuerzo contra sus evals en vez de reusar la configuración anterior.

## Cómo empezar

1. No asumas que el nivel de esfuerzo por defecto (`high` en Anthropic y, para la mayoría de tareas, `medium` en OpenAI) es el óptimo para tu caso: mide calidad y costo en al menos tres niveles antes de fijar uno en producción.
2. Si tu agente hace muchas llamadas a herramientas de bajo riesgo, prueba bajar el esfuerzo antes que cambiar de modelo: la documentación de Anthropic indica que un esfuerzo más bajo produce menos llamadas a herramientas y más directas, no solo respuestas más cortas.
3. Si dependes de caché de prompts en una conversación larga, evita cambiar el nivel de esfuerzo a nivel de solicitud completa; usa el cambio "por mensaje" si tu modelo lo soporta.

## Fuentes

- [Effort](https://platform.claude.com/docs/en/build-with-claude/effort) — Anthropic — pub: s/f — visto: 2026-09-20
- [Models overview](https://platform.claude.com/docs/en/models/overview) — Anthropic — pub: s/f — visto: 2026-09-20
- [Reasoning models](https://developers.openai.com/api/docs/guides/reasoning) — OpenAI — pub: s/f — visto: 2026-09-20
- [Gemini thinking](https://ai.google.dev/gemini-api/docs/thinking) — Google AI for Developers — pub: s/f — visto: 2026-09-20

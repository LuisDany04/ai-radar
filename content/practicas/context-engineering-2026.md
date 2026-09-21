---
id: context-engineering-2026
title: "Context engineering: la disciplina que reemplazó al prompt engineering"
track: practicas
type: guia
level: intermedio
tags: context engineering, agentes, compactacion, subagentes, memoria, contexto
summary: "Qué significa cuidar el contexto de un agente en 2026: compactación, notas externas, subagentes y recuperación justo a tiempo, con la definición oficial de Anthropic."
updated: 2026-09-20
reading_minutes: 7
source_span: 2025-06-27..2025-11-26
confidence: alta
---

Anthropic define "context engineering" como "el conjunto de estrategias para curar y mantener el conjunto óptimo de tokens durante la inferencia", en un post publicado el 29 de septiembre de 2025. La idea central: el contexto de un agente (system prompt, herramientas, historial de mensajes, datos externos) es un recurso finito, y la pregunta que importa ya no es "¿qué palabras uso en el prompt?" sino "¿qué configuración de contexto hace más probable el comportamiento que busco?".

El término "prompt engineering" quedó asociado, en el uso común, a escribir instrucciones ingeniosas para una sola llamada al modelo. Simon Willison documentó el cambio de nombre en junio de 2025: cita a Andrej Karpathy definiendo context engineering como "el arte y la ciencia de llenar la ventana de contexto con exactamente la información correcta para el siguiente paso", y al CEO de Shopify, Tobi Lutke, describiéndolo como "el arte de proveer todo el contexto para que la tarea sea resoluble, de forma plausible, por el LLM". Willison señala que "prompt engineering" brotó un significado degradado (escribirle a un chatbot) mientras que el nuevo término describe mejor el trabajo real en aplicaciones agénticas: estructurar tareas, ejemplos, RAG, herramientas, estado y memoria.

## Por que importa

Un agente que trabaja durante horas o días acumula miles de turnos, resultados de herramientas y archivos leídos. Meter todo eso en la ventana de contexto no escala: además de los límites de tokens, el rendimiento del modelo se degrada antes de llegar al límite duro, un fenómeno que Willison llama "context rot". El mismo autor describe tres fallos concretos: **context poisoning** (una alucinación queda fijada en el contexto y se referencia repetidamente), **context distraction** (un contexto tan largo que el modelo sobre-atiende al historial y descuida lo aprendido en entrenamiento) y **context confusion** (información superflua que el modelo usa para generar una respuesta de peor calidad).

Anthropic llega a la misma conclusión desde la práctica de Claude Code: la calidad de un agente depende menos del modelo en sí y más de cómo está organizado su contexto.

## Ejemplo

Cuatro técnicas concretas que documenta el post de Anthropic de septiembre de 2025:

1. **Compactación**: cuando la conversación se acerca al límite de contexto, se resume el historial y se reinicia la sesión con ese resumen comprimido, preservando decisiones de arquitectura y problemas sin resolver.
2. **Notas estructuradas / memoria agéntica**: el agente escribe notas persistentes fuera de la ventana de contexto (por ejemplo, un archivo `NOTES.md`) que puede recuperar más tarde. Anthropic cita como ejemplo a Claude jugando Pokemon, que mantiene conteos precisos a lo largo de miles de pasos gracias a memoria estructurada.
3. **Arquitecturas de subagentes**: agentes especializados resuelven tareas acotadas con una ventana de contexto limpia y devuelven al agente coordinador un resumen condensado, típicamente de **1.000 a 2.000 tokens**.
4. **Recuperación justo a tiempo (just-in-time)**: en vez de precargar todos los datos, el agente mantiene identificadores livianos (rutas de archivo, URLs) y los carga en tiempo de ejecución solo cuando los necesita. Claude Code aplica esto con comandos de Bash como `head` y `tail` para inspeccionar bases de datos grandes sin cargar el objeto completo en contexto:

```bash
# En vez de cargar el archivo completo en el contexto del agente:
head -n 50 registros_grandes.csv
tail -n 50 registros_grandes.csv
```

(Patrón descrito en el post de Anthropic "Effective context engineering for AI agents", 29-09-2025.)

Un post posterior de Anthropic, "Effective harnesses for long-running agents" (26-11-2025), agrega que la compactación sola no basta para trabajo de producción: recomienda combinarla con un `claude-progress.txt`, commits de git frecuentes y una lista de funcionalidades en JSON marcadas como pasa/falla para que un agente que retoma el trabajo en una sesión nueva sepa exactamente dónde quedó el anterior.

## Datos

| Técnica | Cifra reportada | Fuente |
|---|---|---|
| Resumen devuelto por subagentes | 1.000–2.000 tokens | Anthropic, "Effective context engineering for AI agents", 29-09-2025 |
| Formato de respuesta de herramientas (detallado vs. conciso) | 206 tokens vs. 72 tokens (~67% menos) | Anthropic, "Writing effective tools for agents", 11-09-2025 |
| Límite de tokens por respuesta de herramienta en Claude Code | 25.000 tokens por defecto | Anthropic, "Writing effective tools for agents", 11-09-2025 |

> [!duda] La cifra de "67% de reducción" corresponde a un ejemplo puntual de formato de respuesta (herramienta con modo "detailed" vs "concise"), no a una medición general de ahorro de contexto en todos los agentes.

## Debate

Anthropic promueve la compactación como técnica central de context engineering, pero no todos los que construyen agentes en producción reportan el mismo éxito. Armin Ronacher, en su blog (lucumr.pocoo.org, 21-11-2025), cuenta que experimentó con "context editing" (la función de edición de contexto de Anthropic) y que "so far they haven't had a lot of success with context editing" en sus propios agentes, aunque considera la idea de podar tokens de intentos fallidos "interesante de explorar más". Ronacher también señala que "testing and evals" es, en su experiencia, el problema más difícil de todos en el diseño de agentes de larga duración, más que el propio manejo de contexto.

## Cómo empezar

1. Antes de agregar más instrucciones al system prompt, pregunta si el problema es en realidad de contexto: ¿el agente tiene la información correcta en el momento correcto, o tiene demasiada información irrelevante?
2. Si tu agente hace tareas largas, implementa un mecanismo de resumen/compactación antes de tocar el límite de tokens, no después.
3. Para sub-tareas acotadas (buscar en el código, investigar un error), usa un subagente con contexto limpio en vez de acumular todo en la conversación principal.
4. Prefiere que el agente cargue datos bajo demanda (rutas, IDs, comandos como `head`/`grep`) en vez de inyectar archivos completos por adelantado.
5. Instrumenta evals reales antes de asumir que una técnica de contexto funciona: la evidencia de Ronacher sugiere que "funciona en teoría" y "funciona en producción" no siempre coinciden.

## Fuentes

- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — Anthropic — pub: 2025-09-29 — visto: 2026-09-20
- [Writing effective tools for AI agents—using AI agents](https://www.anthropic.com/engineering/writing-tools-for-agents) — Anthropic — pub: 2025-09-11 — visto: 2026-09-20
- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — Anthropic — pub: 2025-11-26 — visto: 2026-09-20
- [Context engineering](https://simonwillison.net/2025/jun/27/context-engineering/) — Simon Willison — pub: 2025-06-27 — visto: 2026-09-20
- [Agent Design Is Still Hard](https://lucumr.pocoo.org/2025/11/21/agents-are-hard/) — Armin Ronacher — pub: 2025-11-21 — visto: 2026-09-20

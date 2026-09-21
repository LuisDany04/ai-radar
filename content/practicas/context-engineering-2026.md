---
id: context-engineering-2026
title: "Context engineering: la disciplina que reemplazo al prompt engineering"
track: practicas
type: guia
level: intermedio
tags: context engineering, agentes, compactacion, subagentes, memoria, contexto
summary: "Que significa cuidar el contexto de un agente en 2026: compactacion, notas externas, subagentes y recuperacion justo a tiempo, con la definicion oficial de Anthropic."
updated: 2026-09-20
reading_minutes: 7
source_span: 2025-06-27..2025-11-26
confidence: alta
---

Anthropic define "context engineering" como "el conjunto de estrategias para curar y mantener el conjunto optimo de tokens durante la inferencia", en un post publicado el 29 de septiembre de 2025. La idea central: el contexto de un agente (system prompt, herramientas, historial de mensajes, datos externos) es un recurso finito, y la pregunta que importa ya no es "¿que palabras uso en el prompt?" sino "¿que configuracion de contexto hace mas probable el comportamiento que busco?".

El termino "prompt engineering" quedo asociado, en el uso comun, a escribir instrucciones ingeniosas para una sola llamada al modelo. Simon Willison documento el cambio de nombre en junio de 2025: cita a Andrej Karpathy definiendo context engineering como "el arte y la ciencia de llenar la ventana de contexto con exactamente la informacion correcta para el siguiente paso", y al CEO de Shopify, Tobi Lutke, describiendolo como "el arte de proveer todo el contexto para que la tarea sea resoluble, de forma plausible, por el LLM". Willison senala que "prompt engineering" broto un significado degradado (escribirle a un chatbot) mientras que el nuevo termino describe mejor el trabajo real en aplicaciones agenticas: estructurar tareas, ejemplos, RAG, herramientas, estado y memoria.

## Por que importa

Un agente que trabaja durante horas o dias acumula miles de turnos, resultados de herramientas y archivos leidos. Meter todo eso en la ventana de contexto no escala: además de los limites de tokens, el rendimiento del modelo se degrada antes de llegar al limite duro, un fenomeno que Willison llama "context rot". El mismo autor describe tres fallos concretos: **context poisoning** (una alucinacion queda fijada en el contexto y se referencia repetidamente), **context distraction** (un contexto tan largo que el modelo sobre-atiende al historial y descuida lo aprendido en entrenamiento) y **context confusion** (informacion superflua que el modelo usa para generar una respuesta de peor calidad).

Anthropic llega a la misma conclusion desde la practica de Claude Code: la calidad de un agente depende menos del modelo en si y mas de como esta organizado su contexto.

## Ejemplo

Cuatro tecnicas concretas que documenta el post de Anthropic de septiembre de 2025:

1. **Compactacion**: cuando la conversacion se acerca al limite de contexto, se resume el historial y se reinicia la sesion con ese resumen comprimido, preservando decisiones de arquitectura y problemas sin resolver.
2. **Notas estructuradas / memoria agentica**: el agente escribe notas persistentes fuera de la ventana de contexto (por ejemplo, un archivo `NOTES.md`) que puede recuperar mas tarde. Anthropic cita como ejemplo a Claude jugando Pokemon, que mantiene conteos precisos a lo largo de miles de pasos gracias a memoria estructurada.
3. **Arquitecturas de subagentes**: agentes especializados resuelven tareas acotadas con una ventana de contexto limpia y devuelven al agente coordinador un resumen condensado, tipicamente de **1.000 a 2.000 tokens**.
4. **Recuperacion justo a tiempo (just-in-time)**: en vez de precargar todos los datos, el agente mantiene identificadores livianos (rutas de archivo, URLs) y los carga en tiempo de ejecucion solo cuando los necesita. Claude Code aplica esto con comandos de Bash como `head` y `tail` para inspeccionar bases de datos grandes sin cargar el objeto completo en contexto:

```bash
# En vez de cargar el archivo completo en el contexto del agente:
head -n 50 registros_grandes.csv
tail -n 50 registros_grandes.csv
```

(Patron descrito en el post de Anthropic "Effective context engineering for AI agents", 29-09-2025.)

Un post posterior de Anthropic, "Effective harnesses for long-running agents" (26-11-2025), agrega que la compactacion sola no basta para trabajo de produccion: recomienda combinarla con un `claude-progress.txt`, commits de git frecuentes y una lista de funcionalidades en JSON marcadas como pasa/falla para que un agente que retoma el trabajo en una sesion nueva sepa exactamente donde quedo el anterior.

## Datos

| Tecnica | Cifra reportada | Fuente |
|---|---|---|
| Resumen devuelto por subagentes | 1.000–2.000 tokens | Anthropic, "Effective context engineering for AI agents", 29-09-2025 |
| Formato de respuesta de herramientas (detallado vs. conciso) | 206 tokens vs. 72 tokens (~67% menos) | Anthropic, "Writing effective tools for agents", 11-09-2025 |
| Limite de tokens por respuesta de herramienta en Claude Code | 25.000 tokens por defecto | Anthropic, "Writing effective tools for agents", 11-09-2025 |

> [!duda] La cifra de "67% de reduccion" corresponde a un ejemplo puntual de formato de respuesta (herramienta con modo "detailed" vs "concise"), no a una medicion general de ahorro de contexto en todos los agentes.

## Debate

Anthropic promueve la compactacion como tecnica central de context engineering, pero no todos los que construyen agentes en produccion reportan el mismo exito. Armin Ronacher, en su blog (lucumr.pocoo.org, 21-11-2025), cuenta que experimento con "context editing" (la funcion de edicion de contexto de Anthropic) y que "so far they haven't had a lot of success with context editing" en sus propios agentes, aunque considera la idea de podar tokens de intentos fallidos "interesante de explorar mas". Ronacher tambien senala que "testing and evals" es, en su experiencia, el problema mas dificil de todos en el diseno de agentes de larga duracion, mas que el propio manejo de contexto.

## Como empezar

1. Antes de agregar mas instrucciones al system prompt, pregunta si el problema es en realidad de contexto: ¿el agente tiene la informacion correcta en el momento correcto, o tiene demasiada informacion irrelevante?
2. Si tu agente hace tareas largas, implementa un mecanismo de resumen/compactacion antes de tocar el limite de tokens, no despues.
3. Para sub-tareas acotadas (buscar en el codigo, investigar un error), usa un subagente con contexto limpio en vez de acumular todo en la conversacion principal.
4. Prefiere que el agente cargue datos bajo demanda (rutas, IDs, comandos como `head`/`grep`) en vez de inyectar archivos completos por adelantado.
5. Instrumenta evals reales antes de asumir que una tecnica de contexto funciona: la evidencia de Ronacher sugiere que "funciona en teoria" y "funciona en produccion" no siempre coinciden.

## Fuentes

- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — Anthropic — pub: 2025-09-29 — visto: 2026-09-20
- [Writing effective tools for AI agents—using AI agents](https://www.anthropic.com/engineering/writing-tools-for-agents) — Anthropic — pub: 2025-09-11 — visto: 2026-09-20
- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — Anthropic — pub: 2025-11-26 — visto: 2026-09-20
- [Context engineering](https://simonwillison.net/2025/jun/27/context-engineering/) — Simon Willison — pub: 2025-06-27 — visto: 2026-09-20
- [Agent Design Is Still Hard](https://lucumr.pocoo.org/2025/11/21/agents-are-hard/) — Armin Ronacher — pub: 2025-11-21 — visto: 2026-09-20

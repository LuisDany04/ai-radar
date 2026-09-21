---
id: multi-agente-cuando-ayuda
title: "Multiagente: cuándo ayuda y cuándo es peor que un solo agente"
track: practicas
type: guia
level: intermedio
tags: multiagente, orquestacion, costos, tokens, arquitectura
summary: "Evidencia publicada sobre cuándo repartir el trabajo entre varios agentes mejora los resultados y cuándo solo multiplica el gasto en tokens sin mejorar la calidad."
updated: 2026-09-21
reading_minutes: 6
source_span: 2025-06-12..2026-04-22
confidence: alta
---

Durante 2025 se instaló la idea de que repartir una tarea entre varios agentes que trabajan en paralelo era, casi por defecto, una mejora sobre un solo agente. La evidencia publicada desde entonces es más matizada: Anthropic documentó una ganancia real para investigación, pero Cognition (la empresa detrás de Devin) publicó el mismo mes un post con el título literal "Don't Build Multi-Agents", advirtiendo que para tareas de escritura —incluido programar— el patrón de agentes paralelos suele producir resultados peores que un solo agente bien dirigido. Ambas posturas coexisten porque hablan de tareas distintas.

## Por qué importa

Montar una arquitectura multiagente no es gratis: consume bastante más contexto y tokens que un agente único, y coordinar agentes que no comparten historial introduce un problema nuevo —decisiones implícitas que un agente toma y que el resto no ve— que no existe cuando hay un solo hilo de trabajo. Elegir mal la arquitectura no solo encarece la tarea, puede degradar la calidad del resultado.

## Ejemplo

Anthropic describe el patrón que le funcionó en su sistema de investigación: un agente líder (Claude Opus 4) descompone la consulta y coordina subagentes (Claude Sonnet 4) que exploran direcciones independientes en paralelo y devuelven un resumen condensado. Este patrón superó a un agente único en consultas "de amplitud" —por ejemplo, identificar a todos los miembros de directorio de las empresas del sector tecnológico del S&P 500, donde el agente único no terminaba la tarea y el sistema multiagente sí (Anthropic, "How we built our multi-agent research system", 13-06-2025).

Cognition, en cambio, documenta el fallo típico cuando se aplica el mismo patrón a una tarea de escritura: al dividir la construcción de un juego tipo Flappy Bird entre dos subagentes, uno construyó un fondo de estilo Super Mario y el otro un pájaro que no encajaba con ese fondo ni con la mecánica original, y el agente final quedó con la tarea de reconciliar dos decisiones incompatibles que ningún agente vio venir (Cognition, "Don't Build Multi-Agents", 12-06-2025).

Un año después, el mismo autor de Cognition matiza esa postura: identifica patrones donde varios agentes sí funcionan bien en tareas de código, siempre que **la escritura quede en un solo hilo** y los demás agentes aporten inteligencia sin tocar el estado directamente. Los tres patrones que describe:

1. **Bucle de revisión de código**: un agente de revisión con contexto limpio detecta errores que el agente que escribió el código no ve, precisamente porque no arrastra el mismo contexto saturado.
2. **"Amigo listo" (smart friend)**: un modelo más débil delega en uno más fuerte las partes difíciles de la tarea.
3. **Coordinación tipo manager**: un agente gestor reparte una tarea grande en piezas y lanza agentes hijos, pero mantiene las escrituras centralizadas en un solo punto.

(Cognition, "Multi-Agents: What's Actually Working", 22-04-2026.)

## Datos

| Métrica | Cifra | Fuente |
|---|---|---|
| Consumo de tokens de un agente vs. chat normal | ~4x más | Anthropic, 13-06-2025 |
| Consumo de tokens de un sistema multiagente vs. chat normal | ~15x más | Anthropic, 13-06-2025 |
| Mejora del sistema líder+subagentes sobre un agente único en el eval interno de investigación de Anthropic | 90,2% | Anthropic, 13-06-2025 |
| Varianza en el desempeño explicada solo por el uso de tokens | 80% | Anthropic, 13-06-2025 |

## Debate

Anthropic sostiene que el multiagente vale la pena cuando la tarea es de alto valor, paralelizable y de "amplitud" (explorar muchas direcciones independientes): en ese caso el gasto extra de tokens se paga solo. Cita como buenos candidatos la debida diligencia legal, la inteligencia competitiva y la revisión de literatura biomédica (Anthropic, "How we built our multi-agent research system", 13-06-2025).

Walden Yan, cofundador de Cognition, sostiene lo contrario para tareas donde el resultado es un artefacto único que se construye por partes —código, sobre todo—: "actions carry implicit decisions, and conflicting decisions carry bad results" ("las acciones cargan decisiones implícitas, y decisiones en conflicto producen malos resultados"). Su recomendación por defecto en 2025 era un solo agente de hilo lineal; en su post de 2026 la matiza, pero mantiene que las escrituras deben quedar centralizadas en un único agente incluso cuando hay varios participando (Cognition, 12-06-2025 y 22-04-2026).

> [!duda] Anthropic no publicó una comparación directa para tareas de código equivalente a la que sí hizo para investigación; su cifra de 90,2% de mejora corresponde a un eval interno de investigación, no de programación. Extrapolar esa cifra a tareas de código no está respaldado por la fuente.

## Cómo empezar

1. Antes de montar varios agentes, pregunta si la tarea es de "amplitud" (muchas direcciones independientes que se pueden explorar en paralelo) o de "escritura" (un solo artefacto que se construye por partes). Lo primero es candidato a multiagente; lo segundo, no por defecto.
2. Si necesitas varios agentes en una tarea de código, mantén una sola escritura: usa los demás agentes para revisar, sugerir o resolver subtareas acotadas, no para escribir en paralelo sobre el mismo artefacto.
3. Antes de paralelizar, mide el costo en tokens de la versión con un solo agente. Si la tarea no tolera un gasto de 4 a 15 veces mayor, el multiagente probablemente no compensa.
4. Si divides trabajo entre agentes, comparte las decisiones implícitas explícitamente (qué estilo, qué convenciones, qué supuestos) en vez de asumir que se infieren del contexto de cada subagente.

## Fuentes

- [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) — Anthropic — pub: 2025-06-13 — visto: 2026-09-21
- [Don't Build Multi-Agents](https://cognition.com/blog/dont-build-multi-agents) — Cognition (Walden Yan) — pub: 2025-06-12 — visto: 2026-09-21
- [Multi-Agents: What's Actually Working](https://cognition.com/blog/multi-agents-working) — Cognition (Walden Yan) — pub: 2026-04-22 — visto: 2026-09-21
- [How and when to build multi-agent systems](https://www.langchain.com/blog/how-and-when-to-build-multi-agent-systems) — LangChain (Harrison Chase) — pub: 2025-06-16 — visto: 2026-09-21

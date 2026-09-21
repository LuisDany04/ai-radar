---
id: prompts-para-agentes
title: "Prompts para agentes: qué funciona en 2026 y qué dejaron de recomendar los propios fabricantes"
track: practicas
type: guia
level: intermedio
tags: prompting, agentes, ingenieria de contexto, buenas practicas
summary: "La documentación oficial de Anthropic y OpenAI en 2026 ya no habla de trucos de prompt: habla de instrucciones directas, dials de esfuerzo y descripciones de herramientas. Dos estudios de Wharton muestran por qué 'piensa paso a paso' y los personajes expertos dejaron de servir."
updated: 2026-09-21
reading_minutes: 8
source_span: 2025-06-08..2026-06-13
confidence: alta
---

Diseñar el prompt de un agente en 2026 se parece poco a lo que se enseñaba en 2023-2024. La guía oficial de prompting de Claude ("Prompting best practices", vigente para Claude Sonnet 5, Opus 5 y modelos Fable/Mythos) ya no dedica espacio a fórmulas mágicas: pide instrucciones explícitas y directas, ejemplos bien elegidos, estructura con XML, y trata el "pensamiento" del modelo como un parámetro (`effort`, `thinking: adaptive`) que se ajusta, no como algo que se induce escribiendo "piensa paso a paso" al final del prompt. La guía de prompting de GPT-5 de OpenAI, publicada el 07-08-2025, sigue el mismo patrón: un parámetro `reasoning_effort` con niveles bajo/medio/alto reemplaza a las instrucciones manuales de razonamiento, y la recomendación pasa a ser calibrar ese dial según la dificultad de la tarea, no redactar mejor el pedido de que "razone".

Dos trucos que dominaron la conversación de 2023-2024 tienen ahora evidencia empírica en contra publicada por Wharton Generative AI Labs. El primero es "piensa paso a paso" (chain-of-thought forzado): el informe "The Decreasing Value of Chain of Thought in Prompting" (Lennart Meincke, Ethan Mollick, Lilach Mollick y Dan Shapiro, 08-06-2025) encontró que en modelos de razonamiento (o3-mini, o4-mini, Gemini Flash 2.5) el truco aporta ganancias mínimas —o3-mini +2,9%, o4-mini +3,1%, y Gemini Flash 2.5 en realidad *cae* 3,3%— a cambio de un 20-80% más de tiempo de respuesta. El segundo es asignarle un personaje experto al modelo ("Eres un físico de clase mundial..."): el informe "Playing Pretend: Expert Personas Don't Improve Factual Accuracy" (mismo laboratorio, 07-12-2025) probó personas expertas en GPQA Diamond y MMLU-Pro sobre seis modelos y no encontró ninguna que mejorara la precisión de forma consistente; los personajes de bajo conocimiento ("niño pequeño", "lego") sí la empeoraron de forma sistemática.

## Por qué importa

Cuando el prompt se escribe para un agente que va a usar herramientas, leer archivos y encadenar pasos —no para una sola respuesta de chat— los trucos de una sola llamada pierden sentido y aparecen categorías nuevas de error. La guía de Claude documenta, por ejemplo, que modelos entrenados para "seguir instrucciones al pie de la letra" interpretan literalmente peticiones ambiguas: pedir "¿puedes sugerir cambios?" hace que el modelo *solo sugiera*, en vez de aplicarlos, aunque esa fuera la intención real. Ese tipo de fricción no se resuelve con una frase ingeniosa sino con instrucciones explícitas sobre qué acción se espera. En paralelo, Anthropic señala en "Writing effective tools for agents" (11-09-2025) que, en un agente, las descripciones de las herramientas viven dentro del contexto del modelo en cada llamada, así que redactarlas bien —"como si le dieras el contexto a un nuevo empleado"— es hoy una de las palancas de prompting con más impacto, más que el texto de la instrucción del usuario.

## Ejemplo

Antes/después tomado literalmente de la guía oficial de Claude ("Prompting best practices", sección "Tool usage"):

**Menos efectivo (Claude solo sugiere):**
```text
Can you suggest some changes to improve this function?
```

**Más efectivo (Claude aplica los cambios):**
```text
Change this function to improve its performance.
```

La misma guía muestra el patrón equivalente para pedir un resultado más completo, en la sección de migración:

**Menos efectivo:**
```text
Create an analytics dashboard
```

**Más efectivo:**
```text
Create an analytics dashboard. Include as many relevant features and
interactions as possible. Go beyond the basics to create a
fully-featured implementation.
```

Del lado de OpenAI, la guía de prompting de GPT-5 (cookbook.openai.com) reemplaza la instrucción de "razona paso a paso" por control explícito del esfuerzo y por un "preámbulo de herramienta" que el modelo debe emitir antes de actuar:

```text
Always begin by rephrasing the user's goal in a friendly, clear, and
concise manner, before calling any tools. Then, immediately outline a
structured plan detailing each logical step.
```

## Datos

| Técnica | Resultado medido | Fuente |
|---|---|---|
| "Piensa paso a paso" en modelos de razonamiento (o3-mini, o4-mini) | +2,9% y +3,1% de exactitud, con 20-80% más de tiempo de respuesta | Wharton GAI Labs, "The Decreasing Value of Chain of Thought in Prompting", 08-06-2025 |
| "Piensa paso a paso" en Gemini Flash 2.5 (razonamiento) | -3,3% de exactitud | Wharton GAI Labs, ídem, 08-06-2025 |
| "Piensa paso a paso" en modelos sin razonamiento (Gemini Flash 2.0, Sonnet 3.5) | +13,5% y +11,7% de exactitud, pero con más variabilidad de respuesta | Wharton GAI Labs, ídem, 08-06-2025 |
| Personas expertas ("eres un físico...") en GPQA Diamond y MMLU-Pro, 6 modelos | Ninguna persona mejoró la precisión de forma consistente; una excepción aislada en Gemini 2.0 Flash (p=0,002) no se replicó en modelos relacionados | Wharton GAI Labs, "Playing Pretend: Expert Personas Don't Improve Factual Accuracy", 07-12-2025 |
| Personas de bajo conocimiento ("niño pequeño", "lego") | Redujeron la precisión de forma sistemática en varios modelos | Wharton GAI Labs, ídem, 07-12-2025 |

> [!duda] El informe de Wharton sobre chain-of-thought evalúa un conjunto específico de tareas y modelos de 2025 (o3-mini, o4-mini, Gemini Flash 2.5, entre otros); no hay una réplica publicada con los modelos de razonamiento de mediados/fines de 2026, así que la magnitud exacta de "cuánto ya no ayuda" puede haber cambiado con modelos más nuevos, aunque la dirección del hallazgo (rendimientos decrecientes en modelos que ya razonan internamente) es consistente con el diseño de `effort`/`thinking: adaptive` que documenta la propia Anthropic.

## Debate

La newsletter "Prompt Engineering, Summer 2026" (ACDigest, 13-06-2026) resume el consenso práctico que emerge de esta evidencia: lo que "sigue funcionando fuerte" son las instrucciones claras y específicas, los ejemplos para formato de salida (3 a 5, diversos) y las etiquetas XML o esquemas estructurados; lo que "lidera ahora" son los dials de esfuerzo/razonamiento, el prompting orientado a resultados y criterios de éxito en vez de pasos, y la optimización automática de prompts mediante evaluaciones numéricas en vez de juicio subjetivo. La propia guía de Claude, en su sección de migración, recomienda explícitamente "atenuar" (dial back) las instrucciones agresivas tipo "CRITICAL: You MUST use this tool when..." que se usaban para forzar el disparo de herramientas en modelos anteriores, porque en los modelos 2026 esas mismas instrucciones causan sobre-activación.

No todos coinciden en que la estructura pesada siga aportando. Simon Willison, en la guía continua "Agentic Engineering Patterns" (simonwillison.net, sección "Prompts I use"), documenta su propio giro hacia prompts más cortos y con menos reglas explícitas de "qué no hacer" para tareas concretas (corrección de textos, generación de alt text), delegando el criterio editorial final al humano en vez de tratar de cubrir cada caso con más instrucciones. La tensión de fondo: la documentación oficial de los fabricantes sigue publicando bloques de system prompt largos y muy estructurados (la propia guía de Claude incluye ejemplos de instrucciones de varios párrafos para frontend, paralelismo de herramientas o gestión de contexto), mientras que parte de la práctica en el terreno se mueve hacia prompts más cortos apoyados en evaluaciones (evals) para decidir qué agregar y qué quitar, en vez de acumular reglas por precaución.

## Cómo empezar

1. Antes de escribir una instrucción de comportamiento, pregúntate si el modelo ya la infiere: la guía de Claude advierte que instrucciones que eran necesarias en generaciones anteriores (forzar el uso de una herramienta, pedir minuciosidad) hoy pueden causar sobre-activación en modelos más nuevos.
2. Reemplaza "piensa paso a paso" por el control de esfuerzo/razonamiento que ofrezca tu proveedor (`effort` en Claude, `reasoning_effort` en GPT-5) y ajústalo según la dificultad real de la tarea, no por defecto.
3. No le asignes un personaje experto para tareas de exactitud factual; según la evidencia de Wharton no ayuda de forma consistente y en dominios distintos puede perjudicar. Resérvalo, si acaso, para tono o estilo de la respuesta.
4. Si tu agente usa herramientas, invierte tiempo en redactar sus descripciones (parámetros sin ambigüedad, terminología explícita) antes que en pulir la instrucción del usuario: es donde la guía de Anthropic reporta el mayor impacto medido.
5. Usa el patrón "menos efectivo / más efectivo" de la guía de Claude como plantilla propia: pide la acción explícita ("cambia esta función") en vez de la pregunta abierta ("¿puedes sugerir cambios?").

## Fuentes

- [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) — Anthropic (Claude Platform Docs) — pub: s/f — visto: 2026-09-21
- [GPT-5 prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide) — OpenAI Cookbook — pub: 2025-08-07 — visto: 2026-09-21
- [Writing effective tools for AI agents—using AI agents](https://www.anthropic.com/engineering/writing-tools-for-agents) — Anthropic — pub: 2025-09-11 — visto: 2026-09-21
- [Technical Report: The Decreasing Value of Chain of Thought in Prompting](https://gail.wharton.upenn.edu/research-and-insights/tech-report-chain-of-thought/) — Meincke, Mollick, Mollick y Shapiro, Wharton Generative AI Labs — pub: 2025-06-08 — visto: 2026-09-21
- [Technical Report: Playing Pretend: Expert Personas Don't Improve Factual Accuracy](https://gail.wharton.upenn.edu/research-and-insights/playing-pretend-expert-personas/) — Basil, Shapiro, Shapiro, Mollick, Mollick y Meincke, Wharton Generative AI Labs — pub: 2025-12-07 — visto: 2026-09-21
- [Prompt Engineering, Summer 2026: What Is Out, What Stayed, and What Leads Now](https://acdigest.substack.com/p/prompt-engineering-summer-2026-what) — ACDigest — pub: 2026-06-13 — visto: 2026-09-21
- [Prompts I use — Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/prompts/) — Simon Willison — pub: s/f — visto: 2026-09-21

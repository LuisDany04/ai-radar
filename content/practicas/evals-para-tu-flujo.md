---
id: evals-para-tu-flujo
title: "Evals: por qué son el cuello de botella y cómo montar una mínima"
track: practicas
type: guia
level: intermedio
tags: evals, evaluacion, calidad, testing, llm-as-judge
summary: "Por qué evaluar agentes es más difícil que evaluar un modelo de una sola respuesta, qué tipos de evals existen y cómo montar una mínima para tu propio flujo de trabajo."
updated: 2026-09-21
reading_minutes: 7
source_span: 2025-05-28..2026-03-09
confidence: alta
---

Un "eval" es, en la definición de Anthropic, una prueba para un sistema de IA: le das una entrada y aplicas una lógica de calificación a su salida para medir el éxito. Con un modelo de una sola respuesta eso es relativamente simple. Con un agente no: la unidad que se está probando ya no es solo el modelo, es el modelo más el harness, las herramientas, la memoria, el entorno y los supuestos del producto. Autonomía, uso de herramientas y múltiples turnos —lo que hace útil a un agente— es exactamente lo que lo hace difícil de evaluar (Anthropic, "Demystifying evals for AI agents", 09-01-2026).

## Por qué importa

Sin evals, el patrón habitual es reactivo: el equipo detecta problemas solo cuando ya llegaron a producción, y arreglar uno genera otro sin que nadie lo note hasta el siguiente reporte de usuario. Hamel Husain y Shreya Shankar, que han asesorado evaluación de IA en más de 50 empresas, insisten en que el error más común no es "no tener suficiente infraestructura de evals", sino invertir en infraestructura antes de mirar los datos: su recomendación es "empezar con análisis de errores, no con infraestructura" (Hamel Husain, "AI Evals: Everything You Need to Know", actualizado 18-09-2026).

## Ejemplo

El método mínimo que describe Husain no requiere ninguna herramienta nueva:

1. Junta entre 20 y 50 transcripciones reales de tu agente (de producción o de pruebas manuales).
2. Léelas tú mismo —al menos 30— antes de delegarle la tarea a un agente o a un tercero. Husain lo llama "codificación abierta": anotas en texto libre qué salió mal en cada una, sin categorías predefinidas.
3. Agrupa esas notas en categorías de falla recurrentes ("codificación axial"): por ejemplo, "cita una fuente que no abrió", "ignora una instrucción del sistema", "formatea mal el resultado".
4. Para las categorías más frecuentes, decide el tipo de calificador: una aserción de código si la regla es objetiva (¿el JSON es válido?, ¿la prueba pasa?), un modelo como juez si el criterio es subjetivo y necesitas juicio experto (normalmente con 100-200 ejemplos etiquetados a mano como referencia), o revisión humana si no se puede automatizar todavía.

Anthropic describe el mismo arranque desde el lado de la agenda del equipo: los primeros 20-50 casos ya son suficientes para empezar a iterar, y conviene escribirlos a partir de fallos reales, no inventados, con solución de referencia y una mezcla de casos positivos y negativos ("Demystifying evals for AI agents", 09-01-2026).

Para automatizar el propio proceso de auditoría, Husain publicó un plugin de skills para agentes de código (`evals-skills`) con seis capacidades reutilizables —`error-analysis`, `generate-synthetic-data`, `write-judge-prompt`, `validate-evaluator`, `evaluate-rag`, `build-review-interface`— y un prompt de arranque pensado para pegarse directo en un agente:

```text
Install the eval skills plugin from https://github.com/hamelsmu/evals-skills,
then run /evals-skills:eval-audit on my eval pipeline. Investigate each
diagnostic area using a separate subagent in parallel, then synthesize
findings into a single report.
```

(Hamel Husain, "Evals Skills for Coding Agents", 03-03-2026.)

## Datos

| Dato | Cifra | Fuente |
|---|---|---|
| Casos iniciales recomendados para empezar a iterar | 20-50 | Anthropic, 09-01-2026 |
| Ejemplos etiquetados a mano recomendados para calibrar un juez LLM | 100-200 | Hamel Husain, actualizado 18-09-2026 |
| Revisión manual recomendada al hacer cambios grandes | 20-50 salidas, ~30 minutos | Hamel Husain, actualizado 18-09-2026 |
| SWE-bench Verified, punto de partida vs. modelos de frontera actuales | 40% inicial → más de 80% | Anthropic, 09-01-2026 |
| Mejora de Opus 4.5 en CORE-Bench tras corregir errores del propio eval | 42% → 95% | Anthropic, 09-01-2026 |
| Desarrolladores que usaron Promptfoo (herramienta open source de evals) | más de 350.000 | Promptfoo, 09-03-2026 |

> [!duda] La cifra de mejora de Opus 4.5 en CORE-Bench (42% a 95%) se atribuye en el post de Anthropic a corregir defectos en el propio eval, no solo a mejoras del modelo. El post no separa cuánto de esa mejora es el modelo y cuánto es el eval mejor calibrado.

## Debate

Husain marca una distinción que va a contracorriente de cómo mucha gente arma sus evals: llama "eval-driven development" —escribir las pruebas automatizadas de evaluación antes de tener suficiente análisis de errores manual— un error, no una buena práctica, porque produce evaluadores que miden lo que el equipo cree que importa en vez de lo que realmente falla en producción. También desaconseja usar métricas genéricas de NLP como BERTScore o ROUGE como sustituto de calidad, y usar escalas Likert en vez de decisiones binarias de paso/no paso, porque diluyen la señal que hace falta para decidir si algo se rompió (Hamel Husain, actualizado 18-09-2026).

Anthropic distingue dos tipos de evals con objetivos distintos: los de **capacidad** ("¿puede el agente hacer este tipo de tarea todavía?"), que deben incluir tareas difíciles y no deberían acercarse al 100% —si lo hacen, dejaron de ser útiles para medir progreso—; y los de **regresión** ("¿rompimos algo que antes funcionaba?"), que sí deben mantenerse estables y cerca del 100%, y ser lo bastante rápidos para correr seguido (Anthropic, 09-01-2026).

## Cómo empezar

1. No compres ni montes una plataforma de evals todavía. Junta 20-50 transcripciones reales de tu agente y léelas tú mismo.
2. Anota en texto libre qué salió mal en cada una, sin categorías previas, y agrupa después en categorías recurrentes.
3. Para las fallas más frecuentes, decide el calificador más simple que funcione: aserción de código antes que modelo-juez, modelo-juez antes que revisión humana permanente.
4. Si usas un modelo como juez, calíbralo con 100-200 ejemplos etiquetados a mano antes de confiar en su veredicto.
5. Separa tus evals en dos carpetas mentales: capacidad (qué tan lejos puede llegar el agente, tolera fallos) y regresión (qué no puede volver a romperse, debe mantenerse casi siempre en verde).
6. Herramientas open source como Promptfoo, o plataformas como Braintrust, LangSmith o Arize Phoenix, sirven para automatizar una vez que ya sabes qué medir; no las uses como punto de partida.

## Fuentes

- [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — Anthropic — pub: 2026-01-09 — visto: 2026-09-21
- [AI Evals: Everything You Need to Know](https://hamel.dev/blog/posts/evals-faq/) — Hamel Husain y Shreya Shankar — pub: 2025-05-28 (actualizado 2026-09-18) — visto: 2026-09-21
- [Evals Skills for Coding Agents](https://hamelhusain.substack.com/p/evals-skills-for-coding-agents) — Hamel Husain — pub: 2026-03-03 — visto: 2026-09-21
- [Promptfoo is joining OpenAI](https://www.promptfoo.dev/blog/promptfoo-joining-openai/) — Promptfoo — pub: 2026-03-09 — visto: 2026-09-21

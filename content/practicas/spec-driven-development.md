---
id: spec-driven-development
title: "Spec-driven development: la especificacion como fuente de verdad para agentes, y por que algunos la llaman waterfall disfrazado"
track: practicas
type: guia
level: intermedio
tags: spec driven development, especificaciones, agentes, planificacion
summary: "GitHub y Amazon empujan un flujo donde la especificacion, no el codigo, es el artefacto central que gobierna a los agentes. Herramientas reales, plantillas copiables y la critica seria que lo compara con el modelo waterfall."
updated: 2026-09-21
reading_minutes: 8
source_span: 2025-09-02..2026-08-27
confidence: alta
---

Spec-driven development (SDD, "desarrollo dirigido por especificacion") es un flujo de trabajo en el que la especificacion escrita —no el prompt suelto ni el codigo— se trata como el artefacto principal y ejecutable del proyecto: los agentes generan, prueban y validan el código a partir de ese documento, en vez de que el documento sea una formalidad posterior. GitHub lo resume así en el anuncio de su herramienta Spec Kit (02-09-2025): la especificación se convierte en "la fuente de verdad compartida" que agentes como GitHub Copilot, Claude Code o Gemini CLI usan durante todo el desarrollo, en lugar de una instrucción de una sola vez que se descarta tras usarla.

El motivo declarado por quienes lo promueven es el mismo diagnóstico que separa "vibe coding" de "ingeniería agéntica": un agente que solo recibe una descripción vaga del objetivo produce código que "parece correcto pero no funciona del todo", en palabras del post de GitHub, porque a los agentes hay que darles instrucciones sin ambigüedad, no tratarlos como un buscador al que se le pide algo y se acepta lo que devuelve.

## Por qué importa

SDD apareció como respuesta directa a un problema documentado del vibe coding sin supervisión: agentes que alucinan APIs, pierden de vista la intención original a medida que crece el proyecto, y producen resultados que se degradan con el tiempo. Formalizar la especificación busca que ese contexto no dependa de la memoria de una conversación ni de que alguien repita las mismas instrucciones cada vez, sino que quede escrito, versionado y verificable.

## Ejemplo

**GitHub Spec Kit** se instala y se usa con comandos de barra dentro del agente de código (Claude Code, Copilot, Gemini CLI, etc.). El flujo real, documentado en el repositorio oficial (github.com/github/spec-kit) y en el anuncio de GitHub:

```bash
# Instalación e inicio de un proyecto nuevo
uvx --from git+https://github.com/github/spec-kit.git specify init <NOMBRE_PROYECTO>
```

Dentro del agente, el flujo de comandos (prefijo `/speckit-` en la versión actual del toolkit) recorre estas fases:

```text
/speckit-constitution   # define los principios del proyecto
/speckit-specify        # redacta la especificación a partir de los requisitos
/speckit-plan           # convierte la especificación en un plan técnico
/speckit-tasks          # descompone el plan en tareas revisables
/speckit-implement      # ejecuta las tareas con el agente
```

**Amazon Kiro** genera tres archivos por funcionalidad —`requirements.md`, `design.md` y `tasks.md`— con una puerta de aprobación humana entre cada fase. Los requisitos se escriben en notación EARS (Easy Approach to Requirements Syntax), pensada para que cada criterio de aceptación sea inequívoco y verificable. Ejemplo literal de la documentación de Kiro (kiro.dev, actualizada 04-08-2026):

```text
WHEN a user submits a form with invalid data
THE SYSTEM SHALL display validation errors next to the relevant fields
```

## Datos

| Dato | Cifra | Fuente |
|---|---|---|
| Estrellas de GitHub Spec Kit en el repositorio oficial | 138.200 (visto en vivo) | github.com/github/spec-kit — visto: 2026-09-21 |
| Fecha de lanzamiento público de Spec Kit | 02-09-2025 | The GitHub Blog — pub: 2025-09-02 |
| Fases del flujo de Kiro con aprobación humana entre cada una | 3 (Requirements → Design → Tasks) | kiro.dev/docs/specs/ — pub: 2026-08-27 |
| Archivos que genera cada spec de Kiro | requirements.md, design.md, tasks.md | kiro.dev/docs/specs/ — pub: 2026-08-27 |
| Ejemplo de sobrecarga documental citado por un crítico (mostrar una fecha en pantalla, con Spec Kit) | 8 archivos y 1.300 líneas de texto | François Zaninotto, marmelab.com — pub: 2025-11-12 |

> [!duda] La cifra de "8 archivos y 1.300 líneas" para un caso tan simple como mostrar una fecha viene de un único autor crítico probando el toolkit por su cuenta (marmelab.com, 12-11-2025); no hay una medición independiente que la contraste, y GitHub no publica cifras propias de "líneas de spec por línea de código" en su documentación oficial.

## Debate

Quienes promueven SDD —GitHub y Amazon a la cabeza, con productos comerciales detrás— sostienen que el costo de escribir la especificación se paga solo en proyectos no triviales: reportes de adopción temprana citados por herramientas del ecosistema hablan de una tasa de éxito "de 3 a 10 veces mayor" en tareas no triviales frente a prompts sueltos, aunque esa cifra proviene de adoptantes tempranos de GitHub y AWS, no de un estudio independiente.

La crítica más desarrollada es la de François Zaninotto (marmelab.com, 12-11-2025), quien compara SDD directamente con el modelo waterfall: exige "documentación masiva antes de programar para que los desarrolladores simplemente tradujeran especificaciones a código", y argumenta que ese enfoque falla porque "el desarrollo de software es fundamentalmente un proceso no determinista, así que planificar no elimina la incertidumbre". Zaninotto documenta seis problemas concretos que probó él mismo: los agentes de SDD pierden de vista funciones existentes que habría que actualizar ("ceguera de contexto"), la documentación generada es excesiva y repetitiva, el proceso de tres pasos genera burocracia sistemática, el código dentro de la propia especificación termina necesitando revisión dos veces (antes y después de implementarlo), los agentes no siempre siguen la especificación al pie de la letra pese a tenerla, y el enfoque pierde valor a medida que el código base crece. Como contraejemplo, menciona haber construido una herramienta de escultura 3D en 10 horas con Claude Code sin usar ninguna especificación previa.

> [!duda] No hay consenso sobre cuándo el costo de escribir la especificación se justifica: la postura de los fabricantes de herramientas (GitHub, Amazon) es que el punto de quiebre depende de la complejidad y estabilidad del proyecto, mientras que la crítica de Zaninotto sugiere que el enfoque nunca compensa para features pequeñas y se degrada con el tamaño del proyecto, no lo contrario.

## Cómo empezar

1. No apliques SDD a una tarea pequeña o exploratoria: tanto la documentación oficial como sus críticos coinciden en que el costo de escribir requirements/design/tasks solo se justifica en funcionalidades no triviales o en código que ya existe y hay que respetar.
2. Si tu equipo ya exige diseño revisado y plan de rollback para cambios grandes, una spec formal no es burocracia nueva: es el mismo razonamiento en un formato que un agente puede ejecutar. Empieza ahí, no en el primer commit del proyecto.
3. Prueba el flujo con un caso acotado antes de adoptarlo en todo el equipo: instala Spec Kit (`uvx --from git+https://github.com/github/spec-kit.git specify init <nombre>`) o abre un spec de Kiro en un solo feature, y mide vos mismo cuánto tiempo y cuánta documentación te pide, en vez de asumir la cifra de otro caso.
4. Si usas notación EARS para requisitos, mantenla en una sola línea por criterio ("WHEN \<condición\>, THE SYSTEM SHALL \<comportamiento\>"): es lo que la hace verificable, y es lo que se pierde si el requisito se redacta como prosa libre.
5. Vigila la "ceguera de contexto" que reporta Zaninotto: en un código base grande, revisa explícitamente si el agente detectó las funciones existentes que la nueva especificación debería tocar, no asumas que la especificación por sí sola se lo garantiza.

## Fuentes

- [Spec-driven development with AI: Get started with a new open source toolkit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) — The GitHub Blog — pub: 2025-09-02 — visto: 2026-09-21
- [github/spec-kit](https://github.com/github/spec-kit) — GitHub (repositorio oficial) — pub: s/f — visto: 2026-09-21
- [Specs](https://kiro.dev/docs/specs/) — Kiro (documentación oficial, Amazon) — pub: 2026-08-27 — visto: 2026-09-21
- [Feature Specs](https://kiro.dev/docs/specs/feature-specs/) — Kiro (documentación oficial, Amazon) — pub: 2026-08-04 — visto: 2026-09-21
- [Spec-Driven Development: The Waterfall Strikes Back](https://marmelab.com/blog/2025/11/12/spec-driven-development-waterfall-strikes-back.html) — François Zaninotto, marmelab.com — pub: 2025-11-12 — visto: 2026-09-21
- [The hidden costs of spec-driven development: when structure helps and when it slows you down](https://hiddedesmet.com/the-hidden-costs-of-spec-driven-development) — Hidde de Smet — pub: 2026-07-10 — visto: 2026-09-21

---
id: debate-juniors
title: "El efecto de la IA sobre los desarrolladores junior y sobre cómo se aprende a programar"
track: practicas
type: opinion
level: intermedio
tags: juniors, aprendizaje, empleo, formacion, educacion
summary: "Datos de nómina de Stanford muestran una brecha de empleo del 19% para programadores de 22 a 25 años; un experimento de Anthropic muestra 17 puntos menos de comprensión al usar IA para aprender. Qué está confirmado y qué no."
updated: 2026-09-21
reading_minutes: 8
source_span: 2025-08-21..2026-08-12
confidence: media
---

Hay dos preguntas distintas detrás de "la IA está afectando a los juniors": ¿hay menos empleos de entrada al oficio?, y ¿aprender a programar con IA al lado produce peores programadores que aprender sin ella? En 2025-2026 empezó a haber datos reales, no solo anécdotas, para las dos.

## Qué cambió

El Stanford Digital Economy Lab, que analiza datos de nómina en tiempo real de ADP (el mayor proveedor de software de nómina de Estados Unidos, con información de 4,6 millones de trabajadores), documentó en agosto de 2026 que el empleo de trabajadores de 22 a 25 años en ocupaciones muy expuestas a la IA —programación entre ellas— está **19% por debajo** de donde estaría si hubiera seguido el ritmo de sus pares en ocupaciones menos expuestas. La brecha no para de crecer: era del 15% en julio de 2025 y llegó a 19% en junio de 2026. Los propios autores, Erik Brynjolfsson, Bharat Chandar y Ruyu Chen, precisan que el ajuste "opera principalmente a través de menos contratación de trabajadores jóvenes, no de más despidos": no es que estén corriendo a los juniors, es que no se los está contratando.

## Por qué importa

Si la vía de entrada al oficio se angosta, el problema no es solo de quienes buscan su primer empleo. Es también de quién va a tener la experiencia necesaria para ser senior dentro de diez años. Y si además aprender a programar apoyándose en IA deja huecos de comprensión reales, medibles, las dos tendencias se refuerzan: menos oportunidades de entrada, y quienes sí entran aprenden peor de lo que aprendía la generación anterior.

## Datos

| Estudio | Hallazgo | Fecha |
|---|---|---|
| Stanford Digital Economy Lab (Brynjolfsson, Chandar, Chen) | Empleo de 22-25 años en ocupaciones expuestas a IA, 19% por debajo de la tendencia esperada | 12-08-2026 |
| Anthropic, "How AI assistance impacts the formation of coding skills" | Grupo con asistencia de IA: 50% en cuestionario de comprensión, frente a 67% del grupo sin IA (52 ingenieros, mayoría junior) | 29-01-2026 |

En el experimento de Anthropic, ambos grupos programaron dos funciones usando Trio, una biblioteca de Python desconocida para todos los participantes; el grupo con IA terminó apenas dos minutos antes, una diferencia que no llegó a ser estadísticamente significativa, pero perdió comprensión medible frente al grupo que programó a mano.

## Debate

**La contratación de juniors se está reduciendo y es un error estratégico**: Matt Garman, CEO de AWS, respondió así cuando le plantearon que algunos líderes empresariales creen que pueden "reemplazar a todo el personal junior" con IA, en una conversación con el inversor Matthew Berman recogida por Simon Sharwood en The Register (21-08-2025): "that's the like one the dumbest thing I've ever heard" ("es de lo más tonto que he escuchado"). Argumentó que los juniors son "probablemente los empleados menos costosos" y los más comprometidos con las herramientas de IA, y preguntó: "¿cómo va a funcionar eso cuando en diez años no tengas a nadie que haya aprendido nada?".

**Usar IA para aprender no tiene por qué degradar el aprendizaje, depende de cómo se use**: el propio estudio de Anthropic (29-01-2026) matiza su hallazgo más alarmante: entre quienes usaron IA, los que mejor retuvieron el conocimiento no fueron los que menos la usaron, sino los que la usaron distinto —pidiendo explicaciones, haciendo preguntas de seguimiento, planteando cuestiones conceptuales— en vez de limitarse a copiar la solución. Addy Osmani, en "The Next Two Years of Software Engineering" (05-01-2026), sostiene una posición similar: cita datos de que la contratación junior cae 9-10% en los seis trimestres siguientes a que una empresa adopta IA generativa, pero su recomendación no es abandonar la IA sino usarla "as a learning tool, not a crutch" ("como herramienta de aprendizaje, no como muleta").

> [!duda] El estudio de Anthropic mide un caso específico —aprender una biblioteca desconocida en una sesión corta— y sus propios autores no lo presentan como prueba de que la IA arruine el aprendizaje en general, sino de que el modo de uso importa. No hay todavía un estudio longitudinal que mida la comprensión de ingenieros junior después de meses o años de trabajo diario con IA.

## Dónde queda el debate

Lo que los datos de Stanford dejan relativamente firme: hay una brecha de contratación real y creciente para los programadores más jóvenes, medida con datos de nómina y no con encuestas de percepción, y esa brecha no se explica por despidos sino por una puerta de entrada más angosta. Lo que sigue abierto es la causalidad exacta (¿cuánto es IA y cuánto es el ciclo económico general?) y, sobre todo, si el problema de aprendizaje es inherente a usar IA o es un problema de hábitos de uso que se puede corregir con formación explícita, como sugiere el propio hallazgo de Anthropic de que preguntar y pedir explicaciones cambia el resultado. Nadie serio, ni siquiera Anthropic con su propio estudio, sostiene que la solución sea que los juniors dejen de usar IA: la discusión real es sobre cómo se les enseña a usarla sin saltarse la comprensión.

## Fuentes

- [No Widespread Displacement, but the AI Employment Gap for Young Workers Has Widened to 19%](https://digitaleconomy.stanford.edu/news/canariesaug26/) — Erik Brynjolfsson, Bharat Chandar, Ruyu Chen (Stanford Digital Economy Lab) — pub: 2026-08-12 — visto: 2026-09-21
- [How AI assistance impacts the formation of coding skills](https://www.anthropic.com/research/AI-assistance-coding-skills) — Anthropic — pub: 2026-01-29 — visto: 2026-09-21
- [AWS CEO says using AI to replace junior staff is 'Dumbest thing I've ever heard'](https://www.theregister.com/2025/08/21/aws_ceo_entry_level_jobs_opinion/) — Simon Sharwood, The Register — pub: 2025-08-21 — visto: 2026-09-21
- [The Next Two Years of Software Engineering](https://addyosmani.com/blog/next-two-years/) — Addy Osmani — pub: 2026-01-05 — visto: 2026-09-21

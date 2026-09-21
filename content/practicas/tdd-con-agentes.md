---
id: tdd-con-agentes
title: "TDD con agentes: la evidencia a favor, la evidencia en contra, y por qué nadie se pone de acuerdo todavía"
track: practicas
type: guia
level: intermedio
tags: tdd, testing, agentes, calidad de codigo
summary: "Un experimento de Thoughtworks no encontró diferencia entre TDD y no-TDD con agentes, y un paper académico midió que las instrucciones genéricas de TDD empeoran las regresiones. Otros practicantes siguen defendiéndolo. La evidencia de ambos lados, sin veredicto."
updated: 2026-09-21
reading_minutes: 7
source_span: 2026-01-09..2026-09-12
confidence: media
---

Aplicar TDD (desarrollo dirigido por pruebas) a un agente de código admite al menos tres variantes distintas, y buena parte del debate sobre "si funciona o no" en realidad discute variantes diferentes sin decirlo: (1) el humano escribe las pruebas y el agente implementa hasta que pasan, (2) el agente escribe pruebas que fallan, el humano las revisa, y luego el agente implementa, o (3) el agente ejecuta todo el ciclo clásico —escribir prueba, verla fallar, implementar, refactorizar— de forma autónoma dentro de su propio loop. La mayoría de la evidencia reciente, a favor y en contra, habla específicamente de la tercera variante: un agente que sigue el ciclo completo sin que un humano intervenga entre pasos.

## Por qué importa

La recomendación de "dile al agente que haga TDD" se volvió casi un reflejo en la industria durante 2025, con el argumento de que las pruebas evitan que el agente "haga trampa" escribiendo una prueba que simplemente confirma el comportamiento roto que acaba de generar. Pero en 2026 empezó a aparecer evidencia empírica —no solo intuición— que pone a prueba esa recomendación, y los resultados no son unánimes. Para quien decide si vale la pena imponerle TDD a su agente, la pregunta práctica no es filosófica sino de costo: ¿el ciclo completo de TDD mejora el diseño o la corrección del código lo suficiente para justificar el token extra y la fricción que agrega?

## Ejemplo

El paper académico TDAD (Test-Driven Agentic Development, marzo de 2026) no le pide al agente que "haga TDD" con una instrucción genérica; en cambio construye un mapa de dependencias entre código fuente y pruebas, entregado como un archivo de texto estático que el agente consulta antes de aplicar un cambio, para saber qué pruebas verificar. El hallazgo central del paper es justamente que la instrucción genérica no basta: agregar "instrucciones procedurales de TDD" sin ese contexto dirigido de pruebas empeoró las regresiones frente a no hacer nada.

Del otro lado, Jason Gorman (Codemanship, 09-01-2026) defiende dar pasos deliberadamente pequeños con el agente, con una prueba a la vez, como forma de mantener el problema dentro de lo que él llama el "límite de contexto efectivo" del modelo —que según argumenta es órdenes de magnitud menor que el límite de contexto anunciado— para evitar que código roto se acumule sin detectar dentro del contexto.

## Datos

| Medición | Resultado | Fuente |
|---|---|---|
| Reducción de regresiones con TDAD (mapa de dependencias código-pruebas) vs. línea base sin TDD, SWE-bench Verified | De 6,08% a 1,82% de regresiones (-70%) | Paper TDAD, arXiv — pub: 2026-03-18 |
| Regresiones con instrucciones procedurales de TDD genéricas (sin contexto de pruebas dirigido) | 9,94% de regresiones — peor que la línea base sin ninguna instrucción de TDD | Paper TDAD, arXiv — pub: 2026-03-18 |
| Consumo de tokens de un agente siguiendo TDD completo vs. sin TDD, en tareas pequeñas/medianas/grandes | 8,50x / 2,96x / 4,89x más tokens | Birgitta Böckeler, martinfowler.com — pub: 2026-08-10 |
| Ranking de calidad de solución (evaluador ciego, Opus 4.8) en tareas chicas y medianas | Las soluciones sin TDD quedaron 1ª y 2ª; las de TDD, 3ª y 4ª | Birgitta Böckeler, martinfowler.com — pub: 2026-08-10 |

> [!duda] La medición de Böckeler es un experimento exploratorio con 5 tandas sobre tareas greenfield de lógica de negocio, con Claude Sonnet 3.5 generando el código y Opus 4.8 evaluando; la propia autora advierte que "es obviamente una muestra muy pequeña" y no generaliza a bases de código existentes ni a otros modelos. El resultado del paper TDAD tampoco es directamente comparable: mide una herramienta específica de análisis de impacto, no la práctica genérica de "pedirle TDD al agente" que evalúa Böckeler.

## Debate

**A favor de TDD con agentes**: en un taller de aniversario de Thoughtworks y Martin Fowler sobre los 25 años del manifiesto ágil, reportado por Tim Anderson en The Register (20-02-2026), los participantes sostuvieron que "TDD produce resultados dramáticamente mejores en agentes de código" porque impide que el agente escriba pruebas que verifican un comportamiento roto que él mismo generó. Jason Gorman defiende una versión relacionada: pasos chicos con una prueba por vez reducen el riesgo de generar código que rompe algo, porque una prueba que falla identifica de inmediato qué cambio causó el problema, y evita que se acumule "contexto contaminado" con errores sin detectar.

**En contra**: Birgitta Böckeler, en el experimento más detallado publicado hasta ahora (martinfowler.com, 10-08-2026), no encontró diferencia discernible entre TDD y no-TDD en calidad de la solución evaluada a ciegas, y en varios casos el agente sin TDD rankeó mejor. Observó que los flujos sin TDD (o con pruebas escritas primero pero sin seguir el ciclo completo) tendían a diseñar la arquitectura completa por adelantado, mientras que las soluciones con TDD desarrollaban el diseño de forma incremental y a veces quedaban ancladas a decisiones subóptimas fijadas por la primera prueba escrita. También encontró agentes que escribían pruebas tautológicas (que verifican la implementación contra sí misma) y soluciones de TDD que directamente no implementaban comportamientos para los que no habían escrito prueba. Su conclusión personal: dejó de decirle a sus agentes que escriban pruebas primero, y ahora usa mutation testing y análisis estático como señales de calidad en su lugar. Alex Bolboaca (Mozaic Works, 12-09-2026) llega a una conclusión similar por otro camino: argumenta que los modelos se entrenaron sobre código ya terminado, no sobre el proceso paso a paso de TDD, lo que generaría un desajuste estructural entre cómo se entrenó el modelo y lo que el ciclo de TDD le pide hacer; y señala que beneficios clásicos del TDD humano, como "gestionar el miedo" a romper algo, no tienen sentido cuando quien ejecuta el ciclo es un algoritmo sin ansiedad que gestionar.

Ninguno de los dos lados tiene, a septiembre de 2026, un estudio a gran escala e independiente que zanje la pregunta: el paper TDAD mide una herramienta específica de análisis de impacto (no "TDD" en sentido genérico), el experimento de Böckeler es exploratorio y de muestra chica, y el resto son argumentos de practicantes basados en su propia experiencia, no en mediciones controladas.

## Cómo empezar

1. Si vas a probar TDD con tu agente, no le des solo la instrucción genérica de "escribe la prueba primero": la evidencia del paper TDAD sugiere que sin contexto dirigido sobre qué pruebas están en juego, la instrucción puede empeorar las cosas en vez de ayudar.
2. Prueba ambos flujos (con y sin TDD completo) en una tarea representativa de tu propio código antes de estandarizar uno: los resultados publicados varían según el tamaño de la tarea y el modelo, y ninguno de los estudios disponibles usó tu código base.
3. Si te preocupa el costo, mide el consumo de tokens de tu propio flujo: la cifra de "hasta 8,5 veces más tokens" de Böckeler es de su experimento puntual, pero confirma que TDD completo no es gratis en agentes autónomos.
4. Considera alternativas híbridas que reportan ambos bandos: mutation testing para medir la calidad real de la cobertura, y análisis estático o de impacto (como el mapa código-pruebas de TDAD) en vez de, o adicional a, el ciclo clásico completo.
5. Si eliges mantener el humano en el ciclo (variante 1 o 2: tú escribes o revisas las pruebas antes de que el agente implemente), ten en cuenta que la mayoría de la evidencia citada aquí evalúa la variante 3 (agente autónomo completo); tu resultado con supervisión humana puede no parecerse al de estos experimentos.

## Fuentes

- [TDD inside the agent loop - theater or actual value?](https://martinfowler.com/articles/exploring-gen-ai/tdd-in-the-agent-loop.html) — Birgitta Böckeler, martinfowler.com (Thoughtworks) — pub: 2026-08-10 — visto: 2026-09-21
- [TDAD: Test-Driven Agentic Development – Reducing Code Regressions in AI Coding Agents via Graph-Based Impact Analysis](https://arxiv.org/abs/2603.17973v2) — arXiv — pub: 2026-03-18 — visto: 2026-09-21
- [Why Does Test-Driven Development Work So Well In "AI"-assisted Programming?](https://codemanship.wordpress.com/2026/01/09/why-does-test-driven-development-work-so-well-in-ai-assisted-programming/) — Jason Gorman, Codemanship — pub: 2026-01-09 — visto: 2026-09-21
- [Test-driven development ideal for AI, says Agile workshop](https://www.theregister.com/2026/02/20/from_agile_to_ai_anniversary/) — Tim Anderson, The Register — pub: 2026-02-20 — visto: 2026-09-21
- [Is TDD Actually Useful for AI Agents?](https://mozaicworks.com/blog/is-tdd-actually-useful-for-ai-agents) — Alex Bolboaca, Mozaic Works — pub: 2026-09-12 — visto: 2026-09-21

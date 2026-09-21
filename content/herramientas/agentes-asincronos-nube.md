---
id: agentes-asincronos-nube
title: "Agentes asíncronos en la nube: qué tan bien abren PRs solos, según usuarios reales"
track: herramientas
type: opinion
level: intermedio
tags: nube, asincrono, devin, jules, copilot, factory, pull-requests
summary: "Devin, Jules, Copilot coding agent y Factory Droid prometen delegar tareas enteras y volver a revisar un PR terminado. Usuarios reales describen algo más parecido a un becario aplicado que a un ingeniero autónomo."
updated: 2026-09-21
reading_minutes: 9
source_span: 2026-02-20..2026-09-21
confidence: media
---

La promesa de los agentes asíncronos es simple: describes una tarea, el agente clona el repo en una máquina en la nube, trabaja sin supervisión durante minutos u horas, y vuelve con un pull request listo para revisar. La pregunta que el marketing no responde es qué tan seguido ese PR está realmente listo. Esta ficha reúne evaluaciones de usuarios que probaron Devin, Jules, Copilot coding agent y Factory Droid durante semanas o meses, no demos de cinco minutos.

## Por qué importa

Un agente asíncrono que se equivoca no te interrumpe para avisarte — sigue trabajando sobre una premisa incorrecta hasta que revisas el resultado final. Eso significa que el costo de un mal supuesto se paga completo, en tiempo de revisión y en cómputo gastado, antes de que nadie lo note. Entender los patrones de fallo reales de cada herramienta importa más aquí que en cualquier otra categoría de esta serie.

## Datos

Estadísticas oficiales publicadas por GitHub sobre su propio Copilot code review (no exclusivo del agente que abre PRs, pero es la métrica pública más concreta que la empresa ha compartido):

| Métrica | Valor | Fecha |
|---|---|---|
| Revisiones de código de Copilot acumuladas | 60 millones | 2026-03-05 |
| Proporción de revisiones en GitHub que pasan por Copilot | ~1 de cada 5 (20%) | 2026-03-05 |
| Organizaciones que lo corren automáticamente en cada PR | 12,000+ | 2026-03-05 |
| Revisiones donde Copilot da retroalimentación accionable | 71% | 2026-03-05 |
| Comentarios promedio por revisión | 5.1 | 2026-03-05 |

## Lo que dicen los usuarios reales

**Devin (Cognition).** Una reseña práctica publicada el 20 de febrero de 2026 describe el patrón que se repite en casi todas las evaluaciones independientes: "Give Devin a Jira ticket with clear acceptance criteria, and it performs surprisingly well" — pero "if you can't clearly define what you want, Devin struggles. It'll make assumptions, go down wrong paths." El mismo reseñador resume el veredicto general de forma memorable: Devin es "a tireless intern who's great at following instructions and terrible at knowing when to ask questions." Cognition cita un caso de Nubank con "8x efficiency gains" en migración de código, pero eso es una cifra de la propia empresa, no verificada de forma independiente en esta ficha.

**Jules (Google).** Un desarrollador que documentó sus primeras impresiones el 18 de marzo de 2026, tras usarlo en un proyecto real (Feditrends), reporta una experiencia positiva pero con matices: "I feel like I'm instructing a junior engineer" — Jules identificó correctamente una entrada de servidor duplicada y razonó sobre el efecto de eliminarla en un algoritmo de ranking. Pero el mismo usuario advierte que "sometimes it says it did things that it didn't, and sometimes it tries to do things it shouldn't", por lo que hay que "be explicit about what I want and check everything it does". El mecanismo de pull request de GitHub, dice, es lo que hace manejable ese riesgo: permite atrapar errores antes de fusionar.

**Factory Droid.** Una revisión práctica de agosto de 2026 describe la experiencia como "an agent that feels less like a coding assistant and more like a programmable colleague you can leave running overnight", pero condiciona ese elogio: "a well-scoped plan with clear milestones produces dramatically better results than jumping straight into execution on a vague goal." También señala una limitación técnica concreta: los modelos por debajo de 30 mil millones de parámetros rinden significativamente peor en tareas agénticas dentro de Factory.

**Copilot coding agent (GitHub).** GitHub no publica cifras específicas sobre la tasa de éxito de su agente autónomo que abre PRs (a diferencia de su función de revisión de código, de la que sí hay datos duros arriba). La compañía sí confirma que, desde julio de 2026, el sistema de revisión soporta *agent skills* personalizadas vía archivos `SKILL.md` en `.github/skills` y conexiones a servidores MCP de solo lectura para traer contexto de rastreadores de issues externos.

## Debate

**La lectura optimista:** los tres reseñadores independientes citados coinciden en que estos agentes rinden bien quantified — con tickets claros, criterios de aceptación explícitos y alcance acotado — y que el mecanismo de revisión vía pull request es, en sí mismo, una salvaguarda suficiente para adoptar la herramienta en producción sin arriesgar el código principal.

**La lectura escéptica:** el patrón de fallo que se repite en las tres reseñas es el mismo: ambigüedad. Ningún agente asíncrono sabe reconocer cuándo debería detenerse a preguntar en lugar de asumir y seguir adelante, lo que significa que el ahorro de tiempo prometido depende enteramente de qué tan bien especificada llegue la tarea — es decir, de trabajo humano previo que rara vez se contabiliza en las demos de marketing.

## Cómo empezar

- Empieza con tickets que ya tendrías que escribir con detalle para un ingeniero junior: criterios de aceptación explícitos, alcance acotado, y una forma clara de verificar que el resultado es correcto (tests existentes, por ejemplo).
- No uses agentes asíncronos como primera línea para problemas ambiguos o arquitectónicos — todas las fuentes de esta ficha coinciden en que ahí es donde más tiempo de revisión terminan costando.
- Revisa el PR resultante con el mismo rigor que revisarías el de un colega nuevo: el hecho de que "parezca" terminado no significa que lo esté.

## Fuentes

- [Devin Review: Is the AI Software Engineer Worth $20/Month?](https://www.agentrank.tech/blog/devin-review-ai-software-engineer-worth-it) — AgentRank — pub: 2026-02-20 — visto: 2026-09-21
- [First impressions of Jules, Google's coding agent](https://nelsonslog.wordpress.com/2026/03/18/first-impressions-of-jules-googles-coding-agent/) — Nelson's log — pub: 2026-03-18 — visto: 2026-09-21
- [Factory Droid: Review and Setup Guide (2026)](https://www.developersdigest.tech/blog/factory-droid-review-setup-2026) — Developers Digest — pub: 2026-08-04 — visto: 2026-09-21
- [60 million Copilot code reviews and counting](https://github.blog/ai-and-ml/github-copilot/60-million-copilot-code-reviews-and-counting/) — The GitHub Blog — pub: 2026-03-05 — visto: 2026-09-21
- [Copilot code review: Agent skills and MCP now generally available](https://github.blog/changelog/2026-07-29-copilot-code-review-agent-skills-and-mcp-now-generally-available/) — GitHub Changelog — pub: 2026-07-29 — visto: 2026-09-21
- [Devin — Plans and Pricing](https://devin.ai/pricing) — Cognition — pub: s/f — visto: 2026-09-21

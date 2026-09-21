---
id: debate-vibe-coding
title: "Vibe coding: qué significa en realidad, y los casos documentados de qué salió bien y qué mal"
track: practicas
type: opinion
level: intermedio
tags: vibe coding, seguridad, casos documentados, definiciones, agentes
summary: "El término que Andrej Karpathy acuñó para proyectos de fin de semana terminó describiendo desde una adquisición de 80 millones de dólares hasta la filtración de 1,5 millones de claves API. Qué significa el término y qué casos reales hay de cada lado."
updated: 2026-09-21
reading_minutes: 8
source_span: 2025-02-02..2026-05-21
confidence: media
---

"Vibe coding" nació como una broma de fin de semana y en menos de dos años se convirtió en la Palabra del Año de Collins Dictionary (noviembre de 2025) y en la descripción, correcta o incorrecta, de casi cualquier cosa que involucre IA generando código. El problema es que el término se usa hoy para dos cosas muy distintas, y buena parte del debate sobre si "funciona" o no depende de cuál de las dos se está discutiendo.

## Qué es / qué cambió

Andrej Karpathy definió el término el 2 de febrero de 2025 en una publicación en X: programar "dándose por completo a los vibes", aceptando todo lo que sugiere el modelo sin leer los diffs, y advirtió explícitamente que lo describía para "proyectos de fin de semana desechables", no para trabajo serio. Esa distinción se perdió casi de inmediato en el uso público: la prensa y buena parte de la industria empezaron a llamar "vibe coding" a cualquier flujo de trabajo asistido por agentes, incluyendo el uso profesional con revisión de código.

Por eso, en 2026, varios autores de referencia insistieron en separar los dos sentidos. Simon Willison, en "Agentic Engineering Patterns" (27-02-2026), distingue explícitamente el vibe coding original (sin supervisión, aceptar todo) de la "ingeniería agéntica": profesionales que usan agentes para amplificar su criterio, con pruebas y revisión de por medio. Martin Fowler, en su bliki "Agentic Programming" (21-05-2026), traza la misma línea: en la programación agéntica "los humanos siguen siendo responsables de lo que hace el software" y hacen "revisión detallada", mientras que en el vibe coding original el humano deja de mirar el código.

## Por qué importa

Cuando alguien dice que "el vibe coding funciona" o "el vibe coding es un desastre", conviene preguntar de cuál de los dos sentidos habla. Los casos documentados de 2025-2026 muestran resultados muy distintos según el contexto: proyectos personales sin consecuencias, negocios que capitalizaron el mercado de herramientas de vibe coding, y aplicaciones en producción con datos reales que terminaron filtrando información sensible por no aplicar ninguna revisión de seguridad.

## Casos documentados

**Lo que salió bien**

- **Linus Torvalds, "AudioNoise" (enero de 2026)**: el creador de Linux usó Google Antigravity para generar en Python el visualizador de un proyecto personal de efectos de audio, mientras escribía él mismo la lógica central en C. Según recoge Liam Proven en The Register (13-01-2026), Torvalds admitió: "the python visualizer tool has been basically written by vibe-coding", y ha dicho en repetidas ocasiones que le parece bien el vibe coding siempre que no se use para nada que importe.
- **Base44, adquirida por Wix por 80 millones de dólares (18-06-2025)**: no es un caso de una app construida con vibe coding, sino de una plataforma que permite a terceros hacerlo. El israelí Maor Shlomo la llevó de cero a 250.000 usuarios y 189.000 dólares de ingresos mensuales en seis meses de trabajo prácticamente en solitario, según reportó Julie Bort en TechCrunch. Es el caso más citado de éxito comercial alrededor del fenómeno, aunque mide el negocio de vender la herramienta, no la fiabilidad del código que esa herramienta genera.

**Lo que salió mal**

- **Moltbook, la red social de agentes de IA (31-01-2026 al 01-02-2026)**: el investigador de seguridad Gal Nagli documentó en el blog de Wiz cómo la plataforma, que su fundador declaró haber construido sin escribir una sola línea de código, exponía 1,5 millones de claves API, 35.000 direcciones de correo y miles de conversaciones privadas por no tener configuradas políticas de Row Level Security en su base de datos Supabase, con la clave pública de acceso expuesta directamente en el JavaScript del cliente.
- **Filtraciones repetidas en apps generadas con Lovable**: Adam Conway documentó en XDA-Developers (19-04-2026) varios casos de aplicaciones "vibe coded" que exponían datos completos de sus bases de datos al cliente, incluyendo un generador de perfiles de LinkedIn que filtraba nombres, correos y prompts personalizados de usuarios. Cita una investigación de Matt Palmer (de Replit) que probó 1.645 aplicaciones hechas con Lovable y encontró que 170 —una de cada diez— filtraban datos por el mismo tipo de fallo, catalogado como CVE-2025-48757.

## Debate

El patrón que se repite en los casos documentados no es "la IA escribe mal el código de negocio", sino que **la configuración de seguridad por defecto casi nunca se revisa** cuando nadie del equipo sabe qué preguntar. Moltbook y las apps de Lovable comparten la misma causa raíz: bases de datos Supabase sin políticas de acceso a nivel de fila, algo que un desarrollador con experiencia en backend habría verificado por reflejo. Quienes defienden el vibe coding para su propósito original —proyectos personales, prototipos, cosas que no importan si fallan, como sostiene Torvalds— no tienen que responder por estos casos, porque ninguno de ellos involucraba datos reales de terceros. El problema documentado aparece cuando el mismo flujo sin revisión se usa para productos con usuarios de verdad, que es exactamente lo que Karpathy dijo desde el principio que no había que hacer.

> [!duda] No hay una cifra pública fiable de qué porcentaje de aplicaciones "vibe coded" en producción tiene vulnerabilidades de este tipo frente a aplicaciones escritas a mano; el dato de "170 de 1.645" viene de una sola investigación sobre una sola plataforma (Lovable) y no puede generalizarse a todo el fenómeno.

## Dónde queda el debate

Lo que parece claro: el propio Karpathy ya había puesto el límite correcto desde el tweet original, y casi todos los casos de fracaso documentados —Moltbook, las apps de Lovable— son ejemplos de gente que cruzó ese límite, usando para producción con datos reales un flujo pensado para "proyectos desechables". Lo que sigue en disputa es si el problema es del vibe coding como práctica o de la falta de barreras por defecto en las plataformas que lo venden: herramientas como Base44 o Lovable compiten por velocidad de generación, no por seguridad de base de datos configurada por defecto, y ese incentivo comercial no ha cambiado pese a los incidentes públicos de 2026.

## Fuentes

- [Vibe coding](https://en.wikipedia.org/wiki/Vibe_coding) — Wikipedia (recoge el tweet original de Andrej Karpathy, 02-02-2025) — pub: 2025-02-02 — visto: 2026-09-21
- [Six-month-old, solo-owned vibe coder Base44 sells to Wix for $80M cash](https://techcrunch.com/2025/06/18/six-month-old-solo-owned-vibe-coder-base44-sells-to-wix-for-80m-cash) — Julie Bort, TechCrunch — pub: 2025-06-18 — visto: 2026-09-21
- [Linus Torvalds tries vibe coding, world still intact somehow](https://www.theregister.com/software/2026/01/13/linus-torvalds-tries-vibe-coding-world-still-intact-somehow/4147124) — Liam Proven, The Register — pub: 2026-01-13 — visto: 2026-09-21
- [Exposed Moltbook Database Reveals Millions of API Keys](https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys) — Gal Nagli, Wiz — pub: 2026-02-02 — visto: 2026-09-21
- [Agentic Engineering Patterns](https://simonw.substack.com/p/agentic-engineering-patterns) — Simon Willison — pub: 2026-02-27 — visto: 2026-09-21
- [I keep finding vibe coded apps that leak user data, and I'm not even looking for it](https://www.xda-developers.com/keep-finding-vibe-coded-apps-leak-user-data/) — Adam Conway, XDA-Developers — pub: 2026-04-19 — visto: 2026-09-21
- [bliki: Agentic Programming](https://martinfowler.com/bliki/AgenticProgramming.html) — Martin Fowler — pub: 2026-05-21 — visto: 2026-09-21

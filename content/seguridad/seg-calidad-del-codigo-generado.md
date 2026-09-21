---
id: seg-calidad-del-codigo-generado
title: "Qué tan inseguro es el código que genera la IA: lo que dicen (y no dicen) los estudios"
track: seguridad
type: dato
level: intermedio
tags: vulnerabilidades, calidad-de-codigo, estudios, benchmarks, metodologia
summary: "Nueve estudios entre 2021 y 2026 midieron vulnerabilidades y defectos en código generado por IA: qué encontró cada uno, con qué muestra y metodología, y por qué varios —financiados por quien vende la solución al problema que miden— piden lectura cautelosa."
updated: 2026-09-21
reading_minutes: 11
source_span: 2021-12-16..2026-05-21
confidence: media
---

"El 45% del código generado por IA tiene fallas de seguridad" es la cifra que más circula, pero viene de un solo estudio con una metodología concreta, y no es la única. Entre 2021 y 2026 se publicaron al menos nueve estudios —académicos y de proveedores de seguridad— que midieron, de formas distintas y con muestras distintas, cuántas vulnerabilidades y defectos trae el código que escribe un modelo de lenguaje. Todos coinciden en la dirección (el problema es real y no está desapareciendo), pero difieren mucho en el tamaño y en el método, y varios los publica una empresa que vende la herramienta para solucionar justo lo que el estudio mide. Esta ficha resume qué midió cada uno y qué tan lejos se puede estirar cada cifra.

## Por qué importa

Un equipo pequeño que decide cuánta revisión humana exigirle al código que sale de un agente necesita saber si "en general el código de IA es inseguro" es una exageración de marketing o un hallazgo estable. La respuesta, con la evidencia disponible en septiembre de 2026, es intermedia: el patrón se repite en estudios con metodologías independientes entre sí (dos papers académicos de 2021-2023 sin relación con ningún proveedor ya encontraban tasas de vulnerabilidad de entre el 40% y la mitad de las muestras), pero la cifra exacta —45%, 40%, "la mitad de los programas correctos"— depende tanto de qué estudio se cite que casi no tiene sentido tratarla como una constante universal.

## Datos

| Estudio | Quién y cuándo | Metodología | Muestra | Resultado principal |
|---|---|---|---|---|
| Asleep at the Keyboard? | Pearce et al. (NYU Tandon y otros), IEEE S&P 2022, versión final en arXiv 2021-12-16 | Generó código con GitHub Copilot para 89 escenarios ligados al CWE Top 25 de MITRE; evaluó con CodeQL y revisión manual | 1.689 programas generados | ~40% de los programas vulnerables (C ~50%, Python ~39%) |
| Do Users Write More Insecure Code with AI Assistants? | Perry, Srivastava, Kumar y Boneh (Stanford), ACM CCS 2023 | Estudio con usuarios reales: un grupo con acceso a un asistente (Codex-davinci-002), otro sin acceso, resolviendo tareas de programación con foco en seguridad | 47 participantes (33 con IA, 14 de control) | El grupo con IA escribió código significativamente menos seguro y, además, se sintió más confiado en que su código era seguro |
| BaxBench | Vero et al. (ETH Zúrich, SRI Lab), ICML 2025, arXiv 2025-02-17 | 392 tareas de generación de backends completos desde cero; corrección medida con tests funcionales, seguridad con exploits ejecutables de extremo a extremo | 392 tareas, evaluadas contra varios LLMs | El mejor modelo (OpenAI o1) llegó a 62% de corrección; de los programas correctos, en promedio la mitad tenía un exploit funcional |
| Assessing the Quality and Security of AI-Generated Code | Sabra, Schmitt y Tyler (empleados de Sonar, la empresa detrás de SonarQube), arXiv 2025-08-20 | Generación de ejercicios de programación en Java con 5 LLMs, analizados con SonarQube | 4.442 muestras, 5 modelos | Sin correlación entre qué tan bien pasaba tests funcionales un modelo y la calidad/seguridad de su código; contraseñas hardcodeadas y path traversal aparecieron en varios modelos |
| Security of LLM-generated Code: A Comparative Analysis | Morkonda, Selim y Assal, arXiv 2026-05-21 | Comparación de 7 LLMs populares generando código, clasificando las vulnerabilidades encontradas por severidad | 7 modelos (tamaño de muestra no detallado en el resumen) | Los 7 modelos generaron código con vulnerabilidades, la mayoría de severidad crítica o alta |
| GenAI Code Security Report | Veracode (vende SAST), julio 2025 y actualización de marzo 2026 | 80 tareas de código en 4 lenguajes, 4 tipos de vulnerabilidad, sin instrucciones de seguridad en el prompt; escaneado con el propio SAST de Veracode | +100 LLMs (jul. 2025) → +150 LLMs (mar. 2026) | 45% de las muestras fallaron pruebas de seguridad en 2025; la tasa de aprobación sigue estancada en ~55% dos años después. Java es el más débil (29% del código seguro); XSS e inyección de logs son las categorías peor defendidas (13-15% seguro) |
| 4x Velocity, 10x Vulnerabilities | Apiiro (vende ASPM), septiembre 2025 | Telemetría de su motor de análisis sobre repositorios reales de clientes Fortune 50, comparando desarrolladores con y sin asistente de IA, dic. 2024-jun. 2025 | Miles de desarrolladores, decenas de miles de repositorios | Hallazgos de seguridad mensuales se multiplicaron por 10 (de ~1.000 a más de 10.000); rutas de escalación de privilegios +322%, defectos de diseño arquitectónico +153% |
| AI Copilot Code Quality (2025) | GitClear (vende analítica de ingeniería de software) | Clasificación de líneas de código como copiadas/pegadas, movidas (refactorizadas) o nuevas, en repos públicos y corporativos, 2020-2024 | 211 millones de líneas modificadas | Código duplicado subió de 8,3% a 12,3%; código refactorizado bajó de 24,1% a 9,5%; 2024 fue el primer año en que el código copiado/pegado superó al movido |
| 2023 AI Code Security Report | Snyk (vende SAST/SCA), encuesta publicada dic. 2023 | Encuesta a profesionales de TI sobre su percepción y hábitos de seguridad al usar asistentes de IA (ChatGPT, Copilot, CodeWhisperer) | 537 encuestados, casi la mitad en empresas de 500 empleados o menos | 75% cree que el código de IA es más seguro que el escrito por humanos; ~55% evita protocolos de seguridad establecidos la mayoría o la totalidad del tiempo para poder usar estas herramientas |

> [!duda] El proyecto Vibe Security Radar de Georgia Tech, citado por la Cloud Security Alliance el 2026-04-04, atribuye 74 CVE confirmados directamente a herramientas de IA hasta marzo de 2026 (35 solo en ese mes), con Claude Code vinculado a 27 de esos 74, y estima que el número real podría ser de 5 a 10 veces mayor. No se pudo verificar esta cifra contra la fuente original de Georgia Tech en esta sesión, solo contra la nota de la CSA que la reporta; se incluye como referencia, no como dato confirmado de forma independiente.

## Los límites de estos estudios

**Muestras chicas o acotadas a un dominio.** El estudio de Stanford —el único diseñado como experimento controlado con personas reales en vez de solo escanear código generado— tuvo 47 participantes, 33 de ellos con acceso al asistente. Es un número razonable para un estudio de usuarios publicado en una conferencia top (CCS), pero es chico para generalizar a "los desarrolladores" en general. BaxBench, por su parte, mide un solo dominio (backends completos) con 392 tareas: no dice nada directo sobre frontend, scripts o código de infraestructura. El estudio de Pearce et al. usó un solo modelo (el Copilot/Codex de 2021), ya obsoleto frente a los modelos de 2026.

**Conflicto de interés económico.** Veracode vende escaneo de seguridad de aplicaciones (SAST); Apiiro vende gestión de postura de seguridad de aplicaciones (ASPM); Snyk vende SAST y análisis de dependencias; GitClear vende analítica de calidad de código para equipos de ingeniería. Los cuatro reportes muestran, sin excepción, que el problema que sus propios productos atacan es grave y va en aumento. Esto no invalida sus números —las metodologías de Veracode y Apiiro son públicas y auditables, y Veracode expone su desglose por lenguaje y tipo de vulnerabilidad—, pero es una razón concreta para no tratarlos como fuente neutral. El caso más directo es el del estudio de Sonar: sus autores son empleados de la empresa que fabrica SonarQube, la misma herramienta que usaron para medir "calidad y seguridad" del código generado.

**Las metodologías no son comparables entre sí.** "45% de las muestras falló" (Veracode, contra su propio SAST y taxonomía OWASP Top 10), "40% de los programas vulnerables" (Pearce, contra CodeQL y el CWE Top 25 de MITRE) y "la mitad de los programas correctos tenía un exploit funcional" (BaxBench, con exploits ejecutables reales) miden cosas distintas con umbrales distintos. Sumarlas o promediarlas para sacar "la" cifra del código de IA no tiene sustento metodológico.

**No hay un experimento controlado grande e independiente específico de seguridad.** El estándar más alto de evidencia —un ensayo aleatorizado con desarrolladores reales resolviendo tareas reales, sin financiamiento de un proveedor con interés en el resultado— existe para productividad (el estudio de METR de julio de 2025, con 16 desarrolladores experimentados y 246 tareas reales, que encontró que las herramientas de IA los hacía 19% más lentos pese a que ellos creían haber sido más rápidos) pero no tiene un equivalente de ese rigor centrado en seguridad. El estudio de Stanford es lo más cercano, y ya tiene tres años y usa un modelo discontinuado.

**Lo que sí parece sostenerse pese a las diferencias metodológicas:** ningún estudio de los nueve —ni los académicos sin conflicto de interés comercial ni los de proveedores— encontró que el código generado por IA fuera, en promedio, más seguro que el estándar esperable de código escrito por humanos y revisado. La dirección del hallazgo es consistente incluso cuando la cifra exacta no lo es.

## Cómo empezar

1. No repitas "el X% del código de IA es inseguro" como si fuera una constante: cita el estudio, el año y qué midió exactamente, como en la tabla de arriba.
2. No relajes SAST/SCA ni la revisión humana porque un proveedor de modelos diga que su versión más nueva "ya no tiene ese problema": Veracode encontró que la tasa de aprobación de seguridad se mantiene estancada en ~55% desde hace dos años pese a que la corrección sintáctica mejoró a más de 95%.
3. Prioriza revisión reforzada en las categorías que los estudios marcan como más débiles de forma consistente: XSS e inyección de logs (13-15% de código seguro según Veracode) y contraseñas hardcodeadas/path traversal (Sonar).
4. Si tu organización va a citar uno de estos estudios en una decisión de política interna, identifica primero si el que lo publicó vende algo relacionado con el resultado, sin descartarlo solo por eso.
5. Mide tu propio repositorio en vez de importar el porcentaje de otro: corre tu SAST/linter habitual sobre una muestra de commits generados por IA de las últimas semanas y compara contra tu propio histórico, en lugar de asumir que el 45% de Veracode aplica a tu stack.

## Fuentes

- [Asleep at the Keyboard? Assessing the Security of GitHub Copilot's Code Contributions](https://arxiv.org/abs/2108.09293) — Pearce, Ahmad, Tan, Dolan-Gavitt, Karri (arXiv / IEEE S&P 2022) — pub: 2021-12-16 — visto: 2026-09-21
- [Do Users Write More Insecure Code with AI Assistants?](https://arxiv.org/abs/2211.03622) — Perry, Srivastava, Kumar, Boneh (arXiv / ACM CCS 2023) — pub: 2023-12-18 — visto: 2026-09-21
- [BaxBench: Can LLMs Generate Correct and Secure Backends?](https://arxiv.org/abs/2502.11844) — Vero, Mündler, Chibotaru, Raychev, Baader, Jovanović, He, Vechev (arXiv / ICML 2025) — pub: 2025-02-17 — visto: 2026-09-21
- [Assessing the Quality and Security of AI-Generated Code: A Quantitative Analysis](https://arxiv.org/abs/2508.14727) — Sabra, Schmitt, Tyler (Sonar, arXiv) — pub: 2025-08-20 — visto: 2026-09-21
- [Security of LLM-generated Code: A Comparative Analysis](https://arxiv.org/abs/2605.23091) — Morkonda, Selim, Assal (arXiv) — pub: 2026-05-21 — visto: 2026-09-21
- [Insights from 2025 GenAI Code Security Report](https://www.veracode.com/blog/genai-code-security-report/) — Veracode (Jens Wessling, CTO) — pub: 2025-07-30 — visto: 2026-09-21
- [Spring 2026 GenAI Code Security Update: Despite Claims, AI Models Are Still Failing Security](https://www.veracode.com/blog/spring-2026-genai-code-security/) — Veracode — pub: 2026-03-24 — visto: 2026-09-21
- [AI code assistants improve production of security problems](https://www.theregister.com/2025/09/05/ai_code_assistants_security_problems/) — The Register (sobre el estudio de Apiiro) — pub: 2025-09-05 — visto: 2026-09-21
- [AI Copilot Code Quality: 2025 Data Suggests 4x Growth in Code Clones](https://www.gitclear.com/ai_assistant_code_quality_2025_research) — GitClear — pub: s/f — visto: 2026-09-21
- [AI Assistants write insecure code that humans trust too much, Snyk survey finds](https://www.devclass.com/ai-ml/2023/12/05/ai-assistants-write-insecure-code-that-humans-trust-too-much-snyk-survey-finds/1631363) — DevClass (sobre la encuesta de Snyk) — pub: 2023-12-05 — visto: 2026-09-21
- [Vibe Coding's Security Debt: The AI-Generated CVE Surge](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-generated-code-vulnerability-surge-2026/) — Cloud Security Alliance — pub: 2026-04-04 — visto: 2026-09-21
- [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) — METR — pub: 2025-07-10 — visto: 2026-09-21

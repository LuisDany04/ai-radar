---
id: seg-inyeccion-prompts-lethal-trifecta
title: "Inyección de prompts para desarrolladores: qué es, por qué sigue sin resolverse, y la 'lethal trifecta'"
track: seguridad
type: guia
level: intermedio
tags: inyeccion-de-prompts, prompt-injection, agentes, owasp, lethal-trifecta
summary: "La inyección de prompts lleva tres ediciones como riesgo número uno de OWASP y un paper de mayo de 2026 sugiere que podría ser irresoluble. Qué es, por qué los agentes son más vulnerables, y cómo pensar el riesgo con la 'lethal trifecta' de Simon Willison."
updated: 2026-09-20
reading_minutes: 9
source_span: 2025-05-26..2026-06-08
confidence: alta
---

Un LLM no separa "instrucciones" de "datos": todo lo que entra a su ventana de contexto —tu prompt, el contenido de un archivo, el cuerpo de un issue de GitHub, el resultado de una búsqueda web— se procesa como el mismo tipo de texto. Un atacante que logra meter una instrucción dentro de cualquiera de esos datos puede lograr que el modelo la ejecute como si viniera de ti. Eso es inyección de prompts: el equivalente, para LLMs, de la inyección de SQL, pero sin un separador sintáctico claro entre código y datos que se pueda parchear de una vez.

## Por qué importa

El riesgo escaló con los agentes. Un chatbot inyectado en 2023 en el peor caso decía algo indebido. Un agente de código en 2026 tiene acceso a tu sistema de archivos, puede ejecutar comandos, instalar paquetes, llamar herramientas MCP y hacer commits o pull requests. Si ese agente procesa contenido no confiable —un issue, un README, una página web que le pediste resumir— una instrucción oculta ahí puede convertirse en una acción real sobre tu máquina o tu repositorio.

El investigador independiente Simon Willison nombró en junio de 2025 el patrón que hace esto explotable: la **"lethal trifecta"**. Un agente es vulnerable a exfiltración cuando reúne simultáneamente tres capacidades: (1) acceso a datos privados, (2) exposición a contenido no confiable (que puede traer instrucciones ocultas), y (3) capacidad de comunicarse hacia afuera (enviar un email, abrir un pull request, hacer una petición HTTP). Ninguna de las tres es peligrosa sola; juntas, permiten que un atacante robe datos privados sin tocar directamente al modelo. Willison documentó el patrón repitiéndose en Microsoft 365 Copilot, el servidor MCP oficial de GitHub, GitLab Duo, ChatGPT, Google Bard/NotebookLM/AI Studio y Amazon Q, entre otros.

Un caso concreto: el 26 de mayo de 2025, Invariant Labs publicó una vulnerabilidad en el servidor MCP oficial de GitHub. Un atacante crea un issue público con una instrucción oculta; cuando el usuario le pide a su agente (por ejemplo, Claude Desktop conectado a ese MCP) que revise los issues del repo público, el agente lee el payload, lo interpreta como instrucción, accede a los repositorios privados del mismo usuario (el mismo token de autenticación cubre repos públicos y privados) y filtra ese contenido creando un pull request público con los datos privados adjuntos. Invariant Labs fue explícito: no es un bug en el código del servidor MCP, es un problema arquitectónico —la trifecta letal aplicada a un caso real— y no había "una solución fácil" más allá de restringir el agente a un repositorio por sesión y usar tokens de mínimo privilegio.

OWASP mantiene "Prompt Injection" como LLM01, el riesgo número uno de su Top 10 para aplicaciones LLM, desde la edición de 2023 y sin moverse en 2024 ni en 2025. En diciembre de 2025, el OWASP GenAI Security Project publicó un Top 10 separado para aplicaciones agénticas, con "Agent Goal Hijacking" (manipular los objetivos del agente vía inputs envenenados) como riesgo principal — la misma familia de problema, ahora con foco en agentes que actúan, no solo responden.

> [!duda] No hay consenso sobre si el problema tiene arreglo definitivo. Un paper de Sahar Abdelnabi y Eugene Bagdasarian ("AI Agents May Always Fall for Prompt Injections", arXiv, 17 de mayo de 2026) presenta un resultado formal: reencuadrando el problema con la teoría de integridad contextual, argumentan que un atacante siempre puede construir un contexto donde un flujo de información bloqueado parezca legítimo, o que un defensor que endurece las reglas termine bloqueando también comportamientos legítimos del agente. Es decir, proponen que no es un problema de ingeniería pendiente sino una limitación estructural. Esto no es today un consenso de toda la comunidad, pero coincide con lo que Willison viene diciendo desde 2022 ("no sé cómo resolver la inyección de prompts") y con lo que en junio de 2026 declaró Ariel Fogel, investigador de seguridad de IA en Pillar Security, en la conferencia Infosecurity Europe: que la inyección de prompts "sigue siendo un problema arquitectónico sin resolver" a nivel fundamental.

## Ejemplo

Patrón de mitigación recomendado por OWASP para LLM01 (defensa en profundidad, no una solución completa): restringir el comportamiento del modelo vía system prompt, definir formatos de salida esperados, filtrar entradas/salidas, aplicar mínimo privilegio a las herramientas que el agente puede invocar, exigir aprobación humana para acciones de alto riesgo (escribir archivos, ejecutar comandos, hacer llamadas de red), segregar el contenido no confiable del contenido de confianza (por ejemplo, marcándolo explícitamente como datos y no como instrucciones), y hacer pruebas adversariales de forma regular. Aplicado al caso de Invariant Labs: limitar el token del agente a un solo repositorio por sesión en vez de un token que cubra todos los repos del usuario.

## Datos

| Hito | Fecha | Fuente |
|---|---|---|
| Inyección de prompts es LLM01 (riesgo #1) en OWASP Top 10 para LLM, tres ediciones seguidas | 2023, 2024, 2025 | OWASP GenAI Security Project |
| Vulnerabilidad de exfiltración en el MCP server oficial de GitHub vía issue malicioso | 2025-05-26 | Invariant Labs |
| Willison publica y nombra la "lethal trifecta" | 2025-06-16 | simonwillison.net |
| OWASP publica el Top 10 para aplicaciones agénticas, con "Agent Goal Hijacking" como riesgo #1 | 2025-12-09 | OWASP GenAI Security Project |
| Paper con resultado de imposibilidad formal sobre defensas de inyección de prompts | 2026-05-17 | arXiv (Abdelnabi y Bagdasarian) |
| Declaración pública de que el problema "sigue sin resolverse a nivel fundamental" | 2026-06-08 | Infosecurity Magazine (Infosecurity Europe) |

## Debate

**Postura 1 — es un problema de ingeniería que se mitiga con capas.** OWASP y la mayoría de las guías de la industria (incluida la de Willison) sostienen que, aunque no hay una solución que elimine el riesgo al 100%, la combinación de mínimo privilegio, aprobación humana en acciones sensibles, segregación de contenido no confiable y monitoreo reduce el riesgo a un nivel operable. La recomendación práctica es "no le des la trifecta completa a un mismo agente".

**Postura 2 — es estructuralmente irresoluble mientras el agente actúe con autonomía real.** Abdelnabi y Bagdasarian (arXiv, 2026-05-17) argumentan que cualquier defensa que separe de forma estricta instrucciones y datos termina o bien dejando pasar ataques que se disfrazan de contexto legítimo, o bien bloqueando también acciones legítimas del agente — es un trade-off, no un bug corregible. Esta postura no dice "no uses agentes", pero sí que la expectativa correcta es contención de daño, no prevención total.

## Cómo empezar

1. Antes de conectar un agente a una fuente de contenido no confiable (issues, emails, páginas web, resultados de búsqueda), pregúntate si ese mismo agente también tiene datos privados y capacidad de comunicarse hacia afuera. Si las tres cosas coinciden, tenés la trifecta letal.
2. Si no podés eliminar una de las tres patas, reducila: tokens de mínimo privilegio y de un solo recurso por sesión (como recomienda Invariant Labs para el caso de GitHub MCP), en vez de credenciales que cubran todo.
3. Exigí aprobación humana explícita antes de que el agente ejecute la acción de "comunicar hacia afuera" (enviar, publicar, hacer push, llamar una API externa) cuando el contexto previo incluyó contenido no confiable.
4. Sigue el tag "prompt-injection" del blog de Simon Willison y los avisos LLM01 de OWASP: es un campo que cambia con cada nuevo tipo de agente que sale al mercado.

## Fuentes

- [The lethal trifecta for AI agents: private data, untrusted content, and external communication](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) — Simon Willison (simonwillison.net) — pub: 2025-06-16 — visto: 2026-09-20
- [LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — OWASP GenAI Security Project — pub: s/f — visto: 2026-09-20
- [GitHub MCP Exploited: Accessing private repositories via MCP](https://invariantlabs.ai/blog/mcp-github-vulnerability) — Invariant Labs — pub: 2025-05-26 — visto: 2026-09-20
- [AI Agents May Always Fall for Prompt Injections](https://arxiv.org/abs/2605.17634) — arXiv (Sahar Abdelnabi, Eugene Bagdasarian) — pub: 2026-05-17 — visto: 2026-09-20
- [Prompt Injection Remains Unsolved, OWASP Researcher Warns](https://www.infosecurity-magazine.com/news/infosec-europe-prompt-injection/) — Infosecurity Magazine — pub: 2026-06-08 — visto: 2026-09-20
- [OWASP Top 10 for Agentic Applications for 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) — OWASP GenAI Security Project — pub: 2025-12-09 — visto: 2026-09-20

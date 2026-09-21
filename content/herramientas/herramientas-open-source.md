---
id: herramientas-open-source
title: "Agentes de código abierto en 2026: Cline, Aider, OpenCode, Roo Code y Continue"
track: herramientas
type: comparativa
level: intermedio
tags: open-source, cline, aider, opencode, roo-code, continue, github
summary: "Estrellas, actividad y forma de conectar modelos de las cinco herramientas agénticas open source más citadas, medidas con gh api el 21 de septiembre de 2026. Dos de las cinco ya no tienen desarrollo activo."
updated: 2026-09-21
reading_minutes: 8
source_span: 2026-04-23..2026-09-21
confidence: alta
---

De las cinco herramientas open source que suelen aparecer juntas en cualquier lista de "alternativas gratuitas a Cursor", dos ya están muertas como proyecto activo (Roo Code, Continue) y una tuvo un crecimiento que ninguna cifra de este panel puede explicar del todo (OpenCode). Esta ficha mide actividad real con `gh api`, no con lo que dice el README de cada una.

## Por qué importa

"Open source" no es sinónimo de "vivo". Roo Code y Continue siguen siendo legalmente descargables y modificables bajo Apache-2.0, pero ninguna tiene un equipo detrás escribiendo código nuevo. Si vas a construir un flujo de trabajo sobre una de estas herramientas, la licencia es solo la mitad de la pregunta — la otra mitad es si alguien sigue mergeando pull requests.

## Datos

Medido con `gh api repos/<owner>/<repo>` el 2026-09-21:

| Herramienta | Estrellas | Forks | Licencia | Último push | Estado |
|---|---|---|---|---|---|
| OpenCode (anomalyco/opencode) | 209,091 | 27,542 | MIT | 2026-09-21 | Vivo, crecimiento explosivo |
| Cline (cline/cline) | 68,952 | 7,473 | Apache-2.0 | 2026-09-21 | Vivo, activo |
| Continue (continuedev/continue) | 35,971 | 5,411 | Apache-2.0 | 2026-06-19 (última release) | **Congelado**: repo marcado read-only tras la adquisición por Cursor |
| Aider (Aider-AI/aider) | 49,099 | 4,984 | Apache-2.0 | 2026-05-22 | Sin commits nuevos hace 4 meses (ver duda en la ficha `mapa-mercado-agentes-2026`) |
| Roo Code (RooCodeInc/Roo-Code) | 24,298 | 3,422 | Apache-2.0 | 2026-05-15 | **Muerto**: repo archivado por su dueño |

Dos herederos directos de Roo Code, ambos activos hoy:

| Fork | Estrellas | Creado | Nota |
|---|---|---|---|
| Kilo Code (Kilo-Org/kilocode) | 27,382 | 2025-03-10 | Empresa separada; su propio blog invita a los usuarios de Roo a migrar |
| ZooCode (Zoo-Code-Org/Zoo-Code) | 1,878 | 2026-04-23 | Fork comunitario nacido semanas antes del cierre oficial de Roo Code |

> [!duda] El README archivado de Roo Code recomienda explícitamente **ZooCode** y **Cline** como alternativas — no menciona a Kilo Code en ningún punto, pese a que el blog de Kilo Code (`blog.kilo.ai/p/thank-you-roo`) se presenta como el heredero natural de Roo y publicó una guía de migración dedicada. Ambas afirmaciones son ciertas a la vez (Kilo sí es un fork histórico de Roo/Cline), pero conviene notar que la narrativa de "sucesión oficial" es del propio Kilo, no de Roo Code.

## Cómo se conectan a los modelos

- **Cline**: Anthropic, OpenAI, Google Gemini, AWS Bedrock, Azure/GCP Vertex, Cerebras, Groq, OpenRouter (más de 200 modelos), Vercel AI Gateway, y modelos locales vía Ollama o LM Studio. Según su README, también soporta APIs compatibles con el formato OpenAI para endpoints propios.
- **Aider**: conecta con Claude, DeepSeek (R1 y Chat V3), la familia o1/o3-mini/GPT-4o de OpenAI, y en general "casi cualquier LLM" incluyendo modelos locales, apoyándose en LiteLLM como capa de compatibilidad.
- **OpenCode**: se anuncia como compatible con "75+ proveedores LLM a través de Models.dev", e incluye integración directa con cuentas existentes de GitHub Copilot y ChatGPT Plus/Pro para reutilizar esas suscripciones en la terminal.
- **Roo Code / ZooCode**: al ser forks directos de Cline, heredan el mismo mecanismo de selección de proveedor; ZooCode mantiene esa arquitectura en su fork activo.

## Ejemplo

Instalación de Aider tal como la documenta su propio repositorio (uso de un entorno aislado con `uv`, el método recomendado en 2026):

```bash
python -m pip install uv  # si no lo tienes
uv tool install --force --python python3.12 --with pip aider-chat@latest
aider --model sonnet --anthropic-api-key sk-ant-...
```

## Debate

**A favor de tratarlas como "muertas pero usables":** el propio README de Continue argumenta que el código congelado "puede seguir sirviendo de base para que otros construyan sobre él" — la licencia Apache-2.0 permite forks y despliegues propios indefinidamente, así que para un equipo que fija versiones y no necesita soporte, un proyecto congelado no es necesariamente un problema.

**En contra:** ninguna de las dos herramientas congeladas recibe parches de seguridad nuevos. Para una categoría de software que ejecuta comandos arbitrarios en tu máquina con acceso a tu código y tus credenciales, quedarse en una versión sin mantenimiento es un riesgo que ninguna de las dos páginas de cierre menciona explícitamente.

## Cómo empezar

- Si quieres máxima flexibilidad de proveedor sin pagar por un producto: **OpenCode** o **Cline** son hoy las apuestas más seguras por volumen de desarrollo activo.
- Si venías de Roo Code: prueba primero **Cline** (el origen común) antes de decidir entre Kilo Code y ZooCode, ya que ambos forks son más jóvenes y menos probados que el proyecto del que partieron.
- No empieces un proyecto nuevo sobre **Continue** o **Roo Code** salvo que estés dispuesto a mantener tu propio fork.

## Fuentes

- [cline/cline](https://github.com/cline/cline) — GitHub / Cline Bot Inc. — pub: 2026-09-21 — visto: 2026-09-21
- [Aider-AI/aider](https://github.com/Aider-AI/aider) — GitHub / Aider-AI — pub: 2026-05-22 — visto: 2026-09-21
- [anomalyco/opencode](https://github.com/anomalyco/opencode) — GitHub / Anomaly — pub: 2026-09-21 — visto: 2026-09-21
- [continuedev/continue](https://github.com/continuedev/continue) — GitHub / Continue Dev, Inc. — pub: 2026-06-19 — visto: 2026-09-21
- [RooCodeInc/Roo-Code](https://github.com/RooCodeInc/Roo-Code) — GitHub / Roo Code, Inc. — pub: 2026-05-15 — visto: 2026-09-21
- [Zoo-Code-Org/Zoo-Code](https://github.com/Zoo-Code-Org/Zoo-Code) — GitHub / Zoo Code Org — pub: 2026-09-21 — visto: 2026-09-21
- [Kilo-Org/kilocode](https://github.com/Kilo-Org/kilocode) — GitHub / Kilo Code — pub: 2026-09-21 — visto: 2026-09-21
- [Thank you, Roo! We'll take it from here.](https://blog.kilo.ai/p/thank-you-roo) — Kilo Code — pub: s/f — visto: 2026-09-21

---
id: mapa-mercado-agentes-2026
title: "Mapa del mercado de herramientas de programación agéntica en 2026"
track: herramientas
type: comparativa
level: intermedio
tags: agentes, herramientas, mercado, cli, ide, nube, comparativa
summary: "Tabla comparativa de 16 herramientas agénticas: empresa, distribución, precio, si son open source y si siguen vivas en septiembre de 2026. Hubo más muertes y fusiones de las que sugiere el marketing."
updated: 2026-09-21
reading_minutes: 10
source_span: 2025-07-14..2026-09-21
confidence: media
---

Entre enero y septiembre de 2026 el mercado de agentes de programación se reordenó más rápido de lo que cualquier comparativa estática puede capturar: hubo una adquisición que cerró un producto (Continue.dev), una discontinuación con archivado de repositorio (Roo Code), un rebranding completo que borró una marca de dos años (Windsurf → Devin Desktop) y un relanzamiento que catapultó a un proyecto a cientos de miles de estrellas en semanas (OpenCode). Esta ficha es la fotografía a hoy, verificada herramienta por herramienta con `gh api` y con las páginas oficiales de precios.

## Por qué importa

Elegir herramienta agéntica ya no es solo comparar features: en 2026 también hay que apostar a qué empresa sigue existiendo en un año. Tres de las dieciséis herramientas de esta lista ya no existen como productos independientes, y una cuarta cambió de nombre sin avisar a mitad de año.

## Tabla comparativa

| Herramienta | Empresa | Distribución | Precio (sept. 2026) | Open source | Estado sept. 2026 |
|---|---|---|---|---|---|
| Claude Code | Anthropic | CLI (+ ext. VS Code/JetBrains) | Incluido en Pro $17–20/mes, Max desde $100/mes, Team $20–25/asiento, Enterprise $20/asiento + tarifas de API | No — repo público pero licencia "todos los derechos reservados" | Vivo, muy activo |
| OpenAI Codex (CLI) | OpenAI | CLI (+ ext. IDE, nube) | Incluido en ChatGPT ($0–$200/mes) o pago por token vía API | Sí — Apache-2.0 | Vivo, activo |
| GitHub Copilot | GitHub (Microsoft) | IDE + CLI + agente en la nube | Free / Pro $10 / Pro+ $39 / Max $100 por usuario; Business $19 y Enterprise $39 por asiento + créditos de IA desde el 1-jun-2026 | No | Vivo, activo |
| Cursor | Anysphere (subsidiaria de SpaceX desde el 2026-08-14) | IDE (fork de VS Code) | Hobby gratis; Pro $20 / Pro+ $60 / Ultra $200; Teams $40/asiento (sin cambios tras la compra) | No | Vivo, activo — compró Continue.dev en jun-2026; luego fue comprada ella misma por SpaceX por $60,000M en ago-2026 |
| Windsurf | Cognition (ex Codeium) | IDE (fork de VS Code) + nube | Igual que Devin (ver fila siguiente) | No | **Muerto como marca**: rebrandeado a "Devin Desktop" el 2026-06-02 |
| Cline | Cline Bot Inc. | Extensión IDE (VS Code/JetBrains) + CLI/SDK | Gratis, open-core, BYOK | Sí — Apache-2.0 | Vivo, activo — absorbió usuarios de Roo Code |
| Roo Code | RooCodeInc | Extensión IDE (VS Code) | N/D | Sí — Apache-2.0, pero repo archivado | **Muerto**: discontinuado y archivado el 2026-05-15; equipo pivotó a Roomote (agente por Slack) |
| Aider | Comunidad (ex Paul Gauthier) | CLI | Gratis, open, BYOK | Sí — Apache-2.0 | Vivo, pero sin commits nuevos desde el 2026-05-22 (ver duda) |
| Gemini CLI | Google | CLI | Gratis con límites (acceso individual cerrado el 2026-06-18) o vía API | Sí — Apache-2.0 | En transición: Google empuja a los usuarios individuales hacia Antigravity CLI |
| Devin | Cognition | Nube (+ Devin Desktop, IDE) | Free / Core $20+mes + $2.25 por ACU / Max $200; Teams $80 + $40/asiento | No | Vivo, en expansión — absorbió Windsurf |
| Amp | Sourcegraph (spin-off independiente, dic-2025) | CLI + ext. IDE + web | Hobby gratis (pay-as-you-go); Individual $20/mes; Teams sin costo extra | No — sin repo público de código fuente | Vivo, activo |
| OpenCode | Anomaly (ex SST) | CLI (+ IDE/escritorio) | Gratis, BYOK, 75+ proveedores vía Models.dev | Sí — MIT | Vivo, crecimiento explosivo tras relanzamiento el 2026-06-19 |
| Zed | Zed Industries | IDE (editor nativo) | Personal gratis; Pro $10/mes; Business $30/asiento | Sí — GPL-3.0 en el núcleo | Vivo, activo |
| Continue | Continue Dev (adquirida por Cursor) | CLI (pivotó desde extensión IDE) | Histórico gratis, Apache-2.0 | Sí — Apache-2.0, pero congelado | **Muerto como producto**: adquirida y cerrada por Cursor en jun-2026, exportación de datos hasta el 15-jul-2026 |
| Factory (Droid) | Factory AI | CLI + IDE + nube/CI | Pro $20 / Plus $100 / Max $200; Teams $60 + $40/asiento | No — el repo público solo contiene documentación | Vivo, activo — ronda Serie C-2 de $120M en jul-2026 |
| Jules | Google | Nube (asíncrono, abre PRs) | Free limitado; Pro $19.99/mes; Ultra en disputa (ver duda) | No | Vivo, en beta pública |

> [!duda] El plan Ultra de Jules aparece con precios distintos según la fuente: una lo describe como $124.99 cada 3 meses (vinculado a Google One AI Ultra), otra como $100–$200/mes con la misma cuota de tareas en ambos niveles. No hay una página oficial de precios de Jules que lo aclare de forma inequívoca.

> [!duda] Varias reseñas de 2026 (no primarias) describen a Aider como "en desarrollo activo, con releases cada dos semanas", pero el repositorio en GitHub no registra commits desde el 2026-05-22 ni releases desde agosto de 2025. Puede tratarse de contenido genérico desactualizado — trátese con escepticismo hasta confirmar actividad reciente.

## Datos

Estrellas de GitHub de las herramientas open source de esta tabla (medidas con `gh api repos/<owner>/<repo>` el 2026-09-21):

| Repositorio | Estrellas | Forks | Último push |
|---|---|---|---|
| anomalyco/opencode (OpenCode) | 209,091 | 27,542 | 2026-09-21 |
| google-gemini/gemini-cli | 107,114 | 14,609 | 2026-09-21 |
| zed-industries/zed | 90,661 | 10,715 | 2026-09-21 |
| cline/cline | 68,952 | 7,473 | 2026-09-21 |
| Aider-AI/aider | 49,099 | 4,984 | 2026-05-22 |
| continuedev/continue | 35,971 | 5,411 | 2026-09-21 |
| Kilo-Org/kilocode | 27,382 | 3,179 | 2026-09-21 |
| RooCodeInc/Roo-Code | 24,298 | 3,422 | 2026-05-15 (archivado) |

Dos beneficiarios directos del reacomodo no estaban en la lista de 16 herramientas pero aparecen constantemente al investigar las bajas: **Kilo Code** (fork de Roo Code, destino recomendado por el propio equipo de Roo tras su cierre) y **Antigravity CLI** de Google (el reemplazo oficial de Gemini CLI para cuentas individuales desde el 2026-06-18).

## Debate

Las estrellas de GitHub son una señal ruidosa, no una prueba de adopción real. Un estudio de investigadores de Carnegie Mellon, NC State y Socket sobre metadatos de GitHub identificó unas 6 millones de estrellas falsas en más de 18,000 repositorios, con los proyectos de IA como la categoría no maliciosa con más volumen absoluto de estrellas infladas (177,000). Esto no significa que las cifras de esta ficha sean falsas — se obtuvieron directamente de la API de GitHub el mismo día — pero sí que un salto de estrellas espectacular (como el de OpenCode, que pasó de proyecto de nicho a 209,000 estrellas en tres meses) merece leerse junto con señales independientes (cobertura de prensa, adopción reportada por terceros) y no solo con el contador.

## Cómo empezar

- Si necesitas control total de qué modelo corre tu código y no quieres depender de una sola empresa: **OpenCode**, **Aider** o **Gemini CLI** (mientras dure el acceso gratuito).
- Si ya pagas una suscripción de Claude, ChatGPT o Copilot y quieres el agente que viene incluido: **Claude Code**, **Codex CLI** o **Copilot** respectivamente.
- Si quieres que el agente trabaje solo y te abra el PR sin que tengas la terminal abierta: **Devin**, **Jules** o **Factory**.
- Evita construir flujos de trabajo críticos sobre **Roo Code** o **Continue**: ambos están discontinuados y sin desarrollo activo pese a que el código siga descargable.

## Fuentes

- [anthropics/claude-code](https://github.com/anthropics/claude-code) — GitHub / Anthropic — pub: 2026-09-21 — visto: 2026-09-21
- [Claude Pricing](https://claude.com/pricing) — Anthropic — pub: s/f — visto: 2026-09-21
- [openai/codex](https://github.com/openai/codex) — GitHub / OpenAI — pub: 2026-09-21 — visto: 2026-09-21
- [GitHub Copilot · Plans & pricing](https://github.com/features/copilot/plans) — GitHub — pub: s/f — visto: 2026-09-21
- [cline/cline](https://github.com/cline/cline) — GitHub / Cline Bot Inc. — pub: 2026-09-21 — visto: 2026-09-21
- [RooCodeInc/Roo-Code](https://github.com/RooCodeInc/Roo-Code) — GitHub / RooCodeInc — pub: 2026-05-15 — visto: 2026-09-21
- [Thank you, Roo! We'll take it from here.](https://blog.kilo.ai/p/thank-you-roo) — Kilo Code — pub: s/f — visto: 2026-09-21
- [Aider-AI/aider](https://github.com/Aider-AI/aider) — GitHub / Aider-AI — pub: 2026-05-22 — visto: 2026-09-21
- [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) — GitHub / Google — pub: 2026-09-21 — visto: 2026-09-21
- [An important update: Transitioning Gemini CLI to Antigravity CLI](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) — Google Developers Blog — pub: s/f — visto: 2026-09-21
- [Devin — Plans and Pricing](https://devin.ai/pricing) — Cognition — pub: s/f — visto: 2026-09-21
- [Amp — Pricing](https://ampcode.com/pricing) — Sourcegraph / Amp — pub: s/f — visto: 2026-09-21
- [Cognition's acquisition of Windsurf](https://cognition.com/blog/windsurf) — Cognition — pub: 2025-07-14 — visto: 2026-09-21
- [anomalyco/opencode](https://github.com/anomalyco/opencode) — GitHub / Anomaly — pub: 2026-09-21 — visto: 2026-09-21
- [OpenCode](https://opencode.ai) — Anomaly — pub: s/f — visto: 2026-09-21
- [zed-industries/zed](https://github.com/zed-industries/zed) — GitHub / Zed Industries — pub: 2026-09-21 — visto: 2026-09-21
- [Zed — Pricing](https://zed.dev/pricing) — Zed Industries — pub: s/f — visto: 2026-09-21
- [continuedev/continue — releases](https://github.com/continuedev/continue/releases) — GitHub / Continue Dev — pub: 2026-06-19 — visto: 2026-09-21
- [Factory-AI/factory](https://github.com/Factory-AI/factory) — GitHub / Factory AI — pub: 2026-09-17 — visto: 2026-09-21
- [Factory — Pricing](https://factory.com/pricing) — Factory AI — pub: s/f — visto: 2026-09-21
- [Jules — Changelog](https://jules.google/docs/changelog/) — Google — pub: 2026-03-09 — visto: 2026-09-21
- [Google Jules Pricing 2026](https://agentcode.ai/google-jules-pricing) — Agentcode — pub: s/f — visto: 2026-09-21
- [Kilo-Org/kilocode](https://github.com/Kilo-Org/kilocode) — GitHub / Kilo Code — pub: 2026-09-21 — visto: 2026-09-21
- [Three Days After Closing, Cursor Shipped Code Hosting](https://www.digitalapplied.com/blog/spacex-anysphere-close-first-product-move) — Digital Applied — pub: s/f — visto: 2026-09-21
- [Cursor — Past, Present, and Future (Series D)](https://cursor.com/blog/series-d) — Cursor / Anysphere — pub: 2025-11-13 — visto: 2026-09-21
- [Six Million (Suspected) Fake Stars on GitHub](https://arxiv.org/html/2412.13459v2) — arXiv (CMU / NC State / Socket) — pub: s/f — visto: 2026-09-21

---
id: migraciones-comunidad-2026
title: "El año de las migraciones forzadas: quién se cambió de qué a qué en 2026"
track: herramientas
type: opinion
level: intermedio
tags: migraciones, opencode, roo-code, continue, copilot, claude-code, comunidad
summary: "En 2026 la mayoría de las migraciones masivas entre herramientas agénticas no las decidió el usuario: las gatillaron un bloqueo de OAuth, una adquisición, un recorte de límites o una factura sorpresa. Seis episodios, con testimonios enlazados."
updated: 2026-09-21
reading_minutes: 9
source_span: 2026-01-09..2026-09-21
confidence: media
---

La narrativa habitual sobre por qué la gente cambia de herramienta es "encontré una mejor". La realidad de 2026 fue más a menudo "la que usaba dejó de funcionar, cambió de dueño, o me subió la factura 20 veces sin avisar". Esta ficha reconstruye seis episodios de migración masiva con fecha, causa y testimonios de usuarios reales que estaban ahí cuando pasó.

## Por qué importa

Entender por qué migra la comunidad revela algo que ninguna comparativa de features captura: qué tan frágil es depender de una sola empresa para tu flujo de trabajo diario. Los seis episodios de esta ficha tienen una causa en común — una decisión unilateral de la empresa dueña de la herramienta — no una mejora competitiva del lado de destino.

## Los seis episodios

| Fecha | Qué pasó | De dónde | Hacia dónde |
|---|---|---|---|
| 2026-01-09 | Anthropic bloquea el uso de tokens OAuth de suscripción Claude en herramientas de terceros | Claude Code / API vía suscripción, usada dentro de OpenCode y otras herramientas | OpenCode se adapta y diversifica proveedores; usuarios exploran otros modelos |
| 2026-05-15 | Roo Code se discontinúa y archiva su repositorio | Roo Code | Cline (recomendado por el propio Roo), Kilo Code, ZooCode (fork comunitario) |
| 2026-06-01 | GitHub Copilot pasa a facturación por token, con subidas de 10 a 50× reportadas | GitHub Copilot | Claude Code / Cursor (destino más citado), o Cline/Aider/OpenCode para quien prioriza costo |
| 2026-06-18 | Cursor adquiere y cierra Continue.dev | Continue.dev | Se recomienda en la comunidad migrar a herramientas abiertas como OpenCode |
| 2026-06-18 | Google cierra el acceso individual gratuito a Gemini CLI | Gemini CLI (uso individual) | Antigravity CLI (sucesor oficial) o API de pago |
| 2026-09-14 | Anthropic reemplaza el boost temporal de Claude Code por un aumento permanente menor (recorte neto ~17%) | Claude Code (plan Max) | Codex CLI, según reportes de usuarios |

## Episodio 1: el bloqueo de OAuth que aceleró a OpenCode

El 9 de enero de 2026 a las 02:20 UTC, Anthropic desplegó verificaciones del lado del servidor que empezaron a rechazar tokens OAuth de suscripción Claude usados por herramientas de terceros, con el mensaje de error "This credential is only authorized for use with Claude Code". El cambio dejó sin funcionar de inmediato a herramientas como OpenCode, que en ese momento tenía unas 56,000 estrellas en GitHub. Según una cita atribuida a Thariq Shihipar de Anthropic, la empresa explicó el movimiento como una respuesta a abuso: "we tightened our safeguards against spoofing the Claude Code harness after accounts were banned for triggering abuse filters from third-party harnesses". El equipo de OpenCode respondió en cuestión de horas con un parche que cambiaba el prefijo de sus herramientas internas para evitar la detección, y simultáneamente añadió soporte para cuentas de ChatGPT Plus. El 19 de febrero de 2026 Anthropic formalizó la prohibición en sus términos de servicio, y OpenCode terminó removiendo todo el código relacionado con OAuth de Claude. En las semanas siguientes a estos dos eventos, OpenCode pasó de 56,000 a más de 112,000 estrellas — más del doble — y OpenAI pasó a integrarse oficialmente con el proyecto para dar soporte de suscripción vía ChatGPT.

Un desarrollador que documentó su propio cambio de herramienta lo describe así: era usuario de Claude Code "desde sus días de vista previa temprana, en febrero de 2025", pero tras el bloqueo del 9 de enero de 2026 —que afectó directamente a "los usuarios de OpenCode que habían estado enrutando sus suscripciones Claude Max a través de él"— empezó a usar OpenCode "con intención, no con curiosidad ociosa". Meses después reporta que OpenCode "cubre todo lo que necesito para mi flujo de trabajo diario" y que ahora lo usa "sin dudarlo".

## Episodio 2: los huérfanos de Continue.dev

Cuando Cursor anunció la adquisición de Continue.dev a mediados de junio de 2026, la reacción en un hilo de Hacker News mostró algo particular: varios usuarios habían migrado a Continue precisamente para escapar de herramientas cerradas como Cursor, y se encontraron atrapados en la misma adquisición que intentaban evitar. Un usuario identificado como GaryBluto expresó su frustración por el momento — había cambiado de Copilot Chat a Continue justo antes del anuncio. Otro usuario, Alightsoul, recomendó abiertamente migrar a OpenCode "porque también es open source", y señaló que gente de su entorno ya se estaba alejando de Cursor.

## Episodio 3: la salida de Roo Code

Como se detalla en la ficha `herramientas-open-source` de este mismo panel, cuando Roo Code se discontinuó el 15 de mayo de 2026, su propio archivo README no recomendó al fork comercial más visible (Kilo Code) sino a dos alternativas distintas: Cline (el proyecto del que Roo Code se originó) y ZooCode, un fork comunitario que había empezado apenas tres semanas antes del cierre oficial.

## Debate

**Lectura optimista:** cada uno de estos episodios terminó fortaleciendo a un proyecto open source o multi-proveedor (OpenCode, Cline) a costa de una herramienta más cerrada o dependiente de un solo proveedor. Bajo esta lectura, el mercado está autocorrigiendo hacia opciones más resilientes.

**Lectura escéptica:** ninguna de estas migraciones fue elegida libremente por el usuario en el momento en que ocurrió — todas fueron reacciones a una decisión unilateral (un bloqueo técnico, una adquisición, un cambio de precio). Eso significa que el mismo patrón puede repetirse con los destinos actuales: OpenCode depende de que Anomaly siga invirtiendo en el proyecto, y Cline depende de que Cline Bot Inc. no tome una decisión similar a la de Roo Code o Continue.

## Cómo empezar

- Si tu flujo de trabajo depende de una suscripción de un proveedor usada dentro de una herramienta de terceros (como ocurría con Claude Max dentro de OpenCode antes de enero de 2026), ten un plan B con API key propia — los passthroughs de suscripción son, en la práctica, revocables sin aviso.
- Antes de adoptar una herramienta open source pequeña porque "es la alternativa a X que acaba de cerrar", revisa cuánto tiempo lleva activa: ZooCode tenía menos de un mes de vida cuando se convirtió en la alternativa recomendada a Roo Code.
- Sigue el changelog oficial de tu herramienta principal, no solo su cuenta de marketing — los tres bloqueos y recortes de esta ficha (OAuth de Anthropic, facturación de Copilot, límites de Claude Code) se anunciaron primero en foros técnicos y solo después se volvieron noticia.

## Fuentes

- [Anthropic's Walled Garden: The Claude Code Crackdown](https://paddo.dev/blog/anthropic-walled-garden-crackdown/) — paddo.dev — pub: s/f — visto: 2026-09-21
- [I Switched From Claude Code to OpenCode — Here's Why](https://thomas-wiegold.com/blog/i-switched-from-claude-code-to-opencode/) — Thomas Wiegold — pub: s/f — visto: 2026-09-21
- [Continue has been acquired by Cursor](https://news.ycombinator.com/item?id=48548758) — Hacker News — pub: s/f — visto: 2026-09-21
- [RooCodeInc/Roo-Code](https://github.com/RooCodeInc/Roo-Code) — GitHub / Roo Code, Inc. — pub: 2026-05-15 — visto: 2026-09-21
- [GitHub Copilot Alternatives After the 2026 Price Shock](https://findskill.ai/blog/github-copilot-too-expensive-alternatives-2026/) — FindSkill.ai — pub: s/f — visto: 2026-09-21
- [An important update: Transitioning Gemini CLI to Antigravity CLI](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) — Google Developers Blog — pub: s/f — visto: 2026-09-21
- [Claude Code Limit Cut: User Reaction (Sept 2026)](https://explainx.ai/blog/claude-code-limit-cut-reaction-cancellations-september-2026) — explainx.ai — pub: s/f — visto: 2026-09-21
- [anomalyco/opencode](https://github.com/anomalyco/opencode) — GitHub / Anomaly — pub: 2026-09-21 — visto: 2026-09-21

---
id: seg-cronologia-incidentes-ia-2025-2026
title: "Cronología de incidentes reales en herramientas de IA para desarrollo (2025-2026)"
track: seguridad
type: dato
level: intermedio
tags: incidentes, cronologia, prompt-injection, supply-chain, vulnerabilidades
summary: "Siete incidentes documentados entre mayo de 2025 y febrero de 2026 en Copilot, GitHub MCP, Amazon Q, Nx, Claude Code y Cline: fechas exactas, quién los reportó, qué se vio afectado y si están mitigados."
updated: 2026-09-20
reading_minutes: 8
source_span: 2025-05-26..2026-02-17
confidence: alta
---

Esta ficha reúne, en orden cronológico, incidentes de seguridad verificables ocurridos entre mayo de 2025 y febrero de 2026 que involucran herramientas de IA usadas en desarrollo de software: asistentes de código, servidores MCP y extensiones de IDE. Cada entrada indica quién lo reportó, qué quedó expuesto y el estado de mitigación al momento de esta ficha.

## Por qué importa

No son casos hipotéticos ni demostraciones de laboratorio: son vulnerabilidades con CVE asignado, avisos oficiales de los fabricantes, o ataques ejecutados en producción contra usuarios reales. El patrón que se repite en casi todos —inyección de prompts que aprovecha que el agente combina contenido no confiable, datos privados y capacidad de actuar— es el mismo que describe la "lethal trifecta" de Simon Willison (ver la ficha sobre inyección de prompts de este track).

## Datos

| Fecha | Incidente | Reportado por | Qué se vio afectado | ¿Mitigado? |
|---|---|---|---|---|
| 2025-05-26 | Inyección de prompts en el servidor MCP oficial de GitHub vía issue malicioso | Invariant Labs | Repositorios privados de usuarios con agente conectado (ej. Claude Desktop) | Sin fix estructural; mitigación recomendada (un repo por sesión, mínimo privilegio), no parche |
| 2025-06-12 | "EchoLeak" (CVE-2025-32711), zero-click en Microsoft 365 Copilot | Aim Security | Datos de contexto de Copilot (Word, Excel, PowerPoint, Outlook, Teams) vía email sin interacción del usuario | Sí, corregido por Microsoft del lado del servidor en el Patch Tuesday de junio de 2025 |
| 2025-07-17 (release) / descubierto 2025-07-23 | Código malicioso ("wiper") inyectado en la extensión Amazon Q Developer para VS Code v1.84.0 (CVE-2025-8217) | AWS Security / GHSA-7g7f-ff96-5gcw | Extensión oficial en el Marketplace de VS Code; el payload buscaba borrar archivos y recursos cloud | Sí: un error de sintaxis impidió que el payload se ejecutara; AWS retiró la versión y publicó la 1.85.0 |
| 2025-08-26 | "s1ngularity": paquetes maliciosos del build system Nx en npm que armaron CLIs de IA (Claude, Gemini, Amazon Q) con flags como `--yolo` para robar secretos | The Hacker News, StepSecurity, Wiz | 2.349 credenciales expuestas (tokens de GitHub/npm, claves SSH, secretos de entorno); miles de repositorios afectados | Sí, paquetes retirados de npm en horas; credenciales rotadas |
| Encontrado 2025-06, corregido 2025-08-14, divulgado 2025-10-08 | "CamoLeak" (CVE-2025-59145) en GitHub Copilot Chat: inyección de prompt en comentarios de pull request + bypass de CSP vía el proxy de imágenes Camo de GitHub | Legit Security (investigador Omer Mayraz) | Código fuente y secretos de repositorios privados accesibles por Copilot Chat | Sí, GitHub deshabilitó el renderizado de imágenes en Copilot Chat |
| 2025-11-13 (divulgado; detectado 2025-09) | Campaña de espionaje que usó Claude Code de forma mayormente autónoma (80-90% del trabajo) contra ~30 organizaciones | Anthropic | Organizaciones tecnológicas, financieras, químicas y gubernamentales; "un número pequeño" de brechas exitosas según Anthropic | Cuentas del actor (GTG-1002) suspendidas; Anthropic notificó a los afectados y reforzó su detección |
| 2026-02-17 (explotado; cadena divulgada 2026-02-09) | "Clinejection": token de npm robado vía envenenamiento de caché de GitHub Actions, iniciado por un título de issue con prompt injection contra el bot de triage de Cline, usado para publicar `cline@2.3.0` con un instalador oculto de otro agente ("OpenClaw") | Adnan Khan (investigador independiente); confirmado por Snyk y The Hacker News | ~4.000 descargas del paquete comprometido en una ventana de 8 horas | Sí: versión maliciosa despublicada, tokens rotados, versión 2.4.0 publicada limpia (GHSA-9ppg-jx86-fqw7) |

> [!duda] Para el incidente de Amazon Q, la persona que reclamó autoría le dijo a un medio (404 Media, citado por múltiples coberturas secundarias) que el payload estaba diseñado para ser inofensivo como forma de protesta/demostración. Esa afirmación de intención no pudo verificarse de forma independiente en esta sesión y no se cita aquí como hecho, solo el resultado técnico confirmado por AWS: el código no llegó a ejecutarse por un error de sintaxis.

## Cómo empezar

1. Si usas alguna de las herramientas mencionadas (GitHub Copilot, Amazon Q, servidores MCP de terceros, Cline, Claude Code con acceso a fuentes externas), revisa los avisos oficiales enlazados abajo para confirmar que corres una versión posterior al fix.
2. Nota el patrón común: en 5 de los 7 casos, la puerta de entrada fue contenido que el agente procesó sin saber que no era confiable (un issue, un comentario de PR, un email, un título de issue). Trata cualquier input externo al agente como si pudiera contener instrucciones.
3. Para pipelines de CI/CD que publican paquetes (como en el caso Nx y Cline), rota tokens de publicación regularmente y evita que un solo token cubra build, test y publish.

## Fuentes

- [GitHub MCP Exploited: Accessing private repositories via MCP](https://invariantlabs.ai/blog/mcp-github-vulnerability) — Invariant Labs — pub: 2025-05-26 — visto: 2026-09-20
- [Zero-Click AI Vulnerability Exposes Microsoft 365 Copilot Data Without User Interaction](https://thehackernews.com/2025/06/zero-click-ai-vulnerability-exposes.html) — The Hacker News — pub: 2025-06-12 — visto: 2026-09-20
- [Security Update for Amazon Q Developer Extension for Visual Studio Code (Version #1.84)](https://aws.amazon.com/security/security-bulletins/AWS-2025-015/) — AWS Security Bulletins — pub: 2025-07-26 — visto: 2026-09-20
- [Malicious script injected into Amazon Q Developer for Visual Studio Code (VS Code) Extension](https://github.com/aws/aws-toolkit-vscode/security/advisories/GHSA-7g7f-ff96-5gcw) — GitHub Security Advisory / AWS — pub: 2025-07-26 — visto: 2026-09-20
- [Malicious Nx Packages in 's1ngularity' Attack Leaked 2,349 GitHub, Cloud, and AI Credentials](https://thehackernews.com/2025/08/malicious-nx-packages-in-s1ngularity.html) — The Hacker News — pub: 2025-08-28 — visto: 2026-09-20
- [CamoLeak: Critical GitHub Copilot Vulnerability Leaks Private Source Code](https://www.legitsecurity.com/blog/camoleak-critical-github-copilot-vulnerability-leaks-private-source-code) — Legit Security — pub: 2025-10-08 — visto: 2026-09-20
- [Disrupting an AI-orchestrated cyber espionage campaign](https://www.anthropic.com/news/disrupting-AI-espionage) — Anthropic — pub: 2025-11-13 — visto: 2026-09-20
- [Clinejection — Compromising Cline's Production Releases just by Prompting an Issue Triager](https://adnanthekhan.com/posts/clinejection/) — Adnan Khan (investigador independiente) — pub: 2026-02-09 — visto: 2026-09-20
- [Cline CLI 2.3.0 Supply Chain Attack Installed OpenClaw on Developer Systems](https://thehackernews.com/2026/02/cline-cli-230-supply-chain-attack.html) — The Hacker News — pub: 2026-02-18 — visto: 2026-09-20

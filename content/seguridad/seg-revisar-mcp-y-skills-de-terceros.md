---
id: seg-revisar-mcp-y-skills-de-terceros
title: "Antes de instalar un MCP o una skill de un desconocido: checklist de revisión"
track: seguridad
type: guia
level: intermedio
tags: mcp, skills, terceros, revision, cadena-de-suministro
summary: "Instalar un servidor MCP o una skill de un tercero le da a tu agente herramientas nuevas y, muchas veces, acceso a credenciales. Qué revisar antes de conectarlo, con datos de dos estudios recientes y un checklist accionable."
updated: 2026-09-21
reading_minutes: 9
source_span: 2026-02-05..2026-07-09
confidence: alta
---

Un servidor MCP o una skill de terceros no es una librería que se limita a devolver datos: son texto e instrucciones que tu agente lee e interpreta, y con frecuencia código que se ejecuta en tu máquina con las mismas credenciales que usa el agente. Instalarlo sin revisión es darle a un desconocido la posibilidad de escribir parte del "cerebro" de tu agente. La documentación oficial de Claude Code lo resume así: "Verify you trust each server before connecting it. Servers that fetch external content can expose you to prompt injection risk".

## Por qué importa

Dos mediciones recientes, independientes entre sí, muestran que el problema no es teórico. Snyk publicó el 5 de febrero de 2026 el estudio "ToxicSkills", que escaneó 3.984 skills de agentes publicadas en ClawHub y skills.sh usando el motor de `mcp-scan` (modelos y reglas deterministas para detectar comportamiento malicioso o vulnerable). Encontraron que 1.467 skills (36,82%) tenían algún fallo de seguridad, 534 (13,4%) de severidad crítica, y confirmaron 76 payloads maliciosos activos, de los cuales 8 seguían disponibles para instalar en el momento de la publicación. Entre esos 76 casos confirmados, el 100% contenía patrones de código malicioso y el 91% combinaba ese código con técnicas de inyección de prompts en la misma skill.

Un relevamiento independiente sobre servidores MCP —publicado en bex.co el 9 de julio de 2026, que rastreó 9.695 servidores únicos listados en GitHub, Glama, Lobehub y PulseMCP entre noviembre de 2025 y marzo de 2026— encontró que 5.832 (60%) mostraban alguna debilidad de seguridad, y que 2.259 tenían fallas confirmadas y explotables (acceso arbitrario a archivos, inyección de comandos, SSRF, entre otras), sin contar los que solo carecían de autenticación. Sobre autenticación: según ese mismo relevamiento, apenas el 8,5% de los servidores listados usaba OAuth; el resto dependía de API keys estáticas, tokens de acceso personal de larga duración, o ninguna autenticación.

> [!duda] El relevamiento de bex.co no publica su propia metodología de forma tan detallada como el estudio de Snyk (que documenta el motor de escaneo, la tasa de falsos positivos y los nombres de autores maliciosos). Tómalo como una señal de magnitud del problema, no como una cifra con el mismo nivel de verificación independiente que ToxicSkills.

## Ejemplo

### Escanear antes de conectar

`mcp-scan`, de Invariant Labs (adquirida por Snyk), es el motor detrás del estudio ToxicSkills y está disponible como herramienta independiente para revisar tu propia configuración antes de aprobar un servidor nuevo. Corre localmente y no envía el contenido de tus llamadas a ningún lado:

```bash
uvx snyk-agent-scan@latest
# o apuntado a un archivo de configuración específico:
uvx snyk-agent-scan@latest ~/.vscode/mcp.json
```

El escáner busca inyección de prompts en descripciones de herramientas, "tool poisoning", flujos de datos tóxicos, malware embebido en skills, manejo indebido de credenciales y secretos hardcodeados.

### Qué exige Anthropic a un conector antes de listarlo en su directorio

Sirve como checklist inversa: si un MCP de un tercero no cumpliría ninguno de estos puntos, es una señal de alerta. De la documentación oficial de envío de conectores (`claude.com/docs/connectors/building/review-criteria`):

- Las herramientas de lectura y de escritura deben estar separadas; un único `api_request` genérico con parámetro `method` se rechaza.
- Toda herramienta debe declarar `readOnlyHint` o `destructiveHint`, para que Claude sepa cuáles requieren confirmación.
- Se rechazan descripciones de herramientas que instruyan a Claude a llamar software externo no solicitado, interfieran con otras herramientas, pidan traer instrucciones de fuentes externas, o contengan texto oculto u ofuscado.
- El servidor debe llamar a APIs propias o legítimamente delegadas: el dominio del servidor MCP debe coincidir con el del servicio.
- No puede recolectar datos de conversación más allá de lo que la herramienta necesita, ni consultar memoria, historial o archivos del usuario fuera de su función.

Un servidor de un desconocido, fuera del directorio verificado, no pasa automáticamente por esta revisión — por eso conviene aplicarla uno mismo.

## Datos

| Estudio | Alcance | Hallazgo principal | Fecha |
|---|---|---|---|
| Snyk, "ToxicSkills" | 3.984 skills escaneadas (ClawHub + skills.sh) | 1.467 (36,82%) con algún fallo; 534 (13,4%) críticos; 76 payloads maliciosos confirmados, 91% de ellos combinando código malicioso con inyección de prompts | 2026-02-05 |
| Relevamiento de servidores MCP (bex.co) | 9.695 servidores únicos en GitHub, Glama, Lobehub y PulseMCP | 5.832 (60%) con alguna debilidad; 2.259 con fallas confirmadas y explotables; solo 8,5% usa OAuth | 2026-07-09 |

## Cómo empezar

Checklist antes de instalar un MCP o una skill que no viene de un publicador que ya conoces:

1. **Verifica el publicador**: cuenta y organización identificables, historial de commits real, no un autor nuevo con un solo repositorio.
2. **Lee el código fuente completo** antes de conectarlo, no solo el README — especialmente las descripciones de las herramientas que el agente va a ver, donde se esconde el "tool poisoning".
3. **Corre un escáner automatizado** (`snyk-agent-scan` / `mcp-scan`) antes de dar la primera aprobación, y de nuevo después de cada actualización: una skill puede volverse maliciosa en una versión posterior sin que el nombre cambie ("rug pull").
4. **Revisa qué credenciales pide y cómo las usa.** Preferir servidores que ofrezcan OAuth de alcance acotado sobre los que piden un token estático con acceso amplio: según el relevamiento de bex.co, eso todavía describe a la mayoría del ecosistema.
5. **Pruébalo primero en un entorno aislado** (un dev container o una sesión sandbox, ver la ficha de esta serie sobre [permisos y sandboxing](../seguridad/seg-permisos-y-sandboxing.md)), no directo en el repositorio de producción.
6. **Fija una versión o commit específico** en vez de apuntar a la última versión disponible, y revisa el diff antes de actualizar.
7. Si el servidor va en un `.mcp.json` de un repositorio clonado, no aceptes el diálogo de confianza de Claude Code sin haber hecho los pasos anteriores primero: ese diálogo existe justamente para frenar una conexión automática a un servidor malicioso incluido en el repo.

## Fuentes

- [ToxicSkills: Scanning 3,984 AI agent skills reveals critical security gaps](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/) — Snyk — pub: 2026-02-05 — visto: 2026-09-21
- [MCP](https://code.claude.com/docs/en/mcp) — Anthropic (code.claude.com/docs) — pub: s/f — visto: 2026-09-21
- [Pre-submission checklist](https://claude.com/docs/connectors/building/review-criteria) — Anthropic (claude.com/docs) — pub: s/f — visto: 2026-09-21
- [60% of MCP Servers Have Security Issues: The Checklist Before You Expose Deploy/Rollback to an Agent](https://bex.co/blog/2026/07/09/mcp-vulnerability-census-server-security-checklist) — bex.co — pub: 2026-07-09 — visto: 2026-09-21
- [Agent Scan (mcp-scan)](https://github.com/invariantlabs-ai/mcp-scan) — repositorio en GitHub (Invariant Labs / Snyk) — pub: s/f — visto: 2026-09-21

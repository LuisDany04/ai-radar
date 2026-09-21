---
id: seg-secretos-y-credenciales
title: "Secretos y credenciales: cómo evitar que un agente los filtre, y qué hacer si ya pasó"
track: seguridad
type: guia
level: intermedio
tags: secretos, credenciales, claude-code, git, deteccion-de-secretos
summary: "Un agente de código lee cualquier archivo al que llegue, incluidos .env y claves. Cómo evitar que esa información llegue al modelo o a un repositorio, herramientas de detección y los pasos si un secreto ya se filtró."
updated: 2026-09-21
reading_minutes: 10
source_span: 2026-04-14..2026-06-05
confidence: alta
---

Un agente de código no distingue un archivo de configuración de un archivo de secretos: si su herramienta de lectura puede abrirlo, lo abre, y su contenido pasa a formar parte del contexto que se envía al modelo. Eso incluye `.env`, archivos de credenciales de la nube, tokens en variables de entorno y claves privadas, salvo que exista una regla explícita que se lo impida. El riesgo no es solo que el modelo "vea" el secreto: ese texto puede terminar en un commit, en la salida de una herramienta, en un pull request o —si el agente procesó contenido no confiable— exfiltrado hacia afuera.

## Por qué importa

GitGuardian documentó en su reporte "State of Secrets Sprawl 2026" que se expusieron 28.649.024 secretos nuevos en repositorios públicos de GitHub durante 2025, un aumento del 34% interanual y el salto más grande registrado en la historia del informe. El mismo reporte encontró que los commits en coautoría con Claude Code filtraron secretos a aproximadamente el doble de la tasa base del resto de GitHub, y que las credenciales de servicios de IA (API keys de proveedores como Anthropic u OpenAI) crecieron un 81% interanual, con 24.008 secretos únicos expuestos específicamente en archivos de configuración de MCP.

El caso más concreto de 2026: el 5 de junio, Microsoft Threat Intelligence publicó el hallazgo de una vulnerabilidad en la GitHub Action oficial de Claude Code. La herramienta Bash de la Action corría dentro de un sandbox con variables de entorno depuradas (Bubblewrap), pero la herramienta Read no tenía la misma protección y podía leer `/proc/self/environ` directamente. Un atacante insertó una instrucción oculta —en un comentario HTML invisible en la vista renderizada pero legible para el modelo— dentro de un issue de GitHub, pidiendo al agente que leyera esa ruta, extrajera la variable `ANTHROPIC_API_KEY` y la ofuscara (quitando los primeros siete caracteres) para evadir tanto los filtros de seguridad del modelo como el escáner de secretos de GitHub. Microsoft reportó el hallazgo a Anthropic el 29 de abril de 2026 vía HackerOne; Anthropic lo mitigó en la versión 2.1.128 de Claude Code, bloqueando el acceso a rutas `/proc` sensibles, publicada el 5 de mayo de 2026.

## Ejemplo

### Bloquear la lectura de secretos a nivel de Claude Code

Regla de permisos que impide que Claude Code lea archivos de secretos, documentada en `code.claude.com/docs/en/permissions`:

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(~/.aws/**)",
      "Read(~/.ssh/**)"
    ]
  }
}
```

Una regla `Read` deny también bloquea que Edit o Write toquen esa misma ruta, pero no cubre un proceso que lee el archivo por su cuenta (un script en Python o Node, por ejemplo). Para un límite real a nivel de sistema operativo, la documentación oficial recomienda combinarla con `sandbox.filesystem.denyRead` (ver la ficha de esta serie sobre [permisos y sandboxing](../seguridad/seg-permisos-y-sandboxing.md)).

### Enmascarar credenciales dentro del sandbox

Cuando el agente sí necesita usar una credencial (por ejemplo, para que `npm publish` se autentique), el sandbox de Claude Code puede sustituir el valor real por un "centinela" y solo revelarlo en la salida de red hacia hosts que tú aprobaste, para que ni el comando ni el modelo vean el valor real:

```json
{
  "sandbox": {
    "network": {
      "tlsTerminate": {},
      "allowedDomains": ["registry.npmjs.org"]
    },
    "credentials": {
      "envVars": [
        { "name": "NPM_TOKEN", "mode": "mask" }
      ]
    }
  }
}
```

### Detectar secretos antes de que salgan del equipo

Bloquear la lectura no cubre todos los caminos: un secreto puede llegar a un commit por copiar y pegar, por un archivo de configuración olvidado o por una herramienta distinta a Claude Code. Un hook de pre-commit con un escáner de secretos es la segunda capa. Ejemplo con gitleaks:

```bash
gitleaks git -v
```

## Datos

| Herramienta / mecanismo | Qué hace | Dato verificado |
|---|---|---|
| Gitleaks | Escanea repos, directorios o `stdin` en busca de contraseñas, API keys y tokens; se integra como hook de pre-commit o GitHub Action | 29.400 estrellas en GitHub; el proyecto se declara "feature complete" y solo recibe parches de seguridad (consultado 2026-09-21) |
| TruffleHog v3 | Detecta y además **verifica** si la credencial encontrada sigue activa, intentando autenticarse con ella contra la API del proveedor | 28.000 estrellas en GitHub; más de 700 detectores (consultado 2026-09-21) |
| GitHub push protection | Bloquea el push antes de que el secreto llegue al repositorio remoto, en línea de comandos, UI, subida de archivos, API REST y servidor MCP de GitHub | Activado por defecto para repos públicos a nivel de usuario; a nivel de repositorio está desactivado por defecto y lo activa un administrador |
| GitGuardian State of Secrets Sprawl 2026 | Medición anual de secretos expuestos en GitHub público | 28.649.024 secretos nuevos en 2025 (+34% interanual); filtraciones en commits de Claude Code al doble de la tasa base | 2026-04-14 |

## Cómo empezar

1. Agrega una regla `Read` deny para `.env`, directorios de secretos y credenciales de la nube en `.claude/settings.json` antes de dar acceso al agente a un repositorio nuevo.
2. Si el agente necesita autenticarse contra un servicio externo, usa el enmascarado de credenciales del sandbox (`sandbox.credentials`) en lugar de exponer la variable de entorno sin protección.
3. Instala un escáner de secretos como gitleaks o TruffleHog como hook de pre-commit y en el pipeline de CI, no solo como paso manual.
4. Activa GitHub push protection a nivel de repositorio si tu cuenta lo permite; no depende de que cada colaborador tenga el hook instalado localmente.
5. Si un secreto ya se filtró: **rota o revoca la credencial primero**, antes de tocar el historial de git. Según la documentación oficial de GitHub, una vez rotada la credencial deja de servir para acceder a nada, lo que suele bastar como mitigación; reescribir el historial (por ejemplo con `git filter-repo`) no revoca nada por sí solo, no llega a forks ni clones existentes, y GitHub Support solo ayuda a limpiar vistas cacheadas cuando el riesgo no se resuelve con la rotación.
6. Revisa también los archivos de configuración de MCP (`.mcp.json`) antes de subirlos: GitGuardian encontró 24.008 secretos expuestos específicamente ahí.

## Fuentes

- [Securing CI/CD in an agentic world: Claude Code GitHub Action case](https://www.microsoft.com/en-us/security/blog/2026/06/05/securing-ci-cd-in-agentic-world-claude-code-github-action-case/) — Microsoft Security Blog (Microsoft Threat Intelligence) — pub: 2026-06-05 — visto: 2026-09-21
- [29 million leaked secrets in 2025: Why AI agents credentials are out of control](https://www.helpnetsecurity.com/2026/04/14/gitguardian-ai-agents-credentials-leak/) — Help Net Security (reportando el informe de GitGuardian) — pub: 2026-04-14 — visto: 2026-09-21
- [Security](https://code.claude.com/docs/en/security) — Anthropic (code.claude.com/docs) — pub: s/f — visto: 2026-09-21
- [Configure the sandboxed Bash tool](https://code.claude.com/docs/en/sandboxing) — Anthropic (code.claude.com/docs) — pub: s/f — visto: 2026-09-21
- [Push protection](https://docs.github.com/en/code-security/concepts/secret-security/push-protection) — GitHub Docs — pub: s/f — visto: 2026-09-21
- [Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository) — GitHub Docs — pub: s/f — visto: 2026-09-21
- [Gitleaks](https://github.com/gitleaks/gitleaks) — repositorio en GitHub — pub: s/f — visto: 2026-09-21
- [TruffleHog](https://github.com/trufflesecurity/trufflehog) — repositorio en GitHub (Truffle Security) — pub: s/f — visto: 2026-09-21
- [LLM02:2025 Sensitive Information Disclosure](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/) — OWASP GenAI Security Project — pub: s/f — visto: 2026-09-21

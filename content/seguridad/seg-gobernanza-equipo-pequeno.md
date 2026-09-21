---
id: seg-gobernanza-equipo-pequeno
title: "Gobernanza mínima para un equipo pequeño que deja entrar agentes de IA al repositorio"
track: seguridad
type: guia
level: intro
tags: gobernanza, permisos, revision-de-codigo, auditoria, equipo-pequeno, owasp, nist
summary: "Qué permisos dar a un agente de código, qué exigir antes de producción y cómo auditar su actividad: política mínima y copiable para un equipo de 3 a 10 personas sin equipo de seguridad, basada en OWASP, NIST AI RMF y documentación oficial de GitHub y Anthropic."
updated: 2026-09-21
reading_minutes: 11
source_span: 2024-11-17..2026-06-15
confidence: alta
---

Los marcos grandes —OWASP Top 10 for LLM Applications, el NIST AI Risk Management Framework, las guías de GitHub y Anthropic para empresas— están escritos pensando en organizaciones con equipo de seguridad dedicado, presupuesto de compliance y un área de plataforma que despliega managed settings a mil máquinas. Un equipo de 3 a 10 personas que ya dejó entrar a Claude Code, Copilot o Cursor al repositorio no tiene nada de eso, pero igual necesita una política. Esta ficha traduce esos marcos a lo mínimo razonable que un equipo así puede configurar en una tarde, sin depender de un plan Enterprise.

## Por qué importa

Sin una política explícita, lo que termina pasando es que cada persona del equipo configura los permisos del agente a su criterio —algunos con todo en modo "pregunta siempre", otros con `--dangerously-skip-permissions` activado porque las interrupciones cansan— y nadie sabe qué se ejecutó, con qué alcance ni si algo llegó a producción sin revisión humana. El NIST AI RMF llama a esto la función **Govern**: antes de discutir controles técnicos, alguien concreto tiene que ser dueño de la política, aunque sea a medio tiempo y sin título de "responsable de seguridad".

## Qué permisos conceder

**Regla general: menor privilegio por defecto, no por excepción.** Tanto la Cheat Sheet de seguridad de agentes de IA de OWASP como el Top 10 for LLM Applications (categoría "Excessive Agency", LLM06:2025) recomiendan lo mismo: dar al agente el mínimo de herramientas necesarias para la tarea, no todo el acceso posible con la esperanza de restringir después.

En Claude Code, esto se configura con reglas `allow`/`ask`/`deny` en `.claude/settings.json` (ver la ficha de este track sobre permisos y sandboxing para el detalle completo de esas reglas). Para un equipo chico sin infraestructura de MDM, lo accionable es un archivo de settings versionado en el propio repo que el equipo acuerda una vez y ya no vuelve a discutir por sesión:

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./**/*.pem)",
      "Read(./secrets/**)",
      "Bash(git push --force*)",
      "Bash(curl *)"
    ],
    "allow": [
      "Bash(npm test*)",
      "Bash(npm run lint*)",
      "Bash(git commit*)"
    ]
  }
}
```

Esto no requiere plan de pago: la documentación oficial de Anthropic distingue **server-managed settings** (requieren plan Team/Enterprise, se distribuyen desde la consola de administración) de settings **basados en archivo**, que funcionan con cualquier plan y se pueden versionar junto al código o distribuir por un script de onboarding. Un equipo chico sin Enterprise igual puede imponer una política de mínimos así, aunque no pueda impedir que alguien la edite localmente.

Para GitHub Copilot, el equivalente es la pestaña de políticas a nivel de organización (no requiere Enterprise, existe también en organizaciones simples): ahí se decide qué agentes de terceros están habilitados (la documentación de GitHub nombra explícitamente "Anthropic Claude" y "OpenAI Codex" como ejemplos de agentes que se pueden activar o desactivar) y qué servidores MCP están permitidos.

## Qué exigir antes de producción

Ningún permiso reemplaza la revisión humana antes de mergear a la rama principal. Lo mínimo copiable en GitHub, disponible sin plan Enterprise:

1. **Protección de rama con revisión obligatoria.** En la configuración del repositorio (o vía API), activar "Require a pull request before merging" y "Require approvals" (al menos 1), como documenta GitHub en su guía oficial de ramas protegidas.
2. **CODEOWNERS para las rutas sensibles.** Un archivo `.github/CODEOWNERS` que asigne dueño a `infra/`, `auth/` o lo que sea crítico en tu repo, combinado con "Require review from Code Owners" en la regla de protección de rama, para que ese código en particular no lo apruebe cualquiera del equipo.
3. **Secret scanning con push protection activado.** GitHub lo activa por defecto en repositorios públicos; para repos privados requiere GitHub Secret Protection habilitado a nivel de organización o repositorio. Bloquea el push antes de que el secreto llegue al historial, en vez de avisar después (ver también la ficha de este track sobre secretos y credenciales).
4. **Al menos un escaneo automático (SAST/SCA) como status check obligatorio.** No como sustituto de la revisión humana sino como red adicional: los estudios sobre calidad del código generado por IA (ver la ficha de este track sobre ese tema) muestran de forma consistente que el código de un agente no es más seguro que el de un desarrollador junior sin revisar.

Para un agente que trabaja de forma más autónoma (varios commits, PRs propias), la recomendación de la Cheat Sheet de OWASP sobre agentes de IA aplica directo: separar decisión de ejecución para las operaciones de riesgo alto o crítico —cualquier cosa irreversible, cualquier despliegue a producción, cualquier cambio de permisos— exigiendo aprobación humana explícita antes de ejecutar, no después de revisar el resultado.

## Cómo auditar

Auditar significa poder responder, después del hecho, "¿qué corrió, quién lo pidió y qué tocó". Hay dos niveles según lo que tu plan permite pagar:

**Sin plan de pago (mínimo viable).** Claude Code expone telemetría vía OpenTelemetry en cualquier plan, incluyendo eventos como `claude_code.tool_result` (qué herramienta corrió, si tuvo éxito) y `claude_code.tool_decision` (si el permiso se otorgó o se denegó), y métricas como `claude_code.commit.count` y `claude_code.pull_request.count`. Apuntar ese exporter a un colector propio, aunque sea gratuito, ya da un registro mínimo sin depender de Enterprise.

**Con plan Team/Enterprise.** Los audit logs de Claude (Enterprise) agregan hasta 180 días de eventos —altas de proyecto, cambios de configuración de SSO, administración de usuarios— exportables por el Organization Owner. GitHub documenta lo mismo para Copilot: "Use your audit log to monitor changes to policy settings or organization enablement". Ninguno de los dos, en el nivel Enterprise, registra por defecto el contenido literal de cada prompt o cada archivo tocado; para eso hace falta habilitar explícitamente variables como `OTEL_LOG_USER_PROMPTS` o `OTEL_LOG_TOOL_DETAILS` en Claude Code, con la salvedad de que eso empieza a capturar contenido potencialmente sensible y hay que tratarlo con el mismo cuidado que cualquier otro log con datos del negocio.

## Qué registrar, como mínimo

Aunque tu equipo no monte un SIEM, esto es lo mínimo que conviene poder reconstruir ante un incidente, según lo que permiten los controles ya descritos arriba:

| Pregunta | De dónde sale la respuesta |
|---|---|
| ¿Quién ejecutó al agente y cuándo? | `claude_code.session.count` (OpenTelemetry) o audit log de Claude (Enterprise) |
| ¿Qué comandos de shell corrió? | `claude_code.tool_result` con `OTEL_LOG_TOOL_DETAILS=1`, o el sandbox de Bash si está activo |
| ¿Qué PR o commit generó? | `claude_code.pull_request.count` / `claude_code.commit.count`, cruzado con el log de git normal |
| ¿Quién aprobó el merge a producción? | Historial de revisiones de la pull request (branch protection + CODEOWNERS) |
| ¿Se detectó algún secreto antes de llegar al repo? | Log de push protection de GitHub |
| ¿Qué política de permisos tenía activa en ese momento? | El `managed-settings.json` versionado, con su propio historial de git |

## Cómo empezar

Adaptado de las cuatro funciones del NIST AI RMF (Govern, Map, Measure, Manage) a algo ejecutable por un equipo sin área de seguridad:

1. **Gobernar (una vez).** Nombra una persona (no necesariamente de seguridad) dueña de la política del agente, aunque sea a medio tiempo. Sin dueño, la política se degrada sola en unas semanas.
2. **Mapear (una vez, revisar cada trimestre).** Lista qué agentes tienen acceso a qué repos, con qué nivel de autonomía (¿pregunta antes de cada acción o corre en modo auto?) y qué MCP servers de terceros están conectados (ver la ficha de este track sobre revisión de MCP y skills de terceros).
3. **Configurar mínimos (una vez, ajustar según fricción real).** Un `.claude/settings.json` versionado con las reglas `deny` de arriba, branch protection con revisión obligatoria, CODEOWNERS en las rutas sensibles y push protection activado.
4. **Medir (continuo).** Activa el exporter de OpenTelemetry de Claude Code aunque sea hacia un destino simple; sin esto no hay forma de saber si la política se está cumpliendo.
5. **Gestionar (continuo).** Revisa el log de push protection y las decisiones de permiso denegadas una vez por semana al principio: son la señal más barata de que algo se está pidiendo fuera de lo esperado, antes de que sea un incidente.
6. **Antes de cualquier cambio grande** (nuevo MCP server, nuevo repo con datos sensibles, subir el nivel de autonomía del agente), repite el paso 2 para ese cambio puntual en vez de asumir que la política general ya lo cubre.

## Fuentes

- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) — OWASP GenAI Security Project — pub: 2024-11-17 — visto: 2026-09-21
- [OWASP Top 10 for LLM Risks Explained](https://aembit.io/blog/owasp-top-10-llm-risks-explained/) — Aembit — pub: s/f — visto: 2026-09-21
- [AI Agent Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html) — OWASP Cheat Sheet Series — pub: s/f — visto: 2026-09-21
- [OWASP Top 10 for Agentic Applications for 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) — OWASP GenAI Security Project — pub: 2025-12-09 — visto: 2026-09-21
- [AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) — NIST — pub: s/f — visto: 2026-09-21
- [Set up Claude Code for your organization](https://code.claude.com/docs/en/admin-setup) — Anthropic (code.claude.com/docs) — pub: s/f — visto: 2026-09-21
- [Monitoring](https://code.claude.com/docs/en/monitoring-usage) — Anthropic (code.claude.com/docs) — pub: s/f — visto: 2026-09-21
- [Access audit logs](https://support.claude.com/en/articles/9970975-access-audit-logs) — Anthropic (Claude Help Center) — pub: 2026-06-15 — visto: 2026-09-21
- [GitHub Copilot policies for enterprises and organizations](https://docs.github.com/en/copilot/concepts/policies) — GitHub Docs — pub: s/f — visto: 2026-09-21
- [Managing policies and features for GitHub Copilot in your organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies) — GitHub Docs — pub: s/f — visto: 2026-09-21
- [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) — GitHub Docs — pub: s/f — visto: 2026-09-21
- [About push protection](https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection) — GitHub Docs — pub: s/f — visto: 2026-09-21
- [About code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) — GitHub Docs — pub: s/f — visto: 2026-09-21

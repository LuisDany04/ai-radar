---
id: skills-fuera-de-claude-code
title: "Skills fuera de Claude Code: API, Claude.ai, Agent SDK y el riesgo de instalar de terceros"
track: skills
type: guia
level: intermedio
tags: agent-skills, api, claude-ai, agent-sdk, seguridad, sandbox
summary: "Cómo cambian las skills según la superficie (API, claude.ai, Agent SDK), sus límites de red y paquetes, y datos reales de un estudio de seguridad sobre skills maliciosas en la cadena de suministro."
updated: 2026-09-20
reading_minutes: 8
source_span: 2025-10-16..2026-09-20
confidence: media
---

Agent Skills no es exclusivo de Claude Code: corre también en la API de Claude, en claude.ai y en el Agent SDK, pero **no de la misma forma**. Cada superficie tiene su propio modelo de carga, de red y de quién puede compartir qué con quién — y ninguna sincroniza automáticamente con las demás.

## Por qué importa

Una skill que funciona perfecto en Claude Code (con acceso total a red e instalación de paquetes) puede fallar en la API por la simple razón de que ahí no hay red ni instalación de paquetes en tiempo de ejecución. Entender esto de entrada evita depurar un "bug" que en realidad es una restricción de plataforma.

## Ejemplo

Uso de skills en el Agent SDK (Python), habilitando todas las descubiertas por el sistema de archivos:

```python
import asyncio, os
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    options = ClaudeAgentOptions(
        cwd=os.getcwd(),
        setting_sources=["user", "project"],  # Carga skills del filesystem
        skills="all",                          # Deja que Claude invoque cualquiera
        allowed_tools=["Read", "Write", "Bash"],
    )
    async for message in query(prompt="Help me process this PDF document", options=options):
        print(message)

asyncio.run(main())
```

El SDK no ofrece una API programática para *registrar* skills (a diferencia de los subagentes, que sí se pueden definir en código): las skills siempre son archivos `SKILL.md` en disco, descubiertos vía `setting_sources`/`settingSources`.

## Datos

Diferencias documentadas oficialmente entre superficies:

| Superficie | Alcance de compartición | Red | Instalación de paquetes |
|---|---|---|---|
| **claude.ai** | Individual por usuario; no se comparte a nivel organización ni lo gestiona un admin | Variable según configuración de usuario/admin | Puede instalar desde npm, PyPI y repos de GitHub |
| **Claude API** | Todo el workspace (todos los miembros acceden a las skills subidas) | Sin acceso a red | Sin instalación en tiempo de ejecución; solo paquetes preconfigurados |
| **Claude Code** | Personal (`~/.claude/skills/`) o por proyecto (`.claude/skills/`), o vía plugins | Igual que cualquier programa del usuario (total) | Se desaconseja instalar paquetes globales |

Las skills subidas a una superficie **no** se sincronizan a las otras: subir una skill a claude.ai no la hace disponible en la API, y viceversa; las skills de Claude Code son filesystem y están separadas de ambas.

Agent Skills quedó publicado como estándar abierto (agentskills.io) y, según el listado de clientes del sitio, lo soportan además de Claude: Gemini CLI, Cursor, GitHub Copilot, VS Code, OpenCode, Goose, Amp, Letta y otros más de 30 agentes/IDEs distintos — aunque la lista es la que publica el propio sitio del estándar, no una auditoría independiente de compatibilidad.

## Debate — Seguridad de ejecutar skills de terceros

**Postura oficial (Anthropic, docs de Agent Skills):** usar solo skills de fuentes confiables — las propias o las de Anthropic. Una skill maliciosa puede instruir a Claude a invocar herramientas o ejecutar código de forma que no coincide con su propósito declarado; el riesgo crece con skills que llaman URLs externas, porque el contenido obtenido puede traer instrucciones maliciosas. Para organizaciones Enterprise existe un escáner de contenido de skills subidas en claude.ai y Claude Cowork, que **no cubre** skills subidas por la API o la consola.

**Dato de un estudio de seguridad independiente (Snyk, "ToxicSkills", 5 de febrero de 2026):** escaneando 3.984 skills recolectadas de ClawHub y skills.sh, encontraron que 1.467 (36,8%) tenían algún fallo de seguridad, 534 (13,4%) tenían vulnerabilidades críticas, y 76 tenían payloads maliciosos confirmados — de las cuales 8 seguían publicadas al momento del análisis. Entre las muestras maliciosas confirmadas, el 100% contenía patrones de código malicioso y el 91% combinaba eso con técnicas de prompt injection. Las plataformas afectadas en la muestra incluían OpenClaw, Claude Code y Cursor.

> [!duda] El estudio de Snyk mide skills recolectadas de registros de terceros (ClawHub, skills.sh), no del repositorio oficial `anthropics/skills` ni de skills subidas vía la API de Anthropic con su propio escáner de contenido. No es una medición del riesgo dentro del ecosistema oficial, sino del ecosistema abierto en general.

## Cómo empezar

1. Si vas a distribuir una skill para múltiples superficies, súbela por separado a cada una (API, claude.ai, Claude Code): no hay sincronización automática.
2. Antes de instalar una skill de un repositorio que no sea tuyo ni de Anthropic, léela completa — SKILL.md, scripts y cualquier recurso bundleado — buscando llamadas de red inesperadas o patrones de acceso a archivos que no calcen con lo que la skill dice hacer.
3. Si tu organización es Enterprise, activa el escaneo de contenido de skills para las que se suben en claude.ai/Cowork; recuerda que no cubre subidas por API o consola.
4. En el Agent SDK, si necesitas restringir qué puede invocar Claude, pasa una lista explícita en `skills=[...]` en vez de `"all"`.

## Fuentes

- [Agent Skills — Where Skills work / Limitations and constraints](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) — Anthropic (Claude Platform Docs) — pub: s/f — visto: 2026-09-20
- [Extend agents with skills (Agent SDK)](https://code.claude.com/docs/en/agent-sdk/skills) — Anthropic (Claude Code Docs) — pub: s/f — visto: 2026-09-20
- [Agent Skills — Overview / Client Showcase](https://agentskills.io) — agentskills.io — pub: s/f — visto: 2026-09-20
- [ToxicSkills: malicious AI agent skills on ClawHub](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/) — Snyk — pub: 2026-02-05 — visto: 2026-09-20
- [Claude API skill](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/claude-api-skill) — Anthropic (Claude Platform Docs) — pub: s/f — visto: 2026-09-20

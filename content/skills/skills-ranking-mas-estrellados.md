---
id: skills-ranking-mas-estrellados
title: "Ranking real: los repos y colecciones de Agent Skills con más estrellas"
track: skills
type: dato
level: intermedio
tags: agent-skills, ranking, github, superpowers, estrellas
summary: "Medición propia con gh api el 20-09-2026 de estrellas y última actividad de los repos de skills más grandes de GitHub, con el hallazgo de que un framework comunitario supera al repo oficial de Anthropic."
updated: 2026-09-20
reading_minutes: 6
source_span: 2025-09-22..2026-09-20
confidence: alta
---

No existe un contador oficial de "qué skill se usa más": Anthropic no publica telemetría de uso de Agent Skills. Lo que sí se puede medir es actividad pública en GitHub (estrellas, forks, fecha del último commit) y, de forma más indirecta, instalaciones reportadas por un registro de terceros. Esta ficha mide ambas cosas directamente, con `gh api` y `gh search`, el 20 de septiembre de 2026.

## Por qué importa

Las estrellas de GitHub no son "uso" en sentido estricto —nadie mide cuántas veces se invoca una skill dentro de una sesión de Claude—, pero son la señal pública más cercana a popularidad real que existe hoy para este ecosistema, y permiten comparar el repo oficial de Anthropic contra las colecciones comunitarias más grandes.

## Ejemplo

Comandos usados para la medición (ejecutados el 20-09-2026):

```bash
gh api repos/anthropics/skills --jq '"\(.stargazers_count) \(.pushed_at)"'
gh api repos/obra/superpowers --jq '"\(.stargazers_count) \(.pushed_at)"'
gh search repos "claude skills" --limit 50 --json fullName,stargazersCount,updatedAt,description
```

## Datos

Repositorios de skills/plugins para Claude con más estrellas en GitHub, medido el 20-09-2026:

| Repositorio | Estrellas | Último push | Qué es |
|---|---|---|---|
| [obra/superpowers](https://github.com/obra/superpowers) | 288.923 | 2026-09-19 | Framework comunitario de metodología de desarrollo (TDD, planning, subagentes) construido sobre skills |
| [anthropics/skills](https://github.com/anthropics/skills) | 177.207 | 2026-09-10 | Repositorio oficial de Anthropic: skills de ejemplo + las 4 skills de documentos (docx/pdf/pptx/xlsx) |
| [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | 75.355 | 2026-09-20 | Lista curada (awesome-list) de skills y recursos |
| [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | 36.516 | 2026-09-18 | Directorio oficial de plugins de Claude Code (incluye Superpowers como plugin instalable) |
| [mukul975/Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) | 33.003 | 2026-08-31 | 817+ skills de ciberseguridad mapeadas a MITRE ATT&CK y otros frameworks (nombre no oficial, ver nota) |
| [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | 26.160 | 2026-09-20 | 380+ skills/agentes/comandos multipropósito |
| [agentskills/agentskills](https://github.com/agentskills/agentskills) | 25.527 | 2026-08-09 | Especificación y documentación del estándar abierto Agent Skills |
| [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | 15.114 | 2026-09-20 | Lista curada, enfocada en Claude Code |
| [nidhinjs/prompt-master](https://github.com/nidhinjs/prompt-master) | 13.393 | 2026-09-20 | Skill individual para generar prompts |
| [Jeffallan/claude-skills](https://github.com/Jeffallan/claude-skills) | 11.543 | 2026-09-20 | 67 skills para desarrollo full-stack |

Como referencia de escala, el repositorio principal de la herramienta, [anthropics/claude-code](https://github.com/anthropics/claude-code), tiene 146.807 estrellas medidas el mismo día: **el framework comunitario Superpowers ya tiene más estrellas que el propio Claude Code.**

Registro de instalaciones de terceros: [skills.sh](https://skills.sh), operado por Vercel, muestra un leaderboard de skills instalables por `npx` con más de 1,48 millones de instalaciones acumuladas y `frontend-design` (de `anthropics/skills`) entre las más instaladas individualmente.

> [!duda] El leaderboard de skills.sh muestra cifras inconsistentes entre sí en la misma vista: reporta un total "All Time" de 1.480.233 instalaciones mientras que, en la misma tabla, la skill individual `find-skills` aparece con 3,5 millones de instalaciones. Probablemente son ventanas de tiempo distintas (ej. "últimas 8 semanas" vs. total), pero la página no lo aclara, así que estos números puntuales se citan con reserva.

## Debate

**Postura A:** las estrellas de GitHub miden interés y descubribilidad, no uso real dentro de una sesión de Claude — una skill puede tener miles de estrellas y nunca activarse en la práctica porque su `description` no dispara bien (ver la ficha sobre cómo escribir una skill).

**Postura B:** a falta de telemetría oficial, estrellas + forks + actividad de commits siguen siendo la mejor proxy pública disponible, y es coherente con lo que reportan sitios de instalación como skills.sh: los mismos nombres (Superpowers, `anthropics/skills`, colecciones "awesome") dominan ambos rankings.

## Fuentes

- [obra/superpowers](https://github.com/obra/superpowers) — GitHub (medido con `gh api`) — pub: 2026-09-19 — visto: 2026-09-20
- [anthropics/skills](https://github.com/anthropics/skills) — GitHub / Anthropic (medido con `gh api`) — pub: 2026-09-10 — visto: 2026-09-20
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) — GitHub / Anthropic (medido con `gh api`) — pub: 2026-09-18 — visto: 2026-09-20
- [anthropics/claude-code](https://github.com/anthropics/claude-code) — GitHub / Anthropic (medido con `gh api`) — pub: 2026-09-20 — visto: 2026-09-20
- [skills.sh — The Agent Skills Directory](https://skills.sh) — Vercel — pub: s/f — visto: 2026-09-20

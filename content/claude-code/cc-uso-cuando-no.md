---
id: cc-uso-cuando-no
title: "Cuándo NO usar Claude Code: chat, Cowork y los límites de delegar"
track: claude-code
type: opinion
level: intro
tags: chat vs code, vibe coding, limites, criterio
summary: "Claude Code es para trabajo delegado dentro de un repositorio. Para pensar en voz alta, decidir una arquitectura o dar acceso a alguien que no es developer, hay opciones mejores."
updated: 2026-09-20
reading_minutes: 5
source_span: 2025-05-01..2026-06-23
confidence: media
---

Claude Code está diseñado para delegar: describes lo que quieres, y el agente explora, planifica y ejecuta un proyecto entero mientras tú revisas o te alejas. Esa misma autonomía lo hace la herramienta equivocada cuando la tarea es pensar, no ejecutar.

## Por qué importa

Anthropic distingue explícitamente entre Chat y Cowork/Code según dónde vive el trabajo: si el material está en la cabeza del usuario o recién copiado, la herramienta recomendada es Chat; si hay un entregable claro que toca archivos o herramientas, es Cowork o Code. La tabla de criterios de su propia academia lo resume así: en Chat el objetivo todavía se está decidiendo y el rol del usuario es estar presente en cada turno; en Cowork ya hay un entregable claro en mente y la tarea se describe una vez para revisar después.

## Ejemplo

Situaciones donde cambiar de Claude Code a Chat (o a otra persona) tiene más sentido, según fuentes con nombre:

- **Decidir antes de ejecutar**: evaluar una arquitectura, sopesar un trade-off, redactar un borrador, resumir un documento largo, hacer brainstorming de nombres. Chat espera después de cada respuesta; Code encadena acciones solo.
- **Dar acceso a alguien que no programa**: Amit Kothari, autor de un blog sobre herramientas Claude, advierte contra comprar licencias de Code para equipos de operaciones, ventas o RR.HH.: para él, darle una terminal a alguien que solo necesita un entregable simple equivale a entregarle un taladro cuando lo que hace falta es un pincel.
- **Código que de verdad te importa**: Armin Ronacher, creador de Flask, reconoce que el modo más autónomo de trabajar con agentes no le ha dado buenos resultados cuando se trata de código crítico para él, aunque sí lo usa para migraciones de código o exploraciones de rendimiento.
- **Beneficios de equipo que la IA no reemplaza**: Birgitta Böckeler, de Thoughtworks, señala que el pair programming aporta propiedad colectiva del código y conocimiento tácito del equipo; un asistente de IA no sustituye eso, en todo caso hace mejores a las parejas humanas que ya pairean.

## Debate

La discusión de fondo no es "Claude Code sí o no", sino cuánta responsabilidad delegar sin revisar. Simon Willison acuñó la distinción entre "vibe coding" -- que define como "generating code with AI without caring about the code that is produced" -- y la programación asistida responsable, donde cada línea se revisa, se prueba y se entiende aunque la haya escrito un modelo. Su punto es que el vibe coding tiene un público legítimo (quien construye una herramienta personal desechable y no quiere convertirse en programador), pero aplicarlo a una base de código de producción es la parte arriesgada, no la técnica en sí.

Kothari y Willison coinciden desde ángulos distintos en algo parecido: la pregunta no es qué tan capaz es Claude, sino qué tipo de tarea tienes delante y quién necesita entender el resultado después.

## Cómo empezar

- Si todavía estás decidiendo qué construir, usa Chat o una conversación de planificación antes de abrir Code.
- Si la persona que necesita el resultado no programa ni va a tocar el repositorio, no le des una terminal: dale Cowork o pide el entregable en Chat.
- Si el código es crítico y quieres entenderlo línea por línea, no uses el modo más autónomo (auto mode / bypass permissions); revisa cada edición.
- Antes de aceptar código sin leerlo, pregúntate si lo que estás haciendo es "programación asistida" o vibe coding sobre algo que después vas a tener que mantener.

## Fuentes

- [Choosing between Claude Cowork or Chat](https://academy.claude.com/tutorials/choosing-between-claude-cowork-or-chat) — Anthropic (Claude Academy) — pub: s/f — visto: 2026-09-20
- [Claude Chat vs Cowork vs Code: which mode should you actually use?](https://amitkoth.com/claude-chat-vs-cowork-vs-code/) — Amit Kothari — pub: 2026-03-25 — visto: 2026-09-20
- [Two publishers and three authors fail to understand what "vibe coding" means](https://simonwillison.net/2025/May/1/not-vibe-coding/) — Simon Willison — pub: 2025-05-01 — visto: 2026-09-20
- [The Coming Loop](https://lucumr.pocoo.org/2026/6/23/the-coming-loop/) — Armin Ronacher (lucumr) — pub: 2026-06-23 — visto: 2026-09-20
- [Coding assistants do not replace pair programming](https://martinfowler.com/articles/exploring-gen-ai/05-not-your-pair-programmer.html) — Birgitta Bockeler / martinfowler.com — pub: 2023-08-10 — visto: 2026-09-20
